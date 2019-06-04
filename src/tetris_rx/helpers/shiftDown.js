import willCollide from "./willCollide";
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
    return state;
  }
};

export default shiftDown;
