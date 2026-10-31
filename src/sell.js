/* ============ Şirketi sat: katalog değerlemesi, alıcı teklifleri, pazarlık ============ */
const BUYERS=[['Universal Music',1.15,90],['Sony Music',1.1,85],['Warner Music',1.05,80],['ONErpm',.9,45],['DMC',.85,35],['Believe',.95,55],['Concord',1,60],['Hipgnosis Songs',1.2,70]];
function labYrs(){const L=S.lab;L.yh=L.yh||[];return L.yh}
const _ly8=labYear;labYear=function(){const L=S.lab;if(L){const y=labYrs();const g0=L._g0||0,s0=L._s0||0,st=L.songs.reduce((a,s)=>a+s.total,0);y.push({age:S.age,g:L.tot.gross-g0,st:st-s0});L._g0=L.tot.gross;L._s0=st;if(y.length>12)y.shift();
 if(!L.sale&&labPop()>=25&&ch(.22)&&catYear().g>2e6)labOffers(1,true)}_ly8()};
/* yıllık katalog: son N yılın ortalaması (yeterli yıl yoksa son çeyrekten tahmin) */
function catYear(n){const L=S.lab,y=labYrs().slice(-(n||10)),qst=L.songs.reduce((a,s)=>a+(s.lq||0),0)*4,qg=L.lastQ?L.lastQ.gross*4:0;
 if(!y.length)return {g:qg,st:qst,yrs:0};const g=y.reduce((a,x)=>a+x.g,0)/y.length,st=y.reduce((a,x)=>a+x.st,0)/y.length;return {g:Math.max(g,qg*.5),st:Math.max(st,qst*.5),yrs:y.length}}
function labPop(){const L=S.lab,fol=L.arts.reduce((a,x)=>a+x.fol,0),hits=L.songs.filter(s=>s.total>=1e7).length,cat=catYear().st;
 return clamp(Math.round(Math.log10(1+fol)*6+Math.log10(1+cat)*3+hits*3+L.feats.length*1.5-20))}
const multFor=p=>p>=70?10:p>=40?7:5;
function labAppraise(){const L=S.lab,p=labPop(),m=multFor(p),cy=catYear(m),assets=BLDS.find(b=>b.id===L.bld).p*.9+L.feats.reduce((a,f)=>a+BFEAT.find(x=>x.id===f).p*.5,0);
 return {p,m,cy,assets,cash:L.cash,val:Math.round(cy.g*m+assets+L.cash+L.arts.reduce((a,x)=>a+x.fol*3,0))}}
function labOffers(n,unsol){const L=S.lab,A=labAppraise();L.sale=L.sale||{offers:[]};const pool=BUYERS.filter(b=>A.p+20>=b[2]*.6&&!L.sale.offers.some(o=>o.b===b[0]));
 for(let i=0;i<n&&pool.length;i++){const b=pool.splice(R(0,pool.length-1),1)[0];const val=Math.round(A.val*b[1]*RF(.82,1.08)/1e5)*1e5;
  L.sale.offers.push({id:S.nid++,b:b[0],val,base:val,pat:R(2,4),m:A.m});if(unsol)log(`📩 ${b[0]} ${L.n}'ı satın almak istiyor: ${fmtS(val)} teklif etti. (Şirket › Şirketi sat)`,'gold')}
 if(n&&!pool.length&&!L.sale.offers.length)log('Şu an şirketine ilgi duyan büyük bir firma yok.','dim')}
ACT.labForSale=()=>{const L=S.lab;if(L.sale&&L.sale.offers.length>=3){toast('Masada zaten teklifler var.');return}if(!useM(1))return;const p=labPop();labOffers(S.star?3:p>=60?3:p>=35?2:1);
 log(`${L.n} satışa çıkarıldı. Yatırım bankası alıcılarla görüştü.`,'good');drawSheet()};
ACT.labCounter=(id,pct)=>{const L=S.lab,o=L.sale.offers.find(x=>x.id===id);if(!o)return;if(!useM(1))return;const ask=o.val*(1+pct/100),over=ask/o.base-1;
 const pAcc=S.star?1:clamp(.92-over*3.2+(labPop()-50)/200,.03,.95);
 if(ch(pAcc)){o.val=Math.round(ask/1e5)*1e5;log(`${o.b} karşı teklifini kabul etti: yeni teklif ${fmtS(o.val)}.`,'gold')}
 else{o.pat--;if(o.pat<=0||ch(over*.8)){L.sale.offers=L.sale.offers.filter(x=>x!==o);log(`${o.b} pazarlıktan çekildi: "Bu rakamda anlaşamayız."`,'bad')}else{o.val=Math.round(o.val*RF(1.01,1.05)/1e5)*1e5;log(`${o.b} karşı teklifi reddetti ama biraz yükseldi: ${fmtS(o.val)}.`,'dim')}}drawSheet()};
