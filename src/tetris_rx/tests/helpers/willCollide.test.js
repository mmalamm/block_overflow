import { createEmptyBoard, getShape } from '../../helpers/utils';

import willCollide from "../../helpers/willCollide";

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
  it("when piece is 2 units away from bottom edge of shape", () => {
    const mockBoard = createEmptyBoard();
    const mockPlayerPiece = {
      pieceName: "I",
      x: 4,
      y: 18,
      orientation: 0
    };

    expect(willCollide(mockBoard, mockPlayerPiece)).toBeFalsy();
  });
});
