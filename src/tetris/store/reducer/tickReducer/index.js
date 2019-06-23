import willCollide from "../../../helpers/willCollide";
import setPieceAndUpdate from "../../../helpers/setPieceAndUpdate";

export default state => {
  const { board, playerPiece: pce, score, level } = state;
  if (willCollide(board, pce)) {
    return setPieceAndUpdate(state);
  } else {
    return {
      ...state,
      playerPiece: { ...pce, y: pce.y + 1 },
      score: score + (level + 1) * 1
    };
  }
};
