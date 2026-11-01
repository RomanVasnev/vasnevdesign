(()=>{var ee=Object.create;var Wn=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var re=Object.getPrototypeOf,oe=Object.prototype.hasOwnProperty;var yn=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}};var se=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of ae(t))!oe.call(e,c)&&c!==r&&Wn(e,c,{get:()=>t[c],enumerable:!(s=te(t,c))||s.enumerable});return e};var T=(e,t,r)=>(r=e!=null?ee(re(e)):{},se(t||!e||!e.__esModule?Wn(r,"default",{value:e,enumerable:!0}):r,e));var on=yn((be,Bn)=>{Bn.exports=window.__R.react});var Xn=yn((xe,jn)=>{jn.exports=window.__R["react-dom/client"]});var q=yn((we,_n)=>{_n.exports=window.__R["react/jsx-runtime"]});var Mn=T(on()),Kn=T(Xn());var Gn=T(on());var o=T(on()),a=T(q()),ie={dark:{card:"#1C1C1E",fill:"rgba(118,118,128,.24)",fillHi:"rgba(118,118,128,.36)",label:"#FFFFFF",secondary:"rgba(235,235,245,.6)",tertiary:"rgba(235,235,245,.3)",separator:"rgba(84,84,88,.65)",tick:"rgba(235,235,245,.22)",tickHot:"rgba(235,235,245,.6)",material:"rgba(44,44,46,.8)",red:"#FF453A",blue:"#0A84FF",cardShadow:"0 0 0 .5px rgba(255,255,255,.06), 0 12px 40px rgba(0,0,0,.45)",popShadow:"0 0 0 .5px rgba(255,255,255,.1), 0 18px 50px rgba(0,0,0,.55)"},light:{card:"#FFFFFF",fill:"rgba(118,118,128,.12)",fillHi:"rgba(118,118,128,.2)",label:"#000000",secondary:"rgba(60,60,67,.6)",tertiary:"rgba(60,60,67,.3)",separator:"rgba(60,60,67,.29)",tick:"rgba(60,60,67,.2)",tickHot:"rgba(60,60,67,.55)",material:"rgba(250,250,252,.82)",red:"#FF3B30",blue:"#007AFF",cardShadow:"0 0 0 .5px rgba(0,0,0,.05), 0 10px 30px rgba(0,0,0,.08)",popShadow:"0 0 0 .5px rgba(0,0,0,.08), 0 18px 50px rgba(0,0,0,.18)"}},le="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Inter, 'Segoe UI', Roboto, sans-serif",ce="cubic-bezier(.2,.9,.25,1)",pe={"04:20":"blaze it","16:20":"blaze it","13:37":"leet","11:11":"make a wish","23:11":"make a wish","03:14":"\u03C0 o'clock","15:14":"\u03C0 o'clock","04:04":"time not found","12:34":"1-2-3-4","00:00":"midnight","12:00":"high noon","07:47":"boarding","10:10":"watch-ad time","22:22":"d\xE9j\xE0 vu"},A=e=>String(e).padStart(2,"0"),_=e=>(e%1440+1440)%1440,sn=e=>{let[t,r]=e.split(":").map(Number);return _((t||0)*60+(r||0))},J=e=>`${A(Math.floor(_(e)/60))}:${A(_(e)%60)}`,vn=()=>{let e=new Date;return e.getHours()*60+e.getMinutes()},X=e=>{let t=Math.floor(e/60),r=e%60;return t&&r?`${t}h ${r}m`:t?`${t}h`:`${r}m`},On=(e,t)=>{let r=new Date;r.setHours(Math.floor(e/60),e%60,0,0);let s=new Date(r.getTime()+t*6e4);return{minutes:t,start:r,end:s,startLabel:J(e),endLabel:J(e+t),nextDay:s.toDateString()!==r.toDateString()}};function de({d:e}){return(0,a.jsx)("span",{className:"relative inline-block h-[1.3em] overflow-hidden",style:{width:"0.6em",maskImage:"linear-gradient(transparent, #000 22%, #000 78%, transparent)",WebkitMaskImage:"linear-gradient(transparent, #000 22%, #000 78%, transparent)"},children:(0,a.jsx)("span",{className:"absolute inset-x-0 top-0 flex flex-col items-center",style:{transform:`translateY(${-e*1.3}em)`,transition:`transform .42s ${ce}`},children:Array.from({length:10},(t,r)=>(0,a.jsx)("span",{className:"block h-[1.3em] leading-[1.3]",children:r},r))})})}function ln({text:e}){let t=e.split("");return(0,a.jsx)("span",{className:"inline-flex items-center","aria-hidden":"true",children:t.map((r,s)=>{let c=t.length-s;return/\d/.test(r)?(0,a.jsx)(de,{d:Number(r)},`d${c}`):(0,a.jsx)("span",{className:"inline-block leading-[1.3]",children:r},`c${c}`)})})}function Un(e,t){let r=_(e),s=Math.floor(r/60),c=r%60;return t==="24h"?{text:`${A(s)}:${A(c)}`,ampm:""}:{text:`${s%12||12}:${A(c)}`,ampm:s<12?"AM":"PM"}}var C=34;function kn({items:e,index:t,onChange:r,label:s,color:c,width:u}){let g=o.useRef(null),w=o.useRef(void 0),P=o.useCallback(()=>{let p=g.current;if(!p)return;let y=p.scrollTop/C,N=p.children;for(let $=1;$<N.length-1;$++){let I=$-1-y,v=Math.max(-1,Math.min(1,I/2.6)),W=N[$];W.style.transform=`perspective(400px) rotateX(${-v*62}deg) scale(${1-Math.abs(v)*.12})`,W.style.opacity=String(1-Math.min(1,Math.abs(I)/2.7)*.75)}},[]);o.useLayoutEffect(()=>{let p=g.current;p&&(p.scrollTop=t*C,P())},[]);let x=p=>g.current?.scrollTo({top:Math.max(0,Math.min(e.length-1,p))*C,behavior:"smooth"});return(0,a.jsxs)("div",{ref:g,role:"spinbutton",tabIndex:0,"aria-label":s,"aria-valuenow":t,"aria-valuetext":e[t],onScroll:()=>{requestAnimationFrame(P),clearTimeout(w.current),w.current=setTimeout(()=>{let p=g.current;p&&r(Math.max(0,Math.min(e.length-1,Math.round(p.scrollTop/C))))},90)},onKeyDown:p=>{if(p.key==="ArrowUp")x(t-1);else if(p.key==="ArrowDown")x(t+1);else return;p.preventDefault()},className:"relative h-[170px] snap-y snap-mandatory overflow-y-scroll overscroll-contain outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",style:{width:u,color:c},children:[(0,a.jsx)("div",{style:{height:C*2}}),e.map((p,y)=>(0,a.jsx)("div",{onClick:()=>x(y),className:"flex snap-center items-center justify-center text-[21px] tabular-nums",style:{height:C},children:p},p+y)),(0,a.jsx)("div",{style:{height:C*2}})]})}function ue({value:e,format:t,theme:r,onPick:s,onNow:c,onClose:u}){let g=Math.floor(e/60),w=e%60,P=t==="24h"?Array.from({length:24},(f,m)=>A(m)):Array.from({length:12},(f,m)=>String(m+1)),x=Array.from({length:60},(f,m)=>A(m)),p=t==="24h"?g:(g%12||12)-1,y=g>=12,N=f=>s((t==="24h"?f:(f+1)%12+(y?12:0))*60+w),$=f=>s(g*60+f),I=f=>s((g%12+(f?12:0))*60+w),v=o.useRef(null),[W,O]=o.useState(!1);return o.useLayoutEffect(()=>{let f=v.current,m=f?.parentElement;if(!f||!m)return;let H=m.getBoundingClientRect(),i=f.getBoundingClientRect().height;O(H.bottom+i+8>window.innerHeight&&H.top-i-8>0)},[]),o.useEffect(()=>{let f=v.current?.parentElement,m=i=>!f?.contains(i.target)&&u(),H=i=>i.key==="Escape"&&u();return document.addEventListener("pointerdown",m),document.addEventListener("keydown",H),v.current?.querySelector("[role=spinbutton]")?.focus({preventScroll:!0}),()=>{document.removeEventListener("pointerdown",m),document.removeEventListener("keydown",H)}},[u]),(0,a.jsxs)("div",{ref:v,role:"dialog","aria-label":"Start time",className:`absolute left-0 z-50 rounded-[14px] p-2 [animation:tr-pop_.24s_cubic-bezier(.2,.9,.25,1)] ${W?"bottom-[calc(100%+8px)] origin-bottom-left":"top-[calc(100%+8px)] origin-top-left"}`,style:{width:t==="12h"?268:220,background:r.material,backdropFilter:"blur(30px) saturate(180%)",WebkitBackdropFilter:"blur(30px) saturate(180%)",boxShadow:r.popShadow},children:[(0,a.jsx)("style",{children:"@keyframes tr-pop{from{opacity:0;transform:scale(.92) translateY(-4px)}to{opacity:1;transform:none}}"}),(0,a.jsxs)("div",{className:"flex items-center justify-between px-2 pb-1 pt-0.5",children:[(0,a.jsx)("span",{className:"text-[13px]",style:{color:r.secondary},children:"Starts at"}),(0,a.jsx)("button",{type:"button",onClick:c,className:"rounded-full px-2.5 py-1 text-[13px] font-medium",style:{color:r.blue,background:`${r.blue}1f`},children:"Now"})]}),(0,a.jsxs)("div",{className:"relative flex items-center justify-center",children:[(0,a.jsx)("div",{className:"pointer-events-none absolute inset-x-1 top-1/2 -translate-y-1/2 rounded-[8px]",style:{height:C,background:r.fill}}),(0,a.jsx)(kn,{items:P,index:p,onChange:N,label:"Hours",color:r.label,width:62}),(0,a.jsx)("span",{className:"relative pb-0.5 text-[21px]",style:{color:r.label},children:":"}),(0,a.jsx)(kn,{items:x,index:w,onChange:$,label:"Minutes",color:r.label,width:62}),t==="12h"&&(0,a.jsx)(kn,{items:["AM","PM"],index:y?1:0,onChange:I,label:"AM or PM",color:r.label,width:58})]}),(0,a.jsx)("div",{className:"mt-1 border-t pt-1",style:{borderColor:r.separator,borderTopWidth:.5},children:(0,a.jsx)("button",{type:"button",onClick:u,className:"h-9 w-full rounded-[10px] text-[15px] font-semibold",style:{color:r.blue},children:"Done"})})]})}function Yn({start:e="13:37",startEditable:t=!0,onStartChange:r,defaultValue:s=494,value:c,onChange:u,min:g=0,maxHours:w=24,blocked:P=[],step:x=1,presets:p=[15,30,60,480],labels:y=!0,format:N="24h",theme:$="dark",accent:I,formatBadge:v,easterEggs:W=!0,intro:O=!0,name:f,disabled:m=!1,className:H=""}){let i=ie[$],B=I??i.red,b=Math.max(1,w)*60,[Sn,En]=o.useState(e);o.useEffect(()=>En(e),[e]);let Q=Sn==="now",[Vn,Nn]=o.useState(()=>vn());o.useEffect(()=>{if(!Q)return;Nn(vn());let n=setInterval(()=>Nn(vn()),1e3);return()=>clearInterval(n)},[Q]);let M=Q?Vn:sn(Sn),[pn,$n]=o.useState(!1),Dn=n=>{En(n),r?.(n)},qn=o.useCallback(()=>$n(!1),[]),Fn=P.map(n=>({off:_(sn(n.from)-M),len:_(sn(n.to)-sn(n.from))||1440})).filter(n=>n.off<b),D=Math.min(b,...Fn.filter(n=>n.off>0).map(n=>n.off)),L=Math.min(Math.max(0,g),D),dn=o.useCallback(n=>Math.min(D,Math.max(L,n)),[D,L]),[Jn,Qn]=o.useState(s),d=dn(c??Jn),un=M+d,U=o.useMemo(()=>On(M,d),[M,d]),S=o.useCallback(n=>{if(m)return;let l=dn(Math.round(n/x)*x);c===void 0&&Qn(l),u?.(l,On(M,l))},[dn,c,m,u,M,x]),mn=W&&!v?pe[J(un)]:void 0,[k,Tn]=o.useState(void 0);o.useEffect(()=>{if(!mn){Tn(void 0);return}let n=setTimeout(()=>Tn(mn),320);return()=>clearTimeout(n)},[mn]);let Z=[5,10,15,30,60,120,180].find(n=>b/n<=24)??240,Cn=[15,30,60,120,180,240,360,480,720].find(n=>b/n<=4&&n%Z===0)??b,nn=o.useMemo(()=>Array.from({length:Math.floor(b/Z)+1},(n,l)=>l*Z),[b,Z]),z=4,Y=n=>`calc(${z}px + ${n/b} * (100% - ${z*2}px))`,en=o.useRef(null),tn=o.useRef(null),fn=o.useRef(null),Hn=o.useRef(null),Ln=o.useRef([]),G=o.useRef({target:O?0:d,pos:O?0:d,vel:0,bpos:O?0:d,bvel:0,raf:0}),j=o.useCallback(()=>{let n=G.current;if(n.raf)return;let l=()=>{let h=tn.current,F=en.current;if(!h||!F){n.raf=0;return}n.vel=(n.vel+(n.target-n.pos)*.2)*.68,n.pos+=n.vel,n.bvel=(n.bvel+(n.pos-n.bpos)*.11)*.74,n.bpos+=n.bvel;let ne=h.offsetWidth-z*2,bn=E=>z+E/b*ne,In=bn(n.pos);fn.current&&(fn.current.style.transform=`translateX(${In-1}px)`),Ln.current.forEach((E,wn)=>{if(!E)return;let an=Math.abs(bn(nn[wn]??0)-In)/24,rn=Math.max(0,1-an*an);E.style.transform=`scaleY(${.6+rn*.4})`,E.style.opacity=String(.6+rn*.4)});let xn=Hn.current;if(xn){let E=xn.offsetWidth,wn=F.offsetWidth,an=Math.min(wn-E/2-6,Math.max(E/2+6,h.offsetLeft+bn(n.bpos))),rn=Math.max(-7,Math.min(7,n.bvel*(360/b)*2.4));xn.style.transform=`translateX(${an-E/2}px) rotate(${rn}deg)`}if(Math.abs(n.vel)<.01&&Math.abs(n.target-n.pos)<.01&&Math.abs(n.bvel)<.01&&Math.abs(n.pos-n.bpos)<.01){n.pos=n.bpos=n.target,n.raf=0;return}n.raf=requestAnimationFrame(l)};n.raf=requestAnimationFrame(l)},[b,nn]);o.useEffect(()=>{G.current.target=d,j()},[d,j]),o.useEffect(()=>{G.current.bvel+=1e-4,j()},[k,d,M,j]),o.useEffect(()=>{let n=new ResizeObserver(()=>j());en.current&&n.observe(en.current);let l=G.current;return()=>{n.disconnect(),cancelAnimationFrame(l.raf),l.raf=0}},[j]);let zn=n=>{let l=tn.current,h=l.getBoundingClientRect(),F=h.width/l.offsetWidth;return(n-h.left-z*F)/(h.width-z*2*F)*b},[An,hn]=o.useState(!1);o.useEffect(()=>{let n=tn.current;if(!n)return;let l=h=>{if(m)return;h.preventDefault();let F=Math.abs(h.deltaX)>Math.abs(h.deltaY)?h.deltaX:h.deltaY;S(G.current.target+Math.sign(F)*Math.max(x,Math.min(30,Math.abs(F)*.5)))};return n.addEventListener("wheel",l,{passive:!1}),()=>n.removeEventListener("wheel",l)},[S,x,m]);let K=Un(M,N),V=Un(un,N),Pn="flex h-11 shrink-0 items-center justify-center gap-1 rounded-[12px] px-3 text-[15px] font-semibold tabular-nums",Zn=v?.(d,U),gn={"--tw-ring-color":i.blue};return(0,a.jsxs)("div",{ref:en,className:`relative w-full max-w-[380px] rounded-[20px] px-3.5 pb-3.5 pt-4 ${m?"pointer-events-none opacity-50":""} ${H}`,style:{background:i.card,boxShadow:i.cardShadow,fontFamily:le,letterSpacing:"-0.01em",WebkitFontSmoothing:"antialiased"},children:[f&&(0,a.jsx)("input",{type:"hidden",name:f,value:d}),(0,a.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsxs)("button",{type:"button",disabled:!t,"aria-haspopup":"dialog","aria-expanded":pn,onClick:()=>$n(n=>!n),className:`${Pn} outline-none transition-colors focus-visible:ring-2`,style:{...gn,background:pn?i.fillHi:i.fill,color:i.label,cursor:t?"pointer":"default"},children:[(0,a.jsx)("span",{className:"sr-only",children:`Starts ${K.text} ${K.ampm}`}),(0,a.jsx)(ln,{text:K.text}),K.ampm&&(0,a.jsx)("span",{className:"text-[13px] font-medium",style:{color:i.secondary},children:K.ampm}),Q&&(0,a.jsx)("span",{className:"ml-0.5 h-1.5 w-1.5 rounded-full",style:{background:i.blue},"aria-hidden":"true"})]}),pn&&(0,a.jsx)(ue,{value:M,format:N,theme:i,onPick:n=>Dn(J(n)),onNow:()=>Dn("now"),onClose:qn})]}),(0,a.jsxs)("div",{ref:tn,role:"slider",tabIndex:m?-1:0,"aria-label":"Duration","aria-valuemin":L,"aria-valuemax":D,"aria-valuenow":d,"aria-valuetext":`${X(d)}, ends at ${J(un)}${U.nextDay?" tomorrow":""}`,"aria-disabled":m,onPointerDown:n=>{n.currentTarget.setPointerCapture(n.pointerId),hn(!0),S(zn(n.clientX))},onPointerMove:n=>An&&S(zn(n.clientX)),onPointerUp:()=>hn(!1),onPointerCancel:()=>hn(!1),onKeyDown:n=>{let l=n.shiftKey?15:x;if(n.key==="ArrowRight"||n.key==="ArrowUp")S(d+l);else if(n.key==="ArrowLeft"||n.key==="ArrowDown")S(d-l);else if(n.key==="Home")S(L);else if(n.key==="End")S(D);else return;n.preventDefault()},className:"relative h-11 min-w-0 flex-1 touch-none select-none rounded-lg outline-none focus-visible:ring-2",style:{...gn,cursor:An?"grabbing":"grab"},children:[(0,a.jsxs)("div",{className:"pointer-events-none absolute inset-x-0 top-1/2 h-[28px] -translate-y-1/2",children:[L>0&&(0,a.jsx)("div",{className:"absolute inset-y-[-3px] left-0 rounded-[4px]",style:{width:Y(L),background:i.fill}}),D<b&&(0,a.jsx)("div",{className:"absolute inset-y-[-3px] right-0 rounded-[4px]",style:{left:Y(D),background:i.fill}}),Fn.map((n,l)=>(0,a.jsx)("div",{className:"absolute inset-y-[-3px] rounded-[4px]",style:{left:Y(n.off),width:`calc(${Math.min(n.len,b-n.off)/b} * (100% - ${z*2}px))`,background:`repeating-linear-gradient(135deg, ${i.tertiary} 0 1.5px, transparent 1.5px 5px)`}},l)),nn.map((n,l)=>(0,a.jsx)("span",{ref:h=>{Ln.current[l]=h},className:"absolute top-0 h-full w-px origin-center rounded-full",style:{left:Y(n),background:n%Cn===0?i.tickHot:i.tick,transform:"scaleY(.6)"}},n)),(0,a.jsx)("div",{ref:fn,className:"absolute left-0 top-[-3px] h-[34px] w-[2px] rounded-full",style:{background:B,boxShadow:`0 0 10px ${B}`}})]}),y&&(0,a.jsx)("div",{className:"pointer-events-none absolute inset-x-0 -bottom-3.5 h-3 text-[10px] font-medium tabular-nums",style:{color:i.tertiary},"aria-hidden":"true",children:nn.filter(n=>n%Cn===0).map(n=>(0,a.jsx)("span",{className:"absolute -translate-x-1/2 leading-3",style:{left:Y(n)},children:n%60?`${n}m`:`${n/60}h`},n))})]}),(0,a.jsxs)("div",{className:`${Pn} relative`,style:{background:i.fill,color:i.label},children:[(0,a.jsx)("span",{className:"sr-only",children:`Ends ${V.text} ${V.ampm}${U.nextDay?", next day":""}`}),(0,a.jsx)(ln,{text:V.text}),V.ampm&&(0,a.jsx)("span",{className:"text-[13px] font-medium",style:{color:i.secondary},children:V.ampm}),(0,a.jsx)("span",{className:"absolute right-1 top-0.5 text-[10px] font-semibold transition-[opacity,transform] duration-300",style:{color:i.secondary,opacity:U.nextDay?1:0,transform:U.nextDay?"none":"translateY(3px)"},"aria-hidden":"true",children:"+1"})]})]}),p.length>0&&(0,a.jsx)("div",{className:`flex flex-wrap gap-1.5 ${y?"mt-6":"mt-3"}`,children:p.map(n=>{let l=n===d,h=n<L||n>D;return(0,a.jsx)("button",{type:"button",disabled:h,"aria-pressed":l,onClick:()=>S(n),className:"h-7 rounded-full px-3 text-[13px] font-medium tabular-nums outline-none transition-colors duration-200 focus-visible:ring-2 disabled:opacity-35",style:{...gn,background:l?`${B}26`:i.fill,color:l?B:i.label},children:X(n)},n)})}),(0,a.jsx)("div",{ref:Hn,"aria-live":"polite",className:"pointer-events-none absolute left-0 top-[-12px] flex h-[26px] items-center whitespace-nowrap rounded-full px-2.5 text-[13px] font-semibold tabular-nums text-white will-change-transform",style:{background:B,boxShadow:`0 4px 14px ${B}59`},children:(0,a.jsxs)("span",{className:"relative flex items-center justify-center",children:[(0,a.jsx)("span",{className:"inset-0 flex items-center justify-center gap-1 transition-[opacity,filter,transform] duration-300",style:{position:k?"absolute":"relative",opacity:k?0:1,filter:k?"blur(4px)":"none",transform:k?"translateY(-7px)":"none"},children:Zn??(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{className:"sr-only",children:X(d)}),(d>=60||d===0)&&(0,a.jsx)(ln,{text:`${Math.floor(d/60)}h`}),d%60>0&&(0,a.jsx)(ln,{text:`${d%60}m`})]})}),(0,a.jsx)("span",{className:"inset-0 flex items-center justify-center leading-[1.3] transition-[opacity,filter,transform] duration-300",style:{position:k?"relative":"absolute",opacity:k?1:0,filter:k?"none":"blur(4px)",transform:k?"none":"translateY(7px)"},children:k??""})]})})]})}var R=T(q()),me={darkMode:!0,format24h:!0,hourLabels:!0,presets:!0,easterEggs:!0},Rn=[{id:"default",label:"Default",hint:"Drag, scroll or use arrow keys. Tap the start time to change it. Try landing on 04:20.",props:()=>({start:"13:37",defaultValue:494,presets:[15,30,60,480]})},{id:"sleep",label:"Sleep",hint:"Bedtime \u2192 wake-up. Ends tomorrow, so the end shows +1.",props:e=>({start:"23:30",defaultValue:480,step:15,maxHours:12,presets:[360,450,480,540],accent:e?"#5E5CE6":"#5856D6",easterEggs:!1})},{id:"room",label:"Room",hint:"Meeting room, 30 min minimum, booked from 17:00. Badge shows the price.",props:e=>({start:"14:00",defaultValue:90,min:30,step:15,maxHours:6,blocked:[{from:"17:00",to:"18:00"}],presets:[30,60,90,120],accent:e?"#0A84FF":"#007AFF",formatBadge:t=>`${X(t)} \xB7 $${Math.round(t/60*24)}`})},{id:"focus",label:"Focus",hint:"Do Not Disturb from now. The start follows the clock.",props:e=>({start:"now",defaultValue:60,step:5,maxHours:12,presets:[30,60,120,240],accent:e?"#BF5AF2":"#AF52DE",formatBadge:t=>`Silenced \xB7 ${X(t)}`})}];function fe({items:e,value:t,onChange:r,dark:s}){let c=Math.max(0,e.findIndex(u=>u.id===t));return(0,R.jsxs)("div",{role:"tablist",className:"relative grid h-8 rounded-[9px] p-[2px]",style:{gridTemplateColumns:`repeat(${e.length}, minmax(0, 1fr))`,background:s?"rgba(118,118,128,.24)":"rgba(118,118,128,.12)",width:e.length*82},children:[(0,R.jsx)("div",{className:"absolute bottom-[2px] top-[2px] rounded-[7px] transition-transform duration-300 [transition-timing-function:cubic-bezier(.2,.9,.25,1)]",style:{left:2,width:`calc((100% - 4px) / ${e.length})`,transform:`translateX(${c*100}%)`,background:s?"#636366":"#FFFFFF",boxShadow:"0 3px 8px rgba(0,0,0,.12), 0 3px 1px rgba(0,0,0,.04)"}}),e.map(u=>(0,R.jsx)("button",{role:"tab",type:"button","aria-selected":u.id===t,onClick:()=>r(u.id),className:"relative z-10 text-[13px] outline-none",style:{color:s?"#fff":"#000",fontWeight:u.id===t?600:500},children:u.label},u.id))]})}function cn(e){let t={...me,...e},r=t.darkMode,[s,c]=Gn.useState("default"),u=Rn.find(w=>w.id===s)??Rn[0],g=u.props(r);return(0,R.jsxs)("div",{className:"flex min-h-screen w-full flex-col items-center justify-center gap-10 px-4 py-16",style:{fontFamily:"-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, 'Segoe UI', Roboto, sans-serif",backgroundColor:r?"#000000":"#F2F2F7",backgroundImage:`radial-gradient(circle, ${r?"rgba(255,255,255,.06)":"rgba(0,0,0,.07)"} 0 1px, transparent 1.4px)`,backgroundSize:"20px 13px",backgroundPosition:"-6px -1px"},children:[(0,R.jsx)(fe,{items:Rn,value:s,onChange:c,dark:r}),(0,R.jsx)("div",{className:"flex w-full justify-center sm:scale-[1.25]",children:(0,R.jsx)(Yn,{theme:r?"dark":"light",format:t.format24h?"24h":"12h",labels:t.hourLabels,easterEggs:t.easterEggs,...g,presets:t.presets?g.presets:[]},s)}),(0,R.jsx)("p",{className:"m-0 max-w-[340px] text-center text-[13px] leading-[18px] sm:mt-4",style:{color:r?"rgba(235,235,245,.6)":"rgba(60,60,67,.6)"},children:u.hint})]})}(window.__UI=window.__UI||{})["time-ruler"]={css:`/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
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
  .inset-0 {
    inset: 0px;
  }
  .inset-x-0 {
    inset-inline: 0px;
  }
  .inset-x-1 {
    inset-inline: var(--spacing);
  }
  .inset-y-\\[-3px\\] {
    inset-block: -3px;
  }
  .top-0 {
    top: 0px;
  }
  .top-0\\.5 {
    top: calc(var(--spacing) * 0.5);
  }
  .top-1\\/2 {
    top: calc(1 / 2 * 100%);
  }
  .top-\\[-3px\\] {
    top: -3px;
  }
  .top-\\[-12px\\] {
    top: -12px;
  }
  .top-\\[2px\\] {
    top: 2px;
  }
  .right-0 {
    right: 0px;
  }
  .right-1 {
    right: var(--spacing);
  }
  .-bottom-3\\.5 {
    bottom: calc(var(--spacing) * -3.5);
  }
  .bottom-\\[2px\\] {
    bottom: 2px;
  }
  .left-0 {
    left: 0px;
  }
  .z-10 {
    z-index: 10;
  }
  .z-50 {
    z-index: 50;
  }
  .m-0 {
    margin: 0px;
  }
  .mt-1 {
    margin-top: var(--spacing);
  }
  .mt-3 {
    margin-top: calc(var(--spacing) * 3);
  }
  .mt-6 {
    margin-top: calc(var(--spacing) * 6);
  }
  .ml-0\\.5 {
    margin-left: calc(var(--spacing) * 0.5);
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
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .h-1\\.5 {
    height: calc(var(--spacing) * 1.5);
  }
  .h-3 {
    height: calc(var(--spacing) * 3);
  }
  .h-7 {
    height: calc(var(--spacing) * 7);
  }
  .h-8 {
    height: calc(var(--spacing) * 8);
  }
  .h-9 {
    height: calc(var(--spacing) * 9);
  }
  .h-11 {
    height: calc(var(--spacing) * 11);
  }
  .h-\\[1\\.3em\\] {
    height: 1.3em;
  }
  .h-\\[26px\\] {
    height: 26px;
  }
  .h-\\[28px\\] {
    height: 28px;
  }
  .h-\\[34px\\] {
    height: 34px;
  }
  .h-\\[170px\\] {
    height: 170px;
  }
  .h-full {
    height: 100%;
  }
  .min-h-screen {
    min-height: 100vh;
  }
  .w-1\\.5 {
    width: calc(var(--spacing) * 1.5);
  }
  .w-\\[2px\\] {
    width: 2px;
  }
  .w-full {
    width: 100%;
  }
  .w-px {
    width: 1px;
  }
  .max-w-\\[340px\\] {
    max-width: 340px;
  }
  .max-w-\\[380px\\] {
    max-width: 380px;
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
  .origin-bottom-left {
    transform-origin: 0 100%;
  }
  .origin-center {
    transform-origin: center;
  }
  .origin-top-left {
    transform-origin: 0 0;
  }
  .-translate-x-1\\/2 {
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-y-1\\/2 {
    --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .touch-none {
    touch-action: none;
  }
  .snap-y {
    scroll-snap-type: y var(--tw-scroll-snap-strictness);
  }
  .snap-mandatory {
    --tw-scroll-snap-strictness: mandatory;
  }
  .snap-center {
    scroll-snap-align: center;
  }
  .\\[scrollbar-width\\:none\\] {
    scrollbar-width: none;
  }
  .flex-col {
    flex-direction: column;
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
  .gap-1 {
    gap: var(--spacing);
  }
  .gap-1\\.5 {
    gap: calc(var(--spacing) * 1.5);
  }
  .gap-2\\.5 {
    gap: calc(var(--spacing) * 2.5);
  }
  .gap-10 {
    gap: calc(var(--spacing) * 10);
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-y-scroll {
    overflow-y: scroll;
  }
  .overscroll-contain {
    overscroll-behavior: contain;
  }
  .rounded-\\[4px\\] {
    border-radius: 4px;
  }
  .rounded-\\[7px\\] {
    border-radius: 7px;
  }
  .rounded-\\[8px\\] {
    border-radius: 8px;
  }
  .rounded-\\[9px\\] {
    border-radius: 9px;
  }
  .rounded-\\[10px\\] {
    border-radius: 10px;
  }
  .rounded-\\[12px\\] {
    border-radius: 12px;
  }
  .rounded-\\[14px\\] {
    border-radius: 14px;
  }
  .rounded-\\[20px\\] {
    border-radius: 20px;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius);
  }
  .border-t {
    border-top-style: var(--tw-border-style);
    border-top-width: 1px;
  }
  .p-2 {
    padding: calc(var(--spacing) * 2);
  }
  .p-\\[2px\\] {
    padding: 2px;
  }
  .px-2 {
    padding-inline: calc(var(--spacing) * 2);
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
  .py-1 {
    padding-block: var(--spacing);
  }
  .py-16 {
    padding-block: calc(var(--spacing) * 16);
  }
  .pt-0\\.5 {
    padding-top: calc(var(--spacing) * 0.5);
  }
  .pt-1 {
    padding-top: var(--spacing);
  }
  .pt-4 {
    padding-top: calc(var(--spacing) * 4);
  }
  .pb-0\\.5 {
    padding-bottom: calc(var(--spacing) * 0.5);
  }
  .pb-1 {
    padding-bottom: var(--spacing);
  }
  .pb-3\\.5 {
    padding-bottom: calc(var(--spacing) * 3.5);
  }
  .text-center {
    text-align: center;
  }
  .text-\\[10px\\] {
    font-size: 10px;
  }
  .text-\\[13px\\] {
    font-size: 13px;
  }
  .text-\\[15px\\] {
    font-size: 15px;
  }
  .text-\\[21px\\] {
    font-size: 21px;
  }
  .leading-3 {
    --tw-leading: calc(var(--spacing) * 3);
    line-height: calc(var(--spacing) * 3);
  }
  .leading-\\[1\\.3\\] {
    --tw-leading: 1.3;
    line-height: 1.3;
  }
  .leading-\\[18px\\] {
    --tw-leading: 18px;
    line-height: 18px;
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .text-white {
    color: var(--color-white);
  }
  .tabular-nums {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .opacity-50 {
    opacity: 50%;
  }
  .ring {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .blur {
    --tw-blur: blur(8px);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .filter {
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-transform {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .duration-200 {
    --tw-duration: 200ms;
    transition-duration: 200ms;
  }
  .duration-300 {
    --tw-duration: 300ms;
    transition-duration: 300ms;
  }
  .will-change-transform {
    will-change: transform;
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
  .disabled\\:opacity-35:disabled {
    opacity: 35%;
  }
  @media (width >= 40rem) {
    .sm\\:mt-4 {
      margin-top: calc(var(--spacing) * 4);
    }
    .sm\\:scale-\\[1\\.25\\] {
      scale: 1.25;
    }
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
      --tw-scroll-snap-strictness: proximity;
      --tw-border-style: solid;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-ordinal: initial;
      --tw-slashed-zero: initial;
      --tw-numeric-figure: initial;
      --tw-numeric-spacing: initial;
      --tw-numeric-fraction: initial;
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
      --tw-duration: initial;
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
@property --tw-duration {
  syntax: "*";
  inherits: false;
}`,settings:{darkMode:!0,format24h:!0,hourLabels:!0,presets:!0,easterEggs:!0},themeable:!0,files:[["component.tsx",`"use client";

import * as React from "react";

/* ------------------------------------------------------------------ */
/*  TimeRuler \u2014 pick a duration on a draggable ruler.                  */
/*  Styled after Apple HIG: system fonts, system colours, materials.   */
/* ------------------------------------------------------------------ */

export type TimeRulerDetail = {
  /** duration in minutes */
  minutes: number;
  start: Date;
  end: Date;
  /** "HH:MM" 24h */
  startLabel: string;
  endLabel: string;
  /** end falls on a later day than start */
  nextDay: boolean;
};

export type BlockedRange = { from: string; to: string };

export type TimeRulerProps = {
  /** start time, "HH:MM" (24h) or "now" (follows the clock). Default "13:37". */
  start?: string;
  /** let people change the start in a popover picker. Default true. */
  startEditable?: boolean;
  onStartChange?: (start: string) => void;
  /** initial duration in minutes. Default 494 (8h 14m). */
  defaultValue?: number;
  /** controlled duration in minutes */
  value?: number;
  onChange?: (minutes: number, detail: TimeRulerDetail) => void;
  /** shortest allowed duration, minutes. Default 0. */
  min?: number;
  /** length of the ruler, hours. Default 24. */
  maxHours?: number;
  /** clock ranges the end can't cross, e.g. a booked room: [{ from: "17:00", to: "18:00" }] */
  blocked?: BlockedRange[];
  /** snap step in minutes. Default 1. */
  step?: number;
  /** quick chips under the ruler, in minutes. Pass [] to hide. */
  presets?: number[];
  /** show hour labels under the ruler. Default true. */
  labels?: boolean;
  format?: "24h" | "12h";
  theme?: "dark" | "light";
  /** tint for badge, cursor and active chips. Defaults to HIG systemRed. */
  accent?: string;
  /** replace the badge text, e.g. add a price */
  formatBadge?: (minutes: number, detail: TimeRulerDetail) => React.ReactNode;
  /** playful labels on 04:20, 13:37, 11:11 \u2026 */
  easterEggs?: boolean;
  /** sweep the cursor in on mount */
  intro?: boolean;
  /** form field name; submits the duration in minutes */
  name?: string;
  disabled?: boolean;
  className?: string;
};

/* HIG system colours */
const THEMES = {
  dark: {
    card: "#1C1C1E",
    fill: "rgba(118,118,128,.24)",
    fillHi: "rgba(118,118,128,.36)",
    label: "#FFFFFF",
    secondary: "rgba(235,235,245,.6)",
    tertiary: "rgba(235,235,245,.3)",
    separator: "rgba(84,84,88,.65)",
    tick: "rgba(235,235,245,.22)",
    tickHot: "rgba(235,235,245,.6)",
    material: "rgba(44,44,46,.8)",
    red: "#FF453A",
    blue: "#0A84FF",
    cardShadow: "0 0 0 .5px rgba(255,255,255,.06), 0 12px 40px rgba(0,0,0,.45)",
    popShadow: "0 0 0 .5px rgba(255,255,255,.1), 0 18px 50px rgba(0,0,0,.55)",
  },
  light: {
    card: "#FFFFFF",
    fill: "rgba(118,118,128,.12)",
    fillHi: "rgba(118,118,128,.2)",
    label: "#000000",
    secondary: "rgba(60,60,67,.6)",
    tertiary: "rgba(60,60,67,.3)",
    separator: "rgba(60,60,67,.29)",
    tick: "rgba(60,60,67,.2)",
    tickHot: "rgba(60,60,67,.55)",
    material: "rgba(250,250,252,.82)",
    red: "#FF3B30",
    blue: "#007AFF",
    cardShadow: "0 0 0 .5px rgba(0,0,0,.05), 0 10px 30px rgba(0,0,0,.08)",
    popShadow: "0 0 0 .5px rgba(0,0,0,.08), 0 18px 50px rgba(0,0,0,.18)",
  },
} as const;
type Theme = (typeof THEMES)[keyof typeof THEMES];

const FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Inter, 'Segoe UI', Roboto, sans-serif";
const EASE = "cubic-bezier(.2,.9,.25,1)";

/* playful labels for the end time */
const EGGS: Record<string, string> = {
  "04:20": "blaze it",
  "16:20": "blaze it",
  "13:37": "leet",
  "11:11": "make a wish",
  "23:11": "make a wish",
  "03:14": "\u03C0 o'clock",
  "15:14": "\u03C0 o'clock",
  "04:04": "time not found",
  "12:34": "1-2-3-4",
  "00:00": "midnight",
  "12:00": "high noon",
  "07:47": "boarding",
  "10:10": "watch-ad time",
  "22:22": "d\xE9j\xE0 vu",
};

/* ---------- time helpers ---------- */

const pad = (n: number) => String(n).padStart(2, "0");
const wrap = (m: number) => ((m % 1440) + 1440) % 1440;
const parse = (s: string) => {
  const [h, m] = s.split(":").map(Number);
  return wrap((h || 0) * 60 + (m || 0));
};
const key24 = (mins: number) => \`\${pad(Math.floor(wrap(mins) / 60))}:\${pad(wrap(mins) % 60)}\`;
const nowMinutes = () => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};
/** "8h 14m", "45m", "2h" */
export const durLabel = (m: number) => {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return h && mm ? \`\${h}h \${mm}m\` : h ? \`\${h}h\` : \`\${mm}m\`;
};
const makeDetail = (startMin: number, v: number): TimeRulerDetail => {
  const s = new Date();
  s.setHours(Math.floor(startMin / 60), startMin % 60, 0, 0);
  const e = new Date(s.getTime() + v * 60000);
  return { minutes: v, start: s, end: e, startLabel: key24(startMin), endLabel: key24(startMin + v), nextDay: e.toDateString() !== s.toDateString() };
};

/* ---------- rolling digits ---------- */

function Digit({ d }: { d: number }) {
  return (
    <span
      className="relative inline-block h-[1.3em] overflow-hidden"
      style={{
        width: "0.6em",
        maskImage: "linear-gradient(transparent, #000 22%, #000 78%, transparent)",
        WebkitMaskImage: "linear-gradient(transparent, #000 22%, #000 78%, transparent)",
      }}
    >
      <span className="absolute inset-x-0 top-0 flex flex-col items-center" style={{ transform: \`translateY(\${-d * 1.3}em)\`, transition: \`transform .42s \${EASE}\` }}>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="block h-[1.3em] leading-[1.3]">
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

function Roll({ text }: { text: string }) {
  const chars = text.split("");
  return (
    <span className="inline-flex items-center" aria-hidden="true">
      {chars.map((c, i) => {
        const k = chars.length - i;
        return /\\d/.test(c) ? (
          <Digit key={\`d\${k}\`} d={Number(c)} />
        ) : (
          <span key={\`c\${k}\`} className="inline-block leading-[1.3]">
            {c}
          </span>
        );
      })}
    </span>
  );
}

function clockParts(mins: number, format: "24h" | "12h") {
  const t = wrap(mins);
  const h = Math.floor(t / 60);
  const m = t % 60;
  return format === "24h" ? { text: \`\${pad(h)}:\${pad(m)}\`, ampm: "" } : { text: \`\${h % 12 || 12}:\${pad(m)}\`, ampm: h < 12 ? "AM" : "PM" };
}

/* ---------- HIG wheel picker ---------- */

const ROW = 34;

function Wheel({ items, index, onChange, label, color, width }: { items: string[]; index: number; onChange: (i: number) => void; label: string; color: string; width: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const paint = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const c = el.scrollTop / ROW;
    const kids = el.children;
    for (let i = 1; i < kids.length - 1; i++) {
      const d = i - 1 - c;
      const a = Math.max(-1, Math.min(1, d / 2.6));
      const n = kids[i] as HTMLElement;
      n.style.transform = \`perspective(400px) rotateX(\${-a * 62}deg) scale(\${1 - Math.abs(a) * 0.12})\`;
      n.style.opacity = String(1 - Math.min(1, Math.abs(d) / 2.7) * 0.75);
    }
  }, []);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = index * ROW;
    paint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (i: number) => ref.current?.scrollTo({ top: Math.max(0, Math.min(items.length - 1, i)) * ROW, behavior: "smooth" });

  return (
    <div
      ref={ref}
      role="spinbutton"
      tabIndex={0}
      aria-label={label}
      aria-valuenow={index}
      aria-valuetext={items[index]}
      onScroll={() => {
        requestAnimationFrame(paint);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          const el = ref.current;
          if (el) onChange(Math.max(0, Math.min(items.length - 1, Math.round(el.scrollTop / ROW))));
        }, 90);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") go(index - 1);
        else if (e.key === "ArrowDown") go(index + 1);
        else return;
        e.preventDefault();
      }}
      className="relative h-[170px] snap-y snap-mandatory overflow-y-scroll overscroll-contain outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ width, color }}
    >
      <div style={{ height: ROW * 2 }} />
      {items.map((it, i) => (
        <div key={it + i} onClick={() => go(i)} className="flex snap-center items-center justify-center text-[21px] tabular-nums" style={{ height: ROW }}>
          {it}
        </div>
      ))}
      <div style={{ height: ROW * 2 }} />
    </div>
  );
}

function StartPicker({
  value,
  format,
  theme,
  onPick,
  onNow,
  onClose,
}: {
  value: number;
  format: "24h" | "12h";
  theme: Theme;
  onPick: (mins: number) => void;
  onNow: () => void;
  onClose: () => void;
}) {
  const h = Math.floor(value / 60);
  const m = value % 60;
  const hours = format === "24h" ? Array.from({ length: 24 }, (_, i) => pad(i)) : Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minutes = Array.from({ length: 60 }, (_, i) => pad(i));
  const hIndex = format === "24h" ? h : (h % 12 || 12) - 1;
  const pm = h >= 12;

  const setH = (i: number) => onPick((format === "24h" ? i : ((i + 1) % 12) + (pm ? 12 : 0)) * 60 + m);
  const setM = (i: number) => onPick(h * 60 + i);
  const setAP = (i: number) => onPick(((h % 12) + (i ? 12 : 0)) * 60 + m);

  const ref = React.useRef<HTMLDivElement>(null);
  /* open upwards when there is no room below */
  const [up, setUp] = React.useState(false);
  React.useLayoutEffect(() => {
    const el = ref.current;
    const anchor = el?.parentElement;
    if (!el || !anchor) return;
    const r = anchor.getBoundingClientRect();
    const h = el.getBoundingClientRect().height;
    setUp(r.bottom + h + 8 > window.innerHeight && r.top - h - 8 > 0);
  }, []);
  React.useEffect(() => {
    const anchor = ref.current?.parentElement;
    const onDown = (e: PointerEvent) => !anchor?.contains(e.target as Node) && onClose();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    (ref.current?.querySelector("[role=spinbutton]") as HTMLElement | null)?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Start time"
      className={\`absolute left-0 z-50 rounded-[14px] p-2 [animation:tr-pop_.24s_cubic-bezier(.2,.9,.25,1)] \${up ? "bottom-[calc(100%+8px)] origin-bottom-left" : "top-[calc(100%+8px)] origin-top-left"}\`}
      style={{
        width: format === "12h" ? 268 : 220,
        background: theme.material,
        backdropFilter: "blur(30px) saturate(180%)",
        WebkitBackdropFilter: "blur(30px) saturate(180%)",
        boxShadow: theme.popShadow,
      }}
    >
      <style>{\`@keyframes tr-pop{from{opacity:0;transform:scale(.92) translateY(-4px)}to{opacity:1;transform:none}}\`}</style>
      <div className="flex items-center justify-between px-2 pb-1 pt-0.5">
        <span className="text-[13px]" style={{ color: theme.secondary }}>
          Starts at
        </span>
        <button type="button" onClick={onNow} className="rounded-full px-2.5 py-1 text-[13px] font-medium" style={{ color: theme.blue, background: \`\${theme.blue}1f\` }}>
          Now
        </button>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="pointer-events-none absolute inset-x-1 top-1/2 -translate-y-1/2 rounded-[8px]" style={{ height: ROW, background: theme.fill }} />
        <Wheel items={hours} index={hIndex} onChange={setH} label="Hours" color={theme.label} width={62} />
        <span className="relative pb-0.5 text-[21px]" style={{ color: theme.label }}>
          :
        </span>
        <Wheel items={minutes} index={m} onChange={setM} label="Minutes" color={theme.label} width={62} />
        {format === "12h" && <Wheel items={["AM", "PM"]} index={pm ? 1 : 0} onChange={setAP} label="AM or PM" color={theme.label} width={58} />}
      </div>
      <div className="mt-1 border-t pt-1" style={{ borderColor: theme.separator, borderTopWidth: 0.5 }}>
        <button type="button" onClick={onClose} className="h-9 w-full rounded-[10px] text-[15px] font-semibold" style={{ color: theme.blue }}>
          Done
        </button>
      </div>
    </div>
  );
}

/* ---------- main ---------- */

export function TimeRuler({
  start = "13:37",
  startEditable = true,
  onStartChange,
  defaultValue = 494,
  value: controlled,
  onChange,
  min = 0,
  maxHours = 24,
  blocked = [],
  step = 1,
  presets = [15, 30, 60, 480],
  labels = true,
  format = "24h",
  theme = "dark",
  accent,
  formatBadge,
  easterEggs = true,
  intro = true,
  name,
  disabled = false,
  className = "",
}: TimeRulerProps) {
  const t = THEMES[theme];
  const tint = accent ?? t.red;
  const max = Math.max(1, maxHours) * 60;

  /* ---- start time: fixed or live "now" ---- */
  const [startState, setStartState] = React.useState(start);
  React.useEffect(() => setStartState(start), [start]);
  const live = startState === "now";
  const [clock, setClock] = React.useState(() => nowMinutes());
  React.useEffect(() => {
    if (!live) return;
    setClock(nowMinutes());
    const id = setInterval(() => setClock(nowMinutes()), 1000);
    return () => clearInterval(id);
  }, [live]);
  const startMin = live ? clock : parse(startState);
  const [picking, setPicking] = React.useState(false);
  const changeStart = (s: string) => {
    setStartState(s);
    onStartChange?.(s);
  };
  const closePicker = React.useCallback(() => setPicking(false), []);

  /* ---- allowed range: min \u2026 first blocked range ahead ---- */
  const zones = blocked
    .map((b) => ({ off: wrap(parse(b.from) - startMin), len: wrap(parse(b.to) - parse(b.from)) || 1440 }))
    .filter((z) => z.off < max);
  const hardMax = Math.min(max, ...zones.filter((z) => z.off > 0).map((z) => z.off));
  const lo = Math.min(Math.max(0, min), hardMax);
  const clamp = React.useCallback((v: number) => Math.min(hardMax, Math.max(lo, v)), [hardMax, lo]);

  const [inner, setInner] = React.useState(defaultValue);
  const value = clamp(controlled ?? inner);
  const end = startMin + value;
  const detail = React.useMemo(() => makeDetail(startMin, value), [startMin, value]);

  const set = React.useCallback(
    (raw: number) => {
      if (disabled) return;
      const v = clamp(Math.round(raw / step) * step);
      if (controlled === undefined) setInner(v);
      onChange?.(v, makeDetail(startMin, v));
    },
    [clamp, controlled, disabled, onChange, startMin, step],
  );

  /* ---- easter egg, revealed only once the value rests there ---- */
  const eggNow = easterEggs && !formatBadge ? EGGS[key24(end)] : undefined;
  const [egg, setEgg] = React.useState<string | undefined>(undefined);
  React.useEffect(() => {
    if (!eggNow) {
      setEgg(undefined);
      return;
    }
    const id = setTimeout(() => setEgg(eggNow), 320);
    return () => clearTimeout(id);
  }, [eggNow]);

  /* ---- ruler geometry ---- */
  const tickEvery = [5, 10, 15, 30, 60, 120, 180].find((s) => max / s <= 24) ?? 240;
  const labelEvery = [15, 30, 60, 120, 180, 240, 360, 480, 720].find((s) => max / s <= 4 && s % tickEvery === 0) ?? max;
  const ticks = React.useMemo(() => Array.from({ length: Math.floor(max / tickEvery) + 1 }, (_, i) => i * tickEvery), [max, tickEvery]);
  const INSET = 4;
  const pct = (v: number) => \`calc(\${INSET}px + \${v / max} * (100% - \${INSET * 2}px))\`;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const rulerRef = React.useRef<HTMLDivElement>(null);
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const badgeRef = React.useRef<HTMLDivElement>(null);
  const tickRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const sim = React.useRef({ target: intro ? 0 : value, pos: intro ? 0 : value, vel: 0, bpos: intro ? 0 : value, bvel: 0, raf: 0 });

  const kick = React.useCallback(() => {
    const s = sim.current;
    if (s.raf) return;
    const loop = () => {
      const ruler = rulerRef.current;
      const root = rootRef.current;
      if (!ruler || !root) {
        s.raf = 0;
        return;
      }
      s.vel = (s.vel + (s.target - s.pos) * 0.2) * 0.68;
      s.pos += s.vel;
      s.bvel = (s.bvel + (s.pos - s.bpos) * 0.11) * 0.74;
      s.bpos += s.bvel;

      const span = ruler.offsetWidth - INSET * 2;
      const toX = (v: number) => INSET + (v / max) * span;
      const cx = toX(s.pos);
      if (cursorRef.current) cursorRef.current.style.transform = \`translateX(\${cx - 1}px)\`;
      tickRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = Math.abs(toX(ticks[i] ?? 0) - cx) / 24;
        const g = Math.max(0, 1 - d * d);
        el.style.transform = \`scaleY(\${0.6 + g * 0.4})\`;
        el.style.opacity = String(0.6 + g * 0.4);
      });
      const b = badgeRef.current;
      if (b) {
        const bw = b.offsetWidth;
        const rw = root.offsetWidth;
        const bx = Math.min(rw - bw / 2 - 6, Math.max(bw / 2 + 6, ruler.offsetLeft + toX(s.bpos)));
        const tilt = Math.max(-7, Math.min(7, s.bvel * (360 / max) * 2.4));
        b.style.transform = \`translateX(\${bx - bw / 2}px) rotate(\${tilt}deg)\`;
      }
      const settled = Math.abs(s.vel) < 0.01 && Math.abs(s.target - s.pos) < 0.01 && Math.abs(s.bvel) < 0.01 && Math.abs(s.pos - s.bpos) < 0.01;
      if (settled) {
        s.pos = s.bpos = s.target;
        s.raf = 0;
        return;
      }
      s.raf = requestAnimationFrame(loop);
    };
    s.raf = requestAnimationFrame(loop);
  }, [max, ticks]);

  React.useEffect(() => {
    sim.current.target = value;
    kick();
  }, [value, kick]);
  React.useEffect(() => {
    sim.current.bvel += 0.0001; // re-centre the badge when its width changes
    kick();
  }, [egg, value, startMin, kick]);
  React.useEffect(() => {
    const ro = new ResizeObserver(() => kick());
    if (rootRef.current) ro.observe(rootRef.current);
    const s = sim.current;
    return () => {
      ro.disconnect();
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [kick]);

  const fromX = (clientX: number) => {
    const el = rulerRef.current!;
    const r = el.getBoundingClientRect();
    const k = r.width / el.offsetWidth; // handles CSS scale
    return ((clientX - r.left - INSET * k) / (r.width - INSET * 2 * k)) * max;
  };
  const [dragging, setDragging] = React.useState(false);

  React.useEffect(() => {
    const el = rulerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (disabled) return;
      e.preventDefault();
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      set(sim.current.target + Math.sign(d) * Math.max(step, Math.min(30, Math.abs(d) * 0.5)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [set, step, disabled]);

  const sp = clockParts(startMin, format);
  const ep = clockParts(end, format);
  const chip = "flex h-11 shrink-0 items-center justify-center gap-1 rounded-[12px] px-3 text-[15px] font-semibold tabular-nums";
  const badge = formatBadge?.(value, detail);
  const ring = { ["--tw-ring-color" as string]: t.blue } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={\`relative w-full max-w-[380px] rounded-[20px] px-3.5 pb-3.5 pt-4 \${disabled ? "pointer-events-none opacity-50" : ""} \${className}\`}
      style={{ background: t.card, boxShadow: t.cardShadow, fontFamily: FONT, letterSpacing: "-0.01em", WebkitFontSmoothing: "antialiased" }}
    >
      {name && <input type="hidden" name={name} value={value} />}

      <div className="flex items-center gap-2.5">
        {/* start */}
        <div className="relative">
          <button
            type="button"
            disabled={!startEditable}
            aria-haspopup="dialog"
            aria-expanded={picking}
            onClick={() => setPicking((p) => !p)}
            className={\`\${chip} outline-none transition-colors focus-visible:ring-2\`}
            style={{ ...ring, background: picking ? t.fillHi : t.fill, color: t.label, cursor: startEditable ? "pointer" : "default" }}
          >
            <span className="sr-only">{\`Starts \${sp.text} \${sp.ampm}\`}</span>
            <Roll text={sp.text} />
            {sp.ampm && (
              <span className="text-[13px] font-medium" style={{ color: t.secondary }}>
                {sp.ampm}
              </span>
            )}
            {live && <span className="ml-0.5 h-1.5 w-1.5 rounded-full" style={{ background: t.blue }} aria-hidden="true" />}
          </button>
          {picking && <StartPicker value={startMin} format={format} theme={t} onPick={(m) => changeStart(key24(m))} onNow={() => changeStart("now")} onClose={closePicker} />}
        </div>

        {/* ruler */}
        <div
          ref={rulerRef}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label="Duration"
          aria-valuemin={lo}
          aria-valuemax={hardMax}
          aria-valuenow={value}
          aria-valuetext={\`\${durLabel(value)}, ends at \${key24(end)}\${detail.nextDay ? " tomorrow" : ""}\`}
          aria-disabled={disabled}
          onPointerDown={(e) => {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            setDragging(true);
            set(fromX(e.clientX));
          }}
          onPointerMove={(e) => dragging && set(fromX(e.clientX))}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
          onKeyDown={(e) => {
            const big = e.shiftKey ? 15 : step;
            if (e.key === "ArrowRight" || e.key === "ArrowUp") set(value + big);
            else if (e.key === "ArrowLeft" || e.key === "ArrowDown") set(value - big);
            else if (e.key === "Home") set(lo);
            else if (e.key === "End") set(hardMax);
            else return;
            e.preventDefault();
          }}
          className="relative h-11 min-w-0 flex-1 touch-none select-none rounded-lg outline-none focus-visible:ring-2"
          style={{ ...ring, cursor: dragging ? "grabbing" : "grab" }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[28px] -translate-y-1/2">
            {/* out-of-range areas and blocked zones */}
            {lo > 0 && <div className="absolute inset-y-[-3px] left-0 rounded-[4px]" style={{ width: pct(lo), background: t.fill }} />}
            {hardMax < max && <div className="absolute inset-y-[-3px] right-0 rounded-[4px]" style={{ left: pct(hardMax), background: t.fill }} />}
            {zones.map((z, i) => (
              <div
                key={i}
                className="absolute inset-y-[-3px] rounded-[4px]"
                style={{
                  left: pct(z.off),
                  width: \`calc(\${Math.min(z.len, max - z.off) / max} * (100% - \${INSET * 2}px))\`,
                  background: \`repeating-linear-gradient(135deg, \${t.tertiary} 0 1.5px, transparent 1.5px 5px)\`,
                }}
              />
            ))}
            {ticks.map((v, i) => (
              <span
                key={v}
                ref={(el) => {
                  tickRefs.current[i] = el;
                }}
                className="absolute top-0 h-full w-px origin-center rounded-full"
                style={{ left: pct(v), background: v % labelEvery === 0 ? t.tickHot : t.tick, transform: "scaleY(.6)" }}
              />
            ))}
            <div ref={cursorRef} className="absolute left-0 top-[-3px] h-[34px] w-[2px] rounded-full" style={{ background: tint, boxShadow: \`0 0 10px \${tint}\` }} />
          </div>
          {labels && (
            <div className="pointer-events-none absolute inset-x-0 -bottom-3.5 h-3 text-[10px] font-medium tabular-nums" style={{ color: t.tertiary }} aria-hidden="true">
              {ticks
                .filter((v) => v % labelEvery === 0)
                .map((v) => (
                  <span key={v} className="absolute -translate-x-1/2 leading-3" style={{ left: pct(v) }}>
                    {v % 60 ? \`\${v}m\` : \`\${v / 60}h\`}
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* end */}
        <div className={\`\${chip} relative\`} style={{ background: t.fill, color: t.label }}>
          <span className="sr-only">{\`Ends \${ep.text} \${ep.ampm}\${detail.nextDay ? ", next day" : ""}\`}</span>
          <Roll text={ep.text} />
          {ep.ampm && (
            <span className="text-[13px] font-medium" style={{ color: t.secondary }}>
              {ep.ampm}
            </span>
          )}
          <span
            className="absolute right-1 top-0.5 text-[10px] font-semibold transition-[opacity,transform] duration-300"
            style={{ color: t.secondary, opacity: detail.nextDay ? 1 : 0, transform: detail.nextDay ? "none" : "translateY(3px)" }}
            aria-hidden="true"
          >
            +1
          </span>
        </div>
      </div>

      {/* presets */}
      {presets.length > 0 && (
        <div className={\`flex flex-wrap gap-1.5 \${labels ? "mt-6" : "mt-3"}\`}>
          {presets.map((p) => {
            const on = p === value;
            const off = p < lo || p > hardMax;
            return (
              <button
                key={p}
                type="button"
                disabled={off}
                aria-pressed={on}
                onClick={() => set(p)}
                className="h-7 rounded-full px-3 text-[13px] font-medium tabular-nums outline-none transition-colors duration-200 focus-visible:ring-2 disabled:opacity-35"
                style={{ ...ring, background: on ? \`\${tint}26\` : t.fill, color: on ? tint : t.label }}
              >
                {durLabel(p)}
              </button>
            );
          })}
        </div>
      )}

      {/* floating badge */}
      <div
        ref={badgeRef}
        aria-live="polite"
        className="pointer-events-none absolute left-0 top-[-12px] flex h-[26px] items-center whitespace-nowrap rounded-full px-2.5 text-[13px] font-semibold tabular-nums text-white will-change-transform"
        style={{ background: tint, boxShadow: \`0 4px 14px \${tint}59\` }}
      >
        <span className="relative flex items-center justify-center">
          <span
            className="inset-0 flex items-center justify-center gap-1 transition-[opacity,filter,transform] duration-300"
            style={{ position: egg ? "absolute" : "relative", opacity: egg ? 0 : 1, filter: egg ? "blur(4px)" : "none", transform: egg ? "translateY(-7px)" : "none" }}
          >
            {badge ?? (
              <>
                <span className="sr-only">{durLabel(value)}</span>
                {(value >= 60 || value === 0) && <Roll text={\`\${Math.floor(value / 60)}h\`} />}
                {value % 60 > 0 && <Roll text={\`\${value % 60}m\`} />}
              </>
            )}
          </span>
          <span
            className="inset-0 flex items-center justify-center leading-[1.3] transition-[opacity,filter,transform] duration-300"
            style={{ position: egg ? "relative" : "absolute", opacity: egg ? 1 : 0, filter: egg ? "none" : "blur(4px)", transform: egg ? "none" : "translateY(7px)" }}
          >
            {egg ?? ""}
          </span>
        </span>
      </div>
    </div>
  );
}

export default TimeRuler;
`],["demo.tsx",`"use client";

import * as React from "react";
import { TimeRuler, durLabel, type TimeRulerProps } from "@/components/ui/component";

/* Live controls (21st Demo Controls). */
const settings = {
  darkMode: true,
  format24h: true,
  hourLabels: true,
  presets: true,
  easterEggs: true,
};

type Scenario = { id: string; label: string; hint: string; props: (dark: boolean) => Partial<TimeRulerProps> };

/* real-world setups, each one a few props away */
const SCENARIOS: Scenario[] = [
  {
    id: "default",
    label: "Default",
    hint: "Drag, scroll or use arrow keys. Tap the start time to change it. Try landing on 04:20.",
    props: () => ({ start: "13:37", defaultValue: 494, presets: [15, 30, 60, 480] }),
  },
  {
    id: "sleep",
    label: "Sleep",
    hint: "Bedtime \u2192 wake-up. Ends tomorrow, so the end shows +1.",
    props: (dark) => ({
      start: "23:30",
      defaultValue: 480,
      step: 15,
      maxHours: 12,
      presets: [360, 450, 480, 540],
      accent: dark ? "#5E5CE6" : "#5856D6",
      easterEggs: false,
    }),
  },
  {
    id: "room",
    label: "Room",
    hint: "Meeting room, 30 min minimum, booked from 17:00. Badge shows the price.",
    props: (dark) => ({
      start: "14:00",
      defaultValue: 90,
      min: 30,
      step: 15,
      maxHours: 6,
      blocked: [{ from: "17:00", to: "18:00" }],
      presets: [30, 60, 90, 120],
      accent: dark ? "#0A84FF" : "#007AFF",
      formatBadge: (m) => \`\${durLabel(m)} \xB7 $\${Math.round((m / 60) * 24)}\`,
    }),
  },
  {
    id: "focus",
    label: "Focus",
    hint: "Do Not Disturb from now. The start follows the clock.",
    props: (dark) => ({
      start: "now",
      defaultValue: 60,
      step: 5,
      maxHours: 12,
      presets: [30, 60, 120, 240],
      accent: dark ? "#BF5AF2" : "#AF52DE",
      formatBadge: (m) => \`Silenced \xB7 \${durLabel(m)}\`,
    }),
  },
];

/* HIG segmented control */
function Segmented({ items, value, onChange, dark }: { items: { id: string; label: string }[]; value: string; onChange: (id: string) => void; dark: boolean }) {
  const i = Math.max(0, items.findIndex((x) => x.id === value));
  return (
    <div
      role="tablist"
      className="relative grid h-8 rounded-[9px] p-[2px]"
      style={{ gridTemplateColumns: \`repeat(\${items.length}, minmax(0, 1fr))\`, background: dark ? "rgba(118,118,128,.24)" : "rgba(118,118,128,.12)", width: items.length * 82 }}
    >
      <div
        className="absolute bottom-[2px] top-[2px] rounded-[7px] transition-transform duration-300 [transition-timing-function:cubic-bezier(.2,.9,.25,1)]"
        style={{
          left: 2,
          width: \`calc((100% - 4px) / \${items.length})\`,
          transform: \`translateX(\${i * 100}%)\`,
          background: dark ? "#636366" : "#FFFFFF",
          boxShadow: "0 3px 8px rgba(0,0,0,.12), 0 3px 1px rgba(0,0,0,.04)",
        }}
      />
      {items.map((it) => (
        <button
          key={it.id}
          role="tab"
          type="button"
          aria-selected={it.id === value}
          onClick={() => onChange(it.id)}
          className="relative z-10 text-[13px] outline-none"
          style={{ color: dark ? "#fff" : "#000", fontWeight: it.id === value ? 600 : 500 }}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

export default function TimeRulerDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  const dark = s.darkMode;
  const [scenario, setScenario] = React.useState("default");
  const sc = SCENARIOS.find((x) => x.id === scenario) ?? SCENARIOS[0];
  const p = sc.props(dark);

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center gap-10 px-4 py-16"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, 'Segoe UI', Roboto, sans-serif",
        /* dot grid from the "work with AI" block of vasnev.art */
        backgroundColor: dark ? "#000000" : "#F2F2F7",
        backgroundImage: \`radial-gradient(circle, \${dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.07)"} 0 1px, transparent 1.4px)\`,
        backgroundSize: "20px 13px",
        backgroundPosition: "-6px -1px",
      }}
    >
      <Segmented items={SCENARIOS} value={scenario} onChange={setScenario} dark={dark} />

      <div className="flex w-full justify-center sm:scale-[1.25]">
        <TimeRuler
          key={scenario}
          theme={dark ? "dark" : "light"}
          format={s.format24h ? "24h" : "12h"}
          labels={s.hourLabels}
          easterEggs={s.easterEggs}
          {...p}
          presets={s.presets ? p.presets : []}
        />
      </div>

      <p className="m-0 max-w-[340px] text-center text-[13px] leading-[18px] sm:mt-4" style={{ color: dark ? "rgba(235,235,245,.6)" : "rgba(60,60,67,.6)" }}>
        {sc.hint}
      </p>
    </div>
  );
}
`]],mount(e,t){let r=(0,Kn.createRoot)(e);return r.render(Mn.createElement(cn,t)),{update:s=>r.render(Mn.createElement(cn,s)),unmount:()=>r.unmount()}}};})();
