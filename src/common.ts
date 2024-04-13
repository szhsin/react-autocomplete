import type { HTMLAttributes, InputHTMLAttributes } from 'react';

/// types

export type PropsWithObjectRef<T> = T extends HTMLAttributes<infer E>
  ? T & { ref: React.RefObject<E> }
  : never;

export interface GetProps<T> {
  getInputProps: () => InputHTMLAttributes<HTMLInputElement>;
  getListProps: () => HTMLAttributes<HTMLElement>;
  getItemProps: (option: { item: T }) => HTMLAttributes<HTMLElement>;
}

export interface AutocompleteState<T> {
  setInputValue: (value: string) => void;
  focusItem: T | undefined;
  setFocusItem: (item?: T | undefined) => void;
  selectedItem: T | undefined;
  setSelectedItem: (item?: T | undefined) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export interface ContextualProps<T> {
  isItemDisabled: (item: T) => boolean;
  onChange: (value: string) => void;
}

export interface MutableState {
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

export interface Contextual<T> extends ContextualProps<T>, AutocompleteState<T> {
  inputRef: React.RefObject<HTMLInputElement>;
  getItemValue: (item: T | undefined | null) => string;
  /**
   * ### INTERNAL API ###
   */
  $: MutableState;
}

export interface TraversalProps {
  traverseInput?: boolean;
}

export type Traversal<T> = (cx: Contextual<T>) => {
  traverse: (isForward: boolean) => T | null | undefined;
};

export type Feature<T, Actions = object> = (
  cx: Contextual<T> & ReturnType<Traversal<T>>
) => GetProps<T> & Actions;

interface GetItemValue<T> {
  getItemValue: (item: T) => string;
}

export type AutocompleteProps<T, FeatureActions = object> = Partial<ContextualProps<T>> & {
  feature: Feature<T, FeatureActions>;
  traversal: Traversal<T>;
} & (T extends string ? Partial<GetItemValue<T>> : GetItemValue<T>);

/// constants
