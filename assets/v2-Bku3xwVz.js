import{_ as e,a as t,c as n,d as r,f as i,g as a,h as o,i as s,l as c,m as l,n as u,o as d,p as f,r as p,s as m,t as h,u as g,v as _}from"./contact-CBe6yfoZ.js";/* empty css           */var v={name:`arrow-right`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]};v.node;var y=a(v),b={name:`check`,size:24,node:[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]};b.node;var x=a(b),S={name:`chevron-right`,size:24,node:[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]};S.node;var C=a(S),w={name:`copy`,size:24,node:[[`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`,key:`17jyea`}],[`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,key:`zix9uf`}]]};w.node;var T=a(w),E={name:`hammer`,size:24,node:[[`path`,{d:`m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9`,key:`1hayfq`}],[`path`,{d:`m18 15 4-4`,key:`16gjal`}],[`path`,{d:`m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5`,key:`15ts47`}]]};E.node;var D=a(E),O={name:`layout-grid`,size:24,node:[[`rect`,{width:`7`,height:`7`,x:`3`,y:`3`,rx:`1`,key:`1g98yp`}],[`rect`,{width:`7`,height:`7`,x:`14`,y:`3`,rx:`1`,key:`6d4xhi`}],[`rect`,{width:`7`,height:`7`,x:`14`,y:`14`,rx:`1`,key:`nxv5o0`}],[`rect`,{width:`7`,height:`7`,x:`3`,y:`14`,rx:`1`,key:`1bb6yr`}]]};O.node;var k=a(O),A={name:`list-plus`,size:24,node:[[`path`,{d:`M16 5H3`,key:`m91uny`}],[`path`,{d:`M11 12H3`,key:`51ecnj`}],[`path`,{d:`M16 19H3`,key:`zzsher`}],[`path`,{d:`M18 9v6`,key:`1twb98`}],[`path`,{d:`M21 12h-6`,key:`bt1uis`}]]};A.node;var j=a(A),M={name:`message-circle`,size:24,node:[[`path`,{d:`M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719`,key:`1sd12s`}]]};M.node;var N=a(M),P={name:`phone`,size:24,node:[[`path`,{d:`M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384`,key:`9njp5v`}]]};P.node;var F=a(P),I=_(),L=e(),R=t(),z=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},B=e=>e===`uniform`?1:e===`alternating`?2:0,V=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ee=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uMorphAmount;
uniform float uBands;
uniform float uThickness;
uniform float uScale;
uniform float uPixelSize;
uniform float uGlow;
uniform float uColorMode;
uniform float uContrast;
uniform float uBrightness;
uniform float uFillBands;
uniform float uOpacity;
uniform float uLightMode;
uniform vec3 uLow;
uniform vec3 uMid;
uniform vec3 uHigh;
uniform vec2 uMouse;
uniform float uMouseEnabled;
uniform float uMouseRadius;
uniform float uMouseStrength;
uniform float uMouseActive;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec4 uCtrlA;
uniform vec4 uCtrlB;
uniform vec4 uCtrlC;
uniform vec4 uCtrlD;
out vec4 fragColor;

float bez(float t, vec4 c) {
  float w = 6.2831853 * t;
  return 0.5 * (c.x * sin(w) + c.y * cos(w) + c.z * sin(2.0 * w) + c.w * cos(2.0 * w));
}

float field(vec2 uv) {
  vec2 a = vec2(bez(uv.x, uCtrlA), bez(uv.x, uCtrlB));
  vec2 b = vec2(bez(uv.y, uCtrlC), bez(uv.y, uCtrlD));
  return distance(a, b);
}

vec3 elevationColor(float e) {
  vec3 c = mix(uLow, uMid, smoothstep(0.0, 0.5, e));
  c = mix(c, uHigh, smoothstep(0.5, 1.0, e));
  return c;
}

void main() {
  vec2 res = iResolution.xy;
  vec2 uv = gl_FragCoord.xy / res;

  vec2 suv = (uv - 0.5) / max(uScale, 0.001) + 0.5;

  vec2 sampleUv = suv;
  if (uPixelSize > 1.0) {
    vec2 px = res / uPixelSize;
    sampleUv = (floor(suv * px) + 0.5) / px;
  }

  float fv = field(sampleUv);

  if (uMouseEnabled > 0.5) {
    vec2 d = uv - uMouse;
    d.x *= res.x / max(res.y, 1.0);
    float r = max(uMouseRadius, 0.001);
    float bump = exp(-dot(d, d) / (r * r)) * uMouseStrength * uMouseActive;
    fv += bump;
  }

  float f = fv * uBands;
  float frac = fract(f);
  float lineDist = min(frac, 1.0 - frac);

  float aa = fwidth(f) + 0.0001;
  float mask = 1.0 - smoothstep(uThickness - aa, uThickness + aa, lineDist);

  float glowR = uThickness + uGlow * 0.5 + aa;
  float glow = (1.0 - smoothstep(uThickness, glowR, lineDist)) * step(0.0001, uGlow);

  float elev = clamp(fv / (uMorphAmount * 2.5 + 0.001), 0.0, 1.0);

  vec3 lineCol;
  if (uColorMode < 0.5) {
    lineCol = elevationColor(elev);
  } else if (uColorMode < 1.5) {
    lineCol = uMid;
  } else {
    float parity = mod(floor(f), 2.0);
    lineCol = mix(uMid, uHigh, parity);
  }

  float coverage = clamp(mask + glow * 0.55, 0.0, 1.0);
  coverage = pow(coverage, max(uContrast, 0.001));

  vec3 outColor = lineCol;
  float outAlpha = coverage;

  if (uFillBands > 0.5) {
    vec3 fillCol = elevationColor(elev);
    float fillA = 0.1 * elev;
    outColor = mix(fillCol, lineCol, coverage);
    outAlpha = clamp(coverage + fillA, 0.0, 1.0);
  }

  if (uGrain > 0.5) {
    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453);
    outAlpha += (g - 0.5) * uGrainIntensity;
  }

  outColor *= uBrightness;
  outColor = clamp(outColor, 0.0, 1.0);

  float a = clamp(outAlpha, 0.0, 1.0) * uOpacity;
  if (uLightMode > 0.5) {
    float peak = max(outColor.r, max(outColor.g, outColor.b));
    vec3 chroma = pow(clamp(outColor / max(peak, 0.0001), 0.0, 1.0), vec3(1.18));
    fragColor = vec4(mix(vec3(1.0), chroma, a * 0.94), 1.0);
  } else {
    fragColor = vec4(outColor * a, a);
  }
}
`,H=new WeakMap,U=[[1,-2,3,-4],[9,-8,7,-6],[5,2,5,-5],[-1,-3,8,9]],W=({lowColor:e=`#5227FF`,midColor:t=`#FF9FFC`,highColor:r=`#FFFFFF`,speed:i=.35,morphAmount:a=3,morphSpeed:o=.05,bands:s=2,thickness:l=.01,scale:u=1,pixelSize:f=1,glow:p=.5,colorMode:h=`elevation`,contrast:g=3,brightness:_=1,fillBands:v=!1,opacity:y=1,grain:b=!0,grainIntensity:x=.05,mouseInteraction:S=!0,mouseRadius:C=.3,mouseStrength:w=.4,lightMode:T=!1,className:E=``})=>{let D=(0,I.useRef)(null);return(0,I.useEffect)(()=>{let e=D.current;if(!e)return;let t=new n({webgl:2,alpha:!0,premultipliedAlpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),r=t.gl;r.clearColor(0,0,0,0);let i=r.canvas;i.style.width=`100%`,i.style.height=`100%`,i.style.display=`block`,e.appendChild(i);let a=new d(r),o=new c(r,{vertex:V,fragment:ee,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uSpeed:{value:.35},uMorphAmount:{value:3},uMorphSpeed:{value:.05},uBands:{value:2},uThickness:{value:.01},uScale:{value:1},uPixelSize:{value:1},uGlow:{value:.5},uColorMode:{value:0},uContrast:{value:3},uBrightness:{value:1},uFillBands:{value:0},uOpacity:{value:1},uLightMode:{value:0},uGrain:{value:1},uGrainIntensity:{value:.05},uLow:{value:new Float32Array([1,1,1])},uMid:{value:new Float32Array([1,1,1])},uHigh:{value:new Float32Array([1,1,1])},uMouse:{value:new Float32Array([.5,.5])},uMouseEnabled:{value:1},uMouseRadius:{value:.3},uMouseStrength:{value:.4},uMouseActive:{value:0},uCtrlA:{value:new Float32Array([0,0,0,0])},uCtrlB:{value:new Float32Array([0,0,0,0])},uCtrlC:{value:new Float32Array([0,0,0,0])},uCtrlD:{value:new Float32Array([0,0,0,0])}}}),s=new m(r,{geometry:a,program:o});H.set(e,{renderer:t,program:o,mesh:s});let l=()=>{let n=e.getBoundingClientRect(),i=Math.max(1,Math.floor(n.width)),a=Math.max(1,Math.floor(n.height));t.setSize(i,a);let c=o.uniforms.iResolution.value;c[0]=r.drawingBufferWidth,c[1]=r.drawingBufferHeight,t.render({scene:s})},u=new ResizeObserver(l);u.observe(e),l();let f=[.5,.5],p=[.5,.5],h=0,g=0,_=e=>{let t=i.getBoundingClientRect();p[0]=(e.clientX-t.left)/t.width,p[1]=1-(e.clientY-t.top)/t.height,g=1},v=()=>{g=0};i.addEventListener(`mousemove`,_),i.addEventListener(`mouseleave`,v);let y=[o.uniforms.uCtrlA.value,o.uniforms.uCtrlB.value,o.uniforms.uCtrlC.value,o.uniforms.uCtrlD.value],b=0,x=!0,S=!document.hidden,C=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches?.5:1,w=performance.now(),T=e=>{let n=o.uniforms;n.iTime.value=e;let r=n.uMorphAmount.value,i=n.uSpeed.value,a=n.uMorphSpeed.value;for(let t=0;t<4;t++){let n=y[t],o=U[t];for(let t=0;t<4;t++){let s=o[t];n[t]=r*Math.sin(e*i*Math.sin(s*a)+s)}}f[0]+=.05*(p[0]-f[0]),f[1]+=.05*(p[1]-f[1]),n.uMouse.value[0]=f[0],n.uMouse.value[1]=f[1],h+=.05*(g-h),n.uMouseActive.value=h,t.render({scene:s})},E=e=>{T((e-w)*.001*C),b=requestAnimationFrame(E)},O=()=>{x&&S&&b===0&&(b=requestAnimationFrame(E))},k=()=>{b!==0&&(cancelAnimationFrame(b),b=0)},A=CSS.supports(`animation-timeline: scroll()`),j=new IntersectionObserver(([e])=>{x=e.isIntersecting,x?O():k()},{threshold:0,rootMargin:A?`-10% 0px 0px 0px`:`0px`});j.observe(e.closest(`.topography-hero`)??e);let M=()=>{S=!document.hidden,S?O():k()};return document.addEventListener(`visibilitychange`,M),O(),()=>{k(),u.disconnect(),j.disconnect(),document.removeEventListener(`visibilitychange`,M),i.removeEventListener(`mousemove`,_),i.removeEventListener(`mouseleave`,v),H.delete(e);try{e.removeChild(i)}catch{}r.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,I.useEffect)(()=>{let n=D.current;if(!n)return;let c=H.get(n);if(!c)return;let{program:d}=c,m=d.uniforms;m.uSpeed.value=i,m.uMorphAmount.value=a,m.uMorphSpeed.value=o,m.uBands.value=s,m.uThickness.value=l,m.uScale.value=u,m.uPixelSize.value=f,m.uGlow.value=p,m.uColorMode.value=B(h),m.uContrast.value=g,m.uBrightness.value=_,m.uFillBands.value=+!!v,m.uOpacity.value=y,m.uLightMode.value=+!!T,m.uGrain.value=+!!b,m.uGrainIntensity.value=x,m.uLow.value=new Float32Array(z(e)),m.uMid.value=new Float32Array(z(t)),m.uHigh.value=new Float32Array(z(r)),m.uMouseEnabled.value=+!!S,m.uMouseRadius.value=C,m.uMouseStrength.value=w},[e,t,r,i,a,o,s,l,u,f,p,h,g,_,v,y,b,x,S,C,w,T]),(0,R.jsx)(`div`,{ref:D,className:`topography-container ${E}`.trim()})},G=new URL(`home-BjvHO1ZW.webp`,import.meta.url).href,K=new URL(`paving-BgnxpeTs.webp`,import.meta.url).href,q=new URL(`photo-viewer-Cv216std.webp`,import.meta.url).href,J=({value:e,hint:t})=>e??(0,R.jsxs)(`mark`,{children:[`[`,t,`]`]}),Y=[{name:`MC Fiduciaire`,domain:`mc-fiduciaire.be`,href:`https://mc-fiduciaire.be`,summary:`An accounting firm with 500+ clients. We built the website that welcomes each of them in their own language and puts a face on the people behind the numbers.`,quote:{text:null,name:null,role:null},features:[{icon:i,title:`7-language switcher`,text:`Visitors switch between 7 languages in one click.`,languages:[[`ro`,`Română`],[`fr`,`Français`],[`en`,`English`],[`nl`,`Nederlands`],[`pt`,`Português`],[`ru`,`Русский`],[`uk`,`Українська`]]},{icon:f,title:`Team photos on the homepage`,text:`A carousel of team photos opens the homepage you saw at the top of this page, so the firm has a face from the first second.`},{icon:g,title:`The firm’s team page`,text:`A round portrait of every accountant, so clients know who they’re talking to.`,image:p,alt:`MC Fiduciaire team page with a round portrait of each accountant`,wide:!0},{icon:l,title:`Guides sorted by topic`,text:`A resources page built around the most popular Belgian business subjects, like going self-employed or starting a company.`,image:u,alt:`MC Fiduciaire resources page with category filters and guides`},{icon:r,title:`Contact form, straight to email`,text:`Name, phone, subject and message land directly in the firm’s inbox, with privacy consent built in.`,image:h,alt:`MC Fiduciaire contact page with the contact form`}]},{name:`EGMA Construction`,domain:`egmaconstruction.be`,href:`https://egmaconstruction.be`,summary:`A renovation contractor in Booischot that covers twelve trades. We built the website that shows the work trade by trade and makes a phone call the first step.`,quote:{text:null,name:null,role:null},features:[{icon:D,title:`Twelve trades on one page`,text:`Screed, plastering, painting, bathrooms, groundwork, roofing, paving, terraces, lawns, fencing, windows and doors, and electrics, each in one plain sentence, grouped into inside, outside and structural work.`},{icon:j,title:`New jobs go up as they finish`,text:`The gallery reads from one list, so adding a finished job takes one short entry and its photos.`},{icon:k,title:`Projects sorted by trade`,text:`Each trade opens into its jobs, every one with real photos from the site. Paving alone has thirteen.`,image:K,alt:`EGMA Construction projects page opened on paving: driveway jobs, each with its own photos`,wide:!0},{icon:F,title:`Call first`,text:`The phone number is the main button, next to a finished bathroom on the first screen, so a visitor reaches the person doing the work.`,image:G,alt:`EGMA Construction homepage: the headline next to a photo of a finished bathroom, with the call button below it`},{icon:f,title:`Every job, photo by photo`,text:`A job opens in a photo viewer with arrows and a count, so a homeowner can look at the work up close.`,image:q,alt:`A paved driveway by EGMA Construction in the project photo viewer, photo 1 of 6`}]}];function X(){return(0,R.jsxs)(`section`,{id:`projects`,className:`projects`,"aria-labelledby":`projects-title`,children:[(0,R.jsxs)(`div`,{className:`projects__intro`,children:[(0,R.jsxs)(`h2`,{id:`projects-title`,children:[`Proof, `,(0,R.jsx)(`span`,{children:`not promises.`})]}),(0,R.jsx)(`p`,{children:`Every project starts with a real business and a real problem. Here are two.`})]}),Y.map(({name:e,domain:t,href:n,summary:r,quote:i,features:a})=>(0,R.jsxs)(`article`,{className:`project-card`,children:[(0,R.jsxs)(`header`,{className:`project-card__header`,children:[(0,R.jsx)(`h3`,{children:e}),(0,R.jsxs)(`a`,{href:n,target:`_blank`,rel:`noreferrer`,className:`project-card__link`,children:[t,(0,R.jsx)(`span`,{className:`sr-only`,children:` (opens in a new tab)`}),(0,R.jsx)(o,{size:18,"aria-hidden":`true`})]})]}),(0,R.jsx)(`p`,{className:`project-card__summary`,children:r}),(0,R.jsxs)(`figure`,{className:`project-quote`,children:[(0,R.jsx)(`blockquote`,{children:(0,R.jsx)(`p`,{children:(0,R.jsx)(J,{value:i.text,hint:`A sentence or two from ${e} about working with you`})})}),(0,R.jsxs)(`figcaption`,{children:[(0,R.jsx)(J,{value:i.name,hint:`name`}),`, `,(0,R.jsx)(J,{value:i.role,hint:`role`}),`, `,e]})]}),(0,R.jsx)(`ul`,{className:`project-card__features`,children:a.map(({icon:e,title:t,text:n,image:r,alt:i,languages:a,wide:o})=>(0,R.jsxs)(`li`,{className:o?`feature--wide`:void 0,children:[r&&(0,R.jsx)(`img`,{className:`shot`,src:r,alt:i,width:`1280`,height:`800`,loading:`lazy`}),(0,R.jsxs)(`h4`,{children:[(0,R.jsx)(e,{size:20,"aria-hidden":`true`}),t]}),(0,R.jsx)(`p`,{children:n}),a&&(0,R.jsx)(`ul`,{className:`project-card__languages`,children:a.map(([e,t])=>(0,R.jsx)(`li`,{lang:e,children:t},e))})]},t))})]},e))]})}var Z=`bucatariualexandru11@gmail.com`,Q=`mailto:${Z}?subject=A%20website%20for%20my%20business&body=Hi%2C%0D%0A%0D%0AMy%20business%3A%20%0D%0AWhat%20I%20need%3A%20%0D%0ALanguages%3A%20%0D%0A`,$=`https://wa.me/40725791791?text=Hi!%20I%E2%80%99m%20interested%20in%20a%20website%20for%20my%20business.`,te={idle:`Copy`,copied:`Copied`,failed:`Press Ctrl+C`},ne={idle:``,copied:`Email address copied`,failed:`Address selected. Press Control and C to copy it.`};function re({email:e}){let[t,n]=(0,I.useState)(`idle`),r=(0,I.useRef)(null);return(0,I.useEffect)(()=>{if(t===`idle`)return;let e=setTimeout(()=>n(`idle`),2500);return()=>clearTimeout(e)},[t]),(0,R.jsxs)(`div`,{className:`email-copy`,children:[(0,R.jsx)(`a`,{ref:r,href:Q,children:e}),(0,R.jsxs)(`button`,{type:`button`,onClick:async()=>{try{await navigator.clipboard.writeText(e),n(`copied`)}catch{getSelection().selectAllChildren(r.current),n(`failed`)}},"data-state":t,"aria-label":t===`idle`?`Copy email address`:void 0,children:[t===`copied`?(0,R.jsx)(x,{size:14,"aria-hidden":`true`}):(0,R.jsx)(T,{size:14,"aria-hidden":`true`}),te[t]]}),(0,R.jsx)(`span`,{className:`sr-only`,"aria-live":`polite`,children:ne[t]})]})}function ie(){return(0,R.jsxs)(`div`,{className:`app-shell`,id:`top`,children:[(0,R.jsxs)(`nav`,{className:`site-nav`,"aria-label":`Main`,children:[(0,R.jsx)(`a`,{className:`site-nav__brand`,href:`#top`,children:`andu design`}),(0,R.jsx)(`a`,{className:`site-nav__projects`,href:`#projects`,children:`Projects`}),(0,R.jsxs)(`a`,{className:`btn`,href:`#contact`,children:[`Contact `,(0,R.jsx)(y,{size:14,"aria-hidden":`true`})]})]}),(0,R.jsxs)(`main`,{children:[(0,R.jsxs)(`div`,{className:`topography-hero`,children:[(0,R.jsx)(`div`,{className:`aurora`,"aria-hidden":`true`}),(0,R.jsx)(`div`,{className:`topography-hero__background`,"aria-hidden":`true`,children:(0,R.jsx)(W,{lowColor:`#7c3aed`,midColor:`#22d3ee`,scale:2,glow:.3,opacity:.75})}),(0,R.jsxs)(`section`,{className:`topography-hero__content`,"aria-labelledby":`hero-title`,children:[(0,R.jsxs)(`div`,{children:[(0,R.jsxs)(`h1`,{id:`hero-title`,className:`rise`,style:{"--i":0},children:[(0,R.jsx)(`span`,{children:`Websites that`}),` grow your business`]}),(0,R.jsx)(`p`,{className:`topography-hero__description rise`,style:{"--i":1},children:`We design and build websites for real businesses: multilingual, clear, and made to bring in clients.`}),(0,R.jsxs)(`div`,{className:`topography-hero__actions rise`,style:{"--i":2},children:[(0,R.jsx)(`a`,{className:`btn`,href:`#projects`,children:`See our work`}),(0,R.jsxs)(`a`,{className:`text-link`,href:`#contact`,children:[`Contact us `,(0,R.jsx)(C,{size:13,strokeWidth:2.5,"aria-hidden":`true`})]})]})]}),(0,R.jsxs)(`figure`,{className:`hero-work rise`,style:{"--i":2},children:[(0,R.jsx)(`img`,{className:`shot`,src:s,alt:`MC Fiduciaire's homepage: the headline “Your finances in trusted hands” next to a photo of the firm's team`,width:`1280`,height:`800`,fetchPriority:`high`}),(0,R.jsx)(`figcaption`,{children:`A site we built for MC Fiduciaire, an accounting firm with 500+ clients.`})]})]})]}),(0,R.jsx)(X,{}),(0,R.jsxs)(`section`,{id:`contact`,className:`close`,"aria-labelledby":`close-title`,children:[(0,R.jsxs)(`h2`,{id:`close-title`,children:[`Let’s build `,(0,R.jsx)(`span`,{children:`your website.`})]}),(0,R.jsx)(`p`,{className:`close__lead`,children:`Tell us about your business and what it needs.`}),(0,R.jsxs)(`div`,{className:`close__actions`,children:[(0,R.jsx)(`a`,{className:`btn`,href:Q,children:`Email us`}),(0,R.jsx)(re,{email:Z})]}),(0,R.jsxs)(`div`,{className:`close__channels`,children:[(0,R.jsxs)(`a`,{className:`text-link`,href:`tel:+32465261035`,children:[(0,R.jsx)(F,{size:14,"aria-hidden":`true`}),` Call +32 465 26 10 35`]}),(0,R.jsxs)(`a`,{className:`text-link`,href:$,target:`_blank`,rel:`noreferrer`,children:[(0,R.jsx)(N,{size:14,"aria-hidden":`true`}),` WhatsApp +40 725 791 791`,(0,R.jsx)(`span`,{className:`sr-only`,children:` (opens in a new tab)`})]})]})]})]}),(0,R.jsxs)(`footer`,{className:`site-footer`,children:[(0,R.jsx)(`span`,{children:`andu design`}),(0,R.jsxs)(`nav`,{className:`site-footer__legal`,"aria-label":`Legal`,children:[(0,R.jsx)(`a`,{href:`v2-privacy.html`,children:`Privacy`}),(0,R.jsx)(`a`,{href:`v2-cookies.html`,children:`Cookies`})]}),(0,R.jsxs)(`span`,{children:[`© `,new Date().getFullYear()]})]})]})}(0,L.createRoot)(document.getElementById(`root`)).render((0,R.jsx)(I.StrictMode,{children:(0,R.jsx)(ie,{})}));