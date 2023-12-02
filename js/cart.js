import axios from "axios";
import Swal from "sweetalert2";

import { toastMessage, warningMessage } from "./utilities/message.js";
import { getToken, errorHandle } from "./utilities/authorization.js";
import { modifyProductData } from "./utilities/modification.js";

const { VITE_APP_SITE } = import.meta.env;

// init

function init() {

    const token = getToken();
    
    if (!token) {
        toastMessage('warning','請先登入','login.html');
    } else {
        const userId = JSON.parse(localStorage.getItem('userData')).id;
        axios.get(`${VITE_APP_SITE}/640/user/${userId}/carts?_expand=product`, {
            headers : {
                "authorization": `Bearer ${token}`
            }
        })
        .then((res)=>{
            renderData(res.data);
        })
        .catch((error)=>{ errorHandle(error) })
    }

}

init();

function renderData(data) {

    const cart = document.querySelector('#cart');
    let str = '';

    if (data.length === 0) {

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
            <ul id="main-content" class="list-group ps-0"></ul>
        </div>
        <div class="col-md-3">
            <div class="position-sticky top-0">
                <div class="bg-secondary rounded-1 p-6 lh-lg">
                    <h3 class="text-center mb-9">總計</h3>
                    <!-- 小計 -->
                    <div class="d-flex justify-content-between">
                        <p class="fw-bold">小計</p>
                        <p style="width: 40%" class="d-flex justify-content-between">
                            <span>NT＄</span>
                            <span id="subtotal"></span>
                        </p>
                    </div>
                    <!-- 運費 -->
                    <div class="d-flex justify-content-between">
                        <p class="fw-bold">運費</p>
                        <p style="width: 40%" class="d-flex justify-content-between">
                            <span>NT＄</span>
                            <span id="delivery-fee"></span>
                        </p>
                    </div>
                    <hr>
                    <!-- 總計 -->
                    <div class="d-flex justify-content-between align-items-center fw-bold">
                        <p>總計</p>
                        <p class="fs-5">
                        <span>NT＄</span><span id="total"></span>
                        </p>
                    </div>
                </div>
                <div class="d-flex justify-content-end align-items-center gap-2 mt-6">
                    <input type="checkbox" id="delivery-confirm">我已詳閱並同意
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

        renderCart(data);
        showTotalCost(data);

    }

}

