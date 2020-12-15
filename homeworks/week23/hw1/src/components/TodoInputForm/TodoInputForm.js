import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/actions";

const TodoInputWrapper = styled.form``;
const TodoInput = styled.input`
  box-sizing: border-box;
  padding: 2px;
  width: 100%;
  font-size: 16px;
  color: #b5495b;
  border: 1px solid #b5495b;
  border-radius: 3px;

  &::placeholder {
    color: #dc9fb4;
    font-style: italic;
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 1px 1px #b5495b;
  }
`;

export default function TodoInputForm() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");

  return (
    <TodoInputWrapper
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addTodo(todo));
        setTodo("");
      }}
    >
      <TodoInput
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        placeholder="todo..."
      />
    </TodoInputWrapper>
  );
}
