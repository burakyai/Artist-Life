/* ============ Arayüz ============ */
const IC={
 kariyer:'<svg viewBox="0 0 24 24"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>',
 panel:'<svg viewBox="0 0 24 24"><path d="M4 20V11M10 20V5M16 20v-6M22 20H2"/></svg>',
 gard:'<svg viewBox="0 0 24 24"><path d="M8 3l-5 4 3 4 2-1v11h8V10l2 1 3-4-5-4c-1 2-2.5 3-4 3S9 5 8 3z"/></svg>',
 hayat:'<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg>'};
const row=(on,ic,t,s,rt,dis)=>`<button class="row" ${dis?'disabled':''} onclick="${on}"><span class="ic">${ic}</span><span class="tx"><b>${t}</b>${s?`<span>${s}</span>`:''}</span>${rt!=null?`<span class="rt">${rt}</span>`:''}</button>`;
const sec=t=>`<div class="sec">${t}</div>`;
const note=t=>`<p class="note">${t}</p>`;

function boot(){if(!S){S=load();if(S&&!S.alive)S=null}
 if(S){S.songs.forEach(x=>{x.meta=x.meta||defMeta(x.g);x.mon=x.mon||MON0();x.hy=x.hy||[]});extInit()}
 if(!S){drawCreate();return}
 $('create').classList.remove('on');$('game').classList.add('on');render();
 if(S.evq&&S.evq.length)showEvent();}

/* ---------- Karakter oluşturma ---------- */
function drawCreate(){$('game').classList.remove('on');$('create').classList.add('on');
 if(!CR){const g='e';CR={g,first:pick(g==='e'?NM_E:NM_K),last:pick(SURN),skin:R(0,4),hair:g==='e'?pick(['twist','curtain','wolf','skinfade','mullet']):pick(['bob','kakul','uzundalga','boxbraid']),hairColor:pick(['siyah','kahve','kumral']),beard:'yok',tab:'hair'}}
 const L={skin:CR.skin,hair:CR.hair,hairColor:CR.hairColor,beard:CR.g==='e'?CR.beard:'yok',outfit:'tisort',oc:{tisort:'#2b2b33'},acc:[],g:CR.g};
 const tabs=[['skin','Ten'],['hair','Saç'],['hairColor','Saç rengi']].concat(CR.g==='e'?[['beard','Sakal']]:[]);
 let opts='';
 if(CR.tab==='g')opts=`<div class="grid">${[['e','Erkek'],['k','Kadın']].map(([k,n])=>{const l={...L,g:k,hair:k==='e'?'curtain':'kakul',beard:'yok'};return `<button class="it ${CR.g===k?'on':''}" onclick="crSet('g','${k}')"><div class="av">${AV(l,24)}</div><b>${n}</b></button>`}).join('')}</div>`;
 if(CR.tab==='skin')opts=`<div class="grid">${SKINS.map((c,i)=>`<button class="it ${CR.skin===i?'on':''}" onclick="crSet('skin',${i})"><div class="av">${AV({...L,skin:i},24)}</div><b>Ton ${i+1}</b></button>`).join('')}</div>`;
 if(CR.tab==='hair')opts=`<div class="grid">${(CR.g==='e'?HAIR_E:HAIR_K).map(([k,n])=>`<button class="it ${CR.hair===k?'on':''}" onclick="crSet('hair','${k}')"><div class="av">${AV({...L,hair:k},24)}</div><b>${n}</b></button>`).join('')}</div>`;
 if(CR.tab==='hairColor')opts=`<div class="grid">${['siyah','kahve','kumral','sari','kizil'].map(k=>`<button class="it ${CR.hairColor===k?'on':''}" onclick="crSet('hairColor','${k}')"><div class="av">${AV({...L,hairColor:k},24)}</div><b>${HCOL_N[k]}</b></button>`).join('')}</div>`;
 if(CR.tab==='beard')opts=`<div class="grid">${BEARDS.map(([k,n])=>`<button class="it ${CR.beard===k?'on':''}" onclick="crSet('beard','${k}')"><div class="av">${AV({...L,beard:k},28)}</div><b>${n}</b></button>`).join('')}</div>`;
 $('create').innerHTML=`<div class="cwrap"><h1 class="logo">ARTIST <span>LIFE</span></h1><p class="tag">Mahalleden stadyuma bir ömür</p>
 <div class="av hero">${AV(L,24)}</div>
 <div class="names"><input id="cf" value="${esc(CR.first)}" maxlength="14" oninput="CR.first=this.value" aria-label="Ad"><input id="cl" value="${esc(CR.last)}" maxlength="14" oninput="CR.last=this.value" aria-label="Soyad"><button class="dice" onclick="crDice()" aria-label="Rastgele">🎲</button></div>
 <div class="tabs">${tabs.map(([k,n])=>`<button class="tab ${CR.tab===k?'on':''}" onclick="CR.tab='${k}';drawCreate()">${n}</button>`).join('')}</div>${opts}
 <button class="start" onclick="crStart()">HAYATA BAŞLA</button></div>`}
