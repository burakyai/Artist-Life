/* ============ Yardımcılar ============ */
const $=id=>document.getElementById(id);
const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const RF=(a,b)=>a+Math.random()*(b-a);
const ch=p=>Math.random()<p;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const clamp=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));
let fmt=n=>(n<0?'−':'')+'₺'+Math.round(Math.abs(n)).toLocaleString('tr-TR');
let fmtS=n=>{const a=Math.abs(n),s=n<0?'−':'';if(a>=1e9)return s+'₺'+(a/1e9).toLocaleString('tr-TR',{maximumFractionDigits:2})+' Mr';if(a>=1e6)return s+'₺'+(a/1e6).toLocaleString('tr-TR',{maximumFractionDigits:2})+' Mn';if(a>=1e4)return s+'₺'+(a/1e3).toLocaleString('tr-TR',{maximumFractionDigits:1})+' B';return fmt(n)};
const num=n=>{const a=Math.abs(n);if(a>=1e9)return (n/1e9).toLocaleString('tr-TR',{maximumFractionDigits:2})+' Mr';if(a>=1e6)return (n/1e6).toLocaleString('tr-TR',{maximumFractionDigits:2})+' Mn';if(a>=1e4)return (n/1e3).toLocaleString('tr-TR',{maximumFractionDigits:1})+' B';return Math.round(n).toLocaleString('tr-TR')};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let uid=0;

/* ============ Veri ============ */
const SKINS=['#f3d3b5','#e5b98f','#c88f62','#9a6743','#6a4329'];
const HCOL={siyah:'#1b1715',kahve:'#4b2f1f',kumral:'#7c5735',sari:'#cfa962',kizil:'#94401f',gri:'#909090',beyaz:'#e4e2dd',platin:'#efe6d2',pembe:'#e07aa8',mor:'#6e4bb8',mavi:'#3a64b8'};
const HCOL_N={siyah:'Siyah',kahve:'Koyu kahve',kumral:'Kumral',sari:'Sarı',kizil:'Kızıl',gri:'Gri',beyaz:'Beyaz',platin:'Platin',pembe:'Pembe',mor:'Mor',mavi:'Mavi'};
const HAIR_E=[['twist','Twist'],['dread','Dread'],['mohawk','Mohawk'],['mullet','Mullet'],['curtain','Perde kesim'],['wolf','Wolf cut'],['spiky','Dikleştirilmiş'],['afro','Afro'],['orgu','Cornrow örgü'],['skinfade','Skin fade'],['undercut','Undercut'],['bukle','Kıvırcık'],['topuz','Man bun'],['kel','Kazıtılmış']];
const HAIR_K=[['bob','Küt bob'],['kakul','Kahküllü uzun'],['uzundalga','Uzun dalgalı'],['boxbraid','Box braid'],['spacebuns','Çift topuz'],['yarimtopuz','Yarım topuz'],['pixie','Pixie'],['wolf','Wolf cut'],['curtain','Perde kesim'],['afro','Afro'],['bukle','Kıvırcık'],['atkuyrugu','At kuyruğu'],['uzun','Düz uzun']];
const BEARDS=[['yok','Sinekkaydı'],['kirli','Kirli sakal'],['kisasakal','Kısa sakal'],['keci','Keçi sakalı'],['balbo','Balbo'],['ince','İnce bıyık'],['biyik','Pala bıyık'],['tam','Gür sakal'],['boxed','Çerçeve sakal'],['cene','Çene hattı']];
const OUT=[
 {id:'tisort',n:'Tişört',p:0,st:0},{id:'baski',n:'Baskılı oversize',p:900,st:2},{id:'esofman',n:'Eşofman üstü',p:1200,st:1},
 {id:'hoodie',n:'Kapüşonlu',p:1800,st:3},{id:'gomlek',n:'Gömlek, açık yaka',p:2500,st:3},{id:'elbise',n:'Askılı elbise',p:4500,st:5},
 {id:'hawaii',n:'Desenli gömlek',p:3500,st:4},{id:'kolej',n:'Kolej ceket',p:5500,st:5},{id:'deri',n:'Deri ceket',p:6500,st:6},
 {id:'kadife',n:'Kadife ceket',p:18000,st:8},{id:'takim',n:'Takım elbise',p:25000,st:9},{id:'pullu',n:'Pullu sahne ceketi',p:45000,st:12},
 {id:'beyaz',n:'Beyaz takım',p:60000,st:12},{id:'abiye',n:'Pullu abiye',p:70000,st:13},{id:'smokin',n:'Smokin',p:90000,st:14}];
const OCOLM={
 tisort:[['Beyaz','#e9e9e9'],['Siyah','#1c1c20'],['Gri','#6c737f'],['Lacivert','#23305a'],['Kırmızı','#8f1f24'],['Lila','#9a86c9'],['Pembe','#d87aa0']],
 baski:[['Siyah','#1c1c20'],['Beyaz','#ececec'],['Bej','#cdbb9b'],['Haki','#5b5a3c'],['Mor','#4a2a6a']],
 esofman:[['Lacivert','#24356a'],['Siyah','#1a1a1d'],['Kırmızı','#9b1f24'],['Beyaz','#e6e6e6'],['Yeşil','#1f5a3a'],['Mor','#4a2a6a']],
 hoodie:[['Gri','#7a7d84'],['Siyah','#1c1c20'],['Haki','#6b6e52'],['Lila','#9a86c9'],['Bordo','#5a1c27'],['Krem','#e3d8c0']],
 gomlek:[['Beyaz','#f2f0ea'],['Siyah','#1a1a1d'],['Açık mavi','#bcd0e6'],['Bordo','#5a1c27'],['Saten mor','#4b2a66']],
 elbise:[['Siyah','#151518'],['Kırmızı','#a3172c'],['Beyaz','#efeae0'],['Lacivert','#1c2a45'],['Zümrüt','#1e4a3c'],['Pudra','#d9a8a8']],
 hawaii:[['Kırmızı çiçek','#9b2a24'],['Mavi','#1f5f8a'],['Siyah','#1a1a1d'],['Sarı','#c99a16']],
 kolej:[['Lacivert','#1f2d6b'],['Bordo','#5a1c27'],['Siyah','#18181b'],['Yeşil','#1e4a3c']],
 deri:[['Siyah','#1d1b1c'],['Kahve','#4a3426'],['Bordo','#4d1a22']],
 kadife:[['Bordo','#5a1c27'],['Lacivert','#1c2a45'],['Zümrüt','#1e4a3c'],['Siyah','#151518'],['Mor','#3d2357']],
 takim:[['Antrasit','#353840'],['Siyah','#151518'],['Lacivert','#1c2a45'],['Krem','#e3d8c0'],['Kahve','#4a3426']],
 pullu:[['Altın','#b8902c'],['Gümüş','#9aa0a8'],['Siyah','#1a1a1d'],['Kırmızı','#8f1a26'],['Mor','#4e2a7a']],
 beyaz:[['Beyaz','#ece7dc'],['Krem','#e3d8c0']],
 abiye:[['Gümüş','#a7adb5'],['Altın','#b8902c'],['Siyah','#151518'],['Kırmızı','#8f1a26']],
 smokin:[['Siyah','#121215'],['Gece mavisi','#141c33'],['Beyaz','#ece7dc']]};
const ODEFM={tisort:'#e9e9e9',baski:'#1c1c20',esofman:'#24356a',hoodie:'#7a7d84',gomlek:'#f2f0ea',elbise:'#151518',hawaii:'#9b2a24',kolej:'#1f2d6b',deri:'#1d1b1c',kadife:'#5a1c27',takim:'#353840',pullu:'#b8902c',beyaz:'#ece7dc',abiye:'#a7adb5',smokin:'#121215'};
const ACCS=[
 {id:'zincir',n:'İnce altın zincir',p:12000,st:3,grp:'kolye'},{id:'kuba',n:'Küba zincir',p:85000,st:6,grp:'kolye'},{id:'kat',n:'Katmanlı zincirler',p:45000,st:5,grp:'kolye'},{id:'iced',n:'Pırlanta zincir (iced)',p:950000,st:10,grp:'kolye'},
 {id:'kartal',n:'Altın kartal kolye',p:30000,st:4,grp:'kolye'},{id:'mikrofon',n:'Mikrofon kolye',p:18000,st:4,grp:'kolye'},{id:'tag',n:'Künye kolye',p:3500,st:2,grp:'kolye'},{id:'hac',n:'Haç kolye',p:9000,st:3,grp:'kolye'},
 {id:'inci',n:'İnci kolye',p:22000,st:4,grp:'kolye'},{id:'choker',n:'Choker',p:1500,st:2,grp:'kolye'},{id:'kalpk',n:'Kalp kolye',p:6000,st:3,grp:'kolye'},
 {id:'gozluk',n:'Klasik güneş gözlüğü',p:1500,st:2,grp:'gozluk'},{id:'yuvarlak',n:'Yuvarlak çerçeve',p:2500,st:3,grp:'gozluk'},{id:'kalin',n:'Kalın çerçeve',p:3000,st:3,grp:'gozluk'},{id:'aviator',n:'Aviator',p:6000,st:4,grp:'gozluk'},
 {id:'kedi',n:'Kedi göz',p:4500,st:4,grp:'gozluk'},{id:'kalp',n:'Kalp gözlük',p:1800,st:3,grp:'gozluk'},{id:'renkli',n:'Renkli cam (90lar)',p:2800,st:3,grp:'gozluk'},{id:'vizor',n:'Vizör gözlük',p:7500,st:5,grp:'gozluk'},
 {id:'cap',n:'Şapka',p:1200,st:2,grp:'sapka'},{id:'bere',n:'Bere',p:800,st:2,grp:'sapka'},{id:'bucket',n:'Balıkçı şapka',p:1500,st:3,grp:'sapka'},{id:'kasket',n:'Kasket',p:900,st:1,grp:'sapka'},{id:'kulaklik',n:'Stüdyo kulaklığı',p:4500,st:2,grp:'sapka'},
 {id:'kupe',n:'Pırlanta küpe',p:9000,st:2,grp:'kupe'},{id:'halka',n:'Halka küpe',p:2500,st:2,grp:'kupe'},
 {id:'altindis',n:'Altın diş',p:8000,st:2,grp:'diger'},{id:'boyun',n:'Boyunda gül dövmesi',p:6000,st:2,grp:'diger'},{id:'boyun2',n:'Tribal boyun dövmesi',p:9000,st:3,grp:'diger'},
 {id:'yildiz',n:'Göz kenarında yıldız',p:3000,st:2,grp:'diger'},{id:'kasust',n:'Kaş üstü yazı',p:3500,st:2,grp:'diger'},{id:'elmacikgul',n:'Elmacıkta gül',p:4000,st:2,grp:'diger'},{id:'cizgi3',n:'Yanakta çizgiler',p:3000,st:2,grp:'diger'}];
