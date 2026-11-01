/* ============ Plak şirketi 2: transfer, CEO, yayıncılık, dağıtım, alt markalar, yetenek yarışması, festival ve toplama albüm, krizler, satın alma, yan gelirler ============ */
const LP={t:'lab',title:'Şirketim'};
const lsub=(t,title)=>`sheet('kariyer',{t:'${t}',title:'${title}',par:{t:'lab',title:'Şirketim'}})`;
const _back5=back;back=function(){if(SUB&&SUB.par){SUB=SUB.par;drawSheet();return}if(SUB&&['art','labsale'].includes(SUB.t)){SUB=LP;drawSheet();return}if(SUB&&['cat','con','ven'].includes(SUB.t)){SUB={t:'biz',title:'İş dünyası'};drawSheet();return}_back5()};
function l2(){const L=S.lab;L.x=L.x||{tr:[],trOff:null,ceo:null,ceoC:[],pub:{wr:[],cat:[],tot:0},dist:{on:0,cl:[],tot:0},subs:[],show:null,fest:-1,comp:[],acq:[],acqd:[],fac:0,rent:0,side:0,award:[]};return L.x}
const labCap=()=>labBld().cap+(S.lab&&S.lab.x?S.lab.x.subs.length*3:0);
const _sa5=ACT.signArt;ACT.signArt=id=>{const L=S.lab,b=labBld(),c0=b.cap;b.cap=labCap();try{_sa5(id)}finally{b.cap=c0}};
const lcash=c=>{const L=S.lab;if(S.star)return true;if(L.cash<c){toast('Şirket kasası yetmiyor: '+fmtS(c));return false}L.cash-=c;return true};
const fullCap=()=>{if(S.lab.arts.length>=labCap()){toast('Şirketin dolu. Daha büyük bina al ya da alt marka kur.');return true}return false};
function mkArt(o){const g=o.g||(ch(.6)?'e':'k');return Object.assign({id:S.nid++,name:'',g,look:randLook(g),genre:pick(Object.keys(GENRES)),tal:50,fol:1e4,type:pick(Object.keys(ATYPES)),happy:80,demos:[],con:{adv:0,roy:25,yrs:3,reqS:6,rec:false,left:3,del:0,unrec:0},tot:0,earn:0},o)}

/* 1. Transfer piyasası */
function trMarket(){const X=l2();rivInit();X.tr=S.rivals.filter(r=>!r.signed).slice().sort((a,b)=>b.fame-a.fame).slice(0,8).map(r=>({rid:r.id,fee:Math.round((r.fame*r.fame*25000+5e6)*RF(.9,1.2)/1e5)*1e5}))}
ACT.trBuy=rid=>{const X=l2(),o=X.tr.find(x=>x.rid===rid),r=S.rivals.find(x=>x.id===rid);if(!o||!r||fullCap())return;if(!useM(1))return;
 if(!S.star&&!ch(clamp(.35+(labPop()-r.fame)/150+.2,.1,.85))){log(`${r.name} transfer teklifini reddetti: "Şu anki şirketimde mutluyum."`,'dim');drawSheet();return}if(!lcash(o.fee))return;
 const a=mkArt({name:r.name,g:r.g,look:r.look,genre:r.genre,tal:clamp(55+r.fame*.4),fol:Math.round(Math.pow(10,4+r.fame/100*3)),type:'yildiz',happy:85,con:{adv:o.fee,roy:35,yrs:4,reqS:8,rec:false,left:4,del:0,unrec:0}});
 S.lab.arts.push(a);r.signed=1;S.rivals=S.rivals.filter(x=>x!==r);X.tr=X.tr.filter(x=>x!==o);log(`🔁 Yılın transferi: ${r.name} ${fmtS(o.fee)} bonservisle ${S.lab.n}'a geçti!`,'gold');sJingle&&sJingle();drawSheet()};
function trOffer(){const X=l2(),L=S.lab;if(X.trOff||!L.arts.length)return;const a=[...L.arts].sort((x,y)=>y.fol-x.fol)[0];if(aFame(a)<35||!ch(.12))return;
 X.trOff={aid:a.id,b:pick(['Sony Music','Universal Music','Warner Music','DMC','ONErpm']),fee:Math.round(askBase(a).adv*RF(2.5,4.5)/1e5)*1e5};log(`📩 ${X.trOff.b}, ${a.name} için ${fmtS(X.trOff.fee)} bonservis teklif etti! (Şirket › Transfer)`,'gold')}
