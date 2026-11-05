"""Kel erkek referans görselinden yüz katmanları: sil (ten maskesi) + det (çizgi/göz/dudak/gölge). Boyun gövde görselinden gelir; yüz çene altında biter."""
import sys, base64, re
from PIL import Image
import numpy as np
from scipy import ndimage
BASE, OUT, JS = sys.argv[1], sys.argv[2], sys.argv[3]
X0, X1, Y0, Y1 = 370, 895, 45, 735
im = Image.open(BASE).convert('RGB'); a = np.asarray(im).astype(float)
base = np.array([241.5, 193.0, 160.5]); a = a[Y0:Y1, X0:X1]
k = (a / base).mean(2); dev = np.abs(a - k[..., None] * base).max(2)
skin = (dev < 20) & (k > .45) & (k < 1.12); white = a.min(2) > 230
fg = ~white; fg[640 - Y0:, :110] = False; fg[640 - Y0:, 425:] = False  # atlet askıları dışarı
fg = ndimage.binary_opening(fg, iterations=1)
lab2, n2 = ndimage.label(fg); sizes = ndimage.sum(fg, lab2, range(1, n2 + 1)); fg = lab2 == (np.argmax(sizes) + 1); fg = ndimage.binary_fill_holes(fg)
sil = np.zeros(a.shape[:2]); sil[fg] = 1
edge = np.clip((235 - a.min(2)) / 40, 0, 1); sil = np.minimum(sil, np.maximum(edge, ndimage.binary_erosion(fg, iterations=2)))
# alt kenar: boyun kesiti yumuşak bitsin (son 18 px'te alpha azalır) — altındaki gövde boynuyla kaynaşır
fade = np.ones(a.shape[0]); fade[-18:] = np.linspace(1, 0, 18); sil = sil * fade[:, None]
sk = skin & fg; shade = np.clip(1 - k, 0, 1) * fg
alpha = np.where(sk, shade * 0.85, fg * 1.0) * sil
rgb = np.where(sk[..., None], np.array([60, 30, 20])[None, None, :], a)
def save(arr, name):
    Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), 'RGBA').resize((560, int(560 * arr.shape[0] / arr.shape[1])), Image.LANCZOS).save(name, quality=90)
save(np.dstack([rgb, alpha * 255]), f'{OUT}/det.webp'); save(np.dstack([np.full(a.shape[:2] + (3,), 255), sil * 255]), f'{OUT}/sil.webp')
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
s = open(JS).read()
s = re.sub(r"sil:'data:image/webp;base64,'\+'[^']*'", "sil:'data:image/webp;base64,'+'%s'" % b64(f'{OUT}/sil.webp'), s)
s = re.sub(r"det:'data:image/webp;base64,'\+'[^']*'", "det:'data:image/webp;base64,'+'%s'" % b64(f'{OUT}/det.webp'), s)
s = re.sub(r"const X=[0-9.]+,Y=[0-9.]+,W=[0-9.]+,H=[0-9.]+;", "const X=%.2f,Y=%.2f,W=%.2f,H=%.2f;" % (10.88 + X0 * .062, 9.16 + Y0 * .062, (X1 - X0) * .062, (Y1 - Y0) * .062), s)
open(JS, 'w').write(s); print('ok H=', (Y1 - Y0) * .055)