const AGRP=[['kolye','Kolye'],['gozluk','Gözlük'],['sapka','Şapka'],['kupe','Küpe'],['diger','Dövme & diğer']];
const SUBS={rap:[{id:'trap',n:'Trap',vir:.03,tail:0},{id:'drill',n:'Drill',vir:.04,tail:-.1},{id:'melodik',n:'Melodik rap',vir:.02,tail:.15},{id:'oldschool',n:'Old school',vir:0,tail:.3},{id:'boombap',n:'Boom bap',vir:-.01,tail:.25}],
 pop:[{id:'dans',n:'Dans-pop',vir:.04,tail:0},{id:'balad',n:'Balad',vir:0,tail:.35},{id:'elektro',n:'Elektropop',vir:.03,tail:.05},{id:'akustik',n:'Akustik',vir:0,tail:.25}],
 arabesk:[{id:'klasik',n:'Klasik arabesk',vir:0,tail:.4},{id:'arapop',n:'Arabesk-pop',vir:.03,tail:.1},{id:'fantezi',n:'Fantezi',vir:.02,tail:.15}],
 rock:[{id:'alt',n:'Alternatif',vir:.01,tail:.2},{id:'anadolu',n:'Anadolu rock',vir:0,tail:.4},{id:'punk',n:'Punk',vir:.02,tail:0},{id:'powerbalad',n:'Power balad',vir:.01,tail:.3}],
 turku:[{id:'turku',n:'Türkü',vir:0,tail:.4},{id:'halkpop',n:'Halk-pop',vir:.03,tail:.1},{id:'bozlak',n:'Bozlak',vir:-.01,tail:.45}]};
const WRITERS={kendim:{n:'Söz-müzik: kendim',d:'Telifin tamamı senin',q:0,pct:0,fee:0},ortak:{n:'Bir söz yazarıyla ortak',d:'Kalite +4 · söz yazarına %10 telif',q:4,pct:.1,fee:0},unlu:{n:'Ünlü söz yazarı',d:'Kalite +8 · ₺100 B peşin + %20 telif',q:8,pct:.2,fee:100000}};
const MIX=[{n:'Mix-mastering yok',d:'Ham kayıt',p:0,q:0},{n:'Standart mix & master',d:'Kalite +3',p:20000,q:3},{n:'Premium (yurt dışı mastering)',d:'Kalite +6',p:250000,q:6}];
const PROMO=[0,50000,500000,5000000];
const DIST={yuzde:{n:'Yüzdelik dağıtımcı',d:'Peşin ücret yok · gelirin %15\'i',fee:0,pct:.15},sabit:{n:'Sabit ücretli dağıtımcı',d:'Şarkı başı ₺12 B peşin · komisyon yok',fee:12000,pct:0}};
const EDIT={rap:'Türkçe Rap Zirve',pop:'Pop Hits Türkiye',arabesk:'Arabesk Akşamları',rock:'Rock Türkiye',turku:'Türkü Sevdası'};
function defMeta(g){return {cover:{p:R(0,CPAL.length-1),m:pick(['gradyan','daire','dalga','neon','yildiz','izgara'])},sub:SUBS[g||'pop'][0].id,writer:'kendim',mix:1,dist:'yuzde',promo:0,pitch:true}}
function subOf(s){return SUBS[s.g].find(x=>x.id===s.meta.sub)||SUBS[s.g][0]}
const MON0=()=>({gross:0,writer:0,dist:0,lab:0,rec:0,mgr:0,tax:0,net:0});
const GENRES={rap:{n:'Rap',p:'Rapçi',c:'#ef5b4a'},pop:{n:'Pop',p:'Popçu',c:'#ff5fa2'},arabesk:{n:'Arabesk',p:'Arabeskçi',c:'#a378ff'},rock:{n:'Rock',p:'Rockçı',c:'#5b8cff'},turku:{n:'Türkü',p:'Türkücü',c:'#3fbf8a'}};
const INSTR=[['gitar','Gitar','🎸'],['piyano','Piyano','🎹'],['baglama','Bağlama','🪕'],['keman','Keman','🎻'],['davul','Davul','🥁']];
const PLAT=[{id:'spo',n:'Spotiplay',c:'#1db954',rate:.13,u:'dinlenme'},{id:'tube',n:'TubeX',c:'#ff3b30',rate:.045,u:'izlenme'},{id:'fizzy',n:'Fizzy',c:'#f5a300',rate:.21,u:'dinlenme'},{id:'pear',n:'Pear Music',c:'#a259ff',rate:.29,u:'dinlenme'}];
const VENUES=[
 {id:'sokak',n:'Sokakta çal',ic:'🪙',loc:'İstiklal Caddesi',age:14,fame:0,m:1,pay:[1500,9000],fans:[20,120]},
 {id:'bar',n:'Bar sahnesi',ic:'🍺',loc:'Kadıköy',age:18,fame:8,m:1,pay:[20000,55000],fans:[80,400]},
 {id:'dugun',n:'Düğün / nişan',ic:'💍',loc:'Düğün salonları',age:16,fame:18,m:1,pay:[90000,260000],fans:[100,500],gb:{arabesk:1.7,pop:1.3,turku:1.7}},
 {id:'kulup',n:'Kulüp konseri',ic:'🎧',loc:'Beyoğlu',age:18,fame:32,m:1,pay:[280000,700000],fans:[800,3000]},
 {id:'salon',n:'Konser salonu',ic:'🎭',loc:'Volt Sahne',age:18,fame:48,m:1,pay:[1500000,3800000],fans:[4000,12000]},
 {id:'tur',n:'Türkiye turnesi',ic:'🚌',loc:'12 şehir',age:18,fame:52,m:3,pay:[12000000,30000000],fans:[20000,60000]},
 {id:'festival',n:'Yaz festivali',ic:'🎪',loc:'Açıkhava',age:18,fame:62,m:1,pay:[6000000,14000000],fans:[15000,50000]},
 {id:'avrupa',n:'Avrupa turnesi',ic:'✈️',loc:'Berlin, Amsterdam, Londra',age:18,fame:70,m:3,pay:[30000000,70000000],fans:[50000,150000]},
 {id:'stad',n:'Stadyum konseri',ic:'🏟',loc:'Stadyum',age:18,fame:82,m:1,pay:[45000000,100000000],fans:[100000,300000]}];
const STUDIOS=[{n:'Ev stüdyosu (laptop)',p:0,b:0},{n:'Mahalle stüdyosu',p:15000,b:8},{n:'Profesyonel stüdyo',p:150000,b:15},{n:'Hit yapımcı',p:1500000,b:24}];
const CLIPS=[{n:'Telefonla klip',p:5000,m:1.3,h:1.05},{n:'Prodüksiyon klip',p:400000,m:2,h:1.2},{n:'Büyük bütçe klip',p:4500000,m:3.2,h:1.5}];
const LABELS=[{n:'Kuzey Plak',t:1},{n:'Pasaj Records',t:1},{n:'Avenue Records',t:2},{n:'Boğaz Müzik',t:2},{n:'Mega Yapım',t:3},{n:'Atlas Global',t:4},{n:'Orbit Universal',t:5}];
const HOUSES=[
 {id:'kira1',n:'1+1 kiralık daire',loc:'Kadıköy',ic:'🏢',rent:300000,p:0,up:0,hap:5},
 {id:'loft',n:'Loft daire',loc:'Karaköy',ic:'🏙',rent:1100000,p:0,up:0,hap:9},
 {id:'rez',n:'Rezidans dairesi',loc:'Ataşehir',ic:'🌆',rent:0,p:14500000,up:220000,hap:14},
 {id:'villa',n:'Bahçeli villa',loc:'Beykoz',ic:'🏡',rent:0,p:62000000,up:800000,hap:22},
 {id:'yazlik',n:'Yazlık',loc:'Bodrum',ic:'🏖',rent:0,p:38000000,up:450000,hap:10,second:true},
 {id:'yali',n:'Boğaz yalısı',loc:'Yeniköy',ic:'🏛',rent:0,p:780000000,up:3500000,hap:35}];
const CARS=[{id:'hatch',n:'2012 hatchback',ic:'🚗',p:650000,up:45000,pr:2},{id:'sedan',n:'Sedan',ic:'🚘',p:2100000,up:110000,pr:5},{id:'suv',n:'Lüks SUV',ic:'🚙',p:6800000,up:300000,pr:12},{id:'coupe',n:'Spor coupe',ic:'🏎',p:16500000,up:700000,pr:20},{id:'super',n:'Süper spor',ic:'🏁',p:52000000,up:2000000,pr:32}];
const NM_E=['Arda','Emir','Kerem','Mert','Burak','Can','Deniz','Efe','Yusuf','Ozan','Kaan','Barış','Umut','Eren','Tolga','Onur'];
const NM_K=['Defne','Elif','Zeynep','Ece','Ada','Melis','Selin','İrem','Derin','Nil','Lara','Asya','Ceren','Duru','Eylül','Simge'];
const SURN=['Yılmaz','Kaya','Demir','Çelik','Şahin','Aydın','Arslan','Doğan','Kılıç','Aksoy','Yıldız','Öztürk','Karaca','Tekin','Aslan','Güneş'];
const JOBS=['öğretmen','esnaf','şoför','hemşire','memur','berber','aşçı','muhasebeci','terzi','kuaför','inşaat ustası','emekli astsubay'];
const ARTISTS=['Derin Ay','Melis Nova','Kaan Rüzgar','Asya Lin','Bora Karaca','Selin Su','Tan Ateş','Ece Mira'];
const RIVALS=['MC Kaos','Lil Beton','Sert Ayaz','Gölge34','Kral Yeraltı'];
const MANAGERS=['Selin Aksoy','Kerem Tan','Hakan Er','Nil Duru','Mert Yalın'];
const BRANDS=['VoltX Enerji','Turkuaz Mobil','Lumi Kozmetik','Kırmızı Kola','Pasaj Moda','Hızlı Kargo','Nova Bank','Yıldız Çikolata'];
const WORDS={rap:[['Sokak','Gece','Kaos','Beton','Duman','Asfalt','Gölge','Ritim','Kral','Mahalle'],['Kuralları','Hikayesi','Savaşı','Mesajı','Rüyası','Oyunu','Dili','Yasası']],
 pop:[['Aşk','Yaz','Kalbim','Sensiz','Deli','Pembe','Yıldız','Sahil','Gece'],['Gecesi','Oyunu','Dansı','Masalı','Bile','Rengi','Şarkısı']],
 arabesk:[['Dertli','Kader','Gönül','Hasret','Gurbet','Yaralı','Sitem','Ayrılık'],['Yolu','Sızısı','Feryadı','Gecesi','Mektubu','Çilesi']],
 rock:[['Çelik','Fırtına','İsyan','Karanlık','Volkan','Yankı','Gri'],['Kalpler','Gökyüzü','Sessizlik','Ateşi','Rüzgarı','Şehri']],
 turku:[['Dağlar','Yayla','Bozkır','Ela Göz','Pınar','Kervan','Gurbet'],['Başında','Yolu','Yarim','Türküsü','Ağıdı','Sevdası']]};
