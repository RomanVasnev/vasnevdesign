(()=>{var Qn=Object.create;var Wn=Object.defineProperty;var Zn=Object.getOwnPropertyDescriptor;var nt=Object.getOwnPropertyNames;var tt=Object.getPrototypeOf,et=Object.prototype.hasOwnProperty;var hn=(i,r)=>()=>{try{return r||i((r={exports:{}}).exports,r),r.exports}catch(c){throw r=0,c}};var rt=(i,r,c,b)=>{if(r&&typeof r=="object"||typeof r=="function")for(let N of nt(r))!et.call(i,N)&&N!==c&&Wn(i,N,{get:()=>r[N],enumerable:!(b=Zn(r,N))||b.enumerable});return i};var F=(i,r,c)=>(c=i!=null?Qn(tt(i)):{},rt(r||!i||!i.__esModule?Wn(c,"default",{value:i,enumerable:!0}):c,i));var V=hn((lt,An)=>{An.exports=window.__R.react});var Gn=hn((ct,$n)=>{$n.exports=window.__R["react-dom/client"]});var j=hn((dt,In)=>{In.exports=window.__R["react/jsx-runtime"]});var mn=F(V()),qn=F(Gn());var D=F(V());var f=F(V()),u=F(j()),at=(i,r,c)=>(Math.sin(i*.004+c*.7)+Math.cos(r*.005-c*.5)+Math.sin((i+r)*.002+c*.3))*Math.PI,_n=f.forwardRef(function({headline:r,eyebrow:c,description:b,actions:N,accent:C="#3c2cff",grid:q=[20,13],fontFamily:B="Geist, ui-sans-serif, system-ui, -apple-system, sans-serif",fontWeight:K=600,repelRadius:gn=120,scrollScatter:W=!0,scrollHint:A={scatter:"Scroll to scatter",gather:"Scroll up to gather"},onReady:xn,className:Bn="",style:Yn,...On},Xn){let Q=f.useRef(null),yn=f.useRef(null),wn=f.useRef(null),bn=f.useRef(null),Z=f.useRef(null),nn=f.useRef(null),Y=f.useRef(null),tn=f.useRef(null),[Un,vn]=f.useState(!1),en=f.useRef(!1),rn=f.useRef({W:0,H:0,N:0,P:new Float32Array(0),t0:0,scrollP:0,btnP:0,btnT:0,scatter:0,last:0,kick:0,mouse:{x:-9999,y:-9999,on:!1},restart:()=>{}}),S=f.useRef({headline:r,fontFamily:B,fontWeight:K,grid:q,repelRadius:gn,accent:C,onReady:xn});S.current={headline:r,fontFamily:B,fontWeight:K,grid:q,repelRadius:gn,accent:C,onReady:xn},f.useImperativeHandle(Xn,()=>({replay:()=>rn.current.restart(),setScattered:v=>{rn.current.btnT=v?1:0}}),[]),f.useEffect(()=>{let v=yn.current,kn=wn.current,Rn=bn.current,T=kn.getContext("2d"),z=Rn.getContext("2d"),O=window.matchMedia("(prefers-reduced-motion: reduce)").matches,e=rn.current,X=0,Mn=!0,on=!0,sn=0,ln="#fff",Vn=0,Pn=()=>{ln=getComputedStyle(v).color||ln},Jn=()=>{let{W:s,H:l}=e,g=S.current,P=document.createElement("canvas"),h=P.getContext("2d",{willReadFrequently:!0});P.width=s,P.height=l;let t=o=>`${g.fontWeight} ${o}px ${g.fontFamily}`,H=g.headline.split(/\s+/),x=Math.min(s*.115,l*.2,168),m=[];for(;;){h.font=t(x),m=[];let o="";for(let p of H){let M=o?o+" "+p:p;h.measureText(M).width>s*.88&&o?(m.push(o),o=p):o=M}if(m.push(o),m.length<=3&&m.every(p=>h.measureText(p).width<=s*.92)||x<28)break;x*=.9}h.font=t(x),h.textAlign="center",h.textBaseline="middle";try{h.letterSpacing=`${-x*.05}px`}catch{}let d=x*.98,R=l*.46-(m.length-1)*d/2;m.forEach((o,p)=>h.fillText(o,s/2,R+p*d));let E=h.getImageData(0,0,s,l).data,a=[],n=Math.max(3,Math.round(x/30));for(let o=0;o<l;o+=n)for(let p=0;p<s;p+=n)E[(o*s+p)*4+3]>128&&a.push(p,o);return a},Nn=()=>{let s=v.getBoundingClientRect(),l=Math.min(2,window.devicePixelRatio||1);e.W=Math.max(1,Math.round(s.width)),e.H=Math.max(1,Math.round(s.height));for(let a of[kn,Rn])a.width=e.W*l,a.height=e.H*l;T.setTransform(l,0,0,l,0,0),z.setTransform(l,0,0,l,0,0);let[g,P]=S.current.grid,h=Jn(),t=Math.ceil(e.W/g)+1,H=Math.ceil(e.H/P)+1,x=t*H,m=h.length/2;e.N=Math.max(x,m);let d=new Float32Array(e.N*10);for(let a=0;a<e.N;a++){let n=a<x?a:Math.random()*x|0,o=n%t*g-6,p=Math.floor(n/t)*P-1,M=a*10;d[M]=o,d[M+1]=p,d[M+4]=o,d[M+5]=p}let R=Array.from({length:e.N},(a,n)=>n);for(let a=R.length-1;a>0;a--){let n=Math.random()*(a+1)|0;[R[a],R[n]]=[R[n],R[a]]}let E=Math.hypot(e.W,e.H);for(let a=0;a<m;a++){let n=R[a]*10,o=h[a*2],p=h[a*2+1];d[n+6]=o,d[n+7]=p,d[n+9]=1,d[n+8]=.15+Math.min(.9,Math.hypot(o-e.W/2,p-e.H*.46)/E)*1.1+Math.random()*.25}e.P=d},Sn=()=>{let s=e.scrollP,l=en.current;if(nn.current&&(nn.current.style.opacity=l?String(Math.max(0,1-s*1.6)):""),Y.current&&tn.current&&A){let g=s>.85;Y.current.dataset.up=g?"true":"false",tn.current.textContent=g?A.gather:A.scatter,Y.current.style.opacity=l?String(g?1:Math.max(0,1-s*5)):"0"}},Tn=()=>{W&&e.scrollP>0&&Q.current?.scrollIntoView({block:"start"}),e.btnP=e.btnT=0,e.kick=0,Pn(),Nn(),e.t0=performance.now(),en.current=!1,vn(!1),window.clearTimeout(sn),sn=window.setTimeout(()=>{en.current=!0,vn(!0),Sn(),S.current.onReady?.()},O?0:1700)};e.restart=Tn;let Hn=s=>{if(X=0,!!on){if(Mn){let l=(s-e.t0)/1e3,{W:g,H:P,N:h,P:t}=e,H=S.current.repelRadius,x=H*H;++Vn%30===0&&Pn(),e.btnP+=(e.btnT-e.btnP)*.06;let m=Math.max(e.scrollP,e.btnP);e.kick=e.kick*.93+Math.abs(m-e.last)*6,e.last=m;let d=Math.min(1,m),R=l*.35%1.6-.3,E=e.mouse;T.clearRect(0,0,g,P),z.clearRect(0,0,g,P),T.fillStyle=ln,z.fillStyle=S.current.accent;for(let a=0;a<h;a++){let n=a*10,o=t[n+9]===1,p=t[n+4],M=t[n+5],pn=.06,L=0,$=l-t[n+8];if(o){if($>0){let y=Math.min(1,m*(.8+t[n+8]*.6));p=t[n+6]+(t[n+4]-t[n+6])*y,M=t[n+7]+(t[n+5]-t[n+7])*y,pn=Math.min(.09,.02+$*.08)}L=$>-1?Math.max(0,1-Math.max(0,$)*1.4):0}if(e.kick>.01&&(L=Math.max(L,Math.min(1,e.kick)*.9)),O){let y=o?1-d:0;t[n]=t[n+4]+((o?t[n+6]:t[n+4])-t[n+4])*y,t[n+1]=t[n+5]+((o?t[n+7]:t[n+5])-t[n+5])*y}else{let y=(p-t[n])*pn,G=(M-t[n+1])*pn;if(L>0){let k=at(t[n],t[n+1],l);y+=Math.cos(k)*2.2*L,G+=Math.sin(k)*2.2*L}if(E.on&&H>0){let k=t[n]-E.x,I=t[n+1]-E.y,_=k*k+I*I;if(_<x){let fn=Math.sqrt(_)||1,Dn=(1-fn/H)*6;y+=k/fn*Dn,G+=I/fn*Dn}}t[n+2]=(t[n+2]+y)*.82,t[n+3]=(t[n+3]+G)*.82,t[n]+=t[n+2],t[n+1]+=t[n+3]}let U=t[n],un=t[n+1],Kn=Math.abs(t[n+2])+Math.abs(t[n+3]),Ln=Math.min(.5,.12+Kn*.05);if(o){let y=O?1-d:Math.min(1,Math.max(0,$*1.2))*(1-d),G=(.34+y*.6)*(1-d)+Ln*d,k=1-d*.25;if(T.globalAlpha=G,T.fillRect(U-k,un-k,k*2,k*2),d<1&&!O){let I=Math.max(0,1-Math.abs(U/g-R)*7),_=(I*.9+(1-y)*.25)*(1-d);_>.02&&(z.globalAlpha=_,z.fillRect(U-2,un-2,4,4))}}else T.globalAlpha=Ln,T.fillRect(U-.75,un-.75,1.5,1.5)}T.globalAlpha=1,z.globalAlpha=1}X=requestAnimationFrame(Hn)}},cn=()=>{if(!W)return;let s=Q.current.getBoundingClientRect();e.scrollP=Math.min(1,Math.max(0,-s.top/(window.innerHeight*.7))),Sn()},Fn=s=>{let l=v.getBoundingClientRect();e.mouse.x=s.clientX-l.left,e.mouse.y=s.clientY-l.top,e.mouse.on=!0,Z.current?.style.setProperty("--x",`${e.mouse.x}px`),Z.current?.style.setProperty("--y",`${e.mouse.y}px`)},Cn=()=>{e.mouse.on=!1},dn=0,En=new ResizeObserver(()=>{window.clearTimeout(dn),dn=window.setTimeout(()=>{Nn(),e.t0=performance.now()-3e3},150)}),zn=new IntersectionObserver(([s])=>{Mn=s.isIntersecting},{threshold:0});return v.addEventListener("pointermove",Fn),v.addEventListener("pointerleave",Cn),window.addEventListener("scroll",cn,{passive:!0,capture:!0}),(document.fonts?.load?document.fonts.load(`${S.current.fontWeight} 100px ${S.current.fontFamily}`).catch(()=>[]):Promise.resolve([])).then(()=>{on&&(Tn(),cn(),En.observe(v),zn.observe(v),X=requestAnimationFrame(Hn))}),()=>{on=!1,cancelAnimationFrame(X),window.clearTimeout(sn),window.clearTimeout(dn),En.disconnect(),zn.disconnect(),v.removeEventListener("pointermove",Fn),v.removeEventListener("pointerleave",Cn),window.removeEventListener("scroll",cn,{capture:!0})}},[r,B,K,q[0],q[1],W]);let an=`transition-[opacity,transform] duration-1000 [transition-timing-function:cubic-bezier(.2,.9,.25,1)] ${Un?"translate-y-0 opacity-100":"translate-y-2.5 opacity-0"}`;return(0,u.jsx)("section",{ref:Q,className:`relative w-full bg-background text-foreground ${Bn}`,style:{height:W?"calc(100svh + 90vh)":void 0,...Yn},...On,children:(0,u.jsxs)("div",{ref:yn,className:"group sticky top-0 h-[100svh] min-h-[560px] w-full overflow-hidden",style:{fontFamily:B},children:[(0,u.jsx)("canvas",{ref:bn,"aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full opacity-50 mix-blend-multiply blur-[10px] dark:opacity-90 dark:mix-blend-screen"}),(0,u.jsx)("canvas",{ref:wn,"aria-hidden":"true",className:"absolute inset-0 h-full w-full"}),(0,u.jsx)("div",{ref:Z,"aria-hidden":"true",className:"pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",style:{background:`radial-gradient(260px circle at var(--x,50%) var(--y,40%), color-mix(in oklab, ${C} 16%, transparent), transparent 70%)`}}),(0,u.jsx)("h1",{className:"sr-only",children:r}),(0,u.jsxs)("div",{ref:nn,className:"pointer-events-none absolute inset-0",children:[c&&(0,u.jsx)("div",{className:`absolute inset-x-0 top-[12vh] flex justify-center ${an}`,children:(0,u.jsxs)("span",{className:"inline-flex h-[30px] items-center gap-2 rounded-full border border-border bg-muted/60 px-3 text-[13px] font-medium tracking-[-0.01em] text-muted-foreground backdrop-blur-md",children:[(0,u.jsx)("i",{className:"size-1.5 rounded-full",style:{background:C,boxShadow:`0 0 10px ${C}`}}),c]})}),(0,u.jsxs)("div",{className:"absolute inset-0 flex flex-col items-center justify-end px-5 pb-[max(17vh,110px)] text-center",children:[b&&(0,u.jsx)("p",{className:`m-0 max-w-[600px] text-[17px] leading-[25px] tracking-[-0.02em] text-muted-foreground ${an} delay-100`,children:b}),N&&(0,u.jsx)("div",{className:`pointer-events-auto mt-[22px] flex flex-wrap justify-center gap-2.5 ${an} delay-200`,children:N})]})]}),W&&A&&(0,u.jsxs)("div",{ref:Y,"aria-hidden":"true","data-up":"false",className:"group/hint pointer-events-none absolute bottom-[22px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[12px] font-medium tracking-[0.02em] text-muted-foreground opacity-0 transition-opacity duration-700",children:[(0,u.jsx)("div",{className:"relative h-[34px] w-[22px] rounded-[11px] border-[1.5px] border-[color-mix(in_oklab,var(--color-foreground)_28%,transparent)] transition-transform duration-500 group-data-[up=true]/hint:rotate-180",children:(0,u.jsx)("span",{className:"absolute left-1/2 top-[7px] -ml-[1.5px] h-[7px] w-[3px] rounded-sm motion-safe:animate-[dotfield-wheel_1.8s_cubic-bezier(.6,0,.3,1)_infinite]",style:{background:C,boxShadow:`0 0 8px ${C}`}})}),(0,u.jsx)("span",{ref:tn,children:A.scatter})]}),(0,u.jsx)("style",{children:"@keyframes dotfield-wheel{0%{transform:translateY(0);opacity:0}20%{opacity:1}70%{transform:translateY(10px);opacity:0}100%{opacity:0}}"})]})})});var w=F(j());function ot(){D.useEffect(()=>{let i="geist-font";if(document.getElementById(i))return;let r=document.createElement("link");r.id=i,r.rel="stylesheet",r.href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap",document.head.appendChild(r)},[])}var jn="inline-flex h-11 items-center rounded-full px-5 text-[15px] font-medium tracking-[-0.02em] outline-none transition-transform active:scale-[.97] focus-visible:ring-2 focus-visible:ring-ring";function J(){ot();let i=D.useRef(null),[r,c]=D.useState(!1);return(0,w.jsxs)("div",{className:"w-full bg-background text-foreground",children:[(0,w.jsx)(_n,{ref:i,headline:"Design that moves.",eyebrow:"Product design studio",description:"Interfaces with Apple-level detail, from the first sketch to shipped code.",actions:(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("a",{href:"#work",className:`${jn} bg-foreground text-background`,children:"View work"}),(0,w.jsx)("a",{href:"#contact",className:`${jn} border border-border bg-muted/60 text-foreground backdrop-blur-md`,children:"Book a call"})]})}),(0,w.jsx)("section",{id:"work",className:"grid min-h-[60vh] place-items-center px-5 text-center text-[15px] tracking-[-0.02em] text-muted-foreground",children:"Scroll back up and the field gathers again."}),(0,w.jsx)("div",{className:"fixed bottom-4 right-4 z-10 flex gap-2",style:{fontFamily:"Geist, ui-sans-serif, system-ui, sans-serif"},children:[{label:r?"Gather":"Scatter",onClick:()=>{i.current?.setScattered(!r),c(!r)}},{label:"Replay",onClick:()=>{c(!1),i.current?.replay()}}].map(b=>(0,w.jsx)("button",{type:"button",onClick:b.onClick,className:"h-8 rounded-full bg-muted px-3.5 text-[13px] font-medium tracking-[-0.01em] text-foreground outline-none backdrop-blur-md focus-visible:ring-2 focus-visible:ring-ring",children:b.label},b.label==="Replay"?"replay":"scatter"))})]})}(window.__UI=window.__UI||{})["dot-field"]={css:`/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --spacing: 0.25rem;
    --font-weight-medium: 500;
    --blur-md: 12px;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: Geist, ui-sans-serif, system-ui, sans-serif;
    --default-mono-font-family: var(--font-mono);
    --color-foreground: var(--foreground);
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
  .pointer-events-auto {
    pointer-events: auto;
  }
  .pointer-events-none {
    pointer-events: none;
  }
  .visible {
    visibility: visible;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border-width: 0;
  }
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .relative {
    position: relative;
  }
  .sticky {
    position: sticky;
  }
  .inset-0 {
    inset: 0px;
  }
  .inset-x-0 {
    inset-inline: 0px;
  }
  .top-0 {
    top: 0px;
  }
  .top-\\[7px\\] {
    top: 7px;
  }
  .top-\\[12vh\\] {
    top: 12vh;
  }
  .right-4 {
    right: calc(var(--spacing) * 4);
  }
  .bottom-4 {
    bottom: calc(var(--spacing) * 4);
  }
  .bottom-\\[22px\\] {
    bottom: 22px;
  }
  .left-1\\/2 {
    left: calc(1 / 2 * 100%);
  }
  .z-10 {
    z-index: 10;
  }
  .m-0 {
    margin: 0px;
  }
  .mt-\\[22px\\] {
    margin-top: 22px;
  }
  .-ml-\\[1\\.5px\\] {
    margin-left: calc(1.5px * -1);
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
  .size-1\\.5 {
    width: calc(var(--spacing) * 1.5);
    height: calc(var(--spacing) * 1.5);
  }
  .h-8 {
    height: calc(var(--spacing) * 8);
  }
  .h-11 {
    height: calc(var(--spacing) * 11);
  }
  .h-\\[7px\\] {
    height: 7px;
  }
  .h-\\[30px\\] {
    height: 30px;
  }
  .h-\\[34px\\] {
    height: 34px;
  }
  .h-\\[100svh\\] {
    height: 100svh;
  }
  .h-full {
    height: 100%;
  }
  .min-h-\\[60vh\\] {
    min-height: 60vh;
  }
  .min-h-\\[560px\\] {
    min-height: 560px;
  }
  .w-\\[3px\\] {
    width: 3px;
  }
  .w-\\[22px\\] {
    width: 22px;
  }
  .w-full {
    width: 100%;
  }
  .max-w-\\[600px\\] {
    max-width: 600px;
  }
  .-translate-x-1\\/2 {
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-y-0 {
    --tw-translate-y: 0px;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-y-2\\.5 {
    --tw-translate-y: calc(var(--spacing) * 2.5);
    translate: var(--tw-translate-x) var(--tw-translate-y);
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
  .overflow-hidden {
    overflow: hidden;
  }
  .rounded-\\[11px\\] {
    border-radius: 11px;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-sm {
    border-radius: calc(var(--radius) - 4px);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-\\[1\\.5px\\] {
    border-style: var(--tw-border-style);
    border-width: 1.5px;
  }
  .border-border {
    border-color: var(--border);
  }
  .bg-background {
    background-color: var(--background);
  }
  .bg-foreground {
    background-color: var(--foreground);
  }
  .bg-muted {
    background-color: var(--muted);
  }
  .bg-muted\\/60 {
    background-color: var(--muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--muted) 60%, transparent);
    }
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-3\\.5 {
    padding-inline: calc(var(--spacing) * 3.5);
  }
  .px-5 {
    padding-inline: calc(var(--spacing) * 5);
  }
  .text-center {
    text-align: center;
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
  .text-\\[17px\\] {
    font-size: 17px;
  }
  .leading-\\[25px\\] {
    --tw-leading: 25px;
    line-height: 25px;
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .tracking-\\[-0\\.01em\\] {
    --tw-tracking: -0.01em;
    letter-spacing: -0.01em;
  }
  .tracking-\\[-0\\.02em\\] {
    --tw-tracking: -0.02em;
    letter-spacing: -0.02em;
  }
  .tracking-\\[0\\.02em\\] {
    --tw-tracking: 0.02em;
    letter-spacing: 0.02em;
  }
  .text-background {
    color: var(--background);
  }
  .text-foreground {
    color: var(--foreground);
  }
  .text-muted-foreground {
    color: var(--muted-foreground);
  }
  .opacity-0 {
    opacity: 0%;
  }
  .opacity-50 {
    opacity: 50%;
  }
  .opacity-100 {
    opacity: 100%;
  }
  .mix-blend-multiply {
    mix-blend-mode: multiply;
  }
  .blur-\\[10px\\] {
    --tw-blur: blur(10px);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .backdrop-blur-md {
    --tw-backdrop-blur: blur(var(--blur-md));
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .transition-opacity {
    transition-property: opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-transform {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .delay-100 {
    transition-delay: 100ms;
  }
  .delay-200 {
    transition-delay: 200ms;
  }
  .duration-500 {
    --tw-duration: 500ms;
    transition-duration: 500ms;
  }
  .duration-700 {
    --tw-duration: 700ms;
    transition-duration: 700ms;
  }
  .duration-1000 {
    --tw-duration: 1000ms;
    transition-duration: 1000ms;
  }
  .outline-none {
    --tw-outline-style: none;
    outline-style: none;
  }
  @media (hover: hover) {
    .group-hover\\:opacity-100:is(:where(.group):hover *) {
      opacity: 100%;
    }
  }
  .group-data-\\[up\\=true\\]\\/hint\\:rotate-180:is(:where(.group\\/hint)[data-up="true"] *) {
    rotate: 180deg;
  }
  .focus-visible\\:ring-2:focus-visible {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .focus-visible\\:ring-ring:focus-visible {
    --tw-ring-color: var(--ring);
  }
  .active\\:scale-\\[\\.97\\]:active {
    scale: .97;
  }
  .dark\\:opacity-90:is(.tw-dark *) {
    opacity: 90%;
  }
  .dark\\:mix-blend-screen:is(.tw-dark *) {
    mix-blend-mode: screen;
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
      --tw-border-style: solid;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-tracking: initial;
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
      --tw-backdrop-blur: initial;
      --tw-backdrop-brightness: initial;
      --tw-backdrop-contrast: initial;
      --tw-backdrop-grayscale: initial;
      --tw-backdrop-hue-rotate: initial;
      --tw-backdrop-invert: initial;
      --tw-backdrop-opacity: initial;
      --tw-backdrop-saturate: initial;
      --tw-backdrop-sepia: initial;
      --tw-duration: initial;
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
@property --tw-backdrop-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-duration {
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
}`,settings:{},themeable:!0,files:[["component.tsx",`"use client";

import * as React from "react";

/* ------------------------------------------------------------------ */
/*  Dot Field: a hero whose headline is assembled from the dot grid.   */
/*  Dots fly in like a flock, the cursor pushes them away, a glow      */
/*  runs through the letters and scrolling scatters them back.         */
/*  Canvas only, no dependencies. Colors follow the theme              */
/*  (text-foreground / bg-background), so light and dark both work.    */
/* ------------------------------------------------------------------ */

export interface DotFieldProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Headline drawn with dots. Also rendered as a real <h1> for screen readers. */
  headline: string;
  /** Small pill above the headline. */
  eyebrow?: React.ReactNode;
  /** Supporting line under the headline. */
  description?: React.ReactNode;
  /** Buttons or links under the description. */
  actions?: React.ReactNode;
  /** Glow color that runs through the letters. */
  accent?: string;
  /** Grid spacing in px: [x, y]. */
  grid?: [number, number];
  /** Font used to draw the headline. Make sure it is loaded on the page. */
  fontFamily?: string;
  fontWeight?: number;
  /** Radius of the cursor push, in px. 0 turns it off. */
  repelRadius?: number;
  /** Scatter the headline back into the grid while the page scrolls. */
  scrollScatter?: boolean;
  /** Labels for the scroll hint at the bottom, or false to hide it. */
  scrollHint?: { scatter: string; gather: string } | false;
  /** Called when the intro has finished. */
  onReady?: () => void;
}

export interface DotFieldHandle {
  /** Play the intro again. */
  replay: () => void;
  /** Scatter (true) or gather (false) without scrolling. */
  setScattered: (scattered: boolean) => void;
}

const FLOW = (x: number, y: number, t: number) =>
  (Math.sin(x * 0.004 + t * 0.7) + Math.cos(y * 0.005 - t * 0.5) + Math.sin((x + y) * 0.002 + t * 0.3)) * Math.PI;

export const DotField = React.forwardRef<DotFieldHandle, DotFieldProps>(function DotField(
  {
    headline,
    eyebrow,
    description,
    actions,
    accent = "#3c2cff",
    grid = [20, 13],
    fontFamily = "Geist, ui-sans-serif, system-ui, -apple-system, sans-serif",
    fontWeight = 600,
    repelRadius = 120,
    scrollScatter = true,
    scrollHint = { scatter: "Scroll to scatter", gather: "Scroll up to gather" },
    onReady,
    className = "",
    style,
    ...rest
  },
  ref,
) {
  const outerRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const dotsRef = React.useRef<HTMLCanvasElement>(null);
  const glowRef = React.useRef<HTMLCanvasElement>(null);
  const spotRef = React.useRef<HTMLDivElement>(null);
  const copyRef = React.useRef<HTMLDivElement>(null);
  const hintRef = React.useRef<HTMLDivElement>(null);
  const hintLabelRef = React.useRef<HTMLSpanElement>(null);
  const [ready, setReady] = React.useState(false);
  const readyRef = React.useRef(false);

  // everything the render loop needs lives in one mutable object
  const S = React.useRef({
    W: 0, H: 0, N: 0, P: new Float32Array(0), t0: 0,
    scrollP: 0, btnP: 0, btnT: 0, scatter: 0, last: 0, kick: 0,
    mouse: { x: -9999, y: -9999, on: false },
    restart: () => {},
  });

  const opts = React.useRef({ headline, fontFamily, fontWeight, grid, repelRadius, accent, onReady });
  opts.current = { headline, fontFamily, fontWeight, grid, repelRadius, accent, onReady };

  React.useImperativeHandle(ref, () => ({
    replay: () => S.current.restart(),
    setScattered: (v) => { S.current.btnT = v ? 1 : 0; },
  }), []);

  React.useEffect(() => {
    const stage = stageRef.current!, cv = dotsRef.current!, gl = glowRef.current!;
    const ctx = cv.getContext("2d")!, gtx = gl.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = S.current;
    let raf = 0, visible = true, alive = true, readyTimer = 0;
    let fg = "#fff", frameNo = 0;

    const readFg = () => { fg = getComputedStyle(stage).color || fg; };

    /* lay the headline out on an offscreen canvas and sample its pixels */
    const sample = () => {
      const { W, H } = s, o = opts.current;
      const c = document.createElement("canvas"), g = c.getContext("2d", { willReadFrequently: true })!;
      c.width = W; c.height = H;
      const font = (px: number) => \`\${o.fontWeight} \${px}px \${o.fontFamily}\`;
      const words = o.headline.split(/\\s+/);
      let size = Math.min(W * 0.115, H * 0.2, 168), lines: string[] = [];
      for (;;) {
        g.font = font(size); lines = []; let cur = "";
        for (const w of words) { const t = cur ? cur + " " + w : w; if (g.measureText(t).width > W * 0.88 && cur) { lines.push(cur); cur = w; } else cur = t; }
        lines.push(cur);
        if ((lines.length <= 3 && lines.every((l) => g.measureText(l).width <= W * 0.92)) || size < 28) break;
        size *= 0.9;
      }
      g.font = font(size); g.textAlign = "center"; g.textBaseline = "middle";
      try { (g as any).letterSpacing = \`\${-size * 0.05}px\`; } catch {}
      const lh = size * 0.98, top = H * 0.46 - ((lines.length - 1) * lh) / 2;
      lines.forEach((l, i) => g.fillText(l, W / 2, top + i * lh));
      const d = g.getImageData(0, 0, W, H).data, pts: number[] = [], step = Math.max(3, Math.round(size / 30));
      for (let y = 0; y < H; y += step) for (let x = 0; x < W; x += step) if (d[(y * W + x) * 4 + 3] > 128) pts.push(x, y);
      return pts;
    };

    /* one Float32Array, 10 slots per dot: x y vx vy homeX homeY textX textY delay isText */
    const build = () => {
      const r = stage.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      s.W = Math.max(1, Math.round(r.width)); s.H = Math.max(1, Math.round(r.height));
      for (const c of [cv, gl]) { c.width = s.W * dpr; c.height = s.H * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); gtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const [GX, GY] = opts.current.grid, tgt = sample();
      const cols = Math.ceil(s.W / GX) + 1, rows = Math.ceil(s.H / GY) + 1, cells = cols * rows, nText = tgt.length / 2;
      s.N = Math.max(cells, nText);
      const P = new Float32Array(s.N * 10);
      for (let i = 0; i < s.N; i++) {
        const cell = i < cells ? i : (Math.random() * cells) | 0;
        const hx = (cell % cols) * GX - 6, hy = Math.floor(cell / cols) * GY - 1, o = i * 10;
        P[o] = hx; P[o + 1] = hy; P[o + 4] = hx; P[o + 5] = hy;
      }
      const ids = Array.from({ length: s.N }, (_, i) => i);
      for (let i = ids.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [ids[i], ids[j]] = [ids[j], ids[i]]; }
      const diag = Math.hypot(s.W, s.H);
      for (let k = 0; k < nText; k++) {
        const o = ids[k] * 10, tx = tgt[k * 2], ty = tgt[k * 2 + 1];
        P[o + 6] = tx; P[o + 7] = ty; P[o + 9] = 1;
        // dots near the centre land first, so the headline grows from the inside out
        P[o + 8] = 0.15 + Math.min(0.9, Math.hypot(tx - s.W / 2, ty - s.H * 0.46) / diag) * 1.1 + Math.random() * 0.25;
      }
      s.P = P;
    };

    const setCopy = () => {
      const p = s.scrollP, show = readyRef.current;
      if (copyRef.current) copyRef.current.style.opacity = show ? String(Math.max(0, 1 - p * 1.6)) : "";
      if (hintRef.current && hintLabelRef.current && scrollHint) {
        const up = p > 0.85;
        hintRef.current.dataset.up = up ? "true" : "false";
        hintLabelRef.current.textContent = up ? scrollHint.gather : scrollHint.scatter;
        hintRef.current.style.opacity = show ? String(up ? 1 : Math.max(0, 1 - p * 5)) : "0";
      }
    };

    const restart = () => {
      if (scrollScatter && s.scrollP > 0) outerRef.current?.scrollIntoView({ block: "start" });
      s.btnP = s.btnT = 0; s.kick = 0;
      readFg(); build(); s.t0 = performance.now();
      readyRef.current = false; setReady(false);
      window.clearTimeout(readyTimer);
      readyTimer = window.setTimeout(() => { readyRef.current = true; setReady(true); setCopy(); opts.current.onReady?.(); }, reduce ? 0 : 1700);
    };
    s.restart = restart;

    const frame = (now: number) => {
      raf = 0;
      if (!alive) return;
      if (visible) {
        const t = (now - s.t0) / 1000, { W, H, N, P } = s, R = opts.current.repelRadius, R2 = R * R;
        if (++frameNo % 30 === 0) readFg();
        s.btnP += (s.btnT - s.btnP) * 0.06;
        const SC = Math.max(s.scrollP, s.btnP);
        s.kick = s.kick * 0.93 + Math.abs(SC - s.last) * 6; s.last = SC;
        const q = Math.min(1, SC), sweep = ((t * 0.35) % 1.6) - 0.3, m = s.mouse;
        ctx.clearRect(0, 0, W, H); gtx.clearRect(0, 0, W, H);
        ctx.fillStyle = fg; gtx.fillStyle = opts.current.accent;

        for (let i = 0; i < N; i++) {
          const o = i * 10, isT = P[o + 9] === 1;
          let tx = P[o + 4], ty = P[o + 5], k = 0.06, fl = 0;
          const local = t - P[o + 8];
          if (isT) {
            if (local > 0) {
              const d = Math.min(1, SC * (0.8 + P[o + 8] * 0.6));
              tx = P[o + 6] + (P[o + 4] - P[o + 6]) * d; ty = P[o + 7] + (P[o + 5] - P[o + 7]) * d;
              k = Math.min(0.09, 0.02 + local * 0.08);
            }
            fl = local > -1 ? Math.max(0, 1 - Math.max(0, local) * 1.4) : 0;
          }
          if (s.kick > 0.01) fl = Math.max(fl, Math.min(1, s.kick) * 0.9);

          if (reduce) {
            const d = isT ? 1 - q : 0;
            P[o] = P[o + 4] + ((isT ? P[o + 6] : P[o + 4]) - P[o + 4]) * d;
            P[o + 1] = P[o + 5] + ((isT ? P[o + 7] : P[o + 5]) - P[o + 5]) * d;
          } else {
            let ax = (tx - P[o]) * k, ay = (ty - P[o + 1]) * k;
            if (fl > 0) { const a = FLOW(P[o], P[o + 1], t); ax += Math.cos(a) * 2.2 * fl; ay += Math.sin(a) * 2.2 * fl; }
            if (m.on && R > 0) {
              const dx = P[o] - m.x, dy = P[o + 1] - m.y, d2 = dx * dx + dy * dy;
              if (d2 < R2) { const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 6; ax += (dx / d) * f; ay += (dy / d) * f; }
            }
            P[o + 2] = (P[o + 2] + ax) * 0.82; P[o + 3] = (P[o + 3] + ay) * 0.82;
            P[o] += P[o + 2]; P[o + 1] += P[o + 3];
          }

          const x = P[o], y = P[o + 1], sp = Math.abs(P[o + 2]) + Math.abs(P[o + 3]);
          const gridA = Math.min(0.5, 0.12 + sp * 0.05);
          if (isT) {
            const settle = reduce ? 1 - q : Math.min(1, Math.max(0, local * 1.2)) * (1 - q);
            const a = (0.34 + settle * 0.6) * (1 - q) + gridA * q, r = 1 - q * 0.25;
            ctx.globalAlpha = a; ctx.fillRect(x - r, y - r, r * 2, r * 2);
            if (q < 1 && !reduce) {
              const w = Math.max(0, 1 - Math.abs(x / W - sweep) * 7), ga = (w * 0.9 + (1 - settle) * 0.25) * (1 - q);
              if (ga > 0.02) { gtx.globalAlpha = ga; gtx.fillRect(x - 2, y - 2, 4, 4); }
            }
          } else {
            ctx.globalAlpha = gridA; ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
          }
        }
        ctx.globalAlpha = 1; gtx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(frame);
    };

    /* scroll progress of the whole section: 0 at the top, 1 after 70% of a screen */
    const onScroll = () => {
      if (!scrollScatter) return;
      const r = outerRef.current!.getBoundingClientRect();
      s.scrollP = Math.min(1, Math.max(0, -r.top / (window.innerHeight * 0.7)));
      setCopy();
    };

    const move = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      s.mouse.x = e.clientX - r.left; s.mouse.y = e.clientY - r.top; s.mouse.on = true;
      spotRef.current?.style.setProperty("--x", \`\${s.mouse.x}px\`);
      spotRef.current?.style.setProperty("--y", \`\${s.mouse.y}px\`);
    };
    const leave = () => { s.mouse.on = false; };

    let rt = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => { build(); s.t0 = performance.now() - 3000; }, 150);
    });
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });

    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });

    const fontReady = document.fonts?.load
      ? document.fonts.load(\`\${opts.current.fontWeight} 100px \${opts.current.fontFamily}\`).catch(() => [])
      : Promise.resolve([]);
    fontReady.then(() => {
      if (!alive) return;
      restart(); onScroll();
      ro.observe(stage); io.observe(stage);
      raf = requestAnimationFrame(frame);
    });

    return () => {
      alive = false; cancelAnimationFrame(raf); window.clearTimeout(readyTimer); window.clearTimeout(rt);
      ro.disconnect(); io.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", onScroll, { capture: true } as any);
    };
    // rebuild when the text or the grid changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headline, fontFamily, fontWeight, grid[0], grid[1], scrollScatter]);

  const fade = \`transition-[opacity,transform] duration-1000 [transition-timing-function:cubic-bezier(.2,.9,.25,1)] \${ready ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"}\`;

  return (
    <section
      ref={outerRef}
      className={\`relative w-full bg-background text-foreground \${className}\`}
      style={{ height: scrollScatter ? "calc(100svh + 90vh)" : undefined, ...style }}
      {...rest}
    >
      <div
        ref={stageRef}
        className="group sticky top-0 h-[100svh] min-h-[560px] w-full overflow-hidden"
        style={{ fontFamily }}
      >
        <canvas
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-50 mix-blend-multiply blur-[10px] dark:opacity-90 dark:mix-blend-screen"
        />
        <canvas ref={dotsRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        <div
          ref={spotRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: \`radial-gradient(260px circle at var(--x,50%) var(--y,40%), color-mix(in oklab, \${accent} 16%, transparent), transparent 70%)\` }}
        />

        <h1 className="sr-only">{headline}</h1>

        <div ref={copyRef} className="pointer-events-none absolute inset-0">
          {eyebrow && (
            <div className={\`absolute inset-x-0 top-[12vh] flex justify-center \${fade}\`}>
              <span className="inline-flex h-[30px] items-center gap-2 rounded-full border border-border bg-muted/60 px-3 text-[13px] font-medium tracking-[-0.01em] text-muted-foreground backdrop-blur-md">
                <i className="size-1.5 rounded-full" style={{ background: accent, boxShadow: \`0 0 10px \${accent}\` }} />
                {eyebrow}
              </span>
            </div>
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-[max(17vh,110px)] text-center">
            {description && (
              <p className={\`m-0 max-w-[600px] text-[17px] leading-[25px] tracking-[-0.02em] text-muted-foreground \${fade} delay-100\`}>
                {description}
              </p>
            )}
            {actions && <div className={\`pointer-events-auto mt-[22px] flex flex-wrap justify-center gap-2.5 \${fade} delay-200\`}>{actions}</div>}
          </div>
        </div>

        {scrollScatter && scrollHint && (
          <div
            ref={hintRef}
            aria-hidden="true"
            data-up="false"
            className="group/hint pointer-events-none absolute bottom-[22px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[12px] font-medium tracking-[0.02em] text-muted-foreground opacity-0 transition-opacity duration-700"
          >
            <div className="relative h-[34px] w-[22px] rounded-[11px] border-[1.5px] border-[color-mix(in_oklab,var(--color-foreground)_28%,transparent)] transition-transform duration-500 group-data-[up=true]/hint:rotate-180">
              <span
                className="absolute left-1/2 top-[7px] -ml-[1.5px] h-[7px] w-[3px] rounded-sm motion-safe:animate-[dotfield-wheel_1.8s_cubic-bezier(.6,0,.3,1)_infinite]"
                style={{ background: accent, boxShadow: \`0 0 8px \${accent}\` }}
              />
            </div>
            <span ref={hintLabelRef}>{scrollHint.scatter}</span>
          </div>
        )}
        <style>{\`@keyframes dotfield-wheel{0%{transform:translateY(0);opacity:0}20%{opacity:1}70%{transform:translateY(10px);opacity:0}100%{opacity:0}}\`}</style>
      </div>
    </section>
  );
});

export default DotField;
`],["demo.tsx",`"use client";

import * as React from "react";
import { DotField, type DotFieldHandle } from "@/components/ui/component";

/* Geist for the headline, loaded once for the demo */
function useGeist() {
  React.useEffect(() => {
    const id = "geist-font";
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id;
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap";
    document.head.appendChild(l);
  }, []);
}

const pill =
  "inline-flex h-11 items-center rounded-full px-5 text-[15px] font-medium tracking-[-0.02em] outline-none transition-transform active:scale-[.97] focus-visible:ring-2 focus-visible:ring-ring";

export default function DotFieldDemo() {
  useGeist();
  const field = React.useRef<DotFieldHandle>(null);
  const [scattered, setScattered] = React.useState(false);

  return (
    <div className="w-full bg-background text-foreground">
      <DotField
        ref={field}
        headline="Design that moves."
        eyebrow="Product design studio"
        description="Interfaces with Apple-level detail, from the first sketch to shipped code."
        actions={
          <>
            <a href="#work" className={\`\${pill} bg-foreground text-background\`}>
              View work
            </a>
            <a href="#contact" className={\`\${pill} border border-border bg-muted/60 text-foreground backdrop-blur-md\`}>
              Book a call
            </a>
          </>
        }
      />

      <section id="work" className="grid min-h-[60vh] place-items-center px-5 text-center text-[15px] tracking-[-0.02em] text-muted-foreground">
        Scroll back up and the field gathers again.
      </section>

      {/* playground controls */}
      <div className="fixed bottom-4 right-4 z-10 flex gap-2" style={{ fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif" }}>
        {[
          {
            label: scattered ? "Gather" : "Scatter",
            onClick: () => {
              field.current?.setScattered(!scattered);
              setScattered(!scattered);
            },
          },
          {
            label: "Replay",
            onClick: () => {
              setScattered(false);
              field.current?.replay();
            },
          },
        ].map((b) => (
          <button
            key={b.label === "Replay" ? "replay" : "scatter"}
            type="button"
            onClick={b.onClick}
            className="h-8 rounded-full bg-muted px-3.5 text-[13px] font-medium tracking-[-0.01em] text-foreground outline-none backdrop-blur-md focus-visible:ring-2 focus-visible:ring-ring"
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
`]],mount(i,r){let c=(0,qn.createRoot)(i);return c.render(mn.createElement(J,r)),{update:b=>c.render(mn.createElement(J,b)),unmount:()=>c.unmount()}}};})();
