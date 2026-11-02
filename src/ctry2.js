/* ============ Yeni ülkeler: Almanya, Güney Kore, Fransa — para birimi, vergi, banka, borsa, evler, isimler, şarkı adları ============ */
Object.assign(CTRY,{
 de:{n:'Almanya',fl:'🇩🇪',cur:'€',rate:49,stream:1.5,market:1.5,carF:.6,
  cities:[['Berlin',"Berlin'de"],['Hamburg',"Hamburg'da"],['Münih',"Münih'te"],['Köln',"Köln'de"],['Frankfurt',"Frankfurt'ta"]],
  tax:y=>y<12096?[0,'vergisiz dilim']:y<68480?[.3,'%14–42 kademeli']:y<277826?[.42,'%42 gelir vergisi']:[.45,'%45 gelir vergisi'],
  taxD:'Gelir vergisi kademeli: €12 B\'ye kadar vergisiz, €68 B\'ye kadar %14\'ten %42\'ye yükselir, €278 B\'ye kadar %42, üstü %45. Yıl içinde sanatçı ödemelerinden %16 kesilir.'},
 kr:{n:'Güney Kore',fl:'🇰🇷',cur:'₩',rate:.03,stream:1.2,market:1.3,carF:.5,
  cities:[['Seul',"Seul'de"],['Busan',"Busan'da"],['Incheon',"Incheon'da"],['Daegu',"Daegu'da"]],
  tax:y=>y<14e6?[.06,'%6 gelir vergisi']:y<50e6?[.15,'%15 gelir vergisi']:y<88e6?[.24,'%24 gelir vergisi']:y<150e6?[.35,'%35 gelir vergisi']:y<300e6?[.38,'%38 gelir vergisi']:y<500e6?[.4,'%40 gelir vergisi']:y<1e9?[.42,'%42 gelir vergisi']:[.45,'%45 gelir vergisi'],
  taxD:'Gelir vergisi 8 kademeli: ₩14 Mn\'a kadar %6, ₩50 Mn\'a kadar %15, ₩88 Mn\'a kadar %24, ₩150 Mn\'a kadar %35, ₩300 Mn\'a kadar %38, ₩500 Mn\'a kadar %40, ₩1 Mr\'a kadar %42, üstü %45. Serbest sanatçı ödemelerinden yıl içinde sadece %3,3 kesilir; büyük fark yıl sonu beyannamesinde çıkar.'},
 fr:{n:'Fransa',fl:'🇫🇷',cur:'€',rate:49,stream:1.35,market:1.3,carF:.65,
  cities:[['Paris',"Paris'te"],['Marsilya',"Marsilya'da"],['Lyon',"Lyon'da"],['Nice',"Nice'te"],['Bordeaux',"Bordeaux'da"]],
  tax:y=>y<11497?[0,'vergisiz dilim']:y<29315?[.11,'%11 gelir vergisi']:y<83823?[.3,'%30 gelir vergisi']:y<180294?[.41,'%41 gelir vergisi']:[.45,'%45 gelir vergisi'],
  taxD:'Gelir vergisi kademeli: €11,5 B\'ye kadar vergisiz, €29 B\'ye kadar %11, €84 B\'ye kadar %30, €180 B\'ye kadar %41, üstü %45. Yıl içinde sanatçı ödemelerinden %15 kesilir.'}});