ACT.trSell=()=>{const X=l2(),o=X.trOff,L=S.lab,a=L.arts.find(x=>x.id===o.aid);X.trOff=null;if(!a){drawSheet();return}L.cash+=o.fee;L.arts=L.arts.filter(x=>x!==a);log(`${a.name} ${fmtS(o.fee)} bonservisle ${o.b}'a satıldı. Şirket kasası doldu.`,'good');drawSheet()};
ACT.trKeep=raise=>{const X=l2(),o=X.trOff,a=S.lab.arts.find(x=>x.id===o.aid);X.trOff=null;if(!a){drawSheet();return}if(raise){a.con.roy=Math.min(60,a.con.roy+8);a.happy=clamp(a.happy+20);log(`${a.name}'in telif payını %${a.con.roy}'e çıkardın, şirkette kaldı.`,'good')}else{a.happy=clamp(a.happy-25);if(!S.star&&ch(.35)){S.lab.arts=S.lab.arts.filter(x=>x!==a);log(`${a.name} teklifi reddetmene kızdı, sözleşmesini feshedip ${o.b}'a gitti!`,'bad')}else log(`${o.b}'ın teklifini reddettin. ${a.name} biraz küs.`,'dim')}drawSheet()};
function shTr(){const X=l2();if(!X.tr.length)trMarket();let h=note('Rakip sanatçılara bonservis teklif et. Başarı şansı şirketinin popülerliğine bağlı. Büyük şirketler de senin yıldızlarına teklif getirir.');
 if(X.trOff){const a=S.lab.arts.find(x=>x.id===X.trOff.aid);if(a)h+=`<div class="card"><div class="ch"><b>📩 ${esc(X.trOff.b)} → ${esc(a.name)}</b></div><div class="tk"><span>Bonservis teklifi</span><b class="gold">${fmtS(X.trOff.fee)}</b></div><div class="tabs wrap"><button class="tab sm" onclick="ACT.trSell()">Sat</button><button class="tab sm" onclick="ACT.trKeep(1)">Telifini artır, tut</button><button class="tab sm" onclick="ACT.trKeep(0)">Reddet</button></div></div>`}
 h+=sec(`Transfer listesi · ${S.lab.arts.length}/${labCap()} sanatçı`);X.tr.forEach(o=>{const r=S.rivals.find(x=>x.id===o.rid);if(r)h+=row(`ACT.trBuy(${r.id})`,`<span class="av sa">${AV(r.look,28)}</span>`,esc(r.name),`${GENRES[r.genre].n} · şöhret ${Math.round(r.fame)}`,S.star?'⭐ Bedava':fmtS(o.fee))});
 return h+row('l2().tr=[];trMarket();drawSheet()','🔄','Listeyi yenile','','')}

/* 2. CEO */
const CEOS=[['Selim Aksoy','agresif','Agresif büyüme: bütün demoları tanıtımla yayınlar, boş yerlere imza atar'],['Nermin Kaya','temkinli','Temkinli: sadece iyi demoları yayınlar, kasayı korur'],['Can Tekin','hit','Hit avcısı: 70+ demoları büyük tanıtımla yayınlar, hitlere klip çeker'],['Defne Arıkan','hit','Hit avcısı: 70+ demoları büyük tanıtımla yayınlar, hitlere klip çeker'],['Murat Ece','agresif','Agresif büyüme: bütün demoları tanıtımla yayınlar, boş yerlere imza atar'],['Leyla Okan','temkinli','Temkinli: sadece iyi demoları yayınlar, kasayı korur']];
function ceoCands(){const X=l2();X.ceoC=[...CEOS].sort(()=>Math.random()-.5).slice(0,3).map(c=>({n:c[0],st:c[1],d:c[2],lv:S.star?100:R(45,95),sal:0})).map(c=>(c.sal=Math.round((150000+c.lv*4000)/1e4)*1e4,c))}
ACT.ceoHire=i=>{const X=l2(),c=X.ceoC[i];if(!useM(1))return;X.ceo={...c,g:R(0,1)};log(`👔 ${c.n} ${S.lab.n}'ın CEO'su oldu. Maaş ${fmtS(c.sal)}/3 ay.`,'good');drawSheet()};
ACT.ceoFire=()=>{const X=l2();log(`${X.ceo.n} ile yollar ayrıldı. Tazminat ${fmtS(X.ceo.sal*2)}.`,'dim');S.lab.cash-=X.ceo.sal*2;X.ceo=null;drawSheet()};
function ceoTick(){const X=l2(),c=X.ceo,L=S.lab;if(!c)return;if(!S.star)L.cash-=c.sal;let rel=0,cl=0,sg=0;const sk=c.lv/100;
 L.arts.forEach(a=>a.demos.slice().forEach(d=>{const ok=c.st==='agresif'?d.q>=35:c.st==='temkinli'?d.q>=60-sk*10:d.q>=70-sk*8;if(!ok)return;const pi=c.st==='hit'?2:c.st==='agresif'?1:(d.q>=75?1:0),cost=[0,5e5,5e6][pi];if(L.cash<cost+(c.st==='temkinli'?2e7:0))return;
  const d0=drawSheet;drawSheet=()=>{};const l0=log;log=()=>{};try{ACT.relArt(a.id,d.id,pi)}finally{drawSheet=d0;log=l0}const s=L.songs[L.songs.length-1];if(s)s.pot*=1+sk*.25;rel++}));
 if(c.st!=='temkinli')L.songs.filter(s=>s.clip<=1&&(s.viral||s.lq>3e6)).forEach(s=>{const cc=Math.round(1500000*(hasLF('klip')?.5:1));if(L.cash>cc){L.cash-=cc;s.clip=2;s.pot*=1.3;cl++}});
 if(c.st==='agresif'&&L.arts.length<labCap()&&L.cash>3e7&&ch(.5)){const a=newCand();a.tal=clamp(a.tal+sk*20);const o=askBase(a);if(L.cash>o.adv){L.cash-=o.adv;a.con={adv:o.adv,roy:o.roy,yrs:3,reqS:6,rec:true,left:3,del:0,unrec:o.adv};L.arts.push(a);sg++}}
 L.arts.forEach(a=>{if(a.con.left<=1&&a.happy>40&&ch(sk))a.con.left+=2;a.happy=clamp(a.happy+sk*2)});
 if(rel||cl||sg)log(`👔 CEO ${c.n}: ${rel} şarkı yayınladı${cl?`, ${cl} klip çekti`:''}${sg?`, ${sg} yeni sanatçı imzaladı`:''}.`,'dim')}
