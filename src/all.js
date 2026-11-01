/* ============ HEPSİ: ses, konser mini oyunu, başarımlar, rakipler, dünya kariyeri, albüm döngüsü, bağımlılık, çocuk müzisyenler, avatarlı insanlar, süperstar düzenleme ============ */
const S_flags=()=>{S.flags=S.flags||{};return S.flags};
/* ---------- Ses ---------- */
let SND=(()=>{try{return localStorage.getItem('sahne2-ses')!=='0'}catch(e){return true}})(),AC=null;
function ac(){if(!SND)return null;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();return AC}catch(e){return null}}
function tone(f,t0,d,type,v){const a=ac();if(!a)return;const o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.value=f;g.gain.setValueAtTime(0,a.currentTime+t0);g.gain.linearRampToValueAtTime(v||.12,a.currentTime+t0+.01);g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+t0+d);o.connect(g);g.connect(a.destination);o.start(a.currentTime+t0);o.stop(a.currentTime+t0+d+.05)}
const sTick=()=>tone(1400,0,.04,'triangle',.05);
let _jg=0;const sJingle=()=>{if(Date.now()-_jg<900)return;_jg=Date.now();[523,659,784,1047].forEach((f,i)=>tone(f,i*.09,.35,'triangle',.1))};
const sBad=()=>[392,330].forEach((f,i)=>tone(f,i*.12,.3,'sawtooth',.05));
function sCrowd(){const a=ac();if(!a)return;const n=a.sampleRate*2.2,b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);const s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();f.type='bandpass';f.frequency.value=1200;f.Q.value=.6;g.gain.value=.35;s.buffer=b;s.connect(f);f.connect(g);g.connect(a.destination);s.start()}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('button'))sTick()},true);
const _log0=log;log=function(t,k){_log0(t,k);if(k==='gold')sJingle()};

/* ---------- Konser ritim mini oyunu ---------- */
function rhythm(n,cb){const m=$('mod');let hits=0,perf=0,round=0,pos=0,dir=1,run=true,zone=22;const spd=()=>1.1+round*.18;
 m.innerHTML=`<div class="box mg"><div class="eh">Konser başlıyor</div><h2>Ritmi yakala!</h2><p>İşaret pembe alana girdiğinde VUR'a bas. ${n} vuruş.</p><div class="mgbar"><div class="mgz" id="mgz"></div><div class="mgm" id="mgm"></div></div><div class="mgs" id="mgs">Vuruş 1/${n}</div><button class="btn mgb" id="mgb">🥁 VUR</button><button class="btn sec" id="mga">Otomatik oyna</button></div>`;m.classList.add('on');
 const setZ=()=>{const l=50-zone/2+RF(-25,25);$('mgz').style.left=l+'%';$('mgz').style.width=zone+'%';$('mgz').dataset.l=l};setZ();
 const loop=()=>{if(!run)return;pos+=dir*spd();if(pos>=100){pos=100;dir=-1}if(pos<=0){pos=0;dir=1}$('mgm').style.left=pos+'%';requestAnimationFrame(loop)};requestAnimationFrame(loop);
 const end=()=>{run=false;m.classList.remove('on');cb(hits,perf)};
 $('mgb').onclick=()=>{const l=+$('mgz').dataset.l,ok=pos>=l&&pos<=l+zone,c=Math.abs(pos-(l+zone/2))<zone/6;if(ok){hits++;if(c)perf++;tone(c?880:660,0,.12,'square',.08)}else tone(180,0,.15,'sawtooth',.06);
  $('mgs').textContent=ok?(c?'MÜKEMMEL!':'İyi!'):'Kaçtı!';round++;zone=Math.max(9,zone-2.2);if(round>=n){setTimeout(end,350);return}setZ();setTimeout(()=>{if(run)$('mgs').textContent=`Vuruş ${round+1}/${n}`},500)};
 $('mga').onclick=()=>{let h=0;for(let i=0;i<n;i++)if(ch(.3+S.skill/150))h++;hits=h;perf=Math.round(h/3);end()}}
const mgOn=()=>!S.mgOff;
const _conc=ACT.concert;ACT.concert=()=>{const v=S.cp&&S.cp.v;const fin=()=>{S_flags()[v]=1;if(v==='stad'||v==='avrupa'||v==='tur'||v==='festival')sCrowd()};
 if(S._mgr||!mgOn()){_conc();fin();return}const c=concertCalc(false);if(S.months<c.hak){toast(`Bu konser için ${c.hak} hak gerekiyor.`);return}
 rhythm(6,(h,p)=>{S._perf=h*7+p*2+S.skill*.45-(S.addict||0)/5;_conc();S._perf=null;fin();if(h>=5)log(`Ritim: ${h}/6 vuruş, ${p} mükemmel. Sahnede döktürdün!`,'good');else if(h<=2)log(`Ritim: ${h}/6 vuruş. Sahnede tempoyu kaçırdın.`,'bad')})};

/* ---------- Avatarlı insanlar + tipler ---------- */
function pLook(p,kind){if(p.look)return p.look;const g=p.g||(p.rel==='Annen'?'k':p.rel==='Baban'?'e':ch(.5)?'e':'k');p.g=g;
 const L=randLook(g);if(kind==='fam'||kind==='kid'){L.skin=clamp((S.look.skin||0)+R(-1,1),0,4);L.hairColor=ch(.6)?S.look.hairColor:pick(['siyah','kahve','kumral']);L.acc=[];L.outfit=pick(['gomlek','tisort','kadife','takim','hoodie',g==='k'?'elbise':'esofman'])}
 if(kind==='fam'&&g==='e')L.beard=pick(['yok','biyik','kisasakal','kirli','tam']);if(g==='k')L.beard='yok';p.look=L;return L}
