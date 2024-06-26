// 本頁面待解決問題：圖片上傳方式、進階篩選功能

import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

import Tab from "bootstrap/js/dist/tab.js";

import { renderCharts } from "./adminChart";
import { headers, errorHandle, checkEmpty } from "../../utilities/authorization";
import { toastMessage } from "../../utilities/message";

const { VITE_APP_SITE, VITE_APP_ADMIN_IDENTITY } = import.meta.env;

let element = '';
let data = [];

(function init() {

    const role = JSON.parse(localStorage.getItem('userData'))?.role;

    if (role !== 'admin') { 

        toastMessage('warning','請先登入管理員帳號','admin-login.html')

    } else {

        const token = localStorage.getItem('token');

        if (token.indexOf(VITE_APP_ADMIN_IDENTITY.split('').map(n=>n.charCodeAt()).join('')) === -1) {

            toastMessage('error','身份驗證失敗','index.html');

        } else { 
            
            // 參考了同學 Moreene 的程式碼終於做出類似先驗證再載入的效果，謝謝同學！

            const main = document.querySelector('main');
            main.classList.remove('d-none');
            main.removeAttribute('class');
            
            getData();
        
        }
    
    }

})();

window.addEventListener('hashchange', function(e){ getData() });

function getData() {
    
    const hash = location.hash.replace('#','') || 'orders';
    
    const triggerElement = document.querySelector(`#v-pills-${hash}-tab`);

    if (triggerElement) {

        const trigger = new Tab(triggerElement);
        trigger.show();

    }

    element = document.querySelector(`#v-pills-${hash} #${hash}-content`);

    if (hash === 'orders') { getOrders() }
    else if (hash === 'announcements') { getAnnouncements() }
    else if (hash === 'products') { getProducts() }
    else if (hash === 'charts') { getCharts() }

}

// 取得訂單列表

function getOrders() {

    axios.get(`${VITE_APP_SITE}/660/orders`, headers)
    .then((res)=>{
        data = res.data;
        renderOrders(data.filter(order => !order.isFinished)); // 預設值為顯示未完成訂單
        manageOrders(data.filter(order => !order.isFinished));
    })
    .catch((error)=>{ errorHandle(error) })

}

// 渲染訂單列表

function renderOrders(data) {

    let str = '';
    data.length === 0 ? (str += /*html*/`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">沒有訂單記錄</p>
    </div>
    `) :
    data.forEach(order => {
        str += /*html*/`
        <div class="col-12">
            <div class="accordion-item mb-6">
                <button type="button"
                        class="accordion-title w-100 btn d-md-block d-flex justify-content-between
                               text-start bg-white rounded-2 shadow px-md-8 px-5 py-5">
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
                            <div class="d-flex justify-content-between px-6">
                                <span class="fw-bold">訂購金額：</span>
                                <span>${order.total} 元</span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="ps-md-6 ps-0">
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
                            <p class="mb-5">總計：${order.total} 元<span class="text-muted fs-7">（含運費 ${order.deliveryFee} 元）</span></p>
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
                    ${order.isFinished ? `` : /*html*/`
                    <div class="mt-5 text-center">
                        <button data-id=${order.id} class="btn btn-primary">完成訂單</button>
                    </div>`}
                </div>
            </div>
        </div>
        `
    })
    element.innerHTML = str;

    const buttons = element.querySelectorAll('button[data-id]');
    if (buttons) { buttons.forEach(button => button.addEventListener('click', finishOrder)) }

    $('.accordion-content').hide();
    $('.accordion-title').click(function(){
        $(this).siblings('.accordion-content').slideToggle();
    })

}

// 完成訂單

function finishOrder(e) {

    Swal.fire({
        icon: 'warning',
        title: '確定完成訂單？',
        text: '提醒您，按下完成之後即無法更改訂單狀態',
        /* cancel */
        showCancelButton: true,
        cancelButtonColor: '#D1741F',
        cancelButtonText: '取消',
        /* deal with AJAX */
        confirmButtonColor: '#A37A64',
        confirmButtonText: '完成',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            try {

                const id = e.target.dataset.id;
                const res = await axios.patch(`${VITE_APP_SITE}/660/orders/${id}`, { isFinished: true }, headers);
                toastMessage('success','訂單完成！已通知客戶！');
                getOrders();

            } catch(error) { errorHandle(error) }
        }
    });

}

// 篩選訂單

