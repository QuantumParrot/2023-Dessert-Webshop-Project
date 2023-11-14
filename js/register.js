import axios from "axios";

import { getToken } from "./utilities/authorization.js";
import { toastMessage } from "./utilities/message.js";

// 轉址 ( 如果用戶處於登入狀態，不要讓他們訪問這個頁面 )

function init() {
    if (getToken()) { location.href="index.html" }
}

init();

const { VITE_APP_SITE } = import.meta.env;

const form = document.querySelector('#register-form');

const username = document.getElementById('username');
const account = document.getElementById('account');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');

const submit = document.getElementById('submit');

// 即時驗證

const inputList = document.querySelectorAll('input');

inputList.forEach((input) => {
    input.addEventListener('input', (e)=>{checkInfo(e.target)}, false)
});

// 驗證函式

function checkInfo(element) {

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

    } else if (id==="account") {

        // Email Regular Expression from JSON-server-auth 

        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if (!regex.test(value)) {

            classList.remove('is-valid');
            classList.add('is-invalid');
            feedback.textContent = "信箱格式不正確";
            
        } else { return success() }

    } else if (id==="password") {

        const regex = /\w{6,}/;

        if (!regex.test(value)) {

            classList.remove('is-valid');
            classList.add('is-invalid');
            feedback.textContent = "長度需在六個字以上";

        } else { return success() }

    } else if (id==="password-confirm") {

        if (value !== password.value) {

            classList.remove('is-valid');
            classList.add('is-invalid');
            feedback.textContent = "兩次密碼不一致";

        } else { return success() }

    } else { return success() }

}

// 提交驗證

form.addEventListener('submit', submitData, false);

function submitData(event) {

    event.preventDefault();

    inputList.forEach(input => checkInfo(input)); // 同時驗證每個表單元素

    [...inputList].every(input => !!checkInfo(input)) &&
    handleRegister({ email: account.value, password: password.value, name: username.value, role: "member" });

}

function handleRegister(info) {
    submit.setAttribute('disabled',true); // 在 AJAX 完成之前，防止用戶重複點擊提交網路請求
    axios.post(`${VITE_APP_SITE}/signup`, info)
    .then((res)=>{
        // console.log(res);
        submit.removeAttribute('disabled');
        toastMessage('success', '註冊成功！請登入', 'login.html')
        clear();
    })
    .catch((error)=>{
        // console.log(error);
        if (error.message === 'Network Error') {

            toastMessage('error', '無法連接伺服器，請聯絡管理員');

        } else {

            const { data } = error.response;
            data == "Email already exists" ? toastMessage('error', '用戶已存在') : null;
            clear();

        }
        submit.removeAttribute('disabled');
    })
};

// 清除表單內容與樣式

function clear() {
    inputList.forEach(input => {
        input.value= '';
        input.classList.remove('is-valid');
    });
};