import type { AutocompleteProps } from '../types';
declare const useAutocomplete: <T, FeatureYield extends object>({ onChange, feature: useFeature, isItemSelected, inputRef: externalInputRef, getItemValue, ...passthrough }: AutocompleteProps<T, FeatureYield>) => {
    inputRef: React.RefObject<HTMLInputElement>;
    focusIndex: number;
    setFocusIndex: (index: number) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    isItemSelected: (item: T) => boolean;
} & FeatureYield;
export { useAutocomplete };
