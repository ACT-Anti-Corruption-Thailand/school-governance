import{S as Ce,i as Pe,s as Ne,C as ee,D as Xe,k as I,q as x,a as D,E as Ke,e as rs,l as y,m as w,r as z,h as f,c as C,F as Je,n as u,G as te,H as Te,b as A,I as m,J as is,K as Z,B as $e,L as Wr,o as zt,M as Vr,N as pe,w as ne,x as se,y as re,O as kn,f as W,t as V,z as ie,P as tt,Q as Sn,R as An,T as nt,U as st,V as rt,W as it,X as os,u as Vs,Y as jr,Z as Gr,_ as Kr}from"../../chunks/index-5223bfc9.js";import{c as mn,a as gn,b as as}from"../../chunks/firebaseapp-89a47d96.js";import{s as rn,a as on}from"../../chunks/search-9064e26c.js";import{p as Jr}from"../../chunks/stores-d1c647ff.js";import{R as Rn,f as On,u as js,D as Gs,a as Dn,b as Yr,c as Xr}from"../../chunks/common-347a5940.js";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ks=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let r=n.charCodeAt(s);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},Qr=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const r=n[t++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=n[t++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=n[t++],o=n[t++],a=n[t++],l=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],o=n[t++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Js={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<n.length;r+=3){const i=n[r],o=r+1<n.length,a=o?n[r+1]:0,l=r+2<n.length,c=l?n[r+2]:0,d=i>>2,p=(i&3)<<4|a>>4;let v=(a&15)<<2|c>>6,_=c&63;l||(_=64,o||(v=64)),s.push(t[d],t[p],t[v],t[_])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ks(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Qr(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<n.length;){const i=t[n.charAt(r++)],a=r<n.length?t[n.charAt(r)]:0;++r;const c=r<n.length?t[n.charAt(r)]:64;++r;const p=r<n.length?t[n.charAt(r)]:64;if(++r,i==null||a==null||c==null||p==null)throw Error();const v=i<<2|a>>4;if(s.push(v),c!==64){const _=a<<4&240|c>>2;if(s.push(_),p!==64){const E=c<<6&192|p;s.push(E)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Zr=function(n){const e=Ks(n);return Js.encodeByteArray(e,!0)},Ys=function(n){return Zr(n).replace(/\./g,"")},Xs=function(n){try{return Js.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ei(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(K())}function ti(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function ni(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function si(){const n=K();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ri(){return typeof indexedDB=="object"}function ii(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var i;e(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}function oi(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ai=()=>oi().__FIREBASE_DEFAULTS__,li=()=>{if(typeof process>"u"||typeof process.env>"u")return;const n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ci=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Xs(n[1]);return e&&JSON.parse(e)},Cn=()=>{try{return ai()||li()||ci()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ui=n=>{var e,t;return(t=(e=Cn())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},di=()=>{var n;return(n=Cn())===null||n===void 0?void 0:n.config},Qs=n=>{var e;return(e=Cn())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fi="FirebaseError";class Me extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=fi,Object.setPrototypeOf(this,Me.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,vt.prototype.create)}}class vt{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?pi(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Me(r,a,s)}}function pi(n,e){return n.replace(mi,(t,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const mi=/\{\$([^}]+)}/g;function gi(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function qt(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const r of t){if(!s.includes(r))return!1;const i=n[r],o=e[r];if(ls(i)&&ls(o)){if(!qt(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!t.includes(r))return!1;return!0}function ls(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function _i(n,e){const t=new vi(n,e);return t.subscribe.bind(t)}class vi{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let r;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");bi(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:s},r.next===void 0&&(r.next=an),r.error===void 0&&(r.error=an),r.complete===void 0&&(r.complete=an);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function bi(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function an(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(n){return n&&n._delegate?n._delegate:n}class ot{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new hi;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(wi(e))try{this.getOrInitializeService({instanceIdentifier:qe})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=qe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=qe){return this.instances.has(e)}getOptions(e=qe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,t){var s;const r=this.normalizeInstanceIdentifier(t),i=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(!!s)for(const r of s)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:yi(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=qe){return this.component?this.component.multipleInstances?e:qe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function yi(n){return n===qe?void 0:n}function wi(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ii(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(q||(q={}));const Ti={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},ki=q.INFO,Si={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},Ai=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),r=Si[e];if(r)console[r](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Zs{constructor(e){this.name=e,this._logLevel=ki,this._logHandler=Ai,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ti[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...e),this._logHandler(this,q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...e),this._logHandler(this,q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,q.INFO,...e),this._logHandler(this,q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,q.WARN,...e),this._logHandler(this,q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...e),this._logHandler(this,q.ERROR,...e)}}const Ri=(n,e)=>e.some(t=>n instanceof t);let cs,us;function Oi(){return cs||(cs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Di(){return us||(us=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const er=new WeakMap,_n=new WeakMap,tr=new WeakMap,ln=new WeakMap,Pn=new WeakMap;function Ci(n){const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(Re(n.result)),r()},o=()=>{s(n.error),r()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&er.set(t,n)}).catch(()=>{}),Pn.set(e,n),e}function Pi(n){if(_n.has(n))return;const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),r()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});_n.set(n,e)}let vn={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return _n.get(n);if(e==="objectStoreNames")return n.objectStoreNames||tr.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Re(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Ni(n){vn=n(vn)}function Mi(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(cn(this),e,...t);return tr.set(s,e.sort?e.sort():[e]),Re(s)}:Di().includes(n)?function(...e){return n.apply(cn(this),e),Re(er.get(this))}:function(...e){return Re(n.apply(cn(this),e))}}function Li(n){return typeof n=="function"?Mi(n):(n instanceof IDBTransaction&&Pi(n),Ri(n,Oi())?new Proxy(n,vn):n)}function Re(n){if(n instanceof IDBRequest)return Ci(n);if(ln.has(n))return ln.get(n);const e=Li(n);return e!==n&&(ln.set(n,e),Pn.set(e,n)),e}const cn=n=>Pn.get(n);function Ui(n,e,{blocked:t,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(n,e),a=Re(o);return s&&o.addEventListener("upgradeneeded",l=>{s(Re(o.result),l.oldVersion,l.newVersion,Re(o.transaction))}),t&&o.addEventListener("blocked",()=>t()),a.then(l=>{i&&l.addEventListener("close",()=>i()),r&&l.addEventListener("versionchange",()=>r())}).catch(()=>{}),a}const qi=["get","getKey","getAll","getAllKeys","count"],Bi=["put","add","delete","clear"],un=new Map;function ds(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(un.get(e))return un.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,r=Bi.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(r||qi.includes(t)))return;const i=async function(o,...a){const l=this.transaction(o,r?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),r&&l.done]))[0]};return un.set(e,i),i}Ni(n=>({...n,get:(e,t,s)=>ds(e,t)||n.get(e,t,s),has:(e,t)=>!!ds(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Fi(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function Fi(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const bn="@firebase/app",hs="0.8.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe=new Zs("@firebase/app"),Hi="@firebase/app-compat",xi="@firebase/analytics-compat",zi="@firebase/analytics",Wi="@firebase/app-check-compat",Vi="@firebase/app-check",ji="@firebase/auth",Gi="@firebase/auth-compat",Ki="@firebase/database",Ji="@firebase/database-compat",Yi="@firebase/functions",Xi="@firebase/functions-compat",Qi="@firebase/installations",Zi="@firebase/installations-compat",eo="@firebase/messaging",to="@firebase/messaging-compat",no="@firebase/performance",so="@firebase/performance-compat",ro="@firebase/remote-config",io="@firebase/remote-config-compat",oo="@firebase/storage",ao="@firebase/storage-compat",lo="@firebase/firestore",co="@firebase/firestore-compat",uo="firebase",ho="9.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In="[DEFAULT]",fo={[bn]:"fire-core",[Hi]:"fire-core-compat",[zi]:"fire-analytics",[xi]:"fire-analytics-compat",[Vi]:"fire-app-check",[Wi]:"fire-app-check-compat",[ji]:"fire-auth",[Gi]:"fire-auth-compat",[Ki]:"fire-rtdb",[Ji]:"fire-rtdb-compat",[Yi]:"fire-fn",[Xi]:"fire-fn-compat",[Qi]:"fire-iid",[Zi]:"fire-iid-compat",[eo]:"fire-fcm",[to]:"fire-fcm-compat",[no]:"fire-perf",[so]:"fire-perf-compat",[ro]:"fire-rc",[io]:"fire-rc-compat",[oo]:"fire-gcs",[ao]:"fire-gcs-compat",[lo]:"fire-fst",[co]:"fire-fst-compat","fire-js":"fire-js",[uo]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bt=new Map,yn=new Map;function po(n,e){try{n.container.addComponent(e)}catch(t){Fe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function pt(n){const e=n.name;if(yn.has(e))return Fe.debug(`There were multiple attempts to register component ${e}.`),!1;yn.set(e,n);for(const t of Bt.values())po(t,n);return!0}function nr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mo={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},Oe=new vt("app","Firebase",mo);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e,t,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new ot("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Oe.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt=ho;function sr(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s=Object.assign({name:In,automaticDataCollectionEnabled:!1},e),r=s.name;if(typeof r!="string"||!r)throw Oe.create("bad-app-name",{appName:String(r)});if(t||(t=di()),!t)throw Oe.create("no-options");const i=Bt.get(r);if(i){if(qt(t,i.options)&&qt(s,i.config))return i;throw Oe.create("duplicate-app",{appName:r})}const o=new Ei(r);for(const l of yn.values())o.addComponent(l);const a=new go(t,s,o);return Bt.set(r,a),a}function _o(n=In){const e=Bt.get(n);if(!e&&n===In)return sr();if(!e)throw Oe.create("no-app",{appName:n});return e}function Qe(n,e,t){var s;let r=(s=fo[n])!==null&&s!==void 0?s:n;t&&(r+=`-${t}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Fe.warn(a.join(" "));return}pt(new ot(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vo="firebase-heartbeat-database",bo=1,mt="firebase-heartbeat-store";let dn=null;function rr(){return dn||(dn=Ui(vo,bo,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(mt)}}}).catch(n=>{throw Oe.create("idb-open",{originalErrorMessage:n.message})})),dn}async function Io(n){var e;try{return(await rr()).transaction(mt).objectStore(mt).get(ir(n))}catch(t){if(t instanceof Me)Fe.warn(t.message);else{const s=Oe.create("idb-get",{originalErrorMessage:(e=t)===null||e===void 0?void 0:e.message});Fe.warn(s.message)}}}async function fs(n,e){var t;try{const r=(await rr()).transaction(mt,"readwrite");return await r.objectStore(mt).put(e,ir(n)),r.done}catch(s){if(s instanceof Me)Fe.warn(s.message);else{const r=Oe.create("idb-set",{originalErrorMessage:(t=s)===null||t===void 0?void 0:t.message});Fe.warn(r.message)}}}function ir(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yo=1024,wo=30*24*60*60*1e3;class Eo{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ko(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=ps();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(r=>{const i=new Date(r.date).valueOf();return Date.now()-i<=wo}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ps(),{heartbeatsToSend:t,unsentEntries:s}=To(this._heartbeatsCache.heartbeats),r=Ys(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function ps(){return new Date().toISOString().substring(0,10)}function To(n,e=yo){const t=[];let s=n.slice();for(const r of n){const i=t.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),ms(t)>e){i.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),ms(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class ko{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ri()?ii().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await Io(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return fs(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return fs(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function ms(n){return Ys(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function So(n){pt(new ot("platform-logger",e=>new $i(e),"PRIVATE")),pt(new ot("heartbeat",e=>new Eo(e),"PRIVATE")),Qe(bn,hs,n),Qe(bn,hs,"esm2017"),Qe("fire-js","")}So("");var Ao="firebase",Ro="9.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Qe(Ao,Ro,"app");function Vt(n,e){var t={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,s=Object.getOwnPropertySymbols(n);r<s.length;r++)e.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(n,s[r])&&(t[s[r]]=n[s[r]]);return t}function or(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Oo=or,ar=new vt("auth","Firebase",or());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gs=new Zs("@firebase/auth");function Ct(n,...e){gs.logLevel<=q.ERROR&&gs.error(`Auth (${Wt}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(n,...e){throw Nn(n,...e)}function ae(n,...e){return Nn(n,...e)}function Do(n,e,t){const s=Object.assign(Object.assign({},Oo()),{[e]:t});return new vt("auth","Firebase",s).create(e,{appName:n.name})}function Nn(n,...e){if(typeof n!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=n.name),n._errorFactory.create(t,...s)}return ar.create(n,...e)}function k(n,e,...t){if(!n)throw Nn(e,...t)}function he(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ct(e),new Error(e)}function ge(n,e){n||he(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s=new Map;function fe(n){ge(n instanceof Function,"Expected a class definition");let e=_s.get(n);return e?(ge(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,_s.set(n,e),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Co(n,e){const t=nr(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),i=t.getOptions();if(qt(i,e!=null?e:{}))return r;me(r,"already-initialized")}return t.initialize({options:e})}function Po(n,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(fe);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function No(){return vs()==="http:"||vs()==="https:"}function vs(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mo(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(No()||ti()||"connection"in navigator)?navigator.onLine:!0}function Lo(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e,t){this.shortDelay=e,this.longDelay=t,ge(t>e,"Short delay should be less than long delay!"),this.isMobile=ei()||ni()}get(){return Mo()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mn(n,e){ge(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;he("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;he("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;he("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uo={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qo=new It(3e4,6e4);function cr(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function jt(n,e,t,s,r={}){return ur(n,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=bt(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode),lr.fetch()(hr(n,n.config.apiHost,t,a),Object.assign({method:e,headers:l,referrerPolicy:"no-referrer"},i))})}async function ur(n,e,t){n._canInitEmulator=!1;const s=Object.assign(Object.assign({},Uo),e);try{const r=new Bo(n),i=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Dt(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Dt(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Dt(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Dt(n,"user-disabled",o);const d=s[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Do(n,d,c);me(n,d)}}catch(r){if(r instanceof Me)throw r;me(n,"network-request-failed")}}async function dr(n,e,t,s,r={}){const i=await jt(n,e,t,s,r);return"mfaPendingCredential"in i&&me(n,"multi-factor-auth-required",{_serverResponse:i}),i}function hr(n,e,t,s){const r=`${e}${t}?${s}`;return n.config.emulator?Mn(n.config,r):`${n.config.apiScheme}://${r}`}class Bo{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(ae(this.auth,"network-request-failed")),qo.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Dt(n,e,t){const s={appName:n.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const r=ae(n,e,s);return r.customData._tokenResponse=t,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $o(n,e){return jt(n,"POST","/v1/accounts:delete",e)}async function Fo(n,e){return jt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(n){if(!!n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ho(n,e=!1){const t=Le(n),s=await t.getIdToken(e),r=Ln(s);k(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:ht(hn(r.auth_time)),issuedAtTime:ht(hn(r.iat)),expirationTime:ht(hn(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function hn(n){return Number(n)*1e3}function Ln(n){var e;const[t,s,r]=n.split(".");if(t===void 0||s===void 0||r===void 0)return Ct("JWT malformed, contained fewer than 3 sections"),null;try{const i=Xs(s);return i?JSON.parse(i):(Ct("Failed to decode base64 JWT payload"),null)}catch(i){return Ct("Caught error parsing JWT payload as JSON",(e=i)===null||e===void 0?void 0:e.toString()),null}}function xo(n){const e=Ln(n);return k(e,"internal-error"),k(typeof e.exp<"u","internal-error"),k(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gt(n,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof Me&&zo(s)&&n.auth.currentUser===n&&await n.auth.signOut(),s}}function zo({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const r=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){var e;try{await this.user.getIdToken(!0)}catch(t){((e=t)===null||e===void 0?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ht(this.lastLoginAt),this.creationTime=ht(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $t(n){var e;const t=n.auth,s=await n.getIdToken(),r=await gt(n,Fo(t,{idToken:s}));k(r==null?void 0:r.users.length,t,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Go(i.providerUserInfo):[],a=jo(n.providerData,o),l=n.isAnonymous,c=!(n.email&&i.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new fr(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function Vo(n){const e=Le(n);await $t(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function jo(n,e){return[...n.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function Go(n){return n.map(e=>{var{providerId:t}=e,s=Vt(e,["providerId"]);return{providerId:t,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ko(n,e){const t=await ur(n,{},async()=>{const s=bt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=n.config,o=hr(n,r,"/v1/token",`key=${i}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",lr.fetch()(o,{method:"POST",headers:a,body:s})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){k(e.idToken,"internal-error"),k(typeof e.idToken<"u","internal-error"),k(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):xo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return k(!this.accessToken||this.refreshToken,e,"user-token-expired"),!t&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:r,expiresIn:i}=await Ko(e,t);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:r,expirationTime:i}=t,o=new _t;return s&&(k(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(k(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(k(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new _t,this.toJSON())}_performRefresh(){return he("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(n,e){k(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Be{constructor(e){var{uid:t,auth:s,stsTokenManager:r}=e,i=Vt(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Wo(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=s,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new fr(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await gt(this,this.stsTokenManager.getToken(this.auth,e));return k(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ho(this,e)}reload(){return Vo(this)}_assign(e){this!==e&&(k(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new Be(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){k(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await $t(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await gt(this,$o(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var s,r,i,o,a,l,c,d;const p=(s=t.displayName)!==null&&s!==void 0?s:void 0,v=(r=t.email)!==null&&r!==void 0?r:void 0,_=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,E=(o=t.photoURL)!==null&&o!==void 0?o:void 0,N=(a=t.tenantId)!==null&&a!==void 0?a:void 0,h=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,S=(c=t.createdAt)!==null&&c!==void 0?c:void 0,O=(d=t.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:U,emailVerified:P,isAnonymous:b,providerData:T,stsTokenManager:R}=t;k(U&&R,e,"internal-error");const H=_t.fromJSON(this.name,R);k(typeof U=="string",e,"internal-error"),we(p,e.name),we(v,e.name),k(typeof P=="boolean",e,"internal-error"),k(typeof b=="boolean",e,"internal-error"),we(_,e.name),we(E,e.name),we(N,e.name),we(h,e.name),we(S,e.name),we(O,e.name);const $=new Be({uid:U,auth:e,email:v,emailVerified:P,displayName:p,isAnonymous:b,photoURL:E,phoneNumber:_,tenantId:N,stsTokenManager:H,createdAt:S,lastLoginAt:O});return T&&Array.isArray(T)&&($.providerData=T.map(_e=>Object.assign({},_e))),h&&($._redirectEventId=h),$}static async _fromIdTokenResponse(e,t,s=!1){const r=new _t;r.updateFromServerResponse(t);const i=new Be({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await $t(i),i}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}pr.type="NONE";const bs=pr;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(n,e,t){return`firebase:${n}:${e}:${t}`}class Ze{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=Pt(this.userKey,r.apiKey,i),this.fullPersistenceKey=Pt("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Be._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new Ze(fe(bs),e,s);const r=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=r[0]||fe(bs);const o=Pt(s,e.config.apiKey,e.name);let a=null;for(const c of t)try{const d=await c._get(o);if(d){const p=Be._fromJSON(e,d);c!==i&&(a=p),i=c;break}}catch{}const l=r.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Ze(i,e,s):(i=l[0],a&&await i._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==i)try{await c._remove(o)}catch{}})),new Ze(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Is(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(_r(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(mr(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(br(e))return"Blackberry";if(Ir(e))return"Webos";if(Un(e))return"Safari";if((e.includes("chrome/")||gr(e))&&!e.includes("edge/"))return"Chrome";if(vr(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=n.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function mr(n=K()){return/firefox\//i.test(n)}function Un(n=K()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function gr(n=K()){return/crios\//i.test(n)}function _r(n=K()){return/iemobile/i.test(n)}function vr(n=K()){return/android/i.test(n)}function br(n=K()){return/blackberry/i.test(n)}function Ir(n=K()){return/webos/i.test(n)}function Gt(n=K()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Jo(n=K()){var e;return Gt(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Yo(){return si()&&document.documentMode===10}function yr(n=K()){return Gt(n)||vr(n)||Ir(n)||br(n)||/windows phone/i.test(n)||_r(n)}function Xo(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wr(n,e=[]){let t;switch(n){case"Browser":t=Is(K());break;case"Worker":t=`${Is(K())}-${n}`;break;default:t=n}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Wt}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=i=>new Promise((o,a)=>{try{const l=e(i);o(l)}catch(l){a(l)}});s.onAbort=t,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){var t;if(this.auth.currentUser===e)return;const s=[];try{for(const r of this.queue)await r(e),r.onAbort&&s.push(r.onAbort)}catch(r){s.reverse();for(const i of s)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:(t=r)===null||t===void 0?void 0:t.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e,t,s){this.app=e,this.heartbeatServiceProvider=t,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ys(this),this.idTokenSubscription=new ys(this),this.beforeStateQueue=new Qo(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ar,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=fe(t)),this._initializationPromise=this.queue(async()=>{var s,r;if(!this._deleted&&(this.persistenceManager=await Ze.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var t;const s=await this.assertedPersistence.getCurrentUser();let r=s,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l==null?void 0:l.user)&&(r=l.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return k(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){var t;try{await $t(e)}catch(s){if(((t=s)===null||t===void 0?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Lo()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const t=e?Le(e):null;return t&&k(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&k(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(fe(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new vt("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&fe(e)||this._popupRedirectResolver;k(t,this,"argument-error"),this.redirectPersistenceManager=await Ze.create(this,[fe(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,r){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t),o=this._isInitialized?Promise.resolve():this._initializationPromise;return k(o,this,"internal-error"),o.then(()=>i(this.currentUser)),typeof t=="function"?e.addObserver(t,s,r):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return k(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=wr(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());return s&&(t["X-Firebase-Client"]=s),t}}function Kt(n){return Le(n)}class ys{constructor(e){this.auth=e,this.observer=null,this.addObserver=_i(t=>this.observer=t)}get next(){return k(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function ea(n,e,t){const s=Kt(n);k(s._canInitEmulator,s,"emulator-config-failed"),k(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!!(t!=null&&t.disableWarnings),i=Er(e),{host:o,port:a}=ta(e),l=a===null?"":`:${a}`;s.config.emulator={url:`${i}//${o}${l}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})}),r||na()}function Er(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ta(n){const e=Er(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:ws(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:ws(o)}}}function ws(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function na(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return he("not implemented")}_getIdTokenResponse(e){return he("not implemented")}_linkToIdToken(e,t){return he("not implemented")}_getReauthenticationResolver(e){return he("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function et(n,e){return dr(n,"POST","/v1/accounts:signInWithIdp",cr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa="http://localhost";class He extends Tr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new He(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):me("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r}=t,i=Vt(t,["providerId","signInMethod"]);if(!s||!r)return null;const o=new He(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return et(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,et(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,et(e,t)}buildRequest(){const e={requestUri:sa,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=bt(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt extends kr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke extends yt{constructor(){super("facebook.com")}static credential(e){return He._fromParams({providerId:ke.PROVIDER_ID,signInMethod:ke.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ke.credentialFromTaggedObject(e)}static credentialFromError(e){return ke.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ke.credential(e.oauthAccessToken)}catch{return null}}}ke.FACEBOOK_SIGN_IN_METHOD="facebook.com";ke.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de extends yt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return He._fromParams({providerId:de.PROVIDER_ID,signInMethod:de.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return de.credentialFromTaggedObject(e)}static credentialFromError(e){return de.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return de.credential(t,s)}catch{return null}}}de.GOOGLE_SIGN_IN_METHOD="google.com";de.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se extends yt{constructor(){super("github.com")}static credential(e){return He._fromParams({providerId:Se.PROVIDER_ID,signInMethod:Se.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Se.credentialFromTaggedObject(e)}static credentialFromError(e){return Se.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Se.credential(e.oauthAccessToken)}catch{return null}}}Se.GITHUB_SIGN_IN_METHOD="github.com";Se.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae extends yt{constructor(){super("twitter.com")}static credential(e,t){return He._fromParams({providerId:Ae.PROVIDER_ID,signInMethod:Ae.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ae.credentialFromTaggedObject(e)}static credentialFromError(e){return Ae.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return Ae.credential(t,s)}catch{return null}}}Ae.TWITTER_SIGN_IN_METHOD="twitter.com";Ae.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ra(n,e){return dr(n,"POST","/v1/accounts:signUp",cr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,r=!1){const i=await Be._fromIdTokenResponse(e,s,r),o=Es(s);return new De({user:i,providerId:o,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const r=Es(s);return new De({user:e,providerId:r,_tokenResponse:s,operationType:t})}}function Es(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ia(n){var e;const t=Kt(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new De({user:t.currentUser,providerId:null,operationType:"signIn"});const s=await ra(t,{returnSecureToken:!0}),r=await De._fromIdTokenResponse(t,"signIn",s,!0);return await t._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft extends Me{constructor(e,t,s,r){var i;super(t.code,t.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,Ft.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,r){return new Ft(e,t,s,r)}}function Sr(n,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ft._fromErrorAndOperation(n,i,e,s):i})}async function oa(n,e,t=!1){const s=await gt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return De._forOperation(n,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aa(n,e,t=!1){var s;const{auth:r}=n,i="reauthenticate";try{const o=await gt(n,Sr(r,i,e,n),t);k(o.idToken,r,"internal-error");const a=Ln(o.idToken);k(a,r,"internal-error");const{sub:l}=a;return k(n.uid===l,r,"user-mismatch"),De._forOperation(n,i,o)}catch(o){throw((s=o)===null||s===void 0?void 0:s.code)==="auth/user-not-found"&&me(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function la(n,e,t=!1){const s="signIn",r=await Sr(n,s,e),i=await De._fromIdTokenResponse(n,s,r);return t||await n._updateCurrentUser(i.user),i}function ca(n,e,t,s){return Le(n).onIdTokenChanged(e,t,s)}function ua(n,e,t){return Le(n).beforeAuthStateChanged(e,t)}function da(n,e,t,s){return Le(n).onAuthStateChanged(e,t,s)}function ha(n){return Le(n).signOut()}const Ht="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ht,"1"),this.storage.removeItem(Ht),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fa(){const n=K();return Un(n)||Gt(n)}const pa=1e3,ma=10;class Rr extends Ar{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=fa()&&Xo(),this.fallbackToPolling=yr(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),r=this.localCache[t];s!==r&&e(t,r,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const s=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(s);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(s,e.newValue):this.storage.removeItem(s);else if(this.localCache[s]===e.newValue&&!t)return}const r=()=>{const o=this.storage.getItem(s);!t&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);Yo()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,ma):r()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},pa)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Rr.type="LOCAL";const ga=Rr;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or extends Ar{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Or.type="SESSION";const Dr=Or;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _a(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const s=new Jt(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:r,data:i}=t.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async c=>c(t.origin,i)),l=await _a(a);t.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Jt.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qn(n="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,l)=>{const c=qn("",20);r.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(p){const v=p;if(v.data.eventId===c)switch(v.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(v.data.response);break;default:clearTimeout(d),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function le(){return window}function ba(n){le().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cr(){return typeof le().WorkerGlobalScope<"u"&&typeof le().importScripts=="function"}async function Ia(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ya(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function wa(){return Cr()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr="firebaseLocalStorageDb",Ea=1,xt="firebaseLocalStorage",Nr="fbase_key";class wt{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Yt(n,e){return n.transaction([xt],e?"readwrite":"readonly").objectStore(xt)}function Ta(){const n=indexedDB.deleteDatabase(Pr);return new wt(n).toPromise()}function En(){const n=indexedDB.open(Pr,Ea);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const s=n.result;try{s.createObjectStore(xt,{keyPath:Nr})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const s=n.result;s.objectStoreNames.contains(xt)?e(s):(s.close(),await Ta(),e(await En()))})})}async function Ts(n,e,t){const s=Yt(n,!0).put({[Nr]:e,value:t});return new wt(s).toPromise()}async function ka(n,e){const t=Yt(n,!1).get(e),s=await new wt(t).toPromise();return s===void 0?null:s.value}function ks(n,e){const t=Yt(n,!0).delete(e);return new wt(t).toPromise()}const Sa=800,Aa=3;class Mr{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await En(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>Aa)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Cr()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Jt._getInstance(wa()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Ia(),!this.activeServiceWorker)return;this.sender=new va(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);!s||((e=s[0])===null||e===void 0?void 0:e.fulfilled)&&((t=s[0])===null||t===void 0?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ya()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await En();return await Ts(e,Ht,"1"),await ks(e,Ht),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>Ts(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>ka(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ks(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=Yt(r,!1).getAll();return new wt(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Sa)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Mr.type="LOCAL";const Ra=Mr;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oa(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}function Da(n){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",n),s.onload=e,s.onerror=r=>{const i=ae("internal-error");i.customData=r,t(i)},s.type="text/javascript",s.charset="UTF-8",Oa().appendChild(s)})}function Ca(n){return`__${n}${Math.floor(Math.random()*1e6)}`}new It(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pa(n,e){return e?fe(e):(k(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn extends Tr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return et(e,this._buildIdpRequest())}_linkToIdToken(e,t){return et(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return et(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Na(n){return la(n.auth,new Bn(n),n.bypassAuthState)}function Ma(n){const{auth:e,user:t}=n;return k(t,e,"internal-error"),aa(t,new Bn(n),n.bypassAuthState)}async function La(n){const{auth:e,user:t}=n;return k(t,e,"internal-error"),oa(t,new Bn(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(e,t,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Na;case"linkViaPopup":case"linkViaRedirect":return La;case"reauthViaPopup":case"reauthViaRedirect":return Ma;default:me(this.auth,"internal-error")}}resolve(e){ge(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ge(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ua=new It(2e3,1e4);class Ye extends Lr{constructor(e,t,s,r,i){super(e,t,r,i),this.provider=s,this.authWindow=null,this.pollId=null,Ye.currentPopupAction&&Ye.currentPopupAction.cancel(),Ye.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return k(e,this.auth,"internal-error"),e}async onExecution(){ge(this.filter.length===1,"Popup operations only handle one event");const e=qn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ae(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ae(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ye.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if(!((s=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ae(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,Ua.get())};e()}}Ye.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa="pendingRedirect",Nt=new Map;class Ba extends Lr{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=Nt.get(this.auth._key());if(!e){try{const s=await $a(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}Nt.set(this.auth._key(),e)}return this.bypassAuthState||Nt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function $a(n,e){const t=xa(e),s=Ha(n);if(!await s._isAvailable())return!1;const r=await s._get(t)==="true";return await s._remove(t),r}function Fa(n,e){Nt.set(n._key(),e)}function Ha(n){return fe(n._redirectPersistence)}function xa(n){return Pt(qa,n.config.apiKey,n.name)}async function za(n,e,t=!1){const s=Kt(n),r=Pa(s,e),o=await new Ba(s,r,t).execute();return o&&!t&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa=10*60*1e3;class Va{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ja(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!Ur(e)){const r=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";t.onError(ae(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Wa&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ss(e))}saveEventToCache(e){this.cachedEventUids.add(Ss(e)),this.lastProcessedEventTime=Date.now()}}function Ss(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Ur({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function ja(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ur(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ga(n,e={}){return jt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ja=/^https?/;async function Ya(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Ga(n);for(const t of e)try{if(Xa(t))return}catch{}me(n,"unauthorized-domain")}function Xa(n){const e=wn(),{protocol:t,hostname:s}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&s===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===s}if(!Ja.test(t))return!1;if(Ka.test(n))return s===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa=new It(3e4,6e4);function As(){const n=le().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Za(n){return new Promise((e,t)=>{var s,r,i;function o(){As(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{As(),t(ae(n,"network-request-failed"))},timeout:Qa.get()})}if(!((r=(s=le().gapi)===null||s===void 0?void 0:s.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((i=le().gapi)===null||i===void 0)&&i.load)o();else{const a=Ca("iframefcb");return le()[a]=()=>{gapi.load?o():t(ae(n,"network-request-failed"))},Da(`https://apis.google.com/js/api.js?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw Mt=null,e})}let Mt=null;function el(n){return Mt=Mt||Za(n),Mt}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl=new It(5e3,15e3),nl="__/auth/iframe",sl="emulator/auth/iframe",rl={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},il=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ol(n){const e=n.config;k(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Mn(e,sl):`https://${n.config.authDomain}/${nl}`,s={apiKey:e.apiKey,appName:n.name,v:Wt},r=il.get(n.config.apiHost);r&&(s.eid=r);const i=n._getFrameworks();return i.length&&(s.fw=i.join(",")),`${t}?${bt(s).slice(1)}`}async function al(n){const e=await el(n),t=le().gapi;return k(t,n,"internal-error"),e.open({where:document.body,url:ol(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:rl,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=ae(n,"network-request-failed"),a=le().setTimeout(()=>{i(o)},tl.get());function l(){le().clearTimeout(a),r(s)}s.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},cl=500,ul=600,dl="_blank",hl="http://localhost";class Rs{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function fl(n,e,t,s=cl,r=ul){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const l=Object.assign(Object.assign({},ll),{width:s.toString(),height:r.toString(),top:i,left:o}),c=K().toLowerCase();t&&(a=gr(c)?dl:t),mr(c)&&(e=e||hl,l.scrollbars="yes");const d=Object.entries(l).reduce((v,[_,E])=>`${v}${_}=${E},`,"");if(Jo(c)&&a!=="_self")return pl(e||"",a),new Rs(null);const p=window.open(e||"",a,d);k(p,n,"popup-blocked");try{p.focus()}catch{}return new Rs(p)}function pl(n,e){const t=document.createElement("a");t.href=n,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml="__/auth/handler",gl="emulator/auth/handler";function Os(n,e,t,s,r,i){k(n.config.authDomain,n,"auth-domain-config-required"),k(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:s,v:Wt,eventId:r};if(e instanceof kr){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",gi(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[l,c]of Object.entries(i||{}))o[l]=c}if(e instanceof yt){const l=e.getScopes().filter(c=>c!=="");l.length>0&&(o.scopes=l.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const l of Object.keys(a))a[l]===void 0&&delete a[l];return`${_l(n)}?${bt(a).slice(1)}`}function _l({config:n}){return n.emulator?Mn(n,gl):`https://${n.authDomain}/${ml}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn="webStorageSupport";class vl{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Dr,this._completeRedirectFn=za,this._overrideRedirectResult=Fa}async _openPopup(e,t,s,r){var i;ge((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=Os(e,t,s,wn(),r);return fl(e,o,qn())}async _openRedirect(e,t,s,r){return await this._originValidation(e),ba(Os(e,t,s,wn(),r)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:i}=this.eventManagers[t];return r?Promise.resolve(r):(ge(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await al(e),s=new Va(e);return t.register("authEvent",r=>(k(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(fn,{type:fn},r=>{var i;const o=(i=r==null?void 0:r[0])===null||i===void 0?void 0:i[fn];o!==void 0&&t(!!o),me(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ya(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return yr()||Un()||Gt()}}const bl=vl;var Ds="@firebase/auth",Cs="0.20.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Il{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{var r;e(((r=s)===null||r===void 0?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);!t||(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){k(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yl(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function wl(n){pt(new ot("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),{apiKey:i,authDomain:o}=s.options;return((a,l)=>{k(i&&!i.includes(":"),"invalid-api-key",{appName:a.name}),k(!(o!=null&&o.includes(":")),"argument-error",{appName:a.name});const c={apiKey:i,authDomain:o,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:wr(n)},d=new Zo(a,l,c);return Po(d,t),d})(s,r)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),pt(new ot("auth-internal",e=>{const t=Kt(e.getProvider("auth").getImmediate());return(s=>new Il(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Qe(Ds,Cs,yl(n)),Qe(Ds,Cs,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El=5*60,Tl=Qs("authIdTokenMaxAge")||El;let Ps=null;const kl=n=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>Tl)return;const r=t==null?void 0:t.token;Ps!==r&&(Ps=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function Sl(n=_o()){const e=nr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Co(n,{popupRedirectResolver:bl,persistence:[Ra,ga,Dr]}),s=Qs("authTokenSyncURL");if(s){const i=kl(s);ua(t,i,()=>i(t.currentUser)),ca(t,o=>i(o))}const r=ui("auth");return r&&ea(t,`http://${r}`),t}wl("Browser");function Al(n,e,t){let s,r,i;return ee(n,mn,a=>t(2,s=a)),ee(n,gn,a=>t(0,r=a)),ee(n,as,a=>t(1,i=a)),Xe(as,i=sr({apiKey:"AIzaSyDeazuYKUizHGDa4iCZCWBYDzAv1NCJb50",authDomain:"rg-fbauth-testing.firebaseapp.com",projectId:"rg-fbauth-testing",storageBucket:"rg-fbauth-testing.appspot.com",messagingSenderId:"846994235165",appId:"1:846994235165:web:9971a7170be7eec7f34bf4"}),i),n.$$.update=()=>{n.$$.dirty&2&&i&&Xe(gn,r=Sl(i),r),n.$$.dirty&1&&r&&da(r,a=>{Xe(mn,s=a,s)})},[r,i]}class Rl extends Ce{constructor(e){super(),Pe(this,e,Al,null,Ne,{})}}const Ol=(n,e,t)=>Math.min(Math.max(t,n),e),$n=n=>typeof n=="number",Dl=n=>Array.isArray(n)&&!$n(n[0]),Cl=(n,e,t)=>{const s=e-n;return((t-n)%s+s)%s+n};function Pl(n,e){return Dl(n)?n[Cl(0,n.length,e)]:n}const qr=(n,e,t)=>-t*n+t*e+n,Br=n=>n,Fn=(n,e,t)=>e-n===0?1:(t-n)/(e-n);function $r(n,e){const t=n[n.length-1];for(let s=1;s<=e;s++){const r=Fn(0,e,s);n.push(qr(t,1,r))}}function Fr(n){const e=[0];return $r(e,n-1),e}function Nl(n,e=Fr(n.length),t=Br){const s=n.length,r=s-e.length;return r>0&&$r(e,r),i=>{let o=0;for(;o<s-2&&!(i<e[o+1]);o++);let a=Ol(0,1,Fn(e[o],e[o+1],i));return a=Pl(t,o)(a),qr(n[o],n[o+1],a)}}const Hr=n=>typeof n=="function",xr=n=>typeof n=="string";function Ml(n,e){return e?n*(1e3/e):0}function Ll(n,e){var t;return typeof n=="string"?e?((t=e[n])!==null&&t!==void 0||(e[n]=document.querySelectorAll(n)),n=e[n]):n=document.querySelectorAll(n):n instanceof Element&&(n=[n]),Array.from(n||[])}const Lt=new WeakMap;let Ee;function Ul(n,e){if(e){const{inlineSize:t,blockSize:s}=e[0];return{width:t,height:s}}else return n instanceof SVGElement&&"getBBox"in n?n.getBBox():{width:n.offsetWidth,height:n.offsetHeight}}function ql({target:n,contentRect:e,borderBoxSize:t}){var s;(s=Lt.get(n))===null||s===void 0||s.forEach(r=>{r({target:n,contentSize:e,get size(){return Ul(n,t)}})})}function Bl(n){n.forEach(ql)}function $l(){typeof ResizeObserver>"u"||(Ee=new ResizeObserver(Bl))}function Fl(n,e){Ee||$l();const t=Ll(n);return t.forEach(s=>{let r=Lt.get(s);r||(r=new Set,Lt.set(s,r)),r.add(e),Ee==null||Ee.observe(s)}),()=>{t.forEach(s=>{const r=Lt.get(s);r==null||r.delete(e),r!=null&&r.size||Ee==null||Ee.unobserve(s)})}}const Ut=new Set;let ft;function Hl(){ft=()=>{const n={width:window.innerWidth,height:window.innerHeight},e={target:window,size:n,contentSize:n};Ut.forEach(t=>t(e))},window.addEventListener("resize",ft)}function xl(n){return Ut.add(n),ft||Hl(),()=>{Ut.delete(n),!Ut.size&&ft&&(ft=void 0)}}function zl(n,e){return Hr(n)?xl(n):Fl(n,e)}const Wl=50,Ns=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Vl=()=>({time:0,x:Ns(),y:Ns()}),jl={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function Ms(n,e,t,s){const r=t[e],{length:i,position:o}=jl[e],a=r.current,l=t.time;r.current=n["scroll"+o],r.scrollLength=n["scroll"+i]-n["client"+i],r.offset.length=0,r.offset[0]=0,r.offset[1]=r.scrollLength,r.progress=Fn(0,r.scrollLength,r.current);const c=s-l;r.velocity=c>Wl?0:Ml(r.current-a,c)}function Gl(n,e,t){Ms(n,"x",e,t),Ms(n,"y",e,t),e.time=t}function Kl(n,e){let t={x:0,y:0},s=n;for(;s&&s!==e;)if(s instanceof HTMLElement)t.x+=s.offsetLeft,t.y+=s.offsetTop,s=s.offsetParent;else if(s instanceof SVGGraphicsElement&&"getBBox"in s){const{top:r,left:i}=s.getBBox();for(t.x+=i,t.y+=r;s&&s.tagName!=="svg";)s=s.parentNode}return t}const Jl={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},Tn={start:0,center:.5,end:1};function Ls(n,e,t=0){let s=0;if(Tn[n]!==void 0&&(n=Tn[n]),xr(n)){const r=parseFloat(n);n.endsWith("px")?s=r:n.endsWith("%")?n=r/100:n.endsWith("vw")?s=r/100*document.documentElement.clientWidth:n.endsWith("vh")?s=r/100*document.documentElement.clientHeight:n=r}return $n(n)&&(s=e*n),t+s}const Yl=[0,0];function Xl(n,e,t,s){let r=Array.isArray(n)?n:Yl,i=0,o=0;return $n(n)?r=[n,n]:xr(n)&&(n=n.trim(),n.includes(" ")?r=n.split(" "):r=[n,Tn[n]?n:"0"]),i=Ls(r[0],t,s),o=Ls(r[1],e),i-o}const Ql={x:0,y:0};function Zl(n,e,t){let{offset:s=Jl.All}=t;const{target:r=n,axis:i="y"}=t,o=i==="y"?"height":"width",a=r!==n?Kl(r,n):Ql,l=r===n?{width:n.scrollWidth,height:n.scrollHeight}:{width:r.clientWidth,height:r.clientHeight},c={width:n.clientWidth,height:n.clientHeight};e[i].offset.length=0;let d=!e[i].interpolate;const p=s.length;for(let v=0;v<p;v++){const _=Xl(s[v],c[o],l[o],a[i]);!d&&_!==e[i].interpolatorOffsets[v]&&(d=!0),e[i].offset[v]=_}d&&(e[i].interpolate=Nl(Fr(p),e[i].offset),e[i].interpolatorOffsets=[...e[i].offset]),e[i].progress=e[i].interpolate(e[i].current)}function ec(n,e=n,t){if(t.x.targetOffset=0,t.y.targetOffset=0,e!==n){let s=e;for(;s&&s!=n;)t.x.targetOffset+=s.offsetLeft,t.y.targetOffset+=s.offsetTop,s=s.offsetParent}t.x.targetLength=e===n?e.scrollWidth:e.clientWidth,t.y.targetLength=e===n?e.scrollHeight:e.clientHeight,t.x.containerLength=n.clientWidth,t.y.containerLength=n.clientHeight}function tc(n,e,t,s={}){const r=s.axis||"y";return{measure:()=>ec(n,s.target,t),update:i=>{Gl(n,t,i),(s.offset||s.target)&&Zl(n,t,s)},notify:Hr(e)?()=>e(t):nc(e,t[r])}}function nc(n,e){return n.pause(),n.forEachNative((t,{easing:s})=>{var r,i;if(t.updateDuration)s||(t.easing=Br),t.updateDuration(1);else{const o={duration:1e3};s||(o.easing="linear"),(i=(r=t.effect)===null||r===void 0?void 0:r.updateTiming)===null||i===void 0||i.call(r,o)}}),()=>{n.currentTime=e.progress}}const dt=new WeakMap,Us=new WeakMap,pn=new WeakMap,qs=n=>n===document.documentElement?window:n;function zr(n,e={}){var{container:t=document.documentElement}=e,s=Vt(e,["container"]);let r=pn.get(t);r||(r=new Set,pn.set(t,r));const i=Vl(),o=tc(t,n,i,s);if(r.add(o),!dt.has(t)){const c=()=>{const p=performance.now();for(const v of r)v.measure();for(const v of r)v.update(p);for(const v of r)v.notify()};dt.set(t,c);const d=qs(t);window.addEventListener("resize",c,{passive:!0}),t!==document.documentElement&&Us.set(t,zl(t,c)),d.addEventListener("scroll",c,{passive:!0})}const a=dt.get(t),l=requestAnimationFrame(a);return()=>{var c;typeof n!="function"&&n.stop(),cancelAnimationFrame(l);const d=pn.get(t);if(!d||(d.delete(o),d.size))return;const p=dt.get(t);dt.delete(t),p&&(qs(t).removeEventListener("scroll",p),(c=Us.get(t))===null||c===void 0||c(),window.removeEventListener("resize",p))}}function Bs(n){let e,t,s,r,i,o;return{c(){e=I("div"),t=I("button"),s=I("img"),this.h()},l(a){e=y(a,"DIV",{class:!0});var l=w(e);t=y(l,"BUTTON",{class:!0,type:!0});var c=w(t);s=y(c,"IMG",{src:!0,alt:!0,width:!0,height:!0}),c.forEach(f),l.forEach(f),this.h()},h(){te(s.src,r="/icons/nav-search.svg")||u(s,"src",r),u(s,"alt","\u0E04\u0E49\u0E19\u0E2B\u0E32"),u(s,"width","32"),u(s,"height","32"),u(t,"class","f jcc nav-btn svelte-1lkissy"),u(t,"type","button"),u(e,"class","nav-left svelte-1lkissy")},m(a,l){A(a,e,l),m(e,t),m(t,s),i||(o=Z(t,"click",n[11]),i=!0)},p:$e,d(a){a&&f(e),i=!1,o()}}}function $s(n){let e,t;return{c(){e=I("img"),this.h()},l(s){e=y(s,"IMG",{class:!0,src:!0,alt:!0,width:!0,height:!0}),this.h()},h(){var s;u(e,"class","nav-profile svelte-1lkissy"),te(e.src,t=(s=n[6].photoURL)!=null?s:"/anon.svg")||u(e,"src",t),u(e,"alt",""),u(e,"width","32"),u(e,"height","32")},m(s,r){A(s,e,r)},p(s,r){var i;r&64&&!te(e.src,t=(i=s[6].photoURL)!=null?i:"/anon.svg")&&u(e,"src",t)},d(s){s&&f(e)}}}function sc(n){let e,t,s,r;return{c(){e=I("button"),t=x("Log in"),this.h()},l(i){e=y(i,"BUTTON",{type:!0,class:!0});var o=w(e);t=z(o,"Log in"),o.forEach(f),this.h()},h(){u(e,"type","button"),u(e,"class","svelte-1lkissy")},m(i,o){A(i,e,o),m(e,t),s||(r=Z(e,"click",n[7]),s=!0)},p:$e,d(i){i&&f(e),s=!1,r()}}}function rc(n){let e,t,s,r,i,o,a,l;return{c(){e=I("button"),t=I("img"),r=D(),i=I("span"),o=x("Log out"),this.h()},l(c){e=y(c,"BUTTON",{class:!0,type:!0});var d=w(e);t=y(d,"IMG",{src:!0,alt:!0,width:!0,height:!0}),r=C(d),i=y(d,"SPAN",{});var p=w(i);o=z(p,"Log out"),p.forEach(f),d.forEach(f),this.h()},h(){var c;te(t.src,s=(c=n[6].photoURL)!=null?c:"/anon.svg")||u(t,"src",s),u(t,"alt",""),u(t,"width","24"),u(t,"height","24"),u(e,"class","logged-in svelte-1lkissy"),u(e,"type","button")},m(c,d){A(c,e,d),m(e,t),m(e,r),m(e,i),m(i,o),a||(l=Z(e,"click",n[8]),a=!0)},p(c,d){var p;d&64&&!te(t.src,s=(p=c[6].photoURL)!=null?p:"/anon.svg")&&u(t,"src",s)},d(c){c&&f(e),a=!1,l()}}}function Fs(n){let e;return{c(){e=I("div"),this.h()},l(t){e=y(t,"DIV",{class:!0}),w(e).forEach(f),this.h()},h(){u(e,"class","nav-compensate svelte-1lkissy")},m(t,s){A(t,e,s)},d(t){t&&f(e)}}}function ic(n){let e,t,s,r,i,o,a,l,c,d,p,v,_,E,N,h,S,O,U,P,b,T,R,H,$,_e,ve,F,oe,g,M,at,xe,be,ze,We,ce,Y,X,lt,Xt,ct,Qt,Zt,Ve,ue,Ie,Hn,en,ut,tn,nn,Ue,Et,je,sn,xn,j=n[0]==="search"&&Bs(n),G=n[6]&&$s(n);function zn(L,B){return L[6]?rc:sc}let Tt=zn(n),Q=Tt(n),J=n[1]!=="not_top"&&Fs();return{c(){e=I("nav"),t=I("a"),s=x("Skip to main content"),r=D(),j&&j.c(),i=D(),o=I("div"),a=I("a"),l=I("img"),d=D(),p=I("div"),v=I("label"),_=Ke("svg"),E=Ke("path"),N=D(),h=I("input"),S=D(),O=I("button"),U=Ke("svg"),P=Ke("path"),b=D(),T=I("div"),G&&G.c(),R=D(),H=I("button"),$=I("img"),ve=D(),F=I("menu"),oe=I("li"),g=I("a"),M=I("img"),xe=D(),be=I("span"),ze=x("School Governance \u0E04\u0E37\u0E2D\u0E2D\u0E30\u0E44\u0E23?"),We=D(),ce=I("li"),Y=I("a"),X=I("img"),Xt=D(),ct=I("span"),Qt=x("\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19"),Zt=D(),Ve=I("li"),ue=I("a"),Ie=I("img"),en=D(),ut=I("span"),tn=x("\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48"),nn=D(),Ue=I("li"),Q.c(),Et=D(),J&&J.c(),je=rs(),this.h()},l(L){e=y(L,"NAV",{class:!0});var B=w(e);t=y(B,"A",{href:!0,class:!0});var Wn=w(t);s=z(Wn,"Skip to main content"),Wn.forEach(f),r=C(B),j&&j.l(B),i=C(B),o=y(B,"DIV",{class:!0});var Vn=w(o);a=y(Vn,"A",{href:!0});var jn=w(a);l=y(jn,"IMG",{src:!0,alt:!0,width:!0,height:!0,class:!0}),jn.forEach(f),Vn.forEach(f),d=C(B),p=y(B,"DIV",{class:!0});var kt=w(p);v=y(kt,"LABEL",{class:!0});var St=w(v);_=Je(St,"svg",{xmlns:!0,fill:!0,viewBox:!0,width:!0,height:!0});var Gn=w(_);E=Je(Gn,"path",{stroke:!0,"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),w(E).forEach(f),Gn.forEach(f),N=C(St),h=y(St,"INPUT",{type:!0,placeholder:!0,class:!0}),St.forEach(f),S=C(kt),O=y(kt,"BUTTON",{class:!0,type:!0});var Kn=w(O);U=Je(Kn,"svg",{xmlns:!0,fill:!0,viewBox:!0,width:!0,height:!0,"aria-label":!0});var Jn=w(U);P=Je(Jn,"path",{stroke:!0,"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),w(P).forEach(f),Jn.forEach(f),Kn.forEach(f),kt.forEach(f),b=C(B),T=y(B,"DIV",{class:!0});var Ge=w(T);G&&G.l(Ge),R=C(Ge),H=y(Ge,"BUTTON",{class:!0,type:!0});var Yn=w(H);$=y(Yn,"IMG",{src:!0,alt:!0,width:!0,height:!0}),Yn.forEach(f),ve=C(Ge),F=y(Ge,"MENU",{class:!0});var ye=w(F);oe=y(ye,"LI",{class:!0});var Xn=w(oe);g=y(Xn,"A",{href:!0,class:!0});var At=w(g);M=y(At,"IMG",{src:!0,alt:!0,width:!0,height:!0}),xe=C(At),be=y(At,"SPAN",{});var Qn=w(be);ze=z(Qn,"School Governance \u0E04\u0E37\u0E2D\u0E2D\u0E30\u0E44\u0E23?"),Qn.forEach(f),At.forEach(f),Xn.forEach(f),We=C(ye),ce=y(ye,"LI",{class:!0});var Zn=w(ce);Y=y(Zn,"A",{href:!0,class:!0});var Rt=w(Y);X=y(Rt,"IMG",{src:!0,alt:!0,width:!0,height:!0}),Xt=C(Rt),ct=y(Rt,"SPAN",{});var es=w(ct);Qt=z(es,"\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19"),es.forEach(f),Rt.forEach(f),Zn.forEach(f),Zt=C(ye),Ve=y(ye,"LI",{class:!0});var ts=w(Ve);ue=y(ts,"A",{href:!0,class:!0});var Ot=w(ue);Ie=y(Ot,"IMG",{src:!0,alt:!0,width:!0,height:!0}),en=C(Ot),ut=y(Ot,"SPAN",{});var ns=w(ut);tn=z(ns,"\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48"),ns.forEach(f),Ot.forEach(f),ts.forEach(f),nn=C(ye),Ue=y(ye,"LI",{class:!0});var ss=w(Ue);Q.l(ss),ss.forEach(f),ye.forEach(f),Ge.forEach(f),B.forEach(f),Et=C(L),J&&J.l(L),je=rs(),this.h()},h(){u(t,"href","#main"),u(t,"class","skip-link svelte-1lkissy"),te(l.src,c="/logo.svg")||u(l,"src",c),u(l,"alt",""),u(l,"width","108"),u(l,"height","40"),u(l,"class","svelte-1lkissy"),u(a,"href","/"),u(o,"class","nav-logo svelte-1lkissy"),u(E,"stroke","#9DAAD5"),u(E,"stroke-linecap","round"),u(E,"stroke-linejoin","round"),u(E,"stroke-width","2"),u(E,"d","M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"),u(_,"xmlns","http://www.w3.org/2000/svg"),u(_,"fill","none"),u(_,"viewBox","0 0 24 24"),u(_,"width","24"),u(_,"height","24"),u(h,"type","text"),u(h,"placeholder","\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E08\u0E31\u0E07\u0E2B\u0E27\u0E31\u0E14\u0E17\u0E35\u0E48\u0E04\u0E38\u0E13\u0E2D\u0E22\u0E32\u0E01\u0E04\u0E49\u0E19\u0E2B\u0E32"),u(h,"class","svelte-1lkissy"),u(v,"class","f svelte-1lkissy"),u(P,"stroke","#3C55AB"),u(P,"stroke-linecap","round"),u(P,"stroke-linejoin","round"),u(P,"stroke-width","2"),u(P,"d","M14.667 5.333l-9.334 9.334M5.333 5.333l9.334 9.334"),u(U,"xmlns","http://www.w3.org/2000/svg"),u(U,"fill","none"),u(U,"viewBox","0 0 20 20"),u(U,"width","20"),u(U,"height","20"),u(U,"aria-label","\u0E1B\u0E34\u0E14"),u(O,"class","f"),u(O,"type","button"),u(p,"class","nav-right nav-search svelte-1lkissy"),te($.src,_e="/icons/nav-ham.svg")||u($,"src",_e),u($,"alt","\u0E40\u0E1B\u0E34\u0E14\u0E40\u0E21\u0E19\u0E39"),u($,"width","32"),u($,"height","32"),u(H,"class","f jcc nav-btn svelte-1lkissy"),u(H,"type","button"),te(M.src,at="/icons/question.svg")||u(M,"src",at),u(M,"alt",""),u(M,"width","20"),u(M,"height","20"),u(g,"href","/#information"),u(g,"class","svelte-1lkissy"),u(oe,"class","svelte-1lkissy"),te(X.src,lt="/icons/search.svg")||u(X,"src",lt),u(X,"alt",""),u(X,"width","20"),u(X,"height","20"),u(Y,"href","/search"),u(Y,"class","svelte-1lkissy"),u(ce,"class","svelte-1lkissy"),te(Ie.src,Hn="/icons/chat.svg")||u(Ie,"src",Hn),u(Ie,"alt",""),u(Ie,"width","20"),u(Ie,"height","20"),u(ue,"href","https://www.google.co.th/"),u(ue,"class","svelte-1lkissy"),u(Ve,"class","svelte-1lkissy"),u(Ue,"class","nav-menu-last svelte-1lkissy"),u(F,"class","nav-menu svelte-1lkissy"),Te(F,"show",n[3]),u(T,"class","f nav-right svelte-1lkissy"),u(e,"class","f main-nav svelte-1lkissy"),Te(e,"show",n[2]),Te(e,"show_search",n[4])},m(L,B){A(L,e,B),m(e,t),m(t,s),m(e,r),j&&j.m(e,null),m(e,i),m(e,o),m(o,a),m(a,l),m(e,d),m(e,p),m(p,v),m(v,_),m(_,E),m(v,N),m(v,h),is(h,n[5]),m(p,S),m(p,O),m(O,U),m(U,P),m(e,b),m(e,T),G&&G.m(T,null),m(T,R),m(T,H),m(H,$),m(T,ve),m(T,F),m(F,oe),m(oe,g),m(g,M),m(g,xe),m(g,be),m(be,ze),m(F,We),m(F,ce),m(ce,Y),m(Y,X),m(Y,Xt),m(Y,ct),m(ct,Qt),m(F,Zt),m(F,Ve),m(Ve,ue),m(ue,Ie),m(ue,en),m(ue,ut),m(ut,tn),m(F,nn),m(F,Ue),Q.m(Ue,null),A(L,Et,B),J&&J.m(L,B),A(L,je,B),sn||(xn=[Z(a,"click",n[12]),Z(h,"input",n[13]),Z(O,"click",n[14]),Z(H,"click",n[15]),Z(g,"click",n[16]),Z(Y,"click",n[17])],sn=!0)},p(L,[B]){L[0]==="search"?j?j.p(L,B):(j=Bs(L),j.c(),j.m(e,i)):j&&(j.d(1),j=null),B&32&&h.value!==L[5]&&is(h,L[5]),L[6]?G?G.p(L,B):(G=$s(L),G.c(),G.m(T,R)):G&&(G.d(1),G=null),Tt===(Tt=zn(L))&&Q?Q.p(L,B):(Q.d(1),Q=Tt(L),Q&&(Q.c(),Q.m(Ue,null))),B&8&&Te(F,"show",L[3]),B&4&&Te(e,"show",L[2]),B&16&&Te(e,"show_search",L[4]),L[1]!=="not_top"?J||(J=Fs(),J.c(),J.m(je.parentNode,je)):J&&(J.d(1),J=null)},i:$e,o:$e,d(L){L&&f(e),j&&j.d(),G&&G.d(),Q.d(),L&&f(Et),J&&J.d(L),L&&f(je),sn=!1,Wr(xn)}}}function oc(n,e,t){var T;let s,r,i,o,a;ee(n,Jr,R=>t(10,s=R)),ee(n,gn,R=>t(18,r=R)),ee(n,rn,R=>t(4,i=R)),ee(n,on,R=>t(5,o=R)),ee(n,mn,R=>t(6,a=R));let l=(T=s.route.id)==null?void 0:T.split("/")[1],c=l===""?"not_top":l==="search"?"always":"scroll_up",d=c!=="not_top",p=!1;new de;const v=()=>{r&&ia(r)},_=()=>{r&&ha(r)};let E=!1;zt(()=>{t(9,E=!0),zr(({y:R})=>{if(c==="not_top")return R.progress!==0&&d===!1?t(2,d=!0):R.progress===0&&d===!0?t(2,d=t(3,p=!1)):void 0;if(c==="scroll_up")return R.velocity<0&&d===!1?t(2,d=!0):R.velocity>0&&d===!0?t(2,d=t(3,p=!1)):void 0})});const N=()=>Xe(rn,i=!0,i),h=()=>t(3,p=!1);function S(){o=this.value,on.set(o)}const O=()=>{Xe(rn,i=!1,i),Xe(on,o="",o)},U=()=>t(3,p=!p),P=()=>t(3,p=!1),b=()=>t(3,p=!1);return n.$$.update=()=>{var R;n.$$.dirty&1027&&(t(0,l=(R=s.route.id)==null?void 0:R.split("/")[1]),t(1,c=l===""?"not_top":l==="search"?"always":"scroll_up"),t(2,d=c!=="not_top")),n.$$.dirty&516&&E&&document.documentElement.classList.toggle("navbar-shown",d)},[l,c,d,p,i,o,a,v,_,E,s,N,h,S,O,U,P,b]}class ac extends Ce{constructor(e){super(),Pe(this,e,oc,ic,Ne,{})}}function lc(n){let e,t,s,r,i;return{c(){e=I("button"),t=Ke("svg"),s=Ke("path"),this.h()},l(o){e=y(o,"BUTTON",{class:!0,type:!0,"aria-label":!0});var a=w(e);t=Je(a,"svg",{width:!0,height:!0,xmlns:!0,fill:!0,viewBox:!0});var l=w(t);s=Je(l,"path",{stroke:!0,"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),w(s).forEach(f),l.forEach(f),a.forEach(f),this.h()},h(){u(s,"stroke","#fff"),u(s,"stroke-linecap","round"),u(s,"stroke-linejoin","round"),u(s,"stroke-width","2"),u(s,"d","M13 7L7 1 1 7"),u(t,"width","14"),u(t,"height","8"),u(t,"xmlns","http://www.w3.org/2000/svg"),u(t,"fill","none"),u(t,"viewBox","0 0 14 8"),u(e,"class","gotop svelte-8799bu"),u(e,"type","button"),u(e,"aria-label","\u0E01\u0E25\u0E31\u0E1A\u0E14\u0E49\u0E32\u0E19\u0E1A\u0E19"),Te(e,"show",n[1])},m(o,a){A(o,e,a),m(e,t),m(t,s),r||(i=Z(e,"click",function(){Vr(n[0])&&n[0].apply(this,arguments)}),r=!0)},p(o,[a]){n=o,a&2&&Te(e,"show",n[1])},i:$e,o:$e,d(o){o&&f(e),r=!1,i()}}}function cc(n,e,t){let s=()=>{},r=!1;return zt(()=>{zr(({y:i})=>{if(i.current>i.containerLength&&!r)return t(1,r=!0);if(i.current<i.containerLength&&r)return t(1,r=!1)}),t(0,s=()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})})}),[s,r]}class uc extends Ce{constructor(e){super(),Pe(this,e,cc,lc,Ne,{})}}const dc=n=>n&4,hc=n=>({}),Hs=n=>({...n[2]});function fc(n){let e;const t=n[8].default,s=nt(t,n,n[9],Hs);return{c(){s&&s.c()},l(r){s&&s.l(r)},m(r,i){s&&s.m(r,i),e=!0},p(r,i){s&&s.p&&(!e||i&516)&&st(s,t,r,r[9],dc(i)||!e?rt(r[9]):it(t,r[9],i,hc),Hs)},i(r){e||(W(s,r),e=!0)},o(r){V(s,r),e=!1},d(r){s&&s.d(r)}}}function pc(n){let e,t;const s=[{...n[6],...n[3]},{as:n[0]},{slotProps:n[2]},{use:[...n[1],n[4]]},{name:"DialogTitle"}];let r={$$slots:{default:[fc]},$$scope:{ctx:n}};for(let i=0;i<s.length;i+=1)r=pe(r,s[i]);return e=new Rn({props:r}),{c(){ne(e.$$.fragment)},l(i){se(e.$$.fragment,i)},m(i,o){re(e,i,o),t=!0},p(i,[o]){const a=o&95?kn(s,[o&72&&{...i[6],...i[3]},o&1&&{as:i[0]},o&4&&{slotProps:i[2]},o&18&&{use:[...i[1],i[4]]},s[4]]):{};o&516&&(a.$$scope={dirty:o,ctx:i}),e.$set(a)},i(i){t||(W(e.$$.fragment,i),t=!0)},o(i){V(e.$$.fragment,i),t=!1},d(i){ie(e,i)}}}function mc(n,e,t){let s,r;const i=["as","use"];let o=tt(e,i),a,{$$slots:l={},$$scope:c}=e,{as:d="h2"}=e,{use:p=[]}=e;const v=On(Sn());let _=js("DialogTitle");ee(n,_,N=>t(7,a=N));let E=`headlessui-dialog-title-${Dn()}`;return zt(()=>(a.setTitleId(E),()=>a.setTitleId(void 0))),n.$$set=N=>{e=pe(pe({},e),An(N)),t(6,o=tt(e,i)),"as"in N&&t(0,d=N.as),"use"in N&&t(1,p=N.use),"$$scope"in N&&t(9,c=N.$$scope)},n.$$.update=()=>{n.$$.dirty&128&&t(2,r={open:a.dialogState===Gs.Open})},t(3,s={id:E}),[d,p,r,s,v,_,o,a,l,c]}class gc extends Ce{constructor(e){super(),Pe(this,e,mc,pc,Ne,{as:0,use:1})}}const _c=n=>n&4,vc=n=>({}),xs=n=>({...n[2]});function bc(n){let e;const t=n[9].default,s=nt(t,n,n[10],xs);return{c(){s&&s.c()},l(r){s&&s.l(r)},m(r,i){s&&s.m(r,i),e=!0},p(r,i){s&&s.p&&(!e||i&1028)&&st(s,t,r,r[10],_c(i)||!e?rt(r[10]):it(t,r[10],i,vc),xs)},i(r){e||(W(s,r),e=!0)},o(r){V(s,r),e=!1},d(r){s&&s.d(r)}}}function Ic(n){let e,t;const s=[{...n[7],...n[3]},{as:n[0]},{slotProps:n[2]},{use:[...n[1],n[4]]},{name:"DialogOverlay"}];let r={$$slots:{default:[bc]},$$scope:{ctx:n}};for(let i=0;i<s.length;i+=1)r=pe(r,s[i]);return e=new Rn({props:r}),e.$on("click",n[6]),{c(){ne(e.$$.fragment)},l(i){se(e.$$.fragment,i)},m(i,o){re(e,i,o),t=!0},p(i,[o]){const a=o&159?kn(s,[o&136&&{...i[7],...i[3]},o&1&&{as:i[0]},o&4&&{slotProps:i[2]},o&18&&{use:[...i[1],i[4]]},s[4]]):{};o&1028&&(a.$$scope={dirty:o,ctx:i}),e.$set(a)},i(i){t||(W(e.$$.fragment,i),t=!0)},o(i){V(e.$$.fragment,i),t=!1},d(i){ie(e,i)}}}function yc(n,e,t){let s,r;const i=["as","use"];let o=tt(e,i),a,{$$slots:l={},$$scope:c}=e,{as:d="div"}=e,{use:p=[]}=e;const v=On(Sn());let _=js("DialogOverlay");ee(n,_,h=>t(8,a=h));let E=`headlessui-dialog-overlay-${Dn()}`;function N(h){let S=h;S.target===S.currentTarget&&(S.preventDefault(),S.stopPropagation(),a.close())}return n.$$set=h=>{e=pe(pe({},e),An(h)),t(7,o=tt(e,i)),"as"in h&&t(0,d=h.as),"use"in h&&t(1,p=h.use),"$$scope"in h&&t(10,c=h.$$scope)},n.$$.update=()=>{n.$$.dirty&256&&t(2,r={open:a.dialogState===Gs.Open})},t(3,s={id:E,"aria-hidden":!0}),[d,p,r,s,v,_,N,o,a,l,c]}class wc extends Ce{constructor(e){super(),Pe(this,e,yc,Ic,Ne,{as:0,use:1})}}const Ec=n=>n&8,Tc=n=>({}),zs=n=>({...n[3]});function kc(n){let e;const t=n[8].default,s=nt(t,n,n[9],zs);return{c(){s&&s.c()},l(r){s&&s.l(r)},m(r,i){s&&s.m(r,i),e=!0},p(r,i){s&&s.p&&(!e||i&520)&&st(s,t,r,r[9],Ec(i)||!e?rt(r[9]):it(t,r[9],i,Tc),zs)},i(r){e||(W(s,r),e=!0)},o(r){V(s,r),e=!1},d(r){s&&s.d(r)}}}function Sc(n){var i;let e,t;const s=[{name:"Description"},n[7],{as:n[0]},{slotProps:n[3]},(i=n[2])==null?void 0:i.props,{id:n[5]},{use:[...n[1],n[4]]}];let r={$$slots:{default:[kc]},$$scope:{ctx:n}};for(let o=0;o<s.length;o+=1)r=pe(r,s[o]);return e=new Rn({props:r}),{c(){ne(e.$$.fragment)},l(o){se(e.$$.fragment,o)},m(o,a){re(e,o,a),t=!0},p(o,[a]){var c;const l=a&191?kn(s,[s[0],a&128&&os(o[7]),a&1&&{as:o[0]},a&8&&{slotProps:o[3]},a&4&&os((c=o[2])==null?void 0:c.props),a&32&&{id:o[5]},a&18&&{use:[...o[1],o[4]]}]):{};a&520&&(l.$$scope={dirty:a,ctx:o}),e.$set(l)},i(o){t||(W(e.$$.fragment,o),t=!0)},o(o){V(e.$$.fragment,o),t=!1},d(o){ie(e,o)}}}function Ac(n,e,t){let s;const r=["as","use"];let i=tt(e,r),o,{$$slots:a={},$$scope:l}=e;const c=On(Sn());let{as:d="p"}=e,{use:p=[]}=e;const v=`headlessui-description-${Dn()}`;let _=Yr();if(ee(n,_,E=>t(2,o=E)),!_)throw new Error("You used a <Description /> component, but it is not inside a relevant parent.");return zt(()=>o==null?void 0:o.register(v)),n.$$set=E=>{e=pe(pe({},e),An(E)),t(7,i=tt(e,r)),"as"in E&&t(0,d=E.as),"use"in E&&t(1,p=E.use),"$$scope"in E&&t(9,l=E.$$scope)},n.$$.update=()=>{n.$$.dirty&4&&t(3,s=o.slotProps||{})},[d,p,o,s,c,v,_,i,a,l]}class Rc extends Ce{constructor(e){super(),Pe(this,e,Ac,Sc,Ne,{as:0,use:1})}}const Oc=n=>({}),Ws=n=>({});function Dc(n){let e;return{c(){e=x(n[2])},l(t){e=z(t,n[2])},m(t,s){A(t,e,s)},p(t,s){s&4&&Vs(e,t[2])},d(t){t&&f(e)}}}function Cc(n){let e;return{c(){e=x(n[1])},l(t){e=z(t,n[1])},m(t,s){A(t,e,s)},p(t,s){s&2&&Vs(e,t[1])},d(t){t&&f(e)}}}function Pc(n){let e,t;return e=new gc({props:{class:"modal-title",$$slots:{default:[Cc]},$$scope:{ctx:n}}}),{c(){ne(e.$$.fragment)},l(s){se(e.$$.fragment,s)},m(s,r){re(e,s,r),t=!0},p(s,r){const i={};r&66&&(i.$$scope={dirty:r,ctx:s}),e.$set(i)},i(s){t||(W(e.$$.fragment,s),t=!0)},o(s){V(e.$$.fragment,s),t=!1},d(s){ie(e,s)}}}function Nc(n){let e,t,s,r,i,o,a,l,c,d,p,v,_,E,N;e=new wc({props:{class:"modal-backdrop"}}),s=new Rc({props:{$$slots:{default:[Dc]},$$scope:{ctx:n}}});const h=n[3].title,S=nt(h,n,n[6],Ws),O=S||Pc(n),U=n[3].default,P=nt(U,n,n[6],null);return{c(){ne(e.$$.fragment),t=D(),ne(s.$$.fragment),r=D(),i=I("div"),o=I("header"),a=I("button"),l=I("img"),d=D(),O&&O.c(),p=D(),v=I("div"),P&&P.c(),this.h()},l(b){se(e.$$.fragment,b),t=C(b),se(s.$$.fragment,b),r=C(b),i=y(b,"DIV",{class:!0});var T=w(i);o=y(T,"HEADER",{class:!0});var R=w(o);a=y(R,"BUTTON",{type:!0,class:!0});var H=w(a);l=y(H,"IMG",{src:!0,alt:!0,width:!0,height:!0}),H.forEach(f),d=C(R),O&&O.l(R),R.forEach(f),p=C(T),v=y(T,"DIV",{class:!0});var $=w(v);P&&P.l($),$.forEach(f),T.forEach(f),this.h()},h(){te(l.src,c="/close.svg")||u(l,"src",c),u(l,"alt","\u0E1B\u0E34\u0E14"),u(l,"width","32"),u(l,"height","32"),u(a,"type","button"),u(a,"class","f"),u(o,"class","f modal-header svelte-nh9xbq"),u(v,"class","modal-content svelte-nh9xbq"),u(i,"class","modal-box svelte-nh9xbq")},m(b,T){re(e,b,T),A(b,t,T),re(s,b,T),A(b,r,T),A(b,i,T),m(i,o),m(o,a),m(a,l),m(o,d),O&&O.m(o,null),m(i,p),m(i,v),P&&P.m(v,null),_=!0,E||(N=Z(a,"click",n[4]),E=!0)},p(b,T){const R={};T&68&&(R.$$scope={dirty:T,ctx:b}),s.$set(R),S?S.p&&(!_||T&64)&&st(S,h,b,b[6],_?it(h,b[6],T,Oc):rt(b[6]),Ws):O&&O.p&&(!_||T&2)&&O.p(b,_?T:-1),P&&P.p&&(!_||T&64)&&st(P,U,b,b[6],_?it(U,b[6],T,null):rt(b[6]),null)},i(b){_||(W(e.$$.fragment,b),W(s.$$.fragment,b),W(O,b),W(P,b),_=!0)},o(b){V(e.$$.fragment,b),V(s.$$.fragment,b),V(O,b),V(P,b),_=!1},d(b){ie(e,b),b&&f(t),ie(s,b),b&&f(r),b&&f(i),O&&O.d(b),P&&P.d(b),E=!1,N()}}}function Mc(n){let e,t;return e=new Xr({props:{open:n[0],$$slots:{default:[Nc]},$$scope:{ctx:n}}}),e.$on("close",n[5]),{c(){ne(e.$$.fragment)},l(s){se(e.$$.fragment,s)},m(s,r){re(e,s,r),t=!0},p(s,[r]){const i={};r&1&&(i.open=s[0]),r&71&&(i.$$scope={dirty:r,ctx:s}),e.$set(i)},i(s){t||(W(e.$$.fragment,s),t=!0)},o(s){V(e.$$.fragment,s),t=!1},d(s){ie(e,s)}}}function Lc(n,e,t){let{$$slots:s={},$$scope:r}=e,{title:i}=e,{description:o=""}=e,{isOpen:a=!0}=e;const l=()=>t(0,a=!1),c=()=>t(0,a=!1);return n.$$set=d=>{"title"in d&&t(1,i=d.title),"description"in d&&t(2,o=d.description),"isOpen"in d&&t(0,a=d.isOpen),"$$scope"in d&&t(6,r=d.$$scope)},[a,i,o,s,l,c,r]}class Uc extends Ce{constructor(e){super(),Pe(this,e,Lc,Mc,Ne,{title:1,description:2,isOpen:0})}}function qc(n){let e,t,s,r,i,o,a,l,c,d,p,v,_,E,N,h,S,O,U,P,b,T,R,H,$,_e,ve,F,oe;return{c(){e=I("p"),t=x(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, doloremque, nihil esse nisi earum
		exercitationem modi blanditiis minus harum aliquam quo cupiditate! Dolore consequuntur qui
		consectetur, veniam fugit laudantium consequatur.`),s=D(),r=I("p"),i=x(`Molestiae, doloremque aut. Repellendus voluptates suscipit accusantium magni. Quos quo, eos amet
		laboriosam aperiam vel fuga neque qui, alias omnis ut tenetur esse deserunt consequuntur beatae,
		iste sapiente consectetur. Alias.`),o=D(),a=I("p"),l=x(`Repudiandae quisquam ullam ex doloremque, voluptatum culpa non labore voluptatem, tempora sunt
		aut deleniti modi neque quis tempore odio at! Iusto pariatur cupiditate quibusdam molestiae enim
		deleniti in harum modi!`),c=D(),d=I("p"),p=x(`Fugit, perspiciatis. Laborum facere eos cumque maiores delectus dignissimos atque, nisi pariatur
		quibusdam labore facilis sequi ex incidunt eveniet aliquam at alias? Voluptates ea maxime minus?
		Doloremque atque voluptatum dolor.`),v=D(),_=I("p"),E=x(`Maxime quibusdam ad aliquid deserunt dicta dignissimos sequi necessitatibus voluptatem. Alias
		earum, nisi quas iusto ex deserunt maxime quod aliquam rerum a ut, impedit eligendi non fugit!
		Totam, voluptatum quis.`),N=D(),h=I("p"),S=x(`In molestiae, consectetur vitae fugit inventore itaque consequatur dolor sapiente assumenda at
		sit enim maxime illum eligendi quos. Ut, qui. Corrupti fugit laborum consequatur. Ducimus
		voluptates animi sapiente fugiat atque!`),O=D(),U=I("p"),P=x(`Ipsam eaque provident nesciunt qui minus neque sunt autem fugiat sit earum, quae nam aliquam
		inventore similique culpa sapiente. Laborum ex deserunt cumque repellat qui modi vero sed.
		Accusamus, atque!`),b=D(),T=I("p"),R=x(`Aliquid maxime laborum blanditiis praesentium adipisci architecto labore assumenda alias, unde,
		eum esse. Possimus, provident quisquam? Iure ad repellendus perferendis exercitationem cum
		cupiditate. Perspiciatis quasi culpa qui fugiat. Dolorum, dolores?`),H=D(),$=I("p"),_e=x(`Aperiam itaque qui, quo aspernatur, voluptas nihil cupiditate quaerat debitis repudiandae error
		nostrum explicabo non eum saepe. Mollitia deserunt adipisci ipsa fugit maxime! Animi qui,
		aperiam quaerat distinctio nulla libero?`),ve=D(),F=I("p"),oe=x(`Assumenda iusto officiis sed totam quo? Dolore quod aut debitis soluta totam quibusdam ut
		architecto qui quidem, quisquam eaque repellat eius ratione veniam dolores accusantium, fugit
		rem voluptatem laboriosam explicabo.`)},l(g){e=y(g,"P",{});var M=w(e);t=z(M,`Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, doloremque, nihil esse nisi earum
		exercitationem modi blanditiis minus harum aliquam quo cupiditate! Dolore consequuntur qui
		consectetur, veniam fugit laudantium consequatur.`),M.forEach(f),s=C(g),r=y(g,"P",{});var at=w(r);i=z(at,`Molestiae, doloremque aut. Repellendus voluptates suscipit accusantium magni. Quos quo, eos amet
		laboriosam aperiam vel fuga neque qui, alias omnis ut tenetur esse deserunt consequuntur beatae,
		iste sapiente consectetur. Alias.`),at.forEach(f),o=C(g),a=y(g,"P",{});var xe=w(a);l=z(xe,`Repudiandae quisquam ullam ex doloremque, voluptatum culpa non labore voluptatem, tempora sunt
		aut deleniti modi neque quis tempore odio at! Iusto pariatur cupiditate quibusdam molestiae enim
		deleniti in harum modi!`),xe.forEach(f),c=C(g),d=y(g,"P",{});var be=w(d);p=z(be,`Fugit, perspiciatis. Laborum facere eos cumque maiores delectus dignissimos atque, nisi pariatur
		quibusdam labore facilis sequi ex incidunt eveniet aliquam at alias? Voluptates ea maxime minus?
		Doloremque atque voluptatum dolor.`),be.forEach(f),v=C(g),_=y(g,"P",{});var ze=w(_);E=z(ze,`Maxime quibusdam ad aliquid deserunt dicta dignissimos sequi necessitatibus voluptatem. Alias
		earum, nisi quas iusto ex deserunt maxime quod aliquam rerum a ut, impedit eligendi non fugit!
		Totam, voluptatum quis.`),ze.forEach(f),N=C(g),h=y(g,"P",{});var We=w(h);S=z(We,`In molestiae, consectetur vitae fugit inventore itaque consequatur dolor sapiente assumenda at
		sit enim maxime illum eligendi quos. Ut, qui. Corrupti fugit laborum consequatur. Ducimus
		voluptates animi sapiente fugiat atque!`),We.forEach(f),O=C(g),U=y(g,"P",{});var ce=w(U);P=z(ce,`Ipsam eaque provident nesciunt qui minus neque sunt autem fugiat sit earum, quae nam aliquam
		inventore similique culpa sapiente. Laborum ex deserunt cumque repellat qui modi vero sed.
		Accusamus, atque!`),ce.forEach(f),b=C(g),T=y(g,"P",{});var Y=w(T);R=z(Y,`Aliquid maxime laborum blanditiis praesentium adipisci architecto labore assumenda alias, unde,
		eum esse. Possimus, provident quisquam? Iure ad repellendus perferendis exercitationem cum
		cupiditate. Perspiciatis quasi culpa qui fugiat. Dolorum, dolores?`),Y.forEach(f),H=C(g),$=y(g,"P",{});var X=w($);_e=z(X,`Aperiam itaque qui, quo aspernatur, voluptas nihil cupiditate quaerat debitis repudiandae error
		nostrum explicabo non eum saepe. Mollitia deserunt adipisci ipsa fugit maxime! Animi qui,
		aperiam quaerat distinctio nulla libero?`),X.forEach(f),ve=C(g),F=y(g,"P",{});var lt=w(F);oe=z(lt,`Assumenda iusto officiis sed totam quo? Dolore quod aut debitis soluta totam quibusdam ut
		architecto qui quidem, quisquam eaque repellat eius ratione veniam dolores accusantium, fugit
		rem voluptatem laboriosam explicabo.`),lt.forEach(f)},m(g,M){A(g,e,M),m(e,t),A(g,s,M),A(g,r,M),m(r,i),A(g,o,M),A(g,a,M),m(a,l),A(g,c,M),A(g,d,M),m(d,p),A(g,v,M),A(g,_,M),m(_,E),A(g,N,M),A(g,h,M),m(h,S),A(g,O,M),A(g,U,M),m(U,P),A(g,b,M),A(g,T,M),m(T,R),A(g,H,M),A(g,$,M),m($,_e),A(g,ve,M),A(g,F,M),m(F,oe)},p:$e,d(g){g&&f(e),g&&f(s),g&&f(r),g&&f(o),g&&f(a),g&&f(c),g&&f(d),g&&f(v),g&&f(_),g&&f(N),g&&f(h),g&&f(O),g&&f(U),g&&f(b),g&&f(T),g&&f(H),g&&f($),g&&f(ve),g&&f(F)}}}function Bc(n){let e,t,s,r,i,o,a,l,c,d,p;e=new Rl({}),s=new ac({});const v=n[1].default,_=nt(v,n,n[3],null);a=new uc({});function E(h){n[2](h)}let N={title:"Test Title",$$slots:{default:[qc]},$$scope:{ctx:n}};return n[0]!==void 0&&(N.isOpen=n[0]),c=new Uc({props:N}),jr.push(()=>Gr(c,"isOpen",E)),{c(){ne(e.$$.fragment),t=D(),ne(s.$$.fragment),r=D(),i=I("main"),_&&_.c(),o=D(),ne(a.$$.fragment),l=D(),ne(c.$$.fragment),this.h()},l(h){se(e.$$.fragment,h),t=C(h),se(s.$$.fragment,h),r=C(h),i=y(h,"MAIN",{id:!0});var S=w(i);_&&_.l(S),S.forEach(f),o=C(h),se(a.$$.fragment,h),l=C(h),se(c.$$.fragment,h),this.h()},h(){u(i,"id","#main")},m(h,S){re(e,h,S),A(h,t,S),re(s,h,S),A(h,r,S),A(h,i,S),_&&_.m(i,null),A(h,o,S),re(a,h,S),A(h,l,S),re(c,h,S),p=!0},p(h,[S]){_&&_.p&&(!p||S&8)&&st(_,v,h,h[3],p?it(v,h[3],S,null):rt(h[3]),null);const O={};S&8&&(O.$$scope={dirty:S,ctx:h}),!d&&S&1&&(d=!0,O.isOpen=h[0],Kr(()=>d=!1)),c.$set(O)},i(h){p||(W(e.$$.fragment,h),W(s.$$.fragment,h),W(_,h),W(a.$$.fragment,h),W(c.$$.fragment,h),p=!0)},o(h){V(e.$$.fragment,h),V(s.$$.fragment,h),V(_,h),V(a.$$.fragment,h),V(c.$$.fragment,h),p=!1},d(h){ie(e,h),h&&f(t),ie(s,h),h&&f(r),h&&f(i),_&&_.d(h),h&&f(o),ie(a,h),h&&f(l),ie(c,h)}}}function $c(n,e,t){let{$$slots:s={},$$scope:r}=e,i=!1;function o(a){i=a,t(0,i)}return n.$$set=a=>{"$$scope"in a&&t(3,r=a.$$scope)},[i,s,o,r]}class Vc extends Ce{constructor(e){super(),Pe(this,e,$c,Bc,Ne,{})}}export{Vc as default};
