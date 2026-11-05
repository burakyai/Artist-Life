"""Erkek dövmeleri: atletli kel baz ile dövmeli görselin farkından dövme katmanı çıkarır (sadece ten üzerindeki fark).
Kullanım: python3 mtat_seg.py <atlet_baz.png> <cikti_klasoru>  (FILES: id -> upload hash, NAMES: id -> ad, fiyat)"""
import sys, json, base64
from PIL import Image
import numpy as np
from scipy import ndimage
BASE, OUT = sys.argv[1], sys.argv[2]
UP = '/mnt/user-data/uploads/'
FILES = json.load(open('mtat_files.json'))  # {"t_sabir": {"f": "963a80f7", "n": "Boyunda SABIR", "p": 6000, "st": 2}, ...}
SC = .062; OX = 10.88; OY = 9.16
SKIN = np.array([241.5, 193.0, 160.5])
base = np.asarray(Image.open(BASE).convert('RGB')).astype(float)
def lips(a):
    """hizalama çapası: (yüz merkezi x, çene çizgisi y). Çene, dudakların altındaki ilk kalın koyu çizgi."""
    nw = a.min(2) < 230
    m = (a[..., 0] > 170) & (a[..., 1] < 170) & (a[..., 2] < 170) & (a[..., 0] - a[..., 1] > 35); m[:300] = 0; m[800:] = 0; m[:, :450] = 0; m[:, 800:] = 0
    ly = np.where(m)[0].mean()
    row = nw[int(ly) - 120]; xs = np.where(row)[0]; cx = (xs.min() + xs.max()) / 2
    dark = a.mean(2) < 60; chin = int(ly) + 60; c0 = int(cx) - 30
    for y in range(int(ly) + 25, int(ly) + 160):
        if dark[y, c0:c0 + 60].mean() > .5: chin = y; break
    return cx, chin
bx, by = lips(base)
kk = (base / SKIN).mean(2); dev = np.abs(base - kk[..., None] * SKIN).max(2)
bskin = ndimage.binary_dilation((dev < 25) & (kk > .4) & (kk < 1.15), iterations=3)
meta = {}
for k, info in FILES.items():
    a = np.asarray(Image.open(f'{UP}{info["f"]}-image.png').convert('RGB')).astype(float)
    lx, ly = lips(a); dx, dy = bx - lx, by - ly
    # dövmeli görseli baza hizala
    a2 = ndimage.shift(a, (dy, dx, 0), order=1, mode='nearest')
    diff = np.abs(a2 - base).max(2)
    m = (diff > 38) & bskin
    m = ndimage.binary_opening(m, iterations=1)
    lab, n = ndimage.label(m); sz = ndimage.sum(m, lab, range(1, n + 1))
    m = np.isin(lab, [i + 1 for i, s in enumerate(sz) if s > 150])
    m = ndimage.binary_dilation(m, iterations=1)
    if not m.any(): print('BOŞ', k); continue
    ys, xs = np.where(m); x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    sub = a2[y0:y1, x0:x1]; mm = m[y0:y1, x0:x1]; d = diff[y0:y1, x0:x1]
    alpha = np.clip(d / 70, 0, 1) * mm
    layer = np.dstack([sub, alpha * 255])
    w = x1 - x0; h = y1 - y0; sc = min(1, 480 / max(w, h)); W, H = max(1, int(w * sc)), max(1, int(h * sc))
    Image.fromarray(np.clip(layer, 0, 255).astype(np.uint8), 'RGBA').resize((W, H), Image.LANCZOS).save(f'{OUT}/t_{k}.webp', quality=88)
    meta[k] = dict(n=info['n'], p=info['p'], st=info['st'], x=round(float(OX + x0 * SC), 2), y=round(float(OY + y0 * SC), 2), w=round(float(w * SC), 2), h=round(float(h * SC), 2))
    prev = base.copy(); prev = prev * (1 - (alpha[..., None] if False else 0))
    P = base.copy(); P[y0:y1, x0:x1] = P[y0:y1, x0:x1] * (1 - alpha[..., None]) + sub * alpha[..., None]
    Image.fromarray(P.astype(np.uint8)).resize((316, 316)).save(f'{OUT}/t_{k}_prev.png')
json.dump(meta, open(f'{OUT}/tmeta.json', 'w'), ensure_ascii=False)
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
js = '/* ============ Erkek dövmeleri 2.0: referans görsellerden fark alınarak çıkarılmış katmanlar; yalnız ten üzerinde görünür ============ */\n'
js += 'const MTAT={' + ','.join(f'{k}:{{n:{json.dumps(m["n"], ensure_ascii=False)},x:{m["x"]},y:{m["y"]},w:{m["w"]},h:{m["h"]},img:"data:image/webp;base64,{b64(f"{OUT}/t_{k}.webp")}"}}' for k, m in meta.items()) + '};\n'
js += '''function mtatSVG(keys,skinMaskSVG){if(!keys.length)return '';const id='mt'+(++uid);let s=`<defs><mask id="${id}">${skinMaskSVG}</mask></defs><g mask="url(#${id})">`;
 keys.forEach(k=>{const T=MTAT[k];s+=`<image href="${T.img}" x="${T.x}" y="${T.y}" width="${T.w}" height="${T.h}" preserveAspectRatio="none"/>`});return s+'</g>'}
Object.entries(MTAT).forEach(([k,T])=>{if(!ACCS.some(a=>a.id===k))ACCS.push({id:k,n:T.n,p:%s,st:%s,grp:'dovme',g:'e'})});
'''
# fiyat/stil JS tarafında meta'dan
js = js.replace("p:%s,st:%s", "p:MTATP[k][0],st:MTATP[k][1]")
js += 'const MTATP=' + json.dumps({k: [m['p'], m['st']] for k, m in meta.items()}) + ';\n'
# ACCS push'u MTATP tanımından sonra çalışsın diye sona taşı
lines = js.split('\n'); push = [l for l in lines if l.startswith('Object.entries(MTAT)')]; lines = [l for l in lines if not l.startswith('Object.entries(MTAT)')] + push
open(f'{OUT}/mtat.js', 'w').write('\n'.join(lines) + '\n')
print('ok', list(meta))
