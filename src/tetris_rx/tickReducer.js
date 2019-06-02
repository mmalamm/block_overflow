import setPieceAndUpdate from "./helpers/setPieceAndUpdate";
import willCollide from "./helpers/willCollide";


export default state => {
  const { board, playerPiece } = state;
  if (willCollide(board, playerPiece)) {
    return setPieceAndUpdate(state);
  } else {
    return {
      ...state,
      playerPiece: { ...playerPiece, y: playerPiece.y + 1 }
    };
  }
};
