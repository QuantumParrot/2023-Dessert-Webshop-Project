import{a as r,h as o,e as u,b,t as c,w as f,c as g}from"./main-1409e29d.js";import{S as w}from"./swiper-bundle-4fd7d588.js";class h{constructor(t){this.element=document.querySelector(t),this.clickEventListener()}render(t){let s="";t.image.forEach(e=>{s+=`
            <div class="swiper-slide overflow-hidden rounded">
                <img class="image-slide" src="${e||"https://fakeimg.pl/451x451/?text=🍰&font=noto"}" alt="${t.name}">
            </div>`}),this.element.innerHTML=s}clickEventListener(){this.element.addEventListener("click",({target:t})=>{t.nodeName==="IMG"&&this.show(t.src)})}show(t){document.querySelector("#current-image").setAttribute("src",t)}}const{VITE_APP_SITE:l}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},d=location.href.split("?id=").pop();let i={};(async function(){var a;try{i=(await r.get(`${l}/products/${d}`)).data;const s=(a=JSON.parse(localStorage.getItem("userData")))==null?void 0:a.id;let e;s&&(e=!!(await r.get(`${l}/600/users/${s}/collects`,o)).data.find(p=>p.productId==d)),v(e)}catch(t){u(t)}})();const y=document.querySelector("#product");function v(a){y.innerHTML=`
    <div class="d-flex flex-column gap-6">
        <div class="row">
            <div class="col-md-5 mb-md-0 mb-6">
                <div class="position-relative mb-6">
                    <img id="current-image"
                         class="rounded w-100"
                         src="${i.image[0]||"https://fakeimg.pl/451x451/?text=🍰&font=noto"}" alt="${i.name}">
                    ${i.forSale?"":`
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
                            ${i.name}
                            <button id="favorite" class="btn p-0 text-orange">
                                <span class="material-icons fs-2">${a?"favorite":"favorite_outline"}</span>
                            </button>
                        </h2>
                        <p class="text-muted fs-7 mb-6">${i.otherName}</p>
                        <h3 class="mb-6">NT＄${i.price}</h3>
                        <hr>
                        <p class="fs-6 my-6">${i.info}</p>
                        <p class="text-orange fw-bold d-flex align-items-center mb-md-0 mb-6">
                            <span class="material-icons fs-2 me-2">info</span>
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
                                ${i.forSale?"":"disabled"}>加入購物車</button>
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
                <li class="mb-6"><span class="fw-bold">成分：</span>${i.ingredients.join("、")}</li>
                <li class="mb-6"><span class="fw-bold">規格：</span>${i.size}</li>
                <li class="mb-6"><span class="fw-bold">賞味期限：</span>${i.shelfLife}</li>
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
                 希望大家能夠體諒司機們的辛勞，謝謝您的友善與尊重讓這個世界變得更美好！
                 </p>
                 </div>
            </div>
        </div>
    </div>
    `,new w(".product-swiper",{slidesPerView:3,spaceBetween:8,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),new h(".swiper-wrapper").render(i),document.querySelector("#favorite").addEventListener("click",n=>{x(a)}),document.querySelector("#quantity").addEventListener("click",$)}function x(a){if(!b())c("warning","請先登入");else{const s=JSON.parse(localStorage.getItem("userData")).id;if(a)r.get(`${l}/600/users/${s}/collects`,o).then(e=>{const{data:n}=e,p=n.find(m=>m.productId==d).id;return r.delete(`${l}/640/collects/${p}`,o)}).then(e=>{v(!a),c("success","已取消收藏")}).catch(e=>{u(e)});else{const e={productId:Number(d),userId:s};r.post(`${l}/600/collects`,e,o).then(n=>{v(!a),c("success","已成功收藏")}).catch(n=>{u(n)})}}}function $(a){if(!a.target.closest("button"))return;const{textContent:t}=a.target;function s(n){if(isNaN(n)){c("warning","請輸入阿拉伯數字"),e.value=1;return}else if(!Number.isInteger(n)||n<=0){c("warning","請輸入大於零的正整數"),e.value=1;return}return!0}let e=document.querySelector("#quantity input");t.includes("add")?e.value<10?e.value++:e.value:t.includes("remove")?e.value>=2?e.value--:e.value:t==="加入購物車"&&(b()?s(Number(e.value))&&I(Number(e.value)):c("warning","請先登入"))}function I(a){const t=JSON.parse(localStorage.getItem("userData")).id;r.get(`${l}/600/users/${t}/carts`,o).then(s=>{let e=s.data.find(n=>n.productId==d);if(e){const n=e.qty+a;return n>10?void 0:r.patch(`${l}/600/carts/${e.id}`,{qty:n},o)}else return a>10?void 0:(e={productId:Number(d),qty:a,userId:t},r.post(`${l}/600/carts`,e,o))}).then(s=>{s?c("success","成功加入購物車"):f("數量達上限","如果需要大量訂購，請直接與我們聯絡"),g()}).catch(s=>{u(s)})}
