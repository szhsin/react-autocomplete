import type { InputHTMLAttributes } from 'react';
import type { GetProps, AutocompleteProps, PropsWithObjectRef } from '../common';
declare const useAutocomplete: <T, FeatureActions>({ onChange, isItemDisabled, feature: useFeature, traversal: useTraversal, getItemValue: _getItemValue }: AutocompleteProps<T, FeatureActions>) => {
    setInputValue: (value: string) => void;
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    selectedItem: T | undefined;
    setSelectedItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    getInputProps: () => PropsWithObjectRef<InputHTMLAttributes<HTMLInputElement>>;
    getListProps: () => import("react").HTMLAttributes<HTMLElement>;
} & Omit<GetProps<T> & FeatureActions, "getListProps" | "getInputProps">;
export { useAutocomplete };
