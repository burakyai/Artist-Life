/* ============ Şarkı: yayına hazırlık, istatistik, albüm ============ */
function songRow(x){const r=x.peak?`TR #${x.peak}`:'';return row(`sheet('kariyer',{t:'song',id:${x.id},title:'Şarkı detayı'})`,`<span class="cvi">${vinylSVG(x)}</span>`,esc(x.t)+(x.viral?' 🔥':'')+' '+certBadge(x.cert,1),`${x.hy.length?num(x.total)+' dinlenme · net '+fmtS(x.mon.net):'Yıl sonunda ilk veriler gelecek'}${x.alb?' · '+esc(x.alb):''}`,r||'›')}
function setT(id,v){const s=S.songs.find(x=>x.id===id);s.t=v.slice(0,32);save();const c=$('cvbig');if(c)c.innerHTML=vinylSVG(s,true)}
function setMeta(id,k,v){const s=S.songs.find(x=>x.id===id);s.meta[k]=v;save();drawSheet()}
function setCov(id,k,v){const s=S.songs.find(x=>x.id===id);s.meta.cover[k]=v;save();drawSheet()}
const pick1=(on,ic,t,d,sel,rt)=>`<button class="row ${sel?'sel':''}" onclick="${on}"><span class="ic">${ic}</span><span class="tx"><b>${t}</b><span>${d}</span></span><span class="rt">${sel?'✓':rt||''}</span></button>`;
function covPicker(cov,fnP,fnM){return `<div class="sws">${CPAL.map(([a,b],i)=>`<button class="swc ${cov.p===i?'on':''}" style="background:linear-gradient(135deg,${a},${b})" onclick="${fnP}(${i})" aria-label="Renk ${i+1}"></button>`).join('')}</div><div class="tabs">${CMOT.map(([k,n])=>`<button class="tab ${cov.m===k?'on':''}" onclick="${fnM}('${k}')">${n}</button>`).join('')}</div>`}

