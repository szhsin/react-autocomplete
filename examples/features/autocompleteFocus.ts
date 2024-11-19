import {
  mergeModules,
  MergedFeature,
  FeatureProps,
  AutocompleteFeature,
  autocomplete
} from '@szhsin/react-autocomplete';
import { AutoFocusFeature, autoFocus } from '@szhsin/react-autocomplete/features/atom';

type AutocompleteFocusFeature<T> = MergedFeature<
  T,
  [AutocompleteFeature<T>, AutoFocusFeature<T>]
>;

const autocompleteFocus = <T>(props: FeatureProps<T>): AutocompleteFocusFeature<T> =>
  mergeModules(autocomplete<T>(props), autoFocus<T>(props));

export { autocompleteFocus };
