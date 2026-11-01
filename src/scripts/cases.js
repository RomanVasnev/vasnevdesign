
/* Кейсы: folders, password dialog and the case page — by vasnev.art */
(() => {
  const IMG = {"c-anty": "img/9e2759c82c.webp", "c-bitflare": "img/c071782184.webp", "c-l3": "img/eb5c86240f.webp", "c-pump": "img/88129f5a33.webp", "c-robinhood": "img/c855a517b3.webp", "c-sloth": "img/f80a17839a.webp", "landing": "img/69405605b0.webp", "m1": "img/6c23acdf6b.webp", "m2": "img/2d425aa177.webp", "m3": "img/1ea37ac3d7.webp", "m4": "img/f3e2c0c233.webp", "mascot": "img/3456c2bc8f.webp", "p02": "img/c84880440e.webp", "p05": "img/779cffa468.webp", "p06": "img/413e28142f.webp", "p07": "img/bb53062352.webp", "p08": "img/0b33d5bdcd.webp", "p10": "img/f175165033.webp", "p14": "img/68701b7900.webp", "ui0": "img/3038c45447.webp"};
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HASH = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 1v10M8.5 1v10M1 3.5h10M1 8.5h10"/></svg>';
  const LOCK = '<svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="5.5" width="8" height="5.5" rx="1.5"/><path d="M4 5.5V4a2 2 0 0 1 4 0v1.5"/></svg>';
  const ARROW = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3"/></svg>';
  const OUT = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5"/></svg>';

  /* SHA-256 of the case password. Empty until Роман sets one: every attempt is refused. */
  const PASS_HASH = '70444ebbe5f73aaa2ee8fc10af48f8f4d6cf7b652dfc3c83fd9108bacc16577d';
  let unlocked = false; try { unlocked = sessionStorage.getItem('va-cases') === '1'; } catch (e) {}

  /* ---------- the folders (data kept apart from the markup) ---------- */
  const CASES = [
    { id: 'bitflare', name: 'Bitflare', sub: 'Криптоплатформа и бренд к запуску IPO', c: '', img: 'c-bitflare', pos: '50% 62%' },
    { id: 'robinhood', name: 'Robinhood Learn', sub: 'Онбординг в инвестиции · NDA', c: '', img: 'c-robinhood' },
    { id: 'pump-dao', name: 'Pump DAO', sub: 'DeFi-платформа для мем-токена', c: '', img: 'c-pump', open: true },
    { id: 'slothereum', name: 'Slothereum', sub: 'Трейдинг-терминал между блокчейнами', c: '', img: 'c-sloth' },
    { id: 'anty-wallet', name: 'Anty Wallet', sub: 'Крипто-кошелёк внутри Telegram', c: '', img: 'c-anty' },
    { id: 'l3-testnet', name: 'L3 Testnet', sub: 'Тестнет блокчейна третьего уровня · NDA', c: '', img: 'c-l3' }
  ];
  const fds = $('#fds');
  fds.innerHTML = CASES.map((k, i) => `
    <li class="fd lock" data-id="${k.id}">
      <button type="button" class="fd-b" aria-label="${k.name}. ${k.sub}">
        <span class="fd-tab" aria-hidden="true"></span><span class="fd-body" aria-hidden="true"></span>
        <span class="fd-sh s1" aria-hidden="true"></span><span class="fd-sh s2" aria-hidden="true"></span>
        <span class="fd-cv" aria-hidden="true"><img src="${IMG[k.img]}" alt="" loading="lazy" decoding="async"${k.pos ? ` style="object-position:${k.pos}"` : ''}></span>
        <span class="fd-fr" aria-hidden="true">
          <span class="fd-t"><b>${k.name}</b><i>${k.sub}</i></span>
          <span class="fd-f"><span class="fd-n">${String(i + 1).padStart(2, '0')} / ${String(CASES.length).padStart(2, '0')}</span><span class="fd-st">${LOCK}По паролю</span></span>
        </span>
      </button>
    </li>`).join('');
  function paint() {
    $$('.fd', fds).forEach(li => {
      const k = CASES.find(c => c.id === li.dataset.id), st = $('.fd-st', li);
      li.classList.toggle('lock', !unlocked); li.classList.toggle('soon', unlocked && !k.open);
      st.innerHTML = !unlocked ? LOCK + 'По паролю' : k.open ? 'Открыть' + ARROW : 'Скоро';
      $('.fd-b', li).setAttribute('aria-label', `${k.name}. ${k.sub}. ${!unlocked ? 'Кейс по паролю' : k.open ? 'Открыть кейс' : 'Кейс оформляется'}`);
    });
  }
  paint();
  $$('.fd', fds).forEach(li => $('.fd-b', li).addEventListener('click', () => {
    const k = CASES.find(c => c.id === li.dataset.id);
    if (unlocked && k.open) openCase(k.id); else askPass(k, li);
  }));
  /* folders slide in when the page is shown */
  /* the folders are carried onto the page by cursors and dropped into the grid, like the cards on the canvas */
  const host = $('.cp-in');
  const spring = (k, c) => { const v = [], dt = 1 / 60; let x = 0, u = 0, t = 0; while (t < 3) { const f = -k * (x - 1) - c * u; u += f * dt; x += u * dt; v.push(x); t += dt; if (t > .3 && Math.abs(x - 1) < .001 && Math.abs(u) < .01) break; } const n = 48, pts = []; for (let i = 0; i <= n; i++) pts.push(i === n ? 1 : +v[Math.round(i / n * (v.length - 1))].toFixed(4)); return { easing: 'linear(' + pts.join(',') + ')', duration: Math.round(t * 1000) }; };
  const DRAG = spring(170, 20), JELLY = spring(300, 12), EIO = 'cubic-bezier(.65,0,.35,1)';
  const WHO = [['Роман', '#6CA7FF', '#fff'], ['PM', '#FF8AD8', '#0B0B0C'], ['Дизайн-система', '#8E5CFF', '#fff']];
  let runs = 0;
  function cursor(label, c, tc) {
    const el = document.createElement('div'); el.className = 'ec'; el.setAttribute('aria-hidden', 'true');
    el.style.setProperty('--c', c); el.style.setProperty('--t', tc);
    el.innerHTML = '<svg viewBox="0 0 16 22"><path d="M1.2 1.2v16.6l4.5-4.3 3.1 6.9 3-1.3-3-6.8 6.3-.3Z"/></svg><span>' + label + '</span>';
    H.appendChild(el); return el;
  }
  const at = (px, py) => `translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`;
  function carry(li, i, t) {
    const hb = H.getBoundingClientRect(), W = hb.width, r = li.getBoundingClientRect(), x = r.left - hb.left, y = r.top - hb.top;
    const cols = getComputedStyle(G).gridTemplateColumns.split(' ').length, col = i % cols;
    const side = cols === 1 ? (i % 2 ? 1 : -1) : col === 0 ? -1 : col === cols - 1 ? 1 : (i % 2 ? 1 : -1);
    const dx = side * (W * .35 + 80), dy = 140 + (i % 2) * 60, rot = side * (6 + (i % 3) * 2);
    const gx = Math.min(r.width * .5, 160), gy = 36;
    const [nm, c, tc] = WHO[i % WHO.length], cur = cursor(nm, c, tc), svg = cur.firstChild;
    li.style.opacity = '';
    li.animate([{ opacity: 0 }, { opacity: 0 }], { duration: t, fill: 'backwards' });
    li.animate([{ transform: `translate(${dx}px,${dy}px) rotate(${rot}deg) scale(1.04)` }, { transform: 'scale(1.04)' }], { ...DRAG, delay: t, fill: 'backwards' });
    const tD = t + DRAG.duration * .6;
    li.animate([{ transform: 'scale(1.04)' }, { transform: 'none' }], { ...JELLY, delay: tD, composite: 'replace' });
    cur.animate([{ transform: at(x + gx + dx, y + gy + dy), opacity: 1 }, { transform: at(x + gx, y + gy), opacity: 1 }], { ...DRAG, delay: t, fill: 'both' });
    svg.animate([{ transform: 'scale(1)' }, { transform: 'scale(.8)', offset: .3 }, { transform: 'scale(1)' }], { duration: 260, delay: tD - 60, easing: 'ease-out' });
    cur.animate([{ transform: at(x + gx, y + gy), opacity: 1 }, { transform: at(x + gx + 28, y + gy + 34), opacity: 0 }], { duration: 460, delay: tD + 140, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards', composite: 'replace' });
    setTimeout(() => cur.remove(), tD + 700);
  }
  let dio = null;
  let H = host, G = fds, S = '.fd';
  function dropIn(h, g, sel) {
    ++runs; H = h || host; G = g || fds; S = sel || '.fd';
    if (dio) dio.disconnect();
    $$('.ec', H).forEach(e => e.remove());
    const lis = $$(S, G);
    lis.forEach(li => { li.getAnimations().forEach(a => a.cancel()); li.style.opacity = ''; });
    if (reduce || !('IntersectionObserver' in window)) return;
    lis.forEach(li => { li.style.opacity = '0'; });
    let batch = [], tm = 0;
    dio = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { batch.push(e.target); dio.unobserve(e.target); } });
      clearTimeout(tm);
      tm = setTimeout(() => { batch.sort((a, b) => lis.indexOf(a) - lis.indexOf(b)).forEach((li, k) => carry(li, lis.indexOf(li), 80 + k * 170)); batch = []; }, 16);
    }, { threshold: .2 });
    lis.forEach(li => dio.observe(li));
  }
  window.__dropIn = dropIn;
  const html = document.documentElement;
  const go = () => { if (html.classList.contains('pg-cases') && !html.classList.contains('is-loading')) requestAnimationFrame(() => dropIn()); };
  addEventListener('vasnev:page', e => { if (e.detail === 'cases') go(); });
  addEventListener('vasnev:ready', go);

  /* ---------- password dialog ---------- */
  const pw = $('#pw'), pwF = $('#pwF'), pwI = $('#pwI'), pwE = $('#pwE');
  let pwFor = null, pwFrom = null;
  function trap(box, e) {
    if (e.key !== 'Tab') return;
    const f = $$('button, a[href], input', box).filter(n => n.offsetParent);
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { f[f.length - 1].focus(); e.preventDefault(); }
    else if (!e.shiftKey && i === f.length - 1) { f[0].focus(); e.preventDefault(); }
  }
  function askPass(k, li) {
    pwFor = { k, li }; if (pw.hidden) pwFrom = document.activeElement;
    $('#pwH').textContent = k.name;
    pw.classList.toggle('done', unlocked);
    $('#pwP').textContent = unlocked ? 'Этот кейс ещё оформляется — скоро добавлю. Пока можно открыть Pump DAO.' : 'Кейсы под паролем: часть проектов под NDA. Пароль пришлю после короткого знакомства.';
    pwI.value = ''; pwE.textContent = ''; pwF.classList.remove('bad');
    pw.hidden = false; requestAnimationFrame(() => { pw.classList.add('open'); (unlocked ? $('#pwGo') : pwI).focus(); });
  }
  function closePass() {
    pw.classList.remove('open');
    setTimeout(() => { pw.hidden = true; }, reduce ? 0 : 220);
    if (pwFrom) pwFrom.focus({ preventScroll: true });
  }
  async function sha(s) {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  pwF.addEventListener('submit', async e => {
    e.preventDefault();
    const v = pwI.value.trim();
    if (!v) { pwI.focus(); return; }
    let ok = false;
    try { ok = !!PASS_HASH && (await sha(v)) === PASS_HASH; } catch (err) { ok = false; }
    if (ok) {
      unlocked = true; try { sessionStorage.setItem('va-cases', '1'); } catch (err) {}
      paint(); pwE.textContent = '';
      if (pwFor.k.open) { closePass(); openCase(pwFor.k.id); }
      else askPass(pwFor.k, pwFor.li);
      return;
    }
    pwE.textContent = 'Неверный пароль. Попросите актуальный в Telegram.';
    pwF.classList.remove('bad'); void pwF.offsetWidth; pwF.classList.add('bad');
    pwI.select();
  });
  $('#pwX').addEventListener('click', closePass);
  $('#pwOk').addEventListener('click', closePass);
  $('#pwGo').addEventListener('click', () => { closePass(); openCase('pump-dao'); });
  pw.addEventListener('pointerdown', e => { if (e.target === pw) closePass(); });
  pw.addEventListener('keydown', e => { if (e.key === 'Escape') closePass(); else trap(pw, e); });

  /* ---------- the Pump DAO case (content from Роман's case in Figma) ---------- */
  const PUMP = {
    name: 'Pump DAO', link: 'https://pepememe.io', linkT: 'pepememe.io',
    title: 'Механика удержания, которая сохранила ~$2 млн капитализации после пресейла',
    tags: ['DeFi', 'Solana', 'Web3', 'B2C', 'Мобильная версия'],
    pc: '#1E7A2E', pd: '#0F3D17', pt: '#E8F4E9'
  };
  const SNAP = [
    ['Результаты', `<ul class="big"><li><b>~$2 млн</b><span>капитализации сохранено после пресейла</span></li><li><b>65%</b><span>предложения токена ушло в стейкинг</span></li><li><b>80+%</b><span>держателей выбрали restake вместо вывода</span></li></ul>`],
    ['Цель', `<p>Дать держателю причину не продавать токен после пресейла. Жёсткая блокировка не подходила: она отпугивает людей ещё до покупки.</p><p class="qt">Держатель не продаст, если каждый следующий шаг в продукте выгоднее, чем продажа прямо сейчас.</p>`],
    ['Проблема', `<ol class="steps"><li>Участники покупают дёшево на пресейле</li><li>Продают при первой возможности</li><li>Массовые продажи роняют курс</li><li>Комьюнити перестаёт верить проекту</li></ol>`],
    ['Итог', `<ul class="big"><li><b>116</b><span>экранов для desktop и mobile</span></li><li><b>12</b><span>уровней в матрице удержания</span></li><li><b>1 мес.</b><span>от идеи механики до продакшена</span></li></ul>`]
  ];
  const PROC = [
    { t: 'Архитектура', img: 'p02', cap: 'Путь держателя и петля удержания', h: 'Путь держателя',
      b: `<p>Лендинг, подключение кошелька за 3 шага, первый контракт и кабинет из 7 разделов: деньги, контракты, стейкинг и комьюнити.</p>
          <p>Внутри кабинета замкнута петля: контракт замораживает токены, завершённый цикл открывает слот стейкинга и буст, после 7 дней держатель выбирает restake с бустом или вывод — и переходит на следующий уровень.</p>` },
    { t: 'Матрица', img: 'p07', cap: '12 уровней стейкинга с бустами', h: 'Матрица удержания',
      b: `<p>Главное решение кейса. Каждый уровень стейкинга открывается только после завершённого цикла контракта. Чем дольше держатель в продукте, тем выше его доходность.</p>
          <ul class="stats"><li><b>20%</b><span>базовый APY уровня</span></li><li><b>+5%</b><span>буст за каждый цикл</span></li><li><b>7 дней</b><span>период стейкинга</span></li><li><b>37%</b><span>предложения в пуле наград</span></li></ul>
          <p class="sm">Бусты складываются, у каждого свой таймер на карточке. После завершения держатель выбирает: restake с бустом или вывод.</p>` },
    { t: 'Состояния', img: 'p08', cap: 'Шесть состояний карточки уровня', h: 'Одна карточка, шесть состояний',
      b: `<p>Первая активация, нужен контракт, как активировать, активен, активен с бустом, завершён. На любом этапе держатель видит, что происходит с уровнем и что сделать дальше.</p>` },
    { t: 'Первый контракт', img: 'p05', cap: 'Три ветки старта ведут к одному экрану успеха', h: 'Первый контракт без тупиков',
      b: `<p>Новый участник приходит с разным балансом. Поэтому старт разделён на три ветки, и все они заканчиваются одним экраном успеха.</p>
          <ol class="steps"><li>Токенов хватает. Контракт создаётся в один клик, заморозка, комиссия и награда видны до подтверждения</li><li>Токенов нет, но есть баланс. Swap прямо в модалке, без ухода в другой сервис</li><li>Нет ни токенов, ни денег. Показываем точную сумму, адрес кошелька и выбор валюты оплаты</li></ol>` },
    { t: 'Контракты', img: 'p06', cap: 'Цепочка из 14 контрактов', h: 'Деньги и контракты прозрачно',
      b: `<ol class="steps"><li>14 контрактов идут цепочкой. Закрытые карточки размыты, но показывают будущий доход</li><li>В карточке все условия: партнёры 2/3, задания 1/8, очки, текущий цикл и ROI</li></ol>` },
    { t: 'Панель', img: 'p10', cap: 'Деньги держателя в пяти состояниях', h: 'Панель и лента операций',
      b: `<ol class="steps"><li>Панель раскладывает деньги на пять значений: общий доход, стейкинг, недополученные награды, доступно и заморожено. Каждое в токене и в USDT</li><li>Лента из 7 типов операций читается по цвету и иконке, подписи можно не читать</li></ol>` },
    { t: 'Мобильная', img: 'p14', cap: 'Кабинет на мобильном', h: 'Мобильная версия',
      b: `<p>56 мобильных экранов: лендинг, вход, контракты, стейкинг и все разделы кабинета. Карточки и лента работают так же, как на десктопе, а модалки превращаются в нижние листы.</p>` },
    { t: 'UI Kit', img: 'ui0', cap: 'Компоненты и состояния для разработки', h: 'Как ускорили передачу в разработку',
      b: `<p>Фронтенд шёл в нескольких днях за мной, поэтому файл собран под скорость передачи.</p>
          <ol class="steps"><li>Каждый модуль подписан статусом: готово к вёрстке или в работе</li><li>Компоненты лежат рядом с экранами своего модуля</li><li>Все состояния карточек разложены на канвасе с пояснениями</li><li>Анимации открытия контракта разложены по шагам</li></ol>
          <ul class="stats" style="grid-template-columns:repeat(2,minmax(0,1fr))"><li><b>43</b><span>подписанных флоу</span></li><li><b>163</b><span>состояния в компонентах</span></li></ul>` }
  ];
  const L = t => `<p class="lb">${HASH}${t}</p>`;
  function pumpHTML() {
    const p = PUMP;
    return `
    <div class="cs-bar"><div class="cs-bar-in">
      <button type="button" class="cs-bk" data-close><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M10 6H2M5 3 2 6l3 3"/></svg>Все кейсы</button>
      <span class="cs-bt">Кейсы / ${p.name}</span>
      <a class="cs-lk" href="${p.link}" target="_blank" rel="noopener">${p.linkT}${OUT}</a>
    </div></div>
    <div class="cs-in" style="--pc:${p.pc};--pd:${p.pd};--pt:${p.pt}">
      <header class="cs-hd">
        <span class="cs-ey">${HASH}${p.name} · DeFi-платформа для мем-токена $PEPEMEME</span>
        <h1 class="cs-h1" id="csH" tabindex="-1">${p.title}</h1>
        <ul class="cs-tags">${p.tags.map(t => `<li>${t}</li>`).join('')}</ul>
      </header>
      <div class="bn">
        <section class="cd c5">${L('Обзор')}
          <p>Pump DAO — личный кабинет для держателей мем-токена $PEPEMEME на Solana. Держатель замораживает токены в контракте, проходит 12 уровней стейкинга и получает награды за то, что остаётся в проекте.</p>
          <p>Я спроектировал продукт целиком за месяц: механику удержания, лендинг, кабинет, мобильную версию и все иллюстрации.</p>
          <dl class="meta">
            <div><dt>Срок</dt><dd>1 месяц</dd></div>
            <div><dt>Роль</dt><dd>Продуктовый дизайнер</dd></div>
            <div><dt>Команда</dt><dd>PM, фаундер, 2 frontend, 3 backend, DevOps</dd></div>
            <div><dt>Объём</dt><dd>116 экранов, 43 флоу, 163 состояния</dd></div>
            <div><dt>Продукт</dt><dd><a href="${p.link}" target="_blank" rel="noopener">${p.linkT}</a></dd></div>
          </dl>
        </section>
        <section class="cd c4">${L('Снимок проекта')}
          <div class="seg" role="tablist" aria-label="Снимок проекта">${SNAP.map(([t], i) => `<button type="button" role="tab" id="sn-t${i}" aria-controls="sn-p${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${t}</button>`).join('')}</div>
          ${SNAP.map(([t, h], i) => `<div class="pane" role="tabpanel" id="sn-p${i}" aria-labelledby="sn-t${i}"${i ? ' hidden' : ''}>${h}</div>`).join('')}
        </section>
        <section class="cd c3 vis" aria-label="Маскот Pump DAO">${L('Маскот · рисовал сам')}<img src="${IMG.mascot}" alt="Маскот Pump DAO, нарисованный Романом"></section>

        <section class="cd c7">${L('Контекст')}
          <h3>Живое комьюнити и ни одного продукта после покупки</h3>
          <p>У $PEPEMEME уже было комьюнити и лендинг pepememe.io с таймерами и картой «To the moon». Не было продукта, где держатель мог бы что-то делать с токеном после покупки. Команда готовила пресейл и боялась сценария, который случается с большинством мем-токенов.</p>
          <ol class="steps"><li>Участники покупают дёшево на пресейле</li><li>Продают при первой возможности</li><li>Массовые продажи роняют курс</li><li>Комьюнити перестаёт верить проекту</li></ol>
          <p class="qt">Нужно было дать держателю причину не продавать. Жёсткая блокировка токенов не подходила: она отпугивает людей ещё до покупки.</p>
        </section>
        <section class="cd c5">${L('Кто пользуется')}
          <ul class="roles"><li><b>01</b><span><strong>Держатель.</strong> Купил на пресейле и решает, продать или остаться</span></li><li><b>02</b><span><strong>Новый участник.</strong> Пришёл по реферальной ссылке, у него может не быть ни токенов, ни денег на балансе</span></li><li><b>03</b><span><strong>Активный участник.</strong> Проходит уровни, выполняет задания и следит за лидербордом</span></li></ul>
          <p class="qt">У каждого из трёх свой стартовый баланс. Если сделать один общий вход, двое из трёх застрянут на первом шаге.</p>
        </section>

        <section class="cd c7">${L('Исследование · рынок после пресейла')}
          <h3>Продажа после пресейла — норма рынка</h3>
          <p>Чтобы понять масштаб риска, я посмотрел, чем обычно заканчиваются пресейлы мем-токенов. Картина везде одна: участники покупают ради быстрой продажи, и токен теряет цену в первые дни.</p>
          <ul class="stats" style="grid-template-columns:repeat(2,minmax(0,1fr))"><li><b>59,6%</b><span>участников пресейла PUMP продали или вывели токены за первую неделю</span><span class="bar" style="--w:59.6%"><i></i></span></li><li><b>−99%</b><span>упал курс крупнейших пресейлов Solana в первые часы и дни</span><span class="bar" style="--w:99%"><i></i></span></li><li><b>&lt;1%</b><span>токенов pump.fun доходят до открытого рынка</span><span class="bar" style="--w:1%"><i></i></span></li><li><b>1,7%</b><span>токенов 2024 года ещё торговались в последние 30 дней года</span><span class="bar" style="--w:1.7%"><i></i></span></li></ul>
          <p class="sm">Данные: BitMEX через ForkLog (июль 2025), ZachXBT через Cointelegraph (апрель 2024), Matrixport через Cointelegraph (март 2025), Chainalysis (январь 2025).</p>
        </section>
        <section class="cd c5">${L('Аудит старого лендинга')}
          <p>Сайт хорошо передавал энергию бренда, но не отвечал на вопрос, что делать после покупки. Вся страница вела к кнопке Buy, а дальше ничего не было.</p>
          <figure class="stage" style="margin:auto 0 0"><img src="${IMG.landing}" alt="Старый и новый лендинг Pump DAO" loading="lazy"><figcaption>Старый и новый лендинг</figcaption></figure>
        </section>

        <section class="cd c5 dark">${L('Ключевая гипотеза')}
          <p class="hyp">Держатель не продаст, если каждый следующий шаг в продукте выгоднее, чем продажа прямо сейчас.</p>
          <p>Отсюда два правила. Вывод доступен всегда, никого не блокируем. Но реинвест должен давать заметно больше, и это должно быть видно в цифрах прямо на карточке.</p>
          <p class="sm" style="color:rgba(255,255,255,.5);margin-top:auto">Продажа — не поведение отдельных людей, а норма рынка. Бороться нужно не с людьми, а с отсутствием причины остаться.</p>
        </section>
        <section class="cd c7">${L('Основной сценарий')}
          <p>Путь держателя: лендинг, подключение кошелька, первый контракт и кабинет из 7 разделов. Внутри кабинета замкнута петля удержания:</p>
          <ul class="loop"><li>Контракт</li><li>Цикл завершён</li><li>Слот стейкинга + буст</li><li>Стейкинг 7 дней</li><li>Restake или вывод</li></ul>
          <p class="sm" style="margin-top:auto">Схема пути и петли — во вкладке «Архитектура» ниже.</p>
        </section>

        <section class="cd c7">${L('Что вошло в первую версию')}
          <ol class="steps"><li>Лендинг с калькулятором дохода</li><li>Вход через Phantom и инвайт-код</li><li>Первый контракт с тремя ветками старта</li><li>14 контрактов цепочкой</li><li>12 уровней стейкинга</li><li>Панель, статистика, партнёры и лидерборд</li><li>Мобильная версия и 8 языков интерфейса</li></ol>
        </section>
        <section class="cd c5">${L('Ограничения')}
          <p>Месяц на весь продукт и фронтенд, который шёл сразу следом за дизайном. Каждый экран должен был уходить в вёрстку с первого раза.</p>
          <p>Плюс Web3-специфика: вход через кошелёк, оплата в SOL, USDT, USDC или PEPEMEME и swap внутри продукта. И мем-стилистика, которую нужно было сохранить, не потеряв доверие к финансовому продукту.</p>
        </section>
      </div>

      <header class="cs-hd" style="padding-bottom:16px"><span class="cs-ey">${HASH}Процесс</span><h2 class="cs-h1" style="font-size:clamp(28px,3.2vw,44px)">Решения по экранам</h2></header>
      <div class="proc">
        <section class="cd">
          <div class="seg" role="tablist" aria-label="Решения по экранам">${PROC.map((s, i) => `<button type="button" role="tab" id="pr-t${i}" aria-controls="pr-p${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${s.t}</button>`).join('')}</div>
          ${PROC.map((s, i) => `<figure class="stage pane" role="tabpanel" id="pr-p${i}" aria-labelledby="pr-t${i}"${i ? ' hidden' : ''} style="margin:0"><img src="${IMG[s.img]}" alt="${s.cap}" loading="lazy"><figcaption>${s.cap}</figcaption></figure>`).join('')}
        </section>
        <section class="cd notes" aria-live="polite">${L('Заметки')}
          ${PROC.map((s, i) => `<div class="pane" data-note="${i}"${i ? ' hidden' : ''} class="nt"><h3>${s.h}</h3>${s.b}</div>`).join('')}
        </section>
      </div>

      <div class="bn" style="margin-top:16px">
        <section class="cd c7">${L('Экономика матрицы')}
          <p>Чтобы реинвест был выгоднее вывода, разница должна быть видна в цифрах. Я посчитал, сколько держатель получает за один 7-дневный цикл на уровне с пулом 100 000 PEPEMEME, если каждый раз выбирает restake.</p>
          <table class="tbl"><thead><tr><th>Цикл</th><th>APY</th><th class="r">Доход за 7 дней</th><th class="r">К первому циклу</th></tr></thead>
            <tbody><tr><td>01</td><td>20%</td><td class="r">≈ 384</td><td class="r">×1,0</td></tr><tr><td>02</td><td>25%</td><td class="r">≈ 479</td><td class="r">×1,25</td></tr><tr><td>03</td><td>30%</td><td class="r">≈ 575</td><td class="r">×1,5</td></tr><tr><td>04</td><td>35%</td><td class="r">≈ 671</td><td class="r">×1,75</td></tr></tbody></table>
          <p class="sm">Расчёт: пул × APY × 7 / 365. Буст +5% за каждый завершённый цикл.</p>
          <p class="qt">К четвёртому циклу доход за ту же неделю почти вдвое выше, чем на старте. Если держатель выводит, он теряет накопленный буст и начинает с 20% заново. Это и есть причина остаться.</p>
        </section>
        <section class="cd c5">${L('Метрики продукта')}
          <p>Под каждую часть механики я заложил метрику. Главная — какая доля предложения токена работает внутри продукта, а не лежит на бирже.</p>
          <table class="tbl"><thead><tr><th>Метрика</th><th>Что показывает</th></tr></thead>
            <tbody><tr><td style="font-family:inherit;color:#0B0B0C">Доля токенов в стейкинге</td><td>Сколько предложения не давит на рынок</td></tr><tr><td style="font-family:inherit;color:#0B0B0C">Restake после завершения</td><td>Как часто выбирают реинвест вместо вывода</td></tr><tr><td style="font-family:inherit;color:#0B0B0C">Средний уровень держателя</td><td>Насколько глубоко проходят матрицу</td></tr><tr><td style="font-family:inherit;color:#0B0B0C">Завершённые циклы</td><td>Сколько контрактов доходят до конца</td></tr><tr><td style="font-family:inherit;color:#0B0B0C">Реферал → первый контракт</td><td>Сколько приглашённых доходят до старта</td></tr><tr><td style="font-family:inherit;color:#0B0B0C;font-weight:400">Время до первого контракта</td><td style="font-weight:400">Насколько быстро новичок проходит вход</td></tr></tbody></table>
        </section>

        <section class="cd">${L('Иллюстрации и мемы')}
          <h3>Мем объясняет механику без текста</h3>
          <p>Все иллюстрации нарисовал я. Каждая отсылает к мему, который комьюнити узнаёт без объяснений, поэтому механику не приходится расшифровывать. Ещё 21 баннер ушёл в соцсети на запуск.</p>
          <ul class="memes">
            <li><figure><img src="${IMG.m1}" alt="Иллюстрация #you choice" loading="lazy"><figcaption><b>#you choice</b>Выбор таблетки: restake или вывод</figcaption></figure></li>
            <li><figure><img src="${IMG.m2}" alt="Иллюстрация #stonks" loading="lazy"><figcaption><b>#stonks</b>Рост дохода на следующем уровне</figcaption></figure></li>
            <li><figure><img src="${IMG.m3}" alt="Иллюстрация #staking" loading="lazy"><figcaption><b>#staking</b>Держатель прикидывает выгоду от стейкинга</figcaption></figure></li>
            <li><figure><img src="${IMG.m4}" alt="Иллюстрация #congrats" loading="lazy"><figcaption><b>#congrats</b>Завершённый цикл контракта</figcaption></figure></li>
          </ul>
        </section>

        <section class="cd">${L('Результаты после запуска')}
          <p>Через месяц после пресейла я сравнил поведение держателей с тем, что обычно происходит на рынке.</p>
          <ul class="stats s3"><li><b>5 000+</b><span>держателей после пресейла</span></li><li><b>65%</b><span>предложения токена ушло в стейкинг</span></li><li><b>80+%</b><span>держателей выбрали restake вместо вывода</span></li><li><b>8 000</b><span>контрактов создано за первый месяц</span></li><li><b>15%</b><span>новых участников пришли по реферальным ссылкам</span></li><li><b>10%</b><span>курс через месяц к цене пресейла</span></li></ul>
          <p class="qt">Пока рынок продаёт 50–90% токенов за первую неделю, у Pump DAO 65% предложения работало внутри продукта.</p>
        </section>

        <section class="cd c4 half">${L('Опыт')}
          <p>Этот проект научил меня начинать с бизнес-риска, а не с экранов. Удержание перестало быть блокировкой и стало причиной остаться — это сделала механика в сочетании с мемным визуалом.</p>
        </section>
        <section class="cd c4 half">${L('Итоги')}
          <ol class="steps"><li>Продукт работает на pepememe.io</li><li>После пресейла курс не обвалился, сохранено около $2 млн капитализации</li><li>116 экранов, 43 флоу и 163 состояния переданы в разработку за месяц</li></ol>
        </section>
        <section class="cd c4 dark">${L('Вывод')}
          <p class="hyp">Когда каждый следующий шаг выгоднее предыдущего, держателю незачем продавать.</p>
        </section>
      </div>

      <nav class="cs-nx" aria-label="Другие кейсы">
        <button type="button" data-close><span>Назад</span><b><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M12 7H2M6 3 2 7l4 4"/></svg>Все кейсы</b></button>
        <button type="button" data-next="slothereum"><span>Следующий кейс · по паролю</span><b>Slothereum<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4"/></svg></b></button>
      </nav>
    </div>`;
  }

  /* ---------- case page: open, tabs, close ---------- */
  const cs = $('#cs');
  let csFrom = null;
  function tabs(list, onSel) {
    const bs = $$('[role="tab"]', list);
    const sel = i => { bs.forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; const p = document.getElementById(b.getAttribute('aria-controls')); if (p) p.hidden = k !== i; }); onSel && onSel(i); };
    bs.forEach((b, i) => {
      b.addEventListener('click', () => sel(i));
      b.addEventListener('keydown', e => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return;
        const n = (i + d + bs.length) % bs.length; sel(n); bs[n].focus(); bs[n].scrollIntoView({ block: 'nearest', inline: 'nearest' }); e.preventDefault();
      });
    });
  }
  function openCase(id, fromHash) {
    if (id !== 'pump-dao') return;
    if (!unlocked) { const k = CASES.find(c => c.id === id); askPass(k, $(`.fd[data-id="${id}"]`)); return; }
    csFrom = document.activeElement;
    cs.innerHTML = pumpHTML();
    tabs($('.seg', cs));
    const notes = $$('[data-note]', cs);
    tabs($$('.seg', cs)[1], i => notes.forEach((n, k) => { n.hidden = k !== i; }));
    $$('[data-close]', cs).forEach(b => b.addEventListener('click', closeCase));
    $$('[data-next]', cs).forEach(b => b.addEventListener('click', () => {
      const k = CASES.find(c => c.id === b.dataset.next), li = $(`.fd[data-id="${k.id}"]`);
      closeCase(); setTimeout(() => askPass(k, li), reduce ? 0 : 300);
    }));
    cs.hidden = false; cs.scrollTop = 0;
    document.documentElement.classList.add('cs-on');
    requestAnimationFrame(() => { cs.classList.add('open'); $('#csH', cs).focus({ preventScroll: true }); });
    if (!fromHash && location.hash !== '#case/' + id) history.pushState({ cs: id }, '', '#case/' + id);
  }
  function closeCase(e, fromHash) {
    if (cs.hidden) return;
    cs.classList.remove('open');
    document.documentElement.classList.remove('cs-on');
    setTimeout(() => { cs.hidden = true; cs.innerHTML = ''; }, reduce ? 0 : 600);
    if (!fromHash && location.hash.startsWith('#case/')) history.pushState({}, '', location.pathname + location.search + '#cases');
    if (csFrom && csFrom.isConnected) csFrom.focus({ preventScroll: true });
  }
  cs.addEventListener('keydown', e => { if (e.key === 'Escape') closeCase(); else trap(cs, e); });
  const route = () => { const m = location.hash.match(/^#case\/([\w-]+)/); if (m) openCase(m[1], true); else closeCase(null, true); };
  addEventListener('popstate', route);
  if (/^#case\//.test(location.hash)) addEventListener('vasnev:ready', route, { once: true });
})();
