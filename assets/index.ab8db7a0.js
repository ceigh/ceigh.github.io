import{P as W,S as X,W as D,a as F,l as M,M as H,I as V,C as j,m as K,n as q,d as J,o as N,V as O,_ as Q}from"./three.module.787f171a.js";import{u as U}from"./index.959e079b.js";import{G as Z}from"./GLTFLoader.f4fc3ae0.js";import{d as $,o as ee,e as te,f as L}from"./index.4f91fb62.js";function ne(e,o){const n=new W(60,e/o,1,20);return n.position.z=10,n}function oe(){return new X}function se(e,o,n){const t=new D({antialias:!0});return t.setPixelRatio(window.devicePixelRatio),t.setSize(e,o),n&&(t.shadowMap.enabled=!0),t.shadowMap.type=F,t}const ie=[[2,3],[5,10]];async function re(e,o,n=1,t=!0){const[s,i]=ie[n],[r,c]=[Math.ceil(o/140),Math.ceil(e/130)],l=r>s?s:r,m=c>i?i:c,p=l*m,A=(m-1)/2,E=(l-1.8)/2,_=(await new Z().loadAsync("/items/hello/kitty.glb")).scene.children[0],T=new M().makeRotationY(Math.PI/2).multiply(new M().makeScale(.03,.03,.03));_.geometry.applyMatrix4(T);const{geometry:B}=_,G=new H({shininess:100}),u=new V(B,G,p);t&&(u.castShadow=!0,u.receiveShadow=!0);const y=new M,b=[16609939,12976143,16711422,6281941].map(d=>new j(d));let f=0;for(let d=0;d<l;d++)for(let v=0;v<m;v++){const x=Math.random(),Y=b[Math.floor(x*b.length)],I=x-.5;u.setColorAt(f,Y),y.setPosition(2.5*(A-v),3*(E-d),I),u.setMatrixAt(f,y),f++}return u}const g=2;let S,P,w,a;const C="ontouchstart"in window||navigator.maxTouchPoints>0;function z(e,o){e=S*e-1,o=P*o+1;const n=new O(e,o,g);n.unproject(w);const t=n.sub(w.position).normalize(),s=-w.position.z/t.z,i=w.position.clone().add(t.multiplyScalar(s));a.position.set(i.x,i.y,g)}const k=e=>z(e.clientX,e.clientY),R=e=>{z(e.touches[0].clientX,e.touches[0].clientY)};function ae(e,o,n,t){S=2/e,P=-2/o,w=n;const s=new K(.1),i=new q({emissive:16777215}),r=new J(s,i);return a=new N(16777215,1,20,2),a.position.set(0,0,g),t&&(a.castShadow=!0),a.add(r),C?window.addEventListener("touchmove",R):window.addEventListener("pointermove",k),a}function ce(){C?window.removeEventListener("touchmove",R):window.removeEventListener("pointermove",k)}let h;async function le(e,o,n){const[t,s]=[window.innerWidth,window.innerHeight];h=se(t,s,n);const i=h.domElement,r=ne(t,s),c=oe(),l=ae(t,s,r,n),m=await re(t,s,o,n);c.add(l,m);function p(){h.render(c,r)}h.setAnimationLoop(p),e.appendChild(i)}function me(){h.setAnimationLoop(null),ce()}const fe=$({__name:"index",setup(e){return U({htmlAttrs:{style:"overscroll-behavior: none; overflow: hidden;"}}),(o,n)=>{const t=Q;return ee(),te(t,{start:L(le),stop:L(me),style:{cursor:"none"}},null,8,["start","stop"])}}});export{fe as default};
