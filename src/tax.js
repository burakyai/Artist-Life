/* ============ Yıllık gelir vergisi beyannamesi · kurumlar vergisi · taksit ve haciz ============ */
const BR={tr:[[158000,.15],[330000,.20],[800000,.27],[4300000,.35],[Infinity,.40]],
 us:[[11925,.10],[48475,.12],[103350,.22],[197300,.24],[250525,.32],[626350,.35],[Infinity,.37]],
 uk:[[12570,0],[50270,.20],[125140,.40],[Infinity,.45]]};
const CORP={tr:.25,us:.21,uk:.25};
function progTax(ct,inc){let t=0,prev=0;let br=BR[ct];if(ct==='uk'&&inc>100000){const pa=Math.max(0,12570-(inc-100000)/2);br=[[pa,0],[50270,.2],[125140,.4],[Infinity,.45]]}
 for(const [lim,r] of br){if(inc>prev){t+=(Math.min(inc,lim)-prev)*r}prev=lim}return t}
const stateR=()=>(S.ct==='us'?(cityOf()[2]||0):0);
/* kaynakta kesinti (stopaj): beyanname yılsonunda farkı hesaplar */
const WH={tr:.20,us:.22,uk:.20};
taxR=function(gross){if(!S||gross<=0)return 0;const ct=S.ct||'tr',w=WH[ct]+stateR();S.yti=(S.yti||0)+gross;S.yInc=(S.yInc||0)+gross;S.yWith=(S.yWith||0)+gross*w;return w};
function annualTax(){const ct=S.ct||'tr',C=CTRY[ct],inc=(S.yInc||0)/C.rate;return Math.round((progTax(ct,inc)+inc*stateR())*C.rate)}
const effR=()=>{const i=S.yInc||0;return i?annualTax()/i:0};
function taxYear(){hacizCheck();const inc=S.yInc||0,wh=Math.round(S.yWith||0);if(inc<=0){S.yInc=0;S.yWith=0;return}const due=annualTax(),diff=due-wh,C=C0();
 S.taxHist=(S.taxHist||[]).concat({age:S.age,inc,wh,due,ct:S.ct||'tr'}).slice(-15);S.yInc=0;S.yWith=0;
 if(diff>1000){S.evq.push({id:'beyan',p:{inc,wh,due,diff,age:S.age}})}else if(diff<-1000){S.money+=-diff;log(`🧾 Yıllık beyanname: yıl içinde fazla vergi kesilmiş, ${fmtS(-diff)} iade aldın.`,'good')}
}
function hacizCheck(){
 if(S.taxDue>0&&S.taxDueAge<S.age){const t=Math.round(S.taxDue*1.25);let left=t;const fm=Math.min(Math.max(0,S.money),left);S.money-=fm;left-=fm;const fb=Math.min(S.bank,left);S.bank-=fb;left-=fb;if(left>0)S.money-=left;S.taxDue=0;add('happy',-10);S.fol=Math.round(S.fol*.98);log(`⚖️ Ödenmeyen vergi borcun için haciz geldi: gecikme cezasıyla ${fmtS(t)} hesaplarından tahsil edildi. Magazin de duydu.`,'bad')}}
EVENTS.push({id:'beyan',min:99,c:()=>false,title:'Yıllık gelir vergisi beyannamesi',text:p=>`Bu yılki toplam gelirin ${fmtS(p.inc)}. Kademeli gelir vergisi ${fmtS(p.due)} (efektif %${Math.round(p.due/p.inc*100)}). Yıl içinde kaynakta ${fmtS(p.wh)} kesildi; ödemen gereken fark ${fmtS(p.diff)}.`,ch:[
  {t:'Hemen öde',fn:p=>{S.money-=p.diff;log(`🧾 Gelir vergisi farkını ödedin: ${fmtS(p.diff)}.`,'dim')}},
  {t:'4 taksitte öde (%8 faiz)',fn:p=>{const t=Math.round(p.diff*1.08);S.taxInst={left:4,amt:Math.round(t/4)};log(`🧾 Vergi borcu 4 taksite bölündü: her 3 ayda ${fmtS(t/4)}.`,'dim')}},
  {t:'Şimdilik ödeme',fn:p=>{S.taxDue=(S.taxDue||0)+p.diff;S.taxDueAge=p.age!=null?p.age:S.age-1;log(`⚠️ ${fmtS(p.diff)} vergi borcun var. Gelecek yıla kadar ödemezsen %25 gecikme cezasıyla haciz gelir.`,'bad')}}]});
