import{a as o}from"./main-7f841a0a.js";import{h as s}from"./moment-fbc5633a.js";const{VITE_APP_SITE:n}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},r=window.location.href.split("id=").pop();function c(e){o.get(`${n}/announcements/${e}`).then(t=>{l(t.data)}).catch(t=>{console.log(t)})}c(r);const a=document.querySelector("#detail");function l(e){a.innerHTML+=`
            <h3 class="mb-6">${e.title}</h3>
            <p class="text-black mb-6">${s(+e.date).format("YYYY-MM-DD A hh:mm")}</p>
            <hr>
            <p class="mt-6">${e.content.replaceAll(`
`,"<br><br>")}</p>`}
