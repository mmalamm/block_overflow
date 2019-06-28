import { createSelector } from "reselect";
import willCollide from "../../helpers/willCollide";
import { boardSelector, pieceSelector } from "./shared";

const ghostPieceSelector = (board, pce) => {
  const { y } = pce;
  let tempY = y;
  while (!willCollide(board, { ...pce, y: tempY })) {
    tempY++;
  }
  return {
    ...pce,
    y: tempY,
    ghost: true
  };
};

const ghostSelector = createSelector(
  boardSelector,
  pieceSelector,
  ghostPieceSelector
);

export default ghostSelector;
