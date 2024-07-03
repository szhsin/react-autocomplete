import type { MergedFeature, FeatureProps } from '../../common';
import { mergeModules } from '../../utils/mergeModules';
import { type AutocompleteFeature, autocomplete } from './autocomplete';
import { type InlineFeature, inline } from '../atom/inline';

type SupercompleteFeature<T> = MergedFeature<T, [AutocompleteFeature<T>, InlineFeature<T>]>;

const supercomplete = <T>({
  getInlineItem,
  ...rest
}: Pick<
  FeatureProps<T>,
  | 'getInlineItem'
  | 'select'
  | 'selectOnBlur'
  | 'deselectOnClear'
  | 'deselectOnChange'
  | 'closeOnSelect'
>): SupercompleteFeature<T> =>
  mergeModules(autocomplete<T>({ ...rest, rovingText: true }), inline<T>({ getInlineItem }));

export { type SupercompleteFeature, supercomplete };
