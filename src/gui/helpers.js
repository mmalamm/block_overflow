import { getShape } from "../tetris/helpers/utils";
import diffSections from "../tetris/helpers/diffSections";

export const mergeBoard = (board, pce) => {
  const currentShape = getShape(pce);
  const len = currentShape.length;
  const offset = pce.offset;

  const replacementRows = (brd => {
    let boardSection;
    if (offset > 0) {
      boardSection = brd
        .slice(pce.y, pce.y + len)
        .map(row => "#".repeat(offset) + row.slice(0, len - offset));
      return diffSections(boardSection, currentShape).map((sRow, idx) => {
        return sRow.slice(offset) + brd[pce.y + idx].slice(len - offset);
      });
    }
    if (pce.x + len > 10) {
      boardSection = brd.slice(pce.y, pce.y + len).map(row => {
        return row.slice(pce.x) + "#".repeat(pce.x + len - 10);
      });
      return diffSections(boardSection, currentShape).map((sRow, idx) => {
        return brd[pce.y + idx].slice(0, pce.x) + sRow.replace(/#/g, "");
      });
    }

    boardSection = brd.slice(pce.y, pce.y + len).map(row => {
      return row.slice(pce.x, pce.x + len);
    });
    if (diffSections(boardSection, currentShape) === null) debugger;
    return diffSections(boardSection, currentShape).map((sRow, idx) => {
      return (
        brd[pce.y + idx].slice(0, pce.x) +
        sRow +
        brd[pce.y + idx].slice(pce.x + len)
      );
    });
  })(board);

  const beginningArena = board.slice(0, pce.y);
  const middleArena = replacementRows;
  const endArena = board.slice(pce.y + len);
  return [...beginningArena, ...middleArena, ...endArena];
};
