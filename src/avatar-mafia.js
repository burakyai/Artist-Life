/* ============ Avatar ============ */
function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=(n>>16)+amt,g=(n>>8&255)+amt,b=(n&255)+amt;r=clamp(r,0,255);g=clamp(g,0,255);b=clamp(b,0,255);return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}
const SH='M6 110 Q8 86 33 80 Q50 87 67 80 Q92 86 94 110Z';
function suit(j,sh,lap,extra){
  return `<path d="${SH}" fill="${j}"/>
  <path d="M41 80.5 L50 108 L59 80.5 Q50 86 41 80.5Z" fill="${sh}"/>
  <path d="M41 80.5 L50 108 L36 95 L42 88Z" fill="${lap}"/>
  <path d="M59 80.5 L50 108 L64 95 L58 88Z" fill="${lap}"/>${extra||''}`;
}
const TIE=c=>`<path d="M48 82.5 L52 82.5 L51.2 86 L48.8 86Z" fill="${shade(c,-20)}"/><path d="M48.7 86 L51.3 86 L52.3 99 L50 103 L47.7 99Z" fill="${c}"/>`;
const OCOL={
  tisort:[['Gri','#6c737f'],['Siyah','#1c1c20'],['Beyaz','#e4e4e4'],['Lacivert','#23305a'],['Kırmızı','#8f1f24'],['Haki','#5b5a3c'],['Bordo','#5a1c27']],
  esofman:[['Lacivert','#24356a'],['Siyah','#1a1a1d'],['Kırmızı','#9b1f24'],['Bordo','#5c1a26'],['Beyaz','#e6e6e6'],['Yeşil','#1f5a3a'],['Gri','#6b6f76'],['Sarı','#c99a16'],['Turkuaz','#1d6f7a'],['Mor','#4a2a6a']],
  suit:[['Antrasit','#353840'],['Siyah','#151518'],['Lacivert','#1c2a45'],['Gece mavisi','#141c33'],['Kahve','#4a3426'],['Gri','#6f737b'],['Bordo','#5a1c27'],['Haki','#56533a'],['Krem','#e3d8c0'],['Beyaz','#ece7dc'],['Zümrüt','#1e4a3c'],['Hardal','#8a6a1e']],
  gomlek:[['Beyaz','#f2f0ea'],['Siyah','#1a1a1d'],['Açık mavi','#bcd0e6'],['Bordo','#5a1c27'],['Lacivert','#1c2a45'],['Krem','#e3d8c0']],
  hawaii:[['Kırmızı çiçek','#9b2a24'],['Mavi','#1f5f8a'],['Siyah','#1a1a1d'],['Sarı','#c99a16'],['Yeşil','#2b6a45']]};
