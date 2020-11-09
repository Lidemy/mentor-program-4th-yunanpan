const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const bodyParser = require('body-parser')

// express 引入進來的是一個 function
// 執行 function, 建立 app
const app = express()

// 指定 port
const port = process.env.PORT || 5012

const prize = require('./controller/prize')
const admin = require('./controller/admin')

// 實作 view 設定
app.set('view engine', 'ejs')

// 設定 session: https://www.npmjs.com/package/express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

// 使用 connet-flash
app.use(flash())

// 使用 body-parser: http://expressjs.com/en/resources/middleware/body-parser.html
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 從哪裡拿 css、img 等靜態檔案
app.use(express.static(__dirname + '/public'));

// 以利於在 view 中直接透過屬性直接引用值
// 參考：https://itbilu.com/nodejs/npm/Ny0k0TKP-.html
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
});

// 抽獎頁面
app.get('/', prize.index)

function redirectBack(req, res) {
  res.redirect('back')
}

// 權限管理
function isAdmin(req, res, next) {
  if (!req.session.username ) {
    return res.redirect('/')
  }
  next()
}

app.get('/admin', admin.login)
app.post('/login', admin.handleLogin, redirectBack)

app.get('/edit_prize', isAdmin, admin.editPrize)
app.post('/edit_prize', isAdmin, admin.addPrize, redirectBack)
app.get('/delete_prize/:id', isAdmin, admin.deletePrize)
app.get('/update_prize/:id', isAdmin, admin.updatePrize)
app.post('/update_prize/:id', isAdmin, admin.handleUpdatePrize, redirectBack)
app.get('/logout', admin.logout)

// 抽獎
app.get('/getprize', prize.getPrize)

app.listen(port, () => {
  console.log(`You are now connected to port: ${port}`)
})
