import{a as o,g as p,t as l,e as v,w as b}from"./main-e513b98b.js";import{S as m}from"./swiper-bundle-856ac9ac.js";class f{constructor(s){this.element=document.querySelector(s),this.clickEventListener()}render(s){let n="";s.image.forEach(i=>{n+=`
            <div class="swiper-slide overflow-hidden rounded">
                <img class="image-slide" src="${i||"https://fakeimg.pl/451x451/?text=🍰&font=noto"}" alt="${s.name}">
            </div>`}),this.element.innerHTML=n}clickEventListener(){this.element.addEventListener("click",({target:s})=>{s.nodeName==="IMG"&&this.show(s.src)})}show(s){document.querySelector("#current-image").setAttribute("src",s)}}const{VITE_APP_SITE:c}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},d=location.href.split("?id=").pop(),g=document.querySelector("#product");(async function(){var e;try{const s=await o.get(`${c}/products/${d}`),n=(e=JSON.parse(localStorage.getItem("userData")))==null?void 0:e.id;let i;n&&(i=!!(await o.get(`${c}/users/${n}/collects`)).data.find(t=>t.productId==d)),h(s.data,i)}catch(s){console.log(s)}})();function h(e,s){g.innerHTML=`
    <div class="d-flex flex-column gap-6">
        <div class="row">
            <div class="col-md-5 mb-md-0 mb-6">
                <div class="position-relative mb-6">
                    <img id="current-image"
                         class="rounded w-100"
                         src="${e.image[0]||"https://fakeimg.pl/451x451/?text=🍰&font=noto"}" alt="${e.name}">
                    ${e.forSale?"":`
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
                            ${e.name}
                            <button id="favorite" data-num="${e.id}" class="btn p-0 text-orange">
                                <span class="material-icons fs-2">${s?"favorite":"favorite_outline"}</span>
                            </button>
                        </h2>
                        <p class="text-muted fs-7 mb-6">${e.otherName}</p>
                        <h3 class="mb-6">NT＄${e.price}</h3>
                        <hr>
                        <p class="fs-6 my-6">${e.info}</p>
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
                                ${e.forSale?"":"disabled"}>加入購物車</button>
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
                <li class="mb-6"><span class="fw-bold">成分：</span>${e.ingredients.join("、")}</li>
                <li class="mb-6"><span class="fw-bold">規格：</span>${e.size}</li>
                <li class="mb-6"><span class="fw-bold">賞味期限：</span>${e.shelfLife}</li>
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
    `,new m(".product-swiper",{slidesPerView:3,spaceBetween:8,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),new f(".swiper-wrapper").render(e);const i=document.querySelector("#favorite");w(i);const a=document.querySelector("#quantity");$(a,e)}function w(e,s){e.addEventListener("click",()=>{if(!p())l("warning","請先登入");else{const n=document.querySelector(`#${e.id} .material-icons`),i=JSON.parse(localStorage.getItem("userData")).id;if(n.textContent=="favorite_outline"){const a={productId:Number(d),userId:i};o.post(`${c}/640/collects`,a,{headers:{authorization:`Bearer ${p()}`}}).then(t=>{n.textContent="favorite",l("success","已成功收藏")}).catch(t=>{v(t)})}else n.textContent=="favorite"&&o.get(`${c}/users/${i}/collects`).then(a=>{const{data:t}=a,r=t.find(u=>u.productId==d).id;return o.delete(`${c}/640/collects/${r}`,{headers:{authorization:`Bearer ${p()}`}})}).then(a=>{n.textContent="favorite_outline",l("success","已取消收藏")}).catch(a=>{v(a)})}},!1)}function $(e,s){e.addEventListener("click",function(n){const{nodeName:i,textContent:a}=n.target;if(!(i!=="BUTTON"&&i!=="SPAN")){let r=function(u){return isNaN(u)?(l("warning","請輸入阿拉伯數字"),t.value=1,!1):!Number.isInteger(u)||u<=0?(l("warning","請輸入大於零的正整數"),t.value=1,!1):!0};const t=document.querySelector(`#${e.id} input`);a.includes("add")?t.value<10?t.value++:t.value:a.includes("remove")?t.value>1?t.value--:t.value:a==="加入購物車"&&(p()||l("warning","請先登入"),r(Number(t.value))&&y(s,Number(t.value)))}})}function y(e,s){const n=JSON.parse(localStorage.getItem("userData")).id,i=p();o.get(`${c}/640/users/${n}/carts`,{headers:{authorization:`Bearer ${i}`}}).then(a=>{let t=a.data.find(r=>r.productId==d);if(t){const r=t.qty+s;return r>10?void 0:(t={...t,qty:r},o.patch(`${c}/640/carts/${t.id}`,t,{headers:{authorization:`Bearer ${i}`}}))}else{if(s>10)return;const r={productId:d,qty:s,userId:n};return o.post(`${c}/640/carts`,r,{headers:{authorization:`Bearer ${i}`}})}}).then(a=>{a?l("success","成功加入購物車"):b("數量達上限","如果需要大量訂購，請直接與我們聯絡")}).catch(a=>{v(a)})}
