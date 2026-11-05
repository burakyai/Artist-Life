"""Kel kadın referans görselinden yüz katmanları: sil (ten maskesi) + det (çizgi/göz/dudak/gölge). Boyun gövde görselinden gelir; yüz çene altında biter."""
import sys, base64, re
from PIL import Image
import numpy as np
from scipy import ndimage
BASE, OUT, JS = sys.argv[1], sys.argv[2], sys.argv[3]
X0, X1, Y0, Y1 = 330, 935, 30, 765
im = Image.open(BASE).convert('RGB'); a = np.asarray(im).astype(float)
base = np.array([244.6, 201.0, 166.2]); a = a[Y0:Y1, X0:X1]
k = (a / base).mean(2); dev = np.abs(a - k[..., None] * base).max(2)
skin = (dev < 20) & (k > .45) & (k < 1.12); white = a.min(2) > 230
fg = ~white; fg = ndimage.binary_opening(fg, iterations=1)
lab2, n2 = ndimage.label(fg); sizes = ndimage.sum(fg, lab2, range(1, n2 + 1)); fg = lab2 == (np.argmax(sizes) + 1); fg = ndimage.binary_fill_holes(fg)
sil = np.zeros(a.shape[:2]); sil[fg] = 1
edge = np.clip((235 - a.min(2)) / 40, 0, 1); sil = np.minimum(sil, np.maximum(edge, ndimage.binary_erosion(fg, iterations=2)))
# alt kenar: boyun kesiti yumuşak bitsin (son 18 px'te alpha azalır) — altındaki gövde boynuyla kaynaşır
fade = np.ones(a.shape[0]); fade[-18:] = np.linspace(1, 0, 18); sil = sil * fade[:, None]
# --- ten tonu katmanları ---
# det: mutlak renkli pikseller (çizgiler, kaş, göz bebeği/akı, ruj) — her tonda aynı kalır
# tint: geri kalan her şey (ten gölgeleri, dudak, burun, kulak içi) baz tene ORANI olarak; oyunda ten rengiyle çarpılır (multiply)
B_ = np.array([244.6, 201.0, 166.2])
mn = a.mean(2); sat = a.max(2) - a.min(2)
absol = (mn < 95) | ((a.min(2) > 185) & (sat < 38) & ~skin)
absol |= ((a[..., 0] - a[..., 1]) > 55) & (a[..., 0] > 175) & ~skin  # ruj
absol &= fg
aw = np.clip((150 - mn) / 55, 0, 1); aw = np.where(mn < 95, np.maximum(aw, .85), 1.0)  # çizgi kenarları yumuşak
det_a = np.where(absol, aw, 0) * sil
ratio = np.clip(a / B_, 0, 1)
ratio = np.where(absol[..., None], 1.0, ratio)
# (gizli alana beyaz yazma: yeniden boyutlandırmada kenara sızıyor)
rgb = a; alpha = det_a
def save(arr, name):
    im = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), 'RGBA').resize((560, int(560 * arr.shape[0] / arr.shape[1])), Image.LANCZOS)
    im.save(name, quality=90, lossless=name.endswith('sil.webp'))
save(np.dstack([rgb, alpha * 255]), f'{OUT}/det.webp'); save(np.dstack([ratio * 255, sil * 255]), f'{OUT}/tint.webp'); save(np.dstack([np.full(a.shape[:2] + (3,), 255), sil * 255]), f'{OUT}/sil.webp')
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
s = open(JS).read()
s = re.sub(r"sil:'data:image/webp;base64,'\+'[^']*'", "sil:'data:image/webp;base64,'+'%s'" % b64(f'{OUT}/sil.webp'), s)
s = re.sub(r"det:'data:image/webp;base64,'\+'[^']*'", "det:'data:image/webp;base64,'+'%s'" % b64(f'{OUT}/det.webp'), s)
if "tint:'data" in s: s = re.sub(r"tint:'data:image/webp;base64,'\+'[^']*'", "tint:'data:image/webp;base64,'+'%s'" % b64(f'{OUT}/tint.webp'), s)
else: s = re.sub(r"(det:'data:image/webp;base64,'\+'[^']*')", lambda m: m.group(1) + ",tint:'data:image/webp;base64,'+'%s'" % b64(f'{OUT}/tint.webp'), s, count=1)
s = re.sub(r"const X=33\.4,Y=12,W=33\.3,H=[0-9.]+;", "const X=33.4,Y=12,W=33.3,H=%.2f;" % ((Y1 - Y0) * .055), s)
open(JS, 'w').write(s); print('ok H=', (Y1 - Y0) * .055)
