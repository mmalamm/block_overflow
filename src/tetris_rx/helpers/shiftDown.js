import willCollide from "./willCollide";
import setPieceAndUpdate from "./setPieceAndUpdate";
const shiftDown = state => {
  const { board, playerPiece: pce } = state;

  if (!willCollide(board, pce)) {
    return {
      ...state,
      playerPiece: {
        ...pce,
        y: pce.y + 1
      }
    };
  } else {
    return setPieceAndUpdate(state);
  }
};

export default shiftDown;
