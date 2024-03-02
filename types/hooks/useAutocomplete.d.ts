/// <reference types="react" />
import type { GetProps, AutocompleteProps } from '../common';
declare const useAutocomplete: <T, FeatureActions>({ items, onChange, feature: useFeature, getItemValue: _getItemValue }: AutocompleteProps<T, FeatureActions>) => {
    setInputValue: (value: string) => void;
    focusIndex: number;
    setFocusIndex: (value: number) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    getInputProps: () => import("react").InputHTMLAttributes<HTMLInputElement>;
    getItemProps: (option?: {
        index?: number | undefined;
    } | undefined) => import("react").HTMLAttributes<HTMLElement>;
} & Omit<GetProps & FeatureActions, "getInputProps" | "getItemProps">;
export { useAutocomplete };
