## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

### VARCHAR：
* 長度：`0~65,535` bytes
* 以值所需的長度 `255 bytes` 為界，不大於 `255` 的長度會用 `1-byte`，超過的則是 用 `2-byte` 的額外字節來表示實際存取的長度。
* 適用固定長度字串的資料。
* 因不同字符類型，每個字符所佔的字節不一。例如字符 UTF8 中，每個字符最多佔 3 個字節，則最大長度就變成 `21,845`。而如果超出 `VARCHAR` 的長度限制，則欄位會被迫轉成 `text` 類型，並產生警告。

### CHAR:
* 長度：`0~255`。
* 以空白補足長度：如果將值 `ab` 不足 `CHAR(4)` 指定的長度 `4` 時，會以空白補足長度 `ab__`（以 _ 代替表示空白格）。而當值被取回時，為了補足長度而設的空白基本上會被移除。
* 適用固定長度字串的資料。

### TEXT:
* 長度：最大可到 4GB（4,294,967,295 characters）
* 適用長度很長的資料，常應用於儲存文章。
* 分為：
  - TINYTEXT 
  - TEXT
  - MEDIUMTEXT
  - LONGTEXT
* 不需要預設所儲存長度，並且也不會移除或利用空白達到指定長度。
* 資料不會存取在資料庫記憶體裡，所以要拿 `TEXT` 類型的資料需要從磁碟讀取，速度會比 `VARCHAR` 或 `CHAR` 慢。



參考：
1. [MySQL: The CHAR and VARCHAR Types](https://dev.mysql.com/doc/refman/8.0/en/char.html)
2. [MySQL 中 varchar 最大長度是多少？](https://kknews.cc/zh-tw/code/k44gq8r.html)
3. [The Basics Of MySQL TEXT Data Type](https://www.mysqltutorial.org/mysql-text/)


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

當透過瀏覽器發送請求時，HTTP 協定是沒有狀態的，所以即使登入了會員，當關掉瀏覽器後，下次再造訪同一個網頁時，伺服器不會記得前次會員登入的資料。而利用 Cookie 可以將狀態儲存在瀏覽器上，當今天瀏覽器發送請求時，伺服器會先要求瀏覽器將狀態儲存至 Cookie 中，如此一來，下次再造訪相同網站時，可以將儲存在 Cookie 中的資訊一併帶給伺服器。  
瀏覽器在傳送請求時，`Response Headers` 便會以 `Set-Cookie` 要求瀏覽器將所需資訊儲存在 `Cookie` 中，在下次造訪相同網頁時，可與請求一併帶給伺服器已取得資料。而儲存的 `cookie` 可透過開發者工具中的 `Application` 下的 `Cookies` 查看。

參考：
1. [Cookie](https://zh.wikipedia.org/wiki/Cookie)


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

密碼明碼存取，如果被其他人破解資料庫，容易直接盜走帳號密碼資訊。