const ALBW=['Mahalle','Gece Yarısı','Kırmızı Oda','Asfalt Çiçeği','Yüzleşme','Son Durak','Rüzgar Gülü','Sıfır Kilometre','Ayna','Kör Nokta','Deniz Feneri','Kanatlar'];

/* ============ Avatar uzantıları (müzik kıyafetleri, kadın yüz detayları) ============ */
function sparkle(id,col){return `<defs><pattern id="${id}" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1.2" cy="1.2" r=".55" fill="#fff" opacity=".75"/><circle cx="3.7" cy="3.4" r=".45" fill="${shade(col,70)}" opacity=".8"/></pattern></defs>`}
function bodyM(o,col){col=col||ODEFM[o]||ODEF[o]||'#6c737f';const dk=shade(col,-22),lt=shade(col,22);
 const arms=`<path d="M24 74 Q22.6 92 24 110 M76 74 Q77.4 92 76 110" stroke="${dk}" stroke-width=".9" fill="none"/>`;
 const shd=`<path d="M64 56.6 L75.4 58.6 Q88.2 62.6 89.4 76 L91 110 L70 110 Q73 84 64 56.6Z" fill="#000" opacity=".16"/>`;
 switch(o){
  case 'baski':return body2('tisort',col)+`<rect x="41" y="70" width="18" height="13" rx="1.5" fill="${lightC(col)?'#1c1c20':'#f2f2f2'}" opacity=".9"/><path d="M44 78 L47 73 L50 77 L53 72 L56 78" stroke="${col}" stroke-width="1.2" fill="none"/>`;
  case 'hoodie':return `<path d="${TOR2}" fill="${col}"/>`+shd+`<path d="M38 56 Q50 66 62 56 Q60 51 56.4 54.4 Q50 59 43.6 54.4 Q40 51 38 56Z" fill="${dk}" stroke="${OL2}" stroke-width=".5"/><path d="M47 60 L46.4 74 M53 60 L53.6 74" stroke="#f0f0f0" stroke-width=".9"/><circle cx="46.4" cy="74.6" r=".8" fill="#ddd"/><circle cx="53.6" cy="74.6" r=".8" fill="#ddd"/><path d="M36 92 L64 92 L66 110 L34 110Z" fill="${dk}" opacity=".55"/>`+arms;
  case 'kolej':return `<path d="${TOR2}" fill="${col}"/><path d="M9 110 L10.6 76 Q11.8 62.6 24.6 58.6 L27 60 Q21 78 23.6 110Z M91 110 L89.4 76 Q88.2 62.6 75.4 58.6 L73 60 Q79 78 76.4 110Z" fill="#efe9dc"/>`+shd+`<path d="M43.6 54.6 Q50 61.6 56.4 54.6" fill="var(--sk)" stroke="#efe9dc" stroke-width="2.2"/><path d="M50 61 V110" stroke="#efe9dc" stroke-width="1"/><circle cx="52" cy="70" r=".9" fill="#efe9dc"/><circle cx="52" cy="80" r=".9" fill="#efe9dc"/><circle cx="52" cy="90" r=".9" fill="#efe9dc"/><text x="36" y="80" font-size="7" font-weight="900" fill="#efe9dc" font-family="Georgia,serif">S</text>`;
  case 'elbise':return `<path d="M14 110 L16 80 Q18 66 30 62 L40 60 Q50 64 60 60 L70 62 Q82 66 84 80 L86 110Z" fill="${col}"/><path d="M36 61 Q37 56 38.6 54 M64 61 Q63 56 61.4 54" stroke="${col}" stroke-width="1.6"/>`+shd+`<path d="M30 62 Q40 58 50 64 Q60 58 70 62" stroke="${dk}" stroke-width="1" fill="none"/>`;
  case 'abiye':{const id='ab'+(++uid);return sparkle(id,col)+bodyM('elbise',col)+`<path d="M14 110 L16 80 Q18 66 30 62 L40 60 Q50 64 60 60 L70 62 Q82 66 84 80 L86 110Z" fill="url(#${id})"/>`}
  case 'pullu':{const id='pl'+(++uid);return sparkle(id,col)+body2('kadife',col)+`<path d="${TOR2}" fill="url(#${id})" opacity=".85"/><path d="M43.4 54.6 L50 70 L56.6 54.6Z" fill="#141416"/>`}
 }
 return body2(o,col)}
function femFace(hc){return `<path d="M40.8 30.9 Q44.2 29.4 47.8 31 M59.2 30.9 Q55.8 29.4 52.2 31" stroke="#160f0c" stroke-width="1.15" fill="none" stroke-linecap="round"/><path d="M41 31.2 l-1.3-.9 M41.9 30.6 l-1-1.1 M59 31.2 l1.3-.9 M58.1 30.6 l1-1.1" stroke="#160f0c" stroke-width=".55" stroke-linecap="round"/><path d="M41.6 27.8 Q44.6 26.4 47.6 28 M58.4 27.8 Q55.4 26.4 52.4 28" stroke="${hc}" stroke-width="1" fill="none" stroke-linecap="round"/>`}
const FLIPS=`<path d="M46.3 43 Q48 41.9 50 42.5 Q52 41.9 53.7 43 Q50 43.6 46.3 43Z" fill="#b2505c"/><path d="M46.3 43 Q50 46.4 53.7 43 Q50 43.9 46.3 43Z" fill="#c45e69"/><path d="M48.6 44.4 Q50 44.9 51.4 44.4" stroke="#fff" stroke-opacity=".35" stroke-width=".4" fill="none"/>`;
function AV(L,age,opts){return avatarSVG2(L,age==null?30:age,opts||{})}

/* ============ Durum ============ */
const KEY='sahne2-kayit';
let S=null,CR=null,SHEET=null,SUB=null;
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function load(){try{const t=localStorage.getItem(KEY);return t?JSON.parse(t):null}catch(e){return null}}
function log(t,k){let b=S.log[S.log.length-1];if(!b||b.age!==S.age){b={age:S.age,it:[]};S.log.push(b);if(S.log.length>140)S.log.shift()}b.it.push({t,k:k||''})}
function toast(t){const o=document.querySelector('.toast');if(o)o.remove();const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2400)}
function add(k,v){S[k]=clamp(S[k]+v)}
function stil(){const o=OUT.find(x=>x.id===S.look.outfit);return (o?o.st:0)+((S.watches||[]).length?Math.max(...S.watches.map(w=>WATCHES.find(z=>z.id===w).st)):0)+(typeof hasF==='function'&&S.hup&&hasF('gardirop')?3:0)+S.look.acc.reduce((a,id)=>{const x=ACCS.find(z=>z.id===id);return a+(x?x.st:0)},0)}
function calcFame(){S.fame=clamp((Math.log10(Math.max(1,S.fol))-2.3)*19.5)}
function title(){if(S.age<6)return 'Bebek';if(!S.genre)return S.age<18?'Öğrenci':'Müzik sever';const f=S.fame,g=GENRES[S.genre].p.toLowerCase();return (f<10?'Amatör ':f<25?'Yerel ':f<45?'Yükselen ':f<65?'Ünlü ':f<85?'Süperstar ':'Efsane ')+g}
function useM(m){if(S.months<m){toast(`Bu yıl ${S.months?'sadece '+S.months+' ay':'hiç zaman'} kaldı. İlerle.`);return false}S.months-=m;return true}
function canPay(x){return S.money>=x}
function pay(x){if(S.money<x){toast('Paran yetmiyor: '+fmtS(x));return false}S.money-=x;return true}
function genTitle(g){const w=WORDS[g];return pick(w[0])+' '+pick(w[1])}
function released(){return S.songs.filter(s=>s.st==='yayin')}

function newLife(c){
 const g=c.g,mom={id:1,rel:'Annen',name:pick(NM_K)+' '+c.last,age:R(23,36),job:pick(JOBS),yak:R(70,95),alive:true},dad={id:2,rel:'Baban',name:pick(NM_E)+' '+c.last,age:R(25,40),job:pick(JOBS),yak:R(60,90),alive:true};
 S={v:2,first:c.first,last:c.last,g,age:0,alive:true,look:{skin:c.skin,hair:c.hair,hairColor:c.hairColor,beard:g==='e'?c.beard:'yok',outfit:'tisort',oc:{},acc:[],g:g==='k'?'k':'e'},
  money:0,health:R(85,100),happy:R(75,95),skill:R(0,6),talent:R(30,100),fame:0,fol:0,genre:null,instr:[],months:12,kons:0,grad:false,
  songs:[],albums:[],contract:null,manager:null,offers:[],feat:null,tiktok:0,posts:0,
  owned:['tisort'],accOwned:[],house:null,houses:[],cars:[],car:null,fam:[mom,dad],partner:null,kids:[],
  log:[],yr:{stream:0,gig:0,brand:0,alb:0},hist:[],lastY:null,tot:{spo:0,tube:0,fizzy:0,pear:0,stream:0,gig:0,brand:0,alb:0,all:0,streams:0},
  best:{tr:null,gl:null},awards:[],evq:[],trends:{rap:1.1,pop:1.05,arabesk:.95,rock:.85,turku:.9},nid:1};
 log(`${S.first} ${S.last} olarak İstanbul'da dünyaya geldin. Annen ${mom.name.split(' ')[0]} ${mom.job}, baban ${dad.name.split(' ')[0]} ${dad.job}.`);
 log(S.talent>80?'Doğduğunda o kadar güçlü ağladın ki ebe "Bu çocuk sahnelere çıkar" dedi.':'Mahallenin en sesli bebeği sendin.','dim');
 extInit();calcFame();save();boot()}

