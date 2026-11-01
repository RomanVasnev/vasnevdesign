
(() => { const go = () => { const h = document.documentElement; if (h.classList.contains('pg-ui') && !h.classList.contains('is-loading') && window.__dropIn) requestAnimationFrame(() => window.__dropIn(document.querySelector('#ui-library .cp-in'), document.getElementById('ulG'), '.ul-c')); };
  addEventListener('vasnev:page', e => { if (e.detail === 'ui') go(); }); addEventListener('vasnev:ready', go); })();
