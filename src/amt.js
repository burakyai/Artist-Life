/* ============ Tutar yazarak para işlemleri ============ */
function fmtIn(v){const d=String(v).replace(/\D/g,'').slice(0,15);return d?Number(d).toLocaleString('tr-TR'):''}
function amtV(id){const e=document.getElementById(id);return e?Number((e.value||'').replace(/\D/g,''))||0:0}
const amtIn=(id,ph)=>`<input class="inp amt" id="${id}" inputmode="numeric" autocomplete="off" placeholder="${ph||'Tutarı yaz (₺)'}" oninput="this.value=fmtIn(this.value)">`;
function need(x){if(!x||x<=0){toast('Önce tutarı yaz.');return false}return true}
const btns=arr=>`<div class="two">${arr.map(([l,on,cls])=>`<button class="mini ${cls||''}" onclick="${on}">${l}</button>`).join('')}</div>`;
ACT.payout=(pid,to,amt)=>{const ids=pid==='all'?PLAT.map(p=>p.id):[pid];const avail=ids.reduce((a,k)=>a+S.pend[k],0);let x=amt==null?avail:Math.min(amt,avail);if(amt!=null&&!need(amt))return;if(x<1){toast('Çekilecek bakiye yok.');return}
 ids.forEach(k=>{const take=avail?x*S.pend[k]/avail:0;S.pend[k]-=take});if(to==='bank')S.bank+=x;else S.money+=x;
 log(`${pid==='all'?'Platform hesaplarından':PLAT.find(p=>p.id===pid).n+' hesabından'} ${fmtS(x)} ${to==='bank'?'banka hesabına':'kasana'} çektin.`,'good');drawSheet();render()};
function payoutBox(pid){const x=pid==='all'?pendT():(S.pend[pid]||0),id='po_'+pid;return `<div class="card pay"><div class="ch"><b>💰 ${pid==='all'?'Platformlarda bekleyen telif':'Hesap bakiyesi'}</b><span class="pill gold">${fmtS(x)}</span></div>${note(pid==='all'?'Net telif gelirin her 3 ayda platform hesaplarında birikir. İstediğin kadarını, istediğin zaman çek.':'Bu platformdan kazandığın net telif burada birikir.')}${pid==='all'?`<div class="kv">${PLAT.map(p=>`<div>${p.n}<b>${fmtS(S.pend[p.id]||0)}</b></div>`).join('')}</div>`:''}
 ${amtIn(id,'Çekilecek tutar (₺)')}${btns([['Kasaya çek',`ACT.payout('${pid}','cash',amtV('${id}'))`],['Bankaya aktar',`ACT.payout('${pid}','bank',amtV('${id}'))`,'sec']])}<div style="height:6px"></div>${btns([['Tümünü kasaya',`ACT.payout('${pid}','cash')`,'sec'],['Tümünü bankaya',`ACT.payout('${pid}','bank')`,'sec']])}</div>`}
function shBank(){let h=`<div class="hero2"><small>Banka hesabın</small><div class="big">${fmtS(S.bank)}</div><span>Mevduat faizi yıllık %15 (3 ayda bir işler) · Kasandaki nakit ${fmtS(S.money)}</span></div>`;
 h+=sec('Mevduat')+amtIn('bk_a')+btns([['Yatır','ACT.dep(amtV(\'bk_a\'))'],['Çek','ACT.wd(amtV(\'bk_a\'))','sec']])+`<div style="height:6px"></div>`+btns([['Tüm nakdi yatır',"ACT.dep('all')",'sec'],['Tümünü çek',"ACT.wd('all')",'sec']]);
 h+=sec('Kredi')+`<div class="kv"><div>Kredi borcun<b class="${S.loan?'neg':''}">${fmtS(S.loan)}</b></div><div>Kalan limit<b>${fmtS(Math.max(0,loanLimit()-S.loan))}</b></div></div>`+note('Kredi faizi yıllık %42. Limit şöhretine ve mevduatına göre artar.')+amtIn('bk_l','Kredi tutarı (₺)')+btns([['Kredi çek','ACT.loanT(amtV(\'bk_l\'))'],['Borç öde','ACT.loanP(amtV(\'bk_l\'))','sec']])+`<div style="height:6px"></div>`+btns([['Tüm borcu kapat',"ACT.loanP('all')",'sec']]);return h}
const _dep=ACT.dep,_wd=ACT.wd,_lt=ACT.loanT,_lp=ACT.loanP;
ACT.dep=x=>{if(x!=='all'&&!need(x))return;_dep(x)};ACT.wd=x=>{if(x!=='all'&&!need(x))return;_wd(x)};ACT.loanT=x=>{if(!need(x))return;_lt(x)};ACT.loanP=x=>{if(x!=='all'&&!need(x))return;_lp(x)};
const _buy=ACT.buy;ACT.buy=(id,x)=>{if(x!=='all'&&!need(x))return;_buy(id,x)};
ACT.sellAmt=(id,x)=>{if(!need(x))return;const h=S.port[id];if(!h)return;const v=h.q*S.mkt[id].p;ACT.sell(id,Math.min(1,x/v))};
const _pm=ACT.pMoney;ACT.pMoney=x=>{if(!need(x))return;_pm(x)};
const _lm=ACT.labMove;ACT.labMove=(d,x)=>{if(x!=='all'&&!need(x))return;_lm(d,x)};
ACT.advSet=(id,v)=>{const o=S.offers.find(x=>x.id===id);if(!o||!v)return;o.ask.adv=v;o.ok=false;o.msg='';drawSheet()};
ACT.offAdv=(id,v)=>{const a=S.lab.cand.find(x=>x.id===id);if(!a||!v)return;a.ask=a.ask||askBase(a);a.ask.adv=v;drawSheet()};