/* ============ Kariyer aksiyonları ============ */
const ACT={};
ACT.lesson=id=>{if(!useM(2))return;const i=INSTR.find(x=>x[0]===id);const g=RF(1.5,3)*(S.talent/70)*(1-S.skill/100);S.skill=clamp(S.skill+g);if(!S.instr.includes(id)){S.instr.push(id);log(`${i[1]} dersleri almaya başladın.`,'good')}else log(`${i[1]} çalışmaya devam ettin. Yetenek +${g.toFixed(1)}`);sheet('kariyer')};
ACT.koro=()=>{if(!useM(1))return;S.skill=clamp(S.skill+RF(.8,2)*(1-S.skill/100));add('happy',3);log('Okul korosunda solist sesin herkesin dikkatini çekti.','good');sheet('kariyer')};
ACT.genre=g=>{S.genre=g;log(`Kararını verdin: ${GENRES[g].n} yapacaksın. Müzik artık senin işin.`,'gold');sheet('kariyer')};
ACT.write=()=>{if(!useM(1))return;const q=clamp(S.skill*.55+RF(5,38)*(S.talent/80)+(S.happy-50)*.12+(S.feat?8:0)+(S.lyB||0)+S.instr.length,5,95);
 const s={id:S.nid++,t:genTitle(S.genre),g:S.genre,q:Math.round(q),st:'demo',feat:S.feat||null,clipM:1,clip:null,pot:0,ra:null,rm:12,tot:{spo:0,tube:0,fizzy:0,pear:0},total:0,ly:0,peak:null,gpeak:null,alb:null,viral:false,meta:defMeta(S.genre),mon:MON0(),hy:[],cert:-1,fb:S.feat?(S.featBoost||1.3):1};
 S.feat=null;S.featBoost=null;S.lyB=0;S.songs.unshift(s);S.skill=clamp(S.skill+.5);log(`"${s.t}" adlı şarkıyı yazdın${s.feat?' (feat. '+s.feat+')':''}. Demo kalitesi ${s.q}/100.`,'good');sheet('kariyer')};
ACT.practice=()=>{if(!useM(1))return;const g=RF(1.5,3.5)*(1-S.skill/130)*(S.talent/70);S.skill=clamp(S.skill+g);log(`Bir ay boyunca prova yaptın. Yetenek +${g.toFixed(1)}`);sheet('kariyer')};
ACT.coach=()=>{const c=40000;if(!canPay(c)){toast('Vokal koçu '+fmtS(c));return}if(!useM(1))return;S.money-=c;const g=RF(3,6)*(1-S.skill/140);S.skill=clamp(S.skill+g);log(`Ünlü bir vokal koçuyla çalıştın. Yetenek +${g.toFixed(1)}`,'good');sheet('kariyer')};
ACT.kons=()=>{if(S.kons||S.grad)return;if(!useM(1))return;if(S.skill+R(0,35)>60){S.kons=4;log('Devlet konservatuvarı sınavını kazandın! 4 yıl boyunca her yıl 4 ayını derslere vereceksin.','gold')}else log('Konservatuvar sınavında jüriyi ikna edemedin. Seneye tekrar dene.','bad');sheet('kariyer')};
ACT.rec=(id,i)=>{const s=S.songs.find(x=>x.id===id);let st=STUDIOS[i]||STUDIOS[0],cost=st.p,b=st.b,n=st.n;if(i===-1&&S.contract){cost=0;b=12+S.contract.t*3;n=S.contract.n+' stüdyosu'}if(i===-2&&hasF('studyo')){cost=0;b=18;n='Ev stüdyon'}b+=S.prodB||0;
 if(!canPay(cost)){toast('Paran yetmiyor: '+fmtS(cost));return}if(!useM(1))return;S.money-=cost;s.q=Math.round(clamp(s.q+b+RF(-2,3),1,100));s.st='kayit';s.studio=n;if(S.prodB)log('Prodüktör arkadaşının beat\'i şarkıya can kattı.','good');S.prodB=0;log(`"${s.t}" ${n.toLowerCase()}nda kaydedildi. Son kalite ${s.q}/100.`);sheet('kariyer')};
function potFor(s,boost){const promo=S.contract?1+S.contract.t*.4:1;return (8000+120*Math.pow(S.fol,.8))*Math.pow(s.q/60,2.2)*S.trends[s.g]*promo*(s.feat?(s.fb||1.6):1)*(s.clip?s.clip.h:1)*(boost||1)*(S.star&&s.meta&&s.meta.hit?3:1)*RF(.7,1.3)}
function relCost(s){const m=s.meta;return MIX[m.mix].p+WRITERS[m.writer].fee+(!S.contract&&m.dist==='sabit'?DIST.sabit.fee:0)}
function doRelease(s,alb,pb){const m=s.meta;s.q=Math.round(clamp(s.q+WRITERS[m.writer].q+MIX[m.mix].q,1,100));const boost=(alb?1.25:1)*(1+.8*pb/(pb+30000+S.fol*3));
 s.pot=potFor(s,boost);s.st='yayin';s.ra=S.age;s.rm=Math.max(1,S.months);s.alb=alb||null;s.edit=null;
 if(m.pitch&&(S.star&&m.hit||ch(.12+s.q/400+(S.contract?S.contract.t*.04:0)+(pb>0?.05:0)))){s.pot*=1.35;s.edit=ch(.5)?EDIT[s.g]:'Yeni Cuma'}}
ACT.release=id=>{const s=S.songs.find(x=>x.id===id);s.t=(s.t||'').trim();if(!s.t){toast('Şarkıya bir ad ver.');return}const pb=s.meta.promo===-1?(s.meta.pc||0):PROMO[s.meta.promo];if(!pay(relCost(s)+pb))return;doRelease(s,null,pb);if(S.contract)S.contract.rel++;
 log(`"${s.t}" single olarak yayında! (${subOf(s).n}, kalite ${s.q})${s.edit?` Spotiplay editörleri şarkıyı "${s.edit}" listesine ekledi!`:''}`,s.edit?'gold':'good');SUB={t:'song',id,title:'Şarkı'};sheet('kariyer')};
ACT.clip=(id,i)=>{const s=S.songs.find(x=>x.id===id),c=CLIPS[i];const cp=S.dirFree?0:c.p;if(!canPay(cp)){toast('Paran yetmiyor: '+fmtS(cp));return}if(!useM(1))return;S.money-=cp;s.clip={n:c.n,h:c.h+(S.modelB?.15:0)};s.clipM=c.m*(S.dirFree?1.2:1);if(S.contract)S.contract.clips=(S.contract.clips||0)+1;if(S.dirFree)log('Yönetmen arkadaşın klibi ücretsiz çekti.','good');S.dirFree=0;S.modelB=0;if(s.st==='yayin')s.pot*=c.h;log(`"${s.t}" için ${c.n.toLowerCase()} çektin. TubeX izlenmeleri katlanacak.`,'good');sheet('kariyer')};
ACT.album=()=>{const rec=S.songs.filter(s=>s.st==='kayit');if(rec.length<5)return;const ad=S.ad;ad.n=(ad.n||'').trim();if(!ad.n){toast('Albüme bir ad ver.');return}if(S.albums.some(a=>a.n===ad.n)){toast('Bu adda bir albümün var.');return}
 const pb=PROMO[ad.promo],cost=rec.reduce((a,s)=>a+relCost(s),0)+pb;if(!canPay(cost)){toast('Paran yetmiyor: '+fmtS(cost));return}if(!useM(1))return;S.money-=cost;
 rec.forEach(s=>{s.meta.cover={...ad.cover};doRelease(s,ad.n,pb/rec.length*2)});const q=Math.round(rec.reduce((a,s)=>a+s.q,0)/rec.length);if(S.contract)S.contract.rel+=4;
 const sales=Math.round(S.fol*RF(.003,.012)*Math.pow(q/60,1.5)*(1+.5*pb/(pb+50000+S.fol*3))+R(50,400));let b;if(S.contract){const g=sales*350,art=g*S.contract.roy/100,rc=S.contract.recoup?Math.min(art,S.contract.unrec):0;S.contract.unrec-=rc;b=income(art-rc,'alb');if(rc)log(`Albüm satışından payına düşen ${fmtS(rc)} avans borcuna mahsup edildi.`,'dim')}else b=income(sales*350,'alb');
 S.albums.push({n:ad.n,age:S.age,q,songs:rec.map(s=>s.id),sales,cover:{...ad.cover},net:b.net});const eds=rec.filter(s=>s.edit).length;
 log(`"${ad.n}" albümün çıktı! ${rec.length} şarkı, ortalama kalite ${q}. ${num(sales)} fiziksel satış: net ${fmtS(b.net)}.${eds?` ${eds} şarkı editoryal listelere girdi.`:''}`,'gold');S.ad=null;SUB=null;sheet('kariyer')};
