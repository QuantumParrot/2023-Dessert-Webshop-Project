import{a as s}from"./main-36634dc1.js";import{h as r}from"./moment-fbc5633a.js";const{VITE_APP_SITE:a}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function l(){s.get(`${a}/664/announcements?_sort=id&_order=desc`).then(o=>{c(o.data)}).catch(o=>{console.log(o)})}l();const n=document.querySelector("#list");function c(o){let e="";o.forEach(t=>{e+=`
        <li class="nav bg-white rounded-2 shadow p-md-5 p-2 fw-bold">
            <a class="nav-link flex-grow-1" href="news-detail.html?id=${t.id}">
                <div class="row">
                    <p class="col-md-2 text-black mb-md-0 mb-2">${r(+t.date).format("YYYY-MM-DD")}</p>
                    <p class="col-md-10">${t.title}</p>
                </div>
            </a>
        </li>
        `}),n.innerHTML=e}
