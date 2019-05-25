import { getShape } from "./pieces";

export const createEmptyBoard = () => [...Array(20)].map(row => "e".repeat(10));

const { I, S, J, L, O, T, Z } = "IJLOSTZ"
  .split("")
  .reduce((a, l) => ({ ...a, [l]: l }));

export const createInitalState = () => {
  return {
    playerPiece: { piece: L, x: 4, y: 0, orientation: 0 },
    board: createEmptyBoard(),
    upcomingPieces: [T, I, S, J, O, Z],
    score: 0
  };
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
  console.log("sq:", squareOfNextTick);
};

export const createNewBoard = (board, pce) => {
  const newBoard = [...board];
  const currentShape = getShape(pce);
  const len = currentShape.length;
  // debugger;
  // for (let i = 0; i < currentShape.length; i++) {
  //   if (!newBoard[pce.y + i]) continue;
  //   newBoard[pce.y + i] =
  //     newBoard[pce.y + i].slice(0, pce.x) +
  //     currentShape[i] +
  //     newBoard[pce.y + i].slice(pce.x + currentShape[i].length);
  // }

  // for (let i = 0; i < len; i++) {
  //   if (!board[i]) continue;
  //   let newRow = board[i].slice(0, pce.x);
  //   for (let j = 0; j < currentShape[i].length + pce.x; j++) {
  //     if (currentShape[i][j] !== "e" && board[i][pce.x + j] !== "e") continue;
  //     newRow += currentShape[i][j]
  //   }
  //   newRow += board[i].slice(pce.x + len);
  //   newBoard[i] = newRow;
  // }
  for (let i = 0; i < len; i++) {
    const newY = i + pce.y;
    debugger;
    if (!newBoard[newY]) continue;

    let newRow = board[newY].slice(0, pce.x);
    // newBoard[newY] = `${board[newY].slice(0, pce.x)}${currentShape[i]}${board[
    //   newY
    // ].slice(pce.x + currentShape[i].length)}`;
    for (let j = 0; j < currentShape[i].length; j++) {
      if (currentShape[i][j] === "e") {
        newRow += board[newY][pce.x + i];
      } else if (board[newY][pce.x + i] === "e") {
        newRow += currentShape[i][j];
      }
    }
    newRow += board[newY].slice(pce.x + len);
    newBoard[newY] = newRow;
  }
  return newBoard;
};
