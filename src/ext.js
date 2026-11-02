/* ============ GENİŞLEME: sertifika, ödül, arkadaş, finans, alışveriş, sosyal medya, listeler, süperstar ============ */
const CERTS=[[5e6,'Altın','#e3b33c'],[15e6,'Platin','#cfd8e3'],[30e6,'Çift Platin','#cfd8e3'],[45e6,'Üçlü Platin','#cfd8e3'],[100e6,'Elmas','#8fe3ff'],[200e6,'Çift Elmas','#8fe3ff'],[300e6,'Üçlü Elmas','#8fe3ff']];
function certOf(n,mul){mul=mul||1;let c=-1;CERTS.forEach((x,i)=>{if(n>=x[0]*mul)c=i});return c}
const certBadge=(c,sm)=>c<0?'':`<span class="cert ${sm?'sm':''}" style="--cc:${CERTS[c][2]}">${c>=4?'💎':'💿'} ${CERTS[c][1]}</span>`;
const ARTISTS2=['Derin Ay','Melis Nova','Kaan Rüzgar','Asya Lin','Bora Karaca','Selin Su','Tan Ateş','Ece Mira','Lara Vega','Emre Koral','Ayaz Kara','Mira Deniz','Baran Tuna','Ela Sezer','Rıza 06','Nehir Ay','Cem Atlas','Yağmur Lee','Doruk','Sena Gök'];
const TRAITS={sadik:{n:'Sadık',d:'Her koşulda yanında, yakınlık zor düşer'},kiskanc:{n:'Kıskanç',d:'Şöhretini ve hayranlarını kıskanır'},partici:{n:'Partici',d:'Gece hayatına sürükler: mutluluk ↑ sağlık ↓'},para:{n:'Para düşkünü',d:'Sık sık maddi destek ister'},destekci:{n:'Destekçi',d:'Her yıl moral verir'},dedikoducu:{n:'Dedikoducu',d:'Sırlarını magazine sızdırabilir'},yetenekli:{n:'Yetenekli',d:'Birlikte çalışınca kalite ↑'},baglantili:{n:'Bağlantılı',d:'Sektörde kapı açar, şirket tanıştırır'}};
const FTYPES={sanatci:{n:'Sanatçı',ic:'🎤'},produktor:{n:'Prodüktör',ic:'🎛'},soz:{n:'Söz yazarı',ic:'✍️'},yonetmen:{n:'Klip yönetmeni',ic:'🎬'},dj:{n:'DJ',ic:'🎧'},model:{n:'Model',ic:'📸'},sporcu:{n:'Sporcu',ic:'⚽'},isinsani:{n:'İş insanı',ic:'💼'},normal:{n:'Arkadaş',ic:'🙂'}};
const PLACES=[
 {id:'kulup',n:'Gece kulübü',ic:'🍸',min:18,fame:0,types:['dj','model','sanatci','isinsani','normal'],d:'DJ\'ler, modeller, sanatçılar'},
 {id:'studyo',n:'Stüdyo koridoru',ic:'🎛',min:14,fame:0,types:['produktor','soz','sanatci'],d:'Prodüktörler ve söz yazarları'},
 {id:'kulis',n:'Konser kulisi',ic:'🎤',min:16,fame:20,types:['sanatci','sanatci','yonetmen'],d:'Ünlü sanatçılar ve yönetmenler'},
 {id:'set',n:'Klip seti',ic:'🎬',min:18,fame:15,types:['yonetmen','model','dj'],d:'Yönetmenler ve modeller'},
 {id:'odul',n:'Ödül gecesi partisi',ic:'🏆',min:18,fame:45,types:['sanatci','yonetmen','isinsani','model'],d:'Sektörün zirvesi'},
 {id:'kafe',n:'Kafe',ic:'☕',min:12,fame:0,types:['normal','soz','model'],d:'Sıradan insanlar'},
 {id:'spor',n:'Spor salonu',ic:'🏋',min:14,fame:0,types:['sporcu','model','normal'],d:'Sporcular ve modeller'}];
