import type { InputHTMLAttributes, HTMLAttributes } from 'react';
interface GetProps {
    input: [never, InputHTMLAttributes<HTMLInputElement>];
    option: [{
        index?: number;
    }, HTMLAttributes<HTMLElement>];
}
type ValueEventType = 'type' | 'submit' | 'esc' | 'blur' | 'nav' | 'focus';
export type AutocompleteState = ReturnType<typeof useAutocomplete>['state'];
export interface AutocompleteProps {
    onChange?: (value: string, meta: {
        type: ValueEventType;
        state: AutocompleteState;
    }) => void;
    onSetInputValue?: (value: string, meta: {
        type: ValueEventType;
        state: AutocompleteState;
    }, base: AutocompleteState['inputValue'][1]) => void;
    onSetOpen?: (value: boolean, meta: {
        type: ValueEventType;
        state: AutocompleteState;
    }, base: AutocompleteState['isOpen'][1]) => void;
    items?: string[];
}
declare const useAutocomplete: ({ onChange, onSetInputValue, onSetOpen, items }: AutocompleteProps) => {
    getProps: <T extends keyof GetProps>(elementType: T, option?: GetProps[T][0] | undefined) => GetProps[T][1];
    state: {
        readonly inputValue: readonly [string, import("react").Dispatch<import("react").SetStateAction<string>>];
        readonly focusIndex: readonly [number, import("react").Dispatch<import("react").SetStateAction<number>>];
        readonly isOpen: readonly [boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>];
    };
};
export { useAutocomplete };
