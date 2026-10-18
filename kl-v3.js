/* ===== Клубок v3 motion ===== */
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
  const br=$('.kl-br');
  if(br&&!RM)addEventListener('scroll',()=>{const y=Math.min(scrollY,700);br.style.transform=`translate3d(0,${(y*-.08).toFixed(1)}px,0) rotate(${(-2+y*.004).toFixed(2)}deg)`;},{passive:true});

  /* count-up */
  $$('[data-count]').forEach(el=>{const to=+el.dataset.count,suf=el.dataset.suf||'';
    once(el,()=>{if(RM)return;const t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1300),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=v+suf;if(p<1)requestAnimationFrame(f);})(t0);},.6);});

  once($('#fan'),el=>el.classList.add('in'),.45);
  once($('#cardsRow'),el=>el.classList.add('in'),.25);

  /* sticky story */
  const steps=$$('.step3'),pin=$$('#storyScr img');
  const so=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const k=e.target.dataset.scr;
    steps.forEach(s=>s.classList.toggle('act',s===e.target));pin.forEach(im=>im.classList.toggle('on',im.dataset.k===k));}),{rootMargin:'-45% 0px -45% 0px'});
  steps.forEach(s=>so.observe(s));

  /* search: segmented control mirrors the product */
  (function(){const seg=$('#kseg');if(!seg)return;const bt=$$('#kseg button'),im=$$('#srchVp img'),cap=$('#srchCap'),k=seg.querySelector('.seg-k');
    const CAP=['Календарь на два месяца с выбором периода и гибкими датами: ±1, 2, 3 или 7 дней.',
      'Популярные направления сразу под полем ввода, автоподсказки — по мере набора.',
      'Взрослые, дети с возрастом младшего и питомцы: от состава группы зависят цена и подходящие туры.'];
    let i=0,t=0,vis=false;
    function go(n,user){clearTimeout(t);i=n;im.forEach((m,j)=>m.classList.toggle('on',j===n));bt.forEach((b,j)=>{b.classList.toggle('on',j===n);b.setAttribute('aria-selected',j===n);});
      k.style.setProperty('--i',n);cap.textContent=CAP[n];if(vis&&!RM)t=setTimeout(()=>go((i+1)%im.length),user?6400:3400);}
    bt.forEach((b,n)=>b.addEventListener('click',()=>go(n,true)));cap.textContent=CAP[0];
    watch($('.srch-vis'),v=>{const was=vis;vis=v;if(v&&!was)go(i);if(!v)clearTimeout(t);},.35);})();

  /* long screens scroll like a recording (tour page, wizard) */
  function scroller(vpId,tabsId,urlId,capId,CAP){const vp=document.getElementById(vpId);if(!vp)return;
    const im=[...vp.querySelectorAll('img')],tb=[...document.querySelectorAll('#'+tabsId+' button')],url=document.getElementById(urlId),cap=document.getElementById(capId);
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
    watch(vp,v=>{const was=vis;vis=v;if(v&&!was)go(i);if(!v)clearTimeout(t);},.35);}

  scroller('tourVp','tourTabs','tourUrl','tourCap',[
    'Рейтинг, сложность, размер группы и возраст детей — в шапке, даты и остаток мест — в виджете справа. Ниже нитка тура на карте, программа по дням, что входит в цену, что взять с собой, гиды и отзывы.',
    'Анкета на каждого участника, а справа — цена за день, даты, остаток мест и условия брони: куда уходят деньги и когда их можно вернуть.']);
  scroller('wizVp','wizTabs','wizUrl','wizCap',[
    'Каждый этап начинается с экрана, который объясняет, что будет дальше и зачем.',
    'Нитка тура: точки на карте Яндекса или свой файл, порядок меняется перетаскиванием.',
    'Тип путешествия: 4 группы и 24 варианта, можно выбрать несколько.',
    'Даты: выбирается день начала, период выставляется автоматически по длительности тура.',
    'Условия отмены и схема оплаты: 100% или 30% предоплаты — их потом видит путешественник у кнопки брони.']);
})();
