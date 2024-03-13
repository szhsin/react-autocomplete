import type { Feature } from '../common';
declare const autocomplete: <T>({ rovingText, traverseInput }?: {
    rovingText?: boolean | undefined;
    traverseInput?: boolean | undefined;
}) => Feature<T>;
export { autocomplete };
