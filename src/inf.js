/* ============ Süperstar: sınırsız hak ============ */
const INF=999;
const _um8=useM;useM=function(m){if(S&&S.star){S.months=INF;return true}return _um8(m)};
function infSync(){if(!S)return;if(S.star)S.months=INF;else if(S.months>HAK+(S.hakB||0))S.months=HAK+(S.hakB||0)}
const infTxt=h=>h.replace(new RegExp(`${INF}\\s*/\\s*${HAK}( hak)?`,'g'),'∞ sınırsız').replace(new RegExp(`\\b${INF} hak\\b`,'g'),'∞ hak');
const _rn8=render;render=function(){infSync();_rn8();if(S&&S.star){const st=$('stats');if(st)st.innerHTML=infTxt(st.innerHTML)}};
const _ds8=drawSheet;drawSheet=function(){infSync();_ds8();if(S&&S.star){const b=document.querySelector('#ov .sh-b');if(b){const sc=b.scrollTop;b.innerHTML=infTxt(b.innerHTML);b.scrollTop=sc}}};
const _st8=ACT.starT;ACT.starT=()=>{_st8();infSync();render();drawSheet()};
const _sa8=shAyar;shAyar=function(){return _sa8().replace('Açık · olaylarda süperstar seçenekleri,','Açık · sınırsız hak, olaylarda süperstar seçenekleri,')};
actKeep();
/* Süperstar: şöhreti ayarla (takipçi şöhrete göre ayarlanır) */
ACT.selfFame=v=>{if(!S.star)return;let f=v==='in'?Number((document.getElementById('ss_f')||{}).value):v==='full'?100:S.fame+v;if(isNaN(f)){toast('0-100 arası bir şöhret yaz.');return}f=clamp(Math.round(f));
 S.fol=f<=0?Math.min(S.fol,150):Math.round(Math.pow(10,f/19.5+2.3));calcFame();log(`⭐ Şöhretin ${f} oldu (${num(S.fol)} takipçi).`,'gold');drawSheet()};
const _ss9=shSelf;shSelf=function(){let h=_ss9();if(!S.star)return h;const row2=`<div class="ngr"><div><b>Şöhret</b><span>${Math.round(S.fame)} / 100</span></div><div class="stp"><button onclick="ACT.selfFame(-10)">−10</button><button onclick="ACT.selfFame(10)">+10</button><button onclick="ACT.selfFame('full')">Full</button></div></div><div class="ngr"><div><b>Şöhreti yaz</b><span>0-100 · takipçin buna göre ayarlanır</span></div><div class="stp"><input class="inp" id="ss_f" type="number" min="0" max="100" inputmode="numeric" style="width:72px;margin:0" value="${Math.round(S.fame)}"><button onclick="ACT.selfFame('in')">Ayarla</button></div></div>`;
 const i=h.indexOf('<div class="ngr"><div><b>Takipçi');return i>=0?h.slice(0,i)+row2+h.slice(i):h+row2};
actKeep();
