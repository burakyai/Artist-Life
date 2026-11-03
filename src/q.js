/* ============ ÇEYREKLİK ZAMAN (her İLERLE = 3 ay, 10 hak) + yeni sistemler ============ */
const SEASON=['Kış','İlkbahar','Yaz','Sonbahar'];
const HAK=10;
function useM(m){if(S.months<m){toast(S.months?`Bu 3 ayda sadece ${S.months} hakkın kaldı. İlerle.`:'Bu 3 aylık hakların bitti. İlerle.');return false}S.months-=m;return true}
function log(t,k){let b=S.log[S.log.length-1];const q=S.q||0;if(!b||b.age!==S.age||(b.q!=null&&b.q!==q)){b={age:S.age,q,it:[]};S.log.push(b);if(S.log.length>220)S.log.shift()}b.it.push({t,k:k||''})}

/* ---------- Gerçek markalar ---------- */
WATCHES.splice(0,WATCHES.length,
 {id:'gshock',n:'Casio G-Shock',p:7500,st:1},{id:'seiko',n:'Seiko Prospex',p:45000,st:2},{id:'tag',n:'TAG Heuer Carrera',p:260000,st:3},{id:'omega',n:'Omega Seamaster',p:420000,st:4},
 {id:'sub',n:'Rolex Submariner',p:750000,st:5},{id:'gmt',n:'Rolex GMT-Master II "Pepsi"',p:1100000,st:6},{id:'daytona',n:'Rolex Daytona',p:1900000,st:7},{id:'cartier',n:'Cartier Santos',p:380000,st:4},
 {id:'ap',n:'Audemars Piguet Royal Oak',p:3600000,st:9},{id:'apoff',n:'AP Royal Oak Offshore',p:4200000,st:9},{id:'aquanaut',n:'Patek Philippe Aquanaut',p:5200000,st:10},{id:'nautilus',n:'Patek Philippe Nautilus',p:6800000,st:11},
 {id:'rm',n:'Richard Mille RM 011',p:14000000,st:12},{id:'icedrolex',n:'Iced-out Rolex Day-Date',p:9500000,st:12},{id:'gc',n:'Patek Philippe Grand Complications',p:45000000,st:14});
CARS.splice(0,CARS.length,
 {id:'egea',n:'Fiat Egea',ic:'🚗',p:1250000,up:60000,pr:2},{id:'clio',n:'Renault Clio',ic:'🚗',p:1350000,up:60000,pr:2},{id:'corolla',n:'Toyota Corolla Hybrid',ic:'🚗',p:1900000,up:80000,pr:3},
 {id:'golf',n:'Volkswagen Golf',ic:'🚙',p:2300000,up:90000,pr:4},{id:'togg',n:'Togg T10X',ic:'🔋',p:2100000,up:70000,pr:5},{id:'tesla',n:'Tesla Model Y',ic:'🔋',p:2700000,up:80000,pr:6},
 {id:'bmw5',n:'BMW 5 Serisi',ic:'🚘',p:5800000,up:250000,pr:9},{id:'e',n:'Mercedes-Benz E-Serisi',ic:'🚘',p:6200000,up:260000,pr:10},{id:'a8',n:'Audi A8',ic:'🚘',p:8500000,up:350000,pr:12},
 {id:'s',n:'Mercedes-Benz S-Serisi',ic:'🚘',p:13000000,up:500000,pr:16},{id:'rr',n:'Range Rover Autobiography',ic:'🚙',p:15000000,up:600000,pr:17},{id:'911',n:'Porsche 911 Carrera S',ic:'🏎',p:14000000,up:550000,pr:19},
 {id:'g63',n:'Mercedes-AMG G 63',ic:'🚙',p:22000000,up:800000,pr:22},{id:'m4',n:'BMW M4 Competition',ic:'🏎',p:9000000,up:400000,pr:14},{id:'urus',n:'Lamborghini Urus',ic:'🚙',p:38000000,up:1300000,pr:28},
 {id:'bentley',n:'Bentley Continental GT',ic:'🏎',p:32000000,up:1100000,pr:26},{id:'cullinan',n:'Rolls-Royce Cullinan',ic:'👑',p:55000000,up:2000000,pr:34},{id:'sf90',n:'Ferrari SF90 Stradale',ic:'🏎',p:62000000,up:2200000,pr:36},
 {id:'huracan',n:'Lamborghini Huracán',ic:'🏎',p:42000000,up:1500000,pr:30},{id:'chiron',n:'Bugatti Chiron',ic:'🚀',p:180000000,up:6000000,pr:48});
CARS.sort((a,b)=>a.p-b.p);

/* ---------- Ek meslekler ve mekânlar ---------- */
Object.assign(FTYPES,{oyuncu:{n:'Oyuncu',ic:'🎬'},avukat:{n:'Avukat',ic:'⚖️'},doktor:{n:'Doktor',ic:'🩺'},gazeteci:{n:'Gazeteci',ic:'📰'},futbolcu:{n:'Futbolcu',ic:'⚽'},influencer:{n:'Influencer',ic:'🤳'}});
FTYPES.yonetmen.n='Klip yönetmeni';
Object.assign(FAVS,{oyuncu:'Dizisine şarkı önersin',avukat:'Sözleşmelerine baksın',doktor:'Seni muayene etsin',gazeteci:'Hakkında güzel haber yapsın',futbolcu:'Gol sevincinde şarkını kullansın',influencer:'Şarkını paylaşsın'});
PLACES.push({id:'dizi',n:'Dizi seti',ic:'🎥',min:16,fame:10,types:['oyuncu','yonetmen','model','gazeteci'],d:'Oyuncular, yönetmenler, gazeteciler'},
 {id:'restoran',n:'Lüks restoran',ic:'🍽',min:18,fame:0,types:['avukat','doktor','isinsani','futbolcu','influencer'],d:'Avukatlar, doktorlar, iş insanları'},
 {id:'mac',n:'Maç locası',ic:'🏟',min:18,fame:30,types:['futbolcu','isinsani','gazeteci','influencer'],d:'Futbolcular ve iş insanları'});
PLACES.find(p=>p.id==='kafe').types.push('influencer');

/* ---------- Hak tüketen hayat aksiyonları ---------- */
['famTime','famMoney','famGift','fTime','fFav','fLove','meet','gym','doctor','party','soc'].forEach(n=>{const o=ACT[n];if(!o)return;ACT[n]=(...a)=>{if(S.months<1){toast('Bu 3 aylık hakların bitti. İlerle.');return}const c=S.log.reduce((q,b)=>q+b.it.length,0);o(...a);if(S.log.reduce((q,b)=>q+b.it.length,0)>c){S.months--;render();if(SHEET)drawSheet()}}});

