// Artist Life · çevrimdışı çalışma
const C='al-v104';
const CORE=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./favicon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin===location.origin){
    // Önce internetten en güncel sürümü dene, yoksa telefondaki kopyayı aç
    // İnternet yavaşsa 4 sn bekle, sonra telefondaki kopyayı aç (indirme arkada sürer, sonraki açılışta yeni sürüm)
    const key=r.mode==='navigate'||u.pathname.endsWith('/')?'./index.html':r;
    const net=fetch(r,{cache:'no-store'}).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(key,cp))}return res});
    const cached=()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./index.html'));
    e.respondWith(new Promise(ok=>{let done=false;const fin=v=>{if(!done&&v){done=true;ok(v)}};
      net.then(fin).catch(()=>cached().then(m=>fin(m||Response.error())));
      setTimeout(()=>cached().then(m=>{if(m)fin(m)}),4000)}));
    e.waitUntil(net.catch(()=>{}));
  }else if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>new Response('',{status:200,headers:{'Content-Type':'text/css'}}))));
  }});
