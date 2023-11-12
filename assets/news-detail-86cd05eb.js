import{a as o}from"./handleAuth-676db6f6.js";const{VITE_APP_SITE:n}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},s=window.location.href.split("id=").pop();function c(e){o.get(`${n}/announcements/${e}`).then(t=>{a(t.data)}).catch(t=>{console.log(t)})}c(s);const r=document.querySelector("#detail");function a(e){r.innerHTML+=`
            <h3 class="mb-6">${e.title}</h3>
            <p class="text-black mb-6">${e.date}</p>
            <hr>
            <p class="mt-6">${e.content.replaceAll(`
`,"<br><br>")}</p>`}
