import type { MergedFeature, FeatureProps } from '../../types.js';
import { type MultiInputFeature } from '../atom/multiInput.js';
import { type DropdownFeature } from './dropdown.js';
type MultiSelectDropdownFeature<T> = MergedFeature<T, [
    DropdownFeature<T>,
    MultiInputFeature<T>
]>;
declare const multiSelectDropdown: <T>(props?: Pick<FeatureProps<T>, "rovingText" | "closeOnSelect" | "toggleRef">) => MultiSelectDropdownFeature<T>;
export { type MultiSelectDropdownFeature, multiSelectDropdown };
