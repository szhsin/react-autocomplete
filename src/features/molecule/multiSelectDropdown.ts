import type { MergedFeature, FeatureProps } from '../../common';
import { mergeFeatures } from '../../utils/mergeFeatures';
import { type AutocompleteLiteFeature, autocompleteLite } from '../atom/autocompleteLite';
import { type DropdownToggleFeature, dropdownToggle } from '../atom/dropdownToggle';
import { type MultiInputFeature, multiInput } from '../atom/multiInput';

type MultiSelectDropdownFeature<T> = MergedFeature<
  T,
  [AutocompleteLiteFeature<T>, DropdownToggleFeature<T>, MultiInputFeature<T>]
>;

const multiSelectDropdown = <T>(
  props: Pick<FeatureProps<T>, 'rovingText' | 'closeOnSelect'> = {}
): MultiSelectDropdownFeature<T> =>
  mergeFeatures(
    autocompleteLite<T>({ ...props, select: true, selectOnBlur: false }),
    dropdownToggle<T>(props),
    multiInput<T>()
  );

export { type MultiSelectDropdownFeature, multiSelectDropdown };