/* ---------- Ek arkadaş iyilikleri ---------- */
const _fFav=ACT.fFav;
ACT.fFav=id=>{const f=S.friends.find(x=>x.id===id);if(!['oyuncu','avukat','doktor','gazeteci','futbolcu','influencer'].includes(f.type))return _fFav(id);
 if(f.fav===S.qt){toast('Bu 3 ayda zaten bir iyilik istedin.');return}if(f.yak<50&&!S.star){toast('Yakınlığınız en az %50 olmalı.');return}f.fav=S.qt;const s=released().sort((a,b)=>b.ra-a.ra||b.id-a.id)[0];
 if(f.type==='oyuncu'){if(s&&ch(S.star?1:.5)){s.pot*=1.5;const m=R(3,9)*1e5;S.money+=m;log(`${f.name} "${s.t}" şarkını oynadığı dizinin müziği yaptırdı! Telif ödemesi ${fmtS(m)}, dinlenmeler artacak.`,'gold')}else log(`${f.name}: "Yapımcıya ilettim, bakalım."`,'dim')}
 if(f.type==='avukat'){S.lawyer=1;log(`${f.name} bir sonraki sözleşme pazarlığında yanında olacak (şirket daha esnek).`,'good')}
 if(f.type==='doktor'){add('health',R(10,20));log(`${f.name} seni baştan aşağı kontrol etti.`,'good')}
 if(f.type==='gazeteci'){addF(Math.round(S.fol*.03+300),'x');log(`${f.name} hakkında övgü dolu bir röportaj yayınladı.`,'good')}
 if(f.type==='futbolcu'){addF(Math.round(S.fol*.04+500),'ig');if(s)s.pot*=1.15;log(`${f.name} attığı golden sonra şarkınla dans etti. Video viral!`,'gold')}
 if(f.type==='influencer'){addF(Math.round(S.fol*.025+400),'tt');if(s){s.pot*=1.25;S.tiktok=1}log(`${f.name} şarkını milyonlarca takipçisiyle paylaştı.`,'good')}
 sheet('hayat')};
const _negSend=ACT.negSend;ACT.negSend=id=>{const o=S.offers.find(x=>x.id===id);if(o&&S.lawyer&&!o.law){o.flex+=.15;o.law=1;S.lawyer=0;o.msg='⚖️ Avukat arkadaşın masada.'}_negSend(id)};

/* ---------- Sevgili / eş ---------- */
const GIFTS=[['🌹','Çiçek buketi',3000,4],['🍫','Lüks çikolata',2500,3],['🧴','Parfüm',18000,7],['👜','Tasarım çanta',140000,12],['💎','Pırlanta kolye',650000,18],['⌚','Lüks saat',1800000,22],['🚗','Araba',6000000,30]];
ACT.pDo=k=>{const p=S.partner;if(!p)return;if(!useM(1))return;const n=p.name.split(' ')[0];
 if(k==='date'){const c=Math.round(8000*(1+S.fame/25));if(!pay(c)){S.months++;return}p.yak=clamp(p.yak+R(5,10));add('happy',4);log(`${n} ile ${pick(['Bebek\'te akşam yemeğine','sinemaya','Karaköy\'de bir konsere','sahilde yürüyüşe','lunaparka'])} gittiniz. (${fmtS(c)})`,'good');if(S.fame>35&&ch(.3)){addF(Math.round(S.fol*.01),'ig');log('Paparazziler sizi el ele görüntüledi.','dim')}}
 if(k==='trip'){const c=Math.round(120000*(1+S.fame/20));if(!pay(c)){S.months++;return}if(S.months<1){S.money+=c;S.months++;toast('Tatil için 2 hak gerekir.');return}S.months--;p.yak=clamp(p.yak+R(12,20));add('happy',R(12,18));add('health',4);log(`${n} ile ${pick(['Maldivler\'e','Paris\'e','Kapadokya\'ya','Bali\'ye','Amalfi\'ye','Kaş\'a'])} tatile gittiniz. (${fmtS(c)})`,'gold')}
 if(k==='night'){p.yak=clamp(p.yak+R(6,12));add('happy',R(6,10));log(`${n} ile romantik bir gece geçirdiniz.`,'good');if(ch(p.st==='eş'?.22:.12)&&S.age<55)babyNews()}
 if(k==='talk'){p.yak=clamp(p.yak+R(3,8));add('happy',2);log(`${n} ile uzun uzun konuştunuz, birbirinizi daha iyi anladınız.`)}
 sheet('hayat')};
ACT.pGift=i=>{const p=S.partner,g=GIFTS[i];if(!pay(g[2]))return;p.yak=clamp(p.yak+g[3]+(p.trait==='para'?6:0));log(`${p.name.split(' ')[0]}'e ${g[1].toLowerCase()} aldın (${fmtS(g[2])}).${p.trait==='para'?' Çok mutlu oldu!':''}`,'good');sheet('hayat')};
ACT.pMoney=x=>{const p=S.partner;if(!pay(x))return;p.yak=clamp(p.yak+(p.trait==='para'?10:4)+Math.min(8,Math.log10(x)-3));p.cash=(p.cash||0)+x;log(`${p.name.split(' ')[0]}'e ${fmtS(x)} verdin.`,'dim');sheet('hayat')};
function babyNews(){const g=ch(.5)?'e':'k',p=S.partner;const k={id:S.nid++,name:pick(g==='k'?NM_K:NM_E)+' '+S.last,age:0,g,yak:90,rel:g==='k'?'Kızın':'Oğlun',mom:p?p.name:''};S.kids.push(k);add('happy',14);log(`Müjde! ${p?p.name.split(' ')[0]+' ile ':''}bir bebeğiniz oldu: ${k.rel} ${k.name.split(' ')[0]}!`,'gold');if(S.fame>30)addF(Math.round(S.fol*.02),'ig')}
ACT.baby=()=>{if(!S.partner)return;if(!useM(1))return;if(ch(S.star?1:.45)){babyNews()}else log('Bu 3 ayda bebek haberi gelmedi.','dim');sheet('hayat')};

/* ---------- Şarkı kampanyaları (yayından sonra) ---------- */
const CAMPS=[{id:'radyo',n:'Radyo turu',ic:'📻',d:'Radyolarda dönüş · ilgi ×1,25',b:150000,f:.6,m:1.25},{id:'playlist',n:'Playlist ajansı',ic:'📃',d:'Editoryal liste şansı · ilgi ×1,2',b:80000,f:.4,m:1.2,ed:1},
 {id:'influ',n:'Influencer kampanyası',ic:'🤳',d:'TikTok\'ta viral şansı ↑ · ilgi ×1,2',b:120000,f:.9,m:1.2,vir:1},{id:'tubead',n:'TubeX reklamı',ic:'▶️',d:'Klip izlenmesi ×1,3',b:100000,f:.5,m:1.05,tube:1},
 {id:'billboard',n:'Billboard (İstanbul)',ic:'🏙',d:'Şehir şehir dev afiş · ilgi ×1,15 · hayran ↑',b:400000,f:1.2,m:1.15,fans:1},{id:'remix',n:'Remix çıkar',ic:'🎛',d:'Ünlü bir DJ ile remix · ilgi ×1,35 · 1 hak',b:250000,f:.3,m:1.35,hak:1}];