function shCeo(){const X=l2();if(!X.ceoC.length)ceoCands();let h=note('CEO şirketi senin yerine yönetir: demoları yayınlar, klip çeker, sözleşmeleri uzatır. Sen başka işlerle uğraşırken şirket büyür.');
 if(X.ceo){const c=X.ceo;h+=`<div class="card"><div class="ch"><b>👔 ${esc(c.n)}</b><span class="pill">Yetenek ${c.lv}</span></div>${note(c.d+'<br>Maaş '+fmtS(c.sal)+'/3 ay + kârlı çeyreklerde %10 prim')}<button class="mini red" onclick="ACT.ceoFire()">Kov · tazminat ${fmtS(c.sal*2)}</button></div>`}
 else{h+=sec('Adaylar');X.ceoC.forEach((c,i)=>h+=row(`ACT.ceoHire(${i})`,'👔',`${c.n} · yetenek ${c.lv}`,c.d,S.star?'⭐ Bedava':fmtS(c.sal)+'/3 ay'));h+=row('ceoCands();drawSheet()','🔄','Yeni adaylar','','')}return h}

/* 3. Yayıncılık */
const WRN=['Sezen Ay','Ozan Kılıç','Gökhan Sel','Nazlı Ece','Bedirhan Yaz','Elif Ses','Tarık Nota','Melodi Kara'];
ACT.pubHire=()=>{const X=l2();if(X.pub.wr.length>=6){toast('En fazla 6 söz yazarı.');return}const lv=S.star?95:R(40,90),c=Math.round(lv*lv*600);if(!lcash(c))return;X.pub.wr.push({n:pick(WRN.filter(n=>!X.pub.wr.some(w=>w.n===n)))||'Yeni Kalem',lv,sal:Math.round(lv*8000)});log(`✍️ Yayıncılık kolun yeni söz yazarı aldı (yetenek ${lv}).`,'good');drawSheet()};
function pubTick(){const X=l2(),P=X.pub,L=S.lab;if(!P.wr.length)return;P.wr.forEach(w=>{if(!S.star)L.cash-=w.sal;if(P.cat.length<30)P.cat.push({id:S.nid++,t:genTitle(pick(Object.keys(GENRES))),q:clamp(Math.round(w.lv*.7+R(0,35))),by:w.n,sync:0})});
 const sy=P.cat.filter(s=>ch(.04+s.q/2000));sy.forEach(s=>{const t=pick([['dizi jeneriği',3e6],['reklam',5e6],['sinema filmi',8e6],['dijital dizi',4e6]]),v=Math.round(t[1]*(s.q/70)*RF(.6,1.4));L.cash+=v;P.tot+=v;s.sync++;log(`🎬 Yayıncılık: "${s.t}" bir ${t[0]}a lisanslandı, ${fmtS(v)} telif.`,'good')});
 const roy=L.lastQ?L.lastQ.gross*.05:0;L.cash+=roy;P.tot+=roy}
ACT.pubGive=(sid,aid)=>{const X=l2(),s=X.pub.cat.find(x=>x.id===sid),a=S.lab.arts.find(x=>x.id===aid);if(!s||!a)return;a.demos.push({id:S.nid++,t:s.t,q:clamp(Math.round((s.q+a.tal)/2+8))});X.pub.cat=X.pub.cat.filter(x=>x!==s);log(`"${s.t}" ${a.name}'e verildi, demo olarak hazır.`,'good');drawSheet()};
ACT.pubSell=sid=>{const X=l2(),s=X.pub.cat.find(x=>x.id===sid);if(!useM(1))return;const v=Math.round((s.q*s.q*800+2e5)*RF(.8,1.3)),b=pick(S.rivals||[{name:'bir sanatçı'}]).name;S.lab.cash+=v;X.pub.tot+=v;X.pub.cat=X.pub.cat.filter(x=>x!==s);log(`"${s.t}" ${b}'a ${fmtS(v)}'ye satıldı.`,'good');drawSheet()};
function shPub(){const P=l2().pub;let h=`<div class="hero2"><small>Yayıncılık kolu</small><div class="big">${fmtS(P.tot)}</div><span>${P.wr.length} söz yazarı · ${P.cat.length} şarkı bekliyor · şirket şarkılarından %5 yayın payı</span></div>`+note('Söz yazarların her 3 ayda şarkı yazar. Kendi sanatçına ver, rakiplere sat ya da dizi, reklam ve filmlere lisanslanmasını bekle.');
 h+=row('ACT.pubHire()','✍️','Söz yazarı işe al','Yetenekli yazarlar daha iyi şarkı yazar','');P.wr.forEach(w=>h+=row('','🖋',esc(w.n),`Yetenek ${w.lv} · maaş ${fmtS(w.sal)}/3 ay`,''));
 if(P.cat.length)h+=sec('Yazılan şarkılar');P.cat.slice(0,12).forEach(s=>{h+=`<div class="card"><div class="ch"><b>${esc(s.t)}</b><span class="pill">kalite ${s.q}${s.sync?' · 🎬'+s.sync:''}</span></div>${note('Yazan: '+esc(s.by))}<div class="tabs wrap">${S.lab.arts.slice(0,4).map(a=>`<button class="tab sm" onclick="ACT.pubGive(${s.id},${a.id})">→ ${esc(a.name.split(' ')[0])}</button>`).join('')}<button class="tab sm" onclick="ACT.pubSell(${s.id})">Rakibe sat · 1 hak</button></div></div>`});return h}

