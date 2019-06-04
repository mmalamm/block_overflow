import diffSections from "./diffSections";
import createBoardSection from "./createBoardSection";
import { getShape } from "./utils";

const rotationMapper = {
  CLOCKWISE: 1,
  COUNTER_CLOCKWISE: -1
};

const rotate = direction => state => {
  const pce = state.playerPiece;
  const brd = state.board;
  const currentShape = getShape(pce);
  const len = currentShape.length;
  const { offset, x, y } = pce;

  const newOrientation =
    (pce.orientation + rotationMapper[direction] < 0
      ? 3
      : pce.orientation + rotationMapper[direction]) % 4;

  const nextShape = getShape({
    ...pce,
    orientation: newOrientation
  });

  const boardSection = createBoardSection(brd, { offset, x, y, length: len });

  return diffSections(boardSection, nextShape)
    ? {
        ...state,
        playerPiece: {
          ...pce,
          orientation: newOrientation
        }
      }
    : null;
};

export const rotateClockwise = rotate("CLOCKWISE");
export const rotateCounterClockwise = rotate("COUNTER_CLOCKWISE");
