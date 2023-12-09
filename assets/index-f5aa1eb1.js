import{a as r}from"./main-050bd7e3.js";import{h as d}from"./moment-fbc5633a.js";import{S as p}from"./swiper-bundle-856ac9ac.js";const{VITE_APP_SITE:l}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};var a;const c=(a=JSON.parse(localStorage.getItem("userData")))==null?void 0:a.id;function m(){r.get(`${l}/664/announcements?_sort=id&_order=desc&_limit=3`).then(t=>(f(t.data),r.get(`${l}/products`))).then(t=>{b(t.data)(3)}).catch(t=>{console.log(t)})}m();const u=document.querySelector("#announcements");function f(t){const n={網站公告:"https://i.imgur.com/ZdVvBk0.jpg",開放預購:"https://i.imgur.com/uAiFLTz.jpg",出貨通知:"https://fakeimg.pl/416x320/?text=出貨通知&font=noto",價格調整:"https://i.imgur.com/0v5peZM.jpg"};let e="";for(let s=0;s<t.length;s++)e+=`
        <div class="col-lg-4 col-12">
            <div class="mb-6">
                <div class="card hover-scale h-100 shadow px-6 py-7">
                    <img class="d-block position-relative rounded-3 mb-6"
                         style="height: 314px;"
                         src="${t[s].image||n[t[s].type]}"
                         alt="${t[s].type}">
                    <h3 class="custom-tooltip w-75 position-absolute top-30 start-11 shadow-lg py-4 text-center">
                    ${t[s].type}
                    </h3>
                    <div class="card-body d-flex flex-column p-0">
                        <p class="fs-6 text-black mb-2">${d(t[s].date).format("YYYY-MM-DD")}</p>
                        <h4 class="flex-grow-1 fs-5 mb-9">${t[s].title}</h4>
                        <div class="text-center">
                            <a class="btn btn-sm btn-outline-primary" href="news-detail.html?id=${t[s].id}">繼續閱讀</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;u.innerHTML=e}const g=document.querySelector("#rank");async function h(t){if(c){const e=await r.get(`${l}/664/user/${c}/collects`);t=t.map(s=>({...s,isCollected:!!e.data.find(o=>o.productId==s.id)}))}document.querySelector("#rank .loading").classList.add("d-none");let n="";for(let e=0;e<t.length;e++)n+=`
        <div class="col-lg-4 col-12">
            <a class="text-decoration-none" href="products-detail.html?id=${t[e].id}">
                <div class="card h-100 overflow-hidden border-0">
                    <div class="product h-100 mb-6 overflow-hidden">
                    <img src="${t[e].image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                         alt="${t[e].name}"
                         class="d-block rounded w-100 h-100">
                    </div>
                    <div class="ps-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h4 class="fs-5">${t[e].name}・<span class="text-muted">${t[e].size}</span></h4>
                                <p class="fs-6 text-orange fw-bold">NT＄${t[e].price}</p>
                            </div>
                            <div class="d-flex gap-3">
                                <button data-num="${t[e].id}" class="btn btn-sm btn-outline-orange p-1">
                                    <span class="material-icons d-flex">${t[e].isCollected?"favorite":"favorite_outline"}</span>
                                </button>
                                <button class="btn btn-sm btn-primary p-1">
                                    <span class="material-icons d-flex align-top">shopping_bag</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `;g.innerHTML+=n}function b(t){const n=t.filter(o=>o.forSale);function e(){const o=Math.floor(Math.random()*n.length),i=n[o];return n.splice(o,1),i}const s=[];return function(o){for(let i=1;i<=o;i++)s.push(e());h(s)}}new p(".banner-swiper",{slidesPerGroup:1,slidesPerView:1,navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"},loop:!0});$(document).ready(function(){$("#blur-filter").click(function(){$(this).toggleClass("backdrop-blur-sm"),$(this).siblings().find(".click").toggleClass("d-none")})});
