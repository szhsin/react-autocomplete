// @ts-nocheck
/* eslint-disable */

import type { MergedFeature } from '../common';
import { mergeObjects } from './mergeObjects';

const mergeFeatures =
  <T, Features>(...features): MergedFeature<T, Features> =>
  (cx) =>
    features.reduce((accu, curr) => mergeObjects(accu(cx), curr(cx)));

export { mergeFeatures };