const campCost=c=>Math.round(c.b+S.fol*c.f);
ACT.camp=(id,cid)=>{const s=S.songs.find(x=>x.id===id),c=CAMPS.find(x=>x.id===cid);s.camps=s.camps||{};if(s.camps[cid]===S.qt){toast('Bu kampanya bu 3 ayda zaten yapıldı.');return}const cost=campCost(c);if(!canPay(cost)){toast('Paran yetmiyor: '+fmtS(cost));return}if(c.hak&&!useM(1))return;S.money-=cost;s.camps[cid]=S.qt;
 s.pot*=c.m;if(c.tube)s.clipM*=1.3;if(c.vir)s.vb=S.qt;if(c.fans)addF(Math.round(S.fol*.01+200));if(c.ed&&!s.edit&&ch(.35)){s.edit=EDIT[s.g];s.pot*=1.2}
 log(`"${s.t}" için ${c.n.toLowerCase()} başlattın (${fmtS(cost)}).${c.ed&&s.edit?` Şarkı "${s.edit}" listesine girdi!`:''}`,'good');drawSheet();render()};
function campUI(s){return sec('Kampanya başlat')+note('Yayındaki şarkın için istediğin zaman kampanya yapabilirsin. Her kampanya 3 ayda bir.')+CAMPS.map(c=>{const done=(s.camps||{})[c.id]===S.qt;return row(`ACT.camp(${s.id},'${c.id}')`,c.ic,c.n,c.d,done?'Bu 3 ayda yapıldı':fmtS(campCost(c)),done)}).join('')}

/* ---------- Konser hazırlığı ---------- */
const VEN2={kulup:{cap:1500,tk:900,crew:250000},salon:{cap:5000,tk:1600,crew:1500000},tur:{cap:4000,tk:1300,shows:12,crew:9000000},festival:{fee:1},avrupa:{cap:3000,tk:1900,shows:8,crew:14000000},stad:{cap:50000,tk:2200,crew:28000000}};
const PRICE=[['Uygun',.7,1.18],['Normal',1,1],['Premium',1.6,.78]],PROD=[['Sade sahne',0,0],['Işık şov + LED',.08,.12],['Mega prodüksiyon + dansçılar + pyro',.2,.28]],SET=[['En sevilen hitler',0],['Yeni şarkı ağırlıklı',1]];
function cpNew(id){S.cp={v:id,pr:1,prod:1,set:0,prova:0,guest:null}}
function shConcert(){const cp=S.cp,v=VENUES.find(x=>x.id===cp.v),x=VEN2[cp.v],m=(1+S.fame/70)*(S.manager?1.15:1);
 const est=concertCalc(true);let h=`<div class="card"><div class="ch"><b>${v.ic} ${v.n}</b><span class="pill">${v.loc}</span></div>${note(x.fee?'Festival sana sabit sahne ücreti öder. Prodüksiyonun ve performansın hayran kazancını belirler.':`${x.shows?x.shows+' konser · ':''}Kapasite ${num(x.cap*(x.shows||1))} kişi`)}</div>`;
 const opt=(k,arr,lab)=>sec(lab)+`<div class="tabs wrap">${arr.map((a,i)=>`<button class="tab ${cp[k]===i?'on':''}" onclick="S.cp.${k}=${i};drawSheet()">${a[0]}</button>`).join('')}</div>`;
 if(!x.fee)h+=opt('pr',PRICE,'Bilet fiyatı')+note(`Bilet: ${fmtS(x.tk*PRICE[cp.pr][1]*m)}`);
 h+=opt('prod',PROD,'Sahne prodüksiyonu')+opt('set',SET,'Setlist')+(cp.set===1?note('Son çıkardığın şarkı konserde tanıtılır, dinlenmesi artar.'):'');
 h+=sec('Prova')+`<div class="tabs wrap">${[0,1,2].map(i=>`<button class="tab ${cp.prova===i?'on':''}" onclick="S.cp.prova=${i};drawSheet()">${i?i+' hak prova':'Prova yok'}</button>`).join('')}</div>`;
 const arts=S.friends.filter(f=>f.type==='sanatci'&&f.yak>=45);h+=sec('Konuk sanatçı')+(arts.length?`<div class="tabs wrap"><button class="tab ${!cp.guest?'on':''}" onclick="S.cp.guest=null;drawSheet()">Yok</button>${arts.map(f=>`<button class="tab ${cp.guest===f.id?'on':''}" onclick="S.cp.guest=${f.id};drawSheet()">${esc(f.name)} (${f.fame})</button>`).join('')}</div>`:note('Konuk olarak çağırabileceğin sanatçı arkadaşın yok (yakınlık %45+).'));
 h+=sec('Tahmin')+`<div class="kv"><div>Beklenen doluluk<b>%${Math.round(est.occ*100)}</b></div><div>Tahmini hasılat<b>${fmtS(est.rev)}</b></div><div>Masraflar<b>${fmtS(est.cost)}</b></div><div>Gereken hak<b>${est.hak}</b></div></div>`;
 h+=`<button class="btn" onclick="ACT.concert()">🎤 Sahneye çık</button>`;return h}
function concertCalc(dry){const cp=S.cp,v=VENUES.find(x=>x.id===cp.v),x=VEN2[cp.v],m=(1+S.fame/70)*(S.manager?1.15:1),g=cp.guest?S.friends.find(f=>f.id===cp.guest):null;
 const rp0=1/(1+((S.gigN||{})[cp.v]||0)*.5);const hype=rp0*clamp(.45+(S.fame-v.fame)/60+(g?g.fame/250:0)+PROD[cp.prod][2]*.5+stil()/300,.15,1)*(x.fee?1:PRICE[cp.pr][2]);const occ=clamp(hype,.1,1);
 let rev,cost;if(x.fee){rev=RF(v.pay[0],v.pay[1])*m*(dry?0:1)||((v.pay[0]+v.pay[1])/2*m);cost=rev*PROD[cp.prod][1]}else{const seats=x.cap*(x.shows||1);rev=seats*occ*x.tk*PRICE[cp.pr][1]*m;cost=x.crew*(1+PROD[cp.prod][1]*4)+rev*PROD[cp.prod][1]}
 return {occ,rev,cost,hak:v.m+cp.prova,g}}
