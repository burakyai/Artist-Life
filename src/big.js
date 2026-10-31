/* ============ BÜYÜK PAKET: menajer, şirkete teklif, miras, emlak, vergi, mafya, merch ============ */
function bigInit(){const d={re:null,untaxed:0,maf:null,merch:null};Object.keys(d).forEach(k=>{if(S[k]===undefined)S[k]=d[k]});
 if(!S.re)S.re={own:[],list:[],ly:-1};}
CAMPS.push({id:'sosyal',n:'Sosyal medya PR',ic:'📱',d:'Instagram, TikTok ve X\'te ücretli tanıtım · ilgi ×1,2 · takipçi ↑',b:60000,f:.5,m:1.2,fans:1});

/* ---------- Menajer ---------- */
ACT.mgrSearch=()=>{if(S.manager){toast('Zaten bir menajerin var.');return}if(S.age<16){toast('16 yaşını bekle.');return}if(!canPay(50000)){toast('Menajer ajansı ücreti ₺50 B');return}if(!useM(1))return;S.money-=50000;
 const n=R(2,3);for(let i=0;i<n;i++){const lv=clamp(Math.round(S.fame/20)+R(0,2),1,5);S.offers.push({id:S.nid++,k:'mgr',n:pick(MANAGERS.concat(['Ceyda Arslan','Okan Bilge','Rana Kaya','Tarık Öz'])),cut:[.2,.18,.16,.15,.12][lv-1]+RF(-.02,.02),lv})}
 log('Menajer ajansıyla görüştün, birkaç menajer seninle çalışmak istiyor.','good');SUB={t:'offers',title:'Teklifler'};sheet('kariyer')};
function mgrConcert(){if(!S.star||!S.manager)return;const vs=VENUES.filter(v=>VEN2[v.id]&&S.age>=v.age&&S.fame>=v.fame&&!(v.id==='festival'&&S.q!==2));
 if(!vs.length){const g=[...VENUES].reverse().find(v=>S.age>=v.age&&S.fame>=v.fame);if(!g){toast('Henüz uygun mekân yok.');return}S.months+=g.m;ACT.gig(g.id);return}
 const v=vs[vs.length-1],arts=S.friends.filter(f=>f.type==='sanatci').sort((a,b)=>b.fame-a.fame);cpNew(v.id);S.cp.pr=1;S.cp.prod=2;S.cp.set=1;S.cp.prova=2;S.cp.guest=arts[0]?arts[0].id:null;S._mgr=1;ACT.concert();S._mgr=0;log(`${S.manager.n} konseri en yüksek kalitede organize etti: mega prodüksiyon, tam prova${arts[0]?', konuk '+arts[0].name:''}.`,'gold')}
function shMgr(){const m=S.manager;if(!m){SUB=null;return shKariyer()}let h=`<div class="card"><div class="ch"><b>🕴 ${esc(m.n)}</b><span class="pill">Menajerin</span></div>${note(`Komisyon %${Math.round(m.cut*100)} · sadece konser ve reklam gelirinden alır, dijital telif ve albüm satışından almaz. Sahne ücretlerin %35 artar, daha çok marka teklifi gelir.`)}</div>`;
 h+=row("sheet('kariyer',{t:'pitch',title:'Şirketlere git'})",'📀','Menajerinle şirketlere git','Kabul şansı ve avans daha yüksek','›');
 if(S.star)h+=row('mgrConcert();drawSheet()','⭐','Konser organize et','Menajerin en yüksek kalitede organize eder · hak harcamaz','Süperstar');
 return h+row('ACT.fire();SUB=null;drawSheet()','👋','Menajerle yollarını ayır','','')}
/* ---------- Şirketlere teklif götür ---------- */
function genLabelN(L,mult){const f=S.fame,yrs=R(2,4);const b={adv:Math.round(L.t*L.t*1.2e6*(1+f/20)*RF(.8,1.2)*(mult||1)/1e4)*1e4,roy:Math.round(clamp(RF(18,30)-L.t*1.5+f/12+(mult>1?3:0),12,50)),yrs,reqS:yrs*2+R(0,2),reqC:Math.max(0,yrs-1+R(-1,1)),rec:true,is360:ch(.4)};
 const o={id:S.nid++,k:'label',n:L.n,t:L.t,b,ask:{...b},pat:3,flex:.1+f/350+(S.manager?.12:0)+RF(0,.08),ok:false,msg:''};S.offers=S.offers.filter(x=>!(x.k==='label'&&x.n===L.n));S.offers.push(o);return o}
