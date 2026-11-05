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
EB = {}
for q in (1, 4):
    _bi = Image.fromarray(base.astype(np.uint8)); _bi = _bi.resize((_bi.size[0] // q, _bi.size[1] // q), Image.BILINEAR)
    EB[q] = (np.asarray(_bi.convert('L')) < 90).astype(np.float32)[60 // q:60 // q + 460 // q, 380 // q:380 // q + 510 // q]
meta = {}
for k, info in FILES.items():
    a = np.asarray(Image.open(info['f'] if '/' in info['f'] else f'{UP}{info["f"]}-image.png').convert('RGB')).astype(float)
    # en iyi hizalama: önce 1/4 çözünürlükte kaba (ölçek .92-1.08, kayma ±48 px), sonra tam çözünürlükte ince arama
    im0 = Image.open(info['f'] if '/' in info['f'] else f'{UP}{info["f"]}-image.png').convert('RGB')
    W0, H0 = im0.size
    def search(q, scales, dys, dxs):
        Eb = EB[q]; hh, ww = 460 // q, 510 // q; bst = (1e18, 1.0, 0, 0)
        for sc_ in scales:
            E = (np.asarray(im0.resize((int(W0 * sc_ / q), int(H0 * sc_ / q)), Image.BILINEAR).convert('L')) < 90).astype(np.float32)
            ox = (E.shape[1] - W0 // q) // 2; oy = (E.shape[0] - H0 // q) // 2
            for ddy in dys:
                for ddx in dxs:
                    y0_ = 60 // q + oy - round(ddy / q); x0_ = 380 // q + ox - round(ddx / q)
                    if y0_ < 0 or x0_ < 0 or y0_ + hh > E.shape[0] or x0_ + ww > E.shape[1]: continue
                    d = np.abs(E[y0_:y0_ + hh, x0_:x0_ + ww] - Eb).sum()
                    if d < bst[0]: bst = (d, sc_, ddx, ddy)
        return bst
    b4 = search(4, [round(0.92 + i * 0.01, 2) for i in range(17)], range(-48, 49, 4), range(-48, 49, 4))
    best = search(1, [round(b4[1] + i * 0.005, 3) for i in range(-2, 3)], range(b4[3] - 4, b4[3] + 5), range(b4[2] - 4, b4[2] + 5))
    _, sc_, ddx, ddy = best
    imS = np.asarray(im0.resize((int(W0 * sc_), int(H0 * sc_)), Image.LANCZOS)).astype(float)
    ox = (imS.shape[1] - W0) // 2; oy = (imS.shape[0] - H0) // 2
    pad = np.pad(imS, ((40, 40), (40, 40), (0, 0)), mode='edge')
    a2 = pad[40 + oy - ddy:40 + oy - ddy + H0, 40 + ox - ddx:40 + ox - ddx + W0]
    if sc_ != 1.0 or ddx or ddy: print('hiza', k, sc_, ddx, ddy)
    diff = np.abs(a2 - base).max(2)
    cband = ndimage.binary_dilation(base.mean(2) < 110, iterations=3)
    m = (diff > 38) & bskin & ~(cband & (np.abs(a2.mean(2) - base.mean(2)) < 140))
    m = ndimage.binary_opening(m, iterations=1)
    lab, n = ndimage.label(m); sz = ndimage.sum(m, lab, range(1, n + 1))
    m = np.isin(lab, [i + 1 for i, s in enumerate(sz) if s > 35])
    cw = ndimage.binary_dilation(base.mean(2) < 110, iterations=7)
    lab2, n2 = ndimage.label(m)
    for i in range(1, n2 + 1):
        c_ = lab2 == i
        if (c_ & cw).sum() > .7 * c_.sum(): m[c_] = False  # kontur üstündeki hayalet çizgi
    m = ndimage.binary_dilation(m, iterations=1)
    if not m.any(): print('BOŞ', k); continue
    ys, xs = np.where(m); x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    sub = a2[y0:y1, x0:x1]; mm = m[y0:y1, x0:x1]; d = diff[y0:y1, x0:x1]
    alpha = np.clip(d / 70, 0, 1) * mm
    bsub = base[y0:y1, x0:x1]
    ratio = np.clip(sub / np.maximum(bsub, 1), 0, 1)  # mürekkep oranı: her ten tonunda multiply ile doğru koyulaşır
    layer = np.dstack([ratio * 255, np.clip(alpha * 1.15, 0, 1) * 255])
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
js += '''function mtatSVG(keys,skinMaskSVG,skin){if(!keys.length)return '';const id='mt'+(++uid),fid=id+'f';const c=(skin||'#f1c9a5').replace('#',''),n=parseInt(c,16),r=((n>>16)/255).toFixed(3),g=((n>>8&255)/255).toFixed(3),b=((n&255)/255).toFixed(3);let s=`<defs><mask id="${id}">${skinMaskSVG}</mask><filter id="${fid}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${r} 0 0 0 0  0 ${g} 0 0 0  0 0 ${b} 0 0  0 0 0 1 0"/></filter></defs><g mask="url(#${id})">`;
 keys.forEach(k=>{const T=MTAT[k];s+=`<image href="${T.img}" x="${T.x}" y="${T.y}" width="${T.w}" height="${T.h}" preserveAspectRatio="none" filter="url(#${fid})"/>`});return s+'</g>'}
Object.entries(MTAT).forEach(([k,T])=>{if(!ACCS.some(a=>a.id===k))ACCS.push({id:k,n:T.n,p:%s,st:%s,grp:'dovme',g:'e'})});
'''
# fiyat/stil JS tarafında meta'dan
js = js.replace("p:%s,st:%s", "p:MTATP[k][0],st:MTATP[k][1]")
js += 'const MTATP=' + json.dumps({k: [m['p'], m['st']] for k, m in meta.items()}) + ';\n'
# ACCS push'u MTATP tanımından sonra çalışsın diye sona taşı
lines = js.split('\n'); push = [l for l in lines if l.startswith('Object.entries(MTAT)')]; lines = [l for l in lines if not l.startswith('Object.entries(MTAT)')] + push
open(f'{OUT}/mtat.js', 'w').write('\n'.join(lines) + '\n')
print('ok', list(meta))
