/* ============ Yıl sonu özeti (Wrapped): en çok dinlenen şarkılar, gelir, takipçi, şöhret ============ */
const WRAP_CSS=`.sh-b{overflow-x:hidden}.wrp{border-radius:18px;padding:16px 14px;color:#fff;background:linear-gradient(160deg,#1a0b2e 0%,#5b1fa6 45%,#ff4fa3 100%);text-align:left;position:relative;overflow:hidden}
.wrp:before{content:'';position:absolute;inset:-40%;background:radial-gradient(circle at 70% 20%,rgba(255,255,255,.18),transparent 40%),radial-gradient(circle at 20% 80%,rgba(255,230,0,.18),transparent 40%);pointer-events:none}
.wrp *{position:relative}.wrp .wy{font:900 13px/1 var(--cond);letter-spacing:.2em;opacity:.8;text-transform:uppercase}.wrp h3{margin:4px 0 10px;font-size:22px;line-height:1.1}
.wrp .wbig{font:900 34px/1 var(--cond);letter-spacing:.02em;margin:2px 0}.wrp .wsm{font-size:12px;opacity:.85;margin-bottom:10px}
.wrp .wl{background:rgba(0,0,0,.28);border-radius:12px;padding:8px 10px;margin:6px 0}.wrp .wl div{display:flex;justify-content:space-between;gap:8px;font-size:13px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.08)}.wrp .wl div:last-child{border:0}
.wrp .wl b{font-family:var(--cond);letter-spacing:.03em;white-space:nowrap}.wrp .wg{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px}.wrp .wg div{background:rgba(255,255,255,.12);border-radius:10px;padding:7px 9px;font-size:11px;opacity:.95}.wrp .wg b{display:block;font:900 17px/1.2 var(--cond)}
.wrp .wq{font-size:12px;font-style:italic;opacity:.9;margin-top:10px}`;
if(!document.getElementById('wrapcss')){const st=document.createElement('style');st.id='wrapcss';st.textContent=WRAP_CSS;document.head.appendChild(st)}
function wrapBuild(){const age=S.age,rel=released();const top=rel.map(s=>{const h=(s.hy||[]).find(x=>x.age===age);return {t:s.t,st:h?h.st:0,r:h?h.r:null,gr:h?h.gr:null,nw:s.ra===age}}).filter(x=>x.st>0).sort((a,b)=>b.st-a.st);
 const streams=S.yr.streams||0,rels=rel.filter(s=>s.ra===age).length,alb=(S.albums||[]).filter(a=>a.age===age||a.ra===age).length;
 const w0=S.wr0||{fol:S.fol,fame:S.fame,money:S.money+S.bank};const best=top.reduce((m,x)=>x.r&&(!m||x.r<m)?x.r:m,null),bestG=top.reduce((m,x)=>x.gr&&(!m||x.gr<m)?x.gr:m,null);
 const inc={stream:S.yr.stream||0,gig:S.yr.gig||0,brand:S.yr.brand||0,alb:S.yr.alb||0,pro:S.yr.pro||0};const tot=Object.values(inc).reduce((a,b)=>a+b,0);
 const lis=Math.round(streams/38),min=streams*3.3;
 return {age,ct:S.ct||'tr',city:S.city,streams,top:top.slice(0,5),rels,alb,inc,tot,fol:Math.round(S.fol),dFol:Math.round(S.fol-w0.fol),fame:Math.round(S.fame),dFame:Math.round(S.fame-w0.fame),best,bestG,lis,min,viral:rel.filter(s=>s.viral&&s.ra===age).length,awards:(S.awards||[]).filter(a=>a.age===age).length}}
