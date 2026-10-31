/* ============ Gezinme: kaydırma korunur, son sekmeye dön, İLERLE geri al · Süperstar şirket · Plak şirketi hisseleri ve halka arz ============ */
/* ---------- Kaydırma konumu korunur ---------- */
const shKey=()=>SHEET+'|'+JSON.stringify(SUB||0)+'|'+(S&&(S.htab+S.ptab))||'';
let _lastKey=null;
const _ds9=drawSheet;drawSheet=function(){const b=document.querySelector('#ov .sh-b'),k=shKey(),sc=b?b.scrollTop:0;_ds9();const b2=document.querySelector('#ov .sh-b');if(b2&&SHEET){b2.scrollTop=k===_lastKey?sc:0;_lastKey=k}};
/* ---------- Son sekmeye dön ---------- */
let LAST=null;
function ltDraw(){const e=$('ltb');if(!e)return;const T={kariyer:'Kariyer',panel:'Panel',gard:'Gardırop',hayat:'Hayat',ayar:'Ayarlar'};
 if(LAST&&!SHEET&&S&&S.alive){e.innerHTML=`↩ ${(LAST.sub&&LAST.sub.title)||T[LAST.k]||'Geri'}`;e.style.display='inline-flex'}else e.style.display='none'}
const _cs9=closeSheet;closeSheet=function(){if(SHEET){const b=document.querySelector('#ov .sh-b');LAST={k:SHEET,sub:SUB?JSON.parse(JSON.stringify(SUB)):null,sc:b?b.scrollTop:0}}_cs9();_lastKey=null;ltDraw()};
function goLast(){if(!LAST)return;const L=LAST;sheet(L.k,L.sub);requestAnimationFrame(()=>{const b=document.querySelector('#ov .sh-b');if(b)b.scrollTop=L.sc;_lastKey=shKey()})}
const _sh9=sheet;sheet=function(k,sub){_sh9(k,sub);ltDraw()};
/* ---------- İLERLE geri al ---------- */
let UNDO=[];
function udDraw(){const e=$('udb');if(e)e.style.display=UNDO.length&&S&&S.alive?'block':'none'}
const _au9=ageUp;ageUp=function(){if(S&&S.alive){try{UNDO.push(JSON.stringify(S));if(UNDO.length>3)UNDO.shift()}catch(e){}}_au9();udDraw()};
function undoAge(){if(!UNDO.length)return;S=JSON.parse(UNDO.pop());$('mod').classList.remove('on');if(SHEET)_cs9();SHEET=null;SUB=null;save();render();udDraw();ltDraw();toast('Son İLERLE geri alındı.')}
function navInit(){if($('ltb'))return;const st=$('stats');st.insertAdjacentHTML('beforebegin','<div style="position:relative;height:0;z-index:5"><button id="ltb" class="ltb" onclick="goLast()" style="display:none"></button></div>');
 document.querySelector('.nav').insertAdjacentHTML('beforeend','<button id="udb" class="udb" onclick="undoAge()" style="display:none" aria-label="Geri al">↶ GERİ AL</button>')}
const _rn9=render;render=function(){_rn9();navInit();ltDraw();udDraw()};

/* ---------- Süperstar: şirketi tam düzenle ---------- */
ACT.labStar=k=>{if(!S.star||!S.lab)return;const L=S.lab;
 if(k==='stars')L.arts.forEach(a=>{a.tal=100;a.happy=100;a.fol=Math.max(a.fol*10,2e6)});
 if(k==='tal')L.arts.forEach(a=>a.tal=100);if(k==='fol')L.arts.forEach(a=>a.fol=Math.round(a.fol*2+1e5));if(k==='happy')L.arts.forEach(a=>a.happy=100);
 if(k==='cash')L.cash+=1e8;if(k==='bld'){L.bld=BLDS[BLDS.length-1].id;L.feats=BFEAT.map(f=>f.id)}
 if(k==='con')L.arts.forEach(a=>{a.con.left+=5;a.con.yrs+=5});if(k==='recoup')L.arts.forEach(a=>{a.con.unrec=0});
 if(k==='cand'){L.cand=[newCand(),newCand(),newCand()];L.cand.forEach(a=>{a.tal=clamp(a.tal+40);a.fol*=5})}
 if(k==='demos')L.arts.forEach(a=>{a.demos=a.demos.map(d=>({...d,q:100}))});
 log('⭐ Şirket süperstar modunda düzenlendi.','gold');drawSheet()};
