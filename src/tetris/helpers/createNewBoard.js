import { getShape } from "./utils";
export const createNewBoard = (board, pce) => {
  const newBoard = [...board];
  const currentShape = getShape(pce);
  const { x, y, offset } = pce;
  const len = currentShape.length;
  for (let i = 0; i < len; i++) {
    const newY = i + y;
    if (!newBoard[newY]) continue;

    let newRow = "";
    if (offset) {
      const rowOfShape = currentShape[i].slice(offset);

      for (let j = 0; j < board[newY].length; j++) {
        if (rowOfShape[j] && rowOfShape[j] !== "e") {
          newRow += rowOfShape[j];
        } else {
          newRow += board[newY][j];
        }
      }
    } else {
      newRow += board[newY].slice(0, x);
      for (let j = 0; j < currentShape[i].length; j++) {
        if (currentShape[i][j] === "e") {
          newRow += board[newY][x + j] || "";
        } else if (board[newY][x + j] === "e") {
          newRow += currentShape[i][j];
        }
      }
      newRow += board[newY].slice(x + len);
    }

    if (newRow.length < 10) debugger;

    newBoard[newY] = newRow;
  }
  return newBoard;
};
export default createNewBoard;
