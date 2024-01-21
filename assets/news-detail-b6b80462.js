import{a as t}from"./main-af6d917e.js";import{h as r}from"./moment-fbc5633a.js";const{VITE_APP_SITE:s}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},n=window.location.href.split("id=").pop();function a(e){t.get(`${s}/announcements/${e}`).then(o=>{d(o.data)}).catch(o=>{console.log(o)})}a(n);const c=document.querySelector("#detail");function d(e){c.innerHTML+=`
            <div class="bg-secondary rounded-2 shadow p-3">
                <div class="rounded-2 border border-2 border-primary px-md-10 px-6 py-10">
                <h3 class="mb-6" style="line-height: 1.5">${e.title}</h3>
                <p class="text-black mb-6">${r(+e.date).format("YYYY-MM-DD A hh:mm")}</p>
                <hr>
                <p class="mt-6">${e.content.replaceAll(`
`,"<br><br>")}</p>
                </div>
            </div>`}
