const fs = require("fs");

// PART 1
const input = fs.readFileSync("./input.txt").toString("utf-8");
const caloriesPerElf = input.split(/\n\s*\n/);

const calculatedCalories = caloriesPerElf.map((input) => {
  const totalCal = input
    .split("\n")
    .reduce((a, b) => parseInt(a) + parseInt(b), 0);

  return totalCal;
});

const getMostCalories = (input) => {
  return input.reduce((a, b) => Math.max(a, b), -Infinity);
};

console.log(getMostCalories(calculatedCalories));

// PART 2
const topThree = [];

const getTopThree = (input) => {
  if (topThree.length < 3) {
    const highestCal = getMostCalories(input);
    topThree.push(highestCal);
    const newArray = input.filter((cal) => cal !== highestCal);

    getTopThree(newArray);
  }
};

getTopThree(calculatedCalories);

console.log(topThree.reduce((a, b) => a + b, 0));
