"""Kadın saç modellerini (Canva üretimi, aynı kel yüz) yüzden ayırıp sil/det katmanlarına böler.
Kullanım: python3 khair_seg.py <kel_yuz.png> <cikti_klasoru>  (dosya eşlemesi FILES içinde)"""
import sys, json, base64
from PIL import Image
import numpy as np
from scipy import ndimage
BASE, OUT = sys.argv[1], sys.argv[2]
UP = '/mnt/user-data/uploads/'
FILES = {'k_duz': 'aabb9944', 'k_bob': '8f0c9108', 'k_dalga': 'dddb7cfc', 'k_kuyruk': '69bc1943', 'k_afro': 'bb4d5136', 'k_topuz': '0b30fa24',
         'k_orgu': '6dba85dc', 'k_pixie': '0248bbb2', 'k_kivircik': '281452da', 'k_cifttopuz': 'cb4a9c9e', 'k_kahkul': '394b8ea6', 'k_lob': '7b48b79b'}
NAMES = {'k_duz': 'Uzun düz', 'k_bob': 'Küt bob', 'k_dalga': 'Uzun dalgalı', 'k_kuyruk': 'At kuyruğu', 'k_afro': 'Afro', 'k_topuz': 'Topuz',
         'k_orgu': 'Box braid', 'k_pixie': 'Pixie', 'k_kivircik': 'Kıvırcık', 'k_cifttopuz': 'Çift topuz', 'k_kahkul': 'Uzun kahküllü', 'k_lob': 'Kısa dalgalı'}
SC = .055; OX = 15.24; OY = 10.36  # görsel px → oyun birimi
base = np.asarray(Image.open(BASE).convert('RGB')).astype(float)
bw = base.min(2) > 230; sat = base.max(2) - base.min(2)
gray = (sat < 16) & (base.mean(2) > 85) & (base.mean(2) < 225) & ~bw
lab, n = ndimage.label(gray); shirt = np.isin(lab, list(set(lab[-1, :]) - {0})); shirt = ndimage.binary_dilation(shirt, iterations=4)
fg = ~bw & ~shirt; fg = ndimage.binary_opening(fg, iterations=1); l2, n2 = ndimage.label(fg); sz = ndimage.sum(fg, l2, range(1, n2 + 1))
face = ndimage.binary_erosion(ndimage.binary_fill_holes(l2 == (np.argmax(sz) + 1)), iterations=6)
def lips(a):
    m = (a[..., 0] > 170) & (a[..., 1] < 160) & (a[..., 2] < 170) & (a[..., 0] - a[..., 1] > 45); m[:300] = 0; m[800:] = 0; m[:, :400] = 0; m[:, 870:] = 0
    ys, xs = np.where(m); return xs.mean(), ys.mean()
bx, by = lips(base)
meta = {}
for k, f in FILES.items():
    a = np.asarray(Image.open(f'{UP}{f}-image.png').convert('RGB')).astype(float)
    lx, ly = lips(a); dx, dy = bx - lx, by - ly
    fshift = ndimage.shift(face.astype(float), (-dy, -dx), order=0) > .5
    v = a.mean(2); diff = np.abs(a - base).max(2)
    brow = ((a[..., 0] - a[..., 2]) >= 9) & (v < 60)  # kaş rengi (kahverengimsi), saç nötr siyah
    m0 = (v < 150) & (diff > 45) & ~brow
    m = ndimage.binary_opening(m0, iterations=5); m = ndimage.binary_dilation(m, iterations=5) & m0
    m = ndimage.binary_closing(m, iterations=6)
    filled = ndimage.binary_fill_holes(m); holes = filled & ~m
    hl, hn = ndimage.label(holes); hs = ndimage.sum(holes, hl, range(1, hn + 1)); m = m | np.isin(hl, [i + 1 for i, s in enumerate(hs) if s < 2500])
    lab, n = ndimage.label(m); keep = []
    for i in range(1, n + 1):
        c = lab == i; s = c.sum()
        if s < 2000: continue
        inside = (c & fshift).sum()
        if inside > s * .6 and s < 12000: continue  # kaş/göz/dudak parçaları
        keep.append(i)
    m = np.isin(lab, keep)
    ys, xs = np.where(m); x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    sub = a[y0:y1, x0:x1]; mm = m[y0:y1, x0:x1]; vv = v[y0:y1, x0:x1]
    sil = ndimage.gaussian_filter(mm.astype(float), 1.0)
    light = np.clip((vv - 34) / 110, 0, 1); dark = np.clip((16 - vv) / 16, 0, 1)
    det = np.zeros(sub.shape[:2] + (4,)); det[..., :3] = np.where(light[..., None] > 0, 255, 0)
    det[..., 3] = np.where(light > 0, light * .55, dark * .8) * sil
    w = x1 - x0; h = y1 - y0; sc = min(1, 820 / max(w, h)); W, H = int(w * sc), int(h * sc)
    Image.fromarray(np.dstack([np.full(mm.shape + (3,), 255), sil * 255]).astype(np.uint8), 'RGBA').resize((W, H), Image.LANCZOS).save(f'{OUT}/{k}_sil.webp', quality=88)
    Image.fromarray(np.clip(det, 0, 255).astype(np.uint8), 'RGBA').resize((W, H), Image.LANCZOS).save(f'{OUT}/{k}_det.webp', quality=88)
    meta[k] = dict(n=NAMES[k], x=round(float(OX + (x0 + dx) * SC), 2), y=round(float(OY + (y0 + dy) * SC), 2), w=round(float(w * SC), 2), h=round(float(h * SC), 2))
