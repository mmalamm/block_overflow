import createNewBoard from "./createNewBoard";

const bonusMap = [0, 10, 25, 45, 70];

export default ({ board, playerPiece, upcomingPieces, score }) => {
  const newUpcomingPieces = upcomingPieces.slice();
  const nextPieceName = newUpcomingPieces.pop();
  if (!nextPieceName) debugger;

  const tickedBoard = createNewBoard(board, playerPiece);

  const clearedBoard = tickedBoard.filter(row => row.includes("e"));

  const numRowsCleared = 20 - clearedBoard.length;

  const newBoard = [
    ...[...Array(numRowsCleared)].map(_ => "e".repeat(10)),
    ...clearedBoard
  ];

  const newScore = score + bonusMap[numRowsCleared];

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
    score: newScore
  };
}