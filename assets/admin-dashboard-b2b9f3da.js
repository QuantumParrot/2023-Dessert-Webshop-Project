import{t as r,d as f,a as d,e as u,S as g,g as v}from"./main-24575d4b.js";import{T}from"./tab-ee5e9841.js";import{h as k}from"./moment-fbc5633a.js";const{VITE_APP_SITE:p,VITE_APP_ADMIN_IDENTITY:B}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let m="",c=[];(function(){var s;((s=JSON.parse(localStorage.getItem("userData")))==null?void 0:s.role)!=="admin"?r("warning","請先登入管理員帳號","admin-login.html"):localStorage.getItem("token").indexOf(B.split("").map(o=>o.charCodeAt()).join(""))===-1?r("error","身份驗證失敗","index.html"):w()})();window.addEventListener("hashchange",function(t){w()});function w(){const t=location.hash.replace("#","")||"orders",n=document.querySelector(`#v-pills-${t}-tab`);n&&new T(n).show(),m=document.querySelector(`#v-pills-${t} #${t}-content`),t==="orders"?x():t==="announcements"&&h()}function x(){const t=f(localStorage.getItem("token"));d.get(`${p}/660/orders`,{headers:{authorization:`Bearer ${t}`}}).then(n=>{c=n.data,l(c.filter(s=>!s.isFinished)),S()}).catch(n=>{u(n)})}function l(t){let n="";t.length===0?n+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">沒有訂單記錄</p>
    </div>
    `:t.forEach(e=>{n+=`
        <div class="col-12">
            <div class="accordion-item mb-6">
                <button type="button"
                        class="accordion-title w-100 btn d-md-block d-flex justify-content-between
                               text-start bg-white rounded-2 shadow px-md-8 px-5 py-5">
                    <div class="mb-md-6 mb-0">
                        <span class="fw-bold">訂單</span>編號：</span>
                        <span class="text-black">${e.orderNum}</span>
                    </div>
                    <div class="row">
                        <div class="col-3 d-md-block d-none">
                            <div>
                                <span class="fw-bold">成立日期：</span>
                                <span class="fw-normal">${e.createdTime.replace(/\s(.)+/,"")}</span>
                            </div>
                        </div>
                        <div class="col-3 d-md-block d-none border-start border-end">
                            <div class="d-flex justify-content-between px-6">
                                <span class="fw-bold">訂購金額：</span>
                                <span>${e.total} 元</span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="ps-md-6 ps-0">
                                <span class="d-md-inline-block d-none fw-bold">訂單狀態：</span>
                                <span class=${e.isFinished?"text-success":"text-danger"}>
                                ${e.isFinished?"已完成":"製作中"}</span>
                            </div>
                        </div>
                    </div>
                </button>
                <div class="accordion-content rounded-2 shadow">
                    <div class="px-md-8 px-6 pt-5 pb-7">
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
                    ${e.isFinished?"":`
                    <div class="mt-5 text-center">
                        <button data-num=${e.id} class="btn btn-primary">完成訂單</button>
                    </div>`}
                </div>
            </div>
        </div>
        `}),m.innerHTML=n;const s=m.querySelectorAll("button[data-num]");s&&s.forEach(e=>e.addEventListener("click",E)),$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function E(t){const n=f(localStorage.getItem("token"));g.fire({icon:"warning",title:"確定完成訂單？",text:"提醒您，按下完成之後即無法更改訂單狀態",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"完成",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const s=t.target.dataset.num,e={...c.find(a=>a.id==s),isFinished:!0},o=await d.patch(`${p}/660/orders/${s}`,e,{headers:{authorization:`Bearer ${n}`}});r("success","訂單完成！已通知客戶！"),x()}catch(s){u(s)}}})}function S(){let t=[...c];const n=document.querySelector("#filter-by-status"),s=document.querySelector("#sort-by-time"),e=document.querySelector("#order-search");s.addEventListener("change",function(o){o.target.value==="由新到舊"?t.sort((a,i)=>i.id-a.id):o.target.value==="由舊到新"&&t.sort((a,i)=>a.id-i.id),l(t)}),n.addEventListener("change",function(o){const{value:a}=o.target;a==="全部訂單"?(t=c,l(t)):a==="已完成"?(t=c.filter(i=>i.isFinished),l(t)):a==="未完成"&&(t=c.filter(i=>!i.isFinished),l(t))}),e.addEventListener("input",function(o){let{value:a}=o.target;a=a.toLowerCase().trim();const i=c.filter(b=>b.orderNum.includes(a)||Object.values(b.info).some(y=>y.toLowerCase().includes(a)));n.value="全部訂單",s.value="由舊到新",l(i)})}function h(){const t=f(v());d.get(`${p}/660/announcements?_sort=id&_order=desc`,{headers:{authorization:`Bearer ${t}`}}).then(n=>{c=n.data,A()}).catch(n=>{u(n)})}function A(){let t='<div class="col-12"><ul class="list-group gap-5">';c.forEach(e=>{t+=`
        <li class="list-group-item bg-white rounded-2 shadow p-0 fw-bold">
            <div class="d-flex flex-md-row flex-column align-items-md-center align-items-start gap-8 p-8">
                <button data-id="${e.id}" class="btn btn-sm btn-primary px-4">刪除消息</button>
                <p class="text-black">${e.date.replace(/\s[AM|PM].+/,"")}</p>
                <p>${e.title}</p>
            </div>
        </li>
        `}),t+="</ul></div>",m.innerHTML=t,document.querySelector("#add-news-form").addEventListener("submit",C),document.querySelectorAll("button[data-id]").forEach(e=>e.addEventListener("click",o=>{D(o.target.dataset.id)}))}function C(t){t.preventDefault();const n=t.target.querySelector("#title"),s=t.target.querySelector("#content"),e=t.target.querySelector("#type");!n.value||!s.value?r("warning","欄位不得空白"):g.fire({icon:"warning",title:"確定送出？",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const o={title:n.value,type:e.value,content:s.value,date:k().format("YYYY-MM-D A hh:mm:ss"),image:""},a=await d.post(`${p}/660/announcements`,o,{headers:{authorization:`Bearer ${v()}`}});console.log(a),r("success","新增成功！"),t.target.reset(),h()}catch(o){u(o)}}})}function D(t){g.fire({icon:"warning",title:"確定刪除？",text:"提醒您，此操作無法復原哦！",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const n=await d.delete(`${p}/660/announcements/${t}`,{headers:{authorization:`Bearer ${v()}`}});r("success","刪除成功！"),h()}catch(n){u(n)}}})}
