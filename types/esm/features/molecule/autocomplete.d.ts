import type { MergedFeature, AutocompleteFeatureProps } from '../../types.js';
import { type AutocompleteLiteFeature } from '../atom/autocompleteLite.js';
import { type InputToggleFeature } from '../atom/inputToggle.js';
import { type LabelFeature } from '../atom/label.js';
type AutocompleteFeature<T> = MergedFeature<T, [
    AutocompleteLiteFeature<T>,
    InputToggleFeature<T>,
    LabelFeature<T>
]>;
declare const autocomplete: <T>(props?: AutocompleteFeatureProps<T>) => AutocompleteFeature<T>;
export { type AutocompleteFeature, autocomplete };
