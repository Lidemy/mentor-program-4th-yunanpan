// 這是新增刪除等功能的 js
/* eslint-env jquery */
/* eslint-disable no-useless-escape */

function escape(str) {
  return str.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}


// 篩選按鈕樣式
function selectedBtn(btn) {
  $('.btn-outline-tertiary').removeClass('btn-outline-tertiary');
  btn.addClass('btn-outline-tertiary');
}

// 新增
$('input[name=todoInput]').on('keyup', (e) => {
  if (e.key === 'Enter') { // 按的是 enter
    // 拿輸入的值
    const value = $('input[name=todoInput]').val();
    // 不能傳空字串和一堆空白
    if (value.trim() === '') {
      $('input[name=todoInput]').val('').focus();
      // $('input[name=todoInput]').focus();
      return;
    }
    const todoHTML = `
      <div class="p-3 d-flex justify-content-start align-items-center border-bottom todo">
        <div class="checkbox position-relative rounded-circle border mr-3">
          <div class="checkmark d-none"></div>
        </div>
        <div class="todo-content text-active flex-fill h5 bg-white text-break text-uppercase">${escape(value)}</div>
        <input type="text" name="todoContent" class="flex-fill border-0 w-100 d-none" placeholder="${escape(value)}">
        <button type="button" class="close text-tertiary">&times;</button>
      </div>
    `;
    $('.todo-list').prepend(todoHTML);

    // 新增的只會出現在 all 和 active 上
    const todo = $('.todo-list').find('.todo');
    if ($('.btn-outline-tertiary').hasClass('selected-completed')) {
      todo.removeClass('d-flex').addClass('d-none');
      $('.text-finish').parent().addClass('d-flex').removeClass('d-none'); // 不用 hide() 是因為想統一 d-flex 和 d-none 的格式
    }

    // 清空 input
    $('input[name=todoInput]').val('');
  }
});

// 刪除
$('.todo-list').on('click', '.close', (e) => {
  // 要先用 jQuery 選到 e.target 原生的 DOM，才能適用 jQuery 的方法
  $(e.target).parent().remove();
  // $(e.target).parent().removeClass('d-flex').fadeOut(); <= 把 d-flex remove 掉就可以了
  // 問題： 不知為何用 fadeOUT() 之後會消失一下又自動顯示，但 remove() 沒這個問題
  // 解決： 發現是因為 bootstrap 的 d-flex 會讓 display: flex!important 複寫掉...
  // 參考： https://stackoverflow.com/questions/47514692/bootstrap-4-list-items-that-have-d-flex-class-do-not-respond-to-hide
});

// 標記完成/ 未完成
$('.todo-list').on('click', '.checkbox', (e) => {
  let todo = $(e.target).next();
  let tickDOM = $(e.target).children();
  // 點到的是勾勾的情形
  if ($(e.target).hasClass('checkmark')) {
    todo = $(e.target).parent().next();
    tickDOM = $(e.target);
  }

  // 在 input 狀態時不能用
  const input = todo.parent().find('input[name=todoContent]');
  if (!input.hasClass('d-none')) {
    input.focus();
    return;
  }

  // 用 text-finish 判斷有無完成
  if (todo.hasClass('text-finish')) {
    todo.removeClass('text-finish').addClass('text-active');
    tickDOM.addClass('d-none');
  } else {
    todo.removeClass('text-active').addClass('text-finish');
    tickDOM.removeClass('d-none');
  }

  // 在 active 勾完成時項目要不見，在 completed 勾未完成時項目也該不見
  if ($('.btn-outline-tertiary').hasClass('selected-completed')) {
    todo.parent().removeClass('d-flex').addClass('d-none');
  }
  if ($('.btn-outline-tertiary').hasClass('selected-active')) {
    todo.parent().removeClass('d-flex').addClass('d-none');
  }
});

// 清空 todo
$('.uncheck').click(() => {
  $('.todo-list').empty();
});

// 編輯 TODO
$('.todo-list').on('click', '.todo-content', (e) => {
  const input = $(e.target).next();

  // 標註完成後應不能改
  if ($(e.target).parent().hasClass('text-finish')) {
    return;
  }

  $(e.target).addClass('d-none');
  input.removeClass('d-none');
  input.focus(); // 讓一切換到 input 就可以打字，如果沒有設置，需要再點一次才能輸入
});

$('.todo-list').on('keyup', 'input[name=todoContent]', (e) => {
  const newTodo = $(e.target).prev();
  if (e.key === 'Enter') {
    const value = $(e.target).val();
    $(e.target).addClass('d-none');
    newTodo.removeClass('d-none');
    newTodo.text(`${escape(value)}`);
  }
  if (e.key === 'Escape') { // keypress 是 esc
    $(e.target).addClass('d-none');
    newTodo.removeClass('d-none');
  }
});

// 篩選

// Active => 隱藏有打勾的 顯示沒打勾的
$('.selected-active').click(() => {
  selectedBtn($('.selected-active'));

  $('.todo').addClass('d-flex').removeClass('d-none');
  $('.text-finish').parent().removeClass('d-flex').addClass('d-none');
});

// Completed => 隱藏沒打勾的 顯示有打勾的
$('.selected-completed').click(() => {
  selectedBtn($('.selected-completed'));

  $('.todo').removeClass('d-flex').addClass('d-none');
  $('.text-finish').parent().addClass('d-flex').removeClass('d-none');
});

// All
$('.selected-all').click(() => {
  selectedBtn($('.selected-all'));

  $('.todo').addClass('d-flex').remove('d-none');
});


// Clear Completed
$('.clear').click(() => {
  $('.text-finish').parent().remove();
});
