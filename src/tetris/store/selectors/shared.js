import { getShape } from "../../helpers/utils";
import willCollide from "../../helpers/willCollide";
export const ghostPieceSelector = (board, pce) => {
  const { y } = pce;
  let tempY = y;
  while (!willCollide(board, { ...pce, y: tempY })) {
    tempY++;
  }
  return {
    ...pce,
    y: tempY,
    ghost: true
  };
};
export const boardSelector = state => state.board;
export const pieceSelector = state => state.playerPiece;

export const insertGhostIntoBoard = (mergedBoard, ghostPiece) => {
  const ghostShape = getShape(ghostPiece);
  const len = ghostShape.length;
  const { x, y, offset } = ghostPiece;
  const beginningRows = mergedBoard.slice(0, y);
  const middleRows = ghostShape
    .map((sRow, idx) => {
      const currentRow = mergedBoard[y + idx];
      if (!currentRow) return null;
      const rowBegin = currentRow.slice(0, x);
      let rowMid = [...currentRow.slice(x, x + len - offset)];
      const rowEnd = currentRow.slice(x - offset + len);
      for (let i = 0; i < len - offset; i++) {
        rowMid[i] = rowMid[i] === "e" ? sRow[i + offset] : rowMid[i];
      }
      return rowBegin + rowMid.join("") + rowEnd;
    })
    .filter(e => e);
  const endRows = mergedBoard.slice(y + len);
  const output = [...beginningRows, ...middleRows, ...endRows];
  return output;
};