/* 4. Dağıtım hizmeti */
ACT.distOpen=()=>{const X=l2();if(!lcash(15e6))return;X.dist.on=1;log(`📦 ${S.lab.n} Dağıtım açıldı! Bağımsız sanatçılar şarkılarını senin üzerinden yayınlayabilir.`,'gold');drawSheet()};
ACT.distFind=()=>{const X=l2();if(!useM(1))return;const n=R(2,5)+Math.round(labPop()/30);for(let i=0;i<n;i++){const g=ch(.6)?'e':'k';X.dist.cl.push({id:S.nid++,n:(ch(.3)?pick(ASTAGE):'')+pick(g==='k'?AFIRST_K:AFIRST_E)+' '+pick(SURN),st:Math.round(Math.pow(10,RF(5,7.3))),g})}log(`📦 ${n} bağımsız sanatçı dağıtım sözleşmesi imzaladı.`,'good');drawSheet()};
function distTick(){const D=l2().dist,L=S.lab;if(!D.on)return;let inc=0;D.cl.forEach(c=>{c.st=Math.round(c.st*RF(.8,1.3));inc+=c.st*.135*.15});D.cl=D.cl.filter(c=>!ch(.05));inc=Math.round(inc);L.cash+=inc;D.tot+=inc;
 const star=D.cl.find(c=>c.st>5e7&&!c.up);if(star){star.up=1;log(`📦 Dağıtımdaki ${star.n} patladı: 3 ayda ${num(star.st)} dinlenme! Şirketine imzalatabilirsin.`,'gold')}}
ACT.distSign=id=>{const D=l2().dist,c=D.cl.find(x=>x.id===id);if(fullCap())return;const a=mkArt({name:c.n,g:c.g,tal:R(55,85),fol:Math.round(c.st/8)});a.con.adv=Math.round(c.st*.05);if(!lcash(a.con.adv))return;S.lab.arts.push(a);D.cl=D.cl.filter(x=>x!==c);log(`${c.n} dağıtımdan şirketine geçti.`,'gold');drawSheet()};
function shDist(){const D=l2().dist;if(!D.on)return note('Bağımsız sanatçıların şarkılarını sen dağıt, dinlenmelerden %15 komisyon al. Kurulum ₺15 Mn.')+row('ACT.distOpen()','📦','Dağıtım şirketi kur',S.star?'⭐ Bedava':'₺15 Mn','');
 let h=`<div class="hero2"><small>Dağıtım</small><div class="big">${fmtS(D.tot)}</div><span>${D.cl.length} müşteri sanatçı · dinlenmelerden %15</span></div>`+row('ACT.distFind()','🔎','Yeni müşteri bul','Popülerliğin arttıkça daha çok sanatçı gelir','1 hak');
 D.cl.slice().sort((a,b)=>b.st-a.st).slice(0,15).forEach(c=>h+=row(c.st>2e7?`ACT.distSign(${c.id})`:'','🎧',esc(c.n),`Son 3 ay ${num(c.st)} dinlenme · komisyon ${fmtS(c.st*.135*.15)}`,c.st>2e7?'İmzalat':''));return h}

/* 5. Alt markalar */
ACT.subNew=g=>{const X=l2();if(X.subs.some(s=>s.g===g)){toast('Bu türde alt markan var.');return}if(!lcash(15e6))return;X.subs.push({g,n:`${S.lab.n.split(' ')[0]} ${GENRES[g].n}`});log(`🏷 Yeni alt marka: ${S.lab.n.split(' ')[0]} ${GENRES[g].n}. Kapasite +3 sanatçı.`,'gold');drawSheet()};
ACT.subName=(g,v)=>{const s=l2().subs.find(x=>x.g===g);if(s)s.n=v};
function shSubs(){const X=l2();let h=note('Her tür için ayrı alt marka kur. Her alt marka 3 sanatçı kapasitesi ekler; o türdeki sanatçıların şarkıları %15 daha çok dinlenir ve sanatçılar daha mutlu olur.');
 X.subs.forEach(s=>{const n=S.lab.arts.filter(a=>a.genre===s.g).length;h+=`<div class="card"><div class="ch"><b>🏷 ${GENRES[s.g].n}</b><span class="pill">${n} sanatçı</span></div><input class="inp" value="${esc(s.n)}" maxlength="28" oninput="ACT.subName('${s.g}',this.value)"></div>`});
 h+=sec('Yeni alt marka')+Object.keys(GENRES).filter(g=>!X.subs.some(s=>s.g===g)).map(g=>row(`ACT.subNew('${g}')`,'🏷',GENRES[g].n+' alt markası','+3 sanatçı kapasitesi',S.star?'⭐':'₺15 Mn')).join('');return h}

