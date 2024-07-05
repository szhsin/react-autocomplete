import {
  mergeModules,
  MergedFeature,
  FeatureProps,
  AutocompleteFeature,
  AutoFocusFeature,
  autocomplete,
  autoFocus
} from '@szhsin/react-autocomplete';

type AutocompleteFocusFeature<T> = MergedFeature<
  T,
  [AutocompleteFeature<T>, AutoFocusFeature<T>]
>;

const autocompleteFocus = <T>(props: FeatureProps<T>): AutocompleteFocusFeature<T> =>
  mergeModules(autocomplete<T>(props), autoFocus<T>(props));

export { autocompleteFocus };
