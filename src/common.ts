import type { HTMLAttributes, InputHTMLAttributes, ButtonHTMLAttributes } from 'react';

/// types

export type GetPropsWithRef<T> = T extends (...args: infer P) => infer R
  ? R extends HTMLAttributes<infer E>
    ? (...args: P) => R & { ref: React.RefObject<E> }
    : never
  : never;

export interface GetPropsFunctions<T> {
  getInputProps: () => InputHTMLAttributes<HTMLInputElement>;
  getToggleProps: () => ButtonHTMLAttributes<HTMLButtonElement>;
  getClearProps: () => ButtonHTMLAttributes<HTMLButtonElement>;
  getInputWrapperProps: () => HTMLAttributes<HTMLElement>;
  getListProps: () => HTMLAttributes<HTMLElement>;
  getItemProps: (option: { item: T }) => HTMLAttributes<HTMLElement>;
}

export type GetPropsWithRefFunctions<T> = {
  [P in keyof GetPropsFunctions<T>]: GetPropsWithRef<GetPropsFunctions<T>[P]>;
};

export interface AutocompleteState<T> {
  inputRef: React.RefObject<HTMLInputElement>;
  focusItem: T | undefined;
  setFocusItem: (item?: T | undefined) => void;
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
}

export interface AdapterProps<T> {
  getItemValue: (item: T | undefined | null) => string;
  getSelectedValue: () => string;
  onSelectChange: (item?: T | undefined) => void;
  removeSelect?: (item?: T | undefined) => void;
}

export interface Contextual<T>
  extends PassthroughProps<T>,
    AdapterProps<T>,
    Equality<T>,
    AutocompleteState<T> {
  tmpValue?: string;
  setTmpValue: (value?: string | undefined) => void;
}

export interface Clearable {
  clearable: boolean;
}

export interface TraversalProps {
  traverseInput?: boolean;
}

export type Traversal<T> = (cx: Contextual<T>) => {
  traverse: (isForward: boolean) => T | null | undefined;
};

export interface FeatureProps<T> {
  rovingText?: boolean;
  select?: boolean;
  selectOnBlur?: boolean;
  deselectOnClear?: boolean;
  deselectOnChange?: boolean;
  closeOnSelect?: boolean;
  getInlineItem: (
    value: string
  ) => T | undefined | null | void | Promise<T | undefined | null | void>;
}

export type AutocompleteFeatureProps<T> = Pick<
  FeatureProps<T>,
  | 'rovingText'
  | 'select'
  | 'selectOnBlur'
  | 'deselectOnClear'
  | 'deselectOnChange'
  | 'closeOnSelect'
>;

export type Feature<T, Yield extends object> = (
  cx: Contextual<T> & ReturnType<Traversal<T>>
) => Yield;

export type MergedFeatureYield<T, Features> = Features extends readonly [Feature<T, infer S>]
  ? S
  : Features extends readonly [Feature<T, infer F>, ...infer R]
  ? F & MergedFeatureYield<T, R>
  : never;

export type MergedFeature<T, Features> = Feature<T, MergedFeatureYield<T, Features>>;

export type BaseProps<T, FeatureYield extends object> = Partial<PassthroughProps<T>> & {
  feature: Feature<T, FeatureYield>;
  traversal: Traversal<T>;
};

export type AutocompleteProps<T, FeatureYield extends object> = BaseProps<T, FeatureYield> &
  AdapterProps<T> &
  Equality<T>;

export type GetItemValue<T> = {
  getItemValue: (item: T) => string;
};

export type MaybeGetItemValue<T> = T extends string
  ? Partial<GetItemValue<T>>
  : GetItemValue<T>;

export type Flippable = {
  flipOnSelect?: boolean;
};

export type ComboboxProps<T, FeatureYield extends object = object> = BaseProps<
  T,
  FeatureYield
> &
  MaybeGetItemValue<T> &
  Partial<Equality<T>> &
  Flippable & {
    selected?: T | undefined;
    onSelectChange?: ((item?: T | undefined) => void) | undefined;
  };

export type MultiSelectProps<T, FeatureYield extends object = object> = BaseProps<
  T,
  FeatureYield
> &
  MaybeGetItemValue<T> &
  Partial<Equality<T>> &
  Flippable & {
    selected: T[];
    onSelectChange?: (items: T[]) => void;
  };

/// constants

export const defaultEqual = <T>(itemA: T | undefined, itemB: T | undefined) => itemA === itemB;
