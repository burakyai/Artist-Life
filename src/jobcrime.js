/* ============ Yarı zamanlı işler + sokak suçları (polis, mahkeme, cezaevi, sabıka) ============ */
const PTJOBS=[
 {id:'kurye',n:'Yemek kuryesi',ic:'🛵',age:16,pay:[14000,26000],hp:-2,hl:-3,d:'Motorla sipariş dağıt · bahşiş şansı'},
 {id:'garson',n:'Garson',ic:'🍽',age:16,pay:[12000,22000],hp:-2,hl:-1,d:'Kafede servis · müşteri şarkını duyabilir'},
 {id:'kasiyer',n:'Market kasiyeri',ic:'🛒',age:16,pay:[11000,17000],hp:-3,hl:0,d:'Sabit ve sıkıcı'},
 {id:'barista',n:'Barista',ic:'☕',age:16,pay:[12000,19000],hp:-1,hl:0,d:'Kahve yap · takipçi kazanma şansı'},
 {id:'bakici',n:'Bebek bakıcısı',ic:'🍼',age:16,pay:[10000,20000],hp:-2,hl:-1,d:'Komşunun çocuğuna bak'},
 {id:'temizlik',n:'Temizlik görevlisi',ic:'🧹',age:16,pay:[11000,16000],hp:-3,hl:-2,d:'Ofis ve stüdyo temizliği'},
 {id:'depo',n:'Depo işçisi',ic:'📦',age:18,pay:[16000,28000],hp:-3,hl:-4,d:'Ağır iş · iyi para'},
 {id:'dj',n:'Düğün DJ\'i',ic:'🎧',age:18,pay:[20000,45000],hp:1,hl:-1,d:'Hafta sonu düğünler · müzik çevresi'},
 {id:'studyo',n:'Stüdyo asistanı',ic:'🎚',age:17,pay:[9000,15000],hp:1,hl:0,d:'Az para · yetenek ↑'},
 {id:'kaset',n:'Plakçıda tezgâhtar',ic:'💿',age:16,pay:[10000,15000],hp:1,hl:0,d:'Müzik zevki · yetenek ↑ biraz'}];
const CRIMES=[
 {id:'kapkac',n:'Telefon kapkaç',ic:'📱',age:14,risk:.18,loot:[3000,15000],heat:6,yrs:[0,1],cred:1,d:'Az para · düşük risk'},
 {id:'market',n:'Market soygunu',ic:'🏪',age:16,risk:.3,loot:[15000,60000],heat:12,yrs:[1,3],cred:3,d:'Kasa boşaltma'},
 {id:'ev',n:'Ev soy',ic:'🏠',age:16,risk:.26,loot:[30000,200000],heat:10,yrs:[1,4],cred:3,d:'Gece, sahibi yokken'},
 {id:'araba',n:'Araba çal',ic:'🚗',age:16,risk:.3,loot:[80000,400000],heat:14,yrs:[2,5],cred:4,d:'Parçacıya sat'},
 {id:'torba',n:'Uyuşturucu sat',ic:'💊',age:16,risk:.24,loot:[40000,250000],heat:12,yrs:[3,8],cred:5,d:'Mahallede satış · yüksek ceza'},
 {id:'dolandir',n:'İnternet dolandırıcılığı',ic:'💻',age:18,risk:.2,loot:[50000,500000],heat:9,yrs:[2,6],cred:1,d:'Sahte ilanlar'},
 {id:'kuyumcu',n:'Kuyumcu soygunu',ic:'💎',age:18,risk:.45,loot:[500000,4000000],heat:30,yrs:[5,12],cred:8,d:'Büyük vurgun · çok yüksek risk'}];
function jcInit(){S.cr=S.cr||{heat:0,rec:[],jail:null,done:0};S.job=S.job||null}
const jailed=()=>S&&S.cr&&S.cr.jail;
/* ---------- iş ---------- */
ACT.jobTake=id=>{jcInit();if(jailed()){toast('Cezaevindesin.');return}const j=PTJOBS.find(x=>x.id===id);if(S.age<j.age){toast(`Bu iş için ${j.age} yaşında olmalısın.`);return}
 if(S.cr.rec.length&&['bakici','kasiyer'].includes(id)&&ch(.6)){toast('Sabıkan çıktı, işe almadılar.');return}if(S.job&&S.job.id===id)return;S.job={id,since:S.qt,q:0};log(`${j.ic} ${j.n} olarak işe başladın. Her 3 ayda 2 hakkın işe gidiyor.`,'good');drawSheet()};
