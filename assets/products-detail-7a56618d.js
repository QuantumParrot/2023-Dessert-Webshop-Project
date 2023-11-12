import{a as r,g as v,t as c,e as p,w as f}from"./handleAuth-03fa9bb6.js";const{VITE_APP_SITE:l}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},u=location.href.split("?id=").pop(),m=document.querySelector("#product");(async function(){var t;try{const i=await r.get(`${l}/products/${u}`),a=(t=JSON.parse(localStorage.getItem("userData")))==null?void 0:t.id;let n;a&&(n=!!(await r.get(`${l}/users/${a}/collects`)).data.find(e=>e.content.id==u)),g(i.data,n)}catch(i){console.log(i)}})();function g(t,i){let{image:a}=t;a=a.map(e=>`
    <div class="swiper-slide">
        <img class="rounded w-100" src="${e||"https://fakeimg.pl/451x451/?text=🍰&font=noto"}" alt="${t.name}">
    </div>`).join(""),m.innerHTML=`
    <div class="d-flex flex-column gap-6">
        <div class="row">
            <div class="col-md-5 mb-md-0 mb-6">
                <div class="swiper product-swiper">
                    <div class="swiper-wrapper">${a}</div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="h-100 d-flex flex-column justify-content-between border rounded p-md-9 p-6">
                    <div>
                        <h2 class="d-flex justify-content-between mb-4">
                            ${t.name}
                            <button id="favorite" data-num="${t.id}" class="btn p-0 text-orange">
                                <span class="material-icons fs-2">${i?"favorite":"favorite_outline"}</span>
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
                    <div id="quantity" class="d-flex justify-content-between">
                        <div class="d-flex align-items-center gap-3">
                            <button class="btn p-0"><span class="material-icons fs-2 mt-1">add_circle</span></button>
                            <input class="form-control p-2 text-center" type="number" min="1" max="10" value="1">
                            <button class="btn p-0"><span class="material-icons fs-2 mt-1">remove_circle</span></button>
                        </div>
                        <button class="btn btn-sm btn-primary">加入購物車</button>
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
    `;const n=document.querySelector("#favorite");h(n,t);const s=document.querySelector("#quantity");$(s,t)}function h(t,i){t.addEventListener("click",()=>{if(!v())c("warning","請先登入");else{const a=document.querySelector(`#${t.id} .material-icons`),n=JSON.parse(localStorage.getItem("userData")).id,s=localStorage.getItem("token");if(a.textContent=="favorite_outline"){const e={content:i,userId:n};r.post(`${l}/640/collects`,e,{headers:{authorization:`Bearer ${s}`}}).then(o=>{a.textContent="favorite",c("success","已成功收藏")}).catch(o=>{p(o)})}else a.textContent=="favorite"&&r.get(`${l}/users/${n}/collects`).then(e=>{const{data:o}=e,d=o.find(b=>b.content.id==u).id;return r.delete(`${l}/640/collects/${d}`,{headers:{authorization:`Bearer ${s}`}})}).then(e=>{a.textContent="favorite_outline",c("success","已取消收藏")}).catch(e=>{p(e)})}},!1)}function $(t,i){t.addEventListener("click",function(a){const{nodeName:n,textContent:s}=a.target;if(!(n!=="BUTTON"&&n!=="SPAN")){let o=function(d){return isNaN(d)?(c("warning","請輸入阿拉伯數字"),e.value=1,!1):!Number.isInteger(d)||d<=0?(c("warning","請輸入大於零的正整數"),e.value=1,!1):!0};const e=document.querySelector(`#${t.id} input`);s.includes("add")?e.value<10?e.value++:e.value:s.includes("remove")?e.value>1?e.value--:e.value:s==="加入購物車"&&(v()||c("warning","請先登入"),o(Number(e.value))&&y(i,Number(e.value)))}})}function y(t,i){const a=localStorage.getItem("token"),n=JSON.parse(localStorage.getItem("userData")).id;r.get(`${l}/640/users/${n}/carts`,{headers:{authorization:`Bearer ${a}`}}).then(s=>{let e=s.data.find(o=>o.content.id==u);if(e){const o=e.qty+i;return o>10?void 0:(e={...e,qty:o},r.patch(`${l}/640/carts/${e.id}`,e,{headers:{authorization:`Bearer ${a}`}}))}else{const o={content:t,qty:1,userId:n};return r.post(`${l}/640/carts`,o,{headers:{authorization:`Bearer ${a}`}})}}).then(s=>{s?c("success","成功加入購物車"):f("數量達上限","如果需要大量訂購，請直接與我們聯絡")}).catch(s=>{p(s)})}
