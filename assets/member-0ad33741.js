import{c as R,b as ht,a as V,e as B,t as Q,g as ut}from"./handleAuth-80df3364.js";var dt={exports:{}},z={exports:{}},G={exports:{}};/*!
  * Bootstrap data.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var rt;function bt(){return rt||(rt=1,function(E,v){(function(s,o){E.exports=o()})(R,function(){const s=new Map;return{set(d,e,r){s.has(d)||s.set(d,new Map);const c=s.get(d);if(!c.has(e)&&c.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(c.keys())[0]}.`);return}c.set(e,r)},get(d,e){return s.has(d)&&s.get(d).get(e)||null},remove(d,e){if(!s.has(d))return;const r=s.get(d);r.delete(e),r.size===0&&s.delete(d)}}})}(G)),G.exports}var J={exports:{}},j={exports:{}};/*!
  * Bootstrap index.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var st;function H(){return st||(st=1,function(E,v){(function(s,o){o(v)})(R,function(s){const e="transitionend",r=t=>(t&&window.CSS&&window.CSS.escape&&(t=t.replace(/#([^\s"#']+)/g,(u,a)=>`#${CSS.escape(a)}`)),t),c=t=>t==null?`${t}`:Object.prototype.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase(),f=t=>{do t+=Math.floor(Math.random()*1e6);while(document.getElementById(t));return t},p=t=>{if(!t)return 0;let{transitionDuration:u,transitionDelay:a}=window.getComputedStyle(t);const m=Number.parseFloat(u),A=Number.parseFloat(a);return!m&&!A?0:(u=u.split(",")[0],a=a.split(",")[0],(Number.parseFloat(u)+Number.parseFloat(a))*1e3)},w=t=>{t.dispatchEvent(new Event(e))},D=t=>!t||typeof t!="object"?!1:(typeof t.jquery<"u"&&(t=t[0]),typeof t.nodeType<"u"),W=t=>D(t)?t.jquery?t[0]:t:typeof t=="string"&&t.length>0?document.querySelector(r(t)):null,Y=t=>{if(!D(t)||t.getClientRects().length===0)return!1;const u=getComputedStyle(t).getPropertyValue("visibility")==="visible",a=t.closest("details:not([open])");if(!a)return u;if(a!==t){const m=t.closest("summary");if(m&&m.parentNode!==a||m===null)return!1}return u},P=t=>!t||t.nodeType!==Node.ELEMENT_NODE||t.classList.contains("disabled")?!0:typeof t.disabled<"u"?t.disabled:t.hasAttribute("disabled")&&t.getAttribute("disabled")!=="false",M=t=>{if(!document.documentElement.attachShadow)return null;if(typeof t.getRootNode=="function"){const u=t.getRootNode();return u instanceof ShadowRoot?u:null}return t instanceof ShadowRoot?t:t.parentNode?M(t.parentNode):null},q=()=>{},I=t=>{t.offsetHeight},K=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,C=[],S=t=>{document.readyState==="loading"?(C.length||document.addEventListener("DOMContentLoaded",()=>{for(const u of C)u()}),C.push(t)):t()},L=()=>document.documentElement.dir==="rtl",i=t=>{S(()=>{const u=K();if(u){const a=t.NAME,m=u.fn[a];u.fn[a]=t.jQueryInterface,u.fn[a].Constructor=t,u.fn[a].noConflict=()=>(u.fn[a]=m,t.jQueryInterface)}})},l=(t,u=[],a=t)=>typeof t=="function"?t(...u):a,g=(t,u,a=!0)=>{if(!a){l(t);return}const m=5,A=p(u)+m;let y=!1;const O=({target:T})=>{T===u&&(y=!0,u.removeEventListener(e,O),l(t))};u.addEventListener(e,O),setTimeout(()=>{y||w(u)},A)},h=(t,u,a,m)=>{const A=t.length;let y=t.indexOf(u);return y===-1?!a&&m?t[A-1]:t[0]:(y+=a?1:-1,m&&(y=(y+A)%A),t[Math.max(0,Math.min(y,A-1))])};s.defineJQueryPlugin=i,s.execute=l,s.executeAfterTransition=g,s.findShadowRoot=M,s.getElement=W,s.getNextActiveElement=h,s.getTransitionDurationFromElement=p,s.getUID=f,s.getjQuery=K,s.isDisabled=P,s.isElement=D,s.isRTL=L,s.isVisible=Y,s.noop=q,s.onDOMContentLoaded=S,s.parseSelector=r,s.reflow=I,s.toType=c,s.triggerTransitionEnd=w,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})})}(j,j.exports)),j.exports}/*!
  * Bootstrap event-handler.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var ot;function ft(){return ot||(ot=1,function(E,v){(function(s,o){E.exports=o(H())})(R,function(s){const o=/[^.]*(?=\..*)\.|.*/,d=/\..*/,e=/::\d+$/,r={};let c=1;const f={mouseenter:"mouseover",mouseleave:"mouseout"},p=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function w(i,l){return l&&`${l}::${c++}`||i.uidEvent||c++}function D(i){const l=w(i);return i.uidEvent=l,r[l]=r[l]||{},r[l]}function W(i,l){return function g(h){return L(h,{delegateTarget:i}),g.oneOff&&S.off(i,h.type,l),l.apply(i,[h])}}function Y(i,l,g){return function h(t){const u=i.querySelectorAll(l);for(let{target:a}=t;a&&a!==this;a=a.parentNode)for(const m of u)if(m===a)return L(t,{delegateTarget:a}),h.oneOff&&S.off(i,t.type,l,g),g.apply(a,[t])}}function P(i,l,g=null){return Object.values(i).find(h=>h.callable===l&&h.delegationSelector===g)}function M(i,l,g){const h=typeof l=="string",t=h?g:l||g;let u=C(i);return p.has(u)||(u=i),[h,t,u]}function q(i,l,g,h,t){if(typeof l!="string"||!i)return;let[u,a,m]=M(l,g,h);l in f&&(a=(U=>function(n){if(!n.relatedTarget||n.relatedTarget!==n.delegateTarget&&!n.delegateTarget.contains(n.relatedTarget))return U.call(this,n)})(a));const A=D(i),y=A[m]||(A[m]={}),O=P(y,a,u?g:null);if(O){O.oneOff=O.oneOff&&t;return}const T=w(a,l.replace(o,"")),N=u?Y(i,g,a):W(i,a);N.delegationSelector=u?g:null,N.callable=a,N.oneOff=t,N.uidEvent=T,y[T]=N,i.addEventListener(m,N,u)}function I(i,l,g,h,t){const u=P(l[g],h,t);u&&(i.removeEventListener(g,u,!!t),delete l[g][u.uidEvent])}function K(i,l,g,h){const t=l[g]||{};for(const[u,a]of Object.entries(t))u.includes(h)&&I(i,l,g,a.callable,a.delegationSelector)}function C(i){return i=i.replace(d,""),f[i]||i}const S={on(i,l,g,h){q(i,l,g,h,!1)},one(i,l,g,h){q(i,l,g,h,!0)},off(i,l,g,h){if(typeof l!="string"||!i)return;const[t,u,a]=M(l,g,h),m=a!==l,A=D(i),y=A[a]||{},O=l.startsWith(".");if(typeof u<"u"){if(!Object.keys(y).length)return;I(i,A,a,u,t?g:null);return}if(O)for(const T of Object.keys(A))K(i,A,T,l.slice(1));for(const[T,N]of Object.entries(y)){const x=T.replace(e,"");(!m||l.includes(x))&&I(i,A,a,N.callable,N.delegationSelector)}},trigger(i,l,g){if(typeof l!="string"||!i)return null;const h=s.getjQuery(),t=C(l),u=l!==t;let a=null,m=!0,A=!0,y=!1;u&&h&&(a=h.Event(l,g),h(i).trigger(a),m=!a.isPropagationStopped(),A=!a.isImmediatePropagationStopped(),y=a.isDefaultPrevented());const O=L(new Event(l,{bubbles:m,cancelable:!0}),g);return y&&O.preventDefault(),A&&i.dispatchEvent(O),O.defaultPrevented&&a&&a.preventDefault(),O}};function L(i,l={}){for(const[g,h]of Object.entries(l))try{i[g]=h}catch{Object.defineProperty(i,g,{configurable:!0,get(){return h}})}return i}return S})}(J)),J.exports}var X={exports:{}},Z={exports:{}};/*!
  * Bootstrap manipulator.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var it;function Et(){return it||(it=1,function(E,v){(function(s,o){E.exports=o()})(R,function(){function s(e){if(e==="true")return!0;if(e==="false")return!1;if(e===Number(e).toString())return Number(e);if(e===""||e==="null")return null;if(typeof e!="string")return e;try{return JSON.parse(decodeURIComponent(e))}catch{return e}}function o(e){return e.replace(/[A-Z]/g,r=>`-${r.toLowerCase()}`)}return{setDataAttribute(e,r,c){e.setAttribute(`data-bs-${o(r)}`,c)},removeDataAttribute(e,r){e.removeAttribute(`data-bs-${o(r)}`)},getDataAttributes(e){if(!e)return{};const r={},c=Object.keys(e.dataset).filter(f=>f.startsWith("bs")&&!f.startsWith("bsConfig"));for(const f of c){let p=f.replace(/^bs/,"");p=p.charAt(0).toLowerCase()+p.slice(1,p.length),r[p]=s(e.dataset[f])}return r},getDataAttribute(e,r){return s(e.getAttribute(`data-bs-${o(r)}`))}}})}(Z)),Z.exports}/*!
  * Bootstrap config.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var at;function mt(){return at||(at=1,function(E,v){(function(s,o){E.exports=o(Et(),H())})(R,function(s,o){class d{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(r){return r=this._mergeConfigObj(r),r=this._configAfterMerge(r),this._typeCheckConfig(r),r}_configAfterMerge(r){return r}_mergeConfigObj(r,c){const f=o.isElement(c)?s.getDataAttribute(c,"config"):{};return{...this.constructor.Default,...typeof f=="object"?f:{},...o.isElement(c)?s.getDataAttributes(c):{},...typeof r=="object"?r:{}}}_typeCheckConfig(r,c=this.constructor.DefaultType){for(const[f,p]of Object.entries(c)){const w=r[f],D=o.isElement(w)?"element":o.toType(w);if(!new RegExp(p).test(D))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${f}" provided type "${D}" but expected type "${p}".`)}}}return d})}(X)),X.exports}/*!
  * Bootstrap base-component.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var ct;function vt(){return ct||(ct=1,function(E,v){(function(s,o){E.exports=o(bt(),ft(),mt(),H())})(R,function(s,o,d,e){const r="5.3.2";class c extends d{constructor(p,w){super(),p=e.getElement(p),p&&(this._element=p,this._config=this._getConfig(w),s.set(this._element,this.constructor.DATA_KEY,this))}dispose(){s.remove(this._element,this.constructor.DATA_KEY),o.off(this._element,this.constructor.EVENT_KEY);for(const p of Object.getOwnPropertyNames(this))this[p]=null}_queueCallback(p,w,D=!0){e.executeAfterTransition(p,w,D)}_getConfig(p){return p=this._mergeConfigObj(p,this._element),p=this._configAfterMerge(p),this._typeCheckConfig(p),p}static getInstance(p){return s.get(e.getElement(p),this.DATA_KEY)}static getOrCreateInstance(p,w={}){return this.getInstance(p)||new this(p,typeof w=="object"?w:null)}static get VERSION(){return r}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(p){return`${p}${this.EVENT_KEY}`}}return c})}(z)),z.exports}var tt={exports:{}};/*!
  * Bootstrap selector-engine.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var lt;function _t(){return lt||(lt=1,function(E,v){(function(s,o){E.exports=o(H())})(R,function(s){const o=e=>{let r=e.getAttribute("data-bs-target");if(!r||r==="#"){let c=e.getAttribute("href");if(!c||!c.includes("#")&&!c.startsWith("."))return null;c.includes("#")&&!c.startsWith("#")&&(c=`#${c.split("#")[1]}`),r=c&&c!=="#"?s.parseSelector(c.trim()):null}return r},d={find(e,r=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(r,e))},findOne(e,r=document.documentElement){return Element.prototype.querySelector.call(r,e)},children(e,r){return[].concat(...e.children).filter(c=>c.matches(r))},parents(e,r){const c=[];let f=e.parentNode.closest(r);for(;f;)c.push(f),f=f.parentNode.closest(r);return c},prev(e,r){let c=e.previousElementSibling;for(;c;){if(c.matches(r))return[c];c=c.previousElementSibling}return[]},next(e,r){let c=e.nextElementSibling;for(;c;){if(c.matches(r))return[c];c=c.nextElementSibling}return[]},focusableChildren(e){const r=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(c=>`${c}:not([tabindex^="-"])`).join(",");return this.find(r,e).filter(c=>!s.isDisabled(c)&&s.isVisible(c))},getSelectorFromElement(e){const r=o(e);return r&&d.findOne(r)?r:null},getElementFromSelector(e){const r=o(e);return r?d.findOne(r):null},getMultipleElementsFromSelector(e){const r=o(e);return r?d.find(r):[]}};return d})}(tt)),tt.exports}/*!
  * Bootstrap tab.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */(function(E,v){(function(s,o){E.exports=o(vt(),ft(),_t(),H())})(R,function(s,o,d,e){const r="tab",f=".bs.tab",p=`hide${f}`,w=`hidden${f}`,D=`show${f}`,W=`shown${f}`,Y=`click${f}`,P=`keydown${f}`,M=`load${f}`,q="ArrowLeft",I="ArrowRight",K="ArrowUp",C="ArrowDown",S="Home",L="End",i="active",l="fade",g="show",h="dropdown",t=".dropdown-toggle",u=".dropdown-menu",a=`:not(${t})`,m='.list-group, .nav, [role="tablist"]',A=".nav-item, .list-group-item",y=`.nav-link${a}, .list-group-item${a}, [role="tab"]${a}`,O='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',T=`${y}, ${O}`,N=`.${i}[data-bs-toggle="tab"], .${i}[data-bs-toggle="pill"], .${i}[data-bs-toggle="list"]`;class x extends s{constructor(n){super(n),this._parent=this._element.closest(m),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),o.on(this._element,P,b=>this._keydown(b)))}static get NAME(){return r}show(){const n=this._element;if(this._elemIsActive(n))return;const b=this._getActiveElem(),_=b?o.trigger(b,p,{relatedTarget:n}):null;o.trigger(n,D,{relatedTarget:b}).defaultPrevented||_&&_.defaultPrevented||(this._deactivate(b,n),this._activate(n,b))}_activate(n,b){if(!n)return;n.classList.add(i),this._activate(d.getElementFromSelector(n));const _=()=>{if(n.getAttribute("role")!=="tab"){n.classList.add(g);return}n.removeAttribute("tabindex"),n.setAttribute("aria-selected",!0),this._toggleDropDown(n,!0),o.trigger(n,W,{relatedTarget:b})};this._queueCallback(_,n,n.classList.contains(l))}_deactivate(n,b){if(!n)return;n.classList.remove(i),n.blur(),this._deactivate(d.getElementFromSelector(n));const _=()=>{if(n.getAttribute("role")!=="tab"){n.classList.remove(g);return}n.setAttribute("aria-selected",!1),n.setAttribute("tabindex","-1"),this._toggleDropDown(n,!1),o.trigger(n,w,{relatedTarget:b})};this._queueCallback(_,n,n.classList.contains(l))}_keydown(n){if(![q,I,K,C,S,L].includes(n.key))return;n.stopPropagation(),n.preventDefault();const b=this._getChildren().filter(k=>!e.isDisabled(k));let _;if([S,L].includes(n.key))_=b[n.key===S?0:b.length-1];else{const k=[I,C].includes(n.key);_=e.getNextActiveElement(b,n.target,k,!0)}_&&(_.focus({preventScroll:!0}),x.getOrCreateInstance(_).show())}_getChildren(){return d.find(T,this._parent)}_getActiveElem(){return this._getChildren().find(n=>this._elemIsActive(n))||null}_setInitialAttributes(n,b){this._setAttributeIfNotExists(n,"role","tablist");for(const _ of b)this._setInitialAttributesOnChild(_)}_setInitialAttributesOnChild(n){n=this._getInnerElement(n);const b=this._elemIsActive(n),_=this._getOuterElement(n);n.setAttribute("aria-selected",b),_!==n&&this._setAttributeIfNotExists(_,"role","presentation"),b||n.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(n,"role","tab"),this._setInitialAttributesOnTargetPanel(n)}_setInitialAttributesOnTargetPanel(n){const b=d.getElementFromSelector(n);b&&(this._setAttributeIfNotExists(b,"role","tabpanel"),n.id&&this._setAttributeIfNotExists(b,"aria-labelledby",`${n.id}`))}_toggleDropDown(n,b){const _=this._getOuterElement(n);if(!_.classList.contains(h))return;const k=(pt,gt)=>{const nt=d.findOne(pt,_);nt&&nt.classList.toggle(gt,b)};k(t,i),k(u,g),_.setAttribute("aria-expanded",b)}_setAttributeIfNotExists(n,b,_){n.hasAttribute(b)||n.setAttribute(b,_)}_elemIsActive(n){return n.classList.contains(i)}_getInnerElement(n){return n.matches(T)?n:d.findOne(T,n)}_getOuterElement(n){return n.closest(A)||n}static jQueryInterface(n){return this.each(function(){const b=x.getOrCreateInstance(this);if(typeof n=="string"){if(b[n]===void 0||n.startsWith("_")||n==="constructor")throw new TypeError(`No method named "${n}"`);b[n]()}})}}return o.on(document,Y,O,function(U){["A","AREA"].includes(this.tagName)&&U.preventDefault(),!e.isDisabled(this)&&x.getOrCreateInstance(this).show()}),o.on(window,M,()=>{for(const U of d.find(N))x.getOrCreateInstance(U)}),e.defineJQueryPlugin(x),x})})(dt);var At=dt.exports;const yt=ht(At),{VITE_APP_SITE:F}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function wt(){ut()?et():Q("warning","請先登入","login.html")}wt();window.addEventListener("hashchange",function(){et()});function et(){var d;const E=location.hash.replace("#","")||"orders",v=document.querySelector(`#v-pills-${E}-tab`);v&&new yt(v).show();const s=document.querySelector(`#v-pills-${E} #${E}-content`),o=(d=JSON.parse(localStorage.getItem("userData")))==null?void 0:d.id;E==="orders"?V.get(`${F}/users/${o}/orders`).then(e=>{Ot(s,e.data)}).catch(e=>{B(e)}):E==="collection"&&V.get(`${F}/users/${o}/collects`).then(e=>{Dt(s,e.data)}).catch(e=>{B(e)})}function Ot(E,v){let s="";v.length===0?s+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        目前沒有訂單記錄
        </p>
    </div>
    `:v.forEach(o=>{s+=`
        <div class="col-12">
            <div class="accordion-item mb-6">
                <button type="button"
                        class="accordion-title w-100 btn d-flex justify-content-center align-items-center gap-md-5 gap-2 bg-white rounded-2 shadow px-md-8 py-5">
                    <p class="pe-5 border-end">
                        <span class="fw-bold">訂單</span>編號：</span>
                        <span class="text-black">${o.orderNum}</span>
                    </p>
                    <p class="d-md-inline-block d-none pe-5 border-end">
                        <span class="fw-bold">成立日期：</span>
                        <span class="fw-normal">${o.createdTime.replace(/\s(.)+/,"")}</span>
                    </p>
                    <p class="d-md-inline-block d-none pe-5 border-end">
                        <span class="fw-bold">訂購金額：</span>
                        ${o.total} 元
                    </p>
                    <p class="pe-5 ps-2">
                        <span class="d-md-inline-block d-none fw-bold">訂單狀態：</span>
                        <span class=${o.isFinished?"text-success":"text-danger"}>
                        ${o.isFinished?"已完成":"製作中"}</span>
                    </p>
                </button>
                <div class="accordion-content rounded-2 shadow">
                    <div class="px-md-8 px-6 pt-5 pb-7">
                    <div class="mb-5">
                        ${o.products.map(d=>`
                        <div class="row gap-md-5 py-2 border-bottom lh-lg">
                            <div class="col-lg-3 col-12">
                                <p class="text-orange fw-bold">${d.content.name}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">數量：</span>${d.qty}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">金額：</span>${d.content.price*d.qty}</p>
                            </div>
                        </div>`).join("")}
                    </div>
                    <div class="row fs-5 fw-bold border-bottom mb-5">
                        <div class="col-12">
                            <p class="mb-5">總計：${o.total} 元</p>
                        </div>
                    </div>
                    <div class="lh-lg">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <p class="d-md-block d-none fw-bold fs-5">寄送資訊</p>
                            <p class="text-black">${o.createdTime}</p>
                        </div>
                        <p>
                        <span class="text-orange fw-bold">收件人姓名：</span>${o.info.receiver}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">收件人電話：</span>${o.info.phone}
                        </p>
                        <p class="d-md-block d-flex flex-column">
                        <span class="text-orange fw-bold">收件人地址：</span>${o.info.address}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">取貨方式：</span>${o.info.method}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">付款方式：</span>${o.info.payment}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">指定收貨時段：</span>${o.info.shippingTime}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `}),E.innerHTML=s,$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function Dt(E,v){let s="";v.length===0?s+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        還沒有收藏任何商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
    </div>
    `:v.forEach(({content:e})=>s+=`
    <div class="col-md-4 col-12 mb-9">
        <a class="text-decoration-none" href="products-detail.html?id=${e.id}">
            <div class="card hover-shadow h-100 overflow-hidden mb-6">
                <img class="mb-6"
                     src="${e.image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                     alt="${e.name}">
                <div class="px-5">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="fs-6">${e.name}・<span class="text-muted">${e.size}</span></h4>
                            <p class="fs-7 text-orange fw-bold">NT＄${e.price}</p>
                        </div>
                        <div class="d-flex gap-3">
                            <button data-num="${e.id}" class="favorite btn btn-sm btn-outline-orange p-1">
                                <span class="material-icons d-flex">favorite</span>
                            </button>
                            <button data-num="${e.id}" class="cart btn btn-sm btn-primary p-1">
                                <span class="material-icons d-flex">shopping_bag</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `),E.innerHTML=s,document.querySelectorAll(".favorite").forEach(e=>{Tt(e,v)}),document.querySelectorAll(".cart").forEach(e=>{Nt(e,v)})}function Tt(E,v){E.addEventListener("click",s=>{s.preventDefault();const o=v.find(e=>e.content.id==E.dataset.num);console.log(o),JSON.parse(localStorage.getItem("userData")).id;const d=localStorage.getItem("token");V.delete(`${F}/640/collects/${o.id}`,{headers:{authorization:`Bearer ${d}`}}).then(e=>{Q("success",`已取消收藏${o.content.name}`),et()}).catch(e=>{B(e)})},!1)}function Nt(E,v){E.addEventListener("click",function(s){s.preventDefault();const o=ut();if(!o)Q("warning","請先登入");else{const d=v.find(r=>r.id==E.dataset.num),e=JSON.parse(localStorage.getItem("userData")).id;V.get(`${F}/640/users/${e}/carts`,{headers:{authorization:`Bearer ${o}`}}).then(r=>{const{data:c}=r;let f=c.find(p=>p.content.id==E.dataset.num);return f?f.qty>9?void 0:(f={...f,qty:f.qty+=1},V.patch(`${F}/640/carts/${f.id}`,f,{headers:{authorization:`Bearer ${o}`}})):(f={content:d.content,qty:1,userId:e},delete f.content.isCollected,V.post(`${F}/640/carts`,f,{headers:{authorization:`Bearer ${o}`}}))}).then(r=>{r?Q("success","成功加入購物車"):warningMessage("數量達上限","如果需要大量訂購，請直接與我們聯絡")}).catch(r=>{B(r)})}},!1)}
