import{a as i,e as r,t as p,g}from"./handleAuth-676db6f6.js";const{VITE_APP_SITE:d}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function u(){g()?f():p("warning","請先登入","login.html")}u();window.addEventListener("hashchange",function(){f()});function f(){var o;const t=location.hash.replace("#","")||"orders",a=document.querySelector(`#v-pills-${t}-tab`);a&&new bootstrap.Tab(a).show();const n=document.querySelector(`#v-pills-${t} #${t}-content`),s=(o=JSON.parse(localStorage.getItem("userData")))==null?void 0:o.id;t==="orders"?i.get(`${d}/users/${s}/orders`).then(e=>{h(n,e.data)}).catch(e=>{r(e)}):t==="collection"&&i.get(`${d}/users/${s}/collects`).then(e=>{v(n,e.data)}).catch(e=>{r(e)})}function h(t,a){let n="";a.length===0?n+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        目前沒有訂單記錄
        </p>
    </div>
    `:a.forEach(s=>{n+=`
        <div class="col-12">
            <div class="accordion-item mb-6">
                <button type="button"
                        class="accordion-title w-100 btn d-flex justify-content-center align-items-center gap-md-5 gap-2 bg-white rounded-2 shadow px-md-8 py-5">
                    <p class="pe-5 border-end">
                        <span class="fw-bold">訂單</span>編號：</span>
                        <span class="text-black">${s.orderNum}</span>
                    </p>
                    <p class="d-md-inline-block d-none pe-5 border-end">
                        <span class="fw-bold">成立日期：</span>
                        <span class="fw-normal">${s.createdTime.replace(/\s(.)+/,"")}</span>
                    </p>
                    <p class="d-md-inline-block d-none pe-5 border-end">
                        <span class="fw-bold">訂購金額：</span>
                        ${s.total} 元
                    </p>
                    <p class="pe-5 ps-2">
                        <span class="d-md-inline-block d-none fw-bold">訂單狀態：</span>
                        <span class=${s.isFinished?"text-success":"text-danger"}>
                        ${s.isFinished?"已完成":"製作中"}</span>
                    </p>
                </button>
                <div class="accordion-content rounded-2 shadow">
                    <div class="px-md-8 px-6 pt-5 pb-7">
                    <div class="mb-5">
                        ${s.products.map(o=>`
                        <div class="row gap-md-5 py-2 border-bottom lh-lg">
                            <div class="col-lg-3 col-12">
                                <p class="text-orange fw-bold">${o.content.name}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">數量：</span>${o.qty}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">金額：</span>${o.content.price*o.qty}</p>
                            </div>
                        </div>`).join("")}
                    </div>
                    <div class="row fs-5 fw-bold border-bottom mb-5">
                        <div class="col-12">
                            <p class="mb-5">總計：${s.total} 元</p>
                        </div>
                    </div>
                    <div class="lh-lg">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <p class="d-md-block d-none fw-bold fs-5">寄送資訊</p>
                            <p class="text-black">${s.createdTime}</p>
                        </div>
                        <p>
                        <span class="text-orange fw-bold">收件人姓名：</span>${s.info.receiver}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">收件人電話：</span>${s.info.phone}
                        </p>
                        <p class="d-md-block d-flex flex-column">
                        <span class="text-orange fw-bold">收件人地址：</span>${s.info.address}
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
        `}),t.innerHTML=n,$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function v(t,a){let n="";a.length===0?n+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        還沒有收藏任何商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
    </div>
    `:a.forEach(({content:e})=>n+=`
    <div class="col-md-4 col-12 mb-9">
        <a class="text-decoration-none" href="products-detail.html?id=${e.id}">
            <div class="card hover-shadow h-100 overflow-hidden mb-6">
                <img class="mb-6"
                     src="${e.image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                     alt="${e.name}">
                <div class="px-5">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="fs-6">${e.name}・<span class="text-muted">${e.size}</span></h4>
                            <p class="fs-7 text-orange fw-bold">NT＄${e.price}</p>
                        </div>
                        <div class="d-flex gap-3">
                            <button data-num="${e.id}" class="favorite btn btn-sm btn-outline-orange p-1">
                                <span class="material-icons d-flex">favorite</span>
                            </button>
                            <button data-num="${e.id}" class="cart btn btn-sm btn-primary p-1">
                                <span class="material-icons d-flex">shopping_bag</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `),t.innerHTML=n,document.querySelectorAll(".favorite").forEach(e=>{w(e,a)}),document.querySelectorAll(".cart").forEach(e=>{x(e,a)})}function w(t,a){t.addEventListener("click",n=>{n.preventDefault();const s=a.find(e=>e.content.id==t.dataset.num);console.log(s),JSON.parse(localStorage.getItem("userData")).id;const o=localStorage.getItem("token");i.delete(`${d}/640/collects/${s.id}`,{headers:{authorization:`Bearer ${o}`}}).then(e=>{p("success",`已取消收藏${s.content.name}`),f()}).catch(e=>{r(e)})},!1)}function x(t,a){t.addEventListener("click",function(n){n.preventDefault();const s=g();if(!s)p("warning","請先登入");else{const o=a.find(l=>l.id==t.dataset.num),e=JSON.parse(localStorage.getItem("userData")).id;i.get(`${d}/640/users/${e}/carts`,{headers:{authorization:`Bearer ${s}`}}).then(l=>{const{data:m}=l;let c=m.find(b=>b.content.id==t.dataset.num);return c?c.qty>9?void 0:(c={...c,qty:c.qty+=1},i.patch(`${d}/640/carts/${c.id}`,c,{headers:{authorization:`Bearer ${s}`}})):(c={content:o.content,qty:1,userId:e},delete c.content.isCollected,i.post(`${d}/640/carts`,c,{headers:{authorization:`Bearer ${s}`}}))}).then(l=>{l?p("success","成功加入購物車"):warningMessage("數量達上限","如果需要大量訂購，請直接與我們聯絡")}).catch(l=>{r(l)})}},!1)}
