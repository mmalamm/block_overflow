import { createSelector } from "reselect";
import createNewBoard from "../../helpers/createNewBoard";
import { boardSelector, pieceSelector } from "./shared";

const mergeBoardSelector = createSelector(
  boardSelector,
  pieceSelector,
  createNewBoard
);

export default mergeBoardSelector;
