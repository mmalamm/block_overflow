const PIECES = {
  T: {
    shapes: [
      ["ete", "ttt", "eee"],
      ["ete", "ett", "ete"],
      ["eee", "ttt", "ete"],
      ["ete", "tte", "ete"]
    ],
    color: "magenta"
  },
  Z: {
    shapes: [
      ["zze", "ezz", "eee"],
      ["eez", "ezz", "eze"],
      ["eee", "zze", "ezz"],
      ["eze", "zze", "zee"]
    ],
    color: "red"
  },
  S: {
    shapes: [
      ["ess", "sse", "eee"],
      ["ese", "ess", "ees"],
      ["eee", "ess", "sse"],
      ["see", "sse", "ese"]
    ],
    color: "lime"
  },
  I: {
    shapes: [
      ["eeee", "iiii", "eeee", "eeee"],
      ["eeie", "eeie", "eeie", "eeie"],
      ["eeee", "eeee", "iiii", "eeee"],
      ["eiee", "eiee", "eiee", "eiee"]
    ],
    color: "cyan"
  },
  O: {
    shapes: [...Array(4)].map(_ => ["oo", "oo"]),
    color: "yellow"
  },
  J: {
    shapes: [
      ["jee", "jjj", "eee"],
      ["ejj", "eje", "eje"],
      ["eee", "jjj", "eej"],
      ["eje", "eje", "jje"]
    ],
    color: "blue"
  },
  L: {
    shapes: [
      ["eel", "lll", "eee"],
      ["ele", "ele", "ell"],
      ["eee", "lll", "lee"],
      ["lle", "ele", "ele"]
    ],
    color: "orange"
  }
};
export const COLORS = Object.keys(PIECES).reduce(
  (a, l) => {
    const key = l.toLowerCase();
    return { ...a, [key]: PIECES[l].color };
  },
  { e: "#010101" }
);

export default PIECES;
