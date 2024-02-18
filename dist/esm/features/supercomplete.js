import { useState, useCallback } from 'react';
import { autocomplete } from './autocomplete.js';

const supercomplete = () => {
  const useAutocomplete = autocomplete({
    rovingText: true
  });
  return cx => {
    const autocompleteFeature = useAutocomplete(cx);
    const [instance] = useState({});
    const {
      inputRef,
      setInputValue,
      setFocusIndex,
      _: cxInstance
    } = cx;
    return {
      ...autocompleteFeature,
      onInputChange: e => {
        instance.c = e.nativeEvent.inputType === 'insertText';
        autocompleteFeature.onInputChange(e);
      },
      inlineComplete: useCallback(({
        index,
        value
      }) => {
        if (instance.c) {
          var _inputRef$current;
          instance.c = 0;
          setFocusIndex(index);
          const start = cxInstance.b.length;
          const end = value.length;
          setInputValue(cxInstance.b + value.slice(start));
          cxInstance.c = [start, end];
          (_inputRef$current = inputRef.current) == null || _inputRef$current.setSelectionRange(start, end);
        }
      }, [cxInstance, instance, inputRef, setFocusIndex, setInputValue])
    };
  };
};

export { supercomplete };
