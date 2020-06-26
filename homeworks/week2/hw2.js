function capitalize(str) {
    // 首字母為小寫 -> 首字母轉大寫
    if (str[0] >= 'a' && str[0] <= 'z') {
        let s = ''
        let code = str.charCodeAt(0)
        s += String.fromCharCode(code - 32)
        for (let i=1; i<str.length; i++) {
            s += str[i]
        }
        return s
    } else {  // 其他情況維持原字串
        return str
    }
}

console.log(capitalize('hello'));
