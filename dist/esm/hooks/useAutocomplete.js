import { useRef, useState } from 'react';

const useAutocomplete = ({
  value,
  onChange,
  feature: useFeature,
  traversal: useTraversal,
  ...passthrough
}) => {
  const inputRef = useRef(null);
  const [tmpValue, setTmpValue] = useState();
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState();
  const state = {
    inputRef,
    focusItem,
    setFocusItem,
    open,
    setOpen
  };
  const contextual = {
    tmpValue,
    setTmpValue,
    value,
    onChange: newValue => value != newValue && (onChange == null ? void 0 : onChange(newValue)),
    ...passthrough,
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
