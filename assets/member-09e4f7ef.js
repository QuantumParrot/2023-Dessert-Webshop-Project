import{t as y,b as r,a as l,h as i,e as d,w as S,S as w}from"./main-5bc21e7f.js";import{c as T}from"./header-state-d9f1b448.js";import{h}from"./moment-fbc5633a.js";import{T as I}from"./tab-80ea5b39.js";import{S as E}from"./ScrollEventTrigger-151952d0.js";const{VITE_APP_SITE:c}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},u=JSON.parse(localStorage.getItem("userData")).id;let v="",o=[];(()=>{if(!y())r("warning","請先登入","login.html");else{const e=document.querySelector("main");e.classList.remove("d-none"),e.removeAttribute("class"),b()}})();window.addEventListener("hashchange",()=>{b()});function b(){const e=location.hash.replace("#","")||"orders",s=document.querySelector(`#v-pills-${e}-tab`);s&&new I(s).show(),v=document.querySelector(`#v-pills-${e} #${e}-content`),e==="orders"?k():e==="collection"?A():e==="profile"?B():e==="messages"&&getMessages()}function k(){l.get(`${c}/600/users/${u}/orders?_sort=id&_order=desc`,i).then(e=>{o=e.data,D(o)}).catch(e=>{d(e)})}function D(e){let s="";e.length===0?s+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        目前沒有訂單記錄
        </p>
    </div>
    `:e.forEach(t=>{s+=`
        <div class="col-12">
            <div class="accordion-item mb-6">
                <button type="button"
                        class="accordion-title w-100 btn d-md-block d-flex justify-content-between
                               text-start bg-white rounded-2 shadow px-md-8 py-5">
                    <div class="mb-md-6 mb-0">
                        <span class="fw-bold">訂單編號：</span>
                        <span class="text-black">${t.orderNum}</span>
                    </div>
                    <div class="row">
                        <div class="col-3 d-md-block d-none">
                            <div>
                                <span class="fw-bold">成立日期：</span>
                                <span class="fw-normal">${h(t.createdTime).format("YYYY-MM-DD")}</span>
                            </div>
                        </div>
                        <div class="col-4 d-md-block d-none border-start border-end">
                            <div class="d-flex justify-content-between px-7">
                                <span class="fw-bold">訂購金額：</span>
                                <span>${t.total} 元</span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="ps-md-7 ps-0">
                                <span class="d-md-inline-block d-none fw-bold">訂單狀態：</span>
                                <span class=${t.isFinished?"text-success":"text-danger"}>
                                ${t.isFinished?"已完成":"製作中"}</span>
                            </div>
                        </div>
                    </div>
                </button>
                <div class="accordion-content rounded-2 shadow">
                    <div class="px-md-8 px-6 pt-5 pb-7">
                    <div class="mb-5">
                        ${t.content.map(a=>`
                        <div class="row gap-md-5 py-2 border-bottom lh-lg">
                            <div class="col-lg-3 col-12">
                                <a target="_blank" href="products-detail.html?id=${a.product.id}" class="text-orange fw-bold">${a.product.name}</a>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">數量：</span>${a.qty}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">金額：</span>${a.product.price*a.qty}</p>
                            </div>
                        </div>`).join("")}
                    </div>
                    <div class="row fs-5 fw-bold border-bottom mb-5">
                        <div class="col-12">
                            <p class="mb-5">總計：${t.total} 元<span class="text-muted fs-7">（ 含運費 ${t.deliveryFee} 元 ）</span></p>
                        </div>
                    </div>
                    <div class="lh-lg">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <p class="d-md-block d-none fw-bold fs-5">寄送資訊</p>
                            <p class="text-black">${h(t.createdTime).format("YYYY-MM-DD A hh:mm:ss")}</p>
                        </div>
                        <p>
                        <span class="text-orange fw-bold">收件人姓名：</span>${t.info.receiver}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">收件人電話：</span>${t.info.phone}
                        </p>
                        <p class="d-md-block d-flex flex-column">
                        <span class="text-orange fw-bold">收件人地址：</span>${t.info.address.replace(/(\d+)/," $1 ")}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">取貨方式：</span>${t.info.method}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">付款方式：</span>${t.info.payment}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">指定收貨時段：</span>${t.info.shippingTime}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `}),v.innerHTML=s,$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function A(){l.get(`${c}/600/users/${u}/collects?_expand=product`,i).then(e=>{o=e.data,C(o)}).catch(e=>{d(e)})}function C(e){let s="";e.length===0?s+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        還沒有收藏任何商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
    </div>
    `:e.forEach(({product:n})=>s+=`
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
    `),v.innerHTML=s,document.querySelectorAll(".favorite").forEach(n=>n.addEventListener("click",q)),document.querySelectorAll(".cart").forEach(n=>n.addEventListener("click",P))}function q(e){e.preventDefault();const s=e.target.closest("button").dataset.id,t=o.find(a=>a.productId==s);l.delete(`${c}/600/collects/${t.id}`,i).then(a=>{r("success",`已取消收藏${t.product.name}`),b()}).catch(a=>{d(a)})}function P(e){e.preventDefault();const s=e.target.closest("button").dataset.id,t=JSON.parse(localStorage.getItem("userData")).id;l.get(`${c}/600/users/${t}/carts`,i).then(a=>{let n=a.data.find(f=>f.productId==s);return n?n.qty>9?void 0:l.patch(`${c}/600/carts/${n.id}`,{qty:n.qty+=1},i):(n={productId:Number(s),qty:1,userId:t},l.post(`${c}/600/carts`,n,i))}).then(a=>{a?r("success","成功加入購物車"):S("數量達上限","如果需要大量訂購，請直接與我們聯絡"),T()}).catch(a=>{d(a)})}function B(){l.get(`${c}/600/users/${u}`,i).then(e=>(o=e.data,L(o),g())).catch(e=>{d(e)})}function g(){l.get(`${c}/600/users/${u}/deliveryInfos`,i).then(e=>{N(e.data)}).catch(e=>{d(e)})}function L(e){let s="";s+=`
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
    `,s+=`
    <div class="col-12">
        <h4 class="d-flex align-items-center gap-5 mb-8">儲存寄送資訊</h4>
        <ul class="list-unstyled bg-white border border-primary rounded-2 px-6 py-7 shadow mb-8">
            <li class="fw-bold mb-3">儲存常用地址，加速結帳流程！</li>
            <li class="text-muted">註：考慮到商品特性，暫不提供離島及海外寄送服務，敬請見諒。</li>
        </ul>
        <form id="delivery-form" class="bg-secondary rounded-1 px-6 py-7 mb-8">
            <div class="d-flex flex-column gap-7">
                <!-- 會員住址 -->
                <div class="d-flex flex-md-row flex-column align-items-md-center gap-4">
                    <label for="receiver-address" class="fw-bold">收件人地址</label>
                    <input id="receiver-address"
                           type="text"
                           class="form-control w-50 p-2 border-secondary"
                           name="address">
                    <div>
                        <button type="submit" class="btn btn-sm btn-primary">儲存</button>
                    </div>
                </div>
            </div>
        </form>
        <div class="bg-white border border-primary rounded-2 px-6 py-7 shadow">
            <h5 class="fs-5 mb-7">已儲存的地址</h5>
            <ul id="address-list" class="list-unstyled d-flex flex-column gap-3 mb-0"></ul>
        </div>
    </div>
    `,v.innerHTML=s,document.querySelector("#profile-form").addEventListener("click",M),document.querySelector("#change-password-form").addEventListener("submit",_),document.querySelector("#delivery-form").addEventListener("submit",O)}function M(e){e.preventDefault();const{nodeName:s}=e.target;if(s==="BUTTON"){const t=e.target.dataset.target,a=document.querySelector(`#profile-form input[name="${t}"]`);t!=="password"&&e.target.textContent==="修改"?(a.removeAttribute("disabled"),e.target.textContent="送出"):e.target.textContent==="送出"&&x(a)&&a.value!==o[a.name]&&w.fire({icon:"warning",title:"確定修改資料？",text:`您的${a.name==="name"?"名字":"手機"}將改為：${a.value}`,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const n={[a.name]:a.value};e.target.setAttribute("disabled",!0);const f=await l.patch(`${c}/660/users/${o.id}`,n,i);e.target.removeAttribute("disabled"),r("success","修改完成！"),localStorage.setItem("userData",JSON.stringify(f.data)),b()}catch(n){d(n)}}}).then(n=>{a.setAttribute("disabled",!0),a.value=o[a.name],e.target.textContent="修改"})}else s!=="BUTTON"&&s!=="INPUT"&&(document.querySelectorAll("#profile-form input").forEach(t=>t.setAttribute("disabled",!0)),document.querySelectorAll("#profile-form button").forEach(t=>t.textContent="修改"))}function _(e){e.preventDefault();const s=e.target.querySelectorAll("input"),t=e.target["current-password"].value,a=e.target["new-password"].value,n=e.target["new-password-confirm"].value;function f(p){const m=/\w{6,}/;if(p.replace(/\s/g,""))if(m.test(p)){if(t===a){r("warning","新密碼不可與舊密碼相同");return}else if(a!==n){r("warning","兩次密碼不一致");return}}else{r("warning","長度需在六個字以上");return}else{r("warning","欄位不可空白");return}return!0}[...s].every(p=>f(p.value))&&function(){const p={email:o.email,password:t};l.post(`${c}/login/${o.id}`,p).then(m=>l.patch(`${c}/660/users/${o.id}`,{password:a},i)).then(m=>{e.target.reset(),localStorage.removeItem("token"),localStorage.removeItem("userData"),r("success","修改成功！請重新登入！","login.html")}).catch(m=>{d(m)})}()}function N(e){const s=document.querySelector("#address-list");let t="";e.length===0?t="<li>尚未儲存任何地址</li>":e.forEach(a=>t+=`
    <li data-num="${a.id}" class="card px-6 py-3">
        <div class="row">
            <div class="col-1">
                <button class="delete btn d-flex align-items-center p-0 ms-md-3">
                <span class="material-icons text-orange">delete</span>
                </button>
            </div>
            <div class="col-10">${a.address}</div>
        </div>
    </li>
    `),s.innerHTML=t,s.addEventListener("click",a=>{if(!a.target.closest("button"))return;const n=a.target.closest("li").dataset.num;Y(n)})}function O(e){e.preventDefault();const s=e.target.address;x(s)&&(t=>{F(t),e.target.reset()})({address:s.value,userId:o.id})}function F(e){l.post(`${c}/600/deliveryInfos`,e,i).then(s=>{r("success","成功儲存資料！"),g()}).catch(s=>{d(s)})}function Y(e){w.fire({icon:"warning",title:"確定刪除地址？",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const s=await l.delete(`${c}/deliveryInfos/${e}`);r("success","刪除成功！"),g()}catch(s){d(s)}}})}function x(e){const{name:s,value:t}=e;if(t.replace(/\s/g,"")){if(s==="phone"&&!/^09\d{8}$/.test(t)){r("warning","手機格式不正確"),e.closest("form").id==="profile-form"&&(e.value=o[s]);return}}else{r("warning","欄位不可空白"),e.closest("form").id==="profile-form"&&(e.value=o[s]);return}return!0}const j=document.querySelectorAll(".back-to-top");j.forEach(e=>{const s=new E(e);e.addEventListener("click",t=>{s.backToTop()})});
