import face from "./face";
import { random, replaceRegexMatchCase, addCharToRegexMatch } from "./util";

interface Options {
  /** Whether or not to add a chance to stutter */
  stutter: boolean;
  /** Whether or not to add a tilde at the end of every message */
  tilde: boolean;
}

/**
 * @param {message} message - The message to convert
 * @param {Object} options - Options for converting the message
 */
export function convert(
  message: string,
  options: Partial<Options> = { stutter: true, tilde: true }
) {
  const opts: Options = {
    stutter: true,
    tilde: true,
    ...options,
  };

  const inputArray = message.split(/\s+/);
  const inputArrayURLRemoved = inputArray.filter(
    (word) =>
      !word.match(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
      )
  );

  if (inputArrayURLRemoved.length <= 0) return message;

  let edited = inputArrayURLRemoved.join(" ");

  // Put Filters Here

  edited = edited.replace(/[lr]/g, "w");
  edited = edited.replace(/[LR]/g, "W");
  edited = replaceRegexMatchCase(/ock/gi, edited, "awk");
  edited = replaceRegexMatchCase(/uck/gi, edited, "ek");
  edited = replaceRegexMatchCase(/qu/gi, edited, "qw");
  edited = addCharToRegexMatch(/(?<=n)[oaui]/gi, edited, "y");
  edited = edited.replace(/o(?=u)/gi, "");
  edited = replaceRegexMatchCase(/qu/gi, edited, "kw");
  edited = replaceRegexMatchCase(/c(?=[eiy])/gi, edited, "s");
  edited = replaceRegexMatchCase(/c(?!h)/gi, edited, "k");
  edited = replaceRegexMatchCase(/(?<=[aeiou])x/gi, edited, "ks");
  edited = replaceRegexMatchCase(/x(?=[aeiou])/gi, edited, "z");
  edited = addCharToRegexMatch(/(?<=ex)[aiu]/gi, edited, "z");

  // End Filters

  if (opts.stutter) {
    let editedArray = edited.split(" ").map((x) => {
      if (x.length > 2 && /[a-z]{2,}.*/ && random(5)) {
        let charInsert = x[0];
        if (x[1] == "h") charInsert += "h";
        x = charInsert + "-" + x;
      }
      return x;
    });
    edited = editedArray.join(" ");
  }

  if (opts.tilde) edited += "~";

  if (Math.random() < 0.5) edited += " " + face();

  return edited;
}

export { face };
