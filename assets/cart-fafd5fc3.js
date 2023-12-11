import{b as w,t as u,a as m,h as f,e as h,r as T,w as g,f as S,S as y}from"./main-cbfe09a5.js";function q(e){return delete e.otherName,delete e.info,delete e.type,delete e.ingredients,delete e.image,e}const{VITE_APP_SITE:v}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let o=[],l;function b(){if(!w())u("warning","請先登入","login.html");else{const a=JSON.parse(localStorage.getItem("userData")).id;m.get(`${v}/600/users/${a}/carts?_expand=product`,f).then(t=>{o=t.data,l=M({data:o,fee:150,threshold:2e3}),$()}).catch(t=>{h(t)})}}b();function $(){const e=document.querySelector("#cart");let a="";o.length===0?(T(),a=`
        <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        購物車內還沒有商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
        </div>`,e.innerHTML=a):(a=`
        <div class="col-md-9 mb-6">
            <ul id="main-content" class="list-group ps-0"></ul>
        </div>
        <div class="col-md-3">
            <div class="position-sticky top-0">
                <div class="bg-secondary rounded-1 p-6 lh-lg">
                    <h3 class="text-center mb-9">總計</h3>
                    <!-- 小計 -->
                    <div>
                    <div class="d-flex justify-content-between">
                        <p class="fw-bold">小計</p>
                        <p style="width: 40%" class="d-flex justify-content-between">
                        <span>NT＄</span>
                        <span id="subtotal">${l.subtotal}</span>
                        </p>
                    </div>
                    </div>
                    <!-- 運費 -->
                    <div>
                    <div class="d-flex justify-content-between">
                        <p class="fw-bold">運費</p>
                        <p style="width: 40%" class="d-flex justify-content-between">
                        <span>NT＄</span>
                        <span id="delivery-fee">${l.deliveryFeeOrigin}</span>
                        </p>
                    </div>
                    <div id="delivery-fee-discount" class="d-flex justify-content-between align-items-center"></div>
                    </div>
                    <hr>
                    <!-- 總計 -->
                    <div class="d-flex justify-content-between align-items-center fw-bold">
                        <p>總計</p>
                        <p class="fs-5">
                        <span>NT＄</span>
                        <span id="total"></span>
                        </p>
                    </div>
                </div>
                <div class="d-flex justify-content-end align-items-center gap-2 mt-6">
                    <input type="checkbox" name="delivery-confirm" id="delivery-confirm">我已詳閱並同意
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
        `,e.innerHTML=a,k(),x(l.haveReachThreshold))}function k(){const e=document.querySelector("#main-content");let a="";o.forEach(n=>a+=`
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
    `),e.innerHTML=a,e.addEventListener("click",C),document.querySelector("#confirm").addEventListener("click",n=>{o.some(r=>!r.product.forSale)?g("OOPS","購物車內有完售的商品，請刪除後再重新結帳"):I(n)},!1)}function C(e){if(!e.target.closest(".btn"))return;e.preventDefault();const a=e.target.closest("li").dataset.id;if(e.target.textContent.includes("delete"))m.delete(`${v}/600/carts/${a}`,f).then(t=>{u("success","成功刪除商品"),b()}).catch(t=>{h(t)});else{const t=document.querySelector(`li[data-id="${a}"] input`),n=t.getAttribute("value");if(e.target.textContent.includes("add"))t.value>9?t.value:t.value++;else if(e.target.textContent.includes("remove"))t.value<2?t.value:t.value--;else if(e.target.classList.contains("changeQuantity")){let r=function(i){if(isNaN(i)){u("warning","請輸入阿拉伯數字"),t.value=n;return}else if(!Number.isInteger(i)||i<=0){u("warning","請輸入大於零的正整數"),t.value=n;return}return!0};n==t.value?u("question","數量沒變哦 (ㆆᴗㆆ)"):t.value>10?g("數量達上限","如果需要大量訂購，請直接與我們聯絡"):r(Number(t.value))&&m.patch(`${v}/600/carts/${a}`,{qty:Number(t.value)},f).then(i=>{u("success","數量修改成功！"),b()}).catch(i=>{h(i)})}}}function x(e){const a=document.querySelector("#total"),t=document.querySelector("#delivery-fee"),n=document.querySelector("#delivery-fee-discount");e?(t.classList.add("text-decoration-line-through"),n.innerHTML=` 
        <p class="text-danger fs-7">符合免運條件！</p>
        <p style="width: 40%" class="d-flex justify-content-between">
            <span>NT＄</span>
            <span>${l.deliveryFee(e)}</span>
        </p>`):(t.classList.remove("text-decoration-line-through"),n.innerHTML=""),a.textContent=l.subtotal+l.deliveryFee(e)}function I(e){if(e.target.textContent==="下一步"){const a=document.querySelector("#process-title");e.target.textContent="結　帳",a.textContent="填寫寄送資訊";const t=document.querySelector("#main-content");let n="";n+=`
        <div class="border border-primary rounded-1 px-6 py-7">
            <form id="order-form" class="d-flex flex-column gap-7">
                <div id="method-listener" class="d-flex gap-2">
                    <!-- method -->
                    <p class="fw-bold">取貨方式：</p>
                    <input type="radio" name="method" id="宅配到府" value="宅配到府">
                    <label for="宅配到府">宅配到府</label>
                    <input type="radio" name="method" id="來店取貨" value="來店取貨">
                    <label for="來店取貨">來店取貨</label>
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
                    <input type="text"
                           name="name"
                           id="name"
                           class="form-control w-25 px-2 py-1">
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
                           name="phone"
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
                           name="address"
                           id="address"
                           class="form-control w-50 px-2 py-1"
                           placeholder="來店取貨可不填寫">
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
        </div>`,t.innerHTML=n,document.querySelector("#method-listener").addEventListener("change",d=>{d.target.nodeName==="INPUT"&&x(l.haveReachThreshold||d.target.value==="來店取貨")}),document.querySelectorAll("[data-receiver]").forEach(d=>d.addEventListener("change",function(p){const c=document.querySelector(`input#${p.target.dataset.receiver}`);if(p.target.checked){const s=JSON.parse(localStorage.getItem("userData"))[p.target.dataset.receiver];c.value=s}else c.value=""}))}else if(e.target.textContent==="結　帳"){let c=function(s){if((s==null?void 0:s.name)==="delivery-confirm"&&!(s!=null&&s.checked)){u("warning","請詳閱並同意寄送說明");return}else{if((s==null?void 0:s.name)==="address"&&a.value==="來店取貨")return!0;if(s!=null&&s.value.replace(/\s/g,"")){if((s==null?void 0:s.name)==="phone"&&!/^09\d{8}$/.test(s.value)){u("warning","手機格式不正確");return}}else{u("warning","請確實填寫所有的欄位");return}}return!0};const a=document.querySelector('input[name="method"]:checked'),t=document.querySelector('input[name="payment"]:checked'),n=document.querySelector("#name"),r=document.querySelector("#phone"),i=document.querySelector("#address"),d=document.querySelector('input[name="shippingTime"]:checked'),p=document.querySelector("#delivery-confirm");c(a)&&c(t)&&c(n)&&c(r)&&c(i)&&c(d)&&c(p)&&function(){const s={receiver:n.value,phone:r.value,address:S(i.value)?"來店取貨":i.value,payment:t.value,method:a.value,shippingTime:d.value};N(s)}()}}function N(e){y.fire({icon:"warning",title:"確定送出訂單？",text:"提醒您，按下送出之後即視為交易成立",position:"center",allowOutsideClick:!1,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"再想想看",confirmButtonColor:"#A37A64",confirmButtonText:"送出訂單",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const a=l.deliveryFee(l.haveReachThreshold||e.method==="來店取貨");o=o.map(n=>({...n,product:q(n.product)}));const t={orderNum:new Date().getTime()+`0${o[0].userId}`,content:o,total:l.subtotal+a,info:e,deliveryFee:a,createdTime:new Date().getTime(),userId:o[0].userId,isFinished:!1};m.post(`${v}/600/orders`,t,f).then(n=>o.forEach(r=>{m.delete(`${v}/600/carts/${r.id}`,f)}))}catch(a){h(a)}}}).then(a=>{a.isConfirmed&&y.fire({icon:"success",title:"Terima kasih！謝謝您的訂購！",text:"我們將立即為您製作，請耐心等候商品送達",position:"center",confirmButtonColor:"#A37A64",timer:3e3}).then(()=>location.href="member.html")})}function M(e){const{data:a,fee:t,threshold:n}=e,r=a.reduce((i,d)=>i+Number(d.product.price)*d.qty,0);return{subtotal:r,deliveryFeeOrigin:t,haveReachThreshold:r>=n,deliveryFee:function(i){return i?0:t}}}
