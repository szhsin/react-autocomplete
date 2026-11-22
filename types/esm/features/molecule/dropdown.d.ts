import type { MergedFeature, FeatureProps } from '../../types.js';
import { type AutocompleteLiteFeature } from '../atom/autocompleteLite.js';
import { type DropdownToggleFeature } from '../atom/dropdownToggle.js';
type DropdownFeature<T> = MergedFeature<T, [
    AutocompleteLiteFeature<T>,
    DropdownToggleFeature<T>
]>;
declare const dropdown: <T>(props?: Pick<FeatureProps<T>, "rovingText" | "closeOnSelect" | "toggleRef">) => DropdownFeature<T>;
export { type DropdownFeature, dropdown };
