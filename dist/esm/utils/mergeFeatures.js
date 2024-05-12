import { mergeObjects } from './mergeObjects.js';

const mergeFeatures = (...features) => cx => features.reduce((accu, curr) => mergeObjects(accu(cx), curr(cx)));

export { mergeFeatures };
