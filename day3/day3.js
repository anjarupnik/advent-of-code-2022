const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString("utf-8");
const rucksacks = input.split("\n");

const lowerCaseAlphabet = [...Array(26)].map((_, i) =>
  String.fromCharCode(97 + i)
);
const upperCaseAlpahabet = lowerCaseAlphabet.map((letter) =>
  letter.toUpperCase()
);
const priorities = [...lowerCaseAlphabet, ...upperCaseAlpahabet];

const prioritiesPerRucksak = rucksacks.map((rucksack) => {
  const firstCompartment = rucksack.slice(0, rucksack.length / 2);
  const secondCompartment = rucksack.slice(rucksack.length / 2);

  let duplicatedItem;

  for (let i = 0; i < firstCompartment.length; i++) {
    const letter = firstCompartment.charAt(i);
    if (secondCompartment.includes(letter)) {
      duplicatedItem = letter;
    }
  }

  return priorities.findIndex((letter) => letter === duplicatedItem) + 1;
});

const result = prioritiesPerRucksak.reduce((a, b) => a + b, 0);

console.log(result);

// SECOND PART
const groups = [];

while (rucksacks.length > 0) {
  groups.push(rucksacks.splice(0, 3));
}

const badgesPrioprities = groups.map((group) => {
  const badge = group[0]
    .split("")
    .filter((letter) => group[1].includes(letter) && group[2].includes(letter));

  return priorities.findIndex((letter) => letter === badge[0]) + 1;
});

const result2 = badgesPrioprities.reduce((a, b) => a + b, 0);
console.log(result2);
