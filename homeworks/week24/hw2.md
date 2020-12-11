## 1. Redux middleware 是什麼？

Redux store 本身只知道怎麼處理同步的請求，根據接收到的 action 去修改 state，UI 再依據 store 裡的 state 的變動去調整畫面。但在大多數的應用程式中，會需要透過 HTTP 請求向 server 端拿資料，再依舊拿回來的資料修改 store。而 Redux middleware 主要便是在處理非同步請求與其如何影響 store 資料的邏輯。

原來根據 dispatch 的 action 直接修改 store state：  
> [store][state] ----> [UI] ----> [Event Handler][Dispatch] ----> [store][state]

有了 middleware 後，dispatch action 可以先透過 middleware 去 server 拿資料，再修改 store state：  
> [store][state] ----> [UI] ----> [Event Handler][Dispatch] ----> **[middleware]** ----> [store][state]

更詳細的示意圖可參考 〈[Redux 官網的示意 GIF](https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif)〉

參考：
1. [Redux Essentials, Part 5: Async Logic and Data Fetching](https://redux.js.org/tutorials/essentials/part-5-async-logic)

---

## 2. CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？

先來記一下全名：

* CSR: Client Side Rendering
* SSR: Server Side Rendering

SSR：由後端直接回傳整份的 HTML。  
CSR：在載入執行期間動態拿資料，再顯示在頁面上。

MPA（Multiple Page Application）的 SSR：  
之前使用 php 實作網頁時，就是由 server 依據路由判斷應該拿什麼資料並結合畫面回傳整份 HTML。像是路由是 `/about` 時，就回傳 `about.php` 的檔案。

SPA 的 CSR：  
透過 Ajax 可以不用換頁就可以拿取資料並透過前端 JavaScript 達成重新渲染（部分）畫面，但由於都是透過前端 JavaScript 動態產生，所以當檢視網頁原始碼的時候，看到的 html 會是沒有內容的，造成該網頁的 SEO（搜尋引擎優化）效果可能較差。並且在渲染畫面前，需等待 call API 的時間也可能會較 SSR 長。

SPA 的 SSR：
為解決上述 CSR 的缺點，SEO 效果與等待時間，在**第一次渲染**時，透過 Servier Side Rendering，在後端就先拿好資料並準備好畫面再顯示網頁。如此一來，在第一次載入網頁時，檢視網頁原始碼就會有應有的資料，進而優化 SEO。而後續則還是由 Client 端去操作動態產生資料。


上面是整理過的，下面是整理前的想法：  
我的理解是當 MPA 時一定是由 server side render，將畫面和資料綁在一起回傳完整的頁面。而為了將前端與後端分開、把畫面與資料切開，讓後端就只是回傳資料（等於沒有了 MVC 中的 view），前端負責向後端拿資料並動態顯示在畫面上。而原本是由後端根據路由去看是哪個 controller 負責，再去拿資料和與畫面綁定後回傳，但現在因為少了 view，統一由前端 index.js 負責動態拿資料顯示畫面，便不能依照原本 MPA 看是哪個路由就丟哪個檔案顯示，所以才改由前端去管理路由，看是哪個路由就渲染哪個畫面，像是 react-router 中的 `<Switch> <Route path='/' </Switch>`。而因為是靠前端判斷現在是哪個路由決定要渲染哪個畫面，並沒有換頁，所以是 SPA。但 SPA 的 CSR 的缺點是因為是動態拿資料，實際上的 HTML 並不包含資料，所以才會出現 SPA 的 SSR，透過第一次由 server side 渲染來解決 SEO 的問題。  
有點卡住的點是這樣想來 CSR 一定是 SPA 嗎？

---

## 3. React 提供了哪些原生的方法讓你實作 SSR？

利用 ReactDOMServer 所提供的 `renderToString()` 在 server 端將 React 元件渲染成 HTML string 回傳顯示於頁面上。但因為回傳的是 html，所以如果要加上 event handler 的話，需要在已經透過 `renderToString()` 顯示的節點（node）加上 `ReactDOM.hydrate()`，React 就會保存節點並只加上 event handler，讓畫面還是可以正常操作。

參考：
1. [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html#gatsby-focus-wrapper)
2. [hydrate()](https://zh-hant.reactjs.org/docs/react-dom.html#hydrate)
3. [What's the difference between hydrate() and render() in React 16?
](https://stackoverflow.com/questions/46516395/whats-the-difference-between-hydrate-and-render-in-react-16)

---

## 4. 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

### **Next.js**

安裝：  
`npx create-next-app`  
`npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"` （有範例版本的）

在 localhost 跑起來（預設 port 是 3000）：
`cd nextjs-blog`
`npm run dev`

SSR：  
利用內建的 `getInitialProps` 功能，可以在一到頁面時就會執行 `getInitialProps` function。Next.js 提供的範例：

```
function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async () => { // 每到此頁都會執行
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page
```

根據文件，如果使用的版本為 9.3 或更新，推薦使用 `getStaticProps` 或 `getServerSideProps`。

> If you're using Next.js 9.3 or newer, we recommend that you use getStaticProps or getServerSideProps instead of getInitialProps.
> These new data fetching methods allow you to have a granular choice between static generation and server-side rendering. 

`getServerSideProps` 同 `getInitialProps` 會在每次頁面載入時被呼叫，但不像 `getInitialProps` 會可以在 server 端及 client 端上運作（會有需要是同構的限制），`getServerSideProps` 只會在 server 端被執行。好處是可以減少暴露拿取資料的邏輯以增加安全性。  
`getStaticProps` 則是在 build time 的時候會被呼叫，並且不會在 client 端被呼叫。因為在使用者發出 request 之前就拿資料，如果 URL 是動態的，則需要先以 `getStaticPaths` 拿到 URL，再執行 `getStaticProps`。  
利用 `getServerSideProps` 和 `getStaticProps` 看起來會比使用 `getInitialProps` 來得效率要好，但在實際應用上是要怎麼選用，可能還是要實際做過才知道。目前只有跟著〈[learn course](https://nextjs.org/learn/basics/create-nextjs-app)）〉做到 editing the page 和跟著〈[getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)〉測試而已（其實就是影片的範圍XD）。

補充其他名詞解釋：  
SSG（Static Site Generation）：像 SSR 但是是在 build time 渲染頁面而非 request time。


### **Prerender.io**

Prerender.io 會儲存已經渲染好的 HTML 頁面到資料庫，並回傳 API，讓人可以拿到網站中每個 URL 完整的 HTML 檔案。  
根據[文件](https://docs.prerender.io/article/15-getting-started)說明，prerender.io 的 middleware 會檢查每個請求，看這些請求是不是來自爬蟲（crawler）。如果是的話，middelware 就會發送請求給 Prerender.io 要求當頁的靜態 HTML；如果不是的話，網頁請求就會照常執行。  
而 Prerender.io 可支援在常見的 server 中，像是 ExpressJS、Rails、Nginx、Apache、Nginx、Apache。  
圖片說明可參考〈Prerender.io – Quick solution for the SEO of your SPA〉一文中的[示意圖](https://hacksoft.io/content/uploads/2019/07/Prerender.io-Article-4-1024x455.png)。  
根據不同的 user agent 會提供不同的內容可能會被認為是 [black hat seo](https://en.wikipedia.org/wiki/Spamdexing)，Google 對於這種依據不同 user agent 而回傳不同內容的 dynamic rendering 的說明，可參考[Implement dynamic rendering](https://developers.google.com/search/docs/guides/dynamic-rendering)。



### **react-ssr npm**

安裝：
`npm install react-ssr --save`

建議也安裝 babel plugin：
`npm install babel-plugin-react-ssr --save-dev`

1. 建立 server
2. 建置 routes
3. 拿資料：提供 `fecthData` method，react-ssr 會在 server 渲染前執行，並將結果傳到元件的 props 中。


參考
1. [Next.js](https://nextjs.org/)
2. [Next.js getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)
3. [Next.js getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)
4. [Next.js getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)
5. [react-ssr npm](https://www.npmjs.com/package/react-ssr)
6. [Prerender.io](https://prerender.io/)
7. [Prerender.io – Quick solution for the SEO of your SPA](https://hacksoft.io/prerender-io-seo-of-spa/)
8. [Implement dynamic rendering](https://developers.google.com/search/docs/guides/dynamic-rendering)
9. [How the new Next.js 9.3 Preview Mode works and why it's a game-changer](https://www.datocms.com/blog/how-the-new-next-js-9-3-preview-mode-works)

