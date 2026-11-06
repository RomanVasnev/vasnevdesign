/* «Сбер Крипто» v2 · demo data and the single source of truth.
   Screens only read from here and subscribe; they never make numbers up. Rates and sums are illustrative. */
(function (root) {
  'use strict';

  const COINS = {
    btc: { id: 'btc', sym: 'BTC', name: 'Bitcoin', dp: 8, nets: ['bitcoin'] },
    eth: { id: 'eth', sym: 'ETH', name: 'Ethereum', dp: 6, nets: ['ethereum'] },
    usdt: { id: 'usdt', sym: 'USDT', name: 'Tether', dp: 2, nets: ['tron', 'ethereum'] }
  };
  const ORDER = ['btc', 'eth', 'usdt'];
  const FEE = .005;               // Сбер, inside the sum
  const LIMIT = 300000;           // per year, buys, non-qualified investor
  const YEAR = 2026;
  const QUOTE_TTL = 30000;

  /* ── numbers ─────────────────────────────────────────── */
  const r2 = x => Math.round((x + Number.EPSILON) * 100) / 100;
  const floorDp = (x, dp) => { const k = Math.pow(10, dp); return Math.floor(x * k + 1e-9) / k; };
  const NB = ' ';
  const group = s => s.replace(/\B(?=(\d{3})+(?!\d))/g, NB);
  /* money: {sign, int, frac, text}; the screens style int and frac apart */
  const rub = (x, o = {}) => {
    const neg = x < 0, v = Math.abs(r2(x)), i = Math.floor(v), f = Math.round((v - i) * 100);
    const sign = o.sign ? (neg ? '−' : x > 0 ? '+' : '') : (neg ? '−' : '');
    const int = group(String(i)), frac = o.whole && !f ? '' : ',' + String(f).padStart(2, '0');
    return { sign, int, frac, cur: '₽', text: `${sign}${int}${frac}${NB}₽` };
  };
  const qty = (x, coin, o = {}) => {
    const c = COINS[coin], dp = c.dp, neg = x < 0, v = Math.abs(x);
    let s = v.toFixed(dp); if (o.trim) s = s.replace(/\.?0+$/, '');
    const [i, f] = s.split('.');
    const sign = o.sign ? (neg ? '−' : x > 0 ? '+' : '') : (neg ? '−' : '');
    return `${sign}${group(i)}${f ? ',' + f : ''}${NB}${c.sym}`;
  };
  const pct = (x, o = {}) => { const v = Math.abs(x * 100).toFixed(2).replace('.', ','); return (o.sign ? (x < 0 ? '−' : x > 0 ? '+' : '') : (x < 0 ? '−' : '')) + v + '%'; };

  /* ── seeded randomness: the demo looks the same every time ── */
  const rng = seed => { let a = seed >>> 0; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };

  /* ── market: one object, one timer ───────────────────── */
  const market = {
    rate: { btc: 9480000, eth: 318400, usdt: 82.14 },
    base: { btc: 9352000, eth: 315900, usdt: 82.06 },   // 00:00 МСК today: «за день» is counted from here everywhere
    vol: { btc: .00022, eth: .00028, usdt: .00003 },
    history: {}
  };
  const R = rng(1841);
  /* history for charts: deterministic walk that ends at the current rate */
  const TF = { '1Д': [96, .0022], '1Н': [84, .006], '1М': [90, .012], '1Г': [104, .03] };
  ORDER.forEach(k => {
    market.history[k] = {};
    Object.entries(TF).forEach(([tf, [n, v]]) => {
      const vv = k === 'usdt' ? v / 12 : v, a = [market.rate[k]];
      for (let i = 1; i < n; i++) a.unshift(a[0] * (1 - (R() - .5) * 2 * vv));
      if (tf === '1Д') { const s = market.base[k] / a[0]; for (let i = 0; i < n - 1; i++) a[i] *= s + (1 - s) * i / (n - 1); }
      market.history[k][tf] = a;
    });
  });
  const dayChange = k => market.rate[k] / market.base[k] - 1;
  /* «погода рынка»: the day's range, in words */
  const weather = k => {
    const a = market.history[k]['1Д'], mx = Math.max(...a, market.rate[k]), mn = Math.min(...a, market.rate[k]), range = (mx - mn) / mn;
    const w = range < .02 ? 'Штиль' : range < .05 ? 'Ветер' : 'Шторм';
    return { word: w, range, line: `За день курс менялся в пределах ${pct(range)}` };
  };

  /* ── state ───────────────────────────────────────────── */
  const S = { test: { passed: false, level: null }, ledger: [], addressBook: [], clipboardRecent: [], seq: 408, online: true };
  const subs = {};
  const on = (topic, fn) => { (subs[topic] = subs[topic] || new Set()).add(fn); return () => subs[topic].delete(fn); };
  const emit = topic => (subs[topic] || []).forEach(fn => { try { fn(); } catch (e) { console.error(e); } });

  let timer = 0;
  const tick = () => {
    ORDER.forEach(k => { const v = market.vol[k]; market.rate[k] = k === 'usdt' ? r2(market.rate[k] * (1 + (Math.random() - .5) * 2 * v)) : Math.round(market.rate[k] * (1 + (Math.random() - .5) * 2 * v)); market.history[k]['1Д'][market.history[k]['1Д'].length - 1] = market.rate[k]; });
    emit('market');
  };
  const start = () => { if (!timer) timer = setInterval(tick, 4000); };

  /* ── derived: holdings, limit, portfolio ─────────────── */
  const holdings = () => {
    const h = {};
    S.ledger.forEach(o => {
      if (!h[o.coin]) h[o.coin] = { qty: 0, cost: 0 };
      const x = h[o.coin];
      /* cost is what left the card, commission included: the result is honest */
      if (o.kind === 'buy') { x.qty += o.qty; x.cost += o.debit; }
      else if (o.kind === 'sell' || o.kind === 'send') { const avg = x.qty ? x.cost / x.qty : 0, q = o.kind === 'send' ? o.qty + (o.netFee || 0) : o.qty; x.cost -= avg * q; x.qty -= q; }
      else if (o.kind === 'receive') { x.qty += o.qty; x.cost += o.qty * o.rate; }
    });
    Object.keys(h).forEach(k => { const x = h[k]; x.qty = floorDp(x.qty, COINS[k].dp); x.avgRate = x.qty > 0 ? x.cost / x.qty : 0; if (x.qty <= 0) delete h[k]; });
    return h;
  };
  const position = k => {
    const x = holdings()[k]; if (!x) return null;
    const value = r2(x.qty * market.rate[k]), cost = r2(x.qty * x.avgRate);
    return { coin: k, qty: x.qty, avgRate: x.avgRate, value, result: r2(value - cost), resultPct: cost ? value / cost - 1 : 0 };
  };
  const portfolio = () => {
    const pos = ORDER.map(position).filter(Boolean), value = r2(pos.reduce((s, p) => s + p.value, 0)), cost = r2(pos.reduce((s, p) => s + p.value - p.result, 0));
    return { positions: pos, value, result: r2(value - cost), resultPct: cost ? value / cost - 1 : 0, empty: !pos.length };
  };
  const limit = () => {
    const used = r2(S.ledger.filter(o => o.kind === 'buy' && new Date(o.at).getFullYear() === YEAR).reduce((s, o) => s + o.debit, 0));
    return { year: YEAR, cap: LIMIT, used, left: r2(LIMIT - used), share: used / LIMIT };
  };

  /* ── quotes: everything after the sheet reads only from here ── */
  const makeQuote = (kind, coin, rubles, rate = market.rate[coin]) => {
    const dp = COINS[coin].dp;
    if (kind === 'buy') {
      const debit = r2(rubles), fee = r2(debit * FEE), net = r2(debit - fee), q = floorDp(net / rate, dp);
      return { kind, coin, rate, debit, fee, net, qty: q, limitAfter: r2(limit().left - debit), createdAt: Date.now(), expiresAt: Date.now() + QUOTE_TTL };
    }
    /* sell: rubles here is the quantity of coins */
    const q = floorDp(rubles, dp), gross = r2(q * rate), fee = r2(gross * FEE), credit = r2(gross - fee);
    return { kind, coin, rate, qty: q, gross, fee, credit, createdAt: Date.now(), expiresAt: Date.now() + QUOTE_TTL };
  };
  const nextId = () => { S.seq += 1; return { id: 'SC-26-' + String(S.seq).padStart(6, '0'), n: S.seq }; };
  const record = (q, at = new Date().toISOString(), extra = {}) => {
    const { id, n } = nextId();
    const op = Object.assign({ id, n, at, status: 'done' }, q, extra);
    delete op.expiresAt; delete op.createdAt; if (q.kind === 'buy' && op.limitAfter == null) op.limitAfter = r2(limit().left - q.debit);
    op.rub = q.kind === 'buy' ? q.debit : q.kind === 'sell' ? q.credit : r2(q.qty * q.rate);
    S.ledger.unshift(op); emit('portfolio'); emit('ledger');
    return op;
  };
  const confirm = q => { if (q.kind === 'buy') q.limitAfter = r2(limit().left - q.debit); else delete q.limitAfter; return record(q); };

  /* ── scenes for the demo and deep links ──────────────── */
  const reset = () => { S.test = { passed: false, level: null }; S.ledger = []; S.addressBook = []; S.clipboardRecent = []; S.seq = 408; };
  const scenes = {
    new: () => { reset(); },
    fresh: () => { reset(); S.test = { passed: true, level: 'Начинающий инвестор' }; },
    demo: () => {
      reset(); S.test = { passed: true, level: 'Начинающий инвестор' };
      [['usdt', 18000, 81.2, '2026-10-14T11:20:00+03:00'], ['btc', 10000, 9210000, '2026-10-20T19:02:00+03:00'], ['btc', 20000, 9405000, '2026-11-02T09:41:00+03:00']]
        .forEach(([c, d, rate, at]) => record(makeQuote('buy', c, d, rate), at));
    }
  };
  let scene = 'new';
  const setScene = name => { (scenes[name] || scenes.new)(); scene = name; try { sessionStorage.setItem('sc-scene', name); } catch (e) {} emit('portfolio'); emit('ledger'); emit('scene'); };

  const fmtDate = iso => { const d = new Date(iso); return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) + ', ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }); };
  const KIND = { buy: 'Покупка', sell: 'Продажа', send: 'Перевод', receive: 'Получение' };

  const passTest = () => { S.test = { passed: true, level: 'Начинающий инвестор' }; if (scene === 'new') scene = 'fresh'; emit('portfolio'); emit('scene'); };

  root.SC = {
    COINS, ORDER, FEE, LIMIT, YEAR, QUOTE_TTL, KIND,
    market, dayChange, weather,
    state: S, on, emit, start, tick,
    holdings, position, portfolio, limit,
    makeQuote, confirm, record,
    setScene, passTest, get scene() { return scene; },
    fmt: { rub, qty, pct, date: fmtDate, r2, floorDp }
  };
})(window);
