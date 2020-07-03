// LIOJ1030 判斷迴文

const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function reverseStr(str) {
  // 反轉字串
  let s = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    s += str[i];
  }
  // 檢查 str 和 s 是否一樣
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] !== s[i]) {
      return false;
    }
  }
  return true;
}

function solve(input) {
  const str = input[0];
  if (reverseStr(str)) {
    console.log('True');
  } else {
    console.log('False');
  }
}

rl.on('close', () => {
  solve(lines);
});