ACT.pitch=(i,viaM)=>{const L=LABELS[i];if(S.contract){toast('Sözleşmen bitmeden yeni şirkete gidemezsin.');return}if(!released().length){toast('Önce en az bir şarkı yayınla.');return}if(viaM&&!S.manager){toast('Önce bir menajer bul.');return}
 S.pitchY=S.pitchY||{};if(S.pitchY[L.n]===S.age&&!S.star){toast(`${L.n} bu yıl seni zaten dinledi.`);return}if(!useM(1))return;S.pitchY[L.n]=S.age;
 const best=Math.max(...released().map(s=>s.q));const p=S.star?1:clamp(.25+S.fame/150+(best-60)/200-(L.t-1)*.1+(viaM?.25:0),.03,.92);
 if(ch(p)){const o=genLabelN(L,viaM?1.2:1);log(`${viaM?S.manager.n+' ile ':''}${L.n} ofisine gittin, demolarını dinlettin. Teklif geldi!`,'gold');SUB={t:'neg',id:o.id,title:'Pazarlık'};sheet('kariyer')}
 else{log(`${L.n}: "Şu an kadromuz dolu, seni takip ediyoruz."`,'dim');drawSheet()}};
function shPitch(){let h=note('Plak şirketlerine kendin ya da menajerinle gidip demolarını dinletebilirsin. Büyük şirketler daha yüksek şöhret ister. Her şirkete yılda bir kez gidebilirsin.');
 if(S.contract)return h+note(`Şu an ${S.contract.n} ile sözleşmen var.`);
 LABELS.forEach((L,i)=>{const p=clamp(.25+S.fame/150-(L.t-1)*.1,.03,.92);h+=`<div class="card"><div class="ch"><b>📀 ${L.n}</b><span class="pill">Seviye ${L.t}</span></div>${note(`Tahmini kabul şansı: kendin %${Math.round(p*100)} · menajerinle %${Math.round(clamp(p+.25,0,.95)*100)}`)}<div class="two"><button class="mini sec" onclick="ACT.pitch(${i},false)">Kendin git · 1 hak</button><button class="mini" onclick="ACT.pitch(${i},true)" ${S.manager?'':'disabled'}>Menajerinle git</button></div></div>`});return h}

/* ---------- Miras: çocuğunla devam ---------- */
function showDeath(){const best=[...S.songs].sort((a,b)=>b.total-a.total)[0];const heirs=S.kids.filter(k=>k.age>=0);
 const est=Math.max(0,S.money)+S.bank+portVal()+pendT()+(S.re?S.re.own.reduce((a,x)=>a+x.val,0):0);
 $('mod').innerHTML=`<div class="box dead"><div class="av big">${AV(S.look,S.age)}</div><h2>${esc(S.first)} ${esc(S.last)}</h2><p class="eh">${S.age} yaşında hayata veda etti</p>
 <div class="kv"><div>Unvan<b>${title()}</b></div><div>Takipçi<b>${num(S.fol)}</b></div><div>Toplam dinlenme<b>${num(S.tot.streams)}</b></div><div>Toplam servet<b>${fmtS(est)}</b></div><div>En büyük hit<b>${best?esc(best.t):'—'}</b></div><div>Ödüller<b>${S.awards.filter(a=>a.win!==false).length}</b></div></div>
 ${heirs.length?`<div class="sec" style="text-align:left">Mirasla devam et</div><p class="note" style="text-align:left">Çocuklarından birini seç. Servetin (%10 veraset vergisi düşülerek), evlerin, arabaların, şirketin, emlakların ve şarkılarının telifleri ona geçer.</p>`+heirs.map(k=>`<button class="row" onclick="inherit(${k.id})"><span class="ic">${k.g==='k'?'👧':'👦'}</span><span class="tx"><b>${esc(k.name)}</b><span>${k.rel} · ${k.age} yaş</span></span><span class="rt">Devam ›</span></button>`).join(''):''}
 <button class="btn" onclick="restart()">Yeni hayat</button><button class="btn sec" onclick="toMenu()">Ana menü</button></div>`;$('mod').classList.add('on')}
function inherit(id){const P=S,k=P.kids.find(x=>x.id===id);if(!k)return;const g=k.g==='k'?'k':'e';
 const est=Math.max(0,P.money)+P.bank+portVal()+pendT();const net=Math.round(est*.9);
 const look={skin:P.look.skin,hair:g==='k'?pick(['uzundalga','kakul','bob','boxbraid']):pick(['curtain','twist','skinfade','wolf','mullet']),hairColor:P.look.hairColor,beard:'yok',outfit:'tisort',oc:{},acc:[],g};
 const parent={id:1,rel:P.g==='k'?'Annen':'Baban',name:P.first+' '+P.last,age:P.age,job:'sanatçı',yak:90,alive:false};
 const other=P.partner?{id:2,rel:P.g==='k'?'Baban':'Annen',name:P.partner.name,age:P.partner.age,job:FTYPES[P.partner.type||'normal'].n.toLowerCase(),yak:R(60,90),alive:true}:null;
 const N=JSON.parse(JSON.stringify(P));Object.assign(N,{first:k.name.split(' ')[0],g,age:k.age,alive:true,look,health:R(80,100),happy:60,skill:clamp(R(0,8)+(k.age>8?R(5,15):0)),talent:R(30,100),fol:Math.round(P.fol*.05),fame:0,genre:null,instr:[],kons:0,grad:false,
  contract:null,manager:null,offers:[],feat:null,friends:[],partner:null,kids:P.kids.filter(x=>x.id!==id).map(x=>({...x,rel:x.g==='k'?'Kız kardeşin':'Erkek kardeşin'})),fam:[parent].concat(other?[other]:[]),
  money:net,bank:0,port:{},pend:{spo:0,tube:0,fizzy:0,pear:0},loan:0,awards:[],best:{tr:null,gl:null},evq:[],months:HAK,maf:null,untaxed:0,star:P.star,autoMeet:P.autoMeet,log:[],owned:['tisort'],accOwned:[]});
 N.songs.forEach(s=>{s.inh=s.inh||P.first});N.offers=[];S=N;
 log(`${P.first} ${P.last} hayata veda etti. Mirası sana kaldı: ${fmtS(net)} (veraset vergisi düşüldü)${P.lab?', '+P.lab.n+' şirketi':''}${P.houses.length?', evler':''} ve ${P.songs.length} şarkının telifleri.`,'gold');
 calcFame();save();$('mod').classList.remove('on');render()}

