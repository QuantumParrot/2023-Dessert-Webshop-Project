import{a as l,h as d,e as m,t as r,w,c as x,S as y,b as S}from"./main-36634dc1.js";import{h}from"./moment-fbc5633a.js";import{T}from"./tab-b1a58ad3.js";import{S as k}from"./ScrollEvent-2d368248.js";const{VITE_APP_SITE:c}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let v="",o=[];function E(){if(!S())r("warning","請先登入","login.html");else{const e=document.querySelector("main");e.classList.remove("d-none"),e.removeAttribute("class"),b()}}E();window.addEventListener("hashchange",function(){b()});function b(){const e=location.hash.replace("#","")||"orders",a=document.querySelector(`#v-pills-${e}-tab`);a&&new T(a).show(),v=document.querySelector(`#v-pills-${e} #${e}-content`);const s=JSON.parse(localStorage.getItem("userData")).id;e==="orders"?l.get(`${c}/600/users/${s}/orders?_sort=id&_order=desc`,d).then(t=>{o=t.data,I(o)}).catch(t=>{m(t)}):e==="collection"?l.get(`${c}/600/users/${s}/collects?_expand=product`,d).then(t=>{o=t.data,D(o)}).catch(t=>{m(t)}):e==="profile"&&l.get(`${c}/600/users/${s}`,d).then(t=>{o=t.data,P(o)}).catch(t=>{m(t)})}function I(e){let a="";e.length===0?a+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        目前沒有訂單記錄
        </p>
    </div>
    `:e.forEach(s=>{a+=`
        <div class="col-12">
            <div class="accordion-item mb-6">
                <button type="button"
                        class="accordion-title w-100 btn d-md-block d-flex justify-content-between
                               text-start bg-white rounded-2 shadow px-md-8 py-5">
                    <div class="mb-md-6 mb-0">
                        <span class="fw-bold">訂單編號：</span>
                        <span class="text-black">${s.orderNum}</span>
                    </div>
                    <div class="row">
                        <div class="col-3 d-md-block d-none">
                            <div>
                                <span class="fw-bold">成立日期：</span>
                                <span class="fw-normal">${h(s.createdTime).format("YYYY-MM-DD")}</span>
                            </div>
                        </div>
                        <div class="col-3 d-md-block d-none border-start border-end">
                            <div class="d-flex justify-content-between px-7">
                                <span class="fw-bold">訂購金額：</span>
                                <span>${s.total} 元</span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="ps-md-7 ps-0">
                                <span class="d-md-inline-block d-none fw-bold">訂單狀態：</span>
                                <span class=${s.isFinished?"text-success":"text-danger"}>
                                ${s.isFinished?"已完成":"製作中"}</span>
                            </div>
                        </div>
                    </div>
                </button>
                <div class="accordion-content rounded-2 shadow">
                    <div class="px-md-8 px-6 pt-5 pb-7">
                    <div class="mb-5">
                        ${s.content.map(t=>`
                        <div class="row gap-md-5 py-2 border-bottom lh-lg">
                            <div class="col-lg-3 col-12">
                                <a target="_blank" href="products-detail.html?id=${t.product.id}" class="text-orange fw-bold">${t.product.name}</a>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">數量：</span>${t.qty}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">金額：</span>${t.product.price*t.qty}</p>
                            </div>
                        </div>`).join("")}
                    </div>
                    <div class="row fs-5 fw-bold border-bottom mb-5">
                        <div class="col-12">
                            <p class="mb-5">總計：${s.total} 元<span class="text-muted fs-7">（ 含運費 ${s.deliveryFee} 元 ）</span></p>
                        </div>
                    </div>
                    <div class="lh-lg">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <p class="d-md-block d-none fw-bold fs-5">寄送資訊</p>
                            <p class="text-black">${h(s.createdTime).format("YYYY-MM-DD A hh:mm:ss")}</p>
                        </div>
                        <p>
                        <span class="text-orange fw-bold">收件人姓名：</span>${s.info.receiver}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">收件人電話：</span>${s.info.phone}
                        </p>
                        <p class="d-md-block d-flex flex-column">
                        <span class="text-orange fw-bold">收件人地址：</span>${s.info.address.replace(/(\d+)/," $1 ")}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">取貨方式：</span>${s.info.method}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">付款方式：</span>${s.info.payment}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">指定收貨時段：</span>${s.info.shippingTime}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `}),v.innerHTML=a,$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function D(e){let a="";e.length===0?a+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        還沒有收藏任何商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
    </div>
    `:e.forEach(({product:n})=>a+=`
    <div class="col-md-4 col-12 mb-9">
        <a class="text-decoration-none" href="products-detail.html?id=${n.id}">
            <div class="card hover-shadow h-100 overflow-hidden mb-6">
                <div class="position-relative mb-6">
                    <img class="w-100"
                         src="${n.image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                         alt="${n.name}">
                    ${n.forSale?"":`
                    <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center" style="backdrop-filter: brightness(70%)">
                        <h3 class="custom-tooltip w-100 text-center py-5">已售完</h3>
                    </div>`}
                </div>
                <div class="px-5">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="fs-6">${n.name}・<span class="text-muted">${n.size}</span></h4>
                            <p class="fs-7 text-orange fw-bold">NT＄${n.price}</p>
                        </div>
                        <div class="d-flex gap-3">
                            <button data-id="${n.id}" class="favorite btn btn-sm btn-outline-orange p-1">
                                <span class="material-icons d-flex">favorite</span>
                            </button>
                            <button data-id="${n.id}" class="cart btn btn-sm btn-primary p-1 ${n.forSale?"":"disabled"}">
                                <span class="material-icons d-flex">shopping_bag</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `),v.innerHTML=a,document.querySelectorAll(".favorite").forEach(n=>n.addEventListener("click",q)),document.querySelectorAll(".cart").forEach(n=>n.addEventListener("click",A))}function q(e){e.preventDefault();const a=e.target.closest("button").dataset.id,s=o.find(t=>t.productId==a);l.delete(`${c}/600/collects/${s.id}`,d).then(t=>{r("success",`已取消收藏${s.product.name}`),b()}).catch(t=>{m(t)})}function A(e){e.preventDefault();const a=e.target.closest("button").dataset.id,s=JSON.parse(localStorage.getItem("userData")).id;l.get(`${c}/600/users/${s}/carts`,d).then(t=>{let n=t.data.find(f=>f.productId==a);return n?n.qty>9?void 0:l.patch(`${c}/600/carts/${n.id}`,{qty:n.qty+=1},d):(n={productId:Number(a),qty:1,userId:s},l.post(`${c}/600/carts`,n,d))}).then(t=>{t?r("success","成功加入購物車"):w("數量達上限","如果需要大量訂購，請直接與我們聯絡"),x()}).catch(t=>{m(t)})}function P(e){let a="";a+=`
    <div class="col-12">
        <h4 class="mb-8">修改會員資料</h4>
        <form id="profile-form" class="bg-secondary rounded-1 px-6 py-7">
            <div class="d-flex flex-column gap-7">
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-md-6 gap-4">
                    <div class="d-flex align-items-center gap-6">
                        <label for="name" class="fw-bold mb-0">名字</label>
                        <div class="flex-grow-1">
                        <input id="name"
                               type="text"
                               class="form-control p-2 border-secondary"
                               name="name"
                               value="${e.name}"
                               disabled>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-primary py-1"
                                data-target="name">修改</button>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-md-6 gap-4">
                    <div class="d-flex align-items-center gap-6">
                        <label for="phone" class="fw-bold">手機</label>
                        <div class="flex-grow-1">
                        <input id="phone"
                               type="tel"
                               class="form-control p-2 border-secondary"
                               name="phone"
                               value="${e.phone}"
                               disabled>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-primary py-1"
                                data-target="phone">修改</button>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-md-6 gap-4">
                    <div class="d-flex align-items-center gap-6">
                        <label for="password" class="fw-bold mb-0">密碼</label>
                        <div class="flex-grow-1">
                        <input id="password"
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
                                data-target="password"
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
                    <label for="receiver-name" class="fw-bold">收件人姓名</label>
                    <input id="receiver-name"
                           type="text"
                           class="form-control w-25 p-2 border-secondary"
                           name="name">
                    <div><input type="checkbox" class="me-4"
                                data-target="name">同會員資料</div>
                </div>
                <!-- 會員電話 -->
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-4">
                    <label for="receiver-phone" class="fw-bold">收件人電話</label>
                    <input id="receiver-phone"
                           type="tel"
                           class="form-control w-25 p-2 border-secondary"
                           name="phone">
                    <div><input type="checkbox" class="me-4"
                                data-target="phone">同會員資料</div>
                </div>
                <!-- 會員住址 -->
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-4">
                    <label for="receiver-address" class="fw-bold">收件人地址</label>
                    <input id="receiver-address"
                           type="text"
                           class="form-control w-50 p-2 border-secondary"
                           name="address">
                </div>
                <div>
                    <button type="submit" class="btn btn-sm btn-primary">儲存</button>
                </div>
            </div>
        </form>
    </div>
    `,v.innerHTML=a,document.querySelector("#profile-form").addEventListener("click",C),document.querySelector("#change-password-form").addEventListener("submit",L);const n=document.querySelector("#delivery-form");n.addEventListener("submit",M),n.querySelectorAll('input[type="checkbox"]').forEach(p=>p.addEventListener("change",i=>{const g=n[`${i.target.dataset.target}`];i.target.checked?g.value=o[`${i.target.dataset.target}`]:g.value=""}))}function C(e){e.preventDefault();const{nodeName:a}=e.target;if(a==="BUTTON"){const s=e.target.dataset.target,t=document.querySelector(`#profile-form input[name="${s}"]`);s!=="password"&&e.target.textContent==="修改"?(t.removeAttribute("disabled"),e.target.textContent="送出"):e.target.textContent==="送出"&&u(t)&&y.fire({icon:"warning",title:"確定修改資料？",text:`您的${t.name==="name"?"名字":"手機"}將改為：${t.value}`,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{if(t.value===o[t.name]){r("question","資料沒變哦 (ㆆᴗㆆ)");return}const n={[t.name]:t.value};e.target.setAttribute("disabled",!0);const f=await l.patch(`${c}/660/users/${o.id}`,n,d);e.target.removeAttribute("disabled"),r("success","修改完成！"),localStorage.setItem("userData",JSON.stringify(f.data)),b()}catch(n){m(n)}}}).then(n=>{t.setAttribute("disabled",!0),t.value=o[t.name],e.target.textContent="修改"})}else a!=="BUTTON"&&a!=="INPUT"&&(document.querySelectorAll("#profile-form input").forEach(s=>s.setAttribute("disabled",!0)),document.querySelectorAll("#profile-form button").forEach(s=>s.textContent="修改"))}function L(e){e.preventDefault();const a=e.target.querySelectorAll("input"),s=e.target["current-password"].value,t=e.target["new-password"].value,n=e.target["new-password-confirm"].value;function f(p){const i=/\w{6,}/;if(p.replace(/\s/g,""))if(i.test(p)){if(s===t){r("warning","新密碼不可與舊密碼相同");return}else if(t!==n){r("warning","兩次密碼不一致");return}}else{r("warning","長度需在六個字以上");return}else{r("warning","欄位不可空白");return}return!0}[...a].every(p=>f(p.value))&&function(){const p={email:o.email,password:s};l.post(`${c}/login/${o.id}`,p).then(i=>l.patch(`${c}/660/users/${o.id}`,{password:t},d)).then(i=>{e.target.reset(),localStorage.removeItem("token"),localStorage.removeItem("userData"),r("success","修改成功！請重新登入！","login.html")}).catch(i=>{m(i)})}()}function M(e){e.preventDefault();const a=e.target.name,s=e.target.phone,t=e.target.address;u(a)&&u(s)&&u(t)&&(n=>{_(),e.target.reset()})({receiver:a.value,phone:s.value,address:t.value,userId:o.id})}function _(e){l.post(`${c}/600/deliveryInfos`,d).then(a=>{r("success","成功儲存資料！")}).catch(a=>{m(a)})}function u(e){const{name:a,value:s}=e;if(s.replace(/\s/g,"")){if(a==="phone"&&!/^09\d{8}$/.test(s)){r("warning","手機格式不正確"),e.closest("form").id==="profile-form"&&(e.value=o[a]);return}}else{r("warning","欄位不可空白"),e.closest("form").id==="profile-form"&&(e.value=o[a]);return}return!0}const B=document.querySelectorAll(".back-to-top");B.forEach(e=>{const a=new k(e);e.addEventListener("click",s=>{a.backToTop()})});
