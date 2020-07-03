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
  if (a.length > 15 || b.length > 15) {
    // 比較 a、b 的長度
    if (a.length > b.length) {
      return k === 1 ? 'A' : 'B';
    }
    if (a.length < b.length) {
      return k === -1 ? 'A' : 'B';
    }
    if (a.length === b.length) {
      // 比較字典序
      for (let i = 0; i < a.length; i += 1) {
        if (a[i] > b[i]) {
          return k === 1 ? 'A' : 'B';
        }
        if (a[i] < b[i]) {
          return k === -1 ? 'A' : 'B';
        }
      }
      // return 'DRAW';
    }
  } else { // 都沒有超過最大值
    // 比較 a 和 b 誰大誰小
    if (Number(a) > Number(b)) {
      return k === 1 ? 'A' : 'B';
    }
    if (Number(a) < Number(b)) {
      return k === -1 ? 'A' : 'B';
    }
    // return 'DRAW';
  }
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
