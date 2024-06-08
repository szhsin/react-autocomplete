import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions, FeatureProps } from '../../common';
type AutocompleteFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getListProps' | 'getItemProps'> & Pick<GetPropsWithRefFunctions<T>, 'getInputProps'>>;
declare const autocomplete: <T>({ rovingText, constricted, selectOnBlur, deselectOnBlur }?: Pick<FeatureProps<T>, "rovingText" | "constricted" | "selectOnBlur" | "deselectOnBlur">) => Feature<T_1, Pick<GetPropsFunctions<T_1>, "getListProps" | "getItemProps"> & Pick<GetPropsWithRefFunctions<T_1>, "getInputProps">>;
export { type AutocompleteFeature, autocomplete };
