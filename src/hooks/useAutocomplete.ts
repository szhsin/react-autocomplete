import { useState, useRef } from 'react';
import type { AutocompleteProps, AutocompleteState, Contextual } from '../common';

const useAutocomplete = <T, FeatureYield extends object>({
  value,
  onChange,
  selectedItem,
  onSelectedItemChange,
  isItemDisabled = () => false,
  feature: useFeature,
  traversal: useTraversal,
  getItemValue: _getItemValue
}: AutocompleteProps<T, FeatureYield>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tmpValue, setTmpValue] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState<T | undefined>();

  const getItemValue: Contextual<T>['getItemValue'] = (item) =>
    item == null ? '' : _getItemValue ? _getItemValue(item) : item.toString();

  const state: AutocompleteState<T> = {
    focusItem,
    setFocusItem,
    open,
    setOpen
  };

  const contextual = {
    tmpValue,
    setTmpValue,
    getItemValue,
    isItemDisabled,
    value,
    onChange: (newValue?: string | undefined) => value != newValue && onChange?.(newValue),
    selectedItem,
    onSelectedItemChange: (newItem?: T | undefined) =>
      newItem !== selectedItem && onSelectedItemChange?.(newItem),
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
