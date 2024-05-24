import { useCallback } from 'react';
import { useMutableState } from '../hooks/useMutableState.js';

const inline = () => ({
  inputRef,
  getItemValue,
  setTmpValue,
  setFocusItem
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
        mutable.c = 0;
        setFocusItem(item);
        const itemValue = getItemValue(item);
        const input = inputRef.current;
        const {
          value
        } = input;
        const start = value.length;
        const end = itemValue.length;
        setTmpValue(value + itemValue.slice(start));
        input.setSelectionRange(start, end);
      }
    }, [mutable, inputRef, getItemValue, setFocusItem, setTmpValue])
  };
};

export { inline };
