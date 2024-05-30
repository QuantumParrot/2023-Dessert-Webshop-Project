import axios from "axios";

import { toastMessage } from './message.js';
import { token, headers, errorHandle } from "./authorization.js";
import { changeCartIcon, removeCartIcon } from './cart-state.js';

(() => {

    if (!token()) return;

    changeHeader();
    checkCartStatus();

})();

// 登入狀態下切換不同的 header 版型

function changeHeader() {

    const membership = document.querySelector('#common-header #membership');
    
    if (membership) {

        let header = /*html*/`
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
        membership.innerHTML = header;
        
    }

    const membershipMobile = document.querySelector('#common-header #membership-mobile');

    if (membershipMobile) {

        let headerMobile = /*html*/`
        <li><a class="dropdown-item px-1 py-2" href="cart.html" style="letter-spacing:0.4px">購 物 車</a></li>
        <li><a class="dropdown-item px-1 py-2" href="member.html#orders">我的訂單</a></li>
        <li><a class="dropdown-item px-1 py-2" href="member.html#collection">我的收藏</a></li>
        <li><a class="dropdown-item px-1 py-2" href="member.html#profile">個人資料</a></li>
        <li><a class="logout dropdown-item py-2" href="#">登　　出</a></li>
        `;
        membershipMobile.innerHTML = headerMobile;

    }

    // 綁定登出功能

    const logoutButtons = document.querySelectorAll('.logout');

    if (logoutButtons) {

        logoutButtons.forEach(button => button.addEventListener('click', function(e){
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            toastMessage('success', '登出成功！期待您的下次造訪！', 'index.html');
        }))

    }

}

// 登入之後，向遠端伺服器取得對應的購物車資料，並反映至畫面上

function checkCartStatus() {

    const { VITE_APP_SITE } = import.meta.env;
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    
    axios.get(`${VITE_APP_SITE}/600/users/${userId}/carts`, headers)
    .then((res)=>{
        res.data.length !== 0 ? changeCartIcon() : removeCartIcon();
    })
    .catch((error)=>{ errorHandle(error) })

}