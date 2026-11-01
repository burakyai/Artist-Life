/* ============ Arkadaşları sanatçı ve ünlü yapma ============ */
const frFix=f=>{if(f.type==='sanatci'){f.genre=f.genre&&GENRES[f.genre]?f.genre:pick(Object.keys(GENRES));if(f.fame==null)f.fame=R(5,20)}if(f.fame==null)f.fame=0;return f};
const _pEd12=ACT.pEd;ACT.pEd=(kind,id,k,v)=>{if(!S.star)return;const p=findP(kind,id);if(!p)return;
 if(k==='fame'){p.fame=clamp(v==='full'?100:(p.fame||0)+v);drawSheet();return}
 _pEd12(kind,id,k,v);if(k==='type')frFix(p);drawSheet()};
const _pE12=pEditor;pEditor=function(kind,id){let h=_pE12(kind,id);if(!S.star||!(kind==='fr'||kind==='p'))return h;const p=findP(kind,id);if(!p)return h;frFix(p);
 const row2=`<div class="ngr"><div><b>Şöhret</b><span>${Math.round(p.fame||0)} / 100</span></div><div class="stp"><button onclick="ACT.pEd('${kind}',${id},'fame',-10)">−10</button><button onclick="ACT.pEd('${kind}',${id},'fame',10)">+10</button><button onclick="ACT.pEd('${kind}',${id},'fame','full')">Full</button></div></div>`;
 h=h.replace(/<div class="ngr"><div><b>Şöhret<\/b><span>[\d.]+<\/span><\/div><div class="stp">[\s\S]*?<\/div><\/div>/,'');const i=h.indexOf(note('Tip'));return i>=0?h.slice(0,i)+row2+h.slice(i):h+row2};
/* süperstar olmadan: destek ol, ünlü yap, şirketine imzalat */
ACT.frArtist=id=>{const f=S.friends.find(x=>x.id===id);if(!f)return;const c=FS(150000);if(!pay(c))return;if(!useM(1))return;
 if(S.star||ch(.35+f.yak/200)){f.type='sanatci';f.genre=S.genre||pick(Object.keys(GENRES));f.fame=R(5,15);f.yak=clamp(f.yak+10);log(`🎤 ${f.name}'e stüdyo ve hoca ayarladın; artık o da bir ${GENRES[f.genre].n.toLowerCase()} sanatçısı!`,'gold')}else{f.yak=clamp(f.yak+3);log(`${f.name} müziği denedi ama "bu iş bana göre değil" dedi.`,'dim')}drawSheet()};
ACT.frFame=id=>{const f=frFix(S.friends.find(x=>x.id===id));if(!f)return;const c=FS(300000)*(1+(f.fame||0)/50);if(!pay(c))return;if(!useM(1))return;
 const g=S.star?100-f.fame:R(3,8)+Math.round(S.fame/25);f.fame=clamp(f.fame+g);f.yak=clamp(f.yak+5);log(`🌟 ${f.name} için PR, sahne ve sosyal medya kampanyası yaptın: şöhreti ${Math.round(f.fame)}.`,'good');drawSheet()};
ACT.frFeat=id=>{const f=frFix(S.friends.find(x=>x.id===id));if(!f)return;if(!useM(1))return;S.feat=f.name;S.featBoost=1+Math.max(f.fame,10)/90;f.fame=clamp(f.fame+Math.round(S.fame/10)+2);f.yak=clamp(f.yak+6);log(`🎤 ${f.name} ile düet kararı aldınız; senin şöhretin onu da yükseltti (şöhreti ${Math.round(f.fame)}).`,'good');drawSheet()};
ACT.frSign=id=>{const f=frFix(S.friends.find(x=>x.id===id));if(!f||!S.lab)return;if(S.lab.arts.length>=labCap()){toast('Şirketin dolu.');return}if(S.lab.arts.some(a=>a.fr===f.id)){toast('Zaten şirketinde.');return}
 const a=mkArt({name:f.name,g:f.g,look:pLook(f,'fr'),genre:f.genre,tal:clamp(40+(f.fame||0)*.5+R(0,15)),fol:Math.round(Math.pow(10,2.5+(f.fame||0)/100*4.5)),type:'sadik',happy:90,fr:f.id});a.con={adv:0,roy:30,yrs:4,reqS:8,rec:false,left:4,del:0,unrec:0};S.lab.arts.push(a);f.yak=clamp(f.yak+10);log(`📀 Arkadaşın ${f.name}, ${S.lab.n}'a imza attı!`,'gold');drawSheet()};
const _shF12=shFriend;shFriend=function(id){const f=S.friends.find(x=>x.id===id);if(f)frFix(f);let h=_shF12(id);if(!f)return h;
 let add=sec('Müzik kariyeri');if(f.type!=='sanatci')add+=row(`ACT.frArtist(${id})`,'🎤','Sanatçı olmasına destek ol',`Stüdyo ve hoca ayarla · ${fmtS(FS(150000))} · şans yakınlığa bağlı`,'1 hak');
 else add+=row(`ACT.frFame(${id})`,'🌟','Ünlü olmasına yardım et',`PR ve sahne kampanyası · şöhreti ${Math.round(f.fame)} · ${fmtS(FS(300000)*(1+(f.fame||0)/50))}`,'1 hak')+row(`ACT.frFeat(${id})`,'🎶','Birlikte düet yap','Senin şöhretin onu da yükseltir','1 hak')+(S.lab?row(`ACT.frSign(${id})`,'📀','Şirketine imzalat',S.lab.arts.some(a=>a.fr===f.id)?'Şirketinde':'Avanssız, sadık sanatçı olarak','',S.lab.arts.some(a=>a.fr===f.id)):'');
 if(f.type!=='sanatci')add+=row(`ACT.frFame(${id})`,'🌟','Ünlü yap (influencer)',`PR kampanyası · şöhreti ${Math.round(f.fame||0)}`,'1 hak');
 const i=h.indexOf(sec('⭐ Süperstar: düzenle'));return i>=0?h.slice(0,i)+add+h.slice(i):h+add};
actKeep();