Object.assign(NAMES,{
 de:{e:['Lukas','Leon','Finn','Jonas','Max','Paul','Elias','Noah','Felix','Tim','Ben','Luca','Moritz','Niklas','Jan','Tom'],k:['Mia','Emma','Hannah','Lena','Leonie','Sophie','Lea','Anna','Lara','Marie','Lina','Nele','Johanna','Clara','Amelie','Luisa'],s:['Müller','Schmidt','Schneider','Fischer','Weber','Meyer','Wagner','Becker','Schulz','Hoffmann','Koch','Richter','Klein','Wolf','Neumann','Schwarz']},
 kr:{e:['Min-jun','Seo-jun','Do-yun','Ji-ho','Ha-jun','Ye-jun','Si-woo','Ju-won','Jun-seo','Hyun-woo','Tae-yang','Ji-hoon','Dong-hyun','Sung-min','Ki-tae','Woo-jin'],k:['Seo-yeon','Ji-woo','Ha-eun','Min-seo','Ji-min','Su-a','Ye-rin','Chae-won','Da-eun','Yu-na','Ha-yoon','So-mi','Eun-ji','Na-rae','Ji-a','Hye-jin'],s:['Kim','Lee','Park','Choi','Jung','Kang','Cho','Yoon','Jang','Lim','Han','Oh','Seo','Shin','Kwon','Hwang']},
 fr:{e:['Lucas','Hugo','Léo','Gabriel','Louis','Nathan','Jules','Théo','Enzo','Mathis','Noah','Tom','Raphaël','Arthur','Adam','Maël'],k:['Emma','Léa','Chloé','Manon','Camille','Inès','Louise','Jade','Zoé','Lina','Sarah','Juliette','Alice','Lola','Anaïs','Clara'],s:['Martin','Bernard','Dubois','Thomas','Robert','Richard','Petit','Durand','Leroy','Moreau','Simon','Laurent','Lefebvre','Michel','Garcia','Roux']}});
['de','kr','fr'].forEach(k=>{NAMES[k].ae=NAMES[k].e;NAMES[k].ak=NAMES[k].k});
/* vergi (tax.js) */
Object.assign(BR,{de:[[12096,0],[17443,.14],[68480,.3],[277825,.42],[Infinity,.45]],kr:[[14e6,.06],[50e6,.15],[88e6,.24],[150e6,.35],[300e6,.38],[500e6,.4],[1e9,.42],[Infinity,.45]],fr:[[11497,0],[29315,.11],[83823,.3],[180294,.41],[Infinity,.45]]});
Object.assign(CORP,{de:.3,kr:.21,fr:.25});Object.assign(WH,{de:.16,kr:.033,fr:.15});
/* banka */
Object.assign(BANKS,{de:['Rhein Bank','#1a3a8a','#2b6cb0'],kr:['Hanbit Bank','#0a6e5a','#16a085'],fr:['Banque Lumière','#1d3c8f','#7b3fb8']});
Object.assign(RATES,{de:{loan:.07,dep:.015,vad:.03,gv:.025},kr:{loan:.06,dep:.02,vad:.035,gv:.03},fr:{loan:.065,dep:.015,vad:.03,gv:.025}});
FUNDS.forEach(f=>{f.mu.de=f.mu.uk;f.mu.fr=f.mu.uk;f.mu.kr=f.mu.us});
/* borsa */
Object.assign(EXN,{de:'🇩🇪 Frankfurt Borsası (DAX)',kr:'🇰🇷 Kore Borsası (KOSPI)',fr:'🇫🇷 Paris Borsası (Euronext)'});
[{id:'RHNB',n:'Rhein Bank AG',mu:.06,sg:.18,ex:'de'},{id:'AUTW',n:'Autowerk AG',mu:.08,sg:.25,ex:'de'},{id:'BRLN',n:'Berlin Tech SE',mu:.12,sg:.33,ex:'de'},{id:'NRDW',n:'Nordwind Energie',mu:.1,sg:.3,ex:'de'},{id:'MDMX',n:'MediaMax Gruppe',mu:.09,sg:.28,ex:'de'},{id:'HNSA',n:'Hansa Logistik',mu:.06,sg:.2,ex:'de'},
 {id:'HANB',n:'Hanbit Electronics',mu:.11,sg:.3,ex:'kr'},{id:'SEOM',n:'Seoul Motors',mu:.08,sg:.26,ex:'kr'},{id:'KSTR',n:'K-Star Entertainment',mu:.14,sg:.42,ex:'kr'},{id:'GLXY',n:'Galaxy Chem',mu:.09,sg:.3,ex:'kr'},{id:'BSAN',n:'Busan Shipbuilding',mu:.07,sg:.28,ex:'kr'},{id:'NAVR',n:'Navi Web',mu:.13,sg:.36,ex:'kr'},
 {id:'LUMB',n:'Banque Lumière',mu:.06,sg:.18,ex:'fr'},{id:'ELGN',n:'Élégance Luxe',mu:.1,sg:.26,ex:'fr'},{id:'PRSA',n:'Paris Aéro',mu:.08,sg:.3,ex:'fr'},{id:'VNCO',n:'Vinco Énergie',mu:.09,sg:.28,ex:'fr'},{id:'MDSN',n:'Média Seine',mu:.1,sg:.32,ex:'fr'},{id:'RDFR',n:'Rail de France',mu:.05,sg:.16,ex:'fr'}].forEach(x=>{if(!STOCKS.some(s=>s.id===x.id))STOCKS.push(x)});
