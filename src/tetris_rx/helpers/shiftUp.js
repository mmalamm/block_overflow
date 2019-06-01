const shiftUp = ({
  board,
  playerPiece: { pieceName, x, y, orientation, offset },
  upcomingPieces,
  score
}) => {
  return {
    board,
    playerPiece: { pieceName, x, y, orientation, offset },
    upcomingPieces,
    score
  };
};

export default shiftUp;
