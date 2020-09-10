// 這是儲存功能的 js

/* eslint-env jquery */
/* eslint-disable no-useless-escape, no-alert */

function escape(str) {
  return str.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}

function appendTodo(value, status) {
  let todoHTML = `
    <div class="p-3 d-flex justify-content-start align-items-center border-bottom todo">
      <div class="checkbox position-relative rounded-circle border mr-3">
        <div class="checkmark d-none"></div>
      </div>
      <div class="todo-content text-active flex-fill h5 bg-white text-break text-uppercase">${escape(value)}</div>
      <input type="text" name="todoContent" class="flex-fill border-0 w-100 d-none" placeholder="${escape(value)}">
      <button type="button" class="close text-tertiary">&times;</button>
    </div>
  `;
  if (status === 'completed') {
    todoHTML = `
      <div class="p-3 d-flex justify-content-start align-items-center border-bottom todo">
        <div class="checkbox position-relative rounded-circle border mr-3">
          <div class="checkmark"></div>
        </div>
        <div class="todo-content text-finish flex-fill h5 bg-white text-uppercase">${escape(value)}</div>
        <input type="text" name="todoContent" class="flex-fill border-0 w-100 d-none" placeholder="${escape(value)}">
        <button type="button" class="close text-tertiary">&times;</button>
      </div>
    `;
  }
  $('.todo-list').append(todoHTML);
}

function appendTodolist(todo, status) {
  for (let i = 0; i < todo.length; i += 1) {
    const value = todo[i];
    appendTodo(value, status);
  }
}


// 傳 id 拿儲存資料顯示在前端
function renderTodo() {
  $.ajax({
    url: 'http://mentor-program.co/mtr04group1/yunanpan/week12hw2/render_todo.php',
  }).done((data) => {
    if (!data.ok) {
      console.log(data.message);
      return;
    }

    const { todolist } = data;
    const renderActive = JSON.parse(todolist.active);
    const renderCompleted = JSON.parse(todolist.completed);
    const activeTodo = Object.values(renderActive);
    const completedTodo = Object.values(renderCompleted);
    appendTodolist(activeTodo, 'active');
    appendTodolist(completedTodo, 'completed');
  });
}

renderTodo();

// 儲存功能
let todoInfo = {
  active: {},
  completed: {},
}; // 裝資料

const todoList = {};

// 拿 content
function getTodoContent(i, todo, status) {
  if (status === 'active') {
    const index = i.toString();
    todoInfo.active[index] = todo.innerText;
  }
  if (status === 'completed') {
    const index = i.toString();
    todoInfo.completed[index] = todo.innerText;
  }
}

function saveTodo(e) {
  $.ajax({
    type: 'POST',
    url: 'http://mentor-program.co/mtr04group1/yunanpan/week12hw2/save_todo.php',
    data: e,
  }).done((data) => {
    if (!data.ok) {
      alert(data.message);
    }
  });
}

$('.save').click(() => {
  todoInfo = {
    active: {},
    completed: {},
  };
  const todos = $('.todo');
  const activeContent = todos.find('.todo-content.text-active');
  const completedContent = todos.find('.todo-content.text-finish');
  activeContent.each((i, todo) => {
    getTodoContent(i, todo, 'active');
  });
  completedContent.each((i, todo) => {
    getTodoContent(i, todo, 'completed');
  });
  todoList.active = JSON.stringify(todoInfo.active);
  todoList.completed = JSON.stringify(todoInfo.completed);
  saveTodo(todoList);
});
