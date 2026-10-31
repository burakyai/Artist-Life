/* ============ Mahlas · sevgilinin serveti · evlilikte ortak mal · boşanma davası · miras ============ */
/* ---------- Mahlas ---------- */
ACT.stage=v=>{S.stage=(v||'').trim().slice(0,20)||null;render()};
const _rn9b=render;render=function(){_rn9b();if(S&&S.stage){const n=$('hname');if(n)n.innerHTML=`${esc(S.stage)} <small class="realn">${esc(S.first+' '+S.last)}</small>`}};
const _sa9=shAyar;shAyar=function(){const h=_sa9();if(SUB)return h;return sec('Sahne adı (mahlas)')+note('Sahnede ve listelerde bu adla anılırsın. Boş bırakırsan gerçek adın kullanılır.')+`<input class="inp" maxlength="20" placeholder="Örn: Ezhel, Lil ${esc(S.first)}" value="${esc(S.stage||'')}" onchange="ACT.stage(this.value)">`+h};
const _dc9=drawCreate;drawCreate=function(){_dc9();if(!CR)return;const w=document.querySelector('#create .crct')||document.querySelector('#create .names');if(w&&!document.querySelector('#create .stg'))w.insertAdjacentHTML('afterend',`<input class="inp stg" maxlength="20" placeholder="Sahne adı / mahlas (isteğe bağlı)" value="${esc(CR.stage||'')}" oninput="CR.stage=this.value">`)};
const _nl9=newLife;newLife=function(c){const st=(c.stage||'').trim();_nl9(c);if(st){S.stage=st.slice(0,20);save();render()}};
const _inh9=inherit;inherit=function(id){_inh9(id);if(S){S.stage=null;S.mar=null;save();render()}};
/* ---------- Sevgilinin serveti ---------- */
const PW={normal:[5e4,2e6],model:[1e6,40e6],sporcu:[5e6,250e6],futbolcu:[10e6,600e6],isinsani:[20e6,3e9],dj:[5e5,25e6],sanatci:[2e6,300e6],produktor:[1e6,60e6],soz:[3e5,15e6],yonetmen:[1e6,40e6],oyuncu:[2e6,150e6],avukat:[2e6,60e6],doktor:[2e6,50e6],gazeteci:[3e5,8e6],influencer:[1e6,80e6]};
function pW(p){if(!p||p.money!=null)return p;const r=PW[p.type]||PW.normal;p.money=Math.round(Math.exp(RF(Math.log(r[0]),Math.log(r[1])))/1e3)*1e3;
 const ct=(S.ct||'tr'),hs=HOUSES.filter(h=>(h.c||'tr')===ct),own=hs.filter(h=>!h.rent&&!h.second&&h.p<p.money*1.5).sort((a,b)=>b.p-a.p)[0];
 if(own&&ch(.65)){p.home=own.id;p.money=Math.max(0,p.money-own.p*.5)}else p.home=(hs.filter(h=>h.rent).sort((a,b)=>p.money>2e7?b.rent-a.rent:a.rent-b.rent)[0]||{}).id||null;
 const car=[...CARS].filter(c=>c.p<p.money*.3).sort((a,b)=>b.p-a.p)[0];p.car=car&&ch(.8)?car.id:null;return p}
const pHomeTxt=p=>{const h=HOUSES.find(x=>x.id===p.home);return h?(h.rent?`🔑 Kirada · ${h.n} (${h.loc}) · kira ${fmtS(h.rent)}/yıl`:`🏠 Kendi evi · ${h.n} (${h.loc}) · ${fmtS(h.p)}`):'Ailesinin yanında'};
function wealthCard(p){pW(p);const c=CARS.find(x=>x.id===p.car),m=p.st==='eş'&&!p.prenup;
 return `<div class="card"><div class="ch"><b>💰 ${m?'Ortak mal varlığınız':'Serveti'}</b><span class="pill gold">${m?fmtS(Math.max(0,S.money)+S.bank+portVal()):fmtS(p.money)}</span></div>`+
  (m?note(`Evlisiniz ve evlilik sözleşmesi yok: kasa, banka, hisseler, evler ve arabalar ortak. Boşanırsanız dava yoluyla yarı yarıya bölünür.<br>Evler: ${S.houses.filter(id=>{const h=HOUSES.find(x=>x.id===id);return h&&!h.rent}).length} · Arabalar: ${S.cars.length}`):
   note(`${pHomeTxt(p)}<br>${c?`🚗 ${c.n}`:'Arabası yok'}${p.st==='eş'&&p.prenup?'<br>📝 Evlilik sözleşmeniz var: mallarınız ayrı.':''}`))+'</div>'}
const _ys9=yearTick;yearTick=function(){_ys9();const p=S&&S.partner;if(p&&p.money!=null&&!(p.st==='eş'&&!p.prenup)){const r=PW[p.type]||PW.normal;p.money=Math.max(0,Math.round(p.money*RF(.98,1.12)+r[0]*RF(.2,1)))}};
/* ---------- Evlilik: ortak mal ---------- */
ACT.prenup=()=>{const p=S.partner;p.wantPre=!p.wantPre;drawSheet()};
const _pr9=ACT.propose;ACT.propose=()=>{const p=pW(S.partner);if(p.wantPre&&!S.star){const y0=p.yak;p.yak=Math.round(p.yak*.8);_pr9();if(p.st!=='eş')p.yak=Math.max(0,p.yak+y0-Math.round(y0*.8));else p.yak=y0}else _pr9();
 if(p.st==='eş'&&!S.mar){S.mar={age:S.age,prenup:!!p.wantPre};p.prenup=!!p.wantPre;
  if(p.prenup)log('📝 Evlilik sözleşmesi imzalandı: mallarınız ayrı kalacak.','dim');
  else{const add2=p.money;S.money+=add2;p.money=0;let hs='';const h=HOUSES.find(x=>x.id===p.home);if(h&&!h.rent){if(!S.houses.includes(h.id))S.houses.push(h.id);S.hren=S.hren||{};if(S.hren[h.id]==null)S.hren[h.id]=S.age;if(!S.house||HOUSES.find(x=>x.id===S.house).rent)S.house=h.id;hs=`, ${h.n} (${h.loc})`}
   if(p.car&&!S.cars.includes(p.car)){S.cars.push(p.car);if(!S.car)S.car=p.car}log(`💍 Mallarınız birleşti: ${p.name.split(' ')[0]}'in ${fmtS(add2)} parası${hs}${p.car?', '+CARS.find(c=>c.id===p.car).n:''} artık ortak.`,'gold')}}};
/* ---------- Boşanma davası ---------- */
const LAW=[['Anlaşmalı boşanma','Mallar tam yarı yarıya bölünür, dava yok',0,.5,.5],['Sıradan avukat','Payın %40-55 arası',5e5,.4,.55],['Usta boşanma avukatı','Payın %48-62 arası',5e6,.48,.62],['Ünlü avukatlık bürosu','Payın %55-70 arası',25e6,.55,.7]];
ACT.breakup=()=>{const p=S.partner;if(p&&p.st==='eş'){sheet('hayat',{t:'divorce',title:'Boşanma davası'});return}log(`${p.name.split(' ')[0]} ile ayrıldınız.`,'bad');add('happy',-10);S.partner=null;sheet('hayat')};
function divSplit(s){const p=S.partner,lost={m:0,h:[],c:[],st:0};
 const T=Math.max(0,S.money)+S.bank,give=T*(1-s);let g=give;const fm=Math.min(Math.max(0,S.money),g);S.money-=fm;g-=fm;S.bank-=Math.min(S.bank,g);lost.m=give;
 Object.keys(S.port||{}).forEach(k=>{const h=S.port[k],q=h.q*(1-s);lost.st+=q*S.mkt[k].p;h.q-=q;h.c*=s});
 const hs=S.houses.map(id=>HOUSES.find(x=>x.id===id)).filter(h=>h&&!h.rent).sort((a,b)=>b.p-a.p),cs=S.cars.map(id=>CARS.find(x=>x.id===id)).filter(Boolean).sort((a,b)=>b.p-a.p);
 const deal=(arr,key)=>{let me=0,he=0;arr.forEach(x=>{if(me*(1-s)<=he*s){me+=x.p}else{he+=x.p;lost[key].push(x)}})};deal(hs,'h');deal(cs,'c');
 lost.h.forEach(h=>{S.houses=S.houses.filter(x=>x!==h.id);if(S.hup)delete S.hup[h.id];if(S.house===h.id)S.house=null});lost.c.forEach(c=>{S.cars=S.cars.filter(x=>x!==c.id);if(S.car===c.id)S.car=S.cars[0]||null});
 return lost}
ACT.divorce=i=>{const p=S.partner,L=LAW[i];if(!p)return;if(L[2]&&!pay(L[2]))return;if(!useM(i?2:1))return;let s;
 if(S.star)s=1;else if(p.prenup)s=1;else{s=RF(L[3],L[4]);if(i&&p.trait==='para')s-=.04;if(i&&ch(.15)){s-=.06;log('Eşinin avukatı mahkemede çok iyi bir savunma yaptı.','bad')}s=clamp(s*100,30,80)/100}
 const lost=divSplit(s),n=p.name.split(' ')[0];
 let msg=p.prenup?`Evlilik sözleşmeniz sayesinde herkes kendi malıyla ayrıldı.`:S.star?`⭐ Mahkeme bütün mal varlığını sana bıraktı.`:`Mahkeme mal varlığının %${Math.round(s*100)}'ini sana, %${Math.round((1-s)*100)}'ini ${n}'e verdi.`;
 if(lost.m>0)msg+=` ${n}'e ${fmtS(lost.m)} nakit`;if(lost.st>0)msg+=`, ${fmtS(lost.st)} değerinde hisse`;if(lost.h.length)msg+=`, ${lost.h.map(h=>h.n+' ('+h.loc+')').join(', ')}`;if(lost.c.length)msg+=`, ${lost.c.map(c=>c.n).join(', ')}`;if(lost.m>0||lost.h.length||lost.c.length||lost.st>0)msg+=' geçti.';
 log(`⚖️ ${i?L[0]+' ile boşanma davası':'Anlaşmalı boşanma'} sonuçlandı. ${msg}`,'bad');add('happy',-15);S.kids.forEach(k=>k.yak=clamp(k.yak-8));S.ex=(S.ex||[]).concat({n:p.name,age:S.age});S.partner=null;S.mar=null;SUB=null;sheet('hayat')};
function shDivorce(){const p=S.partner;if(!p||p.st!=='eş'){SUB=null;return shHayat()}const T=Math.max(0,S.money)+S.bank+portVal(),hv=S.houses.map(id=>HOUSES.find(x=>x.id===id)).filter(h=>h&&!h.rent).reduce((a,h)=>a+h.p,0),cv=S.cars.map(id=>CARS.find(x=>x.id===id)).filter(Boolean).reduce((a,c)=>a+c.p,0);
 let h=`<div class="hero2"><small>Ortak mal varlığı</small><div class="big">${fmtS(T+hv+cv)}</div><span>Nakit ve banka ${fmtS(Math.max(0,S.money)+S.bank)} · hisseler ${fmtS(portVal())} · evler ${fmtS(hv)} · arabalar ${fmtS(cv)}</span></div>`;
 h+=note(p.prenup?'📝 Evlilik sözleşmeniz var: boşanırsanız herkes kendi malıyla ayrılır.':S.star?'⭐ Süperstar: mahkeme her şeyi sana bırakır.':'Evlilik sözleşmesi yok. Kasa, banka, hisseler, evler ve arabalar mahkemede bölünür. İyi bir avukat payını artırabilir. Plak şirketin, kataloğun ve yatırımların sende kalır.');
 LAW.forEach((L,i)=>h+=row(`ACT.divorce(${i})`,i?'⚖️':'🤝',L[0],p.prenup||S.star?'Sözleşme / süperstar: malların sende kalır':L[1],(L[2]?fmtS(L[2])+' · ':'')+(i?'2 hak':'1 hak')));
 return h+row("SUB={t:'partner',title:'İlişki'};drawSheet()",'❤️','Vazgeç, evliliğe bir şans daha ver','','')}
/* ---------- Sevgili sayfası ---------- */
const _shP9=shPartner;shPartner=function(){const p=S.partner;if(!p)return _shP9();pW(p);let h=_shP9();const i=h.indexOf('<div class="tbar">');if(i>=0)h=h.slice(0,i)+wealthCard(p)+h.slice(i);
 h=h.replace("Servetinin %30\\'u gider","Boşanma davası: mallar bölünür").replace("Servetinin %30'u gider","Boşanma davası: mallar bölünür");
 if(p.st==='sevgili')h=h.replace(sec('Gelecek'),sec('Gelecek')+row('ACT.prenup()','📝','Evlilik sözleşmesi (prenup)',p.wantPre?'Açık · teklif ederken sözleşme isteyeceksin, malların ayrı kalır (kabul şansı düşer)':'Kapalı · evlenince mallarınız birleşir',p.wantPre?'Kapat':'Aç'));
 return h};
const _shH9=shHayat;shHayat=function(){if(SUB&&SUB.t==='divorce')return shDivorce();return _shH9()};
/* yeni sevgili: serveti hemen belirlensin */
const _dt9=ACT.date;ACT.date=()=>{_dt9();if(S.partner)pW(S.partner)};
const _fl9=ACT.fLove;ACT.fLove=id=>{_fl9(id);if(S.partner)pW(S.partner)};
actKeep();
