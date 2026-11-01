import re
av=open('/tmp/avatar.js').read()
reps=[("s+=G(body2(o,(L.oc||{})[o]));","s+=tat2Neck(accs,id)+G(bodyM(o,(L.oc||{})[o]));"),
("if(adult&&L.beard!=='tam'&&L.beard!=='boxed')","if(adult&&L.g!=='k'&&L.beard!=='tam'&&L.beard!=='boxed')"),
("s+=ey(44.4,1,'e1')+ey(55.6,-1,'e2');","s+=ey(44.4,1,'e1')+ey(55.6,-1,'e2');if(L.g==='k')s+=femFace(hc);"),
("  s+=sad?`<path d=\"M40.6 28.6","  s+=L.g==='k'?'':sad?`<path d=\"M40.6 28.6"),
("  s+=sad?`<path d=\"M46.8 43.4","  s+=L.g==='k'?FLIPS:sad?`<path d=\"M46.8 43.4"),
("return s+'</svg>';","return s+accM(L,accs)+'</svg>';"),
("<path d=\"M45 39.4 Q44.2 41.6 45.2 43.8 M55 39.4 Q55.8 41.6 54.8 43.8\" stroke=\"${sd}\" stroke-width=\".55\" fill=\"none\"/>`;","`+(adult&&!['yok','ince'].includes(L.beard)?'':`<path d=\"M45 39.4 Q44.2 41.6 45.2 43.8 M55 39.4 Q55.8 41.6 54.8 43.8\" stroke=\"${sd}\" stroke-width=\".55\" fill=\"none\"/>`);"),
("  s+=`<path d=\"M47.8 44 Q50 45.6 52.2 44 Q50 44.6 47.8 44Z\" fill=\"${sdd}\" opacity=\".55\"/>`;","  if(!(adult&&!['yok','ince','biyik','palakalin'].includes(L.beard)))s+=`<path d=\"M47.8 44 Q50 45.6 52.2 44 Q50 44.6 47.8 44Z\" fill=\"${sdd}\" opacity=\".55\"/>`;"),
("s+=G(hair2Back(L.hair,hc));","s+=G(hair2Back(L.hair,hc)+hairMBack(L.hair,hc));"),
("s+=G(hair2(L.hair,hc));","s+=G(hair2(L.hair,hc)+hairM(L.hair,hc));")]
for a,b in reps:
    assert av.count(a)==1,a
    av=av.replace(a,b)
g=open('game.js').read();u=open('ui.js').read()
k='/* ============ Avatar uzantıları'
js=g.split(k)[0]+'/* ============ Avatar (Mafia Life Simulator çizim motoru) ============ */\n'+av+'\n'+k+g.split(k)[1]+'\n'+open('style.js').read()+'\n'+u+'\n'+open('songui.js').read()+'\n'+open('ext.js').read()+'\n'+open('extui.js').read()+'\n'+open('q.js').read()+'\n'+open('qui.js').read()+'\n'+open('label.js').read()+'\n'+open('amt.js').read()+'\n'+open('rights.js').read()+'\n'+open('slots.js').read()+'\n'+open('theme.js').read()+'\n'+open('events2.js').read()+'\n'+open('bulk.js').read()+'\n'+open('big.js').read()+'\n'+open('all.js').read()+'\n'+open('fix.js').read()+'\n'+open('sell.js').read()+'\n'+open('biz.js').read()+'\n'+open('lab2.js').read()+'\n'+open('style2.js').read()+'\n'+open('zoom.js').read()+'\n'+open('world.js').read()+'\n'+open('inf.js').read()+'\n'+open('love.js').read()+'\n'+open('skin.js').read()+'\n'+open('feat.js').read()+'\n'+open('ceo2.js').read()+'\n'+open('tax.js').read()+'\n'+open('fr.js').read()+'\n'+open('more2.js').read()+'\n'+open('co.js').read()+'\n'+open('album.js').read()
sh=open('shell.html').read().replace('__JS__',js)
m=re.search(r"const IC=\{(.*?)\};",u,re.S).group(1)
for k2,v in re.findall(r"(\w+):'(<svg.*?</svg>)'",m): sh=sh.replace('__IC_'+k2.upper()+'__',v)
import time
sh=sh.replace('__APPV__',time.strftime('%Y.%m.%d-%H%M%S'))
open('index.html','w').write(sh)
