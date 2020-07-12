const request = require('request');
// process 是 node.js 內建的模組
// 為了拿 command line 的參數（list、read、delete、create、update）
// const process = require('process');

// node hw2.js list 印出前二十本書的 id 與書名
if (process.argv[2] === 'list') {
  request(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
      const books = JSON.parse(body);
      for (let i = 0; i < books.length; i += 1) {
        console.log(`${books[i].id} ${books[i].name}`);
      }
    },
  );
}

// node hw2.js read 1 輸出 id 為 1 的書籍
if (process.argv[2] === 'read') {
  request(
    `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response, body) => {
      const book = JSON.parse(body);
      console.log(book.name);
    },
  );
}


// node hw2.js delete 1 // 刪除 id 為 1 的書籍
if (process.argv[2] === 'delete') {
  request.delete(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    },
    () => {
      console.log(`delete ${process.argv[3]}`);
    },
  );
}

// node hw2.js create "I love coding" // 新增一本名為 I love coding 的書
if (process.argv[2] === 'create') {
  const bookName = process.argv[3];
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form:
        {
          // 沒有指定 id 會是隨機的數字
          name: bookName,
        },
    },
    (error, response, body) => {
      console.log(body);
    },
  );
}

// node hw2.js update 1 "new name" // 更新 id 為 1 的書名為 new name
if (process.argv[2] === 'update') {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      form:
        {
          id: process.argv[3],
          name: process.argv[4],
        },
    },
    (error, response, body) => {
      console.log(`update ${process.argv[3]} name to ${process.argv[4]}`);
      console.log(body);
    },
  );
}
