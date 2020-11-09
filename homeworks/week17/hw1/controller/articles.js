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
    Articles.findOne({
      where: {
        id: req.params.id,
        BlogUserId: req.session.userId // 身分驗證
      }
    }).then(article => {
      return article.destroy()
    }).then(() => {
      res.redirect('/admin')
    }).catch(() => {
      res.redirect('/admin')
    })
  },

  update: (req, res) => {
    console.log('update')
    Articles.findOne({
      where: {
        id: req.params.id
      }
    }).then(article => {
      res.render('article/update', {
        article
      })
    })
  },

  handleUpdate: (req, res, next) => {
    Articles.findOne({
      where: {
        id: req.params.id,
        BlogUserId: req.session.userId // 身分驗證
      }
    }).then(article => {
      const {title} = req.body
      const {catagory} = req.body
      const {content} = req.body
      if (!title || !catagory || !content) {
        req.flash('errorMessage', '資料不齊全')
        return next()
      }
      return article.update({
        title,
        catagory,
        content
      })
    }).then(() => {
      const id = req.params.id
      res.redirect(`/view_article/${id}`)
    }).catch(err => {
      return next()
    })
  },

  viewArticle: (req, res) => {
    Articles.findOne({
      include: User,
      where: {
        id: req.params.id
      }
    }).then(article => {
      // console.log(JSON.stringify(article, null, 4))
      res.render('article/view_article', {
        article
      })
    })
  },

  listArticle: (req, res) => {
    let page
    if (req.params.page === undefined) {
      page = 1
    } else {
      page = Number(req.params.page)
    }
    const limit = 5
    const offset = (page - 1) * limit
    return pagination(offset, limit, page, res)
    // 1. 本來想以路由 articles_list/:page 判斷有無 req.params，但沒有成功
    //    判斷有無 req.params 參考：https://stackoverflow.com/questions/59915006/express-route-check-if-req-params-parameter-is-empty
    // 2. 所以改用路由 articles_list/:page? 判斷
    //    參考：https://stackoverflow.com/questions/28163328/how-change-req-param-if-req-param-undefined
  },

  category: (req, res) => {
    const category = req.params.category
    let page
    if (req.params.page === undefined) {
      page = 1
    } else {
      page = Number(req.params.page)
    }
    const limit = 3
    const offset = (page - 1) * limit

    if (category === undefined) {
      res.render('article/category_list')
    } else {
      Articles.findAndCountAll({
        where: {
          catagory: category
        },
        order:  [
          ['createdAt', 'DESC']
        ],
        limit,
        offset
      }).then(articles => {
        res.render('article/category_article', {
          articles,
          limit,
          page
        })
      })
    }
  }
}

function pagination(offset, limit, page, res) {
  Articles.findAndCountAll({
    include: User,
    order:  [
      ['createdAt', 'DESC']
    ],
    limit,
    offset
  }).then(articles => {
    // console.log(JSON.stringify(articles, null, 4))
    res.render('article/list_article', {
      articles,
      limit,
      page
    })
  })
}

module.exports = articles