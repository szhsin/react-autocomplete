import type { MergedFeature, FeatureProps } from '../../common';
import { mergeModules } from '../../utils/mergeModules';
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
  mergeModules(
    autocompleteLite<T>({ ...props, select: true, selectOnBlur: false }),
    dropdownToggle<T>(props),
    multiInput<T>()
  );

export { type MultiSelectDropdownFeature, multiSelectDropdown };
