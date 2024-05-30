// 本頁面待解決問題：尚無

import axios from "axios";
import Swal from "sweetalert2";

import { toastMessage, warningMessage } from "../utilities/message.js";
import { token, headers, errorHandle, checkEmpty } from "../utilities/authorization.js";
import { modifyProductData } from "../utilities/modification.js";
import { removeCartIcon } from "../utilities/cart-state.js";

const { VITE_APP_SITE } = import.meta.env;

// init

let data = [];

let carts;

function init() {

    const tokenValue = token();
    
    if (!tokenValue) {

        toastMessage('warning','請先登入','login.html');

    } else {
        const userId = JSON.parse(localStorage.getItem('userData')).id;
        axios.get(`${VITE_APP_SITE}/600/users/${userId}/carts?_expand=product`, headers)
        .then((res)=>{
            data = res.data;
            carts = discountCalcultor({ data, fee: 150, threshold: 2000 });
            renderData();
        })
        .catch((error)=>{ errorHandle(error) })
    }

}

init();

function renderData() {

    const cart = document.querySelector('#cart');
    let str = '';

    if (data.length === 0) {

        removeCartIcon();

        str = /*html*/`
        <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        購物車內還沒有商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
        </div>`

        cart.innerHTML = str;

    } else {

        str = /*html*/`
        <div class="col-md-9 mb-6">
            <div class="bg-secondary rounded-2 p-3 mb-6">
                <div class="d-flex gap-3">
                    <span class="material-icons text-orange">campaign</span>
                    <p>單筆消費<span class="text-danger">滿兩千</span>即享有免運優惠！</p>
                </div>
            </div>
            <ul id="main-content" class="list-group ps-0"></ul>
        </div>
        <div class="col-md-3">
            <div class="position-sticky top-0">
                <div class="bg-secondary rounded-1 p-6 lh-lg">
                    <h3 class="text-center mb-9">總計</h3>
                    <!-- 小計 -->
                    <div>
                    <div class="d-flex justify-content-between">
                        <p class="fw-bold">小計</p>
                        <p style="width: 40%" class="d-flex justify-content-between">
                        <span>NT＄</span>
                        <span id="subtotal">${carts.subtotal}</span>
                        </p>
                    </div>
                    </div>
                    <!-- 運費 -->
                    <div>
                    <div class="d-flex justify-content-between">
                        <p class="fw-bold">運費</p>
                        <p style="width: 40%" class="d-flex justify-content-between">
                        <span>NT＄</span>
                        <span id="delivery-fee">${carts.deliveryFeeOrigin}</span>
                        </p>
                    </div>
                    <div id="delivery-fee-discount" class="d-flex justify-content-between align-items-center"></div>
                    </div>
                    <hr>
                    <!-- 總計 -->
                    <div class="d-flex justify-content-between align-items-center fw-bold">
                        <p>總計</p>
                        <p class="fs-5">
                        <span>NT＄</span>
                        <span id="total"></span>
                        </p>
                    </div>
                </div>
                <div class="d-flex justify-content-end align-items-center gap-2 mt-6">
                    <input type="checkbox" class="form-check-input" name="delivery-confirm" id="delivery-confirm">我已詳閱並同意
                    <a href="#"
                       class="text-decoration-none fw-bold text-orange"
                       data-bs-toggle="modal"
                       data-bs-target="#deliveryInfoModal">
                    寄送說明</a>
                </div>
                <div class="mt-6 text-end">
                    <button id="confirm" class="btn btn-primary">下一步</button>
                </div>
            </div>
        </div>
        `
        cart.innerHTML = str;

        renderCart();
        showTotalCost(carts.haveReachThreshold);

    }

}

