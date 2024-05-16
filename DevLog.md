**靈感來源**：[Ray - 簡單趣談 Functional Programming in JavaScript](https://israynotarray.com/javascript/20211219/3830068067/)

總而言之就是一個重構專案程式碼的計畫，而這份文件將用來記錄每一次的更新細節！

***

> 2024/02/19

主要更新：

+ 對 vite 和 BS5 的整合有了一些新的認識，重構了引入 scss 檔案的順序 ＆ css いらない

其他細節：

+ README.md 說明文件追加 jQuery 項目

---

> 2024/04/26

主要更新：

+ 調整 git commit message 的撰寫方式

+ 新增 postCSS 插件 autoprefixer 處理跨瀏覽器 CSS 樣式兼容問題。

+ 調整 HTML 文件的 script 置入方法：

  根據 [2024 JavaScript 設計模式讀書會](https://hackmd.io/@5PM91gxyT5e7zJTwXEfaxw/javasrcipt-pattern/%2FdupTIiQSRiOo8AZ8lhIcow) 提供的建議，

  將外部 CDN 放在 `<head>` 裡、自己撰寫的程式碼放在 `<body>` 最後方。

+ 調整首頁的 aos 動畫呈現方式：套用 `data-aos-once="true"` 的效果，若用戶沒有重整頁面，動畫效果只會呈現一次。

+ 移除 member.html 與 member.js 中未使用的程式碼。

---

> 2024/05/17

即日起逐步優化每一個頁面的 RWD 設計，

因為在此之前只有做 1440px / 768px / 425px 三種（ 768px 好像還只做一半 ... orz

想讓網站經得起拉來拉去 (?) 的考驗，所以希望能夠有效率地刻好 RWD。

本次參考了直播班同學 [YuT200053](https://github.com/YuT200053) 在其個人作品中 [使用 mixins 的管理方式](https://github.com/YuT200053/Journey-into-the-Forest/blob/main/src/assets/helpers/_mixin.scss)，獲益良多，感謝！

主要更新：

+ 重構 scss 管理結構

+ 完成 index.html 輪播區塊的 RWD 設計 ( 真的只有做完輪播區塊 ... )

+ 重新設計 Sidebar 樣式

  由於整體風格還是以圓角為主，於是 Sidebar 也統一改成圓角