import{t as u,a as m,h as f,e as p,S,i as y}from"./main-bd493cb3.js";import{h as x}from"./moment-fbc5633a.js";import{T as O}from"./tab-3b2655c5.js";import{S as N}from"./ScrollEvent-2d368248.js";function P(e){e=e.filter(r=>r.isFinished);const t=Number(x().format("MM")),s=T(e.filter(r=>x(r.createdTime).format("MM")==t)),n=T(e.filter(r=>x(r.createdTime).format("MM")==t-1));document.querySelector("#last-month").textContent=`NT＄${n.revenue_total()}`,document.querySelector("#this-month").textContent=`NT＄${s.revenue_total()}`,document.querySelector("#last-month-rank").innerHTML=A(n.revenue_ranks().splice(0,3)),document.querySelector("#this-month-rank").innerHTML=A(s.revenue_ranks().splice(0,3));const o=T(e).figures(),a=[];Object.keys(o).forEach(r=>a.push({name:r,value:o[r].revenue})),I(a);const c=Object.keys(o).sort((r,v)=>o[r].qty-o[v].qty),i=T(e).revenue_ranks().splice(0,1).join("");F(c,c.map(r=>r!==i?o[r].qty:{value:o[r].qty,itemStyle:{color:"#D1741F"}}))}function I(e){const t=document.querySelector("#revenue-chart");t.style.height="300px";const s=echarts.init(t),n={color:j,tooltip:{trigger:"item"},legend:{orient:window.innerWidth>768?"veritical":"horizontal",left:"left",type:"scroll",pageButtonGap:16,pageButtonItemGap:8,backgroundColor:"white",borderRadius:8,padding:window.innerWidth>768?16:8},grid:{top:"10%"},series:[{name:"商品銷售額",type:"pie",radius:"95%",label:{show:!1},data:e,emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}},top:window.innerWidth>768?null:"21%"}]};n&&s.setOption(n)}function F(e,t){const s=document.querySelector("#qty-chart");s.style.height="400px";const n=echarts.init(s),o={width:"100%",color:["#77BCB7"],title:{left:"center",subtext:"橘色為當前的銷售額冠軍"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"5%",right:"2%",bottom:"10%"},yAxis:{type:"category",data:e,axisTick:{alignWithLabel:!0},axisLabel:{show:!1,margin:20}},xAxis:{type:"value"},series:[{type:"bar",data:t,name:"商品銷售數量",barCategoryGap:"10%"}]};o&&n.setOption(o)}function T(e){const t={};return e.forEach(s=>s.content.forEach(n=>{t[n.product.name]?(t[n.product.name].qty+=n.qty,t[n.product.name].revenue+=n.qty*n.product.price):t[n.product.name]={qty:n.qty,revenue:n.qty*n.product.price}})),{figures:function(){return t},revenue_ranks:function(){return Object.keys(t).sort((s,n)=>t[n].revenue-t[s].revenue)},revenue_total:function(){return e.reduce((s,n)=>s+(n.total-n.deliveryFee),0)}}}const j=["#d87c7c","#919e8b","#d7ab82","#6e7074","#61a0a8","#efa18d","#787464","#cc7e63","#724e58","#4b565b"];function A(e){const t={1:"#FFB11B",2:"#BDC0BA",3:"#A36336"};let s="";return e.map((n,o)=>s+=`
    <li class="d-flex gap-2">
        <span><span class="material-icons" style="color: ${t[o+1]}">military_tech</span></span>
        <span>${n}</span>
    </li>
    `),s}const{VITE_APP_SITE:h,VITE_APP_ADMIN_IDENTITY:Y}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let C="",d=[];(function(){var s;if(((s=JSON.parse(localStorage.getItem("userData")))==null?void 0:s.role)!=="admin")u("warning","請先登入管理員帳號","admin-login.html");else if(localStorage.getItem("token").indexOf(Y.split("").map(o=>o.charCodeAt()).join(""))===-1)u("error","身份驗證失敗","index.html");else{const o=document.querySelector("main");o.classList.remove("d-none"),o.removeAttribute("class"),M()}})();window.addEventListener("hashchange",function(e){M()});function M(){const e=location.hash.replace("#","")||"orders",t=document.querySelector(`#v-pills-${e}-tab`);t&&new O(t).show(),C=document.querySelector(`#v-pills-${e} #${e}-content`),e==="orders"?D():e==="announcements"?B():e==="products"?q():e==="charts"&&te()}function D(){m.get(`${h}/660/orders`,f).then(e=>{d=e.data,E(d.filter(t=>!t.isFinished)),V(d.filter(t=>!t.isFinished))}).catch(e=>{p(e)})}function E(e){let t="";e.length===0?t+=`
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
                        <span class="fw-bold">訂單編號：</span>
                        <span class="text-black">${n.orderNum}</span>
                    </div>
                    <div class="row">
                        <div class="col-3 d-md-block d-none">
                            <div>
                                <span class="fw-bold">成立日期：</span>
                                <span class="fw-normal">${x(n.createdTime).format("YYYY-MM-DD")}</span>
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
                            <p class="text-black">${x(n.createdTime).format("YYYY-MM-DD A hh:mm:ss")}</p>
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
                        <button data-id=${n.id} class="btn btn-primary">完成訂單</button>
                    </div>`}
                </div>
            </div>
        </div>
        `}),C.innerHTML=t;const s=C.querySelectorAll("button[data-id]");s&&s.forEach(n=>n.addEventListener("click",H)),$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function H(e){S.fire({icon:"warning",title:"確定完成訂單？",text:"提醒您，按下完成之後即無法更改訂單狀態",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"完成",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const t=e.target.dataset.id,s=await m.patch(`${h}/660/orders/${t}`,{isFinished:!0},f);u("success","訂單完成！已通知客戶！"),D()}catch(t){p(t)}}})}function V(e){const t=document.querySelector("#filter-by-status"),s=document.querySelector("#sort-by-time"),n=document.querySelector("#order-search");function o(a){a==="由新到舊"?e.sort((c,i)=>i.id-c.id):a==="由舊到新"&&e.sort((c,i)=>c.id-i.id)}s.addEventListener("change",a=>{o(a.target.value),E(e)}),t.addEventListener("change",a=>{const{value:c}=a.target;c==="全部訂單"?(e=d,o(s.value)):c==="已完成"?(e=d.filter(i=>i.isFinished),o(s.value)):c==="未完成"&&(e=d.filter(i=>!i.isFinished),o(s.value)),E(e)}),n.addEventListener("input",a=>{let{value:c}=a.target;c=c.toLowerCase().trim();const i=d.filter(r=>r.orderNum.includes(c)||Object.values(r.info).some(v=>v.toLowerCase().includes(c)));t.value="全部訂單",s.value="由舊到新",E(i)})}function B(){m.get(`${h}/660/announcements?_sort=id&_order=desc`,f).then(e=>{d=e.data,W(),document.querySelector("#add-news-form").addEventListener("submit",R),document.querySelectorAll("button[data-id]").forEach(n=>n.addEventListener("click",o=>{z(o.target.dataset.id)}))}).catch(e=>{p(e)})}function W(){let e='<div class="col-12"><ul class="list-group gap-5">';d.forEach(t=>{e+=`
    <li class="list-group-item bg-white rounded-2 shadow p-0 fw-bold">
        <div class="d-flex flex-md-row flex-column align-items-md-center align-items-start gap-md-8 gap-6 p-md-8 p-6">
            <button data-id="${t.id}" class="btn btn-sm btn-primary px-4">刪除消息</button>
            <p class="text-black">${x(+t.date).format("YYYY-MM-DD")}</p>
            <p class="d-flex gap-2">
                <a class="text-decoration-none d-flex align-items-center fs-7"
                   href="news-detail.html?id=${t.id}" target="_blank">
                <span class="material-icons">open_in_new</span></a>
                ${t.title}
            </p>
        </div>
    </li>
    `}),e+="</ul></div>",C.innerHTML=e}function R(e){e.preventDefault();const t=e.target.querySelector("#title"),s=e.target.querySelector("#content"),n=e.target.querySelector("#type");y(t.value)||y(s.value)?u("warning","欄位不得空白"):S.fire({icon:"warning",title:"確定送出？",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const o={title:t.value,type:n.value,content:s.value,date:new Date().getTime(),image:""},a=await m.post(`${h}/660/announcements`,o,f);u("success","新增成功！"),e.target.reset(),B()}catch(o){p(o)}}})}function z(e){S.fire({icon:"warning",title:"確定刪除？",text:"提醒您，此操作無法復原哦！",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const t=await m.delete(`${h}/660/announcements/${e}`,f);u("success","刪除成功！"),B()}catch(t){p(t)}}})}function q(){m.get(`${h}/660/products`,f).then(e=>{d=e.data,G(),document.querySelector("#create-new-product").addEventListener("click",U),document.querySelector("#product-form").addEventListener("submit",J)}).catch(e=>{p(e)})}function G(){let e="";d.forEach(t=>e+=`
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
    `),C.innerHTML=e,C.addEventListener("click",K)}function U(){const e=document.querySelector(".modal-title"),t=document.querySelector("#product-form"),s=t.querySelector(".images");e.textContent="新增商品",s.innerHTML=`
    <input type="text" name="image"
           class="form-control p-2 text-black">`,t.reset()}function J(e){e.preventDefault();const t=e.target.name.value,s=e.target.otherName.value,n=e.target.info.value,o=[...e.target.querySelectorAll('[name="type"]:checked')].map(g=>g.value),a=e.target.size.value,c=e.target.ingredients.value.split(","),i=e.target.price.value,r=[...e.target.querySelectorAll('[name="image"]')].map(g=>g.value).filter(g=>!y(g)),v=e.target.shelfLife.value;if(y(t)||!o.length||y(i)||y(a)||y(v)){u("warning","必填欄位不可空白！");return}else if(isNaN(i)||!Number.isInteger(+i)||i<1){u("warning","價格請填寫大於零的整數");return}else{const g=document.querySelector(".modal-title").textContent;if(g==="新增商品")X({name:t,otherName:s,info:n,type:o,ingredients:c,price:+i,image:r,size:a,shelfLife:v,forSale:!1});else{let _=function(l){return l==="type"||l==="ingredients"?b[l].length!==w[l].length||b[l].some(k=>!w[l].includes(k)):l==="image"?b[l].length!==w[l].length||b[l].every(k=>k!==w[l]):b[l]!==w[l]};const L=g.replace(/\D/g,""),w=d.find(l=>l.id==L),b={...w,name:t,otherName:s,info:n,type:o,ingredients:c,price:+i,image:r,size:a,shelfLife:v};Object.keys(b).some(l=>_(l))?Z(L,b):u("question","資料沒變哦 (ㆆᴗㆆ)")}}}function X(e){m.post(`${h}/660/products`,e,f).then(t=>{u("success","成功！記得上架商品哦！"),q()}).catch(t=>{p(t)})}function K({target:e}){if(e.nodeName==="BUTTON"){const s=e.closest(".card").dataset.id,n=d.find(o=>o.id==s);e.classList.contains("status")?S.fire({icon:"warning",title:`確定${e.textContent}？`,text:`商品名稱：${n.name}`,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const o=await m.patch(`${h}/660/products/${s}`,{forSale:!n.forSale},f);u("success",`成功${e.textContent}！`),q()}catch(o){p(o)}}}):e.classList.contains("delete")?S.fire({icon:"warning",title:`確定刪除${n.name}？！`,text:"此操作不可復原，你要確定欸！",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const o=await m.delete(`${h}/660/products/${s}`,f);u("success",`再見，${n.name}！
