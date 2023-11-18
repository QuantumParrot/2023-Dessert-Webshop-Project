import axios from "axios";

import { getToken, validation } from "../utilities/authorization";
import { toastMessage, errorMessage } from "../utilities/message";

function init() {

    const role = JSON.parse(localStorage.getItem('userData'))?.role;
    if (role === 'admin' && getToken()) { location.href="admin-dashboard.html#orders" }
    
}

init();


const { VITE_APP_SITE, VITE_APP_ADMIN_IDENTITY } = import.meta.env;

const form = document.querySelector('#admin-login-form');
const inputList = form.querySelectorAll('input');
const submit = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function(e){

    e.preventDefault();

    const identity = form.querySelector('#identity');

    inputList.forEach(input => validation(input));
    
    [...inputList].every(input => validation(input)) &&
    checkAdminIdentity(identity) &&
    handleLogin();
    
});

form.addEventListener('input', (e) => { validation(e.target) });

function checkAdminIdentity(input) {
    if (input.value !== VITE_APP_ADMIN_IDENTITY) {

        toastMessage('error', '金鑰錯誤');
        return false;

    } else { return true }
}

function handleLogin() {

    const email = document.querySelector('#account');
    const password = document.querySelector('#password');

    axios.post(`${VITE_APP_SITE}/login`, {
        email: email.value,
        password: password.value,
    })
    .then((res)=>{
        submit.setAttribute('disabled',true);
        const { accessToken, user } = res.data;
        if (user.role !== 'admin') {
            errorMessage('您不具備管理員權限', '欸！你怎麼會有金鑰 Σ(;ﾟдﾟ)', 'index.html');
        } else {
            const adminToken = `${accessToken}${VITE_APP_ADMIN_IDENTITY.split('').map(n=>n.charCodeAt()).join('')}`;
            localStorage.setItem('token', adminToken);
            localStorage.setItem('userData', JSON.stringify(user));
            toastMessage('success', '您好！管理員！', 'admin-dashboard.html');
        }
        submit.removeAttribute('disabled');
        clear();
    })
    .catch((error)=>{
        console.log(error);
        if (error.message === 'Network Error') {

            toastMessage('error', '無法連接伺服器，請聯絡管理員');

        } else {

            const { data } = error.response;
            if (data === "Incorrect password") { toastMessage('error', '密碼錯誤') }
            else if (data === "Cannot find user") { toastMessage('error', '用戶不存在') }
            password.value = '';
            password.classList.remove('is-valid');

        }
        submit.removeAttribute('disabled');
    })

}

function clear() {
    inputList.forEach((input)=>{
        input.value = '';
        input.classList.remove('is-valid');
    })
}