"""Erkek sakalları: atletli kel baz ile sakallı görselin farkından sakal katmanı (renk maskesi + parlaklık/çizgi detayı).
Sakal saç rengine boyanır. Kullanım: python3 mbeard_seg.py <atlet_baz.png> <cikti_klasoru> <files.json>
files.json: {"kirli": {"f": "<upload hash>", "n": "Kirli sakal"}, ...}"""
import sys, json, base64
from PIL import Image
import numpy as np
from scipy import ndimage
BASE, OUT, FJ = sys.argv[1], sys.argv[2], sys.argv[3]
UP = '/mnt/user-data/uploads/'
FILES = json.load(open(FJ))
SC = .062; OX = 10.88; OY = 9.16
SKIN = np.array([241.5, 193.0, 160.5])
base = np.asarray(Image.open(BASE).convert('RGB')).astype(float)


def anchor(a):
    """yüz merkezi x ve göz hizası y (kaşlar sakaldan etkilenmez)"""
    nw = a.min(2) < 230
    row = nw[400]; xs = np.where(row)[0]; cx = (xs.min() + xs.max()) / 2
    dark = a.mean(2) < 60
    ys = np.where(dark[250:420, int(cx) - 120:int(cx) - 40].any(1))[0]  # sol kaş
    return cx, 250 + (ys.min() if len(ys) else 0)


bx, by = anchor(base)
# yüz bölgesi (sakal yalnız burada olabilir): yanaklar, dudak çevresi, çene, çene altı
face_zone = np.zeros(base.shape[:2], bool); face_zone[440:780, 420:845] = True
meta = {}
for k, info in FILES.items():
    a = np.asarray(Image.open(f'{UP}{info["f"]}-image.png').convert('RGB')).astype(float)
    ax_, ay_ = anchor(a); dx, dy = bx - ax_, by - ay_
    a2 = ndimage.shift(a, (dy, dx, 0), order=1, mode='nearest')
    diff = np.abs(a2 - base).max(2)
    v = a2.mean(2)
    # sakal: bazdan farklı ve tenden koyu (siyah/koyu kahve tüy)
    kk = (a2 / SKIN).mean(2)
    m = (diff > 30) & (v < 150) & face_zone
    m = ndimage.binary_opening(m, iterations=1)
    m = ndimage.binary_closing(m, iterations=3)
    lab, n = ndimage.label(m); sz = ndimage.sum(m, lab, range(1, n + 1))
    m = np.isin(lab, [i + 1 for i, s in enumerate(sz) if s > 120])
    if not m.any(): print('BOŞ', k); continue
    # yumuşak kenar: kirli sakal gibi seyrek olanlarda fark miktarına göre saydamlık
    dens = np.clip((diff - 20) / 90, 0, 1) * np.clip((170 - v) / 120, 0, 1)
    dens = ndimage.gaussian_filter(dens, .8)
    alpha = np.where(m, np.maximum(dens, .0), 0)
    alpha = np.where(ndimage.binary_erosion(m, iterations=3), np.maximum(alpha, .92), alpha)  # gövde dolu
    ys, xs = np.where(alpha > .02); x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    sub = a2[y0:y1, x0:x1]; al = alpha[y0:y1, x0:x1]; vv = v[y0:y1, x0:x1]
    # detay: parlak tel ayrımları (açık renk) + dış çizgi (koyu)
    light = np.clip((vv - 40) / 100, 0, 1) * ndimage.binary_erosion(al > .5, iterations=3)
    dist = ndimage.distance_transform_edt(al > .5)
    outline = np.clip((4 - dist) / 2, 0, 1) * (al > .5)
    det = np.zeros(sub.shape[:2] + (4,)); det[..., :3] = np.where(light[..., None] > .05, 255, 18)
    det[..., 3] = np.where(light > .05, light * .35, outline * .55) * 255
    sil = np.dstack([np.full(al.shape + (3,), 255), al * 255])
    w = x1 - x0; h = y1 - y0
    Image.fromarray(np.clip(sil, 0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/s_{k}_sil.webp', lossless=True)
    Image.fromarray(np.clip(det, 0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/s_{k}_det.webp', quality=88)
    meta[k] = dict(n=info['n'], x=round(float(OX + x0 * SC), 2), y=round(float(OY + y0 * SC), 2), w=round(float(w * SC), 2), h=round(float(h * SC), 2))
    P = base.copy(); P[y0:y1, x0:x1] = P[y0:y1, x0:x1] * (1 - al[..., None]) + np.array([40, 28, 20]) * al[..., None]
    Image.fromarray(P.astype(np.uint8)).resize((316, 316)).save(f'{OUT}/s_{k}_prev.png')
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
js = '/* ============ Erkek sakalları 2.0: referans görsellerden fark alınarak; saç rengine boyanır ============ */\n'
js += 'const MBEARD={' + ','.join(f'{k}:{{n:{json.dumps(m["n"], ensure_ascii=False)},x:{m["x"]},y:{m["y"]},w:{m["w"]},h:{m["h"]},sil:"data:image/webp;base64,{b64(f"{OUT}/s_{k}_sil.webp")}",det:"data:image/webp;base64,{b64(f"{OUT}/s_{k}_det.webp")}"}}' for k, m in meta.items()) + '};\n'
js += '''function mbeardSVG(k,c){const B=MBEARD[k],id='bd'+(++uid);return `<defs><mask id="${id}"><image href="${B.sil}" x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" preserveAspectRatio="none"/></mask></defs><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" fill="${c}" mask="url(#${id})"/><image href="${B.det}" x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" preserveAspectRatio="none"/>`}
'''
open(f'{OUT}/mbeard.js', 'w').write(js)
print('ok', list(meta))
