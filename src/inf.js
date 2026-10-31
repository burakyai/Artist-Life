/* ============ Süperstar: sınırsız hak ============ */
const INF=999;
const _um8=useM;useM=function(m){if(S&&S.star){S.months=INF;return true}return _um8(m)};
function infSync(){if(!S)return;if(S.star)S.months=INF;else if(S.months>HAK)S.months=HAK}
const infTxt=h=>h.replace(new RegExp(`${INF}\\s*/\\s*${HAK}( hak)?`,'g'),'∞ sınırsız').replace(new RegExp(`\\b${INF} hak\\b`,'g'),'∞ hak');
const _rn8=render;render=function(){infSync();_rn8();if(S&&S.star){const st=$('stats');if(st)st.innerHTML=infTxt(st.innerHTML)}};
const _ds8=drawSheet;drawSheet=function(){infSync();_ds8();if(S&&S.star){const b=document.querySelector('#ov .sh-b');if(b){const sc=b.scrollTop;b.innerHTML=infTxt(b.innerHTML);b.scrollTop=sc}}};
const _st8=ACT.starT;ACT.starT=()=>{_st8();infSync();render();drawSheet()};
const _sa8=shAyar;shAyar=function(){return _sa8().replace('Açık · olaylarda süperstar seçenekleri,','Açık · sınırsız hak, olaylarda süperstar seçenekleri,')};
actKeep();
