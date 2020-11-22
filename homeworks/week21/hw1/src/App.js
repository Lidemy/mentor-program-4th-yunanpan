import styled from "styled-components";
import { useState } from "react"; // 要用 state 要 import React

const Wrapper = styled.div`
  margin: auto;
  margin-top: 48px;
  max-width: 840px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.primaryLighter};
`;

const TodoBody = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  font-size: 32px;
  color: ${(props) => props.theme.colors.primaryDarker};
  text-align: center;
  font-weight: bold;
  font-style: italic;
`;

const TodoInputWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const TodoInput = styled.input`
  flex: 1;
  margin-right: 5px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.secondaryLight};
  border: none;

  &:focus {
    outline: none;
  }
`;

const TodoWrapper = styled.div`
  display: flex;
  position: relative;

  & + & {
    margin-top: 10px;
  }

  ${(props) =>
    !props.isShow &&
    `
    display: none;
  `}
`;
const TodoContentWrapper = styled.div`
  flex: 1;
  display: flex;
`;

const TodoCheck = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primaryDark};
  cursor: pointer;

  ${(props) =>
    props.isDone &&
    `
    transform: rotate(-55deg);

    &:before {
      content: "";
      display: block;
      position: relative;
      left: 7px;
      top: 6px;
      width: 10px;
      height: 6px;
      border-bottom: 2px solid white;
      border-left: 2px solid white;
    }
  `}
`;

const TodoContent = styled.div`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 16px;
  word-break: break-all;

  ${(props) =>
    props.isDone &&
    `
    text-decoration: line-through;
  `}

  ${(props) =>
    props.isUpdate &&
    `
    display: none;
  `}
`;

const TodoContentInput = styled.input`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => props.theme.colors.secondaryLight};
  font-size: 16px;
  border: none;
  outline: none;

  ${(props) =>
    !props.isUpdate &&
    `
    display: none;
  `}
`;

const TodoButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.div`
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.primaryDark};
  color: ${(props) => props.theme.colors.secondaryLight};
  height: 16px;
  line-height: 16px;
  font-size: 14px;
  cursor: pointer;

  & + & {
    margin-left: 5px;
  }

  ${(props) =>
    props.isDone &&
    `
    display: none;
  `}
`;

const ButtonAdd = styled(Button)`
  padding: 5px 10px;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primaryDark};
  font-weight: bold;
`;

const ButtonFooter = styled(Button)`
  color: ${(props) => props.theme.colors.primaryDark};
  background-color: ${(props) => props.theme.colors.secondaryLight};
`;

const TodoFooter = styled.div`
  display: flex;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.primaryDark};
`;

let id = 3;
function App() {
  // state [value, setter] (初始值)
  const [todos, setTodos] = useState([
    { id: 1, content: "uncheck", isDone: false, isShow: true },
    { id: 2, content: "check", isDone: true, isShow: true },
  ]);
  const [value, setValue] = useState("");
  const [show, setShow] = useState("all");

  const handleAddTodo = () => {
    let isShow = true;
    if (show === "done") {
      isShow = false;
    }
    setTodos([
      {
        id,
        content: value,
        isDone: false,
        isUpdate: false,
        isShow,
      },
      ...todos,
    ]);
    setValue("");
    id += 1;
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleClearAll = (todos) => {
    setTodos((todos = []));
  };

  const handleUpdateClick = (id, isDone) => {
    if (isDone) return;
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isUpdate: !todo.isUpdate,
        };
      })
    );
  };

  const handleUpdate = (id, e) => {
    if (e.key === "Enter") {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isUpdate: !todo.isUpdate,
            content: e.target.value,
          };
        })
      );
    }
  };

  const handleSelectAll = () => {
    setShow("all");
    setTodos(
      todos.map((todo) => {
        return {
          ...todo,
          isShow: true,
        };
      })
    );
  };

  const handleSelectIsDone = () => {
    setShow("done");
    setTodos(
      todos.map((todo) => {
        if (todo.isDone) {
          return {
            ...todo,
            isShow: true,
          };
        }
        return {
          ...todo,
          isShow: false,
        };
      })
    );
  };

  const handleSelectUndone = () => {
    setShow("undone");
    setTodos(
      todos.map((todo) => {
        if (todo.isDone) {
          return {
            ...todo,
            isShow: false,
          };
        }
        return {
          ...todo,
          isShow: true,
        };
      })
    );
  };

  return (
    <Wrapper>
      <TodoBody>
        <Title>todo list</Title>
        <TodoInputWrapper>
          <TodoInput
            type="text"
            value={value}
            placeholder="add todo"
            onChange={handleInputChange}
          />
          <ButtonAdd onClick={handleAddTodo}>+</ButtonAdd>
        </TodoInputWrapper>

        {todos.map((todo) => (
          <TodoWrapper
            key={todo.id}
            isShow={todo.isShow}
            data-todo-id={todo.id}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdate={handleUpdate}
            handleUpdateClick={handleUpdateClick}
            handleToggleIsDone={handleToggleIsDone}
          >
            <TodoContentWrapper>
              <TodoCheck
                onClick={() => {
                  handleToggleIsDone(todo.id);
                }}
                isDone={todo.isDone}
              />
              <TodoContent isUpdate={todo.isUpdate} isDone={todo.isDone}>
                {todo.content}
              </TodoContent>
              <TodoContentInput
                onKeyPress={(e) => handleUpdate(todo.id, e)}
                isUpdate={todo.isUpdate}
                placeholder={todo.content}
              />
            </TodoContentWrapper>
            <TodoButtonWrapper>
              <Button
                onClick={() => handleUpdateClick(todo.id, todo.isDone)}
                isUpdate={todo.isUpdate}
                isDone={todo.isDone}
              >
                編輯
              </Button>
              <Button onClick={() => handleDeleteTodo(todo.id)}>刪除</Button>
            </TodoButtonWrapper>
          </TodoWrapper>
        ))}
      </TodoBody>
      <TodoFooter>
        <ButtonFooter onClick={handleClearAll}>清空</ButtonFooter>
        <ButtonFooter onClick={handleSelectAll}>全部</ButtonFooter>
        <ButtonFooter onClick={handleSelectIsDone}>已完成</ButtonFooter>
        <ButtonFooter onClick={handleSelectUndone}>未完成</ButtonFooter>
      </TodoFooter>
    </Wrapper>
  );
}

export default App;
