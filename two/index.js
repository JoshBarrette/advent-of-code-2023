import { twoInput } from "./input.mjs";

const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

let count = 0;
const maximums = {
  r: 12,
  g: 13,
  b: 14,
};
let minimums = {
  r: 0,
  g: 0,
  b: 0,
};
function resetMinimums() {
  minimums = {
    r: 0,
    g: 0,
    b: 0,
  };
}

/**
 * @param {string[]} roll
 */
function parseOneRollPartOne(roll) {
  for (let i = 0; i < roll.length; i += 2) {
    if (roll[i] > maximums[roll[i + 1][0]]) {
      return true;
    }
  }

  return false;
}

/**
 * @param {string[]} roll
 */
function parseOneRollPartTwo(roll) {
  for (let i = 0; i < roll.length; i += 2) {
    if (parseInt(roll[i]) > minimums[roll[i + 1][0]]) {
      minimums[roll[i + 1][0]] = parseInt(roll[i]);
    }
  }
}

/**
 * @param {string} line
 */
function parseOneLinePartOne(line) {
  const splitArr = line.split(":");
  const gameID = parseInt(splitArr[0].split(" ")[1]);

  const rolls = splitArr[1].split(";");
  for (let i = 0; i < rolls.length; i++) {
    if (parseOneRollPartTwo(rolls[i].trim().split(" "))) {
      return;
    }
  }

  count += gameID;
}

/**
 * @param {string} line
 */
function parseOneLinePartTwo(line) {
  const splitArr = line.split(":");

  const rolls = splitArr[1].split(";");
  for (let i = 0; i < rolls.length; i++) {
    parseOneRollPartTwo(rolls[i].trim().split(" "));
  }

  count += minimums.r * minimums.g * minimums.b;
  resetMinimums();
}

function parseAll() {
  twoInput.split("\n").forEach((l) => parseOneLinePartTwo(l));
  console.log("count", count);
}

parseAll();
