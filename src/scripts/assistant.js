
/* AI-ассистент v2: video tile, chat, floating Roman — by vasnev.art */
(() => {
  const D = window.VA_DATA, va = document.getElementById('va'), home = document.getElementById('ai');
  if (!va || !home) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const q = s => va.querySelector('[data-va="' + s + '"]');
  const views = {}; va.querySelectorAll('[data-view]').forEach(v => views[v.dataset.view] = v);
  const tile = va.querySelector('.va-tile'), log = q('log'), input = va.querySelector('#aiI'), send = va.querySelector('.va-send'), stateEl = q('state');
  let mode = 'intro', busy = false;
  const hist = []; /* the conversation the model sees */
  const store = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (_) { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} } };

  q('greet').textContent = D.greet;
  function chips(el, list) {
    el.textContent = '';
    list.forEach(f => { const b = document.createElement('button'); b.type = 'button'; b.className = 'va-chip'; b.textContent = f.q; b.addEventListener('click', () => ask(f.q)); el.appendChild(b); });
  }
  chips(q('chips'), D.faq.slice(0, 3));

  /* the video tile takes whatever height the greeting, chips and composer leave; the chest logo is shown whole or not at all */
  /* Roman is always shown whole, down to the chest: the tile keeps the video's 4:5,
     and the assistant grows to fit the tile, the greeting, the chips and the field */
  function fit() {
    if (mode === 'chat' || !va.clientWidth) return;
    const intro = views.intro, form = q('form');
    const kids = [...intro.children].reduce((s, el) => s + el.offsetHeight, 0) + 12 * (intro.children.length - 1);
    const rest = 16 + kids + 14 + form.offsetHeight + 8;
    let h = Math.round(va.clientWidth * 1.25);
    if (matchMedia('(max-width:900px)').matches) {
      /* the screen height is read once per width, so the keyboard or the collapsing toolbar never resize Roman */
      if (fit.w !== va.clientWidth) { fit.w = va.clientWidth; fit.vh = innerHeight; }
      /* only the sheet has to fit the screen; on the page the block just grows, so Roman stays whole down to the chest */
      if (va.closest('.va-float')) h = Math.max(Math.round(va.clientWidth * .72), Math.min(h, Math.round(fit.vh - 24 - 32 - 6 - rest)));
    }
    tile.style.height = h + 'px';
    va.style.setProperty('--va-vy', '0%');
    const need = h + rest;
    if (Math.abs((parseFloat(va.style.getPropertyValue('--va-need')) || 0) - need) > 1) va.style.setProperty('--va-need', need + 'px');
  }
  new ResizeObserver(fit).observe(va); fit();

  function show(v) {
    mode = v;
    Object.entries(views).forEach(([k, el]) => el.setAttribute('aria-hidden', k !== v));
    /* once a question is asked the video steps aside for the chat; contacts show Roman again */
    va.classList.toggle('chatting', v === 'chat');
    va.querySelectorAll('.va-tab').forEach(t => t.setAttribute('aria-selected', (t.dataset.va === 'contacts') === (v === 'contacts')));
    q('form').hidden = v === 'contacts';
    if (v !== 'chat') requestAnimationFrame(fit);
  }
  va.querySelectorAll('.va-tab').forEach(t => t.addEventListener('click', () => {
    if (t.dataset.va !== 'contacts' && log.children.length && inline()) return openPanel();
    show(t.dataset.va === 'contacts' ? 'contacts' : (log.children.length ? 'chat' : 'intro'));
  }));
  q('copy').addEventListener('click', e => {
    const b = e.currentTarget, t = q('mail').textContent, sel = () => getSelection().selectAllChildren(q('mail'));
    try { navigator.clipboard.writeText(t).then(() => { b.textContent = 'Скопировано'; setTimeout(() => b.textContent = 'Скопировать', 1600); }, sel); } catch (_) { sel(); }
  });

  input.addEventListener('input', () => send.disabled = !input.value.trim() || busy);
  q('form').addEventListener('submit', e => { e.preventDefault(); const v = input.value; input.value = ''; send.disabled = true; ask(v); });

  const time = () => new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  /* Roman's photo stands next to every answer and next to the assistant label */
  function orb() {
    const a = new Image(); a.className = 'va-ava'; a.src = 'assistant/ava.jpg'; a.alt = ''; a.decoding = 'async';
    a.width = a.height = 28; a.setAttribute('aria-hidden', 'true'); return a;
  }
  va.querySelector('.va-eb').prepend(orb());

  function msg(who, text) {
    const m = document.createElement('div'); m.className = 'va-m va-' + who;
    m.innerHTML = '<div class="va-col"><p></p><time>' + time() + '</time></div>';
    if (who === 'bot') m.prepend(orb());
    const p = m.querySelector('p'); p.textContent = text; log.appendChild(m);
    if (!reduce) m.animate([{ opacity: 0, transform: 'translateY(8px) scale(.98)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.32,.72,0,1)' });
    log.scrollTo({ top: log.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
    return p;
  }
  function ask(text) {
    text = (text || '').trim(); if (!text || busy) return;
    if (inline()) openPanel();
    if (mode !== 'chat') show('chat');
    q('after').textContent = '';
    msg('me', text);
    hist.push({ role: 'user', content: text });
    const t = text.toLowerCase(); let best = null, score = 0;
    D.faq.forEach(f => { const s = f.k.reduce((n, k) => n + (t.includes(k) ? 1 : 0), 0) + (f.q.toLowerCase() === t ? 5 : 0); if (s > score) { score = s; best = f; } });
    const local = best ? best.a : D.fallback;
    busy = true; send.disabled = true; stateEl.textContent = 'Думает…';
    // the orb arrives first and spins while he «thinks», then the answer types next to it
    const p = msg('bot', ''), row = p.closest('.va-m'), o = row.querySelector('.va-ava');
    row.classList.add('thinking'); o.classList.add('on');
    const t0 = Date.now(), ctrl = new AbortController(), cut = setTimeout(() => ctrl.abort(), 30000);
    /* the model answers first; no server, a limit or a timeout — the ready answer, never an error */
    fetch(D.api || '/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: hist.slice(-10) }), signal: ctrl.signal })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(j => (j && typeof j.reply === 'string' && j.reply.trim()) ? j.reply.replace(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af\uff00-\uffef]+/g, ' ').replace(/ {2,}/g, ' ').replace(/ ([.,!?:;])/g, '$1').trim() || Promise.reject('empty') : Promise.reject('empty'))
      .catch(() => local)
      .then(answer => {
        clearTimeout(cut);
        hist.push({ role: 'assistant', content: answer });
        setTimeout(() => type(answer), reduce ? 0 : Math.max(0, 900 - (Date.now() - t0)));
      });
    function type(answer) {
      stateEl.textContent = 'Печатает…'; row.classList.remove('thinking');
      const c = document.createElement('i'); c.className = 'va-caret';
      if (reduce) { p.textContent = answer; return done(p, best, o); }
      let i = 0;
      (function tick() { i = Math.min(answer.length, i + 2); p.textContent = answer.slice(0, i); p.appendChild(c); log.scrollTop = log.scrollHeight; if (i < answer.length) setTimeout(tick, 18); else { c.remove(); done(p, best, o); } })();
    }
  }
  function done(p, best, o) {
    if (o) o.classList.remove('on');
    p.innerHTML = p.innerHTML.replace(/@RomanVasnev/g, '<a href="https://t.me/RomanVasnev" target="_blank" rel="noopener">@RomanVasnev</a>');
    busy = false; stateEl.textContent = 'Отвечает за пару секунд'; send.disabled = !input.value.trim();
    const asked = new Set([...log.querySelectorAll('.va-me p')].map(n => n.textContent));
    chips(q('after'), D.faq.filter(f => f !== best && !asked.has(f.q)).slice(0, 3));
    requestAnimationFrame(() => log.scrollTo({ top: log.scrollHeight, behavior: reduce ? 'auto' : 'smooth' }));
  }
  const playAll = () => document.querySelectorAll('.va video, .nav-ro video').forEach(v => { if (v.paused) v.play().catch(() => {}); });
  /* after the phone is locked iOS freezes the video on a soft still frame and may still call it «playing»:
     on return, kick every video; if it has not moved half a second later, reload it in place */
  const kick = v => {
    const t0 = v.currentTime;
    v.play().catch(() => {});
    setTimeout(() => {
      if (document.hidden || !v.isConnected) return;
      if (v.paused || v.currentTime === t0) { try { v.load(); } catch (_) {} v.play().catch(() => {}); }
    }, 600);
  };
  const resume = () => { if (!document.hidden) document.querySelectorAll('.va video, .nav-ro video, .menu.open .mn-ro video').forEach(kick); };
  document.addEventListener('visibilitychange', resume);
  addEventListener('focus', resume);

  /* ---------- Roman in the header, next to the logo ---------- */
  const ro = document.getElementById('navRo');
  const panel = document.createElement('div'), sbd = document.createElement('div'), grab = document.createElement('div');
  panel.className = 'va-float'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-label', 'Ассистент Романа Васнёва');
  sbd.className = 'va-sbd'; sbd.setAttribute('aria-hidden', 'true');
  grab.className = 'va-grab'; grab.setAttribute('aria-hidden', 'true'); grab.innerHTML = '<i></i>';
  panel.append(grab);
  document.body.append(sbd, panel);
  const M = 16, mq = matchMedia('(max-width:900px)'), html = document.documentElement;
  let heroIn = true, open = false;
  /* on phones nobody chats inside the page block: the keyboard covers it, so any question opens the sheet */
  function inline() { return mq.matches && !open; }
  const syncInput = () => { input.readOnly = inline(); };
  mq.addEventListener('change', syncInput); syncInput();

  function placePanel() {}
  /* a video that was moved between parents may come back blank in Safari: reload it in place */
  const wake = () => va.querySelectorAll('video').forEach(v => { try { v.load(); } catch (_) {} v.play().catch(() => {}); });
  function openPanel() {
    if (open) return;
    open = true; ro.setAttribute('aria-expanded', 'true'); ro.classList.add('open');
    /* the block keeps its place while Roman is in the sheet, so the page under it does not jump */
    home.style.setProperty('min-height', home.offsetHeight + 'px', 'important');
    panel.appendChild(va); va.classList.add('va-float-in'); wake(); syncInput();
    if (mq.matches && mode === 'intro' && log.children.length) show('chat');
    requestAnimationFrame(() => { panel.classList.add('on'); sbd.classList.add('on'); html.classList.add('va-sheet'); fit(); });
    setTimeout(playAll, 520);
    if (!mq.matches) setTimeout(() => input.focus({ preventScroll: true }), 420);
  }
  window.__vaOpen = openPanel;
  /* the keyboard only opens inside the tap itself, so the sheet has to be focusable right away */
  q('form').addEventListener('click', () => {
    if (!inline()) return;
    openPanel(); panel.classList.add('on');
    input.focus({ preventScroll: true });
  });
  function closePanel(toHero) {
    if (!open) return;
    open = false; ro.setAttribute('aria-expanded', 'false'); ro.classList.remove('open'); panel.classList.remove('on'); sbd.classList.remove('on'); html.classList.remove('va-sheet');
    panel.style.transform = '';
    syncInput();
    setTimeout(() => {
      home.appendChild(va); home.style.removeProperty('min-height'); va.classList.remove('va-float-in'); wake();
      if (mq.matches && mode === 'chat') show('intro');
      fit();
    }, reduce ? 0 : 420);
    if (!toHero) setTimeout(() => ro.focus({ preventScroll: true }), 300);
  }
  ro.addEventListener('click', () => open ? closePanel() : openPanel());
  /* pull the sheet down by its grabber to close it */
  let gy = null;
  grab.addEventListener('pointerdown', e => { gy = e.clientY; grab.setPointerCapture(e.pointerId); panel.classList.add('drag'); });
  grab.addEventListener('pointermove', e => { if (gy === null) return; panel.style.transform = `translate(-50%, ${Math.max(0, e.clientY - gy)}px)`; });
  const gEnd = e => { if (gy === null) return; const d = e.clientY - gy; gy = null; panel.classList.remove('drag'); panel.style.transform = ''; if (d > 90) closePanel(); };
  grab.addEventListener('pointerup', gEnd); grab.addEventListener('pointercancel', gEnd);
  va.querySelector('[data-va="close"]').addEventListener('click', () => closePanel());
  addEventListener('keydown', e => { if (e.key === 'Escape' && open) closePanel(); });
  document.addEventListener('pointerdown', e => { if (open && !panel.contains(e.target) && !ro.contains(e.target) && !e.target.closest('#mnRo')) closePanel(); });

  new IntersectionObserver(es => {
    heroIn = es[0].isIntersecting;
    if (heroIn) playAll();
  }, { threshold: .25 }).observe(home);
  /* coming back to «Обо мне» from another page: the video must run again */
  addEventListener('vasnev:page', () => requestAnimationFrame(playAll));
  addEventListener('pageshow', resume);

})();
