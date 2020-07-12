## 請以自己的話解釋 API 是什麼

API，全名為 Application Programming Interface，翻作應用程式介面，主要是提供介面讓雙方可以交換資料或是功能。  
因為想要使用對方的資料或功能，但又不可能把整個資料庫都給出去，除了可能會洩漏使用者個人資訊，或可能讓資料庫被外部干擾造成問題，所以只透過有開放的功能來交換。  
而API 不僅限於在網路上才能使用，程式語言也會透過作業系統有開放的 API 交換資料。而需要透過網路交換資料，就叫做 Web API。主要透過 HTTP 協定交換資料，但也可以自定義交換資料，不一定都要建立在 HTTP 上。  
生活中常碰到的例子為網站的註冊與登錄功能可以選擇以 facebook、google 等帳號註冊或登錄。除了可以省掉自己開發登錄功能的時間，也因為大部分的人都擁有 google 或是 facebook 的帳號，對於使用者來說也節省了額外輸入註冊資料的時間。
而 facebook、google 等企業也可透過給予第三方登錄 API，以獲得用戶的數據、使用習慣等，藉以分析利用，更加精確地投放廣告。


參考：
1. [[第四週] API 基礎 - RESTful API、JSON、curl 指令](https://yakimhsu.com/project/project_w4_Network_API.html)

---

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

* 400 Bad Request：因為 request 有語法錯誤，導致 server 端無法處理。
* 401 Unauthorized：用戶端缺乏目標資源要求的身分認證。
* 403 Forbidden：server 端收到請求但拒絕提供服務，因用戶端沒有權限。
* 418 I’m a teapot：我是茶壺，不能泡咖啡。

參考：
1. [MDN HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)


---

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

|說明             | Method | path            | 參數 | 範例 |
|-----------------|--------|-----------------|------|-----|
| 回傳所有餐廳資料 | GET    | restaurants     | 無   | 無 |
| 回傳單一餐廳資料 | GET    | restaurants/:id | 無   | restaurants/10 |
| 刪除餐廳        | DELETE | restaurants/:id | 無    | 無 |
| 新增餐廳        | POST   | restaurants     | name: 餐廳名 | 無 |
| 更改餐廳        | PATCH  | restaurants/:id | name: 餐廳名 | 無 |
