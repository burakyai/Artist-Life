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
("s+=G(hair2(L.hair,hc));","s+=G(hair2(L.hair,hc)+hairM(L.hair,hc));"),
("if(age>=58&&!['gri','beyaz'].includes(L.hairColor))hc=age>=72?HCOL.beyaz:HCOL.gri;","if(age>=58&&!['gri','beyaz'].includes(L.hairColor))hc=age>=72?HCOL.beyaz:HCOL.gri;const bc=(window.NATHC&&!window.NATHC.includes(L.hairColor)&&age<58)?'#3a2a20':hc;"),
("fill=\"${hc}\" stroke=\"${OL2}\" stroke-width=\".3\"/>`","fill=\"${bc}\" stroke=\"${OL2}\" stroke-width=\".3\"/>`"),
("fill=\"${hc}\" stroke=\"${OL2}\" stroke-width=\".35\"/>","fill=\"${bc}\" stroke=\"${OL2}\" stroke-width=\".35\"/>"),
("if(adult)s+=beard2(L.beard,hc);","if(adult)s+=beard2(L.beard,bc);"),
("s+=G(`<path d=\"M44.2 44 L43.8 56.4 Q50 59.6 56.2 56.4 L55.8 44Z\" fill=\"${skin}\"/>`)+`<path d=\"M44.1 47 Q50 54 55.9 47 L56 51.4 Q50 56 44 51.4Z\" fill=\"${sd}\"/><path d=\"M53.4 52 L54.4 57\" stroke=\"${sd}\" stroke-width=\".8\"/>`;",
 "s+=G(`<path d=\"M46.4 44 Q45.6 50 44.6 56.6 Q50 59.8 55.4 56.6 Q54.4 50 53.6 44Z\" fill=\"${skin}\"/>`)+`<path d=\"M46.2 46 Q50 53.4 53.8 46 L54.2 50.8 Q50 55.4 45.8 50.8Z\" fill=\"${sd}\" opacity=\".9\"/><path d=\"M53 52.4 L53.8 57\" stroke=\"${sd}\" stroke-width=\".7\"/>`;"),
("<g clip-path=\"url(#${id}nk)\">${neckTat(accs)}</g>","<g clip-path=\"url(#${id}nk)\"><g transform=\"translate(50 1) scale(.76 1) translate(-50 0)\">${neckTat(accs)}</g></g>"),
("<clipPath id=\"${id}nk\"><path d=\"M44.3 44 L43.9 56.3 Q50 59.4 56.1 56.3 L55.7 44Z\"/>","<clipPath id=\"${id}nk\"><path d=\"M46.4 44 Q45.6 50 44.6 56.6 Q50 59.8 55.4 56.6 Q54.4 50 53.6 44Z\"/>")]
for a,b in reps:
    assert av.count(a)==1,a
    av=av.replace(a,b)
g=open('game.js').read();u=open('ui.js').read()
k='/* ============ Avatar uzantıları'
js=g.split(k)[0]+'/* ============ Avatar (Mafia Life Simulator çizim motoru) ============ */\n'+av+'\n'+k+g.split(k)[1]+'\n'+open('style.js').read()+'\n'+u+'\n'+open('songui.js').read()+'\n'+open('ext.js').read()+'\n'+open('extui.js').read()+'\n'+open('q.js').read()+'\n'+open('qui.js').read()+'\n'+open('label.js').read()+'\n'+open('amt.js').read()+'\n'+open('rights.js').read()+'\n'+open('slots.js').read()+'\n'+open('theme.js').read()+'\n'+open('events2.js').read()+'\n'+open('bulk.js').read()+'\n'+open('big.js').read()+'\n'+open('all.js').read()+'\n'+open('fix.js').read()+'\n'+open('sell.js').read()+'\n'+open('biz.js').read()+'\n'+open('lab2.js').read()+'\n'+open('style2.js').read()+'\n'+open('zoom.js').read()+'\n'+open('world.js').read()+'\n'+open('inf.js').read()+'\n'+open('love.js').read()+'\n'+open('skin.js').read()+'\n'+open('feat.js').read()+'\n'+open('ceo2.js').read()+'\n'+open('tax.js').read()+'\n'+open('fr.js').read()+'\n'+open('more2.js').read()+'\n'+open('co.js').read()+'\n'+open('album.js').read()+'\n'+open('bank.js').read()+'\n'+open('fame2.js').read()+'\n'+open('entitle.js').read()+'\n'+open('exch.js').read()+'\n'+open('ctry2.js').read()+'\n'+open('wrap.js').read()+'\n'+open('pro.js').read()+'\n'+open('real.js').read()+'\n'+open('hair3.js').read()+'\n'+open('hairimg.js').read()+'\n'+open('master.js').read()+'\n'+open('quick.js').read()+'\n'+open('titles.js').read()+'\n'+open('cover2.js').read()+'\n'+open('labexp.js').read()+'\n'+open('jobcrime.js').read()+'\n'+open('streamcap.js').read()+'\n'+open('school.js').read()+'\n'+open('botfarm.js').read()+'\n'+open('events3.js').read()
sh=open('shell.html').read().replace('__JS__',js)
m=re.search(r"const IC=\{(.*?)\};",u,re.S).group(1)
for k2,v in re.findall(r"(\w+):'(<svg.*?</svg>)'",m): sh=sh.replace('__IC_'+k2.upper()+'__',v)
import time
sh=sh.replace('__APPV__',time.strftime('%Y.%m.%d-%H%M%S'))
open('index.html','w').write(sh)
