// 這是用來修改登入之後 navbar 長相的檔案 ( 一定有更好的寫法，欠修改 )

import axios from "axios";

import { getToken } from "./utilities/authorization.js";
import { toastMessage } from "./utilities/message.js";

const { VITE_APP_SITE } = import.meta.env;

(function() {

    const token = getToken();

    if (token) { changeNavbar(token) };

})();

function changeNavbar(token) {

    const membership = document.querySelector('#membership');
    let navbar = /*html*/`
    <a class="me-5" href="cart.html">
        <span id="cart-icon" class="material-icons position-relative fs-2">shopping_bag</span>
    </a>
    <div class="dropdown">
        <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="material-icons fs-2">account_circle</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow text-center">
            <li><a data-route="orders" class="dropdown-item px-1 py-2" href="member.html#orders">我的訂單</a></li>
            <li><a class="dropdown-item px-1 py-2" href="member.html#collection">我的收藏</a></li>
            <li><a class="dropdown-item px-1 py-2" href="member.html#profile">個人資料</a></li>
            <li><a class="logout dropdown-item px-1 py-2" href="#">登　　出</a></li>
        </ul>
    </div>
    `;
    membership.innerHTML = navbar;

    const membershipMobile = document.querySelector('#membership-mobile');
    let navbarMobile = /*html*/`
    <li><a class="dropdown-item px-1 py-2" href="cart.html" style="letter-spacing:0.4px">購 物 車</a></li>
    <li><a class="dropdown-item px-1 py-2" href="member.html#orders">我的訂單</a></li>
    <li><a class="dropdown-item px-1 py-2" href="member.html#collection">我的收藏</a></li>
    <li><a class="dropdown-item px-1 py-2" href="member.html#profile">個人資料</a></li>
    <li><a class="logout dropdown-item py-2" href="#">登　　出</a></li>
    `;
    membershipMobile.innerHTML = navbarMobile;

    // 登出功能

    const logoutButtons = document.querySelectorAll('.logout');

    logoutButtons.forEach(button => button.addEventListener('click', function(e){
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        toastMessage('success', '登出成功！期待您的下次造訪！', 'index.html');
    }))

    // 確認購物車狀態

    const userId = JSON.parse(localStorage.getItem('userData')).id;
    userId ? checkCartStatus(userId, token) : null;

}

async function checkCartStatus(id, token) {
    
    const res = axios.get(`${VITE_APP_SITE}/users/${id}/carts`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    .then((res)=>{
        changeCartIconStyle(res.data.length);
    })
    .catch((error)=>{
        console.log(error);
    })

}

export function changeCartIconStyle(dataLength) {
    if (dataLength !== 0) {
        const icon = document.querySelector('#cart-icon');
        icon.innerHTML += `
        <span class="position-absolute top-0 end-0 p-1 bg-danger border border-light rounded-circle">
        <span class="visually-hidden">New alerts</span>
        </span>`;
    }
}