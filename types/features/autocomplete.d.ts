import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions, FeatureProps } from '../common';
type AutocompleteFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getListProps' | 'getItemProps'> & Pick<GetPropsWithRefFunctions<T>, 'getInputProps'>>;
declare const autocomplete: <T>({ rovingText, constricted, selectOnBlur, deselectOnBlur }?: Pick<FeatureProps<T>, "rovingText" | "constricted" | "selectOnBlur" | "deselectOnBlur">) => AutocompleteFeature<T>;
export { type AutocompleteFeature, autocomplete };