function crSet(k,v){CR[k]=v;if(k==='g'){CR.hair=v==='e'?'curtain':'kakul';CR.beard='yok';CR.first=pick(v==='e'?NM_E:NM_K)}drawCreate()}
function crDice(){CR.first=pick(CR.g==='e'?NM_E:NM_K);CR.last=pick(SURN);CR.skin=R(0,4);CR.hairColor=pick(['siyah','kahve','kumral','sari','kizil']);CR.hair=pick(CR.g==='e'?HAIR_E:HAIR_K)[0];drawCreate()}
function crStart(){CR.first=(CR.first||'').trim()||'Arda';CR.last=(CR.last||'').trim()||'Yılmaz';const c=CR;CR=null;newLife(c)}

/* ---------- Ana ekran ---------- */
function render(){if(!S)return;
 $('hav').innerHTML=AV(S.look,S.age,{mood:S.happy});
 $('hname').textContent=S.first+' '+S.last;
 $('hsub').innerHTML=`${S.age} yaş · ${SEASON[S.q||0]} · <b>${title()}</b>`;
 $('hcash').textContent=fmtS(S.money);$('hcash').className=S.money<0?'neg':'';
 $('log').innerHTML=S.log.map(b=>{const it=S.quiet?b.it.filter(i=>i.k!=='dim'):b.it;return it.length?`<div class="yr"><h3>Yaş ${b.age}${b.q!=null?' · '+SEASON[b.q]:''}</h3>${it.map(i=>`<p class="${i.k}">${esc(i.t)}</p>`).join('')}</div>`:''}).join('');
 const bar=(l,v,c)=>`<div class="st"><label>${l}<b>${Math.round(v)}%</b></label><div class="bar"><i style="width:${v}%;background:${c}"></i></div></div>`;
 $('stats').innerHTML=bar('Sağlık',S.health,S.health<30?'#ec6a5e':'#5fc48a')+bar('Mutluluk',S.happy,'#ffc24b')+bar('Yetenek',S.skill,'#a378ff')+bar('Şöhret',S.fame,'#ff5fa2')+
  `<div class="chips"><span class="chip">👥 <b>${num(S.fol)}</b></span><span class="chip">⚡ <b>${S.months}/${HAK} hak</b></span><span class="chip">✨ Stil <b>${stil()}</b></span>${S.genre?`<span class="chip" style="border-color:${GENRES[S.genre].c}">${GENRES[S.genre].n}</span>`:''}</div>`;
 const nO=S.offers.length;$('bdg').innerHTML=nO?`<i>${nO}</i>`:'';
 requestAnimationFrame(()=>{const l=$('log');l.scrollTop=l.scrollHeight});
 if(SHEET)drawSheet()}

/* ---------- Alt sayfalar ---------- */
function sheet(k,sub){if(k!==SHEET)SUB=null;if(sub!==undefined)SUB=sub;SHEET=k;calcFame();save();render();drawSheet();$('ov').classList.add('on')}
function closeSheet(){SHEET=null;SUB=null;$('ov').classList.remove('on')}
function drawSheet(){if(!SHEET){render();return}const T={kariyer:'Kariyer',panel:'Dijital Panel',gard:'Gardırop',hayat:'Hayat',ayar:'Ayarlar'};
 $('shT').textContent=SUB?(SUB.title||T[SHEET]):T[SHEET];$('shBack').style.visibility=SUB?'visible':'hidden';
 const b=$('shB'),top=b.scrollTop;b.innerHTML=({kariyer:shKariyer,panel:shPanel,gard:shGard,hayat:shHayat,ayar:shAyar})[SHEET]();if(!SUB)b.scrollTop=top;else b.scrollTop=0}
