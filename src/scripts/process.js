
/* «Дизайн-процесс»: seven living words, one wheel gesture per word — by vasnev.art */
(function () {
  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => t * t * (3 - 2 * t);
  const out = t => 1 - Math.pow(1 - t, 3);
  /* a little overshoot, so that letters land rather than stop */
  const back = t => { const c = 1.7; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
  const seg = (p, a, b) => clamp((p - a) / (b - a), 0, 1);
  const frame = $('#pr-frame'), stage = $('#pr-stage'), track = $('#pr-track');

  /* every scene: the stage name from the process document, one sentence, the colours of the poster */
  const S = [
    { e: 'Дизайн-процесс', t: '', bg: '#F5F5F7', fg: '#1D1D1F' },
    { w: 'Гипотеза', e: '1 · Рынок, ЦА и гипотеза', t: 'Изучаю аудиторию и каналы. Формулирую гипотезу: что меняем и как изменится метрика или конверсия в CTA.', bg: '#FFFFFF', fg: '#1D1D1F', d: 'Аудитория, каналы, конкуренты. Бриф с гипотезой и метрикой успеха.' },
    { w: 'Логика', e: '2 · State machine', t: 'Разбираю сценарии до первого экрана. Составляю state machine: какие есть состояния, что их переключает и что происходит при ошибке.', bg: '#000000', fg: '#FFFFFF', d: 'Карта состояний: одна на разработку, QA, аналитику, тексты и ИИ.' },
    { w: 'Атомы', e: '3 · Атомарная система', t: 'Определяю токены и компоненты. Собираю атомарную систему: меняем один токен, и правка доходит до всех экранов.', bg: '#F5F5F7', fg: '#1D1D1F', d: 'Токены, компоненты и их состояния. Дизайн и код одно и то же.' },
    { w: 'Визуал', e: '4 · Визуал и бренд', t: 'Работаю внутри привычных паттернов, а новизну добавляю в подаче и деталях. Задаю визуальный язык: один на сайте, в продукте и в рекламе.', bg: '#2F5CFF', fg: '#FFFFFF', d: 'Привычные паттерны, узнаваемый язык бренда, motion со смыслом.' },
    { w: 'Сборка', e: '5 · Сборка с ИИ', t: 'Собираю страницы и фичи с ИИ за часы. Прописываю ему три рамки: библиотека компонентов, правила проекта и связь с макетами.', bg: '#FFFFFF', fg: '#1D1D1F', d: 'ИИ берёт рутину в рамках системы. Прототип сразу в коде.' },
    { w: 'Риски', e: '6 · Матрица рисков и проверка', t: 'Размечаю зоны риска до сборки. Назначаю проверку для каждой: где ИИ работает сам, где нужно моё ревью, а где ревью профильного специалиста.', bg: '#000000', fg: '#FFFFFF', d: 'Зелёная, жёлтая и красная зоны. Тест на людях и аудит доступности.' },
    { w: 'Метрика', e: '7 · Метрики и журнал решений', t: 'Сверяю метрику с гипотезой из брифа. Записываю решение в журнал: что меняли, почему и чем закончилось.', bg: '#F5F5F7', fg: '#1D1D1F', d: 'Конверсия, время на задачу, где уходят. Журнал решений.' },
    { e: 'Весь процесс', t: '', bg: '#0B0B0C', fg: '#FFFFFF' }
  ];
  const N = S.length;

  /* words split into letters and fitted to the poster width */
  const W = {};
  const METRIC = [.42, .52, .66, .82, 1.02, 1.28, 1.66];
  /* guides sit on the real baseline of a word, measured from the rendered letters */
  function guides(i, q) {
    const sc = $(`.pr-sc[data-s="${i}"]`), g = $$('.pr-gd', sc), sr = stage.getBoundingClientRect(), r = W[i].line.getBoundingClientRect(), k = stageScale, fs = W[i].fs;
    const base = (r.top - sr.top) / k + fs * .84, cap = base - fs * .65;
    [cap, base].forEach((y, n) => { g[n].style.top = y + 'px'; g[n].style.transform = `scaleX(${ease(q)})`; g[n].firstChild.style.opacity = seg(q, .7, 1); });
  }
  function makeWord(i, max) {
    const box = $('#pr-w' + i), line = document.createElement('div'); line.className = 'pr-line';
    [...S[i].w].forEach(ch => { const l = document.createElement('span'); l.className = 'pr-l'; l.textContent = ch; line.appendChild(l); });
    box.appendChild(line); box.style.fontSize = '200px';
    const fs = Math.min(max || 340, 200 * 1236 / line.offsetWidth);
    box.style.fontSize = fs + 'px';
    W[i] = { box, line, ls: $$('.pr-l', line), fs };
  }

  /* ---------- scene furniture ---------- */
  function build() {
    [1, 2, 3, 4, 5, 6, 7].forEach(i => { $('#pr-w' + i).innerHTML = ''; makeWord(i, i === 2 ? 240 : i === 7 ? 280 : i === 3 ? 440 : 340); });
    /* guides: Figma construction lines at the cap height and the baseline */
    $$('.pr-gd').forEach(x => x.remove());
    [1, 5].forEach(i => { const sc = $(`.pr-sc[data-s="${i}"]`); ['Базовая линия', 'Верх буквы'].forEach(t => { const d = document.createElement('i'); d.className = 'pr-gd'; d.innerHTML = `<span>${t}</span>`; sc.insertBefore(d, sc.firstChild); }); });
    /* 7: exact ink height of the last letter, and a baseline mark */
    const mk = document.createElement('i'); mk.style.cssText = 'display:inline-block;width:0;height:0'; W[7].line.appendChild(mk); W[7].mark = mk;
    const mc = document.createElement('canvas').getContext('2d'); mc.font = `500 ${W[7].fs}px Geist, sans-serif`;
    W[7].ink = mc.measureText('а').actualBoundingBoxAscent;
    W[7].box.style.alignItems = 'flex-end';
    /* 1 */
    const c = document.createElement('i'); c.className = 'pr-caret'; W[1].line.appendChild(c); W[1].caret = c;
    const fb = document.createElement('div'); fb.className = 'pr-fbox'; fb.innerHTML = '<i></i><i></i><i></i><i></i><span>Текст · Geist 500</span>'; W[1].line.appendChild(fb); W[1].fb = fb;
    fb.style.cssText = 'left:-10px;right:-10px;top:6%;bottom:6%';
    /* 2: the tail of the word exists twice: one goes well, the other breaks */
    const w2 = W[2], tail = w2.ls.slice(3), clones = tail.map(l => { const k = l.cloneNode(true); k.style.position = 'absolute'; k.style.left = l.offsetLeft + 'px'; k.style.top = '0'; k.style.color = 'var(--red)'; k.style.opacity = 0; w2.line.appendChild(k); return k; });
    w2.tail = tail; w2.clones = clones;
    /* 4: outline plus a fill that washes over it */
    const w4 = W[4]; w4.line.classList.add('pr-ol');
    const fill = document.createElement('div'); fill.className = 'pr-line pr-fl'; fill.style.webkitTextStroke = '0'; fill.innerHTML = w4.ls.map(l => `<span class="pr-l">${l.textContent}</span>`).join(''); w4.line.appendChild(fill); w4.fill = fill;
    /* 5: every letter is a component */
    W[5].ls.forEach(l => { const b = document.createElement('i'); b.className = 'pr-cb'; l.appendChild(b); });
    const rog = $('#pr-rog'); rog.style.fontSize = W[5].fs + 'px';
    sampleAtoms(); blobs();
  }

  /* ---------- 3: the word is made of dots: real particles sampled from the glyphs ---------- */
  const cv = $('#pr-cv'), ctx = cv.getContext('2d');
  let atoms = [];
  let atomX = 60, atomBase = 0;
  const atomFont = c => { c.textBaseline = 'alphabetic'; c.font = `500 ${W[3].fs}px Geist, sans-serif`; try { c.letterSpacing = (-.06 * W[3].fs) + 'px'; } catch (e) {} };
  function sampleAtoms() {
    const h = 800, off = document.createElement('canvas'); off.width = 1360; off.height = h;
    const c = off.getContext('2d', { willReadFrequently: true }), fs = W[3].fs;
    atomBase = 350 + fs * .35;
    c.fillStyle = '#000'; atomFont(c); c.fillText(S[3].w, atomX, atomBase);
    const d = c.getImageData(0, 0, 1360, h).data, pts = [];
    for (let y = 0; y < h; y += 7) for (let x = (y / 7 % 2 ? 3 : 0); x < 1360; x += 7) if (d[(y * 1360 + x) * 4 + 3] > 128) pts.push([x, y]);
    let seed = 11; const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
    atoms = pts.map(([x, y]) => ({ x, y, sx: rnd() * 1360, sy: rnd() * 800, r: 2 + rnd() * 2.2, o: rnd() * .4, sq: rnd() < .22 }));
  }
  function drawAtoms(a, solid) {
    ctx.setTransform(2, 0, 0, 2, 0, 0); ctx.clearRect(0, 0, 1360, 800);
    ctx.globalAlpha = 1 - solid; ctx.fillStyle = '#2F5CFF';
    for (const p of atoms) {
      const q = ease(seg(a, p.o * .6, p.o * .6 + .55));
      const x = lerp(p.sx, p.x, q), y = lerp(p.sy, p.y, q), r = lerp(p.r, 3.5, q);
      if (p.sq) ctx.fillRect(x - r, y - r, r * 2, r * 2);
      else { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.fill(); }
    }
    /* the dots close up into the solid word: the same text, in the same place */
    if (solid > 0) { ctx.globalAlpha = solid; atomFont(ctx); ctx.fillText(S[3].w, atomX, atomBase); ctx.globalAlpha = 1; }
  }

  /* ---------- 4: bright blobs around the word; orange and pink may pass behind the white letters, the pale ones stay clear ---------- */
  const NS = 'http://www.w3.org/2000/svg', B4 = [];
  const mk = (n, a, p) => { const e = document.createElementNS(NS, n); for (const k in a) if (a[k] != null) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
  function blobs() {
    const v = $('#pr-bl4'); v.innerHTML = ''; B4.length = 0;
    const add = (cx, cy, o, f) => { const pop = mk('g', {}, v), fl = mk('g', { class: 'fl4', style: `animation-delay:${-o * 20}s` }, pop); f(fl, cx, cy); B4.push({ g: pop, cx, cy, o }); };
    add(1060, 226, .14, (p, x, y) => { let d = ''; for (let k = 0; k < 96; k++) { const t = k / 96 * 2 * Math.PI, r = 160 * (.82 + .18 * Math.cos(6 * t)); d += (k ? 'L' : 'M') + (x + Math.cos(t) * r).toFixed(1) + ' ' + (y + Math.sin(t) * r).toFixed(1); } mk('path', { d: d + 'Z', fill: '#FF6A2B' }, p); });
    add(290, 520, .2, (p, x, y) => { const g = mk('g', { fill: '#FF8AD8' }, p), S = 220, r = S * .17, c = S / 2 - r; mk('rect', { x: x - c, y: y - c, width: 2 * c, height: 2 * c }, g); [-c, 0, c].forEach(a => [-c, 0, c].forEach(b => { if (a || b) mk('circle', { cx: x + a, cy: y + b, r }, g); })); });
    add(1200, 590, .26, (p, x, y) => { const g = mk('g', { fill: '#FFD43B' }, p), R = 100, r = 17, w = r * .28; for (let k = 0; k < 8; k++) { const t = Math.PI / 8 + k * Math.PI / 4, ux = Math.cos(t), uy = Math.sin(t), nx = -uy, ny = ux, tx = x + ux * (R - r), ty = y + uy * (R - r); mk('path', { d: `M${x + nx * w} ${y + ny * w}L${tx + nx * r} ${ty + ny * r}L${tx - nx * r} ${ty - ny * r}L${x - nx * w} ${y - ny * w}Z` }, g); mk('circle', { cx: tx, cy: ty, r }, g); } });
    add(800, 590, .32, (p, x, y) => { const g = mk('g', { fill: '#3DDC97' }, p), S = 160, r = S * .27, c = S / 2 - r; [[c, 0], [-c, 0], [0, c], [0, -c]].forEach(([a, b]) => mk('circle', { cx: x + a, cy: y + b, r }, g)); mk('rect', { x: x - c, y: y - c, width: 2 * c, height: 2 * c }, g); });
    add(620, 120, .38, (p, x, y) => { const g = mk('g', { fill: '#D9CBFF' }, p), s = 92; mk('rect', { x: x - s / 2, y: y - s / 2, width: s, height: s, rx: s * .24, transform: `rotate(45 ${x} ${y})` }, g); mk('circle', { cx: x, cy: y, r: 24, fill: '#2F5CFF' }, g); });
  }

  /* ---------- poster ---------- */
  $('#pr-po').innerHTML = S.slice(1, 8).map((s, i) => `<button class="pr-ro" type="button" data-to="${i + 1}"><b><sup>${i + 1}</sup>${s.w}</b><span>${s.d}</span></button>`).join('');
  $('#pr-prog').innerHTML = S.slice(1, 8).map(() => '<i></i>').join('');
  const dt = $$('i', $('#pr-prog')), scenes = $$('.pr-sc'), ros = $$('.pr-ro');

  track.style.height = `calc(${N} * 100vh)`;
  let cur = -1, stageScale = 1;
  const off = (el, top) => { let x = 0, y = 0; while (el && el !== top) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; } return { x, y }; };

  const bigW = [];
  (function () {
    const p = $('#pr-bigT'); const em = p.querySelector('em');
    const wrap = (node, out) => { node.textContent.split(/(\s+)/).forEach(t => { if (!t.trim()) { out.appendChild(document.createTextNode(t)); return; } const sp = document.createElement('span'); sp.textContent = t; sp.style.display = 'inline-block'; bigW.push(sp); out.appendChild(sp); }); };
    const txt = p.firstChild; const fr = document.createDocumentFragment(); wrap(txt, fr); p.replaceChild(fr, txt);
    const e2 = document.createElement('em'); wrap(em, e2); p.replaceChild(e2, em);
  })();
  function play(i, a) {
    if (i === 0) bigW.forEach((w, k) => { const q = out(seg(a, -.1 + k * .07, .12 + k * .07)); w.style.opacity = lerp(.08, 1, q); w.style.transform = `translateY(${(1 - q) * 22}px)`; });
    if (i === 1) {
      const w = W[1], n = w.ls.length, ty = seg(a, .05, .45);
      w.ls.forEach((l, k) => { l.style.opacity = ty * n > k ? 1 : 0; });
      w.caret.style.opacity = ty > 0 && ty < 1 ? 1 : 0;
      w.caret.style.order = 1;
      /* caret follows the typed letters */
      const last = w.ls[clamp(Math.ceil(ty * n) - 1, 0, n - 1)];
      w.caret.style.position = 'absolute'; w.caret.style.left = (last.offsetLeft + last.offsetWidth) + 'px'; w.caret.style.top = '12%'; w.caret.style.height = '76%';
      w.fb.style.opacity = seg(a, .42, .5);
      const f = $('#pr-fml'); f.style.opacity = seg(a, .5, .62); f.style.transform = `translateY(${(1 - seg(a, .5, .62)) * 16}px)`;
      const real = a > .7 ? 1 : 0;
      if (f.dataset.r !== String(real)) { f.dataset.r = real; f.innerHTML = real ? 'Если <b>упростим оплату</b>, <b>конверсия</b> вырастет, потому что <b>люди перестанут ошибаться</b>' : 'Если <b>X</b>, метрика <b>Y</b> изменится, потому что <b>Z</b>'; }
      guides(1, seg(a, .42, .58));
    }
    if (i === 2) {
      const w = W[2], e = ease(seg(a, .1, .6)), H = w.fs * .62, gap = 70;
      w.tail.forEach(l => { l.style.transform = `translate(${gap * e}px,${-H * e}px)`; });
      w.clones.forEach(l => { l.style.opacity = seg(a, .12, .3); l.style.transform = `translate(${gap * e}px,${H * e}px)`; });
      const lk = $('#pr-lk2'), sr = stage.getBoundingClientRect(), k = stageScale;
      const g = w.ls[2].getBoundingClientRect(), t = w.tail[0].getBoundingClientRect(), x1 = (g.right - sr.left) / k + 2, cy = (g.top + g.height * .56 - sr.top) / k, x2 = (t.left - sr.left) / k - 2;
      const ya = (t.top + t.height * .56 - sr.top) / k, yb = cy + (cy - ya);
      const dr = seg(a, .3, .62);
      lk.innerHTML = `<path d="M${x1} ${cy}C${x1 + 50} ${cy} ${x2 - 50} ${ya} ${x2} ${ya}" stroke="#fff" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - dr}"/><path d="M${x1} ${cy}C${x1 + 50} ${cy} ${x2 - 50} ${yb} ${x2} ${yb}" stroke="#FF3B30" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - dr}"/>`;
      const end = w.tail[w.tail.length - 1].getBoundingClientRect(), ca = $('#pr-c2a'), cb = $('#pr-c2b'), cx = (end.right - sr.left) / k + 22, q = seg(a, .58, .7);
      ca.style.left = cx + 'px'; ca.style.top = ya - 18 + 'px'; ca.style.opacity = q;
      cb.style.left = cx + 'px'; cb.style.top = yb - 18 + 'px'; cb.style.opacity = q;
    }
    if (i === 3) {
      drawAtoms(seg(a, .04, .62), seg(a, .62, .74));
    }
    if (i === 4) {
      const w = W[4], q = ease(seg(a, .1, .68));
      B4.forEach(b => { const t = back(seg(a, b.o, b.o + .24)); b.g.setAttribute('transform', `translate(${b.cx} ${b.cy}) scale(${Math.max(0, t)}) translate(${-b.cx} ${-b.cy})`); b.g.style.opacity = a >= b.o ? 1 : 0; });
      w.fill.style.clipPath = `inset(-20% ${(1 - q) * 100}% -20% 0)`;
      /* one letter steps aside and comes back: bending the pattern a little */
      const t = seg(a, .68, .9), wob = Math.sin(t * Math.PI);
      $$('.pr-l', w.fill)[2].style.transform = `translateY(${-wob * 22}px) rotate(${-wob * 7}deg)`;
      w.ls[2].style.transform = `translateY(${-wob * 22}px) rotate(${-wob * 7}deg)`;
    }
    if (i === 5) {
      const w = W[5], n = w.ls.length;
      const FROM = [[-180, -120, -28], [-90, 130, 22], [40, -130, 34], [30, 130, -26], [110, -120, 18], [190, 120, -34]];
      w.ls.forEach((l, k) => {
        const f = FROM[k % 6], q = seg(a, .04 + k * .07, .28 + k * .07), e = back(q);
        l.style.transform = `translate(${f[0] * (1 - e)}px,${f[1] * (1 - e)}px) rotate(${f[2] * (1 - e)}deg)`;
        l.style.opacity = seg(q, 0, .2);
        $('.pr-cb', l).style.opacity = q >= 1 ? 1 - seg(a, .82, .92) : seg(q, 0, .5);
      });
      guides(5, seg(a, .5, .68));
      /* a foreign letter tries to get in */
      const rog = $('#pr-rog'), T = $('#pr-rogT'), tgt = w.ls[n - 1], sr = stage.getBoundingClientRect(), r = tgt.getBoundingClientRect(), k = stageScale;
      const fx = (r.left - sr.left) / k - W[5].fs * .1, fy = (r.top - sr.top) / k;
      const inq = out(seg(a, .5, .62)), rej = ease(seg(a, .66, .82));
      rog.style.left = fx + 'px'; rog.style.top = lerp(fy - 300, fy - W[5].fs * .28, inq) + rej * 300 + 'px';
      rog.style.opacity = seg(a, .5, .55) * (1 - rej);
      rog.style.transform = `rotate(${lerp(-18, 8, inq) + rej * 60}deg)`;
      T.style.left = fx - 170 + 'px'; T.style.top = fy - 62 + 'px'; T.style.opacity = seg(a, .62, .66) * (1 - seg(a, .8, .85));
    }
    if (i === 6) {
      const w = W[6], ZC = ['#34C759', '#34C759', '#FF9F0A', '#FF3B30', '#FF3B30'];
      const pass = seg(a, .62, .72), tail = w.ls.slice(3);
      w.ls.forEach((l, k) => {
        const q = out(seg(a, .04 + k * .06, .22 + k * .06));
        if (k < 3) { l.style.color = ZC[k]; l.style.opacity = q; l.style.transform = `translateX(${(1 - q) * -90}px)`; }
      });
      tail.forEach(l => { l.style.color = pass > 0 ? ZC[3] : '#3A3A3C'; l.style.opacity = seg(a, .24, .36); l.style.transform = `translateX(${(1 - pass) * 70}px)`; });
      const sr = stage.getBoundingClientRect(), k = stageScale, r = tail[0].getBoundingClientRect(), gate = $('#pr-gate');
      const gx = (r.left - sr.left) / k - 6, gt = (w.box.getBoundingClientRect().top - sr.top) / k + 40, gh = 320;
      gate.style.left = gx - (1 - pass) * -44 + 'px'; gate.style.top = gt + 'px'; gate.style.height = gh + 'px';
      gate.style.opacity = seg(a, .26, .36) * (1 - seg(a, .72, .82));
      const cu = $('#pr-cur6'), mv = ease(seg(a, .36, .56));
      cu.style.opacity = a > .34 && a < .78 ? 1 : 0;
      cu.style.transform = `translate(${lerp(1160, gx + 40, mv)}px,${lerp(120, gt + 60, mv)}px)`;
      const pn = $('#pr-pin6'); pn.style.left = gx + 40 + 'px'; pn.style.top = gt - 56 + 'px'; pn.style.opacity = seg(a, .56, .64);
    }
    if (i === 7) {
      const w = W[7], n = w.ls.length, q = ease(seg(a, .1, .62));
      const H = METRIC;
      w.ls.forEach((l, k) => { l.style.fontSize = lerp(1, H[k], q) + 'em'; l.style.color = k === n - 1 ? (q > .96 ? 'var(--green)' : '') : ''; });
      /* the last letter touches the goal exactly: the line sits at its final height */
      const g = $('#pr-goal'), sr = stage.getBoundingClientRect(), k = stageScale, base = (w.mark.getBoundingClientRect().top - sr.top) / k;
      g.style.top = base - w.ink * METRIC[n - 1] + 'px'; g.style.opacity = seg(a, .04, .16);
      $('#pr-goalT').textContent = q > .96 ? 'цель достигнута' : 'цель из гипотезы';
      $('#pr-goalT').style.color = q > .96 ? 'var(--green)' : '';
    }
    if (i === 8) {
      ros.forEach((r, k) => { const t = out(seg(a, .04 + k * .07, .26 + k * .07)); r.style.opacity = t; r.style.transform = `translateX(${(1 - t) * 60}px)`; });
      const e = $('#pr-poE'); e.style.opacity = seg(a, .62, .76);
    }
  }

  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  /* one gesture, one poster: eight steps through nine posters; each poster then plays on its own clock */
  const DUR = [900, 2300, 2300, 2500, 2400, 2900, 2700, 2300, 1100], END = .96, FADE = 240;
  let step = 0, t0 = performance.now(), done = false, frozen = null, raf = 0, started = false;
  function render() {
    const fr = frame.getBoundingClientRect();
    stageScale = Math.min(fr.width / 1360, fr.height / 800);
    stage.style.transform = `translate(${(fr.width - 1360 * stageScale) / 2}px,${(fr.height - 800 * stageScale) / 2}px) scale(${stageScale})`;
    const i = step, el = performance.now() - t0, a = frozen != null ? frozen : done ? END : Math.min(END, el / DUR[i] * END), fade = frozen != null ? 1 : seg(el, 0, FADE);
    scenes.forEach((s, k) => { const on = k === i; s.style.visibility = on ? 'visible' : 'hidden'; if (on) s.style.opacity = fade; });
    if (i !== cur) {
      cur = i; const s = S[i];
      frame.style.setProperty('--bgc', s.bg); stage.style.setProperty('--fgc', s.fg);
      $('#pr-ey').textContent = s.e; $('#pr-say').textContent = s.t;
      $('#pr-skip').style.display = i === N - 1 ? 'none' : '';
      dt.forEach((d, k) => d.classList.toggle('on', k < i));
    }
    $('#pr-say').style.opacity = i === 0 || i === N - 1 ? 0 : seg(a, .06, .14);
    play(i, a);
  }
  function tick() {
    render();
    raf = frozen == null && performance.now() - t0 < Math.max(FADE, done ? FADE : DUR[step]) + 40 ? requestAnimationFrame(tick) : 0;
  }
  const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };
  /* going back lands on the finished picture; going forward plays it */
  function show(i, back) { step = i; done = back || reduce; frozen = null; t0 = performance.now(); wake(); }
  const trackTop = () => scrollY + track.getBoundingClientRect().top;
  function goTo(i, back) { show(i, back); scrollTo({ top: trackTop() + i * innerHeight, behavior: 'instant' }); }
  const inside = () => { const r = track.getBoundingClientRect(); return innerWidth > 760 && r.height > 0 && r.top <= 1 && r.bottom >= innerHeight - 1; };
  const atEnd = dir => (dir < 0 && step === 0) || (dir > 0 && step === N - 1);
  const LOCK = 450, QUIET = 120, LONG = 1400;
  let lockUntil = 0, lastEvt = 0, gesture = 0;
  /* a wheel burst counts once; a trackpad's inertia must die down before the next step */
  addEventListener('wheel', e => {
    const now = performance.now(), quiet = now - lastEvt > QUIET;
    if (quiet) gesture = now;
    lastEvt = now;
    if (!inside() || !e.deltaY || !track.contains(e.target)) return;
    const dir = Math.sign(e.deltaY);
    if (atEnd(dir)) { if (!quiet) e.preventDefault(); return; }
    e.preventDefault();
    if (now < lockUntil || (!quiet && now - gesture < LONG)) return;
    gesture = now; lockUntil = now + LOCK;
    goTo(step + dir, dir < 0);
  }, { passive: false });
  addEventListener('keydown', e => {
    const dir = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1, ' ': e.shiftKey ? -1 : 1 }[e.key];
    if (!dir || !inside() || atEnd(dir)) return;
    if (e.target.closest('input,textarea,[contenteditable],.va-float,.cs') || (e.key === ' ' && e.target.closest('a,button'))) return;
    e.preventDefault(); goTo(step + dir, dir < 0);
  });
  let touchY = null;
  addEventListener('touchstart', e => { touchY = inside() && track.contains(e.target) ? e.touches[0].clientY : null; }, { passive: true });
  addEventListener('touchmove', e => { if (touchY == null) return; const dir = Math.sign(touchY - e.touches[0].clientY); if (dir && !atEnd(dir)) e.preventDefault(); }, { passive: false });
  addEventListener('touchend', e => { if (touchY == null) return; const d = touchY - e.changedTouches[0].clientY; touchY = null; if (Math.abs(d) < 40) return; const dir = Math.sign(d); if (!atEnd(dir)) goTo(step + dir, dir < 0); });
  /* the scrollbar, the skip link and arrivals from other blocks move the page without a gesture */
  function sync() {
    const r = track.getBoundingClientRect();
    if (!r.height) return;
    if (!started && r.top < innerHeight * .6) { started = true; show(step, false); }
    const j = clamp(Math.round(-r.top / innerHeight), 0, N - 1);
    if (j !== step && frozen == null) show(j, j < step);
  }
  addEventListener('scroll', sync, { passive: true });
  addEventListener('resize', () => { build(); mobile(); if (inside()) scrollTo({ top: trackTop() + step * innerHeight, behavior: 'instant' }); render(); });
  /* the poster is also a table of contents */
  $('#pr-po').addEventListener('click', e => { const b = e.target.closest('[data-to]'); if (b) goTo(+b.dataset.to, false); });
  function mobile() {
    const m = $('#pr-m'), W0 = m.clientWidth - 40;
    if (!W0 || W0 < 0) return;
    const word = (s, i) => { const ch = [...s.w]; if (i === 6) return ch.map((c, k) => `<i style="--w:${['#34C759', '#34C759', '#FF9F0A', '#FF3B30', '#FF3B30'][k]}">${c}</i>`).join(''); if (i === 3) return `<i style="--w:#2F5CFF">${s.w}</i>`; if (i === 7) return ch.map((c, k) => `<i style="font-size:${[.62, .7, .78, .86, .94, 1.04, 1.2][k]}em">${c}</i>`).join(''); return s.w; };
    m.innerHTML = '<div class="pr-mh">Как я делаю продукты. <em>Семь шагов от гипотезы до метрики.</em></div>' + S.slice(1, 8).map((s, k) => `<article class="pr-mc${k === 3 ? ' pr-mb' : ''}" style="--b:${s.bg};--f:${s.fg}"><small>${s.e}</small><b class="pr-mw" style="font-size:100px">${word(s, k + 1)}</b><p>${s.t}</p>${k === 3 ? `<svg viewBox="540 40 800 660" aria-hidden="true">${$('#pr-bl4').innerHTML}</svg>` : ''}</article>`).join('') + '<a class="pr-mcta" href="#hi">Обсудить проект</a>';
    /* each word is fitted to the width of its card */
    $$('.pr-mw', m).forEach(w => { w.style.display = 'inline-block'; const fs = 100 * W0 / w.offsetWidth; w.style.fontSize = Math.min(fs, 92) + 'px'; w.style.display = ''; });
  }
  const start = () => { build(); mobile(); sync(); render(); wake(); };
  if (document.fonts && document.fonts.load) Promise.all([document.fonts.load('500 200px Geist'), document.fonts.load('400 20px Geist')]).then(start, start); else start();
  window.__process = { render, step: () => step, go: u => { const i = Math.floor(u); step = i; frozen = u - i; scrollTo({ top: trackTop() + i * innerHeight, behavior: 'instant' }); render(); } };
})();
