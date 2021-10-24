"use strict";

const path = require("path");
const basePath = process.cwd();
const { startCreating, buildSetup } = require(path.join(
  basePath,
  "/src/main.ts"
));

(() => {
  buildSetup();
  startCreating();
})();
