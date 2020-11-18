import styled from "styled-components";
import { useState } from "react";

const BoardLine = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 0px;
  width: 20px;
  height: 20px;
  border: 1px solid #aca095;
`;

const BoardBackground = styled.div`
  display: flex;
  box-sizing: border-box;
  width: calc(20px * 20);
  background-color: #efe9e5;
`;

export default function Boards() {
  const [boards] = useState(Array(20).fill(Array(20).fill(null)));

  const boardsRows = boards.map((board, i) => {
    const entry = board.map((_, j) => {
      return <BoardLine key={j}></BoardLine>;
    });
    return <BoardBackground key={i}>{entry}</BoardBackground>;
  });

  return <div>{boardsRows}</div>;
}
