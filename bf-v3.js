/* ===== Bitflare v3 motion ===== */
(function(){
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const once=(el,fn,th=.35)=>{if(!el)return;new IntersectionObserver(([e],o)=>{if(e.isIntersecting){o.disconnect();fn(el);}},{threshold:th}).observe(el);};
  const watch=(el,fn,th=.4)=>{if(!el)return;new IntersectionObserver(([e])=>fn(e.isIntersecting),{threshold:th}).observe(el);};

  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
  $$('.rv3').forEach(el=>io.observe(el));

  /* hero reel */
  const reel=$$('#reel img'),bars=$$('#reelbar i'),D=2600;let ri=0,rt=0,rvis=true;
  function show(i){reel.forEach((im,k)=>im.classList.toggle('on',k===i));bars.forEach((b,k)=>{b.classList.remove('run');b.classList.toggle('done',k<i);});
    const b=bars[i];if(b){void b.offsetWidth;b.style.setProperty('--d',D+'ms');b.classList.add('run');}}
  function tick(){clearTimeout(rt);if(!rvis||RM)return;rt=setTimeout(()=>{ri=(ri+1)%reel.length;show(ri);tick();},D);}
  if(reel.length){show(0);tick();watch($('.hero3-vis'),v=>{rvis=v;v?tick():clearTimeout(rt);},0);}
  const br=$('.bf-br');
  if(br&&!RM)addEventListener('scroll',()=>{const y=Math.min(scrollY,700);br.style.transform=`translate3d(0,${(y*-.08).toFixed(1)}px,0) rotate(${(-2+y*.004).toFixed(2)}deg)`;},{passive:true});

  /* count-up */
  $$('[data-count]').forEach(el=>{const to=+el.dataset.count,suf=el.dataset.suf||'';
    once(el,()=>{if(RM)return;const t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1300),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=v+suf;if(p<1)requestAnimationFrame(f);})(t0);},.6);});

  ['badges','walVis'].forEach(id=>once(document.getElementById(id),el=>el.classList.add('in'),.4));
  once($('#fan'),el=>el.classList.add('in'),.45);

  /* cabinet: screens scroll like a recording */
  (function(){const vp=$('#cabVp');if(!vp)return;
    const im=[...vp.querySelectorAll('img')],tb=$$('#cabTabs button'),url=$('#cabUrl'),cap=$('#cabCap');
    const CAP=['Лаунчер: статистика платформы, текущий раунд и предстоящие проекты, путь фаундера в три шага, FAQ и заявка для партнёров.',
      'Страница проекта: отметки проверки рядом с тикером, цифры раунда в одну строку, таймер цены и закреплённый виджет покупки.',
      'Аллокация: три уровня участия по три тира, у каждого бонус, цена и итог в токенах. Калькулятор сразу пересчитывает сумму.',
      'Кошелёк: общий баланс, доступные и замороженные средства в USD и BTC, депозит, вывод и история в один клик.',
      'VIP Club: те же компоненты в золотой теме — привилегии по уровням, путь вступления, таблица комиссий и распределение выручки.'];
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
    cap.textContent=CAP[0];
    tb.forEach((b,n)=>b.addEventListener('click',()=>{go(n);b.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'});}));
    watch(vp,v=>{const was=vis;vis=v;if(v&&!was)go(i);if(!v)clearTimeout(t);},.35);})();

  /* generic auto-cycler */
  function cycler(n,apply,ms,root,ctrls){let i=0,t=0,vis=false;
    function go(k,user){clearTimeout(t);i=k;apply(k);if(vis&&!RM)t=setTimeout(()=>go((i+1)%n),user?ms*2:ms);}
    (ctrls||[]).forEach((b,k)=>b.addEventListener('click',()=>go(k,true)));
    watch(root,v=>{const was=vis;vis=v;if(v&&!was)go(i);if(!v)clearTimeout(t);},.3);apply(0);}

  /* tiers */
  const tseg=$('#tseg');
  if(tseg){const bt=$$('#tseg button'),sets=$$('#trow .tset'),k=tseg.querySelector('.seg-k');
    cycler(3,i=>{bt.forEach((b,n)=>{b.classList.toggle('on',n===i);b.setAttribute('aria-selected',n===i);});sets.forEach((s,n)=>s.classList.toggle('on',n===i));k.style.setProperty('--i',i);},3600,$('#trow'),bt);}

  /* buy flow: one confirmation point */
  const stage=$('#buyStage');
  if(stage){const li=$$('#path li'),mi=$$('#mdl img'),cs=$$('#buyStage circle');
    const NODE=[0,1,2,3,4,5,6];
    cycler(li.length,i=>{li.forEach((l,n)=>{l.classList.toggle('on',n===i);l.classList.toggle('done',n<i);});mi.forEach((m,n)=>m.classList.toggle('on',n===i));
      cs.forEach((c,n)=>{c.classList.toggle('cur',n===NODE[i]);c.classList.toggle('done',n<NODE[i]);});
      stage.classList.toggle('b1',i>=1);stage.classList.toggle('b2',i>=3);},2800,stage,li.map(l=>l.querySelector('button')));}

  /* IDO form progress */
  const ido=$('#ido');
  if(ido){const im=$$('.ido-vp img'),n=$('#idoN'),s=$('#idoS');
    cycler(7,i=>{im.forEach((m,k)=>m.classList.toggle('on',k===i%2));n.textContent='Шаг '+(i+1)+' / 7';s.style.width=((i+1)/7*100).toFixed(1)+'%';},1500,ido);}

  /* VIP: slow scroll like a recording */
  const vp=$('#vipVp'),vi=vp&&vp.querySelector('img');
  if(vp&&vi&&!RM){let raf=0,on=false,t0=0;const DUR=24000;
    function step(t){if(!on)return;if(!t0)t0=t;const p=Math.min(1,((t-t0)%(DUR+2400))/DUR),dist=vi.offsetHeight-vp.clientHeight;
      const e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;vi.style.transform=`translate3d(0,${(-dist*e).toFixed(1)}px,0)`;raf=requestAnimationFrame(step);}
    watch(vp,v=>{on=v;cancelAnimationFrame(raf);if(v){t0=0;raf=requestAnimationFrame(step);}},.25);}
})();
