
/* AI-ассистент: component selection, size plaque, typed placeholder — by vasnev.art */
(() => {
  const ai = document.getElementById('ai'), log = document.getElementById('aiLog'), inp = document.getElementById('aiI');
  if (!ai) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dec = document.createElement('div'); dec.className = 'ai-dec'; dec.setAttribute('aria-hidden', 'true');
  dec.innerHTML = '<div class="ai-tag"><svg viewBox="-.6 -.6 8.2 8.2"><path d="M3.5 0 5 1.5 3.5 3 2 1.5ZM1.5 2 3 3.5 1.5 5 0 3.5ZM5.5 2 7 3.5 5.5 5 4 3.5ZM3.5 4 5 5.5 3.5 7 2 5.5Z"/></svg>AI-ассистент</div>'
    + '<div class="ai-sel"><i class="tl"></i><i class="tr"></i><i class="br"></i><i class="bl"></i></div><b class="ai-sz"></b>';
  ai.appendChild(dec);
  const sz = dec.querySelector('.ai-sz');
  new ResizeObserver(() => { sz.textContent = Math.round(ai.offsetWidth) + ' × ' + Math.round(ai.offsetHeight); }).observe(ai);

  /* appear once the first screen is built (after the loader) */
  const show = () => setTimeout(() => ai.classList.add('on'), reduce ? 0 : 900);
  const html = document.documentElement;
  if (!html.classList.contains('is-loading')) show();
  new MutationObserver(() => { if (html.classList.contains('is-loading')) ai.classList.remove('on'); else if (!ai.classList.contains('on')) show(); })
    .observe(html, { attributes: true, attributeFilter: ['class'] });

  /* placeholder types example questions */
  if (inp && !reduce) {
    const base = inp.placeholder, Q = ['Какой у тебя опыт?', 'Как ты работаешь с метриками?', 'Покажи лучший кейс', 'Как с тобой связаться?'];
    let qi = 0, ci = 0, dir = 1, hold = 0;
    setInterval(() => {
      if (document.activeElement === inp || inp.value) { inp.placeholder = base; return; }
      if (!ai.classList.contains('on') || document.hidden) return;
      if (hold) { hold--; return; }
      const q = Q[qi]; ci += dir;
      if (ci >= q.length) { dir = -1; hold = 28; }
      if (ci <= 0) { dir = 1; qi = (qi + 1) % Q.length; hold = 4; }
      inp.placeholder = q.slice(0, Math.max(ci, 0)) || base;
    }, 55);
  }
})();