ACT.jobQuit=()=>{if(!S.job)return;const j=PTJOBS.find(x=>x.id===S.job.id);log(`${j.n} işinden ayrıldın.`,'dim');S.job=null;drawSheet()};
ACT.jobShift=()=>{jcInit();if(!S.job)return;if(jailed())return;if(!useM(1))return;const j=PTJOBS.find(x=>x.id===S.job.id),x=Math.round(RF(j.pay[0],j.pay[1])*.5/100)*100;S.money+=x;S.tot.all+=x;add('happy',-1);log(`${j.ic} Ek mesai yaptın: +${fmtS(x)}.`,'dim');drawSheet()};
function jobQ(){if(!S.job||jailed())return;const j=PTJOBS.find(x=>x.id===S.job.id);if(!j){S.job=null;return}
 if(S.fame>=45&&!S.star){log(`${j.n} işini bıraktın; artık tanınıyorsun ve müzikten para kazanıyorsun.`,'good');S.job=null;return}
 S.months=Math.max(0,S.months-2);S.job.q++;const pay=Math.round(RF(j.pay[0],j.pay[1])*(1+Math.min(S.job.q,12)*.02)/100)*100;let note='';
 let tot=pay;if(j.id==='kurye'&&ch(.35)){const t=R(1500,6000);tot+=t;note=` +${fmtS(t)} bahşiş`}if(j.id==='dj'&&ch(.25)){S.fol+=R(50,400);note=' · düğünde birkaç kişi seni takip etti'}
 if(j.id==='barista'&&ch(.15)){S.fol+=R(20,200);note=' · bir müşteri hikâyesinde paylaştı'}if(j.id==='garson'&&S.fame>8&&ch(.1)){note=' · bir müşteri seni tanıdı'}
 if(j.id==='studyo'){S.skill=clamp(S.skill+RF(.6,1.4));note=' · prodüktörlerden bir şeyler kaptın'}if(j.id==='kaset')S.skill=clamp(S.skill+.3);
 S.money+=tot;S.tot.all+=tot;add('happy',j.hp);add('health',j.hl);log(`${j.ic} ${j.n}: 3 aylık maaş ${fmtS(tot)}${note}.`,'dim');
 if(ch(.04)){S.job=null;log(`${j.n} işinden çıkarıldın. Patron müziğe fazla kafa yorduğunu düşünüyor.`,'bad')}}
/* ---------- suç ---------- */
ACT.crime=id=>{jcInit();if(jailed()){toast('Cezaevindesin.');return}const c=CRIMES.find(x=>x.id===id);if(S.age<c.age){toast('Bunun için daha çok küçüksün.');return}if(!useM(1))return;
 const sec=(typeof SEC!=='undefined'&&S.sec)?0:0,p=clamp(c.risk+S.cr.heat/250+(S.fame>40?.08:0)-(S.star?.5:0),.02,.9);
 S.cr.done++;if(ch(p)){caught(c);return}
 const loot=Math.round(RF(c.loot[0],c.loot[1])/100)*100;S.money+=loot;S.cr.heat=clamp(S.cr.heat+c.heat);S.crimeE=(S.crimeE||0)+loot;add('happy',R(-2,3));
 if(S.genre==='rap'){S.cr.cred=(S.cr.cred||0)+c.cred}
 log(`${c.ic} ${c.n}: ${pick(['Kimse görmedi.','Hızlıca uzaklaştın.','Sorunsuz geçti.','Kalbin yerinden çıkacaktı ama başardın.'])} Eline ${fmtS(loot)} geçti. Polis dikkati %${Math.round(S.cr.heat)}.`,'bad');
 if(S.fame>25&&ch(.12)){S.fol=Math.round(S.fol*.94);log('Magazin "ünlü rapçinin karanlık geçmişi" diye haber yaptı. Takipçi kaybettin.','bad')}drawSheet()};