ACT.concert=()=>{const cp=S.cp,v=VENUES.find(x=>x.id===cp.v),c=concertCalc(false);if(!S._mgr&&!useM(c.hak))return;
 const perf=S._mgr?110:(S._perf!=null?S._perf:S.skill*.55+R(0,35))+cp.prova*8+PROD[cp.prod][2]*30+(S.health<40?-12:0)+(c.g?6:0),great=perf>=75,good=perf>=42;const occ=c.occ*(great?1.05:1);
 S.gigN=S.gigN||{};const rp=1/(1+(S.gigN[v.id]||0)*.5);S.gigN[v.id]=(S.gigN[v.id]||0)+1;const rev=Math.round(c.rev*rp*(great?1.05:good?1:.9)),net0=rev-c.cost;const fans=Math.round(RF(v.fans[0],v.fans[1])*.5*rp*(great?1.5:good?1:.4)*(1+PROD[cp.prod][2])*(c.g?1.2:1));
 let b;if(net0>0)b=income(net0,'gig');else{S.money+=net0;b={net:net0}}addF(fans,'ig');add('health',-v.m);S.skill=clamp(S.skill+1);
 if(cp.set===1){const s=released().sort((a,b)=>b.ra-a.ra||b.id-a.id)[0];if(s)s.pot*=1.1+PROD[cp.prod][2]}
 if(c.g){c.g.yak=clamp(c.g.yak+6);addF(Math.round(S.fol*c.g.fame/3000),'ig')}
 const rv=great?pick(['Eleştirmenler: "Yılın konseri!"','Sosyal medya konserini konuşuyor.','Seyirci şarkıları baştan sona bir ağızdan söyledi.']):good?'Güzel bir geceydi, seyirci memnun ayrıldı.':pick(['Ses sistemi sorun çıkardı, eleştiriler sert.','Performansın beklenenin altında kaldı.']);
 log(`${v.n} (${v.loc}): doluluk %${Math.round(clamp(occ,0,1)*100)}, hasılat ${fmtS(rev)}, masraf ${fmtS(c.cost)}${c.g?`, konuk ${c.g.name}`:''}. ${rv} Sana kalan net ${fmtS(b.net)}, +${num(fans)} hayran.`,great?'gold':good?'good':'bad');
 S.cp=null;SUB=null;sheet('kariyer')};
const _gig=ACT.gig;ACT.gig=id=>{if(VEN2[id]){const v=VENUES.find(x=>x.id===id);if(S.age<v.age||S.fame<v.fame)return;if(id==='festival'&&S.q!==2&&!S.star){toast('Festivaller sadece yazın düzenlenir.');return}cpNew(id);sheet('kariyer',{t:'concert',title:'Konser hazırlığı'});return}_gig(id)};

/* ---------- Yayın: çeyrek bilgisi ve doygunluk ---------- */
function potFor(s,boost){const promo=S.contract?1+S.contract.t*.4:1;return (8000+120*Math.pow(S.fol,.8))*Math.pow(s.q/60,2.2)*S.trends[s.g]*promo*(s.feat?(s.fb||1.6):1)*(s.clip?s.clip.h:1)*(boost||1)*(S.star&&s.meta&&s.meta.hit?3:1)/(1+.12*(S.relY||0))*RF(.7,1.3)}
function doRelease(s,alb,pb){const m=s.meta;s.q=Math.round(clamp(s.q+WRITERS[m.writer].q+MIX[m.mix].q,1,100));let boost=(alb?1.25:1)*(1+.8*pb/(pb+30000+S.fol*3));
 s.lab=S.contract?{n:S.contract.n,roy:S.contract.roy}:null;if(!s.lab&&m.dist==='kendi'&&S.lab)boost*=hasLF('pr')?1.3:1.1;s.pot=potFor(s,boost);s.st='yayin';s.ra=S.age;s.rq=S.qt;s.rm=12;s.alb=alb||null;s.edit=null;S.relY=(S.relY||0)+1;
 if(m.pitch&&(S.star&&m.hit||ch(.12+s.q/400+(S.contract?S.contract.t*.04:0)+(pb>0?.05:0)))){s.pot*=1.35;s.edit=ch(.5)?EDIT[s.g]:'Yeni Cuma'}}
function weekly(s){return (s.lq||0)/13}
function platChart(pid){if(!S.chart)genChart();const rows=S.chart.map(x=>({t:x.t,a:x.a,w:x.w*shares(x.g)[pid]*(pid==='tube'?1.3:1),ch:x.ch,d:x.d,me:false}));
 released().filter(s=>(s.lq||0)>0).forEach(s=>{const sh=shares(s.g)[pid]*(pid==='tube'?s.clipM:1);rows.push({t:s.t+(s.feat?' (feat. '+s.feat+')':''),a:S.first+' '+S.last,w:weekly(s)*sh,me:true,s})});
 return rows.sort((a,b)=>b.w-a.w).slice(0,20)}
function marketYear(){}
function marketQ(){STOCKS.forEach(x=>{const m=S.mkt[x.id],sg=x.sg/2;let r=x.mu/4+sg*gauss()-sg*sg/2;if(x.id==='SHNE'||x.id==='ATLS')r+=(S.fame-50)/4000;if(S.tip===x.id)r=Math.max(r,.1+Math.random()*.15);m.p=Math.max(.5,m.p*Math.exp(r));m.h.push(m.p);if(m.h.length>20)m.h.shift()});S.tip=null;
 if(S.bank>0){const bi=S.bank*(typeof bankRate==='function'?bankRate():.15)/4;S.bank+=bi;if(typeof btx==='function'&&bi>=1)btx('Mevduat faizi',bi)}if(S.loan>0){const i=S.loan*.42/4;S.loan+=i}}

