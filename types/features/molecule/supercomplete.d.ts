import type { MergedFeature, FeatureProps } from '../../common';
import { type AutocompleteFeature } from './autocomplete';
import { type AutoInlineFeature } from '../atom/autoInline';
type SupercompleteFeature<T> = MergedFeature<T, [
    AutocompleteFeature<T>,
    AutoInlineFeature<T>
]>;
declare const supercomplete: <T>({ getFocusItem, ...rest }: Pick<FeatureProps<T>, "getFocusItem" | "select" | "selectOnBlur" | "deselectOnClear" | "deselectOnChange" | "closeOnSelect">) => SupercompleteFeature<T>;
export { type SupercompleteFeature, supercomplete };
