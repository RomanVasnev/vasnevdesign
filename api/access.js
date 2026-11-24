const {createHash,scryptSync} = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const cases = require('../portfolio/catalog.json');
const render = require('../portfolio/render.cjs');
const digest = value => createHash('sha256').update(value).digest('hex');
const verify = '7a314ae49152f311ae43f68d77fd0a460799f950b1ef056f301845651bb6a8d2';
const types = {'.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2'};
module.exports = (req,res) => {
  res.setHeader('Cache-Control','private, no-store');
  res.setHeader('X-Robots-Tag','noindex, nofollow');
  res.setHeader('X-Content-Type-Options','nosniff');
  const {id,media} = req.query;
  const known = cases.some(c => c[0] === id);
  if (req.method === 'POST' && !id && !media) {
    const code = req.body?.code;
    if (typeof code !== 'string' || !/^\d{6}$/.test(code)) return res.status(403).end();
    const token = scryptSync(code,'portfolio-preview-session-v1',32).toString('hex');
    if (digest(token) !== verify) return res.status(403).end();
    res.setHeader('Set-Cookie','portfolio_session='+token+'; Path=/; HttpOnly; Secure; SameSite=Lax');
    return res.status(204).end();
  }
  if (!['GET','HEAD'].includes(req.method)) return res.status(405).end();
  const cookie = (req.headers.cookie || '').match(/(?:^|;\s*)portfolio_session=([\da-f]{64})(?:;|$)/);
  if (!cookie || digest(cookie[1]) !== verify) {
    if (known) {res.setHeader('Location','/#case/'+id); return res.status(302).end();}
    return res.status(401).end();
  }
  if (id) {
    if (!known) return res.status(404).end();
    res.setHeader('Content-Type','text/html; charset=utf-8');
    return res.end(render(id));
  }
  if (media) {
    if (typeof media !== 'string' || !/^[\w./-]+$/.test(media) || media.split('/').some(p=>!p || p.startsWith('.'))) return res.status(404).end();
    const mime = types[path.extname(media)], file = path.join('legacy',media);
    if (!mime || !fs.existsSync(file)) return res.status(404).end();
    res.setHeader('Content-Type',mime);
    if (media === 'i18n.js') return res.end(fs.readFileSync(file,'utf8').replace("var K='lang'", "var K='va-lang'").replace('var M={','var M={"← Предыдущий проект":"← Previous project","Следующий проект →":"Next project →","Все кейсы":"All cases",'));
    return res.end(fs.readFileSync(file));
  }
  res.status(204).end();
};