const pAv=(p,kind,age,sz)=>`<span class="av ${sz||'sa'}">${AV(pLook(p,kind),age!=null?age:(p.age||30))}</span>`;
function peopleInit(){S.fam.forEach(p=>{p.trait=p.trait||pick(Object.keys(TRAITS))});S.kids.forEach(k=>{k.trait=k.trait||pick(Object.keys(TRAITS));k.skill=k.skill||0});if(S.partner)S.partner.trait=S.partner.trait||pick(Object.keys(TRAITS))}
function findP(kind,id){return kind==='fam'?S.fam.find(x=>x.id===id):kind==='kid'?S.kids.find(x=>x.id===id):kind==='fr'?S.friends.find(x=>x.id===id):S.partner}
ACT.pEd=(kind,id,k,v)=>{if(!S.star)return;const p=findP(kind,id);if(!p)return;
 if(k==='yak')p.yak=clamp(v==='full'?100:p.yak+v);else if(k==='trait')p.trait=v;else if(k==='type')p.type=v;else if(k==='look'){const g=p.g;p.look=null;p.g=g;pLook(p,kind)}else if(k==='skill')p.skill=clamp((p.skill||0)+v);else if(k==='age')p.age=Math.max(0,p.age+v);else if(k==='fame')p.fame=clamp((p.fame||0)+v);drawSheet()};
function pEditor(kind,id){if(!S.star)return '';const p=findP(kind,id);if(!p)return '';const st=(k,l,v,steps)=>`<div class="ngr"><div><b>${l}</b><span>${v}</span></div><div class="stp">${steps.map(([t,d])=>`<button onclick="ACT.pEd('${kind}',${id},'${k}',${typeof d==='string'?`'${d}'`:d})">${t}</button>`).join('')}</div></div>`;
 let h=sec('⭐ Süperstar: düzenle')+st('yak','Yakınlık','%'+p.yak,[['−10',-10],['+10',10],['Full','full']])+st('age','Yaş',p.age,[['−1',-1],['+1',1]]);
 if(kind==='kid')h+=st('skill','Müzik yeteneği',Math.round(p.skill||0),[['−10',-10],['+10',10]]);if(kind==='fr'&&p.type==='sanatci')h+=st('fame','Şöhret',p.fame,[['−10',-10],['+10',10]]);
 h+=note('Tip')+`<div class="tabs wrap">${Object.entries(TRAITS).map(([k,t])=>`<button class="tab sm ${p.trait===k?'on':''}" onclick="ACT.pEd('${kind}',${id},'trait','${k}')">${t.n}</button>`).join('')}</div>`;
 if(kind==='fr'||kind==='p')h+=note('Meslek')+`<div class="tabs wrap">${Object.entries(FTYPES).map(([k,t])=>`<button class="tab sm ${p.type===k?'on':''}" onclick="ACT.pEd('${kind}',${id},'type','${k}')">${t.ic} ${t.n}</button>`).join('')}</div>`;
 return h+`<button class="mini sec" style="margin-top:8px" onclick="ACT.pEd('${kind}',${id},'look')">🎲 Görünümünü değiştir</button>`}
function pHead(p,kind,sub){const t=TRAITS[p.trait]||{n:'—',d:''};return `<div class="wprev">${pAv(p,kind,p.age,'')}<div><b style="font-size:19px">${esc(p.name)}</b>${note(`${sub}<br>Tip: <b class="gold">${t.n}</b> — ${t.d}`)}</div></div><div class="tk"><span>Yakınlık</span><b>%${p.yak}</b></div><div class="bar"><i style="width:${p.yak}%;background:var(--acc)"></i></div>`}
/* kişi sayfaları (avatarlı) */
function shFam(id){const p=S.fam.find(x=>x.id===id),kid=!p;const q=p||S.kids.find(x=>x.id===id);if(!q){SUB=null;return shHayat()}const kind=kid?'kid':'fam';
 let h=pHead(q,kind,`${q.rel} · ${q.age} yaş${q.job?' · '+q.job:''}${kid?' · müzik yeteneği '+Math.round(q.skill||0):''}`);
 if(q.alive===false)return h+note('Huzur içinde yatsın.');
 h+=`<div class="tbar"><span>Bu dönemde kalan hakkın</span><b>${S.months} / ${HAK}</b></div>`+row(`ACT.famTime(${q.id})`,'☕','Vakit geçir','Yakınlık ↑ · mutluluk ↑',q.done?'Yapıldı':'1 hak',!!q.done);
 if(q.job)h+=row(`ACT.famMoney(${q.id})`,'💸','Para iste','Yakınlığınıza bağlı',q.asked?'Bu yıl istendi':'1 hak',!!q.asked);
 if(S.age>=18)h+=row(`ACT.famGift(${q.id})`,'🎁','Hediye al','Servetinin %1\'i',fmtS(Math.max(2000,S.money*.01)));
 if(kid){h+=sec('Müzisyen yetiştir')+row(`ACT.kidLesson(${q.id})`,'🎹','Enstrüman dersi aldır',`Yetenek ↑ · ${fmtS(20000*(1+S.fame/30))}`,'1 hak',q.age<5)+row(`ACT.kidStudio(${q.id})`,'🎙','Stüdyoya götür','Yetenek ↑ · yakınlık ↑','1 hak',q.age<6);
  if(q.age>=14)h+=row(`ACT.kidDuet(${q.id})`,'🎤','Birlikte düet yap','Sıradaki şarkın çocuğunla feat olur','',q.skill<25&&!S.star);
  if(q.age>=16&&S.lab)h+=row(`ACT.kidSign(${q.id})`,'📀',q.signed?'Şirketinde':'Şirketine imzalat',q.signed?'Sanatçın':'Kendi şirketinde sanatçı olarak başlasın','',!!q.signed)}
 return h+pEditor(kind,q.id)}
