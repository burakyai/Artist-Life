import re
av=open('avatar-mafia.js').read()
reps=[("s+=G(body2(o,(L.oc||{})[o]));","s+=G(bodyM(o,(L.oc||{})[o]));"),
("if(adult&&L.beard!=='tam'&&L.beard!=='boxed')","if(adult&&L.g!=='k'&&L.beard!=='tam'&&L.beard!=='boxed')"),
("s+=ey(44.4,1,'e1')+ey(55.6,-1,'e2');","s+=ey(44.4,1,'e1')+ey(55.6,-1,'e2');if(L.g==='k')s+=femFace(hc);"),
("  s+=sad?`<path d=\"M40.6 28.6","  s+=L.g==='k'?'':sad?`<path d=\"M40.6 28.6"),
("  s+=sad?`<path d=\"M46.8 43.4","  s+=L.g==='k'?FLIPS:sad?`<path d=\"M46.8 43.4"),
("return s+'</svg>';","return s+accM(L,accs)+'</svg>';"),
("s+=G(hair2Back(L.hair,hc));","s+=G(hair2Back(L.hair,hc)+hairMBack(L.hair,hc));"),
("s+=G(hair2(L.hair,hc));","s+=G(hair2(L.hair,hc)+hairM(L.hair,hc));")]
for a,b in reps:
    assert av.count(a)==1,a
    av=av.replace(a,b)
g=open('game.js').read();u=open('ui.js').read()
k='/* ============ Avatar uzantıları'
js=g.split(k)[0]+'/* ============ Avatar (Mafia Life Simulator çizim motoru) ============ */\n'+av+'\n'+k+g.split(k)[1]+'\n'+open('style.js').read()+'\n'+u+'\n'+open('songui.js').read()+'\n'+open('ext.js').read()+'\n'+open('extui.js').read()+'\n'+open('q.js').read()+'\n'+open('qui.js').read()+'\n'+open('label.js').read()+'\n'+open('amt.js').read()+'\n'+open('rights.js').read()
sh=open('shell.html').read().replace('__JS__',js)
m=re.search(r"const IC=\{(.*?)\};",u,re.S).group(1)
for k2,v in re.findall(r"(\w+):'(<svg.*?</svg>)'",m): sh=sh.replace('__IC_'+k2.upper()+'__',v)
open('index.html','w').write(sh)
