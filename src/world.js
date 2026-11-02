/* ============ Ülkeler: Türkiye, ABD, İngiltere — şehir, para birimi, vergi, dinlenme, isimler, ev/araba fiyatları, taşınma ============ */
const CTRY={
 tr:{n:'Türkiye',fl:'🇹🇷',cur:'₺',rate:1,stream:1,market:1,carF:1,
  cities:[['İstanbul',"İstanbul'da"],['Ankara',"Ankara'da"],['İzmir',"İzmir'de"],['Antalya',"Antalya'da"],['Bursa',"Bursa'da"],['Adana',"Adana'da"],['Trabzon',"Trabzon'da"]],
  tax:()=>[.2,'%20 stopaj'],taxD:'Telif ve sahne gelirlerinden %20 stopaj kesilir.'},
 us:{n:'Amerika',fl:'🇺🇸',cur:'$',rate:42,stream:1.6,market:1.8,carF:.45,
  cities:[['Los Angeles',"Los Angeles'ta",.133],['New York',"New York'ta",.109],['Miami',"Miami'de",0],['Atlanta',"Atlanta'da",.055],['Nashville',"Nashville'de",0],['Houston',"Houston'da",0]],
  tax:y=>{const st=(cityOf()[2]||0),f=y<100000?.22:y<250000?.32:.37;return [f+st,`%${Math.round(f*100)} federal${st?` + %${(st*100).toFixed(1).replace('.0','')} eyalet`:' (eyalet vergisi yok)'}`]},taxD:'Federal vergi kademeli: $100 B\'ye kadar %22, $250 B\'ye kadar %32, üstü %37. Eyalet vergisi şehre göre değişir: Kaliforniya %13,3, New York %10,9, Georgia %5,5; Florida, Tennessee ve Teksas\'ta yok.'},
 uk:{n:'İngiltere',fl:'🇬🇧',cur:'£',rate:55,stream:1.45,market:1.4,carF:.55,
  cities:[['Londra',"Londra'da"],['Manchester',"Manchester'da"],['Birmingham',"Birmingham'da"],['Liverpool',"Liverpool'da"],['Bristol',"Bristol'da"]],
  tax:y=>y<50000?[.2,'%20 gelir vergisi']:y<125000?[.4,'%40 gelir vergisi']:[.45,'%45 gelir vergisi'],taxD:'Gelir vergisi kademeli: £50 B\'ye kadar %20, £125 B\'ye kadar %40, üstü %45.'}};
const NAMES={tr:{e:NM_E.slice(),k:NM_K.slice(),s:SURN.slice(),ae:AFIRST_E.slice(),ak:AFIRST_K.slice()},
 us:{e:['Jayden','Marcus','Tyler','Andre','Jordan','Malik','Ethan','Caleb','Darius','Logan','Mason','Isaiah','Brandon','Xavier','Cole','Trey'],k:['Aaliyah','Jasmine','Madison','Kayla','Brianna','Ashley','Taylor','Sienna','Olivia','Destiny','Harper','Chloe','Jada','Riley','Morgan','Skye'],s:['Johnson','Williams','Brown','Jones','Davis','Miller','Wilson','Moore','Taylor','Anderson','Jackson','White','Harris','Martin','Thompson','Carter']},
 uk:{e:['Oliver','Harry','George','Jack','Charlie','Alfie','Archie','Theo','Leo','Freddie','Kai','Callum','Reece','Jamal','Louis','Finley'],k:['Amelia','Isla','Ava','Poppy','Freya','Evie','Ruby','Grace','Maisie','Imogen','Ellie','Chloe','Millie','Phoebe','Rosie','Niamh'],s:['Smith','Jones','Taylor','Brown','Evans','Walker','Wright','Robinson','Thompson','Hughes','Edwards','Green','Hall','Wood','Clarke','Turner']}};
NAMES.us.ae=NAMES.us.e;NAMES.us.ak=NAMES.us.k;NAMES.uk.ae=NAMES.uk.e;NAMES.uk.ak=NAMES.uk.k;
const ctId=()=>(S&&S.ct)||'tr',C0=()=>CTRY[ctId()];
const cityOf=()=>{const C=C0();return C.cities.find(c=>c[0]===(S&&S.city))||C.cities[0]};
function applyCountry(ct){const N=NAMES[ct]||NAMES.tr,sw=(a,b)=>a.splice(0,a.length,...b);sw(NM_E,N.e);sw(NM_K,N.k);sw(SURN,N.s);sw(AFIRST_E,N.ae);sw(AFIRST_K,N.ak);
 const C=CTRY[ct];PLAT.forEach(p=>{p.r0=p.r0||p.rate;p.rate=p.r0*C.stream});CARS.forEach(c=>{c.p0=c.p0||c.p;c.u0=c.u0||c.up;c.p=Math.round(c.p0*C.carF/1e4)*1e4;c.up=Math.round(c.u0*C.carF/1e3)*1e3})}
