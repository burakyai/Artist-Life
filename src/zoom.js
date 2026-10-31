/* ============ Avatara dokununca büyüt ============ */
function avZoom(el){const svg=el.querySelector('svg');if(!svg)return;let z=$('avz');if(!z){document.body.insertAdjacentHTML('beforeend','<div id="avz" class="avz" onclick="avZoomClose()"><div class="avzb"><div class="avzc"></div><div class="avzn"></div></div></div>');z=$('avz')}
 const self=el.id==='hav';z.querySelector('.avzc').innerHTML=svg.outerHTML;z.querySelector('.avzn').innerHTML=self&&S?`<b>${esc(S.first+' '+S.last)}</b><span>${S.age} yaş · ${title()}</span>`:'';
 z.classList.add('on');requestAnimationFrame(()=>z.classList.add('in'))}
function avZoomClose(){const z=$('avz');if(!z)return;z.classList.remove('in');setTimeout(()=>z.classList.remove('on'),220)}
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('#hav, .wprev .av, .av.hero');if(a){e.stopPropagation();avZoom(a)}},true);
