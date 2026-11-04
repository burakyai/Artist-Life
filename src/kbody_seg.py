"""Kadın kıyafetlerini (Canva üretimi, aynı kel yüz) gövde katmanına böler: kıyafet (olduğu gibi) + ten maskesi (ten rengine boyanır).
Kullanım: python3 kbody_seg.py <kel_yuz.png> <cikti_klasoru>"""
import sys, json, base64
from PIL import Image
import numpy as np
from scipy import ndimage
BASE, OUT = sys.argv[1], sys.argv[2]
UP = '/mnt/user-data/uploads/'
FILES = {'tisort': 'a11b10fb', 'baski': '0e0e59ce', 'hoodie': 'b0ec5571', 'gomlek': '53f1a847', 'esofman': '650acb16', 'elbise': '150741b4', 'hawaii': 'be0928a5',
         'kolej': 'ca32aec2', 'deri': 'e57a45a5', 'kadife': '00e9ea99', 'pullu': 'ca331a32', 'takim': '03d35d82', 'beyaz': 'b71fda6b', 'abiye': 'db69c1a7', 'smokin': '706f9f3a'}
SC = .055; OX = 15.24; OY = 10.36
base = np.asarray(Image.open(BASE).convert('RGB')).astype(float)
SKIN = np.array([244.6, 201.0, 166.2])
def facesil(a):
    bw = a.min(2) > 230; sat = a.max(2) - a.min(2)
    gray = (sat < 16) & (a.mean(2) > 85) & (a.mean(2) < 225) & ~bw
    lab, n = ndimage.label(gray); shirt = np.isin(lab, list(set(lab[-1, :]) - {0})); shirt = ndimage.binary_dilation(shirt, iterations=4)
    fg = ~bw & ~shirt; fg = ndimage.binary_opening(fg, iterations=1); l2, n2 = ndimage.label(fg); sz = ndimage.sum(fg, l2, range(1, n2 + 1))
    return ndimage.binary_fill_holes(l2 == (np.argmax(sz) + 1))
face = facesil(base)
face[880:] = False  # yüz görseli 890'da kesiliyor
def lips(a):
    m = (a[..., 0] > 170) & (a[..., 1] < 160) & (a[..., 2] < 170) & (a[..., 0] - a[..., 1] > 45); m[:250] = 0; m[800:] = 0; m[:, :400] = 0; m[:, 870:] = 0
    ys, xs = np.where(m); return xs.mean(), ys.mean()
