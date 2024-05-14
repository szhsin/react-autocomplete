import { autocomplete, type AutocompleteFeature } from './autocomplete';
import { dropdown, type DropdownFeature } from './dropdown';
import { inline, type InlineFeature } from './inline';
import { mergeFeatures } from '../utils/mergeFeatures';

const dropdownSupercomplete = <T>(props?: { constricted?: boolean }) =>
  mergeFeatures<T, [InlineFeature<T>, DropdownFeature<T>, AutocompleteFeature<T>]>(
    inline<T>(),
    autocomplete<T>({ ...props, rovingText: true }),
    dropdown<T>()
  );

export { dropdownSupercomplete };
