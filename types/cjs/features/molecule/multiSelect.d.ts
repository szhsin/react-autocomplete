import type { MergedFeature, FeatureProps } from '../../types.js';
import { type AutocompleteLiteFeature } from '../atom/autocompleteLite.js';
import { type NonblurToggleFeature } from '../atom/nonblurToggle.js';
import { type LabelFeature } from '../atom/label.js';
import { type InputFocusFeature } from '../atom/inputFocus.js';
import { type MultiInputFeature } from '../atom/multiInput.js';
type MultiSelectFeature<T> = MergedFeature<T, [
    AutocompleteLiteFeature<T>,
    NonblurToggleFeature<T>,
    LabelFeature<T>,
    InputFocusFeature<T>,
    MultiInputFeature<T>
]>;
declare const multiSelect: <T>(props?: Pick<FeatureProps<T>, "rovingText" | "closeOnSelect">) => MultiSelectFeature<T>;
export { type MultiSelectFeature, multiSelect };
