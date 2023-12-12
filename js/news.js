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
            <a class="nav-link flex-grow-1" href="news-detail.html?id=${news.id}">
                <div class="row">
                    <p class="col-md-2 text-black mb-md-0 mb-2">${moment(+news.date).format('YYYY-MM-DD')}</p>
                    <p class="col-md-10">${news.title}</p>
                </div>
            </a>
        </li>
        `
    })
    list.innerHTML = str;
}