import tickReducer from "../../tickReducer";
describe("ticks correctly", () => {
  it("ticks right when offset of playerPiece is 2", () => {
    const inputState = {
      playerPiece: {
        pieceName: "I",
        x: 0,
        y: 13,
        orientation: 1,
        offset: 2
      },
      board: [
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
        "eeeeeeeeee",
        "eeeeeeeeee",
        "eeeeeeeeee",
        "eeeeeeeeee",
        "eeeeeeeeee",
        "eeeeesszee",
        "ejjjsszzej",
        "eoojelzssj",
        "eoolllssjj"
      ],
      upcomingPieces: ["T", "O", "I", "L", "J", "L", "I", "T"],
      score: 0
    };
    const expectedOutputState = {
      ...inputState,
      playerPiece: {
        pieceName: "I",
        x: 0,
        y: 14,
        orientation: 1,
        offset: 2
      }
    };
    expect(tickReducer(inputState)).toEqual(expectedOutputState);
  });
});