function renderCart() {

    const main = document.querySelector('#main-content');
    let content = '';

    data.forEach(item => content += /*html*/`
    <li data-id="${item.id}" class="list-group-item shadow-sm py-md-0 py-8">
        <div class="row align-items-center">
            <!-- 1 -->
            <div class="col-md-1 col-2 text-center">
                <button class="delete btn d-flex align-items-center p-0 ms-md-3">
                    <span class="material-icons fs-3">delete</span>
                </button>
            </div>
            <!-- 2 -->
            <div class="d-md-block d-none col-md-2">
                <a href="products-detail.html?id=${item.product.id}" class="text-decoration-none">
                <img src="${item.product.image[0] || "https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                     alt="${item.product.name}"
                     class="rounded-2">
                </a>
            </div>
            <!-- 3 -->
            <div class="col-md-3 col-6 d-flex justify-content-between align-items-center">
                <a href="products-detail.html?id=${item.product.id}" class="text-decoration-none">
                    <h3 class="fs-6 mb-0">${item.product.name}<span class="d-md-inline-block d-none">／${item.product.size}</span></h3>
                </a>
                <div class="d-md-none d-block">ｘ${item.qty}</div>
            </div>
            <!-- 4 -->
            <div class="col-md-4 d-md-block d-none">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-3">
                        <button class="btn p-0 mt-2"><span class="material-icons fs-2">add_circle</span></button>
                        <input class="form-control py-md-2 py-1 px-3 text-center" type="number" min="1" max="10" value=${item.qty}>
                        <button class="btn p-0 mt-2"><span class="material-icons fs-2">remove_circle</span></button>
                    </div>
                    <button class="changeQuantity btn btn-sm btn-primary px-2">修改數量</button>
                </div>
            </div>
            <!-- 5 -->
            <div class="col-md-2 col-4">
                <h4 id="cost" class="d-flex justify-content-between fs-6 px-md-2 px-0 mb-0">
                <span>NT＄</span>
                <span>${item.product.price*item.qty}</span>
                </h4>
            </div>
        </div>
    </li>
    `
    )

    main.innerHTML = content;
    main.addEventListener('click', cartListener);

    const confirm = document.querySelector('#confirm');
    confirm.addEventListener('click', (e) => {
        if (data.some(item => !item.product.forSale)) {
            warningMessage('OOPS', '購物車內有完售的商品，請刪除後再重新結帳')
        } else {
            nextStep(e);
        }
    }, false);

}

function cartListener(e) {

    if (!e.target.closest('.btn')) { return }

    e.preventDefault();

    const id = e.target.closest('li').dataset.id; // 購物車的 id 而非商品 id
        
    if (e.target.textContent.includes('delete')) {
            
        axios.delete(`${VITE_APP_SITE}/600/carts/${id}`, headers)
        .then((res)=>{
            toastMessage('success','成功刪除商品');
            init();
        })
        .catch((error)=>{ errorHandle(error) })

    } else {

        const qty = document.querySelector(`li[data-id="${id}"] input`); // !important
        const currentQuantity = qty.getAttribute('value');

        if (e.target.textContent.includes('add')) {

            qty.value > 9 ? qty.value : qty.value++;

        } else if (e.target.textContent.includes('remove')) {
        
            qty.value < 2 ? qty.value : qty.value--;

        } else if (e.target.classList.contains('changeQuantity')) {

            function checkValue(value) {

                if (isNaN(value)) {

                    toastMessage('warning','請輸入阿拉伯數字');
                    qty.value = currentQuantity;
                    return;

                } else if (!Number.isInteger(value) || value <= 0){

                    toastMessage('warning','請輸入大於零的正整數');
                    qty.value = currentQuantity;
                    return;

                }

                return true;

            }

            if (currentQuantity == qty.value) {

                return; // 數量沒更新時，不需要發送網路請求

            } else if (qty.value > 10) {

                warningMessage('數量達上限','如果需要大量訂購，請直接與我們聯絡');

            } else {

                checkValue(Number(qty.value)) &&
                axios.patch(`${VITE_APP_SITE}/600/carts/${id}`, { qty: Number(qty.value) }, headers)
                .then((res)=>{
                    toastMessage('success','數量修改成功！')
                    init();
                })
                .catch((error)=>{ errorHandle(error) })

            }

        }

    }

}

function showTotalCost(boolean) {

    const total = document.querySelector('#total');

    const fee = document.querySelector('#delivery-fee');
    const discount = document.querySelector('#delivery-fee-discount');

    if (boolean) {

        fee.classList.add('text-decoration-line-through');
        discount.innerHTML = /*html*/` 
        <p class="text-danger fs-7">符合免運條件！</p>
        <p style="width: 40%" class="d-flex justify-content-between">
            <span>NT＄</span>
            <span>${carts.deliveryFee(boolean)}</span>
        </p>`;

    } else {

        fee.classList.remove('text-decoration-line-through');
        discount.innerHTML = '';       

    }

    total.textContent = carts.subtotal + carts.deliveryFee(boolean);

}

