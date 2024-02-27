import type { HTMLAttributes, InputHTMLAttributes } from 'react';

/// types

export interface GetProps {
  input: [never, InputHTMLAttributes<HTMLInputElement>];
  item: [{ index?: number }, HTMLAttributes<HTMLElement>];
}

export type GetPropsResult<T extends keyof GetProps> = GetProps[T][1];

export type GetPropsFunc<T extends keyof GetProps> = (option?: GetProps[T][0]) => GetPropsResult<T>;

export interface AutocompleteState {
  setInputValue: (value: string) => void;
  focusIndex: number;
  setFocusIndex: (value: number) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export type ChangeType = 'submit' | 'input' | 'blur' | 'esc';

export interface ContextualProps {
  onChange: (value: string, meta: { type: ChangeType }) => void;
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

export type Feature<Actions = object> = (cx: Contextual) => {
  getProps: <T extends keyof GetProps>(elementType: T, option?: GetProps[T][0]) => GetProps[T][1];
} & Actions;

export interface AutocompleteProps<FeatureActions = object> extends Partial<ContextualProps> {
  feature?: Feature<FeatureActions>;
}

/// constants