/* 6. Yetenek yarışması */
ACT.showStart=()=>{const X=l2();if(X.show){toast('Yarışma zaten yayında.');return}if(!lcash(40e6))return;if(!useM(2))return;X.show={q:S.qt,n:pick(['Yıldız Sesi','Sahne Senin','Ses Avı','Geleceğin Yıldızı']),fin:null};log(`📺 "${X.show.n}" yarışması başladı! Jüri koltuğunda sen varsın.`,'gold');drawSheet()};
function showTick(){const X=l2(),s=X.show;if(!s||s.fin)return;const rt=clamp(RF(4,14)+S.fame/12+labPop()/15),inc=Math.round(rt*6e6);S.lab.cash+=inc;addF(Math.round(S.fol*rt/400),'ig');
 s.rt=rt;s.fin=[0,1,2].map(()=>{const a=newCand();a.tal=S.star?R(92,99):R(70,95);a.fol=Math.round(Math.pow(10,RF(5.3,6.4)));a.happy=95;return a});log(`📺 "${s.n}" finali %${rt.toFixed(1).replace('.',',')} reytingle izlendi. Reklam geliri ${fmtS(inc)}. Finalistler seni bekliyor!`,'gold')}
ACT.showSign=i=>{const X=l2(),a=X.show.fin[i];if(fullCap())return;a.con={adv:2e6,roy:20,yrs:5,reqS:10,rec:true,left:5,del:0,unrec:2e6};S.lab.arts.push(a);X.show.fin.splice(i,1);log(`🏆 ${a.name} yarışmadan şirketine imza attı!`,'gold');drawSheet()};
ACT.showEnd=()=>{l2().show=null;drawSheet()};
function shShow(){const X=l2(),s=X.show;if(!s)return note('Kendi TV yetenek yarışmanı yap. Reklam geliri ve takipçi kazanırsın; finalistleri doğrudan şirketine imzalatabilirsin. Maliyet ₺40 Mn, 2 hak; final 3 ay sonra.')+row('ACT.showStart()','📺','Yarışmayı başlat',S.star?'⭐ Bedava':'₺40 Mn','2 hak');
 if(!s.fin)return note(`"${s.n}" yayında. Final bir sonraki İLERLE'de.`);let h=note(`"${s.n}" finali %${s.rt.toFixed(1).replace('.',',')} reyting aldı.`);s.fin.forEach((a,i)=>h+=row(`ACT.showSign(${i})`,`<span class="av sa">${AV(a.look,22)}</span>`,esc(a.name),`${GENRES[a.genre].n} · yetenek ${a.tal} · ${num(a.fol)} takipçi`,'İmzalat'));return h+row('ACT.showEnd()','🏁','Sezonu kapat','Yeni sezon başlatabilirsin','')}

/* 7. Festival, toplama albüm, şirket içi düet */
ACT.fest=()=>{const X=l2(),L=S.lab;if(L.arts.length<3){toast('Festival için en az 3 sanatçı gerekir.');return}if(X.fest===S.age&&!S.star){toast('Bu yıl festival yapıldı.');return}if(!useM(2))return;const cost=Math.round(15e6+L.arts.length*2e6);if(!lcash(cost))return;
 const fan=L.arts.reduce((a,x)=>a+x.fol,0)+S.fol*.3,g=Math.round(fan*RF(1.2,2.2)*(S.star?2:1));L.cash+=g;X.fest=S.age;L.arts.forEach(a=>{a.fol=Math.round(a.fol*1.08);a.happy=clamp(a.happy+10)});addF(Math.round(S.fol*.01),'ig');sCrowd&&sCrowd();
 log(`🎪 ${L.n} Fest: ${L.arts.length} sanatçı aynı sahnede! Hasılat ${fmtS(g)}, maliyet ${fmtS(cost)}.`,'gold');drawSheet()};
ACT.comp=()=>{const X=l2(),L=S.lab;const top=[...L.songs].sort((a,b)=>b.total-a.total).slice(0,14);if(top.length<8){toast('Toplama albüm için en az 8 şarkı gerekir.');return}if(!useM(1))return;
 const n=`${L.n} Best of ${X.comp.length+1}`,g=0;top.forEach(s=>s.pot*=1.25);X.comp.push(n);log(`💿 "${n}" toplama albümü dijital platformlarda: eski hitler yeniden listelerde.`,'gold');drawSheet()};
