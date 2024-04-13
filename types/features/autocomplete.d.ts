import type { Feature } from '../common';
declare const autocomplete: <T>({ rovingText, constricted }?: {
    rovingText?: boolean | undefined;
    constricted?: boolean | undefined;
}) => Feature<T>;
export { autocomplete };