function shSong(id){const s=S.songs.find(x=>x.id===id);if(!s){SUB=null;return shKariyer()}
 if(s.st==='yayin')return shSongStats(s);
 if(s.st==='demo'){let h=`<div class="card"><div class="ch"><b>${esc(s.t)}</b><span class="pill">${GENRES[s.g].n}</span></div>${note(`Demo · kalite ${s.q}/100${s.feat?' · feat. '+esc(s.feat):''}`)}</div>`+tbar()+sec('Stüdyo seç');
  if(S.contract)h+=row(`ACT.rec(${id},-1);sheet('kariyer',{t:'song',id:${id},title:'Yayına hazırla'})`,'📀',S.contract.n+' stüdyosu',`Şirket karşılıyor · kalite +${12+S.contract.t*3}`,'Ücretsiz');
  if(hasF('studyo'))h+=row(`ACT.rec(${id},-2);sheet('kariyer',{t:'song',id:${id},title:'Yayına hazırla'})`,'🎙','Ev stüdyon','Kendi evinde · kalite +18','Ücretsiz');
  STUDIOS.forEach((st,i)=>h+=row(`ACT.rec(${id},${i});sheet('kariyer',{t:'song',id:${id},title:'Yayına hazırla'})`,['💻','🏠','🎚','💎'][i],st.n,`Kalite +${st.b}`,st.p?fmtS(st.p):'Ücretsiz'));return h}
 // kayıtlı: yayına hazırlık formu
 const m=s.meta,sb=subOf(s),w=WRITERS[m.writer],mx=MIX[m.mix],pb=m.promo===-1?(m.pc||0):PROMO[m.promo],cost=relCost(s)+pb,eq=Math.round(clamp(s.q+w.q+mx.q,1,100));
 let h=`<div class="songhead"><div class="cov" id="cvbig">${vinylSVG(s,true)}</div><div class="shx"><span class="pill">${GENRES[s.g].n} · ${sb.n}</span><p class="note" style="margin-top:6px">Kayıt: ${esc(s.studio)}<br>Ham kalite ${s.q}/100${s.feat?'<br>feat. '+esc(s.feat):''}${s.clip?'<br>'+s.clip.n+' hazır':''}</p></div></div>`;
 h+=sec('Şarkı bilgileri')+`<label class="lab">Şarkı adı</label><input class="inp" value="${esc(s.t)}" maxlength="32" oninput="setT(${id},this.value)"><button class="mini sec dice2" onclick="setT(${id},genTitle('${s.g}'));drawSheet()">🎲 Rastgele ad</button>`;
 h+=`<label class="lab">Alt tür</label><div class="tabs wrap">${SUBS[s.g].map(x=>`<button class="tab ${m.sub===x.id?'on':''}" onclick="setMeta(${id},'sub','${x.id}')">${x.n}</button>`).join('')}</div>${note(`${sb.n}: ${sb.vir>.02?'viral olma şansı yüksek':sb.vir<0?'viral olması zor':'dengeli viral şansı'} · ${sb.tail>=.3?'yıllarca dinlenir':sb.tail<=0?'çabuk eskir':'orta ömürlü'}`)}`;
 h+=sec('Kapak')+covPicker(m.cover,`(i=>setCov(${id},'p',i))`,`(k=>setCov(${id},'m',k))`);
 h+=sec('Söz & müzik');Object.entries(WRITERS).forEach(([k,x])=>h+=pick1(`setMeta(${id},'writer','${k}')`,{kendim:'✍️',ortak:'🤝',unlu:'⭐'}[k],x.n,x.d,m.writer===k));
 h+=sec('Mix & mastering');MIX.forEach((x,i)=>h+=pick1(`setMeta(${id},'mix',${i})`,['🎚','🎛','💎'][i],x.n,x.d,m.mix===i,x.p?fmtS(x.p):'Ücretsiz'));
 if(!S.contract){h+=sec('Dağıtımcı');Object.entries(DIST).filter(([k])=>k!=='kendi'||S.lab).forEach(([k,x])=>h+=pick1(`setMeta(${id},'dist','${k}')`,k==='yuzde'?'📊':k==='sabit'?'🧾':'🏢',k==='kendi'?esc(S.lab.n)+' (kendi şirketin)':x.n,x.d,m.dist===k))}
 else h+=sec('Dağıtım')+note(`${S.contract.n} dağıtımı ve tanıtımı üstleniyor (tanıtım gücü ×${(1+S.contract.t*.4).toFixed(1)}). Telif payın %${S.contract.roy}.`);
 h+=sec('Tanıtım bütçesi')+`<div class="tabs wrap">${PROMO.map((p,i)=>`<button class="tab ${m.promo===i?'on':''}" onclick="setMeta(${id},'promo',${i})">${p?fmtS(p):'Yok'}</button>`).join('')}</div>${amtIn('pr_c',m.promo===-1?'Özel: '+fmtS(m.pc||0):'Kendi bütçeni yaz (₺)')}<button class="mini sec" style="margin-top:6px" onclick="const v=amtV('pr_c');if(v){S.songs.find(x=>x.id===${id}).meta.pc=v;setMeta(${id},'promo',-1)}">Özel bütçeyi uygula</button>${note('Reklam, playlist ve influencer tanıtımı. Takipçin azken bütçenin etkisi daha büyük.')}`;
 h+=sec('Editoryal listeler')+pick1(`setMeta(${id},'pitch',${!m.pitch})`,'📮','Spotiplay editörlerine gönder',`"${EDIT[s.g]}" ve "Yeni Cuma" listeleri · kabul edilirse ilgi +%35`,m.pitch);
 if(S.star)h+=sec('⭐ Süperstar')+pick1(`setMeta(${id},'hit',${!m.hit})`,'⭐','Hit garantisi','İlgi ×3 · editoryal liste garanti',!!m.hit);
 h+=sec('Özet')+`<div class="kv"><div>Yayın kalitesi<b>${eq}/100</b></div><div>Toplam maliyet<b>${fmtS(cost)}</b></div><div>Söz yazarı payı<b>%${Math.round(w.pct*100)}</b></div><div>${S.contract?'Şirket payı':'Dağıtımcı payı'}<b>%${S.contract?100-S.contract.roy:Math.round(DIST[m.dist].pct*100)}</b></div></div>`;
 h+=`<button class="btn" onclick="ACT.release(${id})" ${canPay(cost)?'':'disabled'}>🚀 Single olarak yayınla${cost?' · '+fmtS(cost):''}</button>`;
 if(S.songs.filter(x=>x.st==='kayit').length>=5)h+=note('Bu şarkıyı bir albümün içinde yayınlamak istersen Kariyer → Albüm hazırla. Bilgileri kaydedildi.');
 if(!s.clip){h+=sec('Klip (isteğe bağlı)');CLIPS.forEach((c,i)=>h+=row(`ACT.clip(${id},${i})`,'🎬',c.n,`TubeX ×${c.m}${c.h>1?' · ilgi +%'+Math.round((c.h-1)*100):''} · 1 hak`,fmtS(c.p)))}
 return h}

