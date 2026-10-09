/* ===== FinHamster v3 motion ===== */
(function(){
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const once=(el,fn,th=.35)=>{if(!el)return;new IntersectionObserver(([e],o)=>{if(e.isIntersecting){o.disconnect();fn(el);}},{threshold:th}).observe(el);};
  const watch=(el,fn,th=.4)=>{if(!el)return;new IntersectionObserver(([e])=>fn(e.isIntersecting),{threshold:th}).observe(el);};

  /* reveal */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
  $$('.rv3').forEach(el=>io.observe(el));

  /* hero: phone screens play like a screen recording */
  const reel=$$('#reel img'),bars=$$('#reelbar i'),D=2600;let ri=0,rt=0,rvis=true;
  function show(i){reel.forEach((im,k)=>im.classList.toggle('on',k===i));bars.forEach((b,k)=>{b.classList.remove('run');b.classList.toggle('done',k<i);});
    const b=bars[i];if(b){void b.offsetWidth;b.style.setProperty('--d',D+'ms');b.classList.add('run');}}
  function tick(){clearTimeout(rt);if(!rvis||RM)return;rt=setTimeout(()=>{ri=(ri+1)%reel.length;show(ri);tick();},D);}
  if(reel.length){show(0);tick();watch($('.hero3-vis'),v=>{rvis=v;v?tick():clearTimeout(rt);},0);}
  const br=$('.fh-br');
  if(br&&!RM)addEventListener('scroll',()=>{const y=Math.min(scrollY,700);br.style.transform=`translate3d(0,${(y*-.08).toFixed(1)}px,0) rotate(${(-2+y*.004).toFixed(2)}deg)`;},{passive:true});

  /* count-up */
  $$('[data-count]').forEach(el=>{const to=+el.dataset.count,suf=el.dataset.suf||'';
    once(el,()=>{if(RM)return;const t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1300),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=v+suf;if(p<1)requestAnimationFrame(f);})(t0);},.6);});

  ['funnel','ret','webVis'].forEach(id=>once(document.getElementById(id),el=>el.classList.add('in'),.35));
  once($('#fan'),el=>el.classList.add('in'),.45);

  /* sticky story */
  const steps=$$('.step3'),pin=$$('#storyScr img');
  const so=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const k=e.target.dataset.scr;
    steps.forEach(s=>s.classList.toggle('act',s===e.target));pin.forEach(im=>im.classList.toggle('on',im.dataset.k===k));}),{rootMargin:'-45% 0px -45% 0px'});
  steps.forEach(s=>so.observe(s));

  /* generic auto-cycling switcher */
  function cycler(items,screens,apply,ms,root){let i=0,t=0,vis=false;
    function go(k,user){clearTimeout(t);i=k;screens.forEach((s,n)=>s.classList.toggle('on',n===k));apply(k);
      if(vis&&!RM)t=setTimeout(()=>go((i+1)%screens.length),user?ms*2:ms);}
    items.forEach((b,n)=>b.addEventListener('click',()=>go(n,true)));
    watch(root,v=>{const was=vis;vis=v;if(v&&!was)go(i);if(!v)clearTimeout(t);},.35);
    apply(0);}

  /* analytics: segmented control mirrors the app */
  const seg=$('#seg');
  if(seg){const bt=$$('#seg button');cycler(bt,$$('#anScr img'),k=>{bt.forEach((b,n)=>{b.classList.toggle('on',n===k);b.setAttribute('aria-selected',n===k);});seg.style.setProperty('--i',k);seg.querySelector('.seg-k').style.setProperty('--i',k);},3200,$('.an-vis'));}

  /* recommendations: level grows */
  const lv=$$('#lv li');
  if(lv.length)cycler(lv.map(l=>l.querySelector('button')),$$('#recScr img'),k=>lv.forEach((l,n)=>l.classList.toggle('on',n===k)),3400,$('.rec-vis'));

  /* landing: slow scroll like a recording */
  const vp=$('#lndVp'),li=vp&&vp.querySelector('img');
  if(vp&&li&&!RM){let raf=0,on=false,t0=0;const DUR=26000;
    function step(t){if(!on)return;if(!t0)t0=t;const p=((t-t0)%(DUR+2400))/DUR,dist=li.offsetHeight-vp.clientHeight;
      const q=Math.min(1,p),e=q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2;li.style.transform=`translate3d(0,${(-dist*e).toFixed(1)}px,0)`;raf=requestAnimationFrame(step);}
    watch(vp,v=>{on=v;cancelAnimationFrame(raf);if(v){t0=0;raf=requestAnimationFrame(step);}},.25);}

  /* deck carousel */
  const tr=$('#deckTrack');
  if(tr){const sl=[...tr.children],n=$('#deckN');let dt=0,dvis=false;
    const cur=()=>Math.round(tr.scrollLeft/(sl[0].offsetWidth+12));
    const to=k=>tr.scrollTo({left:k*(sl[0].offsetWidth+12),behavior:RM?'auto':'smooth'});
    tr.addEventListener('scroll',()=>{n.textContent=(cur()+1)+' / '+sl.length;},{passive:true});
    const auto=()=>{clearTimeout(dt);if(!dvis||RM)return;dt=setTimeout(()=>{to((cur()+1)%sl.length);auto();},3800);};
    $('#deckPrev').addEventListener('click',()=>{to(Math.max(0,cur()-1));auto();});
    $('#deckNext').addEventListener('click',()=>{to((cur()+1)%sl.length);auto();});
    tr.addEventListener('pointerdown',()=>clearTimeout(dt));
    tr.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();to(Math.min(sl.length-1,cur()+1));}if(e.key==='ArrowLeft'){e.preventDefault();to(Math.max(0,cur()-1));}});
    watch(tr,v=>{dvis=v;auto();},.5);}
})();
