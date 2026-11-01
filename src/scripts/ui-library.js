
/* UI Library: live components, filters, preview / code sheet — by vasnev.art */
(() => {
  const SRC = {"swipe-to-confirm.tsx": "\"use client\";\n\nimport * as React from \"react\";\n\n/* ------------------------------------------------------------------ */\n/*  Types                                                              */\n/* ------------------------------------------------------------------ */\n\ntype Status = \"idle\" | \"dragging\" | \"loading\" | \"success\" | \"error\";\n\nexport interface SwipeToConfirmProps {\n  /** Text inside the track before confirming */\n  label?: string;\n  /** Text while `onConfirm` is pending */\n  loadingLabel?: string;\n  /** Text after a successful confirm */\n  successLabel?: string;\n  /** Text after `onConfirm` rejects */\n  errorLabel?: string;\n  /** Runs when the user completes the swipe. Return a promise to show the loading state. */\n  onConfirm?: () => void | Promise<unknown>;\n  /** \"destructive\" for delete / irreversible actions */\n  tone?: \"default\" | \"destructive\";\n  disabled?: boolean;\n  /** Reset to idle this many ms after success. `null` keeps the success state. */\n  resetAfter?: number | null;\n  /** Share of the track (0\u20131) the thumb must pass to confirm */\n  threshold?: number;\n  /** Vibrate on supported phones at threshold, confirm and success */\n  haptics?: boolean;\n  /** Icon inside the thumb in the idle state */\n  icon?: React.ReactNode;\n  className?: string;\n}\n\n/* ------------------------------------------------------------------ */\n/*  Helpers                                                            */\n/* ------------------------------------------------------------------ */\n\nconst THUMB = 52;\nconst PAD = 4;\n\nfunction cx(...parts: Array<string | false | null | undefined>) {\n  return parts.filter(Boolean).join(\" \");\n}\n\nfunction buzz(enabled: boolean, pattern: number | number[]) {\n  if (!enabled || typeof navigator === \"undefined\" || !(\"vibrate\" in navigator)) return;\n  try {\n    navigator.vibrate(pattern);\n  } catch {\n    /* some browsers throw when vibration is blocked */\n  }\n}\n\nfunction ArrowIcon() {\n  return (\n    <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden>\n      <path d=\"M5 12h13m0 0-5.5-5.5M18 12l-5.5 5.5\" stroke=\"currentColor\" strokeWidth=\"2.2\" strokeLinecap=\"round\" strokeLinejoin=\"round\" />\n    <\/svg>\n  );\n}\n\nfunction CheckIcon() {\n  return (\n    <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden>\n      <path d=\"m5 12.5 4.5 4.5L19 7.5\" stroke=\"currentColor\" strokeWidth=\"2.4\" strokeLinecap=\"round\" strokeLinejoin=\"round\" />\n    <\/svg>\n  );\n}\n\nfunction Spinner() {\n  return (\n    <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden className=\"animate-spin motion-reduce:animate-none\">\n      <circle cx=\"12\" cy=\"12\" r=\"9\" stroke=\"currentColor\" strokeOpacity=\"0.3\" strokeWidth=\"2.4\" />\n      <path d=\"M21 12a9 9 0 0 0-9-9\" stroke=\"currentColor\" strokeWidth=\"2.4\" strokeLinecap=\"round\" />\n    <\/svg>\n  );\n}\n\n/* ------------------------------------------------------------------ */\n/*  Component                                                          */\n/* ------------------------------------------------------------------ */\n\nexport function SwipeToConfirm({\n  label = \"Swipe to confirm\",\n  loadingLabel = \"Confirming\u2026\",\n  successLabel = \"Confirmed\",\n  errorLabel = \"Didn\u2019t go through. Try again\",\n  onConfirm,\n  tone = \"default\",\n  disabled = false,\n  resetAfter = 2200,\n  threshold = 0.88,\n  haptics = true,\n  icon,\n  className,\n}: SwipeToConfirmProps) {\n  const uid = React.useId().replace(/:/g, \"\");\n  const trackRef = React.useRef<HTMLDivElement>(null);\n  const [width, setWidth] = React.useState(320);\n  const [x, setX] = React.useState(0);\n  const [status, setStatus] = React.useState<Status>(\"idle\");\n  const drag = React.useRef<{ start: number; armed: boolean } | null>(null);\n  const resetTimer = React.useRef<number | undefined>(undefined);\n\n  /* Track width */\n  React.useEffect(() => {\n    const el = trackRef.current;\n    if (!el) return;\n    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));\n    ro.observe(el);\n    return () => ro.disconnect();\n  }, []);\n\n  React.useEffect(() => () => window.clearTimeout(resetTimer.current), []);\n\n  const maxX = Math.max(0, width - THUMB - PAD * 2);\n  const progress = maxX > 0 ? x / maxX : 0;\n  const locked = disabled || status === \"loading\" || status === \"success\";\n  const destructive = tone === \"destructive\";\n\n  const reset = React.useCallback(() => {\n    window.clearTimeout(resetTimer.current);\n    setStatus(\"idle\");\n    setX(0);\n  }, []);\n\n  const complete = React.useCallback(async () => {\n    if (disabled) return;\n    setX(maxX);\n    setStatus(\"loading\");\n    buzz(haptics, 15);\n    try {\n      await onConfirm?.();\n      setStatus(\"success\");\n      buzz(haptics, [12, 40, 12]);\n      if (resetAfter !== null) {\n        resetTimer.current = window.setTimeout(reset, resetAfter);\n      }\n    } catch {\n      setStatus(\"error\");\n      setX(0);\n      buzz(haptics, [30, 30, 30]);\n    }\n  }, [disabled, maxX, haptics, onConfirm, resetAfter, reset]);\n\n  /* Pointer drag */\n  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {\n    if (locked) return;\n    e.currentTarget.setPointerCapture(e.pointerId);\n    drag.current = { start: e.clientX - x, armed: false };\n    setStatus(\"dragging\");\n  };\n\n  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {\n    if (!drag.current) return;\n    const next = Math.min(maxX, Math.max(0, e.clientX - drag.current.start));\n    const past = maxX > 0 && next / maxX >= threshold;\n    if (past && !drag.current.armed) buzz(haptics, 8);\n    drag.current.armed = past;\n    setX(next);\n  };\n\n  const onPointerUp = () => {\n    if (!drag.current) return;\n    const armed = drag.current.armed;\n    drag.current = null;\n    if (armed) void complete();\n    else {\n      setStatus(\"idle\");\n      setX(0);\n    }\n  };\n\n  /* Keyboard: the thumb is a slider */\n  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {\n    if (locked) return;\n    const step = maxX * 0.25;\n    if (e.key === \"Enter\" || e.key === \" \" || e.key === \"End\") {\n      e.preventDefault();\n      void complete();\n    } else if (e.key === \"ArrowRight\" || e.key === \"ArrowUp\") {\n      e.preventDefault();\n      const next = Math.min(maxX, x + step);\n      if (maxX > 0 && next / maxX >= threshold) void complete();\n      else {\n        setStatus(\"idle\");\n        setX(next);\n      }\n    } else if (e.key === \"ArrowLeft\" || e.key === \"ArrowDown\") {\n      e.preventDefault();\n      setX(Math.max(0, x - step));\n    } else if (e.key === \"Escape\" || e.key === \"Home\") {\n      e.preventDefault();\n      reset();\n    }\n  };\n\n  const dragging = status === \"dragging\";\n  const done = status === \"success\";\n  const loading = status === \"loading\";\n  const text = loading ? loadingLabel : done ? successLabel : status === \"error\" ? errorLabel : label;\n\n  const fillTone = destructive ? \"bg-destructive\" : \"bg-primary\";\n  const thumbTone = destructive ? \"bg-destructive text-background\" : \"bg-primary text-primary-foreground\";\n\n  return (\n    <div className={cx(\"w-full\", className)}>\n      <style>{`\n        @keyframes stc-shimmer-${uid} { from { background-position: 200% 0 } to { background-position: -200% 0 } }\n        .stc-shimmer-${uid} {\n          background-image: linear-gradient(90deg, var(--color-muted-foreground) 0%, var(--color-muted-foreground) 40%, var(--color-foreground) 50%, var(--color-muted-foreground) 60%, var(--color-muted-foreground) 100%);\n          background-size: 200% 100%;\n          -webkit-background-clip: text;\n          background-clip: text;\n          color: transparent;\n          animation: stc-shimmer-${uid} 2.6s linear infinite;\n        }\n        @media (prefers-reduced-motion: reduce) {\n          .stc-shimmer-${uid} { animation: none; color: var(--color-muted-foreground); background: none; }\n        }\n      `}<\/style>\n\n      <div\n        ref={trackRef}\n        className={cx(\n          \"relative h-[60px] w-full select-none overflow-hidden rounded-full bg-muted\",\n          \"transition-[background-color,opacity] duration-300\",\n          disabled && \"opacity-50\"\n        )}\n      >\n        {/* Fill behind the thumb */}\n        <div\n          aria-hidden\n          className={cx(\"absolute inset-y-0 left-0 rounded-full\", fillTone)}\n          style={{\n            width: done || loading ? \"100%\" : x + THUMB + PAD * 2,\n            opacity: done || loading ? 1 : 0.14 + progress * 0.3,\n            transition: dragging ? \"none\" : \"width 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease\",\n          }}\n        />\n\n        {/* Label */}\n        <span\n          aria-hidden\n          className={cx(\n            \"pointer-events-none absolute inset-0 flex items-center justify-center px-16 text-[15px] font-semibold tracking-[-0.01em]\",\n            (done || loading) && (destructive ? \"text-background\" : \"text-primary-foreground\"),\n            status === \"error\" && \"text-destructive\",\n            status === \"idle\" && `stc-shimmer-${uid}`\n          )}\n          style={{\n            opacity: done || loading || status === \"error\" ? 1 : Math.max(0, 1 - progress * 1.6),\n            transition: \"opacity 200ms ease\",\n          }}\n        >\n          {status === \"dragging\" ? label : text}\n        <\/span>\n\n        {/* Thumb */}\n        <div\n          role=\"slider\"\n          tabIndex={disabled ? -1 : 0}\n          aria-label={label}\n          aria-valuemin={0}\n          aria-valuemax={100}\n          aria-valuenow={Math.round(progress * 100)}\n          aria-valuetext={done ? successLabel : loading ? loadingLabel : `${Math.round(progress * 100)}%`}\n          aria-disabled={locked || undefined}\n          onPointerDown={onPointerDown}\n          onPointerMove={onPointerMove}\n          onPointerUp={onPointerUp}\n          onPointerCancel={onPointerUp}\n          onKeyDown={onKeyDown}\n          className={cx(\n            \"absolute top-1 grid place-items-center rounded-full shadow-sm outline-none touch-none\",\n            \"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background\",\n            thumbTone,\n            locked ? \"cursor-default\" : dragging ? \"cursor-grabbing\" : \"cursor-grab\"\n          )}\n          style={{\n            left: PAD,\n            width: THUMB,\n            height: THUMB,\n            transform: `translateX(${x}px) scale(${dragging ? 1.04 : 1})`,\n            transition: dragging\n              ? \"transform 80ms linear\"\n              : \"transform 520ms cubic-bezier(0.34, 1.45, 0.64, 1)\",\n          }}\n        >\n          {loading ? <Spinner /> : done ? <CheckIcon /> : icon ?? <ArrowIcon />}\n        <\/div>\n      <\/div>\n\n      {/* Announce state changes to screen readers */}\n      <p className=\"sr-only\" aria-live=\"polite\">\n        {loading ? loadingLabel : done ? successLabel : status === \"error\" ? errorLabel : \"\"}\n      <\/p>\n    <\/div>\n  );\n}\n\nexport default SwipeToConfirm;\n", "swipe-to-confirm.demo.tsx": "import { SwipeToConfirm } from \"@/components/ui/swipe-to-confirm\";\n\nconst wait = (ms: number) => new Promise((r) => setTimeout(r, ms));\n\nfunction Row({ label, value }: { label: string; value: string }) {\n  return (\n    <div className=\"flex items-center justify-between py-2 text-sm\">\n      <span className=\"text-muted-foreground\">{label}<\/span>\n      <span className=\"font-medium tabular-nums text-foreground\">{value}<\/span>\n    <\/div>\n  );\n}\n\nexport default function Demo() {\n  return (\n    <div className=\"flex min-h-screen w-full items-center justify-center bg-background p-4\">\n      <div className=\"w-full max-w-[380px] rounded-[32px] border border-border bg-card p-5 text-card-foreground shadow-sm\">\n        <p className=\"text-center text-[13px] font-medium text-muted-foreground\">Send<\/p>\n        <p className=\"mt-1 text-center text-[40px] font-semibold leading-none tracking-tight tabular-nums\">\n          0.25 ETH\n        <\/p>\n        <p className=\"mt-1.5 text-center text-sm tabular-nums text-muted-foreground\">\u2248 $842.17<\/p>\n\n        <div className=\"mt-5 divide-y divide-border rounded-2xl bg-muted/50 px-4\">\n          <Row label=\"To\" value=\"vasnev.eth\" />\n          <Row label=\"Network\" value=\"Ethereum\" />\n          <Row label=\"Network fee\" value=\"$1.84\" />\n        <\/div>\n\n        <div className=\"mt-5 space-y-3\">\n          <SwipeToConfirm\n            label=\"Swipe to send\"\n            loadingLabel=\"Sending\u2026\"\n            successLabel=\"Sent\"\n            onConfirm={() => wait(1400)}\n          />\n          <SwipeToConfirm\n            tone=\"destructive\"\n            label=\"Swipe to cancel order\"\n            loadingLabel=\"Cancelling\u2026\"\n            successLabel=\"Order cancelled\"\n            onConfirm={() => wait(900)}\n          />\n        <\/div>\n\n        <p className=\"mt-3 text-center text-xs text-muted-foreground\">\n          Drag the knob, or focus it and press Enter.\n        <\/p>\n      <\/div>\n    <\/div>\n  );\n}\n"};
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const OUT = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5"/></svg>';

  /* ---------- Swipe to Confirm: a vanilla port of swipe-to-confirm.tsx ---------- */
  const THUMB = 52, PAD = 4;
  const ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13m0 0-5.5-5.5M18 12l-5.5 5.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    spin: '<svg class="stc-sp" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".3" stroke-width="2.4"/><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'
  };
  function swipe(host, o = {}) {
    const p = { label: 'Swipe to confirm', loadingLabel: 'Confirming…', successLabel: 'Confirmed', errorLabel: 'Didn’t go through. Try again', tone: 'default', resetAfter: 2200, threshold: .88, wait: 1200, ...o };
    host.innerHTML = `<div class="stc${p.tone === 'destructive' ? ' ds' : ''}"><div class="stc-tr"><div class="stc-fill" aria-hidden="true"></div><span class="stc-lb shim" aria-hidden="true"></span><div class="stc-th" role="slider" tabindex="0" aria-label="${p.label}" aria-valuemin="0" aria-valuemax="100"></div></div><p class="sr-only" aria-live="polite"></p></div>`;
    const tr = $('.stc-tr', host), fill = $('.stc-fill', host), lb = $('.stc-lb', host), th = $('.stc-th', host), live = $('.sr-only', host);
    let x = 0, st = 'idle', drag = null, timer = 0, W = tr.clientWidth || 320;
    const maxX = () => Math.max(0, W - THUMB - PAD * 2);
    const buzz = pt => { try { navigator.vibrate && navigator.vibrate(pt); } catch (e) {} };
    function paint() {
      const m = maxX(), pr = m ? x / m : 0, done = st === 'success', load = st === 'loading', dragging = st === 'dragging';
      fill.style.transition = dragging ? 'none' : 'width 450ms cubic-bezier(.22,1,.36,1), opacity 300ms ease';
      fill.style.width = (done || load) ? '100%' : (x + THUMB + PAD * 2) + 'px';
      fill.style.opacity = (done || load) ? 1 : (.14 + pr * .3);
      lb.textContent = dragging ? p.label : load ? p.loadingLabel : done ? p.successLabel : st === 'error' ? p.errorLabel : p.label;
      lb.classList.toggle('shim', st === 'idle'); lb.classList.toggle('on', done || load); lb.classList.toggle('err', st === 'error');
      lb.style.opacity = (done || load || st === 'error') ? 1 : Math.max(0, 1 - pr * 1.6);
      th.style.transition = dragging ? 'transform 80ms linear' : 'transform 520ms cubic-bezier(.34,1.45,.64,1)';
      th.style.transform = `translateX(${x}px) scale(${dragging ? 1.04 : 1})`;
      th.innerHTML = load ? ICON.spin : done ? ICON.check : ICON.arrow;
      th.classList.toggle('drag', dragging); th.classList.toggle('lock', load || done);
      th.setAttribute('aria-valuenow', Math.round(pr * 100));
      th.setAttribute('aria-valuetext', done ? p.successLabel : load ? p.loadingLabel : Math.round(pr * 100) + '%');
      if (load || done) th.setAttribute('aria-disabled', 'true'); else th.removeAttribute('aria-disabled');
      live.textContent = load ? p.loadingLabel : done ? p.successLabel : st === 'error' ? p.errorLabel : '';
    }
    const reset = () => { clearTimeout(timer); st = 'idle'; x = 0; paint(); };
    async function complete() {
      x = maxX(); st = 'loading'; paint(); buzz(15);
      await new Promise(r => setTimeout(r, p.wait));
      st = 'success'; paint(); buzz([12, 40, 12]); if (p.onDone) p.onDone();
      if (p.resetAfter !== null) timer = setTimeout(reset, p.resetAfter);
    }
    const locked = () => st === 'loading' || st === 'success';
    th.addEventListener('pointerdown', e => { if (locked()) return; th.setPointerCapture(e.pointerId); drag = { start: e.clientX - x, armed: false }; st = 'dragging'; paint(); });
    th.addEventListener('pointermove', e => {
      if (!drag) return;
      const m = maxX(), n = Math.min(m, Math.max(0, e.clientX - drag.start)), past = m > 0 && n / m >= p.threshold;
      if (past && !drag.armed) buzz(8);
      drag.armed = past; x = n; paint();
    });
    const up = () => { if (!drag) return; const a = drag.armed; drag = null; if (a) complete(); else { st = 'idle'; x = 0; paint(); } };
    th.addEventListener('pointerup', up); th.addEventListener('pointercancel', up);
    th.addEventListener('keydown', e => {
      if (locked()) return;
      const m = maxX(), step = m * .25;
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'End') { e.preventDefault(); complete(); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); const n = Math.min(m, x + step); if (m && n / m >= p.threshold) complete(); else { st = 'idle'; x = n; paint(); } }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); x = Math.max(0, x - step); paint(); }
      else if (e.key === 'Escape' || e.key === 'Home') { e.preventDefault(); e.stopPropagation(); reset(); }
    });
    new ResizeObserver(([en]) => { W = en.contentRect.width; if (st === 'idle') x = 0; else if (locked()) x = maxX(); paint(); }).observe(tr);
    paint();
  }
  function stcDemo(host) {
    host.innerHTML = `<div class="stc-card"><p class="k">Send</p><p class="v">0.25 ETH</p><p class="u">≈ $842.17</p>
      <dl><div><dt>To</dt><dd>vasnev.eth</dd></div><div><dt>Network</dt><dd>Ethereum</dd></div><div><dt>Network fee</dt><dd>$1.84</dd></div></dl>
      <div class="sw"><div data-a></div><div data-b></div></div><p class="h">Drag the knob, or focus it and press Enter.</p></div>`;
    swipe($('[data-a]', host), { label: 'Swipe to send', loadingLabel: 'Sending…', successLabel: 'Sent', wait: 1400 });
    swipe($('[data-b]', host), { tone: 'destructive', label: 'Swipe to cancel order', loadingLabel: 'Cancelling…', successLabel: 'Order cancelled', wait: 900 });
  }

  window.__swipe = swipe; window.__getUI = it => getUI(it);

  /* ---------- the library (data apart from markup) ---------- */
  const ITEMS = [
    { id: 'swipe-to-confirm', name: 'Swipe to Confirm', desc: 'Свайп-подтверждение для платежей и необратимых действий: загрузка, успех, ошибка, haptics и клавиатура.',
      kind: 'free', where: '21st.dev', url: 'https://21st.dev/romanvasnev', stack: 'React · Tailwind', cover: 'ui/swipe-to-confirm.webp', mini: h => swipe(h, { label: 'Swipe to send', loadingLabel: 'Sending…', successLabel: 'Sent' }), full: stcDemo,
      files: [['swipe-to-confirm.tsx', SRC['swipe-to-confirm.tsx']], ['demo.tsx', SRC['swipe-to-confirm.demo.tsx']]] },
    { id: 'icon-folder', name: 'Icon Folder', desc: 'Стеклянная папка: при наведении веером выходят иконки инструментов с подсказками. Две темы и клавиатура.', stack: 'React · Tailwind',
      kind: 'free', where: '21st.dev', url: 'https://21st.dev/romanvasnev', video: 'ui/icon-folder.mp4', cover: 'ui/icon-folder.webp', bundle: 'ui/icon-folder.js',
      ranges: { iconCount: [1, 6, 1], spread: [30, 120, 1] } },
    { id: 'time-ruler', name: 'Time Ruler', kind: 'free', where: '21st.dev', url: 'https://21st.dev/romanvasnev', video: 'ui/time-ruler.mp4', cover: 'ui/time-ruler.webp', bundle: 'ui/time-ruler.js' },
    { id: 'dot-field', name: 'Dot Field', kind: 'free', where: '21st.dev', url: 'https://21st.dev/romanvasnev', video: 'ui/dot-field.mp4', cover: 'ui/dot-field.webp', bundle: 'ui/dot-field.js' },
    { id: 'glass-prism-hero', name: 'Glass Prism Hero', kind: 'free', where: '21st.dev', url: 'https://21st.dev/romanvasnev', video: 'ui/glass-prism-hero.mp4', cover: 'ui/glass-prism-hero.webp', bundle: 'ui/glass-prism-hero.js' },
    { id: 'holo-card', name: 'Holo Card', kind: 'free', where: '21st.dev', url: 'https://21st.dev/romanvasnev', video: 'ui/holo-card.mp4', cover: 'ui/holo-card.webp', bundle: 'ui/holo-card.js', ranges: { foil: [0, 1, .05] } },
    { id: 'portfolio-hero', name: 'Portfolio Hero', kind: 'free', where: '21st.dev', url: 'https://21st.dev/romanvasnev', video: 'ui/portfolio-hero.mp4', cover: 'ui/portfolio-hero.webp', bundle: 'ui/portfolio-hero.js' },
    { id: 'sign-up-flow', name: 'Sign-up Flow', kind: 'free', where: '21st.dev', url: 'https://21st.dev/romanvasnev', video: 'ui/sign-up-flow.mp4', cover: 'ui/sign-up-flow.webp', bundle: 'ui/sign-up-flow.js' },
    { id: 'finance-bento', name: 'Finance Bento', kind: 'free', where: '21st.dev', url: 'https://21st.dev/romanvasnev', video: 'ui/finance-bento.mp4', cover: 'ui/finance-bento.webp', bundle: 'ui/finance-bento.js' },
    { id: 'flow-stream', name: 'Flow Stream', kind: 'free', where: '21st.dev', url: 'https://21st.dev/romanvasnev', cover: 'ui/flow-stream.webp', bundle: 'ui/flow-stream.js' }
  ];

  const FIRST = ['finance-bento', 'flow-stream'], rank = i => { const k = FIRST.indexOf(i.id); return k < 0 ? 99 : k; };
  ITEMS.sort((a, b) => rank(a) - rank(b));

  /* ---------- bundled components: the 21st.dev files as-is, React shared ---------- */
  const loaded = {};
  const load = src => loaded[src] || (loaded[src] = new Promise((ok, no) => {
    const sc = document.createElement('script'); sc.src = src; sc.onload = ok; sc.onerror = () => { delete loaded[src]; no(); }; document.head.appendChild(sc);
  }));
  const getUI = it => load('ui/runtime.js').then(() => load(it.bundle)).then(() => {
    const ui = window.__UI[it.id];
    if (ui.props && !ui.hoisted) { const st = document.createElement('style'); st.textContent = ui.props; document.head.appendChild(st); ui.hoisted = true; }
    return ui;
  });
  const grid = $('#ulG'), fbs = $$('.ul-f button');
  /* covers play only while on screen; reduced motion keeps the poster */
  const LIVE = '', L21 = 'data:image/webp;base64,UklGRvoDAABXRUJQVlA4IO4DAAAwHACdASpsAGwAPikSiEKhoSEW2MRIGAKEsQBqYvM/gPxA18rp34cftV/culi107Z/sl/buaQqP/Ifbp7q/5F+O3UMf1r8neAB/AP5H/iP7x7yn9g/zPsA9AD+tfy/rFPQA/aL0w/93/jPhS/b79ovZf1WxLmuj/tn46Z8f8T8iH0U/j5itX+L9wHuh+ZfUd/pn+c/MLjJf2VOJfhAwgWk+YiNAps73WI9lgXKUtft27LuXU7Pe6iEaopyHyYpAnf949R/Nk4a1E6+kvNDYs3oqo08CVCyioHTVoV2wU5pA5/RtporB/Q/mgAA/v0Rxybuwl+Da0aSUEoDUYABniMfj/VG56hH8bHjj6YrpYkqEEopdQHg6jlYWZvnf7zS8nThVx915PVJifTF5CFjbg+DVEKjTUWyRX1MqZShAaUa8hF4AZM/JOWBiIO1DfoTvUpZVkj2uhcAK+HpXblKdgEr6103tWhqAAy1frMTRwDC7UaNuFaLWfyNzNjEe2h67hlQ5jvkCdkepLwRJDFrKJ5c4fkvEPpp3yZP2rv8CJUpaiHcW9uSh9zSncUlJZ/GGOuwo+s3jDZ7VjmoBtO6bzZqqWW4PNy6KiAL8yXAITCAgxq+WIp/OkHMveaPp68nvacd9xydw6fqDCddEsZqq2BMzJV5BUCrCxcDi9O9KtHYRYfCKymk3wQ6+MCQd9RYOd29ANBlR8E+h9e+dQCIJcxtI6CffF6mpK1jtIOhM0dQ9l1ZOukMxaP33pVhDHnQNAhvHvR6CA9shcqXXBPuQhvPp3ofoU5urfHyYFue72qwvfXl/1f+MUZbqJ1DRuDXg7KseHJ2UKOCDEaSbHzhzHlGjt4yN+c/AJQjuj8zV//7O6Hr+82nss/Tq724r54eao+Ic4xfIsAFiSdkLQkFgR46/cQunF5ApL4IUFXX+X/k7DKGGlR4fpQFIf/Zv/Ij+8BD7QfOBLVzgEFBXVhK7GaIMbyYE7PiyQUN5s/ZUhJVukK6cK7/qq4t7ZN3fr0IQmmkbAZsbEcCjPjGHQs8oParoqg6v664xfxMUIMH67z9ve2D4WyEqYXKnqpvVZL4h0AFk5TCoh2qne0mM9D0f80cp5oL/0ntTi/5B81qfitG9wdG3GGIa3qa0Kvc+dHhNH01xKsvQDtF2bzLQGev+hd6Arr+PNgVA0+N8ZfzE7Pkni4I9Uv6i+SeZZGyDBVL89SNJf017P14WcKTQtAUEUL8eDZsiQSRUQ0895h8a/iyPyJgnTFDxxNJXqvG9w8aCBDz5RPDUK4DjAFVDwSvV6iJAXTALL4M9Fte1olcFwlycOeutbzXwYNbAAEyYAAA';
  function render(f) {
    const list = ITEMS.filter(i => f === 'all' || i.kind === f);
    if (!list.length) {
      grid.innerHTML = `<li class="ul-empty" style="grid-column:1/-1"><b>${f === 'pro' ? 'Платные компоненты скоро появятся' : 'Пока пусто'}</b><p>${f === 'pro' ? 'Готовлю паки для Craftwork: в каждом исходники, все состояния и демо. А пока — бесплатные компоненты с 21st.dev.' : ''}</p><span class="ul-a"><button type="button" data-all>Показать бесплатные</button></span></li>`;
      $('[data-all]', grid).addEventListener('click', () => setF('free'));
      return;
    }
    grid.innerHTML = list.map(i => `<li class="ul-c" data-id="${i.id}">
      <button type="button" class="ul-st vid" data-open aria-label="${i.name}: код и превью"><img src="${i.cover}" alt="" width="1200" height="900" decoding="async" draggable="false">${i.video ? `<video muted loop playsinline preload="none" data-src="${i.video}" aria-hidden="true"></video>` : ''}</button>
      <div class="ul-m"><b>${i.name}</b><span class="ul-tag${i.kind === 'pro' ? ' pro' : ''}">${i.kind === 'pro' ? 'Pro' : 'Free'}</span></div></li>`).join('');
    $$('.ul-c', grid).forEach(li => {
      const it = ITEMS.find(i => i.id === li.dataset.id), st = $('.ul-st', li), v = $('video', li);
      st.addEventListener('click', () => openSheet(it, st));
      if (!v || reduce) return;
      /* cover: picture at rest, the demo video on hover */
      let over = false, drop = 0;
      st.addEventListener('pointerenter', e => {
        if (e.pointerType !== 'mouse') return;
        over = true; clearTimeout(drop);
        if (!v.getAttribute('src')) v.src = v.dataset.src;
        v.currentTime = 0;
        v.play().then(() => { if (over) st.classList.add('on'); else v.pause(); }).catch(() => {});
      });
      st.addEventListener('pointerleave', () => {
        over = false; st.classList.remove('on'); v.pause();
        /* let the browser release the decoder if the cursor does not come back soon */
        clearTimeout(drop); drop = setTimeout(() => { if (!over) { v.removeAttribute('src'); v.load(); } }, 6000);
      });
    });
  }
  const counts = { all: ITEMS.length, free: ITEMS.filter(i => i.kind === 'free').length, pro: ITEMS.filter(i => i.kind === 'pro').length };
  fbs.forEach(b => { $('i', b).textContent = counts[b.dataset.f]; b.addEventListener('click', () => setF(b.dataset.f)); });
  function setF(f) { fbs.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === f))); render(f); }
  setF('all');

  /* ---------- sheet: live preview and code with copy ---------- */
  const uc = $('#uc');
  let from = null;
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function hl(code) {
    const re = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(import|from|export|default|function|const|let|return|if|else|try|catch|await|async|type|interface|new|typeof|void|null|undefined|true|false)\b|\b(\d+(?:\.\d+)?)\b|(<\/?[A-Za-z][\w.]*)/g;
    let out = '', last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      const t = esc(m[0]);
      out += m[1] ? `<span class="tk-c">${t}</span>` : m[2] ? `<span class="tk-s">${t}</span>` : m[3] ? `<span class="tk-k">${t}</span>` : m[4] ? `<span class="tk-n">${t}</span>` : `<span class="tk-t">${t}</span>`;
      last = re.lastIndex;
    }
    out += esc(code.slice(last));
    return out.split('\n').map(l => `<span class="l">${l || ' '}</span>`).join('');
  }
  function openSheet(it, btn) {
    from = btn;
    uc.innerHTML = `<div class="uc-c" role="document">
      <div class="uc-h"><div class="uc-t"><b id="ucH">${it.name}</b><span class="ul-tag">${it.kind === 'pro' ? 'Craftwork' : 'Free'}</span><span class="uc-st">${it.stack || 'React · Tailwind'}</span></div>
        <div class="uc-r"><a class="b21" href="${it.url}" target="_blank" rel="noopener"><img src="${L21}" alt=""><span>21st.dev</span></a><div class="seg" role="tablist" aria-label="Вид"><button type="button" role="tab" id="ucT0" aria-controls="ucP0" aria-selected="true">Превью</button><button type="button" role="tab" id="ucT1" aria-controls="ucP1" aria-selected="false" tabindex="-1">Код</button></div>
        <button type="button" class="uc-x" aria-label="Закрыть"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 2l8 8M10 2 2 10"/></svg></button></div></div>
      <div class="uc-b">
        <div class="uc-pv" role="tabpanel" id="ucP0" aria-labelledby="ucT0"><div class="ul-mount" style="width:100%;display:grid;place-items:center"></div></div>
        <div class="uc-cd" role="tabpanel" id="ucP1" aria-labelledby="ucT1" hidden>
          <div class="uc-files"><div class="fl" role="tablist" aria-label="Файлы"></div>
            <button type="button" class="uc-cp"><svg viewBox="0 0 14 14" aria-hidden="true"><rect x="4.5" y="4.5" width="7.5" height="7.5" rx="1.8"/><path d="M9.5 4.5V3.3A1.3 1.3 0 0 0 8.2 2H3.3A1.3 1.3 0 0 0 2 3.3v4.9a1.3 1.3 0 0 0 1.3 1.3h1.2"/></svg><span>Скопировать</span></button></div>
          <pre class="uc-pre" tabindex="0"><code></code></pre>
        </div>
      </div></div>`;
    let fk = 0, files = it.files || [];
    const code = $('code', uc), cp = $('.uc-cp', uc), fl = $('.fl', uc), pv = $('.uc-pv', uc), mount = $('.uc-pv .ul-mount', uc);
    const showFile = k => { fk = k; code.innerHTML = files.length ? hl(files[k][1]) : ''; $$('.fl button', uc).forEach((b, i) => b.setAttribute('aria-selected', String(i === k))); };
    const setFiles = f => { files = f; fl.innerHTML = f.map(([n], k) => `<button type="button" role="tab" aria-selected="${k === 0}" data-k="${k}">${n}</button>`).join(''); $$('button', fl).forEach(b => b.addEventListener('click', () => showFile(+b.dataset.k))); showFile(0); };
    if (it.bundle) {
      pv.classList.add('raw'); mount.removeAttribute('style');
      pv.insertAdjacentHTML('beforeend', '<span class="uc-ld" aria-live="polite">Загрузка компонента…</span>');
      const sheet = $('.uc-c', uc);
      getUI(it).then(ui => {
        if (!sheet.isConnected) return;
        $('.uc-ld', pv).remove(); setFiles(ui.files);
        const root = mount.attachShadow({ mode: 'open' }), st = document.createElement('style'), host = document.createElement('div');
        st.textContent = ui.css; host.style.height = '100%'; root.append(st, host);
        /* every demo opens light: its own darkMode prop off, or the shadcn .tw-dark class off */
        const val = { ...ui.settings }, own = 'darkMode' in val;
        if (own) val.darkMode = false;
        if (it.dark) host.classList.add('tw-dark'); /* dark-only components */
        const app = ui.mount(host, val);
        sheet._unmount = app.unmount;
        const keys = (!own && ui.themeable && !it.dark ? ['__dark'] : []).concat(Object.keys(val));
        if (keys.length) {
          const ctl = document.createElement('div'); ctl.className = 'uc-ctl'; ctl.setAttribute('role', 'group'); ctl.setAttribute('aria-label', 'Настройки демо');
          ctl.innerHTML = keys.map(k => k === '__dark' || typeof val[k] === 'boolean'
            ? `<button type="button" role="switch" aria-checked="${k === '__dark' ? false : val[k]}" data-k="${k}"><span class="sw" aria-hidden="true"></span>${k === '__dark' ? 'darkMode' : k}</button>`
            : `<label>${k}<input type="range" data-k="${k}" min="${(it.ranges?.[k] || [0])[0]}" max="${(it.ranges?.[k] || [0, val[k] * 2])[1]}" step="${(it.ranges?.[k] || [0, 0, 1])[2]}" value="${val[k]}"><output>${val[k]}</output></label>`).join('');
          ctl.addEventListener('click', e => { const b = e.target.closest('[role=switch]'); if (!b) return;
            if (b.dataset.k === '__dark') { const on = host.classList.toggle('tw-dark'); b.setAttribute('aria-checked', String(on)); return; }
            val[b.dataset.k] = !val[b.dataset.k]; b.setAttribute('aria-checked', String(val[b.dataset.k])); app.update({ ...val }); });
          ctl.addEventListener('input', e => { const r = e.target; val[r.dataset.k] = +r.value; r.nextElementSibling.textContent = r.value; app.update({ ...val }); });
          pv.after(ctl); pv.classList.add('has-ctl');
          new ResizeObserver(() => { pv.style.bottom = ctl.hidden ? '' : ctl.offsetHeight + 'px'; }).observe(ctl);
          new MutationObserver(() => { ctl.hidden = pv.hidden; }).observe(pv, { attributes: true, attributeFilter: ['hidden'] });
        }
      }, () => { const l = $('.uc-ld', pv); if (l) l.textContent = 'Не удалось загрузить компонент'; });
    } else { it.full(mount); setFiles(it.files); }
    const tabs = $$('.seg [role="tab"]', uc);
    const sel = i => tabs.forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; $('#' + b.getAttribute('aria-controls'), uc).hidden = k !== i; });
    tabs.forEach((b, i) => { b.addEventListener('click', () => sel(i)); b.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const n = 1 - i; sel(n); tabs[n].focus(); e.preventDefault(); } }); });
    cp.addEventListener('click', async () => {
      if (!files.length) return; const t = files[fk][1]; let ok = true;
      try { await navigator.clipboard.writeText(t); } catch (e) {
        const ta = document.createElement('textarea'); ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
        try { ok = document.execCommand('copy'); } catch (e2) { ok = false; } ta.remove();
      }
      $('span', cp).textContent = ok ? 'Скопировано' : 'Не вышло'; cp.classList.toggle('ok', ok);
      setTimeout(() => { $('span', cp).textContent = 'Скопировать'; cp.classList.remove('ok'); }, 1600);
    });
    $('.uc-x', uc).addEventListener('click', closeSheet);
    uc.hidden = false; document.documentElement.classList.add('cs-on');
    requestAnimationFrame(() => { uc.classList.add('open'); tabs[0].focus(); });
  }
  function closeSheet() {
    const sh = $('.uc-c', uc); if (sh && sh._unmount) { try { sh._unmount(); } catch (e) {} }
    uc.classList.remove('open'); document.documentElement.classList.remove('cs-on');
    setTimeout(() => { uc.hidden = true; uc.innerHTML = ''; }, reduce ? 0 : 220);
    if (from && from.isConnected) from.focus({ preventScroll: true });
  }
  uc.addEventListener('pointerdown', e => { if (e.target === uc) closeSheet(); });
  uc.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSheet(); return; }
    if (e.key !== 'Tab') return;
    const f = $$('button, a[href], [tabindex="0"]', uc).filter(n => n.offsetParent && !n.closest('[hidden]'));
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { f[f.length - 1].focus(); e.preventDefault(); }
    else if (!e.shiftKey && i === f.length - 1) { f[0].focus(); e.preventDefault(); }
  });
})();
