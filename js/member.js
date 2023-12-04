import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

import Tab from "bootstrap/js/dist/tab.js";

import { getToken, errorHandle } from "./utilities/authorization.js";
import { toastMessage, warningMessage } from "./utilities/message.js";

const { VITE_APP_SITE } = import.meta.env;

let currentElement = '';
let currentData = [];

// init

function init() {
    
    if (!getToken()) {

        toastMessage('warning','請先登入','login.html');

    } else { getData() }

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

    currentElement = document.querySelector(`#v-pills-${hash} #${hash}-content`);

    // 取得使用者個人資料

    const userId = JSON.parse(localStorage.getItem("userData"))?.id;

    const headers = {
        headers: {
            "authorization": `Bearer ${getToken()}`
        }
    }

    if (hash === 'orders') {

        axios.get(`${VITE_APP_SITE}/600/users/${userId}/orders?_sort=id&_order=desc`, headers) // 由新到舊
        .then((res) => {
            currentData = res.data;
            renderOrders(currentData);
        })
        .catch((error)=>{ errorHandle(error) })

    } else if (hash === 'collection') {

        axios.get(`${VITE_APP_SITE}/600/users/${userId}/collects?_expand=product`, headers)
        .then((res) => {
            currentData = res.data;
            renderCollection(currentData);
        })
        .catch((error)=>{ errorHandle(error) })

    } else if (hash === 'profile') { 

        axios.get(`${VITE_APP_SITE}/600/users/${userId}`, headers)
        .then((res) => {
            currentData = res.data;
            renderProfile();
        })
        .catch((error)=>{ errorHandle(error) })

    }

}

// 我的訂單

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
                        <div class="col-3 d-md-block d-none border-start border-end">
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
                                <p class="text-orange fw-bold">${item.product.name}</p>
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
    currentElement.innerHTML = str;

    $('.accordion-content').hide();
    
    $('.accordion-title').click(function(){
        $(this).siblings('.accordion-content').slideToggle();
    })
}

// 我的收藏

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
                            <button data-num="${product.id}" class="favorite btn btn-sm btn-outline-orange p-1">
                                <span class="material-icons d-flex">favorite</span>
                            </button>
                            <button data-num="${product.id}" class="cart btn btn-sm btn-primary p-1 ${product.forSale ? '' : 'disabled'}">
                                <span class="material-icons d-flex">shopping_bag</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `);
    currentElement.innerHTML = str;

    // 待優化的程式碼 //

    const favoriteButtons = document.querySelectorAll('.favorite');
    favoriteButtons.forEach(favoriteButton => { toggleStatus(favoriteButton) });

    const cartButtons = document.querySelectorAll('.cart');
    cartButtons.forEach(cartButton => { addToCart(cartButton) });

}

function toggleStatus(trigger) {

    trigger.addEventListener('click', (e) => {

        e.preventDefault();

        const targetProduct = currentData.find(item => item.product.id == trigger.dataset.num);

        // 取得使用者個人資料

        const userId = JSON.parse(localStorage.getItem("userData")).id;
        const token = getToken();

        axios.delete(`${VITE_APP_SITE}/640/collects/${targetProduct.id}`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        .then((res)=>{
            toastMessage('success',`已取消收藏${targetProduct.product.name}`);
            getData();
        })
        .catch((error)=>{ errorHandle(error) })
            
    }, false)

}

function addToCart(trigger) {
    
    trigger.addEventListener('click', function(e){

        e.preventDefault();

        const token = getToken();

        if (!token) { toastMessage('warning','請先登入') }
        else {

            const userId = JSON.parse(localStorage.getItem("userData")).id;

            axios.get(`${VITE_APP_SITE}/640/users/${userId}/carts`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            .then((res)=>{
                const { data } = res;
                let product = data.find(item => item.productId == trigger.dataset.num); // 確認購物車有沒有重複品項
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
                    product = { productId: Number(trigger.dataset.num), qty: 1, userId }; // 如果沒有重複品項，加入它並補上數量屬性
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

// 會員資料

function renderProfile() {

    const userData = currentData;

    let str = '';

    str += /*html*/`
    <div class="col-12">
        <h4 class="mb-8">修改會員資料</h4>
        <form id="profile-form" class="bg-secondary rounded-1 px-6 py-7">
            <div class="d-flex flex-column gap-7">
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-md-6 gap-4">
                    <div class="d-flex align-items-center gap-6">
                        <label for="userName" class="fw-bold mb-0">名字</label>
                        <div class="flex-grow-1">
                        <input id="userName"
                               type="text"
                               class="form-control p-2 border-secondary"
                               name="name"
                               value="${userData.name}"
                               disabled>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-primary py-1"
                                data-target="userName">修改</button>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-md-6 gap-4">
                    <div class="d-flex align-items-center gap-6">
                        <label for="userEmail" class="fw-bold">帳號</label>
                        <div class="flex-grow-1">
                        <input id="userEmail"
                               type="email"
                               class="form-control p-2 border-secondary"
                               name="email"
                               value="${userData.email}"
                               disabled>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-primary py-1"
                                data-target="userEmail">修改</button>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-md-6 gap-4">
                    <div class="d-flex align-items-center gap-6">
                        <label for="userPassword" class="fw-bold mb-0">密碼</label>
                        <div class="flex-grow-1">
                        <input id="userPassword"
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
                                data-target="userPassword"
                                data-bs-toggle="modal"
                                data-bs-target="#changePasswordModal">修改</button>
                    </div>
                    <p class="form-text mt-0">密碼長度僅為示意，非真實長度</p>
                </div>
            </div>
        </form>
    </div>
    `;

    str += /*html*/`
    <div class="col-12">
        <h4 class="d-flex align-items-center gap-5 mb-8">常用寄送資訊（功能開發中）</h4>
        <form id="delivery-form" class="bg-secondary rounded-1 px-6 py-7">
            <div class="d-flex flex-column gap-7">
                <!-- 會員姓名 -->
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-4">
                    <label for="receiver" class="fw-bold">收件人姓名</label>
                    <input id="receiver"
                           type="text"
                           class="form-control w-25 p-2 border-secondary"
                           required>
                    <div><input type="checkbox" id="useMemberName" class="me-4">同會員資料</div>
                </div>
                <!-- 會員電話 -->
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-4">
                    <label for="phone" class="fw-bold">收件人電話</label>
                    <input id="phone"
                           type="tel"
                           class="form-control w-25 p-2 border-secondary"
                           required>
                </div>
                <!-- 會員住址 -->
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-4">
                    <label for="address" class="fw-bold">收件人地址</label>
                    <input id="address"
                           type="text"
                           class="form-control w-50 p-2 border-secondary"
                           required>
                </div>
                <div>
                    <button type="submit" class="btn btn-sm btn-primary">儲存</button>
                </div>
            </div>
        </form>
    </div>
    `;

    currentElement.innerHTML = str;

    changeProfile(userData);
    saveDeliveryInfo(userData);

}

function changeProfile(userData) {

    const profileForm = document.querySelector('#profile-form');

    profileForm.addEventListener('click', function(e){

        e.preventDefault();
        
        if (e.target.nodeName === 'BUTTON') {

            const target = e.target.dataset.target;
            const targetInput = profileForm.querySelector(`#${target}`);

            if (target !== 'userPassword' && e.target.textContent === '修改') {

                targetInput.removeAttribute('disabled');
                e.target.textContent = '送出';

            } else if (e.target.textContent === '送出') {

                Swal.fire({
                    icon: 'warning',
                    title: '確定修改資料？',
                    text: `您的${targetInput.name === 'name' ? '名字' : '帳號'}將改為：${targetInput.value}`,
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

                            if (targetInput.value === userData[targetInput.name]) {
                    
                                toastMessage('question', '資料沒變哦 (ㆆᴗㆆ)');
                                return;
            
                            }

                            const token = getToken();
                            const userInfo = { [targetInput.name]: targetInput.value };
    
                            e.target.setAttribute('disabled', true);
                            const res = await axios.patch(`${VITE_APP_SITE}/660/users/${userData.id}`, userInfo, {
                                headers: {
                                    "authorization": `Bearer ${token}`
                                }
                            });

                            e.target.removeAttribute('disabled');
                            toastMessage('success','修改完成！');
                            localStorage.setItem('userData', JSON.stringify(res.data));
                            getData();

                        } catch (error) { errorHandle(error) }
                    }
                })
                .then((result)=>{
                    targetInput.setAttribute('disabled', true);
                    targetInput.value = userData[targetInput.name];
                    e.target.textContent = '修改';
                })

            } else if (target === 'userPassword') { changePassword(userData) }

        }

    })

}

