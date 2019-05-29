import shiftLeft from "../../helpers/shiftLeft";
import { createEmptyBoard } from "../../helpers/utils";
describe("shiftLeft tests", () => {
  test("null when piece orientation is at edge", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "L",
      x: 0,
      y: 8,
      offset: 0,
      orientation: 0
    };
    expect(shiftLeft({ board: emptyBoard, playerPiece })).toBeNull();
  });
  test("returns null when colliding laterally with another piece", () => {
    const inputBoard = createEmptyBoard()
      .slice(0, 18)
      .concat([`eeeeeeleee`, `eeeellleee`]);
    const inputPlayerPiece = {
      pieceName: "S",
      x: 7,
      y: 17,
      orientation: 0
    };
    expect(
      shiftLeft({ board: inputBoard, playerPiece: inputPlayerPiece })
    ).toBeNull();
  });
  test("left wall when piece orientation is not at its edge", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "L",
      x: 0,
      y: 8,
      offset: 0,
      orientation: 1
    };
    const newState = shiftLeft({ board: emptyBoard, playerPiece });
    expect(newState.playerPiece).toEqual({ ...playerPiece, offset: 1 });
  });
  test("left wall when piece orientation is 2 cells away from its edge", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "I",
      x: 0,
      y: 8,
      offset: 0,
      orientation: 1
    };
    const newState = shiftLeft({ board: emptyBoard, playerPiece });
    expect(newState.playerPiece).toEqual({ ...playerPiece, offset: 1 });
  });
  test("left wall when piece orientation is 2 cells off the board", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "I",
      x: 0,
      y: 8,
      offset: 1,
      orientation: 1
    };
    const newState = shiftLeft({ board: emptyBoard, playerPiece });
    expect(newState.playerPiece).toEqual({ ...playerPiece, offset: 2 });
  });
  test("null when piece with empty spaces is up against left wall", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "I",
      x: 0,
      y: 8,
      offset: 1,
      orientation: 1
    };
    const newState = shiftLeft({ board: emptyBoard, playerPiece });
    expect(newState.playerPiece).toEqual({ ...playerPiece, offset: 2 });
  });
});
