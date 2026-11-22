import type { MergedFeature, FeatureProps } from '../../types.js';
import { mergeModules } from '../../utils/mergeModules.js';
import { type AutocompleteLiteFeature, autocompleteLite } from '../atom/autocompleteLite.js';
import { type NonblurToggleFeature, nonblurToggle } from '../atom/nonblurToggle.js';
import { type LabelFeature, label } from '../atom/label.js';
import { type InputFocusFeature, inputFocus } from '../atom/inputFocus.js';
import { type MultiInputFeature, multiInput } from '../atom/multiInput.js';

type MultiSelectFeature<T> = MergedFeature<
  T,
  [
    AutocompleteLiteFeature<T>,
    NonblurToggleFeature<T>,
    LabelFeature<T>,
    InputFocusFeature<T>,
    MultiInputFeature<T>
  ]
>;

const multiSelect = <T>(
  props?: Pick<FeatureProps<T>, 'rovingText' | 'closeOnSelect'>
): MultiSelectFeature<T> =>
  mergeModules(
    autocompleteLite<T>({ ...props, select: true }),
    nonblurToggle<T>(),
    label<T>(),
    inputFocus<T>(),
    multiInput<T>()
  );

export { type MultiSelectFeature, multiSelect };
