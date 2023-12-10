import { toastMessage } from "./message.js";

const { VITE_APP_ADMIN_IDENTITY } = import.meta.env;

// 檢查用戶是否處於登入狀態

export function token() {

    const role = JSON.parse(localStorage.getItem('userData'))?.role;

    if (role === 'member') { return localStorage.getItem('token') }
    else if (role === 'admin') { return decodeToken(localStorage.getItem('token')) }
    
};

export function decodeToken(token) {
    return token.replace(VITE_APP_ADMIN_IDENTITY.split('').map(n=>n.charCodeAt()).join(''),'');
};

export const headers = {
    headers: {
        authorization: `Bearer ${token()}`
    }
};

// 用戶的驗證過期時自動登出

function jwtExpired() {
    const userRole = JSON.parse(localStorage.getItem('userData')).role;
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    userRole === 'admin' ? toastMessage('error','連線已逾時，請重新登入','admin-login.html') : toastMessage('error','連線已逾時，請重新登入','login.html');
};

export function errorHandle(error) {

    console.log(error);

    if (error.message === 'Network Error') {

        toastMessage('error', '無法連接伺服器，請聯絡管理員')

    } else if (error.response?.data) {

        const { data } = error.response;

        if (data === 'jwt expired') { jwtExpired() }
        else if (data === 'Email already exists') { toastMessage('error', '用戶已存在') }
        else if (data === 'Incorrect password') { toastMessage('error', '密碼錯誤') }

    }

};

// 檢查表單元素 ( 如果是管理員金鑰及密碼二次驗證，雖然一樣跑這個函式，但是只確認有無空白，其它條件在該頁面處理 )

export function validation(element) {

    const { id, type, value, classList } = element;

    const feedback = document.querySelector(`div[data-validation="${id}"]`);

    function changeValidStyle(boolean) {

        if (boolean) {
            
            classList.remove('is-invalid');
            classList.add('is-valid');
            feedback.textContent = '';

            return true;

        } else {

            classList.remove('is-valid');
            classList.add('is-invalid');

            return false;

        }

    }

    if (!value.replace(/\s/g,'')) {

        feedback.textContent = "欄位不可空白";
        return changeValidStyle(!!value.replace(/\s/g,''));

    } else if (id === 'phone') {

        const regex = /^09\d{8}$/;

        feedback.textContent = "手機格式不正確";
        return changeValidStyle(regex.test(value));

    } else if (id === 'account') {

        // Email Regular Expression from JSON-Server-Auth 

        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        feedback.textContent = "信箱格式不正確";
        return changeValidStyle(regex.test(value));
    
    } else if (type === 'password') {

        const regex = /\w{6,}/;

        feedback.textContent = "長度需在六個字以上";
        return changeValidStyle(regex.test(value));

    } else {

        return changeValidStyle(!!value);

    }

};

// 檢查是否為空白

export function checkEmpty(str) {
    return !str.toString().replace(/\s/g,'')
};