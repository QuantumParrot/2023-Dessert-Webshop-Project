import{t as d,g as w,d as f,a as m,e as u,S as x}from"./main-10bf84ab.js";import{T}from"./tab-7e1302fb.js";const{VITE_APP_SITE:b,VITE_APP_ADMIN_IDENTITY:y}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let r="",c=[];(function(){var n;((n=JSON.parse(localStorage.getItem("userData")))==null?void 0:n.role)!=="admin"?d("warning","請先登入管理員帳號","admin-login.html"):w().indexOf(y.split("").map(a=>a.charCodeAt()).join(""))===-1?d("error","身份驗證失敗","index.html"):g()})();window.addEventListener("hashchange",function(e){g()});function g(){const e=location.hash.replace("#","")||"orders",s=document.querySelector(`#v-pills-${e}-tab`);s&&new T(s).show(),r=document.querySelector(`#v-pills-${e} #${e}-content`),e==="orders"&&h()}function h(){const e=f(localStorage.getItem("token"));m.get(`${b}/660/orders`,{headers:{authorization:`Bearer ${e}`}}).then(s=>{c=s.data,l(c),k()}).catch(s=>{u(s)})}function l(e){let s="";e.length===0?s+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">沒有訂單記錄</p>
    </div>
    `:e.forEach(t=>{s+=`
        <div class="col-12">
            <div class="accordion-item mb-6">
                <button type="button"
                        class="accordion-title w-100 btn d-md-block d-flex justify-content-between
                               text-start bg-white rounded-2 shadow px-md-8 py-5">
                    <p class="mb-md-3 mb-0">
                        <span class="fw-bold">訂單</span>編號：</span>
                        <span class="text-black">${t.orderNum}</span>
                    </p>
                    <div class="d-flex gap-5">
                        <p class="d-md-inline-block d-none pe-5 border-end">
                            <span class="fw-bold">成立日期：</span>
                            <span class="fw-normal">${t.createdTime.replace(/\s(.)+/,"")}</span>
                        </p>
                        <p class="d-md-inline-block d-none pe-5 border-end">
                            <span class="fw-bold">訂購金額：</span>
                            ${t.total} 元
                        </p>
                        <p class="pe-md-5 ps-md-2 p-0">
                            <span class="d-md-inline-block d-none fw-bold">訂單狀態：</span>
                            <span class=${t.isFinished?"text-success":"text-danger"}>
                            ${t.isFinished?"已完成":"製作中"}</span>
                        </p>
                    </div>
                </button>
                <div class="accordion-content rounded-2 shadow">
                    <div class="px-md-8 px-6 pt-5 pb-7">
                    <div class="mb-5">
                        ${t.products.map(a=>`
                        <div class="row gap-md-5 py-2 border-bottom lh-lg">
                            <div class="col-lg-3 col-12">
                                <p class="text-orange fw-bold">${a.content.name}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">數量：</span>${a.qty}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">金額：</span>${a.content.price*a.qty}</p>
                            </div>
                        </div>`).join("")}
                    </div>
                    <div class="row fs-5 fw-bold border-bottom mb-5">
                        <div class="col-12">
                            <p class="mb-5">總計：${t.total} 元<span class="text-muted fs-7">（含運費）</span></p>
                        </div>
                    </div>
                    <div class="lh-lg">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <p class="d-md-block d-none fw-bold fs-5">寄送資訊</p>
                            <p class="text-black">${t.createdTime}</p>
                        </div>
                        <p>
                        <span class="text-orange fw-bold">收件人姓名：</span>${t.info.receiver}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">收件人電話：</span>${t.info.phone}
                        </p>
                        <p class="d-md-block d-flex flex-column">
                        <span class="text-orange fw-bold">收件人地址：</span>${t.info.address}
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
                    ${t.isFinished?"":`
                    <div class="mt-5 text-center">
                        <button data-num=${t.id} class="btn btn-primary">完成訂單</button>
                    </div>`}
                </div>
            </div>
        </div>
        `}),r.innerHTML=s;const n=r.querySelectorAll("button[data-num]");n&&n.forEach(t=>t.addEventListener("click",E)),$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function E(e){const s=f(localStorage.getItem("token"));x.fire({icon:"warning",title:"確定完成訂單？",text:"提醒您，按下完成之後即無法更改訂單狀態",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"完成",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const n=e.target.dataset.num,t={...c.find(o=>o.id==n),isFinished:!0},a=await m.patch(`${b}/orders/${n}`,t,{headers:{authorization:`Bearer ${s}}`}});d("success","訂單完成！已通知客戶！"),h()}catch(n){u(n)}}})}function k(){let e=[...c];const s=document.querySelector("#filter-by-status"),n=document.querySelector("#sort-by-time"),t=document.querySelector("#order-search");n.addEventListener("change",function(a){a.target.value==="由新到舊"?e.sort((o,i)=>i.id-o.id):a.target.value==="由舊到新"&&e.sort((o,i)=>o.id-i.id),l(e)}),s.addEventListener("change",function(a){const{value:o}=a.target;o==="全部訂單"?(e=c,l(e)):o==="已完成"?(e=c.filter(i=>i.isFinished),l(e)):o==="未完成"&&(e=c.filter(i=>!i.isFinished),l(e))}),t.addEventListener("input",function(a){let{value:o}=a.target;o=o.toLowerCase().trim();const i=c.filter(p=>p.orderNum.includes(o)||Object.values(p.info).some(v=>v.toLowerCase().includes(o)));s.value="全部訂單",n.value="由舊到新",l(i)})}