function back(){SUB=null;drawSheet()}
const tbar=()=>`<div class="tbar"><span>Bu 3 ayda kalan hakkın</span><b>${S.months} / ${HAK}</b></div>`;

function shKariyer(){let h='';
 if(SUB&&SUB.t==='song')return shSong(SUB.id);
 if(SUB&&SUB.t==='offers')return shOffers();
 if(SUB&&SUB.t==='album')return shAlbum();
 if(SUB&&SUB.t==='neg')return shNeg(SUB.id);
 if(SUB&&SUB.t==='concert')return S.cp?shConcert():(SUB=null,shKariyer());
 if(SUB&&SUB.t==='lab')return shLab();
 if(SUB&&SUB.t==='art')return shArt(SUB.id);
 if(SUB&&SUB.t==='soc')return shSoc();
 if(S.age<6)return note('Henüz çok küçüksün. Önce büyümen lazım!');
 h+=tbar();
 if(S.age<14||!S.genre){
  if(S.age>=14){h+=sec('Müzik türünü seç')+note('Bu kararla kariyerin başlar. Sonradan değiştirilemez.');Object.entries(GENRES).forEach(([k,g])=>h+=row(`ACT.genre('${k}')`,{rap:'🎤',pop:'💃',arabesk:'🥀',rock:'🤘',turku:'🪕'}[k],g.n,{rap:'Sokak, ritim, söz gücü. Diss savaşları.',pop:'Radyo hitleri, dans, magazin.',arabesk:'Dertli şarkılar, düğünlerde yüksek ücret.',rock:'Festivaller, sadık bir kitle.',turku:'Halk müziği, Fizzy ve TubeX güçlü.'}[k],'Seç ›'))}
  h+=sec('Müzik eğitimi');INSTR.forEach(([k,n,ic])=>h+=row(`ACT.lesson('${k}')`,ic,n+' dersi',S.instr.includes(k)?'Çalışmaya devam et · yetenek ↑':'Yeni enstrüman öğren','2 hak'));
  if(S.age<18)h+=row('ACT.koro()','🎶','Okul korosu','Sahne alışkanlığı kazan','1 hak');
  if(S.age>=14)h+=row('ACT.practice()','🎧','Kendi kendine prova','Yetenek ↑','1 hak');
  return h}
 const dem=S.songs.filter(s=>s.st==='demo'),rec=S.songs.filter(s=>s.st==='kayit'),rel=released();
 if(S.offers.length)h+=row("sheet('kariyer',{t:'offers',title:'Teklifler'})",'📨',`${S.offers.length} yeni teklif`,'Plak şirketi, menajer ve marka teklifleri','Gör ›');
 if(S.age>=18)h+=row("sheet('kariyer',{t:'lab',title:'Şirketim'})",'🏢',S.lab?esc(S.lab.n):'Kendi plak şirketini kur',S.lab?`${S.lab.arts.length} sanatçı · kasa ${fmtS(S.lab.cash)}`:'Sanatçılarla anlaş, bina al, şirketini büyüt (şöhret 35)','›');
 h+=sec('Stüdyo');
 h+=row('ACT.write()','✍️','Şarkı yaz',S.feat?`Sıradaki şarkın feat. ${S.feat}`:'Kalite; yeteneğin, mutluluğun ve şansına bağlı','1 hak');
 if(rec.length>=5)h+=row("sheet('kariyer',{t:'album',title:'Albüm hazırla'})",'💿','Albüm hazırla',`${rec.length} kayıtlı şarkın var · adını, kapağını ve tanıtımını belirle`,'1 hak');
 [...dem,...rec].forEach(s=>h+=row(`sheet('kariyer',{t:'song',id:${s.id},title:'${s.st==='demo'?'Stüdyo':'Yayına hazırla'}'})`,s.st==='demo'?'📝':`<span class="cvi">${coverSVG(s)}</span>`,esc(s.t)+(s.feat?` <small>feat. ${esc(s.feat)}</small>`:''),`${s.st==='demo'?'Demo':'Kayıtlı · '+esc(s.studio)} · Kalite ${s.q}/100${s.clip?' · klip hazır':''}`,s.st==='demo'?'Kaydet ›':'Düzenle ›'));
 if(rel.length){h+=sec('Yayındaki şarkılar');[...rel].sort((a,b)=>b.ra-a.ra||b.id-a.id).slice(0,8).forEach(x=>h+=songRow(x))}
 if(rel.length)h+=row("sheet('panel')",'📈',`${rel.length} şarkı yayında`,`En iyi TR sırası ${S.best.tr?'#'+S.best.tr:'—'} · ${S.albums.length} albüm`,'Panel ›');
 h+=sec('Sahne');
 VENUES.forEach(v=>{const lock=S.age<v.age||S.fame<v.fame;const m=(1+S.fame/70)*(1+stil()/80)*(S.manager?1.35:1)*((v.gb&&v.gb[S.genre])||1);
  const rp=1/(1+((S.gigN||{})[v.id]||0)*.6);h+=row(`ACT.gig('${v.id}')`,v.ic,v.n,lock?(S.age<v.age?`${v.age} yaş gerekli`:`Şöhret ${v.fame} gerekli`):`${v.loc} · ${fmtS(v.pay[0]*m*rp)} – ${fmtS(v.pay[1]*m*rp)}${rp<1?' · bu yıl doydu':''}`,lock?'🔒':(VEN2[v.id]?'Hazırla ›':v.m+' hak'),lock)});
 h+=sec('Gelişim');
 h+=row('ACT.practice()','🎧','Prova','Yetenek ↑','1 hak')+row('ACT.coach()','🎙','Vokal koçu','₺40 B · yetenek ↑↑','1 hak');
 if(S.age>=17&&S.age<=26&&!S.grad)h+=row('ACT.kons()','🏛',S.kons?`Konservatuvar (${4-S.kons+1}. yıl)`:'Konservatuvar sınavı',S.kons?'Her yıl 4 ay ders · yetenek ↑↑↑':'Kazanırsan 4 yıl eğitim',S.kons?'Öğrenci':'1 hak',!!S.kons);
 h+=sec('Sosyal medya')+row("sheet('kariyer',{t:'soc',title:'Sosyal medya'})",'📱','Hesapların',`Instagram ${num(fol('ig'))} · TikTok ${num(fol('tt'))} · TubeX ${num(fol('yt'))} · X ${num(fol('x'))}`,'›');
 h+=sec('Anlaşmalar');
 if(S.contract)h+=contractCard();
 else h+=note('Bağımsız sanatçısın: dağıtımcı dijital gelirinin %15\'ini alır. Şöhretin 15\'i geçip şarkı yayınladığında plak şirketleri kapını çalar.');
 h+=S.manager?row('ACT.fire()','🕴',S.manager.n,`Menajerin · komisyon %${Math.round(S.manager.cut*100)} · sahne ücretleri +%35`,'Ayrıl'):'';
 return h}
