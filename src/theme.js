/* ============ Tema renkleri ============ */
const THEMES=[['neon','Neon gece','#ff5fa2','#a378ff'],['kirmizi','Kırmızı sahne','#ff2d3d','#ff7a59'],['altin','Altın plak','#e8b94a','#f5dc8a'],['okyanus','Okyanus','#2ec5ff','#5b8cff'],['zumrut','Zümrüt','#3fe0a0','#2bb3a3'],['gunbatimi','Gün batımı','#ff8a3d','#ff3d77'],['monokrom','Siyah beyaz','#f2f2f2','#6b6b75']];
let THEME=(()=>{try{return localStorage.getItem('sahne2-tema')||'neon'}catch(e){return 'neon'}})();
function applyTheme(){document.body.dataset.th=THEME;const m=document.querySelector('meta[name=theme-color]');const bgs={neon:'#120e1a',kirmizi:'#0b0909',altin:'#100e09',okyanus:'#07121a',zumrut:'#07130f',gunbatimi:'#140b0b',monokrom:'#0c0c0d'};if(m)m.content=bgs[THEME]||'#120e1a'}
function setTheme(k){THEME=k;try{localStorage.setItem('sahne2-tema',k)}catch(e){}applyTheme();if($('title').classList.contains('on'))drawTitle();if(SHEET)drawSheet()}
const themePicker=()=>`<div class="themes">${THEMES.map(([k,n,a,b])=>`<button class="thb ${THEME===k?'on':''}" onclick="setTheme('${k}')"><i style="background:linear-gradient(135deg,${a},${b})"></i>${n}</button>`).join('')}</div>`;
applyTheme();
const _dt=drawTitle;drawTitle=function(){_dt();const w=document.querySelector('#title .cwrap');if(w)w.insertAdjacentHTML('beforeend',`<div class="sec" style="text-align:left;margin-top:18px">Tema</div>${themePicker()}<div style="height:24px"></div>`)};
const _sa2=shAyar;shAyar=function(){return _sa2().replace(sec('Görünüm'),sec('Görünüm')+note('Tema rengi')+themePicker())};
