import type { InputHTMLAttributes, HTMLAttributes } from 'react';
import { AutocompleteProps, AutocompleteState } from '../common';
interface GetProps {
    input: [never, InputHTMLAttributes<HTMLInputElement>];
    item: [{
        index?: number;
    }, HTMLAttributes<HTMLElement>];
}
declare const useAutocomplete: ({ feature, items, onChange }: AutocompleteProps) => {
    getProps: <T extends keyof GetProps>(elementType: T, option?: GetProps[T][0] | undefined) => GetProps[T][1];
    state: AutocompleteState;
};
export { useAutocomplete };
