import styled from "styled-components";
import { useState } from "react";
import { calculateWinner } from "./calculateWinner";

const Square = styled.button`
  position: relative;
  box-sizing: border-box;
  padding: 0px;
  width: 20px;
  height: 20px;
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.value === "X" &&
    `
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 75%;
      height: 75%;
      border-radius: 50%;
      box-shadow: 1px 1.5px 2px 1px #b7b7b7;
      background-color: black;
    }
  `}

  ${(props) =>
    props.value === "O" &&
    `
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 75%;
      height: 75%;
      border-radius: 50%;
      box-shadow: 1px 1.5px 2px 1px #b7b7b7;
      background-color: white;
    }
  `}
`;

function ChessBoard(props) {
  const { x, y, squares, handleClick } = props;
  return (
    <Square onClick={() => handleClick(x, y)} value={squares[x][y]}></Square>
  );
}

const ChessBoardRow = styled.div`
  font-size: 0px;
  min-width: 600px;
`;

const ChessBoardWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 10px;
`;

const ReplayButton = styled.div`
  padding: 5px;
  background: black;
  text-align: center;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

export default function Chess() {
  const [squares, setSquares] = useState(Array(19).fill(Array(19).fill(null)));
  const [blackIsNext, setNext] = useState(true);

  const handleClick = (x, y) => {
    const newSquares = JSON.parse(JSON.stringify(squares));
    // 不能重複點同一格
    if (newSquares[x][y] === null) {
      newSquares[x][y] = blackIsNext ? "X" : "O";
      setSquares(newSquares);
      setNext(!blackIsNext);
    }
  };

  const handleReplayClick = () => {
    setNext(true);
    setSquares(Array(19).fill(Array(19).fill(null)));
  };

  // 計算誰輸誰贏
  const whoIsNext = `Next player: ${blackIsNext ? "blackchess" : "whitechess"}`;
  let winner = calculateWinner(squares); // 'X', 'O'
  let status = winner
    ? winner === "X"
      ? "Winner: blackchess"
      : "Winner: whitechess"
    : whoIsNext;

  const chess = squares.map((square, i) => {
    const entry = square.map((_, j) => {
      return (
        <ChessBoard
          key={j}
          x={i}
          y={j}
          squares={squares}
          handleClick={handleClick}
        />
      );
    });
    return <ChessBoardRow key={i}>{entry}</ChessBoardRow>;
  });

  return (
    <div>
      <ChessBoardWrapper>{chess}</ChessBoardWrapper>
      <h3>{status}</h3>
      <ReplayButton onClick={handleReplayClick}>重玩</ReplayButton>
    </div>
  );
}
