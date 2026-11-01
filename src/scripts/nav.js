
/* Header sections + mobile dropdown menu — by vasnev.art */
(() => {
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const btn = document.getElementById('menuBtn'), menu = document.getElementById('menu');
  const items = $$('a', menu);
  const isOpen = () => menu.classList.contains('open');
  const bd = document.getElementById('menuBd');
  /* Moscow clock: the footer widget, without the globe */
  const twF = new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
  const twDt = new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow', weekday: 'long', day: 'numeric', month: 'long' });
  const clk = () => {
    const now = new Date(), [h, m, sec] = twF.format(now).split(':');
    document.getElementById('mnHM').textContent = h + ':' + m;
    document.getElementById('mnS').textContent = ':' + sec;
  };
  /* Glass Prism Hero as the sheet's backdrop tile, light theme, mounted only while open */
  const pr = document.getElementById('mnPr'); let prApp = null, prOff = 0;
  const prMount = () => {
    clearTimeout(prOff);
    if (prApp || !window.__getUI) return;
    window.__getUI({ id: 'menu-prism', bundle: 'ui/menu-prism.js' }).then(ui => {
      if (!isOpen() || prApp) return;
      const box = document.createElement('div'); pr.replaceChildren(box);
      const sc = pr.clientHeight / 560, w = pr.clientWidth / sc;
      box.style.width = w + 'px'; box.style.transform = `translate(-50%,-50%) scale(${sc})`;
      const root = box.attachShadow({ mode: 'open' }), st = document.createElement('style'), host = document.createElement('div');
      st.textContent = ui.css + '.h-\\[100svh\\]{height:560px!important}.min-h-\\[560px\\]{min-height:0}'; host.style.height = '100%';
      root.append(st, host); prApp = ui.mount(host, {});
    }).catch(() => {});
  };
  const prUnmount = () => { prOff = setTimeout(() => { if (prApp) { prApp.unmount(); prApp = null; pr.replaceChildren(); } }, 600); };
  /* the little planet: the footer globe, swaying around Moscow while the sheet is open */
  const mg = document.getElementById('mnG'), mctx = mg.getContext('2d'), mRo = document.getElementById('mnRo'), mVid = mRo.querySelector('video');
  const GD = []; for (let la = -75; la <= 75; la += 9) { const n = Math.max(6, Math.round(40 * Math.cos(la * Math.PI / 180))); for (let k = 0; k < n; k++) GD.push([la, k * 360 / n]); }
  const MSK = [55.75, 37.62], TILT = 28 * Math.PI / 180, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const proj = (lat, lon, lon0, R) => {
    const p = lat * Math.PI / 180, l = (lon - lon0) * Math.PI / 180, x = Math.cos(p) * Math.sin(l), y0 = Math.sin(p), z0 = Math.cos(p) * Math.cos(l);
    return [R + x * R, R - (y0 * Math.cos(TILT) - z0 * Math.sin(TILT)) * R, y0 * Math.sin(TILT) + z0 * Math.cos(TILT)];
  };
  let gRaf = 0;
  function gDraw(now) {
    const dpr = Math.min(2, devicePixelRatio || 1), W = mg.clientWidth;
    if (W) {
      if (mg.width !== Math.round(W * dpr)) mg.width = mg.height = Math.round(W * dpr);
      const R = W / 2, t = still ? 0 : now / 1000, lon0 = MSK[1] + 8 + 38 * Math.sin(t * Math.PI * 2 / 18);
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0); mctx.clearRect(0, 0, W, W);
      mctx.fillStyle = '#2F5CFF'; mctx.beginPath(); mctx.arc(R, R, R - 1, 0, Math.PI * 2); mctx.fill();
      GD.forEach(([la, lo]) => { const [x, y, z] = proj(la, lo, lon0, R - 1); if (z <= 0) return; mctx.fillStyle = `rgba(255,255,255,${(.18 + .6 * z).toFixed(3)})`; mctx.beginPath(); mctx.arc(x, y, .6 + 1.2 * z, 0, Math.PI * 2); mctx.fill(); });
      const [mx, my] = proj(MSK[0], MSK[1], lon0, R - 1);
      mctx.fillStyle = '#FFD43B'; mctx.beginPath(); mctx.arc(mx, my, 4.5, 0, Math.PI * 2); mctx.fill();
      mctx.strokeStyle = 'rgba(255,212,59,.45)'; mctx.lineWidth = 2; mctx.beginPath(); mctx.arc(mx, my, 8 + 2.5 * Math.sin(t * 3), 0, Math.PI * 2); mctx.stroke();
    }
    if (!still) gRaf = requestAnimationFrame(gDraw);
  }
  mRo.addEventListener('click', () => { setOpen(false); setTimeout(() => window.__vaOpen && window.__vaOpen(), 260); });
  let tick = 0, swOn = false;
  const onSheet = v => {
    clearInterval(tick); cancelAnimationFrame(gRaf);
    if (v) {
      clk(); tick = setInterval(clk, 1000); gRaf = requestAnimationFrame(gDraw);
      mVid.play().catch(() => {});
      if (!swOn && window.__swipe) { swOn = true; window.__swipe(document.getElementById('mnSw'), { label: 'Свайпни, чтобы написать', loadingLabel: 'Открываю Telegram…', successLabel: 'До связи', wait: 500, resetAfter: 1600, onDone: () => { location.href = 'https://t.me/RomanVasnev'; } }); }
      prMount();
    } else { prUnmount(); mVid.pause(); }
  };
  const setOpen = (v, focusBtn) => {
    const tc = document.querySelector('meta[name="theme-color"]'); if (tc) tc.content = v ? '#EDEDED' : '#F8F8F8';
    menu.classList.toggle('open', v); bd.classList.toggle('open', v); onSheet(v);
    btn.setAttribute('aria-expanded', v ? 'true' : 'false');
    btn.setAttribute('aria-label', v ? 'Закрыть меню' : 'Меню');
    if (v) requestAnimationFrame(() => (menu.querySelector('a.on') || items[0]).focus({ preventScroll: true }));
    else if (focusBtn) btn.focus({ preventScroll: true });
  };
  btn.addEventListener('click', () => setOpen(!isOpen()));
  document.getElementById('menuX').addEventListener('click', () => setOpen(false, true));
  /* top sheet: push the grabber up to close */
  const grab = menu.querySelector('.mn-g'); let dy0 = null;
  grab.addEventListener('pointerdown', e => { dy0 = e.clientY; grab.setPointerCapture(e.pointerId); menu.classList.add('drag'); });
  grab.addEventListener('pointermove', e => { if (dy0 === null) return; const d = Math.min(0, e.clientY - dy0); menu.style.transform = `translateY(${d}px)`; });
  const drop = e => { if (dy0 === null) return; const d = e.clientY - dy0; dy0 = null; menu.classList.remove('drag'); menu.style.transform = ''; if (d < -80) setOpen(false, true); };
  grab.addEventListener('pointerup', drop); grab.addEventListener('pointercancel', drop);
  document.addEventListener('keydown', e => {
    if (!isOpen()) return;
    if (e.key === 'Escape') { setOpen(false, true); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const vis = items.filter(a => a.offsetParent), i = vis.indexOf(document.activeElement);
      vis[(i + (e.key === 'ArrowDown' ? 1 : -1) + vis.length) % vis.length].focus(); e.preventDefault();
    }
    if (e.key === 'Tab') {
      const vis = [btn, ...items.filter(a => a.offsetParent)], i = vis.indexOf(document.activeElement);
      if (e.shiftKey && i === 0) { vis[vis.length - 1].focus(); e.preventDefault(); }
      else if (!e.shiftKey && i === vis.length - 1) { btn.focus(); e.preventDefault(); }
    }
  });
  document.addEventListener('pointerdown', e => { if (isOpen() && !menu.contains(e.target) && !btn.contains(e.target) && !e.target.closest('.nav')) setOpen(false); });
  addEventListener('resize', () => { if (isOpen() && getComputedStyle(btn).display === 'none') setOpen(false); });

  /* section links: smooth scroll to the frame; sections not built yet say so */
  $$('[data-sec]').forEach(a => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) { a.dataset.tip = a.textContent.trim(); a.dataset.tipSub = 'раздел скоро появится'; a.setAttribute('aria-disabled', 'true'); }
    a.addEventListener('click', e => {
      e.preventDefault();
      if (isOpen()) setOpen(false);
      const h = a.getAttribute('href');
      if (window.__page && (h === '#cases' || h === '#about' || h === '#ui-library')) { window.__page(h === '#cases' ? 'cases' : h === '#ui-library' ? 'ui' : 'about', h === '#about'); return; }
      if (!t) return;
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      scrollTo({ top: t.getBoundingClientRect().top + scrollY - 110, behavior: reduce ? 'auto' : 'smooth' });
    });
  });
  $$('.lang', menu).forEach(a => a.addEventListener('click', e => { e.preventDefault(); setOpen(false); }));
})();
