import type { ComboboxProps } from '../common';
declare const useCombobox: <T, FeatureYield extends object>({ getItemValue: _getItemValue, selected, onSelectChange, flipOnSelect, ...passthrough }: ComboboxProps<T, FeatureYield>) => {
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
} & FeatureYield;
export { useCombobox };
