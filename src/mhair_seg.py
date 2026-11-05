"""Erkek saçları: atletli kel baz ile saçlı görselin farkından saç katmanı (renk maskesi + çizgi/parlaklık), saç rengine boyanır.
Kullanım: python3 mhair_seg.py <atlet_baz.png> <cikti_klasoru> <files.json>   files.json: {"m_buzz":{"f":"<hash>","n":"Buzz cut"}}"""
import sys, json, base64
from PIL import Image
import numpy as np
from scipy import ndimage
BASE, OUT, FJ = sys.argv[1], sys.argv[2], sys.argv[3]
UP = '/mnt/user-data/uploads/'; FILES = json.load(open(FJ))
SC = .062; OX = 10.88; OY = 9.16
base = np.asarray(Image.open(BASE).convert('RGB')).astype(float)
Eb = (base.mean(2) < 90)[300:680, 400:870].astype(np.float32)  # yüz bölgesi (saçtan etkilenmez) ile hizala
meta = {}
for k, info in FILES.items():
    _im = Image.open(UP + info['f'] + '-image.png').convert('RGBA'); _bg = Image.new('RGBA', _im.size, (254, 254, 254, 255)); _bg.alpha_composite(_im)
    a = np.asarray(_bg.convert('RGB')).astype(float)
    E = (a.mean(2) < 90).astype(np.float32); best = (1e18, 0, 0)
    for dy in range(-44, 45, 3):
        for dx in range(-20, 21, 3):
            d = np.abs(E[300 - dy:680 - dy, 400 - dx:870 - dx] - Eb).sum()
            if d < best[0]: best = (d, dx, dy)
    _, cx, cy = best
    for dy in range(cy - 3, cy + 4):
        for dx in range(cx - 3, cx + 4):
            d = np.abs(E[300 - dy:680 - dy, 400 - dx:870 - dx] - Eb).sum()
            if d < best[0]: best = (d, dx, dy)
    _, dx, dy = best
    a2 = np.roll(np.roll(a, dy, 0), dx, 1)
    diff = np.abs(a2 - base).max(2); v = a2.mean(2)
    m = (diff > 40) & (v < 140); m[int(info.get("ymax", 560)):] = False
    m = ndimage.binary_closing(m, iterations=4); m = ndimage.binary_opening(m, iterations=2)
    lo = ndimage.binary_opening(m, iterations=6); m[330:] = lo[330:]  # kulak/çene hizasında ince çizgi artıklarını at
    lab, n = ndimage.label(m); sz = ndimage.sum(m, lab, range(1, n + 1)); m = np.isin(lab, [i + 1 for i, s in enumerate(sz) if s > 3000])
    h_ = ndimage.binary_fill_holes(m) & ~m; hl, hn = ndimage.label(h_); hs = ndimage.sum(h_, hl, range(1, hn + 1)); m |= np.isin(hl, [i + 1 for i, s in enumerate(hs) if s < 3000])
    # --- yumuşak kaplama (alfa) + orijinal gölge/parlaklık detayları ---
    reg = ndimage.binary_dilation(m, iterations=4)
    bl = base.mean(2); al = a2.mean(2)
    alpha = np.clip((bl - al) / np.maximum(bl - 22, 1), 0, 1)
    alpha[bl < 90] = m[bl < 90]            # bazdaki çizgilerin üstünde maskeye güven
    alpha[m] = np.maximum(alpha[m], .97 * (al[m] < 110))
    alpha = np.where(m & (al < 150), np.maximum(alpha, ndimage.binary_erosion(m, iterations=2) * 1.0), alpha)
    bgm = bl > 240; alpha[bgm] = np.clip((254 - al[bgm]) / 200, 0, 1)   # arka plan üstü: yalnız gerçek koyu piksel
    alpha[alpha < .08] = 0; alpha *= reg
    ys, xs = np.where(alpha > .05); x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    A = alpha[y0:y1, x0:x1]; Bc = base[y0:y1, x0:x1]; Ac = a2[y0:y1, x0:x1]
    Hp = (Ac - (1 - A[..., None]) * Bc) / np.maximum(A[..., None], .3)   # yalnız saçın rengi
    h = np.clip(Hp.mean(2), 0, 255)
    core = A > .9; med = float(np.median(h[core])) if core.any() else 25.0; med = max(med, 12.0)
    dark = np.clip(1 - h / med, 0, 1) * .85; lite = np.clip((h - med) / (255 - med), 0, 1) * .85
    lite[(A < .6) | (Ac.mean(2) > 140)] = 0   # kenar karışımlarını parlaklık sanma (gri yapma)
    sil = A
    det = np.zeros(A.shape + (4,)); det[..., :3] = np.where((lite > dark)[..., None], 255, 0)
    det[..., 3] = np.maximum(dark, lite) * A * 255
    mm = A > .05
    Image.fromarray(np.dstack([np.full(mm.shape + (3,), 255), sil * 255]).astype(np.uint8), 'RGBA').save(f'{OUT}/{k}_sil.webp', lossless=True)
    Image.fromarray(np.clip(det, 0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/{k}_det.webp', quality=88)
    meta[k] = dict(n=info['n'], x=round(float(OX + x0 * SC), 2), y=round(float(OY + y0 * SC), 2), w=round(float((x1 - x0) * SC), 2), h=round(float((y1 - y0) * SC), 2))
    P = base.copy(); S_ = np.zeros(base.shape[:2]); S_[y0:y1, x0:x1] = sil; P = P * (1 - S_[..., None]) + np.array([120, 70, 40]) * S_[..., None]
    Image.fromarray(P.astype(np.uint8)).resize((316, 316)).save(f'{OUT}/{k}_prev.png'); print(k, 'hiza', dx, dy)
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
js = '/* ============ Erkek saçları 2.0: referans görsellerden; saç rengine boyanır ============ */\n'
js += 'const MHAIR={' + ','.join(f'{k}:{{n:{json.dumps(m["n"], ensure_ascii=False)},x:{m["x"]},y:{m["y"]},w:{m["w"]},h:{m["h"]},sil:"data:image/webp;base64,{b64(f"{OUT}/{k}_sil.webp")}",det:"data:image/webp;base64,{b64(f"{OUT}/{k}_det.webp")}"}}' for k, m in meta.items()) + '};\n'
js += '''function mhairFront(k,c){const H=MHAIR[k],id='mh'+(++uid);return `<defs><mask id="${id}"><image href="${H.sil}" x="${H.x}" y="${H.y}" width="${H.w}" height="${H.h}" preserveAspectRatio="none"/></mask></defs><rect x="${H.x}" y="${H.y}" width="${H.w}" height="${H.h}" fill="${c}" mask="url(#${id})"/><image href="${H.det}" x="${H.x}" y="${H.y}" width="${H.w}" height="${H.h}" preserveAspectRatio="none"/>`}
Object.keys(MHAIR).reverse().forEach(k=>{HAIR3[k]={n:MHAIR[k].n,g:'e',back:null,front:c=>mhairFront(k,c)};if(!HAIR_E.some(x=>x[0]===k))HAIR_E.unshift([k,MHAIR[k].n])});
/* kaldırılan eski saçlar → yeni karşılıkları */
const MHAIR_DEL='''+json.dumps({v['rep']:k for k,v in FILES.items() if v.get('rep')})+''';
Object.keys(MHAIR_DEL).forEach(k=>{const i=HAIR_E.findIndex(x=>x[0]===k);if(i>=0)HAIR_E.splice(i,1)});
{const _AV0=AV;AV=function(L,age,opts){if(L&&L.g!=='k'&&MHAIR_DEL[L.hair]&&MHAIR[MHAIR_DEL[L.hair]])L.hair=MHAIR_DEL[L.hair];return _AV0(L,age,opts)}}
'''
open(f'{OUT}/mhair.js', 'w').write(js); print('ok', list(meta))
