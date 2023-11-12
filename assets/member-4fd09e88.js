import{a as i,e as r,t as p,g as b}from"./handleAuth-797a471f.js";const{VITE_APP_SITE:d}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function u(){b()?f():p("warning","請先登入","login.html")}u();window.addEventListener("hashchange",function(){f()});function f(){var o;const t=location.hash.replace("#","")||"orders",a=document.querySelector(`#v-pills-${t}-tab`);a&&new bootstrap.Tab(a).show();const n=document.querySelector(`#v-pills-${t} #${t}-content`),e=(o=JSON.parse(localStorage.getItem("userData")))==null?void 0:o.id;t==="orders"?i.get(`${d}/users/${e}/orders`).then(s=>{h(n,s.data)}).catch(s=>{r(s)}):t==="collection"&&i.get(`${d}/users/${e}/collects`).then(s=>{v(n,s.data)}).catch(s=>{r(s)})}function h(t,a){let n="";a.length===0?n+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        目前沒有訂單記錄
        </p>
    </div>
    `:a.forEach(e=>{n+=`
        <div class="col-12 accordion">
            <div class="accordion-item">
                <button type="button"
                        class="accordion-button collapsed d-flex align-items-center gap-md-5 gap-2 bg-white rounded-2 shadow px-md-8 py-5"
                        data-bs-toggle="collapse"
                        data-bs-target="#order-${e.id}"
                        aria-expanded="false"
                        aria-controls="collapse-${e.id}">
                    <p class="pe-5 border-end">
                    <span class="fw-bold"><span class="d-md-inline-block d-none">訂單</span>編號：</span>
                    <span class="text-black">${e.orderNum}</span>
                    </p>
                    <p class="d-md-inline-block d-none pe-5 border-end">
                    <span class="fw-bold">成立日期：</span>
                    ${e.createdTime.replace(/\s(.)+/,"")}
                    </p>
                    <p class="d-md-inline-block d-none pe-5 border-end">
                    <span class="fw-bold">訂購金額：</span>
                    ${e.total} 元
                    </p>
                    <p class="pe-5 ps-2 border-end">
                    <span class="d-md-inline-block d-none fw-bold">訂單狀態：</span>
                    <span class=${e.isFinished?"text-success":"text-danger"}>
                    ${e.isFinished?"已完成":"未完成"}
                    </span>
                    </p>
                </button>
                <div id="order-${e.id}"
                     class="accordion-collapse collapse"
                     data-bs-parent="#orders-content">
                     <div class="accordion-body px-md-8 px-6">
                     <div class="mb-5">
                        ${e.products.map(o=>`
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
                            <p class="mb-5">總計：${e.total} 元</p>
                        </div>
                     </div>
                     <div class="lh-lg">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <p class="d-md-block d-none fw-bold fs-5">訂單詳細資訊</p>
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
        `}),t.innerHTML=n}function v(t,a){let n="";a.length===0?n+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">
        還沒有收藏任何商品哦！去<a href="products.html">逛逛</a>吧！
        </p>
    </div>
    `:a.forEach(({content:s})=>n+=`
    <div class="col-md-4 col-12 mb-9">
        <a class="text-decoration-none" href="products-detail.html?id=${s.id}">
            <div class="card hover-shadow h-100 overflow-hidden mb-6">
                <img class="mb-6"
                     src="${s.image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                     alt="${s.name}">
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
                            <button data-num="${s.id}" class="cart btn btn-sm btn-primary p-1">
                                <span class="material-icons d-flex">shopping_bag</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `),t.innerHTML=n,document.querySelectorAll(".favorite").forEach(s=>{$(s,a)}),document.querySelectorAll(".cart").forEach(s=>{w(s,a)})}function $(t,a){t.addEventListener("click",n=>{n.preventDefault();const e=a.find(s=>s.content.id==t.dataset.num);console.log(e),JSON.parse(localStorage.getItem("userData")).id;const o=localStorage.getItem("token");i.delete(`${d}/640/collects/${e.id}`,{headers:{authorization:`Bearer ${o}`}}).then(s=>{p("success",`已取消收藏${e.content.name}`),f()}).catch(s=>{r(s)})},!1)}function w(t,a){t.addEventListener("click",function(n){n.preventDefault();const e=b();if(!e)p("warning","請先登入");else{const o=a.find(c=>c.id==t.dataset.num),s=JSON.parse(localStorage.getItem("userData")).id;i.get(`${d}/640/users/${s}/carts`,{headers:{authorization:`Bearer ${e}`}}).then(c=>{const{data:g}=c;let l=g.find(m=>m.content.id==t.dataset.num);return l?l.qty>9?void 0:(l={...l,qty:l.qty+=1},i.patch(`${d}/640/carts/${l.id}`,l,{headers:{authorization:`Bearer ${e}`}})):(l={content:o.content,qty:1,userId:s},delete l.content.isCollected,i.post(`${d}/640/carts`,l,{headers:{authorization:`Bearer ${e}`}}))}).then(c=>{c?p("success","成功加入購物車"):warningMessage("數量達上限","如果需要大量訂購，請直接與我們聯絡")}).catch(c=>{r(c)})}},!1)}