/* ---------- Para birimi ---------- */
const _fmt0=fmt;
const _fmtS0=fmtS;fmtS=function(n){const C=C0();if(C.rate===1)return _fmtS0(n);const v=n/C.rate;return (Math.abs(v)>=1e4?_fmtS0(v):_fmt0(v)).replace('₺',C.cur)};
fmt=function(n){const C=C0();if(C.rate===1)return _fmt0(n);return _fmt0(n/C.rate).replace('₺',C.cur)};
const _amtV0=amtV;amtV=function(id){return Math.round(_amtV0(id)*C0().rate)};
function curFix(html){const C=C0();if(C.rate===1||!html)return html;return html.replace(/₺\s?(\d{1,3}(?:\.\d{3})*(?:,\d+)?)(\s?(?:Mr|Mn|B)\b)?/g,(m,num,suf)=>{const v=parseFloat(num.replace(/\./g,'').replace(',','.'))*({Mr:1e9,Mn:1e6,B:1e3}[(suf||'').trim()]||1);return fmtS(v)}).replace(/\(₺\)/g,'('+C.cur+')')}
const _ds7=drawSheet;drawSheet=function(){_ds7();const b=document.querySelector('#ov .sh-b');if(b&&ctId()!=='tr'){const st=b.scrollTop;b.innerHTML=curFix(b.innerHTML);b.scrollTop=st}};
const _se7=showEvent;showEvent=function(){_se7();if(ctId()!=='tr'){const m=$('mod');m.innerHTML=curFix(m.innerHTML)}};
const _rn7=render;render=function(){_rn7();if(!S)return;const C=C0(),hs=$('hsub');if(hs){hs.innerHTML=`${C.fl} ${esc(S.city||C.cities[0][0])} · `+hs.innerHTML}if(ctId()!=='tr'){const l=$('log');if(l)l.innerHTML=curFix(l.innerHTML)}};
/* ---------- Vergi ---------- */
function taxR(gross){S.yti=(S.yti||0)+gross;const C=C0();return C.tax(S.yti/C.rate)[0]}
let taxLbl=()=>{const C=C0();return C.tax(((S&&S.yti)||0)/C.rate)[1]};
const _yt7=yearTick;yearTick=function(){_yt7();if(S){S.yti=0;renovYear()}};
const _pb7=payoutBox;payoutBox=function(pid){return _pb7(pid).replace('<b>Faturalı</b> çekersen %20 stopaj kesilir.',`<b>Faturalı</b> çekersen vergi kesilir (${C0().fl} şu an ${taxLbl()}).`)};
/* ---------- Dinlenme / pazar ---------- */
const _pf7=potFor;potFor=function(s,b){return _pf7(s,b)*C0().market*(S.intl&&S.ct!=='tr'?1+(S.intl[S.ct]||0)/200:1)};
/* ---------- Evler ---------- */
HOUSES.forEach(h=>h.c=h.c||'tr');
HOUSES.push({id:'us_apt',c:'us',n:'Kiralık daire',loc:'Brooklyn',ic:'🏢',rent:1.5e6,p:0,up:0,hap:5},{id:'us_loft',c:'us',n:'Loft daire',loc:'Downtown LA',ic:'🏙',rent:5e6,p:0,up:0,hap:9},
 {id:'us_condo',c:'us',n:'Lüks condo',loc:'Brickell, Miami',ic:'🌆',rent:0,p:50e6,up:1.26e6,hap:14},{id:'us_villa',c:'us',n:'Beverly Hills malikanesi',loc:'Beverly Hills',ic:'🏡',rent:0,p:756e6,up:16.8e6,hap:26},
 {id:'us_beach',c:'us',n:'Sahil evi',loc:'Malibu',ic:'🏖',rent:0,p:504e6,up:8.4e6,hap:14,second:true},{id:'us_pent',c:'us',n:'Manhattan penthouse',loc:'Manhattan',ic:'🏛',rent:0,p:1.89e9,up:25e6,hap:35},
 {id:'uk_flat',c:'uk',n:'Kiralık daire',loc:'Camden',ic:'🏢',rent:1.65e6,p:0,up:0,hap:5},{id:'uk_loft',c:'uk',n:'Loft daire',loc:'Shoreditch',ic:'🏙',rent:4.4e6,p:0,up:0,hap:9},
 {id:'uk_town',c:'uk',n:'Chelsea townhouse',loc:'Chelsea',ic:'🏡',rent:0,p:330e6,up:5.5e6,hap:20},{id:'uk_country',c:'uk',n:'Kır evi',loc:'Cotswolds',ic:'🏞',rent:0,p:192e6,up:2.75e6,hap:12,second:true},
 {id:'uk_pent',c:'uk',n:'Mayfair penthouse',loc:'Mayfair',ic:'🏛',rent:0,p:1.65e9,up:22e6,hap:34});
