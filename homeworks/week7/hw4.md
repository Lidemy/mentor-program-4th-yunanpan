## 什麼是 DOM？

DOM，全名為 Document Object Model，中文翻作文件物件模型。  
透過將文件內容轉換成邏輯樹狀圖（logical tree）去連接網頁與程式語言。  
HTML 的標籤或 class 可被視作一個節點，而每一個節點又包含物件，而透過這些節點，便能利用 JavaScript 去改變文件的架構、內容或是畫面，以達到動態網頁的效果。  

![DOM](./hw4_img/DOM.png)
#### 擷取自 [Document Object Model](https://en.wikipedia.org/wiki/Document_Object_Model)

### 參考：  
1. [MDN Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
2. [JavaScript HTML DOM](https://www.w3schools.com/js/js_htmldom.asp)

---

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

DOM 的事件傳遞機制分為：CAPTURING_PHASE、AT_TARGET、BUBBLING_PHASE 三個階段。

```
<ul class="list">
    <li class="list__item">1
      <input type="checkbox" id="id-checkbox"  class="list__checkbox" />
    </li>
  </ul>
```
若以以上程式碼為例，階段分段就會如下所示：  
[`.list` > `.list__item`] > `.list__checkbox` > [`.list__item` > `.list`]  
　[CAPTURING_PHASE]　　 　[AT_TARGET]　　　[BUBBLING_PHASE]  

* 捕獲階段： 
  事件會從 Window 經過 target 的上面幾層（target's anscertors）再到 target 的父層（target's parents）。
* at-target phase：
  點擊的目標，在此例為 `checkbox`。
* 冒泡階段：
  與捕獲階段相反，事件從 target 的父層經過上面幾層到 Window。

---

## 什麼是 event delegation，為什麼我們需要它？

`event delegation` 為事件代理機制，當父層下有相似的元素與（例如 `ul` 下有很多個 `li`），未來也會利用 JavaScript 動態更動子層的元素的話，為更加有效率的監聽每個子層的事件，可以利用事件傳遞機制的冒泡階段，利用父層處理子層元素的動態更新。  
就像是小學老師帶班上小朋友去速食店吃生日餐，要讓店員一個一個告訴小朋友點餐規則實在是曠日廢時，不如由小學老師代為點餐。

---

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

### **stopPropagation**
> `stopPropagation` 是阻止事件繼續傳遞，但如果同一層還有其他的監聽事件還是會被執行。  
如果也要阻止同一層的監聽事件則需要用 `stopImmediatePropagation`。  


### **preventDefault**
> `preventDefault` 是取消瀏覽器的預設行為，和事件傳遞沒有關係。  


像是以下程式碼，事件傳遞的機制是：  
[`.list` > `.list__item`] > `.list__checkbox` > [`.list__item` > `.list`]  
[CAPTURING_PHASE]　　　[AT_TARGET]　　　　[BUBBLING_PHASE]  

```
<ul class="list">
    <li class="list__item">1
      <input type="checkbox" id="id-checkbox"  class="list__checkbox" />
    </li>
  </ul>
```
當在 `.list__checkbox` 時阻止事件傳遞，則如果要輸出在 `AT_TARGET` 之後的 `eventPhase` 都不會執行，因為事件已經在 `AT_TARGET` 的時候被阻止了。但點擊 `checkbox` 是有反應的。

```
<script>
  document.querySelector('.list__checkbox').addEventListener('click',
    function(e) {
      console.log(e.eventPhase)
      e.stopPropagation();
    }, true
  );
</script>
```

如果在 `.list__checkbox` 時使用 `preventDefault`，則是會取消瀏覽器的預設行為，根據 〈[MDN Event.preventDefault()](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/preventDefault)〉，`checkbox` 的預設行為是可以勾選選項。在 `.list__checkbox` 的 `listner` 加入 `e.preventDefault()`，就會發現選項無法被勾選，但如果 `console.log` 在這階段之後的 `eventPhase` 是會有輸出的，這就表示 `preventDefault` 與事件傳遞並無關聯。

```
<script>
  document.querySelector('.list__checkbox').addEventListener('click',
    function(e) {
      console.log(e.eventPhase)
      e.preventDefault();
    }, true
  );
</script>
```