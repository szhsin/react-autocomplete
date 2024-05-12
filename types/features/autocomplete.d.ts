import type { Feature, GetProps } from '../common';
type AutocompleteFeature<T> = Feature<T, GetProps<T>>;
declare const autocomplete: <T>({ rovingText, constricted }?: {
    rovingText?: boolean | undefined;
    constricted?: boolean | undefined;
}) => AutocompleteFeature<T>;
export { type AutocompleteFeature, autocomplete };
