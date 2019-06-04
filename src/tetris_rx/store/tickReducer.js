import { setPieceAndUpdate, willCollide } from "../helpers/";

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
