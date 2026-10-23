"use strict";
const require_mergeObjects = require("./mergeObjects.cjs");
// src/utils/mergeModules.ts
const mergeModules = (...modules) => (cx) => modules.reduce((accu, curr) => require_mergeObjects.mergeObjects(accu, curr(cx)), {});
exports.mergeModules = mergeModules;
