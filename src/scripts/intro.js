
(() => {
  /* ---- squircle for the avatar (superellipse n=5) ---- */
  const sq = [];
  for (let i = 0; i < 180; i++) {
    const t = i / 180 * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
    sq.push((50 + 50 * Math.sign(c) * Math.abs(c) ** .4).toFixed(2) + '% ' + (50 + 50 * Math.sign(s) * Math.abs(s) ** .4).toFixed(2) + '%');
  }
  document.documentElement.style.setProperty('--squircle', 'polygon(' + sq.join(',') + ')');

  /* ---- letters ---- */
  document.querySelectorAll('[data-split]').forEach(el => {
    const txt = el.textContent; el.textContent = '';
    [...txt].forEach(ch => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = ch; el.appendChild(s); });
  });

  /* ---- physical spring -> CSS linear() easing + its natural duration ---- */
  const spring = (k, c) => {
    const dt = 1 / 600, v = [0]; let x = 0, vel = 0, still = 0, t = 0;
    while (t < 3) {
      vel += (-k * (x - 1) - c * vel) * dt; x += vel * dt; t += dt; v.push(x);
      still = Math.abs(x - 1) < 0.002 && Math.abs(vel) < 0.02 ? still + dt : 0;
      if (still > 0.04) break;
    }
    const n = 64, pts = [];
    for (let i = 0; i <= n; i++) pts.push(i === n ? 1 : +v[Math.round(i / n * (v.length - 1))].toFixed(4));
    return { easing: 'linear(' + pts.join(',') + ')', duration: Math.round(t * 1000) };
  };
  const SP = {
    rise: spring(240, 14),   // the point shooting up
    pop: spring(480, 18),    // small things popping in
    jelly: spring(300, 12),  // rubbery shape morphs
    soft: spring(220, 22),   // calm settle
    fly: spring(200, 20)     // the button flying home
  };
  const E = { out: 'cubic-bezier(.22,1,.36,1)', in: 'cubic-bezier(.55,0,1,.45)', io: 'cubic-bezier(.65,0,.35,1)' };

  const $ = s => document.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let anims = [], run = 0, done = false;
  const A = (el, kf, o) => { const a = el.animate(kf, { fill: 'forwards', easing: E.out, ...o }); anims.push(a); return a; };
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const alive = id => id === run && !done;
  const chain = (el, t, from, steps) => { steps.forEach(([to, d, e]) => { A(el, [from, to], { duration: d, delay: t, easing: e || E.io, composite: 'replace' }); t += d; from = to; }); return t; };
  const box = (l, t, w, h, r) => ({ left: l + 'px', top: t + 'px', width: w + 'px', height: h + 'px', borderRadius: r + 'px' });
  const at = (x, y, s = 1) => `translate(${x}px,${y}px) scale(${s})`;

  const loader = $('#loader'), veil = $('#veil'), hello = $('#hello'), blob = $('#blob'), hero = $('#hero');
  const markW = $('#markW'), markPath = $('#markPath'), word = $('#word'), brand = $('#brand');
  const S = id => document.getElementById(id);

  /* Research: sticky notes rain in, get grouped into clusters, one cluster becomes an insight, the insight becomes a wireframe */
  const SCATTER = [[77.4, -13.6, 4.2], [-24.4, 17.9, -3.8], [5.7, -18.4, -13.0], [-0.9, -20.3, -11.5], [-37.4, 41.8, -10.5], [-57.7, -8.6, 12.5], [-70.2, 6.5, 13.3], [-247.4, 44.4, -5.9]], NCL = [0, 0, 0, 1, 1, 1, 2, 2];
  function sceneA(T3) {
    const q = S, cur = q('r_cur'), notes = SCATTER.map((_, i) => q('n' + i)), labels = [0, 1, 2].map(k => q('cl' + k));
    const show = (el, d) => A(el, [{ opacity: 1 }, { opacity: 1 }], { duration: 1, delay: d });
    const hide = (el, d, dur = 140, to = 0) => A(el, [{ opacity: 1 }, { opacity: to }], { duration: dur, delay: d, easing: E.in, composite: 'replace' });
    const pop = (el, d, from = 'scale(.6)', sp = SP.jelly) => { show(el, d); A(el, [{ transform: from }, { transform: 'none' }], { ...sp, delay: d }); };
    const click = (t, x, y) => chain(cur, t, { opacity: 1, transform: at(x, y) }, [[{ opacity: 1, transform: at(x, y, .84) }, 40, E.out], [{ opacity: 1, transform: at(x, y) }, 50, E.out]]);
    const mess = i => { const [dx, dy, r] = SCATTER[i]; return `translate(${dx}px,${dy}px) rotate(${r}deg)`; };
    let t = T3;
    // notes rain onto the board, each with its own tilt
    notes.forEach((el, i) => { show(el, t + i * 55); A(el, [{ transform: `${mess(i)} translateY(-26px) scale(.4)` }, { transform: mess(i) }], { ...SP.jelly, delay: t + i * 55 }); });
    pop(q('r_tb'), t + 460, 'translateY(8px) scale(.8)', SP.pop);
    // cursor presses «Сгруппировать» — notes fly into three clusters, labels pop on top
    t = chain(cur, t + 420, { opacity: 0, transform: at(300, 160) }, [[{ opacity: 1, transform: at(176, 133) }, 240, E.out]]);
    t = click(t, 176, 133);
    A(q('r_tb'), [{ transform: 'none' }, { transform: 'scale(.9)' }], { duration: 50, delay: t - 90, composite: 'replace' });
    A(q('r_tb'), [{ transform: 'scale(.9)', opacity: 1 }, { transform: 'scale(.6)', opacity: 0 }], { duration: 160, delay: t - 40, easing: E.in, composite: 'replace' });
    notes.forEach((el, i) => A(el, [{ transform: mess(i) }, { transform: 'none' }], { ...SP.jelly, delay: t + i * 35, composite: 'replace' }));
    labels.forEach((el, k) => pop(el, t + 260 + k * 60, 'translateY(4px) scale(.6)', SP.pop));
    // cursor picks the «Платежи» cluster — it turns into an insight
    t = chain(cur, t + 300, { opacity: 1, transform: at(176, 133) }, [[{ opacity: 1, transform: at(176, 86) }, 200, E.io]]);
    t = click(t, 176, 86);
    show(q('r_sel'), t - 70); A(q('r_sel'), [{ transform: 'scale(.9)' }, { transform: 'none' }], { ...SP.pop, delay: t - 70 });
    q('r_sel').style.transformOrigin = '170px 80px';
    const tI = t + 120;
    notes.forEach((el, i) => {
      if (NCL[i] !== 1) { hide(el, tI, 220, .28); return; }
      A(el, [{ transform: 'none', opacity: 1 }, { transform: 'scale(.6)', opacity: 0 }], { duration: 200, delay: tI + i * 20, easing: E.in, composite: 'replace' });
    });
    labels.forEach((el, k) => hide(el, tI, 160, k === 1 ? 0 : .28));
    hide(q('r_sel'), tI, 120);
    pop(q('r_ins'), tI + 120, 'scale(.45)');
    pop(q('r_tag'), tI + 200, 'translateY(4px) scale(.6)', SP.pop);
    chain(cur, tI, { opacity: 1, transform: at(176, 86) }, [[{ opacity: 1, transform: at(266, 120) }, 260, E.io]]);
    // the insight becomes a wireframe of the fix
    const tW = tI + 820;
    A(q('r_insr'), [{ fill: '#FFD43B', strokeWidth: 0 }, { fill: 'rgba(255,255,255,0.04)', strokeWidth: 1 }], { duration: 240, delay: tW, easing: E.io });
    hide(q('r_inst'), tW, 140);
    $$('#r_wf .wf').forEach((p, i) => A(p, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 240, delay: tW + 140 + i * 90, easing: E.io }));
    A(q('r_tagt'), [{ opacity: 1 }, { opacity: 0 }], { duration: 100, delay: tW + 60 });
    A(q('r_tagt2'), [{ opacity: 0 }, { opacity: 1 }], { duration: 120, delay: tW + 140 });
    A(q('r_tag'), [{ transform: 'none' }, { transform: 'scale(1.15)' }], { duration: 80, delay: tW + 60, easing: E.out, composite: 'replace' });
    A(q('r_tag'), [{ transform: 'scale(1.15)' }, { transform: 'none' }], { ...SP.jelly, delay: tW + 140, composite: 'replace' });
    chain(cur, tW + 300, { opacity: 1, transform: at(266, 120) }, [[{ opacity: 0, transform: at(330, 168) }, 220, E.in]]);
    return tW + 140 + 4 * 90 + 420;
  }

  /* Wireframe → fintech screen: grid, skeletons snap in, turn into real UI, auto layout spacing, a prototype tap */
  function sceneB(T3, id) {
    const q = S, ph = q('b_ph'), grid = q('b_grid'), gc = $$('#b_grid rect'), cur = q('b_cur');
    const sk = [0, 1, 2, 3, 4, 5].map(i => q('b_k' + i)), ui = [0, 1, 2, 3, 4, 5].map(i => q('b_u' + i));
    const amt = q('b_amt'); amt.textContent = '0 ₽';
    const show = (el, d) => A(el, [{ opacity: 1 }, { opacity: 1 }], { duration: 1, delay: d });
    const hide = (el, d, dur = 140) => A(el, [{ opacity: 1 }, { opacity: 0 }], { duration: dur, delay: d, easing: E.in, composite: 'replace' });
    const pop = (el, d, from = 'scale(.6)', sp = SP.jelly) => { show(el, d); A(el, [{ transform: from }, { transform: 'none' }], { ...sp, delay: d }); };
    let t = T3;
    pop(ph, t, 'scale(.7,.5)');
    show(grid, t + 140); gc.forEach((el, i) => A(el, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { ...SP.soft, delay: t + 140 + i * 40 }));
    sk.forEach((el, i) => pop(el, t + 330 + i * 60, 'translateX(-10px) scale(.85)'));
    // skeletons become real UI, top to bottom
    const tU = t + 860;
    sk.forEach((el, i) => { hide(el, tU + i * 70, 120); pop(ui[i], tU + i * 70 + 30, 'scale(.9)', SP.pop); });
    hide(grid, tU + 300, 200);
    // the balance counts up
    const c0 = tU + 100, cd = 520, start = performance.now();
    const tick = () => {
      if (!alive(id)) return;
      const k = Math.min(1, Math.max(0, (performance.now() - start - c0) / cd)), e = 1 - Math.pow(1 - k, 3);
      amt.textContent = Math.round(128400 * e / 10) * 10 === 0 ? '0 ₽' : (Math.round(128400 * e / 10) * 10).toLocaleString('ru-RU') + ' ₽';
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // auto layout: spacing bands flash with their values
    const tL = tU + 640, al = q('b_al');
    show(al, tL); A(al, [{ opacity: 0 }, { opacity: 1 }], { duration: 120, delay: tL, composite: 'replace' });
    $$('#b_al .pop').forEach((el, i) => A(el, [{ transform: 'scale(0)' }, { transform: 'none' }], { ...SP.pop, delay: tL + 40 + i * 50 }));
    hide(al, tL + 420, 160);
    // prototype: drag a connection from the button to the next screen, then tap it
    t = chain(cur, tL + 120, { opacity: 0, transform: at(300, 160) }, [
      [{ opacity: 1, transform: at(98, 136) }, 260, E.out],
      [{ opacity: 1, transform: at(98, 136, .84) }, 40, E.out],
    ]);
    pop(q('b_node'), t, 'scale(0)', SP.pop);
    pop(q('b_p2'), t + 40, 'scale(.7,.5)');
    show(q('b_nd'), t); A(q('b_nd'), [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 300, delay: t, easing: E.io });
    t = chain(cur, t, { opacity: 1, transform: at(98, 136, .84) }, [
      [{ opacity: 1, transform: at(228, 80, .84) }, 300, E.io],
      [{ opacity: 1, transform: at(228, 80) }, 40, E.out],
    ]);
    pop(q('b_ah'), t - 40, 'scale(0)', SP.pop);
    t = chain(cur, t + 60, { opacity: 1, transform: at(228, 80) }, [
      [{ opacity: 1, transform: at(70, 134) }, 300, E.io],
      [{ opacity: 1, transform: at(70, 134, .84) }, 40, E.out],
      [{ opacity: 1, transform: at(70, 134) }, 50, E.out],
    ]);
    A(ui[5], [{ transform: 'none' }, { transform: 'scale(.92)' }], { duration: 60, delay: t - 90, composite: 'replace' });
    A(ui[5], [{ transform: 'scale(.92)' }, { transform: 'none' }], { ...SP.jelly, delay: t - 30, composite: 'replace' });
    // smart animate on the next screen
    pop(q('b_okc'), t, 'scale(0)', SP.jelly);
    show(q('b_okp'), t + 120); A(q('b_okp'), [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 240, delay: t + 120, easing: E.io });
    pop(q('b_okt'), t + 160, 'translateY(6px) scale(.9)', SP.pop);
    pop(q('b_oka'), t + 220, 'translateY(6px) scale(.9)', SP.pop);
    chain(cur, t + 80, { opacity: 1, transform: at(70, 134) }, [[{ opacity: 0, transform: at(150, 175) }, 220, E.in]]);
    return t + 720;
  }

  /* Multiplayer: you build a card, PM leaves a comment, you fix it, Dev opens Dev Mode */
  const CODE = [
    [['.title {', '#fff']],
    [['  font-size', '#7CC4FF'], [': ', '#fff'], ['13px', '#FF9A6E'], [';', '#fff']],
    [['  font-weight', '#7CC4FF'], [': ', '#fff'], ['500', '#FF9A6E'], [';', '#fff']],
    [['  line-height', '#7CC4FF'], [': ', '#fff'], ['120%', '#FF9A6E'], [';', '#fff']],
    [['  color', '#7CC4FF'], [': ', '#fff'], ['#FFFFFF', '#FF9A6E'], [';', '#fff']],
    [['}', '#fff']]
  ];
  const NS = 'http://www.w3.org/2000/svg', codeChars = [];
  CODE.forEach((line, li) => {
    const tx = document.createElementNS(NS, 'text');
    tx.setAttribute('class', 'code'); tx.setAttribute('x', 224); tx.setAttribute('y', 44 + li * 13);
    line.forEach(([str, col]) => [...str].forEach(ch => { const sp = document.createElementNS(NS, 'tspan'); sp.textContent = ch; sp.setAttribute('fill', col); sp.setAttribute('fill-opacity', '0'); tx.appendChild(sp); codeChars.push([sp, li]); }));
    document.getElementById('c_code').appendChild(tx);
  });
  const bubChars = (() => { const el = document.getElementById('c_btx'), str = el.textContent; el.textContent = ''; return [...str].map(ch => { const sp = document.createElementNS(NS, 'tspan'); sp.textContent = ch; sp.setAttribute('fill-opacity', '0'); el.appendChild(sp); return sp; }); })();

  function sceneC(T3) {
    const q = S, me = q('c_me'), pm = q('c_pm'), dv = q('c_dv');
    const show = (el, d) => A(el, [{ opacity: 1 }, { opacity: 1 }], { duration: 1, delay: d });
    const pop = (el, d, from = 'scale(.6)', sp = SP.jelly) => { show(el, d); A(el, [{ transform: from }, { transform: 'none' }], { ...sp, delay: d }); };
    const type = (chars, d, step) => chars.forEach((el, i) => A(el, [{ fillOpacity: 0 }, { fillOpacity: 1 }], { duration: 1, delay: d + i * step }));
    const click = (el, t, x, y) => chain(el, t, { opacity: 1, transform: at(x, y) }, [[{ opacity: 1, transform: at(x, y, .84) }, 40, E.out], [{ opacity: 1, transform: at(x, y) }, 50, E.out]]);
    let t = T3;
    // you lay out a card
    t = chain(me, t, { opacity: 0, transform: at(120, 170) }, [[{ opacity: 1, transform: at(40, 20) }, 220, E.out]]);
    pop(q('c_card'), t - 40, 'scale(.7,.55)');
    t = chain(me, t, { opacity: 1, transform: at(40, 20) }, [[{ opacity: 1, transform: at(170, 74) }, 180, E.io]]);
    pop(q('c_img'), t - 60, 'scale(.6)');
    t = chain(me, t, { opacity: 1, transform: at(170, 74) }, [[{ opacity: 1, transform: at(58, 96) }, 170, E.io]]);
    pop(q('c_tt'), t - 50, 'translateY(4px)', SP.pop); pop(q('c_sub'), t - 10, 'scaleX(0)', SP.soft);
    t = chain(me, t, { opacity: 1, transform: at(58, 96) }, [[{ opacity: 1, transform: at(80, 128) }, 150, E.io]]);
    pop(q('c_btn'), t - 50, 'scale(.5)');
    t = chain(me, t + 20, { opacity: 1, transform: at(80, 128) }, [[{ opacity: 1, transform: at(120, 132) }, 200, E.io]]);
    // PM flies in and leaves a comment
    let p = chain(pm, T3 + 640, { opacity: 0, transform: at(330, -20) }, [[{ opacity: 1, transform: at(200, 38) }, 260, E.out]]);
    p = click(pm, p, 200, 38);
    pop(q('c_pin'), p - 60, 'scale(0) rotate(-30deg)');
    pop(q('c_bub'), p, 'scale(.3,.6)');
    type(bubChars, p + 80, 22);
    chain(pm, p + 40, { opacity: 1, transform: at(200, 38) }, [[{ opacity: 1, transform: at(228, 54) }, 260, E.io]]);
    // you grab the title and make it bigger
    t = Math.max(t, p + 120);
    t = chain(me, t, { opacity: 1, transform: at(120, 132) }, [[{ opacity: 1, transform: at(64, 94) }, 220, E.io]]);
    t = click(me, t, 64, 94);
    pop(q('c_sel'), t - 60, 'scale(.9)', SP.pop);
    t = chain(me, t, { opacity: 1, transform: at(64, 94) }, [[{ opacity: 1, transform: at(100, 86) }, 160, E.io], [{ opacity: 1, transform: at(100, 86, .84) }, 40, E.out]]);
    A(q('c_tg'), [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }], { ...SP.jelly, delay: t });
    t = chain(me, t, { opacity: 1, transform: at(100, 86, .84) }, [[{ opacity: 1, transform: at(128, 78, .84) }, 240, E.io], [{ opacity: 1, transform: at(128, 78) }, 40, E.out]]);
    A(q('c_sel'), [{ opacity: 1 }, { opacity: 0 }], { duration: 140, delay: t + 120, composite: 'replace' });
    // the comment is resolved
    const r = t + 140;
    A(pm, [{ transform: at(228, 54) }, { transform: at(228, 50) }], { duration: 90, delay: r - 120, easing: E.out, composite: 'replace' });
    A(pm, [{ transform: at(228, 50) }, { transform: at(228, 54) }], { ...SP.jelly, delay: r - 30, composite: 'replace' });
    A(q('c_bub'), [{ transform: 'none', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }], { duration: 180, delay: r, easing: E.in, composite: 'replace' });
    A(q('c_pinb'), [{ fill: '#FF5C8A' }, { fill: '#0D99FF' }], { duration: 160, delay: r + 80 });
    A(q('c_pint'), [{ opacity: 1 }, { opacity: 0 }], { duration: 80, delay: r + 80 });
    A(q('c_pinc'), [{ opacity: 0 }, { opacity: 1 }], { duration: 120, delay: r + 140 });
    A(q('c_pin'), [{ transform: 'none' }, { transform: 'scale(1.25)' }], { duration: 80, delay: r + 80, easing: E.out, composite: 'replace' });
    A(q('c_pin'), [{ transform: 'scale(1.25)' }, { transform: 'none' }], { ...SP.jelly, delay: r + 160, composite: 'replace' });
    // Dev opens Dev Mode and the CSS types itself out
    const d0 = r + 220;
    chain(pm, d0, { opacity: 1, transform: at(228, 54) }, [[{ opacity: 0, transform: at(300, -30) }, 300, E.in]]);
    let d = chain(dv, d0 - 60, { opacity: 0, transform: at(340, 170) }, [[{ opacity: 1, transform: at(262, 132) }, 260, E.out]]);
    show(q('c_dev'), d - 60); A(q('c_dev'), [{ transform: 'translateX(130px) scaleX(.6)' }, { transform: 'none' }], { ...SP.jelly, delay: d - 60 });
    A(q('c_pin'), [{ opacity: 1 }, { opacity: 0 }], { duration: 160, delay: d - 60, composite: 'replace' });
    type(codeChars.map(c => c[0]), d + 60, 9);
    chain(me, d, { opacity: 1, transform: at(128, 78) }, [[{ opacity: 1, transform: at(150, 118) }, 360, E.io]]);
    return d + 60 + codeChars.length * 9 + 360;
  }
  const SCENES = { a: sceneA, b: sceneB, c: sceneC };
  /* each visit shows the next of the three scenes */
  let variant = 'a';
  const next = () => {
    let i = 0;
    try { i = (+sessionStorage.getItem('vasnev-loader') || 0); sessionStorage.setItem('vasnev-loader', String((i + 1) % 3)); } catch (e) { i = Math.floor(Math.random() * 3); }
    variant = 'abc'[i % 3];
  };
  next();

  function reset() {
    anims.forEach(a => a.cancel()); anims = []; done = false;
    loader.hidden = false; hero.setAttribute('aria-hidden', 'true');
    $('#sr').textContent = 'Загрузка сайта vasnev.art'; dispatchEvent(new Event('vasnev:loading'));
  }
  function finish() {
    if (done) return; done = true;
    anims.forEach(a => a.cancel()); anims = [];
    loader.hidden = true; hero.removeAttribute('aria-hidden');
    [...$$('[data-r]'), ...$$('[data-n]')].forEach(el => A(el, [{ opacity: 1 }, { opacity: 1 }], { duration: 1 }));
    $('#sr').textContent = ''; dispatchEvent(new Event('vasnev:ready'));
  }

  async function play() {
    const id = ++run; reset();
    $('#scene').style.display = 'none';
    const W = innerWidth, H = innerHeight, cx = W / 2, cy = H / 2 - 10;
    const textY = cy + 18;                      // centre line of «привет!»
    hello.style.top = (textY - 20) + 'px';
    const wordW = word.getBoundingClientRect().width;
    const pillW = 26 * 2 + 30 + 12 + wordW, pillH = 64;

    if (reduce) {
      A(blob, [{ ...box(cx - pillW / 2, cy - 32, pillW, pillH, 16), opacity: 1, paddingLeft: '26px', paddingRight: '26px' }, { ...box(cx - pillW / 2, cy - 32, pillW, pillH, 16), opacity: 1, paddingLeft: '26px', paddingRight: '26px' }], { duration: 1 });
      A(markPath, [{ opacity: 1, fillOpacity: 1, strokeOpacity: 0 }, { opacity: 1, fillOpacity: 1, strokeOpacity: 0 }], { duration: 1 });
      $$('.ch', word).forEach(el => A(el, [{ opacity: 1 }, { opacity: 1 }], { duration: 1 }));
      await wait(900); if (!alive(id)) return;
      A(loader, [{ opacity: 1 }, { opacity: 0 }], { duration: 300 });
      [...$$('[data-r]'), ...$$('[data-n]')].forEach(el => A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 100 }));
      await wait(420); if (!alive(id)) return;
      return finish();
    }

    /* ---- 1–3. Bright shapes, cursors and editor bits roll in, bump into each other,
       then get pulled into the middle one by one — the black point eats them and grows ---- */
    const u = Math.max(.42, Math.min(1.4, Math.min(W, H * 1.25) / 820));
    const floor = cy + 200 * u, g = 3400 * u;
    const SPEC = {
      circ: { s: 220, from: 'L', d: 0, vx: 1250, vy: 0 },
      sq: { s: 190, from: 'R', d: .07, vx: -1200, vy: 0 },
      tri: { s: 200, from: 'T', d: .16, x: -200, vy: 300 },
      cur: { s: 180, from: 'T', d: .26, x: 180, vy: 250 },
      comp: { s: 170, from: 'L', d: .34, vx: 1350, vy: -700 },
      frame: { s: 180, from: 'R', d: .42, vx: -1350, vy: -620 },
      pen: { s: 170, from: 'T', d: .52, x: 10, vy: 380 }
    };
    const toys = $$('.toy').map((el, i) => {
      const sp = SPEC[el.dataset.k], sz = sp.s * u, r = sz * .46;
      el.style.width = el.style.height = sz + 'px';
      let x, y;
      if (sp.from === 'L') { x = -r - 10; y = floor - r; } else if (sp.from === 'R') { x = W + r + 10; y = floor - r; } else { x = cx + sp.x * u; y = -r - 20; }
      return { el, sz, r, x, y, vx: (sp.vx || 0) * u, vy: (sp.vy || 0) * u, a: (i * 47) % 360, w: 0, s: 1, d: sp.d, on: false, gone: false, tg: 1.42 + i * .075, ta: 0, frames: [] };
    });
    const FPS = 120, dt = 1 / FPS, TT = 2.35;
    for (let f = 0; f <= TT * FPS; f++) {
      const t = f * dt;
      toys.forEach(p => {
        if (t < p.d || p.gone) return;
        if (t < p.tg) {
          p.vy += g * dt;
          p.vx += (cx - p.x) * 3.2 * dt;                       // a soft pull keeps them near the middle
          p.x += p.vx * dt; p.y += p.vy * dt;
          if (p.y + p.r > floor) { p.y = floor - p.r; if (p.vy > 0) p.vy = -p.vy * .42; if (Math.abs(p.vy) < 60 * u) p.vy = 0; p.on = true; }
          else p.on = false;
          if (p.on) { p.vx *= 1 - 1.6 * dt; p.w = p.vx / p.r; }     // rolling without slipping
          p.a += p.w * dt * 57.2958;
        } else {
          // pulled into the point, spinning faster and shrinking as it gets close
          const dx = cx - p.x, dy = cy - p.y;
          p.vx += (150 * dx - 16 * p.vx) * dt; p.vy += (150 * dy - 16 * p.vy) * dt;
          p.x += p.vx * dt; p.y += p.vy * dt;
          p.w += 30 * dt * Math.sign(p.w || 1); p.a += p.w * dt * 57.2958;
          const dist = Math.hypot(dx, dy);
          p.s = Math.min(p.s, Math.pow(Math.min(1, dist / (p.r * 2.4)), .8));
          if (p.s < .04) { p.s = 0; p.gone = true; p.ta = t; }
        }
      });
      // bumps between the toys still on the floor
      for (let i = 0; i < toys.length; i++) for (let j = i + 1; j < toys.length; j++) {
        const p = toys[i], q = toys[j];
        if (t < p.d || t < q.d || t >= p.tg || t >= q.tg) continue;
        const dx = q.x - p.x, dy = q.y - p.y, dd = Math.hypot(dx, dy) || 1, ov = p.r + q.r - dd;
        if (ov <= 0) continue;
        const nx = dx / dd, ny = dy / dd;
        p.x -= nx * ov / 2; p.y -= ny * ov / 2; q.x += nx * ov / 2; q.y += ny * ov / 2;
        const rv = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
        if (rv < 0) { const jj = -(1 + .35) * rv / 2; p.vx -= jj * nx; p.vy -= jj * ny; q.vx += jj * nx; q.vy += jj * ny; }
      }
      toys.forEach(p => p.frames.push([p.x - p.sz / 2, p.y - p.sz / 2, p.a, t < p.d ? 0 : p.s]));
    }
    toys.forEach(p => {
      const k0 = Math.round(p.d * FPS), fr = p.frames.slice(k0), n1 = fr.length - 1;
      A(p.el, [{ opacity: 1 }, { opacity: 1 }], { duration: 1, delay: p.d * 1000 });
      A(p.el, fr.map(([x, y, a, sc], i) => ({ offset: i / n1, transform: `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${a.toFixed(1)}deg) scale(${sc.toFixed(3)})` })),
        { duration: (TT - p.d) * 1000, delay: p.d * 1000, easing: 'linear' });
    });
    // the point appears with the first swallowed toy and gulps each next one
    const absorbs = toys.map(p => p.ta || TT).sort((a, b) => a - b), tA0 = absorbs[0] * 1000 - 90, tAN = absorbs[absorbs.length - 1];
    const B = 60 * u;
    A(blob, [{ ...box(cx, cy, 0, 0, 0), opacity: 1 }, { ...box(cx - B / 2, cy - B / 2, B, B, B / 2), opacity: 1 }], { ...SP.jelly, delay: tA0 });
    const pulse = [];
    for (let k = 0; k <= Math.round((tAN + .45 - absorbs[0]) * FPS); k++) {
      const t = absorbs[0] + k * dt; let sc = 1;
      absorbs.forEach(ta => { const e = t - ta; if (e > 0) sc += .16 * Math.exp(-e / .09) * Math.sin(e * 34 + .4); });
      pulse.push({ transform: `scale(${sc.toFixed(4)})` });
    }
    A(blob, pulse, { duration: (pulse.length - 1) * dt * 1000, delay: absorbs[0] * 1000, easing: 'linear' });
    const T4 = tAN * 1000 + 160;

    /* ---- 4. The card swallows the scene and springs into the vasnev.art pill; the logo draws itself ---- */
    const px = cx - pillW / 2, py = cy - pillH / 2;
    A(blob, [box(cx - B / 2, cy - B / 2, B, B, B / 2), { ...box(px, py, pillW, pillH, 16), paddingLeft: '26px', paddingRight: '26px' }], { ...SP.jelly, delay: T4, composite: 'replace' });
    A(blob, [{ transform: 'scale(1)' }, { transform: 'scale(1.4)' }], { ...SP.soft, delay: T4, composite: 'replace' });
    const tM = T4 + 120;
    A(markPath, [{ opacity: 1, strokeDashoffset: 1.01 }, { opacity: 1, strokeDashoffset: 0 }], { duration: 460, delay: tM, easing: E.io });
    A(markPath, [{ opacity: 1, strokeDashoffset: 0, fillOpacity: 0, strokeOpacity: 1 }, { opacity: 1, strokeDashoffset: 0, fillOpacity: 1, strokeOpacity: 0 }], { duration: 180, delay: tM + 460, composite: 'replace' });
    A(markW, [{ transform: 'scale(1)' }, { transform: 'scale(.82)' }], { duration: 80, delay: tM + 520, easing: E.in });
    A(markW, [{ transform: 'scale(.82)' }, { transform: 'scale(1)' }], { ...SP.jelly, delay: tM + 600, composite: 'replace' });
    $$('.ch', word).forEach((el, i) => {
      const d = tM + 120 + i * 26;
      A(el, [{ transform: 'translate(-6px,.5em) scale(.6)' }, { transform: 'translate(0,0) scale(1)' }], { ...SP.pop, delay: d });
      A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 120, delay: d, easing: 'linear' });
    });
    await wait(tM + 1250); if (!alive(id)) return;

    /* ---- 5. The pill flies into its place in the header; the site springs in ---- */
    $$('[data-n]').forEach((el, i) => {
      if (el === brand) return;
      A(el, [{ transform: 'translateY(-14px)' }, { transform: 'translateY(0)' }], { ...SP.soft, delay: 80 + i * 35 });
      A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 220, delay: 80 + i * 35, easing: 'linear' });
    });
    A(veil, [{ opacity: 1 }, { opacity: 0 }], { duration: 500, delay: 120, easing: E.io });
    const br = brand.getBoundingClientRect();
    A(blob, [{ transform: 'scale(1.4)' }, { transform: 'scale(1.48,1.32)' }], { duration: 90, easing: E.in, composite: 'replace' });
    A(blob, [{ transform: 'scale(1.48,1.32)' }, { transform: 'scale(1)' }], { ...SP.fly, delay: 90, composite: 'replace' });
    A(blob, [{ ...box(px, py, pillW, pillH, 16), paddingLeft: '26px', paddingRight: '26px' }, { ...box(br.left, br.top, br.width, br.height, 16), paddingLeft: '26px', paddingRight: '26px' }], { ...SP.fly, delay: 90, composite: 'replace' });
    if (window.__heroBuild) window.__heroBuild(220);
    else $$('[data-r]').forEach((el, i) => {
      A(el, [{ transform: 'translateY(26px) scale(.98)' }, { transform: 'translateY(0) scale(1)' }], { ...SP.soft, delay: 260 + i * 60 });
      A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 260 + i * 60, easing: 'linear' });
    });
    await wait(90 + SP.fly.duration); if (!alive(id)) return;
    A(brand, [{ opacity: 1 }, { opacity: 1 }], { duration: 1 });
    hero.removeAttribute('aria-hidden');
    await wait(60); if (!alive(id)) return;
    finish();
  }

  const skip = () => { if (!done && !loader.hidden) { run++; finish(); } };
  loader.addEventListener('click', skip);
  addEventListener('keydown', e => {
    if (e.key === 'Escape' || (e.key === ' ' && document.activeElement === document.body)) { e.preventDefault(); skip(); }
  });
  addEventListener('vasnev:replay', () => { next(); play(); });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(play));
})();
