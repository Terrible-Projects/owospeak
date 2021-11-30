import { checkLetter, switchFirst } from "./util";
import faces from "./faces";

/**
 *
 * @param {message} message - The message to convert
 * @param {Object} options - Options for converting the message
 * @param {boolean} options.stutter - Whether or not to add a chance to stutter
 * @param {boolean} options.tilde - Whether or not to add a tilde at the end of every message
 */
export = function (
  message: string,
  options: { stutter: boolean; tilde: boolean } = { stutter: true, tilde: true }
) {
  const args = message.split(" ");

  args.forEach(function (item, index) {
    let edit = item;

    if (
      new RegExp(
        "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
      ).test(edit)
    )
      return (args[index] = item);

    const replace = [
      { search: /[lr]/g, replace: "w" },
      { search: /[LR]/g, replace: "W" },
      { search: "ock", replace: "awk" },
      { search: "uck", replace: "ek" },
      { search: "qu", replace: "qw" },
      { search: /n(?=[oaui])/gi, replace: "$&y" },
      { search: /o(?=u)/gi, replace: "" },
      { search: "qu", replace: "kw" },
      { search: /c(?=[ckabdfgjlmnoprstuvwsz])/g, replace: "k" },
      { search: /c(?=[CKABDFGJLMNOPRSTUVWSZ])/g, replace: "K" },
      { search: /c(?=[iyIY])/g, replace: "s" },
      { search: /C(?=[iyIY])/g, replace: "S" },
      { search: /x(?=[aeiou])/gi, replace: "z" },
      { search: /(?<=[aeiou])x/gi, replace: "ks" },
      { search: /(?<=ex)(?=[ai])/gi, replace: "z" },
    ];

    replace.forEach(function (item, index) {
      if (typeof item.search === "string") {
        edit = edit
          .split(item.search.toUpperCase())
          .join(item.replace.toUpperCase());
        edit = edit
          .split(switchFirst(item.search))
          .join(switchFirst(item.replace));
        edit = edit.split(item.search).join(item.replace);
      } else {
        edit = edit.replace(item.search, item.replace);
      }
    });

    const firstChar = edit.charAt(0);
    const secondChar = edit.charAt(1);

    if (options.stutter) {
      if (
        checkLetter(firstChar) &&
        checkLetter(secondChar) &&
        checkLetter(edit.charAt(2))
      ) {
        let slice = 1;
        let newChar = firstChar;
        if (secondChar.toLowerCase() == "h") {
          newChar += secondChar;
          slice = 2;
        }
        if (Math.random() < 0.2) {
          newChar += "-" + newChar;
        }
        edit = newChar + edit.slice(slice);
      }
    }

    args[index] = edit;
  });
  let edit = args.join(" ");

  if (options.tilde) edit += "~";

  if (Math.random() < 0.5) edit += " " + faces();

  return edit;
};