bx, by = lips(base)
meta = {}
for k, f in FILES.items():
    a = np.asarray(Image.open(f'{UP}{f}-image.png').convert('RGB')).astype(float)
    lx, ly = lips(a); dx, dy = bx - lx, by - ly
    fshift = ndimage.shift(face.astype(float), (-dy, -dx), order=0) > .5
    fshift = ndimage.binary_erosion(fshift, iterations=3)
    fshift[int(700 - dy):] = False  # boyun gövdeye dahil (yüz görseliyle örtüşür, dikiş görünmez)
    white = a.min(2) > 232
    # arka plan: üst/sol/sağ kenarlara bağlı beyaz (alt kenara değen beyaz gömlek arka plan sayılmaz)
    wl, wn = ndimage.label(white); border = set(wl[0, :]) | set(wl[:, 0]) | set(wl[:, -1]); border.discard(0)
    bg = np.isin(wl, list(border))
    body = ~bg & ~fshift
    body[:int(700 - dy)] = False  # çenenin üstü asla gövde değil
    body = ndimage.binary_opening(body, iterations=2)
    lab, n = ndimage.label(body); sz = ndimage.sum(body, lab, range(1, n + 1)); body = lab == (np.argmax(sz) + 1)
    body = ndimage.binary_fill_holes(body)
    kk = (a / SKIN).mean(2); dev = np.abs(a - kk[..., None] * SKIN).max(2)
    skin = (dev < 20) & (kk > .45) & (kk < 1.12) & body
    skin = ndimage.binary_opening(skin, iterations=2)
    ys, xs = np.where(body); x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    sub = a[y0:y1, x0:x1]; bm = body[y0:y1, x0:x1]; sk = skin[y0:y1, x0:x1]; kv = kk[y0:y1, x0:x1]
    edge = np.clip((236 - sub.min(2)) / 30, 0, 1)
    sil = np.minimum(bm.astype(float), np.maximum(edge, ndimage.binary_erosion(bm, iterations=2)))
    # kıyafet katmanı: ten dışı pikseller olduğu gibi; ten pikselleri gölge olarak
    shade = np.clip(1 - kv, 0, 1)
    cloth = np.zeros(sub.shape[:2] + (4,)); cloth[..., :3] = np.where(sk[..., None], np.array([60, 30, 20])[None, None, :], sub)
    cloth[..., 3] = np.where(sk, shade * .85, 1.0) * sil * 255
    skmask = np.dstack([np.full(sk.shape + (3,), 255), ndimage.gaussian_filter(sk.astype(float), .8) * 255 * sil])
    w = x1 - x0; h = y1 - y0; sc = min(1, 480 / max(w, h)); W, H = int(w * sc), int(h * sc)
    Image.fromarray(np.clip(cloth, 0, 255).astype(np.uint8), 'RGBA').resize((W, H), Image.LANCZOS).save(f'{OUT}/b_{k}.webp', quality=86)
    Image.fromarray(np.clip(skmask, 0, 255).astype(np.uint8), 'RGBA').resize((W, H), Image.LANCZOS).save(f'{OUT}/b_{k}_sk.webp', quality=86)
    meta[k] = dict(x=round(float(OX + (x0 + dx) * SC), 2), y=round(float(OY + (y0 + dy) * SC), 2), w=round(float(w * SC), 2), h=round(float(h * SC), 2), bottom=int(y1 >= 1260))
    prev = np.full(a.shape, 255.); col = np.array([120, 78, 50.])
    S = np.zeros(a.shape[:2]); S[y0:y1, x0:x1] = skmask[..., 3] / 255; C = np.zeros(a.shape[:2] + (4,)); C[y0:y1, x0:x1] = cloth
    prev = prev * (1 - S[..., None]) + col * S[..., None]; prev = prev * (1 - C[..., 3:4]) + C[..., :3] * C[..., 3:4]
    Image.fromarray(prev.astype(np.uint8)).resize((316, 316)).save(f'{OUT}/b_{k}_prev.png')
json.dump(meta, open(f'{OUT}/bmeta.json', 'w'))
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
js = '/* ============ Kadın kıyafetleri 2.0: referans görsellerden kesilmiş gövde; kıyafet olduğu gibi, ten kısmı ten rengine boyanır ============ */\n'
js += 'const KBODY={' + ','.join(f'{k}:{{x:{m["x"]},y:{m["y"]},w:{m["w"]},h:{m["h"]},img:"data:image/webp;base64,{b64(f"{OUT}/b_{k}.webp")}",sk:"data:image/webp;base64,{b64(f"{OUT}/b_{k}_sk.webp")}"}}' for k, m in meta.items()) + '};\n'
js += '''function kbodySVG(o,skin){const B=KBODY[o],id='kb'+(++uid);const H=Math.max(B.h,82.5-B.y);/* alt kenarı viewBox dışına taşır */
 return `<defs><mask id="${id}"><image href="${B.sk}" x="${B.x}" y="${B.y}" width="${B.w}" height="${H}" preserveAspectRatio="none"/></mask></defs><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${H}" fill="${skin}" mask="url(#${id})"/><image href="${B.img}" x="${B.x}" y="${B.y}" width="${B.w}" height="${H}" preserveAspectRatio="none"/>`}
'''
open(f'{OUT}/kbody.js', 'w').write(js)
print('ok', meta)
