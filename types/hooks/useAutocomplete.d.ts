/// <reference types="react" />
import type { AutocompleteProps } from '../common';
declare const useAutocomplete: <FeatureActions>({ feature: useFeature, items, onChange }: AutocompleteProps<FeatureActions>) => {
    setInputValue: (value: string) => void;
    focusIndex: number;
    setFocusIndex: (value: number) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    getInputProps: () => import("react").InputHTMLAttributes<HTMLInputElement>;
    getItemProps: (option?: {
        index?: number | undefined;
    } | undefined) => import("react").HTMLAttributes<HTMLElement>;
} & FeatureActions;
export { useAutocomplete };
