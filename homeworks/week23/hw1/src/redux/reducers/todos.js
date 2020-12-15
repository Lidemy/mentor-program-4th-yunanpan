import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
  CLEAR_ALL,
} from "../actionTypes";

let todoId;

if (!window.localStorage.getItem("todos")) {
  todoId = 0;
} else {
  const length = JSON.parse(window.localStorage.getItem("todos")).length;
  todoId = length;
}

// 看 localStorage 裡面有沒有東西去設定 initialState
// 參考：[Redux store changes when reload page](https://stackoverflow.com/questions/48410332/redux-store-changes-when-reload-page)

function initState() {
  if (!window.localStorage.getItem("todos")) return { todos: [] };
  return {
    todos: JSON.parse(window.localStorage.getItem("todos")),
  };
}

export default function todosReducers(state = initState(), action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        todos: [
          ...state.todos,
          {
            name: action.payload.name,
            id: todoId++,
            isCompleted: false,
          },
        ],
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state.todos,
        todos: state.todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }),
      };
    }
    case UPDATE_TODO: {
      const { id, name } = action.payload;
      return {
        ...state.todos,
        todos: state.todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            id,
            name,
          };
        }),
      };
    }
    case CLEAR_ALL: {
      return {
        todos: [],
      };
    }
    default:
      return state;
  }
}
