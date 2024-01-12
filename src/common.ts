export interface AutocompleteState {
  inputValue: string;
  setInputValue: (value: string) => void;
  focusIndex: number;
  setFocusIndex: (value: number) => void;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

interface ContextualProps {
  onChange: (value: string) => void;
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
}

export interface Contextual extends ContextualProps, AutocompleteState {
  /**
   * ### INTERNAL API ###
   */
  _: Instance;
}

type FeatureEventHandler<E> = (event: E) => void;

export type Feature = (cx: Contextual) => {
  onInputChange?: FeatureEventHandler<{ value: string }>;
  onInputClick?: () => void;
  onBlur?: () => void;
  onKeyDown?: FeatureEventHandler<{ key: string }>;
  onItemClick?: FeatureEventHandler<{ index: number }>;
};

export interface AutocompleteProps extends Partial<ContextualProps> {
  feature?: Feature;
}
