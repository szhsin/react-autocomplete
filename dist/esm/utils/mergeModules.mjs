import { mergeObjects } from "./mergeObjects.mjs";
//#region src/utils/mergeModules.ts
const mergeModules = (...modules) => (cx) => modules.reduce((accu, curr) => mergeObjects(accu, curr(cx)), {});
//#endregion
export { mergeModules };
