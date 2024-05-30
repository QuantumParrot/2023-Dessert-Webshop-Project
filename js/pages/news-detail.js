import moment from "moment";
import axios from "axios";

import { errorHandle } from '../utilities/authorization';

const { VITE_APP_SITE } = import.meta.env;

const id = window.location.href.split('id=').pop();

((id) => {

    'use strict';

    axios.get(`${VITE_APP_SITE}/announcements/${id}`)
    .then((res)=>{
        // console.log(res.data);
        renderData(res.data);
    })
    .catch((error)=>{
        errorHandle(error);
    })

})();

function renderData(data) {

    const detail = document.querySelector('#detail');

    detail.innerHTML = /*html*/`
    <div class="bg-secondary rounded-2 shadow p-3">
        <div class="rounded-2 border border-2 border-primary px-md-10 px-6 py-10">
        <h3 class="mb-6" style="line-height: 1.5">${data.title}</h3>
        <p class="text-black mb-6">${moment(+data.date).format('YYYY-MM-DD A hh:mm')}</p>
        <hr>
        <p class="mt-6">${data.content.replaceAll('\n','<br><br>')}</p>
        </div>
    </div>`;
    
}