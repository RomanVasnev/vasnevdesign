/* «Сбер Крипто» · Medal — a struck coin: scalloped rim, lettering, raised faceted mark, guilloche field under enamel.
   The relief is a height map built on the CPU (Float32, in coin-radius units); one WebGL2 pass lights it as metal. */
(function (root) {
  'use strict';
  const TAU = Math.PI * 2;

  /* marks in the 32-box of cryptocurrency-icons; tris carry vertex heights for the facets */
  const COINS = {
    eth: {
      legend: 'ETH',
      paths: ['M16.498 4v8.87l7.497 3.35z', 'M16.498 4L9 16.22l7.498-3.35z', 'M16.498 21.968v6.027L24 17.616z', 'M16.498 27.995v-6.028L9 17.616z', 'M16.498 20.573l7.497-4.353-7.497-3.348z', 'M9 16.22l7.498 4.353v-7.701z'],
      /* the upper diamond is an octahedron seen nose-on: apex (16.498,12.872) comes towards us; the chevron is a bent plate */
      tris: [
        [[16.498, 4, 0], [9, 16.22, 0], [16.498, 12.872, 1]],
        [[16.498, 4, 0], [16.498, 12.872, 1], [23.995, 16.22, 0]],
        [[9, 16.22, 0], [16.498, 20.573, 0], [16.498, 12.872, 1]],
        [[16.498, 20.573, 0], [23.995, 16.22, 0], [16.498, 12.872, 1]],
        [[16.498, 21.968, .85], [16.498, 27.995, .85], [24, 17.616, 0]],
        [[16.498, 27.995, .85], [16.498, 21.968, .85], [9, 17.616, 0]]
      ],
      center: [16.5, 16], height: 24
    }
  };

  const DEF = {
    coin: 'eth',
    finish: 'gradient',        // gradient · enamel · platinum
    edge: .955, scN: 20, scAmp: 0,
    lipW: .062, band: [.705, .865], innerLip: [.665, .705],
    logoH: .66, facetH: .1,
    guilloche: { rings: 42, k: 14, amp: .02, rIn: .07, rOut: .655, width: .0034, L: .3 },
    reeds: 132, reedDepth: .006,
    textSize: .13, smallSize: .075
  };

  /* ── CPU relief ─────────────────────────────────────── */
  const box = (src, N, r) => {
    const tmp = new Float32Array(N * N), out = new Float32Array(N * N), inv = 1 / (2 * r + 1), c = v => v < 0 ? 0 : v > N - 1 ? N - 1 : v;
    for (let y = 0; y < N; y++) { const o = y * N; let s = 0; for (let x = -r; x <= r; x++) s += src[o + c(x)]; for (let x = 0; x < N; x++) { tmp[o + x] = s * inv; s += src[o + c(x + r + 1)] - src[o + c(x - r)]; } }
    for (let x = 0; x < N; x++) { let s = 0; for (let y = -r; y <= r; y++) s += tmp[c(y) * N + x]; for (let y = 0; y < N; y++) { out[y * N + x] = s * inv; s += tmp[c(y + r + 1) * N + x] - tmp[c(y - r) * N + x]; } }
    return out;
  };
  const blur = (a, N, r) => { r = Math.max(1, Math.round(r)); return box(box(box(a, N, r), N, r), N, r); };
  /* rounded «inflated» profile: 0 at the outline, 1 at distance w inside */
  const pillow = (m, N, wPx) => { const b = blur(m, N, wPx / 2.2), o = new Float32Array(N * N); for (let i = 0; i < o.length; i++) { const t = Math.min(1, Math.max(0, (b[i] - .5) * 2)); o[i] = Math.sqrt(t * (2 - t)); } return o; };

  function relief(N, o) {
    const S = N / 2, cv = document.createElement('canvas'); cv.width = cv.height = N;
    const g = cv.getContext('2d', { willReadFrequently: true }), coin = COINS[o.coin];
    const mask = draw => {
      g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, N, N);
      g.setTransform(S, 0, 0, S, S, S); g.fillStyle = g.strokeStyle = '#fff'; g.lineCap = g.lineJoin = 'round';
      draw(g);
      const d = g.getImageData(0, 0, N, N).data, a = new Float32Array(N * N);
      for (let i = 0; i < a.length; i++) a[i] = d[i * 4 + 3] / 255;
      return a;
    };
    const rEdge = th => o.edge + o.scAmp * Math.cos(o.scN * th);
    const scallop = (g, off) => { for (let i = 0; i <= 1440; i++) { const th = i / 1440 * TAU, r = rEdge(th) + off; i ? g.lineTo(r * Math.cos(th), r * Math.sin(th)) : g.moveTo(r * Math.cos(th), r * Math.sin(th)); } g.closePath(); };
    const ring = (g, a, b) => { g.beginPath(); g.arc(0, 0, b, 0, TAU); g.arc(0, 0, a, 0, TAU, true); g.fill(); };

    /* lettering: plain strict sans capitals */
    const FONT = '700 100px "Helvetica Neue", Helvetica, Arial, sans-serif', SQ = 1;
    const arcText = (g, str, r, size, top, track) => {
      g.font = FONT; g.textBaseline = 'alphabetic';
      const k = size / 100, ws = [...str].map(ch => g.measureText(ch).width * k * SQ), total = ws.reduce((s, w) => s + w, 0) + track * (ws.length - 1);
      let cum = 0;
      [...str].forEach((ch, i) => {
        const a = top ? -Math.PI / 2 + (cum + ws[i] / 2 - total / 2) / r : Math.PI / 2 - (cum + ws[i] / 2 - total / 2) / r;
        g.save(); g.translate(r * Math.cos(a), r * Math.sin(a)); g.rotate(top ? a + Math.PI / 2 : a - Math.PI / 2); g.scale(k * SQ, k);
        g.lineWidth = 7; g.fillText(ch, -g.measureText(ch).width / 2, 0); g.strokeText(ch, -g.measureText(ch).width / 2, 0); g.restore();
        cum += ws[i] + track;
      });
    };
    const flatText = (g, str, x, y, size) => { g.save(); g.font = FONT; g.textBaseline = 'middle'; g.translate(x, y); g.scale(size / 100 * SQ, size / 100); g.lineWidth = 1.5; g.fillText(str, -g.measureText(str).width / 2, 4); g.strokeText(str, -g.measureText(str).width / 2, 4); g.restore(); };
    const diamond = (g, a, r, s) => { g.save(); g.translate(r * Math.cos(a), r * Math.sin(a)); g.rotate(a + Math.PI / 2); g.beginPath(); g.moveTo(0, -s); g.lineTo(s * .62, 0); g.lineTo(0, s); g.lineTo(-s * .62, 0); g.closePath(); g.fill(); g.restore(); };

    const sc = o.logoH / coin.height, [cx, cy] = coin.center;
    const logoPath = g => { g.save(); g.scale(sc, sc); g.translate(-cx, -cy); coin.paths.forEach(p => g.fill(new Path2D(p))); g.restore(); };

    const body = mask(g => { g.beginPath(); scallop(g, 0); g.fill(); });
    const lip = mask(g => { g.beginPath(); scallop(g, 0); scallop(g, -o.lipW); g.fill('evenodd'); });
    const letters = mask(g => {
      /* centred in the band between the two rims, by the real cap height of the face */
      g.font = FONT; const mid = (o.innerLip[1] + o.edge - o.lipW) / 2, cap = g.measureText('ETH').actualBoundingBoxAscent * o.textSize / 100;
      /* one legend all the way round: ETH ◆ ETH ◆ …, evenly spaced, every word upright from the rim */
      g.font = FONT; g.textBaseline = 'alphabetic';
      const k = o.textSize / 100, str = coin.legend, track = .006, rb = mid - cap / 2;
      const ws = [...str].map(ch => g.measureText(ch).width * k * SQ), wWord = ws.reduce((a, b) => a + b, 0) + track * (ws.length - 1);
      const n = Math.max(3, Math.floor(TAU * rb / (wWord + .13))), step = TAU / n;
      for (let j = 0; j < n; j++) {
        const a0 = -Math.PI / 2 + j * step;
        let cum = 0;
        [...str].forEach((ch, i) => {
          const a = a0 + (cum + ws[i] / 2 - wWord / 2) / rb;
          g.save(); g.translate(rb * Math.cos(a), rb * Math.sin(a)); g.rotate(a + Math.PI / 2); g.scale(k * SQ, k);
          g.lineWidth = 1.5; g.fillText(ch, -g.measureText(ch).width / 2, 0); g.strokeText(ch, -g.measureText(ch).width / 2, 0); g.restore();
          cum += ws[i] + track;
        });
        diamond(g, a0 + step / 2, mid, .022);
      }
    });
    const inner = mask(g => ring(g, o.innerLip[0], o.innerLip[1]));
    const field = mask(g => { g.beginPath(); g.arc(0, 0, o.innerLip[0] + .004, 0, TAU); g.fill(); });
    const small = mask(g => {
      for (let i = 0; i < 90; i++) { const a = i / 90 * TAU; g.beginPath(); g.arc(.637 * Math.cos(a), .637 * Math.sin(a), .0065, 0, TAU); g.fill(); }
    });
    const logo = mask(logoPath);
    const G = o.guilloche;
    const ringPath = (g, c, dir) => {
      const R = G.rIn + (G.rOut - G.rIn) * c / (G.rings - 1), ph = dir * TAU * c / G.rings * .5, A = G.amp * (.35 + .65 * R / G.rOut);
      g.beginPath();
      for (let i = 0; i <= 900; i++) { const t = i / 900 * TAU, r = R + A * Math.sin(G.k * t + ph); i ? g.lineTo(r * Math.cos(t), r * Math.sin(t)) : g.moveTo(r * Math.cos(t), r * Math.sin(t)); }
    };
    const fam = dir => mask(g => { g.lineWidth = G.width; for (let c = 0; c < G.rings; c++) { ringPath(g, c, dir); g.stroke(); } });
    /* which line a pixel belongs to: each ring is painted with its own number, a little wider than the groove */
    const index = dir => {
      g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, N, N); g.setTransform(S, 0, 0, S, S, S);
      g.lineWidth = G.width * 3; g.lineCap = g.lineJoin = 'round';
      for (let c = 0; c < G.rings; c++) { g.strokeStyle = `rgb(${c + 1},0,0)`; ringPath(g, c, dir); g.stroke(); }
      const d = g.getImageData(0, 0, N, N).data, a = new Float32Array(N * N);
      for (let i = 0; i < a.length; i++) a[i] = d[i * 4 + 3] > 8 ? Math.round(d[i * 4] * 255 / d[i * 4 + 3]) - 1 : -1;
      return a;
    };
    const grA = fam(1), grB = fam(-1), idA = index(1), idB = index(-1);

    /* facets: exact planes per triangle */
    const fac = new Float32Array(N * N);
    coin.tris.forEach(T => {
      const P = T.map(([x, y, h]) => [(x - cx) * sc * S + S, (y - cy) * sc * S + S, h]);
      const x0 = Math.max(0, Math.floor(Math.min(P[0][0], P[1][0], P[2][0])) - 1), x1 = Math.min(N - 1, Math.ceil(Math.max(P[0][0], P[1][0], P[2][0])) + 1);
      const y0 = Math.max(0, Math.floor(Math.min(P[0][1], P[1][1], P[2][1])) - 1), y1 = Math.min(N - 1, Math.ceil(Math.max(P[0][1], P[1][1], P[2][1])) + 1);
      const [a, b, c] = P, d = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        const px = x + .5, py = y + .5, l1 = ((b[1] - c[1]) * (px - c[0]) + (c[0] - b[0]) * (py - c[1])) / d, l2 = ((c[1] - a[1]) * (px - c[0]) + (a[0] - c[0]) * (py - c[1])) / d, l3 = 1 - l1 - l2;
        if (l1 >= -.02 && l2 >= -.02 && l3 >= -.02) fac[y * N + x] = Math.max(fac[y * N + x], l1 * a[2] + l2 * b[2] + l3 * c[2]);
      }
    });

    const px = r => r * S;
    const pBody = pillow(body, N, px(.05)), pLip = pillow(lip, N, px(.022)), pLet = pillow(letters, N, px(.0065)),
      pIn = pillow(inner, N, px(.018)), pSmall = pillow(small, N, px(.0035)), pLogo = pillow(logo, N, px(.012)),
      grA_ = blur(grA, N, 1.2), grB_ = blur(grB, N, 1.2), fieldS = blur(field, N, px(.006)), logoWide = blur(logo, N, px(.01)), smallWide = blur(small, N, px(.005)), facS = blur(fac, N, .8);

    const H = new Float32Array(N * N), E = new Float32Array(N * N), G2 = new Float32Array(N * N * 4);
    for (let i = 0; i < H.length; i++) {
      const lm = Math.min(1, logo[i] * 1.0), y = (i / N | 0) / S - 1, x = (i % N) / S - 1, r2 = x * x + y * y;
      const dish = fieldS[i] * .006 * (1 - Math.min(1, r2 / (o.innerLip[0] * o.innerLip[0])));
      let h = pBody[i] * .036 + pLip[i] * .017 + pLet[i] * .014 + pIn[i] * .015 + pSmall[i] * .01 - dish;
      /* reeded edge: fine ribs across the rolled rim, fading in towards the edge */
      const rr = Math.sqrt(r2), wR = Math.min(1, Math.max(0, (rr - (o.edge - o.lipW * .75)) / (o.lipW * .6)));
      if (wR > 0) { const c = Math.cos(Math.atan2(y, x) * o.reeds); h -= o.reedDepth * wR * (1 - c * c) * body[i]; }
      /* grooves stay apart: the shader cuts them in over time */
      const keep = fieldS[i] * (1 - Math.min(1, logoWide[i] * 2)) * (1 - Math.min(1, smallWide[i] * 2));
      G2[i * 4] = grA_[i] * keep; G2[i * 4 + 1] = grB_[i] * keep;
      /* when the burin reaches this point: the lines are cut one by one from the centre out, each traced along its own path from its own start */
      const u = (Math.atan2(y, x) / TAU + 1) % 1, when = id => id < 0 ? 1 : id / (G.rings - 1) * (1 - G.L) + ((u - id * .137 % 1 + 2) % 1) * G.L;
      G2[i * 4 + 2] = when(idA[i]); G2[i * 4 + 3] = when(idB[i]);
      h += pLogo[i] * .022 + facS[i] * o.facetH * lm;
      H[i] = h;
      E[i] = fieldS[i] * (1 - Math.min(1, logoWide[i] * 1.6)) * (1 - Math.min(1, smallWide[i] * 1.6));
    }
    const Hb = blur(H, N, px(.008));
    const tex = new Float32Array(N * N * 4);
    for (let i = 0; i < H.length; i++) { tex[i * 4] = H[i]; tex[i * 4 + 1] = E[i]; tex[i * 4 + 2] = body[i]; tex[i * 4 + 3] = Hb[i]; }
    return { tex, tex2: G2, N, fill: .036 + .003, depth: .0055 };
  }

  /* ── GPU light ──────────────────────────────────────── */
  const VS = `#version 300 es
in vec2 p; out vec2 vUv; void main(){ vUv = p * .5 + .5; vUv.y = 1. - vUv.y; gl_Position = vec4(p, 0., 1.); }`;
  const FS = `#version 300 es
precision highp float;
uniform sampler2D uT, uG; uniform vec2 uTx; uniform vec2 uL; uniform float uMode, uFill, uRelief, uPA, uPB, uDepth;
float cut(vec2 uv){ vec4 g = texture(uG, uv); float a = smoothstep(g.b, g.b + .003, uPA), b = smoothstep(g.a, g.a + .003, uPB); return min(1., g.r * a + g.g * b) * uDepth; }
float H(vec2 uv){ return texture(uT, uv).r - cut(uv); }
in vec2 vUv; out vec4 o;
vec3 grad(vec2 p){
  float t = clamp(dot(p, normalize(vec2(.72, -.7))) * .55 + .5, 0., 1.);
  vec3 a = vec3(.30, .86, .28), b = vec3(.10, .62, .78), c = vec3(.08, .26, .86);
  return t < .5 ? mix(a, b, t * 2.) : mix(b, c, t * 2. - 1.);
}
float env(vec3 r, vec3 L){
  float k = max(dot(r, L), 0.);
  float key = pow(k, 90.) * 3.6 + pow(k, 10.) * 1.15 + pow(k, 3.) * .22;
  float sky = smoothstep(.15, .95, r.y) * .5;
  vec3 L2 = normalize(vec3(-L.x * 1.4 + .2, -L.y - .5, .4));
  float rim = pow(max(dot(r, L2), 0.), 14.) * 1.1;
  float side = smoothstep(.55, .95, abs(r.x)) * .18;
  return .012 + sky + key + rim + side;
}
void main(){
  vec4 t = texture(uT, vUv);
  if (t.b < .003) discard;
  vec2 d = uTx;
  float hl = H(vUv - vec2(d.x, 0.)), hr = H(vUv + vec2(d.x, 0.));
  float hu = H(vUv - vec2(0., d.y)), hd = H(vUv + vec2(0., d.y));
  float h0 = t.r - cut(vUv);
  vec4 gg = texture(uG, vUv);
  float s = uRelief / (4. * d.x);
  vec3 n = normalize(vec3(-(hr - hl) * s, (hd - hu) * s, 1.));
  vec2 p = vec2(vUv.x * 2. - 1., 1. - vUv.y * 2.);
  vec3 L = normalize(vec3(uL.x, uL.y, 1.));
  vec3 V = normalize(vec3(-p * .34, 1.));
  vec3 r = reflect(-V, n);
  float e = env(r, L);
  float cav = clamp((h0 - t.a) * 55., -1., 1.);
  float ao = clamp(1. + cav * .9, .25, 1.15);
  vec3 plat = vec3(.86, .88, .92);
  vec3 tint = uMode > .5 && uMode < 1.5 ? mix(grad(p), vec3(.9), .12) : plat;
  vec3 col = e * tint * ao;
  col += max(e - 1.4, 0.) * .25;
  /* enamel: tinted glass over the guilloche; the deeper the groove, the richer the colour */
  if (uMode < .5) {
    float dep = max(uFill - h0, 0.);
    vec3 ec = grad(p);
    float a = clamp(.62 + dep * 70., 0., .97);
    vec3 under = col * mix(vec3(1.), ec * 1.15, a) + ec * .035;
    vec3 gn = normalize(vec3(p * .22, 1.));
    float gl = env(reflect(-V, gn), L);
    vec3 glass = under * .94 + vec3(gl) * .07 + vec3(pow(max(dot(reflect(-V, gn), L), 0.), 220.) * 1.4);
    col = mix(col, glass, t.g);
  }
  /* the burin's spark at the cutting front */
  float front = exp(-pow((gg.b - uPA) / .004, 2.)) * gg.r * step(uPA, .999) + exp(-pow((gg.a - uPB) / .004, 2.)) * gg.g * step(uPB, .999);
  col += vec3(1., .98, .92) * front * 1.4;
  col = 1. - exp(-col * 1.25);
  col = pow(col, vec3(1. / 1.9));
  o = vec4(col * t.b, t.b);
}`;

  const CACHE = {};
  function mount(canvas, opts = {}) {
    const o = Object.assign({}, DEF, opts), gl = canvas.getContext('webgl2', { premultipliedAlpha: true, antialias: false, alpha: true, preserveDrawingBuffer: !!opts.still });
    if (!gl) return null;
    const N = o.res || (matchMedia('(max-width: 600px)').matches ? 1024 : 1536);
    const sh = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(x); return x; };
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr); gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = n => gl.getUniformLocation(pr, n);
    const tx = gl.createTexture(), tx2 = gl.createTexture();
    let R;
    const upload = () => {
      /* the relief is the slow part: one per coin and resolution, shared by every medal on the page */
      const key = N + JSON.stringify([o.coin, o.facetH, o.logoH, o.guilloche, o.scN, o.scAmp, o.edge, o.reeds, o.reedDepth, o.textSize]);
      R = CACHE[key] || (CACHE[key] = relief(N, o));
      gl.bindTexture(gl.TEXTURE_2D, tx);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, N, N, 0, gl.RGBA, gl.FLOAT, R.tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tx2);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, N, N, 0, gl.RGBA, gl.FLOAT, R.tex2);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(U('uT'), 0); gl.uniform1i(U('uG'), 1);
    };
    upload();

    const light = { x: -.35, y: .55, tx: -.35, ty: .55 };
    let user = 0, raf = 0, t0 = performance.now(), still = !!o.still, pa = 1, pb = 1, eng = null;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const size = () => { const dpr = Math.min(devicePixelRatio || 1, 2.5), w = Math.round((o.px || canvas.clientWidth) * dpr); if (canvas.width !== w) { canvas.width = canvas.height = w; } };
    const draw = () => {
      size(); gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(U('uTx'), 1 / N, 1 / N); gl.uniform2f(U('uL'), light.x, light.y);
      gl.uniform1f(U('uMode'), { enamel: 0, gradient: 1, platinum: 2 }[o.finish] ?? 0); gl.uniform1f(U('uFill'), R.fill); gl.uniform1f(U('uRelief'), o.relief || 1); gl.uniform1f(U('uPA'), pa); gl.uniform1f(U('uPB'), pb); gl.uniform1f(U('uDepth'), R.depth);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const loop = now => {
      raf = 0;
      if (!still && !reduce && now - user > 2500) { const k = (now - t0) / 1000 * .35; light.tx = .55 * Math.cos(k) - .1; light.ty = .45 + .3 * Math.sin(k * 1.3); }
      if (eng) { const u = Math.min(1, (now - eng.t) / eng.dur); setProg(u); if (u >= 1) eng = null; }
      light.x += (light.tx - light.x) * .09; light.y += (light.ty - light.y) * .09;
      draw();
      if (eng || !still && !(reduce && Math.abs(light.tx - light.x) < 1e-3 && Math.abs(light.ty - light.y) < 1e-3)) raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const onMove = e => {
      const b = canvas.getBoundingClientRect(), mx = (e.clientX - (b.left + b.width / 2)) / (b.width * .9), my = (e.clientY - (b.top + b.height / 2)) / (b.height * .9);
      light.tx = Math.max(-1.4, Math.min(1.4, mx)); light.ty = Math.max(-1.2, Math.min(1.6, -my)); user = performance.now(); kick();
    };
    const onTilt = e => { if (e.gamma == null) return; light.tx = Math.max(-1.2, Math.min(1.2, e.gamma / 35)); light.ty = Math.max(-1, Math.min(1.4, (e.beta - 45) / -35 + .3)); user = performance.now(); kick(); };
    addEventListener('pointermove', onMove, { passive: true }); addEventListener('deviceorientation', onTilt);
    addEventListener('resize', kick);
    if (o.light) { light.x = light.tx = o.light[0]; light.y = light.ty = o.light[1]; }
    /* the two families are cut one after another with an overlap, like the layers of the guilloche engine */
    const ST = .5, SPAN = 1 / (1 + ST), ease = v => v;
    const setProg = u => { pa = ease(Math.max(0, Math.min(1, u / SPAN))); pb = ease(Math.max(0, Math.min(1, (u - ST * SPAN) / SPAN))); };
    const engrave = (dur = 4200) => { if (reduce) { setProg(1); kick(); return; } setProg(0); eng = { t: performance.now(), dur }; kick(); };
    if (o.progress != null) setProg(o.progress);
    if (o.engrave && !still) engrave(); else still ? draw() : kick();
    return {
      set(p) { const re = ['coin', 'facetH', 'logoH', 'guilloche', 'scN', 'scAmp', 'edge'].some(k => k in p); Object.assign(o, p); if (re) upload(); kick(); if (still) draw(); },
      engrave,
      light(x, y) { light.x = light.tx = x; light.y = light.ty = y; user = performance.now(); draw(); },
      destroy() { removeEventListener('pointermove', onMove); removeEventListener('deviceorientation', onTilt); removeEventListener('resize', kick); cancelAnimationFrame(raf); const x = gl.getExtension('WEBGL_lose_context'); if (x) x.loseContext(); }
    };
  }

  /* a still picture of a medal for lists and pickers: one GL context, drawn once, copied to a 2D canvas */
  const SNAP = {};
  function snapshot(opts, css) {
    const dpr = Math.min(devicePixelRatio || 1, 3), k = JSON.stringify(opts) + css + dpr;
    if (!SNAP[k]) {
      const c = document.createElement('canvas'), m = mount(c, Object.assign({}, opts, { px: css, still: true, res: css * dpr > 300 ? 1024 : 512, light: opts.light || [-.35, .6] }));
      const out = document.createElement('canvas'); out.width = out.height = c.width;
      if (m) { out.getContext('2d').drawImage(c, 0, 0); m.destroy(); }
      SNAP[k] = out;
    }
    const cp = document.createElement('canvas'); cp.width = cp.height = SNAP[k].width; cp.getContext('2d').drawImage(SNAP[k], 0, 0);
    cp.style.width = cp.style.height = css + 'px'; return cp;
  }
  root.Medal = { mount, snapshot, COINS, DEF };
})(window);
