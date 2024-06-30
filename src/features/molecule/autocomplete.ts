import type { MergedFeature, AutocompleteFeatureProps } from '../../common';
import { mergeFeatures } from '../../utils/mergeFeatures';
import { type AutocompleteLiteFeature, autocompleteLite } from '../atom/autocompleteLite';
import { type InputToggleFeature, inputToggle } from '../atom/inputToggle';

type AutocompleteFeature<T> = MergedFeature<
  T,
  [AutocompleteLiteFeature<T>, InputToggleFeature<T>]
>;

const autocomplete = <T>(props: AutocompleteFeatureProps<T> = {}): AutocompleteFeature<T> =>
  mergeFeatures(autocompleteLite<T>(props), inputToggle<T>());

export { type AutocompleteFeature, autocomplete };
