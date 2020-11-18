import styled from "styled-components";
import Boards from "./boards";
import Chess from "./chess";

const Wrapper = styled.div`
  position: absolute;
  margin-top: 50px;
  left: 50%;
  transform: translateX(-50%);
`;

function App() {
  return (
    <Wrapper>
      <Boards />
      <Chess />
    </Wrapper>
  );
}

export default App;
