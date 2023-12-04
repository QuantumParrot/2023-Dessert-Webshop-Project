import{g as h,t as d,a as m,e as f,w as y,S as b}from"./main-7f841a0a.js";function g(e){return delete e.otherName,delete e.info,delete e.type,delete e.ingredients,delete e.image,e}const{VITE_APP_SITE:p}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function v(){const e=h();if(!e)d("warning","請先登入","login.html");else{const o=JSON.parse(localStorage.getItem("userData")).id;m.get(`${p}/640/user/${o}/carts?_expand=product`,{headers:{authorization:`Bearer ${e}`}}).then(s=>{x(s.data)}).catch(s=>{f(s)})}}v();function x(e){const o=document.querySelector("#cart");let s="";e.length===0?(s=`
        <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        購物車內還沒有商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
        </div>`,o.innerHTML=s):(s=`
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
        `,o.innerHTML=s,w(e),T(e))}function w(e){const o=document.querySelector("#main-content");let s="";e.forEach(t=>s+=`
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
    `),o.innerHTML=s,document.querySelector("#confirm").addEventListener("click",t=>{e.some(n=>!n.product.forSale)?y("OOPS","購物車內有完售的商品，請刪除後再重新結帳"):$(t,e)},!1),[...o.children].forEach(t=>{const n=document.querySelector(`[data-num="${t.dataset.num}"] input`).value;S(t,n)})}function S(e,o){e.addEventListener("click",function(s){const{target:a}=s,r=a.closest("li").dataset.num;if(a.closest(".btn")){s.preventDefault();const t=h();if(a.textContent.includes("delete"))m.delete(`${p}/640/carts/${r}`,{headers:{authorization:`Bearer ${t}`}}).then(n=>{d("success","刪除成功"),v()}).catch(n=>{f(n)});else{const n=document.querySelector(`li[data-num="${r}"] input`);if(a.textContent.includes("add"))n.value>9?n.value:n.value++;else if(a.textContent.includes("remove"))n.value<2?n.value:n.value--;else if(a.classList.contains("changeQuantity")){let u=function(c){return isNaN(c)?(d("warning","請輸入阿拉伯數字"),n.value=o,!1):!Number.isInteger(c)||c<=0?(d("warning","請輸入大於零的正整數"),n.value=o,!1):!0};o==n.value?d("question","數量沒變哦 (ㆆᴗㆆ)"):n.value>10?y("數量達上限","如果需要大量訂購，請直接與我們聯絡"):u(+n.value)&&m.get(`${p}/640/carts/${r}`,{headers:{authorization:`Bearer ${t}`}}).then(c=>{let l=c.data;return l={...l,qty:+n.value},m.patch(`${p}/640/carts/${r}`,l,{headers:{authorization:`Bearer ${t}`}})}).then(c=>{d("success","數量修改成功！"),v()}).catch(c=>{f(c)})}}}else return})}function T(e){const o=document.querySelector("#subtotal"),s=document.querySelector("#delivery-fee"),a=document.querySelector("#total");o.textContent=e.reduce((r,t)=>r+Number(t.product.price)*t.qty,0),s.textContent=150,a.textContent=+o.textContent+ +s.textContent}function $(e,o){if(e.target.textContent==="下一步"){const s=document.querySelector("#process-title");e.target.textContent="結　帳",s.textContent="填寫寄送資訊";const a=document.querySelector("#main-content");let r="";r+=`
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
        </div>`,a.innerHTML=r,document.querySelector("#useMemberName").addEventListener("change",function(n){if(n.target.checked){const u=JSON.parse(localStorage.getItem("userData")).name;receiver.value=u}else receiver.value=""})}else if(e.target.textContent==="結　帳"){let l=function(i){if((i==null?void 0:i.id)==="delivery-confirm"&&!(i!=null&&i.checked))return d("warning","請詳閱並同意寄送說明"),!1;if(i!=null&&i.value){if((i==null?void 0:i.id)==="phone"&&!/^09(\d){8}/.test(i.value))return d("warning","手機號碼格式不正確"),!1}else return d("warning","請確實填寫所有的欄位"),!1;return!0};const s=document.querySelector('input[name="method"]:checked'),a=document.querySelector('input[name="payment"]:checked'),r=document.querySelector("#receiver"),t=document.querySelector("#phone"),n=document.querySelector("#address"),u=document.querySelector('input[name="shippingTime"]:checked'),c=document.querySelector("#delivery-confirm");l(s)&&l(a)&&l(r)&&l(t)&&l(n)&&l(u)&&l(c)&&function(){const i={receiver:r.value,phone:t.value,address:n.value,payment:a.value,method:s.value,shippingTime:u.value};q(o,i)}()}}function q(e,o){const s=document.querySelector("#delivery-fee");b.fire({icon:"warning",title:"確定送出訂單？",text:"提醒您，按下送出之後即視為交易成立",position:"center",allowOutsideClick:!1,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"再想想看",confirmButtonColor:"#A37A64",confirmButtonText:"送出訂單",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const a=h(),r=document.querySelector("#total").textContent;e=e.map(n=>({...n,product:g(n.product)}));const t={orderNum:new Date().getTime()+`0${e[0].userId}`,content:e,total:Number(r),info:o,deliveryFee:Number(s.textContent),createdTime:new Date().getTime(),userId:e[0].userId,isFinished:!1};m.post(`${p}/640/orders`,t,{headers:{authorization:`Bearer ${a}`}}).then(n=>e.forEach(u=>{m.delete(`${p}/640/carts/${u.id}`,{headers:{authorization:`Bearer ${a}`}})}))}catch(a){f(a)}}}).then(a=>{a.isConfirmed&&b.fire({icon:"success",title:"Terima kasih！謝謝您的訂購！",text:"我們將立即為您製作，請耐心等候商品送達",position:"center",confirmButtonColor:"#A37A64",timer:3e3}).then(()=>location.href="member.html")})}