function nextStep(e) {

    if (e.target.textContent === '下一步') {

        if (window.innerWidth < 768) { document.documentElement.scrollTop = 0 };

        const title = document.querySelector('#process-title');
        e.target.textContent = '結　帳';
        title.textContent = '填寫寄送資訊';

        const main = document.querySelector('#main-content');
        let content = '';
        content += /*html*/`
        <div class="border border-primary rounded-1 px-6 py-7">
            <form id="order-form" class="d-flex flex-column gap-7">
                <div id="method-listener" class="d-flex gap-2">
                    <!-- method -->
                    <p class="fw-bold">取貨方式：</p>
                    <input type="radio" class="form-check-input" name="method" id="宅配到府" value="宅配到府">
                    <label for="宅配到府">宅配到府</label>
                    <input type="radio" class="form-check-input" name="method" id="來店取貨" value="來店取貨">
                    <label for="來店取貨">來店取貨</label>
                </div>
                <div class="d-flex gap-2">
                    <!-- payment -->
                    <p class="fw-bold">付款方式：</p>
                    <input type="radio" class="form-check-input" name="payment" id="貨到付款" value="貨到付款">
                    <label for="貨到付款">貨到付款</label>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- receiver -->
                    <label for="name" class="fw-bold mb-md-0 mb-3">收件人姓名：</label>
                    <input type="text"
                           name="name"
                           id="name"
                           class="form-control w-25 px-2 py-1 me-md-1 mb-md-0 mb-3">
                    <div>
                        <input type="checkbox" class="form-check-input" id="useMemberName" data-receiver="name"
                               class="me-1">
                        <label for="useMemberName">同會員資料</label>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- phone -->
                    <label for="phone" class="fw-bold mb-md-0 mb-3">收件人電話：</label>
                    <input type="tel"
                           name="phone"
                           id="phone"
                           class="form-control w-25 px-2 py-1 me-md-1 mb-md-0 mb-3"
                           placeholder="請填寫國內的手機號碼">
                    <div>
                        <input type="checkbox" class="form-check-input" id="useMemberPhone" data-receiver="phone"
                               class="me-1">
                        <label for="useMemberPhone">同會員資料</label>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- address -->
                    <label for="address" class="fw-bold mb-md-0 mb-3">收件人地址：</label>
                    <input type="text"
                           name="address"
                           id="address"
                           class="form-control w-50 px-2 py-1"
                           placeholder="來店取貨可不填寫">
                    <div>
                        <select id="select-address" data-receiver="address" class="form-select px-2 py-1" style="min-width: 280px">
                            <option value="" selected disabled>選擇已儲存的地址</option>
                        </select>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- shippingTime -->
                    <p class="fw-bold mb-md-0 mb-3">指定收貨時段：</p>
                    <div>
                        <input type="radio" class="form-check-input" name="shippingTime" id="不指定" value="不指定">
                        <label name="shippingTime" for="不指定">不指定</label>
                        <input type="radio" class="form-check-input" name="shippingTime" id="ante-meridiem" value="中午前">
                        <label name="shippingTime" for="ante-meridiem">中午前</label>
                        <input type="radio" class="form-check-input" name="shippingTime" id="post-meridiem" value="下午兩點～六點">
                        <label name="shippingTime" for="post-meridiem">下午兩點～六點</label>
                    </div>
                </div>
            </form>
        </div>`
        main.innerHTML = content;

        getDeliveryInfo();

        const addressSelector = document.querySelector('#select-address');
        addressSelector.addEventListener('change', useSavedAddress);

        const deliveryMethod = document.querySelector('#method-listener');
        deliveryMethod.addEventListener('change', (e) => {

            if (e.target.nodeName !== 'INPUT') return;
            
            showTotalCost(carts.haveReachThreshold || e.target.value === '來店取貨');
            
        })
         
        const useMemberData = document.querySelectorAll('input[data-receiver]');
        useMemberData.forEach(checkbox => checkbox.addEventListener('change', function(e){
            const input = document.querySelector(`input#${e.target.dataset.receiver}`);
            if (e.target.checked) {

                const value = JSON.parse(localStorage.getItem('userData'))[e.target.dataset.receiver];
                input.value = value;

            } else { input.value = '' }
        }))

    } else if (e.target.textContent ==='結　帳') {

        const method = document.querySelector('input[name="method"]:checked');
        const payment = document.querySelector('input[name="payment"]:checked');
        const receiver = document.querySelector('#name');
        const phone = document.querySelector('#phone');
        const address = document.querySelector('#address');
        const shippingTime = document.querySelector('input[name="shippingTime"]:checked');
        const deliveryConfirm = document.querySelector('#delivery-confirm');

        function checkInput(element) {

            if (element?.name === 'delivery-confirm' && !element?.checked) {

                toastMessage('warning','請詳閱並同意寄送說明');
                return;

            } else if (element?.name === 'address' && method.value === '來店取貨') {

                return true;

            } else if (!element?.value.replace(/\s/g,"")) {

                toastMessage('warning','請確實填寫所有的欄位');
                return;

            } else if (element?.name === 'phone' && !/^09\d{8}$/.test(element.value)) {

                toastMessage('warning','手機格式不正確'); 
                return;

            }

            return true;

        }

        checkInput(method)
        &&
        checkInput(payment)
        &&
        checkInput(receiver)
        &&
        checkInput(phone)
        &&
        checkInput(address)
        &&
        checkInput(shippingTime)
        &&
        checkInput(deliveryConfirm)
        &&
        (function(){
            const deliveryInfo = {
                receiver: receiver.value,
                phone: phone.value,
                address: checkEmpty(address.value) ? '來店取貨' : address.value,
                payment: payment.value,
                method: method.value,
                shippingTime: shippingTime.value,
            }
            completeOrder(deliveryInfo);
        })();

    }

}

