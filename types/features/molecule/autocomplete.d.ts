import type { MergedFeature, AutocompleteFeatureProps } from '../../types';
import { type AutocompleteLiteFeature } from '../atom/autocompleteLite';
import { type InputToggleFeature } from '../atom/inputToggle';
import { type LabelFeature } from '../atom/label';
type AutocompleteFeature<T> = MergedFeature<T, [
    AutocompleteLiteFeature<T>,
    InputToggleFeature<T>,
    LabelFeature<T>
]>;
declare const autocomplete: <T>(props?: AutocompleteFeatureProps<T>) => AutocompleteFeature<T>;
export { type AutocompleteFeature, autocomplete };
