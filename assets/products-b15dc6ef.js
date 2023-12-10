import{a as i,h as d,e as f,b as g,t as p,w as h,c as b}from"./main-bd493cb3.js";import{S as y}from"./ScrollEvent-2d368248.js";const{VITE_APP_SITE:l}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let r=[];(async function(){var s;try{const t=await i.get(`${l}/664/products`);let{data:e}=t;const n=(s=JSON.parse(localStorage.getItem("userData")))==null?void 0:s.id;if(n){const a=await i.get(`${l}/600/users/${n}/collects`,d);e=e.map(c=>({...c,isCollected:!!a.data.find(o=>o.productId==c.id)}))}r=e,u(r)}catch(t){f(t)}})();const m=document.querySelector("#products"),S=document.querySelector("#filter"),v=document.querySelector("#search-bar"),I=document.querySelector("#submit");function u(s){let t="";s.length===0?t+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">找不到您要的商品喔 QQ</p>
    </div>`:s.forEach(e=>{t+=`
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
        `}),m.innerHTML=t,v.value=""}m.addEventListener("click",s=>{if(!s.target.closest("button"))return;if(s.preventDefault(),!g())p("warning","請先登入");else{const{classList:e}=s.target.closest("button"),n=s.target.closest("div").dataset.id;e.contains("favorite")?x(n):e.contains("cart")&&T(n)}});function x(s){const t=r.find(a=>a.id==s),e=JSON.parse(localStorage.getItem("userData")).id,n=document.querySelector("#filter .nav-link.active").textContent;if(t.isCollected)t.isCollected&&i.get(`${l}/600/users/${e}/collects`,d).then(a=>{const c=a.data.find(o=>o.productId==s).id;return i.delete(`${l}/600/collects/${c}`,d)}).then(a=>{t.isCollected=!1,r=r.map(c=>c.id==s?t:c),u(n==="全站商品"?r:r.filter(c=>c.type.includes(n))),p("success",`已取消收藏${t.name}`)}).catch(a=>{f(a)});else{const a={productId:Number(s),userId:e};i.post(`${l}/600/collects`,a,d).then(c=>{t.isCollected=!0,r=r.map(o=>o.id==s?t:o),u(n==="全站商品"?r:r.filter(o=>o.type.includes(n))),p("success",`已成功收藏${t.name}`)}).catch(c=>{f(c)})}}function T(s){const t=JSON.parse(localStorage.getItem("userData")).id;i.get(`${l}/640/users/${t}/carts?_expand=product`,d).then(e=>{const{data:n}=e;let a=n.find(c=>c.productId==s);return a?a.qty>9?void 0:i.patch(`${l}/640/carts/${a.id}`,{qty:a.qty+=1},d):(a={productId:Number(s),qty:1,userId:t},i.post(`${l}/640/carts`,a,d))}).then(e=>{e?p("success","成功加入購物車"):h("數量達上限","如果需要大量訂購，請直接與我們聯絡"),b()}).catch(e=>{f(e)})}S.addEventListener("click",function(s){if(s.target.nodeName==="BUTTON"){const t=s.target.textContent;u(t!=="全站商品"?r.filter(e=>e.type.includes(t)):r)}},!1);I.addEventListener("click",function(s){let t=v.value.replace(/\s/g,"");if(t)u(r.filter(e=>e.name.includes(t)||e.type.find(n=>n.includes(t))));else return},!1);$(document).ready(function(){$(".nav-link").click(function(){$(this).addClass("active disabled"),$(this).parent().siblings().children(".nav-link").removeClass("active disabled")})});const k=document.querySelectorAll(".back-to-top");k.forEach(s=>{const t=new y(s);s.addEventListener("click",e=>{t.backToTop()})});
