import type { MergedFeature } from '../common';
import { type AutocompleteFeature, autocomplete } from './autocomplete';
import { type ToggleFeature, toggle } from './toggle';
import { mergeFeatures } from '../utils/mergeFeatures';

type DropdownFeature<T> = MergedFeature<T, [AutocompleteFeature<T>, ToggleFeature<T>]>;

const dropdown = <T>(props?: { rovingText?: boolean }): DropdownFeature<T> =>
  mergeFeatures(autocomplete<T>({ ...props, constricted: true }), toggle<T>());

export { type DropdownFeature, dropdown };
