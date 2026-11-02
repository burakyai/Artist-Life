/* ============ Gerçekçi ekonomi (süperstar modu hariç): şarkıların çoğu tutmaz, takipçi zor büyür, ünlü olmanın ekip ve yaşam masrafı vardır ============ */
/* 1) Şarkı potansiyeli: çoğu şarkı orta halli kalır, az bir kısmı tutar */
{const _pf=potFor;potFor=function(s,boost){let v=_pf(s,boost);if(S.star)return v;const q=s.q||50,hit=ch(clamp(.03+(q-55)/220,.02,.22)+(s.feat?.03:0));s._hit=hit;
 v*=hit?RF(1.6,3):RF(.35,.75);return v}}
/* 2) Takipçi büyümesi: büyüdükçe zorlaşır; yıl içinde şarkı çıkarmazsan takipçi kaybedersin */
const folK=f=>.6*Math.min(1,Math.pow(5e4/Math.max(5e4,f),.28));
function folDamp(){if(S.star){S._f0=S.fol;return}const f0=S._f0==null?S.fol:S._f0,g=S.fol-f0;if(g>0){S.fol=Math.round(f0+g*folK(f0));calcFame()}S._f0=S.fol}
{const _aq=ageUpQ;ageUpQ=function(){if(S&&S.alive)folDamp();_aq();if(S&&S.alive)folDamp()}}
{const _yt=yearTick;yearTick=function(){if(S&&!S.star&&S.genre&&S.age>=16){const rel=released().filter(s=>s.ra===S.age).length,loss=rel?.03:.08;const l=Math.round(S.fol*loss);if(l>0){S.fol-=l;S._f0=S.fol;calcFame();log(`📉 Yıl içinde ${num(l)} takipçi kaybettin${rel?'':' (hiç şarkı çıkarmadın)'}.`,'dim')}}_yt()}}
/* 3) Ünlü olmanın masrafı: menajer, PR, stilist, asistan, şoför, güvenlik, kuaför — şöhretle büyür */
function teamCost(){if(!S||S.age<18)return 0;const f=S.fame||0;if(f<40)return 0;return Math.round(Math.pow(Math.max(0,f-35)/10,2.8)*170000/1e4)*1e4}
const TEAMN=f=>f>=85?'menajer, PR ajansı, stilist, asistan, şoför, güvenlik ekibi, kuaför-makyöz ve yol ekibi':f>=65?'menajer, PR, stilist, asistan, şoför ve güvenlik':f>=45?'menajer, stilist ve asistan':'menajer ve stilist';
{const _yt=yearTick;yearTick=function(){if(S&&S.alive&&!S.star&&S.age>=18&&teamCost()>0)log(`💼 Ekip ve ünlü yaşam giderleri (${TEAMN(S.fame)}) bu yıl toplam ${fmtS(teamCost())} tuttu.`,'dim');_yt()}}
actKeep();
