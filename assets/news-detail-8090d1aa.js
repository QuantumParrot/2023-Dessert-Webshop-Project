import{a as o,e as t}from"./main-5bc21e7f.js";import"./header-state-d9f1b448.js";import{h as s}from"./moment-fbc5633a.js";const{VITE_APP_SITE:n}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};window.location.href.split("id=").pop();(e=>{o.get(`${n}/announcements/${e}`).then(r=>{a(r.data)}).catch(r=>{t(r)})})();function a(e){const r=document.querySelector("#detail");r.innerHTML=`
    <div class="bg-secondary rounded-2 shadow p-3">
        <div class="rounded-2 border border-2 border-primary px-md-10 px-6 py-10">
        <h3 class="mb-6" style="line-height: 1.5">${e.title}</h3>
        <p class="text-black mb-6">${s(+e.date).format("YYYY-MM-DD A hh:mm")}</p>
        <hr>
        <p class="mt-6">${e.content.replaceAll(`
`,"<br><br>")}</p>
        </div>
    </div>`}
