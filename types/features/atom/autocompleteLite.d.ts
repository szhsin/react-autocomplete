import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions, AutocompleteFeatureProps } from '../../common';
type AutocompleteLiteFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getListProps' | 'getItemProps' | 'getClearProps'> & Pick<GetPropsWithRefFunctions<T>, 'getInputProps'> & {
    clearable: boolean;
}>;
declare const autocompleteLite: <T>({ rovingText, constricted, selectOnBlur, deselectOnBlur }?: AutocompleteFeatureProps<T>) => AutocompleteLiteFeature<T>;
export { type AutocompleteLiteFeature, autocompleteLite };
