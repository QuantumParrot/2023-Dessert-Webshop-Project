import{t as l,a as f,h as p,e as h,S,f as b}from"./main-2642ba12.js";import{h as x}from"./moment-fbc5633a.js";import{T as O}from"./tab-716af076.js";import{S as P}from"./ScrollEvent-2d368248.js";function F(e){e=e.filter(c=>c.isFinished);const t=Number(x().format("MM")),s=T(e.filter(c=>x(c.createdTime).format("MM")==t)),n=T(e.filter(c=>x(c.createdTime).format("MM")==t-1));document.querySelector("#last-month").textContent=`NT＄${n.revenue_total()}`,document.querySelector("#this-month").textContent=`NT＄${s.revenue_total()}`,document.querySelector("#last-month-rank").innerHTML=A(n.revenue_ranks().splice(0,3)),document.querySelector("#this-month-rank").innerHTML=A(s.revenue_ranks().splice(0,3));const o=T(e).figures(),r=[];Object.keys(o).forEach(c=>r.push({name:c,value:o[c].revenue})),I(r);const u=Object.keys(o).sort((c,v)=>o[c].qty-o[v].qty),[a,d]=T(e).revenue_ranks().splice(0,1)[0];j(u,u.map(c=>c!==a?o[c].qty:{value:o[c].qty,itemStyle:{color:"#D1741F"}}))}function I(e){const t=document.querySelector("#revenue-chart");t.style.height="300px";const s=echarts.init(t),n={color:Y,tooltip:{trigger:"item"},legend:{orient:window.innerWidth>768?"veritical":"horizontal",left:"left",type:"scroll",pageButtonGap:16,pageButtonItemGap:8,backgroundColor:"white",borderRadius:8,padding:window.innerWidth>768?16:8},grid:{top:"10%"},series:[{name:"商品銷售額",type:"pie",radius:"95%",label:{show:!1},data:e,emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}},top:window.innerWidth>768?null:"21%"}]};n&&s.setOption(n)}function j(e,t){const s=document.querySelector("#qty-chart");s.style.height="400px";const n=echarts.init(s),o={width:"100%",color:["#9EB384"],title:{left:"center",subtext:"橘色為當前的銷售額冠軍"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"5%",right:"2%",bottom:"10%"},yAxis:{type:"category",data:e,axisTick:{alignWithLabel:!0},axisLabel:{show:!1,margin:20}},xAxis:{type:"value"},series:[{type:"bar",data:t,name:"商品銷售數量",barCategoryGap:"10%"}]};o&&n.setOption(o)}function T(e){const t={};return e.forEach(s=>s.content.forEach(n=>{t[n.product.name]?(t[n.product.name].qty+=n.qty,t[n.product.name].revenue+=n.qty*n.product.price):t[n.product.name]={qty:n.qty,revenue:n.qty*n.product.price}})),{figures:function(){return t},revenue_ranks:function(){return Object.keys(t).sort((s,n)=>t[n].revenue-t[s].revenue).map(s=>[s,t[s]])},revenue_total:function(){return e.reduce((s,n)=>s+(n.total-n.deliveryFee),0)}}}const Y=["#d87c7c","#919e8b","#d7ab82","#6e7074","#61a0a8","#efa18d","#787464","#cc7e63","#724e58","#4b565b"];function A(e){const t={1:"#FFB11B",2:"#BDC0BA",3:"#A36336"};let s="";return e.map(([n,o],r)=>s+=`
    <li class="d-flex justify-content-between">
        <div class="d-flex gap-2">
            <span><span class="material-icons" style="color: ${t[r+1]}">military_tech</span></span>
            <span>${n}</span>
        </div>
        <span class="fs-7 text-muted">NT＄ ${o.revenue}</span>
    </li>
    `),s}const{VITE_APP_SITE:g,VITE_APP_ADMIN_IDENTITY:H}={VITE_APP_SITE:"https://two023-dessert-webshop-json-server.onrender.com",VITE_APP_ADMIN_IDENTITY:"528491",BASE_URL:"/2023-Dessert-Webshop-Project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let C="",m=[];(function(){var s;if(((s=JSON.parse(localStorage.getItem("userData")))==null?void 0:s.role)!=="admin")l("warning","請先登入管理員帳號","admin-login.html");else if(localStorage.getItem("token").indexOf(H.split("").map(o=>o.charCodeAt()).join(""))===-1)l("error","身份驗證失敗","index.html");else{const o=document.querySelector("main");o.classList.remove("d-none"),o.removeAttribute("class"),M()}})();window.addEventListener("hashchange",function(e){M()});function M(){const e=location.hash.replace("#","")||"orders",t=document.querySelector(`#v-pills-${e}-tab`);t&&new O(t).show(),C=document.querySelector(`#v-pills-${e} #${e}-content`),e==="orders"?_():e==="announcements"?L():e==="products"?q():e==="charts"&&se()}function _(){f.get(`${g}/660/orders`,p).then(e=>{m=e.data,k(m.filter(t=>!t.isFinished)),W(m.filter(t=>!t.isFinished))}).catch(e=>{h(e)})}function k(e){let t="";e.length===0?t+=`
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
                            <p class="mb-5">總計：${n.total} 元<span class="text-muted fs-7">（含運費 ${n.deliveryFee} 元）</span></p>
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
                        <span class="text-orange fw-bold">收件人地址：</span>${n.info.address.replace(/(\d+)/," $1 ")}
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
        `}),C.innerHTML=t;const s=C.querySelectorAll("button[data-id]");s&&s.forEach(n=>n.addEventListener("click",V)),$(".accordion-content").hide(),$(".accordion-title").click(function(){$(this).siblings(".accordion-content").slideToggle()})}function V(e){S.fire({icon:"warning",title:"確定完成訂單？",text:"提醒您，按下完成之後即無法更改訂單狀態",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"完成",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const t=e.target.dataset.id,s=await f.patch(`${g}/660/orders/${t}`,{isFinished:!0},p);l("success","訂單完成！已通知客戶！"),_()}catch(t){h(t)}}})}function W(e){const t=document.querySelector("#filter-by-status"),s=document.querySelector("#sort-by-time");s.value="由舊到新",t.value="未完成";function n(a){a==="由新到舊"?e.sort((d,c)=>c.id-d.id):a==="由舊到新"&&e.sort((d,c)=>d.id-c.id)}s.addEventListener("change",a=>{n(a.target.value),k(e)});function o(a){a==="全部訂單"?e=m:e=m.filter(d=>a==="已完成"?d.isFinished:!d.isFinished)}t.addEventListener("change",a=>{o(a.target.value),b(u.value)||(e=r(u.value)),n(s.value),k(e)});function r(a){return a=a.toLowerCase().replace(/\s/g,""),e.filter(d=>d.orderNum.includes(a)||Object.values(d.info).some(c=>c.toLowerCase().includes(a)))}const u=document.querySelector("#search-keyword");u.addEventListener("input",a=>{o(t.value),b(a.target.value)||(e=r(a.target.value)),n(s.value),k(e)})}function L(){f.get(`${g}/660/announcements?_sort=id&_order=desc`,p).then(e=>{m=e.data,R(),document.querySelector("#add-news-form").addEventListener("submit",z),document.querySelectorAll("button[data-id]").forEach(n=>n.addEventListener("click",o=>{G(o.target.dataset.id)}))}).catch(e=>{h(e)})}function R(){let e='<div class="col-12"><ul class="list-group gap-5">';m.forEach(t=>{e+=`
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
    `}),e+="</ul></div>",C.innerHTML=e}function z(e){e.preventDefault();const t=e.target.querySelector("#title"),s=e.target.querySelector("#image"),n=e.target.querySelector("#content"),o=e.target.querySelector("#type");b(t.value)||b(n.value)?l("warning","欄位不得空白"):S.fire({icon:"warning",title:"確定送出？",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const r={title:t.value,type:o.value,content:n.value,date:new Date().getTime(),image:s.value},u=await f.post(`${g}/660/announcements`,r,p);l("success","新增成功！"),e.target.reset(),L()}catch(r){h(r)}}})}function G(e){S.fire({icon:"warning",title:"確定刪除？",text:"提醒您，此操作無法復原哦！",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const t=await f.delete(`${g}/660/announcements/${e}`,p);l("success","刪除成功！"),L()}catch(t){h(t)}}})}function q(){f.get(`${g}/660/products`,p).then(e=>{m=e.data,U(),document.querySelector("#delete-limit").addEventListener("click",Q),document.querySelector("#create-new-product").addEventListener("click",J),document.querySelector("#product-form").addEventListener("submit",X)}).catch(e=>{h(e)})}function U(){let e="";m.forEach(t=>e+=`
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
                                class="delete btn btn-danger btn-sm p-2 disabled"
                                >刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `),C.innerHTML=e,C.addEventListener("click",Z)}function J(){const e=document.querySelector(".modal-title"),t=document.querySelector("#product-form"),s=t.querySelector(".images");e.textContent="新增商品",s.innerHTML=`
    <input type="text" name="image"
           class="form-control p-2 text-black">`,t.reset()}function X(e){e.preventDefault();const t=e.target.name.value,s=e.target.otherName.value,n=e.target.info.value,o=[...e.target.querySelectorAll('[name="type"]:checked')].map(v=>v.value),r=e.target.size.value,u=e.target.ingredients.value.split(","),a=e.target.price.value,d=[...e.target.querySelectorAll('[name="image"]')].map(v=>v.value).filter(v=>!b(v)),c=e.target.shelfLife.value;if(b(t)||!o.length||b(a)||b(r)||b(c)){l("warning","必填欄位不可空白！");return}else if(isNaN(a)||!Number.isInteger(+a)||a<1){l("warning","價格請填寫大於零的整數");return}else{const v=document.querySelector(".modal-title").textContent;if(v==="新增商品")K({name:t,otherName:s,info:n,type:o,ingredients:u,price:+a,image:d,size:r,shelfLife:c,forSale:!1});else{let D=function(i){return i==="type"||i==="ingredients"?y[i].length!==w[i].length||y[i].some(E=>!w[i].includes(E)):i==="image"?y[i].length!==w[i].length||y[i].some((E,N)=>E!==w[i][N]):y[i]!==w[i]};const B=v.replace(/\D/g,""),w=m.find(i=>i.id==B),y={...w,name:t,otherName:s,info:n,type:o,ingredients:u,price:+a,image:d,size:r,shelfLife:c};Object.keys(y).some(i=>D(i))?te(B,y):l("question","資料沒變哦 (ㆆᴗㆆ)")}}}function K(e){f.post(`${g}/660/products`,e,p).then(t=>{l("success","成功！記得上架商品哦！"),q()}).catch(t=>{h(t)})}function Q(e){let t=e.target,{textContent:s}=t;e.target.nodeName==="BUTTON"&&(t=e.target.querySelector(".material-icons"),s=t.textContent);const n=document.querySelectorAll("button.delete");s==="lock"?(n.forEach(o=>o.classList.remove("disabled")),l("success","刪除功能已解鎖"),t.textContent="lock_open"):(n.forEach(o=>o.classList.add("disabled")),l("success","刪除功能已上鎖"),t.textContent="lock")}function Z({target:e}){if(e.nodeName==="BUTTON"){const s=e.closest(".card").dataset.id,n=m.find(o=>o.id==s);e.classList.contains("status")?S.fire({icon:"warning",title:`確定${e.textContent}？`,text:`商品名稱：${n.name}`,showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const o=await f.patch(`${g}/660/products/${s}`,{forSale:!n.forSale},p);l("success",`成功${e.textContent}！`),q()}catch(o){h(o)}}}):e.classList.contains("delete")?S.fire({icon:"warning",title:`確定刪除${n.name}？！`,text:"此操作不可復原，你要確定欸！",showCancelButton:!0,cancelButtonColor:"#D1741F",cancelButtonText:"取消",confirmButtonColor:"#A37A64",confirmButtonText:"確定",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const o=await f.delete(`${g}/660/products/${s}`,p);l("success",`再見，${n.name}！
我們懷念它 ｡ﾟ(ﾟ´ω\`ﾟ)ﾟ｡`),q()}catch(o){h(o)}}}):e.classList.contains("edit")&&ee(n)}}function ee(e){const t=document.querySelector("#productDetailModal"),s=t.querySelector(".modal-title");s.textContent=`＃${e.id}：${e.name}`,Object.keys(e).filter(n=>n!=="forSale"&&n!=="id").forEach(n=>{if(n==="type")t.querySelectorAll(`input[name="${n}"]`).forEach(r=>r.checked=!!e[n].includes(r.value));else if(n==="image"){const o=t.querySelector(".images");let r="";e[n].forEach(u=>{r+=`
                <input type="text" name="image"
                       class="form-control p-2 text-black"
                       value="${u}">`}),o.innerHTML=r}else{const o=t.querySelector(`[name="${n}"]`);o.value=e[n]}})}function te(e,t){f.patch(`${g}/660/products/${e}`,t,p).then(s=>{l("success","修改成功！"),q()}).catch(s=>{h(s)})}const ne=document.querySelector("#createNewImage");ne.addEventListener("click",e=>{const t=document.createElement("input");t.name="image",t.classList.add("form-control","p-2","text-black"),document.querySelector(".images").appendChild(t)});function se(){f.get(`${g}/660/orders`,p).then(e=>{F(e.data)}).catch(e=>{h(e)})}const oe=document.querySelectorAll(".back-to-top");oe.forEach(e=>{const t=new P(e);e.addEventListener("click",s=>{t.backToTop()})});
