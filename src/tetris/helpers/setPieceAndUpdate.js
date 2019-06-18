import createNewBoard from "./createNewBoard";

const bonusMap = [0, 10, 25, 45, 70];

const checkIfIsOver = (brd, pcs) => {
  if (brd[0].replace(/e/g, "").length) return true;
  return false;
};

export default (state) => {
  const { board, playerPiece, upcomingPieces, score } = state;
  const newUpcomingPieces = upcomingPieces.slice();
  const nextPieceName = newUpcomingPieces.pop();

  const tickedBoard = createNewBoard(board, playerPiece);

  const clearedBoard = tickedBoard.filter(row => row.includes("e"));

  const numRowsCleared = 20 - clearedBoard.length;

  const newBoard = [
    ...[...Array(numRowsCleared)].map(_ => "e".repeat(10)),
    ...clearedBoard
  ];

  const newScore = score + bonusMap[numRowsCleared];

  if (checkIfIsOver(newBoard, newUpcomingPieces)) {
    return {
      ...state,
      isStarted: false
    };
  }
  return {
    playerPiece: {
      pieceName: nextPieceName,
      x: 4,
      y: 0,
      orientation: 0,
      offset: 0
    },
    board: newBoard,
    upcomingPieces: newUpcomingPieces,
    score: newScore,
    isStarted: true
  };
};