function manageOrders(initialData) {

    const status = document.querySelector('#filter-by-status');
    const time = document.querySelector('#sort-by-time');

    // init

    time.value = '由舊到新'; status.value = '未完成';

    // 時間排序 ( 排序初始資料 )

    function sort(value) {

        if (value === '由新到舊') { initialData.sort((a,b)=>b.id-a.id) } 
        else if (value === '由舊到新') { initialData.sort((a,b)=>a.id-b.id) }

    }

    time.addEventListener('change', (e) => {

        sort(e.target.value);
        renderOrders(initialData);

    });

    // 狀態分類 ( 控制初始資料數量 )

    function filter(value) {

        if (value === '全部訂單') { 
            
            initialData = data;
        
        } else {

            initialData = data.filter(order => value === '已完成' ? order.isFinished : !order.isFinished);

        }

    }

    status.addEventListener('change', (e) => {

        filter(e.target.value);

        if (!checkEmpty(keyword.value)) { initialData = search(keyword.value) };

        sort(time.value);

        renderOrders(initialData);

    })

    // 關鍵字搜尋 ( 控制初始資料數量 )

    function search(value) {

        value = value.toLowerCase().replace(/\s/g,'');
        return initialData.filter(order => { return order.orderNum.includes(value) || Object.values(order.info).some(info => info.toLowerCase().includes(value)) });
    
    }

    const keyword = document.querySelector('#search-keyword');

    keyword.addEventListener('input', (e) => {

        filter(status.value);

        if (!checkEmpty(e.target.value)) { initialData = search(e.target.value) };
        
        // console.log(initialData);

        sort(time.value);

        renderOrders(initialData);

    })

};

// 取得消息列表

function getAnnouncements() {

    axios.get(`${VITE_APP_SITE}/660/announcements?_sort=id&_order=desc`, headers)
    .then((res)=>{
        
        data = res.data;
        renderAnnouncements();

        const form = document.querySelector('#add-news-form');
        form.addEventListener('submit', createAnnouncement);
        
        const deleteButtons = document.querySelectorAll('button[data-id]');
        deleteButtons.forEach(button => button.addEventListener('click', (e)=>{ deleteAnnouncement(e.target.dataset.id) }))

    })
    .catch((error)=>{ errorHandle(error) })

}

// 渲染消息列表

function renderAnnouncements() {

    let content = `<div class="col-12"><ul class="list-group gap-5">`;
    data.forEach(item => {
    content += /*html*/`
    <li class="list-group-item bg-white rounded-2 shadow p-0 fw-bold">
        <div class="d-flex flex-md-row flex-column align-items-md-center align-items-start gap-md-8 gap-6 p-md-8 p-6">
            <button data-id="${item.id}" class="btn btn-sm btn-primary px-4">刪除消息</button>
            <p class="text-black">${moment(+item.date).format('YYYY-MM-DD')}</p>
            <p class="d-flex gap-2">
                <a class="text-decoration-none d-flex align-items-center fs-7"
                   href="news-detail.html?id=${item.id}" target="_blank">
                <span class="material-icons">open_in_new</span></a>
                ${item.title}
            </p>
        </div>
    </li>
    `;
    })
    content += `</ul></div>`;
    element.innerHTML = content;

}

// 新增消息

function createAnnouncement(e) {
    
    e.preventDefault();

    // console.log(e.target); // 是整個表單 d(d＇∀＇)

    const title = e.target.querySelector('#title');
    const image = e.target.querySelector('#image');
    const content = e.target.querySelector('#content');
    const type = e.target.querySelector('#type');

    if (checkEmpty(title.value) || checkEmpty(content.value)) { toastMessage('warning', '欄位不得空白') }
    else {
        Swal.fire({
            icon: 'warning',
            title: '確定送出？',
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
                    const data = {
                        title: title.value,
                        type: type.value,
                        content: content.value,
                        date: new Date().getTime(),
                        image: image.value,
                    };
                    const res = await axios.post(`${VITE_APP_SITE}/660/announcements`, data, headers);
                    toastMessage('success', '新增成功！');
                    e.target.reset();
                    getAnnouncements();
                } catch(error) { errorHandle(error) };
            }
        })
    }
    
}

// 刪除消息

function deleteAnnouncement(id) {

    Swal.fire({
        icon: 'warning',
        title: '確定刪除？',
        text: '提醒您，此操作無法復原哦！',
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
                const res = await axios.delete(`${VITE_APP_SITE}/660/announcements/${id}`, headers);
                toastMessage('success', '刪除成功！');
                getAnnouncements();
            } catch(error) { errorHandle(error) };
        }
    })

}

// 取得商品列表

