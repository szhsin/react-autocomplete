import type { ComboboxProps } from '../types';
declare const useCombobox: <T, FeatureYield extends object>({ isEqual, selected, onSelectChange, flipOnSelect, ...passthrough }: ComboboxProps<T, FeatureYield>) => {
    inputRef: React.RefObject<HTMLInputElement>;
    focusIndex: number;
    setFocusIndex: (index: number) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    isItemSelected: (item: T) => boolean;
} & FeatureYield;
export { useCombobox };