function wrapHTML(w,inModal){const C=CTRY[w.ct]||CTRY.tr;
 const topH=w.top.length?`<div class="wl">${w.top.map((x,i)=>`<div><span>${i+1}. ${esc(x.t)}${x.nw?' <small>yeni</small>':''}</span><b>${num(x.st)}</b></div>`).join('')}</div>`:note('Bu yıl hiç dinlenmen olmadı.');
 const incH=`<div class="wl">${[['🎧 Streaming (net)',w.inc.stream],['🎤 Konserler',w.inc.gig],['📣 Reklam & marka',w.inc.brand],['💿 Albüm',w.inc.alb],['🎼 Telif kuruluşu',w.inc.pro]].filter(x=>x[1]>0).map(x=>`<div><span>${x[0]}</span><b>${fmtS(x[1])}</b></div>`).join('')||'<div><span>Müzik geliri yok</span><b>—</b></div>'}</div>`;
 const quote=w.streams>5e7?'Bu yıl senin yılındı. Dünya seni dinledi.':w.streams>5e6?'Milyonlar seni dinledi. Sahne artık senin.':w.streams>5e5?'Kulaktan kulağa yayılıyorsun.':w.streams>0?'Her büyük hikâye küçük başlar.':'Stüdyoya dönme vakti.';
 return `<div class="wrp"><div class="wy">${C.fl} ${esc(w.city||C.n)} · ${w.age} yaş</div><h3>${esc(S.stage||S.first)}, işte yılın özeti</h3>
 <div class="wsm">Toplam dinlenme</div><div class="wbig">${num(w.streams)}</div><div class="wsm">≈ ${num(w.lis)} farklı dinleyici · ${w.min>=6e7?Math.round(w.min/6e7)+' Mn saat':num(Math.round(w.min/60))+' saat'} müzik${w.viral?` · ${w.viral} viral şarkı`:''}</div>
 <div class="wsm" style="font-weight:800;opacity:1">🏆 En çok dinlenen şarkıların</div>${topH}
 <div class="wsm" style="font-weight:800;opacity:1;margin-top:8px">💰 Müzikten kazandıkların · ${fmtS(w.tot)}</div>${incH}
 <div class="wg"><div>Takipçi<b>${num(w.fol)}</b>${w.dFol>=0?'+':''}${num(w.dFol)} bu yıl</div><div>Şöhret<b>${w.fame}</b>${w.dFame>=0?'+':''}${w.dFame} bu yıl</div><div>Yayınlanan<b>${w.rels} şarkı</b>${w.alb?w.alb+' albüm':'albüm yok'}</div><div>Liste<b>${w.best?'#'+w.best:'—'}</b>${w.bestG?'Global #'+w.bestG:w.best?(w.best<=10?'🔥 hit yılı':'listeye girdin'):'listeye giremedin'}</div></div>
 <div class="wq">"${quote}"</div></div>${inModal?`<button class="btn" style="margin-top:10px" onclick="wrapClose()">Devam</button>`:''}`}
function wrapClose(){S.evq.shift();$('mod').classList.remove('on');save();render();if(S.evq.length)setTimeout(showEvent,150)}
EVENTS.push({id:'wrap',min:99,c:()=>false,title:'Yılın özeti',text:()=>'',ch:[{t:'Devam',fn:()=>{}}]});
{const _se=showEvent;showEvent=function(){const q=S.evq[0];if(q&&q.id==='wrap'){$('mod').innerHTML=`<div class="box" style="padding:12px">${wrapHTML(q.p,true)}</div>`;$('mod').classList.add('on');return}_se()}}
{const _yt=yearTick;yearTick=function(){if(S&&S.alive&&S.genre&&S.age>=14){try{const w=wrapBuild();if(w.streams>0||w.rels>0||w.tot>0){S.wraps=(S.wraps||[]).concat(w).slice(-25);S.evq.push({id:'wrap',p:w})}}catch(e){console.error(e)}}_yt();if(S)S.wr0={fol:S.fol,fame:S.fame,money:S.money+(S.bank||0)}}}
function shWraps(){const L=(S.wraps||[]).slice().reverse();if(!L.length)return note('Henüz yıl özetin yok. Şarkı yayınladığın her yılın sonunda özet çıkar.');
 const sel=SUB&&SUB.age!=null?L.find(w=>w.age===SUB.age):L[0];let h=`<div class="tabs wrap">${L.map(w=>`<button class="tab sm ${w===sel?'on':''}" onclick="SUB.age=${w.age};drawSheet()">${w.age} yaş</button>`).join('')}</div>`;return h+wrapHTML(sel,false)}
{const _sk=shKariyer;shKariyer=function(){if(SUB&&SUB.t==='wraps')return shWraps();let h=_sk();if(SUB||S.age<16)return h;const L=S.wraps||[],l=L[L.length-1];
 const r=row("sheet('kariyer',{t:'wraps',title:'Yıl özetlerin'})",'🎁','Yıl özetlerin',l?`Son yıl ${num(l.streams)} dinlenme · ${fmtS(l.tot)} gelir`:'Her yıl sonunda dinlenme, gelir ve takipçi özeti','›');const i=h.indexOf(sec('Sahne'));return i>=0?h.slice(0,i)+r+h.slice(i):r+h}}
actKeep();
