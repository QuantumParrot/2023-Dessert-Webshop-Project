import axios from "axios";

import { toastMessage, warningMessage } from "./utilities/message.js";
import { getToken, errorHandle } from "./utilities/authorization.js";

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
            const res = await axios.get(`${VITE_APP_SITE}/664/user/${userId}/collects`);
            data = data.map(product => {
                return { ...product, 
                isCollected: !!(res.data.find(item => item.content.id == product.id)) };
            });
        }
        userData=data;
        renderData(userData);

    } catch(error) { console.log(error) }
})();

const products = document.querySelector('#products');
const filter = document.querySelector('#filter');
const search = document.querySelector('#search-bar');
const sumbit = document.querySelector('#submit');

function renderData(productList) {

    let str = '';
    productList.length === 0 ? str += /*html*/`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">找不到您要的商品喔 QQ</p>
    </div>` : 
    productList.forEach(product => {
        str += /*html*/`
        <div class="col-md-4 col-12 mb-9">
            <a class="text-decoration-none" href="products-detail.html?id=${product.id}">
                <div class="card hover-shadow h-100 overflow-hidden mb-6">
                    <img class="mb-6"
                         src="${product.image[0] || `https://fakeimg.pl/291x291/?text=🍰&font=noto`}"
                         alt="${product.name}">
                    <div class="px-5">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h4 class="fs-6">${product.name}・<span class="text-muted">${product.size}</span></h4>
                                <p class="fs-7 text-orange fw-bold">NT＄${product.price}</p>
                            </div>
                            <div class="d-flex gap-3">
                                <button data-num="${product.id}" class="favorite btn btn-sm btn-outline-orange p-1">
                                    <span class="material-icons d-flex">${product.isCollected ? "favorite" : "favorite_outline"}</span>
                                </button>
                                <button data-num="${product.id}" class="cart btn btn-sm btn-primary p-1">
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

    // 待優化的程式碼 //

    const favoriteButtons = document.querySelectorAll('.favorite');
    favoriteButtons.forEach(favoriteButton => { toggleStatus(favoriteButton, productList) });

    const cartButtons = document.querySelectorAll('.cart');
    cartButtons.forEach(cartButton => { addToCart(cartButton, productList) });

};

function toggleStatus(element, data) {

    element.addEventListener('click', (e) => {

        e.preventDefault();
        const token = getToken();
        
        if (!token) { toastMessage('warning','請先登入') }
        else {

            const targetProduct = data.find(product => product.id == element.dataset.num);

            // 取得使用者個人資料

            const userId = JSON.parse(localStorage.getItem("userData")).id;

            if (!targetProduct.isCollected) {

                const product = { 
                    content: targetProduct, 
                    userId 
                };
                delete product.content.isCollected;
                axios.post(`${VITE_APP_SITE}/640/collects`, product, {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                })
                .then((res)=>{
                    targetProduct.isCollected = true;
                    data = data.map(product => product.id == element.dataset.num ? targetProduct : product);
                    renderData(data);
                    toastMessage('success',`已成功收藏${targetProduct.name}`);
                })
                .catch((error)=>{ errorHandle(error) })
                
            } else if (targetProduct.isCollected) {

                axios.get(`${VITE_APP_SITE}/users/${userId}/collects`)
                .then((res)=>{
                    const targetId = res.data.find(collect => collect.content.id == targetProduct.id).id;
                    return axios.delete(`${VITE_APP_SITE}/640/collects/${targetId}`, {
                        headers: {
                            "authorization": `Bearer ${token}`
                        }
                    })
                })
                .then((res)=>{
                    targetProduct.isCollected = false;
                    data = data.map(product => product.id == element.dataset.num ? targetProduct : product);
                    renderData(data);
                    toastMessage('success',`已取消收藏${targetProduct.name}`);
                })
                .catch((error)=>{ errorHandle(error) })

            }
            
        }

    }, false)
}

function addToCart(element, data) {
    
    element.addEventListener('click', function(e){

        e.preventDefault();

        const token = getToken();

        if (!token) { toastMessage('warning','請先登入') }
        else {

            const targetProduct = data.find(item => item.id == element.dataset.num);
            
            const userId = +JSON.parse(localStorage.getItem("userData")).id;

            axios.get(`${VITE_APP_SITE}/640/users/${userId}/carts`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            .then((res)=>{
                const { data } = res;
                let product = data.find(item => item.content.id == element.dataset.num);
                if (product) {
                    if (product.qty > 9) { return }
                    else {
                        product = { ...product, qty: product.qty += 1 };
                        return axios.patch(`${VITE_APP_SITE}/640/carts/${product.id}`, product, {
                            headers: {
                                "authorization": `Bearer ${token}`
                            }
                        })
                    }
                } else {
                    product = { content: targetProduct, qty: 1, userId };
                    delete product.content.isCollected;
                    return axios.post(`${VITE_APP_SITE}/640/carts`, product, {
                        headers: {
                            "authorization": `Bearer ${token}`
                        }
                    })
                }  
            })
            .then((res)=>{
                res ? toastMessage('success','成功加入購物車') : warningMessage('數量達上限','如果需要大量訂購，請直接與我們聯絡');
            })
            .catch((error)=>{ errorHandle(error) })
        }

    }, false)

}

// 篩選

filter.addEventListener('click', function(e){
    if (e.target.nodeName == 'BUTTON') {
        const type = e.target.textContent;
        if (type !== '全站商品') {
            
            // 1. 遠端取資料版本

            // axios.get(`${VITE_APP_SITE}/products?type=${type}`)
            // .then((res)=>{
            //     renderData(res.data);
            // })
            // .catch((error)=>{
            //     console.log(error);
            // })

            // 2.

            renderData(userData.filter(item => item.type.includes(type)));

        } else {

            // 1. 遠端取資料版本

            // axios.get(`${VITE_APP_SITE}/products`)
            // .then((res)=>{
            //     renderData(res.data);
            // })
            // .catch((error)=>{
            //     console.log(error);
            // })

            // 2.

            renderData(userData);

        }
    }
}, false);

// 搜尋

sumbit.addEventListener('click',function(e){
    let value = search.value.replace(/\s/g,'');
    if (!value) { return } else {

        // 1. 遠端取資料版本

        // axios.get(`${VITE_APP_SITE}/products`)
        // .then((res)=>{
        //     let { data } = res;
        //     data = data.filter(item => item.name.includes(value));
        //     renderData(data);
        // })
        // .catch((error)=>{
        //     console.log(error);
        // });

        // 2.

        renderData(userData.filter(item => item.name.includes(value)));

    };
}, false)