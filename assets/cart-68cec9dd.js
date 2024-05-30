import{t as S,b as l,a as m,h as f,e as h,w as g,d as T,S as y}from"./main-5bc21e7f.js";import{r as k}from"./header-state-d9f1b448.js";function $(e){return delete e.otherName,delete e.info,delete e.type,delete e.ingredients,delete e.image,e}const{VITE_APP_SITE:v}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let c=[],d;function b(){if(!S())l("warning","請先登入","login.html");else{const t=JSON.parse(localStorage.getItem("userData")).id;m.get(`${v}/600/users/${t}/carts?_expand=product`,f).then(n=>{c=n.data,d=j({data:c,fee:150,threshold:2e3}),q()}).catch(n=>{h(n)})}}b();function q(){const e=document.querySelector("#cart");let t="";c.length===0?(k(),t=`
        <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        購物車內還沒有商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
        </div>`,e.innerHTML=t):(t=`
        <div class="col-md-9 mb-6">
            <div class="bg-secondary rounded-2 p-3 mb-6">
                <div class="d-flex gap-3">
                    <span class="material-icons text-orange">campaign</span>
                    <p>單筆消費<span class="text-danger">滿兩千</span>即享有免運優惠！</p>
                </div>
            </div>
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
                        <span id="subtotal">${d.subtotal}</span>
                        </p>
                    </div>
                    </div>
                    <!-- 運費 -->
                    <div>
                    <div class="d-flex justify-content-between">
                        <p class="fw-bold">運費</p>
                        <p style="width: 40%" class="d-flex justify-content-between">
                        <span>NT＄</span>
                        <span id="delivery-fee">${d.deliveryFeeOrigin}</span>
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
                    <input type="checkbox" class="form-check-input" name="delivery-confirm" id="delivery-confirm">我已詳閱並同意
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
        `,e.innerHTML=t,I(),x(d.haveReachThreshold))}function I(){const e=document.querySelector("#main-content");let t="";c.forEach(s=>t+=`
    <li data-id="${s.id}" class="list-group-item shadow-sm py-md-0 py-8">
        <div class="row align-items-center">
            <!-- 1 -->
            <div class="col-md-1 col-2 text-center">
                <button class="delete btn d-flex align-items-center p-0 ms-md-3">
                    <span class="material-icons fs-3">delete</span>
                </button>
            </div>
            <!-- 2 -->
            <div class="d-md-block d-none col-md-2">
                <a href="products-detail.html?id=${s.product.id}" class="text-decoration-none">
                <img src="${s.product.image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                     alt="${s.product.name}"
                     class="rounded-2">
                </a>
            </div>
            <!-- 3 -->
            <div class="col-md-3 col-6 d-flex justify-content-between align-items-center">
                <a href="products-detail.html?id=${s.product.id}" class="text-decoration-none">
                    <h3 class="fs-6 mb-0">${s.product.name}<span class="d-md-inline-block d-none">／${s.product.size}</span></h3>
                </a>
                <div class="d-md-none d-block">ｘ${s.qty}</div>
            </div>
            <!-- 4 -->
            <div class="col-md-4 d-md-block d-none">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-3">
                        <button class="btn p-0 mt-2"><span class="material-icons fs-2">add_circle</span></button>
                        <input class="form-control py-md-2 py-1 px-3 text-center" type="number" min="1" max="10" value=${s.qty}>
                        <button class="btn p-0 mt-2"><span class="material-icons fs-2">remove_circle</span></button>
                    </div>
                    <button class="changeQuantity btn btn-sm btn-primary px-2">修改數量</button>
                </div>
            </div>
            <!-- 5 -->
            <div class="col-md-2 col-4">
                <h4 id="cost" class="d-flex justify-content-between fs-6 px-md-2 px-0 mb-0">
                <span>NT＄</span>
                <span>${s.product.price*s.qty}</span>
                </h4>
            </div>
        </div>
    </li>
    `),e.innerHTML=t,e.addEventListener("click",C),document.querySelector("#confirm").addEventListener("click",s=>{c.some(i=>!i.product.forSale)?g("OOPS","購物車內有完售的商品，請刪除後再重新結帳"):N(s)},!1)}function C(e){if(!e.target.closest(".btn"))return;e.preventDefault();const t=e.target.closest("li").dataset.id;if(e.target.textContent.includes("delete"))m.delete(`${v}/600/carts/${t}`,f).then(n=>{l("success","成功刪除商品"),b()}).catch(n=>{h(n)});else{const n=document.querySelector(`li[data-id="${t}"] input`),s=n.getAttribute("value");if(e.target.textContent.includes("add"))n.value>9?n.value:n.value++;else if(e.target.textContent.includes("remove"))n.value<2?n.value:n.value--;else if(e.target.classList.contains("changeQuantity")){let i=function(r){if(isNaN(r)){l("warning","請輸入阿拉伯數字"),n.value=s;return}else if(!Number.isInteger(r)||r<=0){l("warning","請輸入大於零的正整數"),n.value=s;return}return!0};if(s==n.value)return;n.value>10?g("數量達上限","如果需要大量訂購，請直接與我們聯絡"):i(Number(n.value))&&m.patch(`${v}/600/carts/${t}`,{qty:Number(n.value)},f).then(r=>{l("success","數量修改成功！"),b()}).catch(r=>{h(r)})}}}function x(e){const t=document.querySelector("#total"),n=document.querySelector("#delivery-fee"),s=document.querySelector("#delivery-fee-discount");e?(n.classList.add("text-decoration-line-through"),s.innerHTML=` 
        <p class="text-danger fs-7">符合免運條件！</p>
        <p style="width: 40%" class="d-flex justify-content-between">
            <span>NT＄</span>
            <span>${d.deliveryFee(e)}</span>
        </p>`):(n.classList.remove("text-decoration-line-through"),s.innerHTML=""),t.textContent=d.subtotal+d.deliveryFee(e)}function N(e){if(e.target.textContent==="下一步"){window.innerWidth<768&&(document.documentElement.scrollTop=0);const t=document.querySelector("#process-title");e.target.textContent="結　帳",t.textContent="填寫寄送資訊";const n=document.querySelector("#main-content");let s="";s+=`
        <div class="border border-primary rounded-1 px-6 py-7">
            <form id="order-form" class="d-flex flex-column gap-7">
                <div id="method-listener" class="d-flex gap-2">
                    <!-- method -->
                    <p class="fw-bold">取貨方式：</p>
                    <input type="radio" class="form-check-input" name="method" id="宅配到府" value="宅配到府">
                    <label for="宅配到府">宅配到府</label>
                    <input type="radio" class="form-check-input" name="method" id="來店取貨" value="來店取貨">
                    <label for="來店取貨">來店取貨</label>
                </div>
                <div class="d-flex gap-2">
                    <!-- payment -->
                    <p class="fw-bold">付款方式：</p>
                    <input type="radio" class="form-check-input" name="payment" id="貨到付款" value="貨到付款">
                    <label for="貨到付款">貨到付款</label>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- receiver -->
                    <label for="name" class="fw-bold mb-md-0 mb-3">收件人姓名：</label>
                    <input type="text"
                           name="name"
                           id="name"
                           class="form-control w-25 px-2 py-1 me-md-1 mb-md-0 mb-3">
                    <div>
                        <input type="checkbox" class="form-check-input" id="useMemberName" data-receiver="name"
                               class="me-1">
                        <label for="useMemberName">同會員資料</label>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- phone -->
                    <label for="phone" class="fw-bold mb-md-0 mb-3">收件人電話：</label>
                    <input type="tel"
                           name="phone"
                           id="phone"
                           class="form-control w-25 px-2 py-1 me-md-1 mb-md-0 mb-3"
                           placeholder="請填寫國內的手機號碼">
                    <div>
                        <input type="checkbox" class="form-check-input" id="useMemberPhone" data-receiver="phone"
                               class="me-1">
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
                    <div>
                        <select id="select-address" data-receiver="address" class="form-select px-2 py-1" style="min-width: 280px">
                            <option value="" selected disabled>選擇已儲存的地址</option>
                        </select>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-2">
                    <!-- shippingTime -->
                    <p class="fw-bold mb-md-0 mb-3">指定收貨時段：</p>
                    <div>
                        <input type="radio" class="form-check-input" name="shippingTime" id="不指定" value="不指定">
                        <label name="shippingTime" for="不指定">不指定</label>
                        <input type="radio" class="form-check-input" name="shippingTime" id="ante-meridiem" value="中午前">
                        <label name="shippingTime" for="ante-meridiem">中午前</label>
                        <input type="radio" class="form-check-input" name="shippingTime" id="post-meridiem" value="下午兩點～六點">
                        <label name="shippingTime" for="post-meridiem">下午兩點～六點</label>
                    </div>
                </div>
            </form>
        </div>`,n.innerHTML=s,E(),document.querySelector("#select-address").addEventListener("change",D),document.querySelector("#method-listener").addEventListener("change",p=>{p.target.nodeName==="INPUT"&&x(d.haveReachThreshold||p.target.value==="來店取貨")}),document.querySelectorAll("input[data-receiver]").forEach(p=>p.addEventListener("change",function(o){const a=document.querySelector(`input#${o.target.dataset.receiver}`);if(o.target.checked){const w=JSON.parse(localStorage.getItem("userData"))[o.target.dataset.receiver];a.value=w}else a.value=""}))}else if(e.target.textContent==="結　帳"){let o=function(a){if((a==null?void 0:a.name)==="delivery-confirm"&&!(a!=null&&a.checked)){l("warning","請詳閱並同意寄送說明");return}else{if((a==null?void 0:a.name)==="address"&&t.value==="來店取貨")return!0;if(a!=null&&a.value.replace(/\s/g,"")){if((a==null?void 0:a.name)==="phone"&&!/^09\d{8}$/.test(a.value)){l("warning","手機格式不正確");return}}else{l("warning","請確實填寫所有的欄位");return}}return!0};const t=document.querySelector('input[name="method"]:checked'),n=document.querySelector('input[name="payment"]:checked'),s=document.querySelector("#name"),i=document.querySelector("#phone"),r=document.querySelector("#address"),u=document.querySelector('input[name="shippingTime"]:checked'),p=document.querySelector("#delivery-confirm");o(t)&&o(n)&&o(s)&&o(i)&&o(r)&&o(u)&&o(p)&&function(){const a={receiver:s.value,phone:i.value,address:T(r.value)?"來店取貨":r.value,payment:n.value,method:t.value,shippingTime:u.value};L(a)}()}}function E(){const e=JSON.parse(localStorage.getItem("userData")).id;m.get(`${v}/600/users/${e}/deliveryInfos`,f).then(t=>{M(t.data)}).catch(t=>h(t))}function M(e){const t=document.querySelector("#select-address");e.forEach(n=>{const s=document.createElement("option");s.setAttribute("value",n.address),s.textContent=n.address.replace(/(\d+)/g," $1 "),t.appendChild(s)})}function D(e){const t=document.querySelector(`input#${e.target.dataset.receiver}`);t.value=e.target.value}function L(e){y.fire({icon:"warning",title:"確定送出訂單？",text:"提醒您，按下送出之後即視為交易成立",position:"center",allowOutsideClick:!1,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"再想想看",confirmButtonColor:"#A37A64",confirmButtonText:"送出訂單",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const t=d.deliveryFee(d.haveReachThreshold||e.method==="來店取貨");c=c.map(s=>({...s,product:$(s.product)}));const n={orderNum:new Date().getTime()+`0${c[0].userId}`,content:c,total:d.subtotal+t,info:e,deliveryFee:t,createdTime:new Date().getTime(),userId:c[0].userId,isFinished:!1};m.post(`${v}/600/orders`,n,f).then(s=>c.forEach(i=>{m.delete(`${v}/600/carts/${i.id}`,f)}))}catch(t){h(t)}}}).then(t=>{t.isConfirmed&&y.fire({icon:"success",title:"Terima kasih！謝謝您的訂購！",text:"我們將立即為您製作，請耐心等候商品送達",position:"center",confirmButtonColor:"#A37A64",timer:3e3}).then(()=>location.href="member.html")})}function j(e){const{data:t,fee:n,threshold:s}=e,i=t.reduce((r,u)=>r+Number(u.product.price)*u.qty,0);return{subtotal:i,deliveryFeeOrigin:n,haveReachThreshold:i>=s,deliveryFee:function(r){return r?0:n}}}
