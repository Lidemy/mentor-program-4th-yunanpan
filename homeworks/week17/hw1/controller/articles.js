const db = require('../models')
const Articles = db.Blog_articles
const User = db.Blog_user

const articles = {
  add: (req, res) => {
    res.render('article/add')
  },

  handleAdd: (req, res) => {
    const {username} = req.session
    const BlogUserId = req.session.userId
    const {title} = req.body
    const {catagory} = req.body
    const {content} = req.body
    // 沒有登入
    if (!username) {
      req.flash('errorMessage', '請先登入')
      return next()
    }
    // 有登入但漏填欄位
    if (!content || !title || !catagory) {
      req.flash('errorMessage', '尚有欄位未填寫')
      return next()
    }

    Articles.create({
      title,
      catagory,
      content,
      BlogUserId
    }).then(() => {
      res.redirect('/')
    })

  },

  // 顯示所有文章
  index: (req, res) => {
    Articles.findAll({
      include: User,
      order:  [
        ['createdAt', 'DESC']
      ],
      limit: 5
    }).then(articles => {
      // console.log(JSON.stringify(articles[0], null, 4))
      res.render('index', {
        articles
      })
    })
  },

  delete: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId // 身分驗證
      }
    }).then(comment => {
      console.log('comment', comment)
      return comment.destroy()
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.redirect('/')
    })
  },

  update: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id
      }
    }).then(comment => {
      res.render('update', {
        comment
      })
    })
  },

  handleUpdate: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId // 身分驗證
      }
    }).then(comment => {
      console.log('comment', comment)
      return comment.update({
        content: req.body.content
      })
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.redirect('/')
    })
  }
}

module.exports = articles