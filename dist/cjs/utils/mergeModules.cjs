"use strict";
const require_mergeObjects = require("./mergeObjects.cjs");
//#region src/utils/mergeModules.ts
const mergeModules = (...modules) => (cx) => modules.reduce((accu, curr) => require_mergeObjects.mergeObjects(accu, curr(cx)), {});
//#endregion
exports.mergeModules = mergeModules;