function caught(c){const yrs=R(c.yrs[0],c.yrs[1]),fine=Math.round(Math.max(20000,c.loot[1]*.4)/1000)*1000;add('happy',-12);S.cr.heat=clamp(S.cr.heat+15);
 log(`🚨 ${c.n} sırasında polise yakalandın! Gözaltına alındın.`,'bad');S.evq.push({id:'mahkeme',p:{c:c.id,yrs,fine}});
 if(S.fame>15){S.fol=Math.round(S.fol*(S.genre==='rap'?.97:.85));log(S.genre==='rap'?'Haber her yerde. Bazı hayranlar "sokaktan gelen gerçek rapçi" diyor, bazıları takipten çıktı.':'Gözaltı haberi bütün magazinde. Çok sayıda hayran takipten çıktı.','bad')}
 closeSheet();showEvent()}
EVENTS.push({id:'mahkeme',min:99,c:()=>false,title:'Mahkeme',text:p=>{const c=CRIMES.find(x=>x.id===p.c);return `${c.n} suçundan hakim karşısındasın. Savcı ${p.yrs?p.yrs+' yıl hapis':'adli para cezası'} istiyor.${S.cr.rec.length?` Önceden ${S.cr.rec.length} sabıkan var, bu durumunu zorlaştırıyor.`:''}`},ch:[
 {t:'İyi bir avukat tut (₺)',fn:p=>{const fee=Math.round((150000+p.yrs*120000)*(S.lawyer?.5:1));S.money-=fee;const win=ch(.35+(S.lawyer||0)*.15-S.cr.rec.length*.07);verdict(p,win?0:Math.max(0,p.yrs-R(1,2)),`Avukat ücreti ${fmtS(fee)}. `)}},
 {t:'Suçunu kabul et (indirim)',fn:p=>verdict(p,Math.max(0,Math.floor(p.yrs*.6)),'Suçunu kabul ettin, ceza indirimi aldın. ')},
 {t:'Kendini savun',fn:p=>{const win=ch(.15-S.cr.rec.length*.04);verdict(p,win?0:p.yrs+(ch(.3)?1:0),'')}}]});
EVSTAR.mahkeme=['Delil yetersizliğinden beraat et',p=>{log('⭐ Delil yetersizliğinden beraat ettin.','gold');S.cr.heat=0}];
function verdict(p,yrs,pre){const c=CRIMES.find(x=>x.id===p.c);S.cr.rec.push({c:c.id,age:S.age,yrs});
 if(yrs<=0){S.money-=p.fine;log(`⚖️ ${pre}Hapis cezası almadın ama ${fmtS(p.fine)} adli para cezası ve sabıka kaydı aldın.`,'bad');return}
 const left=yrs*4;S.cr.jail={left,tot:left,c:c.id,since:S.age};if(S.job){S.job=null}S.cr.heat=0;
 log(`⚖️ ${pre}${yrs} yıl hapis cezası aldın. Cezaevine giriyorsun.${S.contract?` ${S.contract.n} sözleşmeni askıya aldı.`:''}`,'bad');add('happy',-20)}
/* ---------- cezaevi ---------- */
const JACT=[['yaz','✍️','Koğuşta şarkı yaz','Hapishane şarkıları sert olur · kalite ↑ şansı',1],['spor','🏋','Avluda spor','Sağlık ↑',1],['kitap','📚','Kütüphane','Yetenek biraz ↑ · mutluluk ↑',1],['kavga','👊','Kavgaya karış','Saygı ↑ · sağlık ↓ · cezan uzayabilir',1],['iyi','😇','İyi hal','Erken tahliye şansı ↑',2],['firar','🏃','Firar et','Çok riskli',3]];
ACT.jail=k=>{const J=S.cr.jail;if(!J)return;const a=JACT.find(x=>x[0]===k);if(!useM(a[4]))return;
 if(k==='yaz'){const n0=S.songs.length;S.months+=1;ACT.write();if(S.songs.length>n0){const s=S.songs[0];s.q=clamp(s.q+R(2,10));s.t=s.t;log(`Koğuşta "${s.t}" adlı şarkıyı yazdın.`,'good')}}
 if(k==='spor'){add('health',R(3,6));log('Avluda ağırlık kaldırdın.','dim')}
 if(k==='kitap'){S.skill=clamp(S.skill+RF(.5,1.5));add('happy',3);log('Kütüphanede şiir kitapları okudun.','dim')}
 if(k==='kavga'){add('health',-R(5,15));S.cr.resp=(S.cr.resp||0)+R(5,12);if(ch(.3)){J.left+=2;J.tot+=2;log('Kavgaya karıştın, disiplin cezası: cezan 6 ay uzadı.','bad')}else log('Kavgadan galip çıktın. Koğuşta artık sana saygı duyuluyor.','dim')}
 if(k==='iyi'){J.good=(J.good||0)+1;log('Gardiyanlar iyi halini not etti.','good')}
 if(k==='firar'){if(ch(.12)){S.cr.jail=null;S.cr.heat=90;S.cr.fug=1;log('🏃 Cezaevinden firar ettin! Artık arananlar listesindesin.','bad')}else{J.left+=8;J.tot+=8;add('health',-10);log('Firar girişimin yakalandı. Cezana 2 yıl eklendi.','bad')}}
 drawSheet()};
