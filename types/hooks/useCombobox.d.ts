/// <reference types="react" />
import type { ComboboxProps } from '../types';
declare const useCombobox: <T, FeatureYield extends object>({ isEqual, getItemValue: _getItemValue, selected, onSelectChange, flipOnSelect, ...passthrough }: ComboboxProps<T, FeatureYield>) => {
    inputRef: import("react").RefObject<HTMLInputElement>;
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    isItemSelected: (item: T) => boolean;
} & FeatureYield;
export { useCombobox };
