import { useState, useCallback } from 'react';
import { autocomplete } from './autocomplete.js';

const supercomplete = () => {
  const base = autocomplete({
    rovingInput: true
  });
  return ({
    setFocusIndex: _setFocusIndex,
    onChange: _onChange,
    ...cx
  }) => {
    const [instance] = useState({
      a: []
    });
    const setFocusIndex = useCallback(value => {
      instance.b = value;
      _setFocusIndex(value);
    }, [instance, _setFocusIndex]);
    const onChange = (value, meta) => {
      if (meta.type !== 'input') {
        instance.c = false;
        instance.a = [];
      }
      _onChange(value, meta);
    };
    const baseFeature = base({
      ...cx,
      setFocusIndex,
      onChange
    });
    const {
      inputRef,
      setInputValue,
      _: cxInstance
    } = cx;
    return {
      ...baseFeature,
      onInputChange: e => {
        instance.c = e.nativeEvent.inputType === 'insertText';
        if (!instance.c) instance.a = [];
        baseFeature.onInputChange(e);
      },
      onKeyDown: e => {
        baseFeature.onKeyDown(e);
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          const [index, action] = instance.a;
          if (instance.b === index) action == null || action();
        }
      },
      inlineComplete: useCallback(({
        index,
        value
      }) => {
        if (instance.c) {
          const action = () => {
            var _inputRef$current;
            setFocusIndex(index);
            const valueLength = cxInstance.b.length;
            const newValue = cxInstance.b + value.slice(valueLength);
            setInputValue(newValue);
            (_inputRef$current = inputRef.current) == null || _inputRef$current.setSelectionRange(valueLength, value.length);
          };
          action();
          instance.a = [index, action];
        }
      }, [cxInstance, instance, inputRef, setFocusIndex, setInputValue])
    };
  };
};

export { supercomplete };
