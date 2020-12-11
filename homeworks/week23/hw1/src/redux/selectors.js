export const selectFilterTodos = (store) => {
  let todoList = store.todosReducers.todos;
  switch (store.filterTodosReducers) {
    case "all": {
      return todoList;
    }
    case "completed": {
      return todoList.filter((todo) => todo.isCompleted);
    }
    case "incomplete": {
      return todoList.filter((todo) => !todo.isCompleted);
    }
    default:
      return todoList;
  }
};

export const selectCurrentFilter = (store) => {
  return store.filterTodosReducers;
};

export const selectTodos = (store) => {
  return store.todosReducers.todos;
};
