import React from "react";
import "./App.css";

import PIECES, { COLORS } from "./tetris_rx/pieces";

import styles from "./App.module.css";

export default function App() {
  return (
    <div className="App">
      {["I", "J", "L", "O", "S", "T", "Z"]
        .map(p => ({ name: p, ...PIECES[p] }))
        .map(pc => {
          const { name, shapes, color } = pc;
          return (
            <div key={name}>
              <h2 style={{ color }}>{name}</h2>
              <div className={styles.piece}>
                {shapes.map((s, idx) => (
                  <div className={styles.shape} key={idx}>
                    {s.map((r, idx) => (
                      <div key={idx} className={styles.row}>
                        {[...r.toUpperCase()].map((c, idx) => (
                          <div
                            key={idx}
                            className={styles.cell}
                            style={{ color: COLORS[c.toLowerCase()] }}
                          >
                            {c}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
