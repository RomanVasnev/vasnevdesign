const fs = require('node:fs');
const path = require('node:path');
const cases = require('./catalog.json');
const out = 'preview-public';
fs.mkdirSync(out, {recursive:true});
for (const name of ['_astro','assistant','cases','fonts','img','privacy','test','ui']) {
  fs.cpSync(name,path.join(out,name),{recursive:true});
}
fs.mkdirSync(out+'/covers',{recursive:true});
for (const [id,,,cover] of cases) fs.copyFileSync('legacy/assets/'+cover,out+'/covers/'+id+'.webp');
let home = fs.readFileSync('index.html','utf8');
const form = '<form class="case-gate wip-note"><b>Кейсы по паролю</b><div class="gate-row"><input type="password" inputmode="numeric" autocomplete="current-password" required aria-label="Пароль"><button type="submit">Открыть</button></div><output aria-live="polite"></output></form>';
home = home.replace(/<div class="wip-note" role="status">[\s\S]*?<\/div>/g,form);
const start = home.indexOf('  /* SHA-256');
const end = home.indexOf('  /* folders slide',start);
const obsolete = home.indexOf('  /* ---------- password dialog',end);
if ([start,end,obsolete].includes(-1)) throw Error('Unexpected homepage');
home = home.slice(0,start) + "const fds = $('#fds');\n" + home.slice(end,obsolete) + '})();\n' + home.slice(home.indexOf('</script>',obsolete));
home = home.replace('</head>','<link rel="stylesheet" href="/gallery.css"></head>');
home = home.replace('</body>','<script src="/gallery.js"></script></body>');
fs.writeFileSync(out+'/index.html',home);
fs.copyFileSync('portfolio/gallery.css',out+'/gallery.css');
fs.writeFileSync(out+'/gallery.js',fs.readFileSync('portfolio/gallery.js','utf8').replace('= CATALOG;', '= '+JSON.stringify(cases)+';'));
