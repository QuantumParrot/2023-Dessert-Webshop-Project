import{a as o,g as v,t as l,e as p,w as m}from"./main-78beb421.js";import{S as f}from"./swiper-bundle-856ac9ac.js";class g{constructor(s){this.element=document.querySelector(s)}render(s){let a="";s.image.forEach(n=>{a+=`
            <div class="swiper-slide overflow-hidden rounded">
                <img class="image-slide" src="${n||"https://fakeimg.pl/451x451/?text=🍰&font=noto"}" alt="${s.name}">
            </div>`}),this.element.innerHTML=a,this.clickEvent()}clickEvent(){this.element.addEventListener("click",({target:s})=>{s.nodeName==="IMG"&&this.show(s.src)})}show(s){document.querySelector("#current-image").setAttribute("src",s)}}const{VITE_APP_SITE:c}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},d=location.href.split("?id=").pop(),h=document.querySelector("#product");(async function(){var t;try{const s=await o.get(`${c}/products/${d}`),a=(t=JSON.parse(localStorage.getItem("userData")))==null?void 0:t.id;let n;a&&(n=!!(await o.get(`${c}/users/${a}/collects`)).data.find(e=>e.productId==d)),w(s.data,n)}catch(s){console.log(s)}})();function w(t,s){h.innerHTML=`
    <div class="d-flex flex-column gap-6">
        <div class="row">
            <div class="col-md-5 mb-md-0 mb-6">
                <div class="position-relative mb-6">
                    <img id="current-image"
                         class="rounded w-100"
                         src="${t.image[0]||"https://fakeimg.pl/451x451/?text=🍰&font=noto"}" alt="${t.name}">
                    ${t.forSale?"":`
                    <div class="custom-tooltip w-100 h-100 position-absolute top-0 d-flex justify-content-center align-items-center">
                        <div class="text-center">
                            <h3 class="display-4 fw-bold mb-9">已售完</h3>
                            <p>原料不足或非供應期間，本商品目前尚無法購買<br>敬請見諒</p>
                        </div>
                    </div>`}
                </div>
                <div class="swiper product-swiper">
                    <div class="swiper-wrapper"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="h-100 d-flex flex-column justify-content-between border rounded p-md-9 p-6">
                    <div>
                        <h2 class="d-flex justify-content-between mb-4">
                            ${t.name}
                            <button id="favorite" data-num="${t.id}" class="btn p-0 text-orange">
                                <span class="material-icons fs-2">${s?"favorite":"favorite_outline"}</span>
                            </button>
                        </h2>
                        <p class="text-muted fs-7 mb-6">${t.otherName}</p>
                        <h3 class="mb-6">NT＄${t.price}</h3>
                        <hr>
                        <p class="fs-6 my-6">${t.info}</p>
                        <p class="text-orange fw-bold d-flex align-items-center mb-md-0 mb-6">
                            <span class="material-icons me-2">info</span>
                            下單前務必詳閱<a class="link-orange" href="#nav-delivery-tab">寄送說明</a>
                        </p>
                    </div>
                    <div id="quantity" class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <button class="btn p-0"><span class="material-icons fs-2 mt-1">add_circle</span></button>
                            <input class="form-control p-2 text-center" type="number" min="1" max="10" value="1">
                            <button class="btn p-0"><span class="material-icons fs-2 mt-1">remove_circle</span></button>
                        </div>
                        <button class="btn btn-sm btn-primary"
                                ${t.forSale?"":"disabled"}>加入購物車</button>
                    </div>
                </div>
            </div>
        </div>
        <nav>
            <div class="nav nav-tabs fw-bold" id="nav-tab" role="tablist">
                <button class="nav-link active d-flex align-items-center"
                        id="nav-product-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-product"
                        type="button"
                        role="tab"
                        aria-controls="nav-product"
                        aria-selected="true">
                        <span class="material-icons me-2">auto_awesome</span>
                        商品詳細</button>
                <button class="nav-link d-flex align-items-center"
                        id="nav-delivery-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-delivery"
                        type="button"
                        role="tab"
                        aria-controls="nav-delivery"
                        aria-selected="false">
                        <span class="material-icons me-2">info</span>
                        寄送說明</button>
            </div>
        </nav>
        <div class="tab-content mb-13" id="nav-tabContent">
            <div id="nav-product"
                 class="tab-pane fade show active"
                 role="tabpanel"
                 aria-labelledby="nav-product-tab"
                 tabindex="0">
            <ul>
                <li class="mb-6"><span class="fw-bold">成分：</span>${t.ingredients.join("、")}</li>
                <li class="mb-6"><span class="fw-bold">規格：</span>${t.size}</li>
                <li class="mb-6"><span class="fw-bold">賞味期限：</span>${t.shelfLife}</li>
            </ul>
            </div>
            <div id="nav-delivery"
                 class="tab-pane fade"
                 role="tabpanel"
                 aria-labelledby="nav-delivery-tab"
                 tabindex="0">
                 <div class="lh-lg">
                 <p class="mb-6">
                 本店的宅配業務委由<span class="text-orange">橘貓宅急便</span>協助進行。
                 <br>
                 蛋糕在配送的過程中，可能會遇上路況不穩、貨量龐大使宅配車暫時熄火等情況，造成車體劇烈晃動、冰櫃溫度流失，進而導致蛋糕結構變形或受損。
                 <br>
                 我們將根據商品種類採用最穩定的包裝方法，宅配司機也將運用他們的專業技術盡全力避免這樣的情況發生，
                 <br>
                 但是我們仍然<span class="text-orange">無法百分之百保證</span>每次出貨都能完好無損，敬請見諒。
                 </p>
                 <p>
                 <span class="fw-bold">下單前務必確保願意承擔宅配蛋糕的風險，如果您無法接受，請選擇來店取貨。</span>
                 <br>
                 希望大家能夠體諒司機們的辛勞，謝謝您的友善與尊重讓這個世界變得更美好。(*´ω\`)人(´ω\`*)
                 </p>
                 </div>
            </div>
        </div>
    </div>
    `,new f(".product-swiper",{slidesPerView:3,spaceBetween:8,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),new g(".swiper-wrapper").render(t);const n=document.querySelector("#favorite");$(n);const i=document.querySelector("#quantity");y(i,t)}function $(t,s){t.addEventListener("click",()=>{if(!v())l("warning","請先登入");else{const a=document.querySelector(`#${t.id} .material-icons`),n=JSON.parse(localStorage.getItem("userData")).id,i=localStorage.getItem("token");if(a.textContent=="favorite_outline"){const e={productId:Number(d),userId:n};o.post(`${c}/640/collects`,e,{headers:{authorization:`Bearer ${i}`}}).then(r=>{a.textContent="favorite",l("success","已成功收藏")}).catch(r=>{p(r)})}else a.textContent=="favorite"&&o.get(`${c}/users/${n}/collects`).then(e=>{const{data:r}=e,u=r.find(b=>b.productId==d).id;return o.delete(`${c}/640/collects/${u}`,{headers:{authorization:`Bearer ${i}`}})}).then(e=>{a.textContent="favorite_outline",l("success","已取消收藏")}).catch(e=>{p(e)})}},!1)}function y(t,s){t.addEventListener("click",function(a){const{nodeName:n,textContent:i}=a.target;if(!(n!=="BUTTON"&&n!=="SPAN")){let r=function(u){return isNaN(u)?(l("warning","請輸入阿拉伯數字"),e.value=1,!1):!Number.isInteger(u)||u<=0?(l("warning","請輸入大於零的正整數"),e.value=1,!1):!0};const e=document.querySelector(`#${t.id} input`);i.includes("add")?e.value<10?e.value++:e.value:i.includes("remove")?e.value>1?e.value--:e.value:i==="加入購物車"&&(v()||l("warning","請先登入"),r(Number(e.value))&&x(s,Number(e.value)))}})}function x(t,s){const a=JSON.parse(localStorage.getItem("userData")).id,n=v();o.get(`${c}/640/users/${a}/carts`,{headers:{authorization:`Bearer ${n}`}}).then(i=>{let e=i.data.find(r=>r.productId==d);if(e){const r=e.qty+s;return r>10?void 0:(e={...e,qty:r},o.patch(`${c}/640/carts/${e.id}`,e,{headers:{authorization:`Bearer ${n}`}}))}else{if(s>10)return;const r={productId:d,qty:s,userId:a};return o.post(`${c}/640/carts`,r,{headers:{authorization:`Bearer ${n}`}})}}).then(i=>{i?l("success","成功加入購物車"):m("數量達上限","如果需要大量訂購，請直接與我們聯絡")}).catch(i=>{p(i)})}
