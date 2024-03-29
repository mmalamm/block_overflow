import { createEmptyBoard } from "../../helpers/utils";
import { getShape } from "../../helpers/utils";
import insertPieceIntoBoard from "../../helpers/insertPieceIntoBoard";

describe("insertPieceIntoBoard scenarios", () => {
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
      orientation: 0,
      offset: 0
    };

    const expectedBoard = createEmptyBoard()
      .slice(0, yCoordinate)
      .concat([`eeeeeeleee`, `eeeellleee`]);

    expect(insertPieceIntoBoard(emptyBoard, pieceAtBottom)).toEqual(expectedBoard);
  });

  it("will create new board when piece collides with another piece", () => {
    const pieceAtBottom = {
      pieceName: "Z",
      x: 4,
      y: 16,
      orientation: 0,
      offset: 0
    };

    const currentBoard = createEmptyBoard()
      .slice(0, 18)
      .concat([`eeeeeeleee`, `eeeellleee`]);

    const expectedBoard = createEmptyBoard()
      .slice(0, -4)
      .concat([`eeeezzeeee`, `eeeeezzeee`, `eeeeeeleee`, `eeeellleee`]);

    expect(insertPieceIntoBoard(currentBoard, pieceAtBottom)).toEqual(expectedBoard);
  });
  it("will create new board when piece is offsetted on right corner", () => {
    const pieceAtBottom = {
      pieceName: "J",
      x: 8,
      y: 17,
      orientation: 3,
      offset: 0
    };

    const currentBoard = createEmptyBoard();

    const expectedBoard = createEmptyBoard()
      .slice(0, -3)
      .concat([`eeeeeeeeej`, `eeeeeeeeej`, `eeeeeeeejj`]);

    expect(insertPieceIntoBoard(currentBoard, pieceAtBottom)).toEqual(expectedBoard);
  });
  it("will create new board when piece has empty row at the bottom", () => {
    const pieceAtBottom = {
      pieceName: "S",
      x: 4,
      y: 18,
      orientation: 0,
      offset: 0
    };

    const currentBoard = createEmptyBoard()
      .slice(0, -4)
      .concat([...Array(4)].map(_ => `eeeeeeeeei`));

    const expectedBoard = createEmptyBoard()
      .slice(0, -4)
      .concat([`eeeeeeeeei`, `eeeeeeeeei`, `eeeeesseei`, `eeeesseeei`]);

    expect(insertPieceIntoBoard(currentBoard, pieceAtBottom)).toEqual(expectedBoard);
  });
  it("weird case I'm trying to figure out", () => {
    const pieceToCollide = {
      pieceName: "J",
      x: 0,
      y: 11,
      orientation: 1,
      offset: 1
    };

    const currentBoard = [
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeooeeeeee",
      "eeooelllee",
      "eetttlssee",
      "eootzsseee",
      "eoozzijjje",
      "essztillje",
      "sszttijlie",
      "izzstijlie",
      "izzssjjlie",
      "izztsoolie",
      "iztttoolle"
    ];

    const expectedBoard = [
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeooeeeeee",
      "eeooelllee",
      "jjtttlssee",
      "jootzsseee",
      "joozzijjje",
      "essztillje",
      "sszttijlie",
      "izzstijlie",
      "izzssjjlie",
      "izztsoolie",
      "iztttoolle"
    ];

    expect(insertPieceIntoBoard(currentBoard, pieceToCollide)).toEqual(expectedBoard);
  });
  it("weird bug i found", () => {
    const pieceToCollide = {
      pieceName: "Z",
      x: 5,
      y: 8,
      orientation: 1,
      offset: 0
    };

    const currentBoard = [
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeetee",
      "eeeeeettee",
      "eeeesestle",
      "eeeessssle",
      "eeeeeszsll",
      "eooeizzjjj",
      "eooeizsstj",
      "elllissttj",
      "elssizootj",
      "esslzzoojj"
    ];

    const expectedBoard = [
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeezee",
      "eeeeeezzee",
      "eeeeeeztee",
      "eeeeeettee",
      "eeeesestle",
      "eeeessssle",
      "eeeeeszsll",
      "eooeizzjjj",
      "eooeizsstj",
      "elllissttj",
      "elssizootj",
      "esslzzoojj"
    ];

    expect(insertPieceIntoBoard(currentBoard, pieceToCollide)).toEqual(expectedBoard);
  });
  it("LATEST BUG", () => {
    const pieceToCollide = {
      pieceName: 'S',
      x: 2,
      y: 10,
      orientation: 0,
      offset: 0
    };

    const currentBoard = [
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "ooeezeeeee",
      "ooezzeeeee",
      "lllzteeeei",
      "lsstteeeei",
      "sszztejeli",
      "ooszzejeli",
      "lesizztssi",
      "istlllejzi",
      "tsslooezzi"
    ];

    const expectedBoard = [
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeeeeeeeee",
      "eeesseeeee",
      "oosszeeeee",
      "ooezzeeeee",
      "lllzteeeei",
      "lsstteeeei",
      "sszztejeli",
      "ooszzejeli",
      "lesizztssi",
      "istlllejzi",
      "tsslooezzi"
    ];

    expect(insertPieceIntoBoard(currentBoard, pieceToCollide)).toEqual(expectedBoard);
  });
});