ACT.duet=(a1,a2)=>{const L=S.lab,a=L.arts.find(x=>x.id===a1),b=L.arts.find(x=>x.id===a2);if(!a||!b||a===b)return;if(!useM(1))return;a.demos.push({id:S.nid++,t:genTitle(a.genre)+' (feat. '+b.name+')',q:clamp(Math.round((a.tal+b.tal)/2+R(5,15)))});const m=Math.round((a.fol+b.fol)*.05);a.fol+=m;b.fol+=m;log(`🎤 ${a.name} ve ${b.name} düet yaptı. Demo hazır!`,'good');drawSheet()};
function shFest(){const L=S.lab,X=l2();let h=row('ACT.fest()','🎪',`${esc(L.n)} Fest`,`Bütün sanatçıların aynı sahnede · yılda bir · ${fmtS(15e6+L.arts.length*2e6)}`,X.fest===S.age?'Bu yıl yapıldı':'2 hak',X.fest===S.age&&!S.star)+row('ACT.comp()','💿','Toplama albüm (Best of)','Şirketin en çok dinlenen 14 şarkısı dijitalde · eski hitler canlanır','1 hak');
 if(X.comp.length)h+=note('Çıkan toplamalar: '+X.comp.map(esc).join(', '));
 if(L.arts.length>=2){h+=sec('Şirket içi düet');const A=L.arts.slice(0,6);A.forEach(a=>{h+=`<div class="card"><div class="ch"><b>${esc(a.name)} ile düet</b></div><div class="tabs wrap">${A.filter(b=>b!==a).map(b=>`<button class="tab sm" onclick="ACT.duet(${a.id},${b.id})">${esc(b.name.split(' ')[0])}</button>`).join('')}</div></div>`})}return h}

/* 8. Krizler */
const ra=()=>S.lab&&S.lab.arts.length?pick(S.lab.arts):null;
EVENTS.push({id:'lkiskanc',min:18,c:()=>S.lab&&S.lab.arts.length>=2&&ch(.25),gen:()=>{const A=[...S.lab.arts].sort(()=>Math.random()-.5);return {a:A[0].id,b:A[1].id,an:A[0].name,bn:A[1].name}},title:'Şirkette kıskançlık',text:p=>`${p.an}, ${p.bn}'ın daha çok tanıtım bütçesi aldığını düşünüyor ve sosyal medyada laf soktu.`,ch:[
  {t:'İkisini barıştır (₺1 Mn)',fn:p=>{S.lab.cash-=1e6;S.lab.arts.forEach(a=>{if(a.id===p.a||a.id===p.b)a.happy=clamp(a.happy+8)});log('İki sanatçını yemekte barıştırdın.','good')}},{t:'Kavgayı PR için kullan',fn:p=>{S.lab.arts.forEach(a=>{if(a.id===p.a||a.id===p.b){a.fol=Math.round(a.fol*1.08);a.happy=clamp(a.happy-12)}});log('Atışma gündem oldu, iki sanatçın da takipçi kazandı ama birbirlerine küs.','dim')}}]},
 {id:'ltelif',min:18,c:()=>S.lab&&S.lab.songs.length>=4&&ch(.2),gen:()=>{const a=ra();return {n:a?a.name:'Eski bir sanatçın',v:Math.round(Math.max(2e6,S.lab.tot.gross*.03)/1e5)*1e5}},title:'Telif davası',text:p=>`${p.n} telif hesaplarında eksik ödeme yapıldığını iddia ederek ${fmtS(p.v)} tazminat davası açtı.`,ch:[
  {t:'Uzlaş, öde',fn:p=>{S.lab.cash-=p.v*.6;log(`Uzlaşma sağlandı: ${fmtS(p.v*.6)} ödendi.`,'dim')}},{t:'Mahkemeye git',fn:p=>{const lw=Math.round(p.v*.15);S.lab.cash-=lw;if(ch(.55))log(`Davayı kazandın! Sadece avukat ücreti ${fmtS(lw)}.`,'good');else{S.lab.cash-=p.v;log(`Davayı kaybettin: ${fmtS(p.v)} tazminat + ${fmtS(lw)} avukat.`,'bad')}}}]},
 {id:'lskandal',min:18,c:()=>S.lab&&S.lab.arts.length>=1&&ch(.2),gen:()=>{const a=ra();return {id:a.id,n:a.name}},title:'Sosyal medya skandalı',text:p=>`${p.n}'ın yıllar önceki paylaşımları ortaya çıktı. Markalar ve hayranlar tepkili.`,ch:[
  {t:'Özür videosu çektir',fn:p=>{const a=S.lab.arts.find(x=>x.id===p.id);if(a){a.fol=Math.round(a.fol*.95);a.happy=clamp(a.happy-5)}log(`${p.n} özür diledi, tepki yatıştı.`,'dim')}},{t:'Sözleşmesini askıya al',fn:p=>{const a=S.lab.arts.find(x=>x.id===p.id);if(a){a.happy=clamp(a.happy-30);a.demos=[]}log(`${p.n} geçici olarak şirketten uzaklaştırıldı. Markalar seni takdir etti.`,'good')}},{t:'Arkasında dur',fn:p=>{const a=S.lab.arts.find(x=>x.id===p.id);if(a){a.happy=100;a.fol=Math.round(a.fol*.85)}log(`${p.n}'ı savundun. Sadakatini kazandın ama takipçi kaybetti.`,'dim')}}]},
 {id:'lgidiyor',min:18,c:()=>S.lab&&S.lab.arts.some(a=>a.happy<40)&&ch(.3),gen:()=>{const a=S.lab.arts.filter(a=>a.happy<40)[0];return {id:a.id,n:a.name}},title:'"Başka şirkete gidiyorum"',text:p=>`${p.n} mutsuz: "Bana daha fazla bütçe ve daha yüksek telif vermezseniz başka şirkete geçiyorum."`,ch:[
  {t:'Telifini artır',fn:p=>{const a=S.lab.arts.find(x=>x.id===p.id);if(a){a.con.roy=Math.min(60,a.con.roy+10);a.happy=80}log(`${p.n} yeni şartlarla kaldı.`,'good')}},{t:'Sözleşmeyi hatırlat',fn:p=>{const a=S.lab.arts.find(x=>x.id===p.id);if(a&&ch(.5)){S.lab.arts=S.lab.arts.filter(x=>x!==a);S.lab.cash+=askBase(a).adv;log(`${p.n} cezai şartı ödeyip şirketten ayrıldı (${fmtS(askBase(a).adv)} tazminat aldın).`,'bad')}else{if(a)a.happy=clamp(a.happy-10);log(`${p.n} istemeyerek de olsa kaldı.`,'dim')}}}]});
