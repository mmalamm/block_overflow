import createBoardSection from "./createBoardSection";
import { getShape } from "./utils";
import diffSections from "./diffSections";
export default (board, piece) => {
  const currentShape = getShape(piece);
  const len = currentShape.length;
  const { x, y, offset } = piece;

  const boardSection = createBoardSection(board, {
    offset,
    x,
    y,
    length: len
  });
  const mergedSection = diffSections(boardSection, currentShape) || [];

  const replacementRows = mergedSection
    .map((msRow, idx) => {
      const currentRow = board[y + idx];
      if (!currentRow) return null;
      const outputRow =
        currentRow.slice(0, x) +
        msRow.replace(/#/g, "") +
        currentRow.slice(x + len - offset);
      return outputRow;
    })
    .filter(e => e);
  const beginningArena = board.slice(0, y);
  const middleArena = replacementRows;
  const endArena = board.slice(y + len);
  const output = [...beginningArena, ...middleArena, ...endArena];
  return output;
};
