/* NEMES-X dil motoru — anında geçiş, localStorage, RTL */
window.NX = (function(){
  var LANGS = [
    {code:'en', name:'English'},
    {code:'tr', name:'Türkçe'},
    {code:'de', name:'Deutsch'},
    {code:'fr', name:'Français'},
    {code:'es', name:'Español'},
    {code:'ru', name:'Русский'},
    {code:'ar', name:'العربية'},
    {code:'zh', name:'中文'}
  ];
  var dicts = {};
  var lang = 'en';

  function pick(){
    try {
      var q = new URLSearchParams(window.location.search).get('lang');
      if(q && LANGS.some(function(l){return l.code===q})){
        try{ localStorage.setItem('nx-lang', q); }catch(e){}
        return q;
      }
    }catch(e){}
    var saved = null;
    try{ saved = localStorage.getItem('nx-lang'); }catch(e){}
    if(saved && LANGS.some(function(l){return l.code===saved})) return saved;
    var nav = (navigator.language||'en').slice(0,2).toLowerCase();
    return LANGS.some(function(l){return l.code===nav}) ? nav : 'en';
  }

  function t(page, key){
    var d = dicts[lang];
    if(d && d[page] && d[page][key] !== undefined) return d[page][key];
    if(dicts.en && dicts.en[page] && dicts.en[page][key] !== undefined) return dicts.en[page][key];
    return undefined;
  }

  function apply(){
    document.documentElement.lang = lang;
    var d = dicts[lang] || dicts.en || {};
    document.documentElement.dir = (d.dir==='rtl') ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k = el.getAttribute('data-i18n').split('.');
      var v = k.length===2 ? t(k[0],k[1]) : t('shared',k[0]);
      if(v!==undefined) el.textContent = v;
    });
    ['title','placeholder','aria-label','content'].forEach(function(attr){
      document.querySelectorAll('[data-i18n-'+attr+']').forEach(function(el){
        var k = el.getAttribute('data-i18n-'+attr).split('.');
        var v = k.length===2 ? t(k[0],k[1]) : t('shared',k[0]);
        if(v!==undefined) el.setAttribute(attr, v);
      });
    });
    var m = d.meta || dicts.en.meta;
    var pg = (m && m[window.NX_PAGE]) || (m && m.index);
    if(pg && pg.title) document.title = pg.title;
    if(pg && pg.desc){
      var md = document.querySelector('meta[name="description"]');
      if(md) md.content = pg.desc;
    }
    var lb = document.getElementById('langBtn');
    if(lb){
      var cur = LANGS.find(function(l){return l.code===lang});
      var lbl = lb.querySelector('.lang-label');
      if(lbl) lbl.textContent = cur ? cur.name : 'English';
    }
    var menu = document.getElementById('langMenu');
    if(menu){
      menu.querySelectorAll('button').forEach(function(b){
        b.classList.toggle('on', b.getAttribute('data-lang')===lang);
      });
    }
  }

  function init(){
    lang = pick();
    var menu = document.getElementById('langMenu');
    if(menu){
      menu.innerHTML = '';
      LANGS.forEach(function(l){
        var b = document.createElement('button');
        b.setAttribute('data-lang', l.code);
        b.innerHTML = '<span>'+l.name+'</span><span class="check"></span>';
        b.addEventListener('click', function(){ setLang(l.code); closeMenu(); });
        menu.appendChild(b);
      });
    }
    var btn = document.getElementById('langBtn');
    if(btn) btn.addEventListener('click', function(e){ e.stopPropagation(); var m=document.getElementById('langMenu'); m.classList.toggle('open'); });
    document.addEventListener('click', function(){ closeMenu(); });
    return load(lang);
  }

  function closeMenu(){
    var m=document.getElementById('langMenu');
    if(m) m.classList.remove('open');
  }

  function load(code){
    if(dicts[code]){ lang=code; apply(); return Promise.resolve(); }
    return fetch('/assets/i18n/'+code+'.json')
      .then(function(r){ return r.json(); })
      .then(function(j){ dicts[code]=j; lang=code; apply(); })
      .catch(function(){ if(code!=='en') return load('en'); });
  }

  function setLang(code){
    try{ localStorage.setItem('nx-lang', code); }catch(e){}
    load(code);
  }

  return { init:init, t:t, setLang:setLang, load:load, LANGS:LANGS };
})();
if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', function(){ NX.init(); }); }
else{ NX.init(); }