const hC=id=>{const h=HOUSES.find(x=>x.id===id);return h?h.c||'tr':'tr'};
const away=c=>{if(c!==ctId()){toast(`Bu mülk ${CTRY[c].fl} ${CTRY[c].n}'de. İşlem için oraya dönmelisin.`);return true}return false};
const _hs7=ACT.house;ACT.house=id=>{if(away(hC(id)))return;const had=S.houses.includes(id);_hs7(id);if(!had&&S.houses.includes(id)){S.hren=S.hren||{};S.hren[id]=S.age}};
const _sh7=ACT.sellHouse;ACT.sellHouse=id=>{if(away(hC(id)))return;const h=HOUSES.find(x=>x.id===id);if(renDue(id)&&!h.rent){const loss=Math.round(h.p*.18);S.money-=loss;log(`Ev tadilatsız olduğu için ${fmtS(loss)} daha ucuza gitti.`,'bad')}_sh7(id)};
const _hf7=ACT.hfeat;ACT.hfeat=(hid,fid)=>{if(away(hC(hid)))return;_hf7(hid,fid)};
const _shH7=shHayat;shHayat=function(){const T=SUB&&SUB.t;if(T==='move')return shMove();
 const all=HOUSES.slice();HOUSES.splice(0,HOUSES.length,...all.filter(h=>h.c===ctId()||S.houses.includes(h.id)).map(h=>h.c===ctId()?h:{...h,loc:`${CTRY[h.c].fl} ${h.loc} · 🔒 uzakta`}));let h;try{h=_shH7()}finally{HOUSES.splice(0,HOUSES.length,...all)}
 if(SUB)return h;const tab=S.htab||'iliski';
 if(tab==='varlik'){const C=C0(),mv=row("sheet('hayat',{t:'move',title:'Taşın'})",'✈️','Başka şehre ya da ülkeye taşın',`Şu an ${C.fl} ${esc(S.city||C.cities[0][0])} · ${C.n}`,'›');
  const due=renList();const rn=due.length?sec('🔨 Tadilat gerekli')+due.map(d=>row(`ACT.renov('${d.k}','${d.id}')`,'🔨',esc(d.n),`${CTRY[d.c].fl} ${esc(d.loc)} · ${S.age-d.y} yıldır tadilat görmedi · değeri ve mutluluğu düşüyor`,fmtS(d.cost))).join(''):'';
  const i=h.indexOf('<div class="tbar">'),j=i>=0?h.indexOf('</div>',h.indexOf('</b>',i))+6:0;h=h.slice(0,j)+mv+rn+h.slice(j)}
 return h};
/* ---------- Tadilat (10 yılda bir) ---------- */
function renDue(id){S.hren=S.hren||{};const h=HOUSES.find(x=>x.id===id);if(!h||h.rent)return false;if(S.hren[id]==null)S.hren[id]=S.age;return S.age-S.hren[id]>=10}
function renList(){const L=[];(S.houses||[]).forEach(id=>{const h=HOUSES.find(x=>x.id===id);if(h&&renDue(id))L.push({k:'h',id,n:h.n,loc:h.loc,c:h.c,y:S.hren[id],cost:Math.round(h.p*.06)})});
 ((S.re&&S.re.own)||[]).forEach(x=>{x.ren=x.ren==null?S.age:x.ren;x.c=x.c||(reT(x.t)[6]||'tr');if(S.age-x.ren>=10&&reT(x.t)[4])L.push({k:'r',id:String(x.id),n:x.n,loc:x.loc,c:x.c,y:x.ren,cost:Math.round(x.val*.05)})});return L}
ACT.renov=(k,id)=>{const d=renList().find(x=>x.k===k&&String(x.id)===String(id));if(!d)return;if(away(d.c))return;if(!pay(d.cost))return;if(!useM(1)){S.money+=d.cost;return}
 if(k==='h')S.hren[id]=S.age;else{const x=S.re.own.find(z=>String(z.id)===String(id));x.ren=S.age;x.val=Math.round(x.val*1.08)}log(`🔨 ${d.n} (${d.loc}) baştan aşağı yenilendi: ${fmtS(d.cost)}.`,'good');drawSheet()};
