// LIOJ1025 水仙花數

const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

// 將每個數字個別取其位數的次方相加，看是否與原數字將同
function isNarcissistic(num) {
  let sum = 0;
  const str = num.toString(); // 轉成 string type 才能取 length
  for (let i = 0; i < str.length; i += 1) {
    sum += str[i] ** str.length;
  }
  return sum === num;
}

function solve(input) {
  const [n, m] = input[0].split(' ');
  // 看是幾位數
  for (let i = Number(n); i <= Number(m); i += 1) { // 注意 string + number 會是 string
    if (isNarcissistic(i)) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
