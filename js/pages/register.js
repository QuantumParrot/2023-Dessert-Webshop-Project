// 本頁面待解決問題：在即時驗證的部分，如果用戶先輸入確認密碼欄位再輸入密碼欄位時，密碼比對不會運作

import axios from "axios";

import { token, validation } from "../utilities/authorization";
import { toastMessage } from "../utilities/message";

(() => {

    // 轉址 ( 如果用戶處於登入狀態，不要讓他們訪問這個頁面 )

    'use strict';

    if (token()) { location.href="index.html" }

})();

const { VITE_APP_SITE } = import.meta.env;

const form = document.querySelector('#register-form');

const username = document.getElementById('username');
const phone = document.getElementById('phone');
const account = document.getElementById('account');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');

const submit = document.getElementById('submit');

// 即時驗證

const inputList = form.querySelectorAll('input');

inputList.forEach((input) => {
    input.addEventListener('input', (e)=>{

        // 1. 所有的欄位都要進行驗證，此驗證包含：(1) 是否空白 (2) 手機、帳號、密碼是否符合格式

        // 2. 確認密碼欄位必須要和密碼欄位進行比對

        e.target.id === 'password-confirm' ? checkPasswordConfirm(e.target) : validation(e.target);

    }, false)
});

// 提交驗證

form.addEventListener('submit', submitData, false);

function submitData(event) {

    event.preventDefault();

    // 1. 為了讓所有欄位的驗證樣式能夠 " 同時 " 顯示

    inputList.forEach(input => validation(input));

    // 2. 滿足所有條件之後才會執行 handleRegister()

    [...inputList].every(input => validation(input)) &&
    checkPasswordConfirm(passwordConfirm) &&
    handleRegister({ phone: phone.value, email: account.value, password: password.value, name: username.value.trim(), role: "member" });

}

function checkPasswordConfirm(input) {

    const { id, value, classList } = input;
    const feedback = document.querySelector(`[data-validation="${id}"]`);

    if (value !== password.value) {

        classList.remove('is-valid');
        classList.add('is-invalid');
        feedback.textContent = "兩次密碼不一致";
        return false;

    } else { return validation(input) }
    
}

function handleRegister(info) {
    submit.setAttribute('disabled', true); // 在 AJAX 完成之前，防止用戶重複點擊提交網路請求
    axios.post(`${VITE_APP_SITE}/signup`, info)
    .then((res)=>{
        // console.log(res);
        toastMessage('success', '註冊成功！請登入', 'login.html')
        clear();
        submit.removeAttribute('disabled');
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
        input.value = '';
        input.classList.remove('is-valid');
    });
};