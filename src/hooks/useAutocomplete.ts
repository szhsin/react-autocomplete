import { useState, useRef } from 'react';
import { useId } from './useId';
import { defaultFocusIndex } from '../common';
import type { AutocompleteProps, AutocompleteReturn } from '../types';

const useAutocomplete = <T, FeatureYield extends object>({
  onChange,
  feature: useFeature,
  isItemSelected,
  ...passthrough
}: AutocompleteProps<T, FeatureYield>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tmpValue, setTmpValue] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(defaultFocusIndex);

  const state: AutocompleteReturn<T> = {
    isItemSelected,
    inputRef,
    focusIndex,
    setFocusIndex,
    open,
    setOpen
  };

  const featureYield = useFeature({
    id: useId(),
    tmpValue,
    setTmpValue,
    onChange: (newValue) => passthrough.value != newValue && onChange?.(newValue),
    ...passthrough,
    ...state
  });

  return {
    ...state,
    ...featureYield
  };
};

export { useAutocomplete };
