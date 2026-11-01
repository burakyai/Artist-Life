/* ============ Şöhret zorlaştı: yüksek şöhret şartları, talk show ve kapaktan para yok, aktif değilsen şöhret düşer ============ */
const FREQ={talk:90,cover:75,ad:72,book:80,pod:71,crash:71,fc:71};
const fReq=k=>{if(S.star)return true;if(S.fame<FREQ[k]){toast(`Bunun için şöhretin ${FREQ[k]} olmalı (şu an ${Math.round(S.fame)}).`);return false}return true};
ACT.talk=()=>{if(!fReq('talk'))return;if(!yrOnce('talk')||!useM(1))return;const show=pick(['Gece Kuşu Şov','Akşam Sohbeti','Prime Time','Hafta Sonu Özel']);
 if(!S.star&&ch(.15+(S.happy<30?.2:0))){addF(-Math.round(S.fol*.02),'x');log(`📺 "${show}"da gergin anlar yaşadın, söylediklerin tepki çekti.`,'bad')}else{addF(Math.round(S.fol*RF(.04,.08)+2000),'x');log(`📺 "${show}" programına konuk oldun; konuşulan isim oldun, şöhretin arttı.`,'good')}drawSheet()};
ACT.cover=()=>{if(!fReq('cover'))return;if(!yrOnce('cover')||!useM(1))return;const mag=pick(['Vogue','GQ','Elle','Rolling Stone','Billboard','Esquire']),q=(S.looks+stil()*2)/2;
 addF(Math.round(S.fol*(q/900)+1500),'ig');log(`📸 ${mag} kapağında sen varsın! ${q>60?'Fotoğraflar olay oldu, şöhretin arttı.':'Fotoğraflar idare eder bulundu.'}`,q>60?'gold':'good');drawSheet()};
{const _ad=ACT.ad,_bk=ACT.book,_ps=ACT.podStart,_cr=ACT.crash,_fc=ACT.fcFound;ACT.ad=()=>{if(fReq('ad'))_ad()};ACT.book=()=>{if(fReq('book'))_bk()};ACT.podStart=()=>{if(fReq('pod'))_ps()};ACT.crash=()=>{if(fReq('crash'))_cr()};ACT.fcFound=()=>{if(fReq('fc'))_fc()}}
shFame=function(){const lk=k=>S.fame<FREQ[k]&&!S.star;let h=note(`Şöhret etkinlikleri için çok ünlü olman gerekir. Şu an şöhretin <b>${Math.round(S.fame)}</b>. Talk show ve dergi kapağı para kazandırmaz, şöhretini artırır.`);
 h+=row('ACT.talk()','📺','Talk show',`Şöhret ↑↑ · ücretsiz · şöhret ${FREQ.talk}+`,lk('talk')?`🔒 ${FREQ.talk}`:'1 hak',lk('talk'))+row('ACT.cover()','📸','Dergi kapağı',`Şöhret ↑ · görünüşün etkiler · şöhret ${FREQ.cover}+`,lk('cover')?`🔒 ${FREQ.cover}`:'1 hak',lk('cover'))+
  row('ACT.ad()','🎬','Reklam filmi',`Ücretli · şöhret ${FREQ.ad}+`,lk('ad')?`🔒 ${FREQ.ad}`:'2 hak',lk('ad'))+row('ACT.book()','📖','Otobiyografi yaz',`25 yaş · şöhret ${FREQ.book}+`,lk('book')?`🔒 ${FREQ.book}`:'3 hak',lk('book'));
 h+=S.pod?row('ACT.podEp()','🎙',`Podcast: ${esc(S.pod.n)}`,`${num(S.pod.subs)} abone · ${S.pod.eps} bölüm`,'Bölüm çek'):row('ACT.podStart()','🎙','Podcast başlat',`Şöhret ${FREQ.pod}+`,lk('pod')?`🔒 ${FREQ.pod}`:'1 hak',lk('pod'));
 return h+row('ACT.crash()','🤪','Kontrolden çık',`Ya viral olursun ya rezil · şöhret ${FREQ.crash}+`,lk('crash')?`🔒 ${FREQ.crash}`:'1 hak',lk('crash'))};
FPAGES.fame[1]=shFame;
/* ---------- yıllık şöhret düşüşü ---------- */
function fameDecay(){if(S.age<16||!S.genre||S.fol<1000)return;const rel=released(),thisY=rel.filter(s=>s.ra>=S.age-1).length,
 hit2=rel.some(s=>s.ra>=S.age-2&&((s.peak&&s.peak<=20)||s.gpeak||s.viral||(s.lq||0)/13>=1e6)),hit1=rel.some(s=>s.ra>=S.age-1&&((s.peak&&s.peak<=20)||s.gpeak||s.viral));
 let f=1,why='';if(S.star)return;
 if(!thisY&&!hit1){f*=.6;why='Bu yıl hiç şarkı çıkarmadın'}else if(!hit1){f*=.85;why='Bu yıl hit çıkaramadın'}
 if(S.age>=40&&!hit2){f*=.65;why+=(why?'; ':'')+'40 yaşından sonra hit bulamamak gözden düşürüyor'}
 if(S.retired)f=Math.min(f,.9);
 if(f<1){const l=Math.round(S.fol*(1-f));S.fol-=l;calcFame();log(`📉 ${why}. Takipçilerinden ${num(l)} kişi kaybettin; şöhretin ${Math.round(S.fame)}'e düştü.`,'bad')}}
const _yt17=yearTick;yearTick=function(){_yt17();if(S&&S.alive)fameDecay()};
actKeep();
