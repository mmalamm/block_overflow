import { getShape } from "./utils";
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
        newRow += board[newY][pce.x + j] || "";
      } else if (board[newY][pce.x + j] === "e") {
        newRow += currentShape[i][j];
      }
    }
    newRow += board[newY].slice(pce.x + len);
    newBoard[newY] = newRow;
  }
  return newBoard;
};
export default createNewBoard;