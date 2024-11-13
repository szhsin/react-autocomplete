import type { Feature, GetProps, AutocompleteFeatureProps, FeatureState } from '../../types';
type AutocompleteLiteFeature<T> = Feature<T, Pick<GetProps<T>, 'getInputProps' | 'getListProps' | 'getItemProps' | 'getClearProps' | 'getFocusCaptureProps'> & FeatureState>;
declare const autocompleteLite: <T>({ select, rovingText, deselectOnClear, deselectOnChange, closeOnSelect }?: AutocompleteFeatureProps<T>) => AutocompleteLiteFeature<T>;
export { type AutocompleteLiteFeature, autocompleteLite };
