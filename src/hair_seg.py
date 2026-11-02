from PIL import Image,ImageFilter;import numpy as np,base64,io,json
from scipy import ndimage as nd
im=np.array(Image.open('/mnt/user-data/uploads/ed0d9b6a-image.jpg').convert('RGB')).astype(int)
xs=[8,193,378,563,748,932];ys=[988,1191,1394]
names=['twist','dread','mohawk','mullet','curtain','wolf','spiky','afro','orgu','skinfade','undercut','bukle','topuz','kel']
W,H=177,200;CUT=103
MAXY={'twist':120,'mohawk':120,'spiky':120,'orgu':120,'skinfade':120,'undercut':120,'bukle':125,'topuz':120,'curtain':135,'afro':165,'mullet':142,'wolf':150,'dread':200,'kel':0}
out={};prev=[]
for i,n in enumerate(names):
    r,c=divmod(i,6);x,y=xs[c],ys[r]
    a=im[y:y+H,x:x+W];R,G,B=a[...,0],a[...,1],a[...,2]
    lum=.2126*R+.7152*G+.0722*B
    skin=(R>140)&(R-B>45)&(G>85)
    neutral=(abs(R-G)<7)&(abs(G-B)<7)
    bg=neutral&(R<45)
    text=(R>170)&(G>170)&(B>170)
    cand=~bg&~skin&~text
    # face span per row (below cutoff)
    keep=np.zeros_like(cand)
    for yy in range(H):
        row=cand[yy]
        if yy<CUT: keep[yy]=row;continue
        s=np.where(skin[yy])[0]
        if len(s): 
            L,Rr=s.min()-8,s.max()+8
            m=row.copy();m[max(0,L):Rr+1]=False;keep[yy]=m
        else: keep[yy]=row if yy<150 else False
    # above cutoff remove components fully surrounded by skin (forehead lines): keep components touching bg
    lab,nl=nd.label(keep)
    bgd=nd.binary_dilation(bg,iterations=2)
    good=np.zeros(nl+1,bool)
    for k in range(1,nl+1):
        comp=lab==k
        if comp.sum()>=50 and (comp&bgd).any(): good[k]=True
    m=good[lab]
    m=nd.binary_closing(m,iterations=2)&~skin|m
    nearskin=nd.binary_dilation(skin,iterations=5)
    if n=='orgu': nearskin[:96]=False
    m=m&~(nearskin&(lum<45))
    m=m&~(nd.binary_dilation(skin,iterations=3)&(lum>80))
    m[MAXY[n]:]=False
    lab,nl=nd.label(m);sz=nd.sum(m,lab,range(1,nl+1))
    for k,s_ in enumerate(sz,1):
        if s_<40:m[lab==k]=False
    # do not keep text; label strip at bottom: drop rows>178 inside face span already removed
    if n=='orgu':
        reg=nd.binary_fill_holes(nd.binary_closing(m,iterations=4))
        reg[MAXY[n]:]=False
        gap=reg&~m
        a=a.copy();a[gap]=[48,31,23];m=reg
    al=(m*255).astype(float)
    if n=='dread':
        for yy in range(150,H): al[yy]*=max(0,1-(yy-150)/45)
    alpha=Image.fromarray(al.astype('uint8')).filter(ImageFilter.GaussianBlur(.6))
    rgba=Image.fromarray(a.astype('uint8')).convert('RGBA');rgba.putalpha(alpha)
    buf=io.BytesIO();rgba.save(buf,'WEBP',quality=82,method=6);b=buf.getvalue()
    out[n]='data:image/webp;base64,'+base64.b64encode(b).decode()
    hl=lum[m];print(n,len(b),'px',int(m.sum()),'meanlum',round(hl.mean(),1) if m.sum() else 0)
    prev.append(rgba)
# preview sheet
sh=Image.new('RGBA',(W*7,H*2),(60,140,60,255))
for i,p in enumerate(prev): sh.alpha_composite(p,((i%7)*W,(i//7)*H))
sh.save('/tmp/hairsheet.png')
json.dump(out,open('/tmp/himg.json','w'))
