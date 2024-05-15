import type { MergedFeature } from '../common';
import { type AutocompleteFeature } from './autocomplete';
import { type InlineFeature } from './inline';
type SupercompleteFeature<T> = MergedFeature<T, [InlineFeature<T>, AutocompleteFeature<T>]>;
declare const supercomplete: <T>(props?: {
    constricted?: boolean;
}) => SupercompleteFeature<T>;
export { type SupercompleteFeature, supercomplete };
