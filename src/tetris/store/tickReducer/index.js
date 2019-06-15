import willCollide from '../helpers/willCollide'
import setPieceAndUpdate from '../helpers/setPieceAndUpdate'

// const checkIfIsOver = brd => {
//   if (brd[0].replace('e', '').length !== 0) return true;
//   return false;
// }

export default state => {
  const { board, playerPiece } = state;
  // if (checkIfIsOver(board)) return {
  //   ...state,
  //   isOver: true
  // }
  if (willCollide(board, playerPiece)) {
    return setPieceAndUpdate(state);
  } else {
    return {
      ...state,
      playerPiece: { ...playerPiece, y: playerPiece.y + 1 }
    };
  }
};
