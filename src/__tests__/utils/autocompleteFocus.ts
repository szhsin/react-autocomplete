import {
  MergedFeature,
  FeatureProps,
  AutocompleteFeature,
  mergeModules,
  autocomplete
} from '../../index.js';
import { AutoFocusFeature, autoFocus } from '../../features/atom/index.js';

type AutocompleteFocusFeature<T> = MergedFeature<
  T,
  [AutocompleteFeature<T>, AutoFocusFeature<T>]
>;

const autocompleteFocus = <T>(props: FeatureProps<T>): AutocompleteFocusFeature<T> =>
  mergeModules(autocomplete<T>(props), autoFocus<T>(props));

export { autocompleteFocus };
