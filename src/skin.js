/* ============ Arayüz stili: Modern (varsayılan) · Klasik (hayat simülasyonu görünümü) ============ */
let SKIN=(()=>{try{return localStorage.getItem('sahne2-skin')||'modern'}catch(e){return 'modern'}})();
const STAR=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26'%3E%3Cpath d='M6.5 1.5l1.3 2.8 3 .3-2.3 2 .7 3-2.7-1.6-2.7 1.6.7-3-2.3-2 3-.3z' fill='%23474a22'/%3E%3Cpath d='M19.5 14.5l1.3 2.8 3 .3-2.3 2 .7 3-2.7-1.6-2.7 1.6.7-3-2.3-2 3-.3z' fill='%23474a22'/%3E%3C/svg%3E")`;
document.head.insertAdjacentHTML('beforeend',`<style id="skincss">
body[data-skin=klasik]{--kb:#0b1d33;--kn:#06284d;--kc:#43c6f2;--kg:#0aa02e;--kgr:#2ba84a;--kd:#1f2023;--kl:#3a2f44;--ks:#2e3342}
body[data-skin=klasik] #game{background:var(--kd)}
body[data-skin=klasik] .top{background:${STAR},var(--kb);background-size:26px 26px;border-bottom:2px solid #33435c}
body[data-skin=klasik] #hav{border:0;background:transparent;box-shadow:none;border-radius:12px}
body[data-skin=klasik] .who h1{font-family:var(--body);font-weight:800;font-size:22px;color:var(--kc);letter-spacing:0;text-decoration:underline;text-underline-offset:3px}
body[data-skin=klasik] .who p,body[data-skin=klasik] .who p b{color:var(--kc);font-family:var(--body);font-size:14px;font-weight:500}
body[data-skin=klasik] .cash strong{color:#2fd04a;font-family:var(--body);font-weight:900;font-size:22px}
body[data-skin=klasik] .cash small{color:var(--kc);letter-spacing:0;font-size:12px;text-transform:none}
body[data-skin=klasik] .gear{filter:grayscale(1) brightness(1.6)}
body[data-skin=klasik] #log{background:var(--kd)}
body[data-skin=klasik] .yr{border-bottom:1px solid var(--kl)}
body[data-skin=klasik] .yr h3{color:var(--kc);font-family:var(--body);font-weight:800;letter-spacing:0;text-transform:none;font-size:16px}
body[data-skin=klasik] .yr h3:before{content:""}
body[data-skin=klasik] .yr p{color:#f2f2f2;font-size:16.5px}
body[data-skin=klasik] .yr p.good{color:#7ee08f}body[data-skin=klasik] .yr p.bad{color:#ff8a80}body[data-skin=klasik] .yr p.dim{color:#b9bcc4}
body[data-skin=klasik] #stats{background:${STAR},var(--kb);background-size:26px 26px;grid-template-columns:1fr;gap:6px;border-top:2px solid #33435c;padding:10px 14px}
body[data-skin=klasik] .st{display:grid;grid-template-columns:92px 1fr 56px;align-items:center;gap:8px}
body[data-skin=klasik] .st label{display:contents;color:var(--kc);font-family:var(--body);font-weight:800;font-size:15px;letter-spacing:0;text-transform:none}
body[data-skin=klasik] .st label b{order:3;background:#26292f;color:var(--kc);text-align:center;padding:2px 0;border-radius:3px;font-weight:800}
body[data-skin=klasik] .st .bar{order:2;height:16px;border-radius:0;background:#1d2a3a;margin:0}
body[data-skin=klasik] .st .bar i{border-radius:0;background:var(--kgr)!important}
body[data-skin=klasik] .st:nth-child(4) .bar i{background:#f2c14e!important}
body[data-skin=klasik] .st .kl{text-align:right;display:block}
body[data-skin=klasik] .chips .chip{background:#0d2744;border-color:#264a73;color:var(--kc)}
body[data-skin=klasik] .nav{background:var(--kn);border-top:2px solid #33435c;padding-top:4px}
body[data-skin=klasik] .nav button{color:#fff;font-family:var(--body);font-weight:600;letter-spacing:0;font-size:13px}
body[data-skin=klasik] .nav button:not(.age):not(.udb) svg{background:#33c6e8;border-radius:50%;padding:9px;width:44px;height:44px;stroke:#fff;stroke-width:2.2}
body[data-skin=klasik] .nav .age{margin-top:-38px}
body[data-skin=klasik] .nav .age span.c{width:92px;height:92px;background:var(--kg);border:5px solid #fff;box-shadow:0 4px 16px #0008}
body[data-skin=klasik] .nav .age span.c em{font-family:var(--body);font-weight:900;font-size:18px;letter-spacing:0}
body[data-skin=klasik] .nav .age span.c em:before{content:"+";display:block;font-size:34px;line-height:.8;font-weight:900}
body[data-skin=klasik] .udb{left:calc(50% + 34px)!important;bottom:calc(6px + env(safe-area-inset-bottom))!important;width:40px;height:40px;padding:0!important;border-radius:50%!important;background:#e53935!important;border:3px solid #fff!important;font-size:9px!important;font-weight:900;display:flex;align-items:center;justify-content:center;line-height:1;text-align:center}
body[data-skin=klasik] .ltb{background:#f5e900;color:#111;border-radius:0 999px 999px 0;right:auto;left:0}
body[data-skin=klasik] .ov{background:transparent}
body[data-skin=klasik] .ov.on{align-items:flex-end}
body[data-skin=klasik] .sheet{max-width:520px;height:calc(100% - 84px - env(safe-area-inset-top));max-height:none;border-radius:0;background:var(--kd);border-top:0;animation:none}
body[data-skin=klasik] .sh-h{background:var(--kn);border-bottom:2px solid #33435c;padding:12px 14px}
body[data-skin=klasik] .sh-h h2{text-align:center;font-family:var(--display);font-size:34px;letter-spacing:.02em;text-transform:uppercase;color:#fff}
body[data-skin=klasik] .x{background:transparent;border:3px solid #fff;color:#fff;font-weight:900}
body[data-skin=klasik] .sh-b{background:var(--kd);padding:0 14px 30px}
body[data-skin=klasik] .row{margin:0 -14px;width:calc(100% + 28px);border-radius:0;border:0;border-bottom:1px solid var(--kl);background:var(--kd);padding:16px 18px;gap:16px}
body[data-skin=klasik] .row .ic{background:transparent;font-size:34px;width:48px;height:48px}
body[data-skin=klasik] .row .tx b{color:var(--kc);font-weight:800;font-size:19px}
body[data-skin=klasik] .row .tx span{color:var(--kc);opacity:.92;font-size:15px}
body[data-skin=klasik] .row .rt{color:var(--kc);font-weight:800}
body[data-skin=klasik] .row:disabled{opacity:.45;filter:grayscale(1)}
body[data-skin=klasik] .sec{margin:0 -14px;padding:9px 14px;background:var(--ks);color:#cfd3dc;text-align:center;font-family:var(--body);font-weight:800;font-size:16px;letter-spacing:0;text-transform:none}
body[data-skin=klasik] .sh-b>.note,body[data-skin=klasik] .sh-b>.card,body[data-skin=klasik] .sh-b>.hero2,body[data-skin=klasik] .sh-b>.tabs,body[data-skin=klasik] .sh-b>.kv{margin-top:10px}
body[data-skin=klasik] .card{background:#26282d;border-color:var(--kl);border-radius:6px}
body[data-skin=klasik] .hero2{background:${STAR},var(--kb);background-size:26px 26px;border-radius:6px;border:1px solid #33435c}
body[data-skin=klasik] .hero2 .big{color:#2fd04a}
body[data-skin=klasik] .btn{background:var(--kg);color:#ffe600;border:4px solid #fff;border-radius:999px;font-weight:900;font-size:19px;box-shadow:0 3px 0 #0006}
body[data-skin=klasik] .btn.sec{background:var(--kn);color:#fff;border-color:#9fb4cc}
body[data-skin=klasik] .mini{border-radius:999px}
body[data-skin=klasik] .tab.on{background:var(--kc);color:#08223d;border-color:var(--kc)}
body[data-skin=klasik] .tbar{background:#0d2744;border-radius:4px}
body[data-skin=klasik] .mod .box{background:#13253c;border:2px solid #33435c;border-radius:14px}
body[data-skin=klasik] .mod .box h2{color:#fff;font-family:var(--body);font-weight:900}
.skb{display:flex;gap:8px;margin:6px 0 4px}.skb button{flex:1;padding:10px;border-radius:12px;border:1px solid var(--line);background:var(--panel2);font-weight:700}.skb button.on{border-color:var(--acc);background:var(--tint2)}
</style>`);
function applySkin(){document.body.dataset.skin=SKIN}
function setSkin(k){SKIN=k;try{localStorage.setItem('sahne2-skin',k)}catch(e){}applySkin();if(S&&$('game').classList.contains('on'))render();if($('title').classList.contains('on'))drawTitle();if(SHEET)drawSheet()}
const skinPicker=()=>`<div class="skb"><button class="${SKIN==='modern'?'on':''}" onclick="setSkin('modern')">✨ Modern</button><button class="${SKIN==='klasik'?'on':''}" onclick="setSkin('klasik')">📱 Klasik</button></div>`;
applySkin();
const _sa10=shAyar;shAyar=function(){return _sa10().replace(sec('Görünüm'),sec('Görünüm')+note('Arayüz stili: Modern (şu anki görünüm) ya da Klasik (yıldızlı lacivert, büyük yeşil İLERLE, tam ekran listeler)')+skinPicker())};
const _dt10=drawTitle;drawTitle=function(){_dt10();const w=document.querySelector('#title .cwrap');if(w)w.insertAdjacentHTML('beforeend',`<div class="sec" style="text-align:left">Arayüz stili</div>${skinPicker()}<div style="height:24px"></div>`)};
/* klasik görünümde durum etiketlerine simge */
const SKIC={'Sağlık':'❤️','Mutluluk':'😆','Yetenek':'🎤','Şöhret':'🌟'};
const _rn10=render;render=function(){_rn10();if(SKIN!=='klasik')return;document.querySelectorAll('#stats .st label').forEach(l=>{const t=l.firstChild;if(t&&t.nodeType===3&&SKIC[t.textContent.trim()]){const s=document.createElement('span');s.className='kl';s.textContent=t.textContent.trim()+' '+SKIC[t.textContent.trim()];l.replaceChild(s,t)}})};