function getProducts() {

    axios.get(`${VITE_APP_SITE}/660/products`, headers)
    .then((res)=>{
        data = res.data;
        renderProductList();
        //
        const unlock = document.querySelector('#delete-limit');
        unlock.addEventListener('click', toggleDeleteLimit);
        //
        const createNewProductTrigger = document.querySelector('#create-new-product');
        createNewProductTrigger.addEventListener('click', modalInit);
        //
        const form = document.querySelector('#product-form');
        form.addEventListener('submit', handleProductDetail);
    })
    .catch((error)=>{ errorHandle(error) })

}

// 渲染商品列表

function renderProductList() {

    let str = '';
    data.forEach(product => str += /*html*/`
    <div class="col-md-3 col-12 mb-md-9 mb-6">
        <div class="card hover-shadow overflow-hidden" data-id="${product.id}">
            <div class="position-relative d-md-block d-none">
                <img class="w-100"
                     src="${product.image[0] || `https://fakeimg.pl/291x291/?text=🍰&font=noto`}"
                     alt="${product.name}">
                ${product.forSale ? '' : /*html*/`
                <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center" style="backdrop-filter: brightness(70%)">
                    <h3 class="custom-tooltip w-100 text-center py-5">已售完</h3>
                </div>`}
            </div>
            <div class="px-5">
                <div class="d-flex flex-md-column justify-content-between align-items-center">
                    <div class="d-flex gap-1">
                        <h4 class="fs-6 my-6">${product.name}</h4>
                        <a href="products-detail.html?id=${product.id}"
                           target="_blank"
                           class="text-decoration-none d-flex align-items-center fs-7"><span class="material-icons">open_in_new</span></a>
                    </div>
                    <div class="d-flex justify-content-center gap-3 mb-md-6 mb-0">
                        <button type="button"
                                class="edit btn btn-primary btn-sm p-2"
                                data-bs-toggle="modal"
                                data-bs-target="#productDetailModal"
                                >編輯</button>
                        <button type="button" 
                                class="status btn btn-orange btn-sm p-2">${product.forSale ? '下架' : '上架'}</button>
                        <button type="button"
                                class="delete btn btn-danger btn-sm p-2 disabled"
                                >刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `);
    element.innerHTML = str;
    element.addEventListener('click', handleProducts);

}

function modalInit() {

    const title = document.querySelector('.modal-title');
    const form = document.querySelector('#product-form');
    const images = form.querySelector('.images');

    title.textContent = '新增商品';
    images.innerHTML = /*html*/`
    <input type="text" name="image"
           class="form-control p-2 text-black">`;
    form.reset();

}

function handleProductDetail(e) {

    e.preventDefault();

    const name = e.target.name.value;
    const otherName = e.target.otherName.value;
    const info = e.target.info.value;
    const type = [...e.target.querySelectorAll(`[name="type"]:checked`)].map(i => i.value);
    const size = e.target.size.value;
    const ingredients = e.target.ingredients.value.split(',');
    const price = e.target.price.value;
    const image = [...e.target.querySelectorAll(`[name="image"]`)].map(i => i.value).filter(i => !checkEmpty(i));
    const shelfLife = e.target.shelfLife.value;

    if (checkEmpty(name) || !type.length || checkEmpty(price) || checkEmpty(size) || checkEmpty(shelfLife)) {

        toastMessage('warning','必填欄位不可空白！');
        return;

    } else if (isNaN(price) || !Number.isInteger(+price) || price < 1) {
        
        toastMessage('warning','價格請填寫大於零的整數');
        return;

    } else {

        const title = document.querySelector('.modal-title').textContent;

        if (title === '新增商品') {

            createNewProduct({
                name,
                otherName,
                info,
                type,
                ingredients,
                price: +price,
                image,
                size,
                shelfLife,
                forSale: false,
            });

        } else {

            const id = title.replace(/\D/g,'');
            const originData = data.find(item => item.id == id);

            const newData = { ...originData,
                name,
                otherName,
                info,
                type,
                ingredients,
                price: +price,
                image,
                size,
                shelfLife,
            }

            // 回傳 true 代表資料有被編輯過，此時才需要發送修改的網路請求

            function checkContent(prop) {

                if (prop === 'type' || prop === 'ingredients') {
                    
                    // 判斷是否有無編輯的方式：1. 陣列長度是否不同 2. 新陣列的元素是否有其中一個不包含在舊陣列裡

                    return newData[prop].length !== originData[prop].length || newData[prop].some(item => !originData[prop].includes(item))

                } else if (prop === 'image') {

                    // 考慮到交換圖片順序的需求，不能使用和 type / ingredients 一樣的判斷方式

                    return newData[prop].length !== originData[prop].length || newData[prop].some((item, index) => item !== originData[prop][index])

                } else { return newData[prop] !== originData[prop] }
            
            }

            // 除錯用，很好用 OvOb

            // console.log(Object.keys(newData).forEach(key => console.log(key, checkContent(key))))

            Object.keys(newData).some(key => checkContent(key)) ? editProduct(id, newData) : toastMessage('question','資料沒變哦 (ㆆᴗㆆ)')

        }

    }

};

function createNewProduct(info) {

    axios.post(`${VITE_APP_SITE}/660/products`, info, headers)
    .then((res)=>{

        toastMessage('success','成功！記得上架商品哦！');
        getProducts();
    
    })
    .catch((error)=>{ errorHandle(error) });

}

function toggleDeleteLimit(e) {

    let target = e.target;
    let { textContent } = target;

    if (e.target.nodeName === 'BUTTON') {

        target = e.target.querySelector('.material-icons');
        textContent = target.textContent;

    }

    const buttons = document.querySelectorAll('button.delete');

    if (textContent === 'lock') {

        buttons.forEach(btn => btn.classList.remove('disabled'));
        toastMessage('success','刪除功能已解鎖');
        target.textContent = 'lock_open';

    } else {

        buttons.forEach(btn => btn.classList.add('disabled'));
        toastMessage('success','刪除功能已上鎖');
        target.textContent = 'lock';

    }
    
}


function handleProducts({target}) {
    if (target.nodeName !== 'BUTTON') { return }
    else {
        
        const parent = target.closest('.card');
        const id = parent.dataset.id;
        const product = data.find(item => item.id == id);

        if (target.classList.contains('status')) {

            Swal.fire({
                icon: 'warning',
                title: `確定${target.textContent}？`,
                text: `商品名稱：${product.name}`,
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

                        const res = await axios.patch(`${VITE_APP_SITE}/660/products/${id}`, { forSale: !product.forSale }, headers);
                        toastMessage('success', `成功${target.textContent}！`);
                        getProducts();

                    } catch(error) { errorHandle(error) };
                }
            })

        } else if (target.classList.contains('delete')) {

            Swal.fire({
                icon: 'warning',
                title: `確定刪除${product.name}？！`,
                text: `此操作不可復原，你要確定欸！`,
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

                        const res = await axios.delete(`${VITE_APP_SITE}/660/products/${id}`, headers);
                        toastMessage('success', `再見，${product.name}！\n我們懷念它 ${"｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡"}`);
                        getProducts();

                    } catch(error) { errorHandle(error) };
                }
            })
            
        } else if (target.classList.contains('edit')) { renderModal(product) }
    
    }
}

function renderModal(product) {

    const modal = document.querySelector('#productDetailModal');
    const title = modal.querySelector('.modal-title');

    title.textContent = `＃${product.id}：${product.name}`;

    Object.keys(product).filter(key => key !== 'forSale' && key !== 'id')
    .forEach(key => {
        if (key === 'type') {
            const types = modal.querySelectorAll(`input[name="${key}"]`);
            types.forEach(type => type.checked = product[key].includes(type.value) ? true : false)
        } else if (key === 'image') {
            const parent = modal.querySelector('.images');
            let str = ''
            product[key].forEach((img) => {
                str += `
                <input type="text" name="image"
                       class="form-control p-2 text-black"
                       value="${img}">`
            });
            parent.innerHTML = str;
        } else {
            const element = modal.querySelector(`[name="${key}"]`);
            element.value = product[key];
        }
    });

}

function editProduct(id, info) {
    
    axios.patch(`${VITE_APP_SITE}/660/products/${id}`, info, headers)
    .then((res) => {

        toastMessage('success', '修改成功！');
        getProducts();
    
    })
    .catch((error)=> { errorHandle(error) })

}

// 新增圖片欄位

const createNewImage = document.querySelector('#createNewImage');

createNewImage.addEventListener('click', (e) => {

    const input = document.createElement('input');
    input.name = 'image';
    input.classList.add('form-control','p-2','text-black');

    const images = document.querySelector('.images');
    images.appendChild(input);

})

// 渲染圖表

function getCharts() {

    axios.get(`${VITE_APP_SITE}/660/orders`, headers)
    .then((res)=>{
        renderCharts(res.data);
    })
    .catch((error)=>{ errorHandle(error) });
    
}