ACT.artStar=id=>{if(!S.star)return;const a=S.lab.arts.find(x=>x.id===id);a.tal=100;a.happy=100;a.fol=Math.max(a.fol*10,2e6);a.demos.forEach(d=>d.q=100);log(`⭐ ${a.name} bir gecede yıldız oldu: yetenek 100, takipçi ${num(a.fol)}.`,'gold');drawSheet()};
const _shArt9=shArt;shArt=function(id){let h=_shArt9(id);if(!S.star||!S.lab)return h;const a=S.lab.arts.find(x=>x.id===id);if(!a)return h;
 const i=h.indexOf(sec('⭐ Süperstar: sanatçıyı düzenle'));const btn=`<button class="btn" style="margin:8px 0" onclick="ACT.artStar(${id})">⭐ Tek tuşla yıldız yap (yetenek + ün + mutluluk Full)</button>`;
 return i>=0?h.slice(0,i)+sec('⭐ Süperstar: sanatçıyı düzenle')+btn+h.slice(i+sec('⭐ Süperstar: sanatçıyı düzenle').length):h+btn};

/* ---------- Plak şirketi hisseleri ---------- */
const LSTK=[{id:'ONE',n:'ONErpm',lab:'ONErpm',mu:.12,sg:.4},{id:'DMC',n:'DMC Müzik',lab:'DMC',mu:.1,sg:.3},{id:'SONY',n:'Sony Music',lab:'Sony Music',mu:.08,sg:.18},{id:'WMG',n:'Warner Music Group',lab:'Warner Music',mu:.08,sg:.2},{id:'UMG',n:'Universal Music Group',lab:'Universal Music',mu:.09,sg:.18}];
LSTK.forEach(x=>{if(!STOCKS.some(s=>s.id===x.id))STOCKS.push(x)});
function stkInit(){S.mkt=S.mkt||{};S.port=S.port||{};STOCKS.forEach(x=>{if(!S.mkt[x.id]){const p=x.lab?R(40,260):R(12,180);S.mkt[x.id]={p,h:[p]}}})}
const _mq9=marketQ;marketQ=function(){stkInit();_mq9();
 LSTK.forEach(x=>{const ss=released().filter(s=>s.lab&&s.lab.n===x.lab),st=ss.reduce((a,s)=>a+(s.lq||0),0);let b=0;
  if(st>0)b+=Math.min(.18,Math.log10(1+st/5e6)*.06);const hit=ss.filter(s=>s.rq===S.qt-1||s.rq===S.qt).some(s=>s.peak&&s.peak<=10||s.gpeak);if(hit)b+=RF(.04,.1);
  if(S.lab&&S.contract&&S.contract.n===x.lab)b+=0;if(b>0){const m=S.mkt[x.id];m.p*=Math.exp(b);m.h[m.h.length-1]=m.p;if(b>.06){const hd=S.port[x.id];log(`📈 Hitlerin ${x.n} hissesini uçurdu: bu çeyrek ek %${Math.round((Math.exp(b)-1)*100)} değer kazandı${hd?`. Senin hisselerin ${fmtS(hd.q*m.p)} değerinde`:''}.`,'gold')}}});
 ipoQuarter()};