const OKIND={gomlek:'gomlek',tisort:'tisort',esofman:'esofman',hawaii:'hawaii',polo:'suit',balikci:'suit',deri:'suit',takim:'suit',cizgili:'suit',yelek:'suit',kadife:'suit',trenckot:'suit',palto:'suit',beyaz:'suit',smokin:'suit'};
const ODEF={tisort:'#6c737f',esofman:'#24356a',hawaii:'#9b2a24',polo:'#1c2a45',balikci:'#4a3426',deri:'#2c211c',takim:'#353840',cizgili:'#1c2a45',yelek:'#4a4d55',kadife:'#5a1c27',trenckot:'#151518',palto:'#353840',beyaz:'#ece7dc',smokin:'#121215',gomlek:'#f2f0ea'};
const lightC=c=>{const n=parseInt(c.slice(1),16);return((n>>16)*.3+(n>>8&255)*.59+(n&255)*.11)>150};
function body(o,col){col=col||ODEF[o]||'#6c737f';const lap=shade(col,lightC(col)?-18:-12);
  switch(o){
    case 'esofman':{const st=lightC(col)?'#1b1b1e':'#eee';return `<path d="${SH}" fill="${col}"/><path d="M40 80 Q50 90 60 80" fill="none" stroke="${shade(col,-20)}" stroke-width="3"/><path d="M50 88 V110" stroke="#c8c8c8" stroke-width="1.4"/><path d="M22 85 L13 110 M26 84 L17 110 M78 85 L87 110 M74 84 L83 110" stroke="${st}" stroke-width="2"/>`}
    case 'deri': return suit(col,'#e8e3d8',lap)+`<path d="M44 96 h3 M44 100 h3" stroke="#8a7a6a" stroke-width="1"/>`;
    case 'takim': return suit(col,'#f3f1ec',lap,TIE(lightC(col)?'#1c1c20':'#6b1b22'));
    case 'cizgili': {const id='pin'+(++uid);return `<defs><pattern id="${id}" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="${col}"/><path d="M1 0V4" stroke="${shade(col,lightC(col)?-40:45)}" stroke-width=".5"/></pattern></defs>`+suit(`url(#${id})`,'#cfe0f2',lap,TIE('#9b1c1c'));}
    case 'beyaz': return suit(col,'#17171a',lap)+`<path d="M41 80.5 L50 108 L59 80.5" fill="none" stroke="${shade(col,-30)}" stroke-width=".8"/>`;
    case 'smokin': return suit(col,'#f6f4ef',shade(col,lightC(col)?-25:25))+`<path d="M44 82 L50 85 L44 88Z M56 82 L50 85 L56 88Z" fill="#0c0c0e"/><circle cx="50" cy="85" r="1.3" fill="#0c0c0e"/><circle cx="50" cy="94" r=".9" fill="#222"/><circle cx="50" cy="99" r=".9" fill="#222"/>`;
    case 'polo': return suit(col,'#e9e3d5',lap)+`<path d="M42.5 80.5 L46.5 87 L49.5 82Z M57.5 80.5 L53.5 87 L50.5 82Z" fill="#f4efe4" stroke="#cfc8b8" stroke-width=".4"/>`;
    case 'balikci': return suit(col,'#1c1c20',lap)+`<path d="M42.2 69 L41.8 82 Q50 86.5 58.2 82 L57.8 69 Q50 72.5 42.2 69Z" fill="#1c1c20"/><path d="M42.5 74 Q50 77 57.5 74 M42.4 78 Q50 81 57.6 78" stroke="#2c2c31" stroke-width=".8" fill="none"/>`;
    case 'hawaii': {const id='hw'+(++uid);return `<defs><pattern id="${id}" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="${col}"/><circle cx="2.5" cy="2.5" r="1.6" fill="#f2e6c8" opacity=".85"/><circle cx="7" cy="6.5" r="1.2" fill="#e9b949" opacity=".8"/><path d="M5 1 q1 2 3 2" stroke="#2f6b3a" stroke-width=".7" fill="none"/></pattern></defs><path d="${SH}" fill="url(#${id})"/><path d="M41.5 80 L50 95 L58.5 80 Q50 85 41.5 80Z" fill="#ece6d8"/><path d="M41.5 80 L47 89 L44 79.5Z M58.5 80 L53 89 L56 79.5Z" fill="${shade(col,-10)}"/>`}
    case 'yelek': return suit(col,'#f3f1ec',lap,`<path d="M44.6 87.5 L50 98 L55.4 87.5 L56.6 108 L43.4 108Z" fill="${shade(col,-8)}"/><circle cx="50" cy="101" r=".8" fill="#c9b27a"/><circle cx="50" cy="105" r=".8" fill="#c9b27a"/>`+TIE('#3a1a1a').replace('L52.3 99 L50 103 L47.7 99Z','L51.8 94 L50 97 L48.2 94Z'));
    case 'kadife': return suit(col,'#141416',shade(col,-20))+`<path d="M14 92 Q22 88 30 92 M70 92 Q78 88 86 92" stroke="#fff" stroke-opacity=".12" stroke-width="1.4" fill="none"/><path d="M41 80.5 L50 92 L59 80.5" fill="none" stroke="#2a2a2e" stroke-width="1"/>`;
    case 'trenckot': return `<path d="M3 110 Q5 85 31 79 Q50 86 69 79 Q95 85 97 110Z" fill="${col}"/><path d="M41 80.5 L50 108 L59 80.5 Q50 86 41 80.5Z" fill="#1c1c20"/><path d="M41 80.5 L50 108 L32 98 L37 86Z M59 80.5 L50 108 L68 98 L63 86Z" fill="${shade(col,14)}"/><path d="M22 88 Q20 98 22 110 M78 88 Q80 98 78 110" stroke="#fff" stroke-opacity=".08" stroke-width="2" fill="none"/>`;
    case 'palto': return `<path d="M3 110 Q5 84 31 78 Q50 86 69 78 Q95 84 97 110Z" fill="${col}"/><path d="M41 80.5 L50 108 L59 80.5 Q50 86 41 80.5Z" fill="#f3f1ec"/>`+TIE('#5a1c27')+`<path d="M41 80.5 L50 108 L33 99 L38 86Z M59 80.5 L50 108 L67 99 L62 86Z" fill="${lap}"/><path d="M42.5 81 L44.5 110 L40 110 L39.5 90Z M57.5 81 L55.5 110 L60 110 L60.5 90Z" fill="#ece7dc"/><path d="M42.5 84 L41 88 M57.5 84 L59 88" stroke="#c9c2b2" stroke-width=".5"/>`;
    case 'gomlek': return `<path d="${SH}" fill="${col}"/><path d="M41.5 79.6 L50 94 L58.5 79.6" fill="none" stroke="${shade(col,-22)}" stroke-width="1"/><path d="M41.5 79.6 L45.5 90 L39 86.5 L38.5 80.5Z M58.5 79.6 L54.5 90 L61 86.5 L61.5 80.5Z" fill="${shade(col,-6)}" stroke="${shade(col,-20)}" stroke-width=".5"/><path d="M50 94 V110" stroke="${shade(col,-16)}" stroke-width=".7"/><circle cx="51.2" cy="99" r=".7" fill="${shade(col,-28)}" stroke="none"/><circle cx="51.2" cy="105" r=".7" fill="${shade(col,-28)}" stroke="none"/><path d="M16 92 Q24 90 30 95 M84 92 Q76 90 70 95" stroke="${shade(col,-14)}" stroke-width="1" fill="none"/>`;
    case 'mahkum': return `<path d="${SH}" fill="#7f837d"/><path d="M41 80 L50 92 L59 80" fill="none" stroke="#5f635d" stroke-width="2.5"/><rect x="58" y="93" width="16" height="7" rx="1" fill="#e9e6dc"/><text x="66" y="98.6" font-size="5" text-anchor="middle" font-family="monospace" fill="#222">1907</text>`;
    default: return `<path d="${SH}" fill="${col}"/><path d="M41 80.5 Q50 89 59 80.5" fill="none" stroke="${shade(col,-18)}" stroke-width="2.4"/>`;
  }
}
function hairBack(h,c){
  if(h==='topuz')return `<circle cx="50" cy="15.5" r="6.5" fill="${c}"/><path d="M45 18 Q50 21 55 18" stroke="#000" stroke-opacity=".25" stroke-width="1" fill="none"/>`;
  if(h==='dalgali')return `<path d="M29 42 Q26 56 29 66 Q27 74 31 82 L41 80 L41 60 Q36 50 34 42Z M71 42 Q74 56 71 66 Q73 74 69 82 L59 80 L59 60 Q64 50 66 42Z" fill="${c}"/>`;
  if(h==='uzun')return `<path d="M29 44 Q25 72 30 86 L70 86 Q75 72 71 44 Q70 22 50 21 Q30 22 29 44Z" fill="${c}"/>`;
  if(h==='atkuyrugu')return `<path d="M66 36 Q83 44 76 70 Q72 56 65 49Z" fill="${c}"/><rect x="66" y="40" width="5" height="4" rx="1" fill="#2a2a2a" transform="rotate(30 68 42)"/>`;
  return '';
}
function hairFront(h,c){
  const sheen=`<path d="M40 26 Q50 22.5 60 26" stroke="#fff" stroke-opacity=".22" stroke-width="1.5" fill="none"/>`;
  switch(h){
    case 'kisa': return `<path d="M31 47 Q29 22 50 22 Q71 22 69 47 Q67 33 50 31 Q33 33 31 47Z" fill="${c}"/>`;
    case 'geriye': return `<path d="M31 45 Q30 19 50 19 Q70 19 69 45 Q66 30 50 28 Q34 30 31 45Z" fill="${c}"/>`+sheen;
    case 'yan': return `<path d="M31 48 Q28 19 52 20 Q73 21 69 48 Q67 33 61 30 Q48 37 36 33 Q32 39 31 48Z" fill="${c}"/><path d="M44 21 Q41 26 40 31" stroke="${shade(c,-25)}" stroke-width="1" fill="none"/>`;
    case 'kivircik': {let s=`<path d="M31 47 Q30 25 50 25 Q70 25 69 47 Q67 35 50 33 Q33 35 31 47Z" fill="${c}"/>`;
      for(let a=190;a<=350;a+=20){const r=a*Math.PI/180;s+=`<circle cx="${(50+21*Math.cos(r)).toFixed(1)}" cy="${(42+19*Math.sin(r)).toFixed(1)}" r="6.4" fill="${c}"/>`}
      s+=`<circle cx="50" cy="22" r="7" fill="${c}"/>`;return s;}
    case 'uzun': return `<path d="M31 52 Q27 20 50 21 Q73 20 69 52 Q66 34 56 30 Q50 34 44 30 Q34 34 31 52Z" fill="${c}"/>`;
    case 'atkuyrugu': return `<path d="M31 45 Q30 20 50 20 Q70 20 69 45 Q66 30 50 28 Q34 30 31 45Z" fill="${c}"/>`+sheen;
    case 'jole': return `<path d="M31 44 Q30 17 50 17 Q70 17 69 44 Q67 28.5 50 26 Q33 28.5 31 44Z" fill="${c}"/><path d="M37 23.5 Q50 19.5 63 23.5 M35 28 Q50 23 65 28 M41 20 Q50 18 59 20" stroke="#fff" stroke-opacity=".22" stroke-width="1" fill="none"/>`;
    case 'undercut': return `<path d="M31 47 Q30.5 34 33.5 28 L35 45Z M69 47 Q69.5 34 66.5 28 L65 45Z" fill="${c}" opacity=".45"/><path d="M33.5 31 Q32 13 52 12.5 Q69 13.5 66.5 31 Q61 23.5 50 23.5 Q39 23.5 33.5 31Z" fill="${c}"/><path d="M40 17 Q52 13.5 62 18" stroke="#fff" stroke-opacity=".2" stroke-width="1.2" fill="none"/>`;
    case 'pompadour': return `<path d="M31.5 45 Q29.5 24 39 16.5 Q50 8 63 12.5 Q71.5 18 68.5 45 Q66.5 30 57 27 Q46 25 38.5 30 Q33 35 31.5 45Z" fill="${c}"/><path d="M41 15.5 Q52 10.5 62 14.5 M38 21 Q50 15 64 20" stroke="#fff" stroke-opacity=".22" stroke-width="1.1" fill="none"/>`;
    case 'asker': return `<path d="M31.5 45 Q31 20.5 50 20.5 Q69 20.5 68.5 45 Q66.5 30 50 28 Q33.5 30 31.5 45Z" fill="${c}" opacity=".6"/>`;
    case 'topuz': return `<path d="M31 45 Q30 19 50 19 Q70 19 69 45 Q66 30 50 28 Q34 30 31 45Z" fill="${c}"/><path d="M38 24 Q50 20 62 24" stroke="#fff" stroke-opacity=".2" stroke-width="1.2" fill="none"/>`;
    case 'dalgali': return `<path d="M30.5 50 Q28 18 50 18 Q72 18 69.5 50 Q67 33 58 28.5 Q50 26 42 28.5 Q33 33 30.5 50Z" fill="${c}"/><path d="M36 26 Q41 22 46 25 Q51 21 56 24.5 Q61 21.5 65 26" stroke="#fff" stroke-opacity=".2" stroke-width="1.1" fill="none"/>`;
    case 'peaky': return `<path d="M31 47 Q30.5 33 33.5 29 L35 45Z M69 47 Q69.5 33 66.5 29 L65 45Z" fill="${c}" opacity=".28"/><path d="M33.5 33 Q33 18.5 50 18.5 Q67 18.5 66.5 33 Q60 27.5 50 27.5 Q40 27.5 33.5 33Z" fill="${c}"/><path d="M44 19 Q40 23 39 28" stroke="${shade(c,-25)}" stroke-width="1" fill="none"/>`;
    case 'percem': return `<path d="M31 47 Q29 21 50 21 Q71 21 69 47 Q67 33 50 31 Q33 33 31 47Z" fill="${c}"/><path d="M35 29 Q47 24 60 30 Q52 32 46 39 Q43 33 35 29Z" fill="${c}"/>`;
    case 'firca': return `<path d="M30.8 45 Q29.6 27 35 21.5 Q42 15.8 50 16.4 Q58 15.8 65 21.5 Q70.4 27 69.2 45 Q67.6 32 62 28 Q58 25.4 54 27 Q50 25 46 27 Q42 25.4 38 28 Q32.4 32 30.8 45Z" fill="${c}"/><path d="M38 21 L39 25 M42 18.6 L43 23.6 M46.5 17.4 L47 22.6 M51 17.2 L51 22.4 M55.5 17.8 L55 23 M60 19.6 L59 24.4 M63.6 22.4 L62.4 26" stroke="#fff" stroke-opacity=".1" stroke-width=".7"/>`;
    case 'kel': return `<ellipse cx="44" cy="30" rx="6" ry="2.6" fill="#fff" opacity=".17"/>`;
  }
  return '';
}
function beard(b,c){
  const mus=`<path d="M44 60 Q50 57.4 56 60 Q50 59.2 44 60Z" fill="${c}" stroke="${c}" stroke-width="1.6" stroke-linejoin="round"/>`;
  switch(b){
    case 'boxed': return `<path d="M32 49.5 Q32 59.5 37 63.4 L44.8 69.6 Q50 72.2 55.2 69.6 L63 63.4 Q68 59.5 68 49.5 Q66 60 59 62.6 Q55 59.6 50 59.6 Q45 59.6 41 62.6 Q34 60 32 49.5Z" fill="${c}" opacity=".9"/>`+mus;
    case 'cene': return `<path d="M32 47 Q32.5 59 37 63 L44.6 69.6 Q50 72.2 55.4 69.6 L63 63 Q67.5 59 68 47" stroke="${c}" stroke-width="2.6" fill="none"/><path d="M47 66 Q50 67.5 53 66" stroke="${c}" stroke-width="1.6" fill="none"/>`;
    case 'ince': return `<path d="M44.2 60.3 Q50 58.2 55.8 60.3" stroke="${c}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;
    case 'kirli': return `<path d="M32 51 Q32.5 58 36.8 62.6 L44.6 69.7 Q50 72.6 55.4 69.7 L63.2 62.6 Q67.5 58 68 51 Q66 61.5 58 63.8 Q50 60.6 42 63.8 Q34 61.5 32 51Z" fill="${c}" opacity=".42"/><path d="M44 59.8 Q50 58 56 59.8" stroke="${c}" stroke-opacity=".35" stroke-width="2" fill="none"/>`;
    case 'biyik': return `<path d="M41.3 62.2 Q42.6 58.1 50 58.3 Q57.4 58.1 58.7 62.2 Q57.5 62.6 56.3 60.8 Q50 59.3 43.7 60.8 Q42.5 62.6 41.3 62.2Z" fill="${c}"/>`;
    case 'keci': return mus+`<path d="M45.5 65.4 Q46 70 50 72.6 Q54 70 54.5 65.4 Q50 67.2 45.5 65.4Z" fill="${c}"/><path d="M44 61 Q44 64 45.5 65 M56 61 Q56 64 54.5 65" stroke="${c}" stroke-width="1.4" fill="none"/>`;
    case 'tam': return `<path d="M31.3 48.5 Q31.3 58 36.5 63.2 L44.5 71.2 Q50 74.8 55.5 71.2 L63.5 63.2 Q68.7 58 68.7 48.5 Q66 61 59 63.4 Q55 59.6 50 59.6 Q45 59.6 41 63.4 Q34 61 31.3 48.5Z" fill="${c}"/><path d="M60 63 Q64 58 67.5 52 Q68 60 63.5 63.2 L55.5 71.2 Q58 67 60 63Z" fill="#000" opacity=".25"/>`+mus;
  }
  return '';
}
function acc(a,sk){
  switch(a){
    case 'boyun': return `<g fill="#1f2b3d" opacity=".78"><path d="M53.2 69.5 q2.2-3.2 4.4 0 q-2.2 1.2-2.2 4.2 q-1.1-2.2-2.2-4.2Z"/><path d="M55.4 74 v4.5" stroke="#1f2b3d" stroke-width=".8"/><path d="M54 77 l1.4-1.2 l1.4 1.2" stroke="#1f2b3d" stroke-width=".6" fill="none"/></g>`;
    case 'gozyasi': return `<path d="M40.6 52.6 q1 1.4 0 2.5 q-1-1.1 0-2.5Z" fill="#1f2b3d"/>`;
    case 'kaskesik': return `<path d="M58.3 40.6 L57.4 45" stroke="${sk||'#c88f62'}" stroke-width="1.2"/>`;
    case 'altindis': return `<rect x="52.2" y="61.3" width="1.9" height="1.5" rx=".3" fill="#e3b33c"/>`;
    case 'gozluk': return `<g fill="#0d0d10"><rect x="35.5" y="43.5" width="12.5" height="8.5" rx="3.2"/><rect x="52" y="43.5" width="12.5" height="8.5" rx="3.2"/></g><path d="M48 46.5 L52 46.5 M35.5 46 L31.5 45 M64.5 46 L68.5 45" stroke="#0d0d10" stroke-width="1.4"/><path d="M38 45.5 L41 45.5 M54.5 45.5 L57.5 45.5" stroke="#fff" stroke-opacity=".35" stroke-width="1"/>`;
    case 'zincir': return `<path d="M39 80 Q50 93 61 80" stroke="#d9ad3a" stroke-width="2.2" fill="none" stroke-dasharray="2.2 .9"/><circle cx="50" cy="88.5" r="2.4" fill="#e9bf4a" stroke="#a3801f" stroke-width=".6"/>`;
    case 'hac': return `<path d="M41.5 79.5 Q44 88 50 92 Q56 88 58.5 79.5" stroke="#d9ad3a" stroke-width=".9" fill="none"/><path d="M50 92 V101 M47 95 H53" stroke="#e3b33c" stroke-width="1.6" stroke-linecap="round"/><path d="M50 92 V101" stroke="#a3801f" stroke-width=".4"/>`;
    case 'kupe': return `<circle cx="31" cy="56.5" r="1.7" fill="#eef5ff" stroke="#b9c8de" stroke-width=".6"/>`;
    case 'puro': return `<g transform="rotate(14 54 62)"><rect x="53" y="60.6" width="14" height="3.2" rx="1.2" fill="#6b4226"/><rect x="56" y="60.6" width="2" height="3.2" fill="#b8892c"/><circle cx="67.2" cy="62.2" r="1.5" fill="#ff7a2e"/></g><path d="M70 58 q2 -3 0 -6 q-2 -3 1 -6" stroke="#cfcfcf" stroke-opacity=".35" stroke-width="1.2" fill="none"/>`;
    case 'yara': return `<path d="M61 39 L64.5 53" stroke="#a9554c" stroke-width="1.5" stroke-linecap="round"/><path d="M60.6 43 L64 42.2 M61.6 47 L65 46.2" stroke="#a9554c" stroke-width="1"/>`;
    case 'fotr': return `<ellipse cx="50" cy="28.5" rx="30" ry="5.6" fill="#1c1c20"/><path d="M33.5 28.5 Q33 9 50 9 Q67 9 66.5 28.5Z" fill="#26262c"/><rect x="33.6" y="22" width="32.8" height="4.4" fill="#7c1f1f"/><path d="M45 11 Q50 15 55 11" stroke="#141417" stroke-width="1.2" fill="none"/>`;
  }
  return '';
}
/* ============ Yeni çizim: gerçek oranlı bel üstü ============ */
const OL2='#2b1f19';
function hair2Back(h,c){
  switch(h){
    case 'uzun': return `<path d="M36.4 26 Q33 46 35 60 L41 62 L40 40Z M63.6 26 Q67 46 65 60 L59 62 L60 40Z" fill="${c}"/>`;
    case 'dalgali': return `<path d="M36.6 25 Q32 36 35 46 Q31.6 54 35.6 62 L42 61 Q39 52 41 44 Q38 34 38.6 27Z M63.4 25 Q68 36 65 46 Q68.4 54 64.4 62 L58 61 Q61 52 59 44 Q62 34 61.4 27Z" fill="${c}"/>`;
    case 'atkuyrugu': return `<path d="M60 22 Q70 26 68 44 Q66 52 63 56 Q64.6 44 61.6 32Z" fill="${c}"/>`;
    case 'topuz': return `<ellipse cx="50" cy="9.4" rx="5.6" ry="4.6" fill="${c}"/>`;
  }return ''
}
function hair2(h,c){
  const d=shade(c,-28),l=shade(c,38);
  const ln=(p,w=.7,col=d)=>`<path d="${p}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  switch(h){
    case 'kisa': return `<path d="M37.2 29 Q35.4 16.4 41.6 12 Q50 8.4 58.4 12 Q64.6 16.4 62.8 29 Q61.8 22.6 59.4 20.4 Q55 18.4 50 19.8 Q45 18.4 40.6 20.4 Q38.2 22.6 37.2 29Z" fill="${c}"/>`+ln('M42 14.6 Q45 13 47 15.6 M49 12.4 Q52.6 11.4 54.4 14.4 M56 14 Q59.6 14.6 60.4 18')+ln('M44 11.6 Q48 10 52 11',.6,l);
    case 'geriye': return `<path d="M37.4 28.4 Q35.8 13.6 44 10.4 Q50 8.8 56 10.4 Q64.2 13.6 62.6 28.4 Q61.6 20.6 57.4 18.8 Q50 17.4 42.6 18.8 Q38.4 20.6 37.4 28.4Z" fill="${c}"/>`+ln('M41 19 Q42 13.4 46.6 11.4 M45 18.2 Q46.4 12.6 51 10.8 M50 18 Q52 12.4 56 11.6 M55 18.4 Q57.6 14 60.4 14.6')+ln('M43 12.4 Q48 10.2 53 10.6',.7,l);
    case 'yan': return `<path d="M37.2 30 Q35 15 45 11 Q56 8.6 61.8 14.6 Q64.6 20 62.8 30 Q61.6 22.6 58.4 20.2 Q51 21.8 44.4 19.4 Q40 21.6 38.6 26 Q37.8 27.6 37.2 30Z" fill="${c}"/>`+ln('M44.4 19.4 Q43.6 15 45.6 11.2',.8)+ln('M47 18.8 Q52 14.6 59.6 15.4 M48 15.6 Q53 12.4 58 13',.7,l);
    case 'kivircik': {let s=`<path d="M37 29 Q35.6 17 41 13 Q50 9 59 13 Q64.4 17 63 29 Q62 23 59 21 Q50 18.6 41 21 Q38 23 37 29Z" fill="${c}"/>`;
      [[39,20],[42,14.4],[47,11.4],[53,11.4],[58,14.4],[61,20],[44.4,17.6],[50,15],[55.6,17.6],[38,25],[62,25]].forEach(([x,y])=>{s+=`<circle cx="${x}" cy="${y}" r="3.4" fill="${c}"/><path d="M${x-1.6} ${y+.6} Q${x} ${y-1.8} ${x+1.6} ${y+.4}" stroke="${d}" stroke-width=".6" fill="none"/>`});return s}
    case 'uzun': return `<path d="M36.6 34 Q34.4 14 46 10.6 Q58 8.8 62.4 16 Q65.6 22 63.4 34 Q62 24 57.4 20.8 Q52 24.6 45 21 Q39.4 24.6 36.6 34Z" fill="${c}"/>`+ln('M46 21 Q45 16 47.4 11.4 M52 22.4 Q55 18 59 18')+ln('M42 14 Q47 10.8 53 11.2',.7,l);
    case 'atkuyrugu': return `<path d="M37.4 28.6 Q35.8 13.6 44 10.4 Q50 8.8 56 10.4 Q64.2 13.6 62.6 28.6 Q61.4 20.6 57 18.8 Q50 17.6 43 18.8 Q38.6 20.6 37.4 28.6Z" fill="${c}"/>`+ln('M42 18.6 Q44 12.6 49 11 M48 18 Q51 12.4 56 12.2')+`<rect x="60" y="20.4" width="3" height="2.4" rx=".6" fill="#262626" transform="rotate(25 61 21.6)"/>`;
    case 'jole': return `<path d="M37.4 28 Q36 12.8 50 9.4 Q64 12.8 62.6 28 Q61.6 19.6 57 17.8 Q50 16.4 43 17.8 Q38.4 19.6 37.4 28Z" fill="${c}"/>`+ln('M41 17.6 Q44 12 50 10.6 M45 17 Q49 12 55 11.4 M50 16.8 Q55 12.6 60 15',.7,l)+ln('M43.6 15 Q47 12.6 51 12.4',1.1,'#ffffff80');
    case 'undercut': return `<path d="M37.2 30 Q37 23 38.4 19.6 L40.4 21.6 Q39.4 25 39.4 30Z M62.8 30 Q63 23 61.6 19.6 L59.6 21.6 Q60.6 25 60.6 30Z" fill="${c}" opacity=".45"/><path d="M38.6 21 Q37.6 9.6 49 7.4 Q61.6 8 61.4 21 Q57.4 17.2 50 17.4 Q42.6 17.2 38.6 21Z" fill="${c}"/>`+ln('M42 17 Q43 11 49 8.8 M47 17 Q49 11 55 9.4 M53 17.4 Q56 13 60 13.6')+ln('M44 10.4 Q50 7.8 56 9',.7,l);
    case 'pompadour': return `<path d="M37.4 28 Q36 15 41 10.6 Q47 4.4 56 5.6 Q63.6 7.4 62.6 28 Q61.4 20 57.4 18 Q50 16.6 43 18 Q38.6 20 37.4 28Z" fill="${c}"/>`+ln('M41.6 17 Q42 9 49 6.4 M46 17 Q47 9.6 54 6.8 M51 16.8 Q53.6 10.6 59 9.4')+ln('M44 8.6 Q50 5.4 56 6.4',.8,l);
    case 'asker': return `<path d="M37.6 28 Q37 13.4 50 12.6 Q63 13.4 62.4 28 Q61.4 21.4 50 20.4 Q38.6 21.4 37.6 28Z" fill="${c}" opacity=".62"/>`;
    case 'percem': return `<path d="M37.2 30 Q35.4 15 42 11.6 Q50 8.4 58 11.6 Q64.6 15 62.8 30 Q61.8 22.6 59.4 20.4 Q55 18.4 50 19.8 Q45 18.4 40.6 20.4 Q38.2 22.6 37.2 30Z" fill="${c}"/><path d="M39.6 20 Q48 14.6 58 19.6 Q52 21 47.4 26.4 Q45.4 21.4 39.6 20Z" fill="${c}"/>`+ln('M47.4 26.4 Q48 21.6 53 19.4');
    case 'topuz': return `<path d="M37.4 29 Q35.8 13.6 44 10.4 Q50 8.8 56 10.4 Q64.2 13.6 62.6 29 Q61.4 20.6 57 18.8 Q50 17.6 43 18.8 Q38.6 20.6 37.4 29Z" fill="${c}"/>`+ln('M42 18.6 Q44 13 49 11 M51 11 Q56 13 58 18.6');
    case 'dalgali': return `<path d="M36.6 33 Q34.4 13.6 47 10.2 Q60 8.6 63 17 Q65.6 23 63.4 33 Q62 25 58 21.6 Q54 23.8 50 20.6 Q46 23.8 42 21.6 Q38 25 36.6 33Z" fill="${c}"/>`+ln('M42 21.6 Q41 16 45 12.4 M50 20.6 Q51 15.4 55 12.6 M58 21.6 Q60.6 18 60.4 15');
    case 'peaky': return `<path d="M37.2 30 Q37 23.4 38.2 20.4 L40 22 Q39.4 25.6 39.4 30Z M62.8 30 Q63 23.4 61.8 20.4 L60 22 Q60.6 25.6 60.6 30Z" fill="${c}" opacity=".3"/><path d="M38.4 22 Q37.4 11.6 50 10.6 Q62.6 11.6 61.6 22 Q56 19 50 19.4 Q44 19 38.4 22Z" fill="${c}"/>`+ln('M45.6 19.2 Q44.4 15 46 11.2');
    case 'firca': return `<path d="M37.2 29 Q35.6 15.6 41 11.6 Q45 9 50 9.2 Q55 9 59 11.6 Q64.4 15.6 62.8 29 Q61.8 22 59 20.2 Q55 18.4 50 19.4 Q45 18.4 41 20.2 Q38.2 22 37.2 29Z" fill="${c}"/>`+ln('M41 19.6 L41.6 13.2 M44.4 18.8 L45 11 M48 18.8 L48.2 9.8 M51.6 18.8 L51.6 9.8 M55.2 18.8 L55 11 M58.6 19.6 L58.4 13.2',.65,l);
    case 'italyan': return `<path d="M37.4 30 Q37 25 38.4 21.6 L40.2 23.2 Q39.2 26.6 39.4 30Z M62.6 30 Q63 25 61.6 21.6 L59.8 23.2 Q60.8 26.6 60.6 30Z" fill="${c}" opacity=".55"/><path d="M38.4 24 Q36.6 12 45.6 8.8 Q53.6 7 60 10 Q64.8 13.4 62.2 24 Q60 19.4 56 18.2 Q50 16.8 44 18.2 Q40.4 19.4 38.4 24Z" fill="${c}"/>`+ln('M41 21 Q42.4 14 47 10.6 M45 18.6 Q47.6 12.6 52.6 10 M50.6 17.6 Q53.6 12.6 58.4 11.6 M55.6 18.2 Q58.6 15.2 61.4 15.6')+ln('M43 13.6 Q47 9.8 52.4 9.4 Q56.6 9.6 59.4 12',.8,l);
    case 'klasik': return `<path d="M37.3 29 Q35.8 14 44 10.6 Q52 8.6 59 11 Q64.6 14 62.7 29 Q61.6 21.4 57.6 19.4 Q51 18.4 45.6 19.6 L44.4 13.6 Q40.2 17.6 38.8 22.6 Q37.8 26 37.3 29Z" fill="${c}"/><path d="M44.4 13.4 L45.6 19.8" stroke="${shade(c,70)}" stroke-width=".7" opacity=".8"/>`+ln('M46.6 18.8 Q50 13 58.4 13.4 M47 15.4 Q52 11 58 11.6 M42.6 15.4 Q40.4 18.6 39.6 23')+ln('M48 12 Q53 9.6 58 10.6',.7,l);
    case 'skinfade': return `<path d="M37.4 30 Q37 22 39.4 19.6 L40.4 21.6 Q39.2 25 39.2 30Z M62.6 30 Q63 22 60.6 19.6 L59.6 21.6 Q60.8 25 60.8 30Z" fill="${c}" opacity=".22"/><path d="M39.4 21.4 Q38.4 11 50 9.6 Q61.6 11 60.6 21.4 Q56 18.4 50 18.6 Q44 18.4 39.4 21.4Z" fill="${c}"/>`+ln('M42 17.6 l1-3.4 M45 17 l.8-4.4 M48 16.8 l.6-5 M51.4 16.8 l.2-5 M54.6 17 l-.2-4.6 M57.6 17.6 l-.6-3.8',.65)+ln('M43 12.6 Q50 10 57 12.6',.7,l);
    case 'quiff': return `<path d="M37.4 29 Q37 24 38.4 21 L40 22.6 Q39.2 26 39.4 29Z M62.6 29 Q63 24 61.6 21 L60 22.6 Q60.8 26 60.6 29Z" fill="${c}" opacity=".55"/><path d="M38.6 23 Q37.2 13 43 10.4 Q48.6 7.4 54.6 5.6 Q60.4 5.4 61.8 10.6 Q63.6 15.6 61.6 23 Q59.6 19.6 56 18.6 Q50 17.4 44 18.6 Q40.4 19.6 38.6 23Z" fill="${c}"/>`+ln('M42.6 18.4 Q44 11.6 50.4 7.6 M47 18 Q49.6 11 56 6.8 M52.4 17.8 Q56 12 60.4 9.6')+ln('M46 9.6 Q51 6.4 57 6.2',.8,l);
    case 'ivy': return `<path d="M37.6 27.6 Q36.6 15.6 43 12.4 Q50 10.6 57 12.4 Q63.4 15.6 62.4 27.6 Q61.4 22 58.6 20.2 Q53 19.4 48 20.4 L46.6 16.6 Q42 18.8 39.6 22.4 Q38.2 24.6 37.6 27.6Z" fill="${c}"/>`+ln('M48 20 Q51 15.4 58 15.4 M44 18 Q46 14 49 12.6')+ln('M45 13.2 Q50 11.4 55.6 12.6',.6,l);
    case 'sezar': return `<path d="M37.6 27 Q36.8 14.4 50 12.8 Q63.2 14.4 62.4 27 Q62 23.4 61 22.2 L39 22.2 Q38 23.4 37.6 27Z" fill="${c}"/>`+ln('M40 22.2 l.4-2 M42.6 22.2 l.3-2.2 M45.2 22.2 l.2-2.4 M47.8 22.2 l.1-2.4 M50.4 22.2 l0-2.4 M53 22.2 l-.1-2.4 M55.6 22.2 l-.2-2.4 M58.2 22.2 l-.3-2.2 M60.6 22.2 l-.4-2')+ln('M42 15.6 Q50 13 58 15.6',.7,l);
    case 'kel': return `<ellipse cx="46" cy="16" rx="4.6" ry="2" fill="#fff" opacity=".2"/>`;
  }return ''
}
function beard2(b,c){
  const d=shade(c,-25);
  const mus=`<path d="M45.4 41.8 Q47.4 39.6 50 40.3 Q52.6 39.6 54.6 41.8 Q52.2 41.3 50 41.8 Q47.8 41.3 45.4 41.8Z" fill="${c}" stroke="${OL2}" stroke-width=".4"/>`;
  const full='M37.7 33.4 Q37.9 41.6 41.4 45.8 L46 49.8 Q50 51.9 54 49.8 L58.6 45.8 Q62.1 41.6 62.3 33.4 Q60.6 40.6 56.2 42.4 Q53 40.6 50 40.6 Q47 40.6 43.8 42.4 Q39.4 40.6 37.7 33.4Z';
  switch(b){
    case 'ince': return `<path d="M46 41.4 Q50 39.8 54 41.4" stroke="${c}" stroke-width=".9" fill="none" stroke-linecap="round"/>`;
    case 'biyik': return `<path d="M44.4 43 Q45 40 50 40.2 Q55 40 55.6 43 Q54.8 43.2 54 41.8 Q50 41 46 41.8 Q45.2 43.2 44.4 43Z" fill="${c}" stroke="${OL2}" stroke-width=".45"/>`;
    case 'keci': return mus+`<path d="M47 44.4 Q47.2 48.6 50 50.6 Q52.8 48.6 53 44.4 Q50 45.6 47 44.4Z" fill="${c}" stroke="${OL2}" stroke-width=".45"/>`;
    case 'cene': return `<path d="M37.8 33 Q38 41.6 41.4 45.8 L46 49.8 Q50 51.9 54 49.8 L58.6 45.8 Q62 41.6 62.2 33" stroke="${c}" stroke-width="1.6" fill="none"/>`;
    case 'kirli': return `<path d="${full}" fill="${c}" opacity=".33"/><path d="M45.6 41.6 Q50 40 54.4 41.6" stroke="${c}" stroke-opacity=".4" stroke-width="1.2" fill="none"/>`;
    case 'boxed': return `<path d="${full}" fill="${c}" stroke="${OL2}" stroke-width=".55"/>`+mus+`<path d="M40 38 l.6 2 M42.6 43.4 l.6 1.8 M57.4 43.4 l-.6 1.8 M60 38 l-.6 2 M48 49 l.2 1.4 M52 49 l-.2 1.4" stroke="${d}" stroke-width=".55"/>`;
    case 'kisasakal': return `<path d="${full}" fill="${c}" opacity=".78" stroke="${OL2}" stroke-width=".4"/>`+mus+`<path d="M40.6 38 l.4 1.2 M43 43.6 l.4 1.2 M57 43.6 l-.4 1.2 M59.4 38 l-.4 1.2 M50 49 l0 1.2" stroke="${d}" stroke-width=".45"/>`;
    case 'palakalin': return `<path d="M43.6 43 Q44 38.8 50 39.2 Q56 38.8 56.4 43 Q55.2 43.6 54.2 41.8 Q50 40.8 45.8 41.8 Q44.8 43.6 43.6 43Z" fill="${c}" stroke="${OL2}" stroke-width=".5"/><path d="M46 40.6 l.6 1 M48 40.2 l.4 1.2 M52 40.2 l-.4 1.2 M54 40.6 l-.6 1" stroke="${d}" stroke-width=".4"/>`;
    case 'balbo': return mus+`<path d="M44.4 44 Q44.8 49.8 50 51.8 Q55.2 49.8 55.6 44 Q53.2 45.6 50 45.4 Q46.8 45.6 44.4 44Z" fill="${c}" stroke="${OL2}" stroke-width=".45"/><path d="M48.8 43.6 Q50 44.6 51.2 43.6 L50 45.2Z" fill="${c}"/>`;
    case 'vandyke': return `<path d="M44.6 41.4 Q47 39.6 50 40.4 Q53 39.6 55.4 41.4 Q56.6 40.6 57 39.4 Q56.2 42.6 54 41.9 Q50 41.4 46 41.9 Q43.8 42.6 43 39.4 Q43.4 40.6 44.6 41.4Z" fill="${c}" stroke="${OL2}" stroke-width=".45"/><path d="M47.2 44.6 Q47.4 49.4 50 54 Q52.6 49.4 52.8 44.6 Q50 45.8 47.2 44.6Z" fill="${c}" stroke="${OL2}" stroke-width=".45"/>`;
    case 'favori': return `<path d="M37.7 29 L37.9 39.6 Q39.4 44.6 43.2 45 Q45 43 45.6 41.6 Q47.6 39.8 50 40.4 Q52.4 39.8 54.4 41.6 Q55 43 56.8 45 Q60.6 44.6 62.1 39.6 L62.3 29 Q61 36.6 58 40.4 Q55 39.2 50 39.4 Q45 39.2 42 40.4 Q39 36.6 37.7 29Z" fill="${c}" stroke="${OL2}" stroke-width=".5"/>`;
    case 'garibaldi': return `<path d="M36.9 30.6 Q36.6 44 41.4 49.6 Q46 55.8 50 56.2 Q54 55.8 58.6 49.6 Q63.4 44 63.1 30.6 Q60.6 41 56.2 42.6 Q53 40.6 50 40.6 Q47 40.6 43.8 42.6 Q39.4 41 36.9 30.6Z" fill="${c}" stroke="${OL2}" stroke-width=".55"/>`+mus+`<path d="M39.4 37 l.7 2.2 M41 44.4 l.9 2 M45 50 l.6 2 M50 51.6 l0 2 M55 50 l-.6 2 M59 44.4 l-.9 2 M60.6 37 l-.7 2.2" stroke="${d}" stroke-width=".55"/>`;
    case 'tam': return `<path d="M37.3 31.6 Q37.4 42.4 41 47 L46 52.6 Q50 55.2 54 52.6 L59 47 Q62.6 42.4 62.7 31.6 Q60.6 41 56.2 42.6 Q53 40.6 50 40.6 Q47 40.6 43.8 42.6 Q39.4 41 37.3 31.6Z" fill="${c}" stroke="${OL2}" stroke-width=".55"/>`+mus+`<path d="M39.6 37 l.7 2.2 M41.6 44 l.8 2 M45.6 49 l.5 1.8 M54.4 49 l-.5 1.8 M58.4 44 l-.8 2 M60.4 37 l-.7 2.2" stroke="${d}" stroke-width=".55"/><path d="M47 45 Q50 46.4 53 45" stroke="${d}" stroke-width=".5" fill="none"/>`;
  }return ''
}
const TOR2='M9 110 L10.6 76 Q11.8 62.6 24.6 58.6 L43.6 54.4 Q50 57.2 56.4 54.4 L75.4 58.6 Q88.2 62.6 89.4 76 L91 110Z';
function body2(o,col){
  col=col||ODEF[o]||'#6c737f';const dk=shade(col,-22),lt=shade(col,18),lap=shade(col,lightC(col)?-14:-10);
  const arms=`<path d="M24 74 Q22.6 92 24 110 M76 74 Q77.4 92 76 110" stroke="${dk}" stroke-width=".9" fill="none"/><path d="M28 62 Q32 64 35 70 M72 62 Q68 64 65 70" stroke="${dk}" stroke-width=".7" fill="none" opacity=".7"/>`;
  const shade2=`<path d="M64 56.6 L75.4 58.6 Q88.2 62.6 89.4 76 L91 110 L70 110 Q73 84 64 56.6Z" fill="#000" opacity=".16"/>`;
  const vskin=(b=66)=>`<path d="M44.2 55 L50 ${b} L55.8 55Z" fill="var(--sk)"/>`;
  const tie=c=>`<path d="M48.7 58 L51.3 58 L52.2 61 L51.4 76 L50 78.6 L48.6 76 L47.8 61Z" fill="${c}" stroke="${OL2}" stroke-width=".5"/><path d="M48.7 58 L51.3 58 L51 60.6 L49 60.6Z" fill="${shade(c,-20)}"/>`;
  const jacket=(c,inner,extra='',open=82)=>`<path d="${TOR2}" fill="${c}"/>`+shade2+`<path d="M43.4 54.6 L50 ${open} L56.6 54.6Z" fill="${inner}"/>`+extra+`<path d="M43.4 54.6 L50 ${open} L37.6 74 L41 66 L38.4 61.6 Z" fill="${shade(c,lightC(c)?-12:12)}" stroke="${OL2}" stroke-width=".5"/><path d="M56.6 54.6 L50 ${open} L62.4 74 L59 66 L61.6 61.6 Z" fill="${shade(c,lightC(c)?-16:6)}" stroke="${OL2}" stroke-width=".5"/><path d="M50 ${open} V110" stroke="${shade(c,-25)}" stroke-width=".7"/><circle cx="51.6" cy="${open+8}" r=".9" fill="${shade(c,-35)}"/><path d="M64 84 h7" stroke="${shade(c,-25)}" stroke-width=".7"/>`+arms;
  const collar=(c)=>`<path d="M44 54.8 L41.4 60.6 L47.6 63.2 L46.6 56.6Z M56 54.8 L58.6 60.6 L52.4 63.2 L53.4 56.6Z" fill="${c}" stroke="${OL2}" stroke-width=".45"/>`;
  switch(o){
    case 'esofman':{const st=lightC(col)?'#1b1b1e':'#f2f2f2';return `<path d="${TOR2}" fill="${col}"/>`+shade2+`<path d="M44 54.6 Q50 52.4 56 54.6 L56 58 Q50 60 44 58Z" fill="${dk}"/><path d="M50 58.6 V110" stroke="#c9c9c9" stroke-width="1"/><path d="M17.6 66 L13 110 M20.6 64.6 L16.4 110 M82.4 66 L87 110 M79.4 64.6 L83.6 110" stroke="${st}" stroke-width="1.5"/>`+arms}
    case 'tisort': return `<path d="${TOR2}" fill="${col}"/>`+shade2+`<path d="M43.6 54.6 Q50 61.6 56.4 54.6" fill="var(--sk)" stroke="${dk}" stroke-width="1.6"/>`+arms+`<path d="M22 78 L26.6 77 M78 78 L73.4 77" stroke="${dk}" stroke-width=".7"/>`;
    case 'gomlek': return `<path d="${TOR2}" fill="${col}"/>`+shade2+vskin(65)+collar(lt)+`<path d="M50 65 V110" stroke="${dk}" stroke-width=".6"/><circle cx="51.3" cy="70" r=".65" fill="${dk}"/><circle cx="51.3" cy="78" r=".65" fill="${dk}"/><circle cx="51.3" cy="86" r=".65" fill="${dk}"/><path d="M30 70 h8 v6 h-8Z" fill="none" stroke="${dk}" stroke-width=".6"/>`+arms;
    case 'hawaii': {const id='h2'+(++uid);return `<defs><pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="${col}"/><circle cx="3" cy="3" r="1.8" fill="#f2e6c8" opacity=".85"/><circle cx="7.6" cy="7" r="1.3" fill="#e9b949" opacity=".8"/><path d="M5.4 1 q1 2 3 2" stroke="#2f6b3a" stroke-width=".7" fill="none"/></pattern></defs><path d="${TOR2}" fill="url(#${id})"/>`+shade2+vskin(64)+collar(shade(col,-8))+arms}
    case 'deri': return jacket(col,'#e9e3d8',`<path d="M43.4 54.6 Q50 61 56.6 54.6" stroke="#cfc8b8" stroke-width="1" fill="none"/>`)+`<path d="M38 88 h6 M56 88 h6" stroke="#8a7a6a" stroke-width=".8"/>`;
    case 'polo': return jacket(col,'#f1ece0',collar('#f6f1e6'),76);
    case 'balikci': return jacket(col,'#1c1c20',`<path d="M44 48 L43.6 56 Q50 59 56.4 56 L56 48 Q50 50.6 44 48Z" fill="#1c1c20" stroke="${OL2}" stroke-width=".5"/><path d="M44 51 Q50 53.4 56 51 M43.8 54 Q50 56.4 56.2 54" stroke="#33333a" stroke-width=".6" fill="none"/>`,78);
    case 'takim': return jacket(col,'#f3f1ec',tie(lightC(col)?'#1c1c20':'#6b1b22'));
    case 'cizgili': {const id='p2'+(++uid);return `<defs><pattern id="${id}" width="3.6" height="4" patternUnits="userSpaceOnUse"><rect width="3.6" height="4" fill="${col}"/><path d="M1 0V4" stroke="${shade(col,lightC(col)?-40:45)}" stroke-width=".45"/></pattern></defs>`+jacket(`url(#${id})`,'#cfe0f2',tie('#9b1c1c')).replace(/fill="url\(#p2\d+\)" stroke/g,'fill="'+shade(col,8)+'" stroke')}
    case 'yelek': return jacket(col,'#f3f1ec',`<path d="M45.6 60 L50 74 L54.4 60 L56.6 92 L43.4 92Z" fill="${shade(col,-12)}" stroke="${OL2}" stroke-width=".4"/><circle cx="50" cy="80" r=".7" fill="#c9b27a"/><circle cx="50" cy="85" r=".7" fill="#c9b27a"/>`+tie('#3a1a1a'));
    case 'kadife': return jacket(col,'#141416',`<path d="M43.4 54.6 L50 70 L56.6 54.6" stroke="#2c2c30" stroke-width="1" fill="none"/>`)+`<path d="M15 80 Q20 76 24 80 M76 80 Q80 76 85 80" stroke="#fff" stroke-opacity=".12" stroke-width="1.4" fill="none"/>`;
    case 'beyaz': return jacket(col,'#17171a',`<path d="M43.4 54.6 L50 70 L56.6 54.6" stroke="#333" stroke-width=".6" fill="none"/>`);
    case 'smokin': return jacket(col,'#f6f4ef',`<path d="M45.4 57 L50 59.4 L45.4 61.8Z M54.6 57 L50 59.4 L54.6 61.8Z" fill="#0c0c0e"/><circle cx="50" cy="59.4" r="1" fill="#0c0c0e"/><circle cx="50" cy="67" r=".7" fill="#222"/><circle cx="50" cy="73" r=".7" fill="#222"/>`);
    case 'trenckot': return jacket(col,'#1c1c20','',86)+`<path d="M9.6 90 L90.4 90 L90.6 95 L9.4 95Z" fill="${shade(col,-12)}" stroke="${OL2}" stroke-width=".5"/><rect x="47" y="89.6" width="6" height="5.8" rx="1" fill="none" stroke="#b49a5a" stroke-width=".8"/>`;
    case 'palto': return jacket(col,'#f3f1ec',`<path d="M44 54.6 Q50 58.6 56 54.6 L57.6 60 Q50 64 42.4 60Z" fill="#5a1c27" stroke="${OL2}" stroke-width=".4"/><path d="M44 60 L42.6 84 L46.4 84 L47 62Z" fill="#5a1c27" stroke="${OL2}" stroke-width=".4"/>`,88);
    case 'mahkum': return `<path d="${TOR2}" fill="#7f837d"/>`+shade2+`<path d="M43.6 54.6 L50 64 L56.4 54.6" fill="var(--sk)" stroke="#5f635d" stroke-width="1.8"/><rect x="58" y="70" width="15" height="7" rx="1" fill="#e9e6dc"/><text x="65.5" y="75.6" font-size="5" text-anchor="middle" font-family="monospace" fill="#222">1907</text>`+arms;
    default: return `<path d="${TOR2}" fill="${col}"/>`+shade2+arms;
  }
}
function acc2(a){
  switch(a){
    case 'gozluk': return `<g fill="#0d0d10" stroke="${OL2}" stroke-width=".4"><path d="M38.8 29.6 h9.4 q.6 0 .5 .8 l-.6 3.6 q-.4 1.8-2.4 1.8 h-4.2 q-2.2 0-2.8-2 l-.6-3.2 q-.1-1 .7-1Z"/><path d="M51.8 29.6 h9.4 q.8 0 .7 1 l-.6 3.2 q-.6 2-2.8 2 h-4.2 q-2 0-2.4-1.8 l-.6-3.6 q-.1-.8 .5-.8Z"/></g><path d="M48.6 30.6 Q50 29.8 51.4 30.6 M38.4 30.4 L36.8 30 M61.6 30.4 L63.2 30" stroke="#0d0d10" stroke-width=".9" fill="none"/><path d="M40.6 31 L43 31 M53.6 31 L56 31" stroke="#fff" stroke-opacity=".4" stroke-width=".8"/>`;
    case 'zincir': return `<path d="M43.8 55 Q50 66 56.2 55" stroke="#d9ad3a" stroke-width="1.7" fill="none" stroke-dasharray="1.6 .7"/><circle cx="50" cy="63.2" r="1.8" fill="#e9bf4a" stroke="#a3801f" stroke-width=".5"/>`;
    case 'kartal': return `<path d="M44 55 Q46 62.6 50 65.4 Q54 62.6 56 55" stroke="#d9ad3a" stroke-width=".75" fill="none"/><g transform="translate(50 65.2) scale(.5) translate(-50 -63.8)"><g fill="#e3b33c" stroke="#8a6a1c" stroke-width=".3"><path d="M50 65 L48.6 66.4 L46.2 65.4 L45.6 67.2 L47.4 68.4 L45 69.2 L46.8 70.4 L48.6 69.8 L49 72.6 L50 74 L51 72.6 L51.4 69.8 L53.2 70.4 L55 69.2 L52.6 68.4 L54.4 67.2 L53.8 65.4 L51.4 66.4Z"/><g transform="translate(0 1.4)"><path d="M49.4 66 Q47.6 64 47.9 63 L49.2 63.6Z M50.6 66 Q52.4 64 52.1 63 L50.8 63.6Z"/><circle cx="47.9" cy="62.9" r=".95"/><circle cx="52.1" cy="62.9" r=".95"/><path d="M47 62.8 L45.9 63.3 L47 63.5Z M53 62.8 L54.1 63.3 L53 63.5Z"/></g></g></g>`;
    case 'bayrak': return `<path d="M44 55 Q46 62.6 50 65.4 Q54 62.6 56 55" stroke="#d9ad3a" stroke-width=".75" fill="none"/><g transform="translate(50 65.4) scale(.5) translate(-50 -64.6)"><rect x="46" y="64.6" width="8" height="5.6" rx=".5" fill="#e30a17" stroke="#c9a24a" stroke-width=".45"/><circle cx="49.2" cy="67.4" r="1.75" fill="#fff"/><circle cx="49.65" cy="67.4" r="1.4" fill="#e30a17"/><path d="M51.6 67.4 l.95.31 l-.59-.81 v1 l.59-.81Z" fill="#fff" transform="rotate(0)"/></g>`;
    case 'kupe': return `<circle cx="36.8" cy="37.6" r="1" fill="#eef5ff" stroke="#b9c8de" stroke-width=".4"/>`;
    case 'puro': return `<g transform="rotate(12 54 42.6)"><rect x="53.4" y="41.6" width="10.4" height="2.2" rx=".9" fill="#6b4226" stroke="${OL2}" stroke-width=".35"/><rect x="55.4" y="41.6" width="1.4" height="2.2" fill="#b8892c"/><circle cx="63.8" cy="42.7" r="1" fill="#ff7a2e"/></g><path d="M65.6 39.6 q1.6-2.4 0-4.8 q-1.6-2.4 .8-4.8" stroke="#cfcfcf" stroke-opacity=".4" stroke-width="1" fill="none"/>`;
    case 'kasket': return `<path d="M35.4 24 Q34 12 46 9.4 Q56 8.6 62 10.6 Q67 13.6 66 22.4 Q67.6 23.6 66.6 25.2 Q50 22.6 34.6 25.6 Q33.6 24.4 35.4 24Z" fill="#3a352f" stroke="${OL2}" stroke-width=".55"/><path d="M34.6 25.6 Q50 22.6 66.6 25.2 Q64.6 28.6 50 27.4 Q37 28.6 34.6 25.6Z" fill="#24201c" stroke="${OL2}" stroke-width=".5"/><circle cx="52" cy="9.6" r=".9" fill="#24201c"/><path d="M38 17 Q50 12.4 63 15.6 M36.6 21.4 Q50 17.6 65 20.4" stroke="#4d463e" stroke-width=".5" fill="none"/>`;
    case 'fotr': return `<ellipse cx="50" cy="20.6" rx="20" ry="3.8" fill="#1c1c20" stroke="${OL2}" stroke-width=".5"/><path d="M38.6 20.6 Q38.4 6.4 50 6.2 Q61.6 6.4 61.4 20.6Z" fill="#26262c" stroke="${OL2}" stroke-width=".5"/><rect x="38.7" y="15.6" width="22.6" height="3.2" fill="#7c1f1f"/><path d="M46 7.6 Q50 10.4 54 7.6" stroke="#141417" stroke-width=".9" fill="none"/>`;
    case 'yara': return `<path d="M57.6 28 L59.8 38.4" stroke="#a9554c" stroke-width="1.1" stroke-linecap="round"/><path d="M57.4 31 L59.6 30.4 M58.2 34.2 L60.4 33.6" stroke="#a9554c" stroke-width=".7"/>`;
    case 'boyun': return `<g fill="#1f2b3d" opacity=".75"><path d="M52.6 47.6 q1.6-2.4 3.2 0 q-1.6 .9-1.6 3 q-.8-1.6-1.6-3Z"/></g><path d="M54.2 50.6 v3.2" stroke="#1f2b3d" stroke-width=".6" opacity=".75"/>`;
    case 'kasust': return `<path d="M53.2 25.6 q.5-.9 1-.1 t1 0 t1 0 t1 0 t1 0 M53.8 26.4 h4.4" stroke="#1f2b3d" stroke-width=".42" fill="none" opacity=".85"/>`;
    case 'yildiz': return `<path d="M61.4 29.6 l.42 1 1.08.08 -.82.7 .26 1.06 -.94-.58 -.94.58 .26-1.06 -.82-.7 1.08-.08Z" fill="#1f2b3d" opacity=".85"/>`;
    case 'elmacikgul': return `<g opacity=".85"><circle cx="59.6" cy="37" r="1.15" fill="none" stroke="#7a1f2b" stroke-width=".45"/><path d="M59.6 36.3 q.6.2.4.8 q-.6.4-.9-.2" stroke="#7a1f2b" stroke-width=".35" fill="none"/><path d="M58.6 37.8 q-.9.5-1.4.2 M60.6 37.8 q.9.5 1.4.2" stroke="#2f5a3a" stroke-width=".4" fill="none"/></g>`;
    case 'cizgi3': return `<path d="M39.6 33.6 l1.6 1.2 M39.4 35 l1.6 1.2 M39.2 36.4 l1.6 1.2" stroke="#1f2b3d" stroke-width=".5" stroke-linecap="round" opacity=".85"/>`;
    case 'alinyazi': return `<text x="50" y="24.4" text-anchor="middle" font-size="2.3" font-family="Georgia,serif" font-style="italic" fill="#1f2b3d" opacity=".8" letter-spacing=".15">Sadakat</text>`;
    case 'gozyasi': return `<path d="M43.6 35 q.8 1.1 0 2 q-.8-.9 0-2Z" fill="#1f2b3d"/>`;
    case 'kaskesik': return `<path d="M56.4 26.4 L55.8 29" stroke="var(--sk)" stroke-width=".9"/>`;
    case 'altindis': return `<rect x="51.4" y="42.3" width="1.4" height="1.1" rx=".25" fill="#e3b33c"/>`;
  }return ''
}
function neckTat(a){let t='';const ink='#1f2b3d';
  if(a.includes('boyun2'))t+=`<g stroke="${ink}" fill="none" stroke-linecap="round" opacity=".85"><path d="M44 56.6 Q45.6 52.6 44.4 48.4 Q46.6 51 46.8 54 Q47.4 51.6 46.6 49.4 Q48.6 52 48.4 55.6" stroke-width=".75"/><path d="M56 56.6 Q54.4 52.6 55.6 48.4 Q53.4 51 53.2 54 Q52.6 51.6 53.4 49.4 Q51.4 52 51.6 55.6" stroke-width=".75"/><path d="M48.8 57.4 Q50 54.2 51.2 57.4 M50 54.2 L50 52.6" stroke-width=".6"/><path d="M45 50.6 l.9.5 M55 50.6 l-.9.5 M45.4 53.4 l.9.3 M54.6 53.4 l-.9.3" stroke-width=".35"/></g>`;
  if(a.includes('boyun3'))t+=`<g stroke="${ink}" stroke-linecap="round" opacity=".88"><path d="M50 52.6 Q46.6 50.4 43.6 51.2 Q45.2 52 44.4 53.2 Q46 53.2 46.2 54.6 Q48 53.8 50 55.2 Q52 53.8 53.8 54.6 Q54 53.2 55.6 53.2 Q54.8 52 56.4 51.2 Q53.4 50.4 50 52.6Z" fill="${ink}" fill-opacity=".22" stroke-width=".5"/><path d="M45 51.8 l1.4.8 M45.4 53 l1.4.4 M46.6 54 l1.2.2 M55 51.8 l-1.4.8 M54.6 53 l-1.4.4 M53.4 54 l-1.2.2" stroke-width=".35"/><path d="M50 52.6 L49 51.4 Q50 50.6 51 51.4Z" fill="${ink}" stroke-width=".35"/><path d="M48.6 55.4 L50 57.6 L51.4 55.4 M49.4 55.8 L50 56.8 L50.6 55.8" stroke-width=".45" fill="none"/></g>`;
  if(a.includes('boyun'))t+=`<g opacity=".88"><circle cx="53.6" cy="51.4" r="1.6" fill="#7a1f2b"/><path d="M53.6 50.4 q1 .3 .7 1.2 q-.9.6-1.4-.3 q.2-.8 1.1-.6" stroke="#3a0d14" stroke-width=".35" fill="none"/><path d="M52.2 52.4 q-1.4.8-2.2.2 M54.8 52.6 q1 1 1.4 1.8" stroke="#2f5a3a" stroke-width=".55" fill="none"/><path d="M45 55 q1-.8 2 0 t2 0 t2 0" stroke="${ink}" stroke-width=".4" fill="none"/></g>`;
  return t}
