import{g as f,a as i,e as p,t as l,w as y,S}from"./main-2e79e1a8.js";import{h}from"./moment-fbc5633a.js";import{T}from"./tab-82bde17a.js";import{S as k}from"./ScrollEvent-2d368248.js";const{VITE_APP_SITE:c}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let v="",d=[];function E(){f()?g():l("warning","請先登入","login.html")}E();window.addEventListener("hashchange",function(){g()});function g(){var t;const s=location.hash.replace("#","")||"orders",a=document.querySelector(`#v-pills-${s}-tab`);a&&new T(a).show(),v=document.querySelector(`#v-pills-${s} #${s}-content`);const e=(t=JSON.parse(localStorage.getItem("userData")))==null?void 0:t.id,o={headers:{authorization:`Bearer ${f()}`}};s==="orders"?i.get(`${c}/600/users/${e}/orders?_sort=id&_order=desc`,o).then(n=>{d=n.data,q(d)}).catch(n=>{p(n)}):s==="collection"?i.get(`${c}/600/users/${e}/collects?_expand=product`,o).then(n=>{d=n.data,I(d)}).catch(n=>{p(n)}):s==="profile"&&i.get(`${c}/600/users/${e}`,o).then(n=>{d=n.data,B()}).catch(n=>{p(n)})}function q(s){let a="";s.length===0?a+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        目前沒有訂單記錄
        </p>
    </div>
    `:s.forEach(e=>{a+=`
        <div class="col-12">
            <div class="accordion-item mb-6">
                <button type="button"
                        class="accordion-title w-100 btn d-flex justify-content-center align-items-center gap-md-5 gap-2 bg-white rounded-2 shadow px-md-8 py-5">
                    <p class="pe-5 border-end">
                        <span class="fw-bold">訂單</span>編號：</span>
                        <span class="text-black">${e.orderNum}</span>
                    </p>
                    <p class="d-md-inline-block d-none pe-5 border-end">
                        <span class="fw-bold">成立日期：</span>
                        <span class="fw-normal">${h(e.createdTime).format("YYYY-MM-DD")}</span>
                    </p>
                    <p class="d-md-inline-block d-none pe-5 border-end">
                        <span class="fw-bold">訂購金額：</span>
                        ${e.total} 元
                    </p>
                    <p class="pe-5 ps-2">
                        <span class="d-md-inline-block d-none fw-bold">訂單狀態：</span>
                        <span class=${e.isFinished?"text-success":"text-danger"}>
                        ${e.isFinished?"已完成":"製作中"}</span>
                    </p>
                </button>
                <div class="accordion-content rounded-2 shadow">
                    <div class="px-md-8 px-6 pt-5 pb-7">
                    <div class="mb-5">
                        ${e.content.map(o=>`
                        <div class="row gap-md-5 py-2 border-bottom lh-lg">
                            <div class="col-lg-3 col-12">
                                <p class="text-orange fw-bold">${o.product.name}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">數量：</span>${o.qty}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">金額：</span>${o.product.price*o.qty}</p>
                            </div>
                        </div>`).join("")}
                    </div>
                    <div class="row fs-5 fw-bold border-bottom mb-5">
                        <div class="col-12">
                            <p class="mb-5">總計：${e.total} 元<span class="text-muted fs-7">（含運費）</span></p>
                        </div>
                    </div>
                    <div class="lh-lg">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <p class="d-md-block d-none fw-bold fs-5">寄送資訊</p>
                            <p class="text-black">${h(e.createdTime).format("YYYY-MM-DD A hh:mm:ss")}</p>
                        </div>
                        <p>
                        <span class="text-orange fw-bold">收件人姓名：</span>${e.info.receiver}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">收件人電話：</span>${e.info.phone}
                        </p>
                        <p class="d-md-block d-flex flex-column">
                        <span class="text-orange fw-bold">收件人地址：</span>${e.info.address}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">取貨方式：</span>${e.info.method}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">付款方式：</span>${e.info.payment}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">指定收貨時段：</span>${e.info.shippingTime}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `}),v.innerHTML=a,$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function I(s){let a="";s.length===0?a+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        還沒有收藏任何商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
    </div>
    `:s.forEach(({product:t})=>a+=`
    <div class="col-md-4 col-12 mb-9">
        <a class="text-decoration-none" href="products-detail.html?id=${t.id}">
            <div class="card hover-shadow h-100 overflow-hidden mb-6">
                <div class="position-relative mb-6">
                    <img class="w-100"
                         src="${t.image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                         alt="${t.name}">
                    ${t.forSale?"":`
                    <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center" style="backdrop-filter: brightness(70%)">
                        <h3 class="custom-tooltip w-100 text-center py-5">已售完</h3>
                    </div>`}
                </div>
                <div class="px-5">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="fs-6">${t.name}・<span class="text-muted">${t.size}</span></h4>
                            <p class="fs-7 text-orange fw-bold">NT＄${t.price}</p>
                        </div>
                        <div class="d-flex gap-3">
                            <button data-num="${t.id}" class="favorite btn btn-sm btn-outline-orange p-1">
                                <span class="material-icons d-flex">favorite</span>
                            </button>
                            <button data-num="${t.id}" class="cart btn btn-sm btn-primary p-1 ${t.forSale?"":"disabled"}">
                                <span class="material-icons d-flex">shopping_bag</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `),v.innerHTML=a,document.querySelectorAll(".favorite").forEach(t=>{D(t)}),document.querySelectorAll(".cart").forEach(t=>{P(t)})}function D(s){s.addEventListener("click",a=>{a.preventDefault();const e=d.find(t=>t.product.id==s.dataset.num);JSON.parse(localStorage.getItem("userData")).id;const o=f();i.delete(`${c}/640/collects/${e.id}`,{headers:{authorization:`Bearer ${o}`}}).then(t=>{l("success",`已取消收藏${e.product.name}`),g()}).catch(t=>{p(t)})},!1)}function P(s){s.addEventListener("click",function(a){a.preventDefault();const e=f();if(!e)l("warning","請先登入");else{const o=JSON.parse(localStorage.getItem("userData")).id;i.get(`${c}/640/users/${o}/carts`,{headers:{authorization:`Bearer ${e}`}}).then(t=>{const{data:n}=t;let r=n.find(u=>u.productId==s.dataset.num);return r?r.qty>9?void 0:(r={...r,qty:r.qty+=1},i.patch(`${c}/640/carts/${r.id}`,r,{headers:{authorization:`Bearer ${e}`}})):(r={productId:Number(s.dataset.num),qty:1,userId:o},i.post(`${c}/640/carts`,r,{headers:{authorization:`Bearer ${e}`}}))}).then(t=>{t?l("success","成功加入購物車"):y("數量達上限","如果需要大量訂購，請直接與我們聯絡")}).catch(t=>{p(t)})}},!1)}function B(){const s=d;let a="";a+=`
    <div class="col-12">
        <h4 class="mb-8">修改會員資料</h4>
        <form id="profile-form" class="bg-secondary rounded-1 px-6 py-7">
            <div class="d-flex flex-column gap-7">
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-md-6 gap-4">
                    <div class="d-flex align-items-center gap-6">
                        <label for="userName" class="fw-bold mb-0">名字</label>
                        <div class="flex-grow-1">
                        <input id="userName"
                               type="text"
                               class="form-control p-2 border-secondary"
                               name="name"
                               value="${s.name}"
                               disabled>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-primary py-1"
                                data-target="userName">修改</button>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-md-6 gap-4">
                    <div class="d-flex align-items-center gap-6">
                        <label for="userEmail" class="fw-bold">帳號</label>
                        <div class="flex-grow-1">
                        <input id="userEmail"
                               type="email"
                               class="form-control p-2 border-secondary"
                               name="email"
                               value="${s.email}"
                               disabled>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-primary py-1"
                                data-target="userEmail">修改</button>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-md-6 gap-4">
                    <div class="d-flex align-items-center gap-6">
                        <label for="userPassword" class="fw-bold mb-0">密碼</label>
                        <div class="flex-grow-1">
                        <input id="userPassword"
                               type="password"
                               class="form-control p-2 border-secondary"
                               name="password"
                               value="${"*".repeat(10)}"
                               autocomplete disabled>
                        </div>
                    </div>
                    <div>
                        <button type="button"
                                class="btn btn-sm btn-primary py-1"
                                data-target="userPassword"
                                data-bs-toggle="modal"
                                data-bs-target="#changePasswordModal">修改</button>
                    </div>
                    <p class="form-text mt-0">密碼長度僅為示意，非真實長度</p>
                </div>
            </div>
        </form>
    </div>
    `,a+=`
    <div class="col-12">
        <h4 class="d-flex align-items-center gap-5 mb-8">常用寄送資訊（功能開發中）</h4>
        <form id="delivery-form" class="bg-secondary rounded-1 px-6 py-7">
            <div class="d-flex flex-column gap-7">
                <!-- 會員姓名 -->
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-4">
                    <label for="receiver" class="fw-bold">收件人姓名</label>
                    <input id="receiver"
                           type="text"
                           class="form-control w-25 p-2 border-secondary"
                           required>
                    <div><input type="checkbox" id="useMemberName" class="me-4">同會員資料</div>
                </div>
                <!-- 會員電話 -->
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-4">
                    <label for="phone" class="fw-bold">收件人電話</label>
                    <input id="phone"
                           type="tel"
                           class="form-control w-25 p-2 border-secondary"
                           required>
                </div>
                <!-- 會員住址 -->
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-4">
                    <label for="address" class="fw-bold">收件人地址</label>
                    <input id="address"
                           type="text"
                           class="form-control w-50 p-2 border-secondary"
                           required>
                </div>
                <div>
                    <button type="submit" class="btn btn-sm btn-primary">儲存</button>
                </div>
            </div>
        </form>
    </div>
    `,v.innerHTML=a,N(s),M(s)}function N(s){const a=document.querySelector("#profile-form");a.addEventListener("click",function(e){if(e.preventDefault(),e.target.nodeName==="BUTTON"){const o=e.target.dataset.target,t=a.querySelector(`#${o}`);o!=="userPassword"&&e.target.textContent==="修改"?(t.removeAttribute("disabled"),e.target.textContent="送出"):e.target.textContent==="送出"?S.fire({icon:"warning",title:"確定修改資料？",text:`您的${t.name==="name"?"名字":"帳號"}將改為：${t.value}`,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{if(t.value===s[t.name]){l("question","資料沒變哦 (ㆆᴗㆆ)");return}const n=f(),r={[t.name]:t.value};e.target.setAttribute("disabled",!0);const u=await i.patch(`${c}/660/users/${s.id}`,r,{headers:{authorization:`Bearer ${n}`}});e.target.removeAttribute("disabled"),l("success","修改完成！"),localStorage.setItem("userData",JSON.stringify(u.data)),g()}catch(n){p(n)}}}).then(n=>{t.setAttribute("disabled",!0),t.value=s[t.name],e.target.textContent="修改"}):o==="userPassword"&&A(s)}})}function A(s){const a=document.querySelector("#change-password-form"),e=a.querySelectorAll("input");a.querySelector('button[type="submit"]').addEventListener("click",function(t){t.preventDefault();const n=e[0].value,r=e[1].value,u=e[2].value;function w(m){const b=/\w{6,}/;if(m)if(b.test(m)){if(n===r){l("warning","新密碼不可與舊密碼相同");return}else if(r!==u){l("warning","兩次密碼不一致");return}}else{l("warning","長度需在六個字以上");return}else{l("warning","欄位不可空白");return}return!0}[...e].every(m=>w(m.value))&&function(){const m={email:s.email,password:n};i.post(`${c}/login/${s.id}`,m).then(b=>{const x={headers:{authorization:`Bearer ${f()}`}};return i.patch(`${c}/660/users/${s.id}`,{password:r},x)}).then(b=>{a.reset(),localStorage.removeItem("token"),localStorage.removeItem("userData"),l("success","修改成功！請重新登入！","login.html")}).catch(b=>{p(b)})}()})}function M(s){const a=document.querySelector("#delivery-form"),e=a.querySelector("#useMemberName"),o=a.querySelector("#receiver"),t=a.querySelector("#phone"),n=a.querySelector("#address");e.addEventListener("change",function(r){r.target.checked?o.value=s.name:o.value=""}),a.addEventListener("submit",function(r){if(r.preventDefault(),t&&!/^09(\d){8}/.test(t.value)){l("warning","手機號碼格式不正確");return}o.value,t.value,n.value,JSON.parse(localStorage.getItem("userData")).id,a.reset()})}const L=document.querySelectorAll(".back-to-top");L.forEach(s=>{const a=new k(s);s.addEventListener("click",e=>{a.backToTop()})});
