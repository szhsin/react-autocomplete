import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions, AutocompleteFeatureProps, FeatureState } from '../../types';
type AutocompleteLiteFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getListProps' | 'getItemProps' | 'getClearProps'> & Pick<GetPropsWithRefFunctions<T>, 'getInputProps'> & FeatureState>;
declare const autocompleteLite: <T>({ rovingText, select, selectOnBlur, deselectOnClear, deselectOnChange, closeOnSelect }?: AutocompleteFeatureProps<T>) => AutocompleteLiteFeature<T>;
export { type AutocompleteLiteFeature, autocompleteLite };
