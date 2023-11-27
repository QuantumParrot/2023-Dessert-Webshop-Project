import axios from "axios";

import { toastMessage, warningMessage } from "./utilities/message.js";
import { getToken, errorHandle } from "./utilities/authorization.js";
import { ImageDisplay } from "./components/ImageDisplay.js";

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

// import { rollupVersion } from "vite"; // 不知道為何載入這個會跳錯，先保留起來日後研究

const { VITE_APP_SITE } = import.meta.env;

const id = location.href.split('?id=').pop();

const product = document.querySelector('#product');

(async function(){
    try {
        const res = await axios.get(`${VITE_APP_SITE}/products/${id}`);
        const userId = JSON.parse(localStorage.getItem("userData"))?.id;
        let isCollected;
        if (userId) {
            const response = await axios.get(`${VITE_APP_SITE}/users/${userId}/collects`);
            isCollected = !!(response.data.find(collect => collect.productId == id));
        };
        renderData(res.data, isCollected);
    } catch(error) {
        console.log(error);
    }
})();

function renderData(data, isCollected) {

    product.innerHTML = /*html*/`
    <div class="d-flex flex-column gap-6">
        <div class="row">
            <div class="col-md-5 mb-md-0 mb-6">
                <div class="position-relative mb-6">
                    <img id="current-image"
                         class="rounded w-100"
                         src="${data.image[0] || `https://fakeimg.pl/451x451/?text=🍰&font=noto`}" alt="${data.name}">
                    ${data.forSale ? "" : /*html*/`
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
                            ${data.name}
                            <button id="favorite" data-num="${data.id}" class="btn p-0 text-orange">
                                <span class="material-icons fs-2">${isCollected ? "favorite" : "favorite_outline"}</span>
                            </button>
                        </h2>
                        <p class="text-muted fs-7 mb-6">${data.otherName}</p>
                        <h3 class="mb-6">NT＄${data.price}</h3>
                        <hr>
                        <p class="fs-6 my-6">${data.info}</p>
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
                                ${data.forSale ? "" : "disabled"}>加入購物車</button>
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
                <li class="mb-6"><span class="fw-bold">成分：</span>${data.ingredients.join('、')}</li>
                <li class="mb-6"><span class="fw-bold">規格：</span>${data.size}</li>
                <li class="mb-6"><span class="fw-bold">賞味期限：</span>${data.shelfLife}</li>
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
                 希望大家能夠體諒司機們的辛勞，謝謝您的友善與尊重讓這個世界變得更美好。${"(*´ω`)人(´ω`*)"}
                 </p>
                 </div>
            </div>
        </div>
    </div>
    `;

    const swiper = new Swiper('.product-swiper', {
        slidesPerView: 3,
        spaceBetween: 8,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // 渲染圖片

    const images = new ImageDisplay('.swiper-wrapper');
    images.render(data);

    const favoriteButton = document.querySelector('#favorite');
    toggleStatus(favoriteButton, data);

    const quantity = document.querySelector('#quantity');
    changeQty(quantity, data);

};

function toggleStatus(element, data) {
    element.addEventListener('click',()=>{
        if (!getToken()) { toastMessage('warning','請先登入') }
        else {
            
            // 取得收藏按鈕下的愛心圖案 <span class="material-icons">...</span>

            const icon = document.querySelector(`#${element.id} .material-icons`)

            // 取得使用者個人資料

            const userId = JSON.parse(localStorage.getItem("userData")).id;

            // 從 icon 樣式判斷該商品是否已被收藏，沒有則加入，有則取消

            if (icon.textContent == 'favorite_outline') {

                const product = { productId: Number(id), userId };

                axios.post(`${VITE_APP_SITE}/640/collects`, product, {
                    headers: {
                        "authorization": `Bearer ${getToken()}`
                    }
                })
                .then((res)=>{
                    icon.textContent = 'favorite';
                    toastMessage('success', '已成功收藏');
                })
                .catch((error)=>{ errorHandle(error) })

            } else if (icon.textContent == 'favorite') {

                axios.get(`${VITE_APP_SITE}/users/${userId}/collects`)
                .then((res)=>{
                    const { data } = res;
                    const targetId = data.find(collect => collect.productId == id).id;
                    return axios.delete(`${VITE_APP_SITE}/640/collects/${targetId}`, {
                        headers: {
                            "authorization": `Bearer ${getToken()}`
                        }
                    })
                })
                .then((res)=>{
                    icon.textContent = 'favorite_outline';
                    toastMessage('success', '已取消收藏');
                })
                .catch((error)=>{ errorHandle(error) })

            }
        }
    },false)
}

function changeQty(element, data) {
    element.addEventListener('click', function(e){
        const { nodeName, textContent } = e.target;
        if (nodeName !== 'BUTTON' && nodeName !== 'SPAN') { return }
        else {

            const qty = document.querySelector(`#${element.id} input`);

            function checkValue(value) {
                if (isNaN(value)) {
                    toastMessage('warning','請輸入阿拉伯數字');
                    qty.value = 1;
                    return false;
                } else if (!Number.isInteger(value) || value <= 0) {
                    toastMessage('warning','請輸入大於零的正整數');
                    qty.value = 1;
                    return false;
                }
                return true;
            }
            
            if (textContent.includes('add')) {
                qty.value < 10 ? qty.value++ : qty.value
            } else if (textContent.includes('remove')) {
                qty.value > 1 ? qty.value-- : qty.value
            } else if (textContent === '加入購物車') {
                if (!getToken()) { toastMessage('warning','請先登入') }
                checkValue(Number(qty.value)) && addToCart(data, Number(qty.value));
            }
        }
    })
}

function addToCart(data, value) {

    // 取得使用者個人資料

    const userId = JSON.parse(localStorage.getItem('userData')).id;
    const token = getToken();

    // 取得使用者當前的購物車資料

    axios.get(`${VITE_APP_SITE}/640/users/${userId}/carts`, {
        headers : {
            "authorization": `Bearer ${token}`
        }
    })
    .then((res)=>{

        let product = res.data.find(item => item.productId == id);

        // 確認購物車有無同樣的商品 => 有的話下一個階段 patch 沒有的話下一個階段 post

        // post => 建立一筆新的物件資料，補上屬性 qty: 1

        // patch => 要注意是否超過單品訂購上限，如果加總起來超過，就無法再加入購物車
        //          回傳空值，讓下一個階段可以判斷跳出哪一種提示訊息

        if (!product) {
            if (value > 10) { return }
            const product = { productId: id, qty: value, userId };
            return axios.post(`${VITE_APP_SITE}/640/carts`, product, {
                headers : {
                    "authorization": `Bearer ${token}`
                }
            })
        } else {
            const total = product.qty + value;
            if (total > 10) { return }
            else {
                product = { ...product, qty: total};
                return axios.patch(`${VITE_APP_SITE}/640/carts/${product.id}`, product, {
                    headers : {
                        "authorization": `Bearer ${token}`
                    }
                })
            }
        }
    })
    .then((res)=>{
        res ? toastMessage('success','成功加入購物車') : warningMessage('數量達上限','如果需要大量訂購，請直接與我們聯絡');
    })
    .catch((error)=>{ errorHandle(error) })

}