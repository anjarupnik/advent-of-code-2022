const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString("utf-8");
const commands = input.split("\n");

const fileSystem = {};
let currentPath = [];

const get = (path) => {
  let result = fileSystem;
  for (const key of path) {
    result = result[key];
  }

  return result;
};

const setPath = (command) => {
  const directory = command.split(" ")[2];

  if (directory === "/") {
    currentPath = [];
  } else if (directory === "..") {
    currentPath.splice(currentPath.length - 1, 1);
  } else {
    const prevPathDir = get(currentPath);

    if (!prevPathDir[directory]) {
      prevPathDir[directory] = {};
    }

    currentPath.push(directory);
  }
};

commands.forEach((command) => {
  if (command.includes("$ cd")) {
    setPath(command);
    console.log(fileSystem);
  } else {
    // sort the files
  }
});