const STOCKS=[{id:'SHNE',n:'Sahne Medya',mu:.12,sg:.35},{id:'TRKZ',n:'Turkuaz Mobil',mu:.08,sg:.2},{id:'NOVA',n:'Nova Bank',mu:.1,sg:.25},{id:'VOLT',n:'VoltX Enerji',mu:.15,sg:.45},{id:'ATLS',n:'Atlas Global Müzik',mu:.1,sg:.3},{id:'BGZ',n:'Boğaz Holding',mu:.07,sg:.18},{id:'ALTN',n:'Altın fonu',mu:.07,sg:.12},{id:'KRPT',n:'Kripto fonu',mu:.2,sg:.9}];
const WATCHES=[{id:'spor',n:'Dijital spor saat',p:6000,st:1},{id:'celik',n:'Çelik dalgıç saati',p:450000,st:4},{id:'krono',n:'Altın kronograf',p:1800000,st:6},{id:'pirlanta',n:'Pırlantalı saat',p:6500000,st:9},{id:'tourbillon',n:'Tourbillon koleksiyon saati',p:25000000,st:12}];
const CARS2=[{id:'elektrik',n:'Elektrikli sedan',ic:'🔋',p:3200000,up:90000,pr:7},{id:'klasik',n:'Klasik Amerikan',ic:'🚘',p:8500000,up:400000,pr:15},{id:'luks',n:'Lüks sedan',ic:'🚖',p:12000000,up:500000,pr:17},{id:'cabrio',n:'Üstü açık spor',ic:'🏎',p:24000000,up:900000,pr:24},{id:'hiper',n:'Hiper otomobil',ic:'🚀',p:180000000,up:6000000,pr:45}];
CARS2.forEach(c=>{if(!CARS.some(x=>x.id===c.id))CARS.push(c)});CARS.sort((a,b)=>a.p-b.p);
const HFEAT=[{id:'studyo',n:'Ev stüdyosu',ic:'🎙',p:2500000,d:'Ücretsiz kayıt · kalite +18'},{id:'havuz',n:'Havuz',ic:'🏊',p:3000000,d:'Mutluluk +5/yıl'},{id:'sinema',n:'Sinema odası',ic:'🎞',p:1200000,d:'Mutluluk +3/yıl'},{id:'spor',n:'Ev spor salonu',ic:'🏋',p:900000,d:'Sağlık +3/yıl'},{id:'gardirop',n:'Giyinme odası',ic:'👔',p:1500000,d:'Stil +3'},{id:'parti',n:'Parti bahçesi',ic:'🎉',p:2000000,d:'Arkadaş yakınlığı +5/yıl'},{id:'akilli',n:'Akıllı ev sistemi',ic:'🏠',p:700000,d:'Mutluluk +2/yıl'},{id:'heli',n:'Helikopter pisti',ic:'🚁',p:15000000,d:'Mutluluk +4/yıl · prestij'}];
const SOC=[{id:'ig',n:'Instagram',ic:'📸',c:'#e1306c',w:.55,acts:[['post','Kombin paylaş','Stilin ne kadar iyiyse o kadar takipçi','👗'],['story','Kulis hikayesi','Hayranlarla bağ kur','🎞'],['live','Canlı yayın','Mutluluk ↑ · takipçi ↑','🔴']]},
 {id:'tt',n:'TikTok',ic:'🎵',c:'#25f4ee',w:.4,acts:[['trend','Trend videosu','Son şarkının viral şansı ↑','📈'],['dans','Dans challenge başlat','Şansa bağlı büyük patlama','💃']]},
 {id:'yt',n:'TubeX kanalı',ic:'▶️',c:'#ff3b30',w:.25,acts:[['vlog','Vlog yükle','Abone ↑','🎥'],['kamera','Klip kamera arkası','Abone ↑ · klibe ilgi ↑','🎬']]},
 {id:'x',n:'X',ic:'✖️',c:'#9aa0a6',w:.15,acts:[['tweet','Gündeme dair tweet at','Risk: polemik çıkabilir','💬'],['soru','Hayranlara soru-cevap','Güvenli · mutluluk ↑','❓']]}];
const AWCER={mikrofon:'Altın Mikrofon Müzik Ödülleri',klip:'TubeX Klip Ödülleri',global:'Global Müzik Ödülleri'};

function extInit(){const d={q:0,qt:0,pend:{spo:0,tube:0,fizzy:0,pear:0},bank:0,loan:0,port:{},mkt:null,friends:[],star:false,smw:{ig:.55,tt:.4,yt:.25,x:.15},smc:{},places:{},watches:[],hup:{},chart:null,advYr:-1};
 Object.keys(d).forEach(k=>{if(S[k]===undefined)S[k]=d[k]});
 if(!S.mkt){S.mkt={};STOCKS.forEach(x=>{const p=R(12,180);S.mkt[x.id]={p,h:[p]}})}
 S.songs.forEach(s=>{if(s.cert==null)s.cert=-1});
 if(S.contract&&S.contract.reqS==null){const c=S.contract;c.reqS=c.req||4;c.reqC=0;c.clips=0;c.recoup=true}
 if(S.partner&&!S.partner.trait){S.partner.trait=pick(Object.keys(TRAITS));S.partner.type=pick(Object.keys(FTYPES))}}
