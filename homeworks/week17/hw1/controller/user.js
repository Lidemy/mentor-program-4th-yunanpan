const bcrypt = require('bcrypt')

const saltRounds = 10
const db = require('../models')

const User = db.Blog_user
const Articles = db.Blog_articles

const user = {

  // 登入頁面
  login: (req, res) => {
    res.render('user/login')
  },

  handleLogin: function (req, res, next) {
    const { username, password } = req.body
    // 先檢查資料有沒有完整
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位')
      return next()
    }

    User.findOne({
      where: {
        username,
      },
    }).then(user => {
      if (!user) {
        req.flash('errorMessage', '使用者不存在')
        return next()
      }
      bcrypt.compare(password, user.passhash, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash('errorMessage', '密碼錯誤')
          return next()
        }
        req.session.username = user.username
        req.session.userId = user.id
        res.redirect('/')
      })
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },

  logout: (req, res) => {
    req.session.username = null
    req.session.userId = null
    res.redirect('/')
  },

  // 註冊頁面
  register: (req, res) => {
    res.render('user/register')
  },

  handleRegister: (req, res, next) => {
    const { username, password } = req.body
    // 先檢查資料是否齊全
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位')
      return next()
    }
    // 密碼要先 hash 過，再放入資料庫
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log('hash')
        req.flash('errorMessage', err.toString())
        return next()
      }

      User.create({
        username,
        passhash: hash,
      }).then((newUser) => {
        // 利於之後身分驗證
        req.session.username = username
        // 發文者是誰
        req.session.userId = newUser.id
        res.redirect('/')
      }).catch((e) => {
        req.flash('errorMessage', e.toString())
        return next()
      })
    })
  },

  admin: (req, res) => {
    let page
    if (req.params.page === undefined) {
      page = 1
    } else {
      page = Number(req.params.page)
    }
    const limit = 5
    const offset = (page - 1) * limit

    if (req.session.username) {
      Articles.findAndCountAll({
        include: User,
        where: {
          blogUserId: req.session.userId,
        },
        order: [
          ['createdAt', 'DESC'],
        ],
        limit,
        offset,
      }).then((articles) => {
        res.render('user/admin', {
          articles,
          limit,
          page,
        })
      })
    } else {
      res.redirect('/')
    }
  },
}

module.exports = user
