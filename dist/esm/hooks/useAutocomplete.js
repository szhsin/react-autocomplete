import { useRef, useState, useCallback } from 'react';

const useAutocomplete = ({
  feature: useFeature = () => ({}),
  items = [],
  onChange = () => {}
}) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [instance] = useState({
    b: '',
    c: []
  });
  const setInputValue = useCallback(value => {
    const input = inputRef.current;
    if (input) input.value = value;
  }, []);
  const state = {
    setInputValue,
    focusIndex,
    setFocusIndex,
    open,
    setOpen
  };
  const {
    onInputChange,
    onInputSelect,
    onInputClick,
    onBlur,
    onKeyDown,
    onItemClick,
    ...actions
  } = useFeature({
    _: instance,
    items,
    onChange,
    inputRef,
    ...state
  });
  const getInputProps = () => ({
    ref: inputRef,
    onChange: onInputChange,
    onSelect: onInputSelect,
    onClick: onInputClick,
    onBlur: e => !instance.a && (onBlur == null ? void 0 : onBlur(e)),
    onKeyDown: e => {
      const {
        key
      } = e;
      if (items.length && (key === 'ArrowUp' || key === 'ArrowDown')) e.preventDefault();
      onKeyDown == null || onKeyDown(e);
    }
  });
  const getItemProps = ({
    index = -1
  } = {}) => ({
    onMouseDown: () => instance.a = 1,
    onClick: e => {
      var _inputRef$current;
      onItemClick == null || onItemClick(e, {
        index
      });
      (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
      instance.a = 0;
    }
  });
  const getProps = (elementType, option) => {
    switch (elementType) {
      case 'input':
        return getInputProps();
      default:
        return getItemProps(option);
    }
  };
  return {
    getProps,
    ...state,
    ...actions
  };
};

export { useAutocomplete };
