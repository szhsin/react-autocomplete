import type { MergedFeature, AutocompleteFeatureProps } from '../../types';
import { mergeModules } from '../../utils/mergeModules';
import { type AutocompleteLiteFeature, autocompleteLite } from '../atom/autocompleteLite';
import { type InputToggleFeature, inputToggle } from '../atom/inputToggle';

type AutocompleteFeature<T> = MergedFeature<
  T,
  [AutocompleteLiteFeature<T>, InputToggleFeature<T>]
>;

const autocomplete = <T>(props: AutocompleteFeatureProps<T> = {}): AutocompleteFeature<T> =>
  mergeModules(autocompleteLite<T>(props), inputToggle<T>());

export { type AutocompleteFeature, autocomplete };
