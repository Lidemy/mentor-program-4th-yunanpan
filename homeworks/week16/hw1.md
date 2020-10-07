## Event Loop
>　在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

---

會依序輸出：1 3 5 2 4

![](./img/hw1/event_loop-01.png)
![](./img/hw1/event_loop-02.png)
![](./img/hw1/event_loop-03.png)
