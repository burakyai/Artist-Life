/* ============ Akıllı CEO: hesaplı yayın, tanıtım, klip, konser ve sözleşme yönetimi ============ */
const LIFE=1.55; /* bir şarkının ömür boyu dinlenme çarpanı (pot × LIFE) */
function ceoPot(a,q,pb){return (8000+120*Math.pow(a.fol,.8))*Math.pow(q/60,2.2)*(S.trends[a.genre]||1)*(hasLF('pr')?1.3:1)*(1+.8*pb/(pb+30000+a.fol*3))*(a.type==='yildiz'?1.3:1)*(l2().subs.some(s=>s.g===a.genre)?1.15:1)}
const ceoShare=a=>.135*(hasLF('dagitim')?1:.85)*(1-(a.con?a.con.roy:30)/100);
function ceoBest(a,q,sk){const ops=[0,5e5,5e6].map((pb,i)=>{const v=ceoPot(a,q,pb)*(1+sk*.25)*LIFE*ceoShare(a);return {i,pb,net:v-pb}});return ops.sort((x,y)=>y.net-x.net)[0]}
function ceoQ(){const X=l2(),c=X.ceo,L=S.lab;return labBld().up/4+L.arts.length*150000+(S.star?0:c.sal)}
function artContrib(a){const L=S.lab,sh=ceoShare(a),ss=L.songs.filter(s=>s.aid===a.id);const songs=ss.reduce((t,s)=>t+(s.lq||0)*sh,0);const fut=a.demos.length?ceoPot(a,60,0)*LIFE*sh/2:0;return songs+Math.max(fut,ceoPot(a,Math.min(90,a.tal*.6+20),0)*LIFE*sh*.75)+a.fol*.42}
const ceoSal=c=>Math.round((150000+c.lv*4000)/1e4)*1e4;
const CFG0={rel:1,minQ:0,promo:'auto',drop:1,clip:'auto',gig:1,bonus:1,renew:'auto',cut:1,sign:1,maxArt:0,res:0};
const ceoCfg=c=>(c.cfg=Object.assign({},CFG0,c.cfg||{}));
ceoTick=function(){const X=l2(),c=X.ceo,L=S.lab;if(!c)return;const G=ceoCfg(c);const sk=c.lv/100,cash0=L.cash;c.sal=Math.min(c.sal,ceoSal(c));if(!S.star)L.cash-=c.sal;
 const st={rel:0,promo:0,drop:0,clip:0,gig:0,gigG:0,bonus:0,sign:0,renew:0,spent:0};
 const risk=c.st==='agresif'?1.25:c.st==='temkinli'?.8:1,reserve=ceoQ()*(G.res||(c.st==='temkinli'?4:c.st==='agresif'?1.5:2.5));
 const d0=drawSheet,l0=log;drawSheet=()=>{};log=()=>{};
 try{
  /* 1) demoları değerlendir: kârlı olanı en iyi tanıtım bütçesiyle yayınla, zayıfı ele */
  if(G.rel)L.arts.forEach(a=>{a.demos.slice().sort((x,y)=>y.q-x.q).forEach(d=>{const min=G.minQ||((c.st==='hit'?55:c.st==='temkinli'?50:40)-sk*10);
   if(d.q<min){if(G.drop){a.demos=a.demos.filter(x=>x.id!==d.id);st.drop++}return}
   let b=ceoBest(a,d.q,sk);if(G.promo!=='auto'){const fx=G.promo==='max1'?Math.min(b.i,1):+G.promo;b={i:fx,pb:[0,5e5,5e6][fx],net:1}}if(b.pb*risk>Math.max(0,L.cash-reserve))b={i:0,pb:0,net:1};
   if(G.promo==='auto'&&b.i===0&&ceoBest(a,d.q,sk).net<0&&!S.star&&!G.minQ)return;
   const n0=L.songs.length;ACT.relArt(a.id,d.id,b.i);if(L.songs.length>n0){const s=L.songs[L.songs.length-1];s.pot*=1+sk*.25;s.ceo=1;st.rel++;if(b.i)st.promo++;st.spent+=b.pb}})});
  /* 2) klip: beklenen ek gelir maliyeti aşıyorsa */
  const cc=Math.round(1500000*(hasLF('klip')?.5:1));
  if(G.clip!=='off')L.songs.filter(s=>s.clip<=1&&S.qt-s.rq<=2).forEach(s=>{const a=L.arts.find(x=>x.id===s.aid);if(!a)return;const k=S.qt-s.rq,rest=s.pot*Math.max(.38*Math.pow(.72,k),.0125)*3,gain=rest*.3*ceoShare(a);
   if((G.clip==='all'||gain*risk>cc)&&L.cash-cc>reserve){L.cash-=cc;s.clip=2;s.pot*=1.3;st.clip++;st.spent+=cc}});
  /* 3) konser: her sanatçıya 3 ayda bir (hak harcamadan) */
  if(G.gig)L.arts.forEach(a=>{if(a.gq===S.qt)return;a.gq=S.qt;const g=Math.round(a.fol*RF(.8,2)*(a.type==='diva'?1.2:1)*(hasLF('sahne')?1.3:1)+R(20000,80000)),ls=Math.round(g*.3);L.cash+=ls;a.earn+=g-ls;a.fol+=Math.round(a.fol*.02+50);a.happy=clamp(a.happy+3);st.gig++;st.gigG+=ls});
  /* 4) mutsuz sanatçıya prim */
  if(G.bonus)L.arts.forEach(a=>{if(a.happy<45){const x=Math.max(100000,Math.round(a.fol*.5));if(L.cash-x>reserve){L.cash-=x;a.happy=clamp(a.happy+15);st.bonus++;st.spent+=x}}});
  /* 5) sözleşmesi bitenler: kârlıysa uzat */
  const keepCost=150000;if(G.renew!=='none')L.arts.slice().forEach(a=>{if(a.con.left<=1){const cb=artContrib(a);
   if(G.cut&&G.renew==='auto'&&cb<keepCost&&!a.kid&&a.type!=='yildiz'){L.arts=L.arts.filter(x=>x!==a);st.cut=(st.cut||0)+1;return}
   const adv=Math.round(askBase(a).adv*.8);if((G.renew==='all'||cb*8>adv)&&L.cash-adv>reserve&&(S.star||G.renew==='all'||ch(.6+sk*.4))){L.cash-=adv;a.con.left+=2;a.con.reqS+=4;if(a.con.rec)a.con.unrec+=adv;st.renew++;st.spent+=adv}}});
  /* 6) boş yer varsa ve kasa güçlüyse yetenek imzala */
  if(G.sign&&L.arts.length<(G.maxArt?Math.min(G.maxArt,labCap()):labCap())&&(c.st!=='temkinli'||L.arts.length<Math.min(3,labCap()))){const cs=[newCand(),newCand(),newCand()].map(a=>{a.tal=clamp(a.tal+sk*15);return a}).sort((x,y)=>(y.tal*2+aFame(y))-(x.tal*2+aFame(x)))[0],o=askBase(cs);
   if(artContrib({...cs,con:{roy:o.roy},demos:[]})>220000&&L.cash-o.adv>reserve*1.5&&o.adv<artContrib({...cs,con:{roy:o.roy},demos:[]})*10){L.cash-=o.adv;cs.con={adv:o.adv,roy:o.roy,yrs:3,reqS:6,rec:true,left:3,del:0,unrec:o.adv};L.arts.push(cs);st.sign++;st.spent+=o.adv}}
 }finally{drawSheet=d0;log=l0}
 {const d1=L.cash-cash0+(L.lastQ?L.lastQ.net+L.lastQ.merch-L.lastQ.exp:0);if(d1>0&&!S.star){const bn=Math.round(d1*.1);L.cash-=bn;st.bonusC=bn}}
 c.lastQ={...st,cash:L.cash,d:L.cash-cash0+(L.lastQ?L.lastQ.net+L.lastQ.merch-L.lastQ.exp:0)};c.hist=(c.hist||[]).concat({q:S.qt,d:c.lastQ.d}).slice(-8);
 const parts=[];if(st.rel)parts.push(`${st.rel} şarkı yayınladı${st.promo?` (${st.promo} tanıtımlı)`:''}`);if(st.clip)parts.push(`${st.clip} klip çekti`);if(st.gig)parts.push(`${st.gig} konser ayarladı (+${fmtS(st.gigG)})`);if(st.drop)parts.push(`${st.drop} zayıf demoyu eledi`);if(st.renew)parts.push(`${st.renew} sözleşme uzattı`);if(st.sign)parts.push(`${st.sign} yeni sanatçı imzaladı`);if(st.bonus)parts.push(`${st.bonus} sanatçıya prim verdi`);if(st.cut)parts.push(`${st.cut} zarar ettiren sanatçının sözleşmesini yenilemedi`);
 if(parts.length)log(`👔 CEO ${c.n}: ${parts.join(', ')}. Kasa ${fmtS(L.cash)}.`,'dim');if(L.cash<0)log(`👔 CEO ${c.n}: "Kasa ekside, yeni harcamaları durdurdum. Şirkete para aktarman gerekiyor."`,'bad')};
