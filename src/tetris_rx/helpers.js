// import PIECES, { getShape } from "./pieces";
import { getShape } from "./helpers/utils";
import willCollide from "./helpers/willCollide";

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

// export const shiftLeft = state => {
//   const { board, playerPiece: pce } = state;
//   const currentShape = getShape(pce);
//   const len = currentShape.length;
//   const firstColOfShape = currentShape.map(row => row[0]);
//   // for wall hits
//   if (pce.x === 0) {
//     if (firstColOfShape.every(cell => cell === "e")) {
//       const newPlayerPiece = { ...pce, offset: 1 };
//       return { ...state, playerPiece: newPlayerPiece };
//     } else {
//       return null;
//     }
//   }
//   // for lateral piece collisions
//   const colLeftOfShape = board
//     .slice(pce.y, pce.y + len)
//     .map(row => row[pce.x - 1]);
//   for (let i = 0; i < len; i++) {
//     if (colLeftOfShape[i] !== "e" && firstColOfShape[i] !== "e") {
//       return null;
//     }
//   }

//   return {
//     ...state,
//     playerPiece: {
//       ...pce,
//       offset: 0,
//       x: pce.x - 1
//     }
//   };
// };

// export const shiftRight = state => {
//   const { board, playerPiece: pce } = state;
//   const currentShape = getShape(pce);
//   const len = currentShape.length;
//   const lastColOfShape = currentShape.map(row => row[len - 1]);
//   // for wall hits
//   if (pce.x + len > 9) {
//     if (lastColOfShape.every(cell => cell === "e")) {
//       const newPlayerPiece = { ...pce, x: pce.x + 1, offset: -1 };
//       return { ...state, playerPiece: newPlayerPiece };
//     } else {
//       return null;
//     }
//   }
//   // for lateral piece collisions
//   const colRightOfShape = board
//     .slice(pce.y, pce.y + len)
//     .map(row => row[pce.x + len]);
//   for (let i = 0; i < len; i++) {
//     if (colRightOfShape[i] !== "e" && lastColOfShape[i] !== "e") {
//       // debugger;
//       return null;
//     }
//   }

//   return {
//     ...state,
//     playerPiece: {
//       ...pce,
//       offset: 0,
//       x: pce.x + 1
//     }
//   };
// };
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
  ///
  // if (!Array.isArray(board)) debugger;
  // const newBoard = [...board];
  // // if (!PIECES[pce.pieceName]) debugger;
  // const currentShape = getShape(pce);
  // for (let i = 0; i < currentShape.length; i++) {
  //   if (newBoard[pce.y + i]) {
  //     newBoard[pce.y + i] =
  //       newBoard[pce.y + i].slice(0, pce.x) +
  //       currentShape[i] +
  //       newBoard[pce.y + i].slice(pce.x + currentShape[i].length);
  //   }
  // }
  // return newBoard;
  const currentShape = getShape(pce);
  const len = currentShape.length;
  const offset = pce.offset;

  const replacementRows = (brd => {
    return brd.slice(pce.y, pce.y + len).map((row, idx, arr) => {
      // console.log(arr);
      // debugger;

      if (offset > 0) {
        const cutOff = currentShape[idx].slice(offset);
        return cutOff + row.slice(cutOff.length - 1);
      }
      if (pce.x > 9 - len) {
        // debugger;
        const beginning = row.slice(0, pce.x);
        return beginning + currentShape[idx].slice(0, 10 - beginning.length);
      }
      return row.slice(0, pce.x) + currentShape[idx] + row.slice(pce.x + len);
    });
  })(board);

  const beginningArena = board.slice(0, pce.y);
  const middleArena = replacementRows;
  const endArena = board.slice(pce.y + len);
  console.log({ beginningArena, middleArena, endArena });
  // debugger;
  return [
    ...board.slice(0, pce.y),
    ...replacementRows,
    ...board.slice(pce.y + len)
  ];
};
