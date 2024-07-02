import { useState, useRef } from 'react';
import type { AutocompleteProps, AutocompleteState } from '../common';

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

  const state: AutocompleteState<T> = {
    focusItem,
    setFocusItem,
    open,
    setOpen
  };

  const contextual = {
    inputRef,
    tmpValue,
    setTmpValue,
    value,
    onChange: (newValue?: string | undefined) => value != newValue && onChange?.(newValue),
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
