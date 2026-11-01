/* ============ Albüm / EP çıkarma: şarkı seçerek, single'ları da ekleyerek ============ */
const albPool=()=>S.songs.filter(s=>s.st==='kayit').concat(released().filter(s=>!s.alb));
ACT.albTog=id=>{const ad=S.ad;ad.sel=ad.sel||[];ad.sel=ad.sel.includes(id)?ad.sel.filter(x=>x!==id):ad.sel.concat(id);drawSheet()};
ACT.albAll=on=>{const ad=S.ad;ad.sel=on?albPool().slice(0,16).map(s=>s.id):[];drawSheet()};
function albSel(){const ad=S.ad,pool=albPool();if(!ad.sel){const k=pool.filter(s=>s.st==='kayit');ad.sel=(k.length>=5?k:pool).slice(0,14).map(s=>s.id)}ad.sel=ad.sel.filter(id=>pool.some(s=>s.id===id));return pool.filter(s=>ad.sel.includes(s.id))}
const sq=x=>clamp(x.q+(x.st==='kayit'?WRITERS[x.meta.writer].q+MIX[x.meta.mix].q:0),1,100);
shAlbum=function(){const pool=albPool();
 if(pool.length<3)return note(`💿 Albüm ya da EP için en az 3 şarkı gerekir: kayıtlı (henüz yayınlanmamış) şarkıların ya da albüme girmemiş single'ların. Şu an ${pool.length} şarkın uygun.`)+note('Stüdyoda şarkı yaz ve kaydet; kayıtlı şarkıları hemen yayınlamazsan albüm için bekletebilirsin. Daha önce çıkardığın single\'ları da albüme koyabilirsin.')+row("SUB=null;drawSheet()",'✍️','Stüdyoya dön','Şarkı yaz ve kaydet','›');
 S.ad=S.ad||{n:pick(ALBW.filter(w=>!S.albums.some(a=>a.n===w)))||'',cover:{p:R(0,CPAL.length-1),m:'gradyan'},promo:1};const ad=S.ad,sel=albSel(),newS=sel.filter(s=>s.st==='kayit'),pb=PROMO[ad.promo];
 const cost=newS.reduce((a,x)=>a+relCost(x),0)+pb,q=sel.length?Math.round(sel.reduce((a,x)=>a+sq(x),0)/sel.length):0,typ=sel.length>=5?'Albüm':'EP';
 let h=`<div class="songhead"><div class="cov" id="cvalb">${vinylSVG({meta:{cover:ad.cover},t:ad.n,id:99},true)}</div><div class="shx"><span class="pill">${typ} · ${sel.length} şarkı</span><p class="note" style="margin-top:6px">${typ==='EP'?'3-4 şarkı EP olarak çıkar. 5 ve üstü albüm sayılır.':'Albüm tüm dijital platformlarda yayınlanır; albümdeki şarkılar daha fazla ilgi görür.'}</p></div></div>`;
 h+=sec('Bilgiler')+`<label class="lab">${typ} adı</label><input class="inp" value="${esc(ad.n)}" maxlength="28" oninput="S.ad.n=this.value;save();$('cvalb').innerHTML=vinylSVG({meta:{cover:S.ad.cover},t:S.ad.n,id:99},true)">`;
 h+=sec('Kapak')+covPicker(ad.cover,"(i=>{S.ad.cover.p=i;drawSheet()})","(k=>{S.ad.cover.m=k;drawSheet()})");
 h+=sec('Tanıtım bütçesi')+`<div class="tabs wrap">${PROMO.map((p,i)=>`<button class="tab ${ad.promo===i?'on':''}" onclick="S.ad.promo=${i};drawSheet()">${p?fmtS(p):'Yok'}</button>`).join('')}</div>`;
 h+=sec('Albüm kampanyası')+note('Çıkış öncesi adımlar albümdeki bütün şarkıların ilgisini artırır.')+row("ACT.albStep('tz')",'🎞','Teaser paylaş','İlgi +%12',ad.tz?'✓':fmtS(100000+S.fol*.2)+' · 1 hak',!!ad.tz)+row("ACT.albStep('party')",'🥂','Lansman partisi','İlgi +%15 · takipçi ↑',ad.party?'✓':fmtS(1e6*(1+S.fame/50))+' · 1 hak',!!ad.party);
 h+=sec(`Parça listesi · ${sel.length} seçili`)+note('Albüme girecek şarkılara dokunarak seç. 🆕 kayıtlı şarkılar albümle birlikte yayınlanır; 🎵 daha önce çıkan single\'lar albüme eklenir ve yeniden ilgi görür.')+`<div class="tabs wrap"><button class="tab sm" onclick="ACT.albAll(1)">Hepsini seç</button><button class="tab sm" onclick="ACT.albAll(0)">Temizle</button></div>`;
 pool.forEach(x=>{const on=ad.sel.includes(x.id),i=ad.sel.indexOf(x.id);h+=`<button class="row ${on?'sel':''}" onclick="ACT.albTog(${x.id})"><span class="ic">${on?`<b class="rk">${i+1}</b>`:'⬜️'}</span><span class="tx"><b>${x.st==='kayit'?'🆕':'🎵'} ${esc(x.t)}${x.feat?` <small>feat. ${esc(x.feat)}</small>`:''}</b><span>${x.st==='kayit'?'Kayıtlı, yayınlanmadı':'Single · '+num(x.total)+' dinlenme'} · kalite ${sq(x)}</span></span>${x.st==='kayit'?`<span class="rt" onclick="event.stopPropagation();sheet('kariyer',{t:'song',id:${x.id},title:'Yayına hazırla'})">Düzenle ›</span>`:''}</button>`});
 const ok=sel.length>=3&&canPay(cost);
 h+=sec('Özet')+`<div class="kv"><div>Tür<b>${typ}</b></div><div>Ortalama kalite<b>${q}/100</b></div><div>Yeni şarkı / single<b>${newS.length} / ${sel.length-newS.length}</b></div><div>Toplam maliyet<b>${fmtS(cost)}</b></div></div><button class="btn" onclick="ACT.album()" ${ok?'':'disabled'}>💿 ${typ}ı yayınla · ${fmtS(cost)} · 1 hak</button>${sel.length<3?note('En az 3 şarkı seç.'):''}`;return h};
