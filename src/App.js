import React, { useEffect, useState } from "react";
import { interval, fromEvent, merge } from "rxjs";
import { map } from "rxjs/operators";
import "./App.css";

const createRow = () => [...Array(10)].map(() => "a");

const createInitState = () => {
  return [...Array(20)].map(createRow);
};

export default function App() {
  const [board, setBoard] = useState(createInitState());
  const [keypress, setKeypress] = useState(null);
  useEffect(() => {
    const boardTick$ = interval(1000)
    .pipe(
      map(i => i % 20),
      map(j => {
        const copy = [...board.map(row => [...row])];
        copy[j][4] = "b";
        return copy;
      }),
    )
    const keypress$ = fromEvent(document, "keydown").subscribe(({ key }) => {

    })

    const game$ = merge(boardTick$);
    game$
      .subscribe(board => setBoard(board));
  }, []);
  
  return (
    <div className="App">
      {board.map((row, i) => (
        <div style={{ display: "flex" }} key={i}>
          {row.map((cell, j) => (
            <div style={{ color: cell === "b" ? "blue" : "#222", padding: '3px' }} key={j}>
              {cell}
            </div>
          ))}
        </div>
      ))}
      <h1>{keypress}</h1>
    </div>
  );
}
