import { type AutocompleteFeature } from './autocomplete';
import { type InlineFeature } from './inline';
declare const supercomplete: <T>(props?: {
    constricted?: boolean;
}) => import("../common").MergedFeature<T, [InlineFeature<T>, AutocompleteFeature<T>]>;
export { supercomplete };
