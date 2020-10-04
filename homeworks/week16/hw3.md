## Hoisting
>　請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```
var a = 1
function fn(){
  console.log('1: ' + a) // undefined
  var a = 5
  console.log('2:' + a) // 5
  a++ // 6
  var a
  fn2()
  console.log('3: ' + a) // 20
  function fn2(){
    console.log('4: ' + a) // 6
    a = 20
    b = 100
  }
}
fn()
console.log('5: ' + a) // 1
a = 10
console.log('6: ' + a) // 10
console.log('7:' + b) // 100
```
註：為方便以下解釋，自己在 `conosle.log` 加了 1~7。 

---

輸出的答案詳上述程式碼註解，以下為原因解釋。

1. 先初始化 globalEC：

   ```
   globalEC {
     VO {
       a: undefined,
       fn: func
     }
   }
   ```

2. 到 fn() 之前，`a` 的值為 `1`：
   
   ```
   globalEC {
     VO {
       a: 1,
       fn: func
     }
   }
   ```

3. 執行 fn()，進入 fnEC 並初始化。

   ```
   fnEC {
     AO {
       a: undefined,
       fn2: func
     }
   }
   ```

4. 變數宣告會提升，所以 fn 可看成：

   ```
   function fn() {
     var a
     console.log('1: ' + a)
     a = 5
     .
     .
     .
   }
   ```
   此時 fnEC 裡的 `a` 尚未被賦值，所以會輸出 `undefined`。
  
5. 執行到 `console.log('2:' + a)`，因為 `a = 5`，fnEC 裡 `a` 被賦值為 `5`： 

   ```
   fnEC {
     AO {
       a: 5,
       fn2: func
     }
   }
   ```

6. `a++`：

   ```
   fnEC {
     AO {
       a: 6,
       fn2: func
     }
   }
   ```

7. `var a` 可忽略

8. 執行 fn2()，進入 fn2EC 並初始化。

   ```
   fn2EC {
     AO {
       // 沒有宣告任何變數和 function
     }
   }
   ```

9. 執行 `console.log('4: ' + a)` 時，fn2EC 中並沒有 `a`，所以往上層（fnEC）找，找到 `a: 6`，所以會輸出 `6`。

10. 執行 `a = 20` 時，同第 9 點，fn2EC 中沒有 `a`，所以會往上找去更改 fnEC 中的 `a`：

    ```
    fnEC {
      AO {
        a: 20,
        fn2: func
      }
    }
    ```

11. 執行 `b = 100` 時，fn2EC 中沒有 `b`，往上層（fnEC）也沒有找到，再往最上層（globalEC）也沒找到，但已經找到最上層了，就在 globalEC 裡宣告 `b`：

    ```
    globalEC {
      VO {
        a: 1,
        b: 100,
        fn: func
      }
    }
    ```

12. function fn2 執行結束，fn2EC 就可以 pop 掉了，剩下 globalEC 和 fnEC：

    ```
    globalEC {
      VO {
        a: 1,
        b: 100,
        fn: func
      }
    }
    
    fnEC {
      AO {
        a: 20,
        fn2: func
      }
    }
    ```

13. 執行 `console.log('3: ' + a)` 時，可從 fnEC 中看出 `a` 的值為 `20`。

14. function fn 執行結束，fnEC 就可以 pop 掉了，剩下：

    ```
    globalEC {
      VO {
        a: 1,
        b: 100,
        fn: func
      }
    }
    ```

15. 執行 `console.log('5: ' + a)`，從 globalEC 可看出 `a` 的值為 `1`。

16. 執行 `a = 10`，改變 globalEC 中 `a` 的值：

    ```
    globalEC {
      VO {
        a: 10,
        b: 100,
        fn: func
      }
    }
    ```

17. 執行 `console.log('6: ' + a)`，依 globalEC 輸出為 `10`。
18. 執行 `console.log('7: ' + b)`，依 globalEC 輸出為 `100`。
19. globalEC 結束。