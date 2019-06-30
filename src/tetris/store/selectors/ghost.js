import { createSelector } from "reselect";
import { boardSelector, pieceSelector, ghostPieceSelector } from "./shared";

const ghostSelector = createSelector(
  boardSelector,
  pieceSelector,
  ghostPieceSelector
);

export default ghostSelector;