/* ---------- Kendi şirketinin halka arzı ---------- */
const IPO_N=1e6;
const ipoP=()=>labValue()*S.ipo.mult/IPO_N;
function ipoTick(){S.ipo.h.push(ipoP());if(S.ipo.h.length>40)S.ipo.h.shift()}
ACT.ipo=pct=>{const L=S.lab;if(!L||S.ipo)return;const v=labValue();if(v<5e7&&!S.star){toast('Halka arz için şirket değeri en az ₺50 Mn olmalı.');return}if(!useM(2))return;
 S.ipo={tk:(L.n.replace(/[^A-Za-zÇĞİÖŞÜçğıöşü]/g,'').toUpperCase().replace(/[ÇĞİÖŞÜ]/g,c=>({Ç:'C',Ğ:'G',İ:'I',Ö:'O',Ş:'S',Ü:'U'}[c]))+'XXXX').slice(0,4),mult:RF(1.1,1.4),mine:IPO_N*(1-pct/100),h:[],age:S.age};
 const p=ipoP(),raise=Math.round(IPO_N*pct/100*p*.95);L.cash+=raise;ipoTick();log(`🔔 ${L.n} Borsa İstanbul'da işlem görmeye başladı (${S.ipo.tk})! Hissenin %${pct}'i halka arz edildi, şirket kasasına ${fmtS(raise)} girdi. Hisse fiyatı ₺${p.toFixed(2).replace('.',',')}.`,'gold');sJingle&&sJingle();drawSheet()};
ACT.ipoSell=pct=>{const I=S.ipo;if(!I)return;const n=I.mine*pct/100;if((I.mine-n)/IPO_N<.51){toast('Şirketin kontrolünü korumak için en az %51 hisse sende kalmalı.');return}if(!useM(1))return;const p=ipoP(),v=Math.round(n*p*.98);I.mine-=n;S.money+=v;I.mult*=.97;log(`${I.tk} hisselerinin bir kısmını sattın: ${fmtS(v)} kasana girdi. Payın %${(I.mine/IPO_N*100).toFixed(1)}.`,'good');drawSheet()};
ACT.ipoBuy=pct=>{const I=S.ipo;if(!I)return;const n=Math.min(IPO_N-I.mine,IPO_N*pct/100),c=Math.round(n*ipoP()*1.02);if(n<=0){toast('Bütün hisseler zaten sende.');return}if(!canPay(c)){toast('Geri alım için '+fmtS(c)+' gerekli.');return}S.money-=c;I.mine+=n;I.mult*=1.02;log(`${I.tk} hisselerini geri aldın (${fmtS(c)}). Payın %${(I.mine/IPO_N*100).toFixed(1)}.`,'good');drawSheet()};
ACT.ipoDiv=()=>{const I=S.ipo,L=S.lab;if(!I)return;const d=Math.round(L.cash*.2);if(d<1e5){toast('Kasada dağıtılacak kâr yok.');return}L.cash-=d;const mine=Math.round(d*I.mine/IPO_N);S.money+=mine;I.mult*=1.03;log(`${L.n} ${fmtS(d)} temettü dağıttı. Senin payına ${fmtS(mine)} düştü.`,'good');drawSheet()};
ACT.ipoPump=()=>{if(!S.star||!S.ipo)return;S.ipo.mult*=1.5;S.ipo.h.push(ipoP());log(`⭐ ${S.ipo.tk} hissesi tavan üstüne tavan yaptı!`,'gold');drawSheet()};
function ipoQuarter(){if(!S.ipo||!S.lab)return;const L=S.lab,I=S.ipo,hits=L.songs.filter(s=>(s.lq||0)/13>=220000).length;
 I.mult=clamp(I.mult*Math.exp(.12*gauss()-.007)+hits*.04+(L.arts.length?0:-.05),.4,6);ipoTick();if(hits)log(`📈 ${L.n} sanatçılarının hitleriyle borsada yükseldi: ${I.tk} ₺${ipoP().toFixed(2).replace('.',',')}.`,'good')}
