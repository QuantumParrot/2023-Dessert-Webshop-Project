import axios from "axios";

const { VITE_APP_SITE } = import.meta.env;

const userId = JSON.parse(localStorage.getItem("userData"))?.id;

// init

function init() {
    axios.get(`${VITE_APP_SITE}/664/announcements?_sort=id&_order=desc&_limit=3`)
    .then((res)=>{
        renderAnnouncements(res.data);
        return axios.get(`${VITE_APP_SITE}/products`);
    })
    .then((res)=>{
        const getRandomProducts = randomRender(res.data);
        getRandomProducts(3);
    })
    .catch((error)=>{
        console.log(error);
    })
};

init();

// 最新消息

const announcements = document.querySelector('#announcements');

function renderAnnouncements(data){
    const img = {
        "網站公告": "https://i.imgur.com/ZdVvBk0.jpg",
        "開放預購": "https://i.imgur.com/uAiFLTz.jpg",
        "出貨通知": `https://fakeimg.pl/416x320/?text=出貨通知&font=noto`,
        "價格調整": "https://i.imgur.com/0v5peZM.jpg",
    }
    let str = ``;
    for (let i=0; i<data.length; i++) {
        str += /*html*/`
        <div class="col-lg-4 col-12">
            <div class="mb-6">
                <div class="card hover-scale h-100 shadow px-6 py-7">
                    <img class="d-block position-relative rounded-3 mb-6"
                         style="height: 314px;"
                         src="${data[i].image || img[data[i].type]}"
                         alt="${data[i].type}">
                    <h3 class="custom-tooltip w-75 position-absolute top-30 start-11 shadow-lg py-4 text-center">
                    ${data[i].type}
                    </h3>
                    <div class="card-body d-flex flex-column p-0">
                        <p class="fs-6 text-black mb-2">${data[i].date}</p>
                        <h4 class="flex-grow-1 fs-5 mb-9">${data[i].title}</h4>
                        <div class="text-center">
                            <a class="btn btn-sm btn-outline-primary" href="news-detail.html?id=${data[i].id}">繼續閱讀</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    };
    announcements.innerHTML = str;
}

// 熱銷排行

const rank = document.querySelector('#rank');

// 1. 固定取得前三筆商品資料

async function renderProducts(data) {

    // 如果處在登入狀態 ( 取得到 userId ) 時，渲染至頁面上的每一筆商品資料都需要新增屬性，判斷是否被使用者收藏

    if (userId) {
        const res = await axios.get(`${VITE_APP_SITE}/664/user/${userId}/collects?_expand=product`); // res.data 是特定使用者的收藏清單
        data = data.map(product => {
            return { ...product,
            isCollected: res.data.find(item => item.product.id == product.id) ? true : false }
        })
    }

    document.querySelector('#rank .loading').classList.add('d-none');
    let str = '';
    for (let i=0; i<data.length; i++) {
        str += /*html*/`
        <div class="col-lg-4 col-12">
            <a class="text-decoration-none" href="products-detail.html?id=${data[i].id}">
                <div class="card h-100 overflow-hidden border-0">
                    <div class="product h-100 mb-6 overflow-hidden">
                    <img src="${data[i].image[0] || `https://fakeimg.pl/291x291/?text=🍰&font=noto`}"
                         alt="${data[i].name}"
                         class="d-block rounded w-100 h-100">
                    </div>
                    <div class="ps-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h4 class="fs-5">${data[i].name}・<span class="text-muted">${data[i].size}</span></h4>
                                <p class="fs-6 text-orange fw-bold">NT＄${data[i].price}</p>
                            </div>
                            <div class="d-flex gap-3">
                                <button data-num="${data[i].id}" class="btn btn-sm btn-outline-orange p-1">
                                    <span class="material-icons d-flex">${data[i].isCollected ? "favorite" : "favorite_outline"}</span>
                                </button>
                                <button class="btn btn-sm btn-primary p-1">
                                    <span class="material-icons d-flex align-top">shopping_bag</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `
    };
    rank.innerHTML += str;

}

// 2. 隨機取得商品資料

function randomRender(data) {
        
    const products = data.filter(item => item.forSale);
    
    function getRandomItem() {
        const index = Math.floor(Math.random()*products.length);
        const target = products[index];
        products.splice(index,1);
        return target;
    }

    const randomData = [];

    return function(times) {
        for (let i=1; i<=times; i++) { randomData.push(getRandomItem()) };
        renderProducts(randomData);
    }

}
