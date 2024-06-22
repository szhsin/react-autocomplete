import type { MergedFeature, FeatureProps } from '../../common';
import { type AutocompleteFeature } from './autocomplete';
import { type InlineFeature } from '../atom/inline';
type SupercompleteFeature<T> = MergedFeature<T, [AutocompleteFeature<T>, InlineFeature<T>]>;
declare const supercomplete: <T>({ getInlineItem, ...rest }: Pick<FeatureProps<T>, "select" | "selectOnBlur" | "deselectOnClear" | "deselectOnChange" | "getInlineItem">) => SupercompleteFeature<T>;
export { type SupercompleteFeature, supercomplete };