function ipoCard(){const I=S.ipo,L=S.lab;if(!L)return '';
 if(!I){const v=labValue(),ok=v>=5e7||S.star;return sec('Borsa · Halka arz')+note(`Şirketini Borsa İstanbul'da halka arz et. Satılan hisselerin parası şirket kasasına girer; hisse fiyatı şirket değeri ve sanatçılarının hitleriyle yükselir. Şirket değeri: ${fmtS(v)}${ok?'':' · en az ₺50 Mn gerekli'}`)+
  `<div class="tabs wrap">${[10,25,49].map(p=>`<button class="tab sm" ${ok?'':'disabled'} onclick="ACT.ipo(${p})">%${p} halka arz · ~${fmtS(IPO_N*p/100*v*1.25/IPO_N*.95)}</button>`).join('')}</div>`+note('Halka arz 2 hak sürer.')}
 const p=ipoP(),ph=I.h[I.h.length-2]||p,chg=(p/ph-1)*100,mc=p*IPO_N,own=I.mine/IPO_N;
 return sec(`Borsa · ${I.tk}`)+`<div class="card stk"><div class="ch"><b>${I.tk} <small>${esc(L.n)}</small></b><span class="${chg>=0?'up':'dn'}">${chg>=0?'▲':'▼'} %${Math.abs(chg).toFixed(1)}</span></div><div class="srow">${spark(I.h.length>1?I.h:[p,p],chg>=0?'#6fd39a':'#ff7d73')}<div><b>₺${p.toLocaleString('tr-TR',{maximumFractionDigits:2})}</b><span>Piyasa değeri ${fmtS(mc)}</span></div></div>`+
  note(`Senin payın %${(own*100).toFixed(1)} · değeri ${fmtS(I.mine*p)} · halka açık %${((1-own)*100).toFixed(1)}`)+
  `<div class="tabs wrap"><button class="tab sm" onclick="ACT.ipoSell(5)">%5'ini sat</button><button class="tab sm" onclick="ACT.ipoSell(10)">%10'unu sat</button><button class="tab sm" onclick="ACT.ipoBuy(5)">%5 geri al</button><button class="tab sm" onclick="ACT.ipoBuy(100)">Hepsini geri al</button><button class="tab sm" onclick="ACT.ipoDiv()">Temettü dağıt</button>${S.star?'<button class="tab sm" onclick="ACT.ipoPump()">⭐ Hisseyi uçur</button>':''}</div></div>`}
const _shLab9=shLab;shLab=function(){let h=_shLab9();if(!S.lab)return h;
 if(S.star)h=h.replace(sec('Kasa'),sec('⭐ Süperstar: şirketi düzenle')+`<button class="btn" onclick="ACT.labStar('stars')">⭐ Bütün sanatçıları tek tuşla yıldız yap</button><div class="tabs wrap" style="margin-top:8px">${[['tal','Yetenekler Full'],['fol','Takipçiler ×2'],['happy','Herkes mutlu'],['cash','Kasaya +₺100 Mn'],['bld','En iyi bina + tüm modifiyeler'],['con','Sözleşmelere +5 yıl'],['recoup','Avans borçlarını sil'],['demos','Demolar 100 kalite'],['cand','Süper yetenekler bul']].map(([k,n])=>`<button class="tab sm" onclick="ACT.labStar('${k}')">${n}</button>`).join('')}</div>`+sec('Kasa'));
 return h.replace(sec('Bina'),ipoCard()+sec('Bina'))};
const _shB9=shBorsa;shBorsa=function(){stkInit();let h=_shB9();
 if(S.contract){const x=LSTK.find(l=>l.lab===S.contract.n);if(x)h=h.replace('<div class="card stk">',note(`💡 ${x.n} ile sözleşmelisin. Senin şarkıların hit oldukça ${x.id} hissesi yükselir.`)+'<div class="card stk">')}
 if(S.ipo&&S.lab)h=ipoCard()+h;return h};
const _ei9=extInit;extInit=function(){_ei9();stkInit()};
