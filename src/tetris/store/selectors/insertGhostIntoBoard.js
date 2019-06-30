import { getShape } from "../../helpers/utils";

export default (mergedBoard, ghostPiece) => {
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
