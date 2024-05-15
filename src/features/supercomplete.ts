import type { MergedFeature } from '../common';
import { mergeFeatures } from '../utils/mergeFeatures';
import { type AutocompleteFeature, autocomplete } from './autocomplete';
import { type InlineFeature, inline } from './inline';

type SupercompleteFeature<T> = MergedFeature<T, [InlineFeature<T>, AutocompleteFeature<T>]>;

const supercomplete = <T>(props?: { constricted?: boolean }): SupercompleteFeature<T> =>
  mergeFeatures(inline<T>(), autocomplete<T>({ ...props, rovingText: true }));

export { type SupercompleteFeature, supercomplete };
