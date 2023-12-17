import type { InputHTMLAttributes } from 'react';
declare const useAutocomplete: ({ onValueChange, items }: {
    onValueChange?: ((value: string) => void) | undefined;
    items?: string[] | undefined;
}) => {
    readonly inputProps: InputHTMLAttributes<HTMLInputElement>;
    readonly state: {
        readonly inputValue: readonly [string, import("react").Dispatch<import("react").SetStateAction<string>>];
        readonly focusIndex: readonly [number, import("react").Dispatch<import("react").SetStateAction<number>>];
        readonly isOpen: readonly [boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>];
    };
};
export { useAutocomplete };