function shFriend(id){const f=S.friends.find(x=>x.id===id);if(!f){SUB=null;return shHayat()}
 let h=pHead(f,'fr',`Meslek: ${FTYPES[f.type].ic} ${FTYPES[f.type].n}${f.type==='sanatci'?` · ${GENRES[f.genre].n} · şöhret ${f.fame}`:''}`);
 h+=row(`ACT.fTime(${id})`,'☕','Vakit geçir','Yakınlık ↑',f.done?'Yapıldı':'1 hak',!!f.done);
 h+=row(`ACT.fFav(${id})`,FTYPES[f.type].ic,FAVS[f.type],f.yak<50&&!S.star?'Yakınlık %50 olmalı':f.trait==='baglantili'?'Bağlantılı: plak şirketiyle de tanıştırabilir':'Her 3 ayda bir kez',f.fav===S.qt?'İstendi':'1 hak',f.fav===S.qt);
 if(S.age>=16&&!S.partner&&f.g!==S.g)h+=row(`ACT.fLove(${id})`,'💘','Sevgili olmayı dene','Yakınlığa bağlı','1 hak');
 return h+row(`ACT.fEnd(${id})`,'👋','Arkadaşlığı bitir','','')+pEditor('fr',id)}
const _shP=shPartner;shPartner=function(){const p=S.partner;if(!p){SUB=null;return shHayat()}let h=_shP();
 h=h.replace(/^<div class="card"><div class="ch"><b>❤️[\s\S]*?<\/div><\/div><div class="tbar">/,pHead(p,'p',`${p.st==='eş'?'Eşin':'Sevgilin'} · ${p.age} yaş · ${FTYPES[p.type||'normal'].ic} ${FTYPES[p.type||'normal'].n}`)+'<div class="tbar">');
 const i=h.indexOf(sec('⭐ Süperstar: karakterini düzenle'));if(i>=0)h=h.slice(0,i);return h+pEditor('p',0)};
ACT.kidLesson=id=>{const k=S.kids.find(x=>x.id===id),c=Math.round(20000*(1+S.fame/30));if(!canPay(c)){toast('Paran yetmiyor.');return}if(!useM(1))return;S.money-=c;k.skill=clamp((k.skill||0)+R(4,8));k.yak=clamp(k.yak+3);log(`${k.name.split(' ')[0]}'e ${pick(['piyano','gitar','keman','davul','bağlama'])} dersi aldırdın. Yeteneği ${Math.round(k.skill)}.`,'good');drawSheet()};
ACT.kidStudio=id=>{const k=S.kids.find(x=>x.id===id);if(!useM(1))return;k.skill=clamp((k.skill||0)+R(2,5));k.yak=clamp(k.yak+R(5,10));log(`${k.name.split(' ')[0]}'i stüdyoya götürdün, mikrofonun başından ayrılmadı.`,'good');drawSheet()};
ACT.kidDuet=id=>{const k=S.kids.find(x=>x.id===id);S.feat=k.name;S.featBoost=1.4+(k.skill||0)/150;k.yak=clamp(k.yak+8);log(`${k.name.split(' ')[0]} ile düet kararı aldınız! Sıradaki şarkın feat. ${k.name}.`,'gold');drawSheet()};
ACT.kidSign=id=>{const k=S.kids.find(x=>x.id===id),L=S.lab;if(L.arts.length>=labBld().cap){toast('Şirket binan dolu.');return}
 const a={id:S.nid++,name:k.name,g:k.g,look:pLook(k,'kid'),genre:S.genre||pick(Object.keys(GENRES)),tal:Math.max(20,k.skill||20),fol:Math.round(S.fol*.02+1000),type:'sadik',happy:85,demos:[],con:{adv:0,roy:30,yrs:4,reqS:8,rec:false,left:4,del:0,unrec:0},tot:0,earn:0,kid:k.id};L.arts.push(a);k.signed=1;S_flags().kidsign=1;log(`${k.name} artık ${L.n} sanatçısı! Ailenin müzik hanedanı büyüyor.`,'gold');drawSheet()};
/* Hayat İlişkiler sekmesi: avatarlar */
const _shHA=shHayat;shHayat=function(){let h=_shHA();if(SUB||(S.htab||'iliski')!=='iliski')return h;
 S.fam.forEach(p=>{h=h.replace(new RegExp(`(onclick="sheet\\('hayat',\\{t:'p',id:${p.id},title:'Ailen'\\}\\)"><span class="ic">)[^<]*(</span>)`),`$1${pAv(p,'fam',p.age)}$2`)});
 S.kids.forEach(k=>{h=h.replace(new RegExp(`(onclick="sheet\\('hayat',\\{t:'p',id:${k.id},title:'Çocuğun'\\}\\)"><span class="ic">)[^<]*(</span>)`),`$1${pAv(k,'kid',k.age)}$2`)});
 S.friends.forEach(f=>{h=h.replace(new RegExp(`(onclick="sheet\\('hayat',\\{t:'friend',id:${f.id},title:'Arkadaş'\\}\\)"><span class="ic">)[^<]*(</span>)`),`$1${pAv(f,'fr',f.age||S.age)}$2`)});
 if(S.partner)h=h.replace(/(onclick="sheet\('hayat',\{t:'partner',title:'İlişki'\}\)"><span class="ic">)[^<]*(<\/span>)/,`$1${pAv(S.partner,'p',S.partner.age)}$2`);
 S.kids.forEach(k=>{h=h.replace(`${k.rel} · ${k.age} yaş · Yakınlık`,`${k.rel} · ${k.age} yaş · ${(TRAITS[k.trait]||{n:''}).n} · Yakınlık`)});
 S.fam.forEach(p=>{if(p.alive!==false)h=h.replace(`${p.rel} · ${p.age} yaş · Yakınlık`,`${p.rel} · ${p.age} yaş · ${(TRAITS[p.trait]||{n:''}).n} · Yakınlık`)});
 return h};