const fol=(k)=>Math.round(S.fol*(S.smw[k]||.2));
function addF(n,k){S.fol+=n;if(k)S.smw[k]=Math.min(1.2,(S.smw[k]||.2)+.01);calcFame()}

/* ---------- Sosyal medya ---------- */
ACT.soc=(k,a)=>{S.smc[k]=S.smc[k]||0;if(S.smc[k]>=4){toast('Bu yıl bu hesapta yeterince paylaştın.');return}S.smc[k]++;const st=stil(),F=S.fol;let g=0;
 const last=released().sort((x,y)=>y.ra-x.ra||y.id-x.id)[0];
 if(a==='post'){g=30+F*RF(.002,.006)*(1+st/40);log(`Instagram'a yeni kombinini paylaştın. +${num(g)} takipçi`)}
 if(a==='story'){g=20+F*RF(.0015,.004);add('happy',1);log(`Stüdyodan kulis hikayesi paylaştın. +${num(g)} takipçi`)}
 if(a==='live'){g=15+F*RF(.0015,.0035);add('happy',4);log(`Instagram'da canlı yayın açtın, hayranlarla sohbet ettin. +${num(g)} takipçi`,'good')}
 if(a==='trend'){g=25+F*RF(.002,.005);if(last){last.pot*=1.2;S.tiktok=1}log(`TikTok'ta trend videosu çektin${last?` ("${last.t}" ile)`:''}. +${num(g)} takipçi`)}
 if(a==='dans'){if(ch(S.star?1:.15)){g=F*RF(.05,.1)+500;if(last)last.pot*=2;log(`Dans challenge'ın patladı! Herkes "${last?last.t:'senin şarkın'}" ile video çekiyor. +${num(g)} takipçi`,'gold')}else{g=10+F*.002;log('Dans challenge pek tutmadı.','dim')}}
 if(a==='vlog'){g=20+F*RF(.0015,.0045);log(`TubeX kanalına vlog yükledin. +${num(g)} abone`)}
 if(a==='kamera'){g=20+F*RF(.0015,.004);const c=released().find(x=>x.clip);if(c)c.pot*=1.1;log(`Klip kamera arkası videosu yayınladın. +${num(g)} abone`)}
 if(a==='tweet'){const r=Math.random();if(S.star||r<.5){g=F*RF(.005,.012);log(`Tweet'in gündem oldu. +${num(g)} takipçi`,'good')}else if(r<.75){g=-F*.01;add('happy',-8);log('Tweet\'in polemik yarattı, linç yedin.','bad')}else{g=5;log('Tweet\'in pek ilgi görmedi.','dim')}}
 if(a==='soru'){g=10+F*RF(.001,.0025);add('happy',2);log(`Hayranlarının sorularını cevapladın. +${num(g)} takipçi`)}
 addF(Math.round(g),k);sheet('kariyer')};

/* ---------- Arkadaşlar ---------- */
ACT.meet=id=>{const pl=PLACES.find(x=>x.id===id);if(S.places[id]===S.qt){toast('Bu yıl burayı zaten ziyaret ettin.');return}if(S.age<pl.min||S.fame<pl.fame)return;S.places[id]=S.qt;
 if(id==='kulup'){add('happy',4);add('health',-2)}
 if(!ch(S.star?1:.7+S.fame/300)){log(`${pl.n}nde kimseyle yakınlaşamadın.`,'dim');sheet('hayat');return}
 if(S.friends.length>=16){toast('Arkadaş listen dolu.');return}
 const type=pick(pl.types),g=ch(.5)?'e':'k';let name,fame=0,genre=null;
 if(type==='sanatci'){const free=ARTISTS2.filter(n=>!S.friends.some(f=>f.name===n));name=pick(free.length?free:ARTISTS2);fame=clamp(R(15,95)+(id==='odul'?15:0));genre=pick(Object.keys(GENRES))}else name=pick(g==='k'?NM_K:NM_E)+' '+pick(SURN);
 const f={id:S.nid++,name,g,type,trait:pick(Object.keys(TRAITS)),yak:R(35,60),fame,genre,done:0,fav:-1};S.friends.push(f);
 log(`${pl.n}nde ${FTYPES[type].n.toLowerCase()} ${name} ile tanıştın${type==='sanatci'?` (${GENRES[genre].n}, şöhret ${fame})`:''}.`,'good');sheet('hayat')};
