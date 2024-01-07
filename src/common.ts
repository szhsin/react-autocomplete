export interface AutocompleteState {
  inputValue: [string, React.Dispatch<React.SetStateAction<string>>];
  focusIndex: [number, React.Dispatch<React.SetStateAction<number>>];
  isOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

interface ContextualProps {
  onChange: (value: string) => void;
  items: string[];
}

export interface Contextual {
  state: AutocompleteState;
  props: ContextualProps;
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
