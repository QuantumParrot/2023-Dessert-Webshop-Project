import{t as l,d as h,g as f,a as d,e as u,S as v}from"./main-78beb421.js";import{T as B}from"./tab-1e253613.js";import{h as S}from"./moment-fbc5633a.js";import{S as E}from"./ScrollEvent-2d368248.js";const{VITE_APP_SITE:p,VITE_APP_ADMIN_IDENTITY:A}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let m="",a=[];(function(){var s;((s=JSON.parse(localStorage.getItem("userData")))==null?void 0:s.role)!=="admin"?l("warning","請先登入管理員帳號","admin-login.html"):localStorage.getItem("token").indexOf(A.split("").map(o=>o.charCodeAt()).join(""))===-1?l("error","身份驗證失敗","index.html"):x()})();window.addEventListener("hashchange",function(t){x()});function x(){const t=location.hash.replace("#","")||"orders",e=document.querySelector(`#v-pills-${t}-tab`);e&&new B(e).show(),m=document.querySelector(`#v-pills-${t} #${t}-content`),t==="orders"?y():t==="announcements"?g():t==="products"&&T()}function y(){const t=h(f());d.get(`${p}/660/orders`,{headers:{authorization:`Bearer ${t}`}}).then(e=>{a=e.data,b(a.filter(s=>!s.isFinished)),L(a.filter(s=>!s.isFinished))}).catch(e=>{u(e)})}function b(t){let e="";t.length===0?e+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">沒有訂單記錄</p>
    </div>
    `:t.forEach(n=>{e+=`
        <div class="col-12">
            <div class="accordion-item mb-6">
                <button type="button"
                        class="accordion-title w-100 btn d-md-block d-flex justify-content-between
                               text-start bg-white rounded-2 shadow px-md-8 px-5 py-5">
                    <div class="mb-md-6 mb-0">
                        <span class="fw-bold">訂單</span>編號：</span>
                        <span class="text-black">${n.orderNum}</span>
                    </div>
                    <div class="row">
                        <div class="col-3 d-md-block d-none">
                            <div>
                                <span class="fw-bold">成立日期：</span>
                                <span class="fw-normal">${n.createdTime.replace(/\s(.)+/,"")}</span>
                            </div>
                        </div>
                        <div class="col-3 d-md-block d-none border-start border-end">
                            <div class="d-flex justify-content-between px-6">
                                <span class="fw-bold">訂購金額：</span>
                                <span>${n.total} 元</span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="ps-md-6 ps-0">
                                <span class="d-md-inline-block d-none fw-bold">訂單狀態：</span>
                                <span class=${n.isFinished?"text-success":"text-danger"}>
                                ${n.isFinished?"已完成":"製作中"}</span>
                            </div>
                        </div>
                    </div>
                </button>
                <div class="accordion-content rounded-2 shadow">
                    <div class="px-md-8 px-6 pt-5 pb-7">
                    <div class="mb-5">
                        ${n.content.map(o=>`
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
                            <p class="mb-5">總計：${n.total} 元<span class="text-muted fs-7">（含運費）</span></p>
                        </div>
                    </div>
                    <div class="lh-lg">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <p class="d-md-block d-none fw-bold fs-5">寄送資訊</p>
                            <p class="text-black">${n.createdTime}</p>
                        </div>
                        <p>
                        <span class="text-orange fw-bold">收件人姓名：</span>${n.info.receiver}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">收件人電話：</span>${n.info.phone}
                        </p>
                        <p class="d-md-block d-flex flex-column">
                        <span class="text-orange fw-bold">收件人地址：</span>${n.info.address}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">取貨方式：</span>${n.info.method}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">付款方式：</span>${n.info.payment}
                        </p>
                        <p>
                        <span class="text-orange fw-bold">指定收貨時段：</span>${n.info.shippingTime}
                        </p>
                    </div>
                    ${n.isFinished?"":`
                    <div class="mt-5 text-center">
                        <button data-num=${n.id} class="btn btn-primary">完成訂單</button>
                    </div>`}
                </div>
            </div>
        </div>
        `}),m.innerHTML=e;const s=m.querySelectorAll("button[data-num]");s&&s.forEach(n=>n.addEventListener("click",C)),$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function C(t){const e=h(localStorage.getItem("token"));v.fire({icon:"warning",title:"確定完成訂單？",text:"提醒您，按下完成之後即無法更改訂單狀態",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"完成",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const s=t.target.dataset.num,n={...a.find(c=>c.id==s),isFinished:!0},o=await d.patch(`${p}/660/orders/${s}`,n,{headers:{authorization:`Bearer ${e}`}});l("success","訂單完成！已通知客戶！"),y()}catch(s){u(s)}}})}function L(t){const e=document.querySelector("#filter-by-status"),s=document.querySelector("#sort-by-time"),n=document.querySelector("#order-search");function o(c){c==="由新到舊"?t.sort((i,r)=>r.id-i.id):c==="由舊到新"&&t.sort((i,r)=>i.id-r.id)}s.addEventListener("change",function(c){o(c.target.value),b(t)}),e.addEventListener("change",function(c){const{value:i}=c.target;i==="全部訂單"?(t=a,o(s.value)):i==="已完成"?(t=a.filter(r=>r.isFinished),o(s.value)):i==="未完成"&&(t=a.filter(r=>!r.isFinished),o(s.value)),b(t)}),n.addEventListener("input",function(c){let{value:i}=c.target;i=i.toLowerCase().trim();const r=a.filter(w=>w.orderNum.includes(i)||Object.values(w.info).some(k=>k.toLowerCase().includes(i)));e.value="全部訂單",s.value="由舊到新",b(r)})}function g(){const t=h(f());d.get(`${p}/660/announcements?_sort=id&_order=desc`,{headers:{authorization:`Bearer ${t}`}}).then(e=>{a=e.data,I()}).catch(e=>{u(e)})}function I(){let t='<div class="col-12"><ul class="list-group gap-5">';a.forEach(n=>{t+=`
        <li class="list-group-item bg-white rounded-2 shadow p-0 fw-bold">
            <div class="d-flex flex-md-row flex-column align-items-md-center align-items-start gap-md-8 gap-6 p-md-8 p-6">
                <button data-id="${n.id}" class="btn btn-sm btn-primary px-4">刪除消息</button>
                <p class="text-black">${n.date.replace(/\s[AM|PM].+/,"")}</p>
                <p>${n.title}</p>
            </div>
        </li>
        `}),t+="</ul></div>",m.innerHTML=t,document.querySelector("#add-news-form").addEventListener("submit",O),document.querySelectorAll("button[data-id]").forEach(n=>n.addEventListener("click",o=>{q(o.target.dataset.id)}))}function O(t){t.preventDefault();const e=t.target.querySelector("#title"),s=t.target.querySelector("#content"),n=t.target.querySelector("#type");!e.value||!s.value?l("warning","欄位不得空白"):v.fire({icon:"warning",title:"確定送出？",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const o={title:e.value,type:n.value,content:s.value,date:S().format("YYYY-MM-D A hh:mm:ss"),image:""},c=await d.post(`${p}/660/announcements`,o,{headers:{authorization:`Bearer ${f()}`}});console.log(c),l("success","新增成功！"),t.target.reset(),g()}catch(o){u(o)}}})}function q(t){v.fire({icon:"warning",title:"確定刪除？",text:"提醒您，此操作無法復原哦！",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const e=await d.delete(`${p}/660/announcements/${t}`,{headers:{authorization:`Bearer ${f()}`}});l("success","刪除成功！"),g()}catch(e){u(e)}}})}function T(){const t=h(f());d.get(`${p}/660/products`,{headers:{authorization:`Bearer ${t}`}}).then(e=>{a=e.data,P()}).catch(e=>{u(e)})}function P(){let t="";a.forEach(e=>t+=`
    <div class="col-md-3 col-12 mb-md-9 mb-6">
        <div class="card hover-shadow overflow-hidden" data-num="${e.id}">
            <div class="position-relative d-md-block d-none">
                <img class="w-100"
                     src="${e.image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                     alt="${e.name}">
                ${e.forSale?"":`
                <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center" style="backdrop-filter: brightness(70%)">
                    <h3 class="custom-tooltip w-100 text-center py-5">已售完</h3>
                </div>`}
            </div>
            <div class="px-5">
                <div class="d-flex flex-md-column justify-content-between align-items-center">
                    <h4 class="fs-6 my-6">${e.name}</h4>
                    <div class="d-flex justify-content-center gap-3 mb-md-6 mb-0">
                        <button type="button" class="edit btn btn-primary btn-sm p-2">編輯</button>
                        <button type="button" 
                                class="status btn btn-orange btn-sm p-2">${e.forSale?"下架":"上架"}</button>
                        <button type="button"
                                class="delete btn btn-danger btn-sm p-2">
                        刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `),m.innerHTML=t,m.addEventListener("click",_)}function _({target:t}){if(t.nodeName==="BUTTON"){const s=t.closest(".card").dataset.num,n=a.find(o=>o.id==s);t.classList.contains("status")?v.fire({icon:"warning",title:`確定${t.textContent}？`,text:`商品名稱：${n.name}`,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const o=await d.patch(`${p}/660/products/${s}`,{forSale:!n.forSale},{headers:{authorization:`Bearer ${f()}`}});T(),l("success",`${t.textContent}成功！`)}catch(o){u(o)}}}):t.classList.contains("delete")}}const F=document.querySelectorAll(".back-to-top");F.forEach(t=>{const e=new E(t);t.addEventListener("click",s=>{e.backToTop()})});
