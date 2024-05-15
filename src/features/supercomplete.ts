import type { MergedFeature } from '../common';
import { mergeFeatures } from '../utils/mergeFeatures';
import { autocomplete, type AutocompleteFeature } from './autocomplete';
import { inline, type InlineFeature } from './inline';

type SupercompleteFeature<T> = MergedFeature<T, [InlineFeature<T>, AutocompleteFeature<T>]>;

const supercomplete = <T>(props?: { constricted?: boolean }): SupercompleteFeature<T> =>
  mergeFeatures(inline<T>(), autocomplete<T>({ ...props, rovingText: true }));

export { type SupercompleteFeature, supercomplete };