/* ---------- Başarımlar ---------- */
const ACH=[['ilksarki','✍️','İlk şarkı','İlk şarkını yaz',()=>S.songs.length>0],['ilkyayin','🚀','Merhaba dünya','İlk şarkını yayınla',()=>released().length>0],
 ['1mn','🎧','Milyonluk','Bir şarkın 1 milyon dinlensin',()=>released().some(s=>s.total>=1e6)],['100mn','🔥','Yüz milyon','Bir şarkın 100 milyon dinlensin',()=>released().some(s=>s.total>=1e8)],['1mr','🌋','Milyarlık hit','Bir şarkın 1 milyar dinlensin',()=>released().some(s=>s.total>=1e9)],
 ['altin','💿','İlk altın','Altın plak sertifikası al',()=>released().some(s=>s.cert>=0)],['elmas','💎','Elmas plak','Elmas sertifika al',()=>released().some(s=>s.cert>=4)],['5elmas','👑','Elmas koleksiyoncusu','5 elmas plak',()=>released().filter(s=>s.cert>=4).length>=5],
 ['top1','🥇','Zirve','Türkiye listesinde 1 numara ol',()=>S.best.tr===1],['global','🌍','Dünya listesinde','Global Top 50\'ye gir',()=>!!S.best.gl],['gl1','🪐','Dünyanın 1 numarası','Global listede 1 numara ol',()=>S.best.gl===1],
 ['10b','👥','Kalabalık','10 bin takipçi',()=>S.fol>=1e4],['1mt','📣','Milyonlar','1 milyon takipçi',()=>S.fol>=1e6],['10mt','🌟','Fenomen','10 milyon takipçi',()=>S.fol>=1e7],
 ['stad','🏟','Stadyum','Stadyum konseri ver',()=>S_flags().stad],['avrupa','✈️','Avrupa turnesi','Avrupa turnesine çık',()=>S_flags().avrupa],['dunya','🗺','Dünya starı','Bir yurt dışı pazarda %60 popülerlik',()=>Object.values(S.intl||{}).some(v=>v>=60)],
 ['odul','🏆','İlk ödül','Bir ödül kazan',()=>S.awards.some(a=>a.win!==false)],['10odul','🎖','Vitrin','10 ödül kazan',()=>S.awards.filter(a=>a.win!==false).length>=10],
 ['album','📀','İlk albüm','Albüm çıkar',()=>S.albums.length>0],['sirket','🏢','Patron','Kendi plak şirketini kur',()=>!!S.lab],['labtop','⭐','Yıldız yapımcı','Şirketindeki bir sanatçının şarkısı Türkiye\'de 1 numara olsun',()=>!!(S.lab&&S.lab.songs.some(s=>trRank((s.lq||0)/13)===1))],
 ['merch','👕','Marka','Merch markanı kur',()=>!!S.merch],['milyoner','💰','Milyoner','₺1 Mn kasada',()=>S.money>=1e6],['milyarder','🏦','Milyarder','₺1 Mr kasada',()=>S.money>=1e9],
 ['yali','🏛','Boğaz\'da','Bir yalı satın al',()=>S.houses.includes('yali')],['hiper','🏎','Hız tutkunu','Bugatti Chiron al',()=>S.cars.includes('chiron')],['evlilik','💍','Mutlu son','Evlen',()=>S.partner&&S.partner.st==='eş'],
 ['aile','👨‍👩‍👧‍👦','Kalabalık aile','3 çocuk sahibi ol',()=>S.kids.length>=3],['kidsign','🧬','Müzik hanedanı','Çocuğunu şirketine imzalat',()=>S_flags().kidsign],['savas','⚔️','Liste savaşı galibi','Bir liste savaşını kazan',()=>S_flags().savas],
 ['temiz','🌱','Temiz dönüş','Rehabilitasyonu tamamla',()=>S_flags().rehab],['miras','🧾','Hanedan','Çocuğunla devam et',()=>S_flags().miras]];
function achCheck(){if(!S||!S.alive)return;S.ach=S.ach||{};ACH.forEach(([id,ic,n,d,f])=>{if(!S.ach[id]){let ok=false;try{ok=f()}catch(e){}if(ok){S.ach[id]=S.age;_log0(`🏅 Başarım açıldı: ${n} — ${d}`,'gold');sJingle()}}})}
function shAch(){S.ach=S.ach||{};const n=Object.keys(S.ach).length;let h=`<div class="hero2"><small>Başarımlar</small><div class="big">${n} / ${ACH.length}</div><span>Her hayatın kendi başarımları var.</span></div><div class="achg">`;
 ACH.forEach(([id,ic,t,d])=>{const ok=S.ach[id]!=null;h+=`<div class="ach ${ok?'on':''}"><span>${ok?ic:'🔒'}</span><b>${t}</b><em>${d}${ok?' · '+S.ach[id]+' yaş':''}</em></div>`});return h+'</div>'}

/* ---------- Rakip sanatçılar ve canlı liste ---------- */
function rivInit(){if(S.rivals)return;S.rivals=ARTISTS2.slice(0,12).map(n=>{const g=['Melis Nova','Asya Lin','Selin Su','Ece Mira','Lara Vega','Mira Deniz','Ela Sezer','Nehir Ay','Yağmur Lee','Sena Gök','Derin Ay'].includes(n)?'k':'e';return {id:S.nid++,name:n,g,genre:pick(Object.keys(GENRES)),fame:R(25,90),mom:RF(-1,1),look:randLook(g),songs:[]}})}
function rivQuarter(){rivInit();S.rivals.forEach(r=>{r.mom=clamp(r.mom*.7+RF(-1,1)*.7,-2.5,2.5);r.fame=clamp(r.fame+r.mom*R(1,3));r.songs.forEach(s=>{s.pr=s.rank;s.w*=.7});r.songs=r.songs.filter(s=>s.w>40000).slice(0,3);
  if(ch(.3+r.fame/400))r.songs.unshift({t:genTitle(r.genre),w:Math.pow(10,4.4+r.fame/100*2.3)*RF(.6,1.4),q:S.qt,pr:null})});genChart()}
