import{t as s,b as n,a as l,h as i,e as c}from"./main-5bc21e7f.js";function d(){if(window.innerWidth<768)return;const e=document.querySelector("#cart-icon");e.innerHTML+=`
    <span class="marker position-absolute top-0 end-0 p-1 bg-danger border border-light rounded-circle">
        <span class="visually-hidden">New alerts</span>
    </span>`}function m(){if(window.innerWidth<768)return;const e=document.querySelector("#cart-icon .marker");e&&e.remove()}s()&&(p(),h());function p(){const e=document.querySelector("#common-header #membership");if(e){let o=`
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
        `;e.innerHTML=o}const t=document.querySelector("#common-header #membership-mobile");if(t){let o=`
        <li><a class="dropdown-item px-1 py-2" href="cart.html" style="letter-spacing:0.4px">購 物 車</a></li>
        <li><a class="dropdown-item px-1 py-2" href="member.html#orders">我的訂單</a></li>
        <li><a class="dropdown-item px-1 py-2" href="member.html#collection">我的收藏</a></li>
        <li><a class="dropdown-item px-1 py-2" href="member.html#profile">個人資料</a></li>
        <li><a class="logout dropdown-item py-2" href="#">登　　出</a></li>
        `;t.innerHTML=o}const r=document.querySelectorAll(".logout");r&&r.forEach(o=>o.addEventListener("click",function(a){a.preventDefault(),localStorage.removeItem("token"),localStorage.removeItem("userData"),n("success","登出成功！期待您的下次造訪！","index.html")}))}function h(){const{VITE_APP_SITE:e}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},t=JSON.parse(localStorage.getItem("userData")).id;l.get(`${e}/600/users/${t}/carts`,i).then(r=>{r.data.length!==0?d():m()}).catch(r=>{c(r)})}export{d as c,m as r};