/* ---------- Emlakçı ---------- */
const RET=[['daire','2+1 daire',['Kadıköy','Beşiktaş','Ataşehir','Üsküdar','Şişli'],[4e6,12e6],.04,'🏢'],['rez','Rezidans dairesi',['Levent','Ataşehir','Nişantaşı','Maslak'],[12e6,40e6],.04,'🌆'],['dukkan','Dükkân',['Bağdat Caddesi','İstiklal','Moda','Nişantaşı'],[8e6,30e6],.065,'🏪'],
 ['villa','Villa',['Zekeriyaköy','Beykoz','Bodrum','Çeşme'],[40e6,150e6],.03,'🏡'],['arsa','Arsa',['Çatalca','Silivri','Şile','Urla'],[3e6,25e6],0,'🌾'],['ofis','Ofis katı',['Maslak','Levent','Ataşehir'],[20e6,80e6],.06,'🏬'],['otel','Butik otel',['Kapadokya','Alaçatı','Kaş'],[60e6,250e6],.08,'🏨'],['yali','Yalı',['Yeniköy','Kandilli','Kuzguncuk'],[300e6,1.2e9],.02,'🏛']];
function reList(){const L=[];for(let i=0;i<7;i++){const t=pick(RET),p=Math.round(RF(t[3][0],t[3][1])/1e5)*1e5;L.push({id:S.nid++,t:t[0],n:t[1],loc:pick(t[2]),val:p,ic:t[5]})}S.re.list=L;S.re.ly=S.age}
const reT=id=>RET.find(x=>x[0]===id);
ACT.reBuy=id=>{const x=S.re.list.find(z=>z.id===id),fee=Math.round(x.val*.04);if(!pay(x.val+fee))return;S.re.list=S.re.list.filter(z=>z.id!==id);S.re.own.push({...x,buy:x.val,rent:false});log(`Emlakçı aracılığıyla ${x.loc}'de ${x.n.toLowerCase()} aldın: ${fmtS(x.val)} + tapu harcı ${fmtS(fee)}.`,'good');drawSheet();render()};
ACT.reSell=id=>{const x=S.re.own.find(z=>z.id===id),c=Math.round(x.val*.02);S.money+=x.val-c;S.re.own=S.re.own.filter(z=>z.id!==id);const kar=x.val-x.buy;log(`${x.loc}'deki ${x.n.toLowerCase()} satıldı: ${fmtS(x.val)} (emlakçı komisyonu ${fmtS(c)}). ${kar>=0?'Kâr':'Zarar'}: ${fmtS(kar)}`,kar>=0?'good':'bad');drawSheet();render()};
ACT.reRent=id=>{const x=S.re.own.find(z=>z.id===id);if(!reT(x.t)[4]){toast('Arsa kiraya verilemez.');return}x.rent=!x.rent;log(x.rent?`${x.loc}'deki ${x.n.toLowerCase()} kiraya verildi.`:`${x.loc}'deki ${x.n.toLowerCase()} kiracıdan boşaltıldı.`,'dim');drawSheet()};
function reQuarter(){if(!S.re)return;let rent=0;S.re.own.forEach(x=>{if(x.rent){const r=x.val*reT(x.t)[4]/4;if(ch(.06)){log(`${x.loc}'deki kiracın bu 3 ay kirayı ödemedi.`,'bad')}else rent+=r}});if(rent>0){const tax=rent*.2;S.money+=rent-tax;S.reInc=(S.reInc||0)+rent-tax}}
function reYear(){if(!S.re)return;let tax=0;S.re.own.forEach(x=>{const g=x.t==='arsa'?RF(-.05,.75):RF(.15,.45);x.val=Math.round(x.val*(1+g)/1e5)*1e5;tax+=x.val*(x.val>50e6?.006:.002)});
 if(tax>0){S.money-=tax;log(`Emlak vergisi: ${fmtS(tax)}. ${S.reInc?'Bu yılki net kira gelirin '+fmtS(S.reInc)+'.':''}`,'dim')}S.reInc=0;
 S.re.list.forEach(x=>x.val=Math.round(x.val*RF(1.15,1.45)/1e5)*1e5);if(S.age-S.re.ly>=1)reList()}
