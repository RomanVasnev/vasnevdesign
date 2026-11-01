
/* pages: #cases (and #case/…) open the «Кейсы» page, anything else is «Обо мне» — by vasnev.art */
(() => {
  const html = document.documentElement;
  const links = [...document.querySelectorAll('.nav-l a, #menu a[data-sec]')];
  const PAGES = { about: ['', 'Обо мне', '#about'], cases: ['#cases', 'Кейсы', '#cases'], ui: ['#ui-library', 'UI Library', '#ui-library'] };
  const mark = pg => links.forEach(a => {
    const on = a.getAttribute('href') === PAGES[pg][2];
    a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  const cur = () => html.classList.contains('pg-cases') ? 'cases' : html.classList.contains('pg-ui') ? 'ui' : 'about';
  function set(pg) {
    const was = cur();
    html.classList.toggle('pg-cases', pg === 'cases'); html.classList.toggle('pg-ui', pg === 'ui'); mark(pg);
    const lb = document.getElementById('navPg'); if (lb) lb.textContent = PAGES[pg][1];
    document.title = 'vasnev.art — ' + PAGES[pg][1];
    if (was !== pg) { dispatchEvent(new Event('resize')); dispatchEvent(new CustomEvent('vasnev:page', { detail: pg })); }
    return was !== pg;
  }
  window.__page = (pg, toAbout) => {
    const changed = set(pg);
    const hash = PAGES[pg][0];
    if (location.hash !== hash) history.pushState({}, '', location.pathname + location.search + hash);
    if (pg !== 'about' || changed) scrollTo({ top: 0, behavior: 'auto' });
    else if (toAbout) { const t = document.getElementById('about'); scrollTo({ top: t.getBoundingClientRect().top + scrollY - 110, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }
  };
  const route = () => set(/^#case/.test(location.hash) ? 'cases' : location.hash === '#ui-library' ? 'ui' : 'about');
  route(); addEventListener('popstate', route); addEventListener('hashchange', route);
  const brand = document.getElementById('brand');
  if (brand) brand.addEventListener('click', e => { e.preventDefault(); window.__page('about'); });
})();
