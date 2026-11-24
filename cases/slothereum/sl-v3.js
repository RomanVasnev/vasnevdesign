/* ===== Slothereum v3 motion ===== */
(function(){
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const once=(el,fn,th=.35)=>{if(!el)return;new IntersectionObserver(([e],o)=>{if(e.isIntersecting){o.disconnect();fn(el);}},{threshold:th}).observe(el);};
  const watch=(el,fn,th=.4)=>{if(!el)return;new IntersectionObserver(([e])=>fn(e.isIntersecting),{threshold:th}).observe(el);};
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
  $$('.rv3').forEach(el=>io.observe(el));
  ['cexs','garry'].forEach(id=>once(document.getElementById(id),el=>el.classList.add('in'),.5));

  $$('[data-count]').forEach(el=>{const to=+el.dataset.count;
    once(el,()=>{if(RM)return;const t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1100);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f);})(t0);},.6);});

  const hc=$('#slHero');
  if(hc&&!RM)addEventListener('scroll',()=>{const y=Math.min(scrollY,700);hc.style.translate=`0 ${(y*-.06).toFixed(1)}px`;},{passive:true});

  function cycler(n,apply,ms,root,ctrls){let i=0,t=0,vis=false;
    function go(k,user){clearTimeout(t);i=k;apply(k);if(vis&&!RM)t=setTimeout(()=>go((i+1)%n),user?ms*2:ms);}
    (ctrls||[]).forEach((b,k)=>b.addEventListener('click',()=>go(k,true)));
    watch(root,v=>{const was=vis;vis=v;if(v&&!was)go(i);if(!v)clearTimeout(t);},.3);apply(0);}

  /* modules */
  const mt=$$('#mTabs button'),mi=$$('#mStage img'),cap=$('#mCap');
  const CAP=['SLOPAD — генератор и лаунчпад мем-токенов без программирования. Лента сверху показывает свежие запуски и покупки в реальном времени.',
    'Страница токена: график с периодами, прогресс сбора ликвидности, цена, капитализация и объём. Покупка — в один клик с быстрыми суммами.',
    'Терминал: покупка, продажа и отслеживание токенов в любой сети. Fast buy и Fast sell принимают адрес контракта — без поиска по спискам.',
    'Торговый хаб: баланс, позиции, отправка, получение, обмен и смена кошелька — с главного экрана в один клик.',
    'Garry Bot: торговля по ответу на твит, а чат с ботом — прямо в ОС.'];
  if(mt.length)cycler(mt.length,k=>{mt.forEach((b,n)=>{b.classList.toggle('on',n===k);b.style.setProperty('--d','5200ms');});mi.forEach((m,n)=>m.classList.toggle('on',n===k));cap.textContent=CAP[k];
    const b=mt[k];b.classList.remove('on');void b.offsetWidth;b.classList.add('on');},5200,$('#mStage'),mt);

  /* confirmation */
  const cs=$('#cseg');
  if(cs){const bt=$$('#cseg button'),im=$$('#confVp img'),li=$$('#confL li'),k=cs.querySelector('.seg-k');
    cycler(2,i=>{bt.forEach((b,n)=>b.classList.toggle('on',n===i));im.forEach((m,n)=>m.classList.toggle('on',n===i));li.forEach((l,n)=>l.classList.toggle('on',n===i));k.style.setProperty('--i',i);},3800,$('#confVp'),bt);}
})();
