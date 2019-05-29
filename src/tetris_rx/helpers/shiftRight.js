import { getShape } from "./utils";
import diffSections from "./diffSections";

const shiftRight = state => {
  const { board, playerPiece: pce } = state;
  const currentShape = getShape(pce);
  const len = currentShape.length;

  let boardSection;
  if (pce.x + len > 9) {
    // boardSection = board
    // .slice(pce.y, pce.y + len)
    // .map(row => row.slice(pce.x + 1) + "#".repeat(pce.x + len - 9));
    boardSection = board
      .slice(pce.y, pce.y + len)
      .map(row => row.slice(pce.x + 1) + "#".repeat(pce.x + len - 9));
    // debugger;
    if (diffSections(boardSection, currentShape)) {
      const newPlayerPiece = { ...pce, x: pce.x + 1 };
      return { ...state, playerPiece: newPlayerPiece };
    } else {
      return null;
    }
  }

  boardSection = board
    .slice(pce.y, pce.y + len)
    .map(row => row.slice(pce.x + 1, pce.x + 1 + len));
  // console.log(boardSection);
  // debugger;

  if (diffSections(boardSection, currentShape)) {
    return {
      ...state,
      playerPiece: {
        ...pce,
        offset: pce.offset ? pce.offset - 1 : 0,
        x: pce.x + 1
      }
    };
  } else {
    return null;
  }
};
export default shiftRight;
