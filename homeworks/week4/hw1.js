const request = require('request');

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (err, res, body) => {
    // 要記得把 JSON 資料格式轉成 JavaScript 可使用的格式
    const books = JSON.parse(body);
    // 如果依照提供的 API 抓資料，卻有問題，應是後端做修改。
    // 所以不用再去找 id 有沒有對到 1~10。
    for (let i = 0; i < books.length; i += 1) {
      console.log(`${books[i].id} ${books[i].name}`);
    }
  },
);