/* CEO sayfası: rapor ve otomatik yönetim bilgisi */
const _shCeo2=shCeo;shCeo=function(){let h=_shCeo2();const X=l2(),c=X.ceo;if(!c)return h;const Lq=c.lastQ,hist=c.hist||[];
 const add=note('👔 CEO artık şirketi tamamen yönetiyor: her 3 ayda demoları değerlendirir, kârlı olanları en uygun tanıtım bütçesiyle yayınlar, zayıfları eler, hit adaylarına klip çeker, sanatçılara konser ayarlar, mutsuzlara prim verir, kârlı sözleşmeleri uzatır ve kasa uygunsa yeni yetenek imzalar. Kasada her zaman birkaç aylık gider kadar yedek bırakır. Senin onay vermene gerek yok.')+
  (Lq?`<div class="kv"><div>Son 3 ay yayın<b>${Lq.rel} (${Lq.promo} tanıtımlı)</b></div><div>Klip / konser<b>${Lq.clip} / ${Lq.gig}</b></div><div>CEO harcaması<b>${fmtS(Lq.spent)}</b></div><div>Son 3 ay şirket kârı<b class="${Lq.d<0?'neg':''}">${fmtS(Lq.d)}</b></div></div>`:note('İlk rapor bir sonraki İLERLE\'den sonra gelecek.'))+
  (hist.length>1?note('Son çeyrekler: '+hist.map(x=>`<span class="${x.d<0?'neg':'up'}">${x.d<0?'▼':'▲'}${fmtS(Math.abs(x.d))}</span>`).join(' · ')):'');
 const btn=`<button class="btn" onclick="sheet('kariyer',{t:'lceoset',title:'CEO kararları',par:{t:'lceo',title:'CEO',par:{t:'lab',title:'Şirketim'}}})">⚙️ CEO kararlarını ayarla</button>`;h=h.replace(/<b>👔 ([^<]*)<\/b>/,`<b onclick="sheet('kariyer',{t:'lceoset',title:'CEO kararları',par:{t:'lceo',title:'CEO',par:{t:'lab',title:'Şirketim'}}})" style="cursor:pointer;text-decoration:underline">👔 $1 ⚙️</b>`);return h+btn+add};
