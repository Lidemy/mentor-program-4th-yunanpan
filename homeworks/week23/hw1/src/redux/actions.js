import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
  SET_FILTER,
  CLEAR_ALL,
} from "./actionTypes";

// action creators

export function addTodo(name) {
  return {
    type: ADD_TODO,
    payload: {
      name,
    },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    },
  };
}

export function updateTodo(id, name) {
  return {
    type: UPDATE_TODO,
    payload: {
      id,
      name,
    },
  };
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: {
      filter,
    },
  };
}

export function clearAll() {
  return {
    type: CLEAR_ALL,
  };
}
