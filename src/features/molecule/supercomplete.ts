import type { MergedFeature, FeatureProps } from '../../common';
import { mergeFeatures } from '../../utils/mergeFeatures';
import { type AutocompleteFeature, autocomplete } from './autocomplete';
import { type InlineFeature, inline } from '../atom/inline';

type SupercompleteFeature<T> = MergedFeature<T, [AutocompleteFeature<T>, InlineFeature<T>]>;

const supercomplete = <T>({
  getInlineItem,
  ...rest
}: Pick<
  FeatureProps<T>,
  'getInlineItem' | 'constricted' | 'selectOnBlur' | 'deselectOnBlur'
>): SupercompleteFeature<T> =>
  mergeFeatures(autocomplete<T>({ ...rest, rovingText: true }), inline<T>({ getInlineItem }));

export { type SupercompleteFeature, supercomplete };
