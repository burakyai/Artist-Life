var NATHC=['siyah','kahve','kumral','sari','kizil','gri','beyaz','platin','kul','bal','bakir','gumus'];
/* ============ Yeni saç modelleri (gölgeli, tel detaylı) + yeni saç renkleri + büyük önizlemeli berber ============ */
Object.assign(HCOL,{kul:'#b8a07a',bal:'#a8733a',bakir:'#b5552a',bordo:'#6b1d2c',kirmizi:'#c4262e',acikpembe:'#f3a6c6',lila:'#b49ddc',turkuaz:'#24a9a6',yesil:'#3f8f4f',gumus:'#c4c9d1',turuncu:'#e2761c',gece:'#1c2638'});
Object.assign(HCOL_N,{kul:'Kül sarısı',bal:'Bal köpüğü',bakir:'Bakır',bordo:'Bordo',kirmizi:'Kırmızı',acikpembe:'Açık pembe',lila:'Lila',turkuaz:'Turkuaz',yesil:'Yeşil',gumus:'Gümüş',turuncu:'Turuncu',gece:'Gece mavisi'});
let _h3=0;const h3id=p=>p+'h3'+(++_h3);
function h3grad(c,dir){const id=h3id('g'),hi=shade(c,34),lo=shade(c,-30);return [`<defs><linearGradient id="${id}" x1="0" y1="0" x2="${dir==='x'?1:0}" y2="${dir==='x'?0:1}"><stop offset="0" stop-color="${hi}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="${lo}"/></linearGradient></defs>`,`url(#${id})`]}
const h3ln=(d,col,w,op)=>{if(col&&col.length===7&&col!=='#ffffff'){const v=parseInt(col.slice(1,3),16)+parseInt(col.slice(3,5),16)+parseInt(col.slice(5,7),16);if(v<60)col='#5a4a40'}return h3ln0(d,col,w,op)};const h3ln0=(d,col,w,op)=>`<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round"${op!=null?` opacity="${op}"`:''}/>`;
/* kenarları kısa (fade): üstte koyu, kulağa doğru silinen */
function h3fade(c,lines){const id=h3id('f'),mk=h3id('m');const m=lines?`<mask id="${mk}"><rect x="0" y="0" width="100" height="100" fill="#fff"/><path d="M38.4 22.6 Q40.6 21.6 43 22.2 M38.6 24.6 Q40.8 23.6 43.2 24.2" stroke="#000" stroke-width=".75" fill="none"/></mask>`:'';
 return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".95"/><stop offset=".6" stop-color="${c}" stop-opacity=".7"/><stop offset="1" stop-color="${c}" stop-opacity=".08"/></linearGradient>${m}</defs><path d="M37.2 31.5 Q36 16 50 12.4 Q64 16 62.8 31.5 Q61.4 24 59 21 Q50 18.4 41 21 Q38.6 24 37.2 31.5Z" fill="url(#${id})" stroke="none"${lines?` mask="url(#${mk})"`:''}/>`}
/* kıvırcık bulut: çok sayıda küçük bukle */
function h3curls(c,pts,r){const dark=parseInt(c.slice(1,3),16)+parseInt(c.slice(3,5),16)+parseInt(c.slice(5,7),16)<200,lo=dark?shade(c,30):shade(c,-38),hi=shade(c,dark?60:42);let o='',f='',t='';pts=pts.map(([x,y],i)=>[+(x+(((i*53)%9)-4)*.11).toFixed(2),+(y+(((i*31)%7)-3)*.13).toFixed(2)]);pts.forEach(([x,y],i)=>{const rr=r*(1+((i*37)%7-3)/18);o+=`<circle cx="${x}" cy="${y}" r="${(rr+.6).toFixed(2)}" fill="${OL2}"/>`;f+=`<circle cx="${x}" cy="${y}" r="${rr.toFixed(2)}" fill="${i%3?c:shade(c,8)}"/>`;
  const a=(i*67)%360;t+=`<g transform="rotate(${a} ${x} ${y})"><path d="M${(x+rr*.5).toFixed(2)} ${y} A${(rr*.5).toFixed(2)} ${(rr*.5).toFixed(2)} 0 1 0 ${x} ${(y+rr*.5).toFixed(2)} A${(rr*.25).toFixed(2)} ${(rr*.25).toFixed(2)} 0 1 0 ${(x+rr*.15).toFixed(2)} ${(y+rr*.05).toFixed(2)}" stroke="${lo}" stroke-width=".38" fill="none" opacity=".9"/></g><path d="M${(x-rr*.6).toFixed(2)} ${(y-rr*.1).toFixed(2)} q${(rr*.3).toFixed(2)} -${(rr*.6).toFixed(2)} ${(rr*.8).toFixed(2)} -${(rr*.55).toFixed(2)}" stroke="${hi}" stroke-width=".35" fill="none" opacity=".6" stroke-linecap="round"/>`});return `<g stroke="none">${o}${f}${t}</g>`}
function h3grid(x0,x1,y0,y1,dx,dy,f){const p=[];let row=0;for(let y=y0;y<=y1;y+=dy,row++)for(let x=x0+(row%2?dx/2:0);x<=x1;x+=dx)if(!f||f(x,y))p.push([+x.toFixed(2),+y.toFixed(2)]);return p}
/* tek bir dread: kalın, burgulu */
function h3loc(x0,y0,x1,y1,c,w){const lo=shade(c,-36),hi=shade(c,30),mx=(x0+x1)/2+(x1-x0)*.15,my=(y0+y1)/2;const d=`M${x0} ${y0} Q${mx} ${my} ${x1} ${y1}`;
 return `<path d="${d}" stroke="${OL2}" stroke-width="${w+1}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${lo}" stroke-width="${w*.8}" fill="none" stroke-dasharray=".5 1.15" opacity=".75"/><path d="${d}" stroke="${hi}" stroke-width="${w*.25}" fill="none" opacity=".35" transform="translate(-.4 0)"/>`}
const HAIR3={
 /* ---------- ERKEK ---------- */
 locs:{n:'Uzun dread',g:'u',
  back:c=>{let s='';[[35.4,24,31.6,62],[37,25,34.8,64],[38.6,26,37.6,60],[64.6,24,68.4,62],[63,25,65.2,64],[61.4,26,62.4,60],[36.6,30,33.8,56],[63.4,30,66.2,56]].forEach(a=>s+=h3loc(...a,c,3));return s},
  front:c=>{const[d,u]=h3grad(c);let s=d+`<path d="M36.8 31 Q35 13.4 50 10.4 Q65 13.4 63.2 31 Q61.8 22.6 58 20.4 Q50 18 42 20.4 Q38.2 22.6 36.8 31Z" fill="${u}"/>`;
   [[42,11.6,39.2,22],[46,10.6,44.2,20.4],[50,10.2,50,19.6],[54,10.6,55.8,20.4],[58,11.6,60.8,22]].forEach(([a,b,x,y])=>s+=h3ln(`M${a} ${b} Q${(a+x)/2} ${(b+y)/2-1} ${x} ${y}`,shade(c,-38),.55,.8));
   s+=h3loc(39.6,20,36.4,40,c,2.8)+h3loc(60.4,20,63.6,40,c,2.8)+h3loc(42.4,19.6,38.8,34,c,2.6)+h3loc(57.6,19.6,61.2,34,c,2.6);return s}},
 curlfade:{n:'Kıvırcık + fade çizgi',g:'e',
  front:c=>{const pts=h3grid(40.4,59.6,9.2,18.8,2.3,2,(x,y)=>Math.hypot((x-50)/10.8,(y-15.4)/7.2)<=1);return h3fade(c,true)+h3curls(c,pts,1.75)}},
 frofade:{n:'Afro üst + fade',g:'e',
  front:c=>{const pts=h3grid(38.4,61.6,5.4,19.6,2.45,2.1,(x,y)=>Math.hypot((x-50)/12.6,(y-13.4)/9)<=1);return h3fade(c,false)+h3curls(c,pts,1.95)}},
 crew:{n:'Kısa kesim + kontur',g:'u',
  front:c=>{const[d,u]=h3grad(c);let s=d+h3fade(c,false)+`<path d="M38.2 25.6 Q37.4 14.6 50 12.2 Q62.6 14.6 61.8 25.6 L60.6 21.4 Q60.2 19.6 58.4 19.4 L41.6 19.4 Q39.8 19.6 39.4 21.4Z" fill="${u}"/>`;
   for(let x=41;x<=59;x+=1.6)for(let y=14.4;y<=18.6;y+=1.5)if(Math.hypot((x-50)/10,(y-16)/4.6)<1)s+=h3ln(`M${x.toFixed(1)} ${y.toFixed(1)} l.35 -.55`,shade(c,-34),.35,.7);
   return s+h3ln('M41.6 19.4 L58.4 19.4',shade(c,-40),.5,.9)}},
 messy:{n:'Dağınık orta boy',g:'u',
  front:c=>{const[d,u]=h3grad(c);const lo=shade(c,-36),hi=shade(c,38);
   return d+`<path d="M36.6 33 Q34.4 15.4 43 10.6 Q50 7.6 57.4 10.4 Q66 14.6 63.4 33 L62 28.4 L60.8 31 L60.2 24.6 L57.4 27.6 L57 21.6 L54 24.2 L52.6 19.6 L50 23.6 L48.2 19.4 L45.6 24.6 L44.2 20 L41.6 25.4 L40.6 22.6 L39.2 30 L38 26.4Z" fill="${u}"/>`+
    h3ln('M41 13.4 Q44 16 44.2 20 M46 11.4 Q48.4 15 48.2 19.4 M51 10.4 Q52.6 15 52.6 19.6 M55.6 11 Q57 15.6 57 21.6 M59.6 13.4 Q60.6 18 60.2 24.6',lo,.55,.85)+
    h3ln('M43 12.4 Q47 10.4 51 10.8 M53.6 11.2 Q57 11.6 59.6 13.8',hi,.6,.65)}},
 sidepart:{n:'Yandan ayrık',g:'u',
  front:c=>{const[d,u]=h3grad(c,'x');const lo=shade(c,-36),hi=shade(c,40);
   return d+h3fade(c,false)+`<path d="M37.4 28 Q36.4 14.6 44 11 Q52 8.4 59.6 11.6 Q64.2 15 62.8 28.4 Q62.2 22 60 20.4 Q54 18 47.2 19.4 Q43.2 19.8 42.6 22.4 L42 17.6 Q40.4 19.6 39.4 23 Q38.2 25 37.4 28Z" fill="${u}"/>`+
    h3ln('M42.4 17.6 Q42.8 13.2 46 11',shade(c,-46),.8,1)+h3ln('M44.6 19.6 Q50 13.4 59.4 15 M46.6 18.6 Q52.6 12 60.6 17.4 M45.6 16.2 Q50.4 11.4 57.6 12.2',lo,.55,.8)+h3ln('M47.4 14.4 Q52 11.4 56.4 12',hi,.8,.7)}},
 quiff:{n:'Hacimli geriye',g:'u',
  front:c=>{const[d,u]=h3grad(c);const lo=shade(c,-36),hi=shade(c,42);
   return d+h3fade(c,false)+`<path d="M37.6 28.4 Q36.4 15 40.4 11.2 Q44 6 51 4.6 Q60.6 3.6 63.4 10.6 Q64.6 16 62.6 28.4 Q61.6 21.6 59 19.6 Q53 17.4 47 18.2 Q41.4 18.8 39.8 21.6 Q38.4 24 37.6 28.4Z" fill="${u}"/>`+
    `<path d="M40.6 18.4 Q41 10.4 48.6 6.6 Q44.6 11 44.6 17.6Z M46.4 17.6 Q47.4 9 56.6 5.8 Q51.4 10 50.6 17.4Z M52.2 17.6 Q54.4 10.2 62 8.6 Q57.4 12 56.6 18.2Z" fill="${shade(c,12)}" stroke="none"/>`+
    h3ln('M41.4 17.8 Q42.4 10.6 48.6 6.6 M46.8 17.4 Q48.4 9.4 56.6 5.8 M52.6 17.4 Q55 10.6 62 8.6',lo,.6,.9)+h3ln('M44 10.6 Q48 6.4 54 5.4 M52 9.4 Q56 6.6 60.6 7',hi,.75,.75)}},
 slick:{n:'Geriye taranmış (jöleli)',g:'e',
  front:c=>{const[d,u]=h3grad(c);const lo=shade(c,-40);
   return d+`<path d="M37.4 27.6 Q36 13 44 10.2 Q50 8.6 56 10.2 Q64 13 62.6 27.6 Q61.6 20.4 57.6 18.6 Q50 17.2 42.4 18.6 Q38.4 20.4 37.4 27.6Z" fill="${u}"/>`+
    h3ln('M40.6 19.6 Q41.4 13 46 10.8 M43.6 18.6 Q45 12.4 50 10.2 M47 18 Q49 12 54 10.6 M50.6 17.8 Q53 12.6 57.6 11.8 M54.4 18.2 Q57 14 60.6 15.4',lo,.5,.85)+h3ln('M44.6 12.6 Q49 10.4 54 11.2',"#ffffff",1.1,.35)}},
 /* ---------- KADIN ---------- */
 longlayer:{n:'Katlı uzun',g:'k',
  back:c=>{const[d,u]=h3grad(c);return d+`<path d="M36 24 Q32 42 33.6 58 Q34.6 66 36.8 70 L40 64 L42 70 L43.4 60 L41.6 34Z M64 24 Q68 42 66.4 58 Q65.4 66 63.2 70 L60 64 L58 70 L56.6 60 L58.4 34Z" fill="${u}"/>`+h3ln('M35.6 34 Q34.4 50 36.8 66 M64.4 34 Q65.6 50 63.2 66',shade(c,-34),.55,.8)},
  front:c=>{const[d,u]=h3grad(c);const lo=shade(c,-36),hi=shade(c,40);
   return d+`<path d="M36.4 40 Q33.6 14 48 10.4 Q60.6 8.6 63.6 20 Q65 28 63.6 40 Q62.6 30 60.4 25 Q58 21 53.4 19.4 Q50 22.6 45.6 24.8 Q41.6 26.6 40.2 31 Q38.6 35 38.8 42Z" fill="${u}"/>`+
    h3ln('M53.4 19.4 Q47.4 22 41 27.6 M51 15.6 Q45 18 40 24 M56 19.6 Q60.4 23 61.8 32',lo,.55,.85)+h3ln('M44 13.4 Q49.6 10.6 56 11.6 M57.6 13 Q61 15.6 62 20',hi,.75,.7)}},
 highpony:{n:'Yüksek at kuyruğu',g:'k',
  back:c=>{const[d,u]=h3grad(c);return d+`<path d="M58 9 Q68 8 70.6 18 Q72.6 30 68 44 Q66 36 64.4 30 Q66 20 58.6 14Z" fill="${u}"/>`+h3ln('M62 11 Q68.6 14 68.4 28 M60.4 13.4 Q66 18 66 32',shade(c,-34),.5,.8)},
  front:c=>{const[d,u]=h3grad(c);const lo=shade(c,-36);
   return d+`<path d="M37.4 28.6 Q36 13.6 44 10.4 Q50 8.8 56 10.4 Q64 13.6 62.6 28.6 Q61.4 20.6 57 18.8 Q50 17.6 43 18.8 Q38.6 20.6 37.4 28.6Z" fill="${u}"/>`+h3ln('M41 19 Q43.6 12.4 50 10.6 M45 18.4 Q49 12.2 56 11.4 M50 18 Q55 13 59.6 12.6',lo,.5,.85)+
    `<rect x="56.4" y="9" width="3.4" height="3" rx="1" fill="#2a2a2a" transform="rotate(30 58 10.4)"/>`+h3ln('M44 12.6 Q49 10.4 54 11',"#ffffff",.9,.3)}},
 curlylong:{n:'Uzun bukleli',g:'k',
  back:c=>h3curls(c,h3grid(31,69,20,62,2.8,2.4,(x,y)=>(x<41||x>59)&&Math.abs(x-50)<19-(y>50?(y-50)*.25:0)),2.1),
  front:c=>{const pts=h3grid(37,63,8.6,21,2.5,2.1,(x,y)=>Math.hypot((x-50)/13.4,(y-17)/8.6)<=1&&!(y>18.4&&Math.abs(x-50)<7));return h3curls(c,pts,1.9)}},
 sleekbun:{n:'Düz topuz',g:'k',
  front:c=>{const[d,u]=h3grad(c);const lo=shade(c,-38);
   return d+`<circle cx="50" cy="7.4" r="5.2" fill="${u}"/>`+h3ln('M45.6 7 Q50 3.8 54.4 7 M46.4 9.2 Q50 6.4 53.6 9.2',lo,.5,.8)+`<path d="M37.4 28.6 Q36 13.6 44 10.6 Q50 9.4 56 10.6 Q64 13.6 62.6 28.6 Q61.4 20.6 57 18.8 Q50 17.8 43 18.8 Q38.6 20.6 37.4 28.6Z" fill="${u}"/>`+
    h3ln('M50 10 L50 18 M46 18.4 Q45 13.4 47.6 10.8 M54 18.4 Q55 13.4 52.4 10.8 M41.4 20.4 Q41 15 44 12 M58.6 20.4 Q59 15 56 12',lo,.5,.85)+h3ln('M44.4 12.4 Q47 11 49 11.2',"#ffffff",.8,.35)}},
 braids2:{n:'Çift örgü',g:'k',
  braid:c=>{let s='';const lo=shade(c,-34);[[38,26,36.6,62],[62,26,63.4,62]].forEach(([x0,y0,x1,y1])=>{for(let k=0;k<12;k++){const t=k/12,x=x0+(x1-x0)*t,y=y0+(y1-y0)*t,sd=k%2?1:-1;s+=`<ellipse cx="${(x+sd*.7).toFixed(2)}" cy="${y.toFixed(2)}" rx="2.1" ry="2.2" fill="${c}" stroke="${OL2}" stroke-width=".55" transform="rotate(${sd*28} ${(x+sd*.7).toFixed(2)} ${y.toFixed(2)})"/>`+h3ln(`M${(x+sd*.7-1).toFixed(2)} ${(y-.6).toFixed(2)} l1.6 1`,lo,.4,.8)}s+=`<rect x="${x1-1.4}" y="${y1+1.4}" width="2.8" height="1.6" rx=".6" fill="#2a2a2a"/>`});return s},
  front:c=>{const[d,u]=h3grad(c);const lo=shade(c,-38);
   return d+HAIR3.braids2.braid(c)+`<path d="M37.2 30 Q35.6 13.4 50 11 Q64.4 13.4 62.8 30 Q61.4 21.4 57 19.4 Q53 18.4 50 14.4 Q47 18.4 43 19.4 Q38.6 21.4 37.2 30Z" fill="${u}"/>`+h3ln('M50 11.4 L50 14.4',shade(c,-46),.8,1)+h3ln('M48 13.4 Q43 15.6 39.6 22.4 M52 13.4 Q57 15.6 60.4 22.4',lo,.55,.85)+h3ln('M44 13.6 Q47 12 49 12.2 M51 12.2 Q53 12 56 13.6',"#ffffff",.7,.3)}},
 shag:{n:'Shag kesim',g:'k',
  back:c=>{const[d,u]=h3grad(c);return d+`<path d="M36 26 Q32.6 40 34 50 L36.4 47 L37.6 53 L40 46 L41.4 51 L42 34Z M64 26 Q67.4 40 66 50 L63.6 47 L62.4 53 L60 46 L58.6 51 L58 34Z" fill="${u}"/>`},
  front:c=>{const[d,u]=h3grad(c);const lo=shade(c,-36),hi=shade(c,40);
   return d+`<path d="M36.4 36 Q34 13.6 49 10.4 Q61.6 9 64 20 Q65.4 28 63.6 36 L62 31 L60.6 33.6 L59.6 26 L57.6 24.4 L56.4 26.4 L54.6 22.6 L52.4 25 L50.6 22.2 L48.4 25.2 L46.4 22.4 L44.6 25.6 L42.6 23.4 L41.4 26.6 L40.2 25.4 L39.6 33.6 L38.2 31Z" fill="${u}"/>`+
    h3ln('M43.6 14 Q45 19 44.6 25.6 M48 12.4 Q49.6 18 48.4 25.2 M52.6 12.4 Q53.6 18 52.4 25 M57 13.6 Q58 19 57.6 24.4',lo,.5,.8)+h3ln('M44 12.6 Q49 10.4 55 11.4',hi,.75,.7)}}};
/* çizim zincirine bağla */
{const _hm=hairM,_hb=hairMBack;hairM=function(h,c){const H=HAIR3[h];return H?H.front(c):_hm(h,c)};hairMBack=function(h,c){const H=HAIR3[h];return H?(H.back?H.back(c):''):_hb(h,c)}}
{const _h2=hair2,_h2b=typeof hair2Back==='function'?hair2Back:null;hair2=function(h,c){return HAIR3[h]?'':_h2(h,c)};if(_h2b)hair2Back=function(h,c){return HAIR3[h]?'':_h2b(h,c)}}
/* listelere ekle */
Object.entries(HAIR3).forEach(([k,H])=>{const n=[k,H.n];if((H.g==='e'||H.g==='u')&&!HAIR_E.some(x=>x[0]===k))HAIR_E.unshift(n);if((H.g==='k'||H.g==='u')&&!HAIR_K.some(x=>x[0]===k))HAIR_K.unshift(n)});

/* ---------- Berber: büyük önizleme, oklarla gez, seç ---------- */
if(!document.getElementById('barbcss')){const st=document.createElement('style');st.id='barbcss';st.textContent=`.barb{background:var(--panel2);border:1px solid var(--line);border-radius:18px;padding:12px 10px;text-align:center;margin-bottom:10px}.barb .bt{font-weight:800;color:var(--acc);letter-spacing:.04em;margin-bottom:6px}.barb .bw{display:flex;align-items:center;justify-content:center;gap:4px}.barb .bp{width:min(220px,58vw);aspect-ratio:1;background:var(--deep);border-radius:14px;overflow:hidden}.barb .bp svg{width:100%;height:100%;display:block}.barb .ba{width:46px;height:72px;border-radius:12px;font-size:40px;line-height:1;background:transparent;color:var(--acc);border:0;cursor:pointer}.barb .bn{font-weight:800;font-size:17px;margin:8px 0}.barb .bn small{opacity:.55;font-weight:600;margin-left:6px}.barb .sw{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:2px 0 10px}.barb .sw i{width:22px;height:22px;border-radius:50%;border:2px solid transparent;cursor:pointer}.barb .sw i.on{border-color:#fff}`;document.head.appendChild(st)}
{const _sg=shGard;shGard=function(){const t=SUB&&SUB.tab;let h=_sg();if(t!=='hair'&&t!=='hairColor')return h;
 const L=S.look,ad=Math.max(S.age,16),list=t==='hair'?(S.g==='e'?HAIR_E:HAIR_K):Object.keys(HCOL).map(k=>[k,HCOL_N[k]||k]);
 let i=SUB.pv;if(i==null||i>=list.length){i=list.findIndex(x=>x[0]===(t==='hair'?L.hair:L.hairColor));if(i<0)i=0;SUB.pv=i}
 const [k,n]=list[i],cur=(t==='hair'?L.hair:L.hairColor)===k,big=AV({...L,[t]:k},ad).replace(/viewBox="[^"]*"/,'viewBox="25 -3 50 55"'),N=list.length;
 const sw=t==='hairColor'?`<div class="sw">${list.map(([c],j)=>`<i class="${j===i?'on':''}" style="background:${HCOL[c]}" onclick="SUB.pv=${j};drawSheet()"></i>`).join('')}</div>`:'';
 const card=`<div class="barb"><div class="bt">${t==='hair'?'✂️ BERBER':'🎨 SAÇ BOYASI'}</div><div class="bw"><button class="ba" onclick="SUB.pv=${(i-1+N)%N};drawSheet()">‹</button><div class="bp">${big}</div><button class="ba" onclick="SUB.pv=${(i+1)%N};drawSheet()">›</button></div><div class="bn">${n}<small>${i+1}/${N}</small></div>${sw}<button class="btn" ${cur?'disabled':''} onclick="ACT.wear('${t}','${k}')">${cur?(t==='hair'?'Şu anki saçın':'Şu anki rengin'):(t==='hair'?'Bu stili seç · '+fmtS(800):'Bu rengi seç · '+fmtS(1200))}</button></div>`;
 const a=h.indexOf('<div class="wprev">'),b=h.indexOf('<div class="tabs">');return a>=0&&b>a?h.slice(0,a)+card+h.slice(b):card+h}}
{const _w=ACT.wear;ACT.wear=(cat,id)=>{_w(cat,id);if((cat==='hair'||cat==='hairColor')&&SUB)SUB.pv=null}}
