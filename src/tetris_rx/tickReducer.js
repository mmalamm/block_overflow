import createNewBoard from "./helpers/createNewBoard";
import willCollide from "./helpers/willCollide";

const bonusMap = [0, 10, 25, 45, 70];

export default state => {
  const { board, playerPiece, upcomingPieces, score } = state;
  if (willCollide(board, playerPiece)) {
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
      ...state,
      playerPiece: {
        pieceName: nextPieceName,
        x: 4,
        y: 0,
        orientation: 1,
        offset: 0
      },
      board: newBoard,
      upcomingPieces: newUpcomingPieces,
      score: newScore
    };
  } else {
    return {
      ...state,
      playerPiece: { ...playerPiece, y: playerPiece.y + 1 }
    };
  }
};
