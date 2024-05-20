import { useState, useRef, useCallback } from 'react';
import type { AutocompleteProps, AutocompleteState, Contextual } from '../common';

const useAutocomplete = <T, FeatureYield extends object>({
  value = '',
  onChange = () => {},
  isItemDisabled = () => false,
  feature: useFeature,
  traversal: useTraversal,
  getItemValue: _getItemValue
}: AutocompleteProps<T, FeatureYield>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState<T | undefined>();
  const [selectedItem, setSelectedItem] = useState<T | undefined>();

  const getItemValue: Contextual<T>['getItemValue'] = useCallback(
    (item) => (item == null ? '' : _getItemValue ? _getItemValue(item) : item.toString()),
    [_getItemValue]
  );

  const setInputValue = useCallback((value: string) => {
    const input = inputRef.current;
    if (input) input.value = value;
  }, []);

  const state: AutocompleteState<T> = {
    setInputValue,
    focusItem,
    setFocusItem,
    selectedItem,
    setSelectedItem,
    open,
    setOpen
  };

  const contextual = {
    getItemValue,
    isItemDisabled,
    value,
    onChange,
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
