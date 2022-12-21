import{P as q,S as ce,T as X,ap as ue,W as me,d as A,V as s,C as P,am as de,aq as fe,l as N,ar as j,w as G,$ as ve,as as pe,ad as B,at as V,au as H,av as we,aw as ge,R as xe,M as he,ax as ye,D as Ce,ay as Me,k as _e,_ as Se}from"./three.module.4532a980.js";import{O as be}from"./OrbitControls.802c505d.js";import{G as Pe}from"./GLTFLoader.695b33d7.js";import{d as De,o as Le,b as We,e as I}from"./index.1c0582b1.js";function Re(r,t){const e=new q(60,r/t,1,2e4);return e.position.z=-1e3,e.position.y=1500,e}function Fe(r,t){const e=new be(r,t);return e.minDistance=650,e.maxDistance=2500,e.maxPolarAngle=Math.PI/2.1,e.enablePan=!1,e.enableDamping=!0,e}async function Te(r){const t=new ce,e=await new X().loadAsync("/items/ice/arctic.png"),o=new ue(e.image.height);return o.fromEquirectangularTexture(r,e),t.background=o.texture,t}function ze(r,t){const e=new me({antialias:!0});return e.setPixelRatio(window.devicePixelRatio),e.setSize(r,t),e}class Y extends A{constructor(t,e={}){super(t);const o=this,u=e.textureWidth!==void 0?e.textureWidth:512,g=e.textureHeight!==void 0?e.textureHeight:512,m=e.clipBias!==void 0?e.clipBias:0,D=e.alpha!==void 0?e.alpha:1,C=e.time!==void 0?e.time:0,M=e.waterNormals!==void 0?e.waterNormals:null,L=e.sunDirection!==void 0?e.sunDirection:new s(.70707,.70707,0),W=new P(e.sunColor!==void 0?e.sunColor:16777215),R=new P(e.waterColor!==void 0?e.waterColor:8355711),E=e.eye!==void 0?e.eye:new s(0,0,0),te=e.distortionScale!==void 0?e.distortionScale:20,re=e.side!==void 0?e.side:de,oe=e.fog!==void 0?e.fog:!1,f=new fe,d=new s,v=new s,F=new s,x=new N,_=new s(0,0,-1),c=new j,h=new s,S=new s,y=new j,b=new N,a=new q,ne={minFilter:G,magFilter:G,format:ve},T=new pe(u,g,ne);(!B.isPowerOfTwo(u)||!B.isPowerOfTwo(g))&&(T.texture.generateMipmaps=!1);const z={uniforms:V.merge([H.fog,H.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new N},sunColor:{value:new P(8355711)},sunDirection:{value:new s(.70707,.70707,0)},eye:{value:new s},waterColor:{value:new P(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.3;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <fog_fragment>
				}`},i=new we({fragmentShader:z.fragmentShader,vertexShader:z.vertexShader,uniforms:V.clone(z.uniforms),lights:!0,side:re,fog:oe});i.uniforms.mirrorSampler.value=T.texture,i.uniforms.textureMatrix.value=b,i.uniforms.alpha.value=D,i.uniforms.time.value=C,i.uniforms.normalSampler.value=M,i.uniforms.sunColor.value=W,i.uniforms.waterColor.value=R,i.uniforms.sunDirection.value=L,i.uniforms.distortionScale.value=te,i.uniforms.eye.value=E,o.material=i,o.onBeforeRender=function(n,ae,p){if(v.setFromMatrixPosition(o.matrixWorld),F.setFromMatrixPosition(p.matrixWorld),x.extractRotation(o.matrixWorld),d.set(0,0,1),d.applyMatrix4(x),h.subVectors(v,F),h.dot(d)>0)return;h.reflect(d).negate(),h.add(v),x.extractRotation(p.matrixWorld),_.set(0,0,-1),_.applyMatrix4(x),_.add(F),S.subVectors(v,_),S.reflect(d).negate(),S.add(v),a.position.copy(h),a.up.set(0,1,0),a.up.applyMatrix4(x),a.up.reflect(d),a.lookAt(S),a.far=p.far,a.updateMatrixWorld(),a.projectionMatrix.copy(p.projectionMatrix),b.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),b.multiply(a.projectionMatrix),b.multiply(a.matrixWorldInverse),f.setFromNormalAndCoplanarPoint(d,v),f.applyMatrix4(a.matrixWorldInverse),c.set(f.normal.x,f.normal.y,f.normal.z,f.constant);const l=a.projectionMatrix;y.x=(Math.sign(c.x)+l.elements[8])/l.elements[0],y.y=(Math.sign(c.y)+l.elements[9])/l.elements[5],y.z=-1,y.w=(1+l.elements[10])/l.elements[14],c.multiplyScalar(2/c.dot(y)),l.elements[2]=c.x,l.elements[6]=c.y,l.elements[10]=c.z+1-m,l.elements[14]=c.w,E.setFromMatrixPosition(p.matrixWorld);const ie=n.getRenderTarget(),se=n.xr.enabled,le=n.shadowMap.autoUpdate;o.visible=!1,n.xr.enabled=!1,n.shadowMap.autoUpdate=!1,n.setRenderTarget(T),n.state.buffers.depth.setMask(!0),n.autoClear===!1&&n.clear(),n.render(ae,a),o.visible=!0,n.xr.enabled=se,n.shadowMap.autoUpdate=le,n.setRenderTarget(ie);const U=p.viewport;U!==void 0&&n.state.viewport(U)}}}Y.prototype.isWater=!0;async function Ne(){const r=new ge(15e3),t=await new X().loadAsync("/items/ice/waternormals.jpg");t.wrapS=t.wrapT=xe;const e=new Y(r,{textureWidth:512,textureHeight:512,waterNormals:t,sunDirection:new s,waterColor:277,sunColor:16777215,distortionScale:3,fog:!1});return e.rotation.x=-Math.PI/2,e}async function ke(){const{scene:r}=await new Pe().loadAsync("/items/ice/iceberg.glb"),t=new he({color:13754879,shininess:128});return r.scale.set(2,2,2),r.traverse(e=>{e instanceof A&&(e.material=t)}),r}function Ae(){const t=new ye(15595003,68656),e=new Ce(15595003,.2);return e.position.set(0,4e3,2e3),[t,e]}const O=new Me,k=new _e;let $,J,K=!1,Q;function Z(r){k.x=2*r.clientX/$-1,k.y=-2*r.clientY/J+1}function ee(){if(!K)return;const r=Math.random()*16777215;Q.traverse(t=>{t instanceof A&&t.material.color.set(r)})}function Ee(r,t,e,o,u){return $=r,J=t,Q=u,window.addEventListener("pointermove",Z),window.addEventListener("pointerup",ee),()=>{O.setFromCamera(k,e),K=O.intersectObjects(o.children,!0).some(m=>/iceberg/.test(m.object.name))}}function Ue(){window.removeEventListener("pointermove",Z),window.removeEventListener("pointerup",ee)}let w;async function je(r){const[t,e]=[window.innerWidth,window.innerHeight];w=ze(t,e);const o=w.domElement,u=Re(t,e),g=Fe(u,o),m=await Te(w),D=Ae(),C=await Ne(),M=await ke();m.add(...D,C,M);const L=Ee(t,e,u,m,M);function W(){L(),g.update();const R=C.material;R.uniforms.time.value+=.015,w.render(m,u)}w.setAnimationLoop(W),r.appendChild(o)}function Ge(){w.setAnimationLoop(null),Ue()}const Oe=De({__name:"index",setup(r){return(t,e)=>{const o=Se;return Le(),We(o,{start:I(je),stop:I(Ge)},null,8,["start","stop"])}}});export{Oe as default};
