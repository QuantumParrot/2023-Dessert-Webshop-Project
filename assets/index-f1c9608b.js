import{a as r}from"./main-78beb421.js";import{h as d}from"./moment-fbc5633a.js";import{S as p}from"./swiper-bundle-856ac9ac.js";const{VITE_APP_SITE:l}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};var a;const c=(a=JSON.parse(localStorage.getItem("userData")))==null?void 0:a.id;function u(){r.get(`${l}/664/announcements?_sort=id&_order=desc&_limit=3`).then(e=>(f(e.data),r.get(`${l}/products`))).then(e=>{b(e.data)(3)}).catch(e=>{console.log(e)})}u();const m=document.querySelector("#announcements");function f(e){const n={網站公告:"https://i.imgur.com/ZdVvBk0.jpg",開放預購:"https://i.imgur.com/uAiFLTz.jpg",出貨通知:"https://fakeimg.pl/416x320/?text=出貨通知&font=noto",價格調整:"https://i.imgur.com/0v5peZM.jpg"};let t="";for(let s=0;s<e.length;s++)t+=`
        <div class="col-lg-4 col-12">
            <div class="mb-6">
                <div class="card hover-scale h-100 shadow px-6 py-7">
                    <img class="d-block position-relative rounded-3 mb-6"
                         style="height: 314px;"
                         src="${e[s].image||n[e[s].type]}"
                         alt="${e[s].type}">
                    <h3 class="custom-tooltip w-75 position-absolute top-30 start-11 shadow-lg py-4 text-center">
                    ${e[s].type}
                    </h3>
                    <div class="card-body d-flex flex-column p-0">
                        <p class="fs-6 text-black mb-2">${d(e[s].date).format("YYYY-MM-DD")}</p>
                        <h4 class="flex-grow-1 fs-5 mb-9">${e[s].title}</h4>
                        <div class="text-center">
                            <a class="btn btn-sm btn-outline-primary" href="news-detail.html?id=${e[s].id}">繼續閱讀</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;m.innerHTML=t}const g=document.querySelector("#rank");async function h(e){if(c){const t=await r.get(`${l}/664/user/${c}/collects?_expand=product`);e=e.map(s=>({...s,isCollected:!!t.data.find(o=>o.product.id==s.id)}))}document.querySelector("#rank .loading").classList.add("d-none");let n="";for(let t=0;t<e.length;t++)n+=`
        <div class="col-lg-4 col-12">
            <a class="text-decoration-none" href="products-detail.html?id=${e[t].id}">
                <div class="card h-100 overflow-hidden border-0">
                    <div class="product h-100 mb-6 overflow-hidden">
                    <img src="${e[t].image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                         alt="${e[t].name}"
                         class="d-block rounded w-100 h-100">
                    </div>
                    <div class="ps-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h4 class="fs-5">${e[t].name}・<span class="text-muted">${e[t].size}</span></h4>
                                <p class="fs-6 text-orange fw-bold">NT＄${e[t].price}</p>
                            </div>
                            <div class="d-flex gap-3">
                                <button data-num="${e[t].id}" class="btn btn-sm btn-outline-orange p-1">
                                    <span class="material-icons d-flex">${e[t].isCollected?"favorite":"favorite_outline"}</span>
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
        `;g.innerHTML+=n}function b(e){const n=e.filter(o=>o.forSale);function t(){const o=Math.floor(Math.random()*n.length),i=n[o];return n.splice(o,1),i}const s=[];return function(o){for(let i=1;i<=o;i++)s.push(t());h(s)}}new p(".banner-swiper",{slidesPerGroup:1,slidesPerView:1,navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"},autoplay:{delay:2e3,disableOnInteraction:!1},loop:!0});$(document).ready(function(){$("#blur-filter").click(function(){$(this).toggleClass("backdrop-blur-sm"),$(this).siblings().find(".click").toggleClass("d-none")})});
