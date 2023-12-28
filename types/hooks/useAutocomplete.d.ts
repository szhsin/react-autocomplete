import type { InputHTMLAttributes, HTMLAttributes } from 'react';
interface GetProps {
    input: [never, InputHTMLAttributes<HTMLInputElement>];
    option: [{
        index?: number;
    }, HTMLAttributes<HTMLElement>];
}
type ValueEventType = 'type' | 'submit' | 'esc' | 'blur' | 'nav';
interface AutocompleteProps {
    onChange?: (value: string, meta: {
        type: ValueEventType;
    }) => void;
    onSetInputValue?: (value: string, meta: {
        type: ValueEventType;
    }) => void;
    items?: string[];
}
declare const useAutocomplete: ({ onChange, onSetInputValue, items }: AutocompleteProps) => {
    getProps: <T extends keyof GetProps>(elementType: T, option?: GetProps[T][0] | undefined) => GetProps[T][1];
    state: {
        readonly inputValue: readonly [string, (value: string, meta: {
            type: ValueEventType;
        }) => void];
        readonly focusIndex: readonly [number, import("react").Dispatch<import("react").SetStateAction<number>>];
        readonly isOpen: readonly [boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>];
    };
};
export { useAutocomplete };
