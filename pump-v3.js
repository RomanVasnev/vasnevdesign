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
/* ===== v3.1 motion ===== */
(function(){
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const once=(el,fn,th=.35)=>{if(!el)return;new IntersectionObserver(([e],o)=>{if(e.isIntersecting){o.disconnect();fn(el);}},{threshold:th}).observe(el);};
  once(document.getElementById('vs'),el=>el.classList.add('in'),.35);
  once(document.getElementById('flow'),el=>el.classList.add('in'),.25);
  document.querySelectorAll('.mp').forEach(m=>once(m,el=>el.classList.add('in'),.4));
  /* ladder: levels light up with scroll progress through the section */
  const sec=document.getElementById('ladderS'),bars=[...document.querySelectorAll('#ladder i')],N=document.getElementById('lvlN'),B=document.getElementById('lvlB');
  let last=-1;function lad(){if(!sec)return;const r=sec.getBoundingClientRect(),vh=innerHeight;let p=(vh*.85-r.top)/(r.height*.9+vh*.15);p=Math.max(0,Math.min(1,p));
    const n=RM?12:Math.max(1,Math.round(p*12));if(n===last)return;last=n;bars.forEach((b,i)=>{b.classList.toggle('on',i<n);b.classList.toggle('cur',i===n-1);});
    N.textContent=String(n).padStart(2,'0');B.textContent='буст +'+((n-1)*5)+'%';}
  addEventListener('scroll',lad,{passive:true});lad();
  /* deck: top card flies to the back */
  const deck=document.getElementById('deck'),cards=deck?[...deck.querySelectorAll('img')]:[],lis=[...document.querySelectorAll('#states li')];let top=0,dt=0,dvis=false;
  function lay(){cards.forEach((c,i)=>{const k=(i-top+cards.length)%cards.length;c.style.zIndex=cards.length-k;
    c.style.transform=k===0?'translate3d(0,0,0)':`translate3d(${k*14}px,${k*-10}px,0) scale(${1-k*.04}) rotate(${k*2}deg)`;c.style.opacity=k>3?0:1;});
    lis.forEach((l,i)=>l.classList.toggle('on',i===top));}
  function next(){const c=cards[top];c.style.transform='translate3d(-120%,20px,0) rotate(-12deg)';c.style.opacity=0;
    setTimeout(()=>{top=(top+1)%cards.length;lay();},380);}
  function auto(){clearTimeout(dt);if(!dvis||RM)return;dt=setTimeout(()=>{next();auto();},2600);}
  if(deck){lay();deck.addEventListener('click',()=>{next();auto();});deck.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();next();auto();}});
    lis.forEach((l,i)=>l.addEventListener('click',()=>{top=i;lay();auto();}));
    new IntersectionObserver(([e])=>{dvis=e.isIntersecting;auto();},{threshold:.4}).observe(deck);}
})();
/* ===== v3.2 cabinet: screens scroll like a recording ===== */
(function(){
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vp=document.getElementById('cabVp');if(!vp)return;
  const im=[...vp.querySelectorAll('img')],tb=[...document.querySelectorAll('#cabTabs button')],url=document.getElementById('cabUrl'),cap=document.getElementById('cabCap');
  const CAP=['Доход, стейкинг, пропущенные награды и доступный баланс сразу под шапкой. Ниже — прогресс по 14 контрактам, награда к выводу и история операций.',
    'Цепочка из 14 контрактов: условия и доходность на каждой карточке, следующий контракт уже показывает, сколько он принесёт.',
    'Детальный вид контракта: дерево партнёров, замороженные и доступные токены, правила выплат за каждого приглашённого.',
    'Личная статистика, глобальный пул наград и карточки уровней — неактивная, активная и завершённая с выбором restake или вывода.',
    'Партнёры и лидерборд: топ-3, рейтинг всех участников и подсказка, как подняться выше.'];
  let i=0,t=0,vis=false;
  function go(k){clearTimeout(t);i=k;
    im.forEach((m,n)=>{m.classList.toggle('on',n===k);if(n!==k){m.style.transition='opacity .5s ease';m.style.transform='translate3d(0,0,0)';}});
    tb.forEach((b,n)=>b.classList.toggle('on',n===k));
    const m=im[k];url.textContent=m.dataset.url;cap.textContent=CAP[k];
    const dist=Math.max(0,m.offsetHeight-vp.clientHeight),dur=RM?0:Math.round(1200+dist/vp.clientHeight*2600),total=RM?8000:dur+2600;
    tb[k].style.setProperty('--d',total+'ms');
    m.style.transition='none';m.style.transform='translate3d(0,0,0)';void m.offsetWidth;
    if(!RM){m.style.transition=`opacity .5s ease,transform ${dur}ms cubic-bezier(.45,0,.55,1) 1000ms`;m.style.transform=`translate3d(0,${-dist}px,0)`;}
    if(vis)t=setTimeout(()=>go((i+1)%im.length),total);}
  tb.forEach((b,n)=>b.addEventListener('click',()=>{go(n);b.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'});}));
  new IntersectionObserver(([e])=>{const was=vis;vis=e.isIntersecting;if(vis&&!was)go(i);if(!vis)clearTimeout(t);},{threshold:.35}).observe(vp);
})();
