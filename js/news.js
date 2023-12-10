// 本頁面待解決問題：尚無

import axios from "axios";
import moment from "moment";

const { VITE_APP_SITE } = import.meta.env;

function init() {
    axios.get(`${VITE_APP_SITE}/664/announcements?_sort=id&_order=desc`)
    .then((res)=>{
        renderData(res.data);
    })
    .catch((error)=>{
        console.log(error);
    })
}

init();

const list = document.querySelector('#list');

function renderData(data) {
    let str = '';
    data.forEach((news)=>{
        str += /*html*/`
        <li class="nav bg-white rounded-2 shadow p-md-5 p-2 fw-bold">
            <a class="nav-link flex-grow-1 d-flex flex-md-row flex-column" href="news-detail.html?id=${news.id}">
            <p class="text-black me-6 mb-md-0 mb-2">${moment(+news.date).format('YYYY-MM-DD')}</p>
            <p>${news.title}</p>
            </a>
        </li>
        `
    })
    list.innerHTML = str;
}