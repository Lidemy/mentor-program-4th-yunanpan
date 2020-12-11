import { combineReducers } from "redux";
import todosReducers from "./todos";
import filterTodosReducers from "./filterTodos";

export default combineReducers({ todosReducers, filterTodosReducers });
