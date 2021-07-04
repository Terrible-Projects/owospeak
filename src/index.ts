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
      { search: "r", replace: "w" },
      { search: "l", replace: "w" },
      { search: "ock", replace: "awk" },
      { search: "uck", replace: "ek" },
      { search: "qu", replace: "qw" },
      { search: "no", replace: "nyo" },
      { search: "na", replace: "nya" },
      { search: "nu", replace: "nyu" },
      { search: "ni", replace: "nyi" },
      { search: "ou", replace: "u" },
      { search: "qu", replace: "kw" },
      { search: "ck", replace: "kk" },
      { search: "ce", replace: "se" },
      { search: "ci", replace: "si" },
      { search: "cy", replace: "sy" },
      { search: "ca", replace: "ka" },
      { search: "cb", replace: "kb" },
      { search: "cc", replace: "kk" },
      { search: "cd", replace: "kd" },
      { search: "cf", replace: "kf" },
      { search: "cg", replace: "kg" },
      { search: "cj", replace: "kj" },
      { search: "cl", replace: "kl" },
      { search: "cm", replace: "km" },
      { search: "cn", replace: "kn" },
      { search: "co", replace: "ko" },
      { search: "cp", replace: "kp" },
      { search: "cr", replace: "kr" },
      { search: "cs", replace: "ks" },
      { search: "ct", replace: "kt" },
      { search: "cu", replace: "ku" },
      { search: "cv", replace: "kv" },
      { search: "cw", replace: "kw" },
      { search: "cx", replace: "ks" },
      { search: "cz", replace: "kz" },
      { search: "qu", replace: "kw" },
      { search: "xz", replace: "za" },
      { search: "xe", replace: "ze" },
      { search: "xi", replace: "zi" },
      { search: "xo", replace: "zu" },
      { search: "xu", replace: "aks" },
      { search: "ax", replace: "eks" },
      { search: "ex", replace: "iks" },
      { search: "ix", replace: "oks" },
      { search: "ox", replace: "uks" },
      { search: "ux", replace: "egza" },
      { search: "exa", replace: "egzi" },
      { search: "exi", replace: "egzu" },
    ];

    replace.forEach(function (item, index) {
      edit = edit.split(item.search).join(item.replace);
      edit = edit
        .split(item.search.toUpperCase())
        .join(item.replace.toUpperCase());
      edit = edit
        .split(switchFirst(item.search))
        .join(switchFirst(item.replace));
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
