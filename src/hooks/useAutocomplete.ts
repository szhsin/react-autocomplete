import { useState, useRef, useCallback } from 'react';
import type { AutocompleteProps, AutocompleteState, Contextual } from '../common';

const useAutocomplete = <T, FeatureYield extends object>({
  value,
  onChange,
  isItemDisabled = () => false,
  feature: useFeature,
  traversal: useTraversal,
  getItemValue: _getItemValue
}: AutocompleteProps<T, FeatureYield>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tmpValue, setTmpValue] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState<T | undefined>();
  const [selectedItem, setSelectedItem] = useState<T | undefined>();

  const getItemValue: Contextual<T>['getItemValue'] = useCallback(
    (item) => (item == null ? '' : _getItemValue ? _getItemValue(item) : item.toString()),
    [_getItemValue]
  );

  const state: AutocompleteState<T> = {
    focusItem,
    setFocusItem,
    selectedItem,
    setSelectedItem,
    open,
    setOpen
  };

  const contextual = {
    tmpValue,
    setTmpValue,
    getItemValue,
    isItemDisabled,
    value,
    onChange: (newValue?: string | undefined) => {
      if (value != newValue) onChange?.(newValue);
    },
    inputRef,
    ...state
  };

  const featureYield = useFeature({ ...contextual, ...useTraversal(contextual) });

  return {
    ...state,
    ...featureYield
  };
};

export { useAutocomplete };
