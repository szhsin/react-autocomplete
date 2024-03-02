import type { HTMLAttributes, InputHTMLAttributes } from 'react';

/// types

export interface GetProps {
  getInputProps: () => InputHTMLAttributes<HTMLInputElement>;
  getItemProps: (option?: { index?: number }) => HTMLAttributes<HTMLElement>;
}

export interface AutocompleteState {
  setInputValue: (value: string) => void;
  focusIndex: number;
  setFocusIndex: (value: number) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export type ChangeType = 'submit' | 'input' | 'blur' | 'esc';

export interface ContextualProps<T> {
  onChange: (value: string, meta: { type: ChangeType }) => void;
  items: T[];
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

export interface Contextual<T> extends ContextualProps<T>, AutocompleteState {
  inputRef: React.RefObject<HTMLInputElement>;
  getItemValue: (item: T | undefined | null) => string | undefined | null;
  /**
   * ### INTERNAL API ###
   */
  _: Instance;
}

export type Feature<T, Actions = object> = (cx: Contextual<T>) => GetProps & Actions;

interface GetItemValue<T> {
  getItemValue: (item: T) => string;
}

export type AutocompleteProps<T, FeatureActions = object> = Partial<ContextualProps<T>> & {
  feature: Feature<T, FeatureActions>;
} & (T extends string ? Partial<GetItemValue<T>> : GetItemValue<T>);

/// constants
