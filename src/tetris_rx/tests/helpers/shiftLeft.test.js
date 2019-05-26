import { createEmptyBoard, shiftLeft } from "../../helpers";
describe("shiftLeft tests", () => {
  test("returns null at right wall when piece orientation is at edge", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "L",
      x: 0,
      y: 8,
      orientation: 0
    };
    expect(shiftLeft({ board: emptyBoard, playerPiece })).toBeNull();
  });
  test('returns null when colliding laterally with another piece', () => {
    const inputBoard = createEmptyBoard()
      .slice(0, 18)
      .concat([`eeeeeeleee`, `eeeellleee`]);
    const inputPlayerPiece = {
      pieceName: 'S',
      x: 7,
      y: 17,
      orientation: 0
    }
    expect(shiftLeft({ board: inputBoard, playerPiece: inputPlayerPiece })).toBeNull();
  })
  test("returns offsetted piece state at right wall when piece orientation is not at its edge", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "L",
      x: 0,
      y: 8,
      orientation: 1
    };
    const newState = shiftLeft({ board: emptyBoard, playerPiece });
    expect(newState.playerPiece).toEqual({ ...playerPiece, offset: 1 });
  });
});