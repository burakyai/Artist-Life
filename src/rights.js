/* ============ Gerçek plak şirketleri, kendi dağıtımın, hak satın alma, birleşik panel ============ */
LABELS.splice(0,LABELS.length,{n:'ONErpm',t:1},{n:'DMC',t:2},{n:'Sony Music',t:3},{n:'Warner Music',t:4},{n:'Universal Music',t:5});
DIST.kendi={n:'Kendi şirketin',d:'Komisyon yok · şirketinin tanıtım gücü (PR varsa ×1,3)',fee:0,pct:0};
function songLabShare(s){if(!s.lab)return 0;return s.ly*.135*(1-s.lab.roy/100)}
function rightsAsk(s){const L=LABELS.find(x=>x.n===s.lab.n)||{t:3};return Math.round(Math.max(songLabShare(s)*RF(3.5,5),80000*L.t)*(s.cert>=4?1.4:s.cert>=1?1.15:1)/1e4)*1e4}
ACT.rightsOffer=id=>{const s=S.songs.find(x=>x.id===id),r=s.lab;if(!r)return;if(S.contract&&S.contract.n===r.n&&!S.star){toast('Sözleşmen sürerken bu şirketten hak alamazsın.');return}
 if(r.lock===S.age){toast(`${r.n} bu yıl görüşmeyi kabul etmiyor.`);return}const v=amtV('rt_'+id);if(!v){toast('Önce teklif tutarını yaz.');return}if(S.money<v){toast('Kasanda bu kadar nakit yok.');return}
 r.ask=r.ask||rightsAsk(s);r.pat=r.pat==null?3:r.pat;const flex=.12+S.fame/500+(S.lawyer?.12:0)+(S.star?1:0);
 if(v>=r.ask*(1-flex)){S.money-=v;log(`"${s.t}" şarkısının master haklarını ${r.n}'dan ${fmtS(v)}'ye satın aldın! Artık telifin tamamı senin.`,'gold');s.lab=null;s.bought=v;S.lawyer=0}
 else{r.pat--;if(r.pat<=0){r.lock=S.age;r.pat=3;r.msg=`❌ ${r.n} görüşmeyi kesti. Seneye tekrar dene.`;log(`${r.n} "${s.t}" hakları için pazarlığı bitirdi.`,'bad')}
  else if(v>=r.ask*.65){r.ask=Math.round((r.ask+v)/2/1e4)*1e4;r.msg=`🔁 ${r.n} karşı teklif: ${fmtS(r.ask)} (sabır ${r.pat}/3)`}else r.msg=`❌ ${r.n}: "Bu rakam ciddi değil." (sabır ${r.pat}/3)`}
 drawSheet();render()};
function shRights(id){const s=S.songs.find(x=>x.id===id);if(!s||!s.lab){SUB={t:'haklar',title:'Master hakları'};return shRightsList()}const r=s.lab;r.ask=r.ask||rightsAsk(s);
 let h=`<div class="songhead"><div class="cov">${vinylSVG(s,true)}</div><div class="shx"><span class="pill">Hak sahibi: ${esc(r.n)}</span>${certBadge(s.cert)}<p class="note" style="margin-top:6px">${s.ra} yaşında yayınlandı · toplam ${num(s.total)} dinlenme<br>Senin payın %${r.roy}, şirketin payı %${100-r.roy}</p></div></div>`;
 h+=`<div class="kv"><div>Son 12 ay dinlenme<b>${num(s.ly)}</b></div><div>Şirketin yıllık kazancı<b>${fmtS(songLabShare(s))}</b></div><div>Şirketin istediği<b>${fmtS(r.ask)}</b></div><div>Kasandaki nakit<b>${fmtS(S.money)}</b></div></div>`;
 h+=note('Hakları alırsan bu şarkının bütün telifi sana geçer; istersen kendi şirketinle dağıtırsın. Şirket istediğinin biraz altına razı olabilir. Avukat arkadaşın varsa pazarlık kolaylaşır.');
 if(r.msg)h+=`<div class="msg">${r.msg}</div>`;
 h+=amtIn('rt_'+id,'Teklifin (₺)')+`<button class="btn" onclick="ACT.rightsOffer(${id})">📨 Teklif ver</button>`;return h}
function shRightsList(){const own=released().filter(s=>s.lab),mine=released().filter(s=>!s.lab);let h=note('Bir plak şirketiyle çalışırken çıkardığın şarkıların master hakları o şirkette kalır; sözleşme bitse de telifin sadece senin payın kadarı sana gelir. Hakları geri satın alabilirsin.');
 if(!own.length)h+=note('Başka şirkette hakkı bulunan şarkın yok.');
 const byL={};own.forEach(s=>(byL[s.lab.n]=byL[s.lab.n]||[]).push(s));
 Object.entries(byL).forEach(([n,ss])=>{h+=sec(`${n} (${ss.length} şarkı)`);ss.sort((a,b)=>b.ly-a.ly).forEach(s=>h+=row(`sheet('panel',{t:'hak',id:${s.id},title:'Hak satın al'})`,`<span class="cvi">${vinylSVG(s)}</span>`,esc(s.t)+' '+certBadge(s.cert,1),`Payın %${s.lab.roy} · şirket yılda ~${fmtS(songLabShare(s))} kazanıyor`,'Teklif ›'))});
 h+=sec(`Hakları sende olanlar (${mine.length})`)+note(mine.length?mine.slice(0,40).map(s=>esc(s.t)+(s.bought?' (satın alındı)':'')).join(' · '):'—');return h}