ACT.album=()=>{const ad=S.ad;if(!ad)return;const sel=albSel();if(sel.length<3){toast('En az 3 şarkı seç.');return}ad.n=(ad.n||'').trim();if(!ad.n){toast('Bir ad ver.');return}if(S.albums.some(a=>a.n===ad.n)){toast('Bu adda bir albümün var.');return}
 const newS=sel.filter(s=>s.st==='kayit'),old=sel.filter(s=>s.st!=='kayit'),pb=PROMO[ad.promo],cost=newS.reduce((a,s)=>a+relCost(s),0)+pb;if(!canPay(cost)){toast('Paran yetmiyor: '+fmtS(cost));return}if(!useM(1))return;S.money-=cost;
 const q=Math.round(sel.reduce((a,s)=>a+sq(s),0)/sel.length),ep=sel.length<5,hy=1+(ad.tz?.12:0)+(ad.party?.15:0);
 newS.forEach(s=>{s.meta.cover={...ad.cover};doRelease(s,ad.n,pb/Math.max(1,newS.length)*2)});old.forEach(s=>{s.alb=ad.n;s.pot*=1.15+(pb?.1:0);s.rq=Math.max(s.rq||0,S.qt-1)});
 S.songs.filter(s=>s.alb===ad.n).forEach(s=>s.pot*=hy);if(S.contract)S.contract.rel+=newS.length;
 S.songs.filter(s=>s.alb===ad.n).forEach(s=>s.pot*=ep?1.05:1.12);
 S.albums.push({n:ad.n,age:S.age,q,songs:sel.map(s=>s.id),sales:0,cover:{...ad.cover},net:0,ep});
 log(`💿 "${ad.n}" ${ep?'EP\'n':'albümün'} çıktı! ${sel.length} şarkı (${newS.length} yeni${old.length?`, ${old.length} single`:''}), ortalama kalite ${q}. Tüm dijital platformlarda yayında; çıkış haftası ilgisi şarkıları yukarı taşıyacak.${hy>1?` Kampanya ilgiyi ×${hy.toFixed(2).replace('.',',')} artırdı.`:''}`,'gold');try{sJingle()}catch(e){}S.ad=null;SUB=null;sheet('kariyer')};
const _shK15=shKariyer;shKariyer=function(){let h=_shK15();if(SUB||S.age<14||!S.genre||h.includes('Albüm hazırla'))return h;const n=albPool().length;
 const r=row("sheet('kariyer',{t:'album',title:'Albüm / EP çıkar'})",'💿','Albüm / EP çıkar',n>=3?`${n} uygun şarkın var · kayıtlı şarkılar + single'lar`:`En az 3 şarkı gerekir (şu an ${n})`,'›');const i=h.indexOf(sec('Sahne'));return i>=0?h.slice(0,i)+r+h.slice(i):h+r};
/* sözleşme taahhüdü: bu sözleşmeyle yayınlanan şarkıları say */
function relSync(){const c=S&&S.contract;if(!c)return;if(c.st0==null)c.st0=S.age-(c.yrs-c.left)-1;const n=released().filter(s=>s.lab&&s.lab.n===c.n&&s.ra>=c.st0).length;if(n>c.rel)c.rel=n}
const _ei18=extInit;extInit=function(){_ei18();relSync()};
const _sg18=ACT.sign;if(_sg18)ACT.sign=(...a)=>{_sg18(...a);if(S.contract&&S.contract.st0==null)S.contract.st0=S.age};
actKeep();