function renovYear(){const L=renList();L.forEach(d=>{if(d.k==='h'){if(S.house===d.id)add('happy',-3)}else{const x=S.re.own.find(z=>String(z.id)===d.id);if(x)x.val=Math.round(x.val*.96)}});
 const nw=L.filter(d=>S.age-d.y===10);if(nw.length)log(`🔨 ${nw.map(d=>d.n).join(', ')} 10 yaşına girdi; tadilat gerekiyor. Yapılmazsa değeri ve mutluluğun düşer.`,'bad')}
/* ---------- Emlakçı: ülkeye göre ---------- */
RET.forEach(t=>t[6]=t[6]||'tr');
RET.push(['us_condo','Condo',['Brooklyn','Miami','Austin','Atlanta'],[15e6,60e6],.05,'🏢','us'],['us_house','Müstakil ev',['Beverly Hills','Hamptons','Malibu','Scottsdale'],[80e6,800e6],.035,'🏡','us'],['us_shop','Dükkân',['Fifth Avenue','Rodeo Drive','SoHo'],[60e6,400e6],.06,'🏪','us'],
 ['uk_flat','Daire',['Camden','Shoreditch','Hackney','Brixton'],[25e6,70e6],.045,'🏢','uk'],['uk_town','Townhouse',['Chelsea','Kensington','Notting Hill'],[150e6,600e6],.03,'🏡','uk'],['uk_shop','Dükkân',['Oxford Street','Bond Street','Covent Garden'],[60e6,300e6],.06,'🏪','uk']);
const _rl7=reList;reList=function(){const keep=RET.slice();RET.splice(0,RET.length,...keep.filter(t=>t[6]===ctId()));try{_rl7()}finally{RET.splice(0,RET.length,...keep)}S.re.list.forEach(x=>x.c=ctId());S.re.lc=ctId()};
const _rb7=ACT.reBuy;ACT.reBuy=id=>{const n0=S.re.own.length;_rb7(id);if(S.re.own.length>n0){const x=S.re.own[S.re.own.length-1];x.c=ctId();x.ren=S.age}};
const _rs7=ACT.reSell;ACT.reSell=id=>{const x=S.re.own.find(z=>z.id===id);if(x&&away(x.c||'tr'))return;_rs7(id)};
const _rr7=ACT.reRent;ACT.reRent=id=>{const x=S.re.own.find(z=>z.id===id);if(x&&away(x.c||'tr'))return;_rr7(id)};
const _shRe7=shRe;shRe=function(){if(S.re.lc!==ctId())S.re.list=[];return _shRe7()};
/* ---------- Taşınma ---------- */
ACT.moveTo=(ct,city)=>{if(S.age<18){toast('Taşınmak için 18 yaşını beklemelisin.');return}if(ct===ctId()&&city===S.city)return;const intl=ct!==ctId(),cost=Math.round((intl?2.5e6:4e5)*(1+S.fame/60));
 if(!canPay(cost)){toast('Taşınma masrafı '+fmtS(cost));return}if(!useM(intl?2:1))return;S.money-=cost;const from=C0();
 if(S.house&&hC(S.house)!==ct){const h=HOUSES.find(x=>x.id===S.house);if(h&&h.rent)S.houses=S.houses.filter(x=>x!==S.house);S.house=null}
 S.ct=ct;S.city=city;applyCountry(ct);if(!S.house){const mine=HOUSES.filter(h=>h.c===ct&&S.houses.includes(h.id)&&!h.second).sort((a,b)=>b.hap-a.hap)[0];if(mine)S.house=mine.id}
 const C=C0(),cl=C.cities.find(c=>c[0]===city);if(intl){S.intl=S.intl||{};if(ct!=='tr')S.intl[ct]=clamp((S.intl[ct]||0)+10)}
 log(`✈️ ${intl?`${from.fl} ${from.n}'den ${C.fl} ${C.n}'e taşındın`:'Taşındın'}: artık ${cl[1]} yaşıyorsun. Masraf ${fmtS(cost)}.${intl?` Burada vergi: ${taxLbl()}.`:''}${S.house?'':' Henüz burada evin yok.'}`,'gold');SUB=null;S.htab='varlik';sheet('hayat')};