function shRe(){if(!S.re.list.length)reList();const t=(SUB&&SUB.tab)||'port',own=S.re.own,tot=own.reduce((a,x)=>a+x.val,0),cost=own.reduce((a,x)=>a+x.buy,0);
 let h=`<div class="hero2"><small>Emlak portföyün</small><div class="big">${fmtS(tot)}</div><span>${own.length} mülk · alış ${fmtS(cost)} · değer artışı ${fmtS(tot-cost)} · ${own.filter(x=>x.rent).length} mülk kirada</span></div>`;
 h+=`<div class="tabs">${[['port','Portföyüm'],['ilan','İlanlar']].map(([k,n])=>`<button class="tab ${t===k?'on':''}" onclick="SUB={t:'re',tab:'${k}',title:'Emlakçı'};drawSheet()">${n}</button>`).join('')}</div>`;
 if(t==='port'){if(!own.length)h+=note('Henüz yatırım mülkün yok. İlanlara göz at.');own.forEach(x=>{const k=x.val-x.buy,y=reT(x.t)[4];h+=`<div class="card"><div class="ch"><b>${x.ic} ${x.n}</b><span class="pill">${x.loc}</span></div><div class="kv"><div>Güncel değer<b>${fmtS(x.val)}</b></div><div>Alış<b>${fmtS(x.buy)}</b></div><div>${k>=0?'Kâr':'Zarar'}<b class="${k<0?'neg':''}">${fmtS(k)}</b></div><div>Kira (yıllık)<b>${y?fmtS(x.val*y):'—'}</b></div></div><div class="two"><button class="mini ${x.rent?'sec':''}" onclick="ACT.reRent(${x.id})">${x.rent?'Kiradan çek':'Kiraya ver'}</button><button class="mini red" onclick="ACT.reSell(${x.id})">Sat · ${fmtS(x.val)}</button></div></div>`})}
 else{h+=note('İlanlar her yıl yenilenir. Alışta %4 tapu harcı, satışta %2 emlakçı komisyonu var. Mülkler her yıl değer kazanır (arsa daha oynaktır). Kira gelirinden %20 vergi, mülk değerinden yıllık emlak vergisi kesilir.');
  S.re.list.forEach(x=>h+=row(`ACT.reBuy(${x.id})`,x.ic,x.n,`${x.loc} · kira getirisi %${Math.round(reT(x.t)[4]*1000)/10}/yıl`,fmtS(x.val)))}
 return h}

/* ---------- Vergi: faturalı / faturasız çekim ---------- */
ACT.payout=(pid,to,amt,inv)=>{const ids=pid==='all'?PLAT.map(p=>p.id):[pid];const avail=ids.reduce((a,k)=>a+S.pend[k],0);if(amt!=null&&!need(amt))return;let x=amt==null?avail:Math.min(amt,avail);if(x<1){toast('Çekilecek bakiye yok.');return}
 ids.forEach(k=>{const take=avail?x*S.pend[k]/avail:0;S.pend[k]-=take});let got=x;if(inv){const t=x*.2;got=x-t;log(`${fmtS(x)} faturalı çekildi: %20 stopaj ${fmtS(t)}, eline geçen ${fmtS(got)}.`,'dim')}else{S.untaxed=(S.untaxed||0)+x*.2;log(`${fmtS(x)} faturasız çekildi. Ödenmeyen vergi: ${fmtS(x*.2)}. Maliye fark ederse ceza yazar!`,'bad')}
 if(to==='bank')S.bank+=got;else S.money+=got;drawSheet();render()};
function payoutBox(pid){const x=pid==='all'?pendT():(S.pend[pid]||0),id='po_'+pid;return `<div class="card pay"><div class="ch"><b>💰 ${pid==='all'?'Platformlarda bekleyen telif':'Hesap bakiyesi'}</b><span class="pill gold">${fmtS(x)}</span></div>${note('Telif vergiden önceki tutarla burada birikir. <b>Faturalı</b> çekersen %20 stopaj kesilir. <b>Faturasız</b> çekersen tamamı gelir ama maliye fark ederse vergi + %100 ceza yazar.')}${pid==='all'?`<div class="kv">${PLAT.map(p=>`<div>${p.n}<b>${fmtS(S.pend[p.id]||0)}</b></div>`).join('')}</div>`:''}
 ${amtIn(id,'Çekilecek tutar (boş = tümü)')}${btns([['🧾 Faturalı · kasaya',`ACT.payout('${pid}','cash',amtV('${id}')||null,true)`],['🧾 Faturalı · bankaya',`ACT.payout('${pid}','bank',amtV('${id}')||null,true)`,'sec']])}<div style="height:6px"></div>${btns([['⚠️ Faturasız · kasaya',`ACT.payout('${pid}','cash',amtV('${id}')||null,false)`,'red'],['⚠️ Faturasız · bankaya',`ACT.payout('${pid}','bank',amtV('${id}')||null,false)`,'red']])}${S.untaxed>0?note(`Ödenmemiş vergin: <b class="neg">${fmtS(S.untaxed)}</b>`):''}</div>`}
