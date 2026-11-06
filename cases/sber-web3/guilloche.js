/* Guilloche engine · «Сбер Крипто» v2 concept · by vasnev.art
   Parametric curves → engraved lines (pass 1) → steel, platinum and hot enamel (pass 2). WebGL2, SVG fallback. */
(function (root) {
  'use strict';
  const TAU = Math.PI * 2;
  const RM = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── seed ─────────────────────────────────────────────── */
  const hash32 = s => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0; };
  const rng = seed => { let a = typeof seed === 'string' ? hash32(seed) : seed >>> 0; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };

  const ENAMEL = { btc: ['#64EE61', '#3FD39A', '#32B8D3'], eth: ['#32B8D3', '#2A8CCB', '#1C5BB8'], usdt: ['#8FF08C', '#64EE61', '#3FC9A8'] };

  /* ── presets: the character of each coin ──────────────── */
  /* shared frame: a knurled band like a coin edge, two fine rules */
  const FRAME = wave => [
    { type: 'rosette', rIn: .815, rOut: .905, density: 10, k: 96, amplitude: .016, twist: 1, wave: wave || 'sine' },
    { type: 'rosette', rIn: .79, rOut: .79, density: 1, k: 1, amplitude: 0 },
    { type: 'rosette', rIn: .93, rOut: .93, density: 1, k: 1, amplitude: 0 }
  ];
  const BRAND = { btc: '#F7931A', eth: '#627EEA', usdt: '#26A17B' };
  const PRESETS = {
    /* BTC: dense multi-ray rosette, 36 rays woven from 64 waved rings */
    btc: { glyph: 'btc-logo', glyphR: .3, glyphMode: 1, enamel: { stops: ENAMEL.btc, angle: -38, density: .9 }, layers: [{ type: 'rosette', rIn: .35, rOut: .76, density: 64, k: 36, amplitude: .022, twist: 1, taper: true, wave: 'sine' }, ...FRAME()] },
    /* ETH: cut like a gem, sharp facets from cusp waves */
    eth: { glyph: 'eth-logo', glyphR: .3, glyphMode: 1, enamel: { stops: ENAMEL.eth, angle: -50, density: .92 }, layers: [{ type: 'rosette', rIn: .35, rOut: .76, density: 44, k: 8, amplitude: .09, twist: 0, taper: true, wave: 'cusp' }, ...FRAME('facet')] },
    /* USDT: calm, concentric, almost still */
    usdt: { glyph: 'usdt-logo', glyphR: .3, glyphMode: 1, enamel: { stops: ENAMEL.usdt, angle: -30, density: .72 }, layers: [{ type: 'rosette', rIn: .35, rOut: .78, density: 56, k: 6, amplitude: .004, twist: .5, taper: false, wave: 'sine' }, ...FRAME()] }
  };

  /* a seal is derived from the operation id: same id, same pattern */
  const seedFromString = (id, coin) => {
    const R = rng(String(id)), pick = (a, b) => a + R() * (b - a), int = (a, b) => Math.round(pick(a, b));
    const k1 = int(9, 21) * 2, waves = ['sine', 'sine', 'facet', 'cusp'];
    const layers = [
      { type: 'rosette', rIn: pick(.06, .14), rOut: pick(.6, .72), density: int(28, 52), k: k1 / 2 | 0, amplitude: pick(.03, .07), twist: [0, .25, .5, 1][int(0, 3)], taper: true, wave: waves[int(0, 3)] },
      R() < .55
        ? { type: 'hypo', R: 1, r: 1 / int(7, 14), d: pick(.35, .7), size: pick(.6, .72), density: int(6, 14) }
        : { type: 'epi', R: 1, r: 1 / int(6, 12), d: pick(.06, .14), size: pick(.6, .72), density: int(6, 12) },
      { type: 'rosette', rIn: .8, rOut: .9, density: int(6, 12), k: int(30, 60) * 2, amplitude: pick(.01, .02), twist: 1, wave: waves[int(0, 2)] },
      { type: 'rosette', rIn: .93, rOut: .93, density: 1, k: 1, amplitude: 0 }
    ];
    if (coin) layers[0].rIn = .35;
    return { seed: String(id), glyph: BRAND[coin] ? coin + '-logo' : coin || null, glyphR: .3, glyphMode: BRAND[coin] ? 1 : 0, enamel: { stops: ENAMEL[coin] || ENAMEL.btc, angle: pick(-60, -25), density: pick(.8, .95) }, layers };
  };

  /* coin signs, drawn as strokes in a 100×100 box: the same letterforms everywhere, no font fallback */
  const GLYPHS = {
    btc: g => { g.moveTo(34, 20); g.lineTo(34, 80); g.moveTo(30, 20); g.lineTo(57, 20); g.bezierCurveTo(74, 20, 74, 48, 57, 48); g.lineTo(34, 48); g.moveTo(34, 48); g.lineTo(60, 48); g.bezierCurveTo(79, 48, 79, 80, 60, 80); g.lineTo(30, 80); g.moveTo(42, 9); g.lineTo(42, 20); g.moveTo(54, 9); g.lineTo(54, 20); g.moveTo(42, 80); g.lineTo(42, 91); g.moveTo(54, 80); g.lineTo(54, 91); },
    eth: g => { g.moveTo(25, 22); g.lineTo(75, 22); g.moveTo(32, 50); g.lineTo(68, 50); g.moveTo(25, 78); g.lineTo(75, 78); },
    check: g => { g.moveTo(24, 52); g.lineTo(42, 70); g.lineTo(78, 32); },
    usdt: g => { g.moveTo(24, 22); g.lineTo(76, 22); g.moveTo(50, 22); g.lineTo(50, 82); g.moveTo(34, 55); g.lineTo(66, 45); g.moveTo(34, 68); g.lineTo(66, 58); }
  };
  /* the coins' own marks: glyph paths from cryptocurrency-icons 0.18.1 (CC0), 32×32 box; [path, facet tone] */
  const MARKS = {
    'btc-logo': [['M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z', 1]],
    'eth-logo': [['M16.498 4v8.87l7.497 3.35z', .6], ['M16.498 4L9 16.22l7.498-3.35z', 1], ['M16.498 21.968v6.027L24 17.616z', .6], ['M16.498 27.995v-6.028L9 17.616z', 1], ['M16.498 20.573l7.497-4.353-7.497-3.348z', .3], ['M9 16.22l7.498 4.353v-7.701z', .6]],
    'usdt-logo': [['M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117', 1]]
  };
  /* paint a mark into a 100×100 box, the glyph scaled up to fill it; tone → per-facet value */
  const MARK_BOX = { 'btc-logo': [16.1, 16, 3.75], 'eth-logo': [16.5, 16, 3.3], 'usdt-logo': [16, 16.75, 3.7] };
  const paintMark = (g, name, col, tone) => {
    const [cx, cy, k] = MARK_BOX[name];
    g.save(); g.translate(50, 50); g.scale(k, k); g.translate(-cx, -cy);
    MARKS[name].forEach(([d, t]) => { g.globalAlpha = tone ? t : 1; g.fillStyle = col; g.fill(new Path2D(d)); });
    g.restore();
  };
  const glyphCanvas = name => {
    const S = 256, c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d'), f = GLYPHS[name];
    if (MARKS[name]) {
      const layer = (blur, col, tone) => { const t = document.createElement('canvas'); t.width = t.height = S; const h = t.getContext('2d'); h.scale(S / 100, S / 100); paintMark(h, name, col, tone); g.save(); g.filter = blur ? `blur(${blur}px)` : 'none'; g.globalCompositeOperation = 'lighter'; g.drawImage(t, 0, 0); g.restore(); };
      layer(0, '#f00', false); layer(5, '#0f0', true); layer(2, '#0f0', true);
      return c;
    }
    if (!f) return null;
    const stroke = (blur, col) => { g.save(); g.filter = blur ? `blur(${blur}px)` : 'none'; g.scale(S / 100, S / 100); g.beginPath(); f(g); g.lineWidth = 8.5; g.lineCap = name === 'check' ? 'square' : 'butt'; g.lineJoin = 'miter'; g.strokeStyle = col; g.stroke(); g.restore(); };
    /* red: the crisp sign; green: a soft height map for the bevel */
    g.globalCompositeOperation = 'lighter'; stroke(0, '#f00'); stroke(5, '#0f0'); stroke(2, '#0f0');
    return c;
  };

  const clone = o => JSON.parse(JSON.stringify(o));
  const preset = name => clone(PRESETS[name]);

  /* ── curves ───────────────────────────────────────────── */
  const wave = (type, x) => type === 'facet' ? 2 / Math.PI * Math.asin(Math.sin(x)) : type === 'cusp' ? 1 - 2 * Math.abs(Math.sin(x / 2)) : Math.sin(x);

  /* every layer becomes a list of curves f(u) → [x, y], u ∈ [0, 1] */
  const curvesOf = L => {
    const out = [], n = Math.max(1, L.density | 0), ph = L.phase || 0;
    if (L.type === 'rosette') {
      const turns = L.turns || 1;
      for (let c = 0; c < n; c++) {
        const Rc = n > 1 ? L.rIn + (L.rOut - L.rIn) * c / (n - 1) : L.rOut, p = ph + (L.twist || 0) * TAU * c / n, A = (L.amplitude || 0) * (L.taper ? Rc / (L.rOut || 1) : 1);
        out.push({ f: u => { const t = u * TAU * turns, r = Rc + A * wave(L.wave, L.k * t + p); return [r * Math.cos(t), r * Math.sin(t)]; } });
      }
    } else if (L.type === 'hypo' || L.type === 'epi') {
      const R = L.R || 1, r = L.r, d = L.d, epi = L.type === 'epi', q = epi ? (R + r) / r : (R - r) / r;
      /* r = p/q of R: the curve has q lobes and closes after p turns */
      let P = 1, Q = Math.max(1, Math.round(R / r));
      for (let qq = 1; qq <= 240; qq++) { const pp = r / R * qq; if (Math.abs(pp - Math.round(pp)) < 1e-6) { P = Math.round(pp); Q = qq; break; } }
      const m = epi ? R + r + d : R - r + d, s = (L.size || 1) / m, sym = L.sym || Q, turns = L.turns || P;
      for (let c = 0; c < n; c++) {
        const rot = ph + TAU * c / (n * sym), cr = Math.cos(rot), sr = Math.sin(rot);
        out.push({ f: u => { const t = u * TAU * turns; let x, y; if (epi) { x = (R + r) * Math.cos(t) - d * Math.cos(q * t); y = (R + r) * Math.sin(t) - d * Math.sin(q * t); } else { x = (R - r) * Math.cos(t) + d * Math.cos(q * t); y = (R - r) * Math.sin(t) - d * Math.sin(q * t); } x *= s; y *= s; return [x * cr - y * sr, x * sr + y * cr]; } });
      }
    } else if (L.type === 'rays') {
      for (let c = 0; c < n; c++) {
        const a0 = ph + TAU * c / n;
        out.push({ open: true, f: u => { const r = L.rIn + (L.rOut - L.rIn) * u, a = a0 + (L.amplitude || 0) * Math.sin(u * Math.PI * (L.k || 1)); return [r * Math.cos(a), r * Math.sin(a)]; } });
      }
    }
    return out;
  };

  /* sample to segments; each instance: x0 y0 x1 y1 | t layer sector 0 */
  const build = (params, pxPerUnit) => {
    const segs = [], L = params.layers || [];
    L.forEach((layer, li) => {
      const sec = layer.sectors | 0, gap = layer.gap || 0, srot = layer.sectorRot || 0, span = sec ? TAU / sec : TAU;
      curvesOf(layer).forEach(cv => {
        let len = 0, pp = cv.f(0);
        for (let i = 1; i <= 240; i++) { const p = cv.f(i / 240); len += Math.hypot(p[0] - pp[0], p[1] - pp[1]); pp = p; }
        const N = Math.min(9000, Math.max(24, Math.ceil(len * pxPerUnit / 2.2)));
        let a = cv.f(0);
        for (let i = 1; i <= N; i++) {
          const b = cv.f(i / N);
          let s = -1;
          if (sec) {
            const ang = Math.atan2((a[1] + b[1]) / 2, (a[0] + b[0]) / 2), rel = ((ang - srot) % TAU + TAU) % TAU;
            s = Math.floor(rel / span); const w = rel - s * span;
            if (w < gap / 2 || w > span - gap / 2) { a = b; continue; }
          }
          segs.push(a[0], a[1], b[0], b[1], (i - .5) / N, li, s, 0);
          a = b;
        }
      });
    });
    return new Float32Array(segs);
  };

  /* SVG paths: lighter for the fallback */
  const svg = (params, size, o = {}) => {
    const h = size / 2, sc = h * .98, paths = [];
    (params.layers || []).forEach(layer => {
      const lay = Object.assign({}, layer, { density: Math.min(layer.density | 0 || 1, o.maxDensity || 22) });
      curvesOf(lay).forEach(cv => {
        const N = 360; let d = '';
        for (let i = 0; i <= N; i++) { const p = cv.f(i / N); d += (i ? 'L' : 'M') + (h + p[0] * sc).toFixed(1) + ' ' + (h + p[1] * sc).toFixed(1); }
        paths.push(`<path d="${d}${cv.open ? '' : 'Z'}"/>`);
      });
    });
    const plate = o.plate === false ? '' : `<circle cx="${h}" cy="${h}" r="${sc * .965}" fill="#1D1C19"/><circle cx="${h}" cy="${h}" r="${sc * .965}" fill="none" stroke="#ADA9A1" stroke-opacity=".5" stroke-width="1"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true">${plate}<g fill="none" stroke="#D5D2CB" stroke-opacity=".42" stroke-width=".6" vector-effect="non-scaling-stroke">${paths.join('')}</g></svg>`;
  };

  /* ── shaders ──────────────────────────────────────────── */
  const VS1 = `#version 300 es
  layout(location=0) in vec4 aSeg; layout(location=1) in vec4 aMeta;
  uniform vec2 uRes, uC; uniform float uS, uH, uRot[8];
  out vec2 vP, vA, vB; out float vT; flat out int vL, vSec;
  vec2 rot(vec2 p, float a){ float c=cos(a), s=sin(a); return vec2(c*p.x-s*p.y, s*p.x+c*p.y); }
  void main(){
    int L=int(aMeta.y); float a=uRot[L];
    vec2 A=uC+rot(aSeg.xy,a)*uS, B=uC+rot(aSeg.zw,a)*uS, d=B-A; float l=max(length(d),1e-4); d/=l; vec2 n=vec2(-d.y,d.x);
    int id=gl_VertexID; float sx=(id==1||id==3)?1.:0., sy=(id>=2)?1.:-1.;
    vec2 P=mix(A-d*uH,B+d*uH,sx)+n*uH*sy;
    vP=P; vA=A; vB=B; vT=aMeta.x; vL=L; vSec=int(aMeta.z);
    gl_Position=vec4(P.x/uRes.x*2.-1., 1.-P.y/uRes.y*2., 0., 1.);
  }`;
  const FS1 = `#version 300 es
  precision highp float;
  in vec2 vP, vA, vB; in float vT; flat in int vL, vSec;
  uniform float uHalf, uProg[8], uSect[8], uSectDim, uK;
  out vec4 o;
  void main(){
    float pr=uProg[vL]; if(vT>pr) discard;
    vec2 d=vB-vA; float l=max(length(d),1e-4); vec2 t=d/l; vec2 q=vP-vA; float h=dot(q,t); float dp=abs(t.x*q.y-t.y*q.x);
    float cov=clamp(uHalf+.5-dp,0.,1.)*clamp(h+.5,0.,1.)*clamp(l-h+.5,0.,1.);
    if(vSec>=0) cov*=mix(uSectDim,1.,uSect[vSec]);
    if(cov<=0.) discard;
    float a2=atan(t.y,t.x)*2.;
    float tip=pr<.999 ? smoothstep(pr-.02,pr,vT) : 0.;
    o=vec4(cos(a2)*cov, sin(a2)*cov, cov, tip*cov)*uK;
  }`;
  const VS2 = `#version 300 es
  void main(){ vec2 p=vec2(gl_VertexID==1?3.:-1., gl_VertexID==2?3.:-1.); gl_Position=vec4(p,0.,1.); }`;
  const FS2 = `#version 300 es
  precision highp float;
  uniform sampler2D uTex; uniform vec2 uRes, uC, uL; uniform float uS, uK, uPlate, uPR, uEn, uFill, uED, uEA, uLift, uTime;
  uniform vec3 uE0, uE1, uE2;
  uniform sampler2D uG; uniform float uGl, uGR; uniform vec4 uGC; uniform float uFlow, uGM;
  out vec4 o;
  float h1(float n){ return fract(sin(n*12.9898)*43758.5453); }
  float vn(float x){ float i=floor(x), f=fract(x); f=f*f*(3.-2.*f); return mix(h1(i),h1(i+1.),f); }
  void main(){
    vec2 fc=vec2(gl_FragCoord.x, uRes.y-gl_FragCoord.y);
    vec4 g=texture(uTex, gl_FragCoord.xy/uRes)/uK;
    vec2 p=(fc-uC)/uS; float r=length(p), px=1./uS;
    float cov=clamp(g.b,0.,1.);
    float gm=0., ghx=0., ghy=0.; vec2 guv=p/uGR*.5+.5; vec2 ge=vec2(1./256.,0.);
    if(uGl>.5&&all(greaterThan(guv,vec2(0.)))&&all(lessThan(guv,vec2(1.)))){
      gm=texture(uG,guv).r; ghx=texture(uG,guv+ge.xy).g-texture(uG,guv-ge.xy).g; ghy=texture(uG,guv+ge.yx).g-texture(uG,guv-ge.yx).g;
    }
    if(uGM>1.5) cov*=1.-gm;
    float an=atan(g.g,g.r)*.5; vec2 tg=vec2(cos(an),sin(an)), nr=vec2(-tg.y,tg.x);
    vec2 L=normalize(uL+1e-5), rad=r>1e-5?p/r:vec2(1.,0.);
    /* groove walls flash when the groove runs across the light */
    float wall=pow(abs(dot(nr,L)),3.);
    float glint=clamp(g.a,0.,1.);
    vec3 plat=vec3(.90,.89,.86);
    if(uPlate<.5){
      vec3 c=plat*(.38+.9*wall)+vec3(1.)*glint*1.4;
      float a=min(1.,cov*(.75+.25*wall)+glint);
      if(uFlow>.5){
        /* a wave of Sber colour travels out along the lines, then the plate rests */
        float cyc=mod(uTime,12.), r0=cyc/7.*1.6-.25, band=exp(-pow((r-r0)/.17,2.))*step(cyc,7.);
        float an2=fract(atan(p.y,p.x)/6.2832+.5+uTime*.02);
        vec3 E=an2<.5?mix(uE0,uE1,an2*2.):mix(uE1,uE2,an2*2.-1.);
        c=mix(c,E*(1.3+1.1*wall),clamp(band*1.1,0.,1.));
        a=min(1.,a*(1.+band*1.8));
      }
      o=vec4(c*a,a); return;
    }
    float R=uPR, m=clamp((R-r)/px+.5,0.,1.);
    /* plate: circular-brushed silver; the brushing lights up as a soft cross along the light */
    float br=.55+.45*vn(r*uS*.75)*(.6+.4*vn(r*uS*.11+3.));
    float sol=pow(abs(dot(rad,L)),14.);
    float plateL=.05+.42*sol*br+.03*br;
    float grooveL=.03+1.15*wall*(.55+.45*br);
    vec3 metal=plat*mix(plateL,grooveL,cov);
    /* enamel: thicker in the grooves, so deeper colour there and lighter on the ridges */
    float fm=smoothstep(uFill*1.06+.001, uFill*1.06-.07, r)*uEn;
    vec2 ed=vec2(cos(uEA),sin(uEA)); float s=clamp(dot(p,ed)*.5+.5,0.,1.);
    vec3 E=s<.5?mix(uE0,uE1,s*2.):mix(uE1,uE2,s*2.-1.);
    float th=uED*(.62+.38*cov)*fm;
    vec3 c=mix(metal, metal*E*2.3+E*E*.05, th);
    c*=1.-.28*cov*th;
    /* the glossy dome of the enamel: one soft reflection of the light, a thin fresnel at the rim */
    vec3 n3=normalize(vec3(p/R*.55*uLift,1.)), L3=normalize(vec3(L*.85,.8)), H=normalize(L3+vec3(0.,0.,1.));
    float sp=pow(max(dot(n3,H),0.),260.)*.32*fm;
    float fr=pow(clamp(r/R,0.,1.),7.)*.1*fm;
    c+=vec3(1.,.99,.96)*(sp+fr);
    c+=vec3(1.)*glint*1.2;
    if(uGl>.5){
      vec3 Lg=normalize(vec3(L*.9,.55)), Hg=normalize(Lg+vec3(0.,0.,1.));
      if(uGM<.5){
        /* raised relief over the pattern */
        vec3 N=normalize(vec3(-ghx*6.,-ghy*6.,1.));
        float df=max(dot(N,Lg),0.), gs=pow(max(dot(N,Hg),0.),40.);
        vec3 gc=uGC.a>.5 ? uGC.rgb*(.95+.45*df)+vec3(1.)*gs*.35 : plat*(.5+.55*df)+vec3(1.)*gs*.5;
        float sh=texture(uG,guv+L*.035).r*step(0.,guv.x)*step(guv.x,1.)*step(0.,guv.y)*step(guv.y,1.);
        c*=1.-.5*sh*(1.-gm); c=mix(c,gc,gm);
      } else if(uGM<1.5){
        /* medallion: a polished platinum boss, slightly domed, the mark cut into it */
        float bR=uGR*.98, inb=clamp((bR-r)/px+.5,0.,1.);
        vec3 nb=normalize(vec3(p/bR*.32,1.)); float bd=max(dot(nb,Lg),0.), bs=pow(max(dot(nb,Hg),0.),70.);
        float bev=smoothstep(bR-.035,bR,r);
        vec3 boss=plat*(.36+.42*bd)+vec3(1.)*bs*.55;
        boss+=plat*bev*.55*max(dot(rad,L),0.); boss*=1.-bev*.45*max(-dot(rad,L),0.);
        /* the cut: dark floor, the wall facing the light catches it */
        vec3 N=normalize(vec3(ghx*7.,ghy*7.,1.)); float cw=max(dot(N,Lg),0.);
        vec3 cut=plat*(.07+.5*pow(cw,3.)*(1.-gm*.35));
        boss=mix(boss,cut,gm);
        /* a thin shadow where the boss meets the dial */
        float ring=exp(-pow((r-bR-.006)/(px*2.2),2.));
        c*=1.-.6*ring*(1.-inb);
        c=mix(c,boss,inb);
      } else {
        /* silhouette: the mark is the only polished place in the pattern, with a hairline edge */
        vec3 N=normalize(vec3(-ghx*3.,-ghy*3.,1.)); float df=max(dot(N,Lg),0.), gs=pow(max(dot(N,Hg),0.),60.);
        vec3 pol=plat*(.42+.4*df)+vec3(1.)*gs*.4;
        float edge=clamp(length(vec2(ghx,ghy))*14.,0.,1.);
        c=mix(c,pol,gm*.92); c=mix(c,plat*.95,edge*.55*(1.-gm*.5));
      }
    }
    /* bezel: polished platinum, a dark line where it meets the plate */
    float bw=.022, b0=R, b1=R+bw;
    float inB=clamp((r-b0)/px+.5,0.,1.)*clamp((b1-r)/px+.5,0.,1.);
    float bl=.3+.85*pow(max(dot(rad,L),0.),2.)+.18*pow(max(-dot(rad,L),0.),4.);
    float bz=(r-b0)/bw; bl*=.75+.5*sin(bz*3.14159);
    vec3 bc=plat*bl;
    float edge=exp(-pow((r-b0)/(px*1.2),2.));
    vec3 col=c*m+bc*inB;
    col*=1.-.55*edge;
    float a=max(m,inB);
    o=vec4(col*a,a);
  }`;

  const hex = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };
  const lin = c => c.map(v => Math.pow(v, 1.15));

  /* ── light: one source for the whole page ─────────────── */
  const light = { mode: 'static', x: -.62, y: -.78, tx: -.62, ty: -.78, px: null, py: null };
  const setLightDir = (x, y) => { const l = Math.hypot(x, y) || 1; light.tx = x / l; light.ty = y / l; };
  const followPointer = () => { light.mode = 'pointer'; root.addEventListener('pointermove', e => { light.px = e.clientX; light.py = e.clientY; }, { passive: true }); };
  const followTilt = async () => {
    const DO = root.DeviceOrientationEvent; if (!DO) return false;
    if (typeof DO.requestPermission === 'function') { try { if (await DO.requestPermission() !== 'granted') return false; } catch (e) { return false; } }
    light.mode = 'tilt';
    root.addEventListener('deviceorientation', e => { const gx = Math.max(-40, Math.min(40, e.gamma || 0)) / 40, gy = Math.max(-40, Math.min(40, (e.beta || 45) - 45)) / 40; setLightDir(-.62 + gx * .9, -.78 + gy * .9); });
    return true;
  };

  /* ── renderer ─────────────────────────────────────────── */
  const dials = new Set();
  let raf = 0;
  const loop = now => {
    raf = 0;
    const k = .12; light.x += (light.tx - light.x) * k; light.y += (light.ty - light.y) * k;
    dials.forEach(d => d.visible && d.frame(now));
    if (dials.size) raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

  class Dial {
    constructor(cv, params, o = {}) {
      this.cv = cv; this.o = Object.assign({ enamel: true, plate: true, breathe: true, draw: 1, fill: 1, interactive: true, width: 1, lift: 1, scale: .98, dpr: 0 }, o);
      this.visible = true; this.prog = new Float32Array(8).fill(1); this.sect = new Float32Array(8).fill(1); this.sectDim = .18;
      this.t0 = performance.now(); this.dirty = true;
      const gl = cv.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, preserveDrawingBuffer: !!o.preserve });
      if (!gl || o.forceSvg) { this.svgMode = true; this.params = params; this.renderSvg(); return; }
      this.gl = gl; this.half = !!gl.getExtension('EXT_color_buffer_float');
      const mk = (vs, fs) => { const p = gl.createProgram(); [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]].forEach(([t, src]) => { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); gl.attachShader(p, s); }); gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p)); return p; };
      this.p1 = mk(VS1, FS1); this.p2 = mk(VS2, FS2);
      const U = p => { const m = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS); for (let i = 0; i < n; i++) { const u = gl.getActiveUniform(p, i), nm = u.name.replace('[0]', ''); m[nm] = gl.getUniformLocation(p, u.name); } return m; };
      this.u1 = U(this.p1); this.u2 = U(this.p2);
      this.vao = gl.createVertexArray(); this.buf = gl.createBuffer();
      gl.bindVertexArray(this.vao); gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 32, 0); gl.vertexAttribDivisor(0, 1);
      gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 32, 16); gl.vertexAttribDivisor(1, 1);
      gl.bindVertexArray(null);
      this.vao2 = gl.createVertexArray();
      this.tex = gl.createTexture(); this.fb = gl.createFramebuffer(); this.gtex = gl.createTexture();
      this.params = params;
      this.ro = new ResizeObserver(() => { this.fit(); }); this.ro.observe(cv);
      this.io = new IntersectionObserver(es => { this.visible = es[es.length - 1].isIntersecting; if (this.visible) { this.dirty = true; kick(); } }); this.io.observe(cv);
      cv.addEventListener('webglcontextlost', e => { e.preventDefault(); this.lost = true; });
      this.fit(); dials.add(this); kick();
    }
    get dpr() { return this.o.dpr || Math.min(3, root.devicePixelRatio || 1); }
    fit() {
      if (this.svgMode) return;
      const r = this.cv.getBoundingClientRect(), dpr = this.dpr, W = Math.max(1, Math.round(r.width * dpr)), H = Math.max(1, Math.round(r.height * dpr));
      if (W === this.W && H === this.H && this.geo) return;
      this.W = W; this.H = H; this.cv.width = W; this.cv.height = H;
      const gl = this.gl; gl.bindTexture(gl.TEXTURE_2D, this.tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, this.half ? gl.RGBA16F : gl.RGBA8, W, H, 0, gl.RGBA, this.half ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.tex, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      this.rebuild();
    }
    glyph() {
      const gl = this.gl, name = this.params.glyph; this.hasGlyph = false;
      if (!name || this.glyphName === name && this.glyphOk) { this.hasGlyph = !!name; return; }
      const c = glyphCanvas(name); if (!c) return;
      gl.bindTexture(gl.TEXTURE_2D, this.gtex); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      this.glyphName = name; this.glyphOk = true; this.hasGlyph = true;
    }
    rebuild() {
      if (this.svgMode) { this.renderSvg(); return; }
      this.glyph();
      const S = Math.min(this.W, this.H) / 2 * this.o.scale;
      const data = build(this.params, S); this.n = data.length / 8;
      const gl = this.gl; gl.bindBuffer(gl.ARRAY_BUFFER, this.buf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      this.geo = true; this.dirty = true; kick();
    }
    update(params) { this.params = params; this.rebuild(); }
    set(o) { Object.assign(this.o, o); if ('dpr' in o || 'scale' in o) { this.geo = false; this.fit(); } this.dirty = true; kick(); }
    /* draw the layers one after another, like a burin; returns a promise */
    engrave(ms = 1200, stagger = .55) {
      const L = (this.params.layers || []).length;
      if (RM && RM.matches) { this.prog.fill(1); this.dirty = true; kick(); return Promise.resolve(); }
      return new Promise(res => { this.anim = { t0: performance.now(), ms, stagger, L, res }; this.prog.fill(0); kick(); });
    }
    /* show the first n layers: new ones are engraved, the rest stay as they are */
    reveal(n, ms = 1400, stagger = .5) {
      const L = (this.params.layers || []).length, from = Array.from(this.prog);
      if (RM && RM.matches) { for (let i = 0; i < 8; i++) this.prog[i] = i < n ? 1 : 0; this.dirty = true; kick(); return Promise.resolve(); }
      const todo = []; for (let i = 0; i < L; i++) if (i < n && from[i] < 1) todo.push(i); else if (i >= n) this.prog[i] = 0;
      if (!todo.length) { this.dirty = true; kick(); return Promise.resolve(); }
      return new Promise(res => { this.anim = { t0: performance.now(), ms, stagger, L: todo.length, idx: todo, res }; kick(); });
    }
    fillTo(v, ms = 900) {
      if (RM && RM.matches) { this.o.fill = v; this.dirty = true; kick(); return; }
      this.fa = { t0: performance.now(), ms, a: this.o.fill, b: v }; kick();
    }
    setSectors(arr, dim = .18) { arr.forEach((v, i) => this.sect[i] = v); this.sectDim = dim; this.dirty = true; kick(); }
    frame(now) {
      if (this.svgMode || this.lost || !this.geo) return;
      const gl = this.gl, o = this.o, W = this.W, H = this.H, dpr = this.dpr, still = RM && RM.matches;
      if (this.anim) {
        const a = this.anim, u = Math.min(1, (now - a.t0) / a.ms), span = 1 / (1 + (a.L - 1) * a.stagger);
        for (let i = 0; i < a.L; i++) { const s = i * a.stagger * span, j = a.idx ? a.idx[i] : i; let v = Math.max(0, Math.min(1, (u - s) / span)); this.prog[j] = 1 - Math.pow(1 - v, 2); }
        if (u >= 1) { if (a.idx) a.idx.forEach(j => this.prog[j] = 1); else this.prog.fill(1); a.res(); this.anim = null; }
        this.dirty = true;
      }
      if (this.fa) { const f = this.fa, u = Math.min(1, (now - f.t0) / f.ms), e = 1 - Math.pow(1 - u, 3); this.o.fill = f.a + (f.b - f.a) * e; if (u >= 1) this.fa = null; this.dirty = true; }
      let lx = light.x, ly = light.y;
      if (light.mode === 'pointer' && light.px != null && o.interactive) {
        /* one light source at the pointer: every dial takes its own direction to it */
        const r = this.cv.getBoundingClientRect(), dx = light.px - (r.left + r.width / 2), dy = light.py - (r.top + r.height / 2), l = Math.hypot(dx, dy) || 1;
        if (this.plx == null) { this.plx = lx; this.ply = ly; }
        this.plx += (dx / l - this.plx) * .14; this.ply += (dy / l - this.ply) * .14; lx = this.plx; ly = this.ply;
      }
      const breathe = o.breathe && !still;
      const t = (now - this.t0) / 1000;
      if (!this.dirty && !breathe && Math.abs(lx - (this.lx || 0)) < 1e-4 && Math.abs(ly - (this.ly || 0)) < 1e-4) return;
      this.dirty = false; this.lx = lx; this.ly = ly;
      const S = Math.min(W, H) / 2 * o.scale, C = [W / 2, H / 2];
      const rot = new Float32Array(8);
      if (breathe) for (let i = 0; i < 8; i++) rot[i] = Math.sin(t * TAU / 8 + i * 1.7) * (i % 2 ? -1 : 1) * (2 * Math.PI / 180) * (i === 0 ? .6 : 1);
      const K = this.half ? 1 : .5;
      /* pass 1: engraved lines into the groove buffer */
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb); gl.viewport(0, 0, W, H);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND); gl.blendEquation(gl.FUNC_ADD); gl.blendFunc(gl.ONE, gl.ONE);
      gl.useProgram(this.p1); const u1 = this.u1;
      gl.uniform2f(u1.uRes, W, H); gl.uniform2f(u1.uC, C[0], C[1]); gl.uniform1f(u1.uS, S);
      const half = o.width * dpr / 2; gl.uniform1f(u1.uH, half + 1.5); gl.uniform1f(u1.uHalf, half);
      gl.uniform1fv(u1.uRot, rot); gl.uniform1fv(u1.uProg, this.prog); gl.uniform1fv(u1.uSect, this.sect); gl.uniform1f(u1.uSectDim, this.sectDim); gl.uniform1f(u1.uK, K);
      gl.bindVertexArray(this.vao); gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, this.n);
      /* pass 2: metal and enamel */
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, W, H);
      gl.disable(gl.BLEND); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(this.p2); const u2 = this.u2, en = this.params.enamel || { stops: ENAMEL.btc, angle: -40, density: .9 };
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.tex); gl.uniform1i(u2.uTex, 0);
      gl.uniform2f(u2.uRes, W, H); gl.uniform2f(u2.uC, C[0], C[1]); gl.uniform1f(u2.uS, S); gl.uniform2f(u2.uL, lx, ly); gl.uniform1f(u2.uK, K);
      gl.uniform1f(u2.uPlate, o.plate ? 1 : 0); gl.uniform1f(u2.uPR, .965); gl.uniform1f(u2.uEn, o.enamel ? 1 : 0); gl.uniform1f(u2.uFill, o.fill);
      gl.uniform1f(u2.uED, en.density); gl.uniform1f(u2.uEA, en.angle * Math.PI / 180); gl.uniform1f(u2.uLift, o.lift); gl.uniform1f(u2.uFlow, o.flow ? 1 : 0); gl.uniform1f(u2.uGM, this.params.glyphMode || 0); gl.uniform1f(u2.uTime, t);
      const st = en.stops.map(h => lin(hex(h))); gl.uniform3fv(u2.uE0, st[0]); gl.uniform3fv(u2.uE1, st[1]); gl.uniform3fv(u2.uE2, st[2] || st[1]);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.gtex); gl.uniform1i(u2.uG, 1);
      gl.uniform1f(u2.uGl, this.hasGlyph && o.plate ? 1 : 0); gl.uniform1f(u2.uGR, this.params.glyphR || .3); { const gcol = this.params.glyphColor; const v = gcol ? lin(hex(gcol)) : [0, 0, 0]; gl.uniform4f(u2.uGC, v[0], v[1], v[2], gcol ? 1 : 0); }
      gl.bindVertexArray(this.vao2); gl.drawArrays(gl.TRIANGLES, 0, 3); gl.activeTexture(gl.TEXTURE0);
      if (o.onFrame) o.onFrame();
    }
    renderSvg() {
      const r = this.cv.getBoundingClientRect(), size = Math.round(r.width) || 200;
      if (!this.svgEl) { this.svgEl = document.createElement('div'); this.svgEl.className = 'gl-svg'; this.svgEl.style.cssText = 'position:absolute;inset:0;display:grid;place-items:center'; this.cv.style.visibility = 'hidden'; const p = this.cv.parentNode; if (getComputedStyle(p).position === 'static') p.style.position = 'relative'; p.appendChild(this.svgEl); }
      this.svgEl.innerHTML = svg(this.params, size, { plate: this.o.plate });
    }
    destroy() { dials.delete(this); this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); if (this.svgEl) this.svgEl.remove(); }
  }

  /* ── shared snapshots for minis: one context, many bitmaps ─ */
  let shared = null;
  const cache = new Map();
  const snapshot = (params, css, o = {}) => {
    const dpr = o.dpr || Math.min(3, root.devicePixelRatio || 1), key = JSON.stringify([params, css, dpr, o.enamel, o.plate, light.mode === 'static' ? 0 : 1]);
    const out = document.createElement('canvas'); out.width = Math.round(css * dpr); out.height = out.width; out.style.width = out.style.height = css + 'px';
    /* every call gets its own canvas; the cached bitmap is copied, not moved */
    if (cache.has(key)) { out.getContext('2d').drawImage(cache.get(key), 0, 0); return out; }
    if (!supported) { out.getContext('2d'); cache.set(key, out); return out; }
    if (!shared) { const c = document.createElement('canvas'); c.style.cssText = `position:fixed;left:-9999px;top:0;width:${css}px;height:${css}px`; document.body.appendChild(c); shared = new Dial(c, params, { breathe: false, interactive: false, preserve: true, dpr }); dials.delete(shared); shared.io.disconnect(); shared.ro.disconnect(); }
    shared.cv.style.width = shared.cv.style.height = css + 'px';
    shared.o = Object.assign(shared.o, { dpr, enamel: o.enamel !== false, plate: o.plate !== false, width: o.width || 1, scale: o.scale || .98 });
    shared.params = params; shared.geo = false; shared.W = 0; shared.fit(); shared.dirty = true; shared.frame(performance.now());
    out.getContext('2d').drawImage(shared.cv, 0, 0, out.width, out.height);
    cache.set(key, out); return out;
  };

  const supported = (() => { try { return !!document.createElement('canvas').getContext('webgl2'); } catch (e) { return false; } })();

  const icon = (coin, css) => {
    const d = Math.min(3, root.devicePixelRatio || 1), c = document.createElement('canvas'); c.width = c.height = Math.round(css * d); c.style.width = c.style.height = css + 'px'; c.setAttribute('aria-hidden', 'true');
    const g = c.getContext('2d'); g.scale(d, d); g.fillStyle = BRAND[coin]; g.beginPath(); g.arc(css / 2, css / 2, css / 2, 0, Math.PI * 2); g.fill();
    g.scale(css / 32, css / 32); MARKS[coin + '-logo'].forEach(([p, t]) => { g.globalAlpha = t; g.fillStyle = '#fff'; g.fill(new Path2D(p)); });
    return c;
  };
  root.Guilloche = { icon, BRAND, Dial, mount: (cv, p, o) => new Dial(cv, p, o), preset, presets: PRESETS, seedFromString, svg, snapshot, light, setLightDir, followPointer, followTilt, supported, curvesOf, rng, hash32 };
})(window);
