(()=>{var yn=Object.create;var Q=Object.defineProperty;var wn=Object.getOwnPropertyDescriptor;var vn=Object.getOwnPropertyNames;var kn=Object.getPrototypeOf,Rn=Object.prototype.hasOwnProperty;var $=(o,r)=>()=>{try{return r||o((r={exports:{}}).exports,r),r.exports}catch(i){throw r=0,i}};var Nn=(o,r,i,p)=>{if(r&&typeof r=="object"||typeof r=="function")for(let d of vn(r))!Rn.call(o,d)&&d!==i&&Q(o,d,{get:()=>r[d],enumerable:!(p=wn(r,d))||p.enumerable});return o};var b=(o,r,i)=>(i=o!=null?yn(kn(o)):{},Nn(r||!o||!o.__esModule?Q(i,"default",{value:o,enumerable:!0}):i,o));var F=$((Tn,Z)=>{Z.exports=window.__R.react});var en=$((Dn,nn)=>{nn.exports=window.__R["react-dom/client"]});var M=$((zn,tn)=>{tn.exports=window.__R["react/jsx-runtime"]});var L=b(F()),sn=b(en());var x=b(F());var a=b(F()),e=b(M()),P="#1d1d1f",Mn="Geist, -apple-system, BlinkMacSystemFont, Inter, 'Segoe UI', Roboto, sans-serif",an="'Geist Mono', ui-monospace, 'SF Mono', Menlo, monospace",Cn=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9 .02' numOctaves='2' seed='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,En=`
.hc-face{position:absolute;inset:0;border-radius:18px;overflow:hidden;backface-visibility:hidden;-webkit-backface-visibility:hidden;color:${P};
  background:linear-gradient(135deg,#fdfdfe 0%,#ececf1 38%,#f8f8fa 62%,#e2e2e8 100%);
  box-shadow:inset 0 0 0 .5px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.9)}
.hc-layer{position:absolute;pointer-events:none}
.hc-grain{inset:0;opacity:.35;mix-blend-mode:soft-light;background-image:${Cn};background-size:200px 200px}
.hc-film{inset:-30%;mix-blend-mode:multiply;opacity:calc(var(--ho,.6) * var(--foil,1));
  background:linear-gradient(115deg,#ffd9ec 0%,#ffe6cf 12%,#fff6c9 22%,#d4f7e4 34%,#c9ecff 46%,#d9d4ff 58%,#f6d0ff 70%,#ffd9ec 82%,#ffe6cf 100%);
  background-size:300% 300%;background-position:var(--hx,50%) var(--hy,50%);
  -webkit-mask-image:radial-gradient(85% 110% at var(--mx,50%) var(--my,50%),#000 0%,rgba(0,0,0,.55) 50%,rgba(0,0,0,.15) 85%);
  mask-image:radial-gradient(85% 110% at var(--mx,50%) var(--my,50%),#000 0%,rgba(0,0,0,.55) 50%,rgba(0,0,0,.15) 85%)}
.hc-film2{inset:-30%;mix-blend-mode:color;opacity:calc(var(--ho,.6) * .55 * var(--foil,1));
  background:conic-gradient(from var(--ca,0deg) at var(--mx,50%) var(--my,50%),#ff9ad5,#ffc58f,#fff08f,#9ff0c6,#8fd6ff,#b8a6ff,#ff9ad5);
  -webkit-mask-image:radial-gradient(60% 80% at var(--mx,50%) var(--my,50%),#000,transparent 75%);
  mask-image:radial-gradient(60% 80% at var(--mx,50%) var(--my,50%),#000,transparent 75%)}
.hc-lines{inset:0;mix-blend-mode:soft-light;opacity:calc(var(--ho,.6) * .5 * var(--foil,1));
  background:repeating-linear-gradient(115deg,rgba(255,255,255,.9) 0 1px,transparent 1px 3px)}
.hc-streak{inset:-40%;mix-blend-mode:soft-light;opacity:.9;transform:translateX(var(--st,0%));
  background:linear-gradient(115deg,transparent 42%,rgba(255,255,255,.95) 49%,rgba(255,255,255,.95) 51%,transparent 58%)}
.hc-glare{inset:0;mix-blend-mode:screen;background:radial-gradient(45% 65% at var(--mx,50%) var(--my,50%),rgba(255,255,255,.55),rgba(255,255,255,0) 65%)}
.hc-edge{inset:0;border-radius:18px;padding:1px;
  background:linear-gradient(var(--ea,135deg),#fff,rgba(0,0,0,.06) 30%,rgba(0,0,0,.04) 70%,rgba(255,255,255,.8));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.hc-chip{width:44px;height:34px;border-radius:7px;position:relative;overflow:hidden;
  background:linear-gradient(135deg,#e9d6a2,#b89850 45%,#f4e3b0 60%,#9c7c3a);box-shadow:inset 0 0 0 .5px rgba(0,0,0,.35)}
.hc-chip:before,.hc-chip:after{content:"";position:absolute;border:1px solid rgba(80,60,20,.45)}
.hc-chip:before{left:30%;right:30%;top:-1px;bottom:-1px;border-top:0;border-bottom:0}
.hc-chip:after{top:35%;bottom:35%;left:-1px;right:-1px;border-left:0;border-right:0}
.hc-label{display:block;font-size:10px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:rgba(29,29,31,.45);margin-bottom:4px}
`,rn=()=>(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("div",{className:"hc-layer hc-grain"}),(0,e.jsx)("div",{className:"hc-layer hc-film"}),(0,e.jsx)("div",{className:"hc-layer hc-film2"}),(0,e.jsx)("div",{className:"hc-layer hc-lines"}),(0,e.jsx)("div",{className:"hc-layer hc-streak"}),(0,e.jsx)("div",{className:"hc-layer hc-glare"})]});function Sn(){return a.useCallback((o,r,i=520)=>{if(!o)return;let p=performance.now(),d=w=>{let g=Math.min(1,(w-p)/i),h="";for(let f=0;f<r.length;f++)h+=g>(f+1)/r.length?r[f]:String(Math.random()*10|0);o.textContent=g<1?h:r,g<1&&requestAnimationFrame(d)};requestAnimationFrame(d)},[])}var on=a.forwardRef(function({holder:r="Alex Morgan",number:i="4716 0381 9254 4242",expires:p="09/29",cvv:d="731",tier:w="Titanium",logo:g,network:h,maxTilt:f=14,foil:ln=1,motion:A=!0,onFlip:G,onReveal:j,className:cn=""},dn){let T=(i.replace(/\D/g,"").padStart(16,"0").match(/.{4}/g)??[]).slice(0,4),D=a.useRef(null),q=a.useRef(null),X=a.useRef(null),U=a.useRef([]),C=a.useRef(null),z=Sn(),[pn,fn]=a.useState(!1),[B,un]=a.useState(!1),[k,mn]=a.useState("front"),y=a.useRef({tx:0,ty:0,ttx:0,tty:0,ry:0,vry:0,target:0,drag:!1,lastX:0,lastT:0,moved:0,lx:.5,ly:.35,tlx:.5,tly:.35,raf:0}),E=a.useRef(!1),_=n=>{try{navigator.vibrate?.(n)}catch{}};a.useEffect(()=>{E.current=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let n=y.current,t=()=>{n.tx+=(n.ttx-n.tx)*.12,n.ty+=(n.tty-n.ty)*.12,n.lx+=(n.tlx-n.lx)*.12,n.ly+=(n.tly-n.ly)*.12,n.drag||(n.vry*=.95,n.ry+=n.vry,Math.abs(n.vry)<1.2?n.ry+=(n.target-n.ry)*(E.current?1:.09):n.target=Math.round(n.ry/180)*180);let l=n.ry+n.ty,u=(l%360+360)%360,s=Math.sin(u*Math.PI/180),c=q.current;if(c){c.style.transform=`rotateX(${n.tx}deg) rotateY(${l}deg)`;let N=n.lx*100+s*40,J=n.ly*100;c.style.setProperty("--mx",`${N}%`),c.style.setProperty("--my",`${J}%`),c.style.setProperty("--hx",`${N*1.6}%`),c.style.setProperty("--hy",`${J*1.2}%`),c.style.setProperty("--ho",(.45+Math.min(.5,(Math.abs(n.tx)+Math.abs(n.ty))/26+Math.abs(s)*.4)).toFixed(3)),c.style.setProperty("--ca",`${n.ty*6+u}deg`),c.style.setProperty("--st",`${n.ty*4+s*60}%`),c.style.setProperty("--ea",`${135+n.ty*3}deg`)}let R=X.current;R&&(R.style.transform=`translateX(${-n.ty*1.4}px) scaleX(${(1-Math.abs(s)*.45).toFixed(3)})`);let v=Math.round(n.target/180)%2===0?"front":"back";mn(N=>N===v?N:v),n.raf=requestAnimationFrame(t)};return n.raf=requestAnimationFrame(t),()=>cancelAnimationFrame(n.raf)},[]),a.useEffect(()=>G?.(k),[k,G]);let O=a.useCallback(()=>{let n=y.current;n.target=Math.round(n.ry/180)*180+180,n.vry=0,_(10)},[]),K=a.useRef(!1),I=a.useCallback(n=>{let t=n??!K.current;K.current=t,fn(t),U.current.forEach((l,u)=>{!l||u===3||setTimeout(()=>t?z(l,T[u]):l.textContent="\u2022\u2022\u2022\u2022",u*90)}),j?.(t)},[z,i,j]),Y=a.useRef(!1),S=a.useCallback(()=>{Y.current||(Y.current=!0,window.addEventListener("deviceorientation",n=>{if(n.beta==null||n.gamma==null)return;let t=y.current,l=E.current?0:f;t.ttx=Math.max(-l,Math.min(l,-(n.beta-45)*.5)),t.tty=Math.max(-l,Math.min(l,n.gamma*.6)),t.tlx=.5+n.gamma/90,t.tly=.5+(n.beta-45)/90}))},[f]),V=a.useCallback(async()=>{let n=typeof DeviceOrientationEvent<"u"?DeviceOrientationEvent:void 0;try{return n?.requestPermission&&await n.requestPermission()!=="granted"?!1:(S(),!0)}catch{return!1}},[S]);a.useEffect(()=>{if(!A||!window.matchMedia("(hover: none)").matches)return;let n=typeof DeviceOrientationEvent<"u"?DeviceOrientationEvent:void 0;n&&typeof n.requestPermission!="function"&&S()},[A,S]),a.useImperativeHandle(dn,()=>({flip:O,reveal:I,enableMotion:V}),[O,I,V]);let gn=n=>{let t=D.current.getBoundingClientRect(),l=(n.clientX-t.left)/t.width,u=(n.clientY-t.top)/t.height,s=y.current,c=E.current?0:f;if(s.tlx=l,s.tly=u,!s.drag)n.pointerType==="mouse"&&(s.tty=(l-.5)*2*c,s.ttx=-(u-.5)*2*c);else{let R=performance.now(),v=n.clientX-s.lastX;s.ry+=v*.6,s.vry=v*.6/Math.max(1,(R-s.lastT)/16),s.lastX=n.clientX,s.lastT=R,s.moved+=Math.abs(v)}},hn=n=>{if(n.target.closest("[data-hc-tap]"))return;let t=y.current;t.drag=!0,t.moved=0,t.lastX=n.clientX,t.lastT=performance.now(),t.vry=0,D.current?.setPointerCapture(n.pointerId),_(6)},W=()=>{let n=y.current;n.drag&&(n.drag=!1,n.target=Math.round((n.ry+n.vry*8)/180)*180,n.moved<4&&O())},bn=(0,e.jsxs)("span",{className:"flex items-center gap-2 text-[17px] font-semibold tracking-[-0.04em]",children:[(0,e.jsx)("span",{className:"grid h-[22px] w-[22px] place-items-center rounded-[7px]",style:{background:P},children:(0,e.jsx)("span",{className:"h-2 w-2 rotate-45 rounded-[2px] bg-white"})}),"Logo"]}),xn=(0,e.jsxs)("span",{className:"flex","aria-hidden":"true",children:[(0,e.jsx)("span",{className:"h-[30px] w-[30px] rounded-full",style:{background:"rgba(29,29,31,.85)"}}),(0,e.jsx)("span",{className:"-ml-3 h-[30px] w-[30px] rounded-full",style:{background:"rgba(29,29,31,.35)"}})]});return(0,e.jsxs)("div",{className:`relative w-full max-w-[380px] ${cn}`,style:{fontFamily:Mn,WebkitFontSmoothing:"antialiased"},children:[(0,e.jsx)("style",{children:En}),(0,e.jsxs)("div",{ref:D,className:"relative w-full select-none",style:{aspectRatio:"1.586",perspective:1100,touchAction:"none"},onPointerMove:gn,onPointerDown:hn,onPointerUp:W,onPointerCancel:W,onPointerLeave:()=>{let n=y.current;n.drag||(n.ttx=0,n.tty=0,n.tlx=.5,n.tly=.35)},children:[(0,e.jsx)("div",{ref:X,className:"pointer-events-none absolute -bottom-4 left-[10%] right-[10%] h-9 rounded-[50%] blur-[22px]",style:{background:"rgba(40,40,60,.28)"}}),(0,e.jsxs)("div",{ref:q,role:"group","aria-roledescription":"card","aria-label":`${w} card ending ${T[3]}, ${k==="front"?"front":"back"} side. Drag to spin, tap to flip.`,className:"absolute inset-0 cursor-grab active:cursor-grabbing",style:{transformStyle:"preserve-3d",willChange:"transform","--foil":String(ln)},children:[(0,e.jsxs)("div",{className:"hc-face","aria-hidden":k!=="front",children:[(0,e.jsx)(rn,{}),(0,e.jsxs)("div",{className:"absolute inset-0 flex flex-col justify-between px-6 pb-5 pt-[22px]",children:[(0,e.jsxs)("div",{className:"flex items-center justify-between",children:[g??bn,(0,e.jsx)("span",{className:"text-[11px] font-medium uppercase tracking-[.12em]",style:{color:"rgba(29,29,31,.5)"},children:w})]}),(0,e.jsxs)("div",{className:"flex items-center justify-between",children:[(0,e.jsx)("span",{className:"hc-chip"}),(0,e.jsx)("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"rgba(29,29,31,.6)",strokeWidth:"2",strokeLinecap:"round","aria-hidden":"true",children:(0,e.jsx)("path",{d:"M8.5 7.5a6 6 0 0 1 0 9M12 5a9.5 9.5 0 0 1 0 14M15.5 2.5a13 13 0 0 1 0 19"})})]}),(0,e.jsx)("button",{type:"button","data-hc-tap":!0,onClick:()=>I(),"aria-label":pn?"Hide card number":"Show card number",className:"flex w-fit gap-3.5 rounded-md text-left text-[20px] font-medium leading-none tabular-nums tracking-[.06em] outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-4",style:{fontFamily:an,color:P,textShadow:"0 1px 0 rgba(255,255,255,.8)"},children:T.map((n,t)=>(0,e.jsx)("span",{ref:l=>{U.current[t]=l},className:"inline-block min-w-[3.4ch]",children:t===3?n:"\u2022\u2022\u2022\u2022"},t))}),(0,e.jsxs)("div",{className:"flex items-end justify-between",children:[(0,e.jsxs)("div",{className:"min-w-0",children:[(0,e.jsx)("span",{className:"hc-label",children:"Card holder"}),(0,e.jsx)("b",{className:"block truncate text-[15px] font-semibold uppercase tracking-[-0.01em]",children:r})]}),(0,e.jsxs)("div",{children:[(0,e.jsx)("span",{className:"hc-label",children:"Expires"}),(0,e.jsx)("b",{className:"text-[15px] font-semibold tracking-[-0.01em] tabular-nums",children:p})]}),h??xn]})]}),(0,e.jsx)("div",{className:"hc-layer hc-edge"})]}),(0,e.jsxs)("div",{className:"hc-face",style:{transform:"rotateY(180deg)"},"aria-hidden":k!=="back",children:[(0,e.jsx)(rn,{}),(0,e.jsx)("div",{className:"absolute inset-x-0 top-6 h-[42px]",style:{background:"linear-gradient(180deg,#2a2a2e,#111)"}}),(0,e.jsxs)("button",{type:"button","data-hc-tap":!0,onClick:()=>{let n=!B;un(n),n?z(C.current,d,380):C.current&&(C.current.textContent="\u2022\u2022\u2022")},"aria-label":B?"Hide security code":"Show security code",className:"absolute left-6 right-6 top-[86px] flex h-[38px] items-center justify-end gap-2.5 rounded-lg px-3 outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]",style:{background:"rgba(255,255,255,.75)",boxShadow:"inset 0 0 0 .5px rgba(0,0,0,.08)"},children:[(0,e.jsx)("span",{className:"text-[10px] font-medium uppercase tracking-[.12em]",style:{color:"rgba(29,29,31,.45)"},children:"CVV"}),(0,e.jsx)("span",{ref:C,className:"text-[15px] font-medium tracking-[.12em]",style:{fontFamily:an,color:P},children:"\u2022\u2022\u2022"})]}),(0,e.jsx)("div",{className:"absolute bottom-[18px] left-6 right-6 text-[10px] leading-[14px]",style:{color:"rgba(29,29,31,.45)"},children:"Tilt to see the foil, drag to spin, tap the code to reveal it."}),(0,e.jsx)("div",{className:"hc-layer hc-edge"})]})]})]})]})});var m=b(M()),Fn={maxTilt:14,foil:1};function Pn(){x.useEffect(()=>{if(document.getElementById("geist-font"))return;let o=document.createElement("link");o.id="geist-font",o.rel="stylesheet",o.href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@500;600&display=swap",document.head.appendChild(o)},[])}function H(o){let r={...Fn,...o};Pn();let i=x.useRef(null),[p,d]=x.useState(!1),[w,g]=x.useState(!1);x.useEffect(()=>{let f=typeof DeviceOrientationEvent<"u"?DeviceOrientationEvent:void 0;g(window.matchMedia("(hover: none)").matches&&typeof f?.requestPermission=="function")},[]);let h="h-8 rounded-full px-3.5 text-[13px] font-medium outline-none transition-transform active:scale-[.97] focus-visible:ring-2 focus-visible:ring-[#007AFF]";return(0,m.jsxs)("div",{className:"flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden px-4 py-10",style:{fontFamily:"Geist, -apple-system, BlinkMacSystemFont, Inter, 'Segoe UI', Roboto, sans-serif",backgroundColor:"#F2F2F7",backgroundImage:"radial-gradient(circle, rgba(0,0,0,.07) 0 1px, transparent 1.4px)",backgroundSize:"20px 13px",backgroundPosition:"-6px -1px"},children:[(0,m.jsx)(on,{ref:i,maxTilt:r.maxTilt,foil:r.foil,onReveal:d}),(0,m.jsx)("p",{className:"m-0 mt-2 max-w-[380px] text-center text-[13px] leading-[18px] tracking-[-0.01em]",style:{color:"rgba(60,60,67,.6)"},children:"Move the cursor over the card or tilt your phone. Drag to spin, tap to flip, tap the number to reveal it."}),(0,m.jsxs)("div",{className:"flex flex-wrap justify-center gap-2",children:[(0,m.jsx)("button",{type:"button",onClick:()=>i.current?.flip(),className:h,style:{background:"#007AFF",color:"#fff"},children:"Flip"}),(0,m.jsx)("button",{type:"button",onClick:()=>i.current?.reveal(),className:h,style:{background:"rgba(118,118,128,.12)",color:"#000"},children:p?"Hide":"Reveal"}),w&&(0,m.jsx)("button",{type:"button",onClick:async()=>{await i.current?.enableMotion()&&g(!1)},className:h,style:{background:"rgba(118,118,128,.12)",color:"#000"},children:"Use motion"})]})]})}(window.__UI=window.__UI||{})["holo-card"]={css:`/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-white: #fff;
    --spacing: 0.25rem;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: Geist, ui-sans-serif, system-ui, sans-serif;
    --default-mono-font-family: var(--font-mono);
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring:where(:not(iframe)) {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .pointer-events-none {
    pointer-events: none;
  }
  .absolute {
    position: absolute;
  }
  .relative {
    position: relative;
  }
  .inset-0 {
    inset: 0px;
  }
  .inset-x-0 {
    inset-inline: 0px;
  }
  .top-6 {
    top: calc(var(--spacing) * 6);
  }
  .top-\\[86px\\] {
    top: 86px;
  }
  .right-6 {
    right: calc(var(--spacing) * 6);
  }
  .right-\\[10\\%\\] {
    right: 10%;
  }
  .-bottom-4 {
    bottom: calc(var(--spacing) * -4);
  }
  .bottom-\\[18px\\] {
    bottom: 18px;
  }
  .left-6 {
    left: calc(var(--spacing) * 6);
  }
  .left-\\[10\\%\\] {
    left: 10%;
  }
  .m-0 {
    margin: 0px;
  }
  .mt-2 {
    margin-top: calc(var(--spacing) * 2);
  }
  .-ml-3 {
    margin-left: calc(var(--spacing) * -3);
  }
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .inline-block {
    display: inline-block;
  }
  .h-2 {
    height: calc(var(--spacing) * 2);
  }
  .h-8 {
    height: calc(var(--spacing) * 8);
  }
  .h-9 {
    height: calc(var(--spacing) * 9);
  }
  .h-\\[22px\\] {
    height: 22px;
  }
  .h-\\[30px\\] {
    height: 30px;
  }
  .h-\\[38px\\] {
    height: 38px;
  }
  .h-\\[42px\\] {
    height: 42px;
  }
  .min-h-screen {
    min-height: 100vh;
  }
  .w-2 {
    width: calc(var(--spacing) * 2);
  }
  .w-\\[22px\\] {
    width: 22px;
  }
  .w-\\[30px\\] {
    width: 30px;
  }
  .w-fit {
    width: fit-content;
  }
  .w-full {
    width: 100%;
  }
  .max-w-\\[380px\\] {
    max-width: 380px;
  }
  .min-w-0 {
    min-width: 0px;
  }
  .min-w-\\[3\\.4ch\\] {
    min-width: 3.4ch;
  }
  .rotate-45 {
    rotate: 45deg;
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .cursor-grab {
    cursor: grab;
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .place-items-center {
    place-items: center;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-2\\.5 {
    gap: calc(var(--spacing) * 2.5);
  }
  .gap-3\\.5 {
    gap: calc(var(--spacing) * 3.5);
  }
  .gap-6 {
    gap: calc(var(--spacing) * 6);
  }
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .rounded-\\[2px\\] {
    border-radius: 2px;
  }
  .rounded-\\[7px\\] {
    border-radius: 7px;
  }
  .rounded-\\[50\\%\\] {
    border-radius: 50%;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius);
  }
  .rounded-md {
    border-radius: calc(var(--radius) - 2px);
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-3\\.5 {
    padding-inline: calc(var(--spacing) * 3.5);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .px-6 {
    padding-inline: calc(var(--spacing) * 6);
  }
  .py-10 {
    padding-block: calc(var(--spacing) * 10);
  }
  .pt-\\[22px\\] {
    padding-top: 22px;
  }
  .pb-5 {
    padding-bottom: calc(var(--spacing) * 5);
  }
  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
  .text-\\[10px\\] {
    font-size: 10px;
  }
  .text-\\[11px\\] {
    font-size: 11px;
  }
  .text-\\[13px\\] {
    font-size: 13px;
  }
  .text-\\[15px\\] {
    font-size: 15px;
  }
  .text-\\[17px\\] {
    font-size: 17px;
  }
  .text-\\[20px\\] {
    font-size: 20px;
  }
  .leading-\\[14px\\] {
    --tw-leading: 14px;
    line-height: 14px;
  }
  .leading-\\[18px\\] {
    --tw-leading: 18px;
    line-height: 18px;
  }
  .leading-none {
    --tw-leading: 1;
    line-height: 1;
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .tracking-\\[-0\\.01em\\] {
    --tw-tracking: -0.01em;
    letter-spacing: -0.01em;
  }
  .tracking-\\[-0\\.04em\\] {
    --tw-tracking: -0.04em;
    letter-spacing: -0.04em;
  }
  .tracking-\\[\\.06em\\] {
    --tw-tracking: .06em;
    letter-spacing: .06em;
  }
  .tracking-\\[\\.12em\\] {
    --tw-tracking: .12em;
    letter-spacing: .12em;
  }
  .uppercase {
    text-transform: uppercase;
  }
  .tabular-nums {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .blur-\\[22px\\] {
    --tw-blur: blur(22px);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .transition-transform {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .outline-none {
    --tw-outline-style: none;
    outline-style: none;
  }
  .select-none {
    -webkit-user-select: none;
    user-select: none;
  }
  .focus-visible\\:ring-2:focus-visible {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .focus-visible\\:ring-\\[\\#007AFF\\]:focus-visible {
    --tw-ring-color: #007AFF;
  }
  .focus-visible\\:ring-offset-4:focus-visible {
    --tw-ring-offset-width: 4px;
    --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  }
  .active\\:scale-\\[\\.97\\]:active {
    scale: .97;
  }
  .active\\:cursor-grabbing:active {
    cursor: grabbing;
  }
}
:host, .tw-light {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}
.tw-dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
}
@layer base {
  * {
    border-color: var(--border);
    outline-color: var(--ring);
    @supports (color: color-mix(in lab, red, red)) {
      outline-color: color-mix(in oklab, var(--ring) 50%, transparent);
    }
  }
}








































@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-tracking: initial;
      --tw-ordinal: initial;
      --tw-slashed-zero: initial;
      --tw-numeric-figure: initial;
      --tw-numeric-spacing: initial;
      --tw-numeric-fraction: initial;
      --tw-blur: initial;
      --tw-brightness: initial;
      --tw-contrast: initial;
      --tw-grayscale: initial;
      --tw-hue-rotate: initial;
      --tw-invert: initial;
      --tw-opacity: initial;
      --tw-saturate: initial;
      --tw-sepia: initial;
      --tw-drop-shadow: initial;
      --tw-drop-shadow-color: initial;
      --tw-drop-shadow-alpha: 100%;
      --tw-drop-shadow-size: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
    }
  }
}

:host{display:block;height:100%;font-family:Geist,ui-sans-serif,system-ui,sans-serif}
.min-h-screen{min-height:100%}`,props:`@property --tw-rotate-x {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-y {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-z {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-x {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-y {
  syntax: "*";
  inherits: false;
}
@property --tw-leading {
  syntax: "*";
  inherits: false;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-tracking {
  syntax: "*";
  inherits: false;
}
@property --tw-ordinal {
  syntax: "*";
  inherits: false;
}
@property --tw-slashed-zero {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-figure {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-spacing {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-fraction {
  syntax: "*";
  inherits: false;
}
@property --tw-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-drop-shadow-size {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}`,settings:{maxTilt:14,foil:1},themeable:!1,files:[["component.tsx",`"use client";

import * as React from "react";

/* ------------------------------------------------------------------ */
/*  HoloCard \u2014 a pearl titanium card with a thin-film hologram.        */
/*  Tilts with the cursor (or the phone), spins when dragged,          */
/*  flips on tap, and scrambles the number in on reveal.               */
/* ------------------------------------------------------------------ */

export type HoloCardHandle = {
  flip: () => void;
  reveal: (show?: boolean) => void;
  /** iOS asks for permission before motion can be read; call this from a tap */
  enableMotion: () => Promise<boolean>;
};

export type HoloCardProps = {
  holder?: string;
  /** full 16-digit number, spaces optional; only the last 4 show until revealed */
  number?: string;
  expires?: string;
  cvv?: string;
  /** small label top right */
  tier?: string;
  /** your logo, top left; a placeholder shows by default */
  logo?: React.ReactNode;
  /** network mark bottom right; two neutral circles by default */
  network?: React.ReactNode;
  /** max tilt in degrees. Default 14. */
  maxTilt?: number;
  /** 0\u20131.5, strength of the hologram. Default 1. */
  foil?: number;
  /** follow the phone's tilt where allowed. Default true. */
  motion?: boolean;
  onFlip?: (side: "front" | "back") => void;
  onReveal?: (shown: boolean) => void;
  className?: string;
};

const INK = "#1d1d1f";
const FONT = "Geist, -apple-system, BlinkMacSystemFont, Inter, 'Segoe UI', Roboto, sans-serif";
const MONO = "'Geist Mono', ui-monospace, 'SF Mono', Menlo, monospace";

const GRAIN =
  "url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9 .02' numOctaves='2' seed='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\\")";

const CSS = \`
.hc-face{position:absolute;inset:0;border-radius:18px;overflow:hidden;backface-visibility:hidden;-webkit-backface-visibility:hidden;color:\${INK};
  background:linear-gradient(135deg,#fdfdfe 0%,#ececf1 38%,#f8f8fa 62%,#e2e2e8 100%);
  box-shadow:inset 0 0 0 .5px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.9)}
.hc-layer{position:absolute;pointer-events:none}
.hc-grain{inset:0;opacity:.35;mix-blend-mode:soft-light;background-image:\${GRAIN};background-size:200px 200px}
.hc-film{inset:-30%;mix-blend-mode:multiply;opacity:calc(var(--ho,.6) * var(--foil,1));
  background:linear-gradient(115deg,#ffd9ec 0%,#ffe6cf 12%,#fff6c9 22%,#d4f7e4 34%,#c9ecff 46%,#d9d4ff 58%,#f6d0ff 70%,#ffd9ec 82%,#ffe6cf 100%);
  background-size:300% 300%;background-position:var(--hx,50%) var(--hy,50%);
  -webkit-mask-image:radial-gradient(85% 110% at var(--mx,50%) var(--my,50%),#000 0%,rgba(0,0,0,.55) 50%,rgba(0,0,0,.15) 85%);
  mask-image:radial-gradient(85% 110% at var(--mx,50%) var(--my,50%),#000 0%,rgba(0,0,0,.55) 50%,rgba(0,0,0,.15) 85%)}
.hc-film2{inset:-30%;mix-blend-mode:color;opacity:calc(var(--ho,.6) * .55 * var(--foil,1));
  background:conic-gradient(from var(--ca,0deg) at var(--mx,50%) var(--my,50%),#ff9ad5,#ffc58f,#fff08f,#9ff0c6,#8fd6ff,#b8a6ff,#ff9ad5);
  -webkit-mask-image:radial-gradient(60% 80% at var(--mx,50%) var(--my,50%),#000,transparent 75%);
  mask-image:radial-gradient(60% 80% at var(--mx,50%) var(--my,50%),#000,transparent 75%)}
.hc-lines{inset:0;mix-blend-mode:soft-light;opacity:calc(var(--ho,.6) * .5 * var(--foil,1));
  background:repeating-linear-gradient(115deg,rgba(255,255,255,.9) 0 1px,transparent 1px 3px)}
.hc-streak{inset:-40%;mix-blend-mode:soft-light;opacity:.9;transform:translateX(var(--st,0%));
  background:linear-gradient(115deg,transparent 42%,rgba(255,255,255,.95) 49%,rgba(255,255,255,.95) 51%,transparent 58%)}
.hc-glare{inset:0;mix-blend-mode:screen;background:radial-gradient(45% 65% at var(--mx,50%) var(--my,50%),rgba(255,255,255,.55),rgba(255,255,255,0) 65%)}
.hc-edge{inset:0;border-radius:18px;padding:1px;
  background:linear-gradient(var(--ea,135deg),#fff,rgba(0,0,0,.06) 30%,rgba(0,0,0,.04) 70%,rgba(255,255,255,.8));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.hc-chip{width:44px;height:34px;border-radius:7px;position:relative;overflow:hidden;
  background:linear-gradient(135deg,#e9d6a2,#b89850 45%,#f4e3b0 60%,#9c7c3a);box-shadow:inset 0 0 0 .5px rgba(0,0,0,.35)}
.hc-chip:before,.hc-chip:after{content:"";position:absolute;border:1px solid rgba(80,60,20,.45)}
.hc-chip:before{left:30%;right:30%;top:-1px;bottom:-1px;border-top:0;border-bottom:0}
.hc-chip:after{top:35%;bottom:35%;left:-1px;right:-1px;border-left:0;border-right:0}
.hc-label{display:block;font-size:10px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:rgba(29,29,31,.45);margin-bottom:4px}
\`;

const Layers = () => (
  <>
    <div className="hc-layer hc-grain" />
    <div className="hc-layer hc-film" />
    <div className="hc-layer hc-film2" />
    <div className="hc-layer hc-lines" />
    <div className="hc-layer hc-streak" />
    <div className="hc-layer hc-glare" />
  </>
);

/* scramble random digits into the target, left to right */
function useScramble() {
  return React.useCallback((el: HTMLElement | null, to: string, ms = 520) => {
    if (!el) return;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      let out = "";
      for (let i = 0; i < to.length; i++) out += k > (i + 1) / to.length ? to[i] : String((Math.random() * 10) | 0);
      el.textContent = k < 1 ? out : to;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);
}

export const HoloCard = React.forwardRef<HoloCardHandle, HoloCardProps>(function HoloCard(
  {
    holder = "Alex Morgan",
    number = "4716 0381 9254 4242",
    expires = "09/29",
    cvv = "731",
    tier = "Titanium",
    logo,
    network,
    maxTilt = 14,
    foil = 1,
    motion = true,
    onFlip,
    onReveal,
    className = "",
  },
  ref,
) {
  const groups = (number.replace(/\\D/g, "").padStart(16, "0").match(/.{4}/g) ?? []).slice(0, 4);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const shadowRef = React.useRef<HTMLDivElement>(null);
  const groupRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const cvvRef = React.useRef<HTMLSpanElement>(null);
  const scramble = useScramble();
  const [shown, setShown] = React.useState(false);
  const [cvvShown, setCvvShown] = React.useState(false);
  const [side, setSide] = React.useState<"front" | "back">("front");

  const s = React.useRef({ tx: 0, ty: 0, ttx: 0, tty: 0, ry: 0, vry: 0, target: 0, drag: false, lastX: 0, lastT: 0, moved: 0, lx: 0.5, ly: 0.35, tlx: 0.5, tly: 0.35, raf: 0 });
  const reduce = React.useRef(false);

  const buzz = (p: number | number[]) => {
    try {
      navigator.vibrate?.(p);
    } catch {
      /* not supported */
    }
  };

  /* animation loop: ease tilt and light, spin with inertia, settle on a face */
  React.useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const st = s.current;
    const loop = () => {
      st.tx += (st.ttx - st.tx) * 0.12;
      st.ty += (st.tty - st.ty) * 0.12;
      st.lx += (st.tlx - st.lx) * 0.12;
      st.ly += (st.tly - st.ly) * 0.12;
      if (!st.drag) {
        st.vry *= 0.95;
        st.ry += st.vry;
        if (Math.abs(st.vry) < 1.2) st.ry += (st.target - st.ry) * (reduce.current ? 1 : 0.09);
        else st.target = Math.round(st.ry / 180) * 180;
      }
      const ry = st.ry + st.ty;
      const spin = ((ry % 360) + 360) % 360;
      const sweep = Math.sin((spin * Math.PI) / 180);
      const card = cardRef.current;
      if (card) {
        card.style.transform = \`rotateX(\${st.tx}deg) rotateY(\${ry}deg)\`;
        const mx = st.lx * 100 + sweep * 40;
        const my = st.ly * 100;
        card.style.setProperty("--mx", \`\${mx}%\`);
        card.style.setProperty("--my", \`\${my}%\`);
        card.style.setProperty("--hx", \`\${mx * 1.6}%\`);
        card.style.setProperty("--hy", \`\${my * 1.2}%\`);
        card.style.setProperty("--ho", (0.45 + Math.min(0.5, (Math.abs(st.tx) + Math.abs(st.ty)) / 26 + Math.abs(sweep) * 0.4)).toFixed(3));
        card.style.setProperty("--ca", \`\${st.ty * 6 + spin}deg\`);
        card.style.setProperty("--st", \`\${st.ty * 4 + sweep * 60}%\`);
        card.style.setProperty("--ea", \`\${135 + st.ty * 3}deg\`);
      }
      const sh = shadowRef.current;
      if (sh) sh.style.transform = \`translateX(\${-st.ty * 1.4}px) scaleX(\${(1 - Math.abs(sweep) * 0.45).toFixed(3)})\`;
      const face = Math.round(st.target / 180) % 2 === 0 ? "front" : "back";
      setSide((prev) => (prev === face ? prev : face));
      st.raf = requestAnimationFrame(loop);
    };
    st.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(st.raf);
  }, []);

  React.useEffect(() => onFlip?.(side), [side, onFlip]);

  const flip = React.useCallback(() => {
    const st = s.current;
    st.target = Math.round(st.ry / 180) * 180 + 180;
    st.vry = 0;
    buzz(10);
  }, []);

  const shownRef = React.useRef(false);
  const reveal = React.useCallback(
    (show?: boolean) => {
      const next = show ?? !shownRef.current;
      shownRef.current = next;
      setShown(next);
      groupRefs.current.forEach((el, i) => {
        if (!el || i === 3) return;
        setTimeout(() => (next ? scramble(el, groups[i]) : (el.textContent = "\u2022\u2022\u2022\u2022")), i * 90);
      });
      onReveal?.(next);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scramble, number, onReveal],
  );

  /* phone tilt */
  const gyroOn = React.useRef(false);
  const listenGyro = React.useCallback(() => {
    if (gyroOn.current) return;
    gyroOn.current = true;
    window.addEventListener("deviceorientation", (e) => {
      if (e.beta == null || e.gamma == null) return;
      const st = s.current;
      const m = reduce.current ? 0 : maxTilt;
      st.ttx = Math.max(-m, Math.min(m, -(e.beta - 45) * 0.5));
      st.tty = Math.max(-m, Math.min(m, e.gamma * 0.6));
      st.tlx = 0.5 + e.gamma / 90;
      st.tly = 0.5 + (e.beta - 45) / 90;
    });
  }, [maxTilt]);

  const enableMotion = React.useCallback(async () => {
    const DOE = (typeof DeviceOrientationEvent !== "undefined" ? DeviceOrientationEvent : undefined) as unknown as { requestPermission?: () => Promise<string> } | undefined;
    try {
      if (DOE?.requestPermission) {
        const r = await DOE.requestPermission();
        if (r !== "granted") return false;
      }
      listenGyro();
      return true;
    } catch {
      return false;
    }
  }, [listenGyro]);

  React.useEffect(() => {
    if (!motion || !window.matchMedia("(hover: none)").matches) return;
    const DOE = (typeof DeviceOrientationEvent !== "undefined" ? DeviceOrientationEvent : undefined) as unknown as { requestPermission?: unknown } | undefined;
    if (DOE && typeof DOE.requestPermission !== "function") listenGyro();
  }, [motion, listenGyro]);

  React.useImperativeHandle(ref, () => ({ flip, reveal, enableMotion }), [flip, reveal, enableMotion]);

  /* pointer: tilt on hover, drag to spin, tap to flip */
  const onMove = (e: React.PointerEvent) => {
    const r = stageRef.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const st = s.current;
    const m = reduce.current ? 0 : maxTilt;
    st.tlx = px;
    st.tly = py;
    if (!st.drag) {
      if (e.pointerType === "mouse") {
        st.tty = (px - 0.5) * 2 * m;
        st.ttx = -(py - 0.5) * 2 * m;
      }
    } else {
      const now = performance.now();
      const dx = e.clientX - st.lastX;
      st.ry += dx * 0.6;
      st.vry = (dx * 0.6) / Math.max(1, (now - st.lastT) / 16);
      st.lastX = e.clientX;
      st.lastT = now;
      st.moved += Math.abs(dx);
    }
  };
  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-hc-tap]")) return;
    const st = s.current;
    st.drag = true;
    st.moved = 0;
    st.lastX = e.clientX;
    st.lastT = performance.now();
    st.vry = 0;
    stageRef.current?.setPointerCapture(e.pointerId);
    buzz(6);
  };
  const onUp = () => {
    const st = s.current;
    if (!st.drag) return;
    st.drag = false;
    st.target = Math.round((st.ry + st.vry * 8) / 180) * 180;
    if (st.moved < 4) flip();
  };

  const defaultLogo = (
    <span className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.04em]">
      <span className="grid h-[22px] w-[22px] place-items-center rounded-[7px]" style={{ background: INK }}>
        <span className="h-2 w-2 rotate-45 rounded-[2px] bg-white" />
      </span>
      Logo
    </span>
  );
  const defaultNetwork = (
    <span className="flex" aria-hidden="true">
      <span className="h-[30px] w-[30px] rounded-full" style={{ background: "rgba(29,29,31,.85)" }} />
      <span className="-ml-3 h-[30px] w-[30px] rounded-full" style={{ background: "rgba(29,29,31,.35)" }} />
    </span>
  );

  return (
    <div className={\`relative w-full max-w-[380px] \${className}\`} style={{ fontFamily: FONT, WebkitFontSmoothing: "antialiased" }}>
      <style>{CSS}</style>
      <div
        ref={stageRef}
        className="relative w-full select-none"
        style={{ aspectRatio: "1.586", perspective: 1100, touchAction: "none" }}
        onPointerMove={onMove}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={() => {
          const st = s.current;
          if (st.drag) return;
          st.ttx = 0;
          st.tty = 0;
          st.tlx = 0.5;
          st.tly = 0.35;
        }}
      >
        <div ref={shadowRef} className="pointer-events-none absolute -bottom-4 left-[10%] right-[10%] h-9 rounded-[50%] blur-[22px]" style={{ background: "rgba(40,40,60,.28)" }} />
        <div
          ref={cardRef}
          role="group"
          aria-roledescription="card"
          aria-label={\`\${tier} card ending \${groups[3]}, \${side === "front" ? "front" : "back"} side. Drag to spin, tap to flip.\`}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{ transformStyle: "preserve-3d", willChange: "transform", ["--foil" as string]: String(foil) }}
        >
          {/* front */}
          <div className="hc-face" aria-hidden={side !== "front"}>
            <Layers />
            <div className="absolute inset-0 flex flex-col justify-between px-6 pb-5 pt-[22px]">
              <div className="flex items-center justify-between">
                {logo ?? defaultLogo}
                <span className="text-[11px] font-medium uppercase tracking-[.12em]" style={{ color: "rgba(29,29,31,.5)" }}>
                  {tier}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="hc-chip" />
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(29,29,31,.6)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M8.5 7.5a6 6 0 0 1 0 9M12 5a9.5 9.5 0 0 1 0 14M15.5 2.5a13 13 0 0 1 0 19" />
                </svg>
              </div>
              <button
                type="button"
                data-hc-tap
                onClick={() => reveal()}
                aria-label={shown ? "Hide card number" : "Show card number"}
                className="flex w-fit gap-3.5 rounded-md text-left text-[20px] font-medium leading-none tabular-nums tracking-[.06em] outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-4"
                style={{ fontFamily: MONO, color: INK, textShadow: "0 1px 0 rgba(255,255,255,.8)" }}
              >
                {groups.map((g, i) => (
                  <span key={i} ref={(el) => void (groupRefs.current[i] = el)} className="inline-block min-w-[3.4ch]">
                    {i === 3 ? g : "\u2022\u2022\u2022\u2022"}
                  </span>
                ))}
              </button>
              <div className="flex items-end justify-between">
                <div className="min-w-0">
                  <span className="hc-label">Card holder</span>
                  <b className="block truncate text-[15px] font-semibold uppercase tracking-[-0.01em]">{holder}</b>
                </div>
                <div>
                  <span className="hc-label">Expires</span>
                  <b className="text-[15px] font-semibold tracking-[-0.01em] tabular-nums">{expires}</b>
                </div>
                {network ?? defaultNetwork}
              </div>
            </div>
            <div className="hc-layer hc-edge" />
          </div>

          {/* back */}
          <div className="hc-face" style={{ transform: "rotateY(180deg)" }} aria-hidden={side !== "back"}>
            <Layers />
            <div className="absolute inset-x-0 top-6 h-[42px]" style={{ background: "linear-gradient(180deg,#2a2a2e,#111)" }} />
            <button
              type="button"
              data-hc-tap
              onClick={() => {
                const next = !cvvShown;
                setCvvShown(next);
                if (next) scramble(cvvRef.current, cvv, 380);
                else if (cvvRef.current) cvvRef.current.textContent = "\u2022\u2022\u2022";
              }}
              aria-label={cvvShown ? "Hide security code" : "Show security code"}
              className="absolute left-6 right-6 top-[86px] flex h-[38px] items-center justify-end gap-2.5 rounded-lg px-3 outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]"
              style={{ background: "rgba(255,255,255,.75)", boxShadow: "inset 0 0 0 .5px rgba(0,0,0,.08)" }}
            >
              <span className="text-[10px] font-medium uppercase tracking-[.12em]" style={{ color: "rgba(29,29,31,.45)" }}>
                CVV
              </span>
              <span ref={cvvRef} className="text-[15px] font-medium tracking-[.12em]" style={{ fontFamily: MONO, color: INK }}>
                \u2022\u2022\u2022
              </span>
            </button>
            <div className="absolute bottom-[18px] left-6 right-6 text-[10px] leading-[14px]" style={{ color: "rgba(29,29,31,.45)" }}>
              Tilt to see the foil, drag to spin, tap the code to reveal it.
            </div>
            <div className="hc-layer hc-edge" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default HoloCard;
`],["demo.tsx",`"use client";

import * as React from "react";
import { HoloCard, type HoloCardHandle } from "@/components/ui/component";

/* Live controls (21st Demo Controls). */
const settings = {
  maxTilt: 14,
  foil: 1,
};

/* Geist + Geist Mono from Google Fonts */
function useGeist() {
  React.useEffect(() => {
    if (document.getElementById("geist-font")) return;
    const l = document.createElement("link");
    l.id = "geist-font";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@500;600&display=swap";
    document.head.appendChild(l);
  }, []);
}

export default function HoloCardDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  useGeist();
  const card = React.useRef<HoloCardHandle>(null);
  const [shown, setShown] = React.useState(false);
  const [needsMotion, setNeedsMotion] = React.useState(false);

  React.useEffect(() => {
    const DOE = (typeof DeviceOrientationEvent !== "undefined" ? DeviceOrientationEvent : undefined) as unknown as { requestPermission?: unknown } | undefined;
    setNeedsMotion(window.matchMedia("(hover: none)").matches && typeof DOE?.requestPermission === "function");
  }, []);

  const pill = "h-8 rounded-full px-3.5 text-[13px] font-medium outline-none transition-transform active:scale-[.97] focus-visible:ring-2 focus-visible:ring-[#007AFF]";

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden px-4 py-10"
      style={{
        fontFamily: "Geist, -apple-system, BlinkMacSystemFont, Inter, 'Segoe UI', Roboto, sans-serif",
        /* dot grid from the "work with AI" block of vasnev.art */
        backgroundColor: "#F2F2F7",
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,.07) 0 1px, transparent 1.4px)",
        backgroundSize: "20px 13px",
        backgroundPosition: "-6px -1px",
      }}
    >
      <HoloCard ref={card} maxTilt={s.maxTilt} foil={s.foil} onReveal={setShown} />

      <p className="m-0 mt-2 max-w-[380px] text-center text-[13px] leading-[18px] tracking-[-0.01em]" style={{ color: "rgba(60,60,67,.6)" }}>
        Move the cursor over the card or tilt your phone. Drag to spin, tap to flip, tap the number to reveal it.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => card.current?.flip()} className={pill} style={{ background: "#007AFF", color: "#fff" }}>
          Flip
        </button>
        <button type="button" onClick={() => card.current?.reveal()} className={pill} style={{ background: "rgba(118,118,128,.12)", color: "#000" }}>
          {shown ? "Hide" : "Reveal"}
        </button>
        {needsMotion && (
          <button
            type="button"
            onClick={async () => {
              if (await card.current?.enableMotion()) setNeedsMotion(false);
            }}
            className={pill}
            style={{ background: "rgba(118,118,128,.12)", color: "#000" }}
          >
            Use motion
          </button>
        )}
      </div>
    </div>
  );
}
`]],mount(o,r){let i=(0,sn.createRoot)(o);return i.render(L.createElement(H,r)),{update:p=>i.render(L.createElement(H,p)),unmount:()=>i.unmount()}}};})();
