(function(){
if(location.pathname.indexOf('/tools/')===-1)return;
var HOME='../index.html';
var LOGO='../brand-logo-light.svg?v=20260925b';
var css='.mdh-global-brand{position:relative;z-index:9998;background:#fff;border-bottom:1px solid #e5e7eb;box-shadow:0 3px 14px rgba(15,23,42,.06)}'+
'.mdh-global-brand__inner{max-width:1200px;margin:0 auto;min-height:96px;padding:8px 18px;display:flex;align-items:center;justify-content:space-between;gap:16px}'+
'.mdh-global-brand__home{display:block;width:520px;max-width:72%;height:80px;overflow:hidden}'+
'.mdh-global-brand__logo{display:block;width:100%;height:100%;border:0;object-fit:contain;object-position:left center}'+
'.mdh-global-brand__back{display:inline-block;text-decoration:none;background:#eef4ff;color:#1d4ed8;border:1px solid #cfe0ff;padding:10px 14px;border-radius:12px;font:bold 12px Arial,sans-serif;white-space:nowrap}'+
'@media(max-width:600px){.mdh-global-brand__inner{min-height:74px;padding:6px 10px}.mdh-global-brand__home{width:340px;max-width:74%;height:62px}.mdh-global-brand__back{padding:9px 8px;font-size:10px}}'+
'@media print{.mdh-global-brand{display:none!important}}';
var style=document.createElement('style');style.type='text/css';
if(style.styleSheet){style.styleSheet.cssText=css}else{style.appendChild(document.createTextNode(css))}
document.getElementsByTagName('head')[0].appendChild(style);
var old=document.querySelector('header,.header,.topbar,.top-bar,.site-header');
if(old){old.style.display='none';}
var bar=document.createElement('div');bar.className='mdh-global-brand';
bar.innerHTML='<div class="mdh-global-brand__inner"><a class="mdh-global-brand__home" href="'+HOME+'" aria-label="Manjeet Digital Hub home"><img class="mdh-global-brand__logo" src="'+LOGO+'" alt="Manjeet Digital Hub"></a><a class="mdh-global-brand__back" href="'+HOME+'">&larr; All Tools</a></div>';
document.body.insertBefore(bar,document.body.firstChild);
})();