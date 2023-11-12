import { toastMessage } from "./message.js";

// 檢查用戶是否處於登入狀態

export function getToken() {
    return localStorage.getItem('token');
};

// 用戶的驗證過期時自動登出

function jwtExpired() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    toastMessage('error','連線已逾時，請重新登入','login.html');
}

export function errorHandle(error) {
    console.log(error);
    if (error.response.data == 'jwt expired') { jwtExpired() };
}