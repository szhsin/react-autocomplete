import { useRef, useState } from 'react';

const useAutocomplete = ({
  value,
  onChange,
  isItemDisabled = () => false,
  feature: useFeature,
  traversal: useTraversal,
  getItemValue: _getItemValue
}) => {
  const inputRef = useRef(null);
  const [tmpValue, setTmpValue] = useState();
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const getItemValue = item => item == null ? '' : _getItemValue ? _getItemValue(item) : item.toString();
  const state = {
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
    onChange: newValue => {
      if (value != newValue) onChange == null || onChange(newValue);
    },
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
