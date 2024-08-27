import type { MergedFeature, FeatureProps } from '../../types';
import { type AutocompleteLiteFeature } from '../atom/autocompleteLite';
import { type DropdownToggleFeature } from '../atom/dropdownToggle';
type DropdownFeature<T> = MergedFeature<T, [
    AutocompleteLiteFeature<T>,
    DropdownToggleFeature<T>
]>;
declare const dropdown: <T>(props?: Pick<FeatureProps<T>, "rovingText" | "selectOnBlur" | "closeOnSelect" | "toggleRef">) => DropdownFeature<T>;
export { type DropdownFeature, dropdown };
