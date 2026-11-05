"""Erkek kıyafetlerini (Canva üretimi, aynı kel yüz) gövde katmanına böler: kıyafet (olduğu gibi) + ten maskesi (ten rengine boyanır).
Kullanım: python3 kbody_seg.py <kel_yuz.png> <cikti_klasoru>"""
import sys, json, base64
from PIL import Image
import numpy as np
from scipy import ndimage
BASE, OUT = sys.argv[1], sys.argv[2]
UP = '/mnt/user-data/uploads/'
FILES = {'baski': 'cbe8628c', 'esofman': 'b2054843', 'hoodie': '56877037', 'gomlek': 'ace8b6a8', 'hawaii': 'c1015932', 'kolej': '29b76545', 'deri': '8b575178', 'kadife': '231c345f',
         'takim': '9417dce9', 'pullu': '01973faf', 'smokin': '3117b553', 'beyaz': '0857b02c', 'forma': '7aa2a069', 'kurk': 'd6dd3f28', 'sisme': '91006c4d', 'bomber': '18455518',
         'kas': 'cf99ee9d', 'arabesk': '6e28c62b', 'mavipul': '0e9fe429', 'trenc': 'f3b445ce'}
SC = .062; OX = 10.88; OY = 9.16
base = np.asarray(Image.open(BASE).convert('RGB')).astype(float)
SKIN = np.array([241.5, 193.0, 160.5])
def facesil(a):
    bw = a.min(2) > 230; sat = a.max(2) - a.min(2)
    gray = (sat < 16) & (a.mean(2) > 85) & (a.mean(2) < 225) & ~bw
    lab, n = ndimage.label(gray); shirt = np.isin(lab, list(set(lab[-1, :]) - {0})); shirt = ndimage.binary_dilation(shirt, iterations=4)
    fg = ~bw & ~shirt; fg = ndimage.binary_opening(fg, iterations=1); l2, n2 = ndimage.label(fg); sz = ndimage.sum(fg, l2, range(1, n2 + 1))
    return ndimage.binary_fill_holes(l2 == (np.argmax(sz) + 1))
face = facesil(base)
face[840:] = False
def lips(a):
    """hizalama çapası: (yüz merkezi x, çene çizgisi y) — dudak renginden daha güvenilir"""
    nw = a.min(2) < 230; row = nw[400]; xs = np.where(row)[0]; cx = (xs.min() + xs.max()) / 2
    dark = a.mean(2) < 60; chin = 680
    for y in range(630, 780):
        if dark[y, 600:660].mean() > .5: chin = y; break
    return cx, chin
