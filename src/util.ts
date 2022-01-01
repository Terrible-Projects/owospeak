export function random(choices: number) {
  if (Math.floor(Math.random() * choices) == 0) return true;
  return false;
}
export function matchCase(original: string, edited: string) {
  while (original.length < edited.length) {
    original = original[0] + original;
  }
  while (original.length > edited.length) {
    original = original.slice(0, 1) + original.slice(2);
  }

  let output = "";
  original.split("").forEach((char, i) => {
    if (char.toLowerCase() == char) output += edited[i].toLowerCase();
    else output += edited[i].toUpperCase();
  });
  return output;
}
export function replaceRegexMatchCase(
  regex: RegExp,
  input: string,
  replacement: string
): string {
  let edited = input;
  let edited_strings: string[] = [];
  let match;
  while ((match = regex.exec(edited)) !== null) {
    const matchedString = edited.substring(
      match.index,
      match.index + match[0].length
    );
    if (edited_strings.includes(matchedString)) continue;
    edited_strings.push(matchedString);
    edited = edited
      .split(matchedString)
      .join(matchCase(matchedString, replacement));
  }
  return edited;
}
export function addCharToRegexMatch(
  regex: RegExp,
  input: string,
  char: string
) {
  let edited = input;
  let match;
  while ((match = regex.exec(edited)) !== null) {
    edited =
      edited.slice(0, match.index) +
      matchCase(edited[match.index], char) +
      edited.slice(match.index);
  }
  return edited;
}