function genChart(){if(!S.rivals)rivInit();const L=[];S.rivals.forEach(r=>r.songs.forEach(s=>L.push({t:s.t,a:r.name,g:r.genre,w:s.w,src:s})));
 while(L.length<30){const g=pick(Object.keys(GENRES));L.push({t:genTitle(g),a:pick(['Dorukhan','Selin K','Kral Atlas','Mavi Gece','Yeraltı 34','Duman Ekibi']),g,w:Math.round(2.2e5*RF(.7,1.6))})}
 L.sort((a,b)=>b.w-a.w);L.forEach((x,i)=>{const pr=x.src?x.src.pr:null;x.ch=pr==null?'YENİ':pr>i+1?'▲':pr<i+1?'▼':'=';x.d=pr==null?0:Math.abs(pr-(i+1));if(x.src)x.src.rank=i+1});S.chart=L}
ACT.rivFeat=id=>{const r=S.rivals.find(x=>x.id===id),c=Math.round(500000*(1+r.fame/20));if(!canPay(c)){toast('Feat ücreti '+fmtS(c));return}if(!useM(1))return;
 if(S.star||ch(clamp(.35+(S.fame-r.fame)/120,.05,.9))){S.money-=c;S.feat=r.name;S.featBoost=1.3+r.fame/80;r.mom+=.5;log(`${r.name} feat teklifini kabul etti (${fmtS(c)}). Sıradaki şarkın feat. ${r.name}!`,'gold')}else log(`${r.name}'in ekibi: "Takvimimiz dolu."`,'dim');drawSheet()};
ACT.rivDiss=id=>{const r=S.rivals.find(x=>x.id===id);if(!useM(1))return;if(S.star||S.skill+R(0,40)>r.fame*.8){addF(Math.round(S.fol*.05+500),'x');r.mom-=1;log(`${r.name}'a attığın diss gündem oldu!`,'gold')}else{S.fol=Math.round(S.fol*.97);r.mom+=.8;log(`${r.name} dissine sert cevap verdi, sen kaybettin.`,'bad')}drawSheet()};
function shRiv(){rivInit();let h=note('Rakiplerinin kariyeri de ilerliyor: yükseliyorlar, düşüyorlar, şarkı çıkarıyorlar. Aynı dönemde şarkı çıkarırsan liste savaşına girersin.');
 [...S.rivals].sort((a,b)=>b.fame-a.fame).forEach(r=>{const s=r.songs[0];h+=`<div class="card"><div class="ch" style="justify-content:flex-start;gap:10px"><span class="av sa">${AV(r.look,28)}</span><div style="flex:1"><b>${esc(r.name)}</b><div class="note" style="margin:0">${GENRES[r.genre].n} · şöhret ${Math.round(r.fame)} <span class="${r.mom>0?'up':'dn'}">${r.mom>.3?'▲ yükselişte':r.mom<-.3?'▼ düşüşte':'= durağan'}</span></div></div></div>${s?note(`Son şarkı: "${esc(s.t)}" · haftalık ${num(s.w)}${s.rank?' · liste #'+s.rank:''}`):note('Bu dönem yeni şarkısı yok.')}<div class="two"><button class="mini" onclick="ACT.rivFeat(${r.id})">Feat teklif et</button><button class="mini sec" onclick="ACT.rivDiss(${r.id})">Diss at · 1 hak</button></div></div>`});return h}
const _dr=doRelease;doRelease=function(s,alb,pb){_dr(s,alb,pb);if(alb||!S.rivals)return;const rr=S.rivals.filter(r=>r.songs[0]&&r.songs[0].q===S.qt);const r=rr.length?pick(rr):(ch(.3)?pick(S.rivals):null);
 if(r){if(!(r.songs[0]&&r.songs[0].q===S.qt))r.songs.unshift({t:genTitle(r.genre),w:Math.pow(10,4.4+r.fame/100*2.3)*RF(.7,1.3),q:S.qt,pr:null});S.battle={rid:r.id,sid:s.id,q:S.qt};log(`⚔️ ${r.name} da aynı hafta "${r.songs[0].t}" şarkısını çıkardı. Liste savaşı başladı!`,'gold')}};
function battleResolve(){const b=S.battle;if(!b||b.q!==S.qt)return;const r=S.rivals.find(x=>x.id===b.rid),s=S.songs.find(x=>x.id===b.sid);S.battle=null;if(!r||!s)return;const mine=(s.lq||0)/13,his=(r.songs.find(x=>x.q===b.q)||{w:0}).w;
 if(mine>=his){S_flags().savas=1;addF(Math.round(S.fol*.04+500),'x');r.mom-=.6;log(`⚔️ Liste savaşını kazandın! "${s.t}" haftada ${num(mine)} dinlenmeyle ${r.name}'ı geçti.`,'gold')}else{add('happy',-5);r.mom+=.4;log(`⚔️ Liste savaşını ${r.name} kazandı (${num(his)} – ${num(mine)}).`,'bad');sBad()}}

