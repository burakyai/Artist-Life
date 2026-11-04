/* ============ Bot çiftliği: telefon al, şarkılarını bot dinlemeleriyle şişir; platform tespiti, para iadesi, hesap kapatma, mahkeme ============ */
const BOT_PH=7500,BOT_RUN=250,BOT_PER=40000;
CRIMES.push({id:'bot',n:'Dinlenme sahtekârlığı',ic:'🤖',age:16,risk:0,loot:[0,0],heat:0,yrs:[1,3],cred:1,hidden:1,d:''});
function botInit(){jcInit();S.bot=S.bot||{ph:0,on:false,tg:'all',strikes:0,last:null}}
ACT.botBuy=n=>{botInit();if(jailed()){toast('Cezaevindesin.');return}const c=n*BOT_PH;if(!pay(c))return;S.bot.ph+=n;log(`🤖 ${n} adet ucuz telefon aldın (${fmtS(c)}). Bot çiftliğinde ${S.bot.ph} telefon var.`,'bad');drawSheet()};
ACT.botSell=()=>{botInit();if(!S.bot.ph)return;const v=Math.round(S.bot.ph*BOT_PH*.4);S.money+=v;log(`🤖 ${S.bot.ph} telefonu ikinci el sattın: ${fmtS(v)}.`,'dim');S.bot.ph=0;S.bot.on=false;drawSheet()};
ACT.botOn=v=>{botInit();if(v&&!S.bot.ph){toast('Önce telefon al.');return}if(v&&!released().length){toast('Yayında şarkın yok.');return}S.bot.on=!!v;log(S.bot.on?'🤖 Bot çiftliği çalışıyor: telefonlar gece gündüz şarkılarını dinliyor.':'🤖 Bot çiftliğini durdurdun.','dim');drawSheet()};
ACT.botTg=t=>{botInit();S.bot.tg=t;drawSheet()};
function botRisk(){botInit();const B=S.bot;if(!B.on||!B.ph)return 0;const rel=released(),real=Math.max(1,rel.reduce((a,s)=>a+(s.lq||0),0)),fake=B.ph*BOT_PER,share=fake/(fake+real);return clamp(.04+share*.55+B.ph/600+B.strikes*.08-crSkill()/100*.25,.02,.95)}
function botQ(){botInit();const B=S.bot;if(!B.ph||jailed())return;const run=B.ph*BOT_RUN;S.money-=run;if(!B.on){B.last={st:0,inc:0,cost:run};return}
 const rel=released();if(!rel.length){B.last={st:0,inc:0,cost:run};return}
 const tg=B.tg==='all'?rel:[rel.find(s=>s.id===B.tg)||rel.sort((a,b)=>b.ra-a.ra||b.id-a.id)[0]];const tot=Math.round(B.ph*BOT_PER*RF(.7,1.3)),per=Math.round(tot/tg.length),rate=PLAT.reduce((a,p)=>a+p.rate,0)/PLAT.length;
 tg.forEach(s=>{s.lq=(s.lq||0)+per;s.total+=per;s.q4=(s.q4||[]);if(s.q4.length)s.q4[s.q4.length-1]+=per;s.ly=(s.ly||0)+per;s.bot=(s.bot||0)+per;const r=trRank(s.lq/13);if(r&&(!s.peak||r<s.peak)){s.peak=r;log(`"${s.t}" Türkiye Top 50'de #${r}'e yükseldi! (bot destekli)`,'good')}});
 const inc=Math.round(tot*rate*.55);S.money+=inc;S.tot.streams+=tot;S.yr.streams=(S.yr.streams||0)+tot;B.tot=(B.tot||0)+tot;B.last={st:tot,inc,cost:run,risk:botRisk()};
 S.cr.sk=clamp(crSkill()+RF(.3,.8));
 log(`🤖 Bot çiftliği: ${num(tot)} sahte dinlenme → ${fmtS(inc)} platform ödemesi. Telefon ve SIM gideri ${fmtS(run)}.`,'dim');
 if(ch(B.last.risk))botCaught(tot,inc)}
