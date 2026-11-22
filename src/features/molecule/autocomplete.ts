import type { MergedFeature, AutocompleteFeatureProps } from '../../types.js';
import { mergeModules } from '../../utils/mergeModules.js';
import { type AutocompleteLiteFeature, autocompleteLite } from '../atom/autocompleteLite.js';
import { type InputToggleFeature, inputToggle } from '../atom/inputToggle.js';
import { type LabelFeature, label } from '../atom/label.js';

type AutocompleteFeature<T> = MergedFeature<
  T,
  [AutocompleteLiteFeature<T>, InputToggleFeature<T>, LabelFeature<T>]
>;

const autocomplete = <T>(props?: AutocompleteFeatureProps<T>): AutocompleteFeature<T> =>
  mergeModules(autocompleteLite<T>(props), inputToggle<T>(), label<T>());

export { type AutocompleteFeature, autocomplete };
