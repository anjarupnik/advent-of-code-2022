const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString("utf-8");
const pairs = input.split("\n");

const getNumbers = (range) => {
  const start = parseInt(range.split("-")[0]);
  const end = parseInt(range.split("-")[1]);

  const numbers = [];

  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }

  return numbers;
};

let pairsWithOverlap = 0;

const isContainingFullRange = (arr1, arr2) => {
  return arr1.every((num) => {
    return arr2.includes(num);
  });
};

pairs.forEach((pair) => {
  const [firstElf, secondElf] = pair.split(",");
  const firstElfSection = getNumbers(firstElf);
  const secondElfSection = getNumbers(secondElf);

  if (
    isContainingFullRange(firstElfSection, secondElfSection) ||
    isContainingFullRange(secondElfSection, firstElfSection)
  ) {
    pairsWithOverlap += 1;
  }
});

console.log(pairsWithOverlap);

// PART TWO
let pairsWithOverlap2 = 0;

const isOverlapping = (arr1, arr2) => {
  return arr1.some((num) => {
    return arr2.includes(num);
  });
};

pairs.forEach((pair) => {
  const [firstElf, secondElf] = pair.split(",");
  const firstElfSection = getNumbers(firstElf);
  const secondElfSection = getNumbers(secondElf);

  if (
    isOverlapping(firstElfSection, secondElfSection) ||
    isOverlapping(secondElfSection, firstElfSection)
  ) {
    pairsWithOverlap2 += 1;
  }
});

console.log(pairsWithOverlap2);
