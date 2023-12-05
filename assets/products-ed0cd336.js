import{a as l,g as m,t as f,e as h,w as b}from"./main-e513b98b.js";import{S}from"./ScrollEvent-2d368248.js";const{VITE_APP_SITE:d}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let p=[];(async function(){var s;try{const t=await l.get(`${d}/664/products`);let{data:n}=t;const r=(s=JSON.parse(localStorage.getItem("userData")))==null?void 0:s.id;if(r){const e=await l.get(`${d}/664/user/${r}/collects`);n=n.map(i=>({...i,isCollected:!!e.data.find(a=>a.productId==i.id)}))}p=n,u(p)}catch(t){console.log(t)}})();const y=document.querySelector("#products"),I=document.querySelector("#filter"),v=document.querySelector("#search-bar"),E=document.querySelector("#submit");function u(s){let t="";s.length===0?t+=`
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
                            <div class="d-flex gap-3">
                                <button data-num="${e.id}" class="favorite btn btn-sm btn-outline-orange p-1">
                                    <span class="material-icons d-flex">${e.isCollected?"favorite":"favorite_outline"}</span>
                                </button>
                                <button data-num="${e.id}" class="cart btn btn-sm btn-primary p-1 ${e.forSale?"":"disabled"}">
                                    <span class="material-icons d-flex">shopping_bag</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `}),y.innerHTML=t,v.value="",document.querySelectorAll(".favorite").forEach(e=>{T(e,s)}),document.querySelectorAll(".cart").forEach(e=>{k(e)})}function T(s,t){s.addEventListener("click",n=>{n.preventDefault();const r=m();if(!r)f("warning","請先登入");else{const e=t.find(a=>a.id==s.dataset.num),i=JSON.parse(localStorage.getItem("userData")).id;if(e.isCollected)e.isCollected&&l.get(`${d}/users/${i}/collects`).then(a=>{const c=a.data.find(o=>o.productId==e.id).id;return l.delete(`${d}/640/collects/${c}`,{headers:{authorization:`Bearer ${r}`}})}).then(a=>{e.isCollected=!1,t=t.map(c=>c.id==s.dataset.num?e:c),u(t),f("success",`已取消收藏${e.name}`)}).catch(a=>{h(a)});else{const a={productId:e.id,userId:i};l.post(`${d}/640/collects`,a,{headers:{authorization:`Bearer ${r}`}}).then(c=>{e.isCollected=!0,t=t.map(o=>o.id==s.dataset.num?e:o),u(t),f("success",`已成功收藏${e.name}`)}).catch(c=>{h(c)})}}},!1)}function k(s,t){s.addEventListener("click",function(n){n.preventDefault();const r=m();if(!r)f("warning","請先登入");else{const e=+s.dataset.num,i=+JSON.parse(localStorage.getItem("userData")).id;l.get(`${d}/640/users/${i}/carts?_expand=product`,{headers:{authorization:`Bearer ${r}`}}).then(a=>{const{data:c}=a;let o=c.find(g=>g.productId==s.dataset.num);return o?o.qty>9?void 0:l.patch(`${d}/640/carts/${o.id}`,{qty:o.qty+=1},{headers:{authorization:`Bearer ${r}`}}):(o={productId:e,qty:1,userId:i},l.post(`${d}/640/carts`,o,{headers:{authorization:`Bearer ${r}`}}))}).then(a=>{a?f("success","成功加入購物車"):b("數量達上限","如果需要大量訂購，請直接與我們聯絡")}).catch(a=>{h(a)})}},!1)}I.addEventListener("click",function(s){if(s.target.nodeName=="BUTTON"){const t=s.target.textContent;u(t!=="全站商品"?p.filter(n=>n.type.includes(t)):p)}},!1);E.addEventListener("click",function(s){let t=v.value.replace(/\s/g,"");if(t)u(p.filter(n=>n.name.includes(t)||n.type.find(r=>r.includes(t))));else return},!1);$(document).ready(function(){$(".nav-link").click(function(){$(this).addClass("active disabled"),$(this).parent().siblings().children(".nav-link").removeClass("active disabled")})});const w=document.querySelectorAll(".back-to-top");w.forEach(s=>{const t=new S(s);s.addEventListener("click",n=>{t.backToTop()})});
