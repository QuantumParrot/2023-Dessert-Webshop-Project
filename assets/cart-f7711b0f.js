import{g as h,t as d,a as m,e as f,w as y,S as b}from"./main-78beb421.js";import{h as g}from"./moment-fbc5633a.js";function x(e){return delete e.otherName,delete e.info,delete e.type,delete e.ingredients,delete e.image,e}const{VITE_APP_SITE:p}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function v(){const e=h();if(!e)d("warning","請先登入","login.html");else{const a=JSON.parse(localStorage.getItem("userData")).id;m.get(`${p}/640/user/${a}/carts?_expand=product`,{headers:{authorization:`Bearer ${e}`}}).then(n=>{w(n.data)}).catch(n=>{f(n)})}}v();function w(e){const a=document.querySelector("#cart");let n="";e.length===0?(n=`
        <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        購物車內還沒有商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
        </div>`,a.innerHTML=n):(n=`
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
        `,a.innerHTML=n,S(e),$(e))}function S(e){const a=document.querySelector("#main-content");let n="";e.forEach(t=>n+=`
    <li data-num=${t.id} class="list-group-item shadow-sm py-md-0 py-8">
        <div class="row align-items-center">
            <!-- 1 -->
            <div class="col-md-1 col-2 text-center">
                <button class="delete btn d-flex align-items-center p-0 ms-md-3">
                    <span class="material-icons fs-3">delete</span>
                </button>
            </div>
            <!-- 2 -->
            <div class="d-md-block d-none col-md-2">
                <a href="products-detail.html?id=${t.product.id}" class="text-decoration-none">
                <img src="${t.product.image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                     alt="${t.product.name}"
                     class="rounded-2">
                </a>
            </div>
            <!-- 3 -->
            <div class="col-md-3 col-6 d-flex justify-content-between align-items-center">
                <a href="products-detail.html?id=${t.product.id}" class="text-decoration-none">
                    <h3 class="fs-6 mb-0">${t.product.name}<span class="d-md-inline-block d-none">／${t.product.size}</span></h3>
                </a>
                <div class="d-md-none d-block">ｘ${t.qty}</div>
            </div>
            <!-- 4 -->
            <div class="col-md-4 d-md-block d-none">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-3">
                        <button class="btn p-0 mt-2"><span class="material-icons fs-2">add_circle</span></button>
                        <input class="form-control py-md-2 py-1 px-3 text-center" type="number" min="1" max="10" value=${t.qty}>
                        <button class="btn p-0 mt-2"><span class="material-icons fs-2">remove_circle</span></button>
                    </div>
                    <button class="changeQuantity btn btn-sm btn-primary px-2">修改數量</button>
                </div>
            </div>
            <!-- 5 -->
            <div class="col-md-2 col-4">
                <h4 id="cost" class="d-flex justify-content-between fs-6 px-md-2 px-0 mb-0">
                <span>NT＄</span>
                <span>${t.product.price*t.qty}</span>
                </h4>
            </div>
        </div>
    </li>
    `),a.innerHTML=n,document.querySelector("#confirm").addEventListener("click",t=>{e.some(s=>!s.product.forSale)?y("OOPS","購物車內有完售的商品，請刪除後再重新結帳"):q(t,e)},!1),[...a.children].forEach(t=>{const s=document.querySelector(`[data-num="${t.dataset.num}"] input`).value;T(t,s)})}function T(e,a){e.addEventListener("click",function(n){const{target:o}=n,r=o.closest("li").dataset.num;if(o.closest(".btn")){n.preventDefault();const t=h();if(o.textContent.includes("delete"))m.delete(`${p}/640/carts/${r}`,{headers:{authorization:`Bearer ${t}`}}).then(s=>{d("success","刪除成功"),v()}).catch(s=>{f(s)});else{const s=document.querySelector(`li[data-num="${r}"] input`);if(o.textContent.includes("add"))s.value>9?s.value:s.value++;else if(o.textContent.includes("remove"))s.value<2?s.value:s.value--;else if(o.classList.contains("changeQuantity")){let u=function(c){return isNaN(c)?(d("warning","請輸入阿拉伯數字"),s.value=a,!1):!Number.isInteger(c)||c<=0?(d("warning","請輸入大於零的正整數"),s.value=a,!1):!0};a==s.value?d("question","數量沒變哦 (ㆆᴗㆆ)"):s.value>10?y("數量達上限","如果需要大量訂購，請直接與我們聯絡"):u(+s.value)&&m.get(`${p}/640/carts/${r}`,{headers:{authorization:`Bearer ${t}`}}).then(c=>{let l=c.data;return l={...l,qty:+s.value},m.patch(`${p}/640/carts/${r}`,l,{headers:{authorization:`Bearer ${t}`}})}).then(c=>{d("success","數量修改成功！"),v()}).catch(c=>{f(c)})}}}else return})}function $(e){const a=document.querySelector("#subtotal"),n=document.querySelector("#delivery-fee"),o=document.querySelector("#total");a.textContent=e.reduce((r,t)=>r+Number(t.product.price)*t.qty,0),n.textContent=150,o.textContent=+a.textContent+ +n.textContent}function q(e,a){if(e.target.textContent==="下一步"){const n=document.querySelector("#process-title");e.target.textContent="結　帳",n.textContent="填寫寄送資訊";const o=document.querySelector("#main-content");let r="";r+=`<div class="border border-primary rounded-1 px-6 py-7">
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
                <label for="receiver" class="fw-bold mb-md-0 mb-3">收件人姓名：</label>
                <input type="text" id="receiver" class="form-control w-25 px-2 py-1">
                <div><input type="checkbox" id="useMemberName" class="me-2">同會員資料</div>
            </div>
            <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                <!-- phone -->
                <label for="phone" class="fw-bold mb-md-0 mb-3">收件人電話：</label>
                <input type="tel"
                       id="phone"
                       class="form-control w-25 px-2 py-1"
                       placeholder="請填寫國內的手機號碼"
                       value="0912987654">
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
        </div>`,o.innerHTML=r,document.querySelector("#useMemberName").addEventListener("change",function(s){if(s.target.checked){const u=JSON.parse(localStorage.getItem("userData")).name;receiver.value=u}else receiver.value=""})}else if(e.target.textContent==="結　帳"){let l=function(i){if((i==null?void 0:i.id)==="delivery-confirm"&&!(i!=null&&i.checked))return d("warning","請詳閱並同意寄送說明"),!1;if(i!=null&&i.value){if((i==null?void 0:i.id)==="phone"&&!/^09(\d){8}/.test(i.value))return d("warning","手機號碼格式不正確"),!1}else return d("warning","請確實填寫所有的欄位"),!1;return!0};const n=document.querySelector('input[name="method"]:checked'),o=document.querySelector('input[name="payment"]:checked'),r=document.querySelector("#receiver"),t=document.querySelector("#phone"),s=document.querySelector("#address"),u=document.querySelector('input[name="shippingTime"]:checked'),c=document.querySelector("#delivery-confirm");l(n)&&l(o)&&l(r)&&l(t)&&l(s)&&l(u)&&l(c)&&function(){const i={receiver:r.value,phone:t.value,address:s.value,payment:o.value,method:n.value,shippingTime:u.value};k(a,i)}()}}function k(e,a){b.fire({icon:"warning",title:"確定送出訂單？",text:"提醒您，按下送出之後即視為交易成立",position:"center",allowOutsideClick:!1,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"再想想看",confirmButtonColor:"#A37A64",confirmButtonText:"送出訂單",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const n=h(),o=document.querySelector("#total").textContent;e=e.map(t=>({...t,product:x(t.product)}));const r={orderNum:new Date().getTime()+`0${e[0].userId}`,content:e,total:Number(o),info:a,createdTime:g().format("YYYY-MM-D A hh:mm:ss"),userId:e[0].userId,isFinished:!1};m.post(`${p}/640/orders`,r,{headers:{authorization:`Bearer ${n}`}}).then(t=>e.forEach(s=>{m.delete(`${p}/640/carts/${s.id}`,{headers:{authorization:`Bearer ${n}`}})}))}catch(n){f(n)}}}).then(n=>{n.isConfirmed&&b.fire({icon:"success",title:"Terima kasih！謝謝您的訂購！",text:"我們將立即為您製作，請耐心等候商品送達",position:"center",confirmButtonColor:"#A37A64",timer:3e3}).then(()=>location.href="member.html")})}
