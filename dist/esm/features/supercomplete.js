import { useCallback } from 'react';
import { mergeEvents } from '../utils/mergeEvents.js';
import { useMutableState } from '../hooks/useMutableState.js';
import { autocomplete } from './autocomplete.js';

const supercomplete = props => {
  const useAutocomplete = autocomplete({
    ...props,
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
      $: cxMutable
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
          const start = cxMutable.b.length;
          const end = value.length;
          setInputValue(cxMutable.b + value.slice(start));
          cxMutable.c = [start, end];
          (_inputRef$current = inputRef.current) == null || _inputRef$current.setSelectionRange(start, end);
        }
      }, [cxMutable, mutable, inputRef, getItemValue, setFocusItem, setInputValue])
    };
  };
};

export { supercomplete };
