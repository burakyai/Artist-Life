/* ============ Performans: gömülü base64 görselleri açılışta bir kez blob URL'ye çevir ============
   Avatar SVG'leri artık 180 KB yerine ~3 KB; tarayıcı her görseli bir kez çözer ve önbellekte tutar. */
(function(){
 const jobs=[];
 function walk(o,depth){if(!o||typeof o!=='object'||depth>3)return;for(const k of Object.keys(o)){const v=o[k];if(typeof v==='string'&&v.length>200&&v.slice(0,5)==='data:')jobs.push([o,k,v]);else if(v&&typeof v==='object')walk(v,depth+1)}}
 function run(){['HIMG','KHAIR','KBODY','MBODY','MIMG','FEMIMG','MBEARD','MTAT'].forEach(n=>{try{const o=eval('typeof '+n+"!=='undefined'?"+n+':null');if(o)walk(o,0)}catch(e){}});
  /* tarayıcının yerel base64 çözücüsü (fetch) — ana iş parçacığını kilitlemez */
  Promise.all(jobs.map(([o,k,v])=>fetch(v).then(r=>r.blob()).then(bl=>{const u=URL.createObjectURL(bl);o[k]=u;const im=new Image();im.src=u;if(im.decode)im.decode().catch(()=>{})}).catch(()=>{}))).then(()=>{
   if(typeof AVC_CLEAR==='function')AVC_CLEAR();try{if(S&&S.alive)render()}catch(e){}})}
 /* ilk ekran çizildikten sonra başlat */
 if(document.readyState==='complete')setTimeout(run,50);else window.addEventListener('load',()=>setTimeout(run,50));
})();
/* avatar önbelleği: aynı görünüm+yaş+seçenek için SVG'yi tekrar üretme */
{const _AV=AV,AVC=new Map();window.AVC_CLEAR=()=>AVC.clear();AV=function(L,age,opts){let key;try{key=JSON.stringify([L,age,opts||{},S&&S.cr&&S.cr.no])}catch(e){return _AV(L,age,opts)}
 let v=AVC.get(key);if(v)return v;v=_AV(L,age,opts);if(AVC.size>400)AVC.clear();AVC.set(key,v);return v}}
