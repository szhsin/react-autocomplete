import type { MergedFeature, FeatureProps } from '../common';
import { mergeFeatures } from '../utils/mergeFeatures';
import { type AutocompleteFeature, autocomplete } from './autocomplete';
import { type InlineFeature, inline } from './inline';

type SupercompleteFeature<T> = MergedFeature<T, [AutocompleteFeature<T>, InlineFeature<T>]>;

const supercomplete = <T>({
  constricted,
  getInlineItem
}: Pick<FeatureProps<T>, 'constricted' | 'getInlineItem'>): SupercompleteFeature<T> =>
  mergeFeatures(autocomplete<T>({ constricted, rovingText: true }), inline<T>({ getInlineItem }));

export { type SupercompleteFeature, supercomplete };
