/// <reference types="react" />
import type { MultiSelectProps } from '../types';
declare const useMultiSelect: <T, FeatureYield extends object>({ isEqual, getItemValue, selected, onSelectChange, flipOnSelect, ...passthrough }: MultiSelectProps<T, FeatureYield>) => {
    inputRef: import("react").RefObject<HTMLInputElement>;
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    isItemSelected: (item: T) => boolean;
} & FeatureYield & {
    removeSelect: (item?: T | undefined) => void;
};
export { useMultiSelect };
