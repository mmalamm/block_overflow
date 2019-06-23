import tickReducer from "../../store/reducer/tickReducer";
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
      score: 0,
      level: 0
    };
    const expectedOutputState = {
      ...inputState,
      score: 1,
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

  it("end of game detection", () => {
    const playerPiece = {
      pieceName: "L",
      x: 4,
      y: 0,
      offset: 0,
      orientation: 1
    };
    const upcomingPieces = ["J", "T", "O", "I", "Z", "S"];
    const newState = tickReducer({
      board: [
        "eeeeeeeeee",
        "eeeeeeeeee",
        "eeeeeeeeee",
        "eeeeesseee",
        "eeeesseeee",
        "eeeeeteeee",
        "eeeettteee",
        "eeeeiiiiee",
        "eeeeesseee",
        "eeeesseeee",
        "eeeejeeeee",
        "eeeejjjeee",
        "eeeeooeeee",
        "eeeeooeeee",
        "eeeeeseeee",
        "eeeeesseee",
        "eeeejeseee",
        "eeeejjjeze",
        "leetoolzze",
        "lettoolzse"
      ],
      playerPiece,
      upcomingPieces,
      score: 0,
      level: 0,
      isStarted: true
    });

    const expectedNewState = {
      board: [
        "eeeeeleeee",
        "eeeeeleeee",
        "eeeeelleee",
        "eeeeesseee",
        "eeeesseeee",
        "eeeeeteeee",
        "eeeettteee",
        "eeeeiiiiee",
        "eeeeesseee",
        "eeeesseeee",
        "eeeejeeeee",
        "eeeejjjeee",
        "eeeeooeeee",
        "eeeeooeeee",
        "eeeeeseeee",
        "eeeeesseee",
        "eeeejeseee",
        "eeeejjjeze",
        "leetoolzze",
        "lettoolzse"
      ],
      playerPiece: {
        pieceName: "S",
        x: 4,
        y: 0,
        orientation: 0,
        offset: 0
      },
      upcomingPieces: upcomingPieces.slice(0, upcomingPieces.length - 1),
      score: 0,
      level: 0,
      isStarted: false
    };
    expect(newState).toEqual(expectedNewState);
  });
});