EVENTS.push({id:'maliye',min:99,title:'Maliye kapında',text:p=>`Vergi müfettişleri faturasız çektiğin telifleri tespit etti. Ödenmeyen vergi ${fmtS(p.tax)}, ceza ile birlikte ${fmtS(p.tax*2)} istiyorlar.`,ch:[
 {t:'Vergiyi ve cezayı öde',fn:p=>{S.money-=p.tax*2;S.untaxed=0;log(`Maliyeye ${fmtS(p.tax*2)} ödedin.`,'bad')}},
 {t:'Avukatla itiraz et (₺500 B)',fn:p=>{S.money-=500000;if(ch(.5+(S.friends.some(f=>f.type==='avukat')?.15:0))){S.money-=p.tax;log(`İtiraz kabul edildi, sadece vergiyi (${fmtS(p.tax)}) ödedin.`,'good')}else{S.money-=p.tax*2.5;log(`İtiraz reddedildi, gecikme faiziyle ${fmtS(p.tax*2.5)} ödedin.`,'bad')}S.untaxed=0}}]});
EVSTAR.maliye=['Mali müşavirler her şeyi temize çıkarsın',()=>{S.untaxed=0;log('Dosyan kapandı, hiçbir ceza ödemedin.','good')}];

/* ---------- Müzik mafyası ---------- */
const MAFA=[['boy','Boy göster','Kulüplerde, sahne arkalarında adını duyur · saygı ↑','💪',1],['sabotaj','Rakibin konserini sabote et','Saygı ↑↑ · dikkat ↑↑','🔥',1],['koruma','Rüşvetle dosyaları kapat','Dikkati düşürür','🤝',0]];
ACT.mafJoin=yes=>{if(yes){S.maf={on:true,rep:5,heat:5,earn:0};log('Müzik piyasasının karanlık yüzüyle tanıştın. Artık "aile"densin.','bad')}else log('Teklifi reddettin. Bu dünyadan uzak durdun.','good');drawSheet()};
ACT.maf=k=>{const M=S.maf;if(!M||!M.on)return;
 if(k==='boy'){if(!useM(1))return;M.rep=clamp(M.rep+R(3,8));M.heat=clamp(M.heat+2);if(ch(.2)){add('health',-6);log('Boy gösterirken bir kulüpte kavgaya karıştın.','bad')}else log('Gece kulüplerinde adın duyulmaya başladı.','dim')}
 if(k==='sabotaj'){if(!useM(1))return;M.rep=clamp(M.rep+R(6,12));M.heat=clamp(M.heat+R(6,10));log(`${pick(RIVALS.concat(ARTISTS2))}'ın konserinde ses sistemi "gizemli" şekilde çöktü.`,'bad')}
 if(k==='koruma'){const x=Math.max(250000,Math.round(M.heat*60000));if(!pay(x))return;M.heat=clamp(M.heat-R(12,20));log(`Bazı kişilere ${fmtS(x)} "hediye" ettin. Hakkındaki dosyalar tozlu raflara kalktı.`,'dim')}
 drawSheet();render()};
ACT.launder=()=>{const M=S.maf,x=amtV('mf_a');if(!need(x))return;const max=Math.max(1e6,M.rep*2e6);if(x>max){toast(`Saygın bu kadarına yetmiyor. En fazla ${fmtS(max)}.`);return}if(!useM(1))return;
 const cut=RF(.1,.2),gain=Math.round(x*cut);S.money+=gain;M.earn+=gain;M.heat=clamp(M.heat+Math.max(3,x/1e6*2.5));M.rep=clamp(M.rep+2);
 log(`${fmtS(x)} kara parayı konser hasılatı ve şirket gelirleri üzerinden akladın. Komisyonun %${Math.round(cut*100)}: ${fmtS(gain)}.`,'bad');drawSheet();render()};
