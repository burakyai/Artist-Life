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
    a = np.asarray(Image.open(UP + info['f'] + '-image.png').convert('RGB')).astype(float)
    E = (a.mean(2) < 90).astype(np.float32); best = (1e18, 0, 0)
    for dy in range(-14, 15):
        for dx in range(-14, 15):
            d = np.abs(E[300 - dy:680 - dy, 400 - dx:870 - dx] - Eb).sum()
            if d < best[0]: best = (d, dx, dy)
    _, dx, dy = best
    a2 = np.roll(np.roll(a, dy, 0), dx, 1)
    diff = np.abs(a2 - base).max(2); v = a2.mean(2)
    m = (diff > 40) & (v < 140); m[int(info.get("ymax", 560)):] = False
    m = ndimage.binary_closing(m, iterations=4); m = ndimage.binary_opening(m, iterations=2)
    lab, n = ndimage.label(m); sz = ndimage.sum(m, lab, range(1, n + 1)); m = np.isin(lab, [i + 1 for i, s in enumerate(sz) if s > 3000])
    h_ = ndimage.binary_fill_holes(m) & ~m; hl, hn = ndimage.label(h_); hs = ndimage.sum(h_, hl, range(1, hn + 1)); m |= np.isin(hl, [i + 1 for i, s in enumerate(hs) if s < 3000])
    ys, xs = np.where(m); x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    mm = m[y0:y1, x0:x1]; vv = v[y0:y1, x0:x1]
    sil = ndimage.gaussian_filter(mm.astype(float), 1.0)
    light = np.clip((vv - 34) / 110, 0, 1) * ndimage.binary_erosion(mm, iterations=6)
    dist = ndimage.distance_transform_edt(mm); outline = np.clip((11 - dist) / 4, 0, 1) * mm
    det = np.zeros(mm.shape + (4,)); det[..., :3] = np.where(light[..., None] > .05, 255, 20)
    det[..., 3] = np.where(light > .05, light * .38, outline * .9) * sil * 255
    Image.fromarray(np.dstack([np.full(mm.shape + (3,), 255), sil * 255]).astype(np.uint8), 'RGBA').save(f'{OUT}/{k}_sil.webp', lossless=True)
    Image.fromarray(np.clip(det, 0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/{k}_det.webp', quality=88)
    meta[k] = dict(n=info['n'], x=round(float(OX + x0 * SC), 2), y=round(float(OY + y0 * SC), 2), w=round(float((x1 - x0) * SC), 2), h=round(float((y1 - y0) * SC), 2))
    P = base.copy(); S_ = np.zeros(base.shape[:2]); S_[y0:y1, x0:x1] = sil; P = P * (1 - S_[..., None]) + np.array([200, 60, 120]) * S_[..., None]
    Image.fromarray(P.astype(np.uint8)).resize((316, 316)).save(f'{OUT}/{k}_prev.png'); print(k, 'hiza', dx, dy)
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
js = '/* ============ Erkek saçları 2.0: referans görsellerden; saç rengine boyanır ============ */\n'
js += 'const MHAIR={' + ','.join(f'{k}:{{n:{json.dumps(m["n"], ensure_ascii=False)},x:{m["x"]},y:{m["y"]},w:{m["w"]},h:{m["h"]},sil:"data:image/webp;base64,{b64(f"{OUT}/{k}_sil.webp")}",det:"data:image/webp;base64,{b64(f"{OUT}/{k}_det.webp")}"}}' for k, m in meta.items()) + '};\n'
js += '''function mhairFront(k,c){const H=MHAIR[k],id='mh'+(++uid);return `<defs><mask id="${id}"><image href="${H.sil}" x="${H.x}" y="${H.y}" width="${H.w}" height="${H.h}" preserveAspectRatio="none"/></mask></defs><rect x="${H.x}" y="${H.y}" width="${H.w}" height="${H.h}" fill="${c}" mask="url(#${id})"/><image href="${H.det}" x="${H.x}" y="${H.y}" width="${H.w}" height="${H.h}" preserveAspectRatio="none"/>`}
Object.keys(MHAIR).forEach(k=>{HAIR3[k]={n:MHAIR[k].n,g:'e',back:null,front:c=>mhairFront(k,c)};if(!HAIR_E.some(x=>x[0]===k))HAIR_E.unshift([k,MHAIR[k].n])});
/* kaldırılan eski saçlar → yeni karşılıkları */
const MHAIR_DEL={crew:'m_buzz'};
Object.keys(MHAIR_DEL).forEach(k=>{const i=HAIR_E.findIndex(x=>x[0]===k);if(i>=0)HAIR_E.splice(i,1)});
{const _AV0=AV;AV=function(L,age,opts){if(L&&L.g!=='k'&&MHAIR_DEL[L.hair]&&MHAIR[MHAIR_DEL[L.hair]])L.hair=MHAIR_DEL[L.hair];return _AV0(L,age,opts)}}
'''
open(f'{OUT}/mhair.js', 'w').write(js); print('ok', list(meta))