Object.assign(EVSTAR,{lkiskanc:['Herkesi kucaklaştır',p=>{S.lab.arts.forEach(a=>a.happy=100);log('Şirkette bayram havası!','gold')}],ltelif:['Davayı düşürt',()=>log('Dava ilk duruşmada düştü.','gold')],lskandal:['Skandalı viral başarıya çevir',p=>{const a=S.lab.arts.find(x=>x.id===p.id);if(a)a.fol*=2;log('Skandal tersine döndü, herkes onu konuşuyor!','gold')}],lgidiyor:['Kalbini kazan',p=>{const a=S.lab.arts.find(x=>x.id===p.id);if(a)a.happy=100;log(`${p.n} sana sonsuza kadar sadık.`,'gold')}]});

/* 9. Rakip şirket satın alma */
const ACQN=['Anadolu Plak','Kuzey Records','Marmara Müzik','Yıldız Kayıt','Gece Yarısı Records','Ege Ses','Bulvar Müzik','Karadeniz Kayıt'];
function acqList(){const X=l2();X.acq=ACQN.filter(n=>!X.acqd.includes(n)).sort(()=>Math.random()-.5).slice(0,4).map(n=>{const songs=R(15,120),arts=R(1,3),yr=Math.round(songs*RF(1.5e5,8e5));return {n,songs,arts,yr,val:Math.round((yr*RF(5,9)+arts*8e6)/1e5)*1e5}});
 (S.xstk||[]).forEach(x=>{if(!X.acqd.includes(x.id)&&S.mkt[x.id]){const val=Math.round(S.mkt[x.id].p*IPO_N*1.3/1e5)*1e5;X.acq.push({n:x.n,songs:R(20,60),arts:R(1,2),yr:Math.round(val/8),val,tk:x.id})}})}
ACT.acqBuy=i=>{const X=l2(),o=X.acq[i],L=S.lab;if(!o)return;if(!useM(1))return;if(!lcash(o.val))return;
 for(let k=0;k<o.songs;k++){const pot=o.yr/o.songs/.0125/.135/4*RF(.6,1.4);L.songs.push({id:S.nid++,t:genTitle(pick(Object.keys(GENRES))),aid:-1,g:'pop',q:R(40,85),pot,rq:S.qt-R(12,40),lq:0,total:Math.round(pot*RF(2,6)),gross:0,clip:1,viral:false})}
 let added=0;for(let k=0;k<o.arts&&L.arts.length<labCap();k++){const a=newCand();a.con={adv:0,roy:30,yrs:2,reqS:4,rec:false,left:2,del:0,unrec:0};L.arts.push(a);added++}
 if(o.tk&&S.port[o.tk]){const h=S.port[o.tk],v=h.q*S.mkt[o.tk].p*1.3;S.money+=v;delete S.port[o.tk];log(`Elindeki ${o.tk} hisseleri primli olarak ${fmtS(v)}'ye alındı.`,'good')}
 X.acqd.push(o.tk||o.n);X.acq.splice(i,1);log(`🏢 ${L.n}, ${o.n}'ı ${fmtS(o.val)}'ye satın aldı! ${o.songs} şarkılık katalog${added?` ve ${added} sanatçı`:''} artık senin.`,'gold');sJingle&&sJingle();drawSheet()};
function shAcq(){const X=l2();if(!X.acq.length)acqList();let h=note('Küçük plak şirketlerini kataloglarıyla birlikte satın al. Eski şarkılar her yıl düzenli gelir getirir. Daha önce sattığın şirketleri de geri alabilirsin.');
 X.acq.forEach((o,i)=>h+=row(`ACT.acqBuy(${i})`,'🏢',esc(o.n),`${o.songs} şarkılık katalog · ${o.arts} sanatçı · yıllık ~${fmtS(o.yr)}`,S.star?'⭐ Bedava':fmtS(o.val)));
 return h+row('l2().acq=[];acqList();drawSheet()','🔄','Başka şirketlere bak','','')}

