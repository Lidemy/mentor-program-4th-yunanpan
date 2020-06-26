``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 設定一個可傳入陣列參數的函式 isValid(arr)
2. 檢查 `i=0` 是否小於 `arr.length`(6) -> 是 -> 進入迴圈
3. `arr[0]` 是否 <= 0 ， `arr[0]` 為 3 -> 否，進入下次迴圈
4. `i++` 檢查 `i=1` 是否小於 `arr.length`(6) -> 是 -> 執行迴圈 
5. `arr[1]` 是否 <= 0 ， `arr[1]` 為 5 -> 否，進入下次迴圈
6. `i++` 檢查 `i=2` 是否小於 `arr.length`(6) -> 是 -> 執行迴圈 
5. `arr[2]` 是否 <= 0 ， `arr[2]` 為 8 -> 否，進入下次迴圈
6. `i++` 檢查 `i=3` 是否小於 `arr.length`(6) -> 是 -> 執行迴圈 
5. `arr[3]` 是否 <= 0 ， `arr[3]` 為 13 -> 否，進入下次迴圈
6. `i++` 檢查 `i=4` 是否小於 `arr.length`(6) -> 是 -> 執行迴圈 
5. `arr[4]` 是否 <= 0 ， `arr[4]` 為 22 -> 否，進入下次迴圈
6. `i++` 檢查 `i=5` 是否小於 `arr.length`(6) -> 是 -> 執行迴圈 
5. `arr[5]` 是否 <= 0 ， `arr[5]` 為 35 -> 否，進入下次迴圈
6. `i++` 檢查 `i=6` 是否小於 `arr.length`(6) -> 否 -> 跳出迴圈，執行第 6 行 
5. 檢查 `i=2` 是否小於 `arr.length`(6) -> 是 -> 進入迴圈
6. `arr[2]` 是否不等於 `arr[1] + arr[0]` ， `arr[2]` 為 8，`arr[1] + arr[0]` 為 8 -> 否，進入下次迴圈
7. 檢查 `i=3` 是否小於 `arr.length`(6) -> 是 -> 執行迴圈
6. `arr[3]` 是否不等於 `arr[2] + arr[1]` ， `arr[3]` 為 13，`arr[2] + arr[1]` 為 13 -> 否，進入下次迴圈
7. 檢查 `i=4` 是否小於 `arr.length`(6) -> 是 -> 執行迴圈
6. `arr[4]` 是否不等於 `arr[3] + arr[2]` ， `arr[4]` 為 22，`arr[3] + arr[2]` 為 21 -> 是，回傳 'invalid'
7. 已經 return ，不再執行後續 code