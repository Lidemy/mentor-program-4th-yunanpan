## 請解釋後端與前端的差異。

前端是指使用者看到的網頁介面的部分。而一個完整網頁畫面，分別需要由 html、css 和 javascript 所組成。html 是網頁的內容，像是使用者所看到的文字；css 則是負責裝飾畫面，像是設計文字顏色、底色、排版等等；javascript 則是負責設計使用者與網頁的互動，並與資料的溝通等功能。

後端則是處理隱藏在畫面後面，以 server 處理資料的部分。接收瀏覽器送來的 request，將資料寫入 database 並依據 database 的資訊做出 response。像是使用者輸入帳號、密碼時，後端會協助驗證帳號是否存在、密碼是否正確等等。

## 假設我今天去 Google 首頁搜尋框打上：JavaScri[t 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

1. 使用者透過瀏覽器發出請求，通過電腦作業系統及硬體（網路卡）將 request 送出
2. 透過 DNS（Domain Name System）得知 server 的 IP 位置
3. 將 request 送到位於由 DNS 提供 IP 位置的 server
4. server 收到 request
5. server 去 database 查詢 JavaScript 相關資料
6. 查詢到相關資料後，server 回傳 response
7. 回傳的 response 透過硬體、作業系統、瀏覽器解析後，呈現畫面於瀏覽器上

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

（作業系統是 windows）
1. `help`：課程上 Mac 是用 `man` 來查詢說明。windows 則是在指令後輸入 `--help` 即可查詢該指令的說明。單輸入 `help` 可以查看可用指令與說明。
2. `start`： Mac 可用 open 開啟檔案，windows 則可用 `start` 開啟檔案，但要先設定預設開啟的應用程式。
3. `wc`：word count。可以看檔案中有多少列、多少詞、多少字（空白及換行都會被計算）  
   `-l`：幾列  
   `-w`：幾個詞