/* ---------- Dünya kariyeri ---------- */
const MARKETS=[['az','Azerbaycan','🇦🇿',15,.4],['de','Almanya','🇩🇪',30,1.2],['nl','Hollanda','🇳🇱',30,.8],['gulf','Körfez','🇦🇪',40,1.5],['uk','İngiltere','🇬🇧',55,1.6],['us','ABD','🇺🇸',65,2.6],['jp','Japonya','🇯🇵',60,1.8]];
const ENW=[['Midnight','Golden','Broken','Wild','Electric','Neon','Lonely','Velvet'],['Dreams','Heart','City','Fire','Highway','Love','Lights','Story']];
ACT.promoTrip=id=>{const m=MARKETS.find(x=>x[0]===id);if(S.fame<m[3]&&!S.star){toast(`Şöhret ${m[3]} gerekli.`);return}const c=Math.round(300000*m[4]*(1+S.fame/40));if(!canPay(c)){toast('Gezi masrafı '+fmtS(c));return}if(!useM(1))return;S.money-=c;S.intl[id]=clamp((S.intl[id]||0)+R(5,12)*(1+S.fame/120));log(`${m[2]} ${m[1]}'da tanıtım gezisi: radyo, TV ve basın röportajları. Popülerlik %${Math.round(S.intl[id])}.`,'good');drawSheet()};
ACT.intlTour=id=>{const m=MARKETS.find(x=>x[0]===id),p=S.intl[id]||0;if(p<20&&!S.star){toast('Bu pazarda en az %20 popülerlik gerekli.');return}if(!useM(3))return;
 const shows=R(5,10),gross=Math.round(shows*(1500+p*120)*(2500*m[4])*(1+S.fame/100)*RF(.8,1.2)),cost=Math.round(gross*.35),b=income(gross-cost,'gig');S.intl[id]=clamp(p+R(4,9));addF(Math.round(R(5e3,4e4)*m[4]*p/40),'ig');add('health',-3);
 log(`${m[2]} ${m[1]} turnesi: ${shows} konser, hasılat ${fmtS(gross)}, masraf ${fmtS(cost)}. Net ${fmtS(b.net)}.`,'gold');sCrowd();drawSheet()};
ACT.writeEN=()=>{if(S.months<1){toast('Hakkın kalmadı.');return}ACT.write();const s=S.songs[0];if(s&&s.st==='demo'){s.t=pick(ENW[0])+' '+pick(ENW[1]);s.en=1;log(`İngilizce şarkı yazdın: "${s.t}".`,'good')}SUB={t:'world',title:'Dünya kariyeri'};drawSheet()};
ACT.intlFeat=()=>{const c=Math.round(2e6*(1+S.fame/50));if(!canPay(c)){toast('Ücret '+fmtS(c));return}if(!useM(1))return;S.money-=c;const a=pick(['Lil Nova (ABD)','Kenji Mori (Japonya)','Mila K (Almanya)','Zayn Al-Amir (BAE)','Rosa Vee (İngiltere)']);S.feat=a;S.featBoost=2.2;MARKETS.forEach(m=>S.intl[m[0]]=clamp((S.intl[m[0]]||0)+3));log(`${a} ile feat anlaşması yaptın (${fmtS(c)}). Sıradaki şarkın uluslararası!`,'gold');drawSheet()};
function intlQuarter(){S.intl=S.intl||{};released().forEach(s=>{if((s.en||s.gpeak)&&s.lq){MARKETS.forEach(m=>S.intl[m[0]]=clamp((S.intl[m[0]]||0)+Math.log10(1+s.lq/1e6)*(s.en?1.2:.6)))}});Object.keys(S.intl).forEach(k=>S.intl[k]=Math.max(0,S.intl[k]*.97))}
const _dr2=doRelease;doRelease=function(s,alb,pb){_dr2(s,alb,pb);if(s.en){const avg=MARKETS.reduce((a,m)=>a+(S.intl[m[0]]||0),0)/MARKETS.length;s.pot*=1+avg/60}};
function shWorld(){S.intl=S.intl||{};let h=note('Yurt dışı pazarlarda tanıtım gezisi yap, popülerliğin %20\'yi geçince turneye çık. İngilizce şarkılar ve yabancı feat\'ler bütün pazarlarda popülerliğini artırır.')+`<div class="tbar"><span>Kalan hakkın</span><b>${S.months} / ${HAK}</b></div>`;
 h+=row('ACT.writeEN()','🇬🇧','İngilizce şarkı yaz','Global listelere girme şansı yüksek','1 hak')+row('ACT.intlFeat()','🤝','Yabancı sanatçıyla feat',`Sıradaki şarkın uluslararası · ${fmtS(2e6*(1+S.fame/50))}`,'1 hak');
 MARKETS.forEach(([id,n,fl,fm,sz])=>{const p=S.intl[id]||0,lock=S.fame<fm&&!S.star;h+=`<div class="card"><div class="ch"><b>${fl} ${n}</b><span class="pill">${lock?'🔒 şöhret '+fm:'%'+Math.round(p)+' popüler'}</span></div><div class="bar"><i style="width:${p}%;background:var(--acc)"></i></div><div class="two" style="margin-top:8px"><button class="mini sec" onclick="ACT.promoTrip('${id}')" ${lock?'disabled':''}>Tanıtım gezisi · 1 hak</button><button class="mini" onclick="ACT.intlTour('${id}')" ${lock||p<20&&!S.star?'disabled':''}>Turne · 3 hak</button></div></div>`});return h}

/* ---------- Albüm döngüsü ---------- */
ACT.albStep=k=>{const ad=S.ad;if(!ad)return;if(ad[k]){toast('Bu adım yapıldı.');return}
 if(k==='tz'){const c=Math.round(100000+S.fol*.2);if(!canPay(c)){toast('Paran yetmiyor.');return}if(!useM(1))return;S.money-=c;ad.tz=1;addF(Math.round(S.fol*.01),'ig');log(`"${ad.n}" albümü için teaser paylaştın. Hayranlar heyecanlı!`,'good')}
 if(k==='party'){const c=Math.round(1e6*(1+S.fame/50));if(!canPay(c)){toast('Paran yetmiyor.');return}if(!useM(1))return;S.money-=c;ad.party=1;addF(Math.round(S.fol*.015),'ig');log(`"${ad.n}" için lansman partisi verdin. Ünlüler, basın, kırmızı halı.`,'gold')}
 drawSheet()};
