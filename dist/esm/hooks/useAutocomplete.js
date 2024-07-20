import { useRef, useState } from 'react';
import { useId } from './useId.js';

const useAutocomplete = ({
  onChange,
  feature: useFeature,
  isItemSelected,
  ...passthrough
}) => {
  const inputRef = useRef(null);
  const [tmpValue, setTmpValue] = useState();
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState();
  const state = {
    isItemSelected,
    inputRef,
    focusItem,
    setFocusItem,
    open,
    setOpen
  };
  const featureYield = useFeature({
    id: useId(),
    tmpValue,
    setTmpValue,
    onChange: newValue => passthrough.value != newValue && onChange?.(newValue),
    ...passthrough,
    ...state
  });
  return {
    ...state,
    ...featureYield
  };
};

export { useAutocomplete };