/* şirket satın alma ve rakipler */
Object.assign(ACQN2,{de:['Rheinklang Records','Berlin Beats GmbH','Hansa Sound','Schwarzwald Music','Elbe Records','Alpen Tonstudio','Spree Music Group','Ruhrpott Records'],
 kr:['Hangang Entertainment','Seoul Star Ent.','Blue Ocean Music','Namsan Records','K-Wave Entertainment','Gangnam Sound','Jeju Music House','Han River Ent.'],
 fr:['Lumière Records','Seine Musique','Riviera Sound','Montmartre Records','Bastille Beats','Atlantique Music','Éclat Musique','Provence Records']});
Object.assign(RIV2,{de:['Leon Krüger','Mia Stern','Finn Nacht','Lena Wolf','Jonas Blitz','Hannah Licht','Max Beton','Sophie Berg','Elias Falk','Lara Nova','Paul Donner','Nele Rose'],
 kr:['Taeyang','Jisoo','Minho','Yuna','Ji-ho Kang','Haneul','Jiwoo','Seo-jun Park','Lee Haru','Kim Dahyun','Choi Jiho','Han Seol'],
 fr:['Lucas Noir','Léa Lune','Hugo Soleil','Chloé Rivière','Théo Flamme','Manon Étoile','Enzo Ciel','Camille Rose','Jules Marbre','Inès Nuit','Gabriel Orage','Zoé Vague']});
