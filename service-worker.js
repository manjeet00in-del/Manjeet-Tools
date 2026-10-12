// Network-first navigation: never serve an outdated tool page from Cache Storage.
const CACHE_NAME = "manjeet-tools-v23";
const FILES_TO_CACHE = ["./style.css","./app.js","./dashboard-enhancements.js","./launch-polish.js","./pwa-install.js","./feedback.js","./tutorial.js","./govt-portals.js","./tool-brand.js","./brand-logo-light.svg","./manifest.json","./icon.svg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
function replaceLast(html,needle,replacement){const at=html.lastIndexOf(needle);return at<0?html:html.slice(0,at)+replacement+html.slice(at+needle.length)}
function inject(html,prefix,isHome){
  // Append only at the FINAL body close. Tool scripts contain print-document
  // templates with their own </body> text; replacing the first one corrupts JS.
  const additions=[];
  if(isHome&&!html.includes('dashboard-enhancements.js'))additions.push('<script src="'+prefix+'dashboard-enhancements.js"></script>');
  if(isHome&&!html.includes('launch-polish.js'))additions.push('<script src="'+prefix+'launch-polish.js?v=23"></script>');
  if(isHome&&!html.includes('pwa-install.js'))additions.push('<script src="'+prefix+'pwa-install.js?v=23"></script>');
  if(isHome&&!html.includes('govt-portals.js'))additions.push('<script src="'+prefix+'govt-portals.js?v=23"></script>');
  if(!html.includes('feedback.js'))additions.push('<script src="'+prefix+'feedback.js?v=23"></script>');
  if(!isHome&&!html.includes('tutorial.js'))additions.push('<script src="'+prefix+'tutorial.js?v=23"></script>');
  const close=html.toLowerCase().lastIndexOf('</body>');
  if(close!==-1&&additions.length)html=html.slice(0,close)+additions.join('')+html.slice(close);
  if(!isHome&&!html.includes('tool-brand.js')){
    const open=html.toLowerCase().indexOf('<body>');
    if(open!==-1)html=html.slice(0,open+6)+'<script src="'+prefix+'tool-brand.js?v=23" defer></script>'+html.slice(open+6);
  }
  return html;
}
self.addEventListener("fetch", event => {
  const req=event.request, url=new URL(req.url);
  if(req.mode==="navigate"&&url.origin===self.location.origin){
    event.respondWith((async()=>{
      const isHome=url.pathname.endsWith("/")||url.pathname.endsWith("/index.html");
      const prefix=url.pathname.includes("/tools/")?"../":"./";
      try{
        const response=await fetch(req,{cache:"no-store"});
        if(response.ok&&(response.headers.get("content-type")||"").includes("text/html")){
          const html=inject(await response.text(),prefix,isHome);
          return new Response(html,{status:response.status,statusText:response.statusText,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store, max-age=0"}});
        }
        return response;
      }catch(error){
        return new Response("<!doctype html><html><head><meta name='viewport' content='width=device-width,initial-scale=1'></head><body><p>You're offline. Please reconnect and reload this page.</p></body></html>",{status:503,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}});
      }
    })());
    return;
  }
  // Keep static assets available offline, but revalidate them on every request.
  if(req.method==="GET"&&url.origin===self.location.origin){
    event.respondWith((async()=>{
      try{
        const response=await fetch(req,{cache:"no-cache"});
        if(response.ok)return response;
        const cached=await caches.match(req);
        return cached||response;
      }catch(error){
        return await caches.match(req)||Response.error();
      }
    })());
  }
});