ACT.gig=id=>{const v=VENUES.find(x=>x.id===id);if(S.age<v.age||S.fame<v.fame)return;if(!useM(v.m))return;
 const perf=S.skill*.6+R(0,40)+(S.health<40?-10:0),great=perf>=72,good=perf>=38;
 const mult=(1+S.fame/70)*(1+stil()/80)*(S.manager?1.35:1)*((v.gb&&v.gb[S.genre])||1)*(great?1.25:good?1:.55);
 S.gigN=S.gigN||{};const rep=1/(1+(S.gigN[v.id]||0)*.6);S.gigN[v.id]=(S.gigN[v.id]||0)+1;const gross=Math.round(RF(v.pay[0],v.pay[1])*mult*rep),fans=Math.round(RF(v.fans[0],v.fans[1])*(great?1.4:good?1:.3)*rep);
 S.fol+=Math.round(fans*.5);S.skill=clamp(S.skill+.5);add('health',-v.m*.5);const b=income(gross,'gig');
 log(`${v.n} (${v.loc}): ${great?'Ayakta alkışlandın!':good?'Güzel bir gösteriydi.':'Sahne kötü geçti, seyirci soğuktu.'} Net ${fmtS(b.net)}, +${num(fans)} hayran.`,great?'good':good?'':'bad');calcFame();sheet('kariyer')};
ACT.post=()=>{if(S.posts>=4){toast('Bu yıl yeterince paylaştın.');return}S.posts++;const g=Math.round(30+S.fol*RF(.004,.012)*(1+stil()/40));S.fol+=g;add('happy',1);log(`Instagram'a yeni kombinini paylaştın. +${num(g)} takipçi`);calcFame();sheet('kariyer')};
function ttCost(){return Math.round(20000+S.fol*1.2)}
ACT.tiktok=()=>{const s=released().sort((a,b)=>b.ra-a.ra)[0];if(!s){toast('Önce bir şarkı yayınla.');return}if(S.tiktok){toast('Bu yıl zaten kampanya yaptın.');return}if(!pay(ttCost()))return;S.tiktok=1;s.pot*=1.5;log(`"${s.t}" için TikTok kampanyası başlattın. Viral olma şansı arttı.`,'good');sheet('kariyer')};
function income(gross,src){let lab=0,mgr=0;if(S.contract&&S.contract.is360&&src!=='stream')lab=gross*.3;let a=gross-lab;if(S.manager&&(src==='gig'||src==='brand')){mgr=a*S.manager.cut;a-=mgr}const tax=a*(typeof taxR==='function'?taxR(a):.2),net=a-tax;S.money+=net;S.yr[src]+=net;S.tot[src]+=net;S.tot.all+=net;return {gross,lab,mgr,tax,net}}
ACT.accept=id=>{const o=S.offers.find(x=>x.id===id);if(!o)return;
 if(o.k==='label'){if(S.contract){toast('Zaten sözleşmen var.');return}S.contract={n:o.n,t:o.t,adv:o.adv,roy:o.roy,yrs:o.yrs,left:o.yrs,req:o.req,rel:0,is360:o.is360,unrec:o.adv};S.money+=o.adv;S.offers=S.offers.filter(x=>x.k!=='label');log(`${o.n} ile ${o.yrs} yıllık ${o.is360?'360°':'standart'} sözleşme imzaladın! Avans: ${fmtS(o.adv)}`,'gold')}
 else if(o.k==='mgr'){S.manager={n:o.n,cut:o.cut};S.offers=S.offers.filter(x=>x.k!=='mgr');log(`${o.n} artık menajerin. Komisyon %${Math.round(o.cut*100)}.`,'good')}
 else if(o.k==='brand'){if(!useM(o.m))return;const b=income(o.pay,'brand');S.fol+=Math.round(o.pay/300);S.offers=S.offers.filter(x=>x.id!==id);log(`${o.n} ile ${o.w.toLowerCase()} anlaşması: net ${fmtS(b.net)}`,'good');calcFame()}
 sheet('kariyer')};
ACT.reject=id=>{S.offers=S.offers.filter(x=>x.id!==id);sheet('kariyer')};
ACT.fesih=()=>{const c=S.contract,fee=Math.round(c.unrec+c.adv*.3);if(!pay(fee))return;log(`${c.n} sözleşmesini feshettin. Bedel: ${fmtS(fee)}`,'bad');S.contract=null;sheet('kariyer')};
ACT.fire=()=>{log(`${S.manager.n} ile yollarınızı ayırdınız.`);S.manager=null;sheet('kariyer')};

/* ============ Hayat aksiyonları ============ */
ACT.famTime=id=>{const p=S.fam.find(x=>x.id===id)||S.kids.find(x=>x.id===id);if(p.done){toast('Bu yıl zaten vakit geçirdiniz.');return}p.done=1;p.yak=clamp(p.yak+R(6,14));add('happy',3);log(`${p.name.split(' ')[0]} ile güzel vakit geçirdin.`,'good');sheet('hayat')};
ACT.famMoney=id=>{const p=S.fam.find(x=>x.id===id);if(p.asked){toast('Bu yıl zaten istedin.');return}p.asked=1;if(ch(p.yak/130)){const m=R(1,6)*(S.age<18?250:1500);S.money+=m;log(`${p.rel} sana ${fmt(m)} verdi.`,'good')}else{p.yak=clamp(p.yak-5);log(`${p.rel} "Para ağaçta mı yetişiyor?" dedi.`,'dim')}sheet('hayat')};
ACT.famGift=id=>{const p=S.fam.find(x=>x.id===id)||S.kids.find(x=>x.id===id);const c=Math.max(2000,Math.round(S.money*.01));if(!pay(c))return;p.yak=clamp(p.yak+R(8,16));log(`${p.name.split(' ')[0]}'e ${fmtS(c)} değerinde hediye aldın.`,'good');sheet('hayat')};
ACT.date=()=>{if(S.partner){toast('Zaten bir ilişkin var.');return}if(!useM(1))return;if(ch(.35+S.fame/200+stil()/120)){const g=S.g==='e'?'k':'e';S.partner={id:S.nid++,name:pick(g==='k'?NM_K:NM_E)+' '+pick(SURN),age:S.age+R(-3,3),yak:R(55,80),st:'sevgili',g,type:pick(['normal','model','sporcu','isinsani','dj','sanatci']),trait:pick(Object.keys(TRAITS))};log(`${S.partner.name} ile tanıştın. Aranızda kıvılcımlar çaktı!`,'good')}else log('Bu yıl aşk kapını çalmadı.','dim');sheet('hayat')};
ACT.pTime=()=>{const p=S.partner;if(p.done){toast('Bu yıl zaten baş başaydınız.');return}p.done=1;p.yak=clamp(p.yak+R(6,14));add('happy',4);log(`${p.name.split(' ')[0]} ile romantik bir akşam geçirdin.`,'good');sheet('hayat')};
ACT.propose=()=>{const p=S.partner,c=Math.max(150000,Math.round(S.money*.02));if(!pay(c))return;if(ch(p.yak/110)){p.st='eş';add('happy',15);log(`${p.name.split(' ')[0]} evlenme teklifini kabul etti! Düğününüz magazin manşetlerindeydi. (${fmtS(c)})`,'gold');S.fol+=Math.round(S.fol*.03)}else{p.yak=clamp(p.yak-15);log(`${p.name.split(' ')[0]} "Henüz hazır değilim" dedi.`,'bad')}sheet('hayat')};
ACT.breakup=()=>{const p=S.partner;log(`${p.name.split(' ')[0]} ile ${p.st==='eş'?'boşandınız':'ayrıldınız'}.`,'bad');if(p.st==='eş'&&S.money>0){const t=Math.round(S.money*.3);S.money-=t;log(`Boşanma anlaşması: ${fmtS(t)}`,'bad')}add('happy',-12);S.partner=null;sheet('hayat')};
ACT.baby=()=>{if(!S.partner||S.partner.st!=='eş')return;if(ch(.6)){const g=ch(.5)?'e':'k';const k={id:S.nid++,name:pick(g==='k'?NM_K:NM_E)+' '+S.last,age:0,g,yak:90,rel:g==='k'?'Kızın':'Oğlun'};S.kids.push(k);add('happy',12);log(`${k.rel} ${k.name.split(' ')[0]} dünyaya geldi!`,'gold')}else log('Bu yıl bebek haberi gelmedi.','dim');sheet('hayat')};
ACT.house=id=>{const h=HOUSES.find(x=>x.id===id);if(S.houses.includes(id)){if(!h.second){S.house=id;log(`${h.n} evine taşındın.`)}sheet('hayat');return}
 if(S.age<18){toast('Ev için 18 yaşını beklemelisin.');return}
 if(h.rent){const dep=h.rent/4;if(!pay(dep))return;if(S.house){const c=HOUSES.find(x=>x.id===S.house);if(c.rent)S.houses=S.houses.filter(x=>x!==c.id)}S.houses.push(id);S.house=id;log(`${h.loc}'de ${h.n.toLowerCase()} kiraladın. Depozito ${fmtS(dep)}.`,'good')}
 else{if(!pay(h.p))return;if(!h.second&&S.house){const c=HOUSES.find(x=>x.id===S.house);if(c.rent)S.houses=S.houses.filter(x=>x!==c.id)}S.houses.push(id);if(!h.second)S.house=id;log(`${h.loc}'den ${h.n.toLowerCase()} satın aldın! ${fmtS(h.p)}`,'gold')}
 sheet('hayat')};
ACT.sellHouse=id=>{const h=HOUSES.find(x=>x.id===id);S.houses=S.houses.filter(x=>x!==id);if(S.house===id)S.house=null;if(!h.rent){S.money+=h.p*.9;log(`${h.n} satıldı: ${fmtS(h.p*.9)}`)}else log(`${h.n} evinden çıktın, ailenin yanına döndün.`);sheet('hayat')};
ACT.car=id=>{const c=CARS.find(x=>x.id===id);if(S.cars.includes(id)){S.car=id;sheet('hayat');return}if(S.age<18){toast('Ehliyet için 18 yaş.');return}if(!pay(c.p))return;S.cars.push(id);S.car=id;log(`${c.n} aldın! ${fmtS(c.p)}`,'good');sheet('hayat')};
ACT.sellCar=id=>{const c=CARS.find(x=>x.id===id);S.cars=S.cars.filter(x=>x!==id);if(S.car===id)S.car=S.cars[0]||null;S.money+=c.p*.65;log(`${c.n} satıldı: ${fmtS(c.p*.65)}`);sheet('hayat')};
ACT.gym=()=>{if(S.gym){toast('Bu yıl zaten spor yaptın.');return}S.gym=1;add('health',R(4,9));add('happy',2);log('Spor salonuna yazıldın, formun yerinde.','good');sheet('hayat')};
ACT.doctor=()=>{const c=S.age<18?0:15000;if(!pay(c))return;add('health',R(8,20));log('Doktor kontrolünden geçtin.','good');sheet('hayat')};
ACT.vac=()=>{const c=Math.round(60000*(1+S.fame/20));if(!canPay(c)){toast('Tatil '+fmtS(c));return}if(!useM(1))return;S.money-=c;add('happy',R(12,22));add('health',3);log(`${pick(['Bodrum','Kaş','Maldivler','Bali','Paris','Mykonos'])}'da tatil yaptın.`,'good');sheet('hayat')};
ACT.party=()=>{if(S.age<18){toast('18 yaşını bekle.');return}add('happy',R(6,12));add('health',-R(3,8));if(ch(.25)&&S.fame>20){S.fol+=Math.round(S.fol*.01);log('Gece kulübünde sabahladın, fotoğrafların magazine düştü.')}else log('Arkadaşlarınla gece hayatına aktın.');sheet('hayat')};

