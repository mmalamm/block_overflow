import { getShape } from "../../helpers/utils";
import diffSections from "../../helpers/diffSections";
import createBoardSection from "../../helpers/createBoardSection";

const shiftRight = state => {
  const { board, playerPiece: pce } = state;
  const { offset, x, y } = pce;
  const currentShape = getShape(pce);
  const len = currentShape.length;

  const boardSection = createBoardSection(board, {
    offset,
    x: x + 1,
    y,
    length: len
  });

  if (diffSections(boardSection, currentShape)) {
    return {
      ...state,
      playerPiece: {
        ...pce,
        offset: pce.offset ? pce.offset - 1 : 0,
        x: pce.offset ? 0 : pce.x + 1
      }
    };
  } else {
    return null;
  }
};
export default shiftRight;
