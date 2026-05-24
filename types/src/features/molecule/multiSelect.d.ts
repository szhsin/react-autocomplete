import type { MergedFeature, FeatureProps } from '../../types';
import { type AutocompleteLiteFeature } from '../atom/autocompleteLite';
import { type NonblurToggleFeature } from '../atom/nonblurToggle';
import { type LabelFeature } from '../atom/label';
import { type InputFocusFeature } from '../atom/inputFocus';
import { type MultiInputFeature } from '../atom/multiInput';
type MultiSelectFeature<T> = MergedFeature<T, [
    AutocompleteLiteFeature<T>,
    NonblurToggleFeature<T>,
    LabelFeature<T>,
    InputFocusFeature<T>,
    MultiInputFeature<T>
]>;
declare const multiSelect: <T>(props?: Pick<FeatureProps<T>, "rovingText" | "closeOnSelect">) => MultiSelectFeature<T>;
export { type MultiSelectFeature, multiSelect };
