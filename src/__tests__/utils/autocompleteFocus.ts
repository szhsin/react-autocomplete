import {
  MergedFeature,
  FeatureProps,
  AutocompleteFeature,
  AutoFocusFeature,
  mergeModules,
  autocomplete,
  autoFocus
} from '../..';

type AutocompleteFocusFeature<T> = MergedFeature<
  T,
  [AutocompleteFeature<T>, AutoFocusFeature<T>]
>;

const autocompleteFocus = <T>(props: FeatureProps<T>): AutocompleteFocusFeature<T> =>
  mergeModules(autocomplete<T>(props), autoFocus<T>(props));

export { autocompleteFocus };
