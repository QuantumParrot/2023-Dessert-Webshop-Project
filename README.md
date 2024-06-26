## [Akheng's Desserts 甜點工作室 - 印尼傳統糕點電商網站](https://quantumparrot.github.io/2023-Dessert-Webshop-Project/)

![](https://i.imgur.com/e7wCViM.png)

此為參與 2023 年六角學院 JavaScript 直播班的專題。

純屬開發練習，不做任何商用。

Personal Side Project for Practice, Not For Any Commercial Use.

---

當前進度：**已完成核心開發，持續優化效能中**

由於主要操作皆需要會員身份，如有需要請使用這組測試帳密：

帳號：
```
ming123@mail.com
```
密碼：
```
123456
```
***

### 網站介紹

---

#### 前台使用者

**訪客**

- [X] 瀏覽消息
- [X] 瀏覽商品
- [X] 篩選商品
- [X] 搜尋商品
- [X] 會員註冊
- [X] 會員登入

**會員**

- [X] 修改會員資料
- [X] 儲存寄送資訊
- [X] 商品收藏功能：瀏覽、新增、刪除
- [X] 購物結帳功能：瀏覽、新增、刪除、編輯、清空購物車
- [X] 填寫寄送資訊，模擬付款流程
- [X] 瀏覽訂單記錄

#### 後台管理員

![](https://i.imgur.com/iSOg3W7.png)

- [X] 管理訂單：篩選、修改狀態
- [X] 管理消息：新增、刪除
- [X] 管理商品：新增、編輯、上下架、刪除
- [X] 瀏覽銷售統計圖表

***

### 開發環境

---

|  主要功能  |  工具  |  適用版本  |
|:-|:-|:-|
|  套件管理  |  **[PNPM](https://github.com/pnpm/pnpm)**  |
|  使用語言  |  Vanilla JavaScript  |  ECMAScript 6
|  前端環境  |  **[Vite](https://github.com/vitejs)**  |  ![Static Badge](https://img.shields.io/badge/vite-^4.2.0-blue)
|  後端環境  |  **JSON-Server** + **JSON-Server-Auth** 模擬  |  ![Static Badge](https://img.shields.io/badge/JSON_Server-^0.17.0-blue) ![Static Badge](https://img.shields.io/badge/JSON_Server_Auth-^2.1.0-blue)

vite 的環境設定 ( vite.config.js ) 引用自**六角學院洧杰老師**提供的教學[範本](https://github.com/gonsakon/vite0729)。

***

### 第三方套件整合

---

+ [Bootstrap 5](https://getbootstrap.com/)

+ [jQuery](https://jquery.com/)

+ [Axios](https://github.com/axios/axios)

+ [SweetAlert2](https://sweetalert2.github.io/)

+ [Swiper](https://swiperjs.com/)

+ [Moment.js](https://momentjs.com/)

+ [Apache Echarts](https://echarts.apache.org/zh/index.html)

+ [AOS](https://michalsnik.github.io/aos/)

***

### 使用素材及工具

---

1\. 素材

+ [freepik](https://freepik.com/)（符合規範即可免費商用）

  > 在消息詳情及登入頁面使用的圖片 ( Images on news-detail.html & login.html )
  >
  > [Free vector hand drawn dessert twitch background](https://www.freepik.com/free-vector/hand-drawn-dessert-twitch-background_17805860.htm#&position=3&from_view=user&uuid=2bc8a17e-32ec-4c97-bc26-de448444e340) / Image by Freepik
  >
  > 在購物說明頁面使用的圖片 ( Images on faq.html )
  > 
  > [set of young people using smartphones](https://www.freepik.com/free-vector/set-young-people-using-smartphones_12557532.htm) / Image by Freepik
  > 
  > [free vector e commerce icons](https://www.freepik.com/free-vector/e-commerce-icons_957268.htm#query=cart%20icon&position=7&from_view=search&track=ais) / Image by photoroyalty on Freepik
  >
  > [free vector food set and restaurant elements](https://www.freepik.com/free-vector/food-set-restaurant-elements_1042427.htm#query=fork&position=11&from_view=search&track=sph) / Image by Freepik
  >
  > [hand drawn sparkling stars collection](https://www.freepik.com/free-vector/hand-drawn-sparkling-stars-collection_16139383.htm) / Image by Freepik
  >
  > 在全站商品頁面使用的圖片 ( Images on products.html & products-details.html )
  >
  > [Free photo chocolate brownies on sackcloth and coffee beans on a wooden table](https://www.freepik.com/free-photo/chocolate-brownies-sackcloth-coffee-beans-wooden-table_7675249.htm#&position=3&from_view=user&uuid=aaee96ee-d386-41cf-8151-8acf4f2f3296) / Image by jcomp on Freepik
  >
  > [Free photo high angle delicious brownies arrangement](https://www.freepik.com/free-photo/high-angle-delicious-brownies-arrangement_24590947.htm#&position=6&from_view=user&uuid=948d0ec0-3ef0-40fb-8b8c-d5d2fed40561) / Image by Freepik
  >
  > 在首頁消息區塊使用的圖片 ( Images on announcements / index.html )
  >
  > [Watercolor background for mid-autumn festival celebration](https://www.freepik.com/free-vector/watercolor-background-mid-autumn-festival-celebration_31145960.htm) / Image by Freepik

+ [vecteezy](https://www.vecteezy.com/)（符合規範即可免費商用）

  > 在購物說明頁面使用的圖片 ( Images on faq.html )
  >
  > [cake slice vector set](https://www.vecteezy.com/vector-art/95454-cake-slice-vector-set) / Katharina Hagemann on Vecteezy
  >
  > [isolated plate icon vector design](https://www.vecteezy.com/vector-art/2724230-isolated-plate-icon-vector-design) / Andres Ramos on Vecteezy

+ [unsplash](https://unsplash.com/)

+ [かわいいフリー素材集：いらすと屋](https://www.irasutoya.com/p/terms.html)（符合規範即可免費商用）

  > 在購物說明頁面使用的圖片 ( Images on faq.html )
  >
  > [いろいろなカラフルな矢印のイラスト](https://www.irasutoya.com/2020/07/blog-post_94.html)

+ [iStock](https://www.istockphoto.com/hk)（付費圖庫）

  > 在全站商品頁面使用的圖片 ( Images on products.html & products-details.html )
  >
  > [Indonesian Food Lapis Legit](https://www.istockphoto.com/photo/indonesian-food-lapis-legit-gm480491265-36330904) / rikirisnandar
  >
  > [Lapis Legit, Sliced Layered Cinnamon Butter Cake stock photo](https://www.istockphoto.com/photo/lapis-legit-sliced-layered-cinnamon-butter-cake-gm1638386694-533080921) / Ika Rahma
  > 
  > [Dadar Gulung](https://www.istockphoto.com/photo/dadar-gulung-or-dadar-unti-is-indonesian-traditional-finger-food-is-grated-coconut-gm1312053769-400967581) / sri widyowati
  >
  > [Dadar Gulung stock photo](https://www.istockphoto.com/photo/dadar-gulung-gm1369032659-438878303) / Ika Rahma
  >
  > [Pineapple Tart or Nanas Tart or Nastar Cookies](https://www.istockphoto.com/photo/pineapple-tart-or-nanas-tart-or-nastar-cookies-gm1452623415-488914755) / Edy Gunawan
  >
  > [Martabak Lipat, Martabak Manis (Sweet Martabak) is Indonesia Pancake](https://www.istockphoto.com/photo/martabak-lipat-martabak-manis-is-indonesia-pancake-gm1519485007-524498249) / ary pranggawan
  >
  > [Chiffon Cake](https://www.istockphoto.com/photo/chiffon-cake-gm1279445505-378055233) / Sulyono Haryono
  >
  > 在註冊頁面使用的圖片 ( Images on register.html )
  > 
  > [Cookies Kue Lebaran Food Background with Copy Space](https://www.istockphoto.com/hk/%E7%85%A7%E7%89%87/cookies-kue-lebaran-food-background-with-copy-space-gm1488989256-514006329) / Ika Rahma

+ [CSS Loaders](https://cssloaders.github.io/)

  > 在首頁的每月推薦專欄裡使用了以它的 loading 動畫為基礎修改而成的 click 動畫

+ [LADY KELLY](https://www.ladykelly.com.tw/faq)

  > 在商品詳情頁面與結帳流程頁面使用的寄送說明文字皆參考並改寫自 LADY KELLY 的購物說明

2\. 工具

+ [Pixlr](https://pixlr.com/tw/suite/)

+ [removebg](https://www.remove.bg/zh-tw)

***

### 開發筆記

---

+ [網站地圖](https://whimsical.com/2023-js-21-EL4HJbPJKTza7W5vwXHYSE)

+ [流程圖](https://whimsical.com/2023-js-21-RtqAFAxNYYLaLnv7CmjkBf)

+ [線稿圖](https://whimsical.com/2023-js-21-44Canzh72P2sqMKYmMbg3d)

+ [開發專案時遇上的疑難雜症及解決方法](https://hackmd.io/1TD4c7jCR0qesT7dppjt3g)

***

### 特別感謝

---

+ 六角學院的講師群（按筆畫順序排列）：

  卡斯伯老師、洧杰老師、穎旻老師

+ 六角學院的助教群（按字母及筆畫順序排列）：

  Bingbingboom 助教、dOvOb 助教、林賽亞助教、俞方助教、致愷助教、焦糖助教、傑利助教

+ 設計助教長：Joanne 助教

+ 設計師：Tori Chen

+ 專題指導教練：Amberhh

+ 共同營造出良好共學環境的直播班同學們！以及選擇挑戰專題並堅持到最後一刻的自己：Ｄ
