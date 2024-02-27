import type { HTMLAttributes, InputHTMLAttributes } from 'react';
export interface GetProps {
    getInputProps: () => InputHTMLAttributes<HTMLInputElement>;
    getItemProps: (option?: {
        index?: number;
    }) => HTMLAttributes<HTMLElement>;
}
export interface AutocompleteState {
    setInputValue: (value: string) => void;
    focusIndex: number;
    setFocusIndex: (value: number) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
}
export type ChangeType = 'submit' | 'input' | 'blur' | 'esc';
export interface ContextualProps {
    onChange: (value: string, meta: {
        type: ChangeType;
    }) => void;
    items: string[];
}
export interface Instance {
    /**
     * ### INTERNAL API ###
     * Whether to bypass onblur event on input
     */
    a?: number;
    /**
     * ### INTERNAL API ###
     * The most recent value
     */
    b: string;
    /**
     * ### INTERNAL API ###
     * The last recorded selection position
     */
    c: [number | null, number | null] | [];
}
export interface Contextual extends ContextualProps, AutocompleteState {
    inputRef: React.RefObject<HTMLInputElement>;
    /**
     * ### INTERNAL API ###
     */
    _: Instance;
}
export type Feature<Actions = object> = (cx: Contextual) => GetProps & Actions;
export interface AutocompleteProps<FeatureActions = object> extends Partial<ContextualProps> {
    feature: Feature<FeatureActions>;
}
