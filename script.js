(() => {
  'use strict';
  const products = [
    {image:'./assets/cap-cyrillic.webp',title:'BLUE / РАКЕТА',model:'MODEL 01 / HEAD OFFICE',copy:'Cream script. Deep-blue crown. Money where it belongs: in the back.',alt:'Deep-blue snapback with Cyrillic Ракета on the front and Money on the back'},
    {image:'./assets/cap-latin.webp',title:'BLUE / RAKETA',model:'MODEL 02 / INTERNATIONAL DIVISION',copy:'Latin lettering for international negotiations. Same block. Same blue.',alt:'Deep-blue snapback with Latin Raketa script on the front and Money on the back'},
    {image:'./assets/cap-red.webp',title:'RED & WHITE / РАКЕТА',model:'MODEL 03 / INDUSTRIAL DIVISION',copy:'Soviet-style lettering up front. Old-money manners in the back.',alt:'Red snapback with white brim, angular Cyrillic РАКЕТА front lettering and Money on the back'},
    {image:'./assets/tracksuit.webp',title:'THE DEEP-BLUE TRACKSUIT',model:'MODEL 04 / SPORT DEPARTMENT',copy:'Cream lettering. Gold-tone hardware. You got rich. You kept the tracksuit.',alt:'Deep-blue tracksuit jacket, matching pants and cap, with cream Raketa Money lettering and gold-tone hardware'}
  ];
  const $ = id => document.getElementById(id);
  const root = document.documentElement;
  let index = 0, timer = null, playing = false, stopped = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.dataset.theme = 'dark';
  root.dataset.motion = stopped ? 'off' : 'on';
  const motionLabel = () => {$('motion').textContent = stopped ? 'START MOTION' : 'STOP MOTION';$('motion').setAttribute('aria-pressed',String(stopped));};
  motionLabel();
  function render() {
    const p = products[index];
    $('hero-image').src = p.image;
    $('hero-image').alt = p.alt;
    $('enlarge').setAttribute('aria-label','Enlarge '+p.title);
    $('counter').textContent = `${String(index+1).padStart(2,'0')} / 04`;
    $('product-title').textContent = p.title;
    $('model').textContent = p.model;
    $('product-copy').textContent = p.copy;
    document.querySelectorAll('[data-slide]').forEach(b => {if(Number(b.dataset.slide) === index)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});
    if($('lightbox').open){$('lightbox-image').src=p.image;$('lightbox-image').alt=p.alt;$('lightbox-title').textContent=p.title;}
  }
  function schedule(){clearInterval(timer);timer=null;if(playing&&!document.hidden)timer=setInterval(()=>go(index+1,false),6000);}
  function go(n,reset=true){index=(n+products.length)%products.length;render();if(reset)schedule();}
  function setPlaying(v){playing=v;$('play').textContent=v?'PAUSE SLIDESHOW':'PLAY SLIDESHOW';$('play').setAttribute('aria-pressed',String(v));schedule();}
  $('prev').addEventListener('click',()=>go(index-1));
  $('next').addEventListener('click',()=>go(index+1));
  $('play').addEventListener('click',()=>setPlaying(!playing));
  document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.slide))));
  document.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>{setPlaying(false);go(Number(b.dataset.pick));$('collection').scrollIntoView({behavior:stopped?'auto':'smooth',block:'start'});}));
  $('collection').addEventListener('keydown',e=>{if(e.target.tagName==='BUTTON')return;if(e.key==='ArrowRight'){e.preventDefault();go(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(index-1);}});
  let startX=0,startY=0;
  $('enlarge').addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY;},{passive:true});
  let swiped=false;
  $('enlarge').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){swiped=true;go(index+(dx<0?1:-1));setTimeout(()=>{swiped=false;},400);}},{passive:true});
  $('enlarge').addEventListener('click',()=>{if(swiped)return;setPlaying(false);$('lightbox-image').src=products[index].image;$('lightbox-image').alt=products[index].alt;$('lightbox-title').textContent=products[index].title;$('lightbox').showModal();});
  $('close').addEventListener('click',()=>$('lightbox').close());
  $('lightbox').addEventListener('click',e=>{if(e.target===$('lightbox'))$('lightbox').close();});
  $('theme').addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';$('theme').setAttribute('aria-label','Switch to '+(root.dataset.theme==='dark'?'day':'night')+' mode');});
  $('motion').addEventListener('click',()=>{stopped=!stopped;root.dataset.motion=stopped?'off':'on';if(stopped)setPlaying(false);motionLabel();});
  document.addEventListener('visibilitychange',schedule);
  $('year').textContent=String(new Date().getFullYear());
  document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.alt='Image temporarily unavailable. Please reload to try again.';}));
  render();
})();
