import type { MergedFeature, FeatureProps } from '../../common';
import { mergeFeatures } from '../../utils/mergeFeatures';
import { type AutocompleteFeature, autocomplete } from '../atom/autocomplete';
import { type ToggleFeature, toggle } from '../atom/toggle';
import { DropdownToggleFeature, dropdownToggle } from '../atom/dropdownToggle';

type DropdownFeature<T> = MergedFeature<
  T,
  [AutocompleteFeature<T>, DropdownToggleFeature<T>, ToggleFeature<T>]
>;

const dropdown = <T>(props?: Pick<FeatureProps<T>, 'rovingText'>): DropdownFeature<T> =>
  mergeFeatures(
    autocomplete<T>({ ...props, constricted: true, selectOnBlur: false, deselectOnBlur: false }),
    dropdownToggle<T>(),
    toggle<T>()
  );

export { type DropdownFeature, dropdown };
