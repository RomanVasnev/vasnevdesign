const fs = require('node:fs');
const cases = require('./catalog.json');
const theme = fs.readFileSync('portfolio/light.css','utf8');
module.exports = function render(id) {
  const index = cases.findIndex(c => c[0] === id);
  const [,,source] = cases[index];
  const previous = cases[(index+cases.length-1)%cases.length], next = cases[(index+1)%cases.length];
  const nav = '<nav class="project-nav" aria-label="Проекты"><a href="/projects/'+previous[0]+'"><small>← Предыдущий проект</small><strong>'+previous[1]+'</strong></a><a href="/projects/'+next[0]+'"><small>Следующий проект →</small><strong>'+next[1]+'</strong></a></nav>';
  return fs.readFileSync('legacy/'+source+'.html','utf8')
    .replace('<head>','<head><base href="/project-media/">')
    .replace('content="#060606"','content="#f8f8f9"')
    .replace('</head>','<style>'+theme+'</style></head>')
    .replace(/<nav class="nav2 navx"[\s\S]*?<\/nav>|<a class="next"[\s\S]*?<\/a>/,nav)
    .replace(/index\.html#(\w+)/g,(_,hash)=>'/#'+({approach:'process',pet:'builds',stack:'builds',about:'hero'}[hash] || hash))
    .replace(/href="index\.html"/g,'href="/"')
    .replace(/(class="back3?" href=")\/(")/g,'$1/#cases$2')
    .replace(/На главную(<\/a>)/g,'Все кейсы$1');
};
