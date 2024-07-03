import { mergeObjects } from './mergeObjects.js';

const mergeModules = (...modules) => cx => modules.reduce((accu, curr) => mergeObjects(accu, curr(cx)), {});

export { mergeModules };
