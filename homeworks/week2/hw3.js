function reverse(str) {
    // 新字串
    let newStr = ''
    // 反著拿出原字串每個字
    for (let i=str.length-1; i>=0; i--) {
        // 填到新字串
        newStr += str[i]
    }
    console.log(newStr)
}

reverse('hello');