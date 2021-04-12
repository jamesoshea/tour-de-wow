const fs = require("fs");

const file = fs.readFileSync("./src/data/stage5.geojson");
const data = JSON.parse(file);

const { features } = data;

const points = features.map(({ properties, geometry }) => ({
  elevation: properties.ele,
  lat: geometry.coordinates[1],
  lng: geometry.coordinates[0],
  time: properties.time
}));

fs.writeFileSync(
  "./src/data/stageFivePoints.json",
  JSON.stringify(points, null, 2)
);
