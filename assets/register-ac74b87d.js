import{t as f,v as s,a as v,b as n}from"./main-5bc21e7f.js";import"./header-state-d9f1b448.js";f()&&(location.href="index.html");const{VITE_APP_SITE:E}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},d=document.querySelector("#register-form"),p=document.getElementById("username"),h=document.getElementById("phone"),b=document.getElementById("account"),l=document.getElementById("password"),g=document.getElementById("password-confirm"),a=document.getElementById("submit"),o=d.querySelectorAll("input");o.forEach(t=>{t.addEventListener("input",e=>{e.target.id==="password-confirm"?m(e.target):s(e.target)},!1)});d.addEventListener("submit",I,!1);function I(t){t.preventDefault(),o.forEach(e=>s(e)),[...o].every(e=>s(e))&&m(g)&&y({phone:h.value,email:b.value,password:l.value,name:p.value.trim(),role:"member"})}function m(t){const{id:e,value:r,classList:i}=t,u=document.querySelector(`[data-validation="${e}"]`);return r!==l.value?(i.remove("is-valid"),i.add("is-invalid"),u.textContent="兩次密碼不一致",!1):s(t)}function y(t){a.setAttribute("disabled",!0),v.post(`${E}/signup`,t).then(e=>{n("success","註冊成功！請登入","login.html"),c(),a.removeAttribute("disabled")}).catch(e=>{if(e.message==="Network Error")n("error","無法連接伺服器，請聯絡管理員");else{const{data:r}=e.response;r=="Email already exists"&&n("error","用戶已存在"),c()}a.removeAttribute("disabled")})}function c(){o.forEach(t=>{t.value="",t.classList.remove("is-valid")})}
