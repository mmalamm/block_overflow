import PIECES, { getShape } from "./pieces";

export const createEmptyBoard = () => [...Array(20)].map(row => "e".repeat(10));

const { I, S, J, L, O, T, Z } = [..."IJLOSTZ"].reduce(
  (a, l) => ({ ...a, [l]: l }),
  {}
);

export const createInitalState = () => {
  return {
    playerPiece: { pieceName: L, x: 4, y: 0, orientation: 3 },
    board: createEmptyBoard(),
    upcomingPieces: [T, I, S, J, O, Z],
    score: 0
  };
};

export const canShift = direction => (board, pce) => {
  const { y, x } = pce;
  const isLeft = direction === "LEFT";
  const currentShape = getShape(pce);
  const len = currentShape.length;
  // if ((isLeft && x - 1 < 0) || (!isLeft && x + len > 9)) {
  //   return false;
  // }
  if (isLeft) {
    for (let i = 0; i < len; i++) {
      if (board[y + i][x - 1] === undefined) {
        if (currentShape[i][0] === 'e') {
          continue;
        } else {
          return false;
        }
      }
    }
  }
  if (!isLeft) {
    for (let i = 0; i < len; i++) {
      if (board[y + i][x + len] === undefined) {
        const thing = y + i;
        const otherThing = x + len;
        console.log(i, thing, otherThing);
        const lastColPiece = currentShape[i][len - 1];
        // debugger;
        if (lastColPiece === 'e') {
          // debugger;
          continue;
        } else {
          return false;
        }
      }
      return true;
    }
  }
  return true;
};

export const willCollide = (board, pce) => {
  const currentShape = getShape(pce);
  const len = currentShape.length;
  const squareOfNextTick = board
    .slice(pce.y + 1, pce.y + 1 + len)
    .map((row, idx) => row.slice(pce.x, pce.x + currentShape[idx].length));
  for (let i = 0; i < len; i++) {
    if (!squareOfNextTick[i]) continue;
    for (let j = 0; j < currentShape[i].length; j++) {
      if (currentShape[i][j] !== "e" && squareOfNextTick[i][j] !== "e")
        return true;
    }
  }
  if (pce.y + currentShape.filter(row => row.replace(/e/g, "")).length > 19)
    return true;
};

export const createNewBoard = (board, pce) => {
  const newBoard = [...board];
  const currentShape = getShape(pce);
  const len = currentShape.length;
  for (let i = 0; i < len; i++) {
    const newY = i + pce.y;
    if (!newBoard[newY]) continue;

    let newRow = board[newY].slice(0, pce.x);
    for (let j = 0; j < currentShape[i].length; j++) {
      if (currentShape[i][j] === "e") {
        newRow += board[newY][pce.x + j];
      } else if (board[newY][pce.x + j] === "e") {
        newRow += currentShape[i][j];
      }
    }
    newRow += board[newY].slice(pce.x + len);
    newBoard[newY] = newRow;
  }
  return newBoard;
};

export const mergeBoard = (board, pce) => {
  ///
  if (!Array.isArray(board)) debugger;
  const newBoard = [...board];
  if (!PIECES[pce.pieceName]) debugger;
  const currentShape = PIECES[pce.pieceName].shapes[pce.orientation];
  for (let i = 0; i < currentShape.length; i++) {
    if (newBoard[pce.y + i]) {
      newBoard[pce.y + i] =
        newBoard[pce.y + i].slice(0, pce.x) +
        currentShape[i] +
        newBoard[pce.y + i].slice(pce.x + currentShape[i].length);
    }
  }
  return newBoard;
};
