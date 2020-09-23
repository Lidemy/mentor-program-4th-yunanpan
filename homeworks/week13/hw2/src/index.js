/* eslint-disable semi, no-alert, no-use-before-define, import/prefer-default-export, no-restricted-syntax, prefer-destructuring, max-len */

import $ from 'jquery'
import { getComments, addComments } from './api'
import { appendCommentToDOM, appendStyle } from './utils'
import { cssTemplate, getLoadMoreButton, getForm } from './template'

// 初始化設定
export function init(options) {
  // 為支援在同一頁使用多次 plugin，將變數放到 function 裡，避免覆蓋
  let siteKey = ''
  let apiUrl = ''
  let containerElement = null
  let commentDOM = null
  let lastId = null
  let isEnd = false

  siteKey = options.siteKey
  apiUrl = options.apiUrl
  const loadMoreClassName = `${siteKey}-load-more`
  const commentsClassName = `${siteKey}-comments`
  const formClassName = `${siteKey}-add-comment-form`
  const commentsSelector = `.${commentsClassName}`
  const formSelector = `.${formClassName}`
  containerElement = $(options.containerSelector)
  // 初始化完成後，將內容動態顯示
  containerElement.append(getForm(formClassName, commentsClassName))
  // 動態將 css 放上去
  appendStyle(cssTemplate)

  commentDOM = $(commentsSelector)
  getNewComments()

  $(commentsSelector).on('click', `.${loadMoreClassName}`, () => {
    getNewComments()
  })

  $(formSelector).submit((e) => {
    e.preventDefault();
    const nickNameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)
    const newCommentData = {
      site_key: siteKey,
      nickname: nickNameDOM.val(),
      content: contentDOM.val(),
    }
    addComments(apiUrl, siteKey, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      nickNameDOM.val('')
      contentDOM.val('')
      appendCommentToDOM(commentDOM, newCommentData, true)
    })
  })

  function getNewComments() {
    commentDOM = $(commentsSelector)
    $(`.${loadMoreClassName}`).hide()
    if (isEnd) {
      return
    }
    getComments(apiUrl, siteKey, lastId, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }

      const comments = data.discussions;
      for (const comment of comments) {
        appendCommentToDOM(commentDOM, comment)
      }
      const { length } = comments
      if (length === 0) {
        isEnd = true
        $(`.${loadMoreClassName}`).hide()
      } else {
        lastId = comments[length - 1].id
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName)
        $(commentsSelector).append(loadMoreButtonHTML)
      }
    })
  }
}
