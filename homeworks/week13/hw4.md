## Webpack 是做什麼用的？可以不用它嗎？

因為瀏覽器不支援 CommonJS（require、module.exports），雖然 ES6 有 import、export 的語法可以讓瀏覽器引入或輸出模組，但也非全部瀏覽器都可以使用，而且如果是使用 npm 安裝的第三方模組並不方便（需要加上 type 和把路徑寫死）。而透過 webpack 不僅可以支援 npm 安裝的模組，透過各自的 loader 打包便可載入除了 JavaScript 外其他型式的資源，如：img、CSS...等。  



## gulp 跟 webpack 有什麼不一樣？

gulp 和 webpack 可以做到很相似的事，像是資源的轉換（babel、sacc/scss 轉 css...等），但本質上是不一樣的。  
gulp 主要是管理各個任務（function），任務的內容可以自己訂，執行的順序也可以自己訂。  
webpack 主要是將各個模組與資源打包，而 gulp 自己本身事做不到的，他只能透過 plugin 。
webpack 在 src 丟自己寫的就可以透過 config 轉譯並打包 src 的內容。

## CSS Selector 權重的計算方式為何？

