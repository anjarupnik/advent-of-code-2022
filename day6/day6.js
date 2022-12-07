const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString("utf-8");
const datastreamBuffer = input.split("");

let markerArray = [];

const testArray = () => {
  const duplicates = markerArray.filter(
    (item, index) => markerArray.indexOf(item) != index
  );

  return !duplicates.length;
};

const getMarker = (length) => {
  let markerIndex = 0;

  for (let i = 0; i < datastreamBuffer.length; i++) {
    if (markerArray.length === length) {
      markerArray.splice(0, 1);
    }

    markerArray.push(datastreamBuffer[i]);

    if (markerArray.length === length) {
      const isMarker = testArray();

      if (isMarker) {
        markerIndex = i + 1;
        break;
      }
    }
  }

  return markerIndex;
};

console.log(getMarker(4));
console.log(getMarker(14));
