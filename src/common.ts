/// types
export interface AutocompleteState {
  setInputValue: (value: string) => void;
  focusIndex: number;
  setFocusIndex: (value: number) => void;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

export type ChangeType = 'submit' | 'change' | 'insert';

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
   * The most recent onChange type
   */
  c?: ChangeType;
}

export interface Contextual extends ContextualProps, AutocompleteState {
  inputRef: React.RefObject<HTMLInputElement>;
  /**
   * ### INTERNAL API ###
   */
  _: Instance;
}

export type Feature<Actions = object> = (cx: Contextual) => {
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  onInputClick?: React.MouseEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onItemClick?: (event: React.MouseEvent<HTMLElement>, props: { index: number }) => void;
} & Actions;

export interface AutocompleteProps<FeatureActions = object> extends Partial<ContextualProps> {
  feature?: Feature<FeatureActions>;
}

/// constants

export const CHANGETYPE_SUBMIT = 'submit';
export const CHANGETYPE_CHANGE = 'change';
export const CHANGETYPE_INSERT = 'insert';