bx, by = lips(base)
meta = {}
for k, f in FILES.items():
    a = np.asarray(Image.open(f'{UP}{f}-image.png').convert('RGB')).astype(float)
    lx, ly = lips(a); dx, dy = bx - lx, by - ly
    fshift = ndimage.shift(face.astype(float), (-dy, -dx), order=0) > .5
    # çene bandı (640-700): yüz görselinin çene çizgisi gövdedekini örtsün diye gövdeden 6 px pay ile çıkarılır; 700'den aşağısı (boyun, yaka) gövdede kalır
    fshift[int(700 - dy):] = False
    fshift = ndimage.binary_dilation(fshift, iterations=6)
    fring = fshift.copy(); fring[:int(640 - dy)] = False  # ten maskesine eklenecek bant (yüz orada görünsün, delik kalmasın)
    white = a.min(2) > 232
    # arka plan: üst/sol/sağ kenarlara bağlı beyaz (alt kenara değen beyaz gömlek arka plan sayılmaz)
    wl, wn = ndimage.label(white); border = set(wl[0, :]) | set(wl[:, 0]) | set(wl[:, -1]); border.discard(0)
    bg = np.isin(wl, list(border))
    body = ~bg & ~fshift
    pass
    body = ndimage.binary_opening(body, iterations=2)
    lab, n = ndimage.label(body); sz = ndimage.sum(body, lab, range(1, n + 1)); body = lab == (np.argmax(sz) + 1)
    body = ndimage.binary_fill_holes(body)
    kk = (a / SKIN).mean(2); dev = np.abs(a - kk[..., None] * SKIN).max(2)
    skin = (dev < 20) & (kk > .45) & (kk < 1.12) & body
    skin = ndimage.binary_opening(skin, iterations=2)
    ys, xs = np.where(body | fring); x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    sub = a[y0:y1, x0:x1]; bm = body[y0:y1, x0:x1]; sk = skin[y0:y1, x0:x1]; kv = kk[y0:y1, x0:x1]
    edge = np.clip((236 - sub.min(2)) / 30, 0, 1)
    sil = np.minimum(bm.astype(float), np.maximum(edge, ndimage.binary_erosion(bm, iterations=2)))
    # kıyafet katmanı: ten dışı pikseller olduğu gibi; ten pikselleri gölge olarak
    shade = np.clip(1 - kv, 0, 1)
    cloth = np.zeros(sub.shape[:2] + (4,)); cloth[..., :3] = np.where(sk[..., None], np.array([60, 30, 20])[None, None, :], sub)
    cloth[..., 3] = np.where(sk, shade * .85, 1.0) * sil * 255
    skd = ndimage.binary_dilation(sk, iterations=9)  # maske kenarında dikiş olmasın
    skm = np.maximum(ndimage.gaussian_filter(skd.astype(float), .8) * sil, fring[y0:y1, x0:x1].astype(float))  # çene bandı dahil
    skmask = np.dstack([np.full(sk.shape + (3,), 255), skm * 255])
    w = x1 - x0; h = y1 - y0; sc = min(1, 480 / max(w, h)); W, H = int(w * sc), int(h * sc)
    Image.fromarray(np.clip(cloth, 0, 255).astype(np.uint8), 'RGBA').resize((W, H), Image.LANCZOS).save(f'{OUT}/m_{k}.webp', quality=86)
    Image.fromarray(np.clip(skmask, 0, 255).astype(np.uint8), 'RGBA').resize((W, H), Image.LANCZOS).save(f'{OUT}/m_{k}_sk.webp', lossless=True)
    meta[k] = dict(x=round(float(OX + (x0 + dx) * SC), 2), y=round(float(OY + (y0 + dy) * SC), 2), w=round(float(w * SC), 2), h=round(float(h * SC), 2), bottom=int(y1 >= 1260))
    prev = np.full(a.shape, 255.); col = np.array([120, 78, 50.])
    S = np.zeros(a.shape[:2]); S[y0:y1, x0:x1] = skmask[..., 3] / 255; C = np.zeros(a.shape[:2] + (4,)); C[y0:y1, x0:x1] = cloth
    prev = prev * (1 - S[..., None]) + col * S[..., None]; prev = prev * (1 - C[..., 3:4]) + C[..., :3] * C[..., 3:4]
    Image.fromarray(prev.astype(np.uint8)).resize((316, 316)).save(f'{OUT}/m_{k}_prev.png')
json.dump(meta, open(f'{OUT}/mmeta.json', 'w'))
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
js = '/* ============ Erkek kıyafetleri 2.0: referans görsellerden kesilmiş gövde; kıyafet olduğu gibi, ten kısmı ten rengine boyanır ============ */\n'
js += 'const MBODY={' + ','.join(f'{k}:{{x:{m["x"]},y:{m["y"]},w:{m["w"]},h:{m["h"]},img:"data:image/webp;base64,{b64(f"{OUT}/m_{k}.webp")}",sk:"data:image/webp;base64,{b64(f"{OUT}/m_{k}_sk.webp")}"}}' for k, m in meta.items()) + '};\n'
js += '''function mbodySVG(o,skin){const B=MBODY[o],id='mb'+(++uid);const H=Math.max(B.h,82.5-B.y);/* alt kenarı viewBox dışına taşır */
 return `<defs><mask id="${id}"><image href="${B.sk}" x="${B.x}" y="${B.y}" width="${B.w}" height="${H}" preserveAspectRatio="none"/></mask></defs><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${H}" fill="${skin}" mask="url(#${id})"/><image href="${B.img}" x="${B.x}" y="${B.y}" width="${B.w}" height="${H}" preserveAspectRatio="none"/>`}
'''
open(f'{OUT}/mbody.js', 'w').write(js)
print('ok', meta)