function shMove(){const cur=ctId();let h=note('Taşındığın ülkede para birimi, vergi, dinlenme başına kazanç, pazar büyüklüğü, ev ve araba fiyatları değişir. Yeni tanıştığın insanlar o ülkenin isimlerini taşır. Aldığın evler bulundukları ülkede kalır; satmak, düzenlemek ya da tadilat yapmak için o ülkeye dönmen gerekir.');
 Object.entries(CTRY).forEach(([k,C])=>{h+=`<div class="card"><div class="ch"><b>${C.fl} ${C.n}</b><span class="pill">${C.cur} · dinlenme ×${String(C.stream).replace('.',',')} · pazar ×${String(C.market).replace('.',',')}</span></div>${note(C.taxD+(C.carF!==1?` Araçlar Türkiye'ye göre %${Math.round((1-C.carF)*100)} daha ucuz.`:''))}<div class="tabs wrap">${C.cities.map(c=>`<button class="tab sm ${k===cur&&S.city===c[0]?'on':''}" onclick="ACT.moveTo('${k}','${c[0].replace(/'/g,"\\'")}')">${c[0]}${c[2]!=null&&k==='us'?` · %${(c[2]*100).toFixed(1).replace('.0','').replace('.',',')}`:''}</button>`).join('')}</div>${note(k===cur?'Şu an buradasın. Şehir değiştir: 1 hak.':'Uluslararası taşınma: 2 hak.')}</div>`});return h}
/* ---------- Karakter oluşturma: ülke ve şehir ---------- */
const _dc7=drawCreate;drawCreate=function(){if(CR&&!CR.ct){CR.ct='tr';CR.city='İstanbul'}_dc7();if(!CR)return;if(!CR.ct){CR.ct='tr';CR.city='İstanbul'}const w=document.querySelector('#create .names');if(!w)return;const C=CTRY[CR.ct];
 w.insertAdjacentHTML('afterend',`<div class="crct"><div class="tabs wrap">${Object.entries(CTRY).map(([k,c])=>`<button class="tab ${CR.ct===k?'on':''}" onclick="crCt('${k}')">${c.fl} ${c.n}</button>`).join('')}</div><select class="inp" onchange="CR.city=this.value">${C.cities.map(c=>`<option ${CR.city===c[0]?'selected':''}>${c[0]}</option>`).join('')}</select></div>`)};
function crCt(k){applyCountry(k);CR.ct=k;CR.city=CTRY[k].cities[0][0];CR.first=pick(CR.g==='k'?NM_K:NM_E);CR.last=pick(SURN);drawCreate()}
const _nl7=newLife;newLife=function(c){const ct=c.ct||'tr',city=c.city||CTRY[ct].cities[0][0];applyCountry(ct);_nl7(c);S.ct=ct;S.city=city;applyCountry(ct);const cl=CTRY[ct].cities.find(x=>x[0]===city)||CTRY[ct].cities[0];
 S.log.forEach(y=>(y.it||[]).forEach(it=>{if(typeof it.t==='string')it.t=it.t.replace("İstanbul'da dünyaya geldin",cl[1]+' dünyaya geldin')}));save();render()};
const _ei7=extInit;extInit=function(){_ei7();S.ct=S.ct||'tr';S.city=S.city||'İstanbul';applyCountry(S.ct)};
/* ---------- Süperstar: istediğin kadar para ---------- */
ACT.selfMoney=sign=>{if(!S.star)return;const x=amtV('ss_m');if(!need(x))return;S.money+=sign*x;log(`⭐ Kasana ${sign>0?'+':'−'}${fmtS(x)}.`,'gold');drawSheet()};
const _ss7=shSelf;shSelf=function(){let h=_ss7();if(!S.star)return h;return h+sec('💰 İstediğin kadar para')+note(`Tutarı ${C0().cur} olarak yaz.`)+amtIn('ss_m',`Tutar (${C0().cur})`)+btns([['Kasaya ekle','ACT.selfMoney(1)'],['Kasadan çıkar','ACT.selfMoney(-1)','sec']])};
actKeep();
/* banka işlemlerinde net bilgi */
{const _d=ACT.dep,_w=ACT.wd;ACT.dep=x=>{const b0=S.bank;_d(x);const d=S.bank-b0;if(d>0){toast(`🏦 Bankaya ${fmt(d)} yatırıldı.`);log(`🏦 Bankaya ${fmt(d)} yatırdın.`,'dim')}};
 ACT.wd=x=>{const b0=S.bank;_w(x);const d=b0-S.bank;if(d>0){toast(`🏦 Bankadan ${fmt(d)} çekildi.`);log(`🏦 Bankadan ${fmt(d)} çektin.`,'dim')}}}
actKeep();