function avatarSVG2(L,age,opts){
  const skin=SKINS[L.skin],sd=shade(skin,-20),sdd=shade(skin,-40),id='b'+(++uid);
  let hc=HCOL[L.hairColor];
  if(age>=58&&!['gri','beyaz'].includes(L.hairColor))hc=age>=72?HCOL.beyaz:HCOL.gri;
  const adult=age>=16,o=opts.jail?'mahkum':L.outfit,accs=adult&&!opts.jail?L.acc:(opts.jail&&L.acc.includes('yara')?['yara']:[]);
  const sad=opts.mood!==undefined&&opts.mood<30;
  const G=x=>`<g stroke="${OL2}" stroke-width=".8" stroke-linejoin="round">${x}</g>`;
  const HEAD='M37.6 27.6 Q37.2 13.4 50 13 Q62.8 13.4 62.4 27.6 L62.3 34 Q62 41.4 58.6 45.6 L54 49.6 Q50 51.8 46 49.6 L41.4 45.6 Q38 41.4 37.7 34Z';
  let s=`<svg viewBox="14 2 72 79.2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="--sk:${skin}">`;
  s+=G(hair2Back(L.hair,hc));
  // boyun
  s+=G(`<path d="M44.2 44 L43.8 56.4 Q50 59.6 56.2 56.4 L55.8 44Z" fill="${skin}"/>`)+`<path d="M44.1 47 Q50 54 55.9 47 L56 51.4 Q50 56 44 51.4Z" fill="${sd}"/><path d="M53.4 52 L54.4 57" stroke="${sd}" stroke-width=".8"/>`;
  if(accs.some(a=>a==='boyun'||a==='boyun2'||a==='boyun3'))s+=`<defs><clipPath id="${id}nk"><path d="M44.3 44 L43.9 56.3 Q50 59.4 56.1 56.3 L55.7 44Z"/></clipPath></defs><g clip-path="url(#${id}nk)">${neckTat(accs)}</g>`;
  s+=G(body2(o,(L.oc||{})[o]));
  ['zincir','kartal','bayrak'].forEach(a=>{if(accs.includes(a))s+=acc2(a)});
  // kulaklar
  s+=G(`<path d="M38 28.4 Q34.4 27.6 34.8 32.4 Q35.2 37.4 38.6 37.6Z" fill="${skin}"/><path d="M62 28.4 Q65.6 27.6 65.2 32.4 Q64.8 37.4 61.4 37.6Z" fill="${skin}"/>`)+`<path d="M37.4 30 Q36 32.4 37.4 35 M62.6 30 Q64 32.4 62.6 35" stroke="${sd}" stroke-width=".8" fill="none"/>`;
  // kafa
  s+=G(`<path d="${HEAD}" fill="${skin}"/>`);
  s+=`<path d="M57.4 15 Q62.6 19 62.4 27.6 L62.3 34 Q62 41.4 58.6 45.6 L55 48.8 Q58 43 58.8 36 Q59.6 24 57.4 15Z" fill="${sd}" opacity=".75"/>`;
  s+=`<path d="M38.4 25.4 Q50 21.4 61.6 25.4 L61.8 27.4 Q50 23.6 38.2 27.4Z" fill="${sd}" opacity=".45"/>`;
  s+=`<path d="M39.6 37 Q41.4 40.4 44.4 41.2 Q41.4 41.8 39.8 39.6Z M60.4 37 Q58.6 40.4 55.6 41.2 Q58.6 41.8 60.2 39.6Z" fill="${sd}" opacity=".7"/>`;
  if(adult&&L.beard!=='tam'&&L.beard!=='boxed')s+=`<path d="M38.2 36 Q39 42.6 42 45.6 L46.2 49.4 Q50 51.4 53.8 49.4 L58 45.6 Q61 42.6 61.8 36 Q59.4 42.6 55 43.6 Q50 42.2 45 43.6 Q40.6 42.6 38.2 36Z" fill="${hc}" opacity=".12"/>`;
  // gözler
  s+=`<defs><clipPath id="${id}e1"><path d="M41.5 32.1 Q44.4 31 47.3 31.6 Q44.6 33.2 41.5 32.1Z"/></clipPath><clipPath id="${id}e2"><path d="M58.5 32.1 Q55.6 31 52.7 31.6 Q55.4 33.2 58.5 32.1Z"/></clipPath></defs>`;
  const ey=(cx,dd,k)=>{const x1=cx-2.9*dd,x2=cx+2.9*dd;return `<path d="M${x1} 32.1 Q${cx} 31 ${x2} 31.6 Q${cx+.2*dd} 33.2 ${x1} 32.1Z" fill="#efe7da"/><g clip-path="url(#${id}${k})"><circle cx="${cx+dd*.3}" cy="32" r="1.3" fill="#2e1d12"/><circle cx="${cx+dd*.3}" cy="32" r=".65" fill="#080605"/></g><path d="M${x1-.3*dd} 32.2 Q${cx} 30.6 ${x2+.3*dd} 31.5" stroke="${OL2}" stroke-width="1.15" fill="none" stroke-linecap="round"/><path d="M${x1} 30.6 Q${cx} 29.8 ${x2} 30.4" stroke="${sdd}" stroke-width=".6" fill="none" opacity=".8"/><path d="M${x1+.4*dd} 33.6 Q${cx} 34.5 ${x2-.2*dd} 33.4" stroke="${sd}" stroke-width=".6" fill="none"/>`};
  s+=`<path d="M41 30.4 Q44.4 29.6 47.6 30.8 L47.6 31.6 Q44.4 30.6 41 31.6Z M59 30.4 Q55.6 29.6 52.4 30.8 L52.4 31.6 Q55.6 30.6 59 31.6Z" fill="${sdd}" opacity=".35"/>`;
  s+=ey(44.4,1,'e1')+ey(55.6,-1,'e2');
  // kaşlar: çatık, içe doğru inen
  s+=sad?`<path d="M40.6 28.6 Q44 27 47.8 26.8 L47.8 27.9 Q44.2 28 41 29.6Z M59.4 28.6 Q56 27 52.2 26.8 L52.2 27.9 Q55.8 28 59 29.6Z" fill="${hc}" stroke="${OL2}" stroke-width=".3"/>`
        :`<path d="M40 27.6 Q43.6 26.6 48.2 29 L47.8 30.3 Q44 28.6 40.4 29Z M60 27.6 Q56.4 26.6 51.8 29 L52.2 30.3 Q56 28.6 59.6 29Z" fill="${hc}" stroke="${OL2}" stroke-width=".35"/><path d="M49.3 28.4 L49.7 30.6 M50.7 28.4 L50.3 30.6" stroke="${sdd}" stroke-width=".5" opacity=".8"/>`;
  // burun
  s+=`<path d="M51 30.6 Q52.6 34.6 52.4 37.6" stroke="${OL2}" stroke-opacity=".7" stroke-width=".7" fill="none" stroke-linecap="round"/><path d="M51.2 33 Q52.8 35.6 52.6 37.8 L51.2 38.4Z" fill="${sd}" opacity=".8"/><path d="M47.6 38 Q48.6 39.6 50.2 39.3 Q51.8 39.8 52.8 38.1" stroke="${OL2}" stroke-width=".75" fill="none" stroke-linecap="round"/>`;
  if(adult)s+=beard2(L.beard,hc);
  // ağız
  s+=sad?`<path d="M46.8 43.4 Q50 41.8 53.2 43.4" stroke="#5a2a22" stroke-width=".85" fill="none" stroke-linecap="round"/>`
        :`<path d="M46.4 43.1 Q50 42.5 53.6 43.1" stroke="#4a221c" stroke-width=".9" fill="none" stroke-linecap="round"/><path d="M46.4 43.1 L46 43.8 M53.6 43.1 L54 43.8" stroke="#4a221c" stroke-width=".55" stroke-linecap="round"/><path d="M45 39.4 Q44.2 41.6 45.2 43.8 M55 39.4 Q55.8 41.6 54.8 43.8" stroke="${sd}" stroke-width=".55" fill="none"/>`;
  s+=`<path d="M47.8 44 Q50 45.6 52.2 44 Q50 44.6 47.8 44Z" fill="${sdd}" opacity=".55"/>`;
  if(age>=50)s+=`<path d="M43 23.4 Q47 22.6 50 23.4 Q53 22.6 57 23.4 M41 34.4 L42 35.2 M59 34.4 L58 35.2" stroke="${sdd}" stroke-width=".55" fill="none" opacity=".7"/>`;
  s+=G(hair2(L.hair,hc));
  if(age>=40&&age<58&&!['kel','asker'].includes(L.hair)&&!['gri','beyaz'].includes(L.hairColor))s+=`<path d="M37.8 30 Q37.4 25 38.6 21.6 M62.2 30 Q62.6 25 61.4 21.6" stroke="#c4c4c4" stroke-width="1.4" opacity=".6" fill="none" stroke-linecap="round"/>`;
  ['gozyasi','kasust','yildiz','elmacikgul','cizgi3','alinyazi','kaskesik','altindis','kupe','yara','gozluk','puro','fotr','kasket'].forEach(a=>{if(accs.includes(a))s+=acc2(a)});
  {const jw=opts.jw||[];if(adult&&!opts.jail&&jw.length&&jw.some(j=>['saat','yuzuk','pirlanta','yakut'].includes(j))){
    if(jw.includes('saat'))s+=`<rect x="13.6" y="100" width="9" height="3" rx=".8" fill="#c9a24a" stroke="${OL2}" stroke-width=".4"/><circle cx="18.1" cy="101.5" r="1.8" fill="#e8e1cc" stroke="#9c7a2e" stroke-width=".5"/>`;
    if(jw.some(j=>['yuzuk','pirlanta','yakut'].includes(j)))s+=`<circle cx="80.4" cy="104.6" r="1.4" fill="${jw.includes('yakut')?'#b0182a':jw.includes('pirlanta')?'#eef5ff':'#d6a634'}" stroke="#a3801f" stroke-width=".4"/>`}}
  return s+'</svg>';
}