我們懷念它 ｡ﾟ(ﾟ´ω\`ﾟ)ﾟ｡`),q()}catch(o){p(o)}}}):e.classList.contains("edit")&&Q(n)}}function Q(e){const t=document.querySelector("#productDetailModal"),s=t.querySelector(".modal-title");s.textContent=`＃${e.id}：${e.name}`,Object.keys(e).filter(n=>n!=="forSale"&&n!=="id").forEach(n=>{if(n==="type")t.querySelectorAll(`input[name="${n}"]`).forEach(a=>a.checked=!!e[n].includes(a.value));else if(n==="image"){const o=t.querySelector(".images");let a="";e[n].forEach(c=>{a+=`
                <input type="text" name="image"
                       class="form-control p-2 text-black"
                       value="${c}">`}),o.innerHTML=a}else{const o=t.querySelector(`[name="${n}"]`);o.value=e[n]}})}function Z(e,t){m.patch(`${h}/660/products/${e}`,t,f).then(s=>{u("success","修改成功！"),q()}).catch(s=>{p(s)})}const ee=document.querySelector("#createNewImage");ee.addEventListener("click",e=>{const t=document.createElement("input");t.name="image",t.classList.add("form-control","p-2","text-black"),document.querySelector(".images").appendChild(t)});function te(){m.get(`${h}/660/orders`,f).then(e=>{P(e.data)}).catch(e=>{p(e)})}const ne=document.querySelectorAll(".back-to-top");ne.forEach(e=>{const t=new N(e);e.addEventListener("click",s=>{t.backToTop()})});
