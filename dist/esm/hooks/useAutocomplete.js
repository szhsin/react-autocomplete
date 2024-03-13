import { useRef, useState, useCallback } from 'react';

const useAutocomplete = ({
  items = [],
  onChange = () => {},
  feature: useFeature,
  getItemValue: _getItemValue
}) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [instance] = useState({
    b: '',
    c: []
  });
  const getItemValue = item => item == null ? null : _getItemValue ? _getItemValue(item) : item.toString();
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
    getInputProps: _getInputProps,
    getItemProps: _getItemProps,
    ...actions
  } = useFeature({
    _: instance,
    items,
    getItemValue,
    onChange,
    inputRef,
    ...state
  });
  const {
    onBlur,
    onKeyDown,
    ...featureInputProps
  } = _getInputProps();
  const getInputProps = () => ({
    ...featureInputProps,
    onBlur: e => !instance.a && (onBlur == null ? void 0 : onBlur(e)),
    onKeyDown: e => {
      const {
        key
      } = e;
      if (items.length && (key === 'ArrowUp' || key === 'ArrowDown')) e.preventDefault();
      onKeyDown == null || onKeyDown(e);
    },
    ref: inputRef
  });
  const getItemProps = option => {
    const {
      onMouseDown,
      onClick,
      ...featureItemProps
    } = _getItemProps(option);
    return {
      ...featureItemProps,
      onMouseDown: e => {
        onMouseDown == null || onMouseDown(e);
        instance.a = 1;
      },
      onClick: e => {
        var _inputRef$current;
        onClick == null || onClick(e);
        (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
        instance.a = 0;
      }
    };
  };
  return {
    getInputProps,
    getItemProps,
    ...state,
    ...actions
  };
};

export { useAutocomplete };
