import React, { useState, useEffect } from "react";

import { mergeBoard } from "./helpers";

import styles from "./App.module.css";

import { COLORS } from "./tetris/pieces";

import Tetris from "./tetris";
import { getShape } from "./tetris/helpers/utils";

const emojis = {
  e: "◼",
  i: "🦋",
  j: "👖",
  l: "🍊",
  o: "🌝",
  s: "🍏",
  t: "🍆",
  z: "🍎",
  g: "⬛️"
};

let tetris = new Tetris(750);

// function Shape(props) {
//   const shape = getShape({ pieceName: props.letter, orientation: 0 });
//   return shape.map((row, idx) => {
//     return (
//       <div className={styles.row} key={idx}>
//         {shape.map(row => {
//           return row.split("").map((ltr, idx) => {
//             return (
//               <div
//                 key={idx}
//                 className={styles.cell}
//                 style={{ backgroundColor: COLORS[ltr] }}
//               >
//                 {/* {emojis[ltr]} */}
//               </div>
//             );
//           });
//         })}
//       </div>
//     );
//   });
// }

export default function App() {
  const [state, setState] = useState(tetris.getState());

  const { board, playerPiece, score, isStarted, level, upcomingPieces } = state;

  useEffect(() => {
    tetris.subscribe(setState);
    const keydownCallback = e => {
      // e.preventDefault();
      if (e.key === "Enter" && !tetris.getState().isStarted) {
        startGame();
        return;
      }
      tetris.pressKey(e);
    };
    document.addEventListener("keydown", keydownCallback);
    return () => {
      tetris = null;
      document.removeEventListener("keydown", keydownCallback);
    };
  }, []);

  // const renderUpcomingPieces = pcs => {
  //   return pcs.slice(-4).map(ltr => <Shape letter={ltr} />);
  // };

  const renderGameboard = () => {
    return (
      <div className={styles.arena}>
        {/* {renderUpcomingPieces(upcomingPieces)} */}
        {mergeBoard(board, playerPiece).map((row, idx) => (
          <div className={styles.row} key={idx}>
            {row.split("").map((ltr, idx) => {
              return (
                <div
                  key={idx}
                  className={styles.cell}
                  style={{ backgroundColor: COLORS[ltr] }}
                >
                  {/* {emojis[ltr]} */}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const startGame = () => {
    tetris.start();
  };

  return (
    <div className={styles.container}>
      {isStarted ? (
        renderGameboard()
      ) : (
        <button onClick={startGame}>start game</button>
      )}
      <h2 className={styles.score}>score: {score}</h2>
      <h2 className={styles.level}>level {level}</h2>
    </div>
  );
}
