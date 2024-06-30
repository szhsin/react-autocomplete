import type { MergedFeature, FeatureProps } from '../../common';
import { type AutocompleteFeature } from './autocomplete';
import { type InputFocusFeature } from '../atom/inputFocus';
import { type MultiInputFeature } from '../atom/multiInput';
type MultiSelectFeature<T> = MergedFeature<T, [
    AutocompleteFeature<T>,
    InputFocusFeature<T>,
    MultiInputFeature<T>
]>;
declare const multiSelect: <T>(props: Pick<FeatureProps<T>, "rovingText" | "closeOnSelect">) => MultiSelectFeature<T>;
export { type MultiSelectFeature, multiSelect };
