import { mergeObjects } from './mergeObjects.js';

const mergeFeatures = (...features) => cx => features.reduce((accu, curr) => mergeObjects(accu, curr(cx)), {});

export { mergeFeatures };
