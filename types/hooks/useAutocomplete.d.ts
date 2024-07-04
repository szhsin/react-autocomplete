/// <reference types="react" />
import type { AutocompleteProps } from '../common';
declare const useAutocomplete: <T, FeatureYield extends object>({ value, onChange, feature: useFeature, traversal: useTraversal, ...passthrough }: AutocompleteProps<T, FeatureYield>) => {
    inputRef: import("react").RefObject<HTMLInputElement>;
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
} & FeatureYield;
export { useAutocomplete };
