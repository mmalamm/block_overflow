import willCollide from "../../../helpers/willCollide";
export default state => {
  const { board, playerPiece: pce, score, level } = state;

  if (!willCollide(board, pce)) {
    return {
      ...state,
      playerPiece: {
        ...pce,
        y: pce.y + 1
      },
      score: score + 1 * (level + 1)
    };
  } else {
    return state;
  }
};
