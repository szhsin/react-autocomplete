import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions, FeatureProps } from '../common';
type AutocompleteFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getListProps' | 'getItemProps'> & Pick<GetPropsWithRefFunctions<T>, 'getInputProps'>>;
declare const autocomplete: <T>({ rovingText, constricted }?: Pick<FeatureProps<T>, "rovingText" | "constricted">) => AutocompleteFeature<T>;
export { type AutocompleteFeature, autocomplete };
