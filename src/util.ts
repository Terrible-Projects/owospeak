export function random(choices: number) {
  if (Math.floor(Math.random() * choices) == 0) return true;
  return false;
}
export function checkLetter(testString: string) {
  return testString.length === 1 && testString.match(/[a-z]/i);
}
export function switchFirst(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
export function vowelTest(test: string) {
  return /^[aeiou]$/i.test(test);
}
