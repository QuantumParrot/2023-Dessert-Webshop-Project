import{a as s}from"./main-5bc21e7f.js";import"./header-state-d9f1b448.js";import{h as r}from"./moment-fbc5633a.js";const{VITE_APP_SITE:a}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};s.get(`${a}/664/announcements?_sort=id&_order=desc`).then(o=>{d(o.data)}).catch(o=>{console.log(o)});const l=document.querySelector("#list");function d(o){let t="";o.forEach(e=>{t+=`
        <li class="nav bg-white rounded-2 shadow p-md-5 p-2 fw-bold">
            <a class="nav-link flex-grow-1" href="news-detail.html?id=${e.id}">
                <div class="row">
                    <p class="col-md-2 text-black mb-md-0 mb-2">${r(+e.date).format("YYYY-MM-DD")}</p>
                    <p class="col-md-10">${e.title}</p>
                </div>
            </a>
        </li>
        `}),l.innerHTML=t}