ACT.mafLeave=()=>{const M=S.maf;M.on=false;if(ch(.3)){add('health',-10);log('"Aile"den ayrılmak kolay olmadı, arabana zarar verdiler.','bad')}else log('Karanlık işlerden elini çektin.','good');drawSheet()};
function mafQuarter(){const M=S.maf;if(!M)return;M.heat=clamp(M.heat-(M.on?2:5));if(M.heat>30&&ch(M.heat/180)&&!S.evq.some(e=>e.id==='sorusturma'))S.evq.push({id:'sorusturma',p:{fine:Math.round(Math.max(2e6,M.earn*.6)/1e4)*1e4}})}
EVENTS.push({id:'mafyateklif',min:18,once:true,c:()=>S.fame>=25&&!S.maf,title:'Karanlık bir teklif',text:()=>'Ünlü bir gece kulübü zincirinin sahibi seni özel locasına çağırdı: "Müzik piyasasında para kazanmanın kestirme yolları var. Bizimle çalış."',ch:[{t:'Dinle, içeri gir',fn:()=>ACT.mafJoin(true)},{t:'Kalk ve git',fn:()=>ACT.mafJoin(false)}]},
 {id:'sorusturma',min:99,title:'Soruşturma açıldı',text:p=>`Savcılık kara para aklama iddiasıyla hakkında soruşturma başlattı. Uzlaşma için ${fmtS(p.fine)} ceza öneriliyor.`,ch:[
  {t:'Cezayı öde, dosya kapansın',fn:p=>{S.money-=p.fine;S.maf.heat=10;log(`${fmtS(p.fine)} ceza ödedin, dosya kapandı.`,'bad')}},
  {t:'Mahkemeye git · avukat ₺250 B',fn:p=>court(p,250000,.35)},{t:'Mahkemeye git · ünlü avukat ₺2 Mn',fn:p=>court(p,2e6,.55)},{t:'Mahkemeye git · avukat ordusu ₺10 Mn',fn:p=>court(p,1e7,.75)}]});
function court(p,fee,ch0){S.money-=fee;const w=ch0+(S.friends.some(f=>f.type==='avukat')?.1:0);if(ch(w)){S.maf.heat=5;log(`Mahkemede beraat ettin! Avukatlık ücreti ${fmtS(fee)}.`,'gold')}else{S.money-=p.fine*2;S.fol=Math.round(S.fol*.9);add('happy',-15);S.maf.heat=15;log(`Davayı kaybettin. ${fmtS(p.fine*2)} ceza ödedin, hayranların arasında itibarın zedelendi.`,'bad')}}
EVSTAR.sorusturma=['Süperstar: her şeyden temiz çık',()=>{S.maf.heat=0;log('Soruşturma delil yetersizliğinden düştü.','gold')}];
EVSTAR.mafyateklif=['Teklifi dinle ama hep bir adım önde ol',()=>{ACT.mafJoin(true);S.maf.rep=20}];
function shMaf(){const M=S.maf;if(!M||!M.on)return note('Bu dünyayla bağın yok.')+(M?'':note('Şöhretin 25\'i geçince karanlık teklifler gelebilir.'));
 let h=`<div class="hero2" style="background:linear-gradient(135deg,#1a1010,#3a0d12)"><small>Gölge dünya</small><div class="big">${fmtS(M.earn)}</div><span>Kara paradan toplam kazancın</span></div>`;
 h+=`<div class="kv"><div>Saygı<b>%${Math.round(M.rep)}</b></div><div>Polis dikkati<b class="${M.heat>30?'neg':''}">%${Math.round(M.heat)}</b></div></div><div class="bar"><i style="width:${M.heat}%;background:${M.heat>30?'#ff7d73':'#ffc24b'}"></i></div>${note('Dikkat %30\'u geçerse soruşturma açılabilir. Avukat arkadaşın mahkemede şansını artırır.')}`;
 h+=sec('İşler')+MAFA.map(([k,n,d,ic,hk])=>row(`ACT.maf('${k}')`,ic,n,d,k==='koruma'?fmtS(Math.max(250000,Math.round(M.heat*60000))):hk+' hak')).join('');
 h+=sec('Kara para aklama')+note(`Konser hasılatı ve şirket gelirleri üzerinden para aklarsın, %10-20 komisyon alırsın. Saygına göre en fazla ${fmtS(Math.max(1e6,M.rep*2e6))}. Dikkati çok artırır.`)+amtIn('mf_a','Aklanacak tutar (₺)')+`<button class="btn" onclick="ACT.launder()">💼 Operasyona katıl · 1 hak</button>`;
 return h+row('ACT.mafLeave()','🚪','Bu işlerden çekil','Risksiz değildir','')}

/* ---------- Merch ---------- */
const MPROD=[['tisort','Tişört',500000,.06,'👕'],['hoodie','Hoodie',800000,.08,'🧥'],['sapka','Şapka',300000,.03,'🧢'],['poster','Poster & plak',400000,.04,'💿'],['parfum','Parfüm',5000000,.15,'🧴'],['sneaker','Sneaker koleksiyonu',10000000,.22,'👟']];
ACT.merchFound=()=>{if(S.merch)return;if(S.fame<20&&!S.star){toast('Merch markası için şöhretin en az 20 olmalı.');return}if(!pay(2000000))return;S.merch={n:(S.first+' '+S.last).toUpperCase(),prods:[],tot:0};log('Kendi merch markanı kurdun!','gold');drawSheet()};
ACT.merchProd=id=>{const p=MPROD.find(x=>x[0]===id);if(S.merch.prods.includes(id))return;if(!pay(p[2]))return;S.merch.prods.push(id);log(`${S.merch.n} markasıyla ${p[1].toLowerCase()} serisi çıkardın.`,'good');drawSheet()};
function merchQuarter(){const M=S.merch;let inc=0;if(M&&M.prods.length){M.prods.forEach(id=>{const p=MPROD.find(x=>x[0]===id);inc+=S.fol*p[3]*(1+stil()/50)*(.4+S.fame/100)*RF(.7,1.3)});inc=Math.round(inc*.4);if(inc>0){const b=income(inc,'alb');M.tot+=b.net;M.lq=b.net}}
 if(S.lab)S.lab.arts.forEach(a=>{if(a.merch){const x=Math.round(a.fol*.12*RF(.7,1.3));S.lab.cash+=x*.5;a.earn+=x*.5;a.mq=x}})}
