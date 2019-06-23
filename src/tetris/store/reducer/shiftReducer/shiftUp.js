import willCollide from "../../../helpers/willCollide";
import setPieceAndUpdate from "../../../helpers/setPieceAndUpdate";
const shiftUp = state => {
  const { board, playerPiece: pce, score, level } = state;
  const { y } = pce;
  let tempY = y,
    i = 0;
  while (!willCollide(board, { ...pce, y: tempY })) {
    tempY++;
    i++;
  }

  return setPieceAndUpdate({
    ...state,
    playerPiece: { ...pce, y: tempY },
    score: score + i * (level + 1)
  });
};

export default shiftUp;
