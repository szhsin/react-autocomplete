import type { HTMLAttributes, InputHTMLAttributes, ButtonHTMLAttributes, LabelHTMLAttributes } from 'react';
export interface GetProps<T> {
    getInputProps: () => InputHTMLAttributes<HTMLInputElement>;
    getLabelProps: () => LabelHTMLAttributes<HTMLLabelElement>;
    getToggleProps: () => ButtonHTMLAttributes<HTMLButtonElement>;
    getClearProps: () => ButtonHTMLAttributes<HTMLButtonElement>;
    getInputWrapperProps: () => HTMLAttributes<HTMLElement>;
    getListProps: () => HTMLAttributes<HTMLElement>;
    getItemProps: (option: {
        index: number;
        item: T;
    }) => HTMLAttributes<HTMLElement>;
}
export interface ContextualOrReturn<T> {
    isItemSelected: (item: T) => boolean;
}
export interface AutocompleteReturn<T> extends ContextualOrReturn<T> {
    inputRef: React.RefObject<HTMLInputElement>;
    focusIndex: number;
    setFocusIndex: (index: number) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
}
export interface Equality<T> {
    isEqual: (itemA: T | undefined, itemB: T | undefined) => boolean;
}
export interface PassthroughProps<T> {
    isItemDisabled?: (item: T) => boolean;
    isItemAction?: (item: T) => boolean;
    onAction?: (item: T) => void;
    value: string | undefined;
    onChange: (value?: string | undefined) => void;
    items: T[];
}
export interface AdapterProps<T> extends ContextualOrReturn<T> {
    getItemValue: (item: T | undefined | null) => string;
    getSelectedValue: () => string;
    onSelectChange: (item?: T | undefined) => void;
    removeSelect?: (item?: T | undefined) => void;
}
export interface Contextual<T> extends PassthroughProps<T>, AdapterProps<T>, Equality<T>, AutocompleteReturn<T> {
    id?: string;
    tmpValue?: string;
    setTmpValue: (value?: string | undefined) => void;
}
export interface FeatureState {
    isInputEmpty: boolean;
}
type RequestItemResult<T> = {
    index: number;
    item: T;
} | null | undefined | void;
export interface FeatureProps<T> {
    rovingText?: boolean;
    select?: boolean;
    selectOnBlur?: boolean;
    deselectOnClear?: boolean;
    deselectOnChange?: boolean;
    closeOnSelect?: boolean;
    toggleRef?: React.RefObject<HTMLButtonElement>;
    requestItem: (value: string) => RequestItemResult<T> | Promise<RequestItemResult<T>>;
}
export type AutocompleteFeatureProps<T> = Pick<FeatureProps<T>, 'rovingText' | 'select' | 'selectOnBlur' | 'deselectOnClear' | 'deselectOnChange' | 'closeOnSelect'>;
export type Feature<T, Yield extends object> = (cx: Contextual<T>) => Yield;
export type MergedFeatureYield<T, Features> = Features extends readonly [Feature<T, infer S>] ? S : Features extends readonly [Feature<T, infer F>, ...infer R] ? F & MergedFeatureYield<T, R> : never;
export type MergedFeature<T, Features> = Feature<T, MergedFeatureYield<T, Features>>;
export interface BaseProps<T, FeatureYield extends object> extends PassthroughProps<T> {
    feature: Feature<T, FeatureYield>;
    inputRef?: React.RefObject<HTMLInputElement>;
}
export type AutocompleteProps<T, FeatureYield extends object> = BaseProps<T, FeatureYield> & AdapterProps<T> & Equality<T>;
export type GetItemValue<T> = {
    getItemValue: (item: T) => string;
};
export type MaybeGetItemValue<T> = T extends string ? Partial<GetItemValue<T>> : GetItemValue<T>;
export type Flippable = {
    flipOnSelect?: boolean;
};
export type ComboboxProps<T, FeatureYield extends object = object> = BaseProps<T, FeatureYield> & MaybeGetItemValue<T> & Partial<Equality<T>> & Flippable & {
    selected?: T | undefined;
    onSelectChange?: ((item?: T | undefined) => void) | undefined;
};
export type MultiSelectProps<T, FeatureYield extends object = object> = BaseProps<T, FeatureYield> & MaybeGetItemValue<T> & Partial<Equality<T>> & Flippable & {
    selected: T[];
    onSelectChange?: (items: T[]) => void;
};
export {};