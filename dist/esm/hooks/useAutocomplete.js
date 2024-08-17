import { useRef, useState } from 'react';
import { useId } from './useId.js';
import { defaultFocusIndex } from '../common.js';

const useAutocomplete = ({
  onChange,
  feature: useFeature,
  isItemSelected,
  inputRef: externalInputRef,
  ...passthrough
}) => {
  const internalInputRef = useRef(null);
  const [tmpValue, setTmpValue] = useState();
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(defaultFocusIndex);
  const state = {
    isItemSelected,
    inputRef: externalInputRef || internalInputRef,
    focusIndex,
    setFocusIndex,
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
