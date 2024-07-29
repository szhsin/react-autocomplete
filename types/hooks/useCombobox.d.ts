/// <reference types="react" />
import type { ComboboxProps } from '../types';
declare const useCombobox: <T, FeatureYield extends object>({ isEqual, getItemValue: _getItemValue, selected, onSelectChange, flipOnSelect, ...passthrough }: ComboboxProps<T, FeatureYield>) => {
    inputRef: import("react").RefObject<HTMLInputElement>;
    focusIndex: number;
    setFocusIndex: (index: number) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    isItemSelected: (item: T) => boolean;
} & FeatureYield;
export { useCombobox };
