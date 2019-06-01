import shiftUp from "../../helpers/shiftUp";
import { createEmptyBoard } from "../../helpers/utils";
describe("shiftUp tests", () => {
  it("sets piece correctly when shifts up", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "L",
      x: 4,
      y: 0,
      offset: 0,
      orientation: 1
    };
    const upcomingPieces = ["J", "T", "O", "I", "Z", "S"];
    const newState = shiftUp({
      board: emptyBoard,
      playerPiece,
      upcomingPieces,
      score: 0
    });

    const expectedNewState = {
      board: emptyBoard
        .slice(0, 17)
        .concat(["eeeeeleeee", "eeeeeleeee", "eeeeelleee"]),
      playerPiece: {
        pieceName: "S",
        x: 4,
        y: 0,
        orientation: 0,
        offset: 0
      },
      upcomingPieces: upcomingPieces.slice(0, upcomingPieces.length - 1),
      score: 0
    };
    expect(newState).toEqual(expectedNewState);
  });
});