/* ---------- Çeyrek sonu: dinlenme ve gelir ---------- */
function quarterEnd(){
 const pl={spo:0,tube:0,fizzy:0,pear:0};let total=0;const per=[],rel=released();
 rel.forEach(s=>{if(s.rq==null)s.rq=S.qt-Math.max(0,(S.age-s.ra))*4-1;const k=S.qt-s.rq,sb=subOf(s);let f=Math.max(.38*Math.pow(.72,k),.0125)*(k>=4?1+sb.tail:1);
  let v=s.pot*f+S.fol*(S.star?.004:.0015)/Math.max(1,Math.sqrt(rel.length/5));
  if(k<=6&&ch((.03+sb.vir+Math.max(0,s.q-60)/500+(S.tiktok||s.vb===S.qt-1||s.vb===S.qt?.08:0))/3)){v*=RF(2.5,5);s.pot*=1.6;s.viral=true;log(`"${s.t}" viral oldu! Her yerde bu şarkı çalıyor.`,'gold')}
  if(typeof capStream==='function')v=capStream(s,v);const sh=shares(s.g),ps={};let tot=0,g=0;PLAT.forEach(p=>{const x=Math.round(v*sh[p.id]*(p.id==='tube'?s.clipM:1));ps[p.id]=x;pl[p.id]+=x;s.tot[p.id]+=x;tot+=x;g+=x*p.rate});
  s.lq=tot;s.q4=(s.q4||[]).concat(tot).slice(-4);s.ly=s.q4.reduce((a,b)=>a+b,0);s.total+=tot;total+=tot;
  const r=trRank(tot/13),gr=glRank(tot/13);
  if(r&&(!s.peak||r<s.peak)){s.peak=r;if(r<=20)log(`"${s.t}" Türkiye Top 50'de #${r}'e yükseldi!`,'good');if(!S.best.tr||r<S.best.tr)S.best.tr=r}
  if(gr&&(!s.gpeak||gr<s.gpeak)){s.gpeak=gr;log(`"${s.t}" Global Top 50'de #${gr}!`,'gold');if(!S.best.gl||gr<S.best.gl)S.best.gl=gr}
  per.push({s,ps,st:tot,g,r,gr})});
 rel.forEach(x=>{const c=certOf(x.total);if(c>(x.cert==null?-1:x.cert)){x.cert=c;log(`🏅 "${x.t}" ${CERTS[c][1]} plak sertifikası aldı! (${num(CERTS[c][0])} dinlenme)`,'gold')}});
 S.albums.forEach(a=>{const t=S.songs.filter(x=>x.alb===a.n).reduce((q,x)=>q+x.total,0),c=certOf(t,3);if(c>(a.cert==null?-1:a.cert)){a.cert=c;log(`💿 "${a.n}" albümü ${CERTS[c][1]} oldu!`,'gold')}});
 const b={gross:0,writer:0,lab:0,dist:0,rec:0,mgr:0,tax:0,net:0,pl:{},streams:total};
 PLAT.forEach(p=>{b.pl[p.id]={st:pl[p.id],tl:pl[p.id]*p.rate};S.tot[p.id]+=pl[p.id]});S.tot.streams+=total;
 per.forEach(x=>{x.writer=x.g*(WRITERS[x.s.meta.writer]||WRITERS.kendim).pct;const base=x.g-x.writer;
  const L0=x.s.lab;if(L0){x.lab=base*(1-L0.roy/100);x.dist=0}else{x.lab=0;x.dist=x.s.meta.dist==='kendi'?0:base*(DIST[x.s.meta.dist]||DIST.yuzde).pct}x.art=base-x.lab-x.dist;x.mine=!!(S.contract&&L0&&L0.n===S.contract.n)});
 const artSum=per.reduce((a,x)=>a+(x.mine?x.art:0),0),recT=S.contract&&S.contract.recoup!==false?Math.min(artSum,S.contract.unrec):0;if(S.contract)S.contract.unrec-=recT;
 per.forEach(x=>{x.rec=artSum&&x.mine?x.art*recT/artSum:0;let a=x.art-x.rec;x.mgr=0;a-=x.mgr;x.tax=a*.2;x.net=a-x.tax;x.gross=x.g;
  ['gross','writer','lab','dist','rec','mgr','tax','net'].forEach(k=>{x.s.mon[k]+=x[k];b[k]+=x[k]});
  const hl=x.s.hy[x.s.hy.length-1];if(hl&&hl.age===S.age){hl.st+=x.st;hl.g+=x.g;hl.net+=x.net;PLAT.forEach(p=>hl.pl[p.id]=(hl.pl[p.id]||0)+x.ps[p.id]);if(x.r&&(!hl.r||x.r<hl.r))hl.r=x.r;if(x.gr&&(!hl.gr||x.gr<hl.gr))hl.gr=x.gr}
  else{x.s.hy.push({age:S.age,st:x.st,pl:{...x.ps},g:x.g,net:x.net,r:x.r,gr:x.gr});if(x.s.hy.length>60)x.s.hy.shift()}});
 PLAT.forEach(p=>S.pend[p.id]+=(b.net+b.tax)*(b.gross?b.pl[p.id].tl/b.gross:0));S.yr.stream+=b.net;S.yr.streams=(S.yr.streams||0)+total;S.yr.spo=(S.yr.spo||0)+pl.spo;S.tot.stream+=b.net;S.tot.all+=b.net;
 if(total>0)log(`Dijital gelir: ${num(total)} dinlenme → brüt ${fmtS(b.gross)}, net ${fmtS(b.net)} platform hesaplarında birikti.${S.contract&&b.rec>0?` (${fmtS(b.rec)} avans borcuna mahsup edildi)`:''}`);
 S.fol+=Math.max(0,total*.0025*(1-S.fol/4e7));
 let exp={yasam:0,ev:0,araba:0};if(S.age>=18){exp.yasam=(S.house?120000:40000)/4}
 S.houses.forEach(id=>{const h=HOUSES.find(x=>x.id===id);exp.ev+=(h.rent?(id===S.house?h.rent:0):h.up)/4});S.cars.forEach(id=>{const c=CARS.find(x=>x.id===id);if(c)exp.araba+=c.up*carUpF(c.id)/4});
 b.exp=exp;S.money-=exp.yasam+exp.ev+exp.araba;
 if(S.money<0&&S.age>=18){const i=-S.money*.06;S.money-=i;add('happy',-3);S.debtY=(S.debtY||0)+i;if((S.q||0)===3){log(`Bu yıl borç yüzünden ${fmtS(S.debtY)} kredi kartı faizi ödedin. Kasanı artıya geçirmelisin.`,'bad');S.debtY=0}}
 S.lastY=b}

