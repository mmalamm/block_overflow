const e = "e",
  t = "t",
  z = "z",
  s = "s",
  i = "i",
  o = "o",
  j = "j",
  l = "l";

const arrOf = num => ltr => [...Array(num)].map(_ => ltr),
  arr4 = arrOf(4),
  arr3 = arrOf(3),
  eeee = arr4(e),
  iiii = arr4(i),
  eeie = [e, e, i, e],
  eiee = [e, i, e, e],
  ete = [e, t, e],
  ttt = arr3(t),
  eee = arr3(e),
  ett = [e, t, t],
  tte = [t, t, e];

const PIECES = {
  T: {
    shapes: [
      [
        ...ete,
        ...ttt,
        ...eee
      ],
      [...ete, ...ett, ...ete],
      [...eee, ...ttt, ...ete],
      [...ete, ...tte, ...ete]
    ]
  },
  Z: {
    shapes: [
      [
        ...zze,
        ...ezz,
        ...eee
      ],
      [
        ...eez,
        ...ezz,
        ...eze
      ],
      [
        ...eee,
        ...zze,
        ...ezz
      ],
      [
        ...eze,
        ...zze,
        ...zee
      ]
    ]
  },
  S: {
    shapes: [

    ]
  },
  I: {
    shapes: [
      [
        ...eeee,
        ...iiii,
        ...eeee,
        ...eeee
      ],
      [
        ...eeie,
        ...eeie,
        ...eeie,
        ...eeie
      ],
      [
        ...eeee,
        ...eeee,
        ...iiii,
        ...eeee
      ],
      [
        ...eiee,
        ...eiee,
        ...eiee,
        ...eiee
      ]
    ]
  },
  O: {},
  J: {},
  L: {
    shapes: [
      [...eeee, ...llll, ...eeee, ...eeee],
      [...eele, ...eele, ...eele, ...eele],
      [...eeee, ...eeee, ...llll, ...eeee],
      [...elee, ...elee, ...elee, ...elee]
    ]
  }
};
