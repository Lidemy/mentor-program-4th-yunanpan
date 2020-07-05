// LIOJ1004 聯誼順序比大小

const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function whoWins(n) {
  const a = n[0];
  const b = n[1];
  const k = Number(n[2]);

  // 如果 number 大於 MAX_safe_integer (2 的 53 次方 - 1 => 9007199254740991)
  // 在比較時會有精確度的問題，所以改用判斷位數來比大小
  // 比較 a、b 的長度（位數）
  if (a.length > b.length) {
    return k === 1 ? 'A' : 'B';
  }
  if (a.length < b.length) {
    return k === -1 ? 'A' : 'B';
  }
  if (a.length === b.length) {
    // 從最前面的數字比較字典序（alphanumeric）
    for (let i = 0; i < a.length; i += 1) {
      if (a[i] > b[i]) {
        return k === 1 ? 'A' : 'B';
      }
      if (a[i] < b[i]) {
        return k === -1 ? 'A' : 'B';
      }
    }
  }
  // 以上的情況都沒有發生就是平手
  return 'DRAW';
}

function solve(input) {
  for (let i = 1; i < input.length; i += 1) {
    console.log(whoWins(input[i].split(' ')));
  }
}

rl.on('close', () => {
  solve(lines);
});
