import { createSelector } from "reselect";
import insertPieceIntoBoard from "../../helpers/insertPieceIntoBoard";
import { boardSelector, pieceSelector } from "./shared";

const mergeBoardSelector = createSelector(
  boardSelector,
  pieceSelector,
  insertPieceIntoBoard
);

export default mergeBoardSelector;
