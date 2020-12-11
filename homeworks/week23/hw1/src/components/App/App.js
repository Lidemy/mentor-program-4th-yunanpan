import styled from "styled-components";
import TodoList from "../TodoList";
import Filter from "../Filter";
import TodoInputForm from "../TodoInputForm";

const TodoWrapper = styled.div`
  box-sizing: border-box;
  margin: 50px auto;
  padding: 20px;
  max-width: 520px;
  border: 2px solid #b5495b;
  border-radius: 5px;
`;

const TodoTitle = styled.div`
  margin-bottom: 16px;
  text-align: center;
  color: #b5495b;
  font-size: 26px;
  font-style: italic;
`;

function App() {
  return (
    <TodoWrapper>
      <TodoTitle>todo</TodoTitle>
      <TodoInputForm />
      <TodoList />
      <Filter />
    </TodoWrapper>
  );
}

export default App;
