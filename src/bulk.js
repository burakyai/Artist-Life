/* ============ Süperstar: toplu ve otomatik görüşme ============ */
function bulkMeet(auto){const L=[];let n=0;
 S.fam.forEach(p=>{if(p.alive!==false){p.yak=clamp(p.yak+R(4,9));p.done=1;n++}});
 S.kids.forEach(k=>{k.yak=clamp(k.yak+R(4,9));k.done=1;n++});
 S.friends.forEach(f=>{f.yak=clamp(f.yak+R(4,9));f.done=1;n++});
 if(S.partner){S.partner.yak=clamp(S.partner.yak+R(5,10));S.partner.done=1;n++}
 if(!n)return 0;add('happy',auto?3:5);log(`${auto?'Otomatik görüşme':'Toplu görüşme'}: ailen, ${S.partner?'sevgilin, ':''}${S.kids.length?'çocukların, ':''}${S.friends.length} arkadaşınla vakit geçirdin. Herkesle yakınlığın arttı.`,auto?'dim':'good');return n}
ACT.bulk=()=>{if(!S.star){toast('Toplu görüşme Süperstar modunda kullanılabilir.');return}if(!bulkMeet(false)){toast('Görüşecek kimse yok.');return}save();render();drawSheet()};
ACT.autoMeet=()=>{if(!S.star)return;S.autoMeet=!S.autoMeet;save();drawSheet()};
const _aq=ageUpQ;ageUpQ=function(){_aq();if(S&&S.alive&&S.star&&S.autoMeet){bulkMeet(true);save();if(!S._skipEv)render()}};
const bulkRows=()=>S.star?row('ACT.bulk()','👥','Toplu görüşme','Ailen, sevgilin, çocukların ve tüm arkadaşlarınla tek seferde · hak harcamaz','⭐')+row('ACT.autoMeet()','🔁','Otomatik görüşme',S.autoMeet?'Açık · her İLERLE\'de herkesle kendiliğinden görüşürsün':'Kapalı · dokun ve aç',S.autoMeet?'Kapat':'Aç'):'';
const _sh=shHayat;shHayat=function(){const h=_sh();if(SUB||(S.htab||'iliski')!=='iliski'||!S.star)return h;const k=h.indexOf('</div>',h.indexOf('class="tbar"'));return k<0?h:h.slice(0,k+6)+sec('⭐ Süperstar')+bulkRows()+h.slice(k+6)};
const _sa3=shAyar;shAyar=function(){const h=_sa3();return S.star?h.replace(sec('Görünüm'),bulkRows()+sec('Görünüm')):h};
