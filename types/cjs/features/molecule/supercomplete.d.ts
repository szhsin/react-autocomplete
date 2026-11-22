import type { MergedFeature, FeatureProps } from '../../types.js';
import { type AutocompleteFeature } from './autocomplete.js';
import { type AutoInlineFeature } from '../atom/autoInline.js';
type SupercompleteFeature<T> = MergedFeature<T, [
    AutocompleteFeature<T>,
    AutoInlineFeature<T>
]>;
declare const supercomplete: <T>(props: Pick<FeatureProps<T>, "onRequestItem" | "select" | "deselectOnClear" | "deselectOnChange" | "closeOnSelect">) => SupercompleteFeature<T>;
export { type SupercompleteFeature, supercomplete };