ACT.preSingle=id=>{if(!S.ad)return;S.ad.pre=1;ACT.release(id);SUB={t:'album',title:'Albüm hazırla'};drawSheet()};
const _alb=ACT.album;ACT.album=()=>{const ad=S.ad;if(!ad)return;const hy=1+(ad.tz?.12:0)+(ad.party?.15:0)+(ad.pre?.1:0),n=(ad.n||'').trim();_alb();const a=S.albums.find(x=>x.n===n);if(a&&hy>1){S.songs.filter(s=>s.alb===n).forEach(s=>s.pot*=hy);log(`Albüm kampanyası işe yaradı: ilgi ×${hy.toFixed(2).replace('.',',')}.`,'good')}};
const _shAl=shAlbum;shAlbum=function(){let h=_shAl();if(!S.ad)return h;const ad=S.ad,rec=S.songs.filter(x=>x.st==='kayit');
 const camp=sec('Albüm kampanyası')+note('Albüm öncesi adımlar albümdeki bütün şarkıların ilgisini artırır.')+row("ACT.albStep('tz')",'🎞','Teaser paylaş','İlgi +%12',ad.tz?'✓':fmtS(100000+S.fol*.2)+' · 1 hak',!!ad.tz)+row("ACT.albStep('party')",'🥂','Lansman partisi','İlgi +%15 · takipçi ↑',ad.party?'✓':fmtS(1e6*(1+S.fame/50))+' · 1 hak',!!ad.party)+
  (ad.pre?row('','🎵','Ön single','Bir şarkıyı albümden önce yayınladın · ilgi +%10','✓',true):(rec.length>5?note('Ön single: kayıtlı bir şarkını albümden önce yayınla (ilgi +%10).')+rec.slice(0,4).map(s=>row(`ACT.preSingle(${s.id})`,'🎵',esc(s.t),'Ön single olarak yayınla','›')).join(''):''));
 return h.replace(sec('Parça listesi'),camp+sec('Parça listesi'))};
ACT.albTour=n=>{const a=S.albums.find(x=>x.n===n);if(a.tour){toast('Bu albümün turnesi yapıldı.');return}if(!useM(3))return;const st=S.songs.filter(s=>s.alb===n).reduce((q,s)=>q+s.total,0);const gross=Math.round((st*.02+S.fol*3)*(1+S.fame/60)*RF(.8,1.2)+2e6),cost=Math.round(gross*.3),b=income(gross-cost,'gig');a.tour=1;addF(Math.round(S.fol*.03),'ig');add('health',-3);log(`"${n}" albüm turnesi: 15 şehir, hasılat ${fmtS(gross)}. Net ${fmtS(b.net)}.`,'gold');sCrowd();drawSheet()};
ACT.albDeluxe=n=>{const a=S.albums.find(x=>x.n===n);if(a.deluxe){toast('Deluxe baskı zaten çıktı.');return}if(S.age-a.age<1&&!S.star){toast('Deluxe baskı için albümün en az 1 yıllık olmalı.');return}const c=Math.round(1.5e6*(1+S.fame/60));if(!canPay(c)){toast('Maliyet '+fmtS(c));return}if(!useM(1))return;S.money-=c;a.deluxe=1;
 S.songs.filter(s=>s.alb===n).forEach(s=>s.pot*=1.25);log(`"${n} (Deluxe)" dijital platformlarda çıktı: bonus parçalar, yeni kapak. Albümdeki şarkılar yeniden listelere tırmanıyor.`,'gold');drawSheet()};
function shAlbs(){if(!S.albums.length)return note('Henüz albümün yok.');let h='';S.albums.forEach(a=>{const ss=S.songs.filter(s=>s.alb===a.n),st=ss.reduce((q,s)=>q+s.total,0);
 h+=`<div class="card"><div class="songhead"><div class="cov" style="width:120px!important;height:100px">${vinylSVG({meta:{cover:a.cover||{p:0,m:'plak'}},t:a.n,id:a.age},true)}</div><div class="shx"><b style="font-size:17px">${esc(a.n)}${a.deluxe?' (Deluxe)':''}</b>${certBadge(a.cert??-1)}<p class="note">${a.age} yaşında · ${ss.length} şarkı · ${num(st)} dinlenme</p></div></div><div class="two"><button class="mini" onclick="ACT.albTour('${esc(a.n)}')" ${a.tour?'disabled':''}>${a.tour?'Turne yapıldı':'Albüm turnesi · 3 hak'}</button><button class="mini sec" onclick="ACT.albDeluxe('${esc(a.n)}')" ${a.deluxe?'disabled':''}>${a.deluxe?'Deluxe çıktı':'Deluxe baskı'}</button></div></div>`});return h}

/* ---------- Bağımlılık ve sağlık riskleri ---------- */
const _party=ACT.party;ACT.party=()=>{const before=S.log.reduce((a,b)=>a+b.it.length,0);_party();if(S.log.reduce((a,b)=>a+b.it.length,0)>before){S.addict=clamp((S.addict||0)+R(2,6)+(S.friends.some(f=>f.trait==='partici')?2:0))}};
ACT.rehab=()=>{const c=Math.round(2e6*(1+S.fame/60));if(!canPay(c)){toast('Rehabilitasyon '+fmtS(c));return}if(S.months<4){toast('Rehabilitasyon için 4 hak gerekir.');return}S.months-=4;S.money-=c;const was=S.addict||0;S.addict=0;add('health',25);add('happy',10);S_flags().rehab=1;
 if(was>40){S.comeback=S.qt;log(`Rehabilitasyon merkezinde 3 ay geçirdin ve temiz çıktın. Herkes dönüşünü bekliyor!`,'gold')}else log('Kısa bir arınma programını tamamladın.','good');drawSheet()};