/* ---------- İLERLE (3 ay) ---------- */
function ageUpQ(){if(!S.alive)return;closeSheet();
 if(S.genre&&S.age>=14)quarterEnd();
 marketQ();genChart();
 S.q=(S.q||0)+1;S.qt=(S.qt||0)+1;S.months=HAK;S.smc={};S.tiktok=0;S.gym=0;
 S.friends.forEach(f=>{f.done=0;f.yak=clamp(f.yak-(f.trait==='sadik'?0:R(0,2))+(hasF('parti')?1:0))});
 S.fam.forEach(p=>p.done=0);S.kids.forEach(k=>k.done=0);
 if(S.partner){const p=S.partner;p.done=0;p.yak=clamp(p.yak-(p.trait==='sadik'?0:p.trait==='kiskanc'?R(1,4)+(S.fame>40?1:0):R(0,2)));if(p.yak<15&&ch(.4)){log(`${p.name.split(' ')[0]} seni terk etti.`,'bad');add('happy',-15);S.partner=null}}
 if(S.kons){S.months-=2;S.skill=clamp(S.skill+RF(1.5,2.5))}
 if(S.q>=4){S.q=0;yearTick()}
 S.happy=clamp(S.happy+((55+(S.house?HOUSES.find(x=>x.id===S.house).hap:0)+(S.car&&CARS.find(x=>x.id===S.car)?CARS.find(x=>x.id===S.car).pr/2:0)+(S.partner?8:0))-S.happy)*.06+R(-1,1));
 if(S.fol>6e7)S.fol=Math.round(6e7+(S.fol-6e7)*.7);
 if(S.genre&&S.age>=16){S.offers=S.offers.filter(o=>o.k!=='brand'||ch(.5));if(S.fame>=20&&ch(.45)){const w=pick([['Instagram paylaşımı',1,0],['Reklam filmi',3,1],['Marka yüzlüğü',8,1]]);S.offers.push({id:S.nid++,k:'brand',n:pick(BRANDS),w:w[0],m:w[2],pay:Math.max(25000,Math.round(S.fol*RF(.3,.7)*(1+stil()/30)*w[1]*(S.manager?1.25:1)/1000)*1000)})}if(!S.contract&&S.fame>=15&&released().length&&ch(.18)&&S.offers.filter(o=>o.k==='label').length<2)genLabel()}
 calcFame();
 if(!S._skipEv)pickEvents();
 if(S.health<=0){S.alive=false;log('Sağlığın daha fazla dayanamadı. Hayata gözlerini yumdun.','bad')}
 calcFame();if(S._skipEv)return;save();render();if(S.alive&&S.evq.length)showEvent();else if(!S.alive)showDeath()}
function yearTick(){
 S.hist.push({age:S.age,stream:S.yr.stream,gig:S.yr.gig,brand:S.yr.brand,alb:S.yr.alb,streams:S.yr.streams||0,spo:S.yr.spo||0});if(S.hist.length>60)S.hist.shift();
 awardsYear();
 if(S.contract){const c=S.contract;c.left--;if(c.left<=0){const ms=Math.max(0,c.reqS-c.rel),mc=Math.max(0,c.reqC-(c.clips||0));if(ms||mc){const pen=Math.round(ms*c.adv*.12+mc*c.adv*.08);S.money-=pen;log(`${c.n} sözleşmen bitti. Teslim edilmeyen ${ms} şarkı ve ${mc} klip için cezai şart: ${fmtS(pen)}`,'bad')}else log(`${c.n} sözleşmen sona erdi, tüm taahhütlerini yerine getirdin.`,'good');if(c.unrec>0)log(`Mahsup edilemeyen ${fmtS(c.unrec)} avans silindi.`,'dim');S.contract=null}
  else{const exp=c.reqS*(c.yrs-c.left)/c.yrs;if(c.rel<exp-1&&!S.evq.some(e=>e.id==='sirket'))S.evq.push({id:'sirket',p:{n:c.n,eks:Math.ceil(exp-c.rel)}})}}
 S.age++;S.yr={stream:0,gig:0,brand:0,alb:0,streams:0,spo:0};S.posts=0;S.gigN={};S.relY=0;
 S.friends.forEach(f=>{if(f.trait==='destekci')add('happy',2);if(f.trait==='partici'){add('happy',2);add('health',-2)}if(f.trait==='dedikoducu'&&S.fame>20&&ch(.25)){add('happy',-5);log(`${f.name} hakkında bir sırrını magazine sızdırdı.`,'bad')}if(f.trait==='para'&&S.money>200000&&ch(.3)){const m=Math.round(S.money*.02);S.money-=m;log(`${f.name} senden ${fmtS(m)} borç istedi, hayır diyemedin.`,'dim')}});
 S.friends=S.friends.filter(f=>{if(f.yak<5){log(`${f.name} ile aranız tamamen soğudu.`,'dim');return false}return true});
 if(hasF('havuz'))add('happy',5);if(hasF('sinema'))add('happy',3);if(hasF('akilli'))add('happy',2);if(hasF('heli'))add('happy',4);if(hasF('spor'))add('health',3);
 S.fam.forEach(p=>{p.asked=0;if(p.alive){p.age++;if(p.age>68&&ch((p.age-66)/60)){p.alive=false;add('happy',-25);log(`${p.rel} ${p.name.split(' ')[0]} hayatını kaybetti. Başın sağ olsun.`,'bad')}}});
 S.kids.forEach(k=>{k.age++;if(k.age===18)log(`${k.rel} ${k.name.split(' ')[0]} 18 yaşına girdi!`,'good')});if(S.partner)S.partner.age++;
 if(S.age>40)add('health',-R(0,Math.round((S.age-35)/6)));else add('health',R(-2,2));
 if(S.kons){S.kons--;if(!S.kons){S.grad=true;log('Konservatuvardan mezun oldun!','gold')}}
 Object.keys(S.trends).forEach(g=>S.trends[g]=clamp(S.trends[g]+RF(-.12,.12),.6,1.5));
 if(S.age===6)log('İlkokula başladın. Müzik dersini iple çekiyorsun.');
 if(S.age===14&&!S.genre)log('Artık bir müzik türü seçip kariyerine başlayabilirsin. (Kariyer menüsü)','gold');
 if(S.age===18)log('18 yaşına girdin! Barlar, kulüpler ve sözleşmeler artık seni bekliyor.','gold');
 if(S.genre&&S.age>=16){S.offers=S.offers.filter(o=>o.k==='label'&&ch(.3));if(!S.manager&&S.fame>=26&&ch(.4))S.offers.push({id:S.nid++,k:'mgr',n:pick(MANAGERS),cut:pick([.12,.15,.18,.2])})}
 if((S.age>72&&ch((S.age-70)/90))||(S.age>45&&S.health<15&&ch(.3))){S.alive=false;log('Uykunda huzur içinde hayata gözlerini yumdun.','bad')}}

