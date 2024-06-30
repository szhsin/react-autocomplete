import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions, AutocompleteFeatureProps, Clearable } from '../../common';
type AutocompleteLiteFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getListProps' | 'getItemProps' | 'getClearProps'> & Pick<GetPropsWithRefFunctions<T>, 'getInputProps'> & Clearable>;
declare const autocompleteLite: <T>({ rovingText, select, selectOnBlur, deselectOnClear, deselectOnChange, closeOnSelect }?: AutocompleteFeatureProps<T>) => AutocompleteLiteFeature<T>;
export { type AutocompleteLiteFeature, autocompleteLite };
