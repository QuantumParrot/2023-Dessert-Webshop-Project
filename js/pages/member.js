// 本頁面待解決問題：尚無

import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

import Tab from "bootstrap/js/dist/tab.js";

import { toastMessage, warningMessage } from "../utilities/message";
import { token, headers, errorHandle } from "../utilities/authorization";
import { changeCartIcon } from "../utilities/cart-state";

const { VITE_APP_SITE } = import.meta.env;

const userId = JSON.parse(localStorage.getItem("userData")).id;

let element = '';
let data = [];

(() => {

    'use strict';

    if (!token()) {

        toastMessage('warning','請先登入','login.html');

    } else { 
        
        const main = document.querySelector('main');
        main.classList.remove('d-none');
        main.removeAttribute('class');

        getData();
    
    }

})();

// hashchange

window.addEventListener('hashchange', () => { getData() });

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

    element = document.querySelector(`#v-pills-${hash} #${hash}-content`);

    // 取得使用者個人資料

    if (hash === 'orders') { 
        
        getOrders();
    
    } else if (hash === 'collection') {

        getCollection();

    } else if (hash === 'profile') { 

        getProfile();

    } else if (hash === 'messages') {

        getMessages();

    }

}

// 我的訂單

function getOrders() {

    axios.get(`${VITE_APP_SITE}/600/users/${userId}/orders?_sort=id&_order=desc`, headers) // 由新到舊
    .then((res) => {
        data = res.data;
        renderOrders(data);
    })
    .catch((error)=>{ errorHandle(error) })

}

