import type { AutocompleteProps } from '../common';
declare const useAutocomplete: <T, FeatureYield extends object>({ value, onChange, selectedItem, onSelectedItemChange, isItemDisabled, feature: useFeature, traversal: useTraversal, getItemValue: _getItemValue }: AutocompleteProps<T, FeatureYield>) => {
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
} & FeatureYield;
export { useAutocomplete };
