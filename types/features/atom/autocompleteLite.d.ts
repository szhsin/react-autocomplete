import type { Feature, GetProps, GetPropsWithRef, GetPropsWithOptionalRef, AutocompleteFeatureProps, FeatureState } from '../../types';
type AutocompleteLiteFeature<T> = Feature<T, Pick<GetProps<T>, 'getListProps' | 'getClearProps'> & Pick<GetPropsWithRef<T>, 'getInputProps'> & Pick<GetPropsWithOptionalRef<T>, 'getItemProps'> & FeatureState>;
declare const autocompleteLite: <T>({ rovingText, select, selectOnBlur, deselectOnClear, deselectOnChange, closeOnSelect }?: AutocompleteFeatureProps<T>) => AutocompleteLiteFeature<T>;
export { type AutocompleteLiteFeature, autocompleteLite };
