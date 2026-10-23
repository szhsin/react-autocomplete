import { mergeObjects } from "./mergeObjects.mjs";
// src/utils/mergeModules.ts
const mergeModules = (...modules) => (cx) => modules.reduce((accu, curr) => mergeObjects(accu, curr(cx)), {});
export { mergeModules };
