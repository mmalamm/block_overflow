import { getShape } from "./utils";
import diffSections from "./diffSections";

const shiftLeft = state => {
  const { board, playerPiece: pce } = state;
  const currentShape = getShape(pce);
  const len = currentShape.length;
  let boardSection;
  if (pce.x === 0) {
    if (pce.offset === 0) {
      boardSection = board
        .slice(pce.y, pce.y + len)
        .map(row => `#${row.slice(0, len - 1)}`);
      if (diffSections(boardSection, currentShape)) {
        const newPlayerPiece = { ...pce, offset: 1 };
        return { ...state, playerPiece: newPlayerPiece };
      } else {
        return null;
      }
    }

    if (pce.offset === 1) {
      boardSection = board.slice(pce.y, pce.y + len).map(row => `##${row[0]}`);
      if (diffSections(boardSection, currentShape)) {
        const newPlayerPiece = { ...pce, offset: 2 };
        return { ...state, playerPiece: newPlayerPiece };
      } else {
        return null;
      }
    }

    if (pce.offset === 2) {
      return null;
    }
  }

  boardSection = board
    .slice(pce.y, pce.y + len)
    .map(row => row.slice(pce.x - 1, pce.x - 1 + len));

  if (diffSections(boardSection, currentShape)) {
    return {
      ...state,
      playerPiece: {
        ...pce,
        offset: 0,
        x: pce.x - 1
      }
    };
  } else {
    return null;
  }
};
export default shiftLeft;
