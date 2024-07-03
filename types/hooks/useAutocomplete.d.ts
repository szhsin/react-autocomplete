import type { AutocompleteProps } from '../common';
declare const useAutocomplete: <T, FeatureYield extends object>({ value, onChange, feature: useFeature, traversal: useTraversal, ...passthrough }: AutocompleteProps<T, FeatureYield>) => {
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
} & FeatureYield;
export { useAutocomplete };
