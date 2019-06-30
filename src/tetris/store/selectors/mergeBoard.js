import { createSelector } from "reselect";
import { boardSelector, pieceSelector, insertPieceIntoBoard } from "./shared";

const mergeBoardSelector = createSelector(
  boardSelector,
  pieceSelector,
  insertPieceIntoBoard
);

export default mergeBoardSelector;
