import type { MergedFeature, FeatureProps } from '../../types';
import { type AutocompleteFeature } from './autocomplete';
import { type AutoInlineFeature } from '../atom/autoInline';
type SupercompleteFeature<T> = MergedFeature<T, [
    AutocompleteFeature<T>,
    AutoInlineFeature<T>
]>;
declare const supercomplete: <T>(props: Pick<FeatureProps<T>, "onRequestItem" | "select" | "deselectOnClear" | "deselectOnChange" | "closeOnSelect">) => SupercompleteFeature<T>;
export { type SupercompleteFeature, supercomplete };
