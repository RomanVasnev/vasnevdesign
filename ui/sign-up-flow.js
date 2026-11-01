(()=>{var xe=Object.create;var Hn=Object.defineProperty;var be=Object.getOwnPropertyDescriptor;var we=Object.getOwnPropertyNames;var ve=Object.getPrototypeOf,ke=Object.prototype.hasOwnProperty;var un=(a,o)=>()=>{try{return o||a((o={exports:{}}).exports,o),o.exports}catch(s){throw o=0,s}};var Se=(a,o,s,i)=>{if(o&&typeof o=="object"||typeof o=="function")for(let c of we(o))!ke.call(a,c)&&c!==s&&Hn(a,c,{get:()=>o[c],enumerable:!(i=be(o,c))||i.enumerable});return a};var E=(a,o,s)=>(s=a!=null?xe(ve(a)):{},Se(o||!a||!a.__esModule?Hn(s,"default",{value:a,enumerable:!0}):s,a));var mn=un((Ue,Dn)=>{Dn.exports=window.__R.react});var Wn=un((Ie,On)=>{On.exports=window.__R["react-dom/client"]});var V=un((ze,jn)=>{jn.exports=window.__R["react/jsx-runtime"]});var yn=E(mn()),Yn=E(Wn());var r=E(mn()),n=E(V()),Vn={light:{bg:"#FFFFFF",fill:"rgba(118,118,128,.12)",fill2:"rgba(118,118,128,.08)",label:"#000000",secondary:"rgba(60,60,67,.6)",tertiary:"rgba(60,60,67,.3)",separator:"rgba(60,60,67,.18)",blue:"#007AFF",red:"#FF3B30",green:"#34C759",shadow:"0 0 0 .5px rgba(0,0,0,.05), 0 20px 50px rgba(0,0,0,.1)"},dark:{bg:"#1C1C1E",fill:"rgba(118,118,128,.24)",fill2:"rgba(118,118,128,.16)",label:"#FFFFFF",secondary:"rgba(235,235,245,.6)",tertiary:"rgba(235,235,245,.3)",separator:"rgba(84,84,88,.6)",blue:"#0A84FF",red:"#FF453A",green:"#30D158",shadow:"0 0 0 .5px rgba(255,255,255,.07), 0 24px 60px rgba(0,0,0,.55)"}},Ne="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Inter, 'Segoe UI', Roboto, sans-serif",b="cubic-bezier(.2,.9,.25,1)",Kn="cubic-bezier(.34,1.56,.64,1)",Ce=`
@keyframes su-next{from{opacity:0;transform:translateX(28px);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
@keyframes su-prev{from{opacity:0;transform:translateX(-28px);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
@keyframes su-pop{0%{transform:scale(.5);opacity:0}60%{transform:scale(1.12);opacity:1}100%{transform:scale(1)}}
@keyframes su-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
@keyframes su-spin{to{transform:rotate(360deg)}}
@keyframes su-draw{to{stroke-dashoffset:0}}
@keyframes su-ring{0%{transform:scale(.4);opacity:0}70%{transform:scale(1.06);opacity:1}100%{transform:scale(1)}}
@keyframes su-blink{50%{opacity:0}}
`,Re=[{iso:"BR",name:"Brazil",dial:"+55",flag:"\u{1F1E7}\u{1F1F7}",mask:"(##) #####-####"},{iso:"FR",name:"France",dial:"+33",flag:"\u{1F1EB}\u{1F1F7}",mask:"# ## ## ## ##"},{iso:"DE",name:"Germany",dial:"+49",flag:"\u{1F1E9}\u{1F1EA}",mask:"### ########"},{iso:"IN",name:"India",dial:"+91",flag:"\u{1F1EE}\u{1F1F3}",mask:"##### #####"},{iso:"IT",name:"Italy",dial:"+39",flag:"\u{1F1EE}\u{1F1F9}",mask:"### ### ####"},{iso:"JP",name:"Japan",dial:"+81",flag:"\u{1F1EF}\u{1F1F5}",mask:"## #### ####"},{iso:"KZ",name:"Kazakhstan",dial:"+7",flag:"\u{1F1F0}\u{1F1FF}",mask:"### ### ## ##"},{iso:"NL",name:"Netherlands",dial:"+31",flag:"\u{1F1F3}\u{1F1F1}",mask:"# ########"},{iso:"RU",name:"Russia",dial:"+7",flag:"\u{1F1F7}\u{1F1FA}",mask:"### ###-##-##"},{iso:"ES",name:"Spain",dial:"+34",flag:"\u{1F1EA}\u{1F1F8}",mask:"### ### ###"},{iso:"SE",name:"Sweden",dial:"+46",flag:"\u{1F1F8}\u{1F1EA}",mask:"## ### ## ##"},{iso:"AE",name:"United Arab Emirates",dial:"+971",flag:"\u{1F1E6}\u{1F1EA}",mask:"## ### ####"},{iso:"GB",name:"United Kingdom",dial:"+44",flag:"\u{1F1EC}\u{1F1E7}",mask:"#### ######"},{iso:"US",name:"United States",dial:"+1",flag:"\u{1F1FA}\u{1F1F8}",mask:"(###) ###-####"}],gn=a=>(0,n.jsx)("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"currentColor","aria-hidden":"true",children:(0,n.jsx)("path",{d:a})}),Ee=[{id:"apple",label:"Apple",icon:gn("M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701")},{id:"google",label:"Google",icon:gn("M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z")},{id:"github",label:"GitHub",icon:gn("M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12")}],Fe=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,Q=a=>new Promise(o=>setTimeout(o,a)),fn=a=>(a.match(/#/g)||[]).length,Gn=(a,o)=>{let s="",i=0;for(let c of o){if(i>=a.length)break;c==="#"?s+=a[i++]:s+=c}return s};function Me({color:a}){return(0,n.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",style:{animation:"su-spin .8s linear infinite"},"aria-hidden":"true",children:[(0,n.jsx)("circle",{cx:"10",cy:"10",r:"8",fill:"none",stroke:a,strokeOpacity:".25",strokeWidth:"2.4"}),(0,n.jsx)("path",{d:"M10 2a8 8 0 0 1 8 8",fill:"none",stroke:a,strokeWidth:"2.4",strokeLinecap:"round"})]})}function K({children:a,onClick:o,disabled:s,loading:i,t:c,accent:m,variant:p="filled",type:w="button"}){let h=p==="filled",v=s||i;return(0,n.jsxs)("button",{type:w,onClick:o,disabled:v,"aria-busy":i,className:"relative flex h-[50px] w-full items-center justify-center rounded-[12px] text-[17px] font-semibold outline-none transition-[transform,background-color,color,opacity] duration-200 active:scale-[.98] focus-visible:ring-2 focus-visible:ring-offset-2 disabled:active:scale-100",style:{background:h?s?c.fill:m:"transparent",color:h?s?c.tertiary:"#fff":m,"--tw-ring-color":m,"--tw-ring-offset-color":c.bg,cursor:v?"default":"pointer"},children:[(0,n.jsx)("span",{className:"transition-opacity duration-200",style:{opacity:i?0:1},children:a}),i&&(0,n.jsx)("span",{className:"absolute inset-0 grid place-items-center",children:(0,n.jsx)(Me,{color:h?"#fff":m})})]})}function _n({on:a,color:o,t:s}){return(0,n.jsx)("span",{className:"relative grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full transition-colors duration-200",style:{background:a?o:"transparent",boxShadow:a?"none":`inset 0 0 0 1.5px ${s.tertiary}`},"aria-hidden":"true",children:(0,n.jsx)("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"none",stroke:"#fff",strokeWidth:"3.2",strokeLinecap:"round",strokeLinejoin:"round",style:{transform:a?"scale(1)":"scale(.3)",opacity:a?1:0,transition:`transform .35s ${Kn}, opacity .2s`},children:(0,n.jsx)("path",{d:"M5 12.5l4.5 4.5L19 7.5"})})})}function hn({t:a,accent:o,error:s,children:i,focused:c}){return(0,n.jsx)("div",{className:"flex h-[50px] items-center rounded-[12px] transition-shadow duration-200",style:{background:a.fill,boxShadow:s?`inset 0 0 0 1.5px ${a.red}`:c?`inset 0 0 0 1.5px ${o}`:"inset 0 0 0 1.5px transparent"},children:i})}function Z({t:a,children:o}){return(0,n.jsxs)("p",{role:"alert",className:"m-0 mt-2 flex items-start gap-1.5 text-[13px] leading-[18px]",style:{color:a.red,animation:"su-in .25s ease"},children:[(0,n.jsxs)("svg",{viewBox:"0 0 16 16",width:"15",height:"15",className:"mt-[1.5px] shrink-0","aria-hidden":"true",children:[(0,n.jsx)("circle",{cx:"8",cy:"8",r:"7.25",fill:"none",stroke:"currentColor",strokeWidth:"1.5"}),(0,n.jsx)("path",{d:"M8 4.5v4.2",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),(0,n.jsx)("circle",{cx:"8",cy:"11.2",r:".95",fill:"currentColor"})]}),(0,n.jsx)("span",{children:o})]})}function Le({value:a,onChange:o,t:s}){let i=[{id:"email",label:"Email"},{id:"phone",label:"Phone"}],c=i.findIndex(p=>p.id===a),m=s===Vn.dark;return(0,n.jsxs)("div",{role:"tablist","aria-label":"Sign up with",className:"relative grid h-8 grid-cols-2 rounded-[9px] p-[2px]",style:{background:s.fill},children:[(0,n.jsx)("div",{className:"absolute bottom-[2px] left-[2px] top-[2px] w-[calc(50%-2px)] rounded-[7px]",style:{transform:`translateX(${c*100}%)`,transition:`transform .35s ${b}`,background:m?"#636366":"#FFFFFF",boxShadow:"0 3px 8px rgba(0,0,0,.12), 0 3px 1px rgba(0,0,0,.04)"}}),i.map(p=>(0,n.jsx)("button",{role:"tab",type:"button","aria-selected":p.id===a,onClick:()=>o(p.id),className:"relative z-10 text-[13px] outline-none transition-[font-weight]",style:{color:s.label,fontWeight:p.id===a?600:500},children:p.label},p.id))]})}function Te({t:a}){return(0,n.jsxs)("div",{className:"flex h-8 items-center gap-2","aria-label":"Logo",children:[(0,n.jsx)("span",{className:"grid h-8 w-8 place-items-center rounded-[9px]",style:{background:a.label},children:(0,n.jsx)("span",{className:"h-3 w-3 rotate-45 rounded-[3px]",style:{background:a.bg}})}),(0,n.jsx)("span",{className:"text-[17px] font-semibold tracking-[-0.02em]",style:{color:a.label},children:"Logo"})]})}function $e({length:a,value:o,onChange:s,t:i,accent:c,error:m,disabled:p,shakeKey:w,inputRef:h}){let[v,N]=r.useState(!1),I=r.useRef(null);return r.useEffect(()=>{w&&I.current?.animate([0,-9,8,-6,4,-2,0].map(C=>({transform:`translateX(${C}px)`})),{duration:450,easing:"ease-out"})},[w]),(0,n.jsxs)("div",{ref:I,className:"relative",children:[(0,n.jsx)("input",{ref:h,value:o,onChange:C=>s(C.target.value.replace(/\D/g,"").slice(0,a)),onFocus:()=>N(!0),onBlur:()=>N(!1),inputMode:"numeric",autoComplete:"one-time-code","aria-label":`${a}-digit code`,maxLength:a,disabled:p,className:"absolute inset-0 z-10 h-full w-full cursor-text opacity-0"}),(0,n.jsx)("div",{className:"flex justify-between gap-2","aria-hidden":"true",children:Array.from({length:a},(C,R)=>{let z=o[R],X=v&&!p&&(R===o.length||R===a-1&&o.length===a);return(0,n.jsx)("div",{className:"relative grid h-[58px] flex-1 place-items-center rounded-[12px] text-[26px] font-semibold tabular-nums transition-shadow duration-200",style:{background:i.fill,color:m?i.red:i.label,boxShadow:m?`inset 0 0 0 1.5px ${i.red}`:X?`inset 0 0 0 1.5px ${c}`:"inset 0 0 0 1.5px transparent",opacity:p?.5:1},children:z?(0,n.jsx)("span",{style:{animation:`su-pop .3s ${b}`},children:z},z+R):X?(0,n.jsx)("span",{className:"h-7 w-[2px] rounded-full",style:{background:c,animation:"su-blink 1s steps(1) infinite"}}):(0,n.jsx)("span",{className:"h-[3px] w-3 rounded-full",style:{background:i.tertiary}})},R)})})]})}function Xn({logo:a,theme:o="light",accent:s,defaultMethod:i="email",defaultCountry:c="US",countries:m=Re,codeLength:p=6,resendSeconds:w=30,maxAttempts:h=3,providers:v=Ee,onSendCode:N,onVerify:I,onCreatePassword:C,onComplete:R,onProvider:z,onLogin:X,onStepChange:qn,termsHref:Jn="#",privacyHref:Qn="#",demoCode:Zn="420420",className:ne=""}){let t=Vn[o],l=s??t.blue,en=r.useId(),[f,ee]=r.useState("start"),[te,ae]=r.useState(1),A=(e,d=1)=>{ae(d),ee(e),qn?.(e)},[u,oe]=r.useState(i),[H,xn]=r.useState(""),[g,re]=r.useState(()=>m.find(e=>e.iso===c)??m[0]),[F,Y]=r.useState(""),[q,bn]=r.useState(!1),[tn,J]=r.useState(!1),[wn,vn]=r.useState(""),[an,M]=r.useState(null),[se,D]=r.useState(!1),[y,k]=r.useState(!1),[kn,on]=r.useState(""),ie=Fe.test(H.trim()),le=F.length===fn(g.mask),rn=u==="email"?ie:le,x=u==="email"?H.trim():`${g.dial} ${Gn(F,g.mask)}`,L=se&&!rn&&(u==="email"?H.length>0:F.length>0),[sn,O]=r.useState(""),[W,T]=r.useState(""),[Sn,ln]=r.useState(0),[ce,de]=r.useState(0),[S,cn]=r.useState(w),[Nn,Cn]=r.useState(!1),[pe,Rn]=r.useState(!1),$=Sn>=h,[P,En]=r.useState(""),[j,Fn]=r.useState(!1),Mn=[{label:"At least 8 characters",ok:P.length>=8},{label:"One number",ok:/\d/.test(P)},{label:"One uppercase letter",ok:/[A-Z]/.test(P)}],Ln=Mn.every(e=>e.ok);r.useEffect(()=>{if(f!=="verify"||S<=0)return;let e=setTimeout(()=>cn(d=>d-1),1e3);return()=>clearTimeout(e)},[f,S]);let G=r.useRef(null),dn=r.useRef(null),Tn=r.useRef(null),$n=r.useRef(!0);r.useEffect(()=>{if($n.current){$n.current=!1;return}(f==="start"?G.current:f==="verify"?dn.current:f==="password"?Tn.current:null)?.focus({preventScroll:!0})},[f,u]);let Pn=r.useRef(null),[ue,Bn]=r.useState(void 0);r.useLayoutEffect(()=>{let e=Pn.current;if(!e)return;Bn(e.offsetHeight);let d=new ResizeObserver(()=>Bn(e.offsetHeight));return d.observe(e),()=>d.disconnect()},[]);let me=async()=>{if(D(!0),!(!rn||!q||y)){k(!0),on("");try{await(N?N(u,x):Q(800)),O(""),T(""),ln(0),cn(w),Cn(!1),Rn(!1),A("verify")}catch(e){on(e instanceof Error&&e.message?e.message:"Couldn't send the code. Try again.")}finally{k(!1)}}},Un=async e=>{if(!(y||$)){k(!0);try{if(await(I?I(e,u,x):Q(700).then(()=>e===Zn)))T(""),A("password");else{let B=Sn+1;ln(B),de(ye=>ye+1),setTimeout(()=>{O(""),dn.current?.focus({preventScroll:!0})},650),T(B>=h?"Too many attempts. For your security, try again in 30 minutes.":`That code isn't right. ${h-B} ${h-B===1?"attempt":"attempts"} left.`)}}finally{k(!1)}}},ge=async()=>{if(!(S>0||y)){k(!0);try{await(N?N(u,x):Q(600)),cn(w),O(""),T(""),Rn(!0)}finally{k(!1)}}},fe=async()=>{if(!(!Ln||y)){k(!0);try{await(C?C(P):Q(800)),A("done")}finally{k(!1)}}},In=()=>{xn(""),Y(""),bn(!1),D(!1),En(""),Fn(!1),O(""),ln(0),T(""),A("start",-1)},zn=m.filter(e=>(e.name+e.dial+e.iso).toLowerCase().includes(wn.trim().toLowerCase())),he=`${Math.floor(S/60)}:${String(S%60).padStart(2,"0")}`,pn=(e,d)=>(0,n.jsxs)("div",{className:"mb-6",children:[(0,n.jsx)("h2",{className:"m-0 text-[28px] font-bold leading-[34px] tracking-[-0.02em]",style:{color:t.label},children:e}),d&&(0,n.jsx)("p",{className:"m-0 mt-2 text-[15px] leading-[21px]",style:{color:t.secondary},children:d})]}),An=(e,d="Back")=>(0,n.jsxs)("button",{type:"button",onClick:()=>A(e,-1),className:"-ml-1.5 flex h-8 items-center gap-0.5 rounded-lg pr-2 text-[17px] outline-none focus-visible:ring-2",style:{color:l,"--tw-ring-color":l},children:[(0,n.jsx)("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"none",stroke:"currentColor",strokeWidth:"2.4",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,n.jsx)("path",{d:"M15 5l-7 7 7 7"})}),d]}),_=null;return f==="start"&&(_=(0,n.jsxs)("form",{noValidate:!0,onSubmit:e=>{e.preventDefault(),me()},children:[(0,n.jsx)("div",{className:"mb-7 flex h-8 items-center",children:a??(0,n.jsx)(Te,{t})}),pn("Create your account",u==="email"?"Enter your email and we'll send you a code.":"Enter your phone number and we'll text you a code."),(0,n.jsx)(Le,{value:u,onChange:e=>{oe(e),D(!1),J(!1),on("")},t}),(0,n.jsx)("div",{className:"mt-4",children:u==="email"?(0,n.jsxs)("div",{style:{animation:"su-in .25s ease"},children:[(0,n.jsx)(hn,{t,accent:l,focused:an==="email",error:L,children:(0,n.jsx)("input",{ref:G,type:"email",inputMode:"email",autoComplete:"email","aria-label":"Email","aria-invalid":L,placeholder:"name@example.com",value:H,onChange:e=>xn(e.target.value),onFocus:()=>M("email"),onBlur:()=>{M(null),H&&D(!0)},className:"h-full w-full bg-transparent px-4 text-[17px] outline-none placeholder:opacity-100",style:{color:t.label}})}),L&&(0,n.jsx)(Z,{t,children:"Enter a valid email, like name@example.com."})]},"email"):(0,n.jsxs)("div",{style:{animation:"su-in .25s ease"},children:[(0,n.jsxs)(hn,{t,accent:l,focused:an==="phone",error:L,children:[(0,n.jsxs)("button",{type:"button","aria-haspopup":"listbox","aria-expanded":tn,"aria-label":`Country: ${g.name} ${g.dial}`,onClick:()=>{J(e=>!e),vn("")},className:"flex h-full shrink-0 items-center gap-1.5 rounded-l-[12px] pl-3.5 pr-2.5 text-[17px] outline-none focus-visible:ring-2",style:{color:t.label,"--tw-ring-color":l},children:[(0,n.jsx)("span",{className:"text-[20px] leading-none",children:g.flag}),(0,n.jsx)("span",{className:"tabular-nums",children:g.dial}),(0,n.jsx)("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"none",stroke:t.secondary,strokeWidth:"2.6",strokeLinecap:"round",strokeLinejoin:"round",style:{transform:tn?"rotate(180deg)":"none",transition:`transform .3s ${b}`},"aria-hidden":"true",children:(0,n.jsx)("path",{d:"M6 9l6 6 6-6"})})]}),(0,n.jsx)("span",{className:"h-6 w-px",style:{background:t.separator}}),(0,n.jsx)("input",{ref:G,type:"tel",inputMode:"tel",autoComplete:"tel-national","aria-label":"Phone number","aria-invalid":L,placeholder:g.mask.replace(/#/g,"0"),value:Gn(F,g.mask),onChange:e=>Y(e.target.value.replace(/\D/g,"").slice(0,fn(g.mask))),onFocus:()=>{M("phone"),J(!1)},onBlur:()=>{M(null),F&&D(!0)},className:"h-full min-w-0 flex-1 bg-transparent pl-3 pr-2 text-[17px] tabular-nums outline-none",style:{color:t.label}}),F&&(0,n.jsx)("button",{type:"button","aria-label":"Clear",onClick:()=>{Y(""),G.current?.focus()},className:"mr-3 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full",style:{background:t.tertiary,animation:`su-pop .25s ${b}`},children:(0,n.jsx)("svg",{viewBox:"0 0 24 24",width:"10",height:"10",stroke:t.bg,strokeWidth:"3.4",strokeLinecap:"round","aria-hidden":"true",children:(0,n.jsx)("path",{d:"M6 6l12 12M18 6L6 18"})})})]}),tn&&(0,n.jsxs)("div",{className:"mt-2 overflow-hidden rounded-[12px]",style:{background:t.fill2,animation:"su-in .25s ease"},children:[(0,n.jsx)("div",{className:"p-2",children:(0,n.jsxs)("div",{className:"flex h-9 items-center gap-1.5 rounded-[10px] px-2.5",style:{background:t.fill},children:[(0,n.jsxs)("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:t.secondary,strokeWidth:"2.4",strokeLinecap:"round","aria-hidden":"true",children:[(0,n.jsx)("circle",{cx:"11",cy:"11",r:"6.5"}),(0,n.jsx)("path",{d:"M16 16l4 4"})]}),(0,n.jsx)("input",{autoFocus:!0,value:wn,onChange:e=>vn(e.target.value),placeholder:"Search","aria-label":"Search countries",className:"h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none",style:{color:t.label}})]})}),(0,n.jsxs)("ul",{role:"listbox","aria-label":"Countries",className:"m-0 max-h-[200px] list-none overflow-y-auto p-0 pb-1 [scrollbar-width:thin]",children:[zn.map(e=>{let d=e.iso===g.iso;return(0,n.jsx)("li",{role:"option","aria-selected":d,children:(0,n.jsxs)("button",{type:"button",onClick:()=>{re(e),Y(B=>B.slice(0,fn(e.mask))),J(!1),requestAnimationFrame(()=>G.current?.focus())},className:"flex h-11 w-full items-center gap-3 px-3.5 text-left text-[16px] outline-none transition-colors hover:bg-[rgba(118,118,128,.12)] focus-visible:bg-[rgba(118,118,128,.12)]",style:{color:t.label},children:[(0,n.jsx)("span",{className:"text-[20px] leading-none",children:e.flag}),(0,n.jsx)("span",{className:"min-w-0 flex-1 truncate",children:e.name}),(0,n.jsx)("span",{className:"tabular-nums",style:{color:t.secondary},children:e.dial}),(0,n.jsx)("span",{className:"w-4",children:d&&(0,n.jsx)("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:l,strokeWidth:"2.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,n.jsx)("path",{d:"M5 12.5l4.5 4.5L19 7.5"})})})]})},e.iso)}),zn.length===0&&(0,n.jsx)("li",{className:"px-3.5 py-3 text-[15px]",style:{color:t.secondary},children:"No matches"})]})]}),L&&(0,n.jsx)(Z,{t,children:`Enter the full number for ${g.name}.`})]},"phone")}),(0,n.jsxs)("label",{className:"mt-4 flex cursor-pointer items-start gap-3 text-[13px] leading-[18px]",style:{color:t.secondary},children:[(0,n.jsx)("input",{type:"checkbox",checked:q,onChange:e=>bn(e.target.checked),className:"peer sr-only"}),(0,n.jsx)("span",{className:"rounded-full peer-focus-visible:ring-2",style:{"--tw-ring-color":l},children:(0,n.jsx)(_n,{on:q,color:l,t})}),(0,n.jsxs)("span",{className:"pt-0.5",children:["I agree to the"," ",(0,n.jsx)("a",{href:Jn,onClick:e=>e.stopPropagation(),className:"no-underline",style:{color:l},children:"Terms of Service"})," ","and"," ",(0,n.jsx)("a",{href:Qn,onClick:e=>e.stopPropagation(),className:"no-underline",style:{color:l},children:"Privacy Policy"}),"."]})]}),(0,n.jsxs)("div",{className:"mt-5",children:[(0,n.jsx)(K,{type:"submit",t,accent:l,disabled:!rn||!q,loading:y,children:u==="email"?"Continue":"Send code"}),kn&&(0,n.jsx)(Z,{t,children:kn})]}),v.length>0&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"my-5 flex items-center gap-3 text-[13px]",style:{color:t.secondary},children:[(0,n.jsx)("span",{className:"h-px flex-1",style:{background:t.separator}}),"or",(0,n.jsx)("span",{className:"h-px flex-1",style:{background:t.separator}})]}),(0,n.jsx)("div",{className:"grid gap-2",style:{gridTemplateColumns:`repeat(${v.length}, minmax(0, 1fr))`},children:v.map(e=>(0,n.jsx)("button",{type:"button","aria-label":`Continue with ${e.label}`,title:`Continue with ${e.label}`,onClick:()=>z?.(e.id),className:"grid h-[46px] place-items-center rounded-[12px] outline-none transition-[transform,background-color] duration-200 hover:brightness-110 active:scale-[.96] focus-visible:ring-2",style:{background:t.fill,color:t.label,"--tw-ring-color":l},children:e.icon},e.id))})]}),(0,n.jsxs)("p",{className:"m-0 mt-5 text-center text-[15px]",style:{color:t.secondary},children:["Already have an account?"," ",(0,n.jsx)("button",{type:"button",onClick:X,className:"font-semibold outline-none",style:{color:l},children:"Log in"})]})]})),f==="verify"&&(_=(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"mb-5 flex h-8 items-center",children:An("start")}),pn(u==="email"?"Check your email":"Check your messages",(0,n.jsxs)(n.Fragment,{children:["Enter the ",p,"-digit code we sent to"," ",(0,n.jsx)("span",{className:"font-semibold",style:{color:t.label},children:x}),". It expires in 30 minutes."]})),(0,n.jsx)($e,{length:p,value:sn,onChange:e=>{O(e),W&&!$&&T(""),e.length===p&&Un(e)},t,accent:l,error:!!W,disabled:y||$,shakeKey:ce,inputRef:dn}),W&&(0,n.jsx)(Z,{t,children:W}),pe&&!W&&(0,n.jsx)("p",{className:"m-0 mt-2 text-[13px]",style:{color:t.green,animation:"su-in .25s ease"},children:"New code sent."}),(0,n.jsx)("div",{className:"mt-6",children:$?(0,n.jsx)(K,{t,accent:l,onClick:In,children:"Back to start"}):(0,n.jsx)(K,{t,accent:l,disabled:sn.length<p,loading:y,onClick:()=>Un(sn),children:"Verify"})}),!$&&(0,n.jsxs)("div",{className:"mt-4 flex items-center justify-between text-[15px]",children:[(0,n.jsx)("button",{type:"button",onClick:ge,disabled:S>0||y,className:"font-medium tabular-nums outline-none transition-colors",style:{color:S>0?t.tertiary:l},children:S>0?`Resend code in ${he}`:"Resend code"}),(0,n.jsx)("button",{type:"button","aria-expanded":Nn,onClick:()=>Cn(e=>!e),className:"font-medium outline-none",style:{color:l},children:"Didn't get it?"})]}),(Nn||$)&&(0,n.jsx)("div",{className:"mt-4 rounded-[12px] p-1",style:{background:t.fill2,animation:"su-in .3s ease"},children:[u==="email"?`Make sure ${x} is right.`:`Make sure ${x} is right.`,u==="email"?"Look in Spam, Promotions or Updates.":"Check that your phone has signal and can receive texts.","Wait a minute, then tap Resend code.","Still nothing? Contact support."].map((e,d)=>(0,n.jsxs)("div",{className:"flex items-start gap-3 px-3 py-2.5 text-[15px] leading-[20px]",style:{color:t.label,borderTop:d?`0.5px solid ${t.separator}`:"none"},children:[(0,n.jsx)("span",{className:"mt-[1px] grid h-5 w-5 shrink-0 place-items-center rounded-full text-[12px] font-semibold",style:{background:`${l}22`,color:l},children:d+1}),e]},d))})]})),f==="password"&&(_=(0,n.jsxs)("form",{noValidate:!0,onSubmit:e=>{e.preventDefault(),fe()},children:[(0,n.jsx)("div",{className:"mb-5 flex h-8 items-center",children:An("verify")}),pn("Create a password","You'll use it to sign in on new devices."),(0,n.jsx)("input",{type:"text",name:"username",autoComplete:"username",value:x,readOnly:!0,hidden:!0}),(0,n.jsxs)(hn,{t,accent:l,focused:an==="pw",children:[(0,n.jsx)("input",{ref:Tn,id:`${en}-pw`,type:j?"text":"password",autoComplete:"new-password","aria-label":"Password","aria-describedby":`${en}-rules`,placeholder:"Password",value:P,onChange:e=>En(e.target.value),onFocus:()=>M("pw"),onBlur:()=>M(null),className:"h-full min-w-0 flex-1 bg-transparent px-4 text-[17px] outline-none",style:{color:t.label,letterSpacing:j||!P?void 0:"0.12em"}}),(0,n.jsx)("button",{type:"button","aria-label":j?"Hide password":"Show password","aria-pressed":j,onClick:()=>Fn(e=>!e),className:"mr-1.5 grid h-10 w-10 place-items-center rounded-[10px] outline-none focus-visible:ring-2",style:{color:t.secondary,"--tw-ring-color":l},children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",width:"21",height:"21",fill:"none",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,n.jsx)("path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}),(0,n.jsx)("circle",{cx:"12",cy:"12",r:"3"}),(0,n.jsx)("path",{d:"M4 20L20 4",style:{strokeDasharray:23,strokeDashoffset:j?23:0,transition:`stroke-dashoffset .3s ${b}`}})]})})]}),(0,n.jsx)("ul",{id:`${en}-rules`,className:"m-0 mt-4 list-none space-y-2.5 p-0",children:Mn.map(e=>(0,n.jsxs)("li",{className:"flex items-center gap-2.5 text-[15px] transition-colors duration-200",style:{color:e.ok?t.label:t.secondary},children:[(0,n.jsx)(_n,{on:e.ok,color:t.green,t}),e.label,(0,n.jsx)("span",{className:"sr-only",children:e.ok?"met":"not met"})]},e.label))}),(0,n.jsx)("div",{className:"mt-6",children:(0,n.jsx)(K,{type:"submit",t,accent:l,disabled:!Ln,loading:y,children:"Create account"})})]})),f==="done"&&(_=(0,n.jsxs)("div",{className:"flex flex-col items-center pb-1 pt-4 text-center",children:[(0,n.jsx)("div",{className:"grid h-[76px] w-[76px] place-items-center rounded-full",style:{background:`${t.green}24`,animation:`su-ring .5s ${b}`},children:(0,n.jsxs)("svg",{viewBox:"0 0 52 52",width:"44",height:"44",fill:"none","aria-hidden":"true",children:[(0,n.jsx)("circle",{cx:"26",cy:"26",r:"22",fill:t.green,style:{transformOrigin:"26px 26px",animation:`su-ring .45s ${Kn} .05s both`}}),(0,n.jsx)("path",{d:"M16 27l7 7 13-15",stroke:"#fff",strokeWidth:"4.2",strokeLinecap:"round",strokeLinejoin:"round",style:{strokeDasharray:40,strokeDashoffset:40,animation:`su-draw .45s ${b} .35s forwards`}})]})}),(0,n.jsx)("h2",{className:"m-0 mt-5 text-[28px] font-bold leading-[34px] tracking-[-0.02em]",style:{color:t.label},children:"You're all set"}),(0,n.jsxs)("p",{className:"m-0 mt-2 max-w-[280px] text-[15px] leading-[21px]",style:{color:t.secondary},children:["Your account for"," ",(0,n.jsx)("span",{className:"font-semibold",style:{color:t.label},children:x})," ","is ready."]}),(0,n.jsx)("div",{className:"mt-7 w-full",children:(0,n.jsx)(K,{t,accent:l,onClick:()=>R?.({method:u,value:x}),children:"Get started"})}),(0,n.jsx)("button",{type:"button",onClick:In,className:"mt-3 h-9 text-[15px] font-medium outline-none",style:{color:l},children:"Start over"})]})),(0,n.jsxs)("div",{className:`w-full max-w-[400px] overflow-hidden rounded-[24px] ${ne}`,style:{background:t.bg,boxShadow:t.shadow,fontFamily:Ne,WebkitFontSmoothing:"antialiased",height:ue,transition:`height .45s ${b}`},children:[(0,n.jsx)("style",{children:Ce}),(0,n.jsxs)("div",{ref:Pn,className:"px-6 pb-6 pt-6",children:[(0,n.jsx)("style",{children:`[data-su] input::placeholder{color:${t.tertiary}}`}),(0,n.jsx)("div",{"data-su":!0,style:{animation:`${te>0?"su-next":"su-prev"} .45s ${b}`},children:_},f)]})]})}var U=E(V()),Pe={darkMode:!1,startWithPhone:!1,socialButtons:!0};function nn(a){let o={...Pe,...a},s=o.darkMode;return(0,U.jsxs)("div",{className:"flex min-h-screen w-full flex-col items-center justify-center gap-6 px-4 py-12",style:{fontFamily:"-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, 'Segoe UI', Roboto, sans-serif",backgroundColor:s?"#000000":"#F2F2F7",backgroundImage:`radial-gradient(circle, ${s?"rgba(255,255,255,.06)":"rgba(0,0,0,.07)"} 0 1px, transparent 1.4px)`,backgroundSize:"20px 13px",backgroundPosition:"-6px -1px"},children:[(0,U.jsx)(Xn,{theme:s?"dark":"light",defaultMethod:o.startWithPhone?"phone":"email",providers:o.socialButtons?void 0:[]},`${o.startWithPhone}`),(0,U.jsxs)("p",{className:"m-0 text-center text-[13px] leading-[18px]",style:{color:s?"rgba(235,235,245,.6)":"rgba(60,60,67,.6)"},children:["Demo code: ",(0,U.jsx)("b",{children:"420420"}),". Any other code shows an error."]})]})}(window.__UI=window.__UI||{})["sign-up-flow"]={css:`/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
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
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
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
  .relative {
    position: relative;
  }
  .inset-0 {
    inset: 0px;
  }
  .top-\\[2px\\] {
    top: 2px;
  }
  .bottom-\\[2px\\] {
    bottom: 2px;
  }
  .left-\\[2px\\] {
    left: 2px;
  }
  .z-10 {
    z-index: 10;
  }
  .m-0 {
    margin: 0px;
  }
  .my-5 {
    margin-block: calc(var(--spacing) * 5);
  }
  .mt-2 {
    margin-top: calc(var(--spacing) * 2);
  }
  .mt-3 {
    margin-top: calc(var(--spacing) * 3);
  }
  .mt-4 {
    margin-top: calc(var(--spacing) * 4);
  }
  .mt-5 {
    margin-top: calc(var(--spacing) * 5);
  }
  .mt-6 {
    margin-top: calc(var(--spacing) * 6);
  }
  .mt-7 {
    margin-top: calc(var(--spacing) * 7);
  }
  .mt-\\[1\\.5px\\] {
    margin-top: 1.5px;
  }
  .mt-\\[1px\\] {
    margin-top: 1px;
  }
  .mr-1\\.5 {
    margin-right: calc(var(--spacing) * 1.5);
  }
  .mr-3 {
    margin-right: calc(var(--spacing) * 3);
  }
  .mb-5 {
    margin-bottom: calc(var(--spacing) * 5);
  }
  .mb-6 {
    margin-bottom: calc(var(--spacing) * 6);
  }
  .mb-7 {
    margin-bottom: calc(var(--spacing) * 7);
  }
  .-ml-1\\.5 {
    margin-left: calc(var(--spacing) * -1.5);
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
  .inline {
    display: inline;
  }
  .h-3 {
    height: calc(var(--spacing) * 3);
  }
  .h-5 {
    height: calc(var(--spacing) * 5);
  }
  .h-6 {
    height: calc(var(--spacing) * 6);
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
  .h-10 {
    height: calc(var(--spacing) * 10);
  }
  .h-11 {
    height: calc(var(--spacing) * 11);
  }
  .h-\\[3px\\] {
    height: 3px;
  }
  .h-\\[18px\\] {
    height: 18px;
  }
  .h-\\[22px\\] {
    height: 22px;
  }
  .h-\\[46px\\] {
    height: 46px;
  }
  .h-\\[50px\\] {
    height: 50px;
  }
  .h-\\[58px\\] {
    height: 58px;
  }
  .h-\\[76px\\] {
    height: 76px;
  }
  .h-full {
    height: 100%;
  }
  .h-px {
    height: 1px;
  }
  .max-h-\\[200px\\] {
    max-height: 200px;
  }
  .min-h-screen {
    min-height: 100vh;
  }
  .w-3 {
    width: calc(var(--spacing) * 3);
  }
  .w-4 {
    width: calc(var(--spacing) * 4);
  }
  .w-5 {
    width: calc(var(--spacing) * 5);
  }
  .w-8 {
    width: calc(var(--spacing) * 8);
  }
  .w-10 {
    width: calc(var(--spacing) * 10);
  }
  .w-\\[2px\\] {
    width: 2px;
  }
  .w-\\[18px\\] {
    width: 18px;
  }
  .w-\\[22px\\] {
    width: 22px;
  }
  .w-\\[76px\\] {
    width: 76px;
  }
  .w-full {
    width: 100%;
  }
  .w-px {
    width: 1px;
  }
  .max-w-\\[280px\\] {
    max-width: 280px;
  }
  .max-w-\\[400px\\] {
    max-width: 400px;
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
  .rotate-45 {
    rotate: 45deg;
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .cursor-text {
    cursor: text;
  }
  .\\[scrollbar-width\\:thin\\] {
    scrollbar-width: thin;
  }
  .list-none {
    list-style-type: none;
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .flex-col {
    flex-direction: column;
  }
  .place-items-center {
    place-items: center;
  }
  .items-center {
    align-items: center;
  }
  .items-start {
    align-items: flex-start;
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
  .gap-2 {
    gap: calc(var(--spacing) * 2);
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
  :where(.space-y-2\\.5 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 2.5) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 2.5) * calc(1 - var(--tw-space-y-reverse)));
  }
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-y-auto {
    overflow-y: auto;
  }
  .rounded-\\[3px\\] {
    border-radius: 3px;
  }
  .rounded-\\[7px\\] {
    border-radius: 7px;
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
  .rounded-\\[24px\\] {
    border-radius: 24px;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius);
  }
  .rounded-l-\\[12px\\] {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .bg-transparent {
    background-color: transparent;
  }
  .p-0 {
    padding: 0px;
  }
  .p-1 {
    padding: var(--spacing);
  }
  .p-2 {
    padding: calc(var(--spacing) * 2);
  }
  .p-\\[2px\\] {
    padding: 2px;
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
  .px-6 {
    padding-inline: calc(var(--spacing) * 6);
  }
  .py-2\\.5 {
    padding-block: calc(var(--spacing) * 2.5);
  }
  .py-3 {
    padding-block: calc(var(--spacing) * 3);
  }
  .py-12 {
    padding-block: calc(var(--spacing) * 12);
  }
  .pt-0\\.5 {
    padding-top: calc(var(--spacing) * 0.5);
  }
  .pt-4 {
    padding-top: calc(var(--spacing) * 4);
  }
  .pt-6 {
    padding-top: calc(var(--spacing) * 6);
  }
  .pr-2 {
    padding-right: calc(var(--spacing) * 2);
  }
  .pr-2\\.5 {
    padding-right: calc(var(--spacing) * 2.5);
  }
  .pb-1 {
    padding-bottom: var(--spacing);
  }
  .pb-6 {
    padding-bottom: calc(var(--spacing) * 6);
  }
  .pl-3 {
    padding-left: calc(var(--spacing) * 3);
  }
  .pl-3\\.5 {
    padding-left: calc(var(--spacing) * 3.5);
  }
  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
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
  .text-\\[16px\\] {
    font-size: 16px;
  }
  .text-\\[17px\\] {
    font-size: 17px;
  }
  .text-\\[20px\\] {
    font-size: 20px;
  }
  .text-\\[26px\\] {
    font-size: 26px;
  }
  .text-\\[28px\\] {
    font-size: 28px;
  }
  .leading-\\[18px\\] {
    --tw-leading: 18px;
    line-height: 18px;
  }
  .leading-\\[20px\\] {
    --tw-leading: 20px;
    line-height: 20px;
  }
  .leading-\\[21px\\] {
    --tw-leading: 21px;
    line-height: 21px;
  }
  .leading-\\[34px\\] {
    --tw-leading: 34px;
    line-height: 34px;
  }
  .leading-none {
    --tw-leading: 1;
    line-height: 1;
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
  .uppercase {
    text-transform: uppercase;
  }
  .tabular-nums {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
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
  .transition-\\[font-weight\\] {
    transition-property: font-weight;
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
  .transition-shadow {
    transition-property: box-shadow;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .duration-200 {
    --tw-duration: 200ms;
    transition-duration: 200ms;
  }
  .ease-out {
    --tw-ease: var(--ease-out);
    transition-timing-function: var(--ease-out);
  }
  .outline-none {
    --tw-outline-style: none;
    outline-style: none;
  }
  .peer-focus-visible\\:ring-2:is(:where(.peer):focus-visible ~ *) {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .placeholder\\:opacity-100::placeholder {
    opacity: 100%;
  }
  @media (hover: hover) {
    .hover\\:brightness-110:hover {
      --tw-brightness: brightness(110%);
      filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
    }
  }
  .focus-visible\\:ring-2:focus-visible {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .focus-visible\\:ring-offset-2:focus-visible {
    --tw-ring-offset-width: 2px;
    --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  }
  .active\\:scale-\\[\\.96\\]:active {
    scale: .96;
  }
  .active\\:scale-\\[\\.98\\]:active {
    scale: .98;
  }
  .disabled\\:active\\:scale-100:disabled:active {
    --tw-scale-x: 100%;
    --tw-scale-y: 100%;
    --tw-scale-z: 100%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
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
      --tw-space-y-reverse: 0;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-tracking: initial;
      --tw-ordinal: initial;
      --tw-slashed-zero: initial;
      --tw-numeric-figure: initial;
      --tw-numeric-spacing: initial;
      --tw-numeric-fraction: initial;
      --tw-duration: initial;
      --tw-ease: initial;
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
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-scale-z: 1;
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
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
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
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-ease {
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
@property --tw-scale-x {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-y {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-z {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}`,settings:{darkMode:!1,startWithPhone:!1,socialButtons:!0},themeable:!0,files:[["component.tsx",`"use client";

import * as React from "react";

/* ------------------------------------------------------------------ */
/*  SignUpFlow \u2014 email or phone sign-up with a one-time code,          */
/*  password and success, in one card. Styled after Apple HIG.         */
/* ------------------------------------------------------------------ */

export type SignUpMethod = "email" | "phone";
export type SignUpStep = "start" | "verify" | "password" | "done";

export type Country = { iso: string; name: string; dial: string; flag: string; mask: string };

export type Provider = { id: string; label: string; icon: React.ReactNode };

export type SignUpFlowProps = {
  /** your logo; a placeholder is shown by default */
  logo?: React.ReactNode;
  theme?: "light" | "dark";
  /** buttons, links, checkmarks. Defaults to HIG systemBlue. */
  accent?: string;
  defaultMethod?: SignUpMethod;
  defaultCountry?: string;
  countries?: Country[];
  codeLength?: number;
  /** seconds before "Resend code" unlocks */
  resendSeconds?: number;
  /** wrong codes allowed before the flow locks */
  maxAttempts?: number;
  /** social sign-in buttons; pass [] to hide */
  providers?: Provider[];
  /** send the code. Throw to show an error. */
  onSendCode?: (method: SignUpMethod, value: string) => Promise<void> | void;
  /** check the code; resolve true when it is right */
  onVerify?: (code: string, method: SignUpMethod, value: string) => Promise<boolean> | boolean;
  onCreatePassword?: (password: string) => Promise<void> | void;
  onComplete?: (account: { method: SignUpMethod; value: string }) => void;
  onProvider?: (id: string) => void;
  onLogin?: () => void;
  onStepChange?: (step: SignUpStep) => void;
  termsHref?: string;
  privacyHref?: string;
  /** code accepted by the built-in mock when onVerify is not set */
  demoCode?: string;
  className?: string;
};

/* ---------- HIG tokens ---------- */

const THEMES = {
  light: {
    bg: "#FFFFFF",
    fill: "rgba(118,118,128,.12)",
    fill2: "rgba(118,118,128,.08)",
    label: "#000000",
    secondary: "rgba(60,60,67,.6)",
    tertiary: "rgba(60,60,67,.3)",
    separator: "rgba(60,60,67,.18)",
    blue: "#007AFF",
    red: "#FF3B30",
    green: "#34C759",
    shadow: "0 0 0 .5px rgba(0,0,0,.05), 0 20px 50px rgba(0,0,0,.1)",
  },
  dark: {
    bg: "#1C1C1E",
    fill: "rgba(118,118,128,.24)",
    fill2: "rgba(118,118,128,.16)",
    label: "#FFFFFF",
    secondary: "rgba(235,235,245,.6)",
    tertiary: "rgba(235,235,245,.3)",
    separator: "rgba(84,84,88,.6)",
    blue: "#0A84FF",
    red: "#FF453A",
    green: "#30D158",
    shadow: "0 0 0 .5px rgba(255,255,255,.07), 0 24px 60px rgba(0,0,0,.55)",
  },
} as const;
type Theme = (typeof THEMES)[keyof typeof THEMES];

const FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Inter, 'Segoe UI', Roboto, sans-serif";
const EASE = "cubic-bezier(.2,.9,.25,1)";
const SPRING = "cubic-bezier(.34,1.56,.64,1)";

const CSS = \`
@keyframes su-next{from{opacity:0;transform:translateX(28px);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
@keyframes su-prev{from{opacity:0;transform:translateX(-28px);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
@keyframes su-pop{0%{transform:scale(.5);opacity:0}60%{transform:scale(1.12);opacity:1}100%{transform:scale(1)}}
@keyframes su-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
@keyframes su-spin{to{transform:rotate(360deg)}}
@keyframes su-draw{to{stroke-dashoffset:0}}
@keyframes su-ring{0%{transform:scale(.4);opacity:0}70%{transform:scale(1.06);opacity:1}100%{transform:scale(1)}}
@keyframes su-blink{50%{opacity:0}}
\`;

/* ---------- data ---------- */

export const COUNTRIES: Country[] = [
  { iso: "BR", name: "Brazil", dial: "+55", flag: "\u{1F1E7}\u{1F1F7}", mask: "(##) #####-####" },
  { iso: "FR", name: "France", dial: "+33", flag: "\u{1F1EB}\u{1F1F7}", mask: "# ## ## ## ##" },
  { iso: "DE", name: "Germany", dial: "+49", flag: "\u{1F1E9}\u{1F1EA}", mask: "### ########" },
  { iso: "IN", name: "India", dial: "+91", flag: "\u{1F1EE}\u{1F1F3}", mask: "##### #####" },
  { iso: "IT", name: "Italy", dial: "+39", flag: "\u{1F1EE}\u{1F1F9}", mask: "### ### ####" },
  { iso: "JP", name: "Japan", dial: "+81", flag: "\u{1F1EF}\u{1F1F5}", mask: "## #### ####" },
  { iso: "KZ", name: "Kazakhstan", dial: "+7", flag: "\u{1F1F0}\u{1F1FF}", mask: "### ### ## ##" },
  { iso: "NL", name: "Netherlands", dial: "+31", flag: "\u{1F1F3}\u{1F1F1}", mask: "# ########" },
  { iso: "RU", name: "Russia", dial: "+7", flag: "\u{1F1F7}\u{1F1FA}", mask: "### ###-##-##" },
  { iso: "ES", name: "Spain", dial: "+34", flag: "\u{1F1EA}\u{1F1F8}", mask: "### ### ###" },
  { iso: "SE", name: "Sweden", dial: "+46", flag: "\u{1F1F8}\u{1F1EA}", mask: "## ### ## ##" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971", flag: "\u{1F1E6}\u{1F1EA}", mask: "## ### ####" },
  { iso: "GB", name: "United Kingdom", dial: "+44", flag: "\u{1F1EC}\u{1F1E7}", mask: "#### ######" },
  { iso: "US", name: "United States", dial: "+1", flag: "\u{1F1FA}\u{1F1F8}", mask: "(###) ###-####" },
];

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d={d} />
  </svg>
);
/* brand marks from Simple Icons (CC0); logos remain trademarks of their owners */
export const DEFAULT_PROVIDERS: Provider[] = [
  { id: "apple", label: "Apple", icon: icon("M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701") },
  { id: "google", label: "Google", icon: icon("M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z") },
  { id: "github", label: "GitHub", icon: icon("M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12") },
];

/* ---------- helpers ---------- */

const EMAIL_RE = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const slots = (mask: string) => (mask.match(/#/g) || []).length;
const applyMask = (digits: string, mask: string) => {
  let out = "";
  let i = 0;
  for (const ch of mask) {
    if (i >= digits.length) break;
    if (ch === "#") out += digits[i++];
    else out += ch;
  }
  return out;
};

/* ---------- small HIG parts ---------- */

function Spinner({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "su-spin .8s linear infinite" }} aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="none" stroke={color} strokeOpacity=".25" strokeWidth="2.4" />
      <path d="M10 2a8 8 0 0 1 8 8" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function Button({
  children,
  onClick,
  disabled,
  loading,
  t,
  accent,
  variant = "filled",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  t: Theme;
  accent: string;
  variant?: "filled" | "plain";
  type?: "button" | "submit";
}) {
  const filled = variant === "filled";
  const off = disabled || loading;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={off}
      aria-busy={loading}
      className="relative flex h-[50px] w-full items-center justify-center rounded-[12px] text-[17px] font-semibold outline-none transition-[transform,background-color,color,opacity] duration-200 active:scale-[.98] focus-visible:ring-2 focus-visible:ring-offset-2 disabled:active:scale-100"
      style={{
        background: filled ? (disabled ? t.fill : accent) : "transparent",
        color: filled ? (disabled ? t.tertiary : "#fff") : accent,
        ["--tw-ring-color" as string]: accent,
        ["--tw-ring-offset-color" as string]: t.bg,
        cursor: off ? "default" : "pointer",
      }}
    >
      <span className="transition-opacity duration-200" style={{ opacity: loading ? 0 : 1 }}>
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 grid place-items-center">
          <Spinner color={filled ? "#fff" : accent} />
        </span>
      )}
    </button>
  );
}

function Check({ on, color, t }: { on: boolean; color: string; t: Theme }) {
  return (
    <span
      className="relative grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full transition-colors duration-200"
      style={{ background: on ? color : "transparent", boxShadow: on ? "none" : \`inset 0 0 0 1.5px \${t.tertiary}\` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: on ? "scale(1)" : "scale(.3)", opacity: on ? 1 : 0, transition: \`transform .35s \${SPRING}, opacity .2s\` }}
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

function Field({
  t,
  accent,
  error,
  children,
  focused,
}: {
  t: Theme;
  accent: string;
  error?: boolean;
  focused: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex h-[50px] items-center rounded-[12px] transition-shadow duration-200"
      style={{
        background: t.fill,
        boxShadow: error ? \`inset 0 0 0 1.5px \${t.red}\` : focused ? \`inset 0 0 0 1.5px \${accent}\` : "inset 0 0 0 1.5px transparent",
      }}
    >
      {children}
    </div>
  );
}

function ErrorText({ t, children }: { t: Theme; children: React.ReactNode }) {
  return (
    <p role="alert" className="m-0 mt-2 flex items-start gap-1.5 text-[13px] leading-[18px]" style={{ color: t.red, animation: "su-in .25s ease" }}>
      <svg viewBox="0 0 16 16" width="15" height="15" className="mt-[1.5px] shrink-0" aria-hidden="true">
        <circle cx="8" cy="8" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4.5v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="8" cy="11.2" r=".95" fill="currentColor" />
      </svg>
      <span>{children}</span>
    </p>
  );
}

function Segmented({ value, onChange, t }: { value: SignUpMethod; onChange: (m: SignUpMethod) => void; t: Theme }) {
  const items: { id: SignUpMethod; label: string }[] = [
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
  ];
  const i = items.findIndex((x) => x.id === value);
  const dark = t === THEMES.dark;
  return (
    <div role="tablist" aria-label="Sign up with" className="relative grid h-8 grid-cols-2 rounded-[9px] p-[2px]" style={{ background: t.fill }}>
      <div
        className="absolute bottom-[2px] left-[2px] top-[2px] w-[calc(50%-2px)] rounded-[7px]"
        style={{
          transform: \`translateX(\${i * 100}%)\`,
          transition: \`transform .35s \${EASE}\`,
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
          className="relative z-10 text-[13px] outline-none transition-[font-weight]"
          style={{ color: t.label, fontWeight: it.id === value ? 600 : 500 }}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function LogoPlaceholder({ t }: { t: Theme }) {
  return (
    <div className="flex h-8 items-center gap-2" aria-label="Logo">
      <span className="grid h-8 w-8 place-items-center rounded-[9px]" style={{ background: t.label }}>
        <span className="h-3 w-3 rotate-45 rounded-[3px]" style={{ background: t.bg }} />
      </span>
      <span className="text-[17px] font-semibold tracking-[-0.02em]" style={{ color: t.label }}>
        Logo
      </span>
    </div>
  );
}

/* ---------- one-time code ---------- */

function CodeInput({
  length,
  value,
  onChange,
  t,
  accent,
  error,
  disabled,
  shakeKey,
  inputRef,
}: {
  length: number;
  value: string;
  onChange: (v: string) => void;
  t: Theme;
  accent: string;
  error: boolean;
  disabled: boolean;
  shakeKey: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [focused, setFocused] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  /* shake on every wrong code, without remounting (keeps focus) */
  React.useEffect(() => {
    if (!shakeKey) return;
    wrapRef.current?.animate(
      [0, -9, 8, -6, 4, -2, 0].map((x) => ({ transform: \`translateX(\${x}px)\` })),
      { duration: 450, easing: "ease-out" },
    );
  }, [shakeKey]);
  return (
    <div ref={wrapRef} className="relative">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\\D/g, "").slice(0, length))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        inputMode="numeric"
        autoComplete="one-time-code"
        aria-label={\`\${length}-digit code\`}
        maxLength={length}
        disabled={disabled}
        className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0"
      />
      <div className="flex justify-between gap-2" aria-hidden="true">
        {Array.from({ length }, (_, i) => {
          const ch = value[i];
          const active = focused && !disabled && (i === value.length || (i === length - 1 && value.length === length));
          return (
            <div
              key={i}
              className="relative grid h-[58px] flex-1 place-items-center rounded-[12px] text-[26px] font-semibold tabular-nums transition-shadow duration-200"
              style={{
                background: t.fill,
                color: error ? t.red : t.label,
                boxShadow: error ? \`inset 0 0 0 1.5px \${t.red}\` : active ? \`inset 0 0 0 1.5px \${accent}\` : "inset 0 0 0 1.5px transparent",
                opacity: disabled ? 0.5 : 1,
              }}
            >
              {ch ? (
                <span key={ch + i} style={{ animation: \`su-pop .3s \${EASE}\` }}>
                  {ch}
                </span>
              ) : active ? (
                <span className="h-7 w-[2px] rounded-full" style={{ background: accent, animation: "su-blink 1s steps(1) infinite" }} />
              ) : (
                <span className="h-[3px] w-3 rounded-full" style={{ background: t.tertiary }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- main ---------- */

export function SignUpFlow({
  logo,
  theme = "light",
  accent: accentProp,
  defaultMethod = "email",
  defaultCountry = "US",
  countries = COUNTRIES,
  codeLength = 6,
  resendSeconds = 30,
  maxAttempts = 3,
  providers = DEFAULT_PROVIDERS,
  onSendCode,
  onVerify,
  onCreatePassword,
  onComplete,
  onProvider,
  onLogin,
  onStepChange,
  termsHref = "#",
  privacyHref = "#",
  demoCode = "420420",
  className = "",
}: SignUpFlowProps) {
  const t = THEMES[theme];
  const accent = accentProp ?? t.blue;
  const uid = React.useId();

  const [step, setStepState] = React.useState<SignUpStep>("start");
  const [dir, setDir] = React.useState<1 | -1>(1);
  const go = (s: SignUpStep, d: 1 | -1 = 1) => {
    setDir(d);
    setStepState(s);
    onStepChange?.(s);
  };

  /* start */
  const [method, setMethod] = React.useState<SignUpMethod>(defaultMethod);
  const [email, setEmail] = React.useState("");
  const [country, setCountry] = React.useState<Country>(() => countries.find((c) => c.iso === defaultCountry) ?? countries[0]);
  const [digits, setDigits] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [focus, setFocus] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [startError, setStartError] = React.useState("");

  const emailOk = EMAIL_RE.test(email.trim());
  const phoneOk = digits.length === slots(country.mask);
  const valueOk = method === "email" ? emailOk : phoneOk;
  const display = method === "email" ? email.trim() : \`\${country.dial} \${applyMask(digits, country.mask)}\`;
  const showFieldError = touched && !valueOk && (method === "email" ? email.length > 0 : digits.length > 0);

  /* verify */
  const [code, setCode] = React.useState("");
  const [codeError, setCodeError] = React.useState("");
  const [attempts, setAttempts] = React.useState(0);
  const [shake, setShake] = React.useState(0);
  const [left, setLeft] = React.useState(resendSeconds);
  const [help, setHelp] = React.useState(false);
  const [resent, setResent] = React.useState(false);
  const locked = attempts >= maxAttempts;

  /* password */
  const [pw, setPw] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const rules = [
    { label: "At least 8 characters", ok: pw.length >= 8 },
    { label: "One number", ok: /\\d/.test(pw) },
    { label: "One uppercase letter", ok: /[A-Z]/.test(pw) },
  ];
  const pwOk = rules.every((r) => r.ok);

  /* resend countdown */
  React.useEffect(() => {
    if (step !== "verify" || left <= 0) return;
    const id = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [step, left]);

  /* auto-focus the main field of each step */
  const startRef = React.useRef<HTMLInputElement>(null);
  const codeRef = React.useRef<HTMLInputElement>(null);
  const pwRef = React.useRef<HTMLInputElement>(null);
  const first = React.useRef(true);
  React.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = step === "start" ? startRef.current : step === "verify" ? codeRef.current : step === "password" ? pwRef.current : null;
    el?.focus({ preventScroll: true });
  }, [step, method]);

  /* animated card height */
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [h, setH] = React.useState<number | undefined>(undefined);
  React.useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    setH(el.offsetHeight);
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* actions */
  const send = async () => {
    setTouched(true);
    if (!valueOk || !agree || busy) return;
    setBusy(true);
    setStartError("");
    try {
      await (onSendCode ? onSendCode(method, display) : wait(800));
      setCode("");
      setCodeError("");
      setAttempts(0);
      setLeft(resendSeconds);
      setHelp(false);
      setResent(false);
      go("verify");
    } catch (e) {
      setStartError(e instanceof Error && e.message ? e.message : "Couldn't send the code. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const verify = async (c: string) => {
    if (busy || locked) return;
    setBusy(true);
    try {
      const ok = await (onVerify ? onVerify(c, method, display) : wait(700).then(() => c === demoCode));
      if (ok) {
        setCodeError("");
        go("password");
      } else {
        const n = attempts + 1;
        setAttempts(n);
        setShake((s) => s + 1);
        setTimeout(() => {
          setCode("");
          codeRef.current?.focus({ preventScroll: true });
        }, 650);
        setCodeError(
          n >= maxAttempts
            ? "Too many attempts. For your security, try again in 30 minutes."
            : \`That code isn't right. \${maxAttempts - n} \${maxAttempts - n === 1 ? "attempt" : "attempts"} left.\`,
        );
      }
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    if (left > 0 || busy) return;
    setBusy(true);
    try {
      await (onSendCode ? onSendCode(method, display) : wait(600));
      setLeft(resendSeconds);
      setCode("");
      setCodeError("");
      setResent(true);
    } finally {
      setBusy(false);
    }
  };

  const create = async () => {
    if (!pwOk || busy) return;
    setBusy(true);
    try {
      await (onCreatePassword ? onCreatePassword(pw) : wait(800));
      go("done");
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setEmail("");
    setDigits("");
    setAgree(false);
    setTouched(false);
    setPw("");
    setShowPw(false);
    setCode("");
    setAttempts(0);
    setCodeError("");
    go("start", -1);
  };

  const filtered = countries.filter((c) => (c.name + c.dial + c.iso).toLowerCase().includes(query.trim().toLowerCase()));
  const mm = \`\${Math.floor(left / 60)}:\${String(left % 60).padStart(2, "0")}\`;

  /* ---------- views ---------- */

  const title = (text: string, sub?: React.ReactNode) => (
    <div className="mb-6">
      <h2 className="m-0 text-[28px] font-bold leading-[34px] tracking-[-0.02em]" style={{ color: t.label }}>
        {text}
      </h2>
      {sub && (
        <p className="m-0 mt-2 text-[15px] leading-[21px]" style={{ color: t.secondary }}>
          {sub}
        </p>
      )}
    </div>
  );

  const back = (to: SignUpStep, label = "Back") => (
    <button
      type="button"
      onClick={() => go(to, -1)}
      className="-ml-1.5 flex h-8 items-center gap-0.5 rounded-lg pr-2 text-[17px] outline-none focus-visible:ring-2"
      style={{ color: accent, ["--tw-ring-color" as string]: accent }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 5l-7 7 7 7" />
      </svg>
      {label}
    </button>
  );

  let view: React.ReactNode = null;

  if (step === "start") {
    view = (
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <div className="mb-7 flex h-8 items-center">{logo ?? <LogoPlaceholder t={t} />}</div>
        {title("Create your account", method === "email" ? "Enter your email and we'll send you a code." : "Enter your phone number and we'll text you a code.")}

        <Segmented
          value={method}
          onChange={(m) => {
            setMethod(m);
            setTouched(false);
            setMenu(false);
            setStartError("");
          }}
          t={t}
        />

        <div className="mt-4">
          {method === "email" ? (
            <div key="email" style={{ animation: "su-in .25s ease" }}>
              <Field t={t} accent={accent} focused={focus === "email"} error={showFieldError}>
                <input
                  ref={startRef}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-label="Email"
                  aria-invalid={showFieldError}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocus("email")}
                  onBlur={() => {
                    setFocus(null);
                    if (email) setTouched(true);
                  }}
                  className="h-full w-full bg-transparent px-4 text-[17px] outline-none placeholder:opacity-100"
                  style={{ color: t.label }}
                />
              </Field>
              {showFieldError && <ErrorText t={t}>Enter a valid email, like name@example.com.</ErrorText>}
            </div>
          ) : (
            <div key="phone" style={{ animation: "su-in .25s ease" }}>
              <Field t={t} accent={accent} focused={focus === "phone"} error={showFieldError}>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={menu}
                  aria-label={\`Country: \${country.name} \${country.dial}\`}
                  onClick={() => {
                    setMenu((m) => !m);
                    setQuery("");
                  }}
                  className="flex h-full shrink-0 items-center gap-1.5 rounded-l-[12px] pl-3.5 pr-2.5 text-[17px] outline-none focus-visible:ring-2"
                  style={{ color: t.label, ["--tw-ring-color" as string]: accent }}
                >
                  <span className="text-[20px] leading-none">{country.flag}</span>
                  <span className="tabular-nums">{country.dial}</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke={t.secondary}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: menu ? "rotate(180deg)" : "none", transition: \`transform .3s \${EASE}\` }}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <span className="h-6 w-px" style={{ background: t.separator }} />
                <input
                  ref={startRef}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  aria-label="Phone number"
                  aria-invalid={showFieldError}
                  placeholder={country.mask.replace(/#/g, "0")}
                  value={applyMask(digits, country.mask)}
                  onChange={(e) => setDigits(e.target.value.replace(/\\D/g, "").slice(0, slots(country.mask)))}
                  onFocus={() => {
                    setFocus("phone");
                    setMenu(false);
                  }}
                  onBlur={() => {
                    setFocus(null);
                    if (digits) setTouched(true);
                  }}
                  className="h-full min-w-0 flex-1 bg-transparent pl-3 pr-2 text-[17px] tabular-nums outline-none"
                  style={{ color: t.label }}
                />
                {digits && (
                  <button
                    type="button"
                    aria-label="Clear"
                    onClick={() => {
                      setDigits("");
                      startRef.current?.focus();
                    }}
                    className="mr-3 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full"
                    style={{ background: t.tertiary, animation: \`su-pop .25s \${EASE}\` }}
                  >
                    <svg viewBox="0 0 24 24" width="10" height="10" stroke={t.bg} strokeWidth="3.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                )}
              </Field>

              {/* inline country list, the card grows to fit */}
              {menu && (
                <div className="mt-2 overflow-hidden rounded-[12px]" style={{ background: t.fill2, animation: "su-in .25s ease" }}>
                  <div className="p-2">
                    <div className="flex h-9 items-center gap-1.5 rounded-[10px] px-2.5" style={{ background: t.fill }}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={t.secondary} strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="6.5" />
                        <path d="M16 16l4 4" />
                      </svg>
                      <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        aria-label="Search countries"
                        className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none"
                        style={{ color: t.label }}
                      />
                    </div>
                  </div>
                  <ul role="listbox" aria-label="Countries" className="m-0 max-h-[200px] list-none overflow-y-auto p-0 pb-1 [scrollbar-width:thin]">
                    {filtered.map((c) => {
                      const sel = c.iso === country.iso;
                      return (
                        <li key={c.iso} role="option" aria-selected={sel}>
                          <button
                            type="button"
                            onClick={() => {
                              setCountry(c);
                              setDigits((d) => d.slice(0, slots(c.mask)));
                              setMenu(false);
                              requestAnimationFrame(() => startRef.current?.focus());
                            }}
                            className="flex h-11 w-full items-center gap-3 px-3.5 text-left text-[16px] outline-none transition-colors hover:bg-[rgba(118,118,128,.12)] focus-visible:bg-[rgba(118,118,128,.12)]"
                            style={{ color: t.label }}
                          >
                            <span className="text-[20px] leading-none">{c.flag}</span>
                            <span className="min-w-0 flex-1 truncate">{c.name}</span>
                            <span className="tabular-nums" style={{ color: t.secondary }}>
                              {c.dial}
                            </span>
                            <span className="w-4">
                              {sel && (
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={accent} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                                </svg>
                              )}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                    {filtered.length === 0 && (
                      <li className="px-3.5 py-3 text-[15px]" style={{ color: t.secondary }}>
                        No matches
                      </li>
                    )}
                  </ul>
                </div>
              )}
              {showFieldError && <ErrorText t={t}>{\`Enter the full number for \${country.name}.\`}</ErrorText>}
            </div>
          )}
        </div>

        <label className="mt-4 flex cursor-pointer items-start gap-3 text-[13px] leading-[18px]" style={{ color: t.secondary }}>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="peer sr-only" />
          <span className="rounded-full peer-focus-visible:ring-2" style={{ ["--tw-ring-color" as string]: accent }}>
            <Check on={agree} color={accent} t={t} />
          </span>
          <span className="pt-0.5">
            I agree to the{" "}
            <a href={termsHref} onClick={(e) => e.stopPropagation()} className="no-underline" style={{ color: accent }}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href={privacyHref} onClick={(e) => e.stopPropagation()} className="no-underline" style={{ color: accent }}>
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <div className="mt-5">
          <Button type="submit" t={t} accent={accent} disabled={!valueOk || !agree} loading={busy}>
            {method === "email" ? "Continue" : "Send code"}
          </Button>
          {startError && <ErrorText t={t}>{startError}</ErrorText>}
        </div>

        {providers.length > 0 && (
          <>
            <div className="my-5 flex items-center gap-3 text-[13px]" style={{ color: t.secondary }}>
              <span className="h-px flex-1" style={{ background: t.separator }} />
              or
              <span className="h-px flex-1" style={{ background: t.separator }} />
            </div>
            <div className="grid gap-2" style={{ gridTemplateColumns: \`repeat(\${providers.length}, minmax(0, 1fr))\` }}>
              {providers.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={\`Continue with \${p.label}\`}
                  title={\`Continue with \${p.label}\`}
                  onClick={() => onProvider?.(p.id)}
                  className="grid h-[46px] place-items-center rounded-[12px] outline-none transition-[transform,background-color] duration-200 hover:brightness-110 active:scale-[.96] focus-visible:ring-2"
                  style={{ background: t.fill, color: t.label, ["--tw-ring-color" as string]: accent }}
                >
                  {p.icon}
                </button>
              ))}
            </div>
          </>
        )}

        <p className="m-0 mt-5 text-center text-[15px]" style={{ color: t.secondary }}>
          Already have an account?{" "}
          <button type="button" onClick={onLogin} className="font-semibold outline-none" style={{ color: accent }}>
            Log in
          </button>
        </p>
      </form>
    );
  }

  if (step === "verify") {
    view = (
      <div>
        <div className="mb-5 flex h-8 items-center">{back("start")}</div>
        {title(
          method === "email" ? "Check your email" : "Check your messages",
          <>
            Enter the {codeLength}-digit code we sent to{" "}
            <span className="font-semibold" style={{ color: t.label }}>
              {display}
            </span>
            . It expires in 30 minutes.
          </>,
        )}

        <CodeInput
          length={codeLength}
          value={code}
          onChange={(v) => {
            setCode(v);
            if (codeError && !locked) setCodeError("");
            if (v.length === codeLength) verify(v);
          }}
          t={t}
          accent={accent}
          error={!!codeError}
          disabled={busy || locked}
          shakeKey={shake}
          inputRef={codeRef}
        />
        {codeError && <ErrorText t={t}>{codeError}</ErrorText>}
        {resent && !codeError && (
          <p className="m-0 mt-2 text-[13px]" style={{ color: t.green, animation: "su-in .25s ease" }}>
            New code sent.
          </p>
        )}

        <div className="mt-6">
          {locked ? (
            <Button t={t} accent={accent} onClick={reset}>
              Back to start
            </Button>
          ) : (
            <Button t={t} accent={accent} disabled={code.length < codeLength} loading={busy} onClick={() => verify(code)}>
              Verify
            </Button>
          )}
        </div>

        {!locked && (
          <div className="mt-4 flex items-center justify-between text-[15px]">
            <button
              type="button"
              onClick={resend}
              disabled={left > 0 || busy}
              className="font-medium tabular-nums outline-none transition-colors"
              style={{ color: left > 0 ? t.tertiary : accent }}
            >
              {left > 0 ? \`Resend code in \${mm}\` : "Resend code"}
            </button>
            <button type="button" aria-expanded={help} onClick={() => setHelp((x) => !x)} className="font-medium outline-none" style={{ color: accent }}>
              Didn't get it?
            </button>
          </div>
        )}

        {(help || locked) && (
          <div className="mt-4 rounded-[12px] p-1" style={{ background: t.fill2, animation: "su-in .3s ease" }}>
            {[
              method === "email" ? \`Make sure \${display} is right.\` : \`Make sure \${display} is right.\`,
              method === "email" ? "Look in Spam, Promotions or Updates." : "Check that your phone has signal and can receive texts.",
              "Wait a minute, then tap Resend code.",
              "Still nothing? Contact support.",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 px-3 py-2.5 text-[15px] leading-[20px]" style={{ color: t.label, borderTop: i ? \`0.5px solid \${t.separator}\` : "none" }}>
                <span className="mt-[1px] grid h-5 w-5 shrink-0 place-items-center rounded-full text-[12px] font-semibold" style={{ background: \`\${accent}22\`, color: accent }}>
                  {i + 1}
                </span>
                {tip}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (step === "password") {
    view = (
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          create();
        }}
      >
        <div className="mb-5 flex h-8 items-center">{back("verify")}</div>
        {title("Create a password", "You'll use it to sign in on new devices.")}
        <input type="text" name="username" autoComplete="username" value={display} readOnly hidden />
        <Field t={t} accent={accent} focused={focus === "pw"}>
          <input
            ref={pwRef}
            id={\`\${uid}-pw\`}
            type={showPw ? "text" : "password"}
            autoComplete="new-password"
            aria-label="Password"
            aria-describedby={\`\${uid}-rules\`}
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onFocus={() => setFocus("pw")}
            onBlur={() => setFocus(null)}
            className="h-full min-w-0 flex-1 bg-transparent px-4 text-[17px] outline-none"
            style={{ color: t.label, letterSpacing: showPw || !pw ? undefined : "0.12em" }}
          />
          <button
            type="button"
            aria-label={showPw ? "Hide password" : "Show password"}
            aria-pressed={showPw}
            onClick={() => setShowPw((s) => !s)}
            className="mr-1.5 grid h-10 w-10 place-items-center rounded-[10px] outline-none focus-visible:ring-2"
            style={{ color: t.secondary, ["--tw-ring-color" as string]: accent }}
          >
            <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
              <circle cx="12" cy="12" r="3" />
              <path d="M4 20L20 4" style={{ strokeDasharray: 23, strokeDashoffset: showPw ? 23 : 0, transition: \`stroke-dashoffset .3s \${EASE}\` }} />
            </svg>
          </button>
        </Field>

        <ul id={\`\${uid}-rules\`} className="m-0 mt-4 list-none space-y-2.5 p-0">
          {rules.map((r) => (
            <li key={r.label} className="flex items-center gap-2.5 text-[15px] transition-colors duration-200" style={{ color: r.ok ? t.label : t.secondary }}>
              <Check on={r.ok} color={t.green} t={t} />
              {r.label}
              <span className="sr-only">{r.ok ? "met" : "not met"}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Button type="submit" t={t} accent={accent} disabled={!pwOk} loading={busy}>
            Create account
          </Button>
        </div>
      </form>
    );
  }

  if (step === "done") {
    view = (
      <div className="flex flex-col items-center pb-1 pt-4 text-center">
        <div className="grid h-[76px] w-[76px] place-items-center rounded-full" style={{ background: \`\${t.green}24\`, animation: \`su-ring .5s \${EASE}\` }}>
          <svg viewBox="0 0 52 52" width="44" height="44" fill="none" aria-hidden="true">
            <circle cx="26" cy="26" r="22" fill={t.green} style={{ transformOrigin: "26px 26px", animation: \`su-ring .45s \${SPRING} .05s both\` }} />
            <path
              d="M16 27l7 7 13-15"
              stroke="#fff"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: \`su-draw .45s \${EASE} .35s forwards\` }}
            />
          </svg>
        </div>
        <h2 className="m-0 mt-5 text-[28px] font-bold leading-[34px] tracking-[-0.02em]" style={{ color: t.label }}>
          You're all set
        </h2>
        <p className="m-0 mt-2 max-w-[280px] text-[15px] leading-[21px]" style={{ color: t.secondary }}>
          Your account for{" "}
          <span className="font-semibold" style={{ color: t.label }}>
            {display}
          </span>{" "}
          is ready.
        </p>
        <div className="mt-7 w-full">
          <Button t={t} accent={accent} onClick={() => onComplete?.({ method, value: display })}>
            Get started
          </Button>
        </div>
        <button type="button" onClick={reset} className="mt-3 h-9 text-[15px] font-medium outline-none" style={{ color: accent }}>
          Start over
        </button>
      </div>
    );
  }

  return (
    <div
      className={\`w-full max-w-[400px] overflow-hidden rounded-[24px] \${className}\`}
      style={{
        background: t.bg,
        boxShadow: t.shadow,
        fontFamily: FONT,
        WebkitFontSmoothing: "antialiased",
        height: h,
        transition: \`height .45s \${EASE}\`,
      }}
    >
      <style>{CSS}</style>
      <div ref={innerRef} className="px-6 pb-6 pt-6">
        <style>{\`[data-su] input::placeholder{color:\${t.tertiary}}\`}</style>
        <div data-su key={step} style={{ animation: \`\${dir > 0 ? "su-next" : "su-prev"} .45s \${EASE}\` }}>
          {view}
        </div>
      </div>
    </div>
  );
}

export default SignUpFlow;
`],["demo.tsx",`"use client";

import * as React from "react";
import { SignUpFlow } from "@/components/ui/component";

/* Live controls (21st Demo Controls). */
const settings = {
  darkMode: false,
  startWithPhone: false,
  socialButtons: true,
};

export default function SignUpFlowDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  const dark = s.darkMode;

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center gap-6 px-4 py-12"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, 'Segoe UI', Roboto, sans-serif",
        /* dot grid from the "work with AI" block of vasnev.art */
        backgroundColor: dark ? "#000000" : "#F2F2F7",
        backgroundImage: \`radial-gradient(circle, \${dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.07)"} 0 1px, transparent 1.4px)\`,
        backgroundSize: "20px 13px",
        backgroundPosition: "-6px -1px",
      }}
    >
      <SignUpFlow
        key={\`\${s.startWithPhone}\`}
        theme={dark ? "dark" : "light"}
        defaultMethod={s.startWithPhone ? "phone" : "email"}
        providers={s.socialButtons ? undefined : []}
      />
      <p className="m-0 text-center text-[13px] leading-[18px]" style={{ color: dark ? "rgba(235,235,245,.6)" : "rgba(60,60,67,.6)" }}>
        Demo code: <b>420420</b>. Any other code shows an error.
      </p>
    </div>
  );
}
`]],mount(a,o){let s=(0,Yn.createRoot)(a);return s.render(yn.createElement(nn,o)),{update:i=>s.render(yn.createElement(nn,i)),unmount:()=>s.unmount()}}};})();