/* 10. Yan gelirler ve ödül */
ACT.facBuy=()=>{const X=l2();if(X.fac)return;if(!lcash(25e6))return;X.fac=1;log(`🏭 ${S.lab.n} plak baskı fabrikası kuruldu! Albüm baskı maliyetlerin düştü, dışarıya baskı da alıyorsun.`,'gold');drawSheet()};
ACT.rentTog=()=>{const X=l2();if(!hasLF('studyo')&&!S.star){toast('Önce şirket binana kayıt stüdyosu kur.');return}X.rent=X.rent?0:1;drawSheet()};
function sideTick(){const X=l2(),L=S.lab;let v=0;if(X.rent){v+=R(8e5,2e6)*(hasLF('studyo')?1:.5);L.arts.forEach(a=>a.happy=clamp(a.happy-1))}L.cash+=v;X.side+=v}
function awardYear(){const X=l2(),L=S.lab,sc=L.songs.reduce((a,s)=>a+(s.lq||0),0)/1e6+L.arts.length*3+labPop()/5;if(sc>40&&ch(clamp(sc/200,.1,.7))||S.star&&ch(.5)){X.award.push(S.age);L.arts.forEach(a=>a.happy=clamp(a.happy+10));log(`🏆 ${L.n} "Yılın Plak Şirketi" ödülünü kazandı!`,'gold')}}
function shSide(){const X=l2();let h=`<div class="hero2"><small>Yan gelirler</small><div class="big">${fmtS(X.side)}</div><span>${X.award.length?`🏆 Yılın Plak Şirketi: ${X.award.join(', ')} yaşında`:'Henüz "Yılın Plak Şirketi" ödülün yok'}</span></div>`;
 h+=row('ACT.rentTog()','🎙','Stüdyoyu dışarıya kirala',X.rent?'Açık · sanatçıların stüdyoyu paylaştığı için biraz mutsuz':'Kapalı',X.rent?'Kapat':'Aç');return h}

/* ---------- Bağlantılar ---------- */
const L2PAGES={ltr:['Transfer',shTr],lceo:['CEO',shCeo],lpub:['Yayıncılık',shPub],ldist:['Dağıtım',shDist],lsub:['Alt markalar',shSubs],lshow:['Yetenek yarışması',shShow],lfest:['Festival ve toplama',shFest],lacq:['Satın alma',shAcq],lside:['Yan gelirler',shSide]};
const _shK6=shKariyer;shKariyer=function(){const T=SUB&&SUB.t;if(L2PAGES[T]){if(!S.lab){SUB=null;return _shK6()}l2();return L2PAGES[T][1]()}return _shK6()};
const _shLab6=shLab;shLab=function(){let h=_shLab6();if(!S.lab)return h;const X=l2();
 const rows=sec('Şirket yönetimi')+row(lsub('ltr','Transfer'),'🔁','Transfer piyasası',X.trOff?'🔔 Yıldızına teklif var!':'Rakip yıldızları transfer et','›')+row(lsub('lceo','CEO'),'👔','CEO',X.ceo?`${esc(X.ceo.n)} yönetiyor`:'Şirketi senin yerine yönetsin','›')+row(lsub('lpub','Yayıncılık'),'✍️','Yayıncılık kolu',`${X.pub.wr.length} söz yazarı · ${X.pub.cat.length} şarkı`,'›')+
  row(lsub('ldist','Dağıtım'),'📦','Dağıtım hizmeti',X.dist.on?`${X.dist.cl.length} müşteri`:'Bağımsızlardan %15 komisyon','›')+row(lsub('lsub','Alt markalar'),'🏷','Alt markalar',`${X.subs.length} alt marka · kapasite ${labCap()}`,'›')+row(lsub('lshow','Yetenek yarışması'),'📺','Yetenek yarışması',X.show?(X.show.fin?'🔔 Finalistler hazır':'Yayında'):'Kendi TV programın','›')+
  row(lsub('lfest','Festival'),'🎪','Festival, toplama albüm, düet','','›')+row(lsub('lacq','Satın alma'),'🏢','Şirket satın al',`${X.acqd.length} şirket aldın`,'›')+row(lsub('lside','Yan gelirler'),'🎙','Stüdyo kirası, ödüller','','›');
 h=h.replace(sec('Kasa'),rows+sec('Kasa'));return h.replace(/(<span>Şirket kasası · \d+\/)\d+( sanatçı)/,`$1${labCap()}$2`)};
const _lt6=labTick;labTick=function(){_lt6();if(S.lab&&S.lab.x){ceoTick();pubTick();distTick();showTick();sideTick();trOffer()}};
const _ly6=labYear;labYear=function(){_ly6();if(S.lab&&S.lab.x){awardYear();l2().tr=[];l2().acq=[]}};
/* alt markadaki sanatçıların şarkıları %15 daha çok dinlenir */
const _ra6=ACT.relArt;ACT.relArt=(aid,did,pi)=>{const n0=S.lab.songs.length;_ra6(aid,did,pi);const X=S.lab.x,s=S.lab.songs[S.lab.songs.length-1];if(X&&S.lab.songs.length>n0&&X.subs.some(x=>x.g===s.g))s.pot*=1.15};
/* süperstar: transfer bedava */
actKeep();