function renderCart(data) {

    const main = document.querySelector('#main-content');
    let content = '';

    data.forEach(item => content += /*html*/`
    <li data-num=${item.id} class="list-group-item shadow-sm py-md-0 py-8">
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

    const confirm = document.querySelector('#confirm');
    confirm.addEventListener('click', (event) => {
        if (data.some(item => !item.product.forSale)) {
            warningMessage('OOPS', '購物車內有完售的商品，請刪除後再重新結帳')
        } else {
            nextStep(event,data);
        }
    }, false);
    
    const listItems = [...main.children];
    listItems.forEach(item => {
        const currentQty = document.querySelector(`[data-num="${item.dataset.num}"] input`).value;
        cartListener(item, currentQty);
    });

}

function cartListener(element, currentQuantity) {

    element.addEventListener('click', function(e){
        const { target } = e;
        const id = target.closest('li').dataset.num; // !important
        if (!target.closest('.btn')) { return }
        else {
            
            e.preventDefault();
            const token = getToken();

            if (target.textContent.includes('delete')) {
            
                axios.delete(`${VITE_APP_SITE}/640/carts/${id}`, {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                })
                .then((res)=>{
                    toastMessage('success','刪除成功');
                    init();
                })
                .catch((error)=>{ errorHandle(error) })

            } else {

                const qty = document.querySelector(`li[data-num="${id}"] input`); // !important

                if (target.textContent.includes('add')) {
                    qty.value > 9 ? qty.value : qty.value++;
                } else if (target.textContent.includes('remove')) {
                    qty.value < 2 ? qty.value : qty.value--;
                } else if (target.classList.contains('changeQuantity')) {

                    function checkValue(value) {
                        if (isNaN(value)) {
                            toastMessage('warning','請輸入阿拉伯數字');
                            qty.value = currentQuantity;
                            return false;
                        } else if (!Number.isInteger(value) || value <= 0){
                            toastMessage('warning','請輸入大於零的正整數');
                            qty.value = currentQuantity;
                            return false;
                        }
                        return true;
                    }

                    if (currentQuantity == qty.value) {
                        toastMessage("question","數量沒變哦 (ㆆᴗㆆ)"); // 數量沒更新時，不需要發送網路請求
                    } else if (qty.value > 10) {
                        warningMessage('數量達上限','如果需要大量訂購，請直接與我們聯絡');
                    } else {
                        checkValue(+qty.value) &&
                        axios.get(`${VITE_APP_SITE}/640/carts/${id}`, {
                            headers: {
                                "authorization": `Bearer ${token}`
                            }
                        })
                        .then((res)=>{
                            let targetProduct = res.data;
                            targetProduct = { ...targetProduct, qty: +qty.value };
                            return axios.patch(`${VITE_APP_SITE}/640/carts/${id}`, targetProduct, {
                                headers: {
                                    "authorization": `Bearer ${token}`
                                }
                            })
                        })
                        .then((res)=>{
                            toastMessage('success','數量修改成功！')
                            init();
                        })
                        .catch((error)=>{ errorHandle(error) })
                    }

                }

            }
        
        }
    })

}

function showTotalCost(data) {

    const subtotal = document.querySelector('#subtotal');
    const deliveryFee = document.querySelector('#delivery-fee');
    const total = document.querySelector('#total');

    subtotal.textContent = data.reduce((acc,curr) => { 
       return acc + (Number(curr.product.price) * curr.qty)
    }, 0);

    deliveryFee.textContent = 150;

    total.textContent = (+subtotal.textContent) + (+deliveryFee.textContent)

}

function nextStep(e,data) {

    if (e.target.textContent === '下一步') {

        const title = document.querySelector('#process-title');
        e.target.textContent = '結　帳';
        title.textContent = '填寫寄送資訊';

        const main = document.querySelector('#main-content');
        let content = '';
        content += /*html*/`
        <div class="border border-primary rounded-1 px-6 py-7">
            <form id="order-form" class="d-flex flex-column gap-7">
                <div class="d-flex gap-2">
                    <!-- method -->
                    <p class="fw-bold">取貨方式：</p>
                    <input type="radio" name="method" id="宅配到府" value="宅配到府">
                    <label name="method" for="宅配到府">宅配到府</label>
                    <input type="radio" name="method" id="來店取貨" value="來店取貨">
                    <label name="method" for="來店取貨">來店取貨</label>
                </div>
                <div class="d-flex gap-2">
                    <!-- payment -->
                    <p class="fw-bold">付款方式：</p>
                    <input type="radio" name="payment" id="貨到付款" value="貨到付款">
                    <label for="貨到付款">貨到付款</label>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- receiver -->
                    <label for="receiver" class="fw-bold mb-md-0 mb-3">收件人姓名：</label>
                    <input type="text" id="receiver" class="form-control w-25 px-2 py-1">
                    <div><input type="checkbox" id="useMemberName" class="me-2">同會員資料</div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- phone -->
                    <label for="phone" class="fw-bold mb-md-0 mb-3">收件人電話：</label>
                    <input type="tel"
                           id="phone"
                           class="form-control w-25 px-2 py-1"
                           placeholder="請填寫國內的手機號碼"
                           value="0912987654">
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- address -->
                    <label for="address" class="fw-bold mb-md-0 mb-3">收件人地址：</label>
                    <input type="text"
                           id="address"
                           class="form-control w-50 px-2 py-1"
                           placeholder="請填寫國內的地址"
                           value="台南市東區大學路一號">
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- shippingTime -->
                    <p class="fw-bold mb-md-0 mb-3">指定收貨時段：</p>
                    <div>
                        <input type="radio" name="shippingTime" id="不指定" value="不指定">
                        <label name="shippingTime" for="不指定">不指定</label>
                        <input type="radio" name="shippingTime" id="ante-meridiem" value="中午前">
                        <label name="shippingTime" for="ante-meridiem">中午前</label>
                        <input type="radio" name="shippingTime" id="post-meridiem" value="下午兩點～六點">
                        <label name="shippingTime" for="post-meridiem">下午兩點～六點</label>
                    </div>
                </div>
            </form>
        </div>`
        main.innerHTML = content;
    
        const useMemberName = document.querySelector('#useMemberName');
        useMemberName.addEventListener('change', function(e){
            if (e.target.checked) {
                const userName = JSON.parse(localStorage.getItem('userData')).name;
                receiver.value = userName;
            } else {
                receiver.value = '';
            }
        })

    } else if (e.target.textContent ==='結　帳') {

        const method = document.querySelector('input[name="method"]:checked');
        const payment = document.querySelector('input[name="payment"]:checked');
        const receiver = document.querySelector('#receiver');
        const phone = document.querySelector('#phone');
        const address = document.querySelector('#address');
        const shippingTime = document.querySelector('input[name="shippingTime"]:checked');
        const deliveryConfirm = document.querySelector('#delivery-confirm');

        function checkInput(element) {

            if (element?.id === 'delivery-confirm' && !element?.checked) {
                toastMessage('warning','請詳閱並同意寄送說明');
                return false;
            } else if (!element?.value) {
                toastMessage('warning','請確實填寫所有的欄位');
                return false;
            } else if (element?.id === 'phone') {
                if (!/^09(\d){8}/.test(element.value)) {
                    toastMessage('warning','手機號碼格式不正確'); 
                    return false;
                }
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
                address: address.value,
                payment: payment.value,
                method: method.value,
                shippingTime: shippingTime.value,
            }
            completeOrder(data, deliveryInfo);
        })();

    }
}

function completeOrder(data, info) {
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
                const token = getToken();
                const total = document.querySelector('#total').textContent;
                data = data.map(item => { return { ...item, product: modifyProductData(item.product) } });
                const orderInfo = {
                    orderNum: new Date().getTime()+`0${data[0].userId}`,
                    content: data,
                    total: Number(total),
                    info,
                    createdTime: new Date().getTime(),
                    userId: data[0].userId,
                    isFinished: false,
                };
                axios.post(`${VITE_APP_SITE}/640/orders`, orderInfo, {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                })
                .then((res)=>{
                    return data.forEach(item => {
                        axios.delete(`${VITE_APP_SITE}/640/carts/${item.id}`, {
                            headers: {
                                "authorization": `Bearer ${token}`
                            }
                        })
                    })
                })
            } catch(error) { errorHandle(error) }
        }
    }).then((result)=>{
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
