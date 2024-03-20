import type { HTMLAttributes, InputHTMLAttributes } from 'react';
export interface GetProps<T> {
    getInputProps: () => InputHTMLAttributes<HTMLInputElement>;
    getListProps: () => HTMLAttributes<HTMLElement>;
    getItemProps: (option: {
        item: T;
    }) => HTMLAttributes<HTMLElement>;
}
export interface AutocompleteState<T> {
    setInputValue: (value: string) => void;
    focusItem: T | null | undefined;
    setFocusItem: (item?: T | null | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
}
export type ChangeType = 'submit' | 'input' | 'blur' | 'esc';
export interface ContextualProps {
    onChange: (value: string, meta: {
        type: ChangeType;
    }) => void;
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
export interface Contextual<T> extends ContextualProps, AutocompleteState<T> {
    inputRef: React.RefObject<HTMLInputElement>;
    getItemValue: (item: T | undefined | null) => string | undefined | null;
    /**
     * ### INTERNAL API ###
     */
    _: Instance;
}
export interface TraversalProps<T> {
    traverseInput?: boolean;
    isItemDisabled?: (item: T) => boolean;
}
export type Traversal<T> = (cx: Contextual<T>) => {
    traverse: (isForward: boolean) => T | null | undefined;
};
export type Feature<T, Actions = object> = (cx: Contextual<T> & ReturnType<Traversal<T>>) => GetProps<T> & Actions;
interface GetItemValue<T> {
    getItemValue: (item: T) => string;
}
export type AutocompleteProps<T, FeatureActions = object> = Partial<ContextualProps> & {
    feature: Feature<T, FeatureActions>;
    traversal: Traversal<T>;
} & (T extends string ? Partial<GetItemValue<T>> : GetItemValue<T>);
export {};
