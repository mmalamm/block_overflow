import diffSections from "./diffSections";
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
  const offset = pce.offset;

  const newOrientation =
    (pce.orientation + rotationMapper[direction] < 0
      ? 3
      : pce.orientation + rotationMapper[direction]) % 4;

  const nextShape = getShape({
    ...pce,
    orientation: newOrientation
  });

  let boardSection;
  if (offset > 0) {
    boardSection = brd
      .slice(pce.y, pce.y + len)
      .map(row => "#".repeat(offset) + row.slice(0, len - offset));
  } else if (pce.x + len > 10) {
    boardSection = brd.slice(pce.y, pce.y + len).map(row => {
      return row.slice(pce.x) + "#".repeat(pce.x + len - 10);
    });
  } else {
    boardSection = brd.slice(pce.y, pce.y + len).map(row => {
      return row.slice(pce.x, pce.x + len);
    });
  }
  while (boardSection.length < len) {
    boardSection.push("#".repeat(len));
  }
  return diffSections(boardSection, nextShape)
    ? {
        ...state,
        playerPiece: {
          ...pce,
          orientation: newOrientation
        }
      }
    : null;
  // if (diffSections(boardSection, getShape({ ...pce, orientation: (pce.orientation + 1) % 4 })))
};

export const rotateClockwise = rotate("CLOCKWISE");
export const rotateCounterClockwise = rotate("COUNTER_CLOCKWISE");
