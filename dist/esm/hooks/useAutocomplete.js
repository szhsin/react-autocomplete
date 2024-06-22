import { useRef, useState } from 'react';

const useAutocomplete = ({
  value,
  onChange,
  isItemDisabled = () => false,
  feature: useFeature,
  traversal: useTraversal,
  ...adapterProps
}) => {
  const inputRef = useRef(null);
  const [tmpValue, setTmpValue] = useState();
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState();
  const state = {
    focusItem,
    setFocusItem,
    open,
    setOpen
  };
  const contextual = {
    inputRef,
    isItemDisabled,
    tmpValue,
    setTmpValue,
    value,
    onChange: newValue => value != newValue && (onChange == null ? void 0 : onChange(newValue)),
    ...adapterProps,
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