/* ============ Gardırop ============ */
ACT.wear=(cat,id)=>{const L=S.look;
 if(cat==='out'){const o=OUT.find(x=>x.id===id);if(!S.owned.includes(id)){if(!pay(o.p))return;S.owned.push(id);log(`${o.n} aldın (${fmtS(o.p)}).`)}L.outfit=id}
 else if(cat==='oc'){L.oc=L.oc||{};L.oc[L.outfit]=id}
 else if(cat==='acc'){const a=ACCS.find(x=>x.id===id);if(L.acc.includes(id))L.acc=L.acc.filter(x=>x!==id);else{if(!S.accOwned.includes(id)){if(!pay(a.p))return;S.accOwned.push(id);log(`${a.n} aldın (${fmtS(a.p)}).`)}
  const same=L.acc.filter(x=>{const o=ACCS.find(z=>z.id===x);return o&&o.grp===a.grp});if(a.grp==='kolye'){if(same.length>=2)L.acc=L.acc.filter(x=>x!==same[0])}else if(a.grp!=='diger'&&a.grp!=='dovme')L.acc=L.acc.filter(x=>!same.includes(x));L.acc.push(id)}}
 else if(cat==='hair'){if(L.hair===id)return;if(!pay(800))return;L.hair=id}
 else if(cat==='hairColor'){if(L.hairColor===id)return;if(!pay(1200))return;L.hairColor=id}
 else if(cat==='beard'){L.beard=id}
 sheet('gard')};

