// A - rock, B - paper, C - scissors
// X - rock, Y - paper, Z - scissors
// 1 - rock, 2 - paper, 3 -scissors
// 0 - lost, 3 - draw, 6 - win

const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString("utf-8");
const rounds = input.split("\n");

const points = rounds.map((round) => {
  const opponentMove = round.split(" ")[0];
  let myMove = round.split(" ")[1];

  let score = 0;

  if (myMove === "X") {
    score += 1;
    myMove = "A";
  } else if (myMove === "Y") {
    score += 2;
    myMove = "B";
  } else if (myMove === "Z") {
    score += 3;
    myMove = "C";
  }

  if (opponentMove === myMove) {
    score += 3;
  } else if (
    !(opponentMove === "A" && myMove === "C") &&
    (opponentMove < myMove || (opponentMove === "C" && myMove === "A"))
  ) {
    score += 6;
  }

  return score;
});

const result = points.reduce((a, b) => a + b, 0);

console.log(result);

// SECOND PART
// X - lose, Y - draw, Z - win

const pointsPerLetter = {
  A: 1,
  B: 2,
  C: 3,
};
const opponentWinsCombo = {
  B: "A",
  A: "C",
  C: "B",
};
const myWinCombo = {
  A: "B",
  B: "C",
  C: "A",
};

const totalPoints = rounds.map((round) => {
  const opponentMove = round.split(" ")[0];
  let result = round.split(" ")[1];

  let score = 0;

  if (result === "X") {
    const myMove = opponentWinsCombo[opponentMove];
    score += pointsPerLetter[myMove];
  } else if (result === "Y") {
    score += 3 + pointsPerLetter[opponentMove];
  } else {
    const myMove = myWinCombo[opponentMove];
    score += pointsPerLetter[myMove];
    score += 6;
  }

  return score;
});

const result2 = totalPoints.reduce((a, b) => a + b, 0);

console.log(result2);
