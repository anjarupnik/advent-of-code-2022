const fs = require("fs");

const input = fs.readFileSync("./crates.txt").toString("utf-8");
const steps = fs.readFileSync("./steps.txt").toString("utf-8");

const stacks = {};

const fillStacks = () => {
  for (let i = 1; i < 10; i++) {
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
};

const extractMoves = (step) => {
  return step
    .replace("move ", "")
    .replace("from ", "")
    .replace("to ", "")
    .split(" ")
    .map((num) => parseInt(num));
};

const getResult = () => {
  let result = "";

  Object.keys(stacks).map((key) => {
    const stack = stacks[key];
    const letter = stack[stack.length - 1] || "";

    result = result + letter;
  });

  return result;
};

fillStacks();

steps.split("\n").map((step) => {
  const [crates, stackOne, stackTwo] = extractMoves(step);

  for (let i = 0; i < crates; i++) {
    const stack = stacks[stackOne];

    const crateToMove = stack.splice(stack.length - 1, 1)[0];

    if (crateToMove) {
      stacks[stackTwo].push(crateToMove);
    }
  }
});

console.log(getResult());

// PART TWO
fillStacks();

steps.split("\n").map((step) => {
  const [crates, stackOne, stackTwo] = extractMoves(step);

  const stack = stacks[stackOne];

  const cratesToMove = stack.splice(stack.length - crates, crates);

  stacks[stackTwo].push(...cratesToMove);
});

console.log(getResult());