ACT.labReject=id=>{const L=S.lab;L.sale.offers=L.sale.offers.filter(x=>x.id!==id);drawSheet()};
ACT.labSell=id=>{const L=S.lab,o=L.sale.offers.find(x=>x.id===id);if(!o)return;const own=S.ipo?S.ipo.mine/IPO_N:1,mine=Math.round(o.val*own),tax=Math.round(mine*.1),net=mine-tax;
 const tk=S.ipo?S.ipo.tk:(L.n.replace(/[^A-Za-z]/g,'').toUpperCase()+'XXXX').slice(0,4);
 S.money+=net;S.tot.all=(S.tot.all||0)+net;
 /* şirket borsada kalmaya devam eder */
 S.xstk=S.xstk||[];let sid=tk;while(STOCKS.some(x=>x.id===sid))sid=sid.slice(0,3)+R(1,9);const st={id:sid,n:`${L.n} (${o.b})`,mu:.09,sg:.25};S.xstk.push(st);STOCKS.push(st);
 const p=o.val/IPO_N;S.mkt[sid]={p,h:[p]};
 L.arts.forEach(a=>{if(a.kid){const k=S.kids.find(x=>x.id===a.kid);if(k)k.signed=0}});
 S.soldLabs=S.soldLabs||[];S.soldLabs.push({n:L.n,b:o.b,val:o.val,mine,age:S.age,tk:sid});
 log(`🤝 ${L.n}'ı ${o.b}'a ${fmtS(o.val)}'ye sattın!${own<1?` Senin payın %${Math.round(own*100)}: ${fmtS(mine)}.`:''} Vergi ${fmtS(tax)}, kasana net ${fmtS(net)} girdi. Şirket ${sid} koduyla borsada işlem görmeye devam ediyor.`,'gold');
 sJingle&&sJingle();S.lab=null;S.ipo=null;sheet('kariyer',{t:'lab',title:'Şirketim'})};
function saleCard(){const L=S.lab,A=labAppraise(),y=labYrs();
 const avg=n=>{const s=y.slice(-n);return s.length?fmtS(s.reduce((a,x)=>a+x.g,0)/s.length):'—'};
 let h=`<div class="card"><div class="ch"><b>💼 Değerleme</b><span class="pill">Popülerlik ${A.p}/100</span></div>`+
  note(`Alıcılar kataloğun yıllık gelirinin son ${A.m} yılının ortalamasını alır ve ${A.m} katıyla çarpar. Popülerlik ${A.p<40?'40':'70'}'i geçince çarpan ${A.p<40?'7':'10'}'a çıkar.`)+
  `<div class="kv"><div>5 yıllık ort. gelir<b>${avg(5)}</b></div><div>7 yıllık ort.<b>${avg(7)}</b></div><div>10 yıllık ort.<b>${avg(10)}</b></div><div>Yıllık katalog dinlenme<b>${num(A.cy.st)}</b></div><div>Çarpan<b>${A.m}×</b></div><div>Bina, kasa, sanatçılar<b>${fmtS(A.val-A.cy.g*A.m)}</b></div></div>`+
  `<div class="tk"><span>Tahmini şirket değeri</span><b class="gold">${fmtS(A.val)}</b></div>${y.length<A.m?note(`Şirketin ${y.length} yıllık geçmişi var; eksik yıllar son 3 ayın gelirinden tahmin edildi.`):''}</div>`;
 h+=row('ACT.labForSale()','📣','Şirketi satışa çıkar','Büyük firmalar teklif versin','1 hak');
 ((L.sale&&L.sale.offers)||[]).forEach(o=>{const own=S.ipo?S.ipo.mine/IPO_N:1;h+=`<div class="card"><div class="ch"><b>🏦 ${esc(o.b)}</b><span class="pill">${o.pat} pazarlık hakkı</span></div><div class="tk"><span>Teklif</span><b class="gold">${fmtS(o.val)}</b></div>${note(`İlk teklif ${fmtS(o.base)} · ${own<1?`senin payın %${Math.round(own*100)} → ${fmtS(o.val*own)} · `:''}%10 vergi kesilir`)}<div class="tabs wrap"><button class="tab sm" onclick="ACT.labCounter(${o.id},10)">+%10 iste</button><button class="tab sm" onclick="ACT.labCounter(${o.id},25)">+%25 iste</button><button class="tab sm" onclick="ACT.labCounter(${o.id},50)">+%50 iste</button><button class="tab sm" onclick="ACT.labReject(${o.id})">Reddet</button></div><button class="btn" style="margin-top:8px" onclick="ACT.labSell(${o.id})">🤝 Kabul et ve sat</button></div>`});
 return h}
const _shLab8=shLab;shLab=function(){let h=_shLab8();if(!S.lab){if(S.soldLabs&&S.soldLabs.length)h=sec('Sattığın şirketler')+S.soldLabs.map(x=>row('','🏢',esc(x.n),`${x.age} yaşında ${x.b}'a sattın · ${fmtS(x.val)} · borsada ${x.tk}`,fmtS(x.mine))).join('')+note('Yeni bir şirket kurabilirsin.')+h;return h}
 const A=labAppraise(),n=((S.lab.sale&&S.lab.sale.offers)||[]).length;return h.replace('<label class="lab">Şirket adı</label>',row("sheet('kariyer',{t:'labsale',title:'Şirketi sat'})",'💼','Şirketi sat',`Tahmini değer ${fmtS(A.val)} · ${A.m}× çarpan${n?` · ${n} teklif masada`:''}`,n?'🔔 ›':'›')+'<label class="lab">Şirket adı</label>')};
const _shK8=shKariyer;shKariyer=function(){if(SUB&&SUB.t==='labsale'){if(!S.lab){SUB={t:'lab',title:'Şirketim'};return shLab()}return saleCard()}return _shK8()};
const _ei8=extInit;extInit=function(){_ei8();(S.xstk||[]).forEach(x=>{if(!STOCKS.some(s=>s.id===x.id))STOCKS.push(x)})};
actKeep();