function shSongStats(s){const m=s.mon,sb=subOf(s),last=s.hy[s.hy.length-1];let h='';
 h+=`<div class="songhead"><div class="cov">${vinylSVG(s,true)}</div><div class="shx"><span class="pill">${GENRES[s.g].n} · ${sb.n}</span>${certBadge(s.cert)}${s.edit?`<span class="pill gold sm">📮 ${esc(s.edit)}</span>`:''}${s.viral?'<span class="pill hot">🔥 Viral</span>':''}<p class="note" style="margin-top:6px">${s.alb?'Albüm: '+esc(s.alb):'Single'} · ${s.ra} yaşında yayınlandı<br>${WRITERS[s.meta.writer].n}${s.feat?' · feat. '+esc(s.feat):''}<br>${esc(s.studio||'')} · ${MIX[s.meta.mix].n} · kalite ${s.q}</p></div></div>`;
 if(!s.hy.length)return h+note('Şarkı yayında! Dinlenme ve kazanç verileri yıl sonunda gelir. İLERLE\'ye bastığında burada platform platform göreceksin.')+(s.clip?'':sec('Klip')+CLIPS.map((c,i)=>row(`ACT.clip(${s.id},${i})`,'🎬',c.n,`TubeX ×${c.m} · 1 hak`,fmtS(c.p))).join(''));
 const ml=last?last.pl.spo/12/2.6:0;
 h+=`<div class="hero2"><small>Toplam dinlenme</small><div class="big">${num(s.total)}</div><span>Sana kalan net <b>${fmtS(m.net)}</b> · brüt ${fmtS(m.gross)}</span></div>`;
 h+=`<div class="kv"><div>Son 12 ay<b>${num(s.ly)}</b></div><div>Aylık dinleyici<b>${num(ml)}</b></div><div>En iyi TR sırası<b>${s.peak?'#'+s.peak:'—'}</b></div><div>En iyi Global<b>${s.gpeak?'#'+s.gpeak:'—'}</b></div></div>`;
 h+=sec('Platformlar (toplam)')+`<table class="tbl"><tr class="th"><td>Platform</td><td>Dinlenme</td><td>Brüt</td></tr>${PLAT.map(p=>`<tr><td><i class="dot" style="background:${p.c}"></i>${p.n}</td><td>${num(s.tot[p.id])}</td><td>${fmtS(s.tot[p.id]*p.rate)}</td></tr>`).join('')}</table>`;
 const tt=Object.values(s.tot).reduce((a,b)=>a+b,0)||1;h+=`<div class="pbar">${PLAT.map(p=>`<i style="width:${s.tot[p.id]/tt*100}%;background:${p.c}"></i>`).join('')}</div>`;
 const H=s.hy.slice(-12),mx=Math.max(1,...H.map(x=>x.st));
 h+=sec('Yıllara göre dinlenme')+`<svg viewBox="0 0 300 120" class="chart">`;const bw=300/Math.max(6,H.length);H.forEach((x,i)=>{const hh=x.st/mx*96,X=i*bw+4;h+=`<rect x="${X}" y="${104-hh}" width="${bw-8}" height="${hh}" rx="2" fill="${x.r?'#ff5fa2':'#a378ff'}"/><text x="${X+(bw-8)/2}" y="116" font-size="8" text-anchor="middle" fill="#9a90b0">${x.age}</text>`+(x.r?`<text x="${X+(bw-8)/2}" y="${100-hh}" font-size="7.5" text-anchor="middle" fill="#ffc24b">#${x.r}</text>`:'')});h+='</svg>';
 h+=`<table class="tbl"><tr class="th"><td>Yaş</td><td>Dinlenme</td><td>Brüt</td><td>Net</td></tr>${[...s.hy].reverse().map(x=>`<tr><td>${x.age}${x.r?` <span class="rk2">TR #${x.r}</span>`:''}</td><td>${num(x.st)}</td><td>${fmtS(x.g)}</td><td>${fmtS(x.net)}</td></tr>`).join('')}</table>`;
 h+=sec('Gelir dökümü (toplam)')+`<table class="tbl"><tr><td>Brüt platform geliri</td><td>${fmtS(m.gross)}</td></tr>`+(m.writer?`<tr><td>Söz yazarı payı</td><td class="neg">−${fmtS(m.writer)}</td></tr>`:'')+(m.dist?`<tr><td>Dağıtımcı payı</td><td class="neg">−${fmtS(m.dist)}</td></tr>`:'')+(m.lab?`<tr><td>Plak şirketi payı</td><td class="neg">−${fmtS(m.lab)}</td></tr>`:'')+(m.rec?`<tr><td>Avans mahsubu</td><td class="neg">−${fmtS(m.rec)}</td></tr>`:'')+(m.mgr?`<tr><td>Menajer komisyonu</td><td class="neg">−${fmtS(m.mgr)}</td></tr>`:'')+`<tr><td>Vergi (%20)</td><td class="neg">−${fmtS(m.tax)}</td></tr><tr class="tot"><td>Sana kalan net</td><td>${fmtS(m.net)}</td></tr></table>`;
 h+=campUI(s);
 if(!s.clip)h+=sec('Klip çek')+CLIPS.map((c,i)=>row(`ACT.clip(${s.id},${i})`,'🎬',c.n,`TubeX ×${c.m}${c.h>1?' · ilgi +%'+Math.round((c.h-1)*100):''} · 1 hak`,fmtS(c.p))).join('');
 return h}

