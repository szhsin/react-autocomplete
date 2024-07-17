/// <reference types="react" />
import type { MultiSelectProps } from '../types';
declare const useMultiSelect: <T, FeatureYield extends object>({ isEqual, getItemValue, selected, onSelectChange: _onSelectChange, flipOnSelect, ...passthrough }: MultiSelectProps<T, FeatureYield>) => {
    inputRef: import("react").RefObject<HTMLInputElement>;
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
} & FeatureYield & {
    removeSelect: (item?: T | undefined) => void;
};
export { useMultiSelect };
