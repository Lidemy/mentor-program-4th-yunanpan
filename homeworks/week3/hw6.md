## hw1：好多星星
解過聖誕樹就覺得這題相較很友善，不用想空白、星星、樹幹的規律。只要會寫之前實作練習會用到的 repeat 就好。

## hw2：水仙花數
如果是 `number type` 的話沒辦法加 `.length` 求出位數，要先轉成 `string type` 才可以。

## hw3：判斷質數
熟悉取餘數 `%` 的方法，利用如果能被整除，餘數便為 0 的觀念解題。  
看自我檢討的時候，參考程式碼有寫 `Math.sqrt(n)`，我的理解為：因為大於 `n` 平方根的數字是一定不能整除 n 的，所以 `Math.sqrt(n)` 之後的數字都可以不用浪費時間去跑。我的方法是利用 `sum` 的值去判斷是否為質數（涵蓋數字為 `1` 的情況），所以用了 `Math.sqrt(n)` 時會出錯，而當數字很大的時候會相較費時。

## hw4：判斷迴文
反轉字串也可以使用內建函數 `.split('').reverse().join('')` 的組合反轉。因為 `reverse()` 用於陣列，所以需先將字串運用 `split('')` 轉成陣列，再以 `join('')` 結合回字串。須注意 `reverse()` 會**原地**反轉陣列。  
反轉後的字串各字母的排序會和原字串相同，所以一個一個從頭比較字母，如果都相同就是迴文。

##### 參考：[MDN Array.prototype.reverse()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

## hw5：聯誼順序比大小
**要注意題目範圍、要注意題目範圍、要注意題目範圍！** 深刻體會很重要所以寫三次。  
JavaScript 有 `Number.MAX_SAFE_INTEGER`（9007199254740991）的限制，如果超出範圍會有精確度上的問題，`console.log(9007199254740992 === 9007199254740993)` 的答案會是 `true`，用肉眼看就知道這答案是不對的。題目有提到「要特別注意的是 A 與 B 可能是很大的數字，但保證長度為 512 個位數以內」，這已經超出上述 JavaScript 可以精確比較的範圍了，對於超出的部分無法以 `a > b`、`a < b` 的方式比較。如果沒有注意到這點，就會陷入「到底是哪裡錯了？？？」之無限得到 WA 的迴圈裡。

>The reasoning behind that number is that JavaScript uses double-precision floating-point format numbers as specified in IEEE 754 and can only safely represent numbers between -(2 ** 53 - 1) and 2 ** 53 - 1.  
>Safe in this context refers to the ability to represent integers exactly and to correctly compare them. For example, Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 will evaluate to true, which is mathematically incorrect.

##### 參考來源： [MDN Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)  

為了解決這樣的問題，可以用 `string.length` 來比較。如果 `string.length` 是一樣的（意旨 `a`、`b` 兩者位數相同），就從第一個數字開始比較大小就可判斷誰大誰小。  
另外最一開始有點疑惑的是，要怎麼把各筆資料各自的 `a`、`b`、`k` 值取出來。先用迴圈取各行數值，再進去拿各自的 `a`、`b`、`k`。

---

## 使用 eslint 心得
可以讓版面更好看，或者說是可以協助刪掉贅詞的感覺。像是 `no-return-else` 或是 `consistent-return` 的規則。在解作業五，寫 `function whoWins` 時，到處 `else if` 和 `return`（有部分是因為邏輯沒收斂），`eslint` 就會跳錯，而在根據 `error` 回去檢視程式碼的時候，就會發現「欸，我這邊根本程式碼版的冗言贅字」。  
還有 `CRLF` 和 `LF` 的問題，因為系統不同會有不同預設的換行模式。我用的作業系統是 windows，所以跳錯就跳了一整排的 `Expected linebreaks to be 'LF' but found 'CRLF' linebreak-style`。由 ESlint 官網（詳參考 2）可以查到以下解釋：

>The linebreaks (new lines) used in windows operating system are usually carriage returns (CR) followed by a line feed (LF) making it a carriage return line feed (CRLF) whereas Linux and Unix use a simple line feed (LF). The corresponding control sequences are "\n" (for LF) and "\r\n" for (CRLF).

##### 參考：
1. [Expected linebreaks to be 'LF' but found 'CRLF' linebreak-style](https://stackoverflow.com/questions/37826449/expected-linebreaks-to-be-lf-but-found-crlf-linebreak-style)
2. [ESlint enforce consistent linebreak style (linebreak-style)](https://eslint.org/docs/rules/linebreak-style)
3. [microsoft/ vscode-eslint](https://github.com/microsoft/vscode-eslint/issues/707)：不求甚解的我求快用 neillindberg 的方法，直接在 vscode 把 CRLF 改成 LF。

---

##### 其他參考：[MDN Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)