ACT.fTime=id=>{const f=S.friends.find(x=>x.id===id);if(f.done){toast('Bu yıl zaten vakit geçirdiniz.');return}f.done=1;f.yak=clamp(f.yak+R(7,14));add('happy',2);if(f.trait==='partici'){add('happy',2);add('health',-2)}log(`${f.name} ile ${f.trait==='partici'?'sabaha kadar eğlendin':'güzel vakit geçirdin'}.`,'good');sheet('hayat')};
const FAVS={sanatci:'Düet teklif et',produktor:'Beat iste',soz:'Şarkı sözü iste',yonetmen:'Klibini çeksin',dj:'Setinde şarkını çalsın',model:'Klibinde oynasın',isinsani:'Borsa tüyosu iste',sporcu:'Birlikte antrenman',normal:'Dertleş'};
ACT.fFav=id=>{const f=S.friends.find(x=>x.id===id);if(f.fav===S.qt){toast('Bu yıl zaten bir iyilik istedin.');return}if(f.yak<50&&!S.star){toast('Yakınlığınız en az %50 olmalı.');return}f.fav=S.qt;
 const tal=f.trait==='yetenekli'?1.4:1;
 switch(f.type){
  case 'sanatci':if(ch(S.star?1:.4+f.yak/200-(f.fame-S.fame)/200)){S.feat=f.name;S.featBoost=1+f.fame/90;log(`${f.name} düet teklifini kabul etti! Sıradaki şarkın feat. ${f.name}.`,'gold')}else{f.yak=clamp(f.yak-5);log(`${f.name} "Şu an albüm sürecindeyim" dedi.`,'dim')}break;
  case 'produktor':S.prodB=Math.round(8*tal);log(`${f.name} sana bir beat hazırladı. Sıradaki kaydın kalitesi +${S.prodB}.`,'good');break;
  case 'soz':S.lyB=Math.round(7*tal);log(`${f.name} sana söz yazdı. Sıradaki şarkın kalitesi +${S.lyB}.`,'good');break;
  case 'yonetmen':S.dirFree=1;log(`${f.name} bir sonraki klibini ücretsiz çekecek.`,'good');break;
  case 'dj':{const s=released().sort((a,b)=>b.ra-a.ra)[0];if(s){s.pot*=1.3;log(`${f.name} setlerinde "${s.t}" çalmaya başladı.`,'good')}else log(`${f.name}: "Önce bir şarkı çıkar, çalarım."`,'dim');break}
  case 'model':S.modelB=1;addF(Math.round(S.fol*.02+100),'ig');log(`${f.name} bir sonraki klibinde oynayacak. Ortak fotoğrafınız çok beğenildi.`,'good');break;
  case 'isinsani':{const best=[...STOCKS].sort(()=>Math.random()-.5)[0];S.tip=best.id;log(`${f.name} fısıldadı: "Bu yıl ${best.n} (${best.id}) uçacak."`,'gold');break}
  case 'sporcu':add('health',R(6,12));log(`${f.name} ile antrenman yaptın.`,'good');break;
  default:add('happy',R(5,10));log(`${f.name} ile dertleştin, içini döktün.`,'good')}
 if(f.trait==='baglantili'&&!S.contract&&S.genre&&ch(.6)){genLabel(true);log(`${f.name} seni bir plak şirketinin yöneticisiyle tanıştırdı. Teklif geldi!`,'gold')}
 sheet('hayat')};
ACT.fLove=id=>{const f=S.friends.find(x=>x.id===id);if(S.partner){toast('Zaten bir ilişkin var.');return}if(ch(S.star?1:f.yak/130)){S.partner={id:f.id,name:f.name,age:S.age+R(-3,3),yak:f.yak,st:'sevgili',g:f.g,type:f.type,trait:f.trait};S.friends=S.friends.filter(x=>x.id!==id);add('happy',8);log(`${f.name} ile sevgili oldunuz!${f.type==='sanatci'?' Magazin manşetleri sizi konuşuyor.':''}`,'gold');if(f.type==='sanatci')addF(Math.round(S.fol*.04),'ig')}else{f.yak=clamp(f.yak-12);log(`${f.name} "Seni sadece arkadaş olarak görüyorum" dedi.`,'bad')}SUB=null;sheet('hayat')};
ACT.fEnd=id=>{const f=S.friends.find(x=>x.id===id);S.friends=S.friends.filter(x=>x.id!==id);log(`${f.name} ile arkadaşlığını bitirdin.`,'dim');SUB=null;sheet('hayat')};
ACT.trait=(who,id,t)=>{if(!S.star)return;const p=who==='p'?S.partner:S.friends.find(x=>x.id===id);p.trait=t;sheet('hayat')};

