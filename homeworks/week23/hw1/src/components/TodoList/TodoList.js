import styled from "styled-components";

import { deleteTodo, toggleTodo, updateTodo } from "../../redux/actions";

import { useSelector, useDispatch } from "react-redux";
import { selectFilterTodos, selectTodos } from "../../redux/selectors";
import { useEffect, useState } from "react";

const Todo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #dc9fb4;
`;

const TodoContentEditWrapper = styled.form`
  display: block;
  width: 100%;
`;

const TodoContentEdit = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #b5495b;
  border-radius: 3px;
  color: #9f353a;

  &::placeholder {
    color: #dc9fb4;
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 1px 1px #b5495b;
  }
`;

const TodoContent = styled.div`
  width: 100%;
  word-break: break-all;
  color: #9f353a;
  font-size: 18px;

  ${(props) =>
    props.isCompleted &&
    `
    text-decoration: line-through;
  `}
`;

const Button = styled.button`
  margin-left: 5px;
  padding: 0px;
  min-width: 80px;
  height: 20px;
  border: none;
  border-radius: 3px;
  color: #fedfe1;
  background: #b5495b;
  cursor: pointer;
  outline: none;
`;

const EditButton = styled(Button)``;
const DeleteButton = styled(Button)``;
const ToggleStatusButton = styled(Button)``;

export default function TodoList() {
  const dispatch = useDispatch();
  const filterTodos = useSelector(selectFilterTodos);
  const todos = useSelector(selectTodos);
  const [editStatus, setEditStatus] = useState({ isEdit: false, id: "" });
  const [newTodo, setNewTodo] = useState("");

  // 原本是依據 filterTodos，但發現每按一次篩選都會被改
  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      {filterTodos.map((todo) => (
        <Todo key={todo.id}>
          {editStatus.isEdit && editStatus.id === todo.id ? (
            <TodoContentEditWrapper
              onSubmit={(e) => {
                e.preventDefault();
                if (newTodo === "") {
                  // 沒變更
                  dispatch(updateTodo(todo.id, todo.name));
                } else {
                  dispatch(updateTodo(todo.id, newTodo));
                }
                setNewTodo("");
                setEditStatus({ isEdit: false, id: "" });
              }}
            >
              <TodoContentEdit
                placeholder={todo.name}
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                autoFocus
              />
            </TodoContentEditWrapper>
          ) : (
            <TodoContent isCompleted={todo.isCompleted}>
              {todo.name}
            </TodoContent>
          )}
          {!todo.isCompleted && (
            <EditButton
              onClick={() => {
                setEditStatus({ isEdit: true, id: todo.id });
              }}
            >
              edit
            </EditButton>
          )}
          <DeleteButton onClick={() => dispatch(deleteTodo(todo.id))}>
            delete
          </DeleteButton>
          <ToggleStatusButton onClick={() => dispatch(toggleTodo(todo.id))}>
            {todo.isCompleted && "incomplete"}
            {!todo.isCompleted && "completed"}
          </ToggleStatusButton>
        </Todo>
      ))}
    </div>
  );
}
