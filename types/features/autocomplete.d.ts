import type { Feature, GetProps } from '../common';
declare const autocomplete: <T>({ rovingText, constricted }?: {
    rovingText?: boolean | undefined;
    constricted?: boolean | undefined;
}) => Feature<T, GetProps<T>>;
export { autocomplete };
