function calculateHorizon(squares, i) {
  for (let j = 0; j < squares.length - 4; j++) {
    if (
      squares[i][j] !== null &&
      squares[i][j] === squares[i][j + 1] &&
      squares[i][j + 1] === squares[i][j + 2] &&
      squares[i][j + 2] === squares[i][j + 3] &&
      squares[i][j + 3] === squares[i][j + 4]
    ) {
      return squares[i][j];
    }
  }
}

function calculateVertical(squares, i) {
  for (let j = 0; j < squares.length - 4; j++) {
    if (
      squares[j][i] !== null &&
      squares[j][i] === squares[j + 1][i] &&
      squares[j + 1][i] === squares[j + 2][i] &&
      squares[j + 2][i] === squares[j + 3][i] &&
      squares[j + 3][i] === squares[j + 4][i]
    ) {
      return squares[j][i];
    }
  }
}

function calculate45(squares, i) {
  for (let j = 0; j < squares.length - 4; j++) {
    if (
      squares[i][j] !== null &&
      squares[i][j] === squares[i + 1][j + 1] &&
      squares[i + 1][j + 1] === squares[i + 2][j + 2] &&
      squares[i + 2][j + 2] === squares[i + 3][j + 3] &&
      squares[i + 3][j + 3] === squares[i + 4][j + 4]
    ) {
      return squares[i][j];
    }
  }
}

function calculate135(squares, i) {
  for (let j = squares.length - 4; j > 0; j--) {
    if (
      squares[i][j] !== null &&
      squares[i][j] === squares[i + 1][j - 1] &&
      squares[i + 1][j - 1] === squares[i + 2][j - 2] &&
      squares[i + 2][j - 2] === squares[i + 3][j - 3] &&
      squares[i + 3][j - 3] === squares[i + 4][j - 4]
    ) {
      return squares[i][j];
    }
  }
}

export function calculateWinner(squares) {
  for (let i = 0; i < squares.length; i++) {
    // 算橫排
    let result = calculateHorizon(squares, i);
    if (result === "X" || result === "O") return result;
    // 算直排
    result = calculateVertical(squares, i);
    if (result === "X" || result === "O") return result;
  }

  for (let i = 0; i < squares.length - 4; i++) {
    // 算 45 度
    let result = calculate45(squares, i);
    if (result === "X" || result === "O") return result;
    // 算 135 度
    result = calculate135(squares, i);
    if (result === "X" || result === "O") return result;
  }
}
