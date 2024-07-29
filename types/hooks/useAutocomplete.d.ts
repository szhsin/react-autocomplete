/// <reference types="react" />
import type { AutocompleteProps } from '../types';
declare const useAutocomplete: <T, FeatureYield extends object>({ onChange, feature: useFeature, isItemSelected, ...passthrough }: AutocompleteProps<T, FeatureYield>) => {
    inputRef: import("react").RefObject<HTMLInputElement>;
    focusIndex: number;
    setFocusIndex: (index: number) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    isItemSelected: (item: T) => boolean;
} & FeatureYield;
export { useAutocomplete };
