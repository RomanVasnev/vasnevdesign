(() => {
  const cases = CATALOG;
  const en = document.documentElement.lang === 'en';
  const label = (ru, english) => en ? english : ru;
  const grids = [document.querySelector('#fxG'), document.querySelector('#fds')];
  const forms = grids.map(grid => grid.parentElement.querySelector('form'));
  const destination = () => cases.find(([id]) => location.hash === '#case/' + id);
  function unlocked(focusGrid) {
    const target = destination();
    if (target) { location.replace('/projects/' + target[0]); return; }
    grids.forEach((grid, i) => {
      grid.parentElement.classList.remove('wip');
      grid.inert = false;
      grid.removeAttribute('aria-hidden');
      forms[i].hidden = true;
    });
    if (focusGrid) focusGrid.querySelector('a').focus({preventScroll:true});
  }
  grids.forEach((grid,i) => {
    grid.inert = true;
    grid.setAttribute('aria-hidden','true');
    grid.innerHTML = (i ? cases : cases.slice(0,3)).map(([id,name]) =>
      '<li class="fd"><a class="fd-b kc" href="/projects/'+id+'" aria-label="'+name+'"><span class="kc-m"><img src="/covers/'+id+'.webp" alt="'+name+'" decoding="async" loading="lazy"></span></a></li>'
    ).join('');
    const form = forms[i], field = form.querySelector('input'), status = form.querySelector('output'), submit = form.querySelector('button');
    form.querySelector('b').textContent = label('Кейсы по паролю','Password-protected cases');
    field.placeholder = label('Введите пароль','Enter password');
    field.setAttribute('aria-label',field.placeholder);
    submit.textContent = label('Открыть','Unlock');
    field.oninput = () => {field.removeAttribute('aria-invalid'); status.textContent = '';};
    form.onsubmit = async event => {
      event.preventDefault();
      if (submit.disabled) return;
      submit.disabled = true;
      try {
        const res = await fetch('/api/access',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:field.value.replace(/\s/g,'')})});
        if (res.status === 403) {
          field.setAttribute('aria-invalid','true'); field.select();
          status.textContent = label('Неверный пароль. Попробуй ещё раз.','Incorrect password. Try again.');
        } else if (res.ok) {
          status.textContent = label('Пароль принят','Access granted');
          await new Promise(resolve => setTimeout(resolve,350));
          unlocked(grid);
        } else throw Error();
      } catch { status.textContent = label('Не удалось проверить пароль. Повтори попытку.','Could not check the password. Try again.'); }
      finally {submit.disabled = false;}
    };
  });
  const restore = () => fetch('/api/access',{cache:'no-store'}).then(r => {
    if(r.ok) unlocked();
    else if(r.status === 401) grids.forEach((grid,i) => {
      grid.inert = true; grid.setAttribute('aria-hidden','true');
      grid.parentElement.classList.add('wip'); forms[i].hidden = false;
    });
  }).catch(()=>{});
  restore();
  addEventListener('pageshow',e=>{if(e.persisted) restore();});
  addEventListener('hashchange',()=>{if(destination()) restore();});
})();
