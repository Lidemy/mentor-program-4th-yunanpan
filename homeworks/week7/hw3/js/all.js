const newTodo = document.querySelector('.todo__input input');
const lists = document.querySelector('.todo__lists');
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 新增 todo
newTodo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    // 確認有輸入且不得都為空白格
    if (newTodo.value.trim().length !== 0) {
      // 把 value 新增到表單
      const div = document.createElement('div');
      div.classList.add('todo__list');
      div.innerHTML = `
          <label class="todo__content"> 
            <input type="checkbox">
            <div class="todo__checkbox"></div>
            ${escapeHtml(newTodo.value.toUpperCase().trim())}
          </label>
          <div class="todo__delete"></div>
      `;
      // 要新增在 lists 的最上面
      lists.prepend(div);
      // 新增完要清空 input 內容
      newTodo.value = '';
    } else {
      alert('請輸入代辦項目');// eslint-disable-line no-alert
    }
  }
});

// 刪除 todo
lists.addEventListener('click', (e) => {
  if (e.target.classList.contains('todo__delete')) {
    lists.removeChild(e.target.parentNode);
    return;
  }
  // 已完成/未完成 todo
  if (e.target.classList.contains('todo__content')) {
    e.target.classList.toggle('todo__finished');
  }
});

// 已完成/未完成 todo 檢討前
// parent 不能選到裡面全部的東西嗎 => todo__content todo__checkbox 得分開寫
// lists.addEventListener('click',
//   (e) => {
//     if (e.target.classList.contains('todo__content')) {
//       e.target.classList.toggle('todo__finished');
//       e.target.children[1].classList.toggle('todo__check');
//     }
//     if (e.target.classList.contains('todo__checkbox')) {
//       e.target.closest('.todo__content').classList.toggle('todo__finished');
//       e.target.classList.toggle('todo__check');
//     }
//   });
