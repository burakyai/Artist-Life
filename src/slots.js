/* ============ Kayıt yuvaları ve ana menü ============ */
const NSLOT=3;let SLOT=(()=>{try{return +localStorage.getItem('sahne2-aktif')||1}catch(e){return 1}})();
const skey=n=>'sahne2-slot-'+n;
function save(){if(!S)return;try{localStorage.setItem(skey(SLOT),JSON.stringify(S));localStorage.setItem('sahne2-aktif',SLOT)}catch(e){}}
function load(){try{const t=localStorage.getItem(skey(SLOT));return t?JSON.parse(t):null}catch(e){return null}}
function peek(n){try{const t=localStorage.getItem(skey(n));return t?JSON.parse(t):null}catch(e){return null}}
(function migrate(){try{const old=localStorage.getItem('sahne2-kayit');if(old&&!localStorage.getItem(skey(1))){localStorage.setItem(skey(1),old)}if(old)localStorage.removeItem('sahne2-kayit')}catch(e){}})();
let MENU=true,DELQ=null;
function boot(){if(MENU&&!S){drawTitle();return}
 if(!S){S=load();if(S){S.songs.forEach(x=>{x.meta=x.meta||defMeta(x.g);x.mon=x.mon||MON0();x.hy=x.hy||[]});extInit()}}
 if(!S){drawCreate();return}
 $('title').classList.remove('on');$('create').classList.remove('on');$('game').classList.add('on');document.body.classList.toggle('big',!!S.big);render();
 if(!S.alive){showDeath();return}if(S.evq&&S.evq.length)showEvent()}
function drawTitle(){$('game').classList.remove('on');$('create').classList.remove('on');$('title').classList.add('on');
 let h=`<div class="cwrap"><h1 class="logo">ARTIST <span>LIFE</span></h1><p class="tag">Mahalleden stadyuma bir ömür</p><img class="appic" src="icon-512.png" alt="" onerror="this.remove()"><div class="sec" style="text-align:left">Kayıtlar</div>`;
 for(let n=1;n<=NSLOT;n++){const p=peek(n);
  if(!p)h+=`<button class="slot empty" onclick="slotNew(${n})"><span class="sic">＋</span><span class="stx"><b>Boş yuva ${n}</b><span>Yeni bir hayat başlat</span></span><span class="sgo">Yeni oyun ›</span></button>`;
  else{const t=(()=>{const f=p.fame||0,g=p.genre?GENRES[p.genre].p.toLowerCase():'';if(!p.genre)return p.age<18?'Öğrenci':'Müzik sever';return (f<10?'Amatör ':f<25?'Yerel ':f<45?'Yükselen ':f<65?'Ünlü ':f<85?'Süperstar ':'Efsane ')+g})();
   h+=`<div class="slot ${p.alive?'':'dead'}"><button class="sbody" onclick="slotOpen(${n})"><span class="av sav">${AV(p.look,p.age)}</span><span class="stx"><b>${esc(p.first+' '+p.last)}</b><span>${p.age} yaş · ${SEASON[p.q||0]} · ${t}</span><span>${fmtS(p.money)} · ${num(p.fol||0)} takipçi${p.lab?' · '+esc(p.lab.n):''}${p.alive?'':' · <em>Hayatı sona erdi</em>'}</span></span><span class="sgo">${p.alive?'Devam ›':'Özet ›'}</span></button>
   ${DELQ===n?`<div class="sdel"><span>Yuva ${n} silinsin mi?</span><button class="mini red" onclick="slotDel(${n})">Evet, sil</button><button class="mini sec" onclick="DELQ=null;drawTitle()">Vazgeç</button></div>`:`<button class="sx" onclick="DELQ=${n};drawTitle()" aria-label="Sil">🗑</button>`}</div>`}}
 h+=`<p class="note" style="margin-top:14px">Kayıtlar bu cihazın hafızasında tutulur. Her İLERLE 3 ay; her 3 ayda 10 hakkın var.</p></div>`;$('title').innerHTML=h}
function slotNew(n){SLOT=n;MENU=false;S=null;CR=null;try{localStorage.setItem('sahne2-aktif',n)}catch(e){}drawCreate()}
function slotOpen(n){SLOT=n;MENU=false;S=null;try{localStorage.setItem('sahne2-aktif',n)}catch(e){}boot()}
function slotDel(n){try{localStorage.removeItem(skey(n))}catch(e){}DELQ=null;drawTitle()}
function toMenu(){save();closeSheet();$('mod').classList.remove('on');S=null;MENU=true;DELQ=null;drawTitle()}
function restart(){try{localStorage.removeItem(skey(SLOT))}catch(e){}S=null;MENU=false;CR=null;$('mod').classList.remove('on');closeSheet();drawCreate()}
const _dc=drawCreate;drawCreate=function(){$('title').classList.remove('on');_dc();const w=document.querySelector('#create .cwrap');if(w&&!w.querySelector('.back')){const b=document.createElement('button');b.className='back';b.textContent='‹ Ana menü';b.onclick=()=>{MENU=true;drawTitle()};w.prepend(b)}};
const _sa=shAyar;shAyar=function(){let h=_sa();return h.replace(sec('Kayıt'),sec('Kayıt')+row('toMenu()','🏠','Ana menü','Kayıt yuvaları, başka bir hayata geç','›'))};
