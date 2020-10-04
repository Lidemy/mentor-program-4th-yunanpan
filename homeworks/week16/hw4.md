## What is this?
>　請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```
---

1. `obj.inner.hello()`：  
將 `obj.inner.hello()` 看成 `obj.inner.hello.call(obj.inner)`，可以知道在執行 `obj.inner.hello()` 時的 `this` 是指 `obj.inner`。所以輸出值為 `2`。

2. `obj2.hello()`：  
將 `obj2.hello()` 看成 `obj2.hello.call(obj2)`，可以知道在執行 `obj2.hello()` 時的 `this` 為 `obj2`，也就是 `obj.inner`。會發現其實跟第 1 點答案會是相同的，輸出的值也是 `2`。

3. `hello()`：
將 `hello()` 看成 `hello.call()`，沒有傳入 `this` 的值。因為在此題目中沒有寫到 `'strict use'`，所以這裡的 `this` 在瀏覽器中為 `Window`，在 Node.js 中為 `Global`。而 `Window` 和 `Global` 下並沒有 `hello` 的 function 可以執行，所以會輸出 `undifined`。
