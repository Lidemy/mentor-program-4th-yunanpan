## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
### 1. video  
利用 `video` 標籤可以將影片嵌入到網站中。建議使用時都需要設定 `width` 和 `height`，以防止載入網頁時會有閃爍的情形。可以設定多個 `source` 載入多個影片檔案格式，讓瀏覽器播放，如果瀏覽器不支援所有提供的檔案格式，則會顯示在 `video` 標籤內的文字。例如範例的「`Your browser does not support the video tag.`」。
* `controls`：顯示影片的控制列，如播放、暫停等。
* `loop`：可以重複播放影片
* `autoplay`：當打開網站會自動播放

html 範例：
```
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video>
```
參考：[w3schools](https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_video)

-----

### 2. select
`form` 有 `radio` 單選題、`checkbox` 複選題的格式，也可以利用 `select` 來製作下拉選單。`select` 裡會用 `option` 來放選項。  
* `value`：會將 `value` 所設定的值傳給 server，而網頁下拉式選單所看到的選項則是由 `option` 裡所填入的文字為準。但當 `value` 屬性沒有設定值的時候，就會改將 `option` 裡的文字傳給 server。

  w3schools 的解釋：
  >The value attribute specifies the value to be sent to a server when a form is submitted.  
  >The content between the opening `<option>` and closing `</option>` tags is what the browsers will display in a drop-down list. However, the value of the value attribute is what will be sent to the server when a form is submitted.  
  >Note: If the value attribute is not specified, the content will be passed as a value instead.

*  `selected`：在想要成為預設的選項中加入 `selected`，如此一來不管 `option` 被排在第幾個都會是預設選項。
* `disabled`：加上 `disabled` 可以讓選項無法被選擇（可被運用於當產品完售的時候），如範例的 `opel` 選項。

html 範例：
```
<select>
  <option value ="volvo" disabled>Volvo</option>
  <option value ="saab" selected>Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>
```
參考：  
[w3schools](https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select)  
[HTML `<option>` value Attribute](https://www.w3schools.com/tags/att_option_value.asp)  
[How to set the default value for an HTML `<select>` element?](https://www.geeksforgeeks.org/how-to-set-the-default-value-for-an-html-select-element)

-----
reference the form data after the form is submitted

### 3. textarea
可以輸入多行文字。

* `row`：預設可顯示幾行，如果輸入的文字超過的話，就會出現捲軸。
* `col`：預設留言板的寬度。
* `maxlength`：最多可以輸入多少字。
* `placeholder`：預設在留言板中的字，當使用者輸入時就會消失。如果在 `textarea` 中已經有內容，則不會出現 `placeholder` 的內容。  
  
參考：  
[HTML `<textarea>` Tag](https://www.w3schools.com/tags/tag_textarea.asp)  

-----

### 4. form
在做作業會看到 `form` 會有 `action` 的屬性，`action` 主要是指示在提交表單後，表單要被送到哪裡。

參考：  
[HTML `<form>` action Attribute](https://www.w3schools.com/tags/att_form_action.asp)


## 請問什麼是盒模型（box modal）
HTML 的元素都可以視為一個盒子。  
盒子從內到外包含元素本身的寬高、`padding`、`border`、`margin`。  
預設的 `box-sizing` 是 `content-box`，`content` 指的是圖片中藍色的區塊，所以`padding`、`border`、`margin` 都是會往外長的部分。

![box-model](./hw3_img/box-model.png)

如果想要在寬=900（粉紅色區塊）中平均放三個 `item`（灰色區塊），會設定三個 `item` 的寬為 `300`，但此時再去調整 `padding` 或是 `border` 會發現版面跑版了：

![跑版王](./hw3_img/box-model2.png)
##### 一點美感都沒有的配色

這是因為設定的 `300` 是 `content` 的寬，所以調動了 `content` 以外的部分，就會讓整體的尺寸塞不下寬度 `900` 的範圍內了。  
要解決這個問題，可以將 `item` 的 `box-sizing` 改為 `border-box`，意思是指將以 `content` 與 `padding` 為界的範圍改到以 `border` 與 `margin` 為界。如此就算改動 `padding` 或是 `border` 都是往內擠，不會影響到原設定好的寬度：

![Magic box!](./hw3_img/box-model3.png)
##### 延續沒有美感的配色



## 請問 display: inline, block 跟 inline-block 的差別是什麼？

* inline：
  1. 尺寸就是內容，無法靠 `height` 與 `width` 設定長寬。
  2. 設定上下的 padding 時，看似面積有變大，但實際的高度依舊是一行的高度。  
     如下圖所示，灰色區塊是 `display: inline` 並且設定 `padding` 和粉紅色 `display: block` 排起來的樣子，可以看到灰色和粉紅色的區塊疊在一起，表示灰色 `inline` 區塊的高度並沒有隨 `padding` 的值而增高。
  ![inline padding](./hw3_img/inline.png)
  3. `inline` 可以排在同一行。
   ![inline](./hw3_img/inline2.png)
* block：
  1. 尺寸可以以 `height` 和 `width` 來設定。
  2. 承第 1 點，所以設定 `padding` 時是有作用的。  
     灰色區域是有設定寬高及 `padding` 的 `block`，可以看到與粉紅色的區塊並沒有疊在一起，設定的高與 `padding` 都有算在高度裡。
   ![block padding](./hw3_img/block.png)
  3. `block` 會自己占據一整排。
   ![block](./hw3_img/block2.png)
* inline-block：
  1. `inline-block` 可以說是 `inline` 和 `block` 的小孩，結合了 `inline` 可以排在同一行及 `block` 可以設定高寬的特性。如下圖是將灰色及粉紅色都調整為 `display: inline-block` 後的排版：
   ![inline-block](./hw3_img/inline-block.png)
  2. 灰色與粉紅色區塊中的空白，是由於在寫 html 時 `div` 和 `div` 之間有字元空格所產生的。
     * > 調整父層的 `font-size: 0`
     * > 用 comment <* *> 夾在中間   
    

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？分別各舉一個會用到的場合

* **static：**  
  `position` 的預設值。  
  在沒有想要元素特別改動位置的時候使用。
* **relative：**  
  以元素在畫面原本的位置為基準點所做的移動，並且會保留原位置，維持文件的排版流。  
  可以運用在元素互換位置，或是廣告視窗內的文字與圖片排版。
* **absolute：**  
  如果上一層的 `position` 是 `static`，會再繼續往上層找，直到找到 `postion` 非 `static` 的一層，並以此層為基準點移動元素。如果都沒找到，則會以 `body` 作為父層。與 `relative` 不同，並不會保留元素原本的位置，之後的元素會往前遞補，就像是元素從平面被抽離到另一個平面。可設定 `z-index` 的值調整元素的前後關係。  
  可運用於促銷的產品卡右上角會出現的 sale 圖案，或是廣告右上角的叉叉圖示。
* **fixed：**  
  以視窗為基準點調整位置，所以當畫面捲動時，也不會改變其位置，會一直顯示在畫面中。  
  可以用在 `navbar` 、返回最上面的圖示，或是總是會跳在畫面正中央的煩人廣告上。  

  註：預設的原點是元素的的左上角。可搭配 `transform` 的 `translate` 來調整原點，達到版面置中的效果。

