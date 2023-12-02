import{a as s}from"./main-78beb421.js";import{h as r}from"./moment-fbc5633a.js";const{VITE_APP_SITE:a}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function n(){s.get(`${a}/664/announcements?_sort=id&_order=desc`).then(e=>{d(e.data)}).catch(e=>{console.log(e)})}n();const l=document.querySelector("#list");function d(e){let o="";e.forEach(t=>{o+=`
        <li class="nav bg-white rounded-2 shadow p-md-5 p-2 fw-bold">
            <a class="nav-link flex-grow-1 d-flex flex-md-row flex-column" href="news-detail.html?id=${t.id}">
            <p class="text-black me-6 mb-md-0 mb-2">${r(+t.date).format("YYYY-MM-DD")}</p>
            <p>${t.title}</p>
            </a>
        </li>
        `}),l.innerHTML=o}
