import axios from "axios";

import { getToken, validation } from "./utilities/authorization.js";
import { toastMessage } from "./utilities/message.js";

// 轉址 ( 如果用戶處於登入狀態，不要讓他們訪問這個頁面 )

function init() { if (getToken()) { location.href="index.html" } }

init();

const { VITE_APP_SITE } = import.meta.env;

const form = document.querySelector('#register-form');

const username = document.getElementById('username');
const account = document.getElementById('account');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');

const submit = document.getElementById('submit');

// 即時驗證

const inputList = form.querySelectorAll('input');

inputList.forEach((input) => {
    input.addEventListener('input', (e)=>{
        validation(e.target);
        e.target.id === 'password-confirm' ? checkPasswordConfirm(e.target) : null;
    }, false)
});

// 提交驗證

form.addEventListener('submit', submitData, false);

function submitData(event) {

    event.preventDefault();

    inputList.forEach(input => validation(input)); // 同時驗證每個表單元素

    [...inputList].every(input => validation(input)) &&
    checkPasswordConfirm(passwordConfirm) &&
    handleRegister({ email: account.value, password: password.value, name: username.value, role: "member" });

}

function checkPasswordConfirm(input) {

    const { id, value, classList } = input;
    const feedback = document.querySelector(`[data-validation="${id}"]`);

    if (value !== password.value) {
        classList.remove('is-valid');
        classList.add('is-invalid');
        feedback.textContent = "兩次密碼不一致";
        return false;
    }

    return true;
    
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