const RIVF2=new Set(['Mia Stern','Lena Wolf','Hannah Licht','Sophie Berg','Lara Nova','Nele Rose','Jisoo','Yuna','Haneul','Jiwoo','Lee Haru','Kim Dahyun','Han Seol','Léa Lune','Chloé Rivière','Manon Étoile','Camille Rose','Inès Nuit','Zoé Vague']);
{const _ri=rivInit;rivInit=function(){const ct=S.ct||'tr',had=!!(S.rivals&&S.rivCt===ct);_ri();if(!had&&S.rivals&&['de','kr','fr'].includes(ct)){S.rivals.forEach(r=>{const g=RIVF2.has(r.name)?'k':'e';if(r.g!==g){r.g=g;r.look=randLook(g)}});genChart()}}}
/* konser pazarları */
if(!MARKETS.some(m=>m[0]==='fr'))MARKETS.push(['fr','Fransa','🇫🇷',35,1.3]);if(!MARKETS.some(m=>m[0]==='kr'))MARKETS.push(['kr','Güney Kore','🇰🇷',50,1.7]);
/* evler */
HOUSES.push({id:'de_apt',c:'de',n:'Kiralık daire',loc:'Kreuzberg, Berlin',ic:'🏢',rent:1.4e6,p:0,up:0,hap:5},{id:'de_loft',c:'de',n:'Loft daire',loc:'Mitte, Berlin',ic:'🏙',rent:3.5e6,p:0,up:0,hap:9},
 {id:'de_altbau',c:'de',n:'Altbau daire',loc:'Prenzlauer Berg',ic:'🏘',rent:0,p:60e6,up:1.2e6,hap:14},{id:'de_villa',c:'de',n:'Elbe villası',loc:'Blankenese, Hamburg',ic:'🏡',rent:0,p:700e6,up:12e6,hap:26},
 {id:'de_alp',c:'de',n:'Alp dağ evi',loc:'Garmisch',ic:'🏔',rent:0,p:220e6,up:3.5e6,hap:13,second:true},{id:'de_schloss',c:'de',n:'Bavyera şatosu',loc:'Münih yakını',ic:'🏰',rent:0,p:1.6e9,up:24e6,hap:35},
 {id:'kr_off',c:'kr',n:'Officetel',loc:'Gangnam, Seul',ic:'🏢',rent:1.2e6,p:0,up:0,hap:5},{id:'kr_han',c:'kr',n:'Han Nehri manzaralı daire',loc:'Yongsan, Seul',ic:'🏙',rent:3.2e6,p:0,up:0,hap:9},
 {id:'kr_apt',c:'kr',n:'Gangnam apartmanı',loc:'Gangnam, Seul',ic:'🏘',rent:0,p:70e6,up:1.4e6,hap:14},{id:'kr_villa',c:'kr',n:'Hannam-dong villası',loc:'Hannam-dong, Seul',ic:'🏡',rent:0,p:600e6,up:11e6,hap:25},
 {id:'kr_jeju',c:'kr',n:'Jeju adası evi',loc:'Jeju',ic:'🏝',rent:0,p:180e6,up:3e6,hap:13,second:true},{id:'kr_mans',c:'kr',n:'Seongbuk-dong malikanesi',loc:'Seongbuk-dong, Seul',ic:'🏛',rent:0,p:1.5e9,up:22e6,hap:34},
 {id:'fr_apt',c:'fr',n:'Kiralık daire',loc:'Le Marais, Paris',ic:'🏢',rent:1.6e6,p:0,up:0,hap:5},{id:'fr_loft',c:'fr',n:'Loft daire',loc:'Bastille, Paris',ic:'🏙',rent:3.8e6,p:0,up:0,hap:9},
 {id:'fr_hauss',c:'fr',n:'Haussmann daire',loc:'8. arrondissement, Paris',ic:'🏘',rent:0,p:110e6,up:2e6,hap:15},{id:'fr_chateau',c:'fr',n:'Bordeaux şatosu',loc:'Bordeaux bağları',ic:'🏰',rent:0,p:350e6,up:6e6,hap:18},
 {id:'fr_riviera',c:'fr',n:'Côte d\'Azur villası',loc:'Saint-Tropez',ic:'🏖',rent:0,p:500e6,up:8e6,hap:14,second:true},{id:'fr_hotel',c:'fr',n:'Hôtel particulier',loc:'16. arrondissement, Paris',ic:'🏛',rent:0,p:1.4e9,up:21e6,hap:34});
RET.push(['de_flat','Daire',['Kreuzberg','Mitte','Schwabing','Altona'],[20e6,70e6],.04,'🏢','de'],['de_villa','Villa',['Grünwald','Blankenese','Dahlem'],[120e6,500e6],.03,'🏡','de'],['de_shop','Dükkân',['Kurfürstendamm','Maximilianstraße','Zeil'],[50e6,300e6],.055,'🏪','de'],
 ['kr_apt','Apartman dairesi',['Gangnam','Mapo','Songpa','Haeundae'],[25e6,90e6],.035,'🏢','kr'],['kr_villa','Villa',['Hannam-dong','Pyeongchang-dong','Seongbuk-dong'],[150e6,700e6],.03,'🏡','kr'],['kr_shop','Dükkân',['Myeongdong','Garosu-gil','Hongdae'],[40e6,250e6],.06,'🏪','kr'],
 ['fr_flat','Daire',['Le Marais','Montmartre','Saint-Germain','Vieux Lyon'],[25e6,90e6],.035,'🏢','fr'],['fr_villa','Villa',['Saint-Tropez','Cap Ferrat','Neuilly'],[150e6,650e6],.03,'🏡','fr'],['fr_shop','Dükkân',['Champs-Élysées','Rue Saint-Honoré','La Canebière'],[50e6,300e6],.055,'🏪','fr']);
