import type { AutocompleteProps } from '../common';
declare const useAutocomplete: <T, FeatureYield extends object>({ value, onChange, isItemDisabled, feature: useFeature, traversal: useTraversal, getItemValue: _getItemValue }: AutocompleteProps<T, FeatureYield>) => {
    setInputValue: (value: string) => void;
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    selectedItem: T | undefined;
    setSelectedItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
} & FeatureYield;
export { useAutocomplete };
