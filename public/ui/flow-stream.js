(()=>{var rn=Object.create;var D=Object.defineProperty;var ln=Object.getOwnPropertyDescriptor;var sn=Object.getOwnPropertyNames;var cn=Object.getPrototypeOf,pn=Object.prototype.hasOwnProperty;var A=(e,a)=>()=>{try{return a||e((a={exports:{}}).exports,a),a.exports}catch(o){throw a=0,o}};var dn=(e,a,o,c)=>{if(a&&typeof a=="object"||typeof a=="function")for(let s of sn(a))!pn.call(e,s)&&s!==o&&D(e,s,{get:()=>a[s],enumerable:!(c=ln(a,s))||c.enumerable});return e};var w=(e,a,o)=>(o=e!=null?rn(cn(e)):{},dn(a||!e||!e.__esModule?D(o,"default",{value:e,enumerable:!0}):o,e));var E=A((gn,I)=>{I.exports=window.__R.react});var O=A((xn,U)=>{U.exports=window.__R["react-dom/client"]});var N=A((bn,V)=>{V.exports=window.__R["react/jsx-runtime"]});var j=w(E()),Y=w(O());var p=w(E()),t=w(N()),m=600,R=280,un="cubic-bezier(0.22, 1, 0.36, 1)";function q(...e){return e.filter(Boolean).join(" ")}function mn(){let[e,a]=p.useState(!1);return p.useEffect(()=>{let o=requestAnimationFrame(()=>a(!0));return()=>cancelAnimationFrame(o)},[]),e}function G(e,a,o){let c=e.length,s=(a[1]-a[0])*.28,b=[],h=[];b.push(`M 0 ${o-e[0]}`);for(let i=0;i<c;i++){let f=a[i],g=o-e[i];if(i>0){let d=a[i-1]+s,u=f-s,x=(u-d)/2;b.push(`C ${d+x} ${o-e[i-1]}, ${u-x} ${g}, ${u} ${g}`)}b.push(`L ${Math.min(m,f+s)} ${g}`)}b.push(`L ${m} ${o-e[c-1]}`),h.push(`L ${m} ${o+e[c-1]}`);for(let i=c-1;i>=0;i--){let f=a[i],g=o+e[i];if(h.push(`L ${Math.max(0,f-s)} ${g}`),i>0){let d=a[i-1]+s,u=f-s,x=(u-d)/2;h.push(`C ${u-x} ${g}, ${d+x} ${o+e[i-1]}, ${d} ${o+e[i-1]}`)}}return h.push(`L 0 ${o+e[0]} Z`),b.join(" ")+" "+h.join(" ")}function hn({up:e}){return(0,t.jsx)("svg",{width:"11",height:"11",viewBox:"0 0 12 12","aria-hidden":!0,style:{transform:e?"none":"rotate(180deg)"},children:(0,t.jsx)("path",{d:"M6 10V2m0 0L2.5 5.5M6 2l3.5 3.5",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function H({title:e="Flow",periods:a,layers:o,markers:c=[],labelMode:s="center",hue:b=255,stats:h=[],rows:i=[],locale:f="en-US",className:g}){let d=p.useId().replace(/:/g,""),u=mn(),[x,P]=p.useState(null),M=p.useMemo(()=>new Intl.NumberFormat(f),[f]),F=a.length,v=a.map((n,l)=>(l+.5)/F*m),_=R/2-14,k=o.map((n,l)=>a.map(($,tn)=>o.slice(l).reduce((an,on)=>an+(on.values[tn]??0),0))),K=Math.max(1,...k[0]),Q=R/2-40,B=5,W=k.map(n=>n.map(l=>B+l/K*(Q-B))),T=o.map((n,l)=>{let $=o.length===1?1:l/(o.length-1);return`oklch(${(.84-$*.2).toFixed(3)} ${(.11+$*.09).toFixed(3)} ${b})`}),C=x!==null?[x]:c,L=n=>k[0][n],nn=n=>k[k.length-1][n],en=n=>{let l=n.currentTarget.getBoundingClientRect(),$=(n.clientX-l.left)/l.width;P(Math.max(0,Math.min(F-1,Math.floor($*F))))},z="absolute -translate-x-1/2 rounded-full bg-card px-3 py-1.5 font-mono text-[12px] font-medium tabular-nums text-foreground shadow-[0_1px_2px_oklch(0_0_0/0.06),0_4px_14px_oklch(0_0_0/0.08)] whitespace-nowrap";return(0,t.jsxs)("article",{className:q("w-full max-w-[460px] overflow-hidden rounded-[22px] border border-border bg-card text-card-foreground shadow-[0_30px_60px_-30px_oklch(0_0_0/0.25)]",g),children:[(0,t.jsx)("h3",{className:"px-7 pt-6 text-[26px] font-bold tracking-[-0.02em]",children:e}),(0,t.jsxs)("div",{className:"relative mt-2 touch-pan-y select-none",onPointerMove:en,onPointerLeave:()=>P(null),role:"img","aria-label":`${e}. ${a.map((n,l)=>`${n}: ${M.format(L(l))}`).join(", ")}`,children:[(0,t.jsxs)("svg",{viewBox:`0 0 ${m} ${R}`,preserveAspectRatio:"none",className:"block h-[260px] w-full","aria-hidden":!0,children:[(0,t.jsx)("defs",{children:(0,t.jsx)("filter",{id:`${d}-blur`,x:"-20%",y:"-60%",width:"140%",height:"220%",children:(0,t.jsx)("feGaussianBlur",{stdDeviation:"26"})})}),(0,t.jsxs)("g",{style:{transformOrigin:`0 ${_}px`,transform:`scaleY(${u?1:.04})`,transition:`transform 1100ms ${un}`},children:[(0,t.jsx)("path",{d:G(W[0],v,_),filter:`url(#${d}-blur)`,style:{fill:T[0],opacity:.55}}),W.map((n,l)=>(0,t.jsx)("path",{d:G(n,v,_),style:{fill:T[l]}},o[l].label))]})]}),C.map(n=>(0,t.jsx)("span",{"aria-hidden":!0,className:"pointer-events-none absolute top-4 w-[2px] -translate-x-1/2 rounded-full bg-card",style:{left:`${v[n]/m*100}%`,height:s==="split"?228:240,opacity:u?.95:0,transition:"opacity 400ms ease 700ms"}},`line-${n}`)),C.map(n=>s==="split"?(0,t.jsxs)(p.Fragment,{children:[(0,t.jsx)("span",{className:z,style:{left:`${v[n]/m*100}%`,top:4},children:M.format(L(n))}),(0,t.jsx)("span",{className:z,style:{left:`${v[n]/m*100}%`,top:214},children:M.format(nn(n))})]},`pill-${n}`):(0,t.jsx)("span",{className:z,style:{left:`${v[n]/m*100}%`,top:`${(_-15)/R*260}px`},children:M.format(L(n))},`pill-${n}`)),s==="center"&&(0,t.jsx)("div",{className:"absolute inset-x-0 bottom-2 flex","aria-hidden":!0,children:a.map((n,l)=>(0,t.jsx)("span",{className:q("flex-1 text-center font-mono text-[12px] transition-colors",C.includes(l)?"text-foreground":"text-muted-foreground"),children:n},n))})]}),h.length>0&&(0,t.jsx)("div",{className:"grid grid-cols-2 gap-6 px-7 pt-5",children:h.slice(0,2).map(n=>(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsxs)("p",{className:"flex items-center gap-1.5 text-[15px] font-semibold text-muted-foreground",children:[n.icon,n.label]}),(0,t.jsx)("p",{className:"mt-1 truncate font-mono text-[30px] font-semibold leading-tight tracking-[-0.03em] tabular-nums",children:n.value}),(0,t.jsxs)("p",{className:"mt-1 flex flex-wrap items-center gap-x-1.5 text-[13px]",children:[(0,t.jsxs)("span",{className:"inline-flex items-center gap-0.5 font-semibold tabular-nums",style:{color:n.change>=0?"oklch(0.64 0.17 150)":"oklch(0.62 0.21 25)"},children:[(0,t.jsx)(hn,{up:n.change>=0}),Math.abs(n.change).toFixed(1),"%"]}),n.hint&&(0,t.jsx)("span",{className:"truncate text-muted-foreground",children:n.hint})]})]},n.label))}),i.length>0&&(0,t.jsx)("ul",{className:"mx-7 mt-5 mb-3 divide-y divide-border",children:i.map(n=>(0,t.jsxs)("li",{className:"flex items-center justify-between gap-3 py-3",children:[(0,t.jsxs)("span",{className:"flex min-w-0 items-center gap-2.5 text-[15px] text-foreground/80",children:[n.icon,(0,t.jsx)("span",{className:"truncate",children:n.label})]}),(0,t.jsx)("span",{className:"font-mono text-[15px] font-medium tabular-nums text-foreground/80",children:n.value})]},n.label))})]})}var r=w(N()),X=["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"],Z=({color:e})=>(0,r.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 16 16","aria-hidden":!0,children:(0,r.jsx)("path",{d:"M8 1c.4 3.3 1.7 4.6 5 5-3.3.4-4.6 1.7-5 5-.4-3.3-1.7-4.6-5-5 3.3-.4 4.6-1.7 5-5Z",fill:e})}),J=({color:e})=>(0,r.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 16 16","aria-hidden":!0,children:[(0,r.jsx)("circle",{cx:"8",cy:"8",r:"6.5",fill:"none",stroke:e,strokeWidth:"2"}),(0,r.jsx)("circle",{cx:"8",cy:"8",r:"2.5",fill:e})]}),y=({color:e})=>(0,r.jsx)("span",{"aria-hidden":!0,className:"size-2.5 shrink-0 rounded-full",style:{background:e}});function S(){return(0,r.jsxs)("div",{className:"flex min-h-screen w-full flex-wrap items-center justify-center gap-8 bg-muted p-4 sm:p-10",children:[(0,r.jsx)(H,{title:"DEX Volume",hue:48,labelMode:"split",periods:X,markers:[1,4,7],layers:[{label:"Bridged",values:[400,900,1400,2300,3200,3700,5100,6400]},{label:"Perps",values:[300,1300,2100,3100,4300,5e3,6700,7900]},{label:"LP",values:[200,1920,2500,3600,4560,5400,7200,8900]},{label:"Swaps",values:[300,2221,4600,8200,14487,17900,26300,32112]}],stats:[{label:"24h volume",value:"$8,097",change:19.6,hint:"44,214 txs",icon:(0,r.jsx)(Z,{color:"oklch(0.68 0.17 150)"})},{label:"TVL",value:"$312,134",change:2.5,hint:"301,002 USDC",icon:(0,r.jsx)(J,{color:"oklch(0.78 0.15 80)"})}],rows:[{label:"Ethereum",value:"201,192",icon:(0,r.jsx)(y,{color:"oklch(0.55 0.08 275)"})},{label:"Arbitrum",value:"192,054",icon:(0,r.jsx)(y,{color:"oklch(0.62 0.13 240)"})},{label:"Base",value:"166,401",icon:(0,r.jsx)(y,{color:"oklch(0.55 0.2 260)"})}]}),(0,r.jsx)(H,{title:"Staking Inflow",hue:258,labelMode:"center",periods:X,markers:[2,4,6],layers:[{label:"Restaked",values:[300,900,1500,3800,4400,3100,900,200]},{label:"Liquid",values:[200,800,1400,4100,5200,3600,1100,200]},{label:"Native",values:[300,900,3765,7900,10841,6200,2212,300]}],stats:[{label:"This month",value:"$8,097",change:19.6,hint:"1,204 stakers",icon:(0,r.jsx)(Z,{color:"oklch(0.68 0.17 150)"})},{label:"Total staked",value:"$312,134",change:2.5,hint:"98.2 ETH",icon:(0,r.jsx)(J,{color:"oklch(0.78 0.15 80)"})}],rows:[{label:"Lido",value:"201,192",icon:(0,r.jsx)(y,{color:"oklch(0.7 0.13 230)"})},{label:"Rocket Pool",value:"192,054",icon:(0,r.jsx)(y,{color:"oklch(0.65 0.2 30)"})},{label:"EigenLayer",value:"166,401",icon:(0,r.jsx)(y,{color:"oklch(0.45 0.1 270)"})}]})]})}(window.__UI=window.__UI||{})["flow-stream"]={css:`/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --spacing: 0.25rem;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --leading-tight: 1.25;
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
  .inset-x-0 {
    inset-inline: 0px;
  }
  .top-4 {
    top: calc(var(--spacing) * 4);
  }
  .bottom-2 {
    bottom: calc(var(--spacing) * 2);
  }
  .mx-7 {
    margin-inline: calc(var(--spacing) * 7);
  }
  .mt-1 {
    margin-top: var(--spacing);
  }
  .mt-2 {
    margin-top: calc(var(--spacing) * 2);
  }
  .mt-5 {
    margin-top: calc(var(--spacing) * 5);
  }
  .mb-3 {
    margin-bottom: calc(var(--spacing) * 3);
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
  .inline-flex {
    display: inline-flex;
  }
  .size-2\\.5 {
    width: calc(var(--spacing) * 2.5);
    height: calc(var(--spacing) * 2.5);
  }
  .h-\\[260px\\] {
    height: 260px;
  }
  .min-h-screen {
    min-height: 100vh;
  }
  .w-\\[2px\\] {
    width: 2px;
  }
  .w-full {
    width: 100%;
  }
  .max-w-\\[460px\\] {
    max-width: 460px;
  }
  .min-w-0 {
    min-width: 0px;
  }
  .flex-1 {
    flex: 1;
  }
  .shrink-0 {
    flex-shrink: 0;
  }
  .-translate-x-1\\/2 {
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .touch-pan-y {
    --tw-pan-y: pan-y;
    touch-action: var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,);
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .items-center {
    align-items: center;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .gap-0\\.5 {
    gap: calc(var(--spacing) * 0.5);
  }
  .gap-1\\.5 {
    gap: calc(var(--spacing) * 1.5);
  }
  .gap-2\\.5 {
    gap: calc(var(--spacing) * 2.5);
  }
  .gap-3 {
    gap: calc(var(--spacing) * 3);
  }
  .gap-6 {
    gap: calc(var(--spacing) * 6);
  }
  .gap-8 {
    gap: calc(var(--spacing) * 8);
  }
  .gap-x-1\\.5 {
    column-gap: calc(var(--spacing) * 1.5);
  }
  :where(.divide-y > :not(:last-child)) {
    --tw-divide-y-reverse: 0;
    border-bottom-style: var(--tw-border-style);
    border-top-style: var(--tw-border-style);
    border-top-width: calc(1px * var(--tw-divide-y-reverse));
    border-bottom-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  }
  :where(.divide-border > :not(:last-child)) {
    border-color: var(--border);
  }
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .rounded-\\[22px\\] {
    border-radius: 22px;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-border {
    border-color: var(--border);
  }
  .bg-card {
    background-color: var(--card);
  }
  .bg-muted {
    background-color: var(--muted);
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-7 {
    padding-inline: calc(var(--spacing) * 7);
  }
  .py-1\\.5 {
    padding-block: calc(var(--spacing) * 1.5);
  }
  .py-3 {
    padding-block: calc(var(--spacing) * 3);
  }
  .pt-5 {
    padding-top: calc(var(--spacing) * 5);
  }
  .pt-6 {
    padding-top: calc(var(--spacing) * 6);
  }
  .text-center {
    text-align: center;
  }
  .font-mono {
    font-family: var(--font-mono);
  }
  .text-\\[12px\\] {
    font-size: 12px;
  }
  .text-\\[13px\\] {
    font-size: 13px;
  }
  .text-\\[15px\\] {
    font-size: 15px;
  }
  .text-\\[26px\\] {
    font-size: 26px;
  }
  .text-\\[30px\\] {
    font-size: 30px;
  }
  .leading-tight {
    --tw-leading: var(--leading-tight);
    line-height: var(--leading-tight);
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .tracking-\\[-0\\.02em\\] {
    --tw-tracking: -0.02em;
    letter-spacing: -0.02em;
  }
  .tracking-\\[-0\\.03em\\] {
    --tw-tracking: -0.03em;
    letter-spacing: -0.03em;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .text-card-foreground {
    color: var(--card-foreground);
  }
  .text-foreground {
    color: var(--foreground);
  }
  .text-foreground\\/80 {
    color: var(--foreground);
    @supports (color: color-mix(in lab, red, red)) {
      color: color-mix(in oklab, var(--foreground) 80%, transparent);
    }
  }
  .text-muted-foreground {
    color: var(--muted-foreground);
  }
  .tabular-nums {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .select-none {
    -webkit-user-select: none;
    user-select: none;
  }
  @media (width >= 40rem) {
    .sm\\:p-10 {
      padding: calc(var(--spacing) * 10);
    }
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
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-pan-x: initial;
      --tw-pan-y: initial;
      --tw-pinch-zoom: initial;
      --tw-divide-y-reverse: 0;
      --tw-border-style: solid;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-tracking: initial;
      --tw-ordinal: initial;
      --tw-slashed-zero: initial;
      --tw-numeric-figure: initial;
      --tw-numeric-spacing: initial;
      --tw-numeric-fraction: initial;
    }
  }
}

:host{display:block;height:100%;font-family:Geist,ui-sans-serif,system-ui,sans-serif}
.min-h-screen{min-height:100%}`,props:`@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-rotate-x {
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
@property --tw-pan-x {
  syntax: "*";
  inherits: false;
}
@property --tw-pan-y {
  syntax: "*";
  inherits: false;
}
@property --tw-pinch-zoom {
  syntax: "*";
  inherits: false;
}
@property --tw-divide-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
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
}`,settings:{},themeable:!0,files:[["component.tsx",`"use client";

import * as React from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface FlowLayer {
  /** Layer name, e.g. "Swaps" */
  label: string;
  /** One value per period, same length as \`periods\` */
  values: number[];
}

export interface FlowStat {
  label: string;
  value: string;
  /** % change, shown green or red */
  change: number;
  hint?: string;
  icon?: React.ReactNode;
}

export interface FlowRow {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface FlowStreamCardProps {
  title?: string;
  /** Labels on the x axis, e.g. months */
  periods: string[];
  /** Outer \u2192 inner. The first layer is drawn widest and lightest. */
  layers: FlowLayer[];
  /** Period indexes that get a pinned marker */
  markers?: number[];
  /** Where pinned values sit: one pill in the middle, or totals above and the core layer below */
  labelMode?: "center" | "split";
  /** OKLCH hue of the stream, e.g. 45 for orange, 255 for blue */
  hue?: number;
  stats?: FlowStat[];
  rows?: FlowRow[];
  locale?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const W = 600;
const H = 280;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function useMounted() {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return on;
}

/** Closed band symmetric around the center line, with flat plateaus and smooth S-curves between periods */
function bandPath(half: number[], xs: number[], mid: number) {
  const n = half.length;
  const plateau = (xs[1] - xs[0]) * 0.28;
  const top: string[] = [];
  const bottom: string[] = [];

  top.push(\`M 0 \${mid - half[0]}\`);
  for (let i = 0; i < n; i++) {
    const x = xs[i];
    const y = mid - half[i];
    if (i > 0) {
      const px = xs[i - 1] + plateau;
      const nx = x - plateau;
      const c = (nx - px) / 2;
      top.push(\`C \${px + c} \${mid - half[i - 1]}, \${nx - c} \${y}, \${nx} \${y}\`);
    }
    top.push(\`L \${Math.min(W, x + plateau)} \${y}\`);
  }
  top.push(\`L \${W} \${mid - half[n - 1]}\`);

  bottom.push(\`L \${W} \${mid + half[n - 1]}\`);
  for (let i = n - 1; i >= 0; i--) {
    const x = xs[i];
    const y = mid + half[i];
    bottom.push(\`L \${Math.max(0, x - plateau)} \${y}\`);
    if (i > 0) {
      const px = xs[i - 1] + plateau;
      const nx = x - plateau;
      const c = (nx - px) / 2;
      bottom.push(\`C \${nx - c} \${y}, \${px + c} \${mid + half[i - 1]}, \${px} \${mid + half[i - 1]}\`);
    }
  }
  bottom.push(\`L 0 \${mid + half[0]} Z\`);
  return top.join(" ") + " " + bottom.join(" ");
}

function ArrowUp({ up }: { up: boolean }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden style={{ transform: up ? "none" : "rotate(180deg)" }}>
      <path d="M6 10V2m0 0L2.5 5.5M6 2l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function FlowStreamCard({
  title = "Flow",
  periods,
  layers,
  markers = [],
  labelMode = "center",
  hue = 255,
  stats = [],
  rows = [],
  locale = "en-US",
  className,
}: FlowStreamCardProps) {
  const uid = React.useId().replace(/:/g, "");
  const mounted = useMounted();
  const [hover, setHover] = React.useState<number | null>(null);
  const num = React.useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const n = periods.length;
  const xs = periods.map((_, i) => ((i + 0.5) / n) * W);
  const mid = H / 2 - 14;

  /* cumulative from each layer inward: the outer band holds everything */
  const cumulative = layers.map((_, li) =>
    periods.map((__, pi) => layers.slice(li).reduce((s, l) => s + (l.values[pi] ?? 0), 0))
  );
  const peak = Math.max(1, ...cumulative[0]);
  const maxHalf = H / 2 - 40;
  const minHalf = 5;
  const halves = cumulative.map((c) => c.map((v) => minHalf + (v / peak) * (maxHalf - minHalf)));

  const shades = layers.map((_, i) => {
    const t = layers.length === 1 ? 1 : i / (layers.length - 1);
    return \`oklch(\${(0.84 - t * 0.2).toFixed(3)} \${(0.11 + t * 0.09).toFixed(3)} \${hue})\`;
  });

  const shown = hover !== null ? [hover] : markers;
  const totalAt = (i: number) => cumulative[0][i];
  const coreAt = (i: number) => cumulative[cumulative.length - 1][i];

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const t = (e.clientX - r.left) / r.width;
    setHover(Math.max(0, Math.min(n - 1, Math.floor(t * n))));
  };

  const pill =
    "absolute -translate-x-1/2 rounded-full bg-card px-3 py-1.5 font-mono text-[12px] font-medium tabular-nums text-foreground shadow-[0_1px_2px_oklch(0_0_0/0.06),0_4px_14px_oklch(0_0_0/0.08)] whitespace-nowrap";

  return (
    <article
      className={cx(
        "w-full max-w-[460px] overflow-hidden rounded-[22px] border border-border bg-card text-card-foreground shadow-[0_30px_60px_-30px_oklch(0_0_0/0.25)]",
        className
      )}
    >
      <h3 className="px-7 pt-6 text-[26px] font-bold tracking-[-0.02em]">{title}</h3>

      {/* Chart */}
      <div
        className="relative mt-2 touch-pan-y select-none"
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label={\`\${title}. \${periods.map((p, i) => \`\${p}: \${num.format(totalAt(i))}\`).join(", ")}\`}
      >
        <svg viewBox={\`0 0 \${W} \${H}\`} preserveAspectRatio="none" className="block h-[260px] w-full" aria-hidden>
          <defs>
            <filter id={\`\${uid}-blur\`} x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="26" />
            </filter>
          </defs>

          <g
            style={{
              transformOrigin: \`0 \${mid}px\`,
              transform: \`scaleY(\${mounted ? 1 : 0.04})\`,
              transition: \`transform 1100ms \${EASE}\`,
            }}
          >
            {/* soft halo in the stream's color */}
            <path d={bandPath(halves[0], xs, mid)} filter={\`url(#\${uid}-blur)\`} style={{ fill: shades[0], opacity: 0.55 }} />
            {halves.map((h, i) => (
              <path key={layers[i].label} d={bandPath(h, xs, mid)} style={{ fill: shades[i] }} />
            ))}
          </g>
        </svg>

        {/* Marker lines */}
        {shown.map((i) => (
          <span
            key={\`line-\${i}\`}
            aria-hidden
            className="pointer-events-none absolute top-4 w-[2px] -translate-x-1/2 rounded-full bg-card"
            style={{
              left: \`\${(xs[i] / W) * 100}%\`,
              height: labelMode === "split" ? 228 : 240,
              opacity: mounted ? 0.95 : 0,
              transition: "opacity 400ms ease 700ms",
            }}
          />
        ))}

        {/* Value pills */}
        {shown.map((i) =>
          labelMode === "split" ? (
            <React.Fragment key={\`pill-\${i}\`}>
              <span className={pill} style={{ left: \`\${(xs[i] / W) * 100}%\`, top: 4 }}>
                {num.format(totalAt(i))}
              </span>
              <span className={pill} style={{ left: \`\${(xs[i] / W) * 100}%\`, top: 214 }}>
                {num.format(coreAt(i))}
              </span>
            </React.Fragment>
          ) : (
            <span
              key={\`pill-\${i}\`}
              className={pill}
              style={{ left: \`\${(xs[i] / W) * 100}%\`, top: \`\${((mid - 15) / H) * 260}px\` }}
            >
              {num.format(totalAt(i))}
            </span>
          )
        )}

        {/* Axis */}
        {labelMode === "center" && (
          <div className="absolute inset-x-0 bottom-2 flex" aria-hidden>
            {periods.map((p, i) => (
              <span
                key={p}
                className={cx(
                  "flex-1 text-center font-mono text-[12px] transition-colors",
                  shown.includes(i) ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {p}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-6 px-7 pt-5">
          {stats.slice(0, 2).map((s) => (
            <div key={s.label} className="min-w-0">
              <p className="flex items-center gap-1.5 text-[15px] font-semibold text-muted-foreground">
                {s.icon}
                {s.label}
              </p>
              <p className="mt-1 truncate font-mono text-[30px] font-semibold leading-tight tracking-[-0.03em] tabular-nums">
                {s.value}
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[13px]">
                <span
                  className="inline-flex items-center gap-0.5 font-semibold tabular-nums"
                  style={{ color: s.change >= 0 ? "oklch(0.64 0.17 150)" : "oklch(0.62 0.21 25)" }}
                >
                  <ArrowUp up={s.change >= 0} />
                  {Math.abs(s.change).toFixed(1)}%
                </span>
                {s.hint && <span className="truncate text-muted-foreground">{s.hint}</span>}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Rows */}
      {rows.length > 0 && (
        <ul className="mx-7 mt-5 mb-3 divide-y divide-border">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-3 py-3">
              <span className="flex min-w-0 items-center gap-2.5 text-[15px] text-foreground/80">
                {r.icon}
                <span className="truncate">{r.label}</span>
              </span>
              <span className="font-mono text-[15px] font-medium tabular-nums text-foreground/80">{r.value}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default FlowStreamCard;
`],["demo.tsx",`"use client";

import { FlowStreamCard } from "@/components/ui/component";

const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

const Spark = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
    <path d="M8 1c.4 3.3 1.7 4.6 5 5-3.3.4-4.6 1.7-5 5-.4-3.3-1.7-4.6-5-5 3.3-.4 4.6-1.7 5-5Z" fill={color} />
  </svg>
);

const Coin = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
    <circle cx="8" cy="8" r="6.5" fill="none" stroke={color} strokeWidth="2" />
    <circle cx="8" cy="8" r="2.5" fill={color} />
  </svg>
);

const Chain = ({ color }: { color: string }) => (
  <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ background: color }} />
);

export default function Demo() {
  return (
    <div className="flex min-h-screen w-full flex-wrap items-center justify-center gap-8 bg-muted p-4 sm:p-10">
      <FlowStreamCard
        title="DEX Volume"
        hue={48}
        labelMode="split"
        periods={months}
        markers={[1, 4, 7]}
        layers={[
          { label: "Bridged", values: [400, 900, 1400, 2300, 3200, 3700, 5100, 6400] },
          { label: "Perps", values: [300, 1300, 2100, 3100, 4300, 5000, 6700, 7900] },
          { label: "LP", values: [200, 1920, 2500, 3600, 4560, 5400, 7200, 8900] },
          { label: "Swaps", values: [300, 2221, 4600, 8200, 14487, 17900, 26300, 32112] },
        ]}
        stats={[
          { label: "24h volume", value: "$8,097", change: 19.6, hint: "44,214 txs", icon: <Spark color="oklch(0.68 0.17 150)" /> },
          { label: "TVL", value: "$312,134", change: 2.5, hint: "301,002 USDC", icon: <Coin color="oklch(0.78 0.15 80)" /> },
        ]}
        rows={[
          { label: "Ethereum", value: "201,192", icon: <Chain color="oklch(0.55 0.08 275)" /> },
          { label: "Arbitrum", value: "192,054", icon: <Chain color="oklch(0.62 0.13 240)" /> },
          { label: "Base", value: "166,401", icon: <Chain color="oklch(0.55 0.2 260)" /> },
        ]}
      />

      <FlowStreamCard
        title="Staking Inflow"
        hue={258}
        labelMode="center"
        periods={months}
        markers={[2, 4, 6]}
        layers={[
          { label: "Restaked", values: [300, 900, 1500, 3800, 4400, 3100, 900, 200] },
          { label: "Liquid", values: [200, 800, 1400, 4100, 5200, 3600, 1100, 200] },
          { label: "Native", values: [300, 900, 3765, 7900, 10841, 6200, 2212, 300] },
        ]}
        stats={[
          { label: "This month", value: "$8,097", change: 19.6, hint: "1,204 stakers", icon: <Spark color="oklch(0.68 0.17 150)" /> },
          { label: "Total staked", value: "$312,134", change: 2.5, hint: "98.2 ETH", icon: <Coin color="oklch(0.78 0.15 80)" /> },
        ]}
        rows={[
          { label: "Lido", value: "201,192", icon: <Chain color="oklch(0.7 0.13 230)" /> },
          { label: "Rocket Pool", value: "192,054", icon: <Chain color="oklch(0.65 0.2 30)" /> },
          { label: "EigenLayer", value: "166,401", icon: <Chain color="oklch(0.45 0.1 270)" /> },
        ]}
      />
    </div>
  );
}
`]],mount(e,a){let o=(0,Y.createRoot)(e);return o.render(j.createElement(S,a)),{update:c=>o.render(j.createElement(S,c)),unmount:()=>o.unmount()}}};})();
