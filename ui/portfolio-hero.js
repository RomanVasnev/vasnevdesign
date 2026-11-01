(()=>{var kn=Object.create;var dn=Object.defineProperty;var En=Object.getOwnPropertyDescriptor;var Rn=Object.getOwnPropertyNames;var Nn=Object.getPrototypeOf,Sn=Object.prototype.hasOwnProperty;var J=(o,a)=>()=>{try{return a||o((a={exports:{}}).exports,a),a.exports}catch(r){throw a=0,r}};var Mn=(o,a,r,f)=>{if(a&&typeof a=="object"||typeof a=="function")for(let u of Rn(a))!Sn.call(o,u)&&u!==r&&dn(o,u,{get:()=>a[u],enumerable:!(f=En(a,u))||f.enumerable});return o};var I=(o,a,r)=>(r=o!=null?kn(Nn(o)):{},Mn(a||!o||!o.__esModule?dn(r,"default",{value:o,enumerable:!0}):r,o));var Q=J((Wn,pn)=>{pn.exports=window.__R.react});var gn=J((_n,fn)=>{fn.exports=window.__R["react-dom/client"]});var bn=J((Gn,un)=>{un.exports=window.Matter});var K=J((jn,hn)=>{hn.exports=window.__R["react/jsx-runtime"]});var an=I(Q()),yn=I(gn());var on=I(Q());var i=I(Q()),xn=I(bn()),n=I(K()),Tn=768,Ln={dark:{card:"bg-[#101010]",title:"text-white",desc:"text-[#767676] @3xl:text-[#cdcdcd]",tag:"bg-[#242424] text-[#818181]",badge:"bg-[#141414] border-[#282828] text-white",dot:"bg-[#333] @3xl:bg-[#3a3a3a]",dotActive:"@3xl:bg-white",fill:"bg-white",done:"bg-[#666]",btn:"border-[#2a2a2a] bg-[#121212] text-white hover:bg-[#1e1e1e]",cta:"text-white",arrowDot:"bg-white text-black"},light:{card:"bg-[#f3f3f3]",title:"text-[#111]",desc:"text-[#6b6b6b] @3xl:text-[#3d3d3d]",tag:"bg-[#e6e6e6] text-[#5f5f5f]",badge:"bg-white border-[#e2e2e2] text-[#111]",dot:"bg-[#d4d4d4] @3xl:bg-[#cfcfcf]",dotActive:"@3xl:bg-[#111]",fill:"bg-[#111]",done:"bg-[#9a9a9a]",btn:"border-[#dedede] bg-white text-[#111] hover:bg-[#f2f2f2]",cta:"text-[#111]",arrowDot:"bg-[#111] text-white"}};function Cn(){let[o,a]=i.useState(!1);return i.useEffect(()=>{let r=window.matchMedia("(prefers-reduced-motion: reduce)"),f=()=>a(r.matches);return f(),r.addEventListener("change",f),()=>r.removeEventListener("change",f)},[]),o}var mn=({dir:o})=>(0,n.jsx)("svg",{width:"16",height:"12",viewBox:"0 0 48 14",fill:"none","aria-hidden":"true",children:(0,n.jsx)("path",{d:o==="prev"?"M47 7H1M7 1 1 7l6 6":"M1 7h46M41 1l6 6-6 6",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"})});function wn({className:o="",theme:a="dark"}){return(0,n.jsx)("div",{className:`absolute inset-0 grid place-items-center ${a==="dark"?"bg-[#1e1e1e] text-[#4d4d4d]":"bg-[#e3e3e3] text-[#b0b0b0]"} ${o}`,"aria-hidden":"true",children:(0,n.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"4"}),(0,n.jsx)("circle",{cx:"9",cy:"9",r:"1.8"}),(0,n.jsx)("path",{d:"m21 15-4.6-4.6a1.5 1.5 0 0 0-2.1 0L5 19.5"})]})})}function Bn({items:o=[],autoplay:a=6e3,theme:r="dark",label:f="Showcase",ctaLabel:u="Read case",className:N="",onIndexChange:S}){let g=Ln[r],F=i.useRef(null),v=i.useRef(null),h=i.useRef([]),m=Cn(),[d,y]=i.useState(0),[p,C]=i.useState(!0),[A,k]=i.useState(!1),[P,z]=i.useState(!1),[M,E]=i.useState({start:!0,end:!1});i.useEffect(()=>{let e=F.current;if(!e)return;let l=new ResizeObserver(([s])=>C(s.contentRect.width<Tn));return l.observe(e),()=>l.disconnect()},[]),i.useEffect(()=>{let e=v.current;if(!e)return;let l=new IntersectionObserver(([s])=>k(s.isIntersecting),{threshold:.4});return l.observe(e),()=>l.disconnect()},[]);let G=()=>Array.from(v.current?.children??[]),x=i.useCallback(()=>{let e=v.current,l=G();if(!e||!l.length)return;let s=l[0].offsetLeft,b=e.scrollLeft,R=0,D=1/0;l.forEach((H,Y)=>{let V=Math.abs(H.offsetLeft-s-b);V<D&&(D=V,R=Y)});let j=e.scrollWidth-e.clientWidth;E({start:b<4,end:b>j-4}),y(H=>H===R?H:R)},[]);i.useEffect(()=>{S?.(d)},[d,S]),i.useEffect(()=>(x(),window.addEventListener("resize",x),()=>window.removeEventListener("resize",x)),[x,o.length,p]);let T=i.useCallback(e=>{let l=v.current,s=G();if(!l||!s.length)return;let b=Math.max(0,Math.min(s.length-1,e));l.scrollTo({left:s[b].offsetLeft-s[0].offsetLeft,behavior:m?"auto":"smooth"})},[m]),L=()=>z(!0),B=p&&A&&!P&&!m&&a>0&&o.length>1;i.useEffect(()=>{if(h.current.forEach(b=>b?.getAnimations().forEach(R=>R.cancel())),!B)return;let l=h.current[d]?.animate([{transform:"scaleX(0)"},{transform:"scaleX(1)"}],{duration:a,easing:"linear",fill:"forwards"}),s=window.setTimeout(()=>{let b=v.current,R=b?b.scrollLeft>b.scrollWidth-b.clientWidth-4:!1;T(R?0:(d+1)%o.length)},a);return()=>{window.clearTimeout(s),l?.cancel()}},[B,d,a,o.length,T]);let W=e=>{e.key==="ArrowRight"?(e.preventDefault(),L(),T(d+1)):e.key==="ArrowLeft"&&(e.preventDefault(),L(),T(d-1))};return(0,n.jsxs)("div",{ref:F,className:`@container w-full ${N}`,children:[(0,n.jsx)("div",{ref:v,role:"region","aria-roledescription":"carousel","aria-label":f,tabIndex:0,onKeyDown:W,onScroll:x,onPointerDown:L,onWheel:e=>Math.abs(e.deltaX)>Math.abs(e.deltaY)&&L(),className:"flex flex-row items-stretch gap-4 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory px-4 scroll-px-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden focus-visible:outline-none @3xl:gap-6 @3xl:px-0 @3xl:scroll-px-0",children:o.map((e,l)=>{let s=l===d,b=e.href?"a":"div",R=e.href?{href:e.href}:{};return(0,n.jsxs)(b,{...R,role:"group","aria-roledescription":"slide","aria-label":`${l+1} of ${o.length}: ${e.title}`,className:["group flex flex-none snap-start flex-col gap-5 overflow-hidden rounded-[20px] no-underline transition-opacity duration-[450ms]","h-[510px] w-[min(340px,calc(100cqw-48px))]",g.card,p&&!s?"opacity-50":"opacity-100","@3xl:h-auto @3xl:w-[calc((100%-24px)/2.15)] @3xl:gap-0 @3xl:overflow-visible @3xl:rounded-none @3xl:bg-transparent @6xl:w-[calc((100%-48px)/2.6)]",e.href?"cursor-pointer":"cursor-default"].join(" "),children:[(0,n.jsxs)("div",{className:`relative h-[230px] flex-none overflow-hidden rounded-[20px] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] @3xl:h-auto @3xl:aspect-[16/10] ${e.href?"group-active:scale-[.98]":""}`,style:{background:e.background??(e.cover||e.image||e.video?"#1a1a1a":r==="dark"?"#1e1e1e":"#e3e3e3")},children:[e.cover?e.cover:e.video?(0,n.jsx)("video",{src:e.video,poster:e.image,muted:!0,loop:!0,playsInline:!0,autoPlay:!0,preload:"metadata","aria-label":e.alt??e.title,className:"absolute inset-0 h-full w-full object-cover"}):e.image?(0,n.jsx)("img",{src:e.image,alt:e.alt??e.title,loading:"lazy",decoding:"async",draggable:!1,className:"absolute inset-0 h-full w-full object-cover"}):(0,n.jsx)(wn,{theme:r}),e.badge&&(0,n.jsx)("span",{className:`absolute left-2.5 top-3 z-10 flex h-[22px] items-center rounded-md border px-1.5 text-xs leading-5 tracking-[-0.05em] ${g.badge}`,children:e.badge})]}),(0,n.jsxs)("div",{className:"flex min-h-0 flex-1 flex-col gap-4 px-[15px] pb-[15px] @3xl:mt-5 @3xl:px-0 @3xl:pb-0",children:[(0,n.jsx)("h3",{className:`m-0 text-[22px] font-medium leading-[29px] tracking-[-0.05em] text-balance transition-colors duration-[450ms] @3xl:text-[26px] ${g.title}`,children:e.title}),e.tags&&e.tags.length>0&&(0,n.jsx)("div",{className:"flex flex-wrap gap-1.5",children:e.tags.map(D=>(0,n.jsx)("span",{className:`h-6 rounded-full px-2.5 py-0.5 text-sm leading-5 ${g.tag}`,children:D},D))}),e.description&&(0,n.jsx)("p",{className:`m-0 line-clamp-3 text-base leading-6 @3xl:line-clamp-none ${g.desc}`,children:e.description}),e.href&&(0,n.jsxs)("span",{className:`-mt-1 hidden items-center gap-1.5 text-base font-medium @3xl:inline-flex ${g.cta}`,children:[e.cta??u,(0,n.jsx)("span",{className:`grid h-[18px] w-[18px] place-items-center rounded-full ${g.arrowDot}`,children:(0,n.jsx)("svg",{width:"10",height:"8",viewBox:"0 0 10 8",fill:"none","aria-hidden":"true",children:(0,n.jsx)("path",{d:"M1 4h8M6 1l3 3-3 3",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})})})]})]})]},e.id??l)})}),o.length>1&&(0,n.jsxs)("div",{className:"mt-5 flex items-center gap-3.5 @3xl:mt-7",children:[(0,n.jsx)("button",{type:"button","aria-label":"Previous",disabled:M.start,onClick:()=>{L(),T(d-1)},className:`hidden h-11 w-11 place-items-center rounded-full border transition disabled:cursor-default disabled:opacity-30 @3xl:grid ${g.btn}`,children:(0,n.jsx)(mn,{dir:"prev"})}),(0,n.jsx)("div",{role:"tablist","aria-label":f,className:"flex flex-1 justify-center gap-1.5",children:o.map((e,l)=>{let s=l===d;return(0,n.jsx)("button",{type:"button",role:"tab","aria-selected":s,"aria-label":`${l+1}: ${e.title}`,onClick:()=>{L(),T(l)},className:`relative h-1.5 cursor-pointer overflow-hidden rounded-[3px] transition-[width,background-color] duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] before:absolute before:-inset-x-1 before:-inset-y-2.5 before:content-[''] ${s?`w-[22px] ${g.dotActive}`:"w-1.5"} ${g.dot}`,children:p&&(0,n.jsx)("span",{ref:b=>{h.current[l]=b},"aria-hidden":"true",className:`absolute inset-0 origin-left ${l<d?g.done:g.fill}`,style:{transform:l<d||s&&!B?"scaleX(1)":"scaleX(0)"}})},e.id??l)})}),(0,n.jsx)("button",{type:"button","aria-label":"Next",disabled:M.end,onClick:()=>{L(),T(d+1)},className:`hidden h-11 w-11 place-items-center rounded-full border transition disabled:cursor-default disabled:opacity-30 @3xl:grid ${g.btn}`,children:(0,n.jsx)(mn,{dir:"next"})})]})]})}var nn=[{label:"PIXEL PERFECT"},{label:"UX/UI DESIGN"},{label:"BRANDING"},{label:"UI DESIGN"},{label:"TOUCHPOINT"},{label:"IMPROVEMENTS"},{label:"PAIN POINT",bg:"#ea582f",border:"#ea582f",color:"#fff"},{label:"CTA"},{label:"WEB 3.0",bg:"#d5ff00",border:"#566700",color:"#374200"},{label:"AI",bg:"#043ae5",border:"#043ae5",color:"#fff"},{label:"MARKETING"},{label:"USER FLOW"},{label:"USABILITY"},{label:"CREATIVE",bg:"#ff531f",border:"#ff531f",color:"#fff"},{label:"CJM",bg:"#6204e5",border:"#6204e5",color:"#fff"},{label:"DESIGN SYSTEM",bg:"#63d990",border:"#136231",color:"#073318"},{label:"COMPONENTS",bg:"#cd50ff",border:"#cd50ff",color:"#fff"},{label:"ATOMIC DESIGN"},{label:"TRENDS"},{label:"YOUR NAME",bg:"#d27ef9",border:"#d27ef9",color:"#fff"},{label:"SENIOR",bg:"#3c2cff",border:"#3c2cff",color:"#fff"},{label:"PRODUCT DESIGNER",bg:"#cd50ff",border:"#cd50ff",color:"#fff"}],An=[{title:"How I designed [product] from scratch in [N] months",description:"One or two lines about the product: who it is for and what changed after the launch.",tags:["Fintech","SaaS","B2B","B2C"],href:"#"},{title:"Onboarding that helped [audience] make their first [action]",description:"What the problem was, what you did, and the metric that moved \u2014 for example +40% to activation.",tags:["Fintech","Mobile","B2C"],badge:"NDA"},{title:"A [mechanic] that kept [result] after the release",description:"Short story of a key decision: the constraint, the idea and how it played out with real users.",tags:["Marketplace","B2C"],href:"#"},{title:"Designed a [type of product] for [audience]",description:"Number of screens, platforms and your role \u2014 research, UX, UI, design system, handoff.",tags:["SaaS","B2B"],href:"#"}],In={name:"Your Name",role:"Product Designer \xB7 UX/UI Designer",bio:"**N+ years designing digital products \u2014 **fintech and payments, marketplaces, B2B systems and e-commerce,** from the first idea to the release.**",links:[{label:"Telegram",href:"#"},{label:"LinkedIn",href:"#"},{label:"E-mail",href:"#"}],badges:nn,cases:An},Pn={dark:{bg:"#060606",ink:"#ffffff",muted:"#767676",plainBorder:"#414141",plainColor:"#ffffff",glow:"rgba(60,44,255,.45)",avatarBorder:"#0f0f0f",hint:"bg-[#161616]/90 border-[#2a2a2a] text-[#cfcfcf]"},light:{bg:"#f7f7f5",ink:"#111111",muted:"#8a8a8a",plainBorder:"#cfcfcf",plainColor:"#111111",glow:"rgba(60,44,255,.16)",avatarBorder:"#e6e6e6",hint:"bg-white/90 border-[#e2e2e2] text-[#3d3d3d]"}},U={gravity:2.1,restitution:.04,friction:.9,frictionStatic:1.4,frictionAir:.012,density:.006,stagger:55},Z=1e3/120,_=(o,a)=>o+Math.random()*(a-o);function Dn({badges:o,plain:a,onSettled:r,onGrab:f}){let u=i.useRef(null),N=i.useRef([]),S=i.useRef({onSettled:r,onGrab:f});S.current={onSettled:r,onGrab:f};let[g,F]=i.useState({w:0,h:0}),v=i.useMemo(()=>[...o].sort(()=>Math.random()-.5),[o]);return i.useEffect(()=>{let h=u.current;if(!h)return;let m=new ResizeObserver(([d])=>{let y=Math.round(d.contentRect.width),p=Math.round(d.contentRect.height);F(C=>Math.abs(C.w-y)>8||C.h!==p?{w:y,h:p}:C)});return m.observe(h),()=>m.disconnect()},[]),i.useEffect(()=>{let h=u.current;if(!h||!g.w)return;let{Engine:m,Bodies:d,Body:y,Composite:p,Constraint:C,Sleeping:A}=xn.default,k=window.matchMedia("(prefers-reduced-motion: reduce)").matches,P=g.w,z=g.h,M=200,E=m.create({enableSleeping:!0,positionIterations:24,velocityIterations:16,constraintIterations:4});E.gravity.y=U.gravity,p.add(E.world,[d.rectangle(P/2,z-3+M/2,P*3,M,{isStatic:!0,friction:1,slop:.01}),d.rectangle(-M/2,z/2-600,M,z+1600,{isStatic:!0}),d.rectangle(P+M/2,z/2-600,M,z+1600,{isStatic:!0}),d.rectangle(P/2,-1400-M/2,P*3,M,{isStatic:!0})]);let G=N.current.slice(0,v.length).filter(Boolean);G.forEach(t=>t.style.visibility="hidden");let x=G.map(t=>{let c=t.offsetWidth,X=t.offsetHeight,$=d.rectangle(_(c/2+4,Math.max(c/2+5,P-c/2-4)),0,c,X,{chamfer:{radius:12},restitution:U.restitution,friction:U.friction,frictionStatic:U.frictionStatic,frictionAir:U.frictionAir,density:U.density,sleepThreshold:40,slop:.01});return $.el=t,$.w=c,$.h=X,$}),T=0,L=!1,B=0,W=0,e=0,l=!1,s=null,b=[],R=()=>{for(let t of x)t.el.style.transform=`translate(${(t.position.x-t.w/2).toFixed(1)}px,${(t.position.y-t.h/2).toFixed(1)}px) rotate(${t.angle.toFixed(4)}rad)`},D=t=>{for(B||(B=t),W+=Math.min(50,t-B),B=t;W>=Z;)m.update(E,Z),W-=Z;if(R(),e===x.length&&!s&&x.every(c=>c.isSleeping)){L=!1,B=0,W=0,l||(l=!0,S.current.onSettled?.());return}T=requestAnimationFrame(D)},j=()=>{L||(L=!0,B=0,T=requestAnimationFrame(D))},H=(t,c)=>{y.setPosition(t,{x:t.position.x,y:c}),y.setAngle(t,_(-.7,.7)),p.add(E.world,t),y.setVelocity(t,{x:_(-1.2,1.2),y:_(3,6)}),y.setAngularVelocity(t,_(-.04,.04))},Y=t=>{let c=h.getBoundingClientRect();return{x:t.clientX-c.left,y:t.clientY-c.top}},V=[];if(x.forEach(t=>{let c=t.el,X=O=>{if(!E.world.bodies.includes(t))return;O.preventDefault(),S.current.onGrab?.(),c.setPointerCapture(O.pointerId),c.style.cursor="grabbing";let tn=Y(O),rn=tn.x-t.position.x,ln=tn.y-t.position.y,sn=Math.cos(-t.angle),cn=Math.sin(-t.angle);s=C.create({pointA:tn,bodyB:t,pointB:{x:rn*sn-ln*cn,y:rn*cn+ln*sn},stiffness:.12,damping:.08,length:0}),p.add(E.world,s),A.set(t,!1),j()},$=O=>{!s||s.bodyB!==t||(s.pointA=Y(O),A.set(t,!1))},q=()=>{s&&s.bodyB===t&&(p.remove(E.world,s),s=null,c.style.cursor="grab",x.forEach(O=>A.set(O,!1)),j())};c.addEventListener("pointerdown",X),c.addEventListener("pointermove",$),c.addEventListener("pointerup",q),c.addEventListener("pointercancel",q),V.push(()=>{c.removeEventListener("pointerdown",X),c.removeEventListener("pointermove",$),c.removeEventListener("pointerup",q),c.removeEventListener("pointercancel",q)})}),k){x.forEach((t,c)=>H(t,-60-c*45));for(let t=0;t<1800;t++)m.update(E,Z);R(),x.forEach(t=>t.el.style.visibility="visible"),e=x.length,l=!0,S.current.onSettled?.()}else x.forEach((t,c)=>b.push(window.setTimeout(()=>{H(t,-50-_(0,120)),t.el.style.visibility="visible",e++,j()},300+c*U.stagger)));return()=>{cancelAnimationFrame(T),b.forEach(clearTimeout),V.forEach(t=>t()),p.clear(E.world,!1),m.clear(E)}},[g,v]),(0,n.jsx)("div",{ref:u,className:"absolute inset-x-0 top-0 h-[424px] overflow-hidden @6xl:h-[456px]","aria-label":"Keywords",children:v.map((h,m)=>(0,n.jsx)("div",{ref:d=>{N.current[m]=d},className:"absolute left-0 top-0 flex h-[34px] cursor-grab touch-none select-none items-center whitespace-nowrap rounded-xl border px-3.5 text-base tracking-[-0.05em] will-change-transform",style:{visibility:"hidden",background:h.bg??"transparent",borderColor:h.border??a.border,color:h.color??a.color},children:h.label},h.label+m))})}var zn=({color:o})=>(0,n.jsx)("svg",{className:"h-[15px] w-[15px] flex-none",viewBox:"0 0 15 15","aria-hidden":"true",children:(0,n.jsx)("path",{d:"M4 11 11 4M5 4h6v6",stroke:o,strokeWidth:"1.4",fill:"none"})}),Hn=()=>(0,n.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,n.jsx)("path",{d:"M18 11V6a2 2 0 0 0-4 0v1M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8"}),(0,n.jsx)("path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"})]});function $n({text:o,ink:a}){return(0,n.jsx)(n.Fragment,{children:o.split("**").map((r,f)=>f%2?(0,n.jsx)("b",{className:"font-medium",style:{color:a},children:r},f):(0,n.jsx)(i.Fragment,{children:r},f))})}function On(o){let[a,r]=i.useState("dark");return i.useEffect(()=>{if(o!=="auto")return;let f=document.documentElement,u=()=>r(f.classList.contains("dark")?"dark":"light");u();let N=new MutationObserver(u);return N.observe(f,{attributes:!0,attributeFilter:["class"]}),()=>N.disconnect()},[o]),o==="auto"?a:o}function vn(o){let{name:a,role:r,bio:f,links:u,badges:N,cases:S}={...In,...o},{avatar:g,theme:F="auto",dropKey:v=0,dragHint:h=!0,autoplay:m=6e3,className:d=""}=o,y=On(F),p=Pn[y],[C,A]=i.useState("hidden");return i.useEffect(()=>{A(k=>k==="done"?k:"hidden")},[v]),(0,n.jsx)("div",{className:`@container relative w-full overflow-x-clip antialiased transition-colors duration-300 ${d}`,style:{background:p.bg,color:p.ink,fontFamily:"'Geist', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",letterSpacing:"-0.05em"},children:(0,n.jsxs)("main",{className:"relative mx-auto max-w-[450px] @3xl:max-w-[820px] @6xl:max-w-[1280px]",children:[(0,n.jsxs)("section",{className:"relative pt-[440px] @6xl:pt-[480px]",children:[(0,n.jsx)("div",{className:"pointer-events-none absolute -left-[120px] -top-[160px] h-[360px] w-[420px] rounded-full @6xl:-left-20 @6xl:-top-[200px] @6xl:h-[620px] @6xl:w-[900px]",style:{background:`radial-gradient(closest-side, ${p.glow}, transparent)`}}),(0,n.jsx)(Dn,{badges:N,plain:{border:p.plainBorder,color:p.plainColor},onSettled:()=>h&&A(k=>k==="done"?k:"shown"),onGrab:()=>A("done")},v),h&&(0,n.jsx)("div",{className:"pointer-events-none absolute inset-x-0 top-16 z-10 flex justify-center px-2.5 @3xl:top-[220px] @6xl:top-[260px]",children:(0,n.jsxs)("div",{"aria-live":"polite",className:`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm backdrop-blur-md transition-all duration-500 ${p.hint} ${C==="shown"?"translate-y-0 opacity-100":"-translate-y-2 opacity-0"}`,children:[(0,n.jsx)("span",{className:C==="shown"?"animate-bounce":"",children:(0,n.jsx)(Hn,{})}),"Grab a badge and throw it"]})}),(0,n.jsxs)("div",{className:"relative px-2.5 @3xl:px-8 @6xl:grid @6xl:grid-cols-[380px_1fr] @6xl:items-start @6xl:gap-x-20 @6xl:px-12",children:[(0,n.jsxs)("div",{className:"flex items-center gap-6 @6xl:col-start-1 @6xl:row-start-1",children:[(0,n.jsx)("div",{className:"relative h-20 w-[60px] flex-none overflow-hidden rounded-[20px] border",style:{borderColor:p.avatarBorder},children:g?(0,n.jsx)("img",{src:g,alt:a,className:"h-full w-full object-cover"}):(0,n.jsx)(wn,{theme:y,className:"[&_svg]:h-6 [&_svg]:w-6"})}),(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{className:"m-0 text-[32px] font-normal leading-[42px]",children:a}),(0,n.jsx)("p",{className:"m-0 text-lg",style:{color:p.muted},children:r})]})]}),(0,n.jsx)("p",{className:"mt-[30px] text-[26px] font-medium leading-[28px] @6xl:col-start-2 @6xl:row-span-2 @6xl:row-start-1 @6xl:m-0 @6xl:max-w-[820px] @6xl:text-[40px] @6xl:leading-[44px]",style:{color:p.muted},children:(0,n.jsx)($n,{text:f,ink:p.ink})}),(0,n.jsx)("div",{className:"mt-8 flex flex-wrap gap-4 @6xl:col-start-1 @6xl:row-start-2 @6xl:mt-7",children:u.map(k=>(0,n.jsxs)("a",{href:k.href,target:"_blank",rel:"noopener",className:"flex items-center gap-1.5 text-lg leading-5",style:{color:p.ink},children:[k.label," ",(0,n.jsx)(zn,{color:p.muted})]},k.label))})]})]}),(0,n.jsx)("section",{className:"mt-20 pb-24 @3xl:px-8 @6xl:mt-[120px] @6xl:px-12",children:(0,n.jsx)(Bn,{items:S,theme:y,label:"Cases",autoplay:m})})]})})}var w=I(K()),Un={mobileView:!0,darkMode:!0,dragHint:!0,badgeCount:22,autoplaySeconds:6};function en(o){let a={...Un,...o},r=a.darkMode,f=r?"dark":"light",u=Math.max(1,Math.min(nn.length,Math.round(a.badgeCount))),N=on.useMemo(()=>nn.slice(0,u),[u]),S=on.useMemo(()=>Math.random(),[a.mobileView,r,a.dragHint,u,a.autoplaySeconds]),g=(0,w.jsx)(vn,{theme:f,dropKey:S,dragHint:a.dragHint,badges:N,autoplay:Math.max(0,a.autoplaySeconds)*1e3});return(0,w.jsx)("div",{className:"flex min-h-screen w-full flex-col items-center justify-center py-8",style:{backgroundColor:r?"#121212":"#ececea",backgroundImage:`radial-gradient(circle, ${r?"rgba(255,255,255,.035)":"rgba(0,0,0,.06)"} 0 1px, transparent 1.4px)`,backgroundSize:"20px 13px",backgroundPosition:"-6px -1px"},children:a.mobileView?(0,w.jsx)("div",{className:`relative w-[390px] max-w-[calc(100%-16px)] rounded-[47px] border-[5px] shadow-2xl ${r?"border-[#1c1c1c] bg-[#060606]":"border-[#d4d4d2] bg-[#f7f7f5]"}`,children:(0,w.jsx)("div",{className:"h-[820px] overflow-y-auto overflow-x-hidden rounded-[42px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",children:g})}):(0,w.jsxs)("div",{className:`w-[min(1200px,calc(100%-32px))] overflow-hidden rounded-2xl border shadow-2xl ${r?"border-[#242424] bg-[#060606]":"border-[#d4d4d2] bg-[#f7f7f5]"}`,children:[(0,w.jsxs)("div",{className:`flex h-10 items-center gap-2 border-b px-4 ${r?"border-[#1c1c1c] bg-[#141414]":"border-[#e2e2e0] bg-[#ebebe9]"}`,children:[(0,w.jsx)("i",{className:"h-3 w-3 rounded-full bg-[#ff5f57]"}),(0,w.jsx)("i",{className:"h-3 w-3 rounded-full bg-[#febc2e]"}),(0,w.jsx)("i",{className:"h-3 w-3 rounded-full bg-[#28c840]"}),(0,w.jsx)("span",{className:`mx-auto flex h-6 w-[min(320px,50%)] items-center justify-center rounded-md text-xs ${r?"bg-[#0c0c0c] text-[#767676]":"bg-white text-[#8a8a8a]"}`,children:"yourname.design"}),(0,w.jsx)("span",{className:"w-[52px]"})]}),(0,w.jsx)("div",{className:"h-[760px] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",children:g})]})})}(window.__UI=window.__UI||{})["portfolio-hero"]={css:`/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-black: #000;
    --color-white: #fff;
    --spacing: 0.25rem;
    --text-xs: 0.75rem;
    --text-xs--line-height: calc(1 / 0.75);
    --text-sm: 0.875rem;
    --text-sm--line-height: calc(1.25 / 0.875);
    --text-base: 1rem;
    --text-base--line-height: calc(1.5 / 1);
    --text-lg: 1.125rem;
    --text-lg--line-height: calc(1.75 / 1.125);
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --radius-2xl: 1rem;
    --animate-bounce: bounce 1s infinite;
    --blur-md: 12px;
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
  .\\@container {
    container-type: inline-size;
  }
  .pointer-events-none {
    pointer-events: none;
  }
  .visible {
    visibility: visible;
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
  .-top-\\[160px\\] {
    top: calc(160px * -1);
  }
  .top-0 {
    top: 0px;
  }
  .top-3 {
    top: calc(var(--spacing) * 3);
  }
  .top-16 {
    top: calc(var(--spacing) * 16);
  }
  .-left-\\[120px\\] {
    left: calc(120px * -1);
  }
  .left-0 {
    left: 0px;
  }
  .left-2\\.5 {
    left: calc(var(--spacing) * 2.5);
  }
  .z-10 {
    z-index: 10;
  }
  .container {
    width: 100%;
    @media (width >= 40rem) {
      max-width: 40rem;
    }
    @media (width >= 48rem) {
      max-width: 48rem;
    }
    @media (width >= 64rem) {
      max-width: 64rem;
    }
    @media (width >= 80rem) {
      max-width: 80rem;
    }
    @media (width >= 96rem) {
      max-width: 96rem;
    }
  }
  .m-0 {
    margin: 0px;
  }
  .mx-auto {
    margin-inline: auto;
  }
  .-mt-1 {
    margin-top: calc(var(--spacing) * -1);
  }
  .mt-5 {
    margin-top: calc(var(--spacing) * 5);
  }
  .mt-8 {
    margin-top: calc(var(--spacing) * 8);
  }
  .mt-20 {
    margin-top: calc(var(--spacing) * 20);
  }
  .mt-\\[30px\\] {
    margin-top: 30px;
  }
  .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
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
  .hidden {
    display: none;
  }
  .h-1\\.5 {
    height: calc(var(--spacing) * 1.5);
  }
  .h-3 {
    height: calc(var(--spacing) * 3);
  }
  .h-6 {
    height: calc(var(--spacing) * 6);
  }
  .h-10 {
    height: calc(var(--spacing) * 10);
  }
  .h-11 {
    height: calc(var(--spacing) * 11);
  }
  .h-20 {
    height: calc(var(--spacing) * 20);
  }
  .h-\\[15px\\] {
    height: 15px;
  }
  .h-\\[18px\\] {
    height: 18px;
  }
  .h-\\[22px\\] {
    height: 22px;
  }
  .h-\\[34px\\] {
    height: 34px;
  }
  .h-\\[230px\\] {
    height: 230px;
  }
  .h-\\[360px\\] {
    height: 360px;
  }
  .h-\\[424px\\] {
    height: 424px;
  }
  .h-\\[510px\\] {
    height: 510px;
  }
  .h-\\[760px\\] {
    height: 760px;
  }
  .h-\\[820px\\] {
    height: 820px;
  }
  .h-full {
    height: 100%;
  }
  .min-h-0 {
    min-height: 0px;
  }
  .min-h-screen {
    min-height: 100vh;
  }
  .w-1\\.5 {
    width: calc(var(--spacing) * 1.5);
  }
  .w-3 {
    width: calc(var(--spacing) * 3);
  }
  .w-11 {
    width: calc(var(--spacing) * 11);
  }
  .w-\\[15px\\] {
    width: 15px;
  }
  .w-\\[18px\\] {
    width: 18px;
  }
  .w-\\[22px\\] {
    width: 22px;
  }
  .w-\\[52px\\] {
    width: 52px;
  }
  .w-\\[60px\\] {
    width: 60px;
  }
  .w-\\[390px\\] {
    width: 390px;
  }
  .w-\\[420px\\] {
    width: 420px;
  }
  .w-full {
    width: 100%;
  }
  .max-w-\\[450px\\] {
    max-width: 450px;
  }
  .flex-1 {
    flex: 1;
  }
  .flex-none {
    flex: none;
  }
  .origin-left {
    transform-origin: 0;
  }
  .-translate-y-2 {
    --tw-translate-y: calc(var(--spacing) * -2);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-y-0 {
    --tw-translate-y: 0px;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .animate-bounce {
    animation: var(--animate-bounce);
  }
  .cursor-default {
    cursor: default;
  }
  .cursor-grab {
    cursor: grab;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .touch-none {
    touch-action: none;
  }
  .resize {
    resize: both;
  }
  .snap-x {
    scroll-snap-type: x var(--tw-scroll-snap-strictness);
  }
  .snap-mandatory {
    --tw-scroll-snap-strictness: mandatory;
  }
  .snap-start {
    scroll-snap-align: start;
  }
  .scroll-px-4 {
    scroll-padding-inline: calc(var(--spacing) * 4);
  }
  .\\[scrollbar-width\\:none\\] {
    scrollbar-width: none;
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-row {
    flex-direction: row;
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
  .items-stretch {
    align-items: stretch;
  }
  .justify-center {
    justify-content: center;
  }
  .gap-1\\.5 {
    gap: calc(var(--spacing) * 1.5);
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-3\\.5 {
    gap: calc(var(--spacing) * 3.5);
  }
  .gap-4 {
    gap: calc(var(--spacing) * 4);
  }
  .gap-5 {
    gap: calc(var(--spacing) * 5);
  }
  .gap-6 {
    gap: calc(var(--spacing) * 6);
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-x-auto {
    overflow-x: auto;
  }
  .overflow-x-clip {
    overflow-x: clip;
  }
  .overflow-x-hidden {
    overflow-x: hidden;
  }
  .overflow-y-auto {
    overflow-y: auto;
  }
  .overscroll-x-contain {
    overscroll-behavior-x: contain;
  }
  .scroll-smooth {
    scroll-behavior: smooth;
  }
  .rounded-2xl {
    border-radius: var(--radius-2xl);
  }
  .rounded-\\[3px\\] {
    border-radius: 3px;
  }
  .rounded-\\[20px\\] {
    border-radius: 20px;
  }
  .rounded-\\[42px\\] {
    border-radius: 42px;
  }
  .rounded-\\[47px\\] {
    border-radius: 47px;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-md {
    border-radius: calc(var(--radius) - 2px);
  }
  .rounded-xl {
    border-radius: calc(var(--radius) + 4px);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-\\[5px\\] {
    border-style: var(--tw-border-style);
    border-width: 5px;
  }
  .border-b {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 1px;
  }
  .border-\\[\\#1c1c1c\\] {
    border-color: #1c1c1c;
  }
  .border-\\[\\#2a2a2a\\] {
    border-color: #2a2a2a;
  }
  .border-\\[\\#242424\\] {
    border-color: #242424;
  }
  .border-\\[\\#282828\\] {
    border-color: #282828;
  }
  .border-\\[\\#d4d4d2\\] {
    border-color: #d4d4d2;
  }
  .border-\\[\\#dedede\\] {
    border-color: #dedede;
  }
  .border-\\[\\#e2e2e0\\] {
    border-color: #e2e2e0;
  }
  .border-\\[\\#e2e2e2\\] {
    border-color: #e2e2e2;
  }
  .bg-\\[\\#0c0c0c\\] {
    background-color: #0c0c0c;
  }
  .bg-\\[\\#1e1e1e\\] {
    background-color: #1e1e1e;
  }
  .bg-\\[\\#9a9a9a\\] {
    background-color: #9a9a9a;
  }
  .bg-\\[\\#28c840\\] {
    background-color: #28c840;
  }
  .bg-\\[\\#111\\] {
    background-color: #111;
  }
  .bg-\\[\\#333\\] {
    background-color: #333;
  }
  .bg-\\[\\#666\\] {
    background-color: #666;
  }
  .bg-\\[\\#060606\\] {
    background-color: #060606;
  }
  .bg-\\[\\#101010\\] {
    background-color: #101010;
  }
  .bg-\\[\\#121212\\] {
    background-color: #121212;
  }
  .bg-\\[\\#141414\\] {
    background-color: #141414;
  }
  .bg-\\[\\#161616\\]\\/90 {
    background-color: color-mix(in oklab, #161616 90%, transparent);
  }
  .bg-\\[\\#242424\\] {
    background-color: #242424;
  }
  .bg-\\[\\#d4d4d4\\] {
    background-color: #d4d4d4;
  }
  .bg-\\[\\#e3e3e3\\] {
    background-color: #e3e3e3;
  }
  .bg-\\[\\#e6e6e6\\] {
    background-color: #e6e6e6;
  }
  .bg-\\[\\#ebebe9\\] {
    background-color: #ebebe9;
  }
  .bg-\\[\\#f3f3f3\\] {
    background-color: #f3f3f3;
  }
  .bg-\\[\\#f7f7f5\\] {
    background-color: #f7f7f5;
  }
  .bg-\\[\\#febc2e\\] {
    background-color: #febc2e;
  }
  .bg-\\[\\#ff5f57\\] {
    background-color: #ff5f57;
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .bg-white\\/90 {
    background-color: color-mix(in srgb, #fff 90%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 90%, transparent);
    }
  }
  .object-cover {
    object-fit: cover;
  }
  .px-1\\.5 {
    padding-inline: calc(var(--spacing) * 1.5);
  }
  .px-2\\.5 {
    padding-inline: calc(var(--spacing) * 2.5);
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
  .px-\\[15px\\] {
    padding-inline: 15px;
  }
  .py-0\\.5 {
    padding-block: calc(var(--spacing) * 0.5);
  }
  .py-1\\.5 {
    padding-block: calc(var(--spacing) * 1.5);
  }
  .py-8 {
    padding-block: calc(var(--spacing) * 8);
  }
  .pt-\\[440px\\] {
    padding-top: 440px;
  }
  .pb-24 {
    padding-bottom: calc(var(--spacing) * 24);
  }
  .pb-\\[15px\\] {
    padding-bottom: 15px;
  }
  .text-base {
    font-size: var(--text-base);
    line-height: var(--tw-leading, var(--text-base--line-height));
  }
  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--tw-leading, var(--text-lg--line-height));
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
  }
  .text-xs {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
  }
  .text-\\[22px\\] {
    font-size: 22px;
  }
  .text-\\[26px\\] {
    font-size: 26px;
  }
  .text-\\[32px\\] {
    font-size: 32px;
  }
  .leading-5 {
    --tw-leading: calc(var(--spacing) * 5);
    line-height: calc(var(--spacing) * 5);
  }
  .leading-6 {
    --tw-leading: calc(var(--spacing) * 6);
    line-height: calc(var(--spacing) * 6);
  }
  .leading-\\[28px\\] {
    --tw-leading: 28px;
    line-height: 28px;
  }
  .leading-\\[29px\\] {
    --tw-leading: 29px;
    line-height: 29px;
  }
  .leading-\\[42px\\] {
    --tw-leading: 42px;
    line-height: 42px;
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .font-normal {
    --tw-font-weight: var(--font-weight-normal);
    font-weight: var(--font-weight-normal);
  }
  .tracking-\\[-0\\.05em\\] {
    --tw-tracking: -0.05em;
    letter-spacing: -0.05em;
  }
  .text-balance {
    text-wrap: balance;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .text-\\[\\#3d3d3d\\] {
    color: #3d3d3d;
  }
  .text-\\[\\#4d4d4d\\] {
    color: #4d4d4d;
  }
  .text-\\[\\#5f5f5f\\] {
    color: #5f5f5f;
  }
  .text-\\[\\#6b6b6b\\] {
    color: #6b6b6b;
  }
  .text-\\[\\#8a8a8a\\] {
    color: #8a8a8a;
  }
  .text-\\[\\#111\\] {
    color: #111;
  }
  .text-\\[\\#767676\\] {
    color: #767676;
  }
  .text-\\[\\#818181\\] {
    color: #818181;
  }
  .text-\\[\\#b0b0b0\\] {
    color: #b0b0b0;
  }
  .text-\\[\\#cfcfcf\\] {
    color: #cfcfcf;
  }
  .text-black {
    color: var(--color-black);
  }
  .text-white {
    color: var(--color-white);
  }
  .no-underline {
    text-decoration-line: none;
  }
  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
  .shadow-2xl {
    --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .backdrop-blur-md {
    --tw-backdrop-blur: blur(var(--blur-md));
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .transition {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
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
  .duration-300 {
    --tw-duration: 300ms;
    transition-duration: 300ms;
  }
  .duration-500 {
    --tw-duration: 500ms;
    transition-duration: 500ms;
  }
  .duration-\\[350ms\\] {
    --tw-duration: 350ms;
    transition-duration: 350ms;
  }
  .duration-\\[450ms\\] {
    --tw-duration: 450ms;
    transition-duration: 450ms;
  }
  .will-change-transform {
    will-change: transform;
  }
  .select-none {
    -webkit-user-select: none;
    user-select: none;
  }
  .\\[-webkit-overflow-scrolling\\:touch\\] {
    -webkit-overflow-scrolling: touch;
  }
  .group-active\\:scale-\\[\\.98\\]:is(:where(.group):active *) {
    scale: .98;
  }
  .before\\:absolute::before {
    content: var(--tw-content);
    position: absolute;
  }
  .before\\:-inset-x-1::before {
    content: var(--tw-content);
    inset-inline: calc(var(--spacing) * -1);
  }
  .before\\:-inset-y-2\\.5::before {
    content: var(--tw-content);
    inset-block: calc(var(--spacing) * -2.5);
  }
  @media (hover: hover) {
    .hover\\:bg-\\[\\#1e1e1e\\]:hover {
      background-color: #1e1e1e;
    }
    .hover\\:bg-\\[\\#f2f2f2\\]:hover {
      background-color: #f2f2f2;
    }
  }
  .focus-visible\\:outline-none:focus-visible {
    --tw-outline-style: none;
    outline-style: none;
  }
  .disabled\\:cursor-default:disabled {
    cursor: default;
  }
  .disabled\\:opacity-30:disabled {
    opacity: 30%;
  }
  @container (width >= 48rem) {
    .\\@3xl\\:top-\\[220px\\] {
      top: 220px;
    }
    .\\@3xl\\:mt-5 {
      margin-top: calc(var(--spacing) * 5);
    }
    .\\@3xl\\:mt-7 {
      margin-top: calc(var(--spacing) * 7);
    }
    .\\@3xl\\:line-clamp-none {
      overflow: visible;
      display: block;
      -webkit-box-orient: horizontal;
      -webkit-line-clamp: unset;
    }
    .\\@3xl\\:grid {
      display: grid;
    }
    .\\@3xl\\:inline-flex {
      display: inline-flex;
    }
    .\\@3xl\\:aspect-\\[16\\/10\\] {
      aspect-ratio: 16/10;
    }
    .\\@3xl\\:h-auto {
      height: auto;
    }
    .\\@3xl\\:max-w-\\[820px\\] {
      max-width: 820px;
    }
    .\\@3xl\\:scroll-px-0 {
      scroll-padding-inline: 0px;
    }
    .\\@3xl\\:gap-0 {
      gap: 0px;
    }
    .\\@3xl\\:gap-6 {
      gap: calc(var(--spacing) * 6);
    }
    .\\@3xl\\:overflow-visible {
      overflow: visible;
    }
    .\\@3xl\\:rounded-none {
      border-radius: 0;
    }
    .\\@3xl\\:bg-\\[\\#3a3a3a\\] {
      background-color: #3a3a3a;
    }
    .\\@3xl\\:bg-\\[\\#111\\] {
      background-color: #111;
    }
    .\\@3xl\\:bg-\\[\\#cfcfcf\\] {
      background-color: #cfcfcf;
    }
    .\\@3xl\\:bg-transparent {
      background-color: transparent;
    }
    .\\@3xl\\:bg-white {
      background-color: var(--color-white);
    }
    .\\@3xl\\:px-0 {
      padding-inline: 0px;
    }
    .\\@3xl\\:px-8 {
      padding-inline: calc(var(--spacing) * 8);
    }
    .\\@3xl\\:pb-0 {
      padding-bottom: 0px;
    }
    .\\@3xl\\:text-\\[26px\\] {
      font-size: 26px;
    }
    .\\@3xl\\:text-\\[\\#3d3d3d\\] {
      color: #3d3d3d;
    }
    .\\@3xl\\:text-\\[\\#cdcdcd\\] {
      color: #cdcdcd;
    }
  }
  @container (width >= 72rem) {
    .\\@6xl\\:-top-\\[200px\\] {
      top: calc(200px * -1);
    }
    .\\@6xl\\:top-\\[260px\\] {
      top: 260px;
    }
    .\\@6xl\\:-left-20 {
      left: calc(var(--spacing) * -20);
    }
    .\\@6xl\\:col-start-1 {
      grid-column-start: 1;
    }
    .\\@6xl\\:col-start-2 {
      grid-column-start: 2;
    }
    .\\@6xl\\:row-span-2 {
      grid-row: span 2 / span 2;
    }
    .\\@6xl\\:row-start-1 {
      grid-row-start: 1;
    }
    .\\@6xl\\:row-start-2 {
      grid-row-start: 2;
    }
    .\\@6xl\\:m-0 {
      margin: 0px;
    }
    .\\@6xl\\:mt-7 {
      margin-top: calc(var(--spacing) * 7);
    }
    .\\@6xl\\:mt-\\[120px\\] {
      margin-top: 120px;
    }
    .\\@6xl\\:grid {
      display: grid;
    }
    .\\@6xl\\:h-\\[456px\\] {
      height: 456px;
    }
    .\\@6xl\\:h-\\[620px\\] {
      height: 620px;
    }
    .\\@6xl\\:w-\\[900px\\] {
      width: 900px;
    }
    .\\@6xl\\:max-w-\\[820px\\] {
      max-width: 820px;
    }
    .\\@6xl\\:max-w-\\[1280px\\] {
      max-width: 1280px;
    }
    .\\@6xl\\:grid-cols-\\[380px_1fr\\] {
      grid-template-columns: 380px 1fr;
    }
    .\\@6xl\\:items-start {
      align-items: flex-start;
    }
    .\\@6xl\\:gap-x-20 {
      column-gap: calc(var(--spacing) * 20);
    }
    .\\@6xl\\:px-12 {
      padding-inline: calc(var(--spacing) * 12);
    }
    .\\@6xl\\:pt-\\[480px\\] {
      padding-top: 480px;
    }
    .\\@6xl\\:text-\\[40px\\] {
      font-size: 40px;
    }
    .\\@6xl\\:leading-\\[44px\\] {
      --tw-leading: 44px;
      line-height: 44px;
    }
  }
  .\\[\\&_svg\\]\\:h-6 svg {
    height: calc(var(--spacing) * 6);
  }
  .\\[\\&_svg\\]\\:w-6 svg {
    width: calc(var(--spacing) * 6);
  }
  .\\[\\&\\:\\:-webkit-scrollbar\\]\\:hidden::-webkit-scrollbar {
    display: none;
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

































@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-scroll-snap-strictness: proximity;
      --tw-border-style: solid;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-tracking: initial;
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
      --tw-content: "";
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
@property --tw-scroll-snap-strictness {
  syntax: "*";
  inherits: false;
  initial-value: proximity;
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
@property --tw-content {
  syntax: "*";
  initial-value: "";
  inherits: false;
}`,settings:{mobileView:!0,darkMode:!0,dragHint:!0,badgeCount:22,autoplaySeconds:6},themeable:!0,files:[["component.tsx",`"use client";

import * as React from "react";
import Matter from "matter-js";

/* ------------------------------------------------------------------ */
/*  Showcase Carousel \u2014 mobile-first case / product card slider        */
/*  Swipe with snap on phones (auto-advance + progress dots),          */
/*  arrows + dots on wide containers. Responds to its CONTAINER width, */
/*  not the viewport, so it works inside phone frames and sidebars.    */
/* ------------------------------------------------------------------ */

export type ShowcaseItem = {
  id?: string;
  title: string;
  description?: string;
  tags?: string[];
  /** Cover image URL */
  image?: string;
  /** Cover video URL (muted, looped). \`image\` is used as poster. */
  video?: string;
  /** Any custom cover (animated mockups, SVG\u2026). Wins over image/video. */
  cover?: React.ReactNode;
  /** CSS background behind the cover (color or gradient). */
  background?: string;
  /** Link for the whole card. Without it the card is not clickable. */
  href?: string;
  /** Small label on the cover, e.g. "NDA", "Soon", "New". */
  badge?: string;
  /** Text of the link under the card on wide layouts. */
  cta?: string;
  alt?: string;
};

export type ShowcaseCarouselProps = {
  items?: ShowcaseItem[];
  /** Auto-advance interval on the mobile layout, ms. 0 disables it. */
  autoplay?: number;
  theme?: "dark" | "light";
  /** Accessible name of the slider. */
  label?: string;
  /** Default text for card links on wide layouts. */
  ctaLabel?: string;
  className?: string;
  onIndexChange?: (index: number) => void;
};

const MOBILE_MAX = 768; // container width under which the mobile layout is used

const CAROUSEL_THEMES = {
  dark: {
    card: "bg-[#101010]",
    title: "text-white",
    desc: "text-[#767676] @3xl:text-[#cdcdcd]",
    tag: "bg-[#242424] text-[#818181]",
    badge: "bg-[#141414] border-[#282828] text-white",
    dot: "bg-[#333] @3xl:bg-[#3a3a3a]",
    dotActive: "@3xl:bg-white",
    fill: "bg-white",
    done: "bg-[#666]",
    btn: "border-[#2a2a2a] bg-[#121212] text-white hover:bg-[#1e1e1e]",
    cta: "text-white",
    arrowDot: "bg-white text-black",
  },
  light: {
    card: "bg-[#f3f3f3]",
    title: "text-[#111]",
    desc: "text-[#6b6b6b] @3xl:text-[#3d3d3d]",
    tag: "bg-[#e6e6e6] text-[#5f5f5f]",
    badge: "bg-white border-[#e2e2e2] text-[#111]",
    dot: "bg-[#d4d4d4] @3xl:bg-[#cfcfcf]",
    dotActive: "@3xl:bg-[#111]",
    fill: "bg-[#111]",
    done: "bg-[#9a9a9a]",
    btn: "border-[#dedede] bg-white text-[#111] hover:bg-[#f2f2f2]",
    cta: "text-[#111]",
    arrowDot: "bg-[#111] text-white",
  },
} as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

const Arrow = ({ dir }: { dir: "prev" | "next" }) => (
  <svg width="16" height="12" viewBox="0 0 48 14" fill="none" aria-hidden="true">
    <path
      d={dir === "prev" ? "M47 7H1M7 1 1 7l6 6" : "M1 7h46M41 1l6 6-6 6"}
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Empty state for a card without a cover: a few tones lighter than the card + image icon. */
export function EmptyCover({ className = "", theme = "dark" }: { className?: string; theme?: "dark" | "light" }) {
  const tone = theme === "dark" ? "bg-[#1e1e1e] text-[#4d4d4d]" : "bg-[#e3e3e3] text-[#b0b0b0]";
  return (
    <div className={\`absolute inset-0 grid place-items-center \${tone} \${className}\`} aria-hidden="true">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="9" cy="9" r="1.8" />
        <path d="m21 15-4.6-4.6a1.5 1.5 0 0 0-2.1 0L5 19.5" />
      </svg>
    </div>
  );
}

export function ShowcaseCarousel({
  items = [],
  autoplay = 6000,
  theme = "dark",
  label = "Showcase",
  ctaLabel = "Read case",
  className = "",
  onIndexChange,
}: ShowcaseCarouselProps) {
  const t = CAROUSEL_THEMES[theme];
  const rootRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const fillRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  const [index, setIndex] = React.useState(0);
  const [mobile, setMobile] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [userTook, setUserTook] = React.useState(false);
  const [edges, setEdges] = React.useState({ start: true, end: false });

  /* layout mode follows the container width */
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setMobile(e.contentRect.width < MOBILE_MAX));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* autoplay only while the slider is on screen */
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cards = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const measure = React.useCallback(() => {
    const track = trackRef.current;
    const cs = cards();
    if (!track || !cs.length) return;
    const base = cs[0].offsetLeft;
    const x = track.scrollLeft;
    let best = 0;
    let bestD = Infinity;
    cs.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - base - x);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    const max = track.scrollWidth - track.clientWidth;
    setEdges({ start: x < 4, end: x > max - 4 });
    setIndex((prev) => (prev === best ? prev : best));
  }, []);

  React.useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  React.useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, items.length, mobile]);

  const goTo = React.useCallback(
    (i: number) => {
      const track = trackRef.current;
      const cs = cards();
      if (!track || !cs.length) return;
      const n = Math.max(0, Math.min(cs.length - 1, i));
      track.scrollTo({ left: cs[n].offsetLeft - cs[0].offsetLeft, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced]
  );

  const takeOver = () => setUserTook(true);

  const playing = mobile && visible && !userTook && !reduced && autoplay > 0 && items.length > 1;

  /* auto-advance + progress fill on the active dot */
  React.useEffect(() => {
    fillRefs.current.forEach((f) => f?.getAnimations().forEach((a) => a.cancel()));
    if (!playing) return;
    const fill = fillRefs.current[index];
    const anim = fill?.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
      duration: autoplay,
      easing: "linear",
      fill: "forwards",
    });
    const timer = window.setTimeout(() => {
      const track = trackRef.current;
      const atEnd = track ? track.scrollLeft > track.scrollWidth - track.clientWidth - 4 : false;
      goTo(atEnd ? 0 : (index + 1) % items.length);
    }, autoplay);
    return () => {
      window.clearTimeout(timer);
      anim?.cancel();
    };
  }, [playing, index, autoplay, items.length, goTo]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      takeOver();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      takeOver();
      goTo(index - 1);
    }
  };

  return (
    <div ref={rootRef} className={\`@container w-full \${className}\`}>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKey}
        onScroll={measure}
        onPointerDown={takeOver}
        onWheel={(e) => Math.abs(e.deltaX) > Math.abs(e.deltaY) && takeOver()}
        className="flex flex-row items-stretch gap-4 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory px-4 scroll-px-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden focus-visible:outline-none @3xl:gap-6 @3xl:px-0 @3xl:scroll-px-0"
      >
        {items.map((item, i) => {
          const active = i === index;
          const Tag = (item.href ? "a" : "div") as React.ElementType;
          const linkProps = item.href ? { href: item.href } : {};
          return (
            <Tag
              key={item.id ?? i}
              {...linkProps}
              role="group"
              aria-roledescription="slide"
              aria-label={\`\${i + 1} of \${items.length}: \${item.title}\`}
              className={[
                "group flex flex-none snap-start flex-col gap-5 overflow-hidden rounded-[20px] no-underline transition-opacity duration-[450ms]",
                "h-[510px] w-[min(340px,calc(100cqw-48px))]",
                t.card,
                mobile && !active ? "opacity-50" : "opacity-100",
                "@3xl:h-auto @3xl:w-[calc((100%-24px)/2.15)] @3xl:gap-0 @3xl:overflow-visible @3xl:rounded-none @3xl:bg-transparent @6xl:w-[calc((100%-48px)/2.6)]",
                item.href ? "cursor-pointer" : "cursor-default",
              ].join(" ")}
            >
              <div
                className={\`relative h-[230px] flex-none overflow-hidden rounded-[20px] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] @3xl:h-auto @3xl:aspect-[16/10] \${
                  item.href ? "group-active:scale-[.98]" : ""
                }\`}
                style={{ background: item.background ?? (item.cover || item.image || item.video ? "#1a1a1a" : theme === "dark" ? "#1e1e1e" : "#e3e3e3") }}
              >
                {item.cover ? (
                  item.cover
                ) : item.video ? (
                  <video
                    src={item.video}
                    poster={item.image}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    aria-label={item.alt ?? item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : item.image ? (
                  <img
                    src={item.image}
                    alt={item.alt ?? item.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <EmptyCover theme={theme} />
                )}
                {item.badge && (
                  <span
                    className={\`absolute left-2.5 top-3 z-10 flex h-[22px] items-center rounded-md border px-1.5 text-xs leading-5 tracking-[-0.05em] \${t.badge}\`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-4 px-[15px] pb-[15px] @3xl:mt-5 @3xl:px-0 @3xl:pb-0">
                <h3
                  className={\`m-0 text-[22px] font-medium leading-[29px] tracking-[-0.05em] text-balance transition-colors duration-[450ms] @3xl:text-[26px] \${t.title}\`}
                >
                  {item.title}
                </h3>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className={\`h-6 rounded-full px-2.5 py-0.5 text-sm leading-5 \${t.tag}\`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {item.description && (
                  <p
                    className={\`m-0 line-clamp-3 text-base leading-6 @3xl:line-clamp-none \${t.desc}\`}
                  >
                    {item.description}
                  </p>
                )}
                {item.href && (
                  <span
                    className={\`-mt-1 hidden items-center gap-1.5 text-base font-medium @3xl:inline-flex \${t.cta}\`}
                  >
                    {item.cta ?? ctaLabel}
                    <span className={\`grid h-[18px] w-[18px] place-items-center rounded-full \${t.arrowDot}\`}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                        <path d="M1 4h8M6 1l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                )}
              </div>
            </Tag>
          );
        })}
      </div>

      {items.length > 1 && (
        <div className="mt-5 flex items-center gap-3.5 @3xl:mt-7">
          <button
            type="button"
            aria-label="Previous"
            disabled={edges.start}
            onClick={() => {
              takeOver();
              goTo(index - 1);
            }}
            className={\`hidden h-11 w-11 place-items-center rounded-full border transition disabled:cursor-default disabled:opacity-30 @3xl:grid \${t.btn}\`}
          >
            <Arrow dir="prev" />
          </button>

          <div role="tablist" aria-label={label} className="flex flex-1 justify-center gap-1.5">
            {items.map((item, i) => {
              const active = i === index;
              return (
                <button
                  key={item.id ?? i}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={\`\${i + 1}: \${item.title}\`}
                  onClick={() => {
                    takeOver();
                    goTo(i);
                  }}
                  className={\`relative h-1.5 cursor-pointer overflow-hidden rounded-[3px] transition-[width,background-color] duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] before:absolute before:-inset-x-1 before:-inset-y-2.5 before:content-[''] \${
                    active ? \`w-[22px] \${t.dotActive}\` : "w-1.5"
                  } \${t.dot}\`}
                >
                  {mobile && (
                    <span
                      ref={(el) => {
                        fillRefs.current[i] = el;
                      }}
                      aria-hidden="true"
                      className={\`absolute inset-0 origin-left \${i < index ? t.done : t.fill}\`}
                      style={{
                        transform: i < index || (active && !playing) ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next"
            disabled={edges.end}
            onClick={() => {
              takeOver();
              goTo(index + 1);
            }}
            className={\`hidden h-11 w-11 place-items-center rounded-full border transition disabled:cursor-default disabled:opacity-30 @3xl:grid \${t.btn}\`}
          >
            <Arrow dir="next" />
          </button>
        </div>
      )}
    </div>
  );
}



/* ------------------------------------------------------------------ */
/*  Portfolio template \u2014 first screen of a designer's site:            */
/*  falling keyword badges (drag & throw), avatar + name + bio,        */
/*  social links and a mobile-first case carousel.                     */
/*  Layout follows the CONTAINER width (mobile < 768 < tablet < 1152). */
/* ------------------------------------------------------------------ */

export type PortfolioBadge = { label: string; bg?: string; border?: string; color?: string };
export type PortfolioLink = { label: string; href: string };

export type PortfolioTemplateProps = {
  name?: string;
  role?: string;
  /** Bio: parts wrapped in **double asterisks** are highlighted. */
  bio?: string;
  avatar?: string;
  links?: PortfolioLink[];
  badges?: PortfolioBadge[];
  cases?: ShowcaseItem[];
  /** "auto" follows the \`dark\` class on <html> (shadcn / 21st convention). */
  theme?: "dark" | "light" | "auto";
  /** Change this value to drop the badges again. */
  dropKey?: number;
  /** Show a "grab & throw" hint until the visitor touches a badge. */
  dragHint?: boolean;
  /** Case carousel auto-advance on mobile, ms. 0 turns it off. */
  autoplay?: number;
  className?: string;
};

export const DEFAULT_BADGES: PortfolioBadge[] = [
  { label: "PIXEL PERFECT" },
  { label: "UX/UI DESIGN" },
  { label: "BRANDING" },
  { label: "UI DESIGN" },
  { label: "TOUCHPOINT" },
  { label: "IMPROVEMENTS" },
  { label: "PAIN POINT", bg: "#ea582f", border: "#ea582f", color: "#fff" },
  { label: "CTA" },
  { label: "WEB 3.0", bg: "#d5ff00", border: "#566700", color: "#374200" },
  { label: "AI", bg: "#043ae5", border: "#043ae5", color: "#fff" },
  { label: "MARKETING" },
  { label: "USER FLOW" },
  { label: "USABILITY" },
  { label: "CREATIVE", bg: "#ff531f", border: "#ff531f", color: "#fff" },
  { label: "CJM", bg: "#6204e5", border: "#6204e5", color: "#fff" },
  { label: "DESIGN SYSTEM", bg: "#63d990", border: "#136231", color: "#073318" },
  { label: "COMPONENTS", bg: "#cd50ff", border: "#cd50ff", color: "#fff" },
  { label: "ATOMIC DESIGN" },
  { label: "TRENDS" },
  { label: "YOUR NAME", bg: "#d27ef9", border: "#d27ef9", color: "#fff" },
  { label: "SENIOR", bg: "#3c2cff", border: "#3c2cff", color: "#fff" },
  { label: "PRODUCT DESIGNER", bg: "#cd50ff", border: "#cd50ff", color: "#fff" },
];

const DEFAULT_CASES: ShowcaseItem[] = [
  {
    title: "How I designed [product] from scratch in [N] months",
    description: "One or two lines about the product: who it is for and what changed after the launch.",
    tags: ["Fintech", "SaaS", "B2B", "B2C"],
    href: "#",
  },
  {
    title: "Onboarding that helped [audience] make their first [action]",
    description: "What the problem was, what you did, and the metric that moved \u2014 for example +40% to activation.",
    tags: ["Fintech", "Mobile", "B2C"],
    badge: "NDA",
  },
  {
    title: "A [mechanic] that kept [result] after the release",
    description: "Short story of a key decision: the constraint, the idea and how it played out with real users.",
    tags: ["Marketplace", "B2C"],
    href: "#",
  },
  {
    title: "Designed a [type of product] for [audience]",
    description: "Number of screens, platforms and your role \u2014 research, UX, UI, design system, handoff.",
    tags: ["SaaS", "B2B"],
    href: "#",
  },
];

const DEFAULTS = {
  name: "Your Name",
  role: "Product Designer \xB7 UX/UI Designer",
  bio: "**N+ years designing digital products \u2014 **fintech and payments, marketplaces, B2B systems and e-commerce,** from the first idea to the release.**",
  links: [
    { label: "Telegram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "E-mail", href: "#" },
  ],
  badges: DEFAULT_BADGES,
  cases: DEFAULT_CASES,
};

const THEMES = {
  dark: {
    bg: "#060606",
    ink: "#ffffff",
    muted: "#767676",
    plainBorder: "#414141",
    plainColor: "#ffffff",
    glow: "rgba(60,44,255,.45)",
    avatarBorder: "#0f0f0f",
    hint: "bg-[#161616]/90 border-[#2a2a2a] text-[#cfcfcf]",
  },
  light: {
    bg: "#f7f7f5",
    ink: "#111111",
    muted: "#8a8a8a",
    plainBorder: "#cfcfcf",
    plainColor: "#111111",
    glow: "rgba(60,44,255,.16)",
    avatarBorder: "#e6e6e6",
    hint: "bg-white/90 border-[#e2e2e2] text-[#3d3d3d]",
  },
} as const;

/* ---------- falling badges (Matter.js) ---------- */

const PHYS = { gravity: 2.1, restitution: 0.04, friction: 0.9, frictionStatic: 1.4, frictionAir: 0.012, density: 0.006, stagger: 55 };
const DT = 1000 / 120;
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

function FallingBadges({
  badges,
  plain,
  onSettled,
  onGrab,
}: {
  badges: PortfolioBadge[];
  plain: { border: string; color: string };
  onSettled?: () => void;
  onGrab?: () => void;
}) {
  const zoneRef = React.useRef<HTMLDivElement>(null);
  const elRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const cb = React.useRef({ onSettled, onGrab });
  cb.current = { onSettled, onGrab };
  const [size, setSize] = React.useState({ w: 0, h: 0 });
  const list = React.useMemo(() => [...badges].sort(() => Math.random() - 0.5), [badges]);

  React.useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;
    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width);
      const h = Math.round(e.contentRect.height);
      setSize((s) => (Math.abs(s.w - w) > 8 || s.h !== h ? { w, h } : s));
    });
    ro.observe(zone);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const zone = zoneRef.current;
    if (!zone || !size.w) return;
    const { Engine, Bodies, Body, Composite, Constraint, Sleeping } = Matter;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W = size.w;
    const H = size.h;
    const T = 200;

    const engine = Engine.create({ enableSleeping: true, positionIterations: 24, velocityIterations: 16, constraintIterations: 4 });
    engine.gravity.y = PHYS.gravity;
    Composite.add(engine.world, [
      Bodies.rectangle(W / 2, H - 3 + T / 2, W * 3, T, { isStatic: true, friction: 1, slop: 0.01 }),
      Bodies.rectangle(-T / 2, H / 2 - 600, T, H + 1600, { isStatic: true }),
      Bodies.rectangle(W + T / 2, H / 2 - 600, T, H + 1600, { isStatic: true }),
      Bodies.rectangle(W / 2, -1400 - T / 2, W * 3, T, { isStatic: true }),
    ]);

    type B = Matter.Body & { el: HTMLDivElement; w: number; h: number };
    const els = elRefs.current.slice(0, list.length).filter(Boolean) as HTMLDivElement[];
    els.forEach((el) => (el.style.visibility = "hidden"));
    const bodies: B[] = els.map((el) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const b = Bodies.rectangle(rnd(w / 2 + 4, Math.max(w / 2 + 5, W - w / 2 - 4)), 0, w, h, {
        chamfer: { radius: 12 },
        restitution: PHYS.restitution,
        friction: PHYS.friction,
        frictionStatic: PHYS.frictionStatic,
        frictionAir: PHYS.frictionAir,
        density: PHYS.density,
        sleepThreshold: 40,
        slop: 0.01,
      }) as B;
      b.el = el;
      b.w = w;
      b.h = h;
      return b;
    });

    let raf = 0;
    let running = false;
    let last = 0;
    let acc = 0;
    let spawned = 0;
    let settledOnce = false;
    let drag: Matter.Constraint | null = null;
    const timers: number[] = [];

    const render = () => {
      for (const b of bodies)
        b.el.style.transform = \`translate(\${(b.position.x - b.w / 2).toFixed(1)}px,\${(b.position.y - b.h / 2).toFixed(1)}px) rotate(\${b.angle.toFixed(4)}rad)\`;
    };
    const tick = (ts: number) => {
      if (!last) last = ts;
      acc += Math.min(50, ts - last);
      last = ts;
      while (acc >= DT) {
        Engine.update(engine, DT);
        acc -= DT;
      }
      render();
      if (spawned === bodies.length && !drag && bodies.every((b) => b.isSleeping)) {
        running = false;
        last = 0;
        acc = 0;
        if (!settledOnce) {
          settledOnce = true;
          cb.current.onSettled?.();
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    const place = (b: B, y: number) => {
      Body.setPosition(b, { x: b.position.x, y });
      Body.setAngle(b, rnd(-0.7, 0.7));
      Composite.add(engine.world, b);
      Body.setVelocity(b, { x: rnd(-1.2, 1.2), y: rnd(3, 6) });
      Body.setAngularVelocity(b, rnd(-0.04, 0.04));
    };

    const local = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const offs: (() => void)[] = [];
    bodies.forEach((b) => {
      const el = b.el;
      const down = (e: PointerEvent) => {
        if (!engine.world.bodies.includes(b)) return;
        e.preventDefault();
        cb.current.onGrab?.();
        el.setPointerCapture(e.pointerId);
        el.style.cursor = "grabbing";
        const p = local(e);
        const dx = p.x - b.position.x;
        const dy = p.y - b.position.y;
        const c = Math.cos(-b.angle);
        const s = Math.sin(-b.angle);
        drag = Constraint.create({ pointA: p, bodyB: b, pointB: { x: dx * c - dy * s, y: dx * s + dy * c }, stiffness: 0.12, damping: 0.08, length: 0 });
        Composite.add(engine.world, drag);
        Sleeping.set(b, false);
        wake();
      };
      const move = (e: PointerEvent) => {
        if (!drag || drag.bodyB !== b) return;
        drag.pointA = local(e);
        Sleeping.set(b, false);
      };
      const end = () => {
        if (drag && drag.bodyB === b) {
          Composite.remove(engine.world, drag);
          drag = null;
          el.style.cursor = "grab";
          bodies.forEach((x) => Sleeping.set(x, false));
          wake();
        }
      };
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", end);
      el.addEventListener("pointercancel", end);
      offs.push(() => {
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", end);
        el.removeEventListener("pointercancel", end);
      });
    });

    if (reduce) {
      bodies.forEach((b, i) => place(b, -60 - i * 45));
      for (let i = 0; i < 1800; i++) Engine.update(engine, DT);
      render();
      bodies.forEach((b) => (b.el.style.visibility = "visible"));
      spawned = bodies.length;
      settledOnce = true;
      cb.current.onSettled?.();
    } else {
      bodies.forEach((b, i) =>
        timers.push(
          window.setTimeout(() => {
            place(b, -50 - rnd(0, 120));
            b.el.style.visibility = "visible";
            spawned++;
            wake();
          }, 300 + i * PHYS.stagger)
        )
      );
    }

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      offs.forEach((off) => off());
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [size, list]);

  return (
    <div ref={zoneRef} className="absolute inset-x-0 top-0 h-[424px] overflow-hidden @6xl:h-[456px]" aria-label="Keywords">
      {list.map((b, i) => (
        <div
          key={b.label + i}
          ref={(el) => {
            elRefs.current[i] = el;
          }}
          className="absolute left-0 top-0 flex h-[34px] cursor-grab touch-none select-none items-center whitespace-nowrap rounded-xl border px-3.5 text-base tracking-[-0.05em] will-change-transform"
          style={{
            visibility: "hidden",
            background: b.bg ?? "transparent",
            borderColor: b.border ?? plain.border,
            color: b.color ?? plain.color,
          }}
        >
          {b.label}
        </div>
      ))}
    </div>
  );
}

/* ---------- small pieces ---------- */

const ArrowUpRight = ({ color }: { color: string }) => (
  <svg className="h-[15px] w-[15px] flex-none" viewBox="0 0 15 15" aria-hidden="true">
    <path d="M4 11 11 4M5 4h6v6" stroke={color} strokeWidth="1.4" fill="none" />
  </svg>
);

const HandIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 11V6a2 2 0 0 0-4 0v1M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);

function Bio({ text, ink }: { text: string; ink: string }) {
  return (
    <>
      {text.split("**").map((p, i) =>
        i % 2 ? (
          <b key={i} className="font-medium" style={{ color: ink }}>
            {p}
          </b>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        )
      )}
    </>
  );
}

/* ---------- template ---------- */

/** Resolves "auto" from the \`dark\` class on <html>, and follows it live. */
function useResolvedTheme(theme: "dark" | "light" | "auto"): "dark" | "light" {
  const [auto, setAuto] = React.useState<"dark" | "light">("dark");
  React.useEffect(() => {
    if (theme !== "auto") return;
    const root = document.documentElement;
    const read = () => setAuto(root.classList.contains("dark") ? "dark" : "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, [theme]);
  return theme === "auto" ? auto : theme;
}

export function PortfolioTemplate(props: PortfolioTemplateProps) {
  const { name, role, bio, links, badges, cases } = { ...DEFAULTS, ...props };
  const { avatar, theme: themeProp = "auto", dropKey = 0, dragHint = true, autoplay = 6000, className = "" } = props;
  const theme = useResolvedTheme(themeProp);
  const t = THEMES[theme];
  const [hint, setHint] = React.useState<"hidden" | "shown" | "done">("hidden");

  React.useEffect(() => {
    setHint((h) => (h === "done" ? h : "hidden"));
  }, [dropKey]);

  return (
    <div
      className={\`@container relative w-full overflow-x-clip antialiased transition-colors duration-300 \${className}\`}
      style={{
        background: t.bg,
        color: t.ink,
        fontFamily: "'Geist', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        letterSpacing: "-0.05em",
      }}
    >
      <main className="relative mx-auto max-w-[450px] @3xl:max-w-[820px] @6xl:max-w-[1280px]">
        {/* hero */}
        <section className="relative pt-[440px] @6xl:pt-[480px]">
          <div
            className="pointer-events-none absolute -left-[120px] -top-[160px] h-[360px] w-[420px] rounded-full @6xl:-left-20 @6xl:-top-[200px] @6xl:h-[620px] @6xl:w-[900px]"
            style={{ background: \`radial-gradient(closest-side, \${t.glow}, transparent)\` }}
          />
          <FallingBadges
            key={dropKey}
            badges={badges}
            plain={{ border: t.plainBorder, color: t.plainColor }}
            onSettled={() => dragHint && setHint((h) => (h === "done" ? h : "shown"))}
            onGrab={() => setHint("done")}
          />

          {dragHint && (
            <div className="pointer-events-none absolute inset-x-0 top-16 z-10 flex justify-center px-2.5 @3xl:top-[220px] @6xl:top-[260px]">
              <div
                aria-live="polite"
                className={\`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm backdrop-blur-md transition-all duration-500 \${t.hint} \${
                  hint === "shown" ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }\`}
              >
                <span className={hint === "shown" ? "animate-bounce" : ""}>
                  <HandIcon />
                </span>
                Grab a badge and throw it
              </div>
            </div>
          )}

          <div className="relative px-2.5 @3xl:px-8 @6xl:grid @6xl:grid-cols-[380px_1fr] @6xl:items-start @6xl:gap-x-20 @6xl:px-12">
            <div className="flex items-center gap-6 @6xl:col-start-1 @6xl:row-start-1">
              <div className="relative h-20 w-[60px] flex-none overflow-hidden rounded-[20px] border" style={{ borderColor: t.avatarBorder }}>
                {avatar ? (
                  <img src={avatar} alt={name} className="h-full w-full object-cover" />
                ) : (
                  <EmptyCover theme={theme} className="[&_svg]:h-6 [&_svg]:w-6" />
                )}
              </div>
              <div>
                <h1 className="m-0 text-[32px] font-normal leading-[42px]">{name}</h1>
                <p className="m-0 text-lg" style={{ color: t.muted }}>
                  {role}
                </p>
              </div>
            </div>

            <p
              className="mt-[30px] text-[26px] font-medium leading-[28px] @6xl:col-start-2 @6xl:row-span-2 @6xl:row-start-1 @6xl:m-0 @6xl:max-w-[820px] @6xl:text-[40px] @6xl:leading-[44px]"
              style={{ color: t.muted }}
            >
              <Bio text={bio} ink={t.ink} />
            </p>

            <div className="mt-8 flex flex-wrap gap-4 @6xl:col-start-1 @6xl:row-start-2 @6xl:mt-7">
              {links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-lg leading-5" style={{ color: t.ink }}>
                  {l.label} <ArrowUpRight color={t.muted} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* cases */}
        <section className="mt-20 pb-24 @3xl:px-8 @6xl:mt-[120px] @6xl:px-12">
          <ShowcaseCarousel items={cases} theme={theme} label="Cases" autoplay={autoplay} />
        </section>
      </main>
    </div>
  );
}

export default PortfolioTemplate;
`],["demo.tsx",`"use client";

import * as React from "react";
import { PortfolioTemplate, DEFAULT_BADGES } from "@/components/ui/component";

/* Live controls (21st Demo Controls). Any change drops the badges again. */
const settings = {
  /* on: phone frame \xB7 off: desktop browser frame */
  mobileView: true,
  darkMode: true,
  dragHint: true,
  badgeCount: 22,
  autoplaySeconds: 6,
};

export default function PortfolioHeroDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  const dark = s.darkMode;
  const theme = dark ? "dark" : "light";
  const count = Math.max(1, Math.min(DEFAULT_BADGES.length, Math.round(s.badgeCount)));
  const badges = React.useMemo(() => DEFAULT_BADGES.slice(0, count), [count]);
  const dropKey = React.useMemo(() => Math.random(), [s.mobileView, dark, s.dragHint, count, s.autoplaySeconds]);

  const template = (
    <PortfolioTemplate
      theme={theme}
      dropKey={dropKey}
      dragHint={s.dragHint}
      badges={badges}
      autoplay={Math.max(0, s.autoplaySeconds) * 1000}
    />
  );

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center py-8"
      style={{
        /* dot grid from the "work with AI" block of vasnev.art */
        backgroundColor: dark ? "#121212" : "#ececea",
        backgroundImage: \`radial-gradient(circle, \${dark ? "rgba(255,255,255,.035)" : "rgba(0,0,0,.06)"} 0 1px, transparent 1.4px)\`,
        backgroundSize: "20px 13px",
        backgroundPosition: "-6px -1px",
      }}
    >
      {s.mobileView ? (
        <div
          className={\`relative w-[390px] max-w-[calc(100%-16px)] rounded-[47px] border-[5px] shadow-2xl \${
            dark ? "border-[#1c1c1c] bg-[#060606]" : "border-[#d4d4d2] bg-[#f7f7f5]"
          }\`}
        >
          <div className="h-[820px] overflow-y-auto overflow-x-hidden rounded-[42px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {template}
          </div>
        </div>
      ) : (
        <div
          className={\`w-[min(1200px,calc(100%-32px))] overflow-hidden rounded-2xl border shadow-2xl \${
            dark ? "border-[#242424] bg-[#060606]" : "border-[#d4d4d2] bg-[#f7f7f5]"
          }\`}
        >
          <div className={\`flex h-10 items-center gap-2 border-b px-4 \${dark ? "border-[#1c1c1c] bg-[#141414]" : "border-[#e2e2e0] bg-[#ebebe9]"}\`}>
            <i className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <i className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <i className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span
              className={\`mx-auto flex h-6 w-[min(320px,50%)] items-center justify-center rounded-md text-xs \${
                dark ? "bg-[#0c0c0c] text-[#767676]" : "bg-white text-[#8a8a8a]"
              }\`}
            >
              yourname.design
            </span>
            <span className="w-[52px]" />
          </div>
          <div className="h-[760px] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{template}</div>
        </div>
      )}
    </div>
  );
}
`]],mount(o,a){let r=(0,yn.createRoot)(o);return r.render(an.createElement(en,a)),{update:f=>r.render(an.createElement(en,f)),unmount:()=>r.unmount()}}};})();
