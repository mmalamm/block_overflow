import willCollide from "./willCollide";
import setPieceAndUpdate from "./setPieceAndUpdate";
const shiftUp = state => {
  const { board, playerPiece: pce } = state;
  const { y } = pce;
  let tempY = y + 1;
  while (!willCollide(board, { ...pce, y: tempY })) {
    tempY++;
  }

  return setPieceAndUpdate({...state, playerPiece: { ...pce, y: tempY }})
};

export default shiftUp;
