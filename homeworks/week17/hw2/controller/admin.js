const bcrypt = require('bcrypt')
const db = require('../models')
const Admin = db.prizeAdmin
const Prize = db.Prize

const admin = {
  login: (req, res) => {
    // 如果非登入狀態就要去 /login 登入
    if (!req.session.username ) {
      return res.render('login')
    }
    // 已經是登入狀態就去 /admin 後台
    Prize.findAll({
      order: [
        ['probability', 'ASC']
      ]
    }).then(prizes => {
      res.render('admin', {
        prizes
      })
    })
  },

  handleLogin: (req, res, next) => {
    const {username, password} = req.body
    // 先檢查資料是否齊全
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位')
      return next()
    }

    Admin.findOne({
      where: {
        name: username
      }
    }).then(user => {
      if (!user) {
        req.flash('errorMessage', '使用者不存在')
        return next()
      }
      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash('errorMessage', '密碼錯誤')
          return next()
        }
        req.session.username = user.name
        res.redirect('admin')
      })
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },

  logout: (req, res) => {
    req.session.username = null
    return res.redirect('/')
  },

  editPrize: (req, res) => {
    res.render('editprize')
  },

  addPrize: (req, res, next) => {
    const { name } = req.body
    const { imgLink } = req.body
    const { description } = req.body
    const { probability } = req.body

    // 先檢查資料
    if (!name || !imgLink || !description || !probability) {
      req.flash('errorMessage', '缺資料')
      return next()
    }

    Prize.create({
      name,
      imgLink,
      description,
      probability
    }).then(prize => {
      console.log('auto-generated ID:', prize.id)
      res.redirect('/admin')
    })
  },

  deletePrize: (req, res) => {
    const id = req.params.id
    Prize.destroy({
      where: {
        id
      }
    })
    res.redirect('/admin')
  },

  updatePrize: (req, res) => {
    const id = req.params.id
    Prize.findOne({
      where: {
        id
      }
    }).then(prize => {
      res.render('update', {
        prize
      })
    })
  },

  handleUpdatePrize: (req, res) => {
    const id = req.params.id
    const { name } = req.body
    const { imgLink } = req.body
    const { description } = req.body
    const { probability } = req.body

    // 先檢查資料
    if ( !name || !imgLink || !description || !probability) {
      req.flash('errorMessage', '缺資料')
      return next()
    }

    Prize.update({
      name,
      imgLink,
      description,
      probability
    },{
      where: {
        id
      }
    }).then(prize => {
      res.redirect('/admin')
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  }
}

module.exports = admin
