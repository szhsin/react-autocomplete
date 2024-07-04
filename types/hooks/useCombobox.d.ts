/// <reference types="react" />
import type { ComboboxProps } from '../common';
declare const useCombobox: <T, FeatureYield extends object>({ isEqual, getItemValue: _getItemValue, selected, onSelectChange, flipOnSelect, ...passthrough }: ComboboxProps<T, FeatureYield>) => {
    inputRef: import("react").RefObject<HTMLInputElement>;
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
} & FeatureYield;
export { useCombobox };
