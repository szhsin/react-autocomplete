import type { MergedFeature, FeatureProps } from '../../common';
import { mergeModules } from '../../utils/mergeModules';
import { type AutocompleteFeature, autocomplete } from './autocomplete';
import { type AutoInlineFeature, autoInline } from '../atom/autoInline';

type SupercompleteFeature<T> = MergedFeature<
  T,
  [AutocompleteFeature<T>, AutoInlineFeature<T>]
>;

const supercomplete = <T>({
  getFocusItem,
  ...rest
}: Pick<
  FeatureProps<T>,
  | 'getFocusItem'
  | 'select'
  | 'selectOnBlur'
  | 'deselectOnClear'
  | 'deselectOnChange'
  | 'closeOnSelect'
>): SupercompleteFeature<T> =>
  mergeModules(
    autocomplete<T>({ ...rest, rovingText: true }),
    autoInline<T>({ getFocusItem })
  );

export { type SupercompleteFeature, supercomplete };
