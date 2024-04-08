import { useCallback } from 'react';
import { mergeEvents } from '../utils/mergeEvents.js';
import { useMutableState } from '../hooks/useMutableState.js';
import { autocomplete } from './autocomplete.js';

const supercomplete = () => {
  const useAutocomplete = autocomplete({
    rovingText: true
  });
  return cx => {
    const {
      getInputProps: _getInputProps,
      ...rest
    } = useAutocomplete(cx);
    const mutable = useMutableState({});
    const {
      inputRef,
      getItemValue,
      setInputValue,
      setFocusItem,
      _: cxInstance
    } = cx;
    return {
      ...rest,
      getInputProps: () => mergeEvents({
        onChange: e => {
          mutable.c = e.nativeEvent.inputType === 'insertText';
        }
      }, _getInputProps()),
      inlineComplete: useCallback(({
        item
      }) => {
        if (mutable.c) {
          var _inputRef$current;
          mutable.c = 0;
          setFocusItem(item);
          const value = getItemValue(item);
          const start = cxInstance.b.length;
          const end = value.length;
          setInputValue(cxInstance.b + value.slice(start));
          cxInstance.c = [start, end];
          (_inputRef$current = inputRef.current) == null || _inputRef$current.setSelectionRange(start, end);
        }
      }, [cxInstance, mutable, inputRef, getItemValue, setFocusItem, setInputValue])
    };
  };
};

export { supercomplete };