/* ============ Yıl sonu ============ */
function shares(g){let s={spo:.44,tube:.30,fizzy:.12,pear:.14};if(g==='arabesk'||g==='turku'){s.spo-=.12;s.tube+=.06;s.fizzy+=.06}if(g==='rap'){s.spo+=.05;s.tube-=.05}if(g==='rock'){s.spo+=.04;s.fizzy-=.04}return s}
function trRank(w){if(w<220000)return null;return clamp(Math.round(50-(Math.log10(w)-Math.log10(220000))/(Math.log10(4500000)-Math.log10(220000))*49),1,50)}
function glRank(w){if(w<9e6)return null;return clamp(Math.round(50-(Math.log10(w)-Math.log10(9e6))/(Math.log10(8e7)-Math.log10(9e6))*49),1,50)}
function yearEnd(){
 const pl={spo:0,tube:0,fizzy:0,pear:0};let total=0;const hits=[],per=[],rel=released();
 rel.forEach(s=>{const n=S.age-s.ra,sb=subOf(s);let f=n===0?s.rm/12:(n===1?.42:n===2?.18:n===3?.09:.05)*(1+sb.tail);
  let v=s.pot*f+S.fol*.015/Math.max(1,Math.sqrt(rel.length/5));
  if(n<=1&&ch(.03+sb.vir+Math.max(0,s.q-60)/500+(S.tiktok?.08:0))){v*=RF(2.5,5);s.pot*=1.6;s.viral=true;log(`"${s.t}" viral oldu! Her yerde bu şarkı çalıyor.`,'gold')}
  const sh=shares(s.g),ps={};let tot=0,g=0;PLAT.forEach(p=>{const x=Math.round(v*sh[p.id]*(p.id==='tube'?s.clipM:1));ps[p.id]=x;pl[p.id]+=x;s.tot[p.id]+=x;tot+=x;g+=x*p.rate});
  s.ly=tot;s.total+=tot;total+=tot;
  const wk=tot/Math.max(4,(n===0?s.rm*4.3:52)),r=trRank(wk),gr=glRank(wk);
  if(r&&(!s.peak||r<s.peak))s.peak=r;if(gr&&(!s.gpeak||gr<s.gpeak))s.gpeak=gr;if(r)hits.push([s,r,gr]);
  per.push({s,ps,st:tot,g,r,gr})});
 rel.forEach(x=>{const c=certOf(x.total);if(c>(x.cert==null?-1:x.cert)){x.cert=c;log(`🏅 "${x.t}" ${CERTS[c][1]} plak sertifikası aldı! (${num(CERTS[c][0])} dinlenme)`,'gold')}});
 S.albums.forEach(a=>{const t=S.songs.filter(x=>x.alb===a.n).reduce((q,x)=>q+x.total,0),c=certOf(t,3);if(c>(a.cert==null?-1:a.cert)){a.cert=c;log(`💿 "${a.n}" albümü ${CERTS[c][1]} oldu!`,'gold')}});
 hits.sort((a,b)=>a[1]-b[1]).slice(0,3).forEach(([s,r,gr])=>{log(`"${s.t}" Türkiye Top 50'de #${r} oldu${gr?`, Global listede #${gr}`:''}!`,'good');if(!S.best.tr||r<S.best.tr)S.best.tr=r;if(gr&&(!S.best.gl||gr<S.best.gl))S.best.gl=gr});
 const b={gross:0,writer:0,lab:0,dist:0,rec:0,mgr:0,tax:0,net:0,pl:{},streams:total};
 PLAT.forEach(p=>{b.pl[p.id]={st:pl[p.id],tl:pl[p.id]*p.rate};S.tot[p.id]+=pl[p.id]});S.tot.streams+=total;
 per.forEach(x=>{x.writer=x.g*(WRITERS[x.s.meta.writer]||WRITERS.kendim).pct;const base=x.g-x.writer;
  if(S.contract){x.lab=base*(1-S.contract.roy/100);x.dist=0}else{x.lab=0;x.dist=base*(DIST[x.s.meta.dist]||DIST.yuzde).pct}x.art=base-x.lab-x.dist});
 const artSum=per.reduce((a,x)=>a+x.art,0),recT=S.contract&&S.contract.recoup!==false?Math.min(artSum,S.contract.unrec):0;if(S.contract)S.contract.unrec-=recT;
 per.forEach(x=>{x.rec=artSum?x.art*recT/artSum:0;let a=x.art-x.rec;x.mgr=S.manager?a*S.manager.cut:0;a-=x.mgr;x.tax=a*.2;x.net=a-x.tax;x.gross=x.g;
  ['gross','writer','lab','dist','rec','mgr','tax','net'].forEach(k=>{x.s.mon[k]+=x[k];b[k]+=x[k]});
  x.s.hy.push({age:S.age,st:x.st,pl:x.ps,g:x.g,net:x.net,r:x.r,gr:x.gr});if(x.s.hy.length>60)x.s.hy.shift()});
 S.pend=S.pend||{spo:0,tube:0,fizzy:0,pear:0};const gT=PLAT.reduce((q,p)=>q+b.pl[p.id].tl,0)||1;PLAT.forEach(p=>S.pend[p.id]+=b.net*b.pl[p.id].tl/gT);S.yr.stream+=b.net;S.tot.stream+=b.net;S.tot.all+=b.net;
 if(total>0)log(`Dijital gelir: ${num(total)} dinlenme → brüt ${fmtS(b.gross)}, sana kalan net ${fmtS(b.net)} platform hesaplarında birikti. (Panel → çek)`);
 S.fol+=Math.max(0,total*.0025*(1-S.fol/4e7));
 // giderler
 let exp={yasam:0,ev:0,araba:0};if(S.age>=18){exp.yasam=S.house?120000+S.fame*9000:40000+S.fame*4000}
 S.houses.forEach(id=>{const h=HOUSES.find(x=>x.id===id);exp.ev+=h.rent?(id===S.house?h.rent:0):h.up});S.cars.forEach(id=>exp.araba+=CARS.find(x=>x.id===id).up);
 b.exp=exp;const et=exp.yasam+exp.ev+exp.araba;S.money-=et;if(et>0&&S.age>=18)log(`Yıllık giderlerin: ${fmtS(et)}`,'dim');
 if(S.money<0&&S.age>=18){const i=-S.money*.25;S.money-=i;add('happy',-8);log(`Borç batağındasın! Kredi kartı faizi ${fmtS(i)}.`,'bad')}
 S.lastY=b;S.hist.push({age:S.age,stream:S.yr.stream,gig:S.yr.gig,brand:S.yr.brand,alb:S.yr.alb,streams:total,spo:pl.spo});if(S.hist.length>60)S.hist.shift();
 awardsYear();
}
function ageUp(){if(!S.alive)return;
 if(S.genre&&S.age>=14)yearEnd();
 if(S.contract){const c=S.contract;c.left--;if(c.left<=0){const ms=Math.max(0,c.reqS-c.rel),mc=Math.max(0,c.reqC-(c.clips||0));if(ms||mc){const pen=Math.round(ms*c.adv*.12+mc*c.adv*.08);S.money-=pen;log(`${c.n} sözleşmen bitti. Teslim edilmeyen ${ms} şarkı ve ${mc} klip için cezai şart: ${fmtS(pen)}`,'bad')}else log(`${c.n} sözleşmen sona erdi, tüm taahhütlerini yerine getirdin.`,'good');if(c.unrec>0)log(`Mahsup edilemeyen ${fmtS(c.unrec)} avans silindi.`,'dim');S.contract=null}
  else{const exp=c.reqS*(c.yrs-c.left)/c.yrs;if(c.rel<exp-1&&!S.evq.some(e=>e.id==='sirket'))S.evq.push({id:'sirket',p:{n:c.n,eks:Math.ceil(exp-c.rel)}})}}
 S.age++;S.months=12;S.yr={stream:0,gig:0,brand:0,alb:0};S.posts=0;S.tiktok=0;S.gym=0;S.gigN={};S.smc={};
 marketYear();genChart();
 S.friends.forEach(f=>{f.done=0;f.age=(f.age||S.age)+1;f.yak=clamp(f.yak-(f.trait==='sadik'?1:R(2,5))+(hasF('parti')?5:0));if(f.trait==='destekci')add('happy',1);if(f.trait==='partici'){add('happy',1);add('health',-1)}});
 S.friends.forEach(f=>{if(f.trait==='dedikoducu'&&S.fame>20&&ch(.12)){add('happy',-5);S.fol=Math.round(S.fol*1.01);log(`${f.name} hakkında bir sırrını magazine sızdırdı.`,'bad')}if(f.trait==='para'&&S.money>200000&&ch(.15)){const m=Math.round(S.money*.02);S.money-=m;f.yak=clamp(f.yak+5);log(`${f.name} senden ${fmtS(m)} borç istedi, veremedin hayır diyemedin.`,'dim')}});
 S.friends=S.friends.filter(f=>{if(f.yak<5){log(`${f.name} ile aranız tamamen soğudu.`,'dim');return false}return true});
 if(hasF('havuz'))add('happy',5);if(hasF('sinema'))add('happy',3);if(hasF('akilli'))add('happy',2);if(hasF('heli'))add('happy',4);if(hasF('spor'))add('health',3);
 S.fam.forEach(p=>{p.done=0;p.asked=0;if(p.alive){p.age++;if(p.age>68&&ch((p.age-66)/60)){p.alive=false;add('happy',-25);log(`${p.rel} ${p.name.split(' ')[0]} hayatını kaybetti. Başın sağ olsun.`,'bad')}}});
 S.kids.forEach(k=>{k.age++;k.done=0});if(S.partner){S.partner.age++;S.partner.done=0;S.partner.yak=clamp(S.partner.yak-(S.partner.trait==='sadik'?0:S.partner.trait==='kiskanc'?R(3,8)+(S.fame>40?3:0):R(1,5)));if(S.partner.yak<15&&ch(.5)){log(`${S.partner.name.split(' ')[0]} seni terk etti.`,'bad');add('happy',-15);S.partner=null}}
 // sağlık, mutluluk
 if(S.age>40)add('health',-R(0,Math.round((S.age-35)/6)));else add('health',R(-2,2));
 const h=S.house?HOUSES.find(x=>x.id===S.house):null,car=S.car?CARS.find(x=>x.id===S.car):null;
 S.happy=clamp(S.happy+((55+(h?h.hap:0)+(car?car.pr/2:0)+(S.partner?8:0))-S.happy)*.2+R(-3,3));
 if(S.kons){S.kons--;S.months-=4;S.skill=clamp(S.skill+RF(6,10));if(!S.kons){S.grad=true;log('Konservatuvardan mezun oldun! Diploman ve kulağın artık profesyonel.','gold')}else log('Konservatuvarda bir yılı daha tamamladın.','dim')}
 Object.keys(S.trends).forEach(g=>S.trends[g]=clamp(S.trends[g]+RF(-.12,.12),.6,1.5));
 if(S.age===6)log('İlkokula başladın. Müzik dersini iple çekiyorsun.');
 if(S.age===14&&!S.genre)log('Artık bir müzik türü seçip kariyerine başlayabilirsin. (Kariyer menüsü)','gold');
 if(S.age===18)log('18 yaşına girdin! Barlar, kulüpler ve sözleşmeler artık seni bekliyor.','gold');
 if(S.fol>6e7)S.fol=Math.round(6e7+(S.fol-6e7)*.3);genOffers();calcFame();
 // olaylar
 const pool=EVENTS.filter(e=>e.min<=S.age&&(e.max==null||S.age<=e.max)&&(!e.c||e.c()));
 const n=S.age<6?1:R(1,2);for(let i=0;i<n&&pool.length;i++){const e=pool.splice(Math.floor(Math.random()*pool.length),1)[0];if(e.auto)e.auto();else S.evq.push({id:e.id,p:e.gen?e.gen():{}})}
 // ölüm
 if(S.health<=0||(S.age>72&&ch((S.age-70)/90))||(S.age>45&&S.health<15&&ch(.3))){S.alive=false;log(S.health<=0?'Sağlığın daha fazla dayanamadı. Hayata gözlerini yumdun.':'Uykunda huzur içinde hayata gözlerini yumdun.','bad')}
 calcFame();save();render();if(S.alive&&S.evq.length)showEvent();else if(!S.alive)showDeath()}
function genOffers(){if(!S.genre||S.age<16)return;const f=S.fame;S.offers=S.offers.filter(o=>o.k==='label'&&ch(.3));
 if(!S.contract&&f>=15&&released().length&&ch(.65)){const n=R(1,2);for(let i=0;i<n;i++)genLabel()}
 if(!S.manager&&f>=26&&ch(.4))S.offers.push({id:S.nid++,k:'mgr',n:pick(MANAGERS),cut:pick([.12,.15,.18,.2])});
 if(f>=20){const n=R(0,2)+(S.manager?1:0);for(let i=0;i<n;i++){const w=pick([['Instagram paylaşımı',1,0],['Reklam filmi',3,1],['Marka yüzlüğü',8,1]]);S.offers.push({id:S.nid++,k:'brand',n:pick(BRANDS),w:w[0],m:w[2],pay:Math.max(25000,Math.round(S.fol*RF(.6,1.4)*(1+stil()/30)*w[1]*(S.manager?1.25:1)/1000)*1000)})}}}

/* ============ Olaylar ============ */
const EVENTS=[
 {id:'sirket',min:99,title:'Şirket sabırsızlanıyor',text:p=>`${p.n} arıyor: "Sözleşmeye göre en az ${p.eks} şarkı daha bekliyoruz. Ne zaman teslim edeceksin?"`,ch:[
  {t:'Stüdyoya kapan (3 ay, 2 demo)',fn:()=>{S.months=Math.max(0,S.months-3);for(let k=0;k<2;k++){S.months++;ACT.write()}closeSheet();log('Stüdyoya kapanıp iki yeni demo çıkardın.','good')}},{t:'Oyalamaya çalış',fn:p=>{if(ch(.5)){add('happy',-5);log(`${p.n} avukatları ihtar çekti. Taahhüdü yerine getirmezsen cezai şart işleyecek.`,'bad')}else log(`${p.n} bir yıl daha sabretmeyi kabul etti.`)}}]},
 {id:'tanis',min:16,c:()=>S.genre&&S.fame>=15&&S.friends.length<16,gen:()=>({a:pick(ARTISTS2.filter(n=>!S.friends.some(f=>f.name===n))),g:pick(Object.keys(GENRES))}),title:'Bir sanatçı DM attı',text:p=>`${p.a} sana yazdı: "Şarkılarını çok seviyorum, bir kahve içelim mi?"`,ch:[
  {t:'Buluş',fn:p=>{S.friends.push({id:S.nid++,name:p.a,g:ch(.5)?'e':'k',type:'sanatci',trait:pick(Object.keys(TRAITS)),yak:R(50,70),fame:R(25,90),genre:p.g,done:0,fav:-1});log(`${p.a} ile buluştunuz, hemen kaynaştınız.`,'good')}},{t:'Görmezden gel',fn:()=>{}}]},
 {id:'ninni',min:1,max:4,auto:()=>{S.skill=clamp(S.skill+1);log('Annen ninni söylerken melodiye eşlik ettin. Herkes şaşırdı.','good')}},
 {id:'tencere',min:2,max:6,auto:()=>{log('Mutfakta tencere kapaklarıyla davul çaldın. Komşular pek mutlu değil.','dim')}},
 {id:'yuruyus',min:1,max:2,auto:()=>log('İlk adımlarını attın. Annen ağladı.')},
 {id:'kres',min:3,max:5,auto:()=>{add('happy',3);log('Kreşteki müsamerede en önde sen vardın.','good')}},
 {id:'gosteri',min:7,max:13,title:'Okul gösterisi',text:()=>'Öğretmenin 23 Nisan gösterisinde solo şarkı söylemeni istiyor.',ch:[
  {t:'Söyle',fn:()=>{if(S.skill+R(0,40)>28){S.skill=clamp(S.skill+2);add('happy',6);log('Gösteride herkesi ağlattın. Okulun yıldızı oldun.','good')}else{add('happy',-5);log('Sahnede sesin titredi, arkadaşların güldü.','bad')}}},{t:'Utanıyorum, istemem',fn:()=>log('Gösteriyi seyirciler arasından izledin.','dim')}]},
 {id:'ogretmen',min:8,max:13,auto:()=>{S.skill=clamp(S.skill+2);log('Müzik öğretmenin sende büyük yetenek olduğunu söyledi.','good')}},
 {id:'dayi',min:9,max:15,c:()=>!S.instr.includes('gitar'),auto:()=>{S.instr.push('gitar');log('Dayın sana eski gitarını hediye etti.','good')}},
 {id:'zorba',min:9,max:15,title:'Okulda zorbalık',text:()=>'Sınıftaki zorba, kantinde şarkı mırıldandığın için seninle dalga geçiyor.',ch:[
  {t:'Ona kafa tut',fn:()=>{if(ch(.5)){add('happy',5);log('Zorba bir daha sana bulaşmadı.','good')}else{add('health',-6);log('Kavgada burnun kanadı.','bad')}}},{t:'Öğretmene söyle',fn:()=>log('Öğretmen zorbayı müdüre gönderdi.')},{t:'Görmezden gel',fn:()=>add('happy',-3)}]},
 {id:'cover',min:12,max:17,title:'İlk cover videosu',text:()=>'Odanda telefonla bir cover çektin. Paylaşmak ister misin?',ch:[
  {t:'Paylaş',fn:()=>{const g=R(50,600)*(1+S.skill/30);S.fol+=Math.round(g);log(`Cover videon ${num(g*8)} izlendi! +${num(g)} takipçi`,'good')}},{t:'Utanırım, sil',fn:()=>log('Videoyu sildin. Belki bir gün...','dim')}]},
 {id:'aile',min:14,max:19,title:'Ailen endişeli',text:()=>'Baban "Müzikle karın doymaz, derslerine odaklan" diyor.',ch:[
  {t:'Kararlıyım, müzik yapacağım',fn:()=>{S.fam[1].yak=clamp(S.fam[1].yak-10);S.skill=clamp(S.skill+2);log('Babana kararlı olduğunu söyledin. Aranız biraz bozuldu.')}},{t:'Haklısın baba',fn:()=>{S.fam[1].yak=clamp(S.fam[1].yak+8);log('Babanı dinledin, ama içindeki müzik susmadı.','dim')}}]},
 {id:'ilkask',min:14,max:17,auto:()=>{add('happy',6);log(`${pick(S.g==='e'?NM_K:NM_E)} adında birine âşık oldun. Ona bir şarkı yazdın.`,'good');S.skill=clamp(S.skill+1)}},
 {id:'sinav',min:15,max:17,auto:()=>log(pick(['Liseye geçiş sınavında ortalama bir puan aldın.','Matematik sınavından kaldın ama gitar çalışmayı bırakmadın.','Okul müzik kulübünün başkanı seçildin.']))},
 {id:'diss',min:16,c:()=>S.genre==='rap'&&S.fame>=12,gen:()=>({r:pick(RIVALS)}),title:'Diss geldi!',text:p=>`${p.r} yeni şarkısında sana laf soktu. Sosyal medya cevabını bekliyor.`,ch:[
  {t:'Cevap şarkısı yaz (1 ay)',fn:p=>{S.months=Math.max(0,S.months-1);if(S.skill+R(0,50)>60){const g=Math.round(S.fol*.15+500);S.fol+=g;log(`${p.r}'a cevabın yer yerinden oynattı! +${num(g)} takipçi`,'good')}else{S.fol=Math.round(S.fol*.96);log('Cevap şarkın tutmadı, alay konusu oldun.','bad')}}},{t:'Görmezden gel',fn:p=>log(`${p.r}'ın dissini görmezden geldin.`,'dim')}]},
 {id:'duet',min:16,c:()=>S.fame>=18&&!S.feat,gen:()=>({a:pick(ARTISTS)}),title:'Düet teklifi',text:p=>`${p.a} seninle bir düet yapmak istiyor. Yazacağın bir sonraki şarkı ortak olur.`,ch:[
  {t:'Kabul et',fn:p=>{S.feat=p.a;log(`${p.a} ile düet kararı aldınız.`,'good')}},{t:'Reddet',fn:()=>{}}]},
 {id:'tv',min:16,c:()=>S.fame>=30,title:'Canlı yayın daveti',text:()=>'Akşam kuşağının en çok izlenen programı seni canlı yayına çağırıyor.',ch:[
  {t:'Katıl',fn:()=>{if(ch(.8)){const g=Math.round(S.fol*.06+1000);S.fol+=g;log(`Canlı yayında döktürdün. +${num(g)} takipçi`,'good')}else{add('happy',-6);log('Canlı yayında playback yaptığın ortaya çıktı. Rezil oldun.','bad');S.fol=Math.round(S.fol*.97)}}},{t:'Katılma',fn:()=>{}}]},
 {id:'yarisma',min:15,max:30,c:()=>S.genre&&S.fame<25,title:'Sesin Yeter yarışması',text:()=>'Ülkenin en büyük ses yarışmasının seçmelerine çağrıldın.',ch:[
  {t:'Seçmelere git',fn:()=>{if(S.skill+R(0,40)>58){S.fol+=25000;const m=250000;S.money+=m;log('Finale kadar çıktın! +25 B takipçi, ₺250 B ödül.','gold')}else log('Jüri seni bu sefer geçirmedi.','bad')}},{t:'Gitme',fn:()=>{}}]},
 {id:'fan',min:14,c:()=>S.fame>=8,auto:()=>{const g=Math.round(S.fol*.05+100);S.fol+=g;log(`Bir hayranın senin adına fan sayfası açtı. +${num(g)} takipçi`,'good')}},
 {id:'telefon',min:14,c:()=>S.money>40000,auto:()=>{S.money-=35000;log('Metrobüste telefonun çalındı. Yenisi ₺35 B.','bad')}},
 {id:'magazin',min:18,c:()=>S.fame>=35,title:'Paparazzi',text:()=>'Gece çıkışında paparazziye yakalandın. Kameralar üstünde!',ch:[
  {t:'Gülümse, el salla',fn:()=>{S.fol=Math.round(S.fol*1.02);log('Paparazzi videon sevimli bulundu.','good')}},{t:'Kameraya tepki göster',fn:()=>{if(ch(.5)){S.fol=Math.round(S.fol*1.06);add('happy',-5);log('Tepkin viral oldu ama moralin bozuldu.')}else{S.fol=Math.round(S.fol*.96);add('happy',-10);log('Linç yedin, iki gün trend oldun.','bad')}}}]},
 {id:'sahte',min:17,max:30,c:()=>!S.manager&&S.money>200000,title:'Menajerlik teklifi',text:()=>'"Seni üç ayda yıldız yaparım" diyen biri ₺150 B "tanıtım ücreti" istiyor.',ch:[
  {t:'Öde',fn:()=>{S.money-=150000;log('Adam parayı alıp kayıplara karıştı. Dolandırıldın.','bad')}},{t:'Kibarca reddet',fn:()=>log('İçgüdülerin seni kurtardı.','good')}]},
 {id:'telif',min:18,c:()=>released().length>2&&S.fame>=25,gen:()=>({a:pick(ARTISTS)}),title:'Şarkın çalındı',text:p=>`${p.a}'ın yeni hiti, senin bir şarkının nakaratıyla neredeyse aynı.`,ch:[
  {t:'Telif davası aç (₺500 B)',fn:p=>{if(!pay(500000))return;if(ch(.55)){const m=R(3,8)*1e6;S.money+=m;log(`Davayı kazandın! ${fmtS(m)} tazminat.`,'gold')}else log('Mahkeme benzerliği tesadüf saydı. Davayı kaybettin.','bad')}},{t:'Boş ver',fn:()=>add('happy',-4)}]},
 {id:'ses',min:18,c:()=>S.genre&&S.age>=20,auto:()=>{add('health',-8);S.months=Math.max(0,S.months-1);log('Ses tellerinde nodül çıktı. Bir ay dinlenmen gerekti.','bad')}},
 {id:'vergi',min:20,c:()=>S.money>5e6,title:'Vergi incelemesi',text:()=>'Maliye geçmiş yıllarının gelirlerini incelemeye aldı.',ch:[
  {t:'Mali müşavir tut (₺300 B)',fn:()=>{S.money-=300000;log('Müşavirin her şeyi düzene soktu.','good')}},{t:'Kendin hallet',fn:()=>{if(ch(.5)){const m=Math.round(S.money*.05);S.money-=m;log(`Eksik beyan cezası: ${fmtS(m)}`,'bad')}else log('İnceleme temiz çıktı.','good')}}]},
 {id:'yardim',min:22,c:()=>S.money>1e6&&S.fam.some(p=>p.alive),title:'Ailen arıyor',text:()=>'Ailen evin tadilatı için yardım istiyor.',ch:[
  {t:'₺500 B gönder',fn:()=>{S.money-=500000;S.fam.forEach(p=>p.yak=clamp(p.yak+10));add('happy',5);log('Ailene destek oldun, gözleri doldu.','good')}},{t:'Şu an olmaz',fn:()=>S.fam.forEach(p=>p.yak=clamp(p.yak-6))}]},
 {id:'hayranevlen',min:18,c:()=>S.fame>=40,auto:()=>log('Konserde bir hayranın sahneye çıkıp sana evlenme teklif etti. Salon kahkahaya boğuldu.','dim')},
 {id:'yorgun',min:25,c:()=>S.happy<40,title:'Tükenmişlik',text:()=>'Sürekli çalışmaktan yoruldun. Psikoloğun bir mola önerdi.',ch:[
  {t:'Bir yıl mola ver',fn:()=>{S.months=Math.max(0,S.months-6);add('happy',20);add('health',8);log('Altı ay kendine vakit ayırdın.','good')}},{t:'Devam et',fn:()=>add('health',-6)}]},
];
function showEvent(){const q=S.evq[0];if(!q)return;const e=EVENTS.find(x=>x.id===q.id);
 $('mod').innerHTML=`<div class="box"><div class="eh">Yaş ${S.age}</div><h2>${e.title}</h2><p>${esc(e.text(q.p))}</p>${S.star&&EVSTAR[e.id]?`<button class="btn star" onclick="pickEv('star')">⭐ ${EVSTAR[e.id][0]}</button>`:''}${e.ch.map((c,i)=>`<button class="btn ${i?'sec':''}" onclick="pickEv(${i})">${c.t}</button>`).join('')}</div>`;$('mod').classList.add('on')}
function pickEv(i){const q=S.evq.shift(),e=EVENTS.find(x=>x.id===q.id);$('mod').classList.remove('on');if(i==='star')EVSTAR[e.id][1](q.p);else e.ch[i].fn(q.p);S.fol=Math.round(S.fol);calcFame();save();render();if(S.evq.length)setTimeout(showEvent,150)}
function showDeath(){const best=[...S.songs].sort((a,b)=>b.total-a.total)[0];
 $('mod').innerHTML=`<div class="box dead"><div class="av big">${AV(S.look,S.age)}</div><h2>${esc(S.first)} ${esc(S.last)}</h2><p class="eh">${S.age} yaşında hayata veda etti</p>
 <div class="kv"><div>Unvan<b>${title()}</b></div><div>Takipçi<b>${num(S.fol)}</b></div><div>Toplam dinlenme<b>${num(S.tot.streams)}</b></div><div>Servet<b>${fmtS(S.money)}</b></div><div>En büyük hit<b>${best?esc(best.t):'—'}</b></div><div>Ödüller<b>${S.awards.length}</b></div><div>En iyi TR sırası<b>${S.best.tr?'#'+S.best.tr:'—'}</b></div><div>Albümler<b>${S.albums.length}</b></div></div>
 <button class="btn" onclick="restart()">Yeni hayat</button></div>`;$('mod').classList.add('on')}
function restart(){try{localStorage.removeItem(KEY)}catch(e){}S=null;$('mod').classList.remove('on');closeSheet();boot()}