/* ---------- Müzik sektörüne özel olaylar ---------- */
EVENTS.push(
 {id:'ihanet',min:18,c:()=>S.manager&&S.money>500000,title:'Menajerin seni dolandırıyor',text:()=>`Muhasebecin, menajerin ${S.manager.n}'in bazı konser ödemelerini kendi hesabına aktardığını fark etti.`,ch:[
  {t:'Kovup dava aç',fn:()=>{const m=S.manager.n;S.manager=null;if(ch(.6)){const x=R(5,20)*1e5;S.money+=x;log(`${m}'i kovdun ve davayı kazandın: ${fmtS(x)} geri aldın.`,'good')}else log(`${m}'i kovdun ama dava uzadı, para geri gelmedi.`,'bad')}},
  {t:'Sessizce kov',fn:()=>{log(`${S.manager.n} ile sessizce yollarını ayırdın.`);S.manager=null}},{t:'Görmezden gel',fn:()=>{S.money-=Math.round(S.money*.05);log('Menajerin seni soymaya devam etti.','bad')}}]},
 {id:'stalker',min:18,c:()=>S.fame>=40,title:'Takıntılı hayran',text:()=>'Bir hayranın günlerdir evinin önünde bekliyor, mesajları giderek tuhaflaşıyor.',ch:[
  {t:'Koruma tut (₺500 B)',fn:()=>{S.money-=500000;log('Koruman olayı sessizce çözdü.','good')}},{t:'Polise bildir',fn:()=>{log('Polis hayranı uzaklaştırma kararıyla durdurdu.')}},{t:'Hayranla konuş',fn:()=>{if(ch(.6)){add('happy',3);log('Konuşunca sakinleşti, özür diledi.','good')}else{add('happy',-10);log('Konuşma kötü bitti, haftalarca tedirgin yaşadın.','bad')}}}]},
 {id:'iptal',min:18,c:()=>S.fame>=25,title:'Organizatör kaçtı',text:()=>'Konserini düzenleyen firma bilet paralarını toplayıp ortadan kayboldu. Hayranlar sana kızgın.',ch:[
  {t:'Biletleri kendi cebinden iade et',fn:()=>{const x=Math.round(S.fol*2+100000);S.money-=x;addF(Math.round(S.fol*.03),'x');log(`Hayranlarına ${fmtS(x)} iade ettin. Herkes bu jesti konuşuyor.`,'gold')}},{t:'Sosyal medyadan açıklama yap',fn:()=>{if(ch(.5))log('Hayranların seni anlayışla karşıladı.','good');else{S.fol=Math.round(S.fol*.97);log('Açıklaman yetmedi, takipçi kaybettin.','bad')}}}]},
 {id:'sesgitti',min:18,c:()=>S.fame>=30,title:'Sahnede ses sistemi çöktü',text:()=>'Festival performansının ortasında bütün ses sistemi kapandı. 20 bin kişi sana bakıyor.',ch:[
  {t:'Akapella söylemeye devam et',fn:()=>{if(S.skill+R(0,40)>70){addF(Math.round(S.fol*.08+2000),'tt');log('Akapella performansın viral oldu! "Gerçek sanatçı" yorumları yağdı.','gold')}else{add('happy',-6);log('Sesin salona yetmedi, ortam dağıldı.','bad')}}},{t:'Seyirciyle sohbet et, bekle',fn:()=>{add('happy',2);log('Ses gelene kadar seyirciyle şakalaştın, gece kurtuldu.','good')}},{t:'Sahneyi terk et',fn:()=>{S.fol=Math.round(S.fol*.98);log('Sahneyi terk etmen tepki çekti.','bad')}}]},
 {id:'sizinti',min:16,c:()=>S.songs.some(s=>s.st==='kayit'),title:'Şarkın sızdırıldı',text:()=>'Henüz yayınlamadığın bir kayıt internete sızdırıldı ve hızla yayılıyor.',ch:[
  {t:'Hemen resmi olarak yayınla',fn:()=>{const s=S.songs.find(x=>x.st==='kayit');doRelease(s,null,0);s.pot*=1.3;if(S.contract)S.contract.rel++;log(`"${s.t}" sızıntı yüzünden erken çıktı, ama merak dinlenmeleri uçurdu.`,'good')}},{t:'Telif şikayetiyle kaldırt',fn:()=>log('Sızıntıyı kaldırttın, şarkı sürprizini korudu.')}]},
 {id:'bahis',min:18,c:()=>S.fame>=35,title:'Yasa dışı bahis reklamı',text:()=>'Yurt dışı merkezli bir bahis sitesi tek bir paylaşım için servet teklif ediyor.',ch:[
  {t:'Kabul et',fn:()=>{const x=Math.round(S.fol*3+1e6);S.money+=x;if(ch(.55)){S.fol=Math.round(S.fol*.9);add('happy',-10);log(`Parayı aldın (${fmtS(x)}) ama ifşa oldun; soruşturma ve linç başladı.`,'bad')}else log(`Paylaşımı yaptın ve ${fmtS(x)} kazandın. Kimse fark etmedi... şimdilik.`,'dim')}},{t:'Reddet',fn:()=>log('Teklifi reddettin. İçin rahat.','good')}]},
 {id:'miting',min:18,c:()=>S.fame>=40,title:'Miting teklifi',text:()=>'Bir siyasi parti, mitinginde sahne alman için yüklü bir ücret teklif ediyor.',ch:[
  {t:'Kabul et',fn:()=>{S.money+=Math.round(S.fol*.8+5e5);S.fol=Math.round(S.fol*.94);log('Mitinge çıktın. Para iyiydi ama hayranlarının bir kısmı küstü.','dim')}},{t:'Kibarca reddet',fn:()=>log('Siyasetin dışında kalmayı seçtin.')}]},
 {id:'dizimuzik',min:16,c:()=>S.fame>=20&&S.genre,title:'Dizi jeneriği',text:()=>'Yeni bir prime-time dizinin yapımcısı jenerik şarkısını senin yapmanı istiyor.',ch:[
  {t:'Kabul et (2 hak)',fn:()=>{S.months=Math.max(0,S.months-2);const m=R(5,15)*1e5;S.money+=m;S.months+=1;ACT.write();closeSheet();const s=S.songs[0];s.q=Math.min(100,s.q+10);s.t+=' (Dizi Müziği)';log(`Dizi jeneriğini üstlendin: ${fmtS(m)} ücret. Şarkı demo listende.`,'good')}},{t:'Reddet',fn:()=>{}}]},
 {id:'hack',min:16,c:()=>S.fol>20000,title:'Hesabın hacklendi',text:()=>'Instagram hesabın ele geçirildi. Hacker fidye istiyor.',ch:[
  {t:'Fidyeyi öde (₺150 B)',fn:()=>{S.money-=150000;log('Fidyeyi ödedin, hesabın geri geldi.','dim')}},{t:'Destek ekibiyle uğraş',fn:()=>{if(ch(.6))log('Hesabını geri aldın.','good');else{S.fol=Math.round(S.fol*.93);log('Hesabın günlerce kapalı kaldı, takipçi kaybettin.','bad')}}}]},
 {id:'yabanci',min:18,c:()=>S.fame>=45,title:'Yurt dışı iş birliği',text:()=>`Ünlü bir ${pick(['Amerikalı','İngiliz','Koreli','Fransız'])} prodüktör seninle şarkı yapmak istiyor.`,ch:[
  {t:'Kabul et (2 hak)',fn:()=>{S.months=Math.max(0,S.months-1);ACT.write();closeSheet();const s=S.songs[0];s.q=Math.min(100,s.q+15);s.fb=2.2;s.feat='Global prodüktör';log(`Yurt dışı iş birliği: "${s.t}" demo listende, global çıkış şansı yüksek!`,'gold')}},{t:'Reddet',fn:()=>{}}]},
 {id:'roportaj',min:16,c:()=>S.fame>=25,title:'Sert röportaj',text:()=>'Canlı yayındaki gazeteci, eski sevgilin ve rakip şarkıcılar hakkında can sıkıcı sorular soruyor.',ch:[
  {t:'Esprili cevap ver',fn:()=>{if(ch(.6)){addF(Math.round(S.fol*.03),'x');log('Esprin gündem oldu.','good')}else log('Espri yerini bulmadı.','dim')}},{t:'Sert çık',fn:()=>{if(ch(.5)){addF(Math.round(S.fol*.05),'x');add('happy',-3);log('Sert çıkışın tartışma yarattı ama konuşuldun.')}else{S.fol=Math.round(S.fol*.97);log('Sert çıkışın tepki çekti.','bad')}}},{t:'Röportajı terk et',fn:()=>log('Stüdyoyu terk ettin, görüntüler magazinde.','dim')}]},
 {id:'hayir',min:18,c:()=>S.fame>=30,title:'Yardım konseri',text:()=>'Deprem bölgesi için ücretsiz bir yardım konseri düzenleniyor.',ch:[
  {t:'Katıl (1 hak)',fn:()=>{S.months=Math.max(0,S.months-1);add('happy',8);addF(Math.round(S.fol*.03),'ig');log('Yardım konserinde sahne aldın. Gözyaşları içinde bir geceydi.','gold')}},{t:'Bağış yap (₺1 Mn)',fn:()=>{S.money-=1e6;add('happy',5);log('Konsere katılamadın ama ₺1 Mn bağış yaptın.','good')}},{t:'Katılma',fn:()=>add('happy',-3)}]},
 {id:'juri',min:22,c:()=>S.fame>=50,title:'Yarışma jürisi',text:()=>'Ses yarışmasının yeni sezonunda jüri koltuğu teklif ediliyor.',ch:[
  {t:'Kabul et',fn:()=>{const m=R(15,40)*1e5;S.money+=m;addF(Math.round(S.fol*.06),'ig');S.months=Math.max(0,S.months-2);log(`Jüri koltuğuna oturdun: ${fmtS(m)} ücret, her hafta ekrandasın.`,'gold')}},{t:'Reddet',fn:()=>{}}]},
 {id:'mars',min:18,c:()=>S.fame>=45,title:'Takım marşı',text:()=>'Büyük bir futbol kulübü yeni marşını senden istiyor.',ch:[
  {t:'Yap',fn:()=>{S.fol=Math.round(S.fol*1.04);S.money+=R(5,12)*1e5;log('Yeni marşın tribünlerde söyleniyor! Rakip taraftarlar biraz kızgın.','good')}},{t:'Reddet',fn:()=>{}}]},
 {id:'kopya',min:16,c:()=>S.fame>=30,gen:()=>({a:pick(ARTISTS2)}),title:'Tarzın kopyalanıyor',text:p=>`${p.a} senin kombinlerini, sahne şovunu, hatta konuşma tarzını birebir kopyalıyor.`,ch:[
  {t:'Göndermeli bir paylaşım yap',fn:p=>{addF(Math.round(S.fol*.02),'x');log(`${p.a}'a gönderme yaptın, taraftarların coştu.`)}},{t:'Ona şarkıyla cevap ver (1 hak)',fn:p=>{S.months=Math.max(0,S.months-1);if(S.skill+R(0,40)>60){addF(Math.round(S.fol*.06),'tt');log('Cevap şarkın hit oldu!','gold')}else log('Cevap şarkın pek ses getirmedi.','dim')}},{t:'Taklit iltifattır',fn:()=>add('happy',2)}]},
 {id:'hastane',min:20,c:()=>S.health<45,title:'Sahnede fenalaştın',text:()=>'Aşırı yorgunluktan konser çıkışı fenalaştın, doktorlar dinlenmen gerektiğini söylüyor.',ch:[
  {t:'Dinlen (5 hak)',fn:()=>{S.months=Math.max(0,S.months-5);add('health',25);log('Bir süre dinlendin, toparlandın.','good')}},{t:'Devam et',fn:()=>{add('health',-10);log('Dinlenmeden devam ettin, vücudun alarm veriyor.','bad')}}]},
 {id:'eskisevgili',min:18,c:()=>S.fame>=25,title:'Eski sevgilin konuştu',text:()=>'Eski sevgilin bir programda ilişkiniz hakkında sırlar anlattı.',ch:[
  {t:'Bir şarkıyla cevap ver',fn:()=>{S.months=Math.max(0,S.months-1);S.lyB=10;log('İçini döktüğün bir şarkı yazmaya başladın. Sıradaki şarkın çok güçlü olacak.','good')}},{t:'Avukatına yönlendir',fn:()=>log('Avukatın ihtar çekti, konu kapandı.')},{t:'Sessiz kal',fn:()=>add('happy',-4)}]},
 {id:'saglikkontrol',min:30,c:()=>S.age>=30,auto:()=>{if(S.health<60)log('Doktorun "Tempoyu düşür" diye uyardı.','dim')}}
);
Object.assign(EVSTAR,{ihanet:['Menajeri ifşa et, tüm parayı geri al',()=>{const x=R(10,30)*1e5;S.money+=x;S.manager=null;log(`Menajerini ifşa ettin ve ${fmtS(x)} geri aldın.`,'gold')}],
 sesgitti:['Akapella efsane performans',()=>{addF(Math.round(S.fol*.1+3000),'tt');log('Akapella performansın yılın anı oldu!','gold')}],
 bahis:['Teklifi ifşa et, kahraman ol',()=>{addF(Math.round(S.fol*.04),'x');log('Bahis teklifini ifşa ettin, alkış aldın.','gold')}],
 iptal:['Ücretsiz konserle telafi et',()=>{addF(Math.round(S.fol*.05),'ig');log('Ücretsiz telafi konseri verdin, herkes seni sevdi.','gold')}],
 hack:['Hacker\'ı bul ve hesabı geri al',()=>log('Hesabın bir saatte geri geldi.','good')],
 roportaj:['Cevaplarınla ekranları kilitle',()=>{addF(Math.round(S.fol*.06),'x');log('Röportajın yılın en çok izlenen yayını oldu.','gold')}],
 kopya:['Kopyacıyı tek şarkıyla bitir',()=>{addF(Math.round(S.fol*.08),'tt');log('Cevap şarkın listelere oturdu.','gold')}],
 hastane:['Hızla iyileş',()=>{add('health',40);log('Kısa sürede iyileştin.','good')}],
 stalker:['Profesyonel güvenlik ekibi',()=>log('Güvenlik ekibin olayı hallediyor.','good')]});