function renderOrders(orders) {
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
                        class="accordion-title w-100 btn d-md-block d-flex justify-content-between
                               text-start bg-white rounded-2 shadow px-md-8 py-5">
                    <div class="mb-md-6 mb-0">
                        <span class="fw-bold">訂單編號：</span>
                        <span class="text-black">${order.orderNum}</span>
                    </div>
                    <div class="row">
                        <div class="col-3 d-md-block d-none">
                            <div>
                                <span class="fw-bold">成立日期：</span>
                                <span class="fw-normal">${moment(order.createdTime).format('YYYY-MM-DD')}</span>
                            </div>
                        </div>
                        <div class="col-4 d-md-block d-none border-start border-end">
                            <div class="d-flex justify-content-between px-7">
                                <span class="fw-bold">訂購金額：</span>
                                <span>${order.total} 元</span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="ps-md-7 ps-0">
                                <span class="d-md-inline-block d-none fw-bold">訂單狀態：</span>
                                <span class=${order.isFinished ? "text-success" : "text-danger"}>
                                ${order.isFinished ? `已完成`: `製作中`}</span>
                            </div>
                        </div>
                    </div>
                </button>
                <div class="accordion-content rounded-2 shadow">
                    <div class="px-md-8 px-6 pt-5 pb-7">
                    <div class="mb-5">
                        ${order.content.map(item => /*html*/`
                        <div class="row gap-md-5 py-2 border-bottom lh-lg">
                            <div class="col-lg-3 col-12">
                                <a target="_blank" href="products-detail.html?id=${item.product.id}" class="text-orange fw-bold">${item.product.name}</a>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">數量：</span>${item.qty}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">金額：</span>${item.product.price*item.qty}</p>
                            </div>
                        </div>`
                        ).join('')}
                    </div>
                    <div class="row fs-5 fw-bold border-bottom mb-5">
                        <div class="col-12">
                            <p class="mb-5">總計：${order.total} 元<span class="text-muted fs-7">（ 含運費 ${order.deliveryFee} 元 ）</span></p>
                        </div>
                    </div>
                    <div class="lh-lg">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <p class="d-md-block d-none fw-bold fs-5">寄送資訊</p>
                            <p class="text-black">${moment(order.createdTime).format('YYYY-MM-DD A hh:mm:ss')}</p>
                        </div>
                        <p>
                        <span class="text-orange fw-bold">收件人姓名：</span>${order.info.receiver}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">收件人電話：</span>${order.info.phone}
                        </p>
                        <p class="d-md-block d-flex flex-column">
                        <span class="text-orange fw-bold">收件人地址：</span>${order.info.address.replace(/(\d+)/, " $1 ")}
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

// 我的收藏

function getCollection() {

    axios.get(`${VITE_APP_SITE}/600/users/${userId}/collects?_expand=product`, headers)
    .then((res) => {
        data = res.data;
        renderCollection(data);
    })
    .catch((error)=>{ errorHandle(error) })

}

function renderCollection(collects) {

    let str = '';
    collects.length === 0 ? (str += /*html*/`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        還沒有收藏任何商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
    </div>
    `) :
    collects.forEach(({product}) => 
    str += /*html*/`
    <div class="col-md-4 col-12 mb-9">
        <a class="text-decoration-none" href="products-detail.html?id=${product.id}">
            <div class="card hover-shadow h-100 overflow-hidden mb-6">
                <div class="position-relative mb-6">
                    <img class="w-100"
                         src="${product.image[0] || `https://fakeimg.pl/291x291/?text=🍰&font=noto`}"
                         alt="${product.name}">
                    ${product.forSale ? '' : /*html*/`
                    <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center" style="backdrop-filter: brightness(70%)">
                        <h3 class="custom-tooltip w-100 text-center py-5">已售完</h3>
                    </div>`}
                </div>
                <div class="px-5">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="fs-6">${product.name}・<span class="text-muted">${product.size}</span></h4>
                            <p class="fs-7 text-orange fw-bold">NT＄${product.price}</p>
                        </div>
                        <div class="d-flex gap-3">
                            <button data-id="${product.id}" class="favorite btn btn-sm btn-outline-orange p-1">
                                <span class="material-icons d-flex">favorite</span>
                            </button>
                            <button data-id="${product.id}" class="cart btn btn-sm btn-primary p-1 ${product.forSale ? '' : 'disabled'}">
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

    const favoriteButtons = document.querySelectorAll('.favorite');
    favoriteButtons.forEach(button => button.addEventListener('click', toggleStatus));

    const cartButtons = document.querySelectorAll('.cart');
    cartButtons.forEach(button => button.addEventListener('click', addToCart));

}

function toggleStatus(e) {

    e.preventDefault();

    const id = e.target.closest('button').dataset.id;
    const collect = data.find(item => item.productId == id);

    axios.delete(`${VITE_APP_SITE}/600/collects/${collect.id}`, headers)
    .then((res)=>{
        toastMessage('success',`已取消收藏${collect.product.name}`);
        getData();
    })
    .catch((error)=>{ errorHandle(error) })

}

function addToCart(e) {

    e.preventDefault();

    const id = e.target.closest('button').dataset.id;
    const userId = JSON.parse(localStorage.getItem("userData")).id;

    axios.get(`${VITE_APP_SITE}/600/users/${userId}/carts`, headers)
    .then((res)=>{
        let product = res.data.find(item => item.productId == id); // 確認購物車有沒有重複品項
        if (product) {
            if (product.qty > 9) { return } // 如果已有重複品項，確認數量是否超過
            else {
                return axios.patch(`${VITE_APP_SITE}/600/carts/${product.id}`, { qty: product.qty += 1 }, headers)
            }
        } else {
            product = { productId: Number(id), qty: 1, userId }; // 如果沒有重複品項，加入它並補上數量屬性
            return axios.post(`${VITE_APP_SITE}/600/carts`, product, headers)
        }  
    })
    .then((res)=>{
        res ? toastMessage('success','成功加入購物車') : warningMessage('數量達上限','如果需要大量訂購，請直接與我們聯絡');
        changeCartIcon();
    })
    .catch((error)=>{ errorHandle(error) })
    
}

// 會員資料

function getProfile() {

    axios.get(`${VITE_APP_SITE}/600/users/${userId}`, headers)
    .then((res) => {
        data = res.data;
        renderProfile(data);
        return getDeliveryInfo();
    })
    .catch((error)=>{ errorHandle(error) })

}

function getDeliveryInfo() {

    axios.get(`${VITE_APP_SITE}/600/users/${userId}/deliveryInfos`, headers)
    .then((res) => {
        renderDeliveryInfo(res.data);
    })
    .catch((error)=>{ errorHandle(error) })

}

function renderProfile(userData) {    

    let str = '';

    // 1. 修改會員資料
    
    str += /*html*/`
    <div class="col-12">
        <h4 class="mb-8">修改會員資料</h4>
        <form id="profile-form" class="bg-secondary rounded-1 px-6 py-7">
            <div class="d-flex flex-column gap-7">
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-md-6 gap-4">
                    <div class="d-flex align-items-center gap-6">
                        <label for="name" class="fw-bold mb-0">名字</label>
                        <div class="flex-grow-1">
                        <input id="name"
                               type="text"
                               class="form-control p-2 border-secondary"
                               name="name"
                               value="${userData.name}"
                               disabled>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-primary py-1"
                                data-target="name">修改</button>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-md-6 gap-4">
                    <div class="d-flex align-items-center gap-6">
                        <label for="phone" class="fw-bold">手機</label>
                        <div class="flex-grow-1">
                        <input id="phone"
                               type="tel"
                               class="form-control p-2 border-secondary"
                               name="phone"
                               value="${userData.phone}"
                               disabled>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-primary py-1"
                                data-target="phone">修改</button>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-md-6 gap-4">
                    <div class="d-flex align-items-center gap-6">
                        <label for="password" class="fw-bold mb-0">密碼</label>
                        <div class="flex-grow-1">
                        <input id="password"
                               type="password"
                               class="form-control p-2 border-secondary"
                               name="password"
                               value="${"*".repeat(10)}"
                               autocomplete disabled>
                        </div>
                    </div>
                    <div>
                        <button type="button"
                                class="btn btn-sm btn-primary py-1"
                                data-target="password"
                                data-bs-toggle="modal"
                                data-bs-target="#changePasswordModal">修改</button>
                    </div>
                    <p class="form-text mt-0">密碼長度僅為示意，非真實長度</p>
                </div>
            </div>
        </form>
    </div>
    `;

    // 2. 儲存寄送資訊

    str += /*html*/`
    <div class="col-12">
        <h4 class="d-flex align-items-center gap-5 mb-8">儲存寄送資訊</h4>
        <ul class="list-unstyled bg-white border border-primary rounded-2 px-6 py-7 shadow mb-8">
            <li class="fw-bold mb-3">儲存常用地址，加速結帳流程！</li>
            <li class="text-muted">註：考慮到商品特性，暫不提供離島及海外寄送服務，敬請見諒。</li>
        </ul>
        <form id="delivery-form" class="bg-secondary rounded-1 px-6 py-7 mb-8">
            <div class="d-flex flex-column gap-7">
                <!-- 會員住址 -->
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-4">
                    <label for="receiver-address" class="fw-bold">收件人地址</label>
                    <input id="receiver-address"
                           type="text"
                           class="form-control w-50 p-2 border-secondary"
                           name="address">
                    <div>
                        <button type="submit" class="btn btn-sm btn-primary">儲存</button>
                    </div>
                </div>
            </div>
        </form>
        <div class="bg-white border border-primary rounded-2 px-6 py-7 shadow">
            <h5 class="fs-5 mb-7">已儲存的地址</h5>
            <ul id="address-list" class="list-unstyled d-flex flex-column gap-3 mb-0"></ul>
        </div>
    </div>
    `;

    element.innerHTML = str;

    const profileForm = document.querySelector('#profile-form');
    profileForm.addEventListener('click', changeProfile);

    const changePasswordform = document.querySelector('#change-password-form');
    changePasswordform.addEventListener('submit', changePassword);

    const deliveryForm = document.querySelector('#delivery-form');
    deliveryForm.addEventListener('submit', checkDeliveryInfo);

}

// 修改會員資料

function changeProfile(e) {

    e.preventDefault();

    const { nodeName } = e.target;
        
    if (nodeName === 'BUTTON') {

        const target = e.target.dataset.target;
        const input = document.querySelector(`#profile-form input[name="${target}"]`);

        if (target !== 'password' && e.target.textContent === '修改') {

            input.removeAttribute('disabled');
            e.target.textContent = '送出';

        } else if (e.target.textContent === '送出') {

            checkContent(input) && input.value !== data[input.name] &&

            Swal.fire({
                icon: 'warning',
                title: '確定修改資料？',
                text: `您的${input.name === 'name' ? '名字' : '手機'}將改為：${input.value}`,
                /* cancel */
                showCancelButton: true,
                cancelButtonColor: '#D1741F',
                cancelButtonText: '取消',
                /* deal with AJAX */
                confirmButtonColor: '#A37A64',
                confirmButtonText: '確定',
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                    try {

                        const userInfo = { [input.name]: input.value };

                        e.target.setAttribute('disabled', true);
                        const res = await axios.patch(`${VITE_APP_SITE}/660/users/${data.id}`, userInfo, headers);

                        e.target.removeAttribute('disabled');
                        toastMessage('success','修改完成！');
                        localStorage.setItem('userData', JSON.stringify(res.data));
                        getData();

                    } catch (error) { errorHandle(error) }
                }
            })
            .then((result) => {
                input.setAttribute('disabled', true);
                input.value = data[input.name];
                e.target.textContent = '修改';
            })

        }

    } else if (nodeName !== 'BUTTON' && nodeName !== 'INPUT') { 
        
        document.querySelectorAll('#profile-form input')
        .forEach(input => input.setAttribute('disabled', true));

        document.querySelectorAll('#profile-form button')
        .forEach(button => button.textContent = '修改');
    
    }

}

// 修改會員密碼

function changePassword(e) {

    e.preventDefault();
    
    const inputList = e.target.querySelectorAll('input');

    const currentPassword = e.target["current-password"].value;
    const newPassword = e.target["new-password"].value;
    const newPasswordConfirm = e.target["new-password-confirm"].value;

    function checkValue(value) {

        const regex = /\w{6,}/;

        if (!value.replace(/\s/g,'')) {

            toastMessage("warning", "欄位不可空白");
            return;
        
        } else if (!regex.test(value)) { 
            
            toastMessage("warning", "長度需在六個字以上");
            return;

        } else if (currentPassword === newPassword) {

            toastMessage("warning", "新密碼不可與舊密碼相同");
            return;

        } else if (newPassword !== newPasswordConfirm) {

            toastMessage("warning", "兩次密碼不一致");
            return;

        }

        return true;

    }

    [...inputList].every(input => checkValue(input.value)) &&
    (function(){

        const userInfo = { email: data.email, password: currentPassword };

        axios.post(`${VITE_APP_SITE}/login/${data.id}`, userInfo)
        .then((res)=>{
            return axios.patch(`${VITE_APP_SITE}/660/users/${data.id}`, {
                password: newPassword
            }, headers)
        })
        .then((res)=>{
            e.target.reset();
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            toastMessage("success", "修改成功！請重新登入！", "login.html");
        })
        .catch((error)=>{ errorHandle(error) })

    })();

}

// 儲存寄送資訊

function renderDeliveryInfo(data) {

    const list = document.querySelector('#address-list');

    let str = '';
    data.length === 0 ? 
    str = `<li>尚未儲存任何地址</li>` :
    data.forEach(item => str += /*html*/`
    <li data-num="${item.id}" class="card px-6 py-3">
        <div class="row">
            <div class="col-1">
                <button class="delete btn d-flex align-items-center p-0 ms-md-3">
                <span class="material-icons text-orange">delete</span>
                </button>
            </div>
            <div class="col-10">${item.address}</div>
        </div>
    </li>
    `);
    list.innerHTML = str;

    list.addEventListener('click', (e) => {

        if (!e.target.closest('button')) return;

        const id = e.target.closest('li').dataset.num;
        
        deleteDeliveryInfo(id);

    })

}

function checkDeliveryInfo(e) {

    e.preventDefault();

    const address = e.target.address;

    checkContent(address) && 
    ((info) => {

        saveDeliveryInfo(info);
        e.target.reset();

    })({
        address: address.value,
        userId: data.id,
    });

}

function saveDeliveryInfo(info) {

    axios.post(`${VITE_APP_SITE}/600/deliveryInfos`, info, headers)
    .then((res)=>{

        toastMessage('success','成功儲存資料！');
        getDeliveryInfo();

    })
    .catch((error)=>{ errorHandle(error) })

}

function deleteDeliveryInfo(id) {

    Swal.fire({
        icon: 'warning',
        title: '確定刪除地址？',
        /* cancel */
        showCancelButton: true,
        cancelButtonColor: '#D1741F',
        cancelButtonText: '取消',
        /* deal with AJAX */
        confirmButtonColor: '#A37A64',
        confirmButtonText: '確定',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            try {

                const res = await axios.delete(`${VITE_APP_SITE}/deliveryInfos/${id}`);
                toastMessage('success','刪除成功！');
                getDeliveryInfo();

            } catch (error) { errorHandle(error) }
        }
    })

}

// 驗證表單元素

function checkContent(input) {

    const { name, value } = input;

    if (!(value.replace(/\s/g,""))) {

        toastMessage('warning','欄位不可空白');
        input.closest('form').id === 'profile-form' ? input.value = data[name] : null;
        return;
    
    } else if (name === 'phone' && !/^09\d{8}$/.test(value)) {

        toastMessage('warning','手機格式不正確');
        input.closest('form').id === 'profile-form' ? input.value = data[name] : null;
        return;

    }

    return true;

}