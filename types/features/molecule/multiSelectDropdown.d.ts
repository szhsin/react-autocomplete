import type { MergedFeature, FeatureProps } from '../../types';
import { type AutocompleteLiteFeature } from '../atom/autocompleteLite';
import { type DropdownToggleFeature } from '../atom/dropdownToggle';
import { type MultiInputFeature } from '../atom/multiInput';
type MultiSelectDropdownFeature<T> = MergedFeature<T, [
    AutocompleteLiteFeature<T>,
    DropdownToggleFeature<T>,
    MultiInputFeature<T>
]>;
declare const multiSelectDropdown: <T>(props?: Pick<FeatureProps<T>, "rovingText" | "closeOnSelect" | "toggleRef">) => MultiSelectDropdownFeature<T>;
export { type MultiSelectDropdownFeature, multiSelectDropdown };