function shAlbum(){const rec=S.songs.filter(x=>x.st==='kayit');if(rec.length<5){SUB=null;return shKariyer()}
 S.ad=S.ad||{n:pick(ALBW.filter(w=>!S.albums.some(a=>a.n===w)))||'',cover:{p:R(0,CPAL.length-1),m:'gradyan'},promo:1};const ad=S.ad,pb=PROMO[ad.promo];
 const cost=rec.reduce((a,x)=>a+relCost(x),0)+pb,q=Math.round(rec.reduce((a,x)=>a+clamp(x.q+WRITERS[x.meta.writer].q+MIX[x.meta.mix].q,1,100),0)/rec.length);
 let h=`<div class="songhead"><div class="cov" id="cvalb">${vinylSVG({meta:{cover:ad.cover},t:ad.n,id:99},true)}</div><div class="shx"><span class="pill">Albüm · ${rec.length} şarkı</span><p class="note" style="margin-top:6px">Albümdeki şarkılar %25 daha fazla ilgi görür, ayrıca plak/CD satışı yapılır.</p></div></div>`;
 h+=sec('Albüm bilgileri')+`<label class="lab">Albüm adı</label><input class="inp" value="${esc(ad.n)}" maxlength="28" oninput="S.ad.n=this.value;save();$('cvalb').innerHTML=vinylSVG({meta:{cover:S.ad.cover},t:S.ad.n,id:99},true)">`;
 h+=sec('Albüm kapağı')+covPicker(ad.cover,"(i=>{S.ad.cover.p=i;drawSheet()})","(k=>{S.ad.cover.m=k;drawSheet()})");
 h+=sec('Tanıtım bütçesi')+`<div class="tabs wrap">${PROMO.map((p,i)=>`<button class="tab ${ad.promo===i?'on':''}" onclick="S.ad.promo=${i};drawSheet()">${p?fmtS(p):'Yok'}</button>`).join('')}</div>`;
 h+=sec('Parça listesi')+note('Her şarkının adını, söz-müzik ve mix bilgisini ayrı ayrı düzenleyebilirsin.');
 rec.forEach((x,i)=>h+=row(`sheet('kariyer',{t:'song',id:${x.id},title:'Yayına hazırla'})`,`<b class="rk">${i+1}</b>`,esc(x.t)+(x.feat?` <small>feat. ${esc(x.feat)}</small>`:''),`${subOf(x).n} · ${WRITERS[x.meta.writer].n} · kalite ${clamp(x.q+WRITERS[x.meta.writer].q+MIX[x.meta.mix].q,1,100)}`,'Düzenle ›'));
 h+=sec('Özet')+`<div class="kv"><div>Ortalama kalite<b>${q}/100</b></div><div>Toplam maliyet<b>${fmtS(cost)}</b></div></div><button class="btn" onclick="ACT.album()" ${canPay(cost)?'':'disabled'}>💿 Albümü yayınla · ${fmtS(cost)} · 1 hak</button>`;
 return h}