function shOffers(){let h='';if(!S.offers.length)return note('Bekleyen teklif yok.');
 S.offers.forEach(o=>{h+=`<div class="card">`;
  if(o.k==='label')h+=labelOfferCard(o);
  if(o.k==='mgr')h+=`<div class="ch"><b>🕴 ${o.n}</b><span class="pill">Menajer</span></div>${note(`Komisyon %${Math.round(o.cut*100)} · Sahne ücretlerin %35 artar, daha çok marka teklifi gelir.`)}`;
  if(o.k==='brand')h+=`<div class="ch"><b>🏷 ${o.n}</b><span class="pill gold">${fmtS(o.pay)}</span></div>${note(o.w+(o.m?' · 1 ay':' · zaman almaz'))}`;
  h+=`<div class="two"><button class="mini" onclick="${o.k==='label'?`sheet('kariyer',{t:'neg',id:${o.id},title:'Pazarlık'})`:`ACT.accept(${o.id})`}">${o.k==='label'?'Pazarlık / İmzala':'Kabul et'}</button><button class="mini sec" onclick="ACT.reject(${o.id})">Reddet</button></div></div>`});return h}
function shPanelMe(){const L=S.lastY;let h='';if(SUB&&SUB.t==='plat')return shPlat(SUB.id);
 if(!S.genre||!S.tot.streams&&!S.tot.gig)return note('Henüz gelirin yok. Kariyer menüsünden şarkı yazıp yayınla; yıl sonunda dijital gelirin burada görünür.');
 const ml=S.hist.length?(S.hist[S.hist.length-1].spo||0)/12/2.6:0;
 h+=`<div class="hero2"><small>Son 3 ayın net dijital telifi</small><div class="big">${fmtS(L?L.net:0)}</div><span>${num(L?L.streams:0)} dinlenme · Spotiplay aylık dinleyici <b>${num(ml)}</b></span></div>`;
 h+=payoutBox('all');h+=sec('Platformlar')+`<div class="pgrid">${PLAT.map(p=>{const v=L?L.pl[p.id]:{st:0,tl:0};return `<button class="plat" onclick="sheet('panel',{t:'plat',id:'${p.id}',title:'${p.n}'})" style="background:linear-gradient(140deg,${p.c},${shade(p.c,-70)})"><b>${p.n}</b><div class="pv">${fmtS(v.tl)}</div><span>${num(v.st)} ${p.u}</span><span>Toplam ${num(S.tot[p.id])} · ₺${p.rate.toFixed(3).replace('.',',')}</span><span class="go">Haftalık liste ›</span></button>`}).join('')}</div>`;
 if(L){h+=sec('Telif dökümü')+`<table class="tbl"><tr><td>Brüt platform geliri</td><td>${fmtS(L.gross)}</td></tr>`+(L.dist?`<tr><td>Dağıtımcı payı (%15)</td><td class="neg">−${fmtS(L.dist)}</td></tr>`:'')+(L.lab?`<tr><td>Plak şirketi payı</td><td class="neg">−${fmtS(L.lab)}</td></tr>`:'')+(L.rec?`<tr><td>Avans mahsubu</td><td class="neg">−${fmtS(L.rec)}</td></tr>`:'')+(L.mgr?`<tr><td>Menajer komisyonu</td><td class="neg">−${fmtS(L.mgr)}</td></tr>`:'')+`<tr><td>Vergi (%20)</td><td class="neg">−${fmtS(L.tax)}</td></tr><tr class="tot"><td>Net telif</td><td>${fmtS(L.net)}</td></tr></table>`;
  if(L.exp)h+=`<table class="tbl" style="margin-top:6px"><tr><td>Yaşam gideri</td><td class="neg">−${fmtS(L.exp.yasam)}</td></tr><tr><td>Kira / aidat</td><td class="neg">−${fmtS(L.exp.ev)}</td></tr><tr><td>Araç bakım ve sigorta</td><td class="neg">−${fmtS(L.exp.araba)}</td></tr></table>`}
 const H=S.hist.slice(-12);if(H.length){const mx=Math.max(1,...H.map(x=>x.stream+x.gig+x.brand+x.alb));h+=sec('Yıllık net gelir')+`<div class="leg"><i style="background:#a378ff"></i>Dijital <i style="background:#ff5fa2"></i>Sahne <i style="background:#ffc24b"></i>Reklam <i style="background:#3fbf8a"></i>Albüm</div><svg viewBox="0 0 300 130" class="chart">`;const bw=300/12;
  H.forEach((x,i)=>{const X=i*bw+4,w=bw-8;let y=116;[[x.stream,'#a378ff'],[x.gig,'#ff5fa2'],[x.brand,'#ffc24b'],[x.alb,'#3fbf8a']].forEach(([v,c])=>{const hh=Math.max(0,v)/mx*104;y-=hh;h+=`<rect x="${X}" y="${y}" width="${w}" height="${hh}" fill="${c}" rx="1.5"/>`});h+=`<text x="${X+w/2}" y="127" font-size="8" text-anchor="middle" fill="#9a90b0">${x.age}</text>`});h+='</svg>'}
 const top=[...released()].sort((a,b)=>b.ly-a.ly).slice(0,6);
 if(top.length){h+=sec('Son 12 ayda en çok dinlenenler');top.forEach(x=>h+=songRow(x))}
 if(S.albums.length){h+=sec('Albümler');S.albums.forEach(al=>{const ss=S.songs.filter(x=>x.alb===al.n);h+=row('',`<span class="cvi">${coverSVG({meta:{cover:al.cover||{p:0,m:'plak'}},id:al.age},false)}</span>`,esc(al.n),`${al.age} yaşında · ${ss.length} şarkı · ${num(ss.reduce((q,x)=>q+x.total,0))} dinlenme`,fmtS(ss.reduce((q,x)=>q+x.mon.net,0)+(al.net||0)))})}
 if(released().length>6){h+=sec('Tüm diskografi');[...released()].sort((a,b)=>b.total-a.total).slice(0,40).forEach(x=>h+=songRow(x))}
 if(S.tot.spo){h+=sec('Dinleyici şehirleri');[['İstanbul',.34],['Ankara',.12],['İzmir',.09],['Bursa',.05],['Berlin',.04],['Antalya',.04],['Amsterdam',.02]].forEach(([c,r])=>h+=`<div class="city"><span>${c}</span><b>${num(ml*r)}</b></div>`)}
 h+=sec('Kariyer toplamı')+`<div class="kv"><div>Dijital telif<b>${fmtS(S.tot.stream)}</b></div><div>Sahne<b>${fmtS(S.tot.gig)}</b></div><div>Reklam<b>${fmtS(S.tot.brand)}</b></div><div>Albüm satışı<b>${fmtS(S.tot.alb)}</b></div><div>Toplam dinlenme<b>${num(S.tot.streams)}</b></div><div>Toplam net<b>${fmtS(S.tot.all)}</b></div></div>`;
 h+=certUI()+awardsUI();
 return h}

