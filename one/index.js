import { inputLines } from "./input.mjs";

const nums = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const numChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let tracker = [0, 0, 0, 0, 0, 0, 0, 0, 0];
function resetTracker() {
  tracker = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function addAll() {
  let count = 0;
  const arrs = inputLines.split("\n");
  arrs.forEach((a) => (count += getOne(a)));

  console.log("count", count);
}

function parseLeft(currentChar) {
  for (let trackerIdx = 0; trackerIdx < 9; trackerIdx++) {
    if (currentChar == nums[trackerIdx][tracker[trackerIdx]]) {
      tracker[trackerIdx]++;

      if (tracker[trackerIdx] == nums[trackerIdx].length) {
        return numChars[trackerIdx];
      }
    } else if (currentChar == nums[trackerIdx][0]) {
      tracker[trackerIdx] = 1;
    } else {
      tracker[trackerIdx] = 0;
    }
  }

  return -1;
}

function parseRight(currentChar) {
  for (let trackerIdx = tracker.length - 1; trackerIdx >= 0; trackerIdx--) {
    if (
      currentChar ==
      nums[trackerIdx][nums[trackerIdx].length - tracker[trackerIdx] - 1]
    ) {
      tracker[trackerIdx]++;
      if (tracker[trackerIdx] == nums[trackerIdx].length) {
        return numChars[trackerIdx];
      }
    } else if (currentChar == nums[trackerIdx][nums[trackerIdx].length - 1]) {
      tracker[trackerIdx] = 1;
    } else {
      tracker[trackerIdx] = 0;
    }
  }

  return -1;
}

/**
 * Parses a single line
 * @param {string} line
 * @returns {number}
 */
function getOne(line) {
  let left, right, ret;

  for (let i = 0; i < line.length; i++) {
    if (line[i] >= "0" && line[i] <= "9") {
      left = line[i];
      break;
    }

    ret = parseLeft(line[i]);
    if (ret != -1) {
      left = ret;
      break;
    }
  }

  resetTracker();

  for (let i = line.length; i >= 0; i--) {
    if (line[i] >= "0" && line[i] <= "9") {
      right = line[i];
      break;
    }

    ret = parseRight(line[i]);
    if (ret != -1) {
      right = ret;
      break;
    }
  }

  resetTracker();
  return parseInt(left + right);
}

addAll();
