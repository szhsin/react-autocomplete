import { useRef, useState } from 'react';

const useAutocomplete = ({
  value,
  onChange,
  selectedItem,
  onSelectedItemChange,
  isItemDisabled = () => false,
  feature: useFeature,
  traversal: useTraversal,
  getItemValue: _getItemValue
}) => {
  const inputRef = useRef(null);
  const [tmpValue, setTmpValue] = useState();
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState();
  const getItemValue = item => item == null ? '' : _getItemValue ? _getItemValue(item) : item.toString();
  const state = {
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
    onChange: newValue => value != newValue && (onChange == null ? void 0 : onChange(newValue)),
    selectedItem,
    onSelectedItemChange: newItem => newItem !== selectedItem && (onSelectedItemChange == null ? void 0 : onSelectedItemChange(newItem)),
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