function jailQ(){const J=S.cr.jail;if(!J)return;J.left--;S.months=Math.max(0,S.months-6);add('happy',-3);if(J.good&&J.left>2&&ch(.06*J.good)){J.left=0;log('İyi halden erken tahliye edildin.','good')}
 if(J.left<=0){const yrs=Math.round(J.tot/4);S.cr.jail=null;log(`🔓 ${yrs} yıl sonra cezaevinden çıktın. Kapıda seni ${S.fame>30?'kameralar ve hayranlar':'ailen'} bekliyordu.`,'good');if(S.genre==='rap'&&S.fame>20){S.fol=Math.round(S.fol*1.08);log('Tahliye haberi viral oldu; "özgürlük" şarkısı beklentisi büyük.','gold')}}}
function shJail(){const J=S.cr.jail;let h=`<div class="hero2" style="background:linear-gradient(135deg,#2a2a2a,#111)"><small>⛓ Cezaevi</small><div class="big">${Math.ceil(J.left/4*10)/10} yıl</div><span>Toplam ceza ${Math.round(J.tot/4)} yıl · ${CRIMES.find(x=>x.id===J.c).n}${J.good?` · iyi hal ${J.good}`:''}</span></div>`+note('Cezaevindeyken konser veremez, şarkı yayınlayamaz, işe gidemezsin. Her 3 ay geçtikçe cezan azalır.');
 return h+sec('Koğuşta')+JACT.map(([k,ic,n,d,hk])=>row(`ACT.jail('${k}')`,ic,n,d,hk+' hak')).join('')}
