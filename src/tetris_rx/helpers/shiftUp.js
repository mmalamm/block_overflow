import willCollide from "./willCollide";
import createNewBoard from "./createNewBoard";
const bonusMap = [0, 10, 25, 45, 70];
const shiftUp = state => {
  const { board, playerPiece: pce, upcomingPieces, score } = state;
  const { y } = pce;
  let tempY = y + 1;
  while (!willCollide(board, { ...pce, y: tempY })) {
    tempY++;
  }

  const newUpcomingPieces = upcomingPieces.slice();
  const nextPieceName = newUpcomingPieces.pop();
  const tickedBoard = createNewBoard(board, { ...pce, y: tempY });
  const clearedBoard = tickedBoard.filter(row => row.includes("e"));
  const numRowsCleared = 20 - clearedBoard.length;
  const newBoard = [
    ...[...Array(numRowsCleared)].map(_ => "e".repeat(10)),
    ...clearedBoard
  ];
  const newScore = score + bonusMap[numRowsCleared];

  return {
    ...state,
    playerPiece: {
      pieceName: nextPieceName,
      x: 4,
      y: 0,
      orientation: 0,
      offset: 0
    },
    board: newBoard,
    upcomingPieces: newUpcomingPieces,
    score: newScore
  };
};

export default shiftUp;
