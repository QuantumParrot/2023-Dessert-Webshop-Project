import axios from "axios";

import Tab from "bootstrap/js/dist/tab.js";
import { getToken, errorHandle } from "./utilities/authorization.js";
import { toastMessage } from "./utilities/message.js";

const { VITE_APP_SITE } = import.meta.env;

// init

function init() {
    
    if (!getToken()) {
        toastMessage('warning','請先登入','login.html');
    } else {
        getData();
    }

}

init();

// hashchange

window.addEventListener('hashchange', function(){ getData() });

function getData() {

    // 如果用戶輸入的網址為 member.html 則自動呈現訂單頁面

    const hash = location.hash.replace('#','') || 'orders';

    // 觸發按鈕

    const triggerElement = document.querySelector(`#v-pills-${hash}-tab`);

    if (triggerElement) {

        const trigger = new Tab(triggerElement);
        trigger.show();
    
    }

    // 渲染資料的主要區塊

    const element = document.querySelector(`#v-pills-${hash} #${hash}-content`);

    // 取得使用者個人資料

    const userId = JSON.parse(localStorage.getItem("userData"))?.id;

    if (hash === 'orders') {
        axios.get(`${VITE_APP_SITE}/users/${userId}/orders`)
        .then((res) => {
            renderOrders(element, res.data);
        })
        .catch((error)=>{ errorHandle(error) })
    } else if (hash === 'collection') {
        axios.get(`${VITE_APP_SITE}/users/${userId}/collects`)
        .then(res => {
            renderCollection(element, res.data);
        })
        .catch((error)=>{ errorHandle(error) })
    } else if (hash === 'profile') {

    }
}

function renderOrders(element, orders) {
    let str = '';
    orders.length === 0 ? (str += /*html*/`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        目前沒有訂單記錄
        </p>
    </div>
    `) :
    orders.forEach(order => {
        str += /*html*/`
        <div class="col-12">
            <div class="accordion-item mb-6">
                <button type="button"
                        class="accordion-title w-100 btn d-flex justify-content-center align-items-center gap-md-5 gap-2 bg-white rounded-2 shadow px-md-8 py-5">
                    <p class="pe-5 border-end">
                        <span class="fw-bold">訂單</span>編號：</span>
                        <span class="text-black">${order.orderNum}</span>
                    </p>
                    <p class="d-md-inline-block d-none pe-5 border-end">
                        <span class="fw-bold">成立日期：</span>
                        <span class="fw-normal">${order.createdTime.replace(/\s(.)+/,"")}</span>
                    </p>
                    <p class="d-md-inline-block d-none pe-5 border-end">
                        <span class="fw-bold">訂購金額：</span>
                        ${order.total} 元
                    </p>
                    <p class="pe-5 ps-2">
                        <span class="d-md-inline-block d-none fw-bold">訂單狀態：</span>
                        <span class=${order.isFinished ? "text-success" : "text-danger"}>
                        ${order.isFinished ? `已完成`: `製作中`}</span>
                    </p>
                </button>
                <div class="accordion-content rounded-2 shadow">
                    <div class="px-md-8 px-6 pt-5 pb-7">
                    <div class="mb-5">
                        ${order.products.map(product => `
                        <div class="row gap-md-5 py-2 border-bottom lh-lg">
                            <div class="col-lg-3 col-12">
                                <p class="text-orange fw-bold">${product.content.name}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">數量：</span>${product.qty}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">金額：</span>${product.content.price*product.qty}</p>
                            </div>
                        </div>`
                        ).join('')}
                    </div>
                    <div class="row fs-5 fw-bold border-bottom mb-5">
                        <div class="col-12">
                            <p class="mb-5">總計：${order.total} 元</p>
                        </div>
                    </div>
                    <div class="lh-lg">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <p class="d-md-block d-none fw-bold fs-5">寄送資訊</p>
                            <p class="text-black">${order.createdTime}</p>
                        </div>
                        <p>
                        <span class="text-orange fw-bold">收件人姓名：</span>${order.info.receiver}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">收件人電話：</span>${order.info.phone}
                        </p>
                        <p class="d-md-block d-flex flex-column">
                        <span class="text-orange fw-bold">收件人地址：</span>${order.info.address}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">取貨方式：</span>${order.info.method}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">付款方式：</span>${order.info.payment}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">指定收貨時段：</span>${order.info.shippingTime}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `
    })
    element.innerHTML = str;

    $('.accordion-content').hide();
    
    $('.accordion-title').click(function(){
        $(this).siblings('.accordion-content').slideToggle();
    })
}

