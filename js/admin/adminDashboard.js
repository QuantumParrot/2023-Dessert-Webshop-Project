import axios from "axios";
import Swal from "sweetalert2";
import Tab from "bootstrap/js/dist/tab.js";
import moment from "moment";

import { decodeToken, errorHandle, getToken } from "../utilities/authorization";
import { toastMessage } from "../utilities/message";

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

        } else { getData() }
    
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

}

function getOrders() {

    const token = decodeToken(localStorage.getItem('token'));

    axios.get(`${VITE_APP_SITE}/660/orders`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    .then((res)=>{
        data = res.data;
        renderOrders(data.filter(order => !order.isFinished)); // 預設值為顯示未完成訂單
        manageOrders();
    })
    .catch((error)=>{ errorHandle(error) })

}

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
                        <span class="fw-bold">訂單</span>編號：</span>
                        <span class="text-black">${order.orderNum}</span>
                    </div>
                    <div class="row">
                        <div class="col-3 d-md-block d-none">
                            <div>
                                <span class="fw-bold">成立日期：</span>
                                <span class="fw-normal">${order.createdTime.replace(/\s(.)+/,"")}</span>
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
                            <p class="mb-5">總計：${order.total} 元<span class="text-muted fs-7">（含運費）</span></p>
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
                    ${order.isFinished ? `` : `
                    <div class="mt-5 text-center">
                        <button data-num=${order.id} class="btn btn-primary">完成訂單</button>
                    </div>`}
                </div>
            </div>
        </div>
        `
    })
    element.innerHTML = str;

    const buttons = element.querySelectorAll('button[data-num]');
    if (buttons) { buttons.forEach(button => button.addEventListener('click', finishOrder)) }

    $('.accordion-content').hide();
    $('.accordion-title').click(function(){
        $(this).siblings('.accordion-content').slideToggle();
    })

}

function finishOrder(e) {

    const token = decodeToken(localStorage.getItem('token'));

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
                const id = e.target.dataset.num;
                const order = { ...data.find(order => order.id == id), isFinished: true };
                const res = await axios.patch(`${VITE_APP_SITE}/660/orders/${id}`, order, {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                });
                toastMessage('success','訂單完成！已通知客戶！');
                getOrders();
            } catch(error) { errorHandle(error) }
        }
    });

}

function manageOrders() {

    let initialData = [...data];
    
    // 為了進行複數篩選，必須拷貝一份資料，暫定除了搜尋之外，所有篩選功能皆是基於拷貝資料進行

    const status = document.querySelector('#filter-by-status');
    const time = document.querySelector('#sort-by-time');
    const search = document.querySelector('#order-search');

    time.addEventListener('change', function(e){

        if (e.target.value === '由新到舊') {

            initialData.sort((a,b)=>b.id-a.id);
            
        } else if (e.target.value === '由舊到新') {

            initialData.sort((a,b)=>a.id-b.id);
        }

        renderOrders(initialData);

    });

    status.addEventListener('change', function(e){

        const { value } = e.target;

        if (value === '全部訂單') {

            initialData = data;
            renderOrders(initialData);

        } else if (value === '已完成') {

            initialData = data.filter(order => order.isFinished);
            renderOrders(initialData);

        } else if (value === '未完成') {

            initialData = data.filter(order => !order.isFinished);
            renderOrders(initialData);

        }

    })

    search.addEventListener('input', function(e){

        let { value } = e.target;

        value = value.toLowerCase().trim();

        const target = data.filter(order => {
            return order.orderNum.includes(value) || Object.values(order.info).some(info => info.toLowerCase().includes(value));        
        });

        status.value = '全部訂單';
        time.value = '由舊到新';

        renderOrders(target);

    })

};

function getAnnouncements() {

    const token = decodeToken(getToken());

    axios.get(`${VITE_APP_SITE}/660/announcements?_sort=id&_order=desc`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    .then((res)=>{
        data = res.data;
        renderAnnouncements();
    })
    .catch((error)=>{ errorHandle(error) })

}

function renderAnnouncements() {

    let content = `<div class="col-12"><ul class="list-group gap-5">`;
    data.forEach(item => {
        content += /*html*/`
        <li class="list-group-item bg-white rounded-2 shadow p-0 fw-bold">
            <div class="d-flex flex-md-row flex-column align-items-md-center align-items-start gap-8 p-8">
                <button data-id="${item.id}" class="btn btn-sm btn-primary px-4">刪除消息</button>
                <p class="text-black">${item.date.replace(/\s[AM|PM].+/,"")}</p>
                <p>${item.title}</p>
            </div>
        </li>
        `;
    })
    content += `</ul></div>`;
    element.innerHTML = content;

    const form = document.querySelector('#add-news-form');
    form.addEventListener('submit', addAnnouncement);

    const deleteButtons = document.querySelectorAll('button[data-id]');
    deleteButtons.forEach(button => button.addEventListener('click', (e)=>{ deleteAnnouncement(e.target.dataset.id) }))

}

function addAnnouncement(e) {
    
    e.preventDefault();

    // console.log(e.target); // 是整個表單 d(d＇∀＇)

    const title = e.target.querySelector('#title');
    const content = e.target.querySelector('#content');
    const type = e.target.querySelector('#type');

    if (!title.value || !content.value) { toastMessage('warning', '欄位不得空白') }
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
                        date: moment().format('YYYY-MM-D A hh:mm:ss'),
                        image: "",
                    };
                    const res = await axios.post(`${VITE_APP_SITE}/660/announcements`, data, {
                        headers: { 
                            "authorization": `Bearer ${getToken()}`
                        }
                    });
                    console.log(res);
                    toastMessage('success', '新增成功！');
                    e.target.reset();
                    getAnnouncements();
                } catch(error) { errorHandle(error) };
            }
        })
    }
    
}

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
                const res = await axios.delete(`${VITE_APP_SITE}/660/announcements/${id}`, {
                    headers: {
                        "authorization": `Bearer ${getToken()}`
                    }
                });
                toastMessage('success', '刪除成功！');
                getAnnouncements();
            } catch(error) { errorHandle(error) };
        }
    })

}