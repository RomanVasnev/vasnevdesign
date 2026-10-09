/* ===== Pump DAO v3 motion ===== */
(function(){
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const once=(el,fn,th=.35)=>{if(!el)return;new IntersectionObserver(([e],o)=>{if(e.isIntersecting){o.disconnect();fn(el);}},{threshold:th}).observe(el);};
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
  document.querySelectorAll('.rv3').forEach(el=>io.observe(el));

  /* hero: mobile screens play like a screen recording */
  const reel=[...document.querySelectorAll('#reel img')],bars=[...document.querySelectorAll('#reelbar i')],D=2600;
  let ri=0,rt=0,vis=true;
  function show(i){reel.forEach((im,k)=>im.classList.toggle('on',k===i));bars.forEach((b,k)=>{b.classList.remove('run');b.classList.toggle('done',k<i);});
    const b=bars[i];if(b){void b.offsetWidth;b.style.setProperty('--d',D+'ms');b.classList.add('run');}}
  function tick(){clearTimeout(rt);if(!vis||RM)return;rt=setTimeout(()=>{ri=(ri+1)%reel.length;show(ri);tick();},D);}
  if(reel.length){show(0);tick();new IntersectionObserver(([e])=>{vis=e.isIntersecting;if(vis)tick();else clearTimeout(rt);}).observe(document.querySelector('.hero3-vis'));}

  once(document.getElementById('crash'),el=>el.classList.add('in'),.5);
  once(document.getElementById('bars'),el=>el.classList.add('in'),.4);
  once(document.getElementById('fan'),el=>el.classList.add('in'),.45);

  /* sticky story */
  const steps=[...document.querySelectorAll('.step3')],pin=[...document.querySelectorAll('#storyScr img')];
  const so=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const k=e.target.dataset.scr;
    steps.forEach(s=>s.classList.toggle('act',s===e.target));pin.forEach(im=>im.classList.toggle('on',im.dataset.k===k));}),{rootMargin:'-45% 0px -45% 0px'});
  steps.forEach(s=>so.observe(s));

  /* play the landing video only while visible */
  document.querySelectorAll('.vid video').forEach(v=>new IntersectionObserver(([e])=>{if(e.isIntersecting&&!RM)v.play().catch(()=>{});else v.pause();},{threshold:.4}).observe(v));

  /* count-up */
  document.querySelectorAll('[data-count]').forEach(el=>{const to=+el.dataset.count,suf=el.dataset.suf||'';
    once(el,()=>{if(RM)return;const t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1300),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=v+suf;if(p<1)requestAnimationFrame(f);})(t0);},.6);});

  /* hero parallax */
  const br=document.querySelector('.pd-br');
  if(br&&!RM)addEventListener('scroll',()=>{const y=Math.min(scrollY,700);br.style.transform=`translate3d(0,${(y*-.08).toFixed(1)}px,0) rotate(${(-2+y*.004).toFixed(2)}deg)`;},{passive:true});
})();
