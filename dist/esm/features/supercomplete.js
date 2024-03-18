import { useState, useCallback } from 'react';
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
    const [instance] = useState({});
    const {
      inputRef,
      getItemValue,
      setInputValue,
      setFocusItem,
      _: cxInstance
    } = cx;
    return {
      ...rest,
      getInputProps: () => {
        const inputProps = _getInputProps();
        return {
          ...inputProps,
          onChange: e => {
            instance.c = e.nativeEvent.inputType === 'insertText';
            inputProps.onChange(e);
          }
        };
      },
      inlineComplete: useCallback(({
        item
      }) => {
        if (instance.c) {
          var _inputRef$current;
          instance.c = 0;
          setFocusItem(item);
          const value = getItemValue(item);
          const start = cxInstance.b.length;
          const end = value.length;
          setInputValue(cxInstance.b + value.slice(start));
          cxInstance.c = [start, end];
          (_inputRef$current = inputRef.current) == null || _inputRef$current.setSelectionRange(start, end);
        }
      }, [cxInstance, instance, inputRef, getItemValue, setFocusItem, setInputValue])
    };
  };
};

export { supercomplete };
