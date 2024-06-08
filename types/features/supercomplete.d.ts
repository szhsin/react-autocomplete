import type { MergedFeature, FeatureProps } from '../common';
import { type AutocompleteFeature } from './autocomplete';
import { type InlineFeature } from './inline';
type SupercompleteFeature<T> = MergedFeature<T, [AutocompleteFeature<T>, InlineFeature<T>]>;
declare const supercomplete: <T>({ getInlineItem, ...rest }: Pick<FeatureProps<T>, "getInlineItem" | "constricted" | "selectOnBlur" | "deselectOnBlur">) => SupercompleteFeature<T>;
export { type SupercompleteFeature, supercomplete };
