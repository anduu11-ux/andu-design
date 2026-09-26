import{_ as e,a as t,c as n,d as r,f as i,g as a,h as o,i as s,l as c,m as l,n as u,o as d,p as f,r as p,s as m,t as h,u as g,v as _}from"./contact-CBe6yfoZ.js";var v=_(),y=e(),b={name:`arrow-down`,size:24,node:[[`path`,{d:`M12 5v14`,key:`s699le`}],[`path`,{d:`m19 12-7 7-7-7`,key:`1idqje`}]]};b.node;var x=a(b),S=t(),C=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},w=e=>e===`uniform`?1:e===`alternating`?2:0,T=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,E=`#version 300 es
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
`,D=new WeakMap,O=[[1,-2,3,-4],[9,-8,7,-6],[5,2,5,-5],[-1,-3,8,9]],k=({lowColor:e=`#5227FF`,midColor:t=`#FF9FFC`,highColor:r=`#FFFFFF`,speed:i=.35,morphAmount:a=3,morphSpeed:o=.05,bands:s=2,thickness:l=.01,scale:u=1,pixelSize:f=1,glow:p=.5,colorMode:h=`elevation`,contrast:g=3,brightness:_=1,fillBands:y=!1,opacity:b=1,grain:x=!0,grainIntensity:k=.05,mouseInteraction:A=!0,mouseRadius:j=.3,mouseStrength:M=.4,lightMode:N=!1,className:P=``})=>{let F=(0,v.useRef)(null);return(0,v.useEffect)(()=>{let e=F.current;if(!e)return;let t=new n({webgl:2,alpha:!0,premultipliedAlpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),r=t.gl;r.clearColor(0,0,0,0);let i=r.canvas;i.style.width=`100%`,i.style.height=`100%`,i.style.display=`block`,e.appendChild(i);let a=new d(r),o=new c(r,{vertex:T,fragment:E,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uSpeed:{value:.35},uMorphAmount:{value:3},uMorphSpeed:{value:.05},uBands:{value:2},uThickness:{value:.01},uScale:{value:1},uPixelSize:{value:1},uGlow:{value:.5},uColorMode:{value:0},uContrast:{value:3},uBrightness:{value:1},uFillBands:{value:0},uOpacity:{value:1},uLightMode:{value:0},uGrain:{value:1},uGrainIntensity:{value:.05},uLow:{value:new Float32Array([1,1,1])},uMid:{value:new Float32Array([1,1,1])},uHigh:{value:new Float32Array([1,1,1])},uMouse:{value:new Float32Array([.5,.5])},uMouseEnabled:{value:1},uMouseRadius:{value:.3},uMouseStrength:{value:.4},uMouseActive:{value:0},uCtrlA:{value:new Float32Array([0,0,0,0])},uCtrlB:{value:new Float32Array([0,0,0,0])},uCtrlC:{value:new Float32Array([0,0,0,0])},uCtrlD:{value:new Float32Array([0,0,0,0])}}}),s=new m(r,{geometry:a,program:o});D.set(e,{renderer:t,program:o,mesh:s});let l=()=>{let n=e.getBoundingClientRect(),i=Math.max(1,Math.floor(n.width)),a=Math.max(1,Math.floor(n.height));t.setSize(i,a);let c=o.uniforms.iResolution.value;c[0]=r.drawingBufferWidth,c[1]=r.drawingBufferHeight,t.render({scene:s})},u=new ResizeObserver(l);u.observe(e),l();let f=[.5,.5],p=[.5,.5],h=0,g=0,_=e=>{let t=i.getBoundingClientRect();p[0]=(e.clientX-t.left)/t.width,p[1]=1-(e.clientY-t.top)/t.height,g=1},v=()=>{g=0};i.addEventListener(`mousemove`,_),i.addEventListener(`mouseleave`,v);let y=[o.uniforms.uCtrlA.value,o.uniforms.uCtrlB.value,o.uniforms.uCtrlC.value,o.uniforms.uCtrlD.value],b=0,x=!0,S=!document.hidden,C=performance.now(),w=e=>{let n=(e-C)*.001,r=o.uniforms;r.iTime.value=n;let i=r.uMorphAmount.value,a=r.uSpeed.value,c=r.uMorphSpeed.value;for(let e=0;e<4;e++){let t=y[e],r=O[e];for(let e=0;e<4;e++){let o=r[e];t[e]=i*Math.sin(n*a*Math.sin(o*c)+o)}}f[0]+=.05*(p[0]-f[0]),f[1]+=.05*(p[1]-f[1]),r.uMouse.value[0]=f[0],r.uMouse.value[1]=f[1],h+=.05*(g-h),r.uMouseActive.value=h,t.render({scene:s}),b=requestAnimationFrame(w)},k=()=>{x&&S&&b===0&&(b=requestAnimationFrame(w))},A=()=>{b!==0&&(cancelAnimationFrame(b),b=0)},j=new IntersectionObserver(([e])=>{x=e.isIntersecting,x?k():A()},{threshold:0});j.observe(e);let M=()=>{S=!document.hidden,S?k():A()};return document.addEventListener(`visibilitychange`,M),k(),()=>{A(),u.disconnect(),j.disconnect(),document.removeEventListener(`visibilitychange`,M),i.removeEventListener(`mousemove`,_),i.removeEventListener(`mouseleave`,v),D.delete(e);try{e.removeChild(i)}catch{}r.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,v.useEffect)(()=>{let n=F.current;if(!n)return;let c=D.get(n);if(!c)return;let{program:d}=c,m=d.uniforms;m.uSpeed.value=i,m.uMorphAmount.value=a,m.uMorphSpeed.value=o,m.uBands.value=s,m.uThickness.value=l,m.uScale.value=u,m.uPixelSize.value=f,m.uGlow.value=p,m.uColorMode.value=w(h),m.uContrast.value=g,m.uBrightness.value=_,m.uFillBands.value=+!!y,m.uOpacity.value=b,m.uLightMode.value=+!!N,m.uGrain.value=+!!x,m.uGrainIntensity.value=k,m.uLow.value=new Float32Array(C(e)),m.uMid.value=new Float32Array(C(t)),m.uHigh.value=new Float32Array(C(r)),m.uMouseEnabled.value=+!!A,m.uMouseRadius.value=j,m.uMouseStrength.value=M},[e,t,r,i,a,o,s,l,u,f,p,h,g,_,y,b,x,k,A,j,M,N]),(0,S.jsx)(`div`,{ref:F,className:`topography-container ${P}`.trim()})},A=[{label:`Our first project`,name:`MC Fiduciaire`,domain:`mc-fiduciaire.be`,href:`https://mc-fiduciaire.be`,summary:`An accounting firm with 500+ clients. We built the website that welcomes each of them in their own language and puts a face on the people behind the numbers.`,features:[{icon:i,title:`7-language switcher`,text:`Visitors switch between 7 languages in one click.`,chips:[`Română`,`Français`,`English`,`Nederlands`,`Português`,`Русский`,`Українська`]},{icon:f,title:`Hero photo carousel`,text:`A carousel of photos on the hero gives the firm a face from the first second.`,image:s,alt:`MC Fiduciaire homepage with a photo carousel of the team in the hero`},{icon:g,title:`Our team page`,text:`A round portrait of every accountant, so clients know who they’re talking to.`,image:p,alt:`MC Fiduciaire team page with a round portrait of each accountant`},{icon:l,title:`Useful information`,text:`A page sorted by category, built around the most popular Belgian domains.`,image:u,alt:`MC Fiduciaire resources page with category filters and guides`},{icon:r,title:`Contact form, straight to email`,text:`Name, phone, subject and message land directly in the firm’s inbox, with privacy consent built in.`,image:h,alt:`MC Fiduciaire contact page with the contact form`}]}];function j(){return(0,S.jsxs)(`section`,{id:`projects`,className:`projects`,"aria-labelledby":`projects-title`,children:[(0,S.jsxs)(`div`,{className:`projects__intro`,children:[(0,S.jsxs)(`h2`,{id:`projects-title`,children:[`Proof, `,(0,S.jsx)(`span`,{children:`not promises.`})]}),(0,S.jsx)(`p`,{children:`Every project starts with a real business and a real problem. Here’s the first one.`})]}),A.map(({label:e,name:t,domain:n,href:r,summary:i,features:a})=>(0,S.jsxs)(`article`,{className:`project-card`,children:[(0,S.jsxs)(`header`,{className:`project-card__header`,children:[(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`p`,{className:`project-card__label`,children:e}),(0,S.jsx)(`h3`,{children:t})]}),(0,S.jsxs)(`a`,{href:r,target:`_blank`,rel:`noreferrer`,className:`project-card__link`,children:[n,(0,S.jsx)(o,{size:18,"aria-hidden":`true`})]})]}),(0,S.jsx)(`p`,{className:`project-card__summary`,children:i}),(0,S.jsx)(`ul`,{className:`project-card__features`,children:a.map(({icon:e,title:t,text:n,image:r,alt:i,chips:a})=>(0,S.jsxs)(`li`,{className:a?`project-card__feature--wide`:void 0,children:[r&&(0,S.jsx)(`img`,{src:r,alt:i,width:`1280`,height:`800`,loading:`lazy`}),(0,S.jsxs)(`h4`,{children:[(0,S.jsx)(e,{size:20,"aria-hidden":`true`}),t]}),(0,S.jsx)(`p`,{children:n}),a&&(0,S.jsx)(`ul`,{className:`project-card__chips`,children:a.map(e=>(0,S.jsx)(`li`,{children:e},e))})]},t))})]},t))]})}function M(){let[e,t]=(0,v.useState)(!1),[n,r]=(0,v.useState)({first:``,blue:``,second:``,third:``,green:``});return(0,v.useEffect)(()=>{let e=[window.setTimeout(()=>t(!0),5600)],n=(t,n,i)=>{let a=window.setTimeout(()=>{let i=0,a=window.setInterval(()=>{i+=1,r(e=>({...e,[t]:n.slice(0,i)})),i>=n.length&&window.clearInterval(a)},45);e.push(a)},i);e.push(a)};n(`first`,`$ ls`,0),n(`second`,`$ cd Documents`,1600),n(`third`,`$ pwd`,2400);let i=window.setTimeout(()=>{r(e=>({...e,blue:`Let's build your website!`}))},800),a=window.setTimeout(()=>{r(e=>({...e,green:`/home/user/Documents`}))},3200);return e.push(i,a),()=>e.forEach(e=>{window.clearTimeout(e),window.clearInterval(e)})},[]),(0,S.jsxs)(`main`,{className:`app-shell`,children:[(0,S.jsx)(`section`,{className:`terminal-intro ${e?`terminal-intro--hidden`:``}`,"aria-label":`Terminal introduction`,children:(0,S.jsxs)(`div`,{className:`terminal-intro__window`,children:[(0,S.jsxs)(`div`,{className:`terminal-intro__bar`,"aria-hidden":`true`,children:[(0,S.jsx)(`span`,{className:`terminal-intro__dot`}),(0,S.jsx)(`span`,{className:`terminal-intro__dot`}),(0,S.jsx)(`span`,{className:`terminal-intro__dot`})]}),(0,S.jsxs)(`div`,{className:`terminal-intro__body`,children:[(0,S.jsx)(`span`,{className:`terminal-line`,children:n.first}),(0,S.jsx)(`span`,{className:`terminal-line terminal-line--output terminal-line--blue ${n.blue?`terminal-line--visible`:``}`,children:n.blue}),(0,S.jsx)(`span`,{className:`terminal-line`,children:n.second}),(0,S.jsx)(`span`,{className:`terminal-line`,children:n.third}),(0,S.jsx)(`span`,{className:`terminal-line terminal-line--output terminal-line--green ${n.green?`terminal-line--visible`:``}`,children:n.green})]})]})}),(0,S.jsxs)(`main`,{className:`topography-hero ${e?`topography-hero--visible`:``}`,children:[(0,S.jsx)(`div`,{className:`dot-background`,"aria-hidden":`true`}),(0,S.jsx)(`div`,{className:`topography-hero__background`,"aria-hidden":`true`,children:(0,S.jsx)(k,{lowColor:`#7c3aed`,midColor:`#22d3ee`,highColor:`#FFFFFF`,speed:.35,morphAmount:3,morphSpeed:.05,bands:2,thickness:.01,scale:2,pixelSize:1,glow:.5,colorMode:`elevation`,contrast:3,brightness:1,fillBands:!1,opacity:1,grain:!0,grainIntensity:.05,mouseInteraction:!0,mouseRadius:.3,mouseStrength:.4})}),(0,S.jsxs)(`section`,{className:`topography-hero__content`,"aria-labelledby":`hero-title`,children:[(0,S.jsx)(`p`,{className:`topography-hero__eyebrow`,children:`AV DESIGN STUDIO`}),(0,S.jsx)(`h1`,{id:`hero-title`,children:`Grow your business`}),(0,S.jsx)(`p`,{className:`topography-hero__description`,children:`Digital experiences with motion, clarity, and a little electricity.`}),(0,S.jsxs)(`a`,{className:`scroll-cue`,href:`#projects`,children:[`Scroll to see more`,(0,S.jsx)(x,{size:20,"aria-hidden":`true`})]})]})]}),(0,S.jsx)(j,{}),(0,S.jsxs)(`nav`,{className:`site-nav`,"aria-label":`Main`,children:[(0,S.jsx)(`a`,{href:`#projects`,children:`Projects`}),(0,S.jsx)(`a`,{href:`#contact`,children:`Contact`})]})]})}(0,y.createRoot)(document.getElementById(`root`)).render((0,S.jsx)(v.StrictMode,{children:(0,S.jsx)(M,{})}));