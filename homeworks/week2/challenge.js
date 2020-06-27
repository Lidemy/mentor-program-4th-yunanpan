function search (arr, n) {
    let left = 0
    let right = arr.length - 1
    // 比中間的數字大還是小
    let index = Math.floor((left + right) / 2) // 中間的 index
    while (left <= right) {
        if (n === arr[index]) {
            return index
        } else if (n < arr[index]) {
            right = index - 1
            index = Math.floor((left + right) / 2)
        } else if (n > arr[index]) {
            left = left + 1
            index = Math.floor((left + right) / 2)
        } 
    }
    if (n === arr[index]) {
        return index
    } else {
        return -1
    }
}


console.log(search([1, 3, 10, 14, 39], 14)) // 3
console.log(search([1, 3, 10, 14, 39], 3)) // 1
console.log(search([1, 3, 10, 14, 39], 299)) // -1
console.log(search([1, 3, 10, 14, 39], 0)) // -1
console.log(search([1, 3, 10, 14, 39], 11)) // -1
console.log(search([1, 3, 10, 14, 39], 2)) // -1