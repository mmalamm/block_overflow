import { getShape, createEmptyBoard } from "./helpers/utils";
import diffSections from "./helpers/diffSections";

const { I, S, J, L, O, T, Z } = [..."IJLOSTZ"].reduce(
  (a, l) => ({ ...a, [l]: l }),
  {}
);

export const createInitalState = () => {
  return {
    playerPiece: { pieceName: J, x: 4, y: 0, orientation: 3, offset: 0 },
    board: createEmptyBoard(),
    upcomingPieces: [T, I, S, J, O, Z, L, S],
    score: 0
  };
};
export const createInitalState2 = () => {
  return {
    playerPiece: {
      pieceName: 'J',
      x: 0,
      y: 8,
      orientation: 1,
      offset: 1
    },
    board: [
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeooeeeeee',
      'eeooelllee',
      'eetttlssee',
      'eootzsseee',
      'eoozzijjje',
      'essztillje',
      'sszttijlie',
      'izzstijlie',
      'izzssjjlie',
      'izztsoolie',
      'iztttoolle'
    ],
    upcomingPieces: [T, O, I, L, J, L, I, T],
    score: 0
  };
};

export const createInitalState3 = () => {
  return {
    playerPiece: {
      pieceName: "I",
      x: 4,
      y: 0,
      offset: 0,
      orientation: 1
    },
    board: createEmptyBoard(),
    upcomingPieces: "IJLOSTZ".repeat(100).split(""),
    score: 0
  };
};

export const mergeBoard = (board, pce) => {
  const currentShape = getShape(pce);
  if (!currentShape) debugger;
  const len = currentShape.length;
  const offset = pce.offset;

  const replacementRows = (brd => {
    let boardSection;
    if (offset > 0) {
      boardSection = brd
        .slice(pce.y, pce.y + len)
        .map(row => "#".repeat(offset) + row.slice(0, len - offset));
      if (!diffSections(boardSection, currentShape)) debugger;
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
  console.log({ beginningArena, middleArena, endArena });
  return [
    ...board.slice(0, pce.y),
    ...replacementRows,
    ...board.slice(pce.y + len)
  ];
};