/* ---------- Panel sekmeleri ---------- */
function labPanel(){const L=S.lab;if(!L)return note('Henüz şirketin yok.');const q=L.lastQ||{gross:0,net:0,merch:0,exp:0},b=labBld();
 let h=`<div class="hero2"><small>${esc(L.n)} · son 3 ay</small><div class="big">${fmtS(q.net+q.merch-q.exp)}</div><span>Brüt ${fmtS(q.gross)} · şirkete kalan ${fmtS(q.net)} · merch ${fmtS(q.merch)} · gider ${fmtS(q.exp)}</span></div>`;
 h+=`<div class="kv"><div>Şirket kasası<b>${fmtS(L.cash)}</b></div><div>Sanatçı<b>${L.arts.length} / ${b.cap}</b></div><div>Toplam brüt<b>${fmtS(L.tot.gross)}</b></div><div>Toplam kâr<b>${fmtS(L.tot.net)}</b></div></div>`;
 h+=row("sheet('kariyer',{t:'lab',title:'Şirketim'})",'🏢','Şirketi yönet','Sanatçılar, yetenek avı, bina, kasa','›');
 if(L.arts.length){h+=sec('Sanatçı bazında');L.arts.forEach(a=>{const ss=L.songs.filter(s=>s.aid===a.id);h+=row(`sheet('kariyer',{t:'art',id:${a.id},title:'Sanatçı'})`,`<span class="av sa">${AV(a.look,24)}</span>`,esc(a.name),`${num(ss.reduce((q,s)=>q+s.total,0))} dinlenme · brüt ${fmtS(ss.reduce((q,s)=>q+s.gross,0))} · avans borcu ${fmtS(a.con.unrec)}`,`${ss.length} yayın`)})}
 const top=[...L.songs].sort((a,b)=>b.lq-a.lq).slice(0,10);if(top.length){h+=sec('Son 3 ayın en çok dinlenenleri');top.forEach((s,i)=>{const a=L.arts.find(x=>x.id===s.aid);h+=row('',`<b class="rk">${i+1}</b>`,esc(s.t)+(s.viral?' 🔥':''),`${a?esc(a.name):'Eski sanatçı'} · toplam ${num(s.total)}`,num(s.lq))})}
 const H=L.hist.slice(-12);if(H.length){const mx=Math.max(1,...H.map(x=>Math.abs(x.net)));h+=sec('Yıllara göre toplam kâr')+`<svg viewBox="0 0 300 120" class="chart">`;const bw=300/Math.max(6,H.length);H.forEach((x,i)=>{const hh=Math.abs(x.net)/mx*96;h+=`<rect x="${i*bw+4}" y="${104-hh}" width="${bw-8}" height="${hh}" rx="2" fill="${x.net>=0?'#3fbf8a':'#ff7d73'}"/><text x="${i*bw+bw/2}" y="116" font-size="8" text-anchor="middle" fill="#9a90b0">${x.age}</text>`});h+='</svg>'}
 return h}
function allPanel(){const L=S.lab,me=S.lastY||{net:0,streams:0},q=L.lastQ||{net:0,merch:0,exp:0};const ls=L.songs.reduce((a,s)=>a+s.lq,0);
 let h=`<div class="hero2"><small>Birleşik · son 3 ay</small><div class="big">${fmtS(me.net+q.net+q.merch-q.exp)}</div><span>Sen ${fmtS(me.net)} + ${esc(L.n)} ${fmtS(q.net+q.merch-q.exp)} · toplam ${num(me.streams+ls)} dinlenme</span></div>`;
 h+=`<div class="kv"><div>Kişisel kasa<b>${fmtS(S.money)}</b></div><div>Şirket kasası<b>${fmtS(L.cash)}</b></div><div>Platformlarda bekleyen<b>${fmtS(pendT())}</b></div><div>Banka + borsa<b>${fmtS(S.bank+portVal())}</b></div></div>`;
 const rows=[...released().map(s=>({t:s.t,a:S.first+' '+S.last,lq:s.lq||0,me:1,s})),...L.songs.map(s=>{const a=L.arts.find(x=>x.id===s.aid);return {t:s.t,a:a?a.name:'Eski sanatçı',lq:s.lq}})].sort((a,b)=>b.lq-a.lq).slice(0,15);
 h+=sec('Tüm kataloğun · son 3 ayın en çok dinlenenleri')+rows.map((r,i)=>row(r.me?`sheet('kariyer',{t:'song',id:${r.s.id},title:'Şarkı detayı'})`:'',`<b class="rk">${i+1}</b>`,esc(r.t),esc(r.a)+(r.me?' · sen':' · şirketin'),num(r.lq))).join('');return h}
function shPanel(){if(SUB&&SUB.t==='hak')return shRights(SUB.id);if(SUB&&SUB.t==='haklar')return shRightsList();if(SUB&&SUB.t==='plat')return shPlat(SUB.id);
 const t=S.lab?(S.ptab||'ben'):'ben';let h=S.lab?`<div class="tabs">${[['ben','Benim panelim'],['sirket',S.lab.n],['hepsi','Birleşik']].map(([k,n])=>`<button class="tab ${t===k?'on':''}" onclick="S.ptab='${k}';drawSheet()">${esc(n)}</button>`).join('')}</div>`:'';
 if(t==='sirket')return h+labPanel();if(t==='hepsi')return h+allPanel();
 const own=released().filter(s=>s.lab).length;if(own)h+=row("sheet('panel',{t:'haklar',title:'Master hakları'})",'📜','Master hakları',`${own} şarkının hakları plak şirketlerinde · geri satın al`,'›');
 return h+shPanelMe()}
