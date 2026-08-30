/* NEMES-X tema motoru — FOUC'suz */
(function(){
  var s=localStorage.getItem('nx-theme');
  if(!s){
    try{ s = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark'; }
    catch(e){ s='dark'; }
  }
  document.documentElement.dataset.theme=s;
})();
function toggleTheme(){
  var c=document.documentElement.dataset.theme==='light'?'dark':'light';
  document.documentElement.dataset.theme=c;
  try{ localStorage.setItem('nx-theme',c); }catch(e){}
  var b=document.getElementById('themeBtn');
  if(b) b.title = c==='light' ? 'Dark mode' : 'Light mode';
}
