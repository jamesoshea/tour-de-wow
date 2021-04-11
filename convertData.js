const fs = require("fs");

const file = fs.readFileSync("./src/data/stage1.geojson");
const data = JSON.parse(file);

const { features } = data;

const points = features.map(({ properties, geometry }) => ({
  elevation: properties.ele,
  lat: geometry.coordinates[1],
  lng: geometry.coordinates[0],
  time: properties.time
}));

fs.writeFileSync(
  "./src/data/stageOnePoints.json",
  JSON.stringify(points, null, 2)
);
