import { createEmptyBoard, shiftRight } from "../../helpers";
describe("shiftRight tests", () => {
  test("returns null at right wall when piece orientation is at edge", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "L",
      x: 7,
      y: 8,
      orientation: 0
    };
    expect(shiftRight({ board: emptyBoard, playerPiece })).toBeNull();
  });
  test("returns null when colliding laterally with another piece", () => {
    const inputBoard = createEmptyBoard()
      .slice(0, 18)
      .concat([`eeeeeeleee`, `eeeellleee`]);
    const inputPlayerPiece = {
      pieceName: "S",
      x: 4,
      y: 17,
      orientation: 0
    };
    expect(
      shiftRight({ board: inputBoard, playerPiece: inputPlayerPiece })
    ).toBeNull();
  });
  test("returns offsetted piece state at right wall when piece orientation is not at its edge", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "J",
      x: 7,
      y: 8,
      orientation: 3
    };
    const newState = shiftRight({ board: emptyBoard, playerPiece });
    expect(newState.playerPiece).toEqual({ ...playerPiece, x: 8, offset: -1 });
  });
});
