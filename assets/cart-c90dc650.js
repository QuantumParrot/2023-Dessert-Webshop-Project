import{b as g,t as c,a as u,h as p,e as v,r as x,w as y,S as h}from"./main-bd493cb3.js";function w(t){return delete t.otherName,delete t.info,delete t.type,delete t.ingredients,delete t.image,t}const{VITE_APP_SITE:m}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let r=[];function b(){if(!g())c("warning","請先登入","login.html");else{const a=JSON.parse(localStorage.getItem("userData")).id;u.get(`${m}/600/users/${a}/carts?_expand=product`,p).then(e=>{r=e.data,S()}).catch(e=>{v(e)})}}b();function S(){const t=document.querySelector("#cart");let a="";r.length===0?(x(),a=`
        <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        購物車內還沒有商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
        </div>`,t.innerHTML=a):(a=`
        <div class="col-md-9 mb-6">
            <ul id="main-content" class="list-group ps-0"></ul>
        </div>
        <div class="col-md-3">
            <div class="position-sticky top-0">
                <div class="bg-secondary rounded-1 p-6 lh-lg">
                    <h3 class="text-center mb-9">總計</h3>
                    <!-- 小計 -->
                    <div class="d-flex justify-content-between">
                        <p class="fw-bold">小計</p>
                        <p style="width: 40%" class="d-flex justify-content-between">
                            <span>NT＄</span>
                            <span id="subtotal"></span>
                        </p>
                    </div>
                    <!-- 運費 -->
                    <div class="d-flex justify-content-between">
                        <p class="fw-bold">運費</p>
                        <p style="width: 40%" class="d-flex justify-content-between">
                            <span>NT＄</span>
                            <span id="delivery-fee"></span>
                        </p>
                    </div>
                    <hr>
                    <!-- 總計 -->
                    <div class="d-flex justify-content-between align-items-center fw-bold">
                        <p>總計</p>
                        <p class="fs-5">
                        <span>NT＄</span><span id="total"></span>
                        </p>
                    </div>
                </div>
                <div class="d-flex justify-content-end align-items-center gap-2 mt-6">
                    <input type="checkbox" id="delivery-confirm">我已詳閱並同意
                    <a href="#"
                       class="text-decoration-none fw-bold text-orange"
                       data-bs-toggle="modal"
                       data-bs-target="#deliveryInfoModal">
                    寄送說明</a>
                </div>
                <div class="mt-6 text-end">
                    <button id="confirm" class="btn btn-primary">下一步</button>
                </div>
            </div>
        </div>
        `,t.innerHTML=a,T(),C())}function T(){const t=document.querySelector("#main-content");let a="";r.forEach(n=>a+=`
    <li data-id="${n.id}" class="list-group-item shadow-sm py-md-0 py-8">
        <div class="row align-items-center">
            <!-- 1 -->
            <div class="col-md-1 col-2 text-center">
                <button class="delete btn d-flex align-items-center p-0 ms-md-3">
                    <span class="material-icons fs-3">delete</span>
                </button>
            </div>
            <!-- 2 -->
            <div class="d-md-block d-none col-md-2">
                <a href="products-detail.html?id=${n.product.id}" class="text-decoration-none">
                <img src="${n.product.image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                     alt="${n.product.name}"
                     class="rounded-2">
                </a>
            </div>
            <!-- 3 -->
            <div class="col-md-3 col-6 d-flex justify-content-between align-items-center">
                <a href="products-detail.html?id=${n.product.id}" class="text-decoration-none">
                    <h3 class="fs-6 mb-0">${n.product.name}<span class="d-md-inline-block d-none">／${n.product.size}</span></h3>
                </a>
                <div class="d-md-none d-block">ｘ${n.qty}</div>
            </div>
            <!-- 4 -->
            <div class="col-md-4 d-md-block d-none">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-3">
                        <button class="btn p-0 mt-2"><span class="material-icons fs-2">add_circle</span></button>
                        <input class="form-control py-md-2 py-1 px-3 text-center" type="number" min="1" max="10" value=${n.qty}>
                        <button class="btn p-0 mt-2"><span class="material-icons fs-2">remove_circle</span></button>
                    </div>
                    <button class="changeQuantity btn btn-sm btn-primary px-2">修改數量</button>
                </div>
            </div>
            <!-- 5 -->
            <div class="col-md-2 col-4">
                <h4 id="cost" class="d-flex justify-content-between fs-6 px-md-2 px-0 mb-0">
                <span>NT＄</span>
                <span>${n.product.price*n.qty}</span>
                </h4>
            </div>
        </div>
    </li>
    `),t.innerHTML=a,t.addEventListener("click",q),document.querySelector("#confirm").addEventListener("click",n=>{r.some(o=>!o.product.forSale)?y("OOPS","購物車內有完售的商品，請刪除後再重新結帳"):k(n)},!1)}function q(t){if(!t.target.closest(".btn"))return;t.preventDefault();const a=t.target.closest("li").dataset.id;if(t.target.textContent.includes("delete"))u.delete(`${m}/600/carts/${a}`,p).then(e=>{c("success","成功刪除商品"),b()}).catch(e=>{v(e)});else{const e=document.querySelector(`li[data-id="${a}"] input`),n=e.getAttribute("value");if(t.target.textContent.includes("add"))e.value>9?e.value:e.value++;else if(t.target.textContent.includes("remove"))e.value<2?e.value:e.value--;else if(t.target.classList.contains("changeQuantity")){let o=function(i){if(isNaN(i)){c("warning","請輸入阿拉伯數字"),e.value=n;return}else if(!Number.isInteger(i)||i<=0){c("warning","請輸入大於零的正整數"),e.value=n;return}return!0};n==e.value?c("question","數量沒變哦 (ㆆᴗㆆ)"):e.value>10?y("數量達上限","如果需要大量訂購，請直接與我們聯絡"):o(Number(e.value))&&u.patch(`${m}/600/carts/${a}`,{qty:Number(e.value)},p).then(i=>{c("success","數量修改成功！"),b()}).catch(i=>{v(i)})}}}function C(){const t=document.querySelector("#subtotal"),a=document.querySelector("#delivery-fee"),e=document.querySelector("#total");t.textContent=r.reduce((n,o)=>n+Number(o.product.price)*o.qty,0),a.textContent=150,e.textContent=+t.textContent+ +a.textContent}function k(t){if(t.target.textContent==="下一步"){const a=document.querySelector("#process-title");t.target.textContent="結　帳",a.textContent="填寫寄送資訊";const e=document.querySelector("#main-content");let n="";n+=`
        <div class="border border-primary rounded-1 px-6 py-7">
            <form id="order-form" class="d-flex flex-column gap-7">
                <div class="d-flex gap-2">
                    <!-- method -->
                    <p class="fw-bold">取貨方式：</p>
                    <input type="radio" name="method" id="宅配到府" value="宅配到府">
                    <label name="method" for="宅配到府">宅配到府</label>
                    <input type="radio" name="method" id="來店取貨" value="來店取貨">
                    <label name="method" for="來店取貨">來店取貨</label>
                </div>
                <div class="d-flex gap-2">
                    <!-- payment -->
                    <p class="fw-bold">付款方式：</p>
                    <input type="radio" name="payment" id="貨到付款" value="貨到付款">
                    <label for="貨到付款">貨到付款</label>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- receiver -->
                    <label for="name" class="fw-bold mb-md-0 mb-3">收件人姓名：</label>
                    <input type="text" id="name" class="form-control w-25 px-2 py-1">
                    <div>
                        <input type="checkbox" id="useMemberName" data-receiver="name"
                               class="me-2">
                        <label for="useMemberName">同會員資料</label>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- phone -->
                    <label for="phone" class="fw-bold mb-md-0 mb-3">收件人電話：</label>
                    <input type="tel"
                           id="phone"
                           class="form-control w-25 px-2 py-1"
                           placeholder="請填寫國內的手機號碼">
                    <div>
                        <input type="checkbox" id="useMemberPhone" data-receiver="phone"
                               class="me-2">
                        <label for="useMemberPhone">同會員資料</label>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- address -->
                    <label for="address" class="fw-bold mb-md-0 mb-3">收件人地址：</label>
                    <input type="text"
                           id="address"
                           class="form-control w-50 px-2 py-1"
                           placeholder="請填寫國內的地址"
                           value="台南市東區大學路一號">
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- shippingTime -->
                    <p class="fw-bold mb-md-0 mb-3">指定收貨時段：</p>
                    <div>
                        <input type="radio" name="shippingTime" id="不指定" value="不指定">
                        <label name="shippingTime" for="不指定">不指定</label>
                        <input type="radio" name="shippingTime" id="ante-meridiem" value="中午前">
                        <label name="shippingTime" for="ante-meridiem">中午前</label>
                        <input type="radio" name="shippingTime" id="post-meridiem" value="下午兩點～六點">
                        <label name="shippingTime" for="post-meridiem">下午兩點～六點</label>
                    </div>
                </div>
            </form>
        </div>`,e.innerHTML=n,document.querySelectorAll("[data-receiver]").forEach(i=>i.addEventListener("change",function(d){const f=document.querySelector(`input#${d.target.dataset.receiver}`);if(d.target.checked){const l=JSON.parse(localStorage.getItem("userData"))[d.target.dataset.receiver];f.value=l}else f.value=""}))}else if(t.target.textContent==="結　帳"){let l=function(s){if((s==null?void 0:s.id)==="delivery-confirm"&&!(s!=null&&s.checked)){c("warning","請詳閱並同意寄送說明");return}else if(s!=null&&s.value.replace(/\s/g,"")){if((s==null?void 0:s.id)==="phone"&&!/^09\d{8}$/.test(s==null?void 0:s.value)){c("warning","手機格式不正確");return}}else{c("warning","請確實填寫所有的欄位");return}return!0};const a=document.querySelector('input[name="method"]:checked'),e=document.querySelector('input[name="payment"]:checked'),n=document.querySelector("#name"),o=document.querySelector("#phone"),i=document.querySelector("#address"),d=document.querySelector('input[name="shippingTime"]:checked'),f=document.querySelector("#delivery-confirm");l(a)&&l(e)&&l(n)&&l(o)&&l(i)&&l(d)&&l(f)&&function(){const s={receiver:n.value,phone:o.value,address:i.value,payment:e.value,method:a.value,shippingTime:d.value};$(s)}()}}function $(t){const a=document.querySelector("#delivery-fee");h.fire({icon:"warning",title:"確定送出訂單？",text:"提醒您，按下送出之後即視為交易成立",position:"center",allowOutsideClick:!1,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"再想想看",confirmButtonColor:"#A37A64",confirmButtonText:"送出訂單",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const e=document.querySelector("#total").textContent;r=r.map(o=>({...o,product:w(o.product)}));const n={orderNum:new Date().getTime()+`0${r[0].userId}`,content:r,total:Number(e),info:t,deliveryFee:Number(a.textContent),createdTime:new Date().getTime(),userId:r[0].userId,isFinished:!1};u.post(`${m}/600/orders`,n,p).then(o=>r.forEach(i=>{u.delete(`${m}/600/carts/${i.id}`,p)}))}catch(e){v(e)}}}).then(e=>{e.isConfirmed&&h.fire({icon:"success",title:"Terima kasih！謝謝您的訂購！",text:"我們將立即為您製作，請耐心等候商品送達",position:"center",confirmButtonColor:"#A37A64",timer:3e3}).then(()=>location.href="member.html")})}
