import type { InputHTMLAttributes } from 'react';
declare const useAutocomplete: ({ input, onInputChange, isOpen, onOpenChange, items }: {
    input?: string | undefined;
    onInputChange: (value: string) => void;
    isOpen?: boolean | undefined;
    onOpenChange?: ((open: boolean) => void) | undefined;
    items?: string[] | undefined;
}) => {
    inputProps: InputHTMLAttributes<HTMLInputElement>;
    focusIndex: number;
};
export { useAutocomplete };