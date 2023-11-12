import{a as l,g,t as f,e as h,w as b}from"./handleAuth-03fa9bb6.js";const{VITE_APP_SITE:d}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let m=[];(async function(){var s;try{const t=await l.get(`${d}/664/products`);let{data:r}=t;const c=(s=JSON.parse(localStorage.getItem("userData")))==null?void 0:s.id;if(c){const e=await l.get(`${d}/664/user/${c}/collects`);r=r.map(i=>({...i,isCollected:!!e.data.find(a=>a.content.id==i.id)}))}m=r,u(m)}catch(t){console.log(t)}})();const y=document.querySelector("#products"),S=document.querySelector("#filter"),v=document.querySelector("#search-bar"),E=document.querySelector("#submit");function u(s){let t="";s.length===0?t+=`
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
        `}),y.innerHTML=t,v.value="",document.querySelectorAll(".favorite").forEach(e=>{x(e,s)}),document.querySelectorAll(".cart").forEach(e=>{w(e,s)})}function x(s,t){s.addEventListener("click",r=>{r.preventDefault();const c=g();if(!c)f("warning","請先登入");else{const e=t.find(a=>a.id==s.dataset.num),i=JSON.parse(localStorage.getItem("userData")).id;if(e.isCollected)e.isCollected&&l.get(`${d}/users/${i}/collects`).then(a=>{const o=a.data.find(n=>n.content.id==e.id).id;return l.delete(`${d}/640/collects/${o}`,{headers:{authorization:`Bearer ${c}`}})}).then(a=>{e.isCollected=!1,t=t.map(o=>o.id==s.dataset.num?e:o),u(t),f("success",`已取消收藏${e.name}`)}).catch(a=>{h(a)});else{const a={content:e,userId:i};delete a.content.isCollected,l.post(`${d}/640/collects`,a,{headers:{authorization:`Bearer ${c}`}}).then(o=>{e.isCollected=!0,t=t.map(n=>n.id==s.dataset.num?e:n),u(t),f("success",`已成功收藏${e.name}`)}).catch(o=>{h(o)})}}},!1)}function w(s,t){s.addEventListener("click",function(r){r.preventDefault();const c=g();if(!c)f("warning","請先登入");else{const e=t.find(a=>a.id==s.dataset.num),i=+JSON.parse(localStorage.getItem("userData")).id;l.get(`${d}/640/users/${i}/carts`,{headers:{authorization:`Bearer ${c}`}}).then(a=>{const{data:o}=a;let n=o.find(p=>p.content.id==s.dataset.num);return n?n.qty>9?void 0:(n={...n,qty:n.qty+=1},l.patch(`${d}/640/carts/${n.id}`,n,{headers:{authorization:`Bearer ${c}`}})):(n={content:e,qty:1,userId:i},delete n.content.isCollected,l.post(`${d}/640/carts`,n,{headers:{authorization:`Bearer ${c}`}}))}).then(a=>{a?f("success","成功加入購物車"):b("數量達上限","如果需要大量訂購，請直接與我們聯絡")}).catch(a=>{h(a)})}},!1)}S.addEventListener("click",function(s){if(s.target.nodeName=="BUTTON"){const t=s.target.textContent;u(t!=="全站商品"?m.filter(r=>r.type.includes(t)):m)}},!1);E.addEventListener("click",function(s){let t=v.value.replace(/\s/g,"");if(t)u(m.filter(r=>r.name.includes(t)));else return},!1);$(document).ready(function(){$(".nav-link").click(function(){$(this).addClass("active disabled"),$(this).parent().siblings().children(".nav-link").removeClass("active disabled")})});