function renderCollection(element, productList) {

    let str = '';
    productList.length === 0 ? (str += /*html*/`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        還沒有收藏任何商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
    </div>
    `) :
    productList.forEach(({content}) => 
    str += /*html*/`
    <div class="col-md-4 col-12 mb-9">
        <a class="text-decoration-none" href="products-detail.html?id=${content.id}">
            <div class="card hover-shadow h-100 overflow-hidden mb-6">
                <img class="mb-6"
                     src="${content.image[0] || `https://fakeimg.pl/291x291/?text=🍰&font=noto`}"
                     alt="${content.name}">
                <div class="px-5">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="fs-6">${content.name}・<span class="text-muted">${content.size}</span></h4>
                            <p class="fs-7 text-orange fw-bold">NT＄${content.price}</p>
                        </div>
                        <div class="d-flex gap-3">
                            <button data-num="${content.id}" class="favorite btn btn-sm btn-outline-orange p-1">
                                <span class="material-icons d-flex">favorite</span>
                            </button>
                            <button data-num="${content.id}" class="cart btn btn-sm btn-primary p-1">
                                <span class="material-icons d-flex">shopping_bag</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `);
    element.innerHTML = str;

    // 待優化的程式碼 //

    const favorites = document.querySelectorAll('.favorite');
    favorites.forEach(favorite => { toggleStatus(favorite, productList) });

    const cartButtons = document.querySelectorAll('.cart');
    cartButtons.forEach(cartButton => { addToCart(cartButton, productList) });

}

function toggleStatus(element, data) {

    element.addEventListener('click', (e) => {

        e.preventDefault();

        const targetProduct = data.find(product => product.content.id == element.dataset.num);

        console.log(targetProduct);

        // 取得使用者個人資料

        const userId = JSON.parse(localStorage.getItem("userData")).id;
        const token = localStorage.getItem("token");

        axios.delete(`${VITE_APP_SITE}/640/collects/${targetProduct.id}`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        .then((res)=>{
            toastMessage('success',`已取消收藏${targetProduct.content.name}`);
            getData();
        })
        .catch((error)=>{ errorHandle(error) })
            
    }, false)

}

function addToCart(element, data) {
    
    element.addEventListener('click', function(e){

        e.preventDefault();

        const token = getToken();

        if (!token) { toastMessage('warning','請先登入') }
        else {

            const targetProduct = data.find(item => item.id == element.dataset.num);

            // 注意 targetProduct 的結構是 { content: {...}, userId: xx , id: xx }

            // 因為是直接從收藏清單渲染過來的，所以如果從這裡丟購物車的話，取值的邏輯和其他頁面不一樣 ( 我的資料沒設計好的關係 ... )

            const userId = JSON.parse(localStorage.getItem("userData")).id;

            axios.get(`${VITE_APP_SITE}/640/users/${userId}/carts`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            .then((res)=>{
                const { data } = res;
                let product = data.find(item => item.content.id == element.dataset.num); // 確認購物車有沒有重複品項
                if (product) {
                    if (product.qty > 9) { return } // 如果已有重複品項，確認數量是否超過
                    else {
                        product = { ...product, qty: product.qty += 1 };
                        return axios.patch(`${VITE_APP_SITE}/640/carts/${product.id}`, product, {
                            headers: {
                                "authorization": `Bearer ${token}`
                            }
                        })
                    }
                } else {
                    product = { content: targetProduct.content, qty: 1, userId }; // 如果沒有重複品項，加入它並補上數量屬性
                    delete product.content.isCollected;
                    return axios.post(`${VITE_APP_SITE}/640/carts`, product, {
                        headers: {
                            "authorization": `Bearer ${token}`
                        }
                    })
                }  
            })
            .then((res)=>{
                res ? toastMessage('success','成功加入購物車') : warningMessage('數量達上限','如果需要大量訂購，請直接與我們聯絡');
            })
            .catch((error)=>{ errorHandle(error) })
        }

    }, false)

}
