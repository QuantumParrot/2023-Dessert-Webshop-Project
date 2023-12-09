import{t as m,a as f,h as p,e as h,S as C,f as y}from"./main-050bd7e3.js";import{h as S}from"./moment-fbc5633a.js";import{T as M}from"./tab-170d785f.js";import{S as N}from"./ScrollEvent-2d368248.js";function O(e){e=e.filter(a=>a.isFinished);const t=Number(S().format("MM"));let o=0,s=0;e.forEach(a=>{const c=S(a.createdTime).format("MM");c==t-1?o+=a.content.reduce((b,d)=>b+d.qty*d.product.price,0):c==t&&(s+=a.content.reduce((b,d)=>b+d.qty*d.product.price,0))}),document.querySelector("#last-month").textContent=`NT＄${o}`,document.querySelector("#this-month").textContent=`NT＄${s}`;const n={};e.forEach(a=>a.content.forEach(c=>{n[c.product.name]?(n[c.product.name].qty+=c.qty,n[c.product.name].revenue+=c.product.price*c.qty):(n[c.product.name]={},n[c.product.name].qty=c.qty,n[c.product.name].revenue=c.product.price*c.qty)}));const r=[];Object.keys(n).forEach(a=>r.push([a,n[a].revenue])),c3.generate({bindto:"#revenue-chart",color:{pattern:["#EFB495","#FAEED1","#DED0B6","#BBAB8C","#C08261","#E2C799","#B0926A","#E1C78F","#A9B388","#C4C1A4","#FFC6AC"]},data:{columns:r,type:"pie"},pie:{label:{show:!1}},padding:{bottom:32}});const i=Object.keys(n).sort((a,c)=>n[c].qty-n[a].qty);F(i,i.map(a=>n[a].qty))}function F(e,t){const o=document.querySelector("#qty-chart");o.style.height="320px";const s=echarts.init(o),n={color:["#77BCB7"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"2%",right:"2%",bottom:"10%",containLabel:!0},xAxis:{type:"category",data:e,axisTick:{alignWithLabel:!0},axisLabel:{interval:1,margin:20}},yAxis:{type:"value"},series:[{type:"bar",data:t,name:"銷售數量",barWidth:"60%"}]};n&&s.setOption(n)}const{VITE_APP_SITE:g,VITE_APP_ADMIN_IDENTITY:P}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let x="",u=[];(function(){var o;if(((o=JSON.parse(localStorage.getItem("userData")))==null?void 0:o.role)!=="admin")m("warning","請先登入管理員帳號","admin-login.html");else if(localStorage.getItem("token").indexOf(P.split("").map(n=>n.charCodeAt()).join(""))===-1)m("error","身份驗證失敗","index.html");else{const n=document.querySelector("main");n.classList.remove("d-none"),n.removeAttribute("class"),L()}})();window.addEventListener("hashchange",function(e){L()});function L(){const e=location.hash.replace("#","")||"orders",t=document.querySelector(`#v-pills-${e}-tab`);t&&new M(t).show(),x=document.querySelector(`#v-pills-${e} #${e}-content`),e==="orders"?k():e==="announcements"?B():e==="products"?q():e==="charts"&&Q()}function k(){f.get(`${g}/660/orders`,p).then(e=>{u=e.data,E(u.filter(t=>!t.isFinished)),I(u.filter(t=>!t.isFinished))}).catch(e=>{h(e)})}function E(e){let t="";e.length===0?t+=`
    <div class="col-12">
        <p class="alert bg-tertiary text-center m-0">沒有訂單記錄</p>
    </div>
    `:e.forEach(s=>{t+=`
        <div class="col-12">
            <div class="accordion-item mb-6">
                <button type="button"
                        class="accordion-title w-100 btn d-md-block d-flex justify-content-between
                               text-start bg-white rounded-2 shadow px-md-8 px-5 py-5">
                    <div class="mb-md-6 mb-0">
                        <span class="fw-bold">訂單編號：</span>
                        <span class="text-black">${s.orderNum}</span>
                    </div>
                    <div class="row">
                        <div class="col-3 d-md-block d-none">
                            <div>
                                <span class="fw-bold">成立日期：</span>
                                <span class="fw-normal">${S(s.createdTime).format("YYYY-MM-DD")}</span>
                            </div>
                        </div>
                        <div class="col-3 d-md-block d-none border-start border-end">
                            <div class="d-flex justify-content-between px-6">
                                <span class="fw-bold">訂購金額：</span>
                                <span>${s.total} 元</span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="ps-md-6 ps-0">
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
                        ${s.content.map(n=>`
                        <div class="row gap-md-5 py-2 border-bottom lh-lg">
                            <div class="col-lg-3 col-12">
                                <p class="text-orange fw-bold">${n.product.name}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">數量：</span>${n.qty}</p>
                            </div>
                            <div class="col-lg-3 col-12">
                                <p><span class="fw-bold">金額：</span>${n.product.price*n.qty}</p>
                            </div>
                        </div>`).join("")}
                    </div>
                    <div class="row fs-5 fw-bold border-bottom mb-5">
                        <div class="col-12">
                            <p class="mb-5">總計：${s.total} 元<span class="text-muted fs-7">（含運費）</span></p>
                        </div>
                    </div>
                    <div class="lh-lg">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <p class="d-md-block d-none fw-bold fs-5">寄送資訊</p>
                            <p class="text-black">${S(s.createdTime).format("YYYY-MM-DD A hh:mm:ss")}</p>
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
                    ${s.isFinished?"":`
                    <div class="mt-5 text-center">
                        <button data-id=${s.id} class="btn btn-primary">完成訂單</button>
                    </div>`}
                </div>
            </div>
        </div>
        `}),x.innerHTML=t;const o=x.querySelectorAll("button[data-num]");o&&o.forEach(s=>s.addEventListener("click",_)),$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function _(e){C.fire({icon:"warning",title:"確定完成訂單？",text:"提醒您，按下完成之後即無法更改訂單狀態",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"完成",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const t=e.target.dataset.id,o=await f.patch(`${g}/660/orders/${t}`,{isFinished:!0},p);m("success","訂單完成！已通知客戶！"),k()}catch(t){h(t)}}})}function I(e){const t=document.querySelector("#filter-by-status"),o=document.querySelector("#sort-by-time"),s=document.querySelector("#order-search");function n(r){r==="由新到舊"?e.sort((i,a)=>a.id-i.id):r==="由舊到新"&&e.sort((i,a)=>i.id-a.id)}o.addEventListener("change",r=>{n(r.target.value),E(e)}),t.addEventListener("change",r=>{const{value:i}=r.target;i==="全部訂單"?(e=u,n(o.value)):i==="已完成"?(e=u.filter(a=>a.isFinished),n(o.value)):i==="未完成"&&(e=u.filter(a=>!a.isFinished),n(o.value)),E(e)}),s.addEventListener("input",r=>{let{value:i}=r.target;i=i.toLowerCase().trim();const a=u.filter(c=>c.orderNum.includes(i)||Object.values(c.info).some(b=>b.toLowerCase().includes(i)));t.value="全部訂單",o.value="由舊到新",E(a)})}function B(){f.get(`${g}/660/announcements?_sort=id&_order=desc`,p).then(e=>{u=e.data,j(),document.querySelector("#add-news-form").addEventListener("submit",Y),document.querySelectorAll("button[data-id]").forEach(s=>s.addEventListener("click",n=>{H(n.target.dataset.id)}))}).catch(e=>{h(e)})}function j(){let e='<div class="col-12"><ul class="list-group gap-5">';u.forEach(t=>{e+=`
    <li class="list-group-item bg-white rounded-2 shadow p-0 fw-bold">
        <div class="d-flex flex-md-row flex-column align-items-md-center align-items-start gap-md-8 gap-6 p-md-8 p-6">
            <button data-id="${t.id}" class="btn btn-sm btn-primary px-4">刪除消息</button>
            <p class="text-black">${S(+t.date).format("YYYY-MM-DD")}</p>
            <p class="d-flex gap-2">
                <a class="text-decoration-none d-flex align-items-center fs-7"
                   href="news-detail.html?id=${t.id}" target="_blank">
                <span class="material-icons">open_in_new</span></a>
                ${t.title}
            </p>
        </div>
    </li>
    `}),e+="</ul></div>",x.innerHTML=e}function Y(e){e.preventDefault();const t=e.target.querySelector("#title"),o=e.target.querySelector("#content"),s=e.target.querySelector("#type");y(t.value)||y(o.value)?m("warning","欄位不得空白"):C.fire({icon:"warning",title:"確定送出？",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const n={title:t.value,type:s.value,content:o.value,date:new Date().getTime(),image:""},r=await f.post(`${g}/660/announcements`,n,p);m("success","新增成功！"),e.target.reset(),B()}catch(n){h(n)}}})}function H(e){C.fire({icon:"warning",title:"確定刪除？",text:"提醒您，此操作無法復原哦！",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const t=await f.delete(`${g}/660/announcements/${e}`,p);m("success","刪除成功！"),B()}catch(t){h(t)}}})}function q(){f.get(`${g}/660/products`,p).then(e=>{u=e.data,V(),document.querySelector("#create-new-product").addEventListener("click",R),document.querySelector("#product-form").addEventListener("submit",W)}).catch(e=>{h(e)})}function V(){let e="";u.forEach(t=>e+=`
    <div class="col-md-3 col-12 mb-md-9 mb-6">
        <div class="card hover-shadow overflow-hidden" data-id="${t.id}">
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
                    <div class="d-flex gap-1">
                        <h4 class="fs-6 my-6">${t.name}</h4>
                        <a href="products-detail.html?id=${t.id}"
                           target="_blank"
                           class="text-decoration-none d-flex align-items-center fs-7"><span class="material-icons">open_in_new</span></a>
                    </div>
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
    `),x.innerHTML=e,x.addEventListener("click",U)}function R(){const e=document.querySelector(".modal-title"),t=document.querySelector("#product-form"),o=t.querySelector(".images");e.textContent="新增商品",o.innerHTML=`
    <input type="text" name="image"
           class="form-control p-2 text-black">`,t.reset()}function W(e){e.preventDefault();const t=e.target.name.value,o=e.target.otherName.value,s=e.target.info.value,n=[...e.target.querySelectorAll('[name="type"]:checked')].map(d=>d.value),r=e.target.size.value,i=e.target.ingredients.value.split(","),a=e.target.price.value,c=[...e.target.querySelectorAll('[name="image"]')].map(d=>d.value).filter(d=>!y(d)),b=e.target.shelfLife.value;if(y(t)||!n.length||y(a)||y(r)||y(b)){m("warning","必填欄位不可空白！");return}else if(isNaN(a)||!Number.isInteger(+a)||a<1){m("warning","價格請填寫大於零的整數");return}else{const d=document.querySelector(".modal-title").textContent;if(d==="新增商品")z({name:t,otherName:o,info:s,type:n,ingredients:i,price:+a,image:c,size:r,shelfLife:b,forSale:!1});else{let D=function(l){return l==="type"||l==="ingredients"?v[l].length!==w[l].length||v[l].some(T=>!w[l].includes(T)):l==="image"?v[l].length!==w[l].length||v[l].every(T=>T!==w[l]):v[l]!==w[l]};const A=d.replace(/\D/g,""),w=u.find(l=>l.id==A),v={...w,name:t,otherName:o,info:s,type:n,ingredients:i,price:+a,image:c,size:r,shelfLife:b};Object.keys(v).some(l=>D(l))?G(A,v):m("question","資料沒變哦 (ㆆᴗㆆ)")}}}function z(e){f.post(`${g}/660/products`,e,p).then(t=>{m("success","成功！記得上架商品哦！"),q()}).catch(t=>{h(t)})}function U({target:e}){if(e.nodeName==="BUTTON"){const o=e.closest(".card").dataset.id,s=u.find(n=>n.id==o);e.classList.contains("status")?C.fire({icon:"warning",title:`確定${e.textContent}？`,text:`商品名稱：${s.name}`,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const n=await f.patch(`${g}/660/products/${o}`,{forSale:!s.forSale},p);m("success",`成功${e.textContent}！`),q()}catch(n){h(n)}}}):e.classList.contains("delete")?C.fire({icon:"warning",title:`確定刪除${s.name}？！`,text:"此操作不可復原，你要確定欸！",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const n=await f.delete(`${g}/660/products/${o}`,p);m("success",`再見，${s.name}！
我們懷念它 ｡ﾟ(ﾟ´ω\`ﾟ)ﾟ｡`),q()}catch(n){h(n)}}}):e.classList.contains("edit")&&J(s)}}function J(e){const t=document.querySelector("#productDetailModal"),o=t.querySelector(".modal-title");o.textContent=`＃${e.id}：${e.name}`,Object.keys(e).filter(s=>s!=="forSale"&&s!=="id").forEach(s=>{if(s==="type")t.querySelectorAll(`input[name="${s}"]`).forEach(r=>r.checked=!!e[s].includes(r.value));else if(s==="image"){const n=t.querySelector(".images");let r="";e[s].forEach(i=>{r+=`
                <input type="text" name="image"
                       class="form-control p-2 text-black"
                       value="${i}">`}),n.innerHTML=r}else{const n=t.querySelector(`[name="${s}"]`);n.value=e[s]}})}function G(e,t){f.patch(`${g}/660/products/${e}`,t,p).then(o=>{m("success","修改成功！"),q()}).catch(o=>{h(o)})}const K=document.querySelector("#createNewImage");K.addEventListener("click",e=>{const t=document.createElement("input");t.name="image",t.classList.add("form-control","p-2","text-black"),document.querySelector(".images").appendChild(t)});function Q(){f.get(`${g}/660/orders`,p).then(e=>{O(e.data)}).catch(e=>{h(e)})}const X=document.querySelectorAll(".back-to-top");X.forEach(e=>{const t=new N(e);e.addEventListener("click",o=>{t.backToTop()})});
