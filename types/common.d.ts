import type { HTMLAttributes, InputHTMLAttributes, ButtonHTMLAttributes } from 'react';
export type PropsWithObjectRef<T> = T extends HTMLAttributes<infer E> ? T & {
    ref: React.RefObject<E>;
} : never;
export interface GetProps<T> {
    getInputProps: () => PropsWithObjectRef<InputHTMLAttributes<HTMLInputElement>>;
    getToggleProps: () => PropsWithObjectRef<ButtonHTMLAttributes<HTMLButtonElement>>;
    getListProps: () => HTMLAttributes<HTMLElement>;
    getItemProps: (option: {
        item: T;
    }) => HTMLAttributes<HTMLElement>;
}
export interface AutocompleteState<T> {
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    selectedItem: T | undefined;
    setSelectedItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
}
export interface ContextualProps<T> {
    isItemDisabled: (item: T) => boolean;
    value: string;
    onChange: (value: string) => void;
}
export interface Contextual<T> extends ContextualProps<T>, AutocompleteState<T> {
    tmpValue?: string;
    setTmpValue: (value?: string | undefined) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    getItemValue: (item: T | undefined | null) => string;
}
export interface TraversalProps {
    traverseInput?: boolean;
}
export type Traversal<T> = (cx: Contextual<T>) => {
    traverse: (isForward: boolean) => T | null | undefined;
};
export type Feature<T, Yield extends object> = (cx: Contextual<T> & ReturnType<Traversal<T>>) => Yield;
export type MergedFeatureYield<T, Features> = Features extends readonly [Feature<T, infer S>] ? S : Features extends readonly [Feature<T, infer F>, ...infer R] ? F & MergedFeatureYield<T, R> : never;
export type MergedFeature<T, Features> = Feature<T, MergedFeatureYield<T, Features>>;
interface GetItemValue<T> {
    getItemValue: (item: T) => string;
}
export type AutocompleteProps<T, FeatureYield extends object = object> = Partial<ContextualProps<T>> & {
    feature: Feature<T, FeatureYield>;
    traversal: Traversal<T>;
} & (T extends string ? Partial<GetItemValue<T>> : GetItemValue<T>);
export {};
