import './assets/scss/main.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

(() => {

    navigation();

})();

function navigation(){

    const currentRoute = location.href.split('/').pop().split('.').shift();
    const currentPage = document.querySelectorAll(`[data-route="${currentRoute}"]`);
    currentPage.forEach(element => element.classList.add('active'));

}


