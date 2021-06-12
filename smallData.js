const fs = require("fs");

const days = ["One", "Two", "Three", "Four", "Five"];

for (let i = 0; i < 5; i++) {
  const points = require(`./src/data/stage${days[i]}Points.json`);
  const lessPoints = [];
  for (let counter = 0; counter < points.length; counter++) {
    if (counter % 10 === 0) {
      lessPoints.push(points[counter]);
    }
  }
  console.log(lessPoints);
  fs.writeFileSync(
    `./src/data/stage${days[i]}PointsSmall.json`,
    JSON.stringify(lessPoints, null, 2)
  );
}
