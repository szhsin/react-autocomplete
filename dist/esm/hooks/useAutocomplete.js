import { useRef, useState, useCallback } from 'react';

const useAutocomplete = ({
  value = '',
  onChange = () => {},
  isItemDisabled = () => false,
  feature: useFeature,
  traversal: useTraversal,
  getItemValue: _getItemValue
}) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const getItemValue = useCallback(item => item == null ? '' : _getItemValue ? _getItemValue(item) : item.toString(), [_getItemValue]);
  const setInputValue = useCallback(value => {
    const input = inputRef.current;
    if (input) input.value = value;
  }, []);
  const state = {
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
  const featureYield = useFeature({
    ...contextual,
    ...useTraversal(contextual)
  });
  return {
    ...state,
    ...featureYield
  };
};

export { useAutocomplete };
