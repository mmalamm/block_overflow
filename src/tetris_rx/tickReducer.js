import createNewBoard from "./helpers/createNewBoard";
import willCollide from "./helpers/willCollide";

export default state => {
  const { board, playerPiece, upcomingPieces } = state;
  if (willCollide(board, playerPiece)) {
    const newUpcomingPieces = upcomingPieces.slice();
    const nextPieceName = newUpcomingPieces.pop();
    if (!nextPieceName) debugger;
    return {
      ...state,
      playerPiece: {
        pieceName: nextPieceName,
        x: 4,
        y: 0,
        orientation: 1,
        offset: 0
      },
      board: createNewBoard(board, playerPiece),
      upcomingPieces: newUpcomingPieces
    };
  } else {
    return {
      ...state,
      playerPiece: { ...playerPiece, y: playerPiece.y + 1 }
    };
  }
};
