"use strict";

const fs = require("fs");
const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const layersDir = `${basePath}/layers`;

const maxEditionSize = () => {
  let maxEditionSize = 1;

  const layers = fs.readdirSync(layersDir);

  for (const element of layers) {
    maxEditionSize *= fs.readdirSync(layersDir + "/" + element).length;
  }

  return maxEditionSize;
};

console.log("You can generate a maximum of", maxEditionSize(), "unique images");

module.exports = { maxEditionSize };
