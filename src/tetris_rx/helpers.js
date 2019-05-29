// import PIECES, { getShape } from "./pieces";
import { getShape } from "./helpers/utils";
import willCollide from "./helpers/willCollide";
import diffSections from "./helpers/diffSections";

export const createEmptyBoard = () => [...Array(20)].map(row => "e".repeat(10));

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
export const shiftDown = state => {
  const { board, playerPiece: pce } = state;

  if (!willCollide(board, pce)) {
    return {
      ...state,
      playerPiece: {
        ...pce,
        y: pce.y + 1
      }
    };
  } else {
    return { ...state };
  }
};

export const createNewBoard = (board, pce) => {
  const newBoard = [...board];
  const currentShape = getShape(pce);
  const len = currentShape.length;
  for (let i = 0; i < len; i++) {
    const newY = i + pce.y;
    if (!newBoard[newY]) continue;

    let newRow = board[newY].slice(0, pce.x);
    for (let j = 0; j < currentShape[i].length; j++) {
      if (currentShape[i][j] === "e") {
        newRow += board[newY][pce.x + j] || "";
      } else if (board[newY][pce.x + j] === "e") {
        newRow += currentShape[i][j];
      }
    }
    newRow += board[newY].slice(pce.x + len);
    newBoard[newY] = newRow;
  }
  return newBoard;
};

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
