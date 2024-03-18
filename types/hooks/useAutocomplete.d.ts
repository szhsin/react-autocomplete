/// <reference types="react" />
import type { GetProps, AutocompleteProps } from '../common';
declare const useAutocomplete: <T, FeatureActions>({ onChange, feature: useFeature, traversal: useTraversal, getItemValue: _getItemValue }: AutocompleteProps<T, FeatureActions>) => {
    setInputValue: (value: string) => void;
    focusItem: T | null | undefined;
    setFocusItem: (item?: T | null | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    getInputProps: () => import("react").InputHTMLAttributes<HTMLInputElement>;
    getItemProps: (option: {
        item: T;
    }) => import("react").HTMLAttributes<HTMLElement>;
} & Omit<GetProps<T> & FeatureActions, "getInputProps" | "getItemProps">;
export { useAutocomplete };
