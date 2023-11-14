import{a as f,t as i,g as v}from"./handleAuth-9fafb369.js";function E(){v()&&(location.href="index.html")}E();const{VITE_APP_SITE:g}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},p=document.querySelector("#register-form"),b=document.getElementById("username"),A=document.getElementById("account"),u=document.getElementById("password");document.getElementById("password-confirm");const d=document.getElementById("submit"),r=document.querySelectorAll("input");r.forEach(t=>{t.addEventListener("input",e=>{l(e.target)},!1)});function l(t){const{id:e,value:n,classList:s}=t,a=document.querySelector(`div[data-validation="${e}"]`);function o(){return s.remove("is-invalid"),s.add("is-valid"),!0}if(!n)s.add("is-invalid"),a.textContent="欄位不可空白";else if(e==="account")if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(n))s.remove("is-valid"),s.add("is-invalid"),a.textContent="信箱格式不正確";else return o();else if(e==="password")if(!/\w{6,}/.test(n))s.remove("is-valid"),s.add("is-invalid"),a.textContent="長度需在六個字以上";else return o();else if(e==="password-confirm")if(n!==u.value)s.remove("is-valid"),s.add("is-invalid"),a.textContent="兩次密碼不一致";else return o();else return o()}p.addEventListener("submit",h,!1);function h(t){t.preventDefault(),r.forEach(e=>l(e)),[...r].every(e=>!!l(e))&&x({email:A.value,password:u.value,name:b.value,role:"member"})}function x(t){d.setAttribute("disabled",!0),f.post(`${g}/signup`,t).then(e=>{d.removeAttribute("disabled"),i("success","註冊成功！請登入","login.html"),c()}).catch(e=>{if(e.message==="Network Error")i("error","無法連接伺服器，請聯絡管理員");else{const{data:n}=e.response;n=="Email already exists"&&i("error","用戶已存在"),c()}d.removeAttribute("disabled")})}function c(){r.forEach(t=>{t.value="",t.classList.remove("is-valid")})}