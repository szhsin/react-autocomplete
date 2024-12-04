import { mergeObjects } from './mergeObjects.mjs';

const mergeModules = (...modules) => cx => modules.reduce((accu, curr) => mergeObjects(accu, curr(cx)), {});

export { mergeModules };
