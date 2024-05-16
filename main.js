import './assets/scss/main.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './js/nav.js';
import { toastMessage } from './js/utilities/message.js';

function navigation(){

    const currentRoute = location.href.split('/').pop().split('.').shift();
    const currentPage = document.querySelectorAll(`[data-route="${currentRoute}"]`);
    currentPage.forEach(element => element.classList.add('active'));

}

(function () {

    // 登出功能

    const logoutButtons = document.querySelectorAll('.logout');

    if (logoutButtons) {

        logoutButtons.forEach(button => button.addEventListener('click', function(e){
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            toastMessage('success', '登出成功！期待您的下次造訪！', 'index.html');
        }))

    }
    
    navigation();

})();