EVSTAR.beyan=['Muhasebecin tüm giderleri düşürdü',p=>{const v=Math.round(p.diff*.2);S.money-=v;log(`🧾 Usta muhasebecin sayesinde sadece ${fmtS(v)} ödedin.`,'gold')}];
/* kurumlar vergisi: plak şirketi yıllık kârı */
function corpYear(){const L=S.lab;if(!L)return;const ct=S.ct||'tr',prof=(L.tot.net||0)-(L._ny0||0);L._ny0=L.tot.net||0;if(prof<=0)return;const t=Math.round(prof*CORP[ct]);L.cash-=t;L.taxPaid=(L.taxPaid||0)+t;log(`🏢 ${L.n} kurumlar vergisi: yıllık kâr ${fmtS(prof)}, vergi %${Math.round(CORP[ct]*100)} → ${fmtS(t)}.`,'dim')}
/* inşaat kârları da gelir sayılır */
if(typeof conClose==='function'){const _cc=conClose;conClose=function(p){const prof=p.inc-p.spent;_cc(p);if(prof>0){S.yInc=(S.yInc||0)+prof}}}
const _yt11=yearTick;yearTick=function(){if(S&&S.alive){taxYear();corpYear()}_yt11()};
const _aq11=ageUpQ;ageUpQ=function(){_aq11();if(S&&S.alive&&S.taxInst){S.money-=S.taxInst.amt;S.taxInst.left--;if(S.taxInst.left<=0){S.taxInst=null;log('🧾 Vergi taksitlerinin hepsi ödendi.','good')}}};
ACT.payDebt=()=>{if(!S.taxDue)return;if(!pay(S.taxDue))return;log(`🧾 Vergi borcunu kapattın: ${fmtS(S.taxDue)}.`,'good');S.taxDue=0;drawSheet()};
function shTax(){const ct=S.ct||'tr',C=C0(),inc=S.yInc||0,due=annualTax(),wh=Math.round(S.yWith||0);
 let h=`<div class="hero2"><small>Bu yılki vergilendirilebilir gelir</small><div class="big">${fmtS(inc)}</div><span>Kaynakta kesilen ${fmtS(wh)} · tahmini yıllık vergi ${fmtS(due)} · ${due-wh>=0?'yıl sonunda ödenecek fark '+fmtS(due-wh):'iade '+fmtS(wh-due)}</span></div>`;
 h+=note(`${C.fl} ${C.n}: konser, reklam, telif ve diğer gelirlerinden yıl içinde %${Math.round((WH[ct]+stateR())*100)} kaynakta kesilir. Her yılın sonunda kademeli gelir vergisi beyannamesi verilir; aradaki fark ödenir ya da iade edilir. Plak şirketi kârına %${Math.round(CORP[ct]*100)} kurumlar vergisi uygulanır.`);
 h+=sec('Vergi dilimleri')+`<div class="kv">${(ct==='uk'?BR.uk:BR[ct]).map(([l,r],i,a)=>`<div>${i?fmtS((a[i-1][0])*C.rate)+' üstü':'İlk '+fmtS(l*C.rate)}<b>%${Math.round(r*100)}</b></div>`).join('')}${stateR()?`<div>Eyalet vergisi<b>%${(stateR()*100).toFixed(1)}</b></div>`:''}</div>`;
 if(S.taxDue>0)h+=`<div class="card" style="border-color:var(--bad)"><b class="neg">⚠️ Vergi borcun: ${fmtS(S.taxDue)}</b>${note('Bir sonraki yıl sonuna kadar ödemezsen %25 gecikme cezasıyla haciz gelir.')}<button class="btn" onclick="ACT.payDebt()">Borcu öde</button></div>`;
 if(S.taxInst)h+=note(`🧾 Taksit: ${S.taxInst.left} taksit kaldı, her 3 ayda ${fmtS(S.taxInst.amt)}.`);
 if(S.lab)h+=note(`🏢 ${esc(S.lab.n)} bugüne kadar ${fmtS(S.lab.taxPaid||0)} kurumlar vergisi ödedi.`);
 if((S.taxHist||[]).length)h+=sec('Geçmiş beyannameler')+S.taxHist.slice().reverse().map(t=>row('','🧾',`${t.age} yaş · ${CTRY[t.ct].fl} gelir ${fmtS(t.inc)}`,`Vergi ${fmtS(t.due)} (efektif %${Math.round(t.due/t.inc*100)}) · kesilen ${fmtS(t.wh)}`,'')).join('');return h}
const _shH11=shHayat;shHayat=function(){if(SUB&&SUB.t==='tax')return shTax();let h=_shH11();if(SUB||(S.htab||'iliski')!=='finans')return h;
 return h.replace(sec('Finans'),sec('Finans')+row("sheet('hayat',{t:'tax',title:'Vergi'})",'🧾','Vergi',`Bu yıl ${fmtS(S.yInc||0)} gelir · tahmini vergi ${fmtS(annualTax())}${S.taxDue?' · ⚠️ borç '+fmtS(S.taxDue):''}`,'›'))};
taxLbl=()=>`%${Math.round((WH[S.ct||'tr']+stateR())*100)} kaynakta kesinti`;
actKeep();
