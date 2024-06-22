import type { AutocompleteProps } from '../common';
declare const useAutocomplete: <T, FeatureYield extends object>({ value, onChange, isItemDisabled, feature: useFeature, traversal: useTraversal, ...adapterProps }: AutocompleteProps<T, FeatureYield>) => {
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
} & FeatureYield;
export { useAutocomplete };