/* cezaevindeyken engellenen eylemler */
const JOK=new Set(['jail','write','starT','selfEd','selfFame','selfMoney','mset','mrun','masterT','wear','delDemo','payout','dep','wd','cvSet','cvRand','qpSet']);
Object.keys(ACT).forEach(k=>{if(JOK.has(k))return;const f=ACT[k];if(typeof f!=='function')return;const w=function(...a){if(S&&S.cr&&S.cr.jail&&!S.star){toast('⛓ Cezaevindesin. Bunu çıkınca yapabilirsin.');return}return f.apply(this,a)};w._kp=f._kp;ACT[k]=w});
/* ---------- arayüz: Hayat → İş & suç ---------- */
function shJC(){jcInit();if(jailed())return shJail();let h='';
 h+=sec('💼 Yarı zamanlı işler')+note(S.job?'İş her 3 ayda 2 hakkını kullanır ve maaşını kasana yatırır. Şöhretin 45\'i geçince işi bırakırsın.':'Ünlü olana kadar geçimini sağla. İş her 3 ayda 2 hakkını kullanır.');
 if(S.job){const j=PTJOBS.find(x=>x.id===S.job.id);h+=`<div class="card"><div class="ch"><b>${j.ic} ${j.n}</b><span class="pill">${S.job.q} çeyrek</span></div>${note(j.d+` · 3 ayda ~${fmtS((j.pay[0]+j.pay[1])/2)}`)}<div class="two"><button class="mini" onclick="ACT.jobShift()">Ek mesai · 1 hak</button><button class="mini red" onclick="ACT.jobQuit()">İstifa et</button></div></div>`}
 h+=PTJOBS.filter(j=>!S.job||S.job.id!==j.id).map(j=>row(`ACT.jobTake('${j.id}')`,j.ic,j.n,`${j.d} · ${j.age}+ yaş`,`${fmtS(j.pay[0])}–${fmtS(j.pay[1])}`,S.age<j.age)).join('');
 h+=sec('🕶 Suç')+`<div class="kv"><div>Polis dikkati<b class="${S.cr.heat>40?'neg':''}">%${Math.round(S.cr.heat)}</b></div><div>Sabıka<b>${S.cr.rec.length?S.cr.rec.length+' kayıt':'Temiz'}</b></div></div><div class="bar"><i style="width:${S.cr.heat}%;background:${S.cr.heat>40?'#ff7d73':'#ffc24b'}"></i></div>`;
 h+=note('Her iş yakalanma riski taşır. Dikkat ne kadar yüksekse risk o kadar artar; dikkat her 3 ayda azalır. Ünlüysen daha kolay tanınırsın. Yakalanırsan mahkemeye çıkarsın.'+(S.cr.fug?' ⚠️ Firarisin; her an yakalanabilirsin.':''));
 h+=CRIMES.map(c=>{const p=clamp(c.risk+S.cr.heat/250+(S.fame>40?.08:0)-(S.star?.5:0),.02,.9);return row(`ACT.crime('${c.id}')`,c.ic,c.n,`${c.d} · yakalanma %${Math.round(p*100)} · ceza ${c.yrs[0]}–${c.yrs[1]} yıl`,`${fmtS(c.loot[0])}+`,S.age<c.age)}).join('');
 if(S.cr.rec.length)h+=sec('Sabıka kaydı')+S.cr.rec.slice().reverse().map(r=>row('','📁',CRIMES.find(x=>x.id===r.c).n,`${r.age} yaşında · ${r.yrs?r.yrs+' yıl hapis':'para cezası'}`,'')).join('');return h}
{const _sh=shHayat;shHayat=function(){if(SUB&&SUB.t==='jc')return shJC();if(jailed()&&!SUB)return `<div class="tbar"><span>⛓ Cezaevindesin</span><b>${Math.ceil(S.cr.jail.left/4*10)/10} yıl kaldı</b></div>`+shJail();let h=_sh();if(SUB||S.age<14)return h;jcInit();
 const r=row("sheet('hayat',{t:'jc',title:'İş & suç'})",'💼','İş & suç',S.job?`${PTJOBS.find(x=>x.id===S.job.id).n} olarak çalışıyorsun`:`Yarı zamanlı işler · sokak işleri${S.cr.heat>20?' · polis dikkati %'+Math.round(S.cr.heat):''}`,'›');const i=h.indexOf('<div class="sec">');return i>=0?h.slice(0,i)+r+h.slice(i):r+h}}
{const _aq=ageUpQ;ageUpQ=function(){if(S&&S.alive){jcInit();if(!S.cr.jail){S.cr.heat=clamp(S.cr.heat-6);if(S.cr.fug&&ch(.2)){S.cr.fug=0;caughtFug();}}}_aq();if(S&&S.alive){try{jailQ();jobQ()}catch(e){console.error(e)}}}}
function caughtFug(){const yrs=R(3,6);S.cr.jail={left:yrs*4,tot:yrs*4,c:'kapkac',since:S.age};log(`🚨 Firarda yakalandın. ${yrs} yıl ek ceza ile cezaevine geri döndün.`,'bad')}
/* avatar: cezaevinde mahkum kıyafeti */
{const _r=render;render=function(){_r();if(S&&S.cr&&S.cr.jail){const e=$('hav');if(e)e.innerHTML=AV(S.look,S.age,{mood:S.happy,jail:1})}}}
{const _t=title;title=function(){if(S&&S.cr&&S.cr.jail)return 'Mahkum';return _t()}}
/* rapçilerde sokak geçmişi şarkılara biraz güç katar */
{const _pf=potFor;potFor=function(s,b){let v=_pf(s,b);if(S.genre==='rap'&&S.cr&&S.cr.cred)v*=1+Math.min(.15,S.cr.cred/200);return v}}
actKeep();
