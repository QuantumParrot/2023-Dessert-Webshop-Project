import{a as n,h as d,e as m,t as h,b as p,w as b}from"./main-5bc21e7f.js";import{c as y}from"./header-state-d9f1b448.js";import{S}from"./ScrollEventTrigger-151952d0.js";const{VITE_APP_SITE:o}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let i=[];(async()=>{var t;try{const s=await n.get(`${o}/664/products`);let{data:e}=s;const c=(t=JSON.parse(localStorage.getItem("userData")))==null?void 0:t.id;if(c){const r=await n.get(`${o}/600/users/${c}/collects`,d);e=e.map(a=>({...a,isCollected:!!r.data.find(l=>l.productId==a.id)}))}i=e,f(i)}catch(s){m(s)}})();const v=document.querySelector("#products"),I=document.querySelector("#filter"),g=document.querySelector("#search-bar"),x=document.querySelector("#submit");function f(t){let s="";t.length===0?s+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">找不到您要的商品喔 QQ</p>
    </div>`:t.forEach(e=>{s+=`
        <div class="col-md-4 col-12 mb-9">
            <a class="text-decoration-none" href="products-detail.html?id=${e.id}">
                <div class="card hover-shadow h-100 overflow-hidden mb-6">
                    <div class="position-relative mb-6">
                        <img class="w-100"
                             src="${e.image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                             alt="${e.name}">
                        ${e.forSale?"":`
                        <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center" style="backdrop-filter: brightness(70%)">
                            <h3 class="custom-tooltip w-100 text-center py-5">已售完</h3>
                        </div>`}
                    </div>
                    <div class="px-5">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h4 class="fs-6">${e.name}・<span class="text-muted">${e.size}</span></h4>
                                <p class="fs-7 text-orange fw-bold">NT＄${e.price}</p>
                            </div>
                            <div class="d-flex gap-3" data-id="${e.id}">
                                <button class="favorite btn btn-sm btn-outline-orange p-1">
                                    <span class="material-icons d-flex">${e.isCollected?"favorite":"favorite_outline"}</span>
                                </button>
                                <button class="cart btn btn-sm btn-primary p-1 ${e.forSale?"":"disabled"}">
                                    <span class="material-icons d-flex">shopping_bag</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `}),v.innerHTML=s,g.value=""}v.addEventListener("click",t=>{if(!t.target.closest("button"))return;if(t.preventDefault(),!h())p("warning","請先登入");else{const e=t.target.closest("button");e.classList.contains("favorite")?T(e):e.classList.contains("cart")&&k(e)}});function T(t){const s=t.closest("div").dataset.id,e=i.find(a=>a.id==s),c=JSON.parse(localStorage.getItem("userData")).id,r=document.querySelector("#filter .nav-link.active").textContent;if(t.classList.add("disabled"),e.isCollected)e.isCollected&&n.get(`${o}/600/users/${c}/collects`,d).then(a=>{const l=a.data.find(u=>u.productId==s).id;return n.delete(`${o}/600/collects/${l}`,d)}).then(a=>{e.isCollected=!1,i=i.map(l=>l.id==s?e:l),f(r==="全站商品"?i:i.filter(l=>l.type.includes(r))),p("success",`已取消收藏${e.name}`),t.classList.remove("disabled")}).catch(a=>{m(a),t.classList.remove("disabled")});else{const a={productId:Number(s),userId:c};n.post(`${o}/600/collects`,a,d).then(l=>{e.isCollected=!0,i=i.map(u=>u.id==s?e:u),f(r==="全站商品"?i:i.filter(u=>u.type.includes(r))),p("success",`已成功收藏${e.name}`),t.classList.remove("disabled")}).catch(l=>{m(l),t.classList.remove("disabled")})}}function k(t){const s=t.closest("div").dataset.id,e=JSON.parse(localStorage.getItem("userData")).id;t.classList.add("disabled"),n.get(`${o}/640/users/${e}/carts?_expand=product`,d).then(c=>{const{data:r}=c;let a=r.find(l=>l.productId==s);return a?a.qty>9?void 0:n.patch(`${o}/640/carts/${a.id}`,{qty:a.qty+=1},d):(a={productId:Number(s),qty:1,userId:e},n.post(`${o}/640/carts`,a,d))}).then(c=>{c?p("success","成功加入購物車"):b("數量達上限","如果需要大量訂購，請直接與我們聯絡"),y(),t.classList.remove("disabled")}).catch(c=>{m(c),t.classList.remove("disabled")})}I.addEventListener("click",function(t){if(t.target.nodeName==="BUTTON"){const s=t.target.textContent;f(s!=="全站商品"?i.filter(e=>e.type.includes(s)):i)}},!1);x.addEventListener("click",function(t){let s=g.value.replace(/\s/g,"");if(s)f(i.filter(e=>e.name.includes(s)||e.type.find(c=>c.includes(s))));else return});$(document).ready(function(){$(".nav-link").click(function(){$(this).addClass("active disabled"),$(this).parent().siblings().children(".nav-link").removeClass("active disabled")})});const E=document.querySelectorAll(".back-to-top");E.forEach(t=>{const s=new S(t);t.addEventListener("click",e=>{s.backToTop()})});
