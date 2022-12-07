const fs = require("fs");

const input = fs.readFileSync("./crates.txt").toString("utf-8");
const steps = fs.readFileSync("./steps.txt").toString("utf-8");

const stacks = {};

for (let i = 1; i < 4; i++) {
  stacks[i] = [];
}

input.split("\n").forEach((line) => {
  let start = 0;

  Object.keys(stacks).map((key) => {
    const crate = line.substr(start, 4).replace(/\s/g, "");
    start += 4;

    if (crate) {
      const crateLetter = crate.replace("[", "").replace("]", "");
      stacks[key].unshift(crateLetter);
    }
  });
});

steps.split("\n").forEach((step) => {
  const moves = step
    .replace(/\s/g, "")
    .replace("move", "")
    .replace("from", "")
    .replace("to", "");

  const [crates, stackOne, stackTwo] = moves
    .split("")
    .map((num) => parseInt(num));

  for (let i = 0; i < crates; i++) {
    const stack = stacks[stackOne];
    const crateToMove = stack?.splice(stack.length - 1, 1)[0];

    if (crateToMove) {
      stacks[stackTwo].push(crateToMove);
    }
  }
});

let result = "";

Object.keys(stacks).forEach((key) => {
  const stack = stacks[key];
  const letter = stack[stack.length - 1] || "";

  result = result + letter;
});

console.log(stacks);
