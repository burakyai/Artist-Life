"""Erkek takıları: atletli kel baz ile takılı görselin farkından takı katmanı (orijinal renklerle, kıyafet ve ten üstünde).
Kullanım: python3 mjew_seg.py <atlet_baz.png> <cikti_klasoru> <files.json>"""
import sys, json, base64
from PIL import Image
import numpy as np
from scipy import ndimage
BASE, OUT, FJ = sys.argv[1], sys.argv[2], sys.argv[3]
UP = '/mnt/user-data/uploads/'
FILES = json.load(open(FJ))
SC = .062; OX = 10.88; OY = 9.16
base = np.asarray(Image.open(BASE).convert('RGB')).astype(float)
EB = {}
for q in (1, 4):
    _bi = Image.fromarray(base.astype(np.uint8)); _bi = _bi.resize((_bi.size[0] // q, _bi.size[1] // q), Image.BILINEAR)
    EB[q] = (np.asarray(_bi.convert('L')) < 90).astype(np.float32)[60 // q:60 // q + 460 // q, 380 // q:380 // q + 510 // q]
zone = np.zeros(base.shape[:2], bool); zone[600:1264, 300:965] = True; zone[400:560, 360:905] = True  # boyun/göğüs + kulaklar
_dk = base.mean(2) < 110
ezone = np.zeros(base.shape[:2], bool); ezone[430:520, 400:470] = True; ezone[430:520, 795:865] = True
cw = ndimage.binary_dilation(_dk & ~ndimage.binary_opening(_dk, iterations=5), iterations=4)  # yalnız ince kontur çizgileri (atlet dolgusu değil)
meta = {}
for k, info in FILES.items():
    info['f'] = UP + info['f'] + '-image.png'
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
    diff = np.abs(a2 - base).max(2)
    m = (diff > (25 if info.get('ear') else 40)) & zone
    if info.get('ear'): m &= ezone
    m = ndimage.binary_opening(m, iterations=1)
    lab, n = ndimage.label(m)
    for i in range(1, n + 1):
        c_ = lab == i; s_ = c_.sum()
        if s_ < 25 or ((c_ & cw).sum() > .7 * s_ and not info.get('ear')): m[c_] = False
    m = ndimage.binary_closing(m, iterations=2)
    _h = ndimage.binary_fill_holes(m) & ~m; _hl, _hn = ndimage.label(_h); _hs = ndimage.sum(_h, _hl, range(1, _hn + 1)); m |= np.isin(_hl, [i + 1 for i, v in enumerate(_hs) if v < 400])  # yalnız küçük delikler (kolye halkasının içi değil)
    if not m.any(): print('BOŞ', k); continue
    al = ndimage.gaussian_filter(m.astype(float), .7)
    ys, xs = np.where(al > .05); x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    sub = a2[y0:y1, x0:x1]; A = al[y0:y1, x0:x1]
    Image.fromarray(np.dstack([sub, A * 255]).clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/j_{k}.webp', quality=90)
    meta[k] = dict(x=round(float(OX + x0 * SC), 2), y=round(float(OY + y0 * SC), 2), w=round(float((x1 - x0) * SC), 2), h=round(float((y1 - y0) * SC), 2), ear=int(y1 < 600))
    P = base.copy(); P[y0:y1, x0:x1] = P[y0:y1, x0:x1] * (1 - A[..., None]) + sub * A[..., None]
    Image.fromarray(P.astype(np.uint8)).resize((316, 316)).save(f'{OUT}/j_{k}_prev.png')
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
js = '/* ============ Erkek takıları 2.0: referans görsellerden; orijinal renk, kıyafetin üstünde ============ */\n'
js += 'const MJEW={' + ','.join(f'{k}:{{x:{m["x"]},y:{m["y"]},w:{m["w"]},h:{m["h"]},ear:{m["ear"]},img:"data:image/webp;base64,{b64(f"{OUT}/j_{k}.webp")}"}}' for k, m in meta.items()) + '};\n'
js += 'function mjewSVG(keys){return keys.map(k=>{const J=MJEW[k];return `<image href="${J.img}" x="${J.x}" y="${J.y}" width="${J.w}" height="${J.h}" preserveAspectRatio="none"/>`}).join("")}\n'
open(f'{OUT}/mjew.js', 'w').write(js)
print('ok', list(meta))
