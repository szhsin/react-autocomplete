// @ts-nocheck
/* eslint-disable */

import { mergeObjects } from './mergeObjects';

const mergeFeatures =
  (...features) =>
  (cx) =>
    features.reduce((accu, curr) => mergeObjects(accu, curr(cx)), {});

export { mergeFeatures };
