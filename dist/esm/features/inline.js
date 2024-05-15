import { useCallback } from 'react';
import { useMutableState } from '../hooks/useMutableState.js';

const inline = () => ({
  inputRef,
  getItemValue,
  setInputValue,
  setFocusItem,
  $: cxMutable
}) => {
  const mutable = useMutableState({});
  return {
    getInputProps: () => ({
      onChange: e => {
        mutable.c = e.nativeEvent.inputType === 'insertText';
      }
    }),
    inlineComplete: useCallback(({
      item
    }) => {
      if (mutable.c) {
        var _inputRef$current;
        mutable.c = 0;
        setFocusItem(item);
        const value = getItemValue(item);
        const start = cxMutable.b.length;
        const end = value.length;
        setInputValue(cxMutable.b + value.slice(start));
        (_inputRef$current = inputRef.current) == null || _inputRef$current.setSelectionRange(start, end);
      }
    }, [cxMutable, mutable, inputRef, getItemValue, setFocusItem, setInputValue])
  };
};

export { inline };
