import shiftRight from "../../store/reducer/shiftReducer/shiftRight";
import { createEmptyBoard } from "../../helpers/utils";
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
      offset: 0,
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
      offset: 0,
      orientation: 3
    };
    const newState = shiftRight({ board: emptyBoard, playerPiece });
    expect(newState.playerPiece).toEqual({ ...playerPiece, x: 8 });
  });
  test("returns offsetted piece state at right wall when piece orientation is not at its edge", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "J",
      x: 7,
      y: 8,
      offset: 0,
      orientation: 3
    };
    const newState = shiftRight({ board: emptyBoard, playerPiece });
    expect(newState.playerPiece).toEqual({ ...playerPiece, x: 8 });
  });
  test("blah blah", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "J",
      x: 7,
      y: 2,
      orientation: 3,
      offset: 0
    };
    const newState = shiftRight({ board: emptyBoard, playerPiece });
    expect(newState.playerPiece).toEqual({ ...playerPiece, x: 8 });
  });
  test("offsetted piece by left edge shifts right correctly", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "I",
      x: 0,
      y: 4,
      orientation: 1,
      offset: 1
    };
    const newState = shiftRight({ board: emptyBoard, playerPiece });
    expect(newState.playerPiece).toEqual({ ...playerPiece, offset: 0 });
  });
});
