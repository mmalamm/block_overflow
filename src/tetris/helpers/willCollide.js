import { getShape } from "./utils";
import diffSections from "./diffSections";

const willCollide = (board, pce) => {
  const currentShape = getShape(pce),
    len = currentShape.length,
    { x, y, offset } = pce;
  const trimmedPiece = (() => {
    let foundPieces = false;
    const output = [];
    for (let i = len - 1; i > 0; i--) {
      const row = currentShape[i];
      if (row.replace(/e/g, "")) {
        foundPieces = true;
      }
      if (foundPieces) {
        output.push(row);
      }
    }
    return output;
  })();
  if (y + trimmedPiece.length > 19) return true;
  const squareOfNextTick = board.slice(y + 1, y + 1 + len).map((row, idx) => {
    if (offset === 0) {
      return row.slice(x, x + currentShape[idx].length);
    } else {
      return "#".repeat(offset) + row.slice(0, len - offset);
    }
  });
  while (squareOfNextTick.length < len) {
    squareOfNextTick.push("#".repeat(len));
  }
  return !diffSections(squareOfNextTick, currentShape);
};

export default willCollide;
