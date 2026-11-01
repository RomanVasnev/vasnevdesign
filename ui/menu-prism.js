(()=>{var hn=Object.create;var je=Object.defineProperty;var gn=Object.getOwnPropertyDescriptor;var vn=Object.getOwnPropertyNames;var bn=Object.getPrototypeOf,xn=Object.prototype.hasOwnProperty;var he=(t,n)=>()=>{try{return n||t((n={exports:{}}).exports,n),n.exports}catch(a){throw n=0,a}};var wn=(t,n,a,s)=>{if(n&&typeof n=="object"||typeof n=="function")for(let c of vn(n))!xn.call(t,c)&&c!==a&&je(t,c,{get:()=>n[c],enumerable:!(s=gn(n,c))||s.enumerable});return t};var I=(t,n,a)=>(a=t!=null?hn(bn(t)):{},wn(n||!t||!t.__esModule?je(a,"default",{value:t,enumerable:!0}):a,t));var ge=he((Sn,Ye)=>{Ye.exports=window.__R.react});var Je=he((Cn,Ke)=>{Ke.exports=window.__R["react-dom/client"]});var q=he((Ln,Qe)=>{Qe.exports=window.__R["react/jsx-runtime"]});var xe=I(ge()),sn=I(Je());var m=I(ge()),f=I(q()),K=16,yn=`precision highp float;
#define NR ${K}
uniform vec2 uRes;uniform float uDpr,uT,uDark,uFade,uTime;
uniform vec3 uBg,uFg;
uniform sampler2D uText;
uniform vec2 uV0,uV1,uV2;          // glass triangle (already shrunk by the corner radius)
uniform float uRound;
uniform vec2 uDepth;               // extrusion of the back face, for the 3D read
uniform vec2 uS,uE,uDir0;          // beam source, entry point, incoming direction
uniform vec2 uX[NR];uniform vec2 uD[NR];uniform float uOk[NR];uniform vec3 uC[NR];
uniform vec2 uShift;               // small drift of the view through the glass
uniform vec2 uC0;                  // prism centre
uniform float uHeadIn,uFanLen;     // intro: length of the incoming beam and of the fan

float sdTri(vec2 p,vec2 p0,vec2 p1,vec2 p2){
  vec2 e0=p1-p0,e1=p2-p1,e2=p0-p2,v0=p-p0,v1=p-p1,v2=p-p2;
  vec2 pq0=v0-e0*clamp(dot(v0,e0)/dot(e0,e0),0.,1.);
  vec2 pq1=v1-e1*clamp(dot(v1,e1)/dot(e1,e1),0.,1.);
  vec2 pq2=v2-e2*clamp(dot(v2,e2)/dot(e2,e2),0.,1.);
  float s=sign(e0.x*e2.y-e0.y*e2.x);
  vec2 d=min(min(vec2(dot(pq0,pq0),s*(v0.x*e0.y-v0.y*e0.x)),vec2(dot(pq1,pq1),s*(v1.x*e1.y-v1.y*e1.x))),vec2(dot(pq2,pq2),s*(v2.x*e2.y-v2.y*e2.x)));
  return -sqrt(d.x)*sign(d.y);
}
float prism(vec2 p){return sdTri(p,uV0,uV1,uV2)-uRound;}
float seg(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);return length(pa-ba*h);}

float dotMask(vec2 p){vec2 g=vec2(20.,13.);vec2 q=mod(p+vec2(6.,1.)+g*.5,g)-g*.5;return 1.-smoothstep(.45,1.15,length(q));}
vec3 scene(vec2 p){
  vec3 c=uBg;
  c=mix(c,uFg,(uDark>.5?.12:.14)*dotMask(p));
  float t=texture2D(uText,clamp(p/uRes,0.,1.)).a;
  return mix(c,uFg,t*.97);
}
/* incoming white beam + the spectrum fan, as rgb light */
vec3 beams(vec2 p,out float white){
  vec3 L=vec3(0.);white=0.;
  // incoming
  vec2 head=uS+uDir0*uHeadIn;
  float di=seg(p,uS,head);
  float wi=exp(-di*di/1.6)+.16*exp(-di*di/120.);
  white=wi;L+=vec3(wi);
  // fan
  for(int i=0;i<NR;i++){
    if(uOk[i]<.5)continue;
    vec2 q=p-uX[i];float t=dot(q,uD[i]);
    if(t<0.)continue;
    float d=abs(q.x*uD[i].y-q.y*uD[i].x);
    float w=1.2+t*.022;
    float f=(exp(-d*d/(w*w))+.22*exp(-d*d/(w*w*16.)))*smoothstep(uFanLen,uFanLen-120.,t)/(1.+t*.0011);
    L+=uC[i]*f*(2.4/float(NR));
  }
  return L*uFade;
}
/* faint rays travelling inside the glass */
vec3 inner(vec2 p){
  vec3 L=vec3(0.);
  if(uFanLen<=0.)return L;
  for(int i=0;i<NR;i++){if(uOk[i]<.5)continue;float d=seg(p,uE,uX[i]);L+=mix(vec3(1.),uC[i],.75)*exp(-d*d/3.)*(.9/float(NR));}
  float de=length(p-uE);L+=vec3(1.)*exp(-de*de/90.)*.55;
  return L*uFade;
}

void main(){
  vec2 p=vec2(gl_FragCoord.x,uRes.y*uDpr-gl_FragCoord.y)/uDpr;   // css px, y down
  float aa=.8/uDpr+.35;
  float dF=prism(p);
  // back face and the sides of the extruded prism
  float dH=dF;for(int k=1;k<=4;k++){dH=min(dH,prism(p-uDepth*float(k)*.25));}

  vec3 col;
  float wb;vec3 B=beams(p,wb);
  vec3 outside=scene(p);
  float dm=dotMask(p);
  if(uDark>.5){outside+=B*(.2+2.6*dm);}
  else{float I=max(B.r,max(B.g,B.b));vec3 hue=B/max(I,1e-4);hue=mix(hue,vec3(.32),wb/max(I,1e-4)*.9);outside=mix(outside,hue*.92,clamp(I*(.3+1.7*dm),0.,.85));}

  // side glass: a light, slightly shifted look through the depth
  vec3 side=scene(p-uDepth*.6)*(uDark>.5?.92:.97)+(uDark>.5?.028:-.015);
  if(uDark>.5)side+=B*.25;
  col=mix(side,outside,smoothstep(-aa,aa,dH));

  // front face
  if(dF<2.){
    float e=1.;
    vec2 g=vec2(prism(p+vec2(e,0.))-prism(p-vec2(e,0.)),prism(p+vec2(0.,e))-prism(p-vec2(0.,e)));g=g/max(length(g),1e-4);
    float bevel=16.;float h=clamp(-dF/bevel,0.,1.);float slope=pow(1.-h,1.6);
    vec3 N=normalize(vec3(g*slope*1.35,1.));
    vec2 off=-N.xy*30.-(p-uC0)*.22+uShift;
    vec3 refr=vec3(scene(p+off*1.).r,scene(p+off*1.07).g,scene(p+off*1.15).b);
    vec3 glass=refr*(uDark>.5?vec3(.9,.92,1.):vec3(.96,.97,1.))+(uDark>.5?.03:.0);
    // fresnel rim and a highlight on the bevel facing the light
    float fr=pow(1.-N.z,1.5);
    vec3 Ld=normalize(vec3(-uDir0,.9));vec3 H=normalize(Ld+vec3(0.,0.,1.));
    float sp=pow(max(dot(N,H),0.),48.);
    float band=exp(-pow(dot(p-uC0,vec2(.8,-.6))/(length(uV0-uC0)*.22)-.35,2.));
    vec3 iri=.5+.5*cos(6.2831*(dot(p-uC0,vec2(.004,.003))+vec3(0.,.33,.67)));
    glass+=vec3(1.)*(fr*.3+sp*.85+band*(uDark>.5?.05:.03))+iri*fr*(uDark>.5?.14:.08);
    if(uDark<.5)glass-=vec3(fr*.10);
    vec3 IN=inner(p);
    if(uDark>.5)glass+=IN;
    else{float I=max(IN.r,max(IN.g,IN.b));vec3 hue=IN/max(I,1e-4);hue=mix(vec3(.45),hue,clamp((I-min(IN.r,min(IN.g,IN.b)))/max(I,1e-4)*2.,0.,1.));glass=mix(glass,hue*.85,clamp(I*.7,0.,.7));}
    col=mix(glass,col,smoothstep(-aa,aa,dF));
  }

  // edges: front, back and connectors
  vec2 b0=uV0+uDepth,b1=uV1+uDepth,b2=uV2+uDepth;
  vec3 lineC=uDark>.5?vec3(1.):vec3(0.);
  float ef=abs(dF);float lf=1.-smoothstep(.0,aa*1.6,ef);
  float eb=min(min(seg(p,b0,b1),seg(p,b1,b2)),seg(p,b2,b0))-uRound;eb=abs(eb);float lb=1.-smoothstep(0.,aa*1.6,eb);
  float ec=min(min(seg(p,uV0+normalize(uV0-uC0)*uRound,b0+normalize(uV0-uC0)*uRound),seg(p,uV1+normalize(uV1-uC0)*uRound,b1+normalize(uV1-uC0)*uRound)),seg(p,uV2+normalize(uV2-uC0)*uRound,b2+normalize(uV2-uC0)*uRound));float lc=1.-smoothstep(.2,.2+aa*1.6,ec);
  col=mix(col,lineC,lb*(uDark>.5?.16:.14));
  col=mix(col,lineC,lc*(uDark>.5?.22:.18));
  col=mix(col,lineC,lf*(uDark>.5?.55:.45));
  gl_FragColor=vec4(col,1.);
}`,Rn="attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";function kn(t){let n=(R,b,g)=>Math.exp(-(((R-b)/g)**2)),a=n(t,610,55)+.35*n(t,415,28),s=n(t,540,50),c=n(t,455,38),u=n(t,455,22);a+=u*.12,s-=u*.1;let v=Math.max(a,s,c,.001);return[a/v*.9+.1*a,s/v*.9+.1*s,c/v]}var rn=Array.from({length:K},(t,n)=>700-n*(300/(K-1))),Ze=rn.map(t=>1.33+.03/(t/1e3)**2),Tn=new Float32Array(rn.flatMap(kn)),_=(t,n)=>[t[0]-n[0],t[1]-n[1]],ve=(t,n)=>[t[0]+n[0],t[1]+n[1]],F=(t,n)=>[t[0]*n,t[1]*n],be=(t,n)=>t[0]*n[0]+t[1]*n[1],J=t=>{let n=Math.hypot(t[0],t[1])||1;return[t[0]/n,t[1]/n]};function en(t,n,a,s){let c=null;for(let u=0;u<3;u++){if(u===s)continue;let v=a[u],R=_(a[(u+1)%3],v),b=n[0]*R[1]-n[1]*R[0];if(Math.abs(b)<1e-9)continue;let g=_(v,t),H=(g[0]*R[1]-g[1]*R[0])/b,O=(g[0]*n[1]-g[1]*n[0])/b;H>1e-4&&O>=0&&O<=1&&(!c||H<c.t)&&(c={t:H,k:u,p:ve(t,F(n,H))})}return c}function nn(t,n,a){let s=t[n],c=t[(n+1)%3],u=J([c[1]-s[1],-(c[0]-s[0])]);return be(u,_(s,a))<0&&(u=F(u,-1)),u}function tn(t,n,a){let s=-be(n,t),c=1-a*a*(1-s*s);return c<0?null:J(ve(F(t,a),F(n,a*s-Math.sqrt(c))))}function Dn(){let t=document.createElement("canvas");t.width=t.height=1;let n=t.getContext("2d",{willReadFrequently:!0});return a=>{n.clearRect(0,0,1,1),n.fillStyle="#000",n.fillStyle=a,n.fillRect(0,0,1,1);let s=n.getImageData(0,0,1,1).data;return[s[0]/255,s[1]/255,s[2]/255]}}var on=m.forwardRef(function({headline:n,eyebrow:a,description:s,actions:c,accent:u="#3c2cff",fontFamily:v="Geist, ui-sans-serif, system-ui, -apple-system, sans-serif",fontWeight:R=600,scrollRotate:b=!0,scrollHint:g={rotate:"Scroll to rotate",back:"Scroll up"},className:H="",style:O,...ln},cn){let Z=m.useRef(null),we=m.useRef(null),ye=m.useRef(null),ee=m.useRef(null),$=m.useRef(null),ne=m.useRef(null),Re=m.useRef(()=>{}),[un,P]=m.useState(!1),[dn,te]=m.useState(!1);m.useImperativeHandle(cn,()=>({replay:()=>Re.current()}),[]),m.useEffect(()=>{let T=we.current,U=ye.current,e=U.getContext("webgl",{antialias:!1,premultipliedAlpha:!1,alpha:!1});if(!e||e.isContextLost()){te(!0),P(!0);return}let W=window.matchMedia("(prefers-reduced-motion: reduce)").matches,ke=(r,o)=>{let p=e.createShader(r);return p?(e.shaderSource(p,o),e.compileShader(p),e.getShaderParameter(p,e.COMPILE_STATUS)?p:(console.warn(e.getShaderInfoLog(p)),e.deleteShader(p),null)):null},oe=ke(e.VERTEX_SHADER,Rn),ae=ke(e.FRAGMENT_SHADER,yn),D=e.createProgram();if(!oe||!ae||!D){te(!0),P(!0);return}if(e.attachShader(D,oe),e.attachShader(D,ae),e.linkProgram(D),!e.getProgramParameter(D,e.LINK_STATUS)){te(!0),P(!0);return}e.useProgram(D);let Te=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Te),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);let De=e.getAttribLocation(D,"a");e.enableVertexAttribArray(De),e.vertexAttribPointer(De,2,e.FLOAT,!1,0,0);let l={};["uRes","uDpr","uT","uDark","uFade","uTime","uBg","uFg","uText","uV0","uV1","uV2","uRound","uDepth","uS","uE","uDir0","uX","uD","uOk","uC","uShift","uC0","uHeadIn","uFanLen"].forEach(r=>l[r]=e.getUniformLocation(D,r));let ie=e.createTexture();e.bindTexture(e.TEXTURE_2D,ie),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.uniform3fv(l.uC,Tn),e.uniform1i(l.uText,0);let Ee=Dn(),Ve=0,x=0,w=0,C=1,G=[0,0,0],Se=[1,1,1],Ce=!0,Le=()=>{let r=getComputedStyle(T);G=Ee(r.backgroundColor),Se=Ee(r.color),Ce=.2126*G[0]+.7152*G[1]+.0722*G[2]<.5},fn=()=>{let r=document.createElement("canvas");r.width=x*C,r.height=w*C;let o=r.getContext("2d");o.scale(C,C);let p=d=>`${R} ${d}px ${v}`,E=n.split(/\s+/),h=Math.min(x*.085,w*.14,128),i=[];for(;;){o.font=p(h);try{o.letterSpacing=`${-h*.05}px`}catch{}i=[];let d="";for(let k of E){let z=d?d+" "+k:k;o.measureText(z).width>x*.88&&d?(i.push(d),d=k):d=z}if(i.push(d),i.length<=2&&i.every(k=>o.measureText(k).width<=x*.9)||h<28)break;h*=.92}o.font=p(h),o.textAlign="center",o.textBaseline="middle",o.fillStyle="#fff";try{o.letterSpacing=`${-h*.05}px`}catch{}let V=h,S=w*.29-(i.length-1)*V/2;i.forEach((d,k)=>o.fillText(d,x/2,S+k*V)),Ve=S+(i.length-1)*V+h*.36,e.bindTexture(e.TEXTURE_2D,ie),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r)},Me=()=>{let r=T.getBoundingClientRect();x=Math.max(1,Math.round(r.width)),w=Math.max(1,Math.round(r.height)),C=Math.min(2,window.devicePixelRatio||1),U.width=x*C,U.height=w*C,e.viewport(0,0,U.width,U.height),fn()},se=.3,j=0,M=[0,0],N=0,Ne=performance.now(),Y=!1,le=0,y={x:.5,y:.5,on:!1},mn=()=>{let r=Math.min(x*.15,w*.22,200),o=[x*.5,Math.min(w*.56,Math.max(w*.46,Ve+r*.72))],p=j+.4,E=[0,1,2].map(L=>{let B=p+L*2*Math.PI/3;return[o[0]+r*Math.sin(B),o[1]-r*Math.cos(B)]}),h=Math.max(4,r*.045),i=E.map(L=>ve(o,F(_(L,o),1-2*h/r))),V=[-60,w*se],S=J(_([o[0]-r*.4,o[1]-r*.2],V)),d=en(V,S,E,-1),k=[],z=[],ze=[];for(let L=0;L<K;L++){let B=0,Be=[0,0],Xe=[1,0];if(d){let A=tn(S,nn(E,d.k,o),1/Ze[L]),qe=d.p,Oe=d.k;for(let $e=0;$e<4&&A;$e++){let X=en(qe,A,E,Oe);if(!X)break;let pe=nn(E,X.k,o),We=tn(A,F(pe,-1),Ze[L]);if(We){Be=X.p,Xe=We,B=1;break}A=J(_(A,F(pe,2*be(A,pe)))),qe=X.p,Oe=X.k}}k.push(...Be),z.push(...Xe),ze.push(B)}return{R:r,C:o,Vs:i,rr:h,S:V,d0:S,E:d?d.p:o,X:k,D:z,ok:ze}},ce=()=>{if(ee.current&&(ee.current.style.opacity=Y?String(Math.max(0,1-N*1.6)):""),$.current&&ne.current&&g){let r=N>.85;$.current.dataset.up=r?"true":"false",ne.current.textContent=r?g.back:g.rotate,$.current.style.opacity=Y?String(r?1:Math.max(0,1-N*5)):"0"}},ue=()=>{if(!b)return;let r=Z.current.getBoundingClientRect();N=Math.min(1,Math.max(0,-r.top/(window.innerHeight*.7))),ce()},Ie=()=>{b&&N>0&&Z.current?.scrollIntoView({block:"start"}),Ne=performance.now(),Y=!1,P(!1),ce(),window.clearTimeout(le),le=window.setTimeout(()=>{Y=!0,P(!0),ce()},W?0:1500)};Re.current=Ie;let de=0,fe=!0,Fe=!0,pn=0,He=r=>1-Math.pow(1-Math.min(1,Math.max(0,r)),3),Ae=r=>{if(!fe||(de=requestAnimationFrame(Ae),!Fe))return;pn++%30===0&&Le();let o=W?99:(r-Ne)/1e3,p=(y.on?(y.x-.5)*.2:0)+N*1.35,E=y.on?.2+Math.min(1,Math.max(0,y.y/.8))*.3:.3+(W?0:Math.sin(r/1e3*.45)*.04),h=y.on?[(y.x-.5)*16,(y.y-.5)*10]:[0,0];j+=(p-j)*.06,se+=(E-se)*.05,M=[M[0]+(h[0]-M[0])*.06,M[1]+(h[1]-M[1])*.06];let i=mn(),V=Math.hypot(i.E[0]-i.S[0],i.E[1]-i.S[1]);e.uniform2f(l.uRes,x,w),e.uniform1f(l.uDpr,C),e.uniform1f(l.uT,o),e.uniform1f(l.uDark,Ce?1:0),e.uniform1f(l.uFade,(1-N)*(W?1:.96+.04*Math.sin(r/1e3*2.1))),e.uniform1f(l.uTime,r/1e3),e.uniform3fv(l.uBg,G),e.uniform3fv(l.uFg,Se),e.uniform2fv(l.uV0,i.Vs[0]),e.uniform2fv(l.uV1,i.Vs[1]),e.uniform2fv(l.uV2,i.Vs[2]),e.uniform1f(l.uRound,i.rr),e.uniform2f(l.uDepth,i.R*.12+M[0],-i.R*.13+M[1]),e.uniform2fv(l.uC0,i.C),e.uniform2fv(l.uS,i.S),e.uniform2fv(l.uE,i.E),e.uniform2fv(l.uDir0,i.d0),e.uniform2fv(l.uX,i.X),e.uniform2fv(l.uD,i.D),e.uniform1fv(l.uOk,i.ok);let S=j+.6;e.uniform2f(l.uShift,Math.cos(S)*i.R*.04,Math.sin(S)*i.R*.03),e.uniform1f(l.uHeadIn,V*He(o/.9)),e.uniform1f(l.uFanLen,o<.9?0:Math.hypot(x,w)*1.2*He((o-.9)/1.4)+120),e.drawArrays(e.TRIANGLES,0,3)},_e=r=>{let o=T.getBoundingClientRect();y.x=(r.clientX-o.left)/o.width,y.y=(r.clientY-o.top)/o.height,y.on=!0},Pe=()=>{y.on=!1},me=0,Ue=new ResizeObserver(()=>{window.clearTimeout(me),me=window.setTimeout(Me,120)}),Ge=new IntersectionObserver(([r])=>{Fe=r.isIntersecting});return T.addEventListener("pointermove",_e),T.addEventListener("pointerleave",Pe),window.addEventListener("scroll",ue,{passive:!0,capture:!0}),(document.fonts?.load?document.fonts.load(`${R} 100px ${v}`).catch(()=>[]):Promise.resolve([])).then(()=>{fe&&(Le(),Me(),ue(),Ie(),Ue.observe(T),Ge.observe(T),de=requestAnimationFrame(Ae))}),()=>{fe=!1,cancelAnimationFrame(de),window.clearTimeout(le),window.clearTimeout(me),Ue.disconnect(),Ge.disconnect(),T.removeEventListener("pointermove",_e),T.removeEventListener("pointerleave",Pe),window.removeEventListener("scroll",ue,{capture:!0}),e.deleteTexture(ie),e.deleteBuffer(Te),e.deleteProgram(D),e.deleteShader(oe),e.deleteShader(ae)}},[n,v,R,b]);let re=`transition-[opacity,transform] duration-1000 [transition-timing-function:cubic-bezier(.2,.9,.25,1)] ${un?"translate-y-0 opacity-100":"translate-y-2.5 opacity-0"}`;return(0,f.jsx)("section",{ref:Z,className:`relative w-full bg-background text-foreground ${H}`,style:{height:b?"calc(100svh + 90vh)":void 0,...O},...ln,children:(0,f.jsxs)("div",{ref:we,className:"sticky top-0 h-[100svh] min-h-[560px] w-full overflow-hidden bg-background text-foreground",style:{fontFamily:v},children:[(0,f.jsx)("canvas",{ref:ye,"aria-hidden":"true",className:"absolute inset-0 h-full w-full"}),(0,f.jsx)("h1",{className:dn?"absolute inset-x-0 top-[22vh] m-0 px-5 text-center text-[clamp(40px,8vw,112px)] font-semibold leading-none tracking-[-0.05em]":"sr-only",children:n}),(0,f.jsxs)("div",{ref:ee,className:"pointer-events-none absolute inset-0",children:[a&&(0,f.jsx)("div",{className:`absolute inset-x-0 top-[9vh] flex justify-center ${re}`,children:(0,f.jsxs)("span",{className:"inline-flex h-[30px] items-center gap-2 rounded-full border border-border bg-muted/60 px-3 text-[13px] font-medium tracking-[-0.01em] text-muted-foreground backdrop-blur-md",children:[(0,f.jsx)("i",{className:"size-1.5 rounded-full",style:{background:u,boxShadow:`0 0 10px ${u}`}}),a]})}),(0,f.jsxs)("div",{className:"absolute inset-0 flex flex-col items-center justify-end px-5 pb-[max(15vh,104px)] text-center",children:[s&&(0,f.jsx)("p",{className:`m-0 max-w-[600px] text-[17px] leading-[25px] tracking-[-0.02em] text-muted-foreground ${re} delay-100`,children:s}),c&&(0,f.jsx)("div",{className:`pointer-events-auto mt-[22px] flex flex-wrap justify-center gap-2.5 ${re} delay-200`,children:c})]})]}),b&&g&&(0,f.jsxs)("div",{ref:$,"aria-hidden":"true","data-up":"false",className:"group/hint pointer-events-none absolute bottom-[22px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[12px] font-medium tracking-[0.02em] text-muted-foreground opacity-0 transition-opacity duration-700",children:[(0,f.jsx)("div",{className:"relative h-[34px] w-[22px] rounded-[11px] border-[1.5px] border-[color-mix(in_oklab,var(--color-foreground)_28%,transparent)] transition-transform duration-500 group-data-[up=true]/hint:rotate-180",children:(0,f.jsx)("span",{className:"absolute left-1/2 top-[7px] -ml-[1.5px] h-[7px] w-[3px] rounded-sm motion-safe:animate-[prism-wheel_1.8s_cubic-bezier(.6,0,.3,1)_infinite]",style:{background:u,boxShadow:`0 0 8px ${u}`}})}),(0,f.jsx)("span",{ref:ne,children:g.rotate})]}),(0,f.jsx)("style",{children:"@keyframes prism-wheel{0%{transform:translateY(0);opacity:0}20%{opacity:1}70%{transform:translateY(10px);opacity:0}100%{opacity:0}}"})]})})});var an=I(q());function Q(){return(0,an.jsx)(on,{headline:"vasnev.art",scrollRotate:!1,scrollHint:!1})}(window.__UI=window.__UI||{})["menu-prism"]={css:`/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --spacing: 0.25rem;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
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
  .\\!visible {
    visibility: visible !important;
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
  .top-\\[9vh\\] {
    top: 9vh;
  }
  .top-\\[22vh\\] {
    top: 22vh;
  }
  .bottom-\\[22px\\] {
    bottom: 22px;
  }
  .left-1\\/2 {
    left: calc(1 / 2 * 100%);
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
  .inline-flex {
    display: inline-flex;
  }
  .size-1\\.5 {
    width: calc(var(--spacing) * 1.5);
    height: calc(var(--spacing) * 1.5);
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
  .resize {
    resize: both;
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
  .bg-muted\\/60 {
    background-color: var(--muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--muted) 60%, transparent);
    }
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
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
  .text-\\[17px\\] {
    font-size: 17px;
  }
  .leading-\\[25px\\] {
    --tw-leading: 25px;
    line-height: 25px;
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
  .tracking-\\[-0\\.02em\\] {
    --tw-tracking: -0.02em;
    letter-spacing: -0.02em;
  }
  .tracking-\\[-0\\.05em\\] {
    --tw-tracking: -0.05em;
    letter-spacing: -0.05em;
  }
  .tracking-\\[0\\.02em\\] {
    --tw-tracking: 0.02em;
    letter-spacing: 0.02em;
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
  .opacity-100 {
    opacity: 100%;
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
  .group-data-\\[up\\=true\\]\\/hint\\:rotate-180:is(:where(.group\\/hint)[data-up="true"] *) {
    rotate: 180deg;
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
}`,settings:{},themeable:!0,files:[["component.tsx",`"use client";

import * as React from "react";

/* ------------------------------------------------------------------ */
/*  Glass Prism Hero: a glass prism splits a beam of white light into  */
/*  a spectrum that falls across a dot grid. The cursor moves the      */
/*  light source, scrolling turns the prism and dims the light.        */
/*  Plain WebGL, no dependencies. Background and text colors come     */
/*  from the theme (bg-background / text-foreground).                  */
/* ------------------------------------------------------------------ */

export interface GlassPrismHeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Headline drawn into the scene (the glass refracts it). Also rendered as a real <h1>. */
  headline: string;
  /** Small pill above the headline. */
  eyebrow?: React.ReactNode;
  /** Supporting line under the prism. */
  description?: React.ReactNode;
  /** Buttons or links under the description. */
  actions?: React.ReactNode;
  /** Accent for the eyebrow dot and the scroll hint. */
  accent?: string;
  /** Font for the headline. Make sure it is loaded on the page. */
  fontFamily?: string;
  fontWeight?: number;
  /** Turn the prism and dim the light while the page scrolls. */
  scrollRotate?: boolean;
  /** Labels for the scroll hint, or false to hide it. */
  scrollHint?: { rotate: string; back: string } | false;
}

export interface GlassPrismHeroHandle {
  /** Play the intro again. */
  replay: () => void;
}

const NR = 16; // wavelengths in the fan

const FS = \`precision highp float;
#define NR \${NR}
uniform vec2 uRes;uniform float uDpr,uT,uDark,uFade,uTime;
uniform vec3 uBg,uFg;
uniform sampler2D uText;
uniform vec2 uV0,uV1,uV2;          // glass triangle (already shrunk by the corner radius)
uniform float uRound;
uniform vec2 uDepth;               // extrusion of the back face, for the 3D read
uniform vec2 uS,uE,uDir0;          // beam source, entry point, incoming direction
uniform vec2 uX[NR];uniform vec2 uD[NR];uniform float uOk[NR];uniform vec3 uC[NR];
uniform vec2 uShift;               // small drift of the view through the glass
uniform vec2 uC0;                  // prism centre
uniform float uHeadIn,uFanLen;     // intro: length of the incoming beam and of the fan

float sdTri(vec2 p,vec2 p0,vec2 p1,vec2 p2){
  vec2 e0=p1-p0,e1=p2-p1,e2=p0-p2,v0=p-p0,v1=p-p1,v2=p-p2;
  vec2 pq0=v0-e0*clamp(dot(v0,e0)/dot(e0,e0),0.,1.);
  vec2 pq1=v1-e1*clamp(dot(v1,e1)/dot(e1,e1),0.,1.);
  vec2 pq2=v2-e2*clamp(dot(v2,e2)/dot(e2,e2),0.,1.);
  float s=sign(e0.x*e2.y-e0.y*e2.x);
  vec2 d=min(min(vec2(dot(pq0,pq0),s*(v0.x*e0.y-v0.y*e0.x)),vec2(dot(pq1,pq1),s*(v1.x*e1.y-v1.y*e1.x))),vec2(dot(pq2,pq2),s*(v2.x*e2.y-v2.y*e2.x)));
  return -sqrt(d.x)*sign(d.y);
}
float prism(vec2 p){return sdTri(p,uV0,uV1,uV2)-uRound;}
float seg(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);return length(pa-ba*h);}

float dotMask(vec2 p){vec2 g=vec2(20.,13.);vec2 q=mod(p+vec2(6.,1.)+g*.5,g)-g*.5;return 1.-smoothstep(.45,1.15,length(q));}
vec3 scene(vec2 p){
  vec3 c=uBg;
  c=mix(c,uFg,(uDark>.5?.12:.14)*dotMask(p));
  float t=texture2D(uText,clamp(p/uRes,0.,1.)).a;
  return mix(c,uFg,t*.97);
}
/* incoming white beam + the spectrum fan, as rgb light */
vec3 beams(vec2 p,out float white){
  vec3 L=vec3(0.);white=0.;
  // incoming
  vec2 head=uS+uDir0*uHeadIn;
  float di=seg(p,uS,head);
  float wi=exp(-di*di/1.6)+.16*exp(-di*di/120.);
  white=wi;L+=vec3(wi);
  // fan
  for(int i=0;i<NR;i++){
    if(uOk[i]<.5)continue;
    vec2 q=p-uX[i];float t=dot(q,uD[i]);
    if(t<0.)continue;
    float d=abs(q.x*uD[i].y-q.y*uD[i].x);
    float w=1.2+t*.022;
    float f=(exp(-d*d/(w*w))+.22*exp(-d*d/(w*w*16.)))*smoothstep(uFanLen,uFanLen-120.,t)/(1.+t*.0011);
    L+=uC[i]*f*(2.4/float(NR));
  }
  return L*uFade;
}
/* faint rays travelling inside the glass */
vec3 inner(vec2 p){
  vec3 L=vec3(0.);
  if(uFanLen<=0.)return L;
  for(int i=0;i<NR;i++){if(uOk[i]<.5)continue;float d=seg(p,uE,uX[i]);L+=mix(vec3(1.),uC[i],.75)*exp(-d*d/3.)*(.9/float(NR));}
  float de=length(p-uE);L+=vec3(1.)*exp(-de*de/90.)*.55;
  return L*uFade;
}

void main(){
  vec2 p=vec2(gl_FragCoord.x,uRes.y*uDpr-gl_FragCoord.y)/uDpr;   // css px, y down
  float aa=.8/uDpr+.35;
  float dF=prism(p);
  // back face and the sides of the extruded prism
  float dH=dF;for(int k=1;k<=4;k++){dH=min(dH,prism(p-uDepth*float(k)*.25));}

  vec3 col;
  float wb;vec3 B=beams(p,wb);
  vec3 outside=scene(p);
  float dm=dotMask(p);
  if(uDark>.5){outside+=B*(.2+2.6*dm);}
  else{float I=max(B.r,max(B.g,B.b));vec3 hue=B/max(I,1e-4);hue=mix(hue,vec3(.32),wb/max(I,1e-4)*.9);outside=mix(outside,hue*.92,clamp(I*(.3+1.7*dm),0.,.85));}

  // side glass: a light, slightly shifted look through the depth
  vec3 side=scene(p-uDepth*.6)*(uDark>.5?.92:.97)+(uDark>.5?.028:-.015);
  if(uDark>.5)side+=B*.25;
  col=mix(side,outside,smoothstep(-aa,aa,dH));

  // front face
  if(dF<2.){
    float e=1.;
    vec2 g=vec2(prism(p+vec2(e,0.))-prism(p-vec2(e,0.)),prism(p+vec2(0.,e))-prism(p-vec2(0.,e)));g=g/max(length(g),1e-4);
    float bevel=16.;float h=clamp(-dF/bevel,0.,1.);float slope=pow(1.-h,1.6);
    vec3 N=normalize(vec3(g*slope*1.35,1.));
    vec2 off=-N.xy*30.-(p-uC0)*.22+uShift;
    vec3 refr=vec3(scene(p+off*1.).r,scene(p+off*1.07).g,scene(p+off*1.15).b);
    vec3 glass=refr*(uDark>.5?vec3(.9,.92,1.):vec3(.96,.97,1.))+(uDark>.5?.03:.0);
    // fresnel rim and a highlight on the bevel facing the light
    float fr=pow(1.-N.z,1.5);
    vec3 Ld=normalize(vec3(-uDir0,.9));vec3 H=normalize(Ld+vec3(0.,0.,1.));
    float sp=pow(max(dot(N,H),0.),48.);
    float band=exp(-pow(dot(p-uC0,vec2(.8,-.6))/(length(uV0-uC0)*.22)-.35,2.));
    vec3 iri=.5+.5*cos(6.2831*(dot(p-uC0,vec2(.004,.003))+vec3(0.,.33,.67)));
    glass+=vec3(1.)*(fr*.3+sp*.85+band*(uDark>.5?.05:.03))+iri*fr*(uDark>.5?.14:.08);
    if(uDark<.5)glass-=vec3(fr*.10);
    vec3 IN=inner(p);
    if(uDark>.5)glass+=IN;
    else{float I=max(IN.r,max(IN.g,IN.b));vec3 hue=IN/max(I,1e-4);hue=mix(vec3(.45),hue,clamp((I-min(IN.r,min(IN.g,IN.b)))/max(I,1e-4)*2.,0.,1.));glass=mix(glass,hue*.85,clamp(I*.7,0.,.7));}
    col=mix(glass,col,smoothstep(-aa,aa,dF));
  }

  // edges: front, back and connectors
  vec2 b0=uV0+uDepth,b1=uV1+uDepth,b2=uV2+uDepth;
  vec3 lineC=uDark>.5?vec3(1.):vec3(0.);
  float ef=abs(dF);float lf=1.-smoothstep(.0,aa*1.6,ef);
  float eb=min(min(seg(p,b0,b1),seg(p,b1,b2)),seg(p,b2,b0))-uRound;eb=abs(eb);float lb=1.-smoothstep(0.,aa*1.6,eb);
  float ec=min(min(seg(p,uV0+normalize(uV0-uC0)*uRound,b0+normalize(uV0-uC0)*uRound),seg(p,uV1+normalize(uV1-uC0)*uRound,b1+normalize(uV1-uC0)*uRound)),seg(p,uV2+normalize(uV2-uC0)*uRound,b2+normalize(uV2-uC0)*uRound));float lc=1.-smoothstep(.2,.2+aa*1.6,ec);
  col=mix(col,lineC,lb*(uDark>.5?.16:.14));
  col=mix(col,lineC,lc*(uDark>.5?.22:.18));
  col=mix(col,lineC,lf*(uDark>.5?.55:.45));
  gl_FragColor=vec4(col,1.);
}\`;

const VS = \`attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}\`;

/* wavelength (nm) to a saturated rgb; the blue band leans toward #3c2cff */
function spectrum(l: number): [number, number, number] {
  const g = (x: number, m: number, s: number) => Math.exp(-(((x - m) / s) ** 2));
  let r = g(l, 610, 55) + 0.35 * g(l, 415, 28), gg = g(l, 540, 50);
  const b = g(l, 455, 38), blue = g(l, 455, 22);
  r += blue * 0.12; gg -= blue * 0.1;
  const m = Math.max(r, gg, b, 1e-3);
  return [(r / m) * 0.9 + 0.1 * r, (gg / m) * 0.9 + 0.1 * gg, b / m];
}
const LAMBDA = Array.from({ length: NR }, (_, i) => 700 - i * (300 / (NR - 1)));
const IOR = LAMBDA.map((l) => 1.33 + 0.03 / (l / 1000) ** 2); // exaggerated Cauchy, so the fan opens wide
const COLORS = new Float32Array(LAMBDA.flatMap(spectrum));

type V2 = [number, number];
const sub = (a: V2, b: V2): V2 => [a[0] - b[0], a[1] - b[1]];
const add = (a: V2, b: V2): V2 => [a[0] + b[0], a[1] + b[1]];
const mul = (a: V2, s: number): V2 => [a[0] * s, a[1] * s];
const dot = (a: V2, b: V2) => a[0] * b[0] + a[1] * b[1];
const norm = (a: V2): V2 => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };

function hitEdges(o: V2, d: V2, V: V2[], skip: number) {
  let best: { t: number; k: number; p: V2 } | null = null;
  for (let k = 0; k < 3; k++) {
    if (k === skip) continue;
    const a = V[k], e = sub(V[(k + 1) % 3], a), den = d[0] * e[1] - d[1] * e[0];
    if (Math.abs(den) < 1e-9) continue;
    const w = sub(a, o), t = (w[0] * e[1] - w[1] * e[0]) / den, u = (w[0] * d[1] - w[1] * d[0]) / den;
    if (t > 1e-4 && u >= 0 && u <= 1 && (!best || t < best.t)) best = { t, k, p: add(o, mul(d, t)) };
  }
  return best;
}
function outward(V: V2[], k: number, C: V2): V2 {
  const a = V[k], b = V[(k + 1) % 3];
  let n = norm([b[1] - a[1], -(b[0] - a[0])]);
  if (dot(n, sub(a, C)) < 0) n = mul(n, -1);
  return n;
}
function refract(d: V2, n: V2, eta: number): V2 | null {
  const ci = -dot(n, d), k = 1 - eta * eta * (1 - ci * ci);
  if (k < 0) return null;
  return norm(add(mul(d, eta), mul(n, eta * ci - Math.sqrt(k))));
}

/* any CSS color (rgb, hsl, oklch, color-mix\u2026) to linear 0..1 rgb via a 1px canvas */
function makeColorReader() {
  const c = document.createElement("canvas"); c.width = c.height = 1;
  const g = c.getContext("2d", { willReadFrequently: true })!;
  return (css: string): [number, number, number] => {
    g.clearRect(0, 0, 1, 1); g.fillStyle = "#000"; g.fillStyle = css; g.fillRect(0, 0, 1, 1);
    const d = g.getImageData(0, 0, 1, 1).data;
    return [d[0] / 255, d[1] / 255, d[2] / 255];
  };
}

export const GlassPrismHero = React.forwardRef<GlassPrismHeroHandle, GlassPrismHeroProps>(function GlassPrismHero(
  {
    headline,
    eyebrow,
    description,
    actions,
    accent = "#3c2cff",
    fontFamily = "Geist, ui-sans-serif, system-ui, -apple-system, sans-serif",
    fontWeight = 600,
    scrollRotate = true,
    scrollHint = { rotate: "Scroll to rotate", back: "Scroll up" },
    className = "",
    style,
    ...rest
  },
  ref,
) {
  const outerRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const copyRef = React.useRef<HTMLDivElement>(null);
  const hintRef = React.useRef<HTMLDivElement>(null);
  const hintLabelRef = React.useRef<HTMLSpanElement>(null);
  const restartRef = React.useRef<() => void>(() => {});
  const [ready, setReady] = React.useState(false);
  const [noGL, setNoGL] = React.useState(false);

  React.useImperativeHandle(ref, () => ({ replay: () => restartRef.current() }), []);

  React.useEffect(() => {
    const stage = stageRef.current!, cv = canvasRef.current!;
    const gl = cv.getContext("webgl", { antialias: false, premultipliedAlpha: false, alpha: false });
    if (!gl || gl.isContextLost()) { setNoGL(true); setReady(true); return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const shader = (type: number, src: string) => {
      const o = gl.createShader(type);
      if (!o) return null;
      gl.shaderSource(o, src); gl.compileShader(o);
      if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(o)); gl.deleteShader(o); return null; }
      return o;
    };
    const vs = shader(gl.VERTEX_SHADER, VS), fsh = shader(gl.FRAGMENT_SHADER, FS), pr = gl.createProgram();
    if (!vs || !fsh || !pr) { setNoGL(true); setReady(true); return; }
    gl.attachShader(pr, vs); gl.attachShader(pr, fsh);
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { setNoGL(true); setReady(true); return; }
    gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const al = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(al); gl.vertexAttribPointer(al, 2, gl.FLOAT, false, 0, 0);
    const U: Record<string, WebGLUniformLocation | null> = {};
    ["uRes","uDpr","uT","uDark","uFade","uTime","uBg","uFg","uText","uV0","uV1","uV2","uRound","uDepth","uS","uE","uDir0","uX","uD","uOk","uC","uShift","uC0","uHeadIn","uFanLen"]
      .forEach((n) => (U[n] = gl.getUniformLocation(pr, n)));
    const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform3fv(U.uC, COLORS); gl.uniform1i(U.uText, 0);

    const readColor = makeColorReader();
    let textBottom = 0, W = 0, H = 0, DPR = 1, bg: [number, number, number] = [0, 0, 0], fg: [number, number, number] = [1, 1, 1], dark = true;
    const readTheme = () => {
      const cs = getComputedStyle(stage);
      bg = readColor(cs.backgroundColor); fg = readColor(cs.color);
      dark = 0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2] < 0.5;
    };

    const drawText = () => {
      const c = document.createElement("canvas"); c.width = W * DPR; c.height = H * DPR;
      const g = c.getContext("2d")!; g.scale(DPR, DPR);
      const font = (px: number) => \`\${fontWeight} \${px}px \${fontFamily}\`;
      const words = headline.split(/\\s+/);
      let size = Math.min(W * 0.085, H * 0.14, 128), lines: string[] = [];
      for (;;) {
        g.font = font(size); try { (g as any).letterSpacing = \`\${-size * 0.05}px\`; } catch {}
        lines = []; let cur = "";
        for (const w of words) { const t = cur ? cur + " " + w : w; if (g.measureText(t).width > W * 0.88 && cur) { lines.push(cur); cur = w; } else cur = t; }
        lines.push(cur);
        if ((lines.length <= 2 && lines.every((l) => g.measureText(l).width <= W * 0.9)) || size < 28) break;
        size *= 0.92;
      }
      g.font = font(size); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#fff";
      try { (g as any).letterSpacing = \`\${-size * 0.05}px\`; } catch {}
      const lh = size, top = H * 0.29 - ((lines.length - 1) * lh) / 2;
      lines.forEach((l, i) => g.fillText(l, W / 2, top + i * lh));
      textBottom = top + (lines.length - 1) * lh + size * 0.36;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
    };

    const resize = () => {
      const r = stage.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height)); DPR = Math.min(2, window.devicePixelRatio || 1);
      cv.width = W * DPR; cv.height = H * DPR; gl.viewport(0, 0, cv.width, cv.height);
      drawText();
    };

    let src = 0.3, ang = 0, tilt: V2 = [0, 0], SCR = 0, t0 = performance.now(), isReady = false, readyTimer = 0;
    const mouse = { x: 0.5, y: 0.5, on: false };

    /* prism and light path, solved on the CPU with Snell's law for every wavelength */
    const geometry = () => {
      const R = Math.min(W * 0.15, H * 0.22, 200), C: V2 = [W * 0.5, Math.min(H * 0.56, Math.max(H * 0.46, textBottom + R * 0.72))], a = ang + 0.4;
      const V = [0, 1, 2].map((k) => { const t = a + (k * 2 * Math.PI) / 3; return [C[0] + R * Math.sin(t), C[1] - R * Math.cos(t)] as V2; });
      const rr = Math.max(4, R * 0.045);
      const Vs = V.map((v) => add(C, mul(sub(v, C), 1 - (2 * rr) / R)));
      const S: V2 = [-60, H * src], d0 = norm(sub([C[0] - R * 0.4, C[1] - R * 0.2], S));
      const h = hitEdges(S, d0, V, -1);
      const X: number[] = [], D: number[] = [], ok: number[] = [];
      for (let i = 0; i < NR; i++) {
        let good = 0, x: V2 = [0, 0], dir: V2 = [1, 0];
        if (h) {
          let d = refract(d0, outward(V, h.k, C), 1 / IOR[i]), o = h.p, skip = h.k;
          for (let b = 0; b < 4 && d; b++) {
            const g = hitEdges(o, d, V, skip); if (!g) break;
            const N = outward(V, g.k, C), t = refract(d, mul(N, -1), IOR[i]);
            if (t) { x = g.p; dir = t; good = 1; break; }
            d = norm(sub(d, mul(N, 2 * dot(d, N)))); o = g.p; skip = g.k; // total internal reflection
          }
        }
        X.push(...x); D.push(...dir); ok.push(good);
      }
      return { R, C, Vs, rr, S, d0, E: h ? h.p : C, X, D, ok };
    };

    const setCopy = () => {
      if (copyRef.current) copyRef.current.style.opacity = isReady ? String(Math.max(0, 1 - SCR * 1.6)) : "";
      if (hintRef.current && hintLabelRef.current && scrollHint) {
        const up = SCR > 0.85;
        hintRef.current.dataset.up = up ? "true" : "false";
        hintLabelRef.current.textContent = up ? scrollHint.back : scrollHint.rotate;
        hintRef.current.style.opacity = isReady ? String(up ? 1 : Math.max(0, 1 - SCR * 5)) : "0";
      }
    };
    const onScroll = () => {
      if (!scrollRotate) return;
      const r = outerRef.current!.getBoundingClientRect();
      SCR = Math.min(1, Math.max(0, -r.top / (window.innerHeight * 0.7)));
      setCopy();
    };

    const restart = () => {
      if (scrollRotate && SCR > 0) outerRef.current?.scrollIntoView({ block: "start" });
      t0 = performance.now(); isReady = false; setReady(false); setCopy();
      window.clearTimeout(readyTimer);
      readyTimer = window.setTimeout(() => { isReady = true; setReady(true); setCopy(); }, reduce ? 0 : 1500);
    };
    restartRef.current = restart;

    let raf = 0, alive = true, visible = true, frameNo = 0;
    const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
    const frame = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (frameNo++ % 30 === 0) readTheme();
      const t = reduce ? 99 : (now - t0) / 1000;
      // the cursor moves the light source (y) and turns the prism a touch (x)
      const angT = (mouse.on ? (mouse.x - 0.5) * 0.2 : 0) + SCR * 1.35;
      const srcT = mouse.on ? 0.2 + Math.min(1, Math.max(0, mouse.y / 0.8)) * 0.3 : 0.3 + (reduce ? 0 : Math.sin(now / 1000 * 0.45) * 0.04);
      const tiltT: V2 = mouse.on ? [(mouse.x - 0.5) * 16, (mouse.y - 0.5) * 10] : [0, 0];
      ang += (angT - ang) * 0.06; src += (srcT - src) * 0.05;
      tilt = [tilt[0] + (tiltT[0] - tilt[0]) * 0.06, tilt[1] + (tiltT[1] - tilt[1]) * 0.06];
      const G = geometry();
      const L0 = Math.hypot(G.E[0] - G.S[0], G.E[1] - G.S[1]);
      gl.uniform2f(U.uRes, W, H); gl.uniform1f(U.uDpr, DPR); gl.uniform1f(U.uT, t); gl.uniform1f(U.uDark, dark ? 1 : 0);
      gl.uniform1f(U.uFade, (1 - SCR) * (reduce ? 1 : 0.96 + 0.04 * Math.sin((now / 1000) * 2.1))); gl.uniform1f(U.uTime, now / 1000);
      gl.uniform3fv(U.uBg, bg); gl.uniform3fv(U.uFg, fg);
      gl.uniform2fv(U.uV0, G.Vs[0]); gl.uniform2fv(U.uV1, G.Vs[1]); gl.uniform2fv(U.uV2, G.Vs[2]); gl.uniform1f(U.uRound, G.rr);
      gl.uniform2f(U.uDepth, G.R * 0.12 + tilt[0], -G.R * 0.13 + tilt[1]); gl.uniform2fv(U.uC0, G.C);
      gl.uniform2fv(U.uS, G.S); gl.uniform2fv(U.uE, G.E); gl.uniform2fv(U.uDir0, G.d0);
      gl.uniform2fv(U.uX, G.X); gl.uniform2fv(U.uD, G.D); gl.uniform1fv(U.uOk, G.ok);
      const sa = ang + 0.6; gl.uniform2f(U.uShift, Math.cos(sa) * G.R * 0.04, Math.sin(sa) * G.R * 0.03);
      gl.uniform1f(U.uHeadIn, L0 * ease(t / 0.9));
      gl.uniform1f(U.uFanLen, t < 0.9 ? 0 : Math.hypot(W, H) * 1.2 * ease((t - 0.9) / 1.4) + 120);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const move = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width; mouse.y = (e.clientY - r.top) / r.height; mouse.on = true;
    };
    const leave = () => { mouse.on = false; };
    let rt = 0;
    const ro = new ResizeObserver(() => { window.clearTimeout(rt); rt = window.setTimeout(resize, 120); });
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });

    const fontReady = document.fonts?.load ? document.fonts.load(\`\${fontWeight} 100px \${fontFamily}\`).catch(() => []) : Promise.resolve([]);
    fontReady.then(() => {
      if (!alive) return;
      readTheme(); resize(); onScroll(); restart();
      ro.observe(stage); io.observe(stage);
      raf = requestAnimationFrame(frame);
    });

    return () => {
      alive = false; cancelAnimationFrame(raf); window.clearTimeout(readyTimer); window.clearTimeout(rt);
      ro.disconnect(); io.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", onScroll, { capture: true } as any);
      gl.deleteTexture(tex); gl.deleteBuffer(buf); gl.deleteProgram(pr); gl.deleteShader(vs); gl.deleteShader(fsh);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headline, fontFamily, fontWeight, scrollRotate]);

  const fade = \`transition-[opacity,transform] duration-1000 [transition-timing-function:cubic-bezier(.2,.9,.25,1)] \${ready ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"}\`;

  return (
    <section
      ref={outerRef}
      className={\`relative w-full bg-background text-foreground \${className}\`}
      style={{ height: scrollRotate ? "calc(100svh + 90vh)" : undefined, ...style }}
      {...rest}
    >
      <div ref={stageRef} className="sticky top-0 h-[100svh] min-h-[560px] w-full overflow-hidden bg-background text-foreground" style={{ fontFamily }}>
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

        <h1
          className={noGL ? "absolute inset-x-0 top-[22vh] m-0 px-5 text-center text-[clamp(40px,8vw,112px)] font-semibold leading-none tracking-[-0.05em]" : "sr-only"}
        >
          {headline}
        </h1>

        <div ref={copyRef} className="pointer-events-none absolute inset-0">
          {eyebrow && (
            <div className={\`absolute inset-x-0 top-[9vh] flex justify-center \${fade}\`}>
              <span className="inline-flex h-[30px] items-center gap-2 rounded-full border border-border bg-muted/60 px-3 text-[13px] font-medium tracking-[-0.01em] text-muted-foreground backdrop-blur-md">
                <i className="size-1.5 rounded-full" style={{ background: accent, boxShadow: \`0 0 10px \${accent}\` }} />
                {eyebrow}
              </span>
            </div>
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-[max(15vh,104px)] text-center">
            {description && (
              <p className={\`m-0 max-w-[600px] text-[17px] leading-[25px] tracking-[-0.02em] text-muted-foreground \${fade} delay-100\`}>{description}</p>
            )}
            {actions && <div className={\`pointer-events-auto mt-[22px] flex flex-wrap justify-center gap-2.5 \${fade} delay-200\`}>{actions}</div>}
          </div>
        </div>

        {scrollRotate && scrollHint && (
          <div
            ref={hintRef}
            aria-hidden="true"
            data-up="false"
            className="group/hint pointer-events-none absolute bottom-[22px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[12px] font-medium tracking-[0.02em] text-muted-foreground opacity-0 transition-opacity duration-700"
          >
            <div className="relative h-[34px] w-[22px] rounded-[11px] border-[1.5px] border-[color-mix(in_oklab,var(--color-foreground)_28%,transparent)] transition-transform duration-500 group-data-[up=true]/hint:rotate-180">
              <span
                className="absolute left-1/2 top-[7px] -ml-[1.5px] h-[7px] w-[3px] rounded-sm motion-safe:animate-[prism-wheel_1.8s_cubic-bezier(.6,0,.3,1)_infinite]"
                style={{ background: accent, boxShadow: \`0 0 8px \${accent}\` }}
              />
            </div>
            <span ref={hintLabelRef}>{scrollHint.rotate}</span>
          </div>
        )}
        <style>{\`@keyframes prism-wheel{0%{transform:translateY(0);opacity:0}20%{opacity:1}70%{transform:translateY(10px);opacity:0}100%{opacity:0}}\`}</style>
      </div>
    </section>
  );
});

export default GlassPrismHero;
`],["demo.tsx",`import * as React from "react";
import { GlassPrismHero } from "@/components/ui/component";
/* vasnev.art mobile menu: the prism as a quiet backdrop, light theme */
export default function MenuPrism() {
  return <GlassPrismHero headline="vasnev.art" scrollRotate={false} scrollHint={false} />;
}
`]],mount(t,n){let a=(0,sn.createRoot)(t);return a.render(xe.createElement(Q,n)),{update:s=>a.render(xe.createElement(Q,s)),unmount:()=>a.unmount()}}};})();
