/* ===== Anty v3 motion ===== */
(function(){
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* reveal */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
  document.querySelectorAll('.rv3').forEach(el=>io.observe(el));

  /* hero reel: auto-playing onboarding, like a screen recording */
  const reel=[...document.querySelectorAll('#reel img')],bars=[...document.querySelectorAll('#reelbar i')],D=[2600,2000,2400,2200,2200,3000];
  let ri=0,rt=0,heroVis=true;
  function show(i){reel.forEach((im,k)=>im.classList.toggle('on',k===i));
    bars.forEach((b,k)=>{b.classList.remove('run');b.classList.toggle('done',k<i);});
    const b=bars[i];if(b){void b.offsetWidth;b.style.setProperty('--d',D[i]+'ms');b.classList.add('run');}}
  function tick(){clearTimeout(rt);if(!heroVis||RM)return;rt=setTimeout(()=>{ri=(ri+1)%reel.length;show(ri);tick();},D[ri]);}
  if(reel.length){show(0);tick();
    new IntersectionObserver(([e])=>{heroVis=e.isIntersecting;if(heroVis)tick();else clearTimeout(rt);}).observe(document.querySelector('.hero3-vis'));}

  /* seed words: appear, then everything blurs except one lost word */
  const w=document.getElementById('words3');
  if(w){[...w.children].forEach((s,i)=>s.style.transitionDelay=(i*.06)+'s');
    new IntersectionObserver(([e],o)=>{if(!e.isIntersecting)return;o.disconnect();w.classList.add('in');
      if(!RM)setTimeout(()=>{[...w.children].forEach(s=>s.style.transitionDelay='0s');w.classList.add('lost');},2200);},{threshold:.5}).observe(w);}

  /* sticky story: switch the pinned screen with the step in view */
  const steps=[...document.querySelectorAll('.step3')],pin=[...document.querySelectorAll('#storyScr img')];
  const so=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const k=e.target.dataset.scr;
    steps.forEach(s=>s.classList.toggle('act',s===e.target));pin.forEach(im=>im.classList.toggle('on',im.dataset.k===k));}),{rootMargin:'-45% 0px -45% 0px'});
  steps.forEach(s=>so.observe(s));

  /* fan of wallets */
  const fan=document.getElementById('fan');
  if(fan)new IntersectionObserver(([e],o)=>{if(e.isIntersecting){fan.classList.add('in');o.disconnect();}},{threshold:.45}).observe(fan);

  /* theme compare: drag + a gentle intro sweep */
  const cmp=document.getElementById('cmp'),r=document.getElementById('cmpR');
  if(cmp&&r){const set=v=>cmp.style.setProperty('--x',v+'%');set(50);
    r.addEventListener('input',()=>set(r.value));
    let swept=false;new IntersectionObserver(([e])=>{if(!e.isIntersecting||swept||RM)return;swept=true;
      const t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1800),v=50+28*Math.sin(p*Math.PI*2)*(1-p);set(v.toFixed(1));r.value=v;if(p<1)requestAnimationFrame(f);})(t0);},{threshold:.6}).observe(cmp);}

  /* count-up numbers */
  document.querySelectorAll('[data-count]').forEach(el=>{const to=+el.dataset.count;
    new IntersectionObserver(([e],o)=>{if(!e.isIntersecting)return;o.disconnect();if(RM)return;const t0=performance.now();
      (function f(t){const p=Math.min(1,(t-t0)/1400),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=v.toLocaleString('ru-RU');if(p<1)requestAnimationFrame(f);})(t0);},{threshold:.6}).observe(el);});

  /* hero parallax for the back phone */
  const back=document.querySelector('.ph-back');
  if(back&&!RM)addEventListener('scroll',()=>{const y=Math.min(scrollY,700);back.style.transform=`translate3d(0,${(y*-.12).toFixed(1)}px,0) rotate(${(9+y*.008).toFixed(2)}deg)`;},{passive:true});
})();
