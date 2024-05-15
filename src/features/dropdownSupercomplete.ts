import type { MergedFeature } from '../common';
import { supercomplete, type SupercompleteFeature } from './supercomplete';
import { dropdown, type DropdownFeature } from './dropdown';
import { mergeFeatures } from '../utils/mergeFeatures';

const dropdownSupercomplete = <T>(props?: {
  constricted?: boolean;
}): MergedFeature<T, [SupercompleteFeature<T>, DropdownFeature<T>]> =>
  mergeFeatures(supercomplete<T>(props), dropdown<T>());

export { dropdownSupercomplete };
