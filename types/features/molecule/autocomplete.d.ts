import type { MergedFeature, AutocompleteFeatureProps } from '../../common';
import { type AutocompleteLiteFeature } from '../atom/autocompleteLite';
import { type InputToggleFeature } from '../atom/inputToggle';
type AutocompleteFeature<T> = MergedFeature<T, [AutocompleteLiteFeature<T>, InputToggleFeature<T>]>;
declare const autocomplete: <T>(props: AutocompleteFeatureProps<T>) => AutocompleteFeature<T>;
export { type AutocompleteFeature, autocomplete };
