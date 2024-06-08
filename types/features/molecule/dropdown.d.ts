import type { MergedFeature, FeatureProps } from '../../common';
import { type AutocompleteFeature } from '../atom/autocomplete';
import { type ToggleFeature } from '../atom/toggle';
import { DropdownToggleFeature } from '../atom/dropdownToggle';
type DropdownFeature<T> = MergedFeature<T, [
    AutocompleteFeature<T>,
    DropdownToggleFeature<T>,
    ToggleFeature<T>
]>;
declare const dropdown: <T>(props?: Pick<FeatureProps<T>, "rovingText"> | undefined) => DropdownFeature<T>;
export { type DropdownFeature, dropdown };
