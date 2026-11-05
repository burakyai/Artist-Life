"""Kel erkek referans görselinden yüz katmanları: sil (ten maskesi) + det (çizgi/göz/dudak/gölge). Boyun gövde görselinden gelir; yüz çene altında biter."""
import sys, base64, re
from PIL import Image
import numpy as np
from scipy import ndimage
BASE, OUT, JS = sys.argv[1], sys.argv[2], sys.argv[3]
X0, X1, Y0, Y1 = 370, 895, 45, 706
im = Image.open(BASE).convert('RGB'); a = np.asarray(im).astype(float)
base = np.array([241.5, 193.0, 160.5]); a = a[Y0:Y1, X0:X1]
k = (a / base).mean(2); dev = np.abs(a - k[..., None] * base).max(2)
skin = (dev < 20) & (k > .45) & (k < 1.12); white = a.min(2) > 230
fg = ~white
fg = ndimage.binary_opening(fg, iterations=1)
lab2, n2 = ndimage.label(fg); sizes = ndimage.sum(fg, lab2, range(1, n2 + 1)); fg = lab2 == (np.argmax(sizes) + 1); fg = ndimage.binary_fill_holes(fg)
sil = np.zeros(a.shape[:2]); sil[fg] = 1
edge = np.clip((235 - a.min(2)) / 40, 0, 1); sil = np.minimum(sil, np.maximum(edge, ndimage.binary_erosion(fg, iterations=2)))
# alt kenar: çene konturunu izle. Kontur = kalın siyah çizgi; her sütunda, dudak altı (y>=640 orijinal) bölgesinde
# ten renginden siyaha geçişin ilk satırı. Yanlarda (çene köşesi dışı) kontur yukarı kıvrılır, orada da aynı kural çalışır.
dark = (a.mean(2) < 60)
Y_START = 640 - Y0
chin_line = np.full(a.shape[1], -1, dtype=int)
for x in range(a.shape[1]):
    xo = x + X0; ys0 = Y_START if 545 <= xo <= 715 else 470 - Y0  # yanlarda çene çizgisi daha yukarıda başlar (ağız bölgesi hariç)
    col = dark[ys0:, x]
    runs = np.where(col)[0]
    if len(runs):
        for r in runs:
            if col[r:r + 3].all(): chin_line[x] = ys0 + r; break
valid = chin_line >= 0
# çene köşelerinin dışında (yüz silüeti yok) sütunlar: tamamen gövdeye bırak
xs_face = np.where(valid)[0]
L_, R_ = xs_face.min(), xs_face.max()
rows = np.arange(a.shape[0])[:, None]
cut = np.full(a.shape[1], a.shape[0], dtype=int)   # kontur bulunamayan sütun: kesme
ok_ = valid & (chin_line < 730 - Y0)               # çene bandı dışı (daha aşağı) tespitler geçersiz
cut[ok_] = chin_line[ok_] + 7                      # konturun 7 px altına kadar yüz katmanı (kontur dahil)
# ok_ olmayan ama yüz silüeti içindeki sütunlarda komşudan enterpole et
idx = np.where(ok_)[0]
if len(idx):
    xi = np.arange(a.shape[1]); inner = (xi >= idx.min()) & (xi <= idx.max())
    cut = np.where(inner, np.interp(xi, idx, cut[idx]), Y_START).astype(int)  # çene dışı: çene köşesi hizasında bitir
    # yüz genişliği (y=620'deki dış kontur): bunun dışındaki her şey (omuz/boyun çizgileri) y=640'ta biter
    rowd = np.where(dark[620 - Y0])[0]; fl, fr = rowd.min() - 2, rowd.max() + 2
sil[rows > cut[None, :]] = 0
_d = cut[None, :] - rows; sil = sil * np.where(_d >= 0, np.clip(_d / 5, 0, 1), 1)  # alt kenarı 5 px yumuşat
# --- ten tonu katmanları ---
# det: mutlak renkli pikseller (çizgiler, kaş, göz bebeği/akı) — her tonda aynı kalır
# tint: geri kalan her şey (ten gölgeleri, dudak, burun, kulak içi) baz tene ORANI olarak; oyunda ten rengiyle çarpılır (multiply)
B_ = np.array([241.5, 193.0, 160.5])
mn = a.mean(2); sat = a.max(2) - a.min(2)
absol = (mn < 95) | ((a.min(2) > 185) & (sat < 38) & ~skin)
pass
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
s = re.sub(r"const X=[0-9.]+,Y=[0-9.]+,W=[0-9.]+,H=[0-9.]+;", "const X=%.2f,Y=%.2f,W=%.2f,H=%.2f;" % (10.88 + X0 * .062, 9.16 + Y0 * .062, (X1 - X0) * .062, (Y1 - Y0) * .062), s)
open(JS, 'w').write(s); print('ok H=', (Y1 - Y0) * .055)
