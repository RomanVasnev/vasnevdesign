
(() => {
  const $ = s => document.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* ---------- springs as CSS easings (same physics as the loader) ---------- */
  const spring = (k, c) => {
    const dt = 1 / 600, v = [0]; let x = 0, vel = 0, still = 0, t = 0;
    while (t < 3) { vel += (-k * (x - 1) - c * vel) * dt; x += vel * dt; t += dt; v.push(x); still = Math.abs(x - 1) < 0.002 && Math.abs(vel) < 0.02 ? still + dt : 0; if (still > 0.04) break; }
    const pts = []; for (let i = 0; i <= 64; i++) pts.push(i === 64 ? 1 : +v[Math.round(i / 64 * (v.length - 1))].toFixed(4));
    return { easing: window.CSS && CSS.supports && CSS.supports('animation-timing-function', 'linear(0, 1)') ? 'linear(' + pts.join(',') + ')' : 'cubic-bezier(.22,1,.36,1)', duration: Math.round(t * 1000) };
  };
  const SP = { pop: spring(480, 18), jelly: spring(300, 12), soft: spring(220, 22), drag: spring(170, 20) };
  root.style.setProperty('--spr-pop', SP.pop.easing);
  root.style.setProperty('--spr-jelly', SP.jelly.easing);
  root.style.setProperty('--spr-soft', SP.soft.easing);

  /* ---------- per-frame loop (native scroll) ---------- */
  const raf = () => { frame(); requestAnimationFrame(raf); };

  /* ---------- loader hand-off ---------- */
  root.classList.add('is-loading');
  addEventListener('vasnev:loading', () => { root.classList.add('is-loading'); heroReset(); scrollTo(0, 0); });
  addEventListener('vasnev:ready', () => { root.classList.remove('is-loading'); });


  /* ---------- first screen: built by blocks code (frame tool + text tool + AI chat) ---------- */
  function heroReset() {
    const f0 = $('#f0'); if (!f0) return;
    f0.getAnimations({ subtree: true }).forEach(a => a.cancel());
    $$('#heroWrap .ec, #heroWrap .dr').forEach(e => e.remove());
    f0.classList.add('pre');
    if (window.__dropReset) window.__dropReset();
  }


  /* ---------- tooltip that follows the cursor on a spring ---------- */
  const tip = $('#tip'), tipT = $('#tipT'), tipS = $('#tipS');
  const tp = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, on: false, el: null };
  const showTip = (el, x, y) => {
    if (tp.el !== el) {
      tp.el = el;
      tipT.textContent = el.dataset.tip; tipS.textContent = el.dataset.tipSub || '';
      if (!tp.on) { tp.x = x; tp.y = y; tp.vx = tp.vy = 0; }
      tip.animate([{ opacity: 0, transform: `translate(${tp.x}px,${tp.y}px) scale(.6)` }, { opacity: 1, transform: `translate(${tp.x}px,${tp.y}px) scale(1)` }], { duration: 160, easing: 'ease-out' });
      tip.style.opacity = 1; tp.on = true;
    }
  };
  const hideTip = () => { if (!tp.on) return; tp.on = false; tp.el = null; tip.style.opacity = 0; };
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || root.classList.contains('is-loading')) return hideTip();
    const el = e.target.closest && e.target.closest('[data-tip]');
    if (!el) return hideTip();
    const w = tip.offsetWidth, h = tip.offsetHeight;
    let x = e.clientX + 16, y = e.clientY + 22;
    if (x + w > innerWidth - 12) x = e.clientX - w - 12;
    if (y + h > innerHeight - 12) y = e.clientY - h - 12;
    tp.tx = x; tp.ty = y; showTip(el, x, y);
  }, { passive: true });
  addEventListener('pointerleave', hideTip);
  document.addEventListener('focusin', e => {
    const el = e.target.closest && e.target.closest('[data-tip]'); if (!el) return;
    const r = el.getBoundingClientRect(); tp.tx = Math.min(r.left, innerWidth - 300); tp.ty = r.bottom + 10; tp.x = tp.tx; tp.y = tp.ty; showTip(el, tp.tx, tp.ty);
  });
  document.addEventListener('focusout', hideTip);
  $$('[data-copy]').forEach(el => el.addEventListener('click', async e => {
    e.preventDefault(); let ok = true;
    try { await navigator.clipboard.writeText(el.dataset.copy); } catch (err) { ok = false; }
    tipT.textContent = ok ? 'Скопировано' : el.dataset.copy; tipS.textContent = ok ? el.dataset.copy : 'выдели и скопируй адрес';
    tip.animate([{ transform: `translate(${tp.x}px,${tp.y}px) scale(.85)` }, { transform: `translate(${tp.x}px,${tp.y}px) scale(1)` }], SP.pop);
  }));


  /* =====================================================================
     Blocks after the first screen: frames on a canvas, editor mechanics
     ===================================================================== */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const mqSmall = matchMedia('(max-width:900px)');

  /* ---------- one gap between every block = the free space under the first screen ---------- */
  function layoutGaps() {
    root.style.setProperty('--gap', Math.round(clamp(innerHeight * .2, 120, 220)) + 'px');
  }
  addEventListener('resize', layoutGaps); layoutGaps();
  if (document.fonts) document.fonts.ready.then(layoutGaps);

  /* ---------- entrances: every frame is built in front of you, like in the editor ---------- */
  const A = (el, kf, o) => {
    const a = el.animate(kf, { fill: 'both', ...o }), end = Array.isArray(kf) ? kf[kf.length - 1] : null;
    /* a held blur(0) keeps text on a blurred layer in Safari: once it lands on its natural look, let it go */
    if (end && 'filter' in end && /^(none|blur\(0(px)?\))$/.test(String(end.filter)) && Object.keys(end).every(k => k === 'filter' || (k === 'opacity' && +end[k] === 1)))
      a.finished.then(() => a.cancel(), () => {});
    return a;
  };
  const EO = 'cubic-bezier(.22,1,.36,1)', EIO = 'cubic-bezier(.65,0,.35,1)';
  const rise = (els, t0, step = 70) => els.forEach((el, i) => {
    A(el, [{ opacity: 0, filter: 'blur(6px)' }, { opacity: 1, filter: 'blur(0px)' }], { duration: 300, delay: t0 + i * step, easing: EO });
    A(el, [{ transform: 'translateY(.5em)' }, { transform: 'none' }], { ...SP.soft, delay: t0 + i * step });
  });
  const relTo = (el, host) => { const a = el.getBoundingClientRect(), b = host.getBoundingClientRect(); return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height }; };

  // a collaborator's cursor: appears, moves, clicks, leaves
  function Cur(host, label, c = '#0B0B0C', tc = '#fff') {
    const el = document.createElement('div');
    el.className = 'ec'; el.setAttribute('aria-hidden', 'true');
    el.style.setProperty('--c', c); el.style.setProperty('--t', tc);
    el.innerHTML = '<svg viewBox="0 0 16 22"><path d="M1.2 1.2v16.6l4.5-4.3 3.1 6.9 3-1.3-3-6.8 6.3-.3Z"/></svg>' + (label ? `<span>${label}</span>` : '');
    host.appendChild(el);
    const svg = el.firstChild, tr = (x, y) => `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
    let last = [0, 0];
    return {
      el,
      at(x, y, t) { A(el, [{ transform: tr(x, y) }, { transform: tr(x, y) }], { duration: 1, delay: t }); A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 160, delay: t }); last = [x, y]; return this; },
      to(x, y, t, o = { duration: 420, easing: EIO }) { el.animate([{ transform: tr(...last) }, { transform: tr(x, y) }], { ...o, delay: t, fill: 'forwards', composite: 'replace' }); last = [x, y]; return t + o.duration; },
      press(t, hold = 0) { svg.animate([{ transform: 'scale(1)' }, { transform: 'scale(.8)', offset: .3 }, { transform: 'scale(.8)', offset: .3 + .4 * (hold / (hold + 260)) }, { transform: 'scale(1)' }], { duration: 260 + hold, delay: t, easing: 'ease-out' }); },
      off(t) { this.to(last[0] + 28, last[1] + 34, t, { duration: 460, easing: EO }); el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, delay: t + 80, fill: 'forwards', composite: 'replace' }); }
    };
  }

  // frame tool: the cursor drags the frame out from its top-left corner, the size badge counts up
  const FD = spring(120, 19);
  function drawFrame(wrap, frm, t0, cur) {
    const W = frm.offsetWidth, H = frm.offsetHeight, ox = frm.offsetLeft, oy = frm.offsetTop;
    const ov = document.createElement('div');
    ov.className = 'dr'; ov.setAttribute('aria-hidden', 'true');
    ov.style.left = ox + 'px'; ov.style.top = oy + 'px';
    ov.innerHTML = '<i style="left:0;top:0"></i><i style="left:100%;top:0"></i><i style="left:0;top:100%"></i><i style="left:100%;top:100%"></i><b>0 × 0</b>';
    wrap.appendChild(ov);
    cur.at(ox - 40, oy - 36, t0); cur.to(ox, oy, t0 + 60, { duration: 300, easing: EO });
    const t1 = t0 + 380; cur.press(t1 - 20, FD.duration * .7);
    A(ov, [{ width: '0px', height: '0px', opacity: 1 }, { width: W + 'px', height: H + 'px', opacity: 1 }], { ...FD, delay: t1 });
    A(frm, [{ clipPath: 'inset(0 100% 100% 0 round 32px)' }, { clipPath: 'inset(0 0% 0% 0 round 32px)' }], { ...FD, delay: t1, fill: 'both' });
    cur.to(ox + W, oy + H, t1, FD);
    const badge = ov.querySelector('b');
    setTimeout(() => { const t = performance.now(), tick = () => { badge.textContent = `${Math.round(ov.offsetWidth)} × ${Math.round(ov.offsetHeight)}`; if (performance.now() - t < FD.duration + 80) requestAnimationFrame(tick); }; tick(); }, t1);
    return { end: t1 + FD.duration * .62, deselect(t) { $$('i', ov).forEach((h, k) => h.animate([{ transform: 'scale(1)' }, { transform: 'scale(0)' }], { duration: 160, delay: t + k * 30, fill: 'forwards', easing: 'cubic-bezier(.55,0,1,.45)' })); ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, delay: t + 120, fill: 'forwards', composite: 'replace' }).onfinish = () => ov.remove(); } };
  }

  // text tool: the heading is typed with a caret
  function typeText(h, t0, step = 26) {
    if (!h._chars) {
      const chars = [], walk = document.createTreeWalker(h, NodeFilter.SHOW_TEXT), nodes = [];
      while (walk.nextNode()) nodes.push(walk.currentNode);
      nodes.forEach(nd => {
        const frag = document.createDocumentFragment();
        [...nd.textContent].forEach(ch => { const s = document.createElement('span'); s.className = 'tc'; s.textContent = ch; frag.appendChild(s); chars.push(s); });
        nd.replaceWith(frag);
      });
      h.setAttribute('aria-label', h.textContent); h._chars = chars;
    }
    const ch = h._chars.filter(s => s.textContent.trim() || s.nextSibling), N = ch.length;
    const caret = document.createElement('i'); caret.className = 'caret'; h.appendChild(caret);
    const fs = parseFloat(getComputedStyle(h).fontSize), kf = [];
    ch.forEach((s, i) => {
      A(s, [{ opacity: 0 }, { opacity: 1 }], { duration: 1, delay: t0 + i * step });
      kf.push({ offset: i / N, transform: `translate(${(s.offsetLeft + s.offsetWidth).toFixed(1)}px,${(s.offsetTop + s.offsetHeight * .5 - fs * .42).toFixed(1)}px)`, easing: 'steps(1,end)' });
    });
    kf.push({ ...kf[kf.length - 1], offset: 1 });
    caret.style.height = (fs * .84) + 'px';
    A(caret, kf, { duration: N * step, delay: t0, easing: 'linear' });
    const tE = t0 + N * step;
    caret.animate([{ opacity: 1 }, { opacity: 1 }], { duration: Math.max(1, tE - t0), delay: t0 });
    caret.animate([{ opacity: 1 }, { opacity: 1, offset: .5 }, { opacity: 0, offset: .5001 }, { opacity: 0 }], { duration: 560, delay: tE, iterations: 2 }).onfinish = () => caret.remove();
    return tE;
  }

  // a card carried in by someone's cursor and dropped with a bounce
  function carry(el, wrap, frmOff, pos, from, t, cur, gx = 36, gy = 24) {
    const [dx, dy, r] = from, x = frmOff.x + pos.x + gx, y = frmOff.y + pos.y + gy;
    cur.at(x + dx, y + dy, t);
    A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 1, delay: t });
    A(el, [{ transform: `translate(${dx}px,${dy}px) rotate(${r}deg) scale(1.05)` }, { transform: 'scale(1.05)' }], { ...SP.drag, delay: t });
    cur.to(x, y, t, SP.drag);
    const tD = t + SP.drag.duration * .6;
    el.animate([{ transform: 'scale(1.05)' }, { transform: 'none' }], { ...SP.jelly, delay: tD, fill: 'forwards', composite: 'replace' });
    cur.press(tD - 60); cur.off(tD + 140);
    return tD;
  }

  const wrapOf = fr => fr.parentElement, offOf = fr => ({ x: fr.offsetLeft, y: fr.offsetTop });
  const ENTER = {
    f1(fr) {
      const wrap = wrapOf(fr), me = Cur(wrap, 'Роман', '#6CA7FF');
      const d = drawFrame(wrap, fr, 0, me);
      const h = $('#f1-h'), hp = relTo(h, wrap);
      me.to(hp.x - 4, hp.y + 10, d.end - 120, { duration: 360, easing: EIO }); me.press(d.end + 220);
      const tT = typeText(h, d.end + 300);
      me.off(d.end + 420);
      rise([$('.f1-copy .f-p', fr)], tT - 80);
      $$('.facts li', fr).forEach((li, i) => {
        A(li, [{ opacity: 0 }, { opacity: 1 }], { duration: 160, delay: tT + 120 + i * 120 });
        A(li, [{ transform: 'translateX(-24px) scale(.8)' }, { transform: 'none' }], { ...SP.jelly, delay: tT + 120 + i * 120 });
      });
      // the giant cursor brings the circle in and lets go; the triangle is placed with a spin
      const circ = $('#gCirc'), cur = $('#gCur'), tri = $('#gTri'), t2 = d.end + 160;
      A(circ, [{ transform: 'translate(46%,70%) rotate(16deg)' }, { transform: 'none' }], { ...SP.drag, delay: t2 });
      A(cur, [{ transform: 'translate(150%,140%) rotate(16deg)' }, { transform: 'translate(-34%,-30%)' }], { ...SP.drag, delay: t2 });
      A(cur, [{ transform: 'translate(-34%,-30%)' }, { transform: 'none' }], { ...SP.jelly, delay: t2 + SP.drag.duration * .55, composite: 'replace', fill: 'forwards' });
      A(circ, [{ scale: '1.06' }, { scale: '1.06' }], { duration: 1, delay: 0, fill: 'backwards' });
      A(circ, [{ scale: '1.06' }, { scale: '1' }], { ...SP.jelly, delay: t2 + SP.drag.duration * .5, fill: 'none' });
      A(tri, [{ opacity: 0, transform: 'scale(.2) rotate(-70deg)' }, { opacity: 1, transform: 'none' }], { ...SP.jelly, delay: t2 + 460 });
      d.deselect(tT + 700);
    },
    fm(fr) {
      const wrap = wrapOf(fr), me = Cur(wrap, 'Роман', '#6CA7FF');
      const d = drawFrame(wrap, fr, 0, me);
      const h = $('#fm-h'), hp = relTo(h, wrap);
      me.to(hp.x - 4, hp.y + 10, d.end - 120, { duration: 360, easing: EIO }); me.press(d.end + 220);
      const tT = typeText(h, d.end + 300, 40); me.off(d.end + 420);
      rise([$('.f-p', fr)], tT - 60);
      // every number is measured like a layer: the ruler stretches out, the value counts up
      $$('.mt', fr).forEach((m, i) => {
        const t0 = tT + 120 + i * 140;
        A($('.mt-c', m), [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }], { ...SP.pop, delay: t0 });
        A($('.mt-n', m), [{ opacity: 0, transform: 'translateY(.3em)' }, { opacity: 1, transform: 'none' }], { ...SP.soft, delay: t0 + 60 });
        A($('.mt-r', m), [{ transform: 'scaleX(0)' }, { transform: 'none' }], { ...SP.drag, delay: t0 + 160 });
        rise([$('p', m)], t0 + 220);
        const v = $('.mt-v', m), txt = v.textContent, mm = txt.match(/^(\D*)([\d\s]+)$/);
        if (mm) {
          const pre = mm[1], to = parseInt(mm[2].replace(/\s/g, ''), 10), dur = 900;
          setTimeout(() => { const s0 = performance.now(); const step = () => { const k = Math.min(1, (performance.now() - s0) / dur), e = 1 - Math.pow(1 - k, 3); v.textContent = pre + Math.round(to * e).toLocaleString('ru-RU').replace(/ /g, ' '); if (k < 1) requestAnimationFrame(step); }; v.textContent = pre + '0'; step(); }, t0 + 60);
        }
      });
      d.deselect(tT + 900);
    },
    f2(fr) {
      const wrap = wrapOf(fr), off = offOf(fr), me = Cur(wrap, 'Роман', '#6CA7FF');
      const d = drawFrame(wrap, fr, 0, me);
      const h = $('#f2-h'), hp = relTo(h, wrap);
      me.to(hp.x - 4, hp.y + 10, d.end - 120, { duration: 360, easing: EIO }); me.press(d.end + 220);
      const tT = typeText(h, d.end + 300); me.off(d.end + 420);
      // every card is brought in by someone from the team
      const W = fr.offsetWidth, H = fr.offsetHeight;
      const who = [['Роман', '#6CA7FF', '#fff'], ['PM', '#FF8AD8', '#0B0B0C'], ['Dev', '#FFD43B', '#0B0B0C'], ['Legal', '#FF7A45', '#0B0B0C'], ['Финансы', '#2F5CFF', '#fff'], ['Дизайн-система', '#8E5CFF', '#fff']];
      const from = [[-W * .45, H * .2, -10], [-W * .1, -H * .5, 8], [W * .45, H * .15, -8], [W * .5, H * .35, 12], [W * .1, H * .75, -8], [-W * .45, H * .4, 10]];
      let tL = 0;
      OBJ.forEach((o, i) => {
        const pos = mqSmall.matches ? { x: o.el.offsetLeft, y: o.el.offsetTop } : { x: o.d.x, y: o.d.y };
        tL = carry(o.el, wrap, off, pos, from[i], d.end + 120 + i * 300, Cur(wrap, who[i][0], who[i][1], who[i][2]));
      });
      drawLinks(); const t = tL + 200;
      $$('#links path').forEach((p, i) => { const L = p.getTotalLength(); A(p, [{ strokeDasharray: L, strokeDashoffset: L }, { strokeDasharray: L, strokeDashoffset: 0 }], { duration: 520, delay: t + i * 140, easing: EIO, fill: 'backwards' }); });
      $$('#links rect').forEach((r, i) => A(r, [{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'none' }], { ...SP.pop, delay: t + (i >> 1) * 140 + (i & 1) * 480, fill: 'backwards' }));
      d.deselect(tT + 300);
    },
    fx(fr) {
      const wrap = wrapOf(fr), me = Cur(wrap, 'Роман', '#6CA7FF');
      const d = drawFrame(wrap, fr, 0, me);
      const h = $('#fx-h'), hp = relTo(h, wrap);
      me.to(hp.x - 4, hp.y + 10, d.end - 120, { duration: 360, easing: EIO }); me.press(d.end + 220);
      const tT = typeText(h, d.end + 300); me.off(d.end + 420);
      rise([$('.fx-all', fr), ...$$('.fx-i', fr)], tT, 110);
      d.deselect(tT + 500);
    },
    f3(fr) {
      const wrap = wrapOf(fr), me = Cur(wrap, 'Роман', '#6CA7FF');
      const d = drawFrame(wrap, fr, 0, me);
      const h = $('#f3-h'), hp = relTo(h, wrap);
      me.to(hp.x - 4, hp.y + 10, d.end - 120, { duration: 360, easing: EIO }); me.press(d.end + 220);
      const tT = typeText(h, d.end + 300, 60);
      rise([$('.f3-side .f-p')], tT);
      A($('.g-cur3'), [{ transform: 'translate(-60%,60%) rotate(-30deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { ...SP.drag, delay: tT + 200 });
      // auto layout: the cursor adds each job on top, from the first one to the latest; the rest move down
      const al = $('#al'), ap = relTo(al, wrap), rows = $$('.row', fr).reverse(), t0 = tT + 120;
      me.to(ap.x + ap.w - 30, ap.y - 18, t0 - 300, { duration: 420, easing: EIO });
      rows.forEach((row, i) => {
        const hh = row.offsetHeight, cs = getComputedStyle(row), dd = t0 + i * 230;
        me.press(dd - 40);
        row.animate([{ height: '0px', paddingTop: '0px', paddingBottom: '0px', opacity: 0, overflow: 'hidden' },
                     { height: hh + 'px', paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, opacity: 1, overflow: 'hidden' }],
                    { ...SP.soft, delay: dd, fill: 'backwards' });
        $$(':scope > span', row).forEach((s, k) => s.animate([{ transform: 'translateY(-14px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { ...SP.pop, delay: dd + 60 + k * 30, fill: 'backwards' }));
      });
      const tE = t0 + rows.length * 230;
      me.off(tE + 100); d.deselect(tE + 300);
    },
    f4(fr) {
      const wrap = wrapOf(fr), off = offOf(fr), me = Cur(wrap, 'Роман', '#6CA7FF');
      const d = drawFrame(wrap, fr, 0, me);
      const h = $('#f4-h'), hp = relTo(h, wrap);
      me.to(hp.x - 4, hp.y + 10, d.end - 120, { duration: 360, easing: EIO }); me.press(d.end + 220);
      const tT = typeText(h, d.end + 300, 22);
      // the Telegram button is dragged in from the assets, the e-mail one is an Alt-drag copy of it
      const mp = relTo(meCard, fr);
      carry(meCard, wrap, off, { x: mp.x, y: mp.y }, [fr.offsetWidth - mp.x + 40, 80, 10], d.end + 140, Cur(wrap, 'Роман', '#6CA7FF'), 60, 34);
      const [tg, em] = $$('.cta-b', fr), tp0 = relTo(tg, fr), ep = relTo(em, fr);
      const tC = carry(tg, wrap, off, { x: tp0.x, y: tp0.y }, [-tp0.x - tp0.w - 60, 140, -8], tT - 200, me, 40, 30);
      const dx = tp0.x - ep.x, gx = 40, gy = 30, t5 = tC + 260;
      const me2 = Cur(wrap, '⌥ копия', '#0B0B0C');
      me2.at(off.x + tp0.x + gx, off.y + tp0.y + gy, t5); me2.press(t5 + 80, 300);
      A(em, [{ opacity: 0 }, { opacity: 1 }], { duration: 1, delay: t5 + 120 });
      A(em, [{ transform: `translateX(${dx}px)` }, { transform: 'none' }], { ...SP.drag, delay: t5 + 120 });
      me2.to(off.x + ep.x + gx, off.y + ep.y + gy, t5 + 120, SP.drag); me2.off(t5 + 120 + SP.drag.duration * .7);
      A($('.g-circ4'), [{ transform: 'scale(0)' }, { transform: 'none' }], { ...SP.jelly, delay: d.end });
      A($('.g-tri4'), [{ transform: 'translateY(-60%) rotate(-40deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { ...SP.drag, delay: d.end + 120 });
      const tc = t5 + 300;
      d.deselect(tc + 400);
    }
  };
  const frames = $$('.frm').filter(f => f.id !== 'f0');
  if (!reduce && 'IntersectionObserver' in window) {
    frames.forEach(f => f.classList.add('pre'));
    // watch the frame's wrapper: the frame itself is clipped to nothing until it is drawn
    const io = new IntersectionObserver(es => es.forEach(e => {
      const fr = e.target.querySelector('.frm');
      if (!e.isIntersecting || root.classList.contains('is-loading') || !fr.classList.contains('pre')) return;
      io.unobserve(e.target); ENTER[fr.id](fr); fr.classList.remove('pre');
    }), { threshold: .14 });
    frames.forEach(f => io.observe(f.parentElement));
    addEventListener('vasnev:ready', () => frames.forEach(f => { if (f.classList.contains('pre')) { io.unobserve(f.parentElement); io.observe(f.parentElement); } }));
  } else drawLinksSoon();
  function drawLinksSoon() { requestAnimationFrame(() => drawLinks()); }

  /* ---------- dragging: hold, tilt with the hand's speed, lift, settle on a spring ---------- */
  const active = new Set();
  function Draggable(el, o = {}) {
    const d = { el, x: 0, y: 0, r0: o.r || 0, tilt: 0, vt: 0, s: 1, vs: 0, held: false, px: 0, vx: 0, onMove: o.onMove, onDrop: o.onDrop, bound: o.bound, can: o.can || (() => true) };
    d.set = () => { el.style.translate = `${d.x.toFixed(1)}px ${d.y.toFixed(1)}px`; el.style.rotate = (d.r0 + d.tilt).toFixed(2) + 'deg'; el.style.scale = d.s.toFixed(4); };
    let sx, sy, ox, oy, lastX, lastT;
    el.addEventListener('pointerdown', e => {
      if (e.button !== 0 || !d.can() || e.pointerType === 'touch') return;
      e.preventDefault(); el.setPointerCapture(e.pointerId);
      d.held = true; el.classList.add('held'); hideTip();
      sx = e.clientX; sy = e.clientY; ox = d.x; oy = d.y; lastX = e.clientX; lastT = performance.now(); d.vx = 0;
      active.add(d); o.onStart && o.onStart(d);
    });
    el.addEventListener('pointermove', e => {
      if (!d.held) return;
      const now = performance.now(), dt = Math.max(8, now - lastT);
      d.vx = d.vx * .6 + ((e.clientX - lastX) / dt * 16) * .4; lastX = e.clientX; lastT = now;
      let nx = ox + e.clientX - sx, ny = oy + e.clientY - sy;
      if (d.bound) [nx, ny] = d.bound(nx, ny, d);
      d.x = nx; d.y = ny;
      if (d.onMove) d.onMove(d);
    });
    const up = () => { if (!d.held) return; d.held = false; el.classList.remove('held'); d.onDrop && d.onDrop(d); };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    return d;
  }
  function stepDrag(d) {
    const tt = d.held ? clamp(d.vx * 1.1, -9, 9) : 0;
    d.vx *= .85;
    d.vt += (tt - d.tilt) * .12; d.vt *= .78; d.tilt += d.vt;
    const st = d.held ? 1.05 : 1;
    d.vs += (st - d.s) * .16; d.vs *= .72; d.s += d.vs;
    d.set();
    if (!d.held && Math.abs(d.tilt) < .02 && Math.abs(d.vt) < .02 && Math.abs(d.s - 1) < .0005 && Math.abs(d.vs) < .0005) { d.tilt = 0; d.s = 1; d.set(); active.delete(d); }
  }

  /* 01 · the shapes can be thrown around inside the frame */
  const f1 = $('#f1');
  ['#gTri', '#gCirc', '#gCur'].forEach(sel => {
    const el = $(sel);
    Draggable(el, { r: parseFloat(getComputedStyle(el).rotate) || 0,
      bound: (x, y, d) => {
        const fr = f1.getBoundingClientRect(), r = el.getBoundingClientRect();
        const bx = r.left - d.x, by = r.top - d.y, w = r.width * .35, h = r.height * .35;
        return [clamp(x, fr.left - bx - r.width + w, fr.right - bx - w), clamp(y, fr.top - by - r.height + h, fr.bottom - by - h)];
      }
    });
  });

  /* 02 · cards on the canvas: snapping, smart guides, live connectors */
  const canvas = $('#canvas'), linksSvg = $('#links'), guides = $('#guides'), resetBtn = $('#reset');
  const OBJ = (canvas ? $$('.obj', canvas) : []).map(el => ({ el, dy: +el.dataset.dy, r: +el.dataset.r }));
  const CW = () => canvas.clientWidth, CH = () => canvas.clientHeight;
  const place = o => { o.d.x = o.fx * CW(); o.d.y = o.fy * CH(); o.d.set(); };
  const box = o => ({ l: o.d.x, t: o.d.y, w: o.el.offsetWidth, h: o.el.offsetHeight });
  OBJ.forEach(o => {
    o.fx = o.fx0; o.fy = o.fy0;
    o.d = Draggable(o.el, {
      r: o.r, can: () => !mqSmall.matches,
      bound: (x, y) => [clamp(x, 8, CW() - o.el.offsetWidth - 8), clamp(y, 8, CH() - o.el.offsetHeight - 8)],
      onMove: d => { snap(o); o.fx = d.x / CW(); o.fy = d.y / CH(); drawLinks(); },
      onDrop: () => { o.moved = true; guides.innerHTML = ''; resetBtn.hidden = false; }
    });
  });
  /* two rows of three, a snake: 01-02-03 left to right, 04-05-06 right to left, so the connectors never cross.
     The rows and the frame are measured from the real cards, so nothing is ever cut off, whatever the width and the text */
  function layoutCards() {
    if (!canvas) return;
    const fr = canvas.parentElement;
    if (mqSmall.matches) { fr.style.height = ''; return; } if (!CW()) return; /* hidden on another page: the switch back fires a resize */
    const head = $('.f2-head', fr), pad = parseFloat(getComputedStyle(head).left), n = OBJ.length / 2, W = CW();
    const rowH = r => Math.max(...OBJ.slice(r * n, (r + 1) * n).map(o => o.el.offsetHeight + o.dy));
    const y1 = head.offsetTop + head.offsetHeight + 44, y2 = y1 + rowH(0) + 76;
    OBJ.forEach((o, i) => {
      const col = i < n ? i : OBJ.length - 1 - i;
      o.fx0 = (pad + col * (W - 2 * pad - o.el.offsetWidth) / (n - 1)) / W;
      o.fy0 = (i < n ? y1 : y2) + o.dy;
    });
    /* keeps room for «Вернуть как было» under the last row */
    fr.style.height = y2 + rowH(1) + 84 + 'px';
    OBJ.forEach(o => { o.fy0 /= CH(); if (!o.moved) { o.fx = o.fx0; o.fy = o.fy0; } place(o); });
  }
  layoutCards();
  if (document.fonts) document.fonts.ready.then(() => { layoutCards(); if (linksSvg && linksSvg.firstChild) drawLinks(); });
  function snap(o) {
    const T = 7, b = box(o), xs = [b.l, b.l + b.w / 2, b.l + b.w], ys = [b.t, b.t + b.h / 2, b.t + b.h];
    let bx = null, by = null;
    OBJ.forEach(p => {
      if (p === o) return; const q = box(p);
      [q.l, q.l + q.w / 2, q.l + q.w].forEach(qx => xs.forEach(x => { const dd = qx - x; if (Math.abs(dd) < T && (!bx || Math.abs(dd) < Math.abs(bx.dd))) bx = { dd, at: qx, q }; }));
      [q.t, q.t + q.h / 2, q.t + q.h].forEach(qy => ys.forEach(y => { const dd = qy - y; if (Math.abs(dd) < T && (!by || Math.abs(dd) < Math.abs(by.dd))) by = { dd, at: qy, q }; }));
    });
    if (bx) o.d.x += bx.dd; if (by) o.d.y += by.dd;
    const n = box(o); let html = '';
    if (bx) { const t = Math.min(n.t, bx.q.t) - 12, bt = Math.max(n.t + n.h, bx.q.t + bx.q.h) + 12; html += `<i class="v" style="left:${bx.at}px;top:${t}px;height:${bt - t}px"></i>`; }
    if (by) { const l = Math.min(n.l, by.q.l) - 12, r = Math.max(n.l + n.w, by.q.l + by.q.w) + 12; html += `<i class="h" style="top:${by.at}px;left:${l}px;width:${r - l}px"></i>`; }
    html += `<b style="left:${n.l + n.w / 2}px;top:${n.t + n.h + 14}px">X ${Math.round(n.l)} · Y ${Math.round(n.t)}</b>`;
    guides.innerHTML = html;
  }
  function drawLinks() {
    if (!canvas || mqSmall.matches) return;
    let html = '';
    for (let i = 0; i < OBJ.length - 1; i++) {
      const a = box(OBJ[i]), b = box(OBJ[i + 1]);
      const acx = a.l + a.w / 2, acy = a.t + a.h / 2, bcx = b.l + b.w / 2, bcy = b.t + b.h / 2;
      let p1, p2, c1, c2;
      if (Math.abs(bcx - acx) > Math.abs(bcy - acy) * .9) {
        const dir = bcx > acx ? 1 : -1;
        p1 = [acx + dir * a.w / 2, acy]; p2 = [bcx - dir * b.w / 2, bcy];
        const k = Math.max(40, Math.abs(p2[0] - p1[0]) * .5); c1 = [p1[0] + dir * k, p1[1]]; c2 = [p2[0] - dir * k, p2[1]];
      } else {
        const dir = bcy > acy ? 1 : -1;
        p1 = [acx, acy + dir * a.h / 2]; p2 = [bcx, bcy - dir * b.h / 2];
        const k = Math.max(40, Math.abs(p2[1] - p1[1]) * .5); c1 = [p1[0], p1[1] + dir * k]; c2 = [p2[0], p2[1] - dir * k];
      }
      const f = v => v.toFixed(1);
      html += `<path d="M${f(p1[0])} ${f(p1[1])}C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}"/>`;
      html += `<rect x="${f(p1[0] - 5)}" y="${f(p1[1] - 5)}" width="10" height="10" rx="2"/><rect x="${f(p2[0] - 5)}" y="${f(p2[1] - 5)}" width="10" height="10" rx="2"/>`;
    }
    linksSvg.innerHTML = html;
  }
  if (resetBtn) resetBtn.addEventListener('click', () => {
    OBJ.forEach((o, i) => {
      const x0 = o.d.x, y0 = o.d.y; o.moved = false; o.fx = o.fx0; o.fy = o.fy0; place(o);
      o.el.animate([{ translate: `${x0}px ${y0}px` }, { translate: `${o.d.x}px ${o.d.y}px` }], { ...SP.drag, delay: i * 40, fill: 'backwards' });
    });
    const t0 = performance.now(), loop = () => { drawLinksAnimated(); if (performance.now() - t0 < SP.drag.duration + 200) requestAnimationFrame(loop); else drawLinks(); };
    loop(); resetBtn.hidden = true;
  });
  // while the reset spring runs, read the live positions from the animation
  function drawLinksAnimated() {
    const saved = OBJ.map(o => [o.d.x, o.d.y]);
    OBJ.forEach(o => { const t = getComputedStyle(o.el).translate.split(' '); o.d.x = parseFloat(t[0]) || 0; o.d.y = parseFloat(t[1]) || 0; });
    drawLinks(); OBJ.forEach((o, i) => { o.d.x = saved[i][0]; o.d.y = saved[i][1]; });
  }
  addEventListener('resize', () => { layoutCards(); drawLinks(); });

  /* 04 · my inspector card: avatar from the first screen, can be moved like any layer */
  const meCard = $('#me');
  Draggable(meCard, { can: () => !mqSmall.matches, bound: (x, y) => {
    const fr = $('#f4').getBoundingClientRect(), w = meCard.offsetWidth, h = meCard.offsetHeight;
    return [clamp(x, fr.left - meCard._bx + 8, fr.right - meCard._bx - w - 8), clamp(y, fr.top - meCard._by + 8, fr.bottom - meCard._by - h - 8)];
  }, onStart: d => { const r = meCard.getBoundingClientRect(); meCard._bx = r.left - d.x; meCard._by = r.top - d.y; } });

  /* 04 · inside the last frame the visitor gets a cursor with a name, like a guest in the file */
  const f4 = $('#f4'), you = $('#you'), yc = { x: 0, y: 0, tx: 0, ty: 0, on: false };
  f4.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const r = f4.getBoundingClientRect(); yc.tx = e.clientX - r.left; yc.ty = e.clientY - r.top;
    if (!yc.on) { yc.x = yc.tx; yc.y = yc.ty; yc.on = true; you.classList.add('on'); }
  });
  f4.addEventListener('pointerleave', () => { yc.on = false; you.classList.remove('on'); });
  f4.addEventListener('pointerdown', () => you.classList.add('press'));
  addEventListener('pointerup', () => you.classList.remove('press'));

  /* ---------- first screen: the frame is drawn, the name typed, the AI chat brought in ---------- */
  const f0 = $('#f0'), heroWrap = $('#heroWrap');

  /* ---------- first screen: tags and tool icons fall into the space under the text, like on the old site ---------- */
  const BDG = [['UX research', 'blue'], ['UI design', 'violet'], ['Product discovery'], ['Design system', 'yellow'], ['Atomic design', 'lilac'], ['Design tokens'], ['Components', 'blue'], ['Variants'], ['Auto layout'], ['Wireframes', 'yellow'], ['Prototyping', 'lilac'], ['User flow'], ['CJM', 'blue'], ['JTBD', 'violet'], ['Personas'], ['Usability testing', 'yellow'], ['A/B testing'], ['Heuristics'], ['Information architecture', 'blue'], ['Accessibility', 'violet'], ['WCAG'], ['Apple HIG', 'yellow'], ['Grid system', 'lilac'], ['Typography'], ['Microinteractions', 'blue'], ['Motion design'], ['Onboarding'], ['Edge cases', 'yellow'], ['Empty states', 'lilac'], ['Error states'], ['Dark mode', 'blue'], ['Responsive', 'violet'], ['Mobile first'], ['Pixel perfect', 'yellow'], ['Handoff'], ['Dev Mode'], ['MCP', 'blue'], ['React', 'violet'], ['TypeScript'], ['Next.js', 'yellow'], ['Tailwind', 'lilac'], ['shadcn/ui'], ['CSS', 'blue'], ['Git'], ['Storybook'], ['Metrics', 'yellow'], ['Retention', 'lilac'], ['Conversion'], ['Funnel', 'blue'], ['North Star', 'violet'], ['Hypotheses'], ['MVP', 'yellow'], ['Roadmap'], ['Scrum'], ['Stakeholders', 'blue'], ['Fintech', 'violet'], ['Payments'], ['KYC', 'yellow'], ['B2B', 'lilac'], ['SaaS'], ['Marketplace', 'blue'], ['E-commerce'], ['Web3'], ['Dashboards', 'yellow'], ['Data viz', 'lilac'], ['AI'], ['LLM', 'blue'], ['Product Designer', 'violet']];
  const BDG_IC = ['figma', 'figma-dev', 'pixso', 'claude', 'chatgpt', 'perplexity', 'react', 'github', 'jitter', 'higgsfield', 'react-bits', 'blender', 'photoshop', 'illustrator', 'maze', 'yandex-metrika'];
  const ICONS = {"figma": "img/6badde7bbf.png", "figma-dev": "img/9501b9bb34.png", "pixso": "img/5208e1e042.png", "claude": "img/2e9e6ac44f.png", "chatgpt": "img/9843982ec1.png", "perplexity": "img/dfb9f7da54.png", "react": "img/45e5e5165f.png", "github": "img/bb453e886d.png", "jitter": "img/a5473cca98.png", "higgsfield": "img/0472875266.png", "react-bits": "img/0b1c82dfec.png", "blender": "img/e662b86a02.png", "photoshop": "img/f5c800b2d7.png", "illustrator": "img/f092a52815.png", "maze": "img/36ad370ede.png", "yandex-metrika": "img/28e3551ea7.png"};
  const h0Drop = $('#h0Drop');
  let dEng = null, dBodies = [], dRun = false, dLast = 0, dAcc = 0, dDrag = null, dW = 0;
  const DT = 1000 / 120, rr = (a, b) => a + Math.random() * (b - a);
  function dropLayout() {
    const fr = f0.getBoundingClientRect(), ai = $('#ai').getBoundingClientRect();
    h0Drop.style.width = Math.round(ai.left - fr.left - 24) + 'px';
  }
  let dGen = 0;
  window.__dropReset = () => { dGen++; dRun = false; dEng = null; dBodies = []; dDrag = null; h0Drop.innerHTML = ''; };
  function dropInit() {
    const gen = ++dGen;
    if (!window.Matter || mqSmall.matches) { h0Drop.innerHTML = ''; return; }
    const { Engine, Bodies, Composite } = Matter;
    dropLayout();
    const W = h0Drop.clientWidth, H = h0Drop.clientHeight, t = 200; dW = W;
    dEng = Engine.create({ enableSleeping: true, positionIterations: 20, velocityIterations: 14 }); dEng.gravity.y = 2.1;
    Composite.add(dEng.world, [Bodies.rectangle(W / 2, H + t / 2 - 2, W * 3, t, { isStatic: true, friction: 1 }), Bodies.rectangle(-t / 2, H / 2 - 600, t, H + 1600, { isStatic: true }), Bodies.rectangle(W + t / 2, H / 2 - 600, t, H + 1600, { isStatic: true })]);
    h0Drop.innerHTML = '';
    const items = BDG.map(b => ({ t: b[0], c: b[1] })).concat(BDG_IC.map(k => ({ i: k }))).sort(() => Math.random() - .5);
    const cta = $('.h0-cta').getBoundingClientRect(), zr = h0Drop.getBoundingClientRect();
    const room = W * Math.max(0, zr.bottom - cta.bottom - 28) * .62;
    let used = 0;
    dBodies = items.map(it => {
      const el = document.createElement('div');
      if (it.i) { el.className = 'bdg ico'; const src = ICONS[it.i]; if (src) el.style.backgroundImage = `url("${src}")`; }
      else { el.className = 'bdg' + (it.c ? ' c-' + it.c : ''); el.textContent = it.t; }
      h0Drop.appendChild(el);
      const w = el.offsetWidth, h = el.offsetHeight;
      if (used + w * h > room) { el.remove(); return null; }
      used += w * h;
      const b = Bodies.rectangle(rr(w / 2 + 4, W - w / 2 - 4), -80, w, h, { chamfer: { radius: it.i ? 15 : 15 }, restitution: .04, friction: .9, frictionStatic: 1.4, frictionAir: .012, density: .006, sleepThreshold: 40 });
      b.el = el; b.w = w; b.h = h; dragBadge(b); return b;
    }).filter(Boolean);
    const place = (b, y) => { const { Body } = Matter; Body.setPosition(b, { x: b.position.x, y }); Body.setAngle(b, rr(-.7, .7)); Composite.add(dEng.world, b); Body.setVelocity(b, { x: rr(-1.2, 1.2), y: rr(3, 6) }); Body.setAngularVelocity(b, rr(-.04, .04)); };
    if (reduce) { dBodies.forEach((b, i) => place(b, -60 - i * 45)); for (let i = 0; i < 1800; i++) Engine.update(dEng, DT); dRender(); dBodies.forEach(b => b.el.style.visibility = 'visible'); return; }
    dBodies.forEach((b, i) => setTimeout(() => { if (gen !== dGen) return; place(b, -60 - rr(0, 160)); b.el.style.visibility = 'visible'; dWake(); }, i * 38));
  }
  function dRender() { dBodies.forEach(b => { b.el.style.transform = `translate(${(b.position.x - b.w / 2).toFixed(1)}px,${(b.position.y - b.h / 2).toFixed(1)}px) rotate(${b.angle.toFixed(4)}rad)`; }); }
  /* the pile only simulates while it is on screen, and stops once it has settled (a pile never fully «sleeps») */
  let dVis = true, dCalm = 0;
  new IntersectionObserver(es => { dVis = es[0].isIntersecting; if (dVis) dWake(); }).observe(h0Drop);
  function dTick(ts) {
    if (!dEng) { dRun = false; return; }
    if (!dVis || document.hidden || !h0Drop.clientWidth) { dRun = false; dLast = 0; dAcc = 0; return; }
    if (!dLast) dLast = ts; dAcc += Math.min(50, ts - dLast); dLast = ts;
    while (dAcc >= DT) { Matter.Engine.update(dEng, DT); dAcc -= DT; }
    dRender();
    const all = dEng.world.bodies.length - 3 === dBodies.length;
    const still = dBodies.every(b => b.isSleeping || (b.speed < .06 && Math.abs(b.angularSpeed) < .002));
    dCalm = all && !dDrag && still ? dCalm + 1 : 0;
    if (dCalm > 45) { dRun = false; dLast = 0; dAcc = 0; dCalm = 0; return; }
    requestAnimationFrame(dTick);
  }
  function dWake() { dCalm = 0; if (!dRun) { dRun = true; dLast = 0; requestAnimationFrame(dTick); } }
  function dLocal(e) { const r = h0Drop.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function dragBadge(b) {
    const el = b.el;
    el.addEventListener('pointerdown', e => {
      if (!dEng.world.bodies.includes(b) || e.pointerType === 'touch') return; e.preventDefault(); el.setPointerCapture(e.pointerId); el.classList.add('held'); hideTip();
      const p = dLocal(e), dx = p.x - b.position.x, dy = p.y - b.position.y, c = Math.cos(-b.angle), s = Math.sin(-b.angle);
      dDrag = Matter.Constraint.create({ pointA: p, bodyB: b, pointB: { x: dx * c - dy * s, y: dx * s + dy * c }, stiffness: .12, damping: .08, length: 0 });
      Matter.Composite.add(dEng.world, dDrag); Matter.Sleeping.set(b, false); dWake();
    });
    el.addEventListener('pointermove', e => { if (!dDrag || dDrag.bodyB !== b) return; dDrag.pointA = dLocal(e); Matter.Sleeping.set(b, false); });
    const end = () => { if (dDrag && dDrag.bodyB === b) { Matter.Composite.remove(dEng.world, dDrag); dDrag = null; el.classList.remove('held'); dBodies.forEach(x => Matter.Sleeping.set(x, false)); dWake(); } };
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  }
  let dRT; addEventListener('resize', () => { clearTimeout(dRT); dRT = setTimeout(() => { if (!dEng && !mqSmall.matches) return; if (!h0Drop.offsetParent) return; dropLayout(); if (Math.abs(h0Drop.clientWidth - dW) > 8 || mqSmall.matches) dropInit(); }, 250); });

  /* phones: the assistant leaves the first frame and stands as its own block right under it */
  const aiBox = $('#ai'), aiSlot = aiBox.parentElement, aiNext = aiBox.nextSibling;
  const placeAI = () => {
    if (mqSmall.matches) { if (aiBox.parentElement !== heroWrap) heroWrap.appendChild(aiBox); }
    else if (aiBox.parentElement !== aiSlot) aiSlot.insertBefore(aiBox, aiNext);
  };
  placeAI(); mqSmall.addEventListener('change', () => { placeAI(); flowLayout(); });

  window.__heroBuild = (d0 = 0) => {
    heroReset();
    if (reduce) { f0.classList.remove('pre'); dropInit(); return; }
    setTimeout(() => {
      f0.classList.remove('pre');
      const off = offOf(f0), me = Cur(heroWrap, 'Роман', '#6CA7FF');
      const d = drawFrame(heroWrap, f0, 0, me);
      const hh = $('#f0-h'), hp = relTo(hh, heroWrap);
      me.to(hp.x - 4, hp.y + 10, d.end - 120, { duration: 360, easing: EIO }); me.press(d.end + 220);
      const tT = typeText(hh, d.end + 300, 40); me.off(d.end + 420);
      const role = $('.h0-role');
      if (role) { A(role, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: tT - 120 }); A(role, [{ transform: 'translateY(8px)' }, { transform: 'none' }], { ...SP.jelly, delay: tT - 120 }); }
      rise([$('.h0-lead')], tT - 60);
      $$('.h0-cta a').forEach((a, i) => { A(a, [{ opacity: 0 }, { opacity: 1 }], { duration: 160, delay: tT + 140 + i * 90 }); A(a, [{ transform: 'translateY(10px) scale(.94)' }, { transform: 'none' }], { ...SP.jelly, delay: tT + 140 + i * 90 }); });
      const ai = $('#ai'), ap = relTo(ai, f0);
      const tAI = carry(ai, heroWrap, off, { x: ap.x, y: ap.y }, [f0.offsetWidth - ap.x + 60, 120, 8], d.end + 260, Cur(heroWrap, 'AI', '#8E5CFF'), 70, 30);
      d.deselect(tT + 600);
      const g0 = dGen; setTimeout(() => { if (g0 === dGen) dropInit(); }, Math.max(tT + 700, tAI + 400));
    }, d0);
  };

  /* ---------- footer playground: shapes fall onto the wordmark and pile up on the letters ---------- */
  const ftPlay = $('#ftPlay'), ftCv = $('#ftWord'), FT = $$('.fts', ftPlay).map((el, i) => ({ el, i, x: 0, y: 0, vx: 0, vy: 0, a: 0, w: 0, r: 0, s: 0, live: false, held: false }));
  let ftTop = [], ftW = 0, ftH = 0, ftOn = false, ftSleep = 0, ftStarted = false, ftG = 2600;
  function ftLayout() {
    ftW = ftPlay.clientWidth; if (!ftW) return;
    const dpr = Math.min(2, devicePixelRatio || 1), ctx = ftCv.getContext('2d');
    const fam = getComputedStyle(document.body).fontFamily;
    ctx.font = `500 100px ${fam}`; ctx.letterSpacing = '-6px';
    const m = ctx.measureText('vasnev.art'), fs = 100 * ftW / (m.actualBoundingBoxRight + m.actualBoundingBoxLeft) * .995;
    ctx.font = `500 ${fs}px ${fam}`; ctx.letterSpacing = (-.06 * fs) + 'px';
    const m2 = ctx.measureText('vasnev.art'), asc = m2.actualBoundingBoxAscent, desc = m2.actualBoundingBoxDescent;
    const wh = Math.ceil(asc + desc + 2);
    const size = Math.max(64, Math.min(170, ftW * .105));
    ftH = Math.round(wh + size * 1.7);
    ftPlay.style.height = ftH + 'px';
    ftCv.width = Math.round(ftW * dpr); ftCv.height = Math.round(wh * dpr); ftCv.style.height = wh + 'px';
    const c = ftCv.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, ftW, wh);
    c.font = `500 ${fs}px ${fam}`; c.letterSpacing = (-.06 * fs) + 'px'; c.fillStyle = '#0B0B0C'; c.textBaseline = 'alphabetic';
    c.fillText('vasnev.art', m2.actualBoundingBoxLeft, asc + 1);
    // height map: the first inked row of every column is the surface the shapes rest on
    const img = c.getImageData(0, 0, ftCv.width, ftCv.height).data, cw = ftCv.width, ch = ftCv.height, y0 = ftH - wh;
    ftTop = new Float32Array(Math.ceil(ftW) + 1).fill(ftH);
    for (let x = 0; x <= ftW; x++) {
      const px = Math.min(cw - 1, Math.round(x * dpr));
      for (let y = 0; y < ch; y++) if (img[(y * cw + px) * 4 + 3] > 110) { ftTop[x] = y0 + y / dpr; break; }
    }
    FT.forEach(p => { p.s = size * [1.15, 1, 1.05, .95, .9, .95, .9][p.i]; p.r = p.s * ({ circ: .48, sq: .46, tri: .4, cur: .34, comp: .42, frame: .44, pen: .36 }[p.el.dataset.k] || .44); p.el.style.width = p.el.style.height = p.s + 'px'; });
  }
  // the highest centre a circle of radius r can sit at, x in px
  function ftFloor(x, r) {
    let best = ftH - r;
    for (let c = Math.max(0, Math.floor(x - r)); c <= Math.min(ftW, Math.ceil(x + r)); c += 2) {
      const dx = c - x, h = ftTop[c] - Math.sqrt(Math.max(0, r * r - dx * dx));
      if (h < best) best = h;
    }
    return best;
  }
  function ftDrop(now) {
    ftStarted = true;
    FT.forEach((p, k) => (now ? f => f() : f => setTimeout(f, k * 130))(() => {
      p.x = ftW * (.12 + .76 * ((k * .618) % 1)); p.y = -p.s; p.vx = (Math.random() - .5) * 240; p.vy = 120; p.w = (Math.random() - .5) * 6; p.a = Math.random() * 360;
      p.live = true; p.el.style.opacity = 1; ftSleep = 0;
    }));
  }
  function ftStep(dt) {
    const L = FT.filter(p => p.live);
    L.forEach(p => {
      p.ground = false;
      if (p.sleep && !p.held) return;
      if (p.held) { p.vx = (p.tx - p.x) / dt * .35; p.vy = (p.ty - p.y) / dt * .35; p.w *= .9; }
      else { p.vy += ftG * dt; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      let wall = 0;
      if (p.x < p.r) { p.x = p.r; p.vx = p.vx < -80 ? -p.vx * .4 : 0; wall = -1; }
      if (p.x > ftW - p.r) { p.x = ftW - p.r; p.vx = p.vx > 80 ? -p.vx * .4 : 0; wall = 1; }
      const f = ftFloor(p.x, p.r);
      if (p.y >= f - .5) {
        p.y = Math.min(p.y, f); p.ground = true;
        if (p.vy > 0) p.vy = p.vy > 160 ? -p.vy * .3 : 0;
        const slope = (ftFloor(p.x + 3, p.r) - ftFloor(p.x - 3, p.r)) / 6;   // roll off the curves of the letters
        if (!(wall < 0 && slope < 0) && !(wall > 0 && slope > 0)) p.vx += ftG * slope * dt * .9;   // the wall holds it
        p.vx *= 1 - 3 * dt;
        p.w = p.vx / p.r;
      } else p.w *= 1 - .4 * dt;
      p.a += p.w * dt * 57.2958;
    });
    // contacts: a sleeping shape is a solid support until something hits it hard
    for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) {
      const p = L[i], q = L[j], dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy) || 1, ov = p.r + q.r - d;
      if (ov <= 0) continue;
      const nx = dx / d, ny = dy / d, rv = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
      if (p.sleep && (q.held || rv < -260)) { p.sleep = false; p.rest = 0; }
      if (q.sleep && (p.held || rv < -260)) { q.sleep = false; q.rest = 0; }
      const ip = (p.held || p.sleep) ? 0 : 1, iq = (q.held || q.sleep) ? 0 : 1;
      if (!ip && !iq) continue;
      const k = Math.max(0, ov - .3) / (ip + iq);
      p.x -= nx * k * ip; p.y -= ny * k * ip; q.x += nx * k * iq; q.y += ny * k * iq;
      if (ny > .3) p.ground = true; if (ny < -.3) q.ground = true;   // the upper shape rests on the lower one
      if (rv < 0) { const jj = -(1.12) * rv / (ip + iq); p.vx -= jj * nx * ip; p.vy -= jj * ny * ip; q.vx += jj * nx * iq; q.vy += jj * ny * iq; }
    }
    // a shape that has stayed slow on a support falls asleep and stops moving completely
    L.forEach(p => {
      if (p.held || p.sleep) return;
      const sp = Math.hypot(p.vx, p.vy);
      if (sp < 40 && p.ground) { p.rest = (p.rest || 0) + dt; p.vx *= .8; p.w *= .8; } else p.rest = 0;
      if (p.rest > .3) { p.sleep = true; p.vx = p.vy = p.w = 0; }
      // safety net: anything that barely moved over half a second is settled, whatever the contacts say
      p.chk = (p.chk || 0) + dt;
      if (p.chk > .5) { if (p.cx0 !== undefined && Math.hypot(p.x - p.cx0, p.y - p.cy0) < 2.5) { p.sleep = true; p.vx = p.vy = p.w = 0; } p.chk = 0; p.cx0 = p.x; p.cy0 = p.y; }
    });
    const moving = L.some(p => p.held || !p.sleep);
    ftSleep = moving ? 0 : ftSleep + dt;
  }
  function ftRender() { FT.forEach(p => { if (p.live) p.el.style.transform = `translate(${(p.x - p.s / 2).toFixed(1)}px,${(p.y - p.s / 2).toFixed(1)}px) rotate(${p.a.toFixed(1)}deg)`; }); }
  let ftLast = 0;
  function ftFrame(now) {
    if (!ftOn || !ftStarted || ftSleep > .8) { ftLast = now; return; }
    const el = Math.min(.05, (now - ftLast) / 1000 || 1 / 60); ftLast = now;
    const n = Math.ceil(el / (1 / 240));
    for (let k = 0; k < n; k++) ftStep(el / n);
    ftRender();
  }
  // grab and throw
  FT.forEach(p => {
    p.el.addEventListener('pointerdown', e => {
      if (e.button !== 0 || !p.live) return; e.preventDefault(); p.el.setPointerCapture(e.pointerId);
      const r = ftPlay.getBoundingClientRect(); p.ox = e.clientX - r.left - p.x; p.oy = e.clientY - r.top - p.y;
      p.tx = p.x; p.ty = p.y; p.held = true; p.sleep = false; p.rest = 0; p.chk = 0; p.cx0 = undefined; p.el.classList.add('held'); ftSleep = 0; hideTip();
    });
    p.el.addEventListener('pointermove', e => { if (!p.held) return; const r = ftPlay.getBoundingClientRect(); p.tx = e.clientX - r.left - p.ox; p.ty = Math.min(e.clientY - r.top - p.oy, ftH); ftSleep = 0; });
    const up = () => { if (!p.held) return; p.held = false; p.el.classList.remove('held'); const sp = Math.hypot(p.vx, p.vy), mx = 2600; if (sp > mx) { p.vx *= mx / sp; p.vy *= mx / sp; } };
    p.el.addEventListener('pointerup', up); p.el.addEventListener('pointercancel', up);
  });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    ftLayout();
    if (reduce) {     // no falling: settle them in silence and show the result
      ftDrop(true);
      for (let k = 0; k < 240 * 4; k++) ftStep(1 / 240); ftRender(); return;
    }
    new IntersectionObserver(es => es.forEach(e => {
      ftOn = e.isIntersecting; ftSleep = 0; root.classList.toggle('at-foot', ftOn);
      if (ftOn && !ftStarted && !root.classList.contains('is-loading')) ftDrop();
    }), { threshold: .45 }).observe(ftPlay);
  });
  let ftRW = 0;
  addEventListener('resize', () => { if (Math.abs(ftPlay.clientWidth - ftRW) < 2) return; ftRW = ftPlay.clientWidth; const k = ftPlay.clientWidth / (ftW || 1); ftLayout(); FT.forEach(p => { p.x *= k; p.y = Math.min(p.y, ftFloor(p.x, p.r)); p.sleep = false; p.rest = 0; }); ftSleep = 0; ftRender(); });

  /* ---------- export panel: CV download plays like an export, Moscow time ticks ---------- */
  $$('.xb[data-pending]').forEach(a => { a.dataset.tipSub = 'профиль скоро появится'; a.addEventListener('click', e => e.preventDefault()); });
  const twFmt = new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const twDate = new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow', weekday: 'long', day: 'numeric', month: 'long' });
  let twLastM = '';
  function twTick() {
    const now = new Date(), parts = Object.fromEntries(twFmt.formatToParts(now).map(p => [p.type, p.value]));
    const hm = parts.hour + ':' + parts.minute;
    if (hm !== twLastM) {
      const el = $('#twHM'); el.textContent = hm;
      if (twLastM) el.animate([{ transform: 'translateY(-6px)', opacity: .4 }, { transform: 'none', opacity: 1 }], SP.pop);
      twLastM = hm; $('#twD').textContent = twDate.format(now);
      const mins = (+parts.hour) * 60 + (+parts.minute);
      $('#twBar').style.width = (mins / 1440 * 100).toFixed(2) + '%';
    }
    $('#twS').textContent = ':' + parts.second;
  }
  twTick(); setInterval(twTick, 1000);

  /* ---------- interludes: the scroll types each line; the selection stays on while it is being typed ---------- */
  const ILS = $$('.il-box').map(box => {
    const t = box.querySelector('.il-t'), out = [], walk = document.createTreeWalker(t, NodeFilter.SHOW_TEXT), nodes = [];
    while (walk.nextNode()) nodes.push(walk.currentNode);
    t.setAttribute('aria-label', t.textContent);
    nodes.forEach(nd => { const f = document.createDocumentFragment(); [...nd.textContent].forEach(ch => { const s = document.createElement('span'); s.className = 'tc'; s.textContent = ch; f.appendChild(s); out.push(s); }); nd.replaceWith(f); });
    const caret = document.createElement('i'); caret.className = 'caret'; t.appendChild(caret);
    return { box, t, caret, sz: box.querySelector('.il-sz span'), ch: out.filter(s => s.textContent.trim()), n: -1 };
  });
  function ilFrame() {
    if (reduce) return;
    ILS.forEach(L => {
      const r = L.box.getBoundingClientRect();
      if (r.top > innerHeight * 1.2 && L.n <= 0) return;
      const t = clamp((innerHeight * .88 - r.top) / (innerHeight * .5), 0, 1), n = Math.round(t * L.ch.length);
      if (n === L.n) return; L.n = n;
      L.ch.forEach((s, i) => s.classList.toggle('on', i < n));
      const fs = parseFloat(getComputedStyle(L.t).fontSize), c = L.ch[Math.max(0, n - 1)];
      const x = n ? c.offsetLeft + c.offsetWidth : L.ch[0].offsetLeft, y = c.offsetTop + c.offsetHeight * .5 - fs * .42;
      L.caret.style.height = (fs * .84) + 'px'; L.caret.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
      L.caret.style.opacity = n > 0 && n < L.ch.length ? 1 : 0;
      L.box.classList.toggle('typing', n > 0 && n < L.ch.length);
      L.sz.textContent = Math.round(fs);
    });
  }

  /* ---------- prototype flow: a noodle from each frame to the next, drawn as you scroll ---------- */
  const flow = document.createElement('div');
  flow.className = 'flow'; flow.setAttribute('aria-hidden', 'false');
  flow.innerHTML = '<svg class="flow-s"></svg>';
  document.body.appendChild(flow);
  const flowSvg = flow.firstChild, NAMES = { f1: 'Обо мне', fp: 'Процесс', fx: 'Кейсы', f3: 'Опыт', f4: 'Контакты' };
  // where each node is entered and left (share of its width): the path zigzags, interludes alternate sides
  const FR = { f0: { o: .78 }, f1: { i: .78, o: .55 }, fp: { i: .55, o: .55 }, il2: { i: .55, o: .8 }, fx: { i: .8, o: .5 }, f3: { i: .8, o: .86 }, il4: { i: .55, o: .2 }, f4: { i: .2 } };
  const pairs = [['f0', 'f1'], ['f1', 'fp'], ['fp', 'il2'], ['il2', 'fx'], ['fx', 'f3'], ['f3', 'il4'], ['il4', 'f4']].map(([a, b]) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.innerHTML = '<path class="nd"/><circle class="np" r="6"/><path class="na"/>';
    flowSvg.appendChild(g);
    const chip = document.createElement('button');
    chip.type = 'button'; chip.className = 'fchip-t'; if (!NAMES[b]) chip.hidden = true;
    chip.textContent = `Скролл → ${NAMES[b]}`;
    chip.addEventListener('click', () => { const t = $('#' + b).parentElement; scrollTo({ top: t.getBoundingClientRect().top + scrollY - 110, behavior: 'smooth' }); });
    flow.appendChild(chip);
    return { a: $('#' + a), b: $('#' + b), g, nd: g.children[0], np: g.children[1], na: g.children[2], chip, L: 0, y1: 0, y2: 0 };
  });
  function rulers() { $$('.mt').forEach(m => { $('.mt-r', m).style.width = $('.mt-n', m).offsetWidth + 'px'; }); }
  rulers(); addEventListener('resize', rulers); if (document.fonts) document.fonts.ready.then(rulers);
  /* where a block sits on the page without its transform: the entrance animations carry blocks in from far away, and a line measured mid-flight would stay off for good */
  const pageY = el => { let y = 0; for (let o = el; o; o = o.offsetParent) y += o.offsetTop + (o.offsetParent ? o.offsetParent.clientTop : 0); return y; };
  function flowLayout() {
    const W = document.documentElement.clientWidth, H = document.documentElement.scrollHeight;
    flow.style.height = H + 'px'; flowSvg.setAttribute('viewBox', `0 0 ${W} ${H}`); flowSvg.setAttribute('width', W); flowSvg.setAttribute('height', H);
    pairs.forEach(p => {
      // phones: one straight vertical line through the middle — no zigzag on a narrow screen
      const sm = mqSmall.matches, mid = document.documentElement.clientWidth / 2;
      const ea = sm && p.a.id === 'f0' ? $('#ai') || p.a : p.a, ra = ea.getBoundingClientRect(), rb = p.b.getBoundingClientRect();
      const x1 = sm ? mid : ra.left + ra.width * FR[p.a.id].o, y1 = pageY(ea) + ea.offsetHeight, x2 = sm ? mid : rb.left + rb.width * FR[p.b.id].i, y2 = pageY(p.b) - 2;
      const k = (y2 - y1) * .95;
      p.nd.setAttribute('d', sm ? `M${x1} ${y1}L${x2} ${y2 - 12}` : `M${x1} ${y1}C${x1} ${y1 + k} ${x2} ${y2 - k} ${x2} ${y2 - 12}`);
      p.np.setAttribute('cx', x1); p.np.setAttribute('cy', y1);
      p.na.setAttribute('d', `M${x2 - 7} ${y2 - 19}L${x2} ${y2 - 11}L${x2 + 7} ${y2 - 19}`);
      p.L = p.nd.getTotalLength(); p.nd.style.strokeDasharray = p.L; p.y1 = y1; p.y2 = y2;
      const m = p.nd.getPointAtLength(p.L / 2);
      p.chip.style.left = m.x + 'px'; p.chip.style.top = m.y + 'px';
      p.last = -1;
    });
  }
  function flowFrame() {
    pairs.forEach(p => {
      // starts as the bottom of the frame passes 85% of the screen, finished when the next frame's top reaches 70%
      const a = p.y1 - scrollY - innerHeight * .85, b = p.y2 - scrollY - innerHeight * .7;
      const t = clamp(a >= 0 ? 0 : (-a) / Math.max(1, (-a) + Math.max(0, b)), 0, 1);
      if (Math.abs(t - p.last) < .002) return; p.last = t;
      p.nd.style.strokeDashoffset = (p.L * (1 - t)).toFixed(1);
      p.np.classList.toggle('on', t > 0);
      p.na.classList.toggle('on', t > .985);
      p.chip.classList.toggle('on', t > .5);
    });
  }
  const flowRO = new ResizeObserver(() => { flowLayout(); flowFrame(); });
  flowRO.observe(document.body);
  /* body is locked to the screen height: the assistant growing or shrinking only shows up on the block itself */
  flowRO.observe($('#ai'));
  flowRO.observe($('#fp'));
  addEventListener('resize', () => { flowLayout(); flowFrame(); });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { flowLayout(); flowFrame(); });

  /* ---------- abstract globe: a blue sphere of dots that sways around Moscow ---------- */
  const twG = $('#twG'), twPin = $('#twPin'), gctx = twG.getContext('2d');
  const GD = [];
  for (let la = -75; la <= 75; la += 9) { const n = Math.max(6, Math.round(40 * Math.cos(la * Math.PI / 180))); for (let k = 0; k < n; k++) GD.push([la, k * 360 / n]); }
  let gOn = false, gW = 0;
  new IntersectionObserver(es => { gOn = es[0].isIntersecting; }).observe(twG);
  const MSK = [55.75, 37.62], TILT = 28 * Math.PI / 180;
  function proj(lat, lon, lon0, R) {
    const p = lat * Math.PI / 180, l = (lon - lon0) * Math.PI / 180;
    const x = Math.cos(p) * Math.sin(l), y0 = Math.sin(p), z0 = Math.cos(p) * Math.cos(l);
    const y = y0 * Math.cos(TILT) - z0 * Math.sin(TILT), z = y0 * Math.sin(TILT) + z0 * Math.cos(TILT);
    return [R + x * R, R - y * R, z];
  }
  function globeFrame(now) {
    if (!gOn) return;
    const dpr = Math.min(2, devicePixelRatio || 1), W = twG.clientWidth;
    if (W !== gW) { gW = W; twG.width = W * dpr; twG.height = W * dpr; }
    const R = W / 2, t = reduce ? 0 : now / 1000, lon0 = MSK[1] + 8 + 38 * Math.sin(t * Math.PI * 2 / 18);
    gctx.setTransform(dpr, 0, 0, dpr, 0, 0); gctx.clearRect(0, 0, W, W);
    gctx.fillStyle = '#2F5CFF'; gctx.beginPath(); gctx.arc(R, R, R - 1, 0, Math.PI * 2); gctx.fill();
    GD.forEach(([la, lo]) => {
      const [x, y, z] = proj(la, lo, lon0, R - 1);
      if (z <= 0) return;
      gctx.fillStyle = `rgba(255,255,255,${(.18 + .6 * z).toFixed(3)})`;
      gctx.beginPath(); gctx.arc(x, y, .8 + 1.5 * z, 0, Math.PI * 2); gctx.fill();
    });
    const [mx, my, mz] = proj(MSK[0], MSK[1], lon0, R - 1);
    gctx.fillStyle = '#FFD43B'; gctx.beginPath(); gctx.arc(mx, my, 6, 0, Math.PI * 2); gctx.fill();
    gctx.strokeStyle = 'rgba(255,212,59,.45)'; gctx.lineWidth = 2; gctx.beginPath(); gctx.arc(mx, my, 11 + 3 * Math.sin(t * 3), 0, Math.PI * 2); gctx.stroke();
    twPin.style.transform = `translate(${mx.toFixed(1)}px,${my.toFixed(1)}px)`;
    twPin.style.opacity = mz > .1 ? 1 : 0;
  }

  /* ---------- layers: a small panel that always says which frame you are in, and jumps between them ---------- */
  const LAYERS = [['f0', 'Главная'], ['f1', 'Обо мне'], ['fp', 'Процесс'], ['fx', 'Кейсы'], ['f3', 'Опыт'], ['f4', 'Контакты']];
  const lyr = document.createElement('nav'); lyr.className = 'lyr'; lyr.setAttribute('aria-label', 'Фреймы страницы');
  const HASH = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 1v10M8.5 1v10M1 3.5h10M1 8.5h10"/></svg>';
  lyr.innerHTML = `<ul class="lyr-l" id="lyrL">${LAYERS.map(([id, n], i) => `<li><button type="button" data-id="${id}">${HASH}<span>${n}</span><i>${String(i + 1).padStart(2, '0')}</i></button></li>`).join('')}</ul><button type="button" class="lyr-b" id="lyrB" aria-expanded="false" aria-controls="lyrL"><span class="lyr-h">Слои</span>${HASH}<span id="lyrN">Главная</span><i id="lyrI">1/${LAYERS.length}</i></button>`;
  document.body.appendChild(lyr);
  const lyrB = $('#lyrB');
  const setOpen = o => { lyr.classList.toggle('open', o); lyrB.setAttribute('aria-expanded', String(o)); };
  lyrB.addEventListener('click', () => setOpen(!lyr.classList.contains('open')));
  document.addEventListener('pointerdown', e => { if (!lyr.contains(e.target)) setOpen(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  $$('.lyr-l button', lyr).forEach(b => b.addEventListener('click', () => {
    const t = $('#' + b.dataset.id).parentElement; setOpen(false);
    scrollTo({ top: t.getBoundingClientRect().top + scrollY - (b.dataset.id === 'f0' ? 200 : 110), behavior: reduce ? 'auto' : 'smooth' });
  }));
  let lyrCur = -1;
  function layersFrame() {
    let k = 0; LAYERS.forEach(([id], i) => { if ($('#' + id).getBoundingClientRect().top < innerHeight * .5) k = i; });
    if (k === lyrCur) return; lyrCur = k;
    $('#lyrN').textContent = LAYERS[k][1]; $('#lyrI').textContent = `${k + 1}/${LAYERS.length}`;
    $$('.lyr-l button', lyr).forEach((b, i) => b.classList.toggle('on', i === k));
    if (!reduce) $('#lyrN').animate([{ transform: 'translateY(6px)', opacity: 0 }, { transform: 'none', opacity: 1 }], SP.pop);
  }

  /* ---------- per-frame work ---------- */
  /* scroll-driven pieces live on «Обо мне» only: recompute on scroll / resize / page switch,
     plus a slow safety pass for late layout shifts (fonts, images) */
  let scrollDirty = true, scrollPass = 0;
  const markDirty = () => { scrollDirty = true; };
  addEventListener('scroll', markDirty, { passive: true });
  addEventListener('resize', markDirty);
  addEventListener('vasnev:page', markDirty);
  addEventListener('vasnev:ready', markDirty);
  function frame() {
    const now = performance.now();
    const onAbout = !root.classList.contains('pg-cases') && !root.classList.contains('pg-ui');
    if (onAbout && (scrollDirty || now - scrollPass > 500)) { scrollDirty = false; scrollPass = now; flowFrame(); ilFrame(); layersFrame(); }
    globeFrame(now);
    ftFrame(now);
    active.forEach(stepDrag);
    if (yc.on) { yc.x += (yc.tx - yc.x) * .45; yc.y += (yc.ty - yc.y) * .45; you.style.transform = `translate(${yc.x.toFixed(1)}px,${yc.y.toFixed(1)}px)`; }
    if (tp.on) {
      tp.vx = (tp.vx + (tp.tx - tp.x) * 0.22) * 0.62; tp.vy = (tp.vy + (tp.ty - tp.y) * 0.22) * 0.62;
      tp.x += tp.vx; tp.y += tp.vy;
      const rot = Math.max(-8, Math.min(8, tp.vx * 0.6));
      tip.style.transform = `translate(${tp.x.toFixed(1)}px,${tp.y.toFixed(1)}px) rotate(${rot.toFixed(2)}deg)`;
    }
  }
  requestAnimationFrame(raf);
})();