function changePassword(userData) {

    const form = document.querySelector('#change-password-form');
    const inputList = form.querySelectorAll('input');
    const submit = form.querySelector('button[type="submit"]');
    
    submit.addEventListener('click', function(e){

        e.preventDefault();

        const currentPassword = inputList[0].value;
        const newPassword = inputList[1].value;
        const newPasswordConfirm = inputList[2].value;

        function checkValue(value) {

            const regex = /\w{6,}/;
    
            if (!value) {
    
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

            const userInfo = { email: userData.email, password: currentPassword };

            axios.post(`${VITE_APP_SITE}/login/${userData.id}`, userInfo)
            .then((res)=>{
                const headers = {
                    headers: {
                        "authorization": `Bearer ${getToken()}`
                    }
                }
                return axios.patch(`${VITE_APP_SITE}/660/users/${userData.id}`, {
                    password: newPassword
                }, headers)
            })
            .then((res)=>{
                form.reset();
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                toastMessage("success", "修改成功！請重新登入！", "login.html");
            })
            .catch((error)=>{ errorHandle(error) })

        })();

    })


}

function saveDeliveryInfo(userData) {

    const deliveryForm = document.querySelector('#delivery-form');

    const useMemberName = deliveryForm.querySelector('#useMemberName');
    const receiver = deliveryForm.querySelector('#receiver');
    const phone = deliveryForm.querySelector('#phone');
    const address = deliveryForm.querySelector('#address');

    useMemberName.addEventListener('change', function(e){
        if (e.target.checked) {
            receiver.value = userData.name;
        } else {
            receiver.value = '';
        }
    });

    deliveryForm.addEventListener('submit', function(e){

        e.preventDefault();

        if (phone) {
            const regex = /^09(\d){8}/;
            if (!regex.test(phone.value)) {
                toastMessage('warning','手機號碼格式不正確');
                return;
            }
        }
        
        const receiverInfo = {
            receiver: receiver.value,
            phone: phone.value,
            address: address.value,
            userId: JSON.parse(localStorage.getItem('userData')).id,
        }

        deliveryForm.reset();

    })

}