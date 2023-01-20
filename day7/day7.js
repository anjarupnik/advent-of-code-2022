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
  } else if (!command.includes("dir") && !command.includes("$ ls")) {
    const fileSize = parseInt(command.split(" ")[0]);

    if (!get(currentPath).files) {
      get(currentPath).files = [];
    }

    get(currentPath).files.push(fileSize);
  }
});

const MAX_SIZE = 100000;

const underMaxDirs = [];

const filterOutFiles = (arr) => arr.filter((key) => key !== "files");

const getAllFilesSum = (obj) => {
  let sum = 0;

  if (obj.files) {
    sum += obj.files.reduce((a, b) => a + b, 0);
  }

  const directories = filterOutFiles(Object.keys(obj));

  if (directories.length) {
    directories.map((dir) => {
      sum += getAllFilesSum(obj[dir]);
    });
  }

  return sum;
};

const checkFileSize = (obj) => {
  const mainLevelKeys = filterOutFiles(Object.keys(obj));

  if (!mainLevelKeys.length) {
    const sum = getAllFilesSum(obj);
    if (sum < MAX_SIZE) {
      underMaxDirs.push(sum);
    }
    return;
  }

  mainLevelKeys.map((mainLevelKey) => {
    const dir = obj[mainLevelKey];
    const sum = getAllFilesSum(dir);

    if (sum < MAX_SIZE) {
      underMaxDirs.push(sum);
    }

    const subDirs = filterOutFiles(Object.keys(dir));

    if (subDirs.length) {
      subDirs.map((subDir) => {
        checkFileSize({ [subDir]: dir[subDir] });
      });
    }
  });
};

checkFileSize(fileSystem);

const resultOne = underMaxDirs.reduce((a, b) => a + b, 0);
console.log(resultOne);
