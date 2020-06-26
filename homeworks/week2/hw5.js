function join(arr, concatStr) {
    let str = ''
    // 拿出陣列中的字
    for (let i=0; i<arr.length; i++) {
        // 最後不會有標點符號
        if (i !== arr.length-1) {
            str += arr[i]
            str += concatStr
        } else {
            str += arr[i]
        } 
    }
    return str
}

function repeat(str, times) {
    let repeatStr = ''
    for (let i=1; i<=times; i++) {
        repeatStr += str
    }
    return repeatStr
}

console.log(join(['a'], '!'));

// console.log(join([1, 2, 3], '')) // 正確回傳值：123
// console.log(join(["a", "b", "c"], "!")) // 正確回傳值：a!b!c
// console.log(join(["a", 1, "b", 2, "c", 3], ',')) // 正確回傳值：a,1,b,2,c,3


console.log(repeat('a', 5));
// console.log(repeat('yoyo', 2)) // 正確回傳值：yoyoyoyo
