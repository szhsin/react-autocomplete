import { useRef, useState, useCallback } from 'react';

const useAutocomplete = ({
  onChange = () => {},
  feature: useFeature,
  traversal: useTraversal,
  getItemValue: _getItemValue
}) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState();
  const [instance] = useState({
    b: '',
    c: []
  });
  const getItemValue = useCallback(item => item == null ? null : _getItemValue ? _getItemValue(item) : item.toString(), [_getItemValue]);
  const setInputValue = useCallback(value => {
    const input = inputRef.current;
    if (input) input.value = value;
  }, []);
  const state = {
    setInputValue,
    focusItem,
    setFocusItem,
    open,
    setOpen
  };
  const contextual = {
    _: instance,
    getItemValue,
    onChange,
    inputRef,
    ...state
  };
  const {
    getInputProps: _getInputProps,
    getItemProps: _getItemProps,
    ...actions
  } = useFeature({
    ...contextual,
    ...useTraversal(contextual)
  });
  const {
    onBlur,
    ...featureInputProps
  } = _getInputProps();
  const getInputProps = () => ({
    ...featureInputProps,
    onBlur: e => !instance.a && (onBlur == null ? void 0 : onBlur(e)),
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
