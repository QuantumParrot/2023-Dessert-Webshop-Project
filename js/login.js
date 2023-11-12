import axios from "axios";

import { getToken } from "./utilities/authorization.js";
import { toastMessage } from "./utilities/message.js";

const { VITE_APP_SITE } = import.meta.env;

// 轉址 ( 如果用戶處於登入狀態，不要讓他們訪問這個頁面 )

function init() {
    if (getToken()) { location.href="index.html" }
}

init();

const account = document.getElementById('account');
const password = document.getElementById('password');
const submit = document.getElementById('submit');

const inputList = document.querySelectorAll('input');

inputList.forEach((input) => {
    input.addEventListener('input', (e)=>{checkInfo(e.target)}, false)
});

function checkInfo(element){

    const { id, value, classList } = element;
    const feedback = document.querySelector(`div[data-validation="${id}"]`);

    function success() {
        classList.remove('is-invalid');
        classList.add('is-valid');
        return true;
    }

    if (!value) {

        classList.add('is-invalid');
        feedback.textContent = "欄位不可空白";

    } else if (id==='account') {

        // Email Regular Expression from JSON-server-auth

        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if (!regex.test(value)) {

            classList.remove('is-valid');
            classList.add('is-invalid');
            feedback.textContent = "信箱格式不正確";

        } else { return success() }

    } else if (id==='password') {

        const regex = /\w{6,}/;

        if (!regex.test(value)) {

            classList.remove('is-valid');
            classList.add('is-invalid');
            feedback.textContent = "長度需在六個字以上";

        } else { return success() }

    } else { return success() }

};

submit.addEventListener('click', submitData, false);

function submitData() {

    console.log(checkInfo(account),checkInfo(password));

    checkInfo(account) && checkInfo(password) &&
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
    inputList.forEach((input)=>{
        input.value = '';
        input.classList.remove('is-valid');
    })
}