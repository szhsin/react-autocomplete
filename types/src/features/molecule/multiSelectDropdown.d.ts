import type { MergedFeature, FeatureProps } from '../../types';
import { type MultiInputFeature } from '../atom/multiInput';
import { type DropdownFeature } from './dropdown';
type MultiSelectDropdownFeature<T> = MergedFeature<T, [
    DropdownFeature<T>,
    MultiInputFeature<T>
]>;
declare const multiSelectDropdown: <T>(props?: Pick<FeatureProps<T>, "rovingText" | "closeOnSelect" | "toggleRef">) => MultiSelectDropdownFeature<T>;
export { type MultiSelectDropdownFeature, multiSelectDropdown };
