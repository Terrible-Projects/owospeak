import { random } from "./util";

export = () => {
  const faces: (
    | string
    | {
        left?: string;
        right?: string;
        face?: string;
        tilde?: true;
        blush?: true;
        stripe?: true;
      }
  )[] = [
    { left: ">", right: "<" },
    ">",
    "<",
    { face: "^", blush: true, tilde: true },
    { face: "-", tilde: true, stripe: true },
    { face: "~", tilde: true, stripe: true },
    { face: ".", blush: true, tilde: true },
    { face: ",", blush: true, tilde: true },
    { face: ";", blush: true },
    { face: "T", blush: true, stripe: true },
    { face: "Y", blush: true, stripe: true },
    { face: "O", tilde: true },
    { face: "U", tilde: true },
  ];

  const face = faces[Math.floor(Math.random() * faces.length)];

  let connector = "w";
  let blush = "";
  let end = "";

  if (typeof face != "string") {
    if (random(5)) {
      if (random(2) && !face.stripe) {
        connector = "-";
      } else if (!face.tilde) {
        connector = "~";
      }
    }

    if (random(5) && !face.blush) {
      blush = "//";
    }

    if (random(5)) {
      end = '"';
    }

    return `${face.left || face.face}${blush}${connector}${blush}${
      face.right || face.face
    }${end}`;
  } else {
    return `${face}w${face}`;
  }
};