/* şarkı isimleri: ülkenin dilinde */
const WORDS_L={
 de:{rap:[['Beton','Mitternacht','Kalte','Echte','Schwarze','Goldene','Block','Loyal','Graue','Harte'],['Könige','Straßen','Flow','Geld','Spiel','Leben','Regeln','Bars','Nächte','Jungs']],
  pop:[['Neon','Sommer','Goldene','Elektrische','Süße','Wilde','Letzte','Ewige','Rote','Blaue'],['Nacht','Liebe','Träume','Lichter','Stadt','Herzen','Tage','Sterne','Zeit','Küsse']],
  arabesk:[['Gebrochenes','Stille','Letzte','Bittere','Verlorene','Einsame','Kalte','Ferne'],['Herz','Tränen','Nacht','Regen','Sehnsucht','Abschied','Erinnerung','Liebe']],
  rock:[['Donner','Eisen','Schwarze','Wilde','Brennende','Rebellen','Letzte','Freie'],['Straße','Sturm','Revolution','Maschine','Feuer','Seele','Nacht','Himmel']],
  turku:[['Berg','Fluss','Alte','Heimat','Dorf','Nordische','Ferne','Grüne'],['Lied','Wind','Weg','Felder','Ballade','Geschichte','Heimkehr','Weide']]},
 fr:{rap:[['Rues','Minuit','Béton','Argent','Rois','Flow','Bloc','Jeu','Nuits','Vie'],['de la cité','sans règles','de minuit','en or','du bloc','sans pitié','de la rue','du ghetto','en bas','sans fin']],
  pop:[['Nuit','Cœur','Lumière','Été','Rêve','Ville','Étoile','Amour','Danse','Soleil'],['de Paris','sans fin','de néon','en feu','électrique','du sud','infini','sans toi','de minuit','en or']],
  arabesk:[['Larmes','Cœur','Nuit','Adieu','Pluie','Silence','Lettre','Chagrin'],['sans toi','de novembre','du dernier soir','en silence','sans fin','de l\'exil','d\'hiver','sans retour']],
  rock:[['Tonnerre','Route','Tempête','Machine','Feu','Révolution','Cri','Moteur'],['de fer','sans fin','du nord','en feu','de minuit','sauvage','de la nuit','sans frein']],
  turku:[['Chanson','Vent','Chemin','Vallée','Ballade','Terre','Rivière','Berger'],['du village','des montagnes','de la rivière','du nord','des champs','de chez nous','d\'automne','du pays']]},
 kr:{rap:[['거리의','차가운','검은','황금','미친','진짜','밤의','우리'],['왕','돈','밤','게임','이야기','불꽃','규칙','형제']],
  pop:[['밤의','여름','네온','달빛','첫','마지막','푸른','우리','빛나는','전기'],['사랑','꿈','노래','별','바다','약속','기억','춤','심장','도시']],
  arabesk:[['이별의','슬픈','마지막','조용한','잊은','차가운','먼'],['눈물','비','밤','편지','그리움','안녕','기억']],
  rock:[['천둥','검은','거친','불타는','철의','자유의','마지막'],['길','폭풍','혁명','심장','엔진','하늘','밤']],
  turku:[['산의','강의','옛','고향의','북쪽','푸른','먼'],['노래','바람','길','들','이야기','아리랑','봄']]}};
{const _gt=genTitle;genTitle=function(g){const ct=S&&S.ct;if(ct&&WORDS_L[ct]){const w=WORDS_L[ct][g]||WORDS_L[ct].pop;return pick(w[0])+' '+pick(w[1])}return _gt(g)}}
