const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const bodyParser = require('body-parser')

// express 引入進來的是一個 function
// 執行 function, 建立 app
const app = express()

// 指定 port
const port = 5001

const user = require('./controller/user')
const articles = require('./controller/articles')

// 實作 view 設定
app.set('view engine', 'ejs')

// 設定 session: https://www.npmjs.com/package/express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

// 使用 body-parser: http://expressjs.com/en/resources/middleware/body-parser.html
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 使用 connet-flash
app.use(flash())

// 從哪裡拿 css、img 等靜態檔案
app.use(express.static(__dirname + '/public'));

// 以利於在 view 中直接透過屬性直接引用值
// 參考：https://itbilu.com/nodejs/npm/Ny0k0TKP-.html
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
});

// 首頁
app.get('/', articles.index)

function redirectBack(req, res) {
  res.redirect('back')
}

// TODO: 管理登入、註冊、後台的路由
app.get('/login', user.login)
app.post('/login', user.handleLogin, redirectBack)
app.get('/logout', user.logout)
app.get('/register', user.register)
app.post('/register', user.handleRegister, redirectBack)
app.get('/admin', user.admin)

// TODO: 文章的路由
app.get('/add', articles.add, redirectBack)
app.post('/add', articles.handleAdd)
// 刪除
// app.get('/delete_comments/:id', commentController.delete)
// app.get('/update_comments/:id', commentController.update)
// app.post('/update_comments/:id', commentController.handleUpdate)

app.listen(port, () => {
  console.log('You are now connected to port: 5001')
})