## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

前幾週的時候有看過《[我知道你懂 hoisting，可是你了解到多深？](https://blog.huli.tw/2018/11/10/javascript-hoisting-and-tdz/)》，當時看到〈hoisting 到底是怎麼運作的？〉的部分就完全不知道是在幹麻，但看過〈JS201〉的影片後，再回頭看文章就比較懂了。也可以自己以 Execution Context 的方法去判斷有關 hoisting 的行為產生時，那一行的變數的值到底是什麼。  
前幾週也有學到關於執行環境以及執行環境提供的功能，這週透過 `Event Loop` 更理解執行環境與 JavaScript 的關係。在 JavaScript 的執行緒中，如碰到不同步的時候，可以透過執行環境所提供的功能，像是 `setTimeout`、`XMLHttpRequest` 等等去處理，再丟到 Task Queue (Event Queue) 排列，最後透過 Event Loop 丟回 Stack 執行緒中去執行。由此也理解了《[鐵人賽：ES6 開始的新生活 let, const](https://wcc723.github.io/javascript/2017/12/20/javascript-es6-let-const/)》中〈let 與 for loop〉中提到的範例（其實就是 hw2）：

```
for (var i = 0; i < 10; i++) {
  console.log(i);
  setTimeout(function () {
    console.log('這執行第' + i + '次');
  }, 10);
}
```
之前看這篇文章的時候，也沒有懂執行第 i 次的 i 值是發生了什麼事，那時沒有 Scope 的概念也不知道 Event Loop 是什麼，只看文字，想著「啊不懂，反正用 let 就好了」的心情略過了，但也讓我之後每次只要碰到 `setTimeout` 都會下意識的跳過，直到這週...有種原來如此的感覺。  
之前看到 `this` 也是裝沒看到（像是拿 twitch API 的作業範例）。這週看影片跟著想答案的時候也覺得有點卡卡的，寫作業時才意識到原來是我把 `obj.inner.hello()` 轉成 `obj.inner.hello.call(obj.inner)` ，一直想著 `console` 出來的值就是括號裡的 `obj.inner`，莫名地忽略 `hello`，但其實用這個方法只是讓人比較好判斷 `this` 是誰。  
而對於 prototype，老實說還是覺得有些模糊的地方，也有可能是因為我還沒寫練習題的關係，所以總覺得不踏實。另外覺得有點疑問的部分之前在進度報告裡有寫到，就先直接複製貼上過來了：  
沒看明白《[覺得 JavaScript function 很有趣的我是不是很奇怪]()》的 `object` 覆寫那一部分，所以找了其他資料，不過還是一知半解XD `toString()` 預設上都是繼承自 `Object`，如果 `toString()` 沒有被覆寫的話（像是文章的 obj），`toString()` 會 return "\[object *type*]"， type 會依據檢測的對象為何而定。Array、Function 等作為 Object 的 instance，會自己有自己的 toString()。
自己測試了幾個小範例加深印象：

```
const arr = [1, 2, 3]
arr.toString() // "1,2,3"
Object.prototype.toString.call(arr) // "[object Array]"
obj = {}
obj.toString() // "[object Object]"
obj = {
    toString: function () {
        console.log('obj')
    }
}
obj.toString() // obj
Object.prototype.toString.call(obj) // "[object Object]"
Object.prototype.toString.call(obj2.toString) // "[object Function]"
```

參考：
1. [Object.prototype.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
2. [为什么用Object.prototype.toString.call(obj)检测对象类型?](https://www.cnblogs.com/youhong/p/6209054.html)