function botCaught(tot,inc){const B=S.bot,rel=released();B.strikes++;const back=Math.round(inc*RF(2,3.5));S.money-=back;const lost=Math.round(B.ph*RF(.3,.7));B.ph-=lost;
 rel.forEach(s=>{if(s.bot){const rm=Math.min(s.total,Math.round(s.bot*RF(.6,1)));s.total-=rm;s.lq=Math.max(0,(s.lq||0)-rm);s.ly=Math.max(0,(s.ly||0)-rm);s.bot=0}});
 add('happy',-10);S.cr.sk=clamp(crSkill()-R(2,5));S.cr.heat=clamp(S.cr.heat+10);
 log(`🚨 Platformlar sahte dinlenmeleri tespit etti! ${num(tot)} dinlenme silindi, ${fmtS(back)} ödeme geri alındı, ${lost} telefon ele geçirildi. Hesabına ${B.strikes}. uyarı geldi.`,'bad');
 if(S.fame>20){S.fol=Math.round(S.fol*.9);log('"Dinlenmeleri bottan" haberi yayıldı; hayranların bir kısmı seni bıraktı.','bad')}
 if(B.strikes>=3){S.botBan=S.qt+4;B.on=false;log('⛔ Hesapların 1 yıl süreyle platformlardan kaldırıldı. Bu sürede hiç dinlenme ve telif gelmeyecek.','bad')}
 if(tot>1.5e6&&ch(.35)){log('Platformlar savcılığa suç duyurusunda bulundu.','bad');S.evq.push({id:'mahkeme',p:{c:'bot',yrs:R(1,3),fine:Math.round(back*1.5)}})}}
{const _cs=capStream;capStream=function(s,v,k){if(S.botBan&&S.qt<S.botBan)return 0;return _cs(s,v,k)}}
{const _aq=ageUpQ;ageUpQ=function(){_aq();if(S&&S.alive){try{botQ()}catch(e){console.error(e)}}}}
/* panel: bot etiketi */
{const _sr=songRow;songRow=function(x){let h=_sr(x);if(x.bot)h=h.replace(esc(x.t),esc(x.t)+' <small>🤖</small>');return h}}
/* arayüz */
function shBot(){botInit();const B=S.bot,rel=released(),risk=Math.round(botRisk()*100);let h=sec('🤖 Bot çiftliği')+note('Ucuz telefonlarla şarkılarını 7/24 döngüde dinlet: dinlenme sayın ve platform ödemen şişer, listelere girersin. Platformlar sahte dinlenmeyi tespit ederse dinlenmeler silinir, ödeme fazlasıyla geri alınır, telefonlar gider; 3 uyarıda hesapların 1 yıl kapanır. Büyük çaplıysa savcılık devreye girer.');
 if(S.botBan&&S.qt<S.botBan)h+=`<div class="card" style="border-color:var(--bad)"><b class="neg">⛔ Platform yasağı: ${S.botBan-S.qt} çeyrek kaldı</b></div>`;
 h+=`<div class="kv"><div>Telefon<b>${B.ph}</b></div><div>Durum<b>${B.on?'Çalışıyor':'Kapalı'}</b></div><div>Çeyreklik sahte dinlenme<b>~${num(B.ph*BOT_PER)}</b></div><div>Tespit riski<b class="${risk>35?'neg':''}">%${risk}</b></div><div>Çeyreklik gider<b>${fmtS(B.ph*BOT_RUN)}</b></div><div>Uyarı<b>${B.strikes}/3</b></div></div>`;
 if(B.last&&B.last.st)h+=note(`Son 3 ay: ${num(B.last.st)} sahte dinlenme, ${fmtS(B.last.inc)} ödeme, gider ${fmtS(B.last.cost)}.`);
 h+=`<div class="tabs wrap">${[10,50,200].map(n=>`<button class="tab sm" onclick="ACT.botBuy(${n})">+${n} telefon · ${fmtS(n*BOT_PH)}</button>`).join('')}${B.ph?`<button class="tab sm" onclick="ACT.botSell()">Hepsini sat</button>`:''}</div>`;
 if(B.ph){h+=`<label class="lab">Hedef şarkı</label><div class="tabs wrap"><button class="tab sm ${B.tg==='all'?'on':''}" onclick="ACT.botTg('all')">Bütün şarkılar</button>${rel.slice().sort((a,b)=>b.ra-a.ra||b.id-a.id).slice(0,6).map(s=>`<button class="tab sm ${B.tg===s.id?'on':''}" onclick="ACT.botTg(${s.id})">${esc(s.t)}</button>`).join('')}</div>`;
  h+=`<button class="btn ${B.on?'sec':''}" onclick="ACT.botOn(${!B.on})">${B.on?'⏹ Botları durdur':'▶️ Botları çalıştır'}</button>`}
 return h}
{const _sj=shJC;shJC=function(){if(jailed())return _sj();const keep=CRIMES.slice();CRIMES.splice(0,CRIMES.length,...keep.filter(c=>!c.hidden));let h;try{h=_sj()}finally{CRIMES.splice(0,CRIMES.length,...keep)}const i=h.indexOf('<div class="sec">Sabıka kaydı');return i>=0?h.slice(0,i)+shBot()+h.slice(i):h+shBot()}}
actKeep();
