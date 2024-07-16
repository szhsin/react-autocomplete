import { useState, useRef, useId } from 'react';
import type { AutocompleteProps, AutocompleteState, Contextual } from '../common';

const useAutocomplete = <T, FeatureYield extends object>({
  value,
  onChange,
  feature: useFeature,
  traversal: useTraversal,
  ...passthrough
}: AutocompleteProps<T, FeatureYield>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tmpValue, setTmpValue] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState<T | undefined>();
  const id = useId();

  const state: AutocompleteState<T> = {
    inputRef,
    focusItem,
    setFocusItem,
    open,
    setOpen
  };

  const contextual: Contextual<T> = {
    id,
    tmpValue,
    setTmpValue,
    value,
    onChange: (newValue) => value != newValue && onChange?.(newValue),
    ...passthrough,
    ...state
  };

  const featureYield = useFeature({ ...contextual, ...useTraversal(contextual) });

  return {
    ...state,
    ...featureYield
  };
};

export { useAutocomplete };
