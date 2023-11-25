import{a as l,g,t as f,e as h,w as y}from"./main-24575d4b.js";import{m as v}from"./modification-f53c3b54.js";const{VITE_APP_SITE:d}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let m=[];(async function(){var s;try{const t=await l.get(`${d}/664/products`);let{data:o}=t;const r=(s=JSON.parse(localStorage.getItem("userData")))==null?void 0:s.id;if(r){const e=await l.get(`${d}/664/user/${r}/collects`);o=o.map(i=>({...i,isCollected:!!e.data.find(a=>a.content.id==i.id)}))}m=o,u(m)}catch(t){console.log(t)}})();const S=document.querySelector("#products"),E=document.querySelector("#filter"),p=document.querySelector("#search-bar"),I=document.querySelector("#submit");function u(s){let t="";s.length===0?t+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">找不到您要的商品喔 QQ</p>
    </div>`:s.forEach(e=>{t+=`
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
                                    <span class="material-icons d-flex">${e.isCollected?"favorite":"favorite_outline"}</span>
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
        `}),S.innerHTML=t,p.value="",document.querySelectorAll(".favorite").forEach(e=>{D(e,s)}),document.querySelectorAll(".cart").forEach(e=>{x(e,s)})}function D(s,t){s.addEventListener("click",o=>{o.preventDefault();const r=g();if(!r)f("warning","請先登入");else{const e=t.find(a=>a.id==s.dataset.num),i=JSON.parse(localStorage.getItem("userData")).id;if(e.isCollected)e.isCollected&&l.get(`${d}/users/${i}/collects`).then(a=>{const c=a.data.find(n=>n.content.id==e.id).id;return l.delete(`${d}/640/collects/${c}`,{headers:{authorization:`Bearer ${r}`}})}).then(a=>{e.isCollected=!1,t=t.map(c=>c.id==s.dataset.num?e:c),u(t),f("success",`已取消收藏${e.name}`)}).catch(a=>{h(a)});else{const a={content:v(e),userId:i};delete a.content.isCollected,l.post(`${d}/640/collects`,a,{headers:{authorization:`Bearer ${r}`}}).then(c=>{e.isCollected=!0,t=t.map(n=>n.id==s.dataset.num?e:n),u(t),f("success",`已成功收藏${e.name}`)}).catch(c=>{h(c)})}}},!1)}function x(s,t){s.addEventListener("click",function(o){o.preventDefault();const r=g();if(!r)f("warning","請先登入");else{const e=t.find(a=>a.id==s.dataset.num),i=+JSON.parse(localStorage.getItem("userData")).id;l.get(`${d}/640/users/${i}/carts`,{headers:{authorization:`Bearer ${r}`}}).then(a=>{const{data:c}=a;let n=c.find(b=>b.content.id==s.dataset.num);return n?n.qty>9?void 0:(n={...n,qty:n.qty+=1},l.patch(`${d}/640/carts/${n.id}`,n,{headers:{authorization:`Bearer ${r}`}})):(n={content:v(e),qty:1,userId:i},delete n.content.isCollected,l.post(`${d}/640/carts`,n,{headers:{authorization:`Bearer ${r}`}}))}).then(a=>{a?f("success","成功加入購物車"):y("數量達上限","如果需要大量訂購，請直接與我們聯絡")}).catch(a=>{h(a)})}},!1)}E.addEventListener("click",function(s){if(s.target.nodeName=="BUTTON"){const t=s.target.textContent;u(t!=="全站商品"?m.filter(o=>o.type.includes(t)):m)}},!1);I.addEventListener("click",function(s){let t=p.value.replace(/\s/g,"");if(t)u(m.filter(o=>o.name.includes(t)||o.type.find(r=>r.includes(t))));else return},!1);$(document).ready(function(){$(".nav-link").click(function(){$(this).addClass("active disabled"),$(this).parent().siblings().children(".nav-link").removeClass("active disabled")})});
