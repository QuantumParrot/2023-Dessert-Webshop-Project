import{a as s}from"./handleAuth-797a471f.js";const{VITE_APP_SITE:n}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function r(){s.get(`${n}/664/announcements?_sort=id&_order=desc`).then(e=>{l(e.data)}).catch(e=>{console.log(e)})}r();const a=document.querySelector("#list");function l(e){let o="";e.forEach(t=>{o+=`
        <li class="nav bg-white rounded-2 shadow p-md-5 p-2 fw-bold">
            <a class="nav-link flex-grow-1 d-flex flex-md-row flex-column" href="../pages/news-detail.html?id=${t.id}">
            <p class="text-black me-6 mb-md-0 mb-2">${t.date}</p>
            <p>${t.title}</p>
            </a>
        </li>
        `}),a.innerHTML=o}
