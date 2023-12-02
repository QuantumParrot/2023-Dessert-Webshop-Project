import{t as d,d as B,g as p,a as u,e as m,S as x}from"./main-78beb421.js";import{h as k}from"./moment-fbc5633a.js";import{T as I}from"./tab-1e253613.js";import{S as N}from"./ScrollEvent-2d368248.js";const{VITE_APP_SITE:f,VITE_APP_ADMIN_IDENTITY:M}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let g="",i=[];(function(){var o;((o=JSON.parse(localStorage.getItem("userData")))==null?void 0:o.role)!=="admin"?d("warning","請先登入管理員帳號","admin-login.html"):localStorage.getItem("token").indexOf(M.split("").map(s=>s.charCodeAt()).join(""))===-1?d("error","身份驗證失敗","index.html"):L()})();window.addEventListener("hashchange",function(e){L()});function L(){const e=location.hash.replace("#","")||"orders",t=document.querySelector(`#v-pills-${e}-tab`);t&&new I(t).show(),g=document.querySelector(`#v-pills-${e} #${e}-content`),e==="orders"?q():e==="announcements"?C():e==="products"&&y()}function q(){const e=B(p());u.get(`${f}/660/orders`,{headers:{authorization:`Bearer ${e}`}}).then(t=>{i=t.data,T(i.filter(o=>!o.isFinished)),P(i.filter(o=>!o.isFinished))}).catch(t=>{m(t)})}function T(e){let t="";e.length===0?t+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">沒有訂單記錄</p>
    </div>
    `:e.forEach(n=>{t+=`
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
                                <span class="fw-normal">${k(n.createdTime).format("YYYY-MM-DD")}</span>
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
                        ${n.content.map(s=>`
                        <div class="row gap-md-5 py-2 border-bottom lh-lg">
                            <div class="col-lg-3 col-12">
                                <p class="text-orange fw-bold">${s.product.name}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">數量：</span>${s.qty}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">金額：</span>${s.product.price*s.qty}</p>
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
                            <p class="text-black">${k(n.createdTime).format("YYYY-MM-DD A hh:mm:ss")}</p>
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
        `}),g.innerHTML=t;const o=g.querySelectorAll("button[data-num]");o&&o.forEach(n=>n.addEventListener("click",O)),$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function O(e){const t=B(localStorage.getItem("token"));x.fire({icon:"warning",title:"確定完成訂單？",text:"提醒您，按下完成之後即無法更改訂單狀態",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"完成",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const o=e.target.dataset.num,n={...i.find(a=>a.id==o),isFinished:!0},s=await u.patch(`${f}/660/orders/${o}`,n,{headers:{authorization:`Bearer ${t}`}});d("success","訂單完成！已通知客戶！"),q()}catch(o){m(o)}}})}function P(e){const t=document.querySelector("#filter-by-status"),o=document.querySelector("#sort-by-time"),n=document.querySelector("#order-search");function s(a){a==="由新到舊"?e.sort((c,r)=>r.id-c.id):a==="由舊到新"&&e.sort((c,r)=>c.id-r.id)}o.addEventListener("change",function(a){s(a.target.value),T(e)}),t.addEventListener("change",function(a){const{value:c}=a.target;c==="全部訂單"?(e=i,s(o.value)):c==="已完成"?(e=i.filter(r=>r.isFinished),s(o.value)):c==="未完成"&&(e=i.filter(r=>!r.isFinished),s(o.value)),T(e)}),n.addEventListener("input",function(a){let{value:c}=a.target;c=c.toLowerCase().trim();const r=i.filter(v=>v.orderNum.includes(c)||Object.values(v.info).some(b=>b.toLowerCase().includes(c)));t.value="全部訂單",o.value="由舊到新",T(r)})}function C(){const e=B(p());u.get(`${f}/660/announcements?_sort=id&_order=desc`,{headers:{authorization:`Bearer ${e}`}}).then(t=>{i=t.data,Y(),document.querySelector("#add-news-form").addEventListener("submit",F),document.querySelectorAll("button[data-id]").forEach(s=>s.addEventListener("click",a=>{_(a.target.dataset.id)}))}).catch(t=>{m(t)})}function Y(){let e='<div class="col-12"><ul class="list-group gap-5">';i.forEach(t=>{e+=`
        <li class="list-group-item bg-white rounded-2 shadow p-0 fw-bold">
            <div class="d-flex flex-md-row flex-column align-items-md-center align-items-start gap-md-8 gap-6 p-md-8 p-6">
                <button data-id="${t.id}" class="btn btn-sm btn-primary px-4">刪除消息</button>
                <p class="text-black">${k(+t.date).format("YYYY-MM-DD")}</p>
                <p>${t.title}</p>
            </div>
        </li>
        `}),e+="</ul></div>",g.innerHTML=e}function F(e){e.preventDefault();const t=e.target.querySelector("#title"),o=e.target.querySelector("#content"),n=e.target.querySelector("#type");!t.value||!o.value?d("warning","欄位不得空白"):x.fire({icon:"warning",title:"確定送出？",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const s={title:t.value,type:n.value,content:o.value,date:new Date().getTime(),image:""},a=await u.post(`${f}/660/announcements`,s,{headers:{authorization:`Bearer ${p()}`}});d("success","新增成功！"),e.target.reset(),C()}catch(s){m(s)}}})}function _(e){x.fire({icon:"warning",title:"確定刪除？",text:"提醒您，此操作無法復原哦！",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const t=await u.delete(`${f}/660/announcements/${e}`,{headers:{authorization:`Bearer ${p()}`}});d("success","刪除成功！"),C()}catch(t){m(t)}}})}function y(){const e=B(p());u.get(`${f}/660/products`,{headers:{authorization:`Bearer ${e}`}}).then(t=>{i=t.data,j(),document.querySelector("#create-new-product").addEventListener("click",z),document.querySelector("#product-form").addEventListener("submit",H)}).catch(t=>{m(t)})}function j(){let e="";i.forEach(t=>e+=`
    <div class="col-md-3 col-12 mb-md-9 mb-6">
        <div class="card hover-shadow overflow-hidden" data-num="${t.id}">
            <div class="position-relative d-md-block d-none">
                <img class="w-100"
                     src="${t.image[0]||"https://fakeimg.pl/291x291/?text=🍰&font=noto"}"
                     alt="${t.name}">
                ${t.forSale?"":`
                <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center" style="backdrop-filter: brightness(70%)">
                    <h3 class="custom-tooltip w-100 text-center py-5">已售完</h3>
                </div>`}
            </div>
            <div class="px-5">
                <div class="d-flex flex-md-column justify-content-between align-items-center">
                    <h4 class="fs-6 my-6">${t.name}</h4>
                    <div class="d-flex justify-content-center gap-3 mb-md-6 mb-0">
                        <button type="button"
                                class="edit btn btn-primary btn-sm p-2"
                                data-bs-toggle="modal"
                                data-bs-target="#productDetailModal"
                                >編輯</button>
                        <button type="button" 
                                class="status btn btn-orange btn-sm p-2">${t.forSale?"下架":"上架"}</button>
                        <button type="button"
                                class="delete btn btn-danger btn-sm p-2"
                                >刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `),g.innerHTML=e,g.addEventListener("click",R)}function z(){const e=document.querySelector(".modal-title"),t=document.querySelector("#product-form"),o=t.querySelector(".images");e.textContent="新增商品",o.innerHTML=`
    <input type="text" name="image"
           class="form-control p-2 text-black">`,t.reset()}function H(e){e.preventDefault();const t=e.target.name.value,o=e.target.otherName.value,n=e.target.info.value,s=[...e.target.querySelectorAll('[name="type"]:checked')].map(h=>h.value),a=e.target.size.value,c=e.target.ingredients.value.split(","),r=e.target.price.value,v=[...e.target.querySelectorAll('[name="image"]')].map(h=>h.value).filter(h=>h),b=e.target.shelfLife.value;if(!t||!s.length||!r||!a||!b){d("warning","必填欄位不可空白！");return}else if(isNaN(r)||!Number.isInteger(+r)||r<1){d("warning","價格請填寫大於零的整數");return}else{const h=document.querySelector(".modal-title").textContent;if(h==="新增商品")V({name:t,otherName:o,info:n,type:s,ingredients:c,price:+r,image:v,size:a,shelfLife:b,forSale:!1});else{let A=function(l){return l==="type"||l==="image"||l==="ingredients"?w[l].length!==S[l].length||w[l].some(D=>!S[l].includes(D)):w[l]!==S[l]};const E=h.replace(/\D/g,""),S=i.find(l=>l.id==E),w={...S,name:t,otherName:o,info:n,type:s,ingredients:c,price:+r,image:v,size:a,shelfLife:b};Object.keys(w).some(l=>A(l))?J(E,w):d("question","資料沒變哦 (ㆆᴗㆆ)")}}}function V(e){const t=p();u.post(`${f}/660/products`,e,{headers:{authorization:`Bearer ${t}`}}).then(o=>{d("success","成功！記得上架商品哦！"),y()}).catch(o=>{m(o)})}function R({target:e}){if(e.nodeName==="BUTTON"){const o=e.closest(".card").dataset.num,n=i.find(s=>s.id==o);e.classList.contains("status")?x.fire({icon:"warning",title:`確定${e.textContent}？`,text:`商品名稱：${n.name}`,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const s=await u.patch(`${f}/660/products/${o}`,{forSale:!n.forSale},{headers:{authorization:`Bearer ${p()}`}});y(),d("success",`成功${e.textContent}！`)}catch(s){m(s)}}}):e.classList.contains("delete")?x.fire({icon:"warning",title:`確定刪除${n.name}？！`,text:"此操作不可復原，你要確定欸！",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const s=await u.delete(`${f}/660/products/${o}`,{headers:{authorization:`Bearer ${p()}`}});y(),d("success",`再見，${n.name}！
我們懷念它 ｡ﾟ(ﾟ´ω\`ﾟ)ﾟ｡`)}catch(s){m(s)}}}):e.classList.contains("edit")&&U(n)}}function U(e){const t=document.querySelector("#productDetailModal"),o=t.querySelector(".modal-title");o.textContent=`＃${e.id}：${e.name}`,Object.keys(e).filter(n=>n!=="forSale"&&n!=="id").forEach(n=>{if(n==="type")t.querySelectorAll(`input[name="${n}"]`).forEach(a=>a.checked=!!e[n].includes(a.value));else if(n==="image"){const s=t.querySelector(".images");let a="";e[n].forEach(c=>{a+=`
                <input type="text" name="image"
                       class="form-control p-2 text-black"
                       value="${c}">`}),s.innerHTML=a}else{const s=t.querySelector(`[name="${n}"]`);s.value=e[n]}})}function J(e,t){u.patch(`${f}/660/products/${e}`,t,{headers:{authorization:`Bearer ${p()}`}}).then(o=>{d("success","修改成功！"),y()}).catch(o=>{m(o)})}const W=document.querySelector("#createNewImage");W.addEventListener("click",e=>{const t=document.createElement("input");t.name="image",t.classList.add("form-control","p-2","text-black"),document.querySelector(".images").appendChild(t)});const G=document.querySelectorAll(".back-to-top");G.forEach(e=>{const t=new N(e);e.addEventListener("click",o=>{t.backToTop()})});
