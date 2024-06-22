import type { MergedFeature, FeatureProps } from '../../common';
import { mergeFeatures } from '../../utils/mergeFeatures';
import { type AutocompleteLiteFeature, autocompleteLite } from '../atom/autocompleteLite';
import { type DropdownToggleFeature, dropdownToggle } from '../atom/dropdownToggle';

type DropdownFeature<T> = MergedFeature<T, [AutocompleteLiteFeature<T>, DropdownToggleFeature<T>]>;

const dropdown = <T>(
  props?: Pick<FeatureProps<T>, 'rovingText' | 'selectOnBlur'>
): DropdownFeature<T> =>
  mergeFeatures(
    autocompleteLite<T>({
      ...props,
      select: true,
      deselectOnClear: false
    }),
    dropdownToggle<T>()
  );

export { type DropdownFeature, dropdown };