ACT.ceoCfg=(k,v)=>{const c=l2().ceo;if(!c)return;const G=ceoCfg(c);G[k]=v;drawSheet()};
function shCeoSet(){const c=l2().ceo;if(!c){SUB={t:'lceo',title:'CEO',par:{t:'lab',title:'Şirketim'}};return shCeo()}const G=ceoCfg(c);
 const opt=(k,l,d,arr)=>`<div class="card"><div class="ch"><b>${l}</b></div>${d?note(d):''}<div class="tabs wrap">${arr.map(([v,n])=>`<button class="tab sm ${String(G[k])===String(v)?'on':''}" onclick="ACT.ceoCfg('${k}',${typeof v==='string'?`'${v}'`:v})">${n}</button>`).join('')}</div></div>`;
 const tg=(k,l,d)=>row(`ACT.ceoCfg('${k}',${G[k]?0:1})`,G[k]?'✅':'⬜️',l,d,G[k]?'Açık':'Kapalı');
 return note(`👔 ${esc(c.n)} bu kurallara göre karar verir. "Otomatik" seçenekler CEO'nun kârlılık hesabını kullanır.`)+
  sec('Şarkı yayınlama')+tg('rel','Demoları CEO yayınlasın','Kapatırsan demoları sen onaylarsın')+
  opt('minQ','En düşük demo kalitesi','Bunun altındaki demolar yayınlanmaz',[[0,'Otomatik'],[40,'40+'],[50,'50+'],[60,'60+'],[70,'70+'],[80,'80+']])+tg('drop','Zayıf demoları sil','Kalite sınırının altındakiler beklemez, silinir')+
  opt('promo','Tanıtım bütçesi','Otomatik: her şarkı için en kârlı bütçe',[['auto','Otomatik'],['0','Hep tanıtımsız'],['max1','En fazla ₺500 B'],['1','Hep ₺500 B'],['2','Hep ₺5 Mn']])+
  opt('clip','Klip','',[['auto','Otomatik (kârlıysa)'],['off','Klip çekme'],['all','Her yeni şarkıya']])+
  sec('Sanatçılar')+tg('gig','Sanatçılara konser ayarla','Şirket hasılatın %30\'unu alır')+tg('bonus','Mutsuz sanatçıya prim ver','')+
  opt('renew','Sözleşme uzatma','',[['auto','Otomatik (kârlıysa)'],['all','Hepsini uzat'],['none','Uzatma, bana bırak']])+tg('cut','Zarar ettiren sanatçıyı bırak','Sözleşmesi bitince yenilemez (yalnızca otomatikte)')+
  tg('sign','Yeni yetenek imzala','Kasa uygunsa ve kâr getirecekse')+opt('maxArt','En fazla sanatçı sayısı','',[[0,'Bina kapasitesi'],[3,'3'],[5,'5'],[8,'8'],[12,'12']])+
  sec('Kasa')+opt('res','Kasada kalacak yedek','CEO bu kadar çeyreklik gideri harcamaz',[[0,'Otomatik'],[1,'1 çeyrek'],[2,'2 çeyrek'],[4,'4 çeyrek'],[8,'8 çeyrek']])+
  row("ACT.ceoCfg('reset',0);l2().ceo.cfg={};drawSheet()",'↺','Varsayılanlara dön','','')}
L2PAGES.lceo[1]=shCeo;L2PAGES.lceoset=['CEO kararları',shCeoSet];
actKeep();
