// 這是用來修改登入之後 navbar 長相的檔案 ( 一定有更好的寫法，欠修改 )

import axios from "axios";

import { token, headers, errorHandle } from "./utilities/authorization.js";

const { VITE_APP_SITE } = import.meta.env;

(function() {

    if (token()) { changeNavbar() };

})();

function changeNavbar() {

    const membership = document.querySelector('#common-header #membership');
    
    if (membership) {

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
        
    }

    const membershipMobile = document.querySelector('#common-header #membership-mobile');

    if (membershipMobile) {

        let navbarMobile = /*html*/`
        <li><a class="dropdown-item px-1 py-2" href="cart.html" style="letter-spacing:0.4px">購 物 車</a></li>
        <li><a class="dropdown-item px-1 py-2" href="member.html#orders">我的訂單</a></li>
        <li><a class="dropdown-item px-1 py-2" href="member.html#collection">我的收藏</a></li>
        <li><a class="dropdown-item px-1 py-2" href="member.html#profile">個人資料</a></li>
        <li><a class="logout dropdown-item py-2" href="#">登　　出</a></li>
        `;
        membershipMobile.innerHTML = navbarMobile;

    }

    // 確認購物車狀態

    if (window.innerWidth > 767) { checkCartStatus() }

}

async function checkCartStatus() {

    const userId = JSON.parse(localStorage.getItem('userData')).id;
    
    const res = axios.get(`${VITE_APP_SITE}/600/users/${userId}/carts`, headers)
    .then((res)=>{
        res.data.length !== 0 ? changeCartIcon() : removeCartIcon();
    })
    .catch((error)=>{ errorHandle(error) })

}

export function changeCartIcon() {
    if (window.innerWidth < 768) return;
    const icon = document.querySelector('#cart-icon');
    icon.innerHTML += /*html*/`
    <span class="marker position-absolute top-0 end-0 p-1 bg-danger border border-light rounded-circle">
        <span class="visually-hidden">New alerts</span>
    </span>`;
}

export function removeCartIcon() {
    if (window.innerWidth < 768) return;
    const marker = document.querySelector('#cart-icon .marker');
    if (marker) { marker.remove() };
}