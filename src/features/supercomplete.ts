import { autocomplete, type AutocompleteFeature } from './autocomplete';
import { inline, type InlineFeature } from './inline';
import { mergeFeatures } from '../utils/mergeFeatures';

const supercomplete = <T>(props?: { constricted?: boolean }) =>
  mergeFeatures<T, [InlineFeature<T>, AutocompleteFeature<T>]>(
    inline<T>(),
    autocomplete<T>({ ...props, rovingText: true })
  );

export { supercomplete };
