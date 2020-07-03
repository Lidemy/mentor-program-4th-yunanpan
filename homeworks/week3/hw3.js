// LIOJ1020 判斷質數

const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function isPrime(num) {
  let sum = 0;
  for (let i = 1; i < num; i += 1) { // 1 的情況不會進到此迴圈，sum 維持零 => 符合 sum !== 1
    if (num % i === 0) {
      sum += 1;
    }
  }
  return sum === 1;
}

function solve(input) {
  for (let i = 1; i < input.length; i += 1) {
    // 判斷質數
    if (isPrime(Number(input[i]))) {
      console.log('Prime');
    } else {
      console.log('Composite');
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
