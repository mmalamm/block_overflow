import {
  createEmptyBoard,
  createNewBoard,
  willCollide,
  canShift
} from "../helpers";
import { getShape } from "../pieces";

describe("willCollide tests", () => {
  it("will collide when piece at bottom of board", () => {
    const emptyBoard = createEmptyBoard();
    for (let i = 0; i < 4; i++) {
      const yCoordinate =
        20 -
        getShape({ pieceName: "L", orientation: i }).filter(
          row => row.replace(/e/g, "").length
        ).length;
      const pieceAtBottom = {
        pieceName: "L",
        x: 4,
        y: yCoordinate,
        orientation: i
      };
      expect(willCollide(emptyBoard, pieceAtBottom)).toBeTruthy();
    }

    expect(
      willCollide(emptyBoard, { pieceName: "L", orientation: 0, x: 4, y: 17 })
    ).toBeFalsy();
  });

  it("will collide when piece overlaps with another piece", () => {
    const mockBoard = createEmptyBoard()
      .slice(0, 18)
      .concat([`eeeeeeleee`, `eeeellleee`]);
    const mockPlayerPiece = {
      pieceName: "Z",
      x: 4,
      y: 16,
      orientation: 0
    };

    expect(willCollide(mockBoard, mockPlayerPiece)).toBeTruthy();
  });
});

describe("createNewBoard scenarios", () => {
  it("will create new board when piece at bottom of board", () => {
    const emptyBoard = createEmptyBoard();
    const yCoordinate =
      20 -
      getShape({ pieceName: "L", orientation: 0 }).filter(
        row => row.replace(/e/g, "").length
      ).length;
    const pieceAtBottom = {
      pieceName: "L",
      x: 4,
      y: yCoordinate,
      orientation: 0
    };

    const expectedBoard = createEmptyBoard()
      .slice(0, yCoordinate)
      .concat([`eeeeeeleee`, `eeeellleee`]);

    expect(createNewBoard(emptyBoard, pieceAtBottom)).toEqual(expectedBoard);
  });

  it("will create new board when piece collides with another piece", () => {
    const pieceAtBottom = {
      pieceName: "Z",
      x: 4,
      y: 16,
      orientation: 0
    };

    const currentBoard = createEmptyBoard()
      .slice(0, 18)
      .concat([`eeeeeeleee`, `eeeellleee`]);

    const expectedBoard = createEmptyBoard()
      .slice(0, -4)
      .concat([`eeeezzeeee`, `eeeeezzeee`, `eeeeeeleee`, `eeeellleee`]);

    expect(createNewBoard(currentBoard, pieceAtBottom)).toEqual(expectedBoard);
  });
});

describe("can shift returns false at board walls", () => {
  test("returns false at right wall when piece orientation is at edge", () => {
    const emptyBoard = createEmptyBoard();
    const playerPiece = {
      pieceName: "L",
      x: 7,
      y: 8,
      orientation: 0
    };
    expect(canShift("RIGHT")(emptyBoard, playerPiece)).toBeFalsy();
  });
  test("returns true at right wall when piece orientation is not at edge", () => {
    const emptyBoard = createEmptyBoard();
    const rotatedPieceNotAtEdge = {
      pieceName: "L",
      x: 7,
      y: 8,
      orientation: 3
    };
    expect(canShift("RIGHT")(emptyBoard, rotatedPieceNotAtEdge)).toBeTruthy();
  });
  test("returns false at right wall when piece orientation right vertice is past edge", () => {
    const emptyBoard = createEmptyBoard();
    const rotatedPieceAtEdge = {
      pieceName: "L",
      x: 8,
      y: 8,
      orientation: 3
    };
    expect(canShift("RIGHT")(emptyBoard, rotatedPieceAtEdge)).toBeFalsy();
  });
});
