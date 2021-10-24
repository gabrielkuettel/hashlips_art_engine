const fs = require("fs");
const basePath = process.cwd();

let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`, "utf8");
let data = JSON.parse(rawdata);

const sortedData = data.sort(function (a, b) {
  return a.edition - b.edition;
});

fs.writeFileSync(
  "build/json/_metadata_sorted.json",
  JSON.stringify(sortedData, null, 2)
);
