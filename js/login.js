// 本頁面待解決問題：尚無

import axios from "axios";

import { token, validation } from "./utilities/authorization.js";
import { toastMessage } from "./utilities/message.js";

const { VITE_APP_SITE } = import.meta.env;

// 轉址 ( 如果用戶處於登入狀態，不要讓他們訪問這個頁面 )

function init() { if (token()) { location.href="index.html" } }

init();

const account = document.getElementById('account');
const password = document.getElementById('password');
const submit = document.getElementById('submit');

// 即時驗證

const inputList = document.querySelectorAll('input');

inputList.forEach((input) => {
    input.addEventListener('input', (e)=>{validation(e.target)}, false)
});

// 提交驗證

submit.addEventListener('click', submitData, false);

function submitData() {

    inputList.forEach(input => validation(input));

    [...inputList].every(input => validation(input)) &&
    handleLogin({ email: account.value, password: password.value });

}

async function handleLogin(info) {
    try {
        submit.setAttribute('disabled',true); // 在 AJAX 完成之前，防止用戶重複點擊提交網路請求
        const res = await axios.post(`${VITE_APP_SITE}/login`, info);
        submit.removeAttribute('disabled');
        // console.log(res);
        const { accessToken, user } = res.data;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('userData', JSON.stringify(user));
        toastMessage('success', `歡迎您！${user.name}！`, 'member.html#orders');
        clear();
    } catch(error) {
        // console.log(error);
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
    }
}

function clear() {
    inputList.forEach(input => {
        input.value = '';
        input.classList.remove('is-valid');
    })
}