function shMerch(){const M=S.merch;if(!M)return `<div class="card"><div class="ch"><b>👕 Kendi merch markanı çıkar</b></div>${note('Tişört, hoodie, şapka, parfüm, sneaker… Takipçin, stilin ve şöhretin satışları belirler. Kâr her 3 ayda bir gelir.')}<div class="kv"><div>Gerekli şöhret<b>20</b></div><div>Kuruluş<b>₺2 Mn</b></div></div><button class="btn" onclick="ACT.merchFound()">Markayı kur</button></div>`;
 let h=`<div class="hero2"><small>${esc(M.n)} merch</small><div class="big">${fmtS(M.tot)}</div><span>Toplam net kâr${M.lq?' · son 3 ay '+fmtS(M.lq):''}</span></div><label class="lab">Marka adı</label><input class="inp" value="${esc(M.n)}" maxlength="24" oninput="S.merch.n=this.value;save()">`;
 h+=sec('Ürün serileri')+MPROD.map(([id,n,p,r,ic])=>row(`ACT.merchProd('${id}')`,ic,n,`Her 3 ayda takipçine bağlı satış`,M.prods.includes(id)?'✓ Satışta':fmtS(p),M.prods.includes(id))).join('');
 if(S.lab&&S.lab.arts.length){h+=sec('Sanatçılarının merch\'i')+note('Şirket kasasından ₺1 Mn ile sanatçına merch serisi çıkar. Kâr şirketle sanatçı arasında yarı yarıya bölünür.');S.lab.arts.forEach(a=>h+=row(a.merch?'':`ACT.artMerch(${a.id})`,`<span class="av sa">${AV(a.look,24)}</span>`,esc(a.name),a.merch?`Satışta · son 3 ay ${fmtS(a.mq||0)}`:`${num(a.fol)} takipçi`,a.merch?'✓':'₺1 Mn',!!a.merch))}
 return h}
ACT.artMerch=id=>{const a=S.lab.arts.find(x=>x.id===id);if(S.lab.cash<1e6){toast('Şirket kasası yetmiyor.');return}S.lab.cash-=1e6;a.merch=1;log(`${a.name} için merch serisi çıkardın.`,'good');drawSheet()};

/* ---------- Şirket detayları, demo seçimi, süperstar düzenleme ---------- */
ACT.dropDemo=(aid,did)=>{const a=S.lab.arts.find(x=>x.id===aid);a.demos=a.demos.filter(x=>x.id!==did);a.happy=clamp(a.happy-2);drawSheet()};
ACT.labPR=sid=>{const L=S.lab,s=L.songs.find(x=>x.id===sid),a=L.arts.find(x=>x.id===s.aid),c=Math.round(200000+(a?a.fol:0)*.6);if(s.pr===S.qt){toast('Bu şarkıya bu 3 ayda zaten PR yapıldı.');return}if(L.cash<c){toast('Şirket kasası yetmiyor: '+fmtS(c));return}L.cash-=c;s.pr=S.qt;s.pot*=1.25;if(a)a.fol+=Math.round(a.fol*.01+100);log(`"${s.t}" için sosyal medya PR'ı yapıldı (${fmtS(c)}).`,'good');drawSheet()};
ACT.artEd=(id,k,d)=>{if(!S.star)return;const a=S.lab.arts.find(x=>x.id===id);if(k==='fol')a.fol=d==='x2'?a.fol*2:Math.max(0,a.fol+d);else a[k]=clamp(a[k]+d);drawSheet()};
function labValue(){const L=S.lab;return L.cash+L.songs.reduce((a,s)=>a+s.gross,0)*.8+BLDS.find(b=>b.id===L.bld).p*.9+L.feats.reduce((a,f)=>a+BFEAT.find(x=>x.id===f).p*.5,0)}
const _shArt=shArt;shArt=function(id){let h=_shArt(id);const a=S.lab.arts.find(x=>x.id===id);if(!a)return h;
 h=h.replace(/<button class="tab sm" onclick="ACT.relArt\((\d+),(\d+),2\)">₺5 Mn tanıtımla<\/button>/g,'<button class="tab sm" onclick="ACT.relArt($1,$2,2)">₺5 Mn tanıtımla</button><button class="tab sm" onclick="ACT.dropDemo($1,$2)">🗑 Yayınlama</button>');
 const ss=S.lab.songs.filter(s=>s.aid===id);if(ss.length)h+=sec('Şarkılarına PR yap')+ss.slice(-6).reverse().map(s=>row(`ACT.labPR(${s.id})`,'📱',esc(s.t),`Sosyal medya PR · ilgi ×1,25 · son 3 ay ${num(s.lq)}`,s.pr===S.qt?'Yapıldı':fmtS(200000+a.fol*.6),s.pr===S.qt)).join('');
 if(S.star)h+=sec('⭐ Süperstar: sanatçıyı düzenle')+[['tal','Yetenek',Math.round(a.tal)],['happy','Mutluluk',Math.round(a.happy)]].map(([k,l,v])=>`<div class="ngr"><div><b>${l}</b><span>${v}</span></div><div class="stp"><button onclick="ACT.artEd(${id},'${k}',-10)">−10</button><button onclick="ACT.artEd(${id},'${k}',10)">+10</button><button onclick="ACT.artEd(${id},'${k}',100)">Full</button></div></div>`).join('')+`<div class="ngr"><div><b>Takipçi</b><span>${num(a.fol)}</span></div><div class="stp"><button onclick="ACT.artEd(${id},'fol',100000)">+100 B</button><button onclick="ACT.artEd(${id},'fol','x2')">×2</button></div></div>`;
 return h};
const _shLab=shLab;shLab=function(){let h=_shLab();if(!S.lab)return h;const L=S.lab,dem=L.arts.reduce((a,x)=>a+x.demos.length,0),staff=4+L.arts.length*2+L.feats.length*3,str=L.songs.reduce((a,s)=>a+s.total,0),top=[...L.arts].sort((a,b)=>b.fol-a.fol)[0];
 const det=`<div class="kv"><div>Şirket değeri<b>${fmtS(labValue())}</b></div><div>Çalışan<b>${staff} kişi</b></div><div>Katalog dinlenme<b>${num(str)}</b></div><div>Bekleyen demo<b>${dem}</b></div><div>En büyük yıldız<b>${top?esc(top.name):'—'}</b></div><div>Kuruluş<b>${L.found} yaşında</b></div></div>${dem?note(`🎵 Sanatçıların her 3 ayda 1-2 demo getiriyor. ${dem} demo onayını bekliyor; sanatçıya dokunup yayınla ya da reddet.`):''}`;
 return h.replace('<label class="lab">Şirket adı</label>',det+'<label class="lab">Şirket adı</label>')};

/* ---------- Bağlantılar: Kariyer ve Hayat menüleri, çeyrek akışı ---------- */
const _shK=shKariyer;shKariyer=function(){const T=SUB&&SUB.t;if(T==='mgr')return shMgr();if(T==='pitch')return shPitch();if(T==='merch')return shMerch();if(T==='maf')return shMaf();
 let h=_shK();if(SUB||S.age<14||!S.genre)return h;
 h=h.replace('onclick="ACT.fire()"',`onclick="sheet('kariyer',{t:'mgr',title:'Menajer'})"`);
 const add=(S.manager?'':row('ACT.mgrSearch()','🔎','Menajer ara','Ajans aday menajerler bulur · ₺50 B','1 hak'))+row("sheet('kariyer',{t:'pitch',title:'Şirketlere git'})",'📀','Plak şirketlerine teklif götür',S.manager?'Kendin ya da menajerinle':'Kendin git ya da önce menajer bul','›')+
  row("sheet('kariyer',{t:'merch',title:'Merch'})",'👕',S.merch?esc(S.merch.n)+' merch':'Merch markanı çıkar',S.merch?`${S.merch.prods.length} ürün serisi · toplam ${fmtS(S.merch.tot)}`:'Tişört, hoodie, parfüm, sneaker…','›')+
  (S.maf&&S.maf.on?row("sheet('kariyer',{t:'maf',title:'Gölge dünya'})",'🕶','Gölge dünya',`Saygı %${Math.round(S.maf.rep)} · dikkat %${Math.round(S.maf.heat)}`,'›'):'');
 return h.replace(sec('Anlaşmalar'),sec('Anlaşmalar')+add)};
const _shH=shHayat;shHayat=function(){if(SUB&&SUB.t==='re')return shRe();let h=_shH();if(SUB||(S.htab||'iliski')!=='varlik')return h;return h.replace(sec('Alışveriş'),sec('Yatırım')+row("sheet('hayat',{t:'re',title:'Emlakçı'})",'🏘','Emlakçı',`${S.re.own.length} yatırım mülkün · portföy ${fmtS(S.re.own.reduce((a,x)=>a+x.val,0))}`,'›')+sec('Alışveriş'))};
const _aq2=ageUpQ;ageUpQ=function(){if(S&&S.alive){reQuarter();merchQuarter();mafQuarter()}_aq2()};
const _yt2=yearTick;yearTick=function(){reYear();if(S.untaxed>0&&ch(Math.min(.55,.1+S.untaxed/(S.untaxed+3e6)*.5))&&!S.evq.some(e=>e.id==='maliye'))S.evq.push({id:'maliye',p:{tax:Math.round(S.untaxed)}});_yt2()};
const _ei=extInit;extInit=function(){_ei();bigInit()};