function addictQuarter(){const a=S.addict||0;if(a>0)S.addict=Math.max(0,a-1);if(a>30){add('health',-Math.round(a/12));add('happy',1)}if(S.comeback&&S.qt-S.comeback===2){addF(Math.round(S.fol*.06),'ig');log('Dönüş hikâyen herkesi etkiledi, takipçilerin arttı.','good');S.comeback=null}}
EVENTS.push({id:'bagimlilik',min:16,c:()=>(S.addict||0)>35,title:'Endişeli bakışlar',text:()=>`${S.partner?S.partner.name.split(' ')[0]:S.fam[0].name.split(' ')[0]} son zamanlardaki gece hayatın yüzünden çok endişeli. "Kendini kaybediyorsun" diyor.`,ch:[
  {t:'Rehabilitasyona git',fn:()=>{S.months=Math.max(4,S.months);ACT.rehab();closeSheet()}},{t:'Her şey kontrolümde',fn:()=>{S.addict=clamp(S.addict+5);add('happy',-4);if(S.partner)S.partner.yak=clamp(S.partner.yak-10)}}]},
 {id:'kriz',min:16,c:()=>(S.addict||0)>65,title:'Hastanedesin',text:()=>'Bir partiden sonra fenalaştın, ambulansla hastaneye kaldırıldın. Haber magazinde.',ch:[
  {t:'Tedavini ol ve rehabilitasyona gir',fn:()=>{add('health',-15);S.fol=Math.round(S.fol*.96);S.months=Math.max(4,S.months);ACT.rehab();closeSheet()}},{t:'Taburcu ol, devam et',fn:()=>{add('health',-30);S.fol=Math.round(S.fol*.92);S.addict=clamp(S.addict+5);log('Doktorların uyarılarına rağmen eski hayatına döndün.','bad')}}]},
 {id:'depresyon',min:18,c:()=>S.happy<30,title:'Karanlık günler',text:()=>'Şöhretin baskısı ağır geliyor. Günlerdir evden çıkmıyorsun.',ch:[{t:'Terapiye başla (₺50 B)',fn:()=>{S.money-=50000;add('happy',20);log('Terapistinle konuşmak sana çok iyi geldi.','good')}},{t:'Ailene git',fn:()=>{add('happy',12);S.fam.forEach(p=>p.yak=clamp(p.yak+5));log('Ailenin yanında birkaç hafta geçirdin, toparlandın.','good')}}]});
EVSTAR.kriz=['Mucizevi iyileşme',()=>{S.addict=0;add('health',30);log('Kısa sürede iyileştin, kimse fark etmedi bile.','good')}];EVSTAR.bagimlilik=['Bırak ve güçlü dön',()=>{S.addict=0;add('happy',10);S_flags().rehab=1;log('Kendi iradenle bıraktın.','gold')}];

/* ---------- Menülere bağlama ---------- */
const _shK2=shKariyer;shKariyer=function(){const T=SUB&&SUB.t;if(T==='world')return shWorld();if(T==='albs')return shAlbs();let h=_shK2();if(SUB||S.age<14||!S.genre)return h;
 const add=row("sheet('kariyer',{t:'world',title:'Dünya kariyeri'})",'🌍','Dünya kariyeri',`${Object.values(S.intl||{}).filter(v=>v>=20).length} pazarda turneye hazırsın`,'›')+(S.albums.length?row("sheet('kariyer',{t:'albs',title:'Albümlerin'})",'💿','Albümlerin',`${S.albums.length} albüm · turne ve deluxe baskı`,'›'):'');
 return h.replace(sec('Sahne'),add+sec('Sahne'))};
const _shPn=shPanel;shPanel=function(){if(SUB&&SUB.t==='ach')return shAch();if(SUB&&SUB.t==='riv')return shRiv();let h=_shPn();if(SUB||(S.lab&&(S.ptab||'ben')!=='ben'))return h;
 const add=row("sheet('panel',{t:'ach',title:'Başarımlar'})",'🏅','Başarımlar',`${Object.keys(S.ach||{}).length} / ${ACH.length} açıldı`,'›')+row("sheet('panel',{t:'riv',title:'Rakipler'})",'⚔️','Rakip sanatçılar','Kim yükseliyor, kim düşüyor · feat ve diss','›');
 const i=h.indexOf('<div class="hero2">');return i>=0?h.slice(0,i)+add+h.slice(i):add+h};
const _shH3=shHayat;shHayat=function(){let h=_shH3();if(SUB||(S.htab||'iliski')!=='aktivite')return h;return h+((S.addict||0)>15?row('ACT.rehab()','🌱','Rehabilitasyon',`Bağımlılık %${Math.round(S.addict)} · 4 hak · ${fmtS(2e6*(1+S.fame/60))}`,'›'):'')};
const _sa4=shAyar;shAyar=function(){return _sa4().replace(sec('Görünüm'),sec('Görünüm')+row("SND=!SND;try{localStorage.setItem('sahne2-ses',SND?'1':'0')}catch(e){};drawSheet()",'🔊','Ses efektleri',SND?'Açık':'Kapalı',SND?'Kapat':'Aç')+row("S.mgOff=!S.mgOff;save();drawSheet()",'🥁','Konser mini oyunu',S.mgOff?'Kapalı · konserler otomatik':'Açık · konserlerde ritim oyunu',S.mgOff?'Aç':'Kapat'))};
const _rn2=render;render=function(){_rn2();achCheck();const c=document.querySelector('#stats .chips');if(c&&(S.addict||0)>30&&!c.querySelector('.addc'))c.insertAdjacentHTML('beforeend',`<span class="chip addc" style="border-color:var(--bad);color:var(--bad)">⚠️ Bağımlılık %${Math.round(S.addict)}</span>`)};
const _aq3=ageUpQ;ageUpQ=function(){if(S&&S.alive){rivQuarter();intlQuarter();addictQuarter()}_aq3();if(S&&S.alive)battleResolve()};
const _inh=inherit;inherit=function(id){_inh(id);S_flags().miras=1;S.ach=S.ach||{};save();render()};
const _ei2=extInit;extInit=function(){_ei2();rivInit();peopleInit();S.intl=S.intl||{};S.ach=S.ach||{}};
