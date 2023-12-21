import type { InputHTMLAttributes, HTMLAttributes } from 'react';
interface GetProps {
    input: [never, InputHTMLAttributes<HTMLInputElement>];
    option: [{
        index?: number;
    }, HTMLAttributes<HTMLElement>];
}
declare const useAutocomplete: ({ onValueChange, items }: {
    onValueChange?: ((value: string) => void) | undefined;
    items?: string[] | undefined;
}) => {
    getProps: <T extends keyof GetProps>(elementType: T, option?: GetProps[T][0] | undefined) => GetProps[T][1];
    state: {
        readonly inputValue: readonly [string, import("react").Dispatch<import("react").SetStateAction<string>>];
        readonly focusIndex: readonly [number, import("react").Dispatch<import("react").SetStateAction<number>>];
        readonly isOpen: readonly [boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>];
    };
};
export { useAutocomplete };
