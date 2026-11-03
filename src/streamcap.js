/* ============ Gerçekçi dinlenme tavanları: ülke pazarına göre şarkı başı yıllık / ömür boyu ve sanatçı başı yıllık sınırlar ============ */
const STRCAP={tr:{n:'Türkiye',y:2.4e8,life:1.1e9,art:2.2e9},us:{n:'ABD',y:1.5e9,life:5e9,art:2.5e10},uk:{n:'İngiltere',y:1.0e9,life:4e9,art:1.5e10},de:{n:'Almanya',y:3e8,life:9e8,art:3e9},kr:{n:'Güney Kore',y:8e8,life:2.5e9,art:1e10},fr:{n:'Fransa',y:4.5e8,life:1.5e9,art:5e9}};
function capGlob(){let g=1;if(S.intl)g+=Object.values(S.intl).reduce((a,b)=>a+(b||0),0)/400;if(S.star)g*=3;return g}
function capStream(s,v,k){const C=STRCAP[S.ct||'tr']||STRCAP.tr,g=capGlob()*(k||1);if(!s._cj)s._cj=RF(.85,1.15);
 const qcap=C.y*g/4*s._cj;v=qcap*(1-Math.exp(-v/qcap));
 const life=C.life*g;v*=clamp(1-Math.pow((s.total||0)/life,2),.04,1);
 const ay=C.art*g;v*=1/(1+((S.yr&&S.yr.streams)||0)/ay);return v}
/* panelde pazar bilgisi */
{const _sp=shPanel;shPanel=function(){let h=_sp();if(SUB)return h;const C=STRCAP[S.ct||'tr']||STRCAP.tr,g=capGlob();
 return h.replace('<div class="sec">',note(`🌍 ${C.n} pazarı: bir şarkı yılda en fazla ~${num(C.y*g)} dinlenme, ömür boyu ~${num(C.life*g)} alabilir; sanatçının yıllık toplamı ~${num(C.art*g)} civarında doyar.${g>1.05?' Uluslararası popülerliğin bu tavanları yükseltiyor.':' Yurt dışı tanıtım ve turneler tavanı yükseltir.'}`)+'<div class="sec">')}}
if(typeof MROOT!=='undefined')MROOT.STRCAP=()=>STRCAP;
