import './assets/scss/main.scss';
import './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

// 半放棄的手刻 isActive :P

function navigation(){

    let currentRoute = '';

    if (location.hash) {
        currentRoute = location.hash.replace('#','');
    } else {
        currentRoute = location.href.split('/').pop().split('.').shift();
    }
    const currentPage = document.querySelectorAll(`[data-route="${currentRoute}"]`);
    currentPage.forEach(element => element.classList.add('active'));

}

navigation();