import { createSelector } from "reselect";
import ghostBoardSelector from "./ghostBoard";
import { boardSelector, pieceSelector, insertPieceIntoBoard } from "./shared";

const mergeBoardSelector = createSelector(
  // ghostBoardSelector,
  boardSelector,
  pieceSelector,
  insertPieceIntoBoard
);

export default mergeBoardSelector;
