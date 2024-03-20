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
    getListProps: _getListProps,
    ...otherProps
  } = useFeature({
    ...contextual,
    ...useTraversal(contextual)
  });
  const getInputProps = () => {
    const {
      onBlur,
      ...rest
    } = _getInputProps();
    return {
      ...rest,
      onBlur: e => !instance.a && (onBlur == null ? void 0 : onBlur(e)),
      ref: inputRef
    };
  };
  const getListProps = () => {
    const {
      onMouseDown,
      onClick,
      ...rest
    } = _getListProps();
    return {
      ...rest,
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
    getListProps,
    ...state,
    ...otherProps
  };
};

export { useAutocomplete };
