import type { InputHTMLAttributes, HTMLAttributes } from 'react';
import type { AutocompleteProps } from '../common';
interface GetProps {
    input: [never, InputHTMLAttributes<HTMLInputElement>];
    item: [{
        index?: number;
    }, HTMLAttributes<HTMLElement>];
}
declare const useAutocomplete: <FeatureActions = object>({ feature: useFeature, items, onChange }: AutocompleteProps<FeatureActions>) => {
    setInputValue: (value: string) => void;
    focusIndex: number;
    setFocusIndex: (value: number) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    getProps: <T extends keyof GetProps>(elementType: T, option?: GetProps[T][0] | undefined) => GetProps[T][1];
} & FeatureActions;
export { useAutocomplete };
