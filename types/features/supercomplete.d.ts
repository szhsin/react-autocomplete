import type { MergedFeature, FeatureProps } from '../common';
import { type AutocompleteFeature } from './autocomplete';
import { type InlineFeature } from './inline';
type SupercompleteFeature<T> = MergedFeature<T, [AutocompleteFeature<T>, InlineFeature<T>]>;
declare const supercomplete: <T>({ constricted, getInlineItem }: Pick<FeatureProps<T>, "constricted" | "getInlineItem">) => SupercompleteFeature<T>;
export { type SupercompleteFeature, supercomplete };