json.dump(meta, open(f'{OUT}/meta.json', 'w'), ensure_ascii=False)
# JS modülü
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
js = '/* ============ Kadın saç modelleri 2.0: referans görsellerden kesilmiş, maske+detay katmanlı, her renge boyanır ============ */\n'
js += 'const KHAIR={' + ','.join(f'{k}:{{n:"{m["n"]}",x:{m["x"]},y:{m["y"]},w:{m["w"]},h:{m["h"]},sil:"data:image/webp;base64,{b64(f"{OUT}/{k}_sil.webp")}",det:"data:image/webp;base64,{b64(f"{OUT}/{k}_det.webp")}"}}' for k, m in meta.items()) + '};\n'
js += '''function khairFront(k,c){const H=KHAIR[k],id='kh'+(++uid);return `<defs><mask id="${id}"><image href="${H.sil}" x="${H.x}" y="${H.y}" width="${H.w}" height="${H.h}" preserveAspectRatio="none"/></mask></defs><rect x="${H.x}" y="${H.y}" width="${H.w}" height="${H.h}" fill="${c}" mask="url(#${id})"/><image href="${H.det}" x="${H.x}" y="${H.y}" width="${H.w}" height="${H.h}" preserveAspectRatio="none"/>`}
Object.keys(KHAIR).forEach(k=>{HAIR3[k]={n:KHAIR[k].n,g:'k',back:null,front:c=>khairFront(k,c)}});
/* kadın listesi: sadece yeni modeller */
HAIR_K.length=0;Object.keys(KHAIR).forEach(k=>HAIR_K.push([k,KHAIR[k].n]));
/* eski kadın saç anahtarlarını yeni modellere eşle (kayıtlı oyunlar ve rastgele üretim) */
const KHAIR_MAP={bob:'k_bob',kakul:'k_kahkul',uzundalga:'k_dalga',boxbraid:'k_orgu',spacebuns:'k_cifttopuz',yarimtopuz:'k_topuz',pixie:'k_pixie',wolf:'k_lob',curtain:'k_duz',afro:'k_afro',bukle:'k_kivircik',atkuyrugu:'k_kuyruk',uzun:'k_duz',sleekbun:'k_topuz',highpony:'k_kuyruk',curlylong:'k_kivircik',braids2:'k_orgu',longlayer:'k_dalga',shag:'k_lob'};
{const _av=avatarSVG2;avatarSVG2=function(L,age,opts){if(L&&L.g==='k'&&L.hair&&!KHAIR[L.hair]&&KHAIR_MAP[L.hair])L.hair=KHAIR_MAP[L.hair];return _av(L,age,opts)}}
'''
open(f'{OUT}/khair.js', 'w').write(js)
print('ok', {k: (m['x'], m['y']) for k, m in meta.items()})
