import { rotateClockwise } from "../../helpers/rotate";
import { createEmptyBoard } from "../../helpers/utils";

describe("rotate tests", () => {
  it("rotates at the bottom properly with 1 empty row under shape", () => {
    const inputState = {
      playerPiece: {
        pieceName: "J",
        x: 0,
        y: 18,
        orientation: 0,
        offset: 0
      },
      board: createEmptyBoard(),
      upcomingPieces: ["T", "O", "I", "L", "J", "L", "I", "T"],
      score: 0
    };
    expect(rotateClockwise(inputState)).toBeNull();
  });
  it("rotates at the bottom properly with 2 empty rows in shape", () => {
    const inputState = {
      playerPiece: {
        pieceName: "I",
        x: 0,
        y: 18,
        orientation: 0,
        offset: 0
      },
      board: createEmptyBoard(),
      upcomingPieces: ["T", "O", "I", "L", "J", "L", "I", "T"],
      score: 0
    };
    expect(rotateClockwise(inputState)).toBeNull();
  });
});
