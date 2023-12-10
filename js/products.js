// 本頁面待解決問題：執行關鍵字搜尋時，讓左側的篩選頁籤跳回 " 全站商品 "

import axios from "axios";

import { toastMessage, warningMessage } from "./utilities/message.js";
import { token, headers, errorHandle } from "./utilities/authorization.js";
import { changeCartIcon } from "./nav.js";

const { VITE_APP_SITE } = import.meta.env;

let userData = [];

(async function(){
    try {

        // 初步取得所有商品的資訊

        const res = await axios.get(`${VITE_APP_SITE}/664/products`);
        let { data } = res;

        // 取得已登入的使用者資訊

        const userId = JSON.parse(localStorage.getItem("userData"))?.id;
        if (userId) {
            const res = await axios.get(`${VITE_APP_SITE}/600/users/${userId}/collects`, headers);
            data = data.map(product => {
                return { ...product, 
                isCollected: !!(res.data.find(item => item.productId == product.id)) };
            });
        }
        userData=data;
        renderProducts(userData);

    } catch(error) { errorHandle(error) }
})();

const products = document.querySelector('#products');
const filter = document.querySelector('#filter');
const search = document.querySelector('#search-bar');
const sumbit = document.querySelector('#submit');

function renderProducts(productData) {

    let str = '';
    productData.length === 0 ? str += /*html*/`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">找不到您要的商品喔 QQ</p>
    </div>` : 
    productData.forEach(product => {
        str += /*html*/`
        <div class="col-md-4 col-12 mb-9">
            <a class="text-decoration-none" href="products-detail.html?id=${product.id}">
                <div class="card hover-shadow h-100 overflow-hidden mb-6">
                    <div class="position-relative mb-6">
                        <img class="w-100"
                             src="${product.image[0] || `https://fakeimg.pl/291x291/?text=🍰&font=noto`}"
                             alt="${product.name}">
                        ${product.forSale ? '' : /*html*/`
                        <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center" style="backdrop-filter: brightness(70%)">
                            <h3 class="custom-tooltip w-100 text-center py-5">已售完</h3>
                        </div>`}
                    </div>
                    <div class="px-5">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h4 class="fs-6">${product.name}・<span class="text-muted">${product.size}</span></h4>
                                <p class="fs-7 text-orange fw-bold">NT＄${product.price}</p>
                            </div>
                            <div class="d-flex gap-3" data-id="${product.id}">
                                <button class="favorite btn btn-sm btn-outline-orange p-1">
                                    <span class="material-icons d-flex">${product.isCollected ? "favorite" : "favorite_outline"}</span>
                                </button>
                                <button class="cart btn btn-sm btn-primary p-1 ${product.forSale ? '' : 'disabled'}">
                                    <span class="material-icons d-flex">shopping_bag</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `;
    })
    products.innerHTML = str;
    
    search.value = '';

};

products.addEventListener('click', (e) => {

    if (!e.target.closest('button')) return;

    e.preventDefault(); // 阻止轉址

    const tokenValue = token();

    if (!tokenValue) { toastMessage('warning','請先登入') }
    else {

        const { classList } = e.target.closest('button');
        const id = e.target.closest('div').dataset.id;

        if (classList.contains('favorite')) {

            toggleStatus(id);

        } else if (classList.contains('cart')) {

            addToCart(id);

        }

    }

});

function toggleStatus(id) {

    // 1. 鎖定目標商品

    const targetProduct = userData.find(product => product.id == id);

    // 2. 取得使用者個人資料

    const userId = JSON.parse(localStorage.getItem("userData")).id;

    // 3. 取得當前篩選狀態 ( 如果是在 renderProducts 內 " 個別 " 綁定按鈕，就不需要這個步驟，帶入渲染資料就好 )

    const filter = document.querySelector('#filter .nav-link.active').textContent;

    // 4. 根據收藏與否打出不同的 API

    if (!targetProduct.isCollected) {

        const productData = { productId: Number(id), userId };

        axios.post(`${VITE_APP_SITE}/600/collects`, productData, headers)
        .then((res)=>{
            targetProduct.isCollected = true;
            userData = userData.map(product => product.id == id ? targetProduct : product);
            renderProducts(filter === '全站商品' ? userData : userData.filter(item => item.type.includes(filter)));
            toastMessage('success',`已成功收藏${targetProduct.name}`);
        })
        .catch((error)=>{ errorHandle(error) })
        
    } else if (targetProduct.isCollected) {

        axios.get(`${VITE_APP_SITE}/600/users/${userId}/collects`, headers)
        .then((res)=>{
            const targetId = res.data.find(collect => collect.productId == id).id;
            return axios.delete(`${VITE_APP_SITE}/600/collects/${targetId}`, headers)
        })
        .then((res)=>{
            targetProduct.isCollected = false;
            userData = userData.map(product => product.id == id ? targetProduct : product);
            renderProducts(filter === '全站商品' ? userData : userData.filter(item => item.type.includes(filter)));
            toastMessage('success',`已取消收藏${targetProduct.name}`);
        })
        .catch((error)=>{ errorHandle(error) })

    }

};

function addToCart(id) {
    
    const userId = JSON.parse(localStorage.getItem("userData")).id;

    axios.get(`${VITE_APP_SITE}/640/users/${userId}/carts?_expand=product`, headers)
    .then((res)=>{
        const { data } = res;
        let product = data.find(item => item.productId == id);
        if (product) {
            if (product.qty > 9) { return }
            else {
                return axios.patch(`${VITE_APP_SITE}/640/carts/${product.id}`, { qty: product.qty += 1 }, headers)
            }
        } else {
            product = { productId: Number(id), qty: 1, userId };
            return axios.post(`${VITE_APP_SITE}/640/carts`, product, headers)
        }
    })
    .then((res)=>{
        res ? toastMessage('success','成功加入購物車') : warningMessage('數量達上限','如果需要大量訂購，請直接與我們聯絡');
        changeCartIcon();
    })
    .catch((error)=>{ errorHandle(error) })

};

// 篩選

filter.addEventListener('click', function(e){
    if (e.target.nodeName === 'BUTTON') {
        const type = e.target.textContent;
        if (type !== '全站商品') {
            
            // 1. 遠端取資料版本

            // axios.get(`${VITE_APP_SITE}/products?type=${type}`)
            // .then((res)=>{
            //     renderProducts(res.data);
            // })
            // .catch((error)=>{
            //     console.log(error);
            // })

            // 2.

            renderProducts(userData.filter(item => item.type.includes(type)));

        } else {

            // 1. 遠端取資料版本

            // axios.get(`${VITE_APP_SITE}/products`)
            // .then((res)=>{
            //     renderProducts(res.data);
            // })
            // .catch((error)=>{
            //     console.log(error);
            // })

            // 2.

            renderProducts(userData);

        }
    }
}, false);

// 搜尋

sumbit.addEventListener('click', function(e){
    let value = search.value.replace(/\s/g,'');
    if (!value) { return } else {

        // 1. 遠端取資料版本

        // axios.get(`${VITE_APP_SITE}/products`)
        // .then((res)=>{
        //     let { data } = res;
        //     data = data.filter(item => item.name.includes(value));
        //     renderProducts(data);
        // })
        // .catch((error)=>{
        //     console.log(error);
        // });

        // 2.

        renderProducts(userData.filter(item => item.name.includes(value) || item.type.find(str => str.includes(value))));

    };
}, false);