/* ---------- Banka & borsa ---------- */
function loanLimit(){return Math.round(Math.max(200000,S.fame*S.fame*12000+S.bank*.5))}
ACT.dep=x=>{x=x==='all'?Math.max(0,S.money):x;if(x<=0||S.money<x){toast('Kasanda yeterli nakit yok.');return}S.money-=x;S.bank+=x;sheet('hayat')};
ACT.wd=x=>{x=x==='all'?S.bank:Math.min(x,S.bank);if(x<=0)return;S.bank-=x;S.money+=x;sheet('hayat')};
ACT.loanT=x=>{if(S.loan+x>loanLimit()){toast('Kredi limitin: '+fmtS(loanLimit()));return}S.loan+=x;S.money+=x;log(`Bankadan ${fmtS(x)} kredi çektin.`,'dim');sheet('hayat')};
ACT.loanP=x=>{x=x==='all'?S.loan:Math.min(x,S.loan);if(S.money<x){toast('Kasanda yeterli nakit yok.');return}S.money-=x;S.loan-=x;if(!S.loan)log('Kredi borcunu kapattın.','good');sheet('hayat')};
const portVal=()=>Object.entries(S.port).reduce((a,[k,v])=>a+v.q*S.mkt[k].p,0);
ACT.buy=(id,x)=>{x=x==='all'?S.money:x;if(x<=0||S.money<x){toast('Kasanda yeterli nakit yok.');return}const p=S.mkt[id].p;S.money-=x;const h=S.port[id]=S.port[id]||{q:0,c:0};h.q+=x/p;h.c+=x;sheet('hayat')};
ACT.sell=(id,f)=>{const h=S.port[id];if(!h)return;const q=h.q*f,v=q*S.mkt[id].p;S.money+=v;h.c*=1-f;h.q-=q;if(h.q<1e-6)delete S.port[id];sheet('hayat')};
function gauss(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
function marketYear(){STOCKS.forEach(x=>{const m=S.mkt[x.id];let r=x.mu+x.sg*gauss()-x.sg*x.sg/2;if(x.id==='SHNE'||x.id==='ATLS')r+=(S.fame-50)/1000;if(S.tip===x.id)r=Math.max(r,.25+Math.random()*.3);m.p=Math.max(.5,m.p*Math.exp(r));m.h.push(m.p);if(m.h.length>16)m.h.shift()});S.tip=null;
 if(S.bank>0){const i=S.bank*.15;S.bank+=i;if(i>1000)log(`Banka hesabına ${fmtS(i)} faiz işledi.`,'dim')}
 if(S.loan>0){const i=S.loan*.42;S.loan+=i;log(`Kredi faizi: ${fmtS(i)} (borç ${fmtS(S.loan)})`,'bad')}}
function spark(h,c){const mn=Math.min(...h),mx=Math.max(...h),r=mx-mn||1;return `<svg viewBox="0 0 100 30" class="spark"><polyline points="${h.map((v,i)=>`${(i/(Math.max(1,h.length-1))*100).toFixed(1)},${(28-(v-mn)/r*26).toFixed(1)}`).join(' ')}" fill="none" stroke="${c}" stroke-width="1.8"/></svg>`}

/* ---------- Alışveriş & ev ---------- */
ACT.watch=id=>{const w=WATCHES.find(x=>x.id===id);if(S.watches.includes(id))return;if(S.age<16){toast('Biraz büyü.');return}if(!pay(w.p))return;S.watches.push(id);log(`${w.n} aldın! (${fmtS(w.p)})`,'good');sheet('hayat')};
ACT.hfeat=(hid,fid)=>{const f=HFEAT.find(x=>x.id===fid);S.hup[hid]=S.hup[hid]||[];if(S.hup[hid].includes(fid))return;if(!pay(f.p))return;S.hup[hid].push(fid);const h=HOUSES.find(x=>x.id===hid);log(`${h.n} evine ${f.n.toLowerCase()} yaptırdın.`,'good');sheet('hayat')};
const hasF=fid=>Object.entries(S.hup||{}).some(([h,a])=>S.houses.includes(h)&&a.includes(fid));

/* ---------- Plak şirketi pazarlığı ---------- */
function genLabel(force){const f=S.fame,mt=Math.min(5,1+Math.floor(Math.max(0,f-15)/14));const L=pick(LABELS.filter(l=>l.t<=mt)),yrs=R(2,4);
 const b={adv:Math.round(L.t*L.t*1.2e6*(1+f/20)*RF(.7,1.3)/1e4)*1e4,roy:Math.round(clamp(RF(16,30)-L.t*1.5+f/12,12,45)),yrs,reqS:yrs*2+R(0,2),reqC:Math.max(0,yrs-1+R(-1,1)),rec:true,is360:ch(.4)};
 S.offers.push({id:S.nid++,k:'label',n:L.n,t:L.t,b,ask:{...b},pat:3,flex:.1+f/350+(S.manager?.08:0)+RF(0,.08),ok:false,msg:''})}
function negScore(o){const a=o.ask,b=o.b;return .4*a.adv/b.adv+.4*a.roy/b.roy+.08*b.reqS/Math.max(1,a.reqS)+.05*(b.reqC+1)/(a.reqC+1)+.07*b.yrs/a.yrs+(a.rec?0:.3)+(b.is360&&!a.is360?.12:0)-(!b.is360&&a.is360?.1:0)}
const LIM={adv:[0,1e12],roy:[5,70],yrs:[1,6],reqS:[1,30],reqC:[0,10]};
ACT.negSet=(id,k,d)=>{const o=S.offers.find(x=>x.id===id),a=o.ask;if(k==='rec'||k==='is360')a[k]=!a[k];else if(k==='adv')a.adv=Math.max(0,Math.round((a.adv+d*o.b.adv*.1)/1e4)*1e4);else a[k]=clamp(a[k]+d,LIM[k][0],LIM[k][1]);o.ok=false;o.msg='';drawSheet()};
ACT.negSend=id=>{const o=S.offers.find(x=>x.id===id),sc=negScore(o),mx=1+o.flex+(S.star?.8:0);
 if(sc<=mx){o.ok=true;o.msg=`✅ ${o.n}: "Bu şartlar bize uyar. İmzalayalım."`}
 else{o.pat--;if(o.pat<=0){S.offers=S.offers.filter(x=>x.id!==id);log(`${o.n} pazarlıktan çekildi. "Başka sanatçılarla devam edeceğiz."`,'bad');SUB={t:'offers',title:'Teklifler'};sheet('kariyer');return}
  if(sc<=mx+.3){const a=o.ask,b=o.b;a.adv=Math.round((a.adv+b.adv)/2/1e4)*1e4;a.roy=Math.round((a.roy+b.roy)/2);a.reqS=Math.ceil((a.reqS+b.reqS)/2);a.reqC=Math.ceil((a.reqC+b.reqC)/2);a.yrs=Math.round((a.yrs+b.yrs)/2);if(!a.rec&&ch(.6))a.rec=true;if(b.is360&&!a.is360&&ch(.5))a.is360=true;o.ok=negScore(o)<=mx;o.msg=`🔁 ${o.n} karşı teklif verdi. Şartlar güncellendi.`}
  else o.msg=`❌ ${o.n}: "Bu şartlar bizim için çok ağır." (sabır ${o.pat}/3)`}
 drawSheet()};
ACT.sign=id=>{const o=S.offers.find(x=>x.id===id),a=o.ask,same=JSON.stringify(a)===JSON.stringify(o.b);if(!o.ok&&!same){toast('Önce şirketin bu şartları kabul etmesi lazım.');return}if(S.contract){toast('Zaten sözleşmen var.');return}
 S.contract={n:o.n,t:o.t,adv:a.adv,roy:a.roy,yrs:a.yrs,left:a.yrs,reqS:a.reqS,reqC:a.reqC,rel:0,clips:0,recoup:a.rec,is360:a.is360,unrec:a.rec?a.adv:0};S.money+=a.adv;S.offers=S.offers.filter(x=>x.k!=='label');
 log(`${o.n} ile ${a.yrs} yıllık ${a.is360?'360°':'standart'} sözleşme imzaladın! Avans ${fmtS(a.adv)}${a.rec?' (telifinden mahsup edilecek)':' (mahsupsuz)'}. Taahhüt: ${a.reqS} şarkı, ${a.reqC} klip. Telif payın %${a.roy}.`,'gold');SUB=null;sheet('kariyer')};
ACT.advReq=()=>{const c=S.contract;if(S.advYr===S.age){toast('Bu yıl zaten avans istedin.');return}S.advYr=S.age;const done=c.yrs-c.left,exp=c.reqS*Math.max(.5,done)/c.yrs;
 if(S.star||c.rel>=exp*.7){const x=Math.round(c.adv*RF(.2,.4)/1e4)*1e4;S.money+=x;c.unrec+=x;c.reqS+=2;log(`${c.n} ${fmtS(x)} ek avans verdi. Karşılığında taahhüdüne 2 şarkı eklendi; avans telifinden mahsup edilecek.`,'gold')}
 else log(`${c.n}: "Önce bize borçlu olduğun şarkıları teslim et."`,'bad');sheet('kariyer')};

/* ---------- Haftalık listeler ---------- */
function genChart(){const L=[];for(let i=0;i<40;i++){const g=pick(Object.keys(GENRES));L.push({t:genTitle(g),a:pick(ARTISTS2),g,w:Math.round(4.6e6*Math.pow(.925,i)*RF(.85,1.15)),ch:pick(['▲','▼','▲','▼','=','YENİ']),d:R(1,9)})}S.chart=L}
function weekly(s){const n=S.age-s.ra;return s.ly/Math.max(4,n<=0?(s.rm||12)*4.3:52)}
function platChart(pid){if(!S.chart)genChart();const rows=S.chart.map(x=>({t:x.t,a:x.a,w:x.w*shares(x.g)[pid]*(pid==='tube'?1.3:1),ch:x.ch,d:x.d,me:false}));
 released().filter(s=>s.ly>0&&S.age-s.ra<=3).forEach(s=>{const sh=shares(s.g)[pid]*(pid==='tube'?s.clipM:1);rows.push({t:s.t+(s.feat?' (feat. '+s.feat+')':''),a:S.first+' '+S.last,w:weekly(s)*sh,me:true,s})});
 return rows.sort((a,b)=>b.w-a.w).slice(0,20)}

/* ---------- Ödüller ---------- */
function awardsYear(){if(!S.genre||S.age<16)return;const yr=released().filter(s=>s.ra>=S.age-1);if(!yr.length&&S.fame<40)return;const res=[];
 const nom=(cer,cat,s,p)=>{const win=S.star||ch(p);S.awards.push({age:S.age,cer,cat,s:s?s.t:'',win});res.push([cer,cat,s,win])};
 const top=[...yr].sort((a,b)=>b.ly-a.ly)[0];
 if(top&&top.ly>6e6)nom('mikrofon','Yılın Şarkısı',top,clamp(top.ly/60e6,.12,.75));
 const al=S.albums.find(a=>a.age>=S.age-1);if(al){const st=S.songs.filter(x=>x.alb===al.n).reduce((a,x)=>a+x.ly,0);if(st>15e6)nom('mikrofon','Yılın Albümü',{t:al.n},clamp(st/120e6,.15,.7))}
 if(S.fame>=45&&ch(.7))nom('mikrofon',`Yılın En İyi ${GENRES[S.genre].n} Sanatçısı`,null,clamp(S.fame/140,.2,.7));
 const fe=yr.filter(s=>s.feat).sort((a,b)=>b.ly-a.ly)[0];if(fe&&fe.ly>4e6)nom('mikrofon','Yılın Düeti',fe,.45);
 if(S.fame>=20&&S.fame<55&&S.age-((S.songs[S.songs.length-1]||{}).ra||S.age)<=3&&ch(.5))nom('mikrofon','Yılın Çıkış Yapan Sanatçısı',null,.45);
 const cl=yr.filter(s=>s.clip).sort((a,b)=>b.tot.tube-a.tot.tube)[0];if(cl&&cl.ly*.3>2e6){nom('klip','Yılın Klibi',cl,clamp(cl.clipM/4,.2,.75));if(cl.clipM>=2)nom('klip','En İyi Prodüksiyon',cl,.5)}
 const gl=yr.find(s=>s.gpeak);if(gl){nom('global','En İyi Global Çıkış',gl,.35);if(gl.gpeak<=10)nom('global','Yılın Kaydı',gl,.25)}
 if(!res.length)return;const w=res.filter(r=>r[3]);
 log(`Ödül sezonu: ${res.length} dalda aday gösterildin, ${w.length} ödül kazandın.`,w.length?'gold':'dim');
 w.forEach(([c,cat,s])=>{log(`🏆 ${AWCER[c]} — ${cat}${s?` ("${s.t}")`:''}`,'gold');addF(Math.round(S.fol*.03),'ig')})}

/* ---------- Süperstar ---------- */
const EVSTAR={diss:['Herkesi susturan efsane cevap',p=>{addF(Math.round(S.fol*.2+1000),'x');log(`${p.r}'a verdiğin cevap yılın şarkısı gibi konuşuldu!`,'gold')}],
 tv:['Canlı yayında şov yap',()=>{addF(Math.round(S.fol*.1+2000),'ig');log('Canlı yayın performansın rekor kırdı.','gold')}],
 yarisma:['Yarışmayı kazan',()=>{addF(60000,'ig');S.money+=1e6;log('Sesin Yeter\'in şampiyonu oldun! +60 B takipçi, ₺1 Mn ödül.','gold')}],
 telif:['En iyi avukatlarla davayı kazan',()=>{const m=R(8,15)*1e6;S.money+=m;log(`Davayı kazandın, ${fmtS(m)} tazminat aldın.`,'gold')}],
 magazin:['Paparazziyle şakalaş, viral ol',()=>{addF(Math.round(S.fol*.06),'tt');add('happy',4);log('Paparazzi videon herkesin gönlünü kazandı.','gold')}],
 vergi:['Müşavirler her şeyi temize çıkarsın',()=>log('Vergi incelemesi kuruşu kuruşuna temiz çıktı.','good')],
 sahte:['Dolandırıcıyı ifşa et',()=>{addF(Math.round(S.fol*.03+300),'x');log('Dolandırıcıyı ifşa ettin, herkes seni konuşuyor.','good')}],
 yorgun:['Kısa bir mola, tam enerji',()=>{add('happy',20);add('health',10);log('Bir haftalık molayla yenilendin.','good')}],
 zorba:['Zorbayı herkesin önünde utandır',()=>{add('happy',8);log('Okulun kahramanı oldun.','good')}],
 gosteri:['Gösterinin yıldızı ol',()=>{S.skill=clamp(S.skill+3);add('happy',8);log('Gösteride herkesi ağlattın.','good')}],
 cover:['Coverın patlasın',()=>{addF(R(3000,15000),'yt');log('Cover videon viral oldu!','gold')}],
 aile:['Babanı ikna et',()=>{S.fam[1].yak=clamp(S.fam[1].yak+10);log('Baban seni dinledi ve destek olmaya karar verdi.','good')}],
 sirket:['Şirketi ikna et, süre al',()=>{log('Şirket sana ek süre verdi.','good')}]};
ACT.starT=()=>{S.star=!S.star;log(S.star?'⭐ Süperstar modu açıldı.':'Süperstar modu kapatıldı.','gold');sheet('hayat')};
ACT.selfEd=(k,d)=>{if(!S.star)return;if(k==='fol'){S.fol=Math.max(0,d==='x2'?S.fol*2:S.fol+d)}else if(k==='money')S.money+=d;else S[k]=clamp(S[k]+d);calcFame();if(SHEET==='ayar'&&SUB&&SUB.t==='self')drawSheet();else sheet('ayar',{t:'self',title:'Kendini düzenle'})};

/* ---------- Plak görünümü ---------- */
function vinylSVG(s,label){const m=(s.meta&&s.meta.cover)||{p:0,m:'plak'},[a,b]=CPAL[m.p]||CPAL[0];let x=`<svg viewBox="0 0 124 100" xmlns="http://www.w3.org/2000/svg"><circle cx="78" cy="50" r="45" fill="#0c0c0e"/>`+[40,34,28,22].map(r=>`<circle cx="78" cy="50" r="${r}" fill="none" stroke="#26262a" stroke-width="1"/>`).join('')+`<path d="M60 18 A38 38 0 0 1 112 40" stroke="#fff" stroke-opacity=".08" stroke-width="6" fill="none"/><circle cx="78" cy="50" r="15" fill="${a}"/><circle cx="78" cy="50" r="15" fill="${b}" opacity=".35"/><circle cx="78" cy="50" r="2" fill="#0c0c0e"/>`;
 x+=coverSVG(s,label).replace('<svg ','<svg x="2" y="5" width="90" height="90" ');return x+'</svg>'}

const pendT=()=>Object.values(S.pend||{}).reduce((a,b)=>a+b,0);
ACT.payout=(pid,to)=>{const ids=pid==='all'?PLAT.map(p=>p.id):[pid];let x=0;ids.forEach(k=>{x+=S.pend[k];S.pend[k]=0});if(x<1){toast('Çekilecek bakiye yok.');return}if(to==='bank')S.bank+=x;else S.money+=x;
 log(`${pid==='all'?'Tüm platformlardan':PLAT.find(p=>p.id===pid).n+' hesabından'} ${fmtS(x)} ${to==='bank'?'banka hesabına':'kasana'} çektin.`,'good');drawSheet();render()};
function payoutBox(pid){const x=pid==='all'?pendT():(S.pend[pid]||0);return `<div class="card pay"><div class="ch"><b>💰 ${pid==='all'?'Platformlarda bekleyen telif':'Hesap bakiyesi'}</b><span class="pill gold">${fmtS(x)}</span></div>${note(pid==='all'?'Net telif gelirin yıl sonunda platform hesaplarında birikir. İstediğin zaman çekebilirsin.':'Bu platformdan kazandığın net telif burada birikir.')}${pid==='all'?`<div class="kv">${PLAT.map(p=>`<div>${p.n}<b>${fmtS(S.pend[p.id]||0)}</b></div>`).join('')}</div>`:''}<div class="two"><button class="mini" onclick="ACT.payout('${pid}','cash')" ${x<1?'disabled':''}>Kasaya çek</button><button class="mini sec" onclick="ACT.payout('${pid}','bank')" ${x<1?'disabled':''}>Bankaya aktar</button></div></div>`}
