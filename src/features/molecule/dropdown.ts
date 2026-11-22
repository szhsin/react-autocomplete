import type { MergedFeature, FeatureProps } from '../../types.js';
import { mergeModules } from '../../utils/mergeModules.js';
import { type AutocompleteLiteFeature, autocompleteLite } from '../atom/autocompleteLite.js';
import { type DropdownToggleFeature, dropdownToggle } from '../atom/dropdownToggle.js';

type DropdownFeature<T> = MergedFeature<
  T,
  [AutocompleteLiteFeature<T>, DropdownToggleFeature<T>]
>;

const dropdown = <T>(
  props?: Pick<FeatureProps<T>, 'rovingText' | 'closeOnSelect' | 'toggleRef'>
): DropdownFeature<T> =>
  mergeModules(
    autocompleteLite<T>({
      ...props,
      select: true,
      deselectOnClear: false
    }),
    dropdownToggle<T>(props)
  );

export { type DropdownFeature, dropdown };
