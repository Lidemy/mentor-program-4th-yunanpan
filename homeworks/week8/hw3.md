## 什麼是 Ajax？

全名為 Asynchronous JavaScript And XML。  
不用重整網頁，便可與伺服器溝通，拿取需要更新的資訊，並在 client 端處理資訊。  
* 發出 HTTP 請求：
   * `const request = new XMLHttpRequest()`  
   * `request.open('GET', 'API_URL', true)`：第三個參數為是否不同步進行。
   * `request.send()`
* 處理伺服器傳回的資料
   * `reqeust.onload = function() {}`

## 用 Ajax 與我們用表單送出資料的差別在哪？

利用 `form` 將表單傳給 server 時，server 會回應一份新的網頁，讓畫面重新載入，除了使用者體驗不好（因為會重新載入或換頁時會有短暫空白的畫面）外，若改變的只有畫面的一小部分，重新載入也不符合效益成本。  
而使用 `Ajax` 可以利用非同步的觀念在不換頁便改變畫面。而也因為非同步的關係，可以在表單結果還沒回傳的時候，也可以繼續使用網頁，  
因為 `Ajax` 只需要向 server 拿取有改變的部分，再渲染到畫面上，像是第一題的作業只需要拿取抽獎的結果並渲染相關的畫面，不需要將 `navbar` 和 `footer` 也重跑，以此也減輕了 server 的負擔。

## JSONP 是什麼？

全名為 JSON with Padding。JSONP 是透過 `script` 標籤可以載入第三方套件、不受同源政策影響的特性，來將資料以 function 的形式存取在 `script` 的 `src` 所引入的網址中，以利於帶回資料。


## 要如何存取跨網域的 API？
利用跨來源資源共用（Cross-Origin Resource Sharing，CORS）會透過在 `Response header` 的 `Access-Control-Allow-Origin` 來限制誰可以存取資源。如果 `Access-Control-Allow-Origin: *` 就代表允許任何網域跨站存取資源。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

因為第四週是藉由 Node.js 透過作業系統向 server 發送請求，而第八週則是透過瀏覽器向 server 發送請求。  
瀏覽器基於安全性考量，會有些審核的機制。而其中同源政策（Same Origin Policy）規範了不同源的網域的互動關係，同源的定義根據 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/Security/Same-origin_policy) 解釋是指兩份網頁具備相同協定、埠號 (如果有指定) 以及主機位置。只要不符合上述所規範，若想要存取資訊，就會碰到跨網域的問題。  
但有些 API 是要供給其他人使用，總不可能把主機也分享出去，所以便衍生了跨來源資源共用（CORS）會透過在 Response header 的 Access-Control-Allow-Origin 來限制誰可以存取資源。

---

參考： 
1. [Same Origin Policy](https://developer.mozilla.org/zh-TW/docs/Web/Security/Same-origin_policy)
2. [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)
3. [AJAX](https://zh.wikipedia.org/wiki/AJAX)
4. [AJAX MDN](https://developer.mozilla.org/zh-TW/docs/Web/Guide/AJAX/Getting_Started)