function shGard(){const L=S.look,t=SUB&&SUB.tab||'out';const ad=Math.max(S.age,16);
 const tabs=[['out','Kıyafet'],['oc','Renk'],['acc','Aksesuar'],['hair','Saç'],['hairColor','Saç rengi']].concat(S.g==='e'?[['beard','Sakal']]:[]);
 let h=`<div class="wprev"><div class="av" style="width:96px;height:96px">${AV(L,S.age)}</div><div>${note(`Stil puanın <b class="gold">${stil()}</b>`)}${note('Stil; paylaşımlardan gelen takipçiyi, sahne ücretlerini ve marka tekliflerini artırır.')}</div></div>`;
 h+=`<div class="tabs">${tabs.map(([k,n])=>`<button class="tab ${t===k?'on':''}" onclick="SUB={tab:'${k}'};drawSheet()">${n}</button>`).join('')}</div><div class="grid">`;
 if(t==='out')OUT.forEach(o=>{const own=S.owned.includes(o.id);h+=`<button class="it ${L.outfit===o.id?'on':''}" onclick="ACT.wear('out','${o.id}')"><div class="av">${AV({...L,outfit:o.id},ad)}</div><b>${o.n}</b><span>${own?(L.outfit===o.id?'Üzerinde':'Sende'):fmtS(o.p)} · ✨${o.st}</span></button>`});
 if(t==='oc'){const pal=OCOLM[L.outfit]||[];pal.forEach(([n,c])=>{const cur=(L.oc||{})[L.outfit]||ODEFM[L.outfit];h+=`<button class="it ${cur===c?'on':''}" onclick="ACT.wear('oc','${c}')"><div class="av">${AV({...L,oc:{...(L.oc||{}),[L.outfit]:c}},ad)}</div><b>${n}</b><span>Terzi ücretsiz</span></button>`})}
 if(t==='acc'){const ag=SUB.ag||'kolye';h+=`</div><div class="tabs">${AGRP.map(([k,n])=>`<button class="tab sm ${ag===k?'on':''}" onclick="SUB={tab:'acc',ag:'${k}'};drawSheet()">${n}</button>`).join('')}</div>${ag==='kolye'?note('Aynı anda en fazla iki kolye takabilirsin.'):''}<div class="grid">`;ACCS.filter(a=>a.grp===ag).forEach(a=>{const on=L.acc.includes(a.id),own=S.accOwned.includes(a.id);h+=`<button class="it ${on?'on':''}" onclick="ACT.wear('acc','${a.id}')"><div class="av">${AV({...L,acc:on?L.acc:[...L.acc,a.id]},ad)}</div><b>${a.n}</b><span>${on?'Takılı':own?'Sende':fmtS(a.p)} · ✨${a.st}</span></button>`})}
 if(t==='hair')(S.g==='e'?HAIR_E:HAIR_K).forEach(([k,n])=>h+=`<button class="it ${L.hair===k?'on':''}" onclick="ACT.wear('hair','${k}')"><div class="av">${AV({...L,hair:k},ad)}</div><b>${n}</b><span>${L.hair===k?'Mevcut':'Berber ₺800'}</span></button>`);
 if(t==='hairColor')Object.keys(HCOL).filter(k=>k!=='gri').forEach(k=>h+=`<button class="it ${L.hairColor===k?'on':''}" onclick="ACT.wear('hairColor','${k}')"><div class="av">${AV({...L,hairColor:k},ad)}</div><b>${HCOL_N[k]}</b><span>${L.hairColor===k?'Mevcut':'Boya ₺1.200'}</span></button>`);
 if(t==='beard')BEARDS.forEach(([k,n])=>h+=`<button class="it ${L.beard===k?'on':''}" onclick="ACT.wear('beard','${k}')"><div class="av">${AV({...L,beard:k},ad)}</div><b>${n}</b><span>Ücretsiz</span></button>`);
 return h+'</div>'}

function shHayat(){let h='';const T=SUB&&SUB.t;if(T==='friend')return shFriend(SUB.id);if(T==='places')return shPlaces();if(T==='bank')return shBank();if(T==='borsa')return shBorsa();if(T==='shop')return shShop();if(T==='hfeat')return shHouse(SUB.id);if(T==='self')return shSelf();
 if(SUB&&SUB.t==='p'){const p=S.fam.find(x=>x.id===SUB.id)||S.kids.find(x=>x.id===SUB.id);h+=`<div class="card"><div class="ch"><b>${esc(p.name)}</b><span class="pill">${p.rel}</span></div>${note(`${p.age} yaş${p.job?' · '+p.job:''} · Yakınlık %${p.yak}`)}</div>`;
  if(!p.alive)return h+note('Huzur içinde yatsın.');
  h+=row(`ACT.famTime(${p.id})`,'☕','Vakit geçir','Yakınlık ↑ · mutluluk ↑',p.done?'Bu yıl yapıldı':'',!!p.done);
  if(p.job)h+=row(`ACT.famMoney(${p.id})`,'💸','Para iste','Yakınlığınıza bağlı',p.asked?'Bu yıl istendi':'',!!p.asked);
  if(S.age>=18)h+=row(`ACT.famGift(${p.id})`,'🎁','Hediye al','Servetinin %1\'i',fmtS(Math.max(2000,S.money*.01)));return h}
 if(SUB&&SUB.t==='partner'){const p=S.partner;if(!p){SUB=null;return shHayat()}h+=`<div class="card"><div class="ch"><b>${esc(p.name)}</b><span class="pill">${p.st==='eş'?'Eşin':'Sevgilin'}</span></div>${note(`${p.age} yaş · ${FTYPES[p.type||'normal'].n} · Tip: <b class="gold">${TRAITS[p.trait||'sadik'].n}</b> — ${TRAITS[p.trait||'sadik'].d}<br>Yakınlık %${p.yak}`)}</div>`;
  h+=row('ACT.pTime()','🌹','Romantik akşam','Yakınlık ↑',p.done?'Bu yıl yapıldı':'',!!p.done);
  if(p.st==='sevgili')h+=row('ACT.propose()','💍','Evlenme teklif et','Yüzük ve düğün masrafı',fmtS(Math.max(150000,S.money*.02)));
  else h+=row('ACT.baby()','👶','Çocuk sahibi olmak','Aileni büyüt','');
  h+=row('ACT.breakup()','💔',p.st==='eş'?'Boşan':'Ayrıl',p.st==='eş'?'Servetinin %30\'u gider':'','');return h+traitPick('p',0,p.trait)}
 h+=sec('Ailen');S.fam.forEach(p=>h+=row(`sheet('hayat',{t:'p',id:${p.id},title:'Ailen'})`,p.alive?(p.id===1?'👩':'👨'):'🕊',`${esc(p.name)}`,`${p.rel} · ${p.age} yaş${p.alive?' · Yakınlık %'+p.yak:' · Vefat etti'}`,'›'));
 S.kids.forEach(k=>h+=row(`sheet('hayat',{t:'p',id:${k.id},title:'Çocuğun'})`,k.g==='k'?'👧':'👦',esc(k.name),`${k.rel} · ${k.age} yaş · Yakınlık %${k.yak}`,'›'));
 if(S.age>=16){h+=sec('Aşk');h+=S.partner?row(`sheet('hayat',{t:'partner',title:'İlişki'})`,'❤️',esc(S.partner.name),`${S.partner.st==='eş'?'Eşin':'Sevgilin'} · Yakınlık %${S.partner.yak}`,'›'):row('ACT.date()','💘','Aşk ara','Şöhret ve stil şansını artırır','1 hak')}
 h+=sec('Arkadaşlar')+row("sheet('hayat',{t:'places',title:'Tanışma yerleri'})",'📍','Tanışma yerleri','Gece kulübü, stüdyo, kulis, klip seti, ödül partisi…','›');S.friends.forEach(f=>h+=row(`sheet('hayat',{t:'friend',id:${f.id},title:'Arkadaş'})`,FTYPES[f.type].ic,esc(f.name),`${FTYPES[f.type].n} · ${TRAITS[f.trait].n} · Yakınlık %${f.yak}`,'›'));
 h+=sec('Finans')+row("sheet('hayat',{t:'bank',title:'Banka'})",'🏦','Banka hesabı',`Mevduat ${fmtS(S.bank)}${S.loan?' · kredi borcu '+fmtS(S.loan):''}`,'›')+row("sheet('hayat',{t:'borsa',title:'Borsa'})",'📈','Borsa',`Portföy ${fmtS(portVal())}`,'›')+row("sheet('hayat',{t:'shop',title:'Alışveriş'})",'🛍','Alışveriş','Arabalar ve saat koleksiyonu','›');
 h+=sec('Ev');const cur=S.house?HOUSES.find(x=>x.id===S.house):null;h+=note(cur?`Şu an ${cur.loc}'deki ${cur.n.toLowerCase()}nde yaşıyorsun.`:'Ailenle birlikte yaşıyorsun.');
 HOUSES.forEach(x=>{const own=S.houses.includes(x.id),c=S.house===x.id;h+=row(own&&!c&&!x.second?`ACT.house('${x.id}')`:own?'':`ACT.house('${x.id}')`,x.ic,x.n+(c?' · evin':own&&x.second?' · senin':''),`${x.loc} · ${x.rent?'Kira '+fmtS(x.rent)+'/yıl':fmtS(x.p)+' · aidat '+fmtS(x.up)+'/yıl'} · mutluluk +${x.hap}`,own?(c||x.second?'':'Taşın'):(x.rent?'Kirala':'Satın al'))+(own&&!x.rent?`<button class="mini inl" onclick="sheet('hayat',{t:'hfeat',id:'${x.id}',title:'Evi düzenle'})">🛠 Düzenle · ${(S.hup[x.id]||[]).length}/${HFEAT.length}</button>`:'')+(own?`<button class="mini red inl" onclick="ACT.sellHouse('${x.id}')">${x.rent?'Evden çık':'Sat · '+fmtS(x.p*.9)}</button>`:'')});
 h+=sec('Aktiviteler')+row('ACT.gym()','🏋','Spor salonu','Sağlık ↑',S.gym?'Bu yıl yapıldı':'Ücretsiz',!!S.gym)+row('ACT.doctor()','🩺','Doktora git','Sağlık ↑↑',S.age<18?'Ücretsiz':'₺15 B')+row('ACT.vac()','🏖','Tatile çık','Mutluluk ↑↑ · 1 ay',fmtS(60000*(1+S.fame/20)))+row('ACT.party()','🍸','Gece hayatı','Mutluluk ↑ · sağlık ↓','');
 h+=sec('Oyun')+row('ACT.starT()','⭐','Süperstar modu',S.star?'Açık · olaylarda süperstar seçenekleri, hit garantisi, her pazarlıkta avantaj':'Kapalı · dokun ve aç',S.star?'Kapat':'Aç')+(S.star?row("sheet('hayat',{t:'self',title:'Kendini düzenle'})",'✏️','Kendini düzenle','Sağlık, mutluluk, yetenek, takipçi, para','›'):'')+row("$('confirm').classList.add('on')",'🔄','Yeni hayata başla','Bu kayıt silinir','');
 return h}