function getDeliveryInfo() {

    const id = JSON.parse(localStorage.getItem('userData')).id;
    
    axios.get(`${VITE_APP_SITE}/600/users/${id}/deliveryInfos`, headers)
    .then(res => {
        renderInfoOptions(res.data);
    })
    .catch(error => errorHandle(error));

}

function renderInfoOptions(data) {

    const select = document.querySelector('#select-address');
    
    data.forEach(item => {
        const option = document.createElement('option');
        option.setAttribute('value', item.address);
        option.textContent = item.address.replace(/(\d+)/g, " $1 ");
        select.appendChild(option);
    });

}

function useSavedAddress(e) {

    const input = document.querySelector(`input#${e.target.dataset.receiver}`);
    input.value = e.target.value;

}

function completeOrder(info) {

    Swal.fire({
        icon: 'warning',
        title: '確定送出訂單？',
        text: '提醒您，按下送出之後即視為交易成立',
        position: 'center',
        allowOutsideClick: false,
        /* cancel */
        showCancelButton: true,
        cancelButtonColor: '#D1741F',
        cancelButtonText: '再想想看',
        /* deal with AJAX */
        confirmButtonColor: '#A37A64',
        confirmButtonText: '送出訂單',
        showLoaderOnConfirm: true,
        preConfirm: async () => {

            try {

                const deliveryFee = carts.deliveryFee(carts.haveReachThreshold || info.method === '來店取貨');

                data = data.map(item => { return { ...item, product: modifyProductData(item.product) } });
                const orderInfo = {
                    orderNum: new Date().getTime()+`0${data[0].userId}`,
                    content: data,
                    total: carts.subtotal + deliveryFee,
                    info,
                    deliveryFee: deliveryFee,
                    createdTime: new Date().getTime(),
                    userId: data[0].userId,
                    isFinished: false,
                };
                axios.post(`${VITE_APP_SITE}/600/orders`, orderInfo, headers)
                .then((res)=>{
                    return data.forEach(item => {
                        axios.delete(`${VITE_APP_SITE}/600/carts/${item.id}`, headers)
                    })
                })

            } catch(error) { errorHandle(error) }

        }
    }).then(result => {

        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Terima kasih！謝謝您的訂購！',
                text: '我們將立即為您製作，請耐心等候商品送達',
                position: 'center',
                confirmButtonColor: '#A37A64',
                timer: 3000,
            }).then(() => location.href = 'member.html')
        }

    })
    
}

// 寫得超爛的運費計算工具

function discountCalcultor(config) {

    const { data, fee, threshold } = config;

    const subtotal = data.reduce((acc, curr) => { 
        return acc + (Number(curr.product.price) * curr.qty)
    }, 0);

    return {
        subtotal,
        deliveryFeeOrigin: fee,
        haveReachThreshold: subtotal >= threshold,
        deliveryFee: function(boolean) { return boolean ? 0 : fee },
    }

}
