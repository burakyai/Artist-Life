/* ============ Gerçekçi ekonomi (süperstar modu hariç): şarkıların çoğu tutmaz, takipçi zor büyür, ünlü olmanın ekip ve yaşam masrafı vardır ============ */
/* 1) Şarkı potansiyeli: çoğu şarkı orta halli kalır, az bir kısmı tutar */
{const _pf=potFor;potFor=function(s,boost){let v=_pf(s,boost);if(S.star)return v;const q=s.q||50,hit=ch(clamp(.03+(q-55)/220,.02,.22)+(s.feat?.03:0));s._hit=hit;
 v*=hit?RF(1.6,3):RF(.35,.75);return v}}
/* 2) Takipçi büyümesi: büyüdükçe zorlaşır; yıl içinde şarkı çıkarmazsan takipçi kaybedersin */
const folK=f=>.6*Math.min(1,Math.pow(5e4/Math.max(5e4,f),.28));
function folDamp(){if(S.star){S._f0=S.fol;return}const f0=S._f0==null?S.fol:S._f0,g=S.fol-f0;if(g>0){S.fol=Math.round(f0+g*folK(f0));calcFame()}S._f0=S.fol}
{const _aq=ageUpQ;ageUpQ=function(){if(S&&S.alive)folDamp();_aq();if(S&&S.alive)folDamp()}}
{const _yt=yearTick;yearTick=function(){if(S&&!S.star&&S.genre&&S.age>=16){const rel=released().filter(s=>s.ra===S.age).length,loss=rel?.03:.08;const l=Math.round(S.fol*loss);if(l>0){S.fol-=l;S._f0=S.fol;calcFame();log(`📉 Yıl içinde ${num(l)} takipçi kaybettin${rel?'':' (hiç şarkı çıkarmadın)'}.`,'dim')}}_yt()}}
/* 3) Sahip olduğun her şeyin 3 aylık gideri: yaşam, ev, araba, jet/yat/helikopter bakımı, sanat-mücevher sigortası, güvenlik, avukat, ekip maaşları */
function upkeepQ(){featInit&&featInit();const lux=(S.lux||[]).reduce((a,x)=>a+x.val*(x.k==='arac'?x.up:.01),0)/4,sec=(SEC[S.sec||0][1]+LAWR[S.lawyer||0][1])/4;return {lux:Math.round(lux),sec:Math.round(sec)}}
function teamNow(){if(!S.team||typeof TEAM==='undefined')return 0;return Object.keys(TEAM).filter(k=>S.team[k]).reduce((a,k)=>a+FS(TEAM[k][3]),0)}
{const _aq=ageUpQ;ageUpQ=function(){if(!S||!S.alive)return _aq();const u=upkeepQ(),tm=S.star?0:teamNow();if(!S.star)S.money-=u.lux+u.sec;_aq();if(!S||!S.alive||S.age<18)return;
 const e=(S.lastY&&S.lastY.exp)||{yasam:0,ev:0,araba:0},parts=[['yaşam',e.yasam],['ev',e.ev],['araba',e.araba],['jet/yat bakımı ve sigorta',S.star?0:u.lux],['güvenlik ve avukat',S.star?0:u.sec],['ekip maaşları',tm]].filter(x=>x[1]>=1),t=parts.reduce((a,x)=>a+x[1],0);
 if(t>0){S.qOut={t,parts,age:S.age,q:S.q};log(`🧾 3 aylık giderler ${fmtS(t)}: ${parts.map(x=>x[0]+' '+fmtS(x[1])).join(' · ')}`,'dim')}}}
/* 4) Yaşayan ekonomi: ülkelere göre konut ve kira endeksi, yeni araba fiyatları; arabaların değer kaybı ve yaşlandıkça artan bakım */
const ECOP={tr:{h:[.07,.13],r:[.08,.07],c:[.04,.06]},us:{h:[.04,.07],r:[.035,.03],c:[.025,.03]},uk:{h:[.035,.07],r:[.04,.03],c:[.025,.03]},de:{h:[.03,.06],r:[.03,.025],c:[.025,.03]},kr:{h:[.04,.09],r:[.03,.03],c:[.02,.03]},fr:{h:[.03,.06],r:[.03,.025],c:[.025,.03]}};
function eco(ct){S.eco=S.eco||{};if(!S.eco[ct])S.eco[ct]={h:1,r:1,c:1};return S.eco[ct]}
const gaussE=()=>{let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
function ecoApply(){if(!S)return;HOUSES.forEach(h=>{if(h.p0==null){h.p0=h.p;h.up0=h.up;h.rent0=h.rent}const e=eco(h.c||'tr');h.p=Math.round(h.p0*e.h/1e4)*1e4;h.up=Math.round(h.up0*e.h/1e3)*1e3;h.rent=Math.round(h.rent0*e.r/1e3)*1e3})}
{const _ac=applyCountry;applyCountry=function(ct){_ac(ct);if(!S)return;const e=eco(ct||'tr');CARS.forEach(c=>{c.p=Math.round(c.p*e.c/1e4)*1e4;c.up=Math.round(c.up*e.c/1e3)*1e3});ecoApply()}}
/* araba değeri: ilk yıl %15, sonra her yıl ~%9 düşer; pahalı arabalar 20 yaşından sonra klasikleşip değer kazanır */
function carB(id){S.carB=S.carB||{};const c=CARS.find(x=>x.id===id);if(!S.carB[id]&&c)S.carB[id]={a:S.age,buy:c.p};return S.carB[id]}
function carVal(id){const c=CARS.find(x=>x.id===id),b=carB(id);if(!c||!b)return 0;const y=Math.max(0,S.age-b.a);let v=b.buy*(y<1?.85:.85*Math.pow(.91,y-1));if(b.buy>=1e7&&y>=20)v=b.buy*.85*Math.pow(.91,19)*Math.pow(1.05,y-19);return Math.round(Math.max(v,b.buy*.05)/1e3)*1e3}
function carUpF(id){const b=(S.carB||{})[id];const y=b?Math.max(0,S.age-b.a):0;return 1+Math.min(1.5,y*.06)}
{const _c=ACT.car;ACT.car=id=>{const had=S.cars.includes(id);_c(id);if(!had&&S.cars.includes(id)){const c=CARS.find(x=>x.id===id);S.carB=S.carB||{};S.carB[id]={a:S.age,buy:c.p}}}}
ACT.sellCar=id=>{const c=CARS.find(x=>x.id===id),b=carB(id),v=carVal(id);S.cars=S.cars.filter(x=>x!==id);if(S.car===id)S.car=S.cars[0]||null;S.money+=v;if(S.carB)delete S.carB[id];log(`${c.n} satıldı: ${fmtS(v)} (${fmtS(b.buy)}'ye almıştın, ${Math.max(0,S.age-b.a)} yıl kullandın).`);sheet('hayat')};
/* ev alış fiyatını sakla, satışta kâr/zararı göster */
{const _h=ACT.house;ACT.house=id=>{const had=S.houses.includes(id);_h(id);if(!had&&S.houses.includes(id)){const h=HOUSES.find(x=>x.id===id);if(!h.rent){S.hbuy=S.hbuy||{};S.hbuy[id]=h.p}}}}
{const _sh=ACT.sellHouse;ACT.sellHouse=id=>{const h=HOUSES.find(x=>x.id===id),bp=(S.hbuy||{})[id];_sh(id);if(!S.houses.includes(id)&&h&&!h.rent&&bp){const d=h.p*.9-bp;log(`🏠 ${h.n}: ${fmtS(bp)}'ye almıştın, piyasa değeri ${fmtS(h.p)}. ${d>=0?'Kâr':'Zarar'}: ${fmtS(Math.abs(d))}.`,d>=0?'good':'bad');delete S.hbuy[id]}}}
function ecoYear(){const out={};Object.keys(CTRY).forEach(ct=>{const P=ECOP[ct]||ECOP.us,e=eco(ct),o={h:e.h,r:e.r,c:e.c};let dh=P.h[0]+P.h[1]*gaussE();if(ch(.06))dh=-RF(.08,.2);e.h=clamp(e.h*(1+dh),.4,50);e.r=clamp(e.r*(1+P.r[0]+P.r[1]*gaussE()),.4,50);e.c=clamp(e.c*(1+P.c[0]+P.c[1]*gaussE()),.5,50);out[ct]={h:e.h/o.h-1,r:e.r/o.r-1,c:e.c/o.c-1,crash:dh<-.07}});
 applyCountry(S.ct||'tr');const ct=S.ct||'tr',x=out[ct],pc=v=>(v>=0?'+':'−')+'%'+Math.abs(Math.round(v*100));
 const own=S.houses.map(id=>HOUSES.find(h=>h.id===id)).filter(h=>h&&!h.rent),ov=own.reduce((a,h)=>a+h.p,0);
 log(`${x.crash?'📉 Emlak piyasası çöktü!':'🏘'} ${CTRY[ct].fl} Bu yıl konut fiyatları ${pc(x.h)}, kiralar ${pc(x.r)}, sıfır araba fiyatları ${pc(x.c)}.${own.length?` Evlerinin toplam piyasa değeri: ${fmtS(ov)}.`:''}`,x.crash?'bad':'dim');S.ecoH=(S.ecoH||[]).concat({age:S.age,ct,...x}).slice(-30)}
{const _yt=yearTick;yearTick=function(){_yt();if(S&&S.alive){try{ecoYear()}catch(e){console.error(e)}}}}
{const _ei=extInit;extInit=function(){_ei();applyCountry(S.ct||'tr');(S.cars||[]).forEach(carB);(S.houses||[]).forEach(id=>{const h=HOUSES.find(x=>x.id===id);if(h&&!h.rent){S.hbuy=S.hbuy||{};if(S.hbuy[id]==null)S.hbuy[id]=h.p}})}}
/* 5) Evleri kiraya verme: oturmadığın evler kiracıya, 3 ayda bir kira geliri (vergisi kesilir); emlakçıdan aldığın mülkler de dahil */
const KYLD={tr:.05,us:.04,uk:.038,de:.035,kr:.03,fr:.035};
const letable=()=>(S.houses||[]).map(id=>HOUSES.find(h=>h.id===id)).filter(h=>h&&!h.rent&&h.id!==S.house);
function hRentQ(h){const e=eco(h.c||'tr');return Math.round(h.p*(KYLD[h.c||'tr']||.04)*(e.r/e.h)/4/1e3)*1e3}
ACT.letAll=on=>{S.hlet=S.hlet||{};let n=0;letable().forEach(h=>{if(!!S.hlet[h.id]!==on){S.hlet[h.id]=on;n++}});let m=0;((S.re&&S.re.own)||[]).forEach(x=>{if(reT(x.t)[4]&&!!x.rent!==on){x.rent=on;m++}});
 if(!n&&!m){toast(on?'Kiraya verilecek boş evin yok (oturduğun ev hariç).':'Kirada evin yok.');return}
 const q=letable().filter(h=>S.hlet[h.id]).reduce((a,h)=>a+hRentQ(h),0);log(on?`🔑 ${n+m} mülkünü kiraya verdin.${q?` Evlerinden 3 ayda bir yaklaşık ${fmtS(q)} kira gelecek.`:''}`:`🔑 ${n+m} mülkünü kiracılardan boşalttın.`,on?'good':'dim');drawSheet()};
ACT.let1=id=>{S.hlet=S.hlet||{};const h=HOUSES.find(x=>x.id===id);if(!h)return;if(id===S.house){toast('Oturduğun evi kiraya veremezsin; önce başka eve taşın.');return}S.hlet[id]=!S.hlet[id];log(S.hlet[id]?`🔑 ${h.n} (${h.loc}) kiraya verildi: 3 ayda ~${fmtS(hRentQ(h))}.`:`🔑 ${h.n} kiracıdan boşaltıldı.`,'dim');drawSheet()};
function letQ(){if(!S.hlet)return;let g=0,miss=0;letable().forEach(h=>{if(!S.hlet[h.id])return;if(ch(.05)){miss++;return}g+=hRentQ(h)});Object.keys(S.hlet).forEach(id=>{if(!S.houses.includes(id)||id===S.house)delete S.hlet[id]});
 if(g>0){const t=g*taxR(g),net=Math.round(g-t);S.money+=net;S.yr.rent=(S.yr.rent||0)+net;S.tot.all+=net;log(`🔑 Evlerinden kira geliri: ${fmtS(g)} (vergi ${fmtS(t)}) → net ${fmtS(net)}.${miss?` ${miss} kiracı bu 3 ay ödemedi.`:''}`,'good')}else if(miss)log(`🔑 ${miss} kiracın bu 3 ay kirayı ödemedi.`,'bad')}
{const _aq=ageUpQ;ageUpQ=function(){if(S&&S.alive&&S.age>=18)try{letQ()}catch(e){console.error(e)}_aq()}}
/* kirada olan eve taşınırsan kiracı çıkar */
{const _h=ACT.house;ACT.house=id=>{_h(id);if(S.house===id&&S.hlet&&S.hlet[id]){delete S.hlet[id];log('🔑 Kiracı çıktı, evine taşındın.','dim')}}}
function shLet(){S.hlet=S.hlet||{};const L=letable(),re=((S.re&&S.re.own)||[]).filter(x=>reT(x.t)[4]);const on=L.filter(h=>S.hlet[h.id]),q=on.reduce((a,h)=>a+hRentQ(h),0),reQ=re.filter(x=>x.rent).reduce((a,x)=>a+x.val*reT(x.t)[4]/4,0);
 let h=`<div class="hero2"><small>3 ayda bir kira geliri (vergi öncesi)</small><div class="big">${fmtS(q+reQ)}</div><span>${on.length+re.filter(x=>x.rent).length} mülk kirada · ${L.length+re.length} mülk kiraya verilebilir</span></div>`;
 h+=`<div class="two" style="margin:8px 0"><button class="btn" onclick="ACT.letAll(true)">🔑 Hepsini kiraya ver</button><button class="mini sec" onclick="ACT.letAll(false)">Hepsini boşalt</button></div>`;
 h+=note('Oturduğun ev hariç bütün evlerin ve emlakçıdan aldığın mülkler kiraya verilir. Kira her 3 ayda kasana yatar, gelir vergisi kesilir. Kira getirisi ülkeye ve o yılki kira piyasasına göre değişir; ara sıra kiracı ödemeyebilir. Bakım masrafı sende kalır. Kiradaki bir eve taşınırsan kiracı çıkar.');
 if(L.length)h+=sec('Evlerin')+L.map(x=>row(`ACT.let1('${x.id}')`,x.ic,x.n,`${CTRY[x.c||'tr'].fl} ${esc(x.loc)} · değeri ${fmtS(x.p)} · 3 ayda ~${fmtS(hRentQ(x))}`,S.hlet[x.id]?'✓ Kirada':'Boş')).join('');
 if(re.length)h+=sec('Emlak yatırımların')+re.map(x=>row(`ACT.reRent(${x.id})`,'🏢',esc(x.n),`${esc(x.loc)} · 3 ayda ~${fmtS(x.val*reT(x.t)[4]/4)}`,x.rent?'✓ Kirada':'Boş')).join('');
 if(!L.length&&!re.length)h+=note('Oturduğun ev dışında evin yok. Yeni bir ev alıp kiraya verebilirsin.');return h}
{const _sh=shHayat;shHayat=function(){if(SUB&&SUB.t==='kira')return shLet();let h=_sh();if(SUB||(S.htab||'iliski')!=='varlik')return h;S.hlet=S.hlet||{};
 const L=letable(),n=L.filter(x=>S.hlet[x.id]).length,r=row("sheet('hayat',{t:'kira',title:'Kiraya ver'})",'🔑','Evlerini kiraya ver',L.length?`${n}/${L.length} ev kirada · 3 ayda ~${fmtS(L.filter(x=>S.hlet[x.id]).reduce((a,x)=>a+hRentQ(x),0))}`:'Oturduğun ev dışında evin yok','›');
 const k='✈️';const i=h.indexOf('Başka şehre ya da ülkeye taşın');if(i<0)return r+h;const j=h.indexOf('</button>',i)+9;return h.slice(0,j)+r+h.slice(j)}}
actKeep();
