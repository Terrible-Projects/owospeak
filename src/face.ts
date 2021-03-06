import { random } from "./util";

export default function face() {
  const faces: {
    left?: string;
    right?: string;
    face?: string;
    tilde?: true;
    blush?: true;
    stripe?: true;
  }[] = [
    { left: ">", right: "<" },
    { face: ">" },
    { face: "<" },
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

  if (!face.stripe && !face.tilde && random(5)) {
    if (Math.random() < 0.5) {
      connector = "-";
    } else {
      connector = "~";
    }
  } else if (!face.stripe || (!face.tilde && random(5))) {
    if (face.stripe) connector = "-";
    else connector = "~";
  }

  if (!face.blush && random(5)) {
    blush = "//";
  }

  if (random(5)) {
    end = '"';
  }

  return `${face.left || face.face}${blush}${connector}${blush}${
    face.right || face.face
  }${end}`;
}
