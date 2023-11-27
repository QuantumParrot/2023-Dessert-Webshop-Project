import{g as b,a as c,e as u,t as i,w as x,S as y}from"./main-78beb421.js";import{T as S}from"./tab-1e253613.js";import{S as T}from"./ScrollEvent-2d368248.js";const{VITE_APP_SITE:d}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let g="",f=[];function E(){b()?h():i("warning","請先登入","login.html")}E();window.addEventListener("hashchange",function(){h()});function h(){var s;const t=location.hash.replace("#","")||"orders",a=document.querySelector(`#v-pills-${t}-tab`);a&&new S(a).show(),g=document.querySelector(`#v-pills-${t} #${t}-content`);const e=(s=JSON.parse(localStorage.getItem("userData")))==null?void 0:s.id,r={headers:{authorization:`Bearer ${b()}`}};t==="orders"?c.get(`${d}/600/users/${e}/orders?_sort=id&_order=desc`,r).then(n=>{f=n.data,k(f)}).catch(n=>{u(n)}):t==="collection"?c.get(`${d}/600/users/${e}/collects?_expand=product`,r).then(n=>{f=n.data,q(f)}).catch(n=>{u(n)}):t==="profile"&&c.get(`${d}/600/users/${e}`,r).then(n=>{f=n.data,D()}).catch(n=>{u(n)})}function k(t){let a="";t.length===0?a+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        目前沒有訂單記錄
        </p>
    </div>
    `:t.forEach(e=>{a+=`
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
                        <span class="fw-normal">${e.createdTime.replace(/\s(.)+/,"")}</span>
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
                        ${e.content.map(r=>`
                        <div class="row gap-md-5 py-2 border-bottom lh-lg">
                            <div class="col-lg-3 col-12">
                                <p class="text-orange fw-bold">${r.product.name}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">數量：</span>${r.qty}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">金額：</span>${r.product.price*r.qty}</p>
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
                            <p class="text-black">${e.createdTime}</p>
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
        `}),g.innerHTML=a,$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function q(t){let a="";t.length===0?a+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        還沒有收藏任何商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
    </div>
    `:t.forEach(({product:s})=>a+=`
    <div class="col-md-4 col-12 mb-9">
        <a class="text-decoration-none" href="products-detail.html?id=${s.id}">
            <div class="card hover-shadow h-100 overflow-hidden mb-6">
                <div class="position-relative mb-6">
                    <img class="w-100"
                         src="${s.image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                         alt="${s.name}">
                    ${s.forSale?"":`
                    <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center" style="backdrop-filter: brightness(70%)">
                        <h3 class="custom-tooltip w-100 text-center py-5">已售完</h3>
                    </div>`}
                </div>
                <div class="px-5">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="fs-6">${s.name}・<span class="text-muted">${s.size}</span></h4>
                            <p class="fs-7 text-orange fw-bold">NT＄${s.price}</p>
                        </div>
                        <div class="d-flex gap-3">
                            <button data-num="${s.id}" class="favorite btn btn-sm btn-outline-orange p-1">
                                <span class="material-icons d-flex">favorite</span>
                            </button>
                            <button data-num="${s.id}" class="cart btn btn-sm btn-primary p-1 ${s.forSale?"":"disabled"}">
                                <span class="material-icons d-flex">shopping_bag</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `),g.innerHTML=a,document.querySelectorAll(".favorite").forEach(s=>{I(s,t)}),document.querySelectorAll(".cart").forEach(s=>{P(s,t)})}function I(t,a){t.addEventListener("click",e=>{e.preventDefault();const r=a.find(n=>n.product.id==t.dataset.num);JSON.parse(localStorage.getItem("userData")).id;const s=b();c.delete(`${d}/640/collects/${r.id}`,{headers:{authorization:`Bearer ${s}`}}).then(n=>{i("success",`已取消收藏${r.product.name}`),h()}).catch(n=>{u(n)})},!1)}function P(t,a){t.addEventListener("click",function(e){e.preventDefault();const r=b();if(!r)i("warning","請先登入");else{const s=a.find(o=>o.content.id==t.dataset.num),n=JSON.parse(localStorage.getItem("userData")).id;c.get(`${d}/640/users/${n}/carts`,{headers:{authorization:`Bearer ${r}`}}).then(o=>{const{data:m}=o;let l=m.find(p=>p.content.id==t.dataset.num);return l?l.qty>9?void 0:(l={...l,qty:l.qty+=1},c.patch(`${d}/640/carts/${l.id}`,l,{headers:{authorization:`Bearer ${r}`}})):(l={content:s.content,qty:1,userId:n},delete l.content.isCollected,c.post(`${d}/640/carts`,l,{headers:{authorization:`Bearer ${r}`}}))}).then(o=>{o?i("success","成功加入購物車"):x("數量達上限","如果需要大量訂購，請直接與我們聯絡")}).catch(o=>{u(o)})}},!1)}function D(){const t=f;let a="";a+=`
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
                               value="${t.name}"
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
                               value="${t.email}"
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
    `,g.innerHTML=a,N(t),A(t)}function N(t){const a=document.querySelector("#profile-form");a.addEventListener("click",function(e){if(e.preventDefault(),e.target.nodeName==="BUTTON"){const r=e.target.dataset.target,s=a.querySelector(`#${r}`);r!=="userPassword"&&e.target.textContent==="修改"?(s.removeAttribute("disabled"),e.target.textContent="送出"):e.target.textContent==="送出"?y.fire({icon:"warning",title:"確定修改資料？",text:`您的${s.name==="name"?"名字":"帳號"}將改為：${s.value}`,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{if(s.value===t[s.name]){i("question","資料沒變哦 (ㆆᴗㆆ)");return}const n=b(),o={[s.name]:s.value};e.target.setAttribute("disabled",!0);const m=await c.patch(`${d}/660/users/${t.id}`,o,{headers:{authorization:`Bearer ${n}`}});e.target.removeAttribute("disabled"),i("success","修改完成！"),localStorage.setItem("userData",JSON.stringify(m.data)),h()}catch(n){u(n)}}}).then(n=>{s.setAttribute("disabled",!0),s.value=t[s.name],e.target.textContent="修改"}):r==="userPassword"&&B(t)}})}function B(t){const a=document.querySelector("#change-password-form"),e=a.querySelectorAll("input");a.querySelector('button[type="submit"]').addEventListener("click",function(s){s.preventDefault();const n=e[0].value,o=e[1].value,m=e[2].value;function l(p){const v=/\w{6,}/;if(p)if(v.test(p)){if(n===o){i("warning","新密碼不可與舊密碼相同");return}else if(o!==m){i("warning","兩次密碼不一致");return}}else{i("warning","長度需在六個字以上");return}else{i("warning","欄位不可空白");return}return!0}[...e].every(p=>l(p.value))&&function(){const p={email:t.email,password:n};c.post(`${d}/login/${t.id}`,p).then(v=>{const w={headers:{authorization:`Bearer ${b()}`}};return c.patch(`${d}/660/users/${t.id}`,{password:o},w)}).then(v=>{a.reset(),localStorage.removeItem("token"),localStorage.removeItem("userData"),i("success","修改成功！請重新登入！","login.html")}).catch(v=>{u(v)})}()})}function A(t){const a=document.querySelector("#delivery-form"),e=a.querySelector("#useMemberName"),r=a.querySelector("#receiver"),s=a.querySelector("#phone"),n=a.querySelector("#address");e.addEventListener("change",function(o){o.target.checked?r.value=t.name:r.value=""}),a.addEventListener("submit",function(o){if(o.preventDefault(),s&&!/^09(\d){8}/.test(s.value)){i("warning","手機號碼格式不正確");return}r.value,s.value,n.value,JSON.parse(localStorage.getItem("userData")).id,a.reset()})}const L=document.querySelectorAll(".back-to-top");L.forEach(t=>{const a=new T(t);t.addEventListener("click",e=>{a.backToTop()})});
