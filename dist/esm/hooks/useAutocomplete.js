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
    getProps: getFeatureProps,
    ...actions
  } = useFeature({
    _: instance,
    items,
    onChange,
    inputRef,
    ...state
  });
  const {
    onBlur,
    onKeyDown,
    ...featureInputProps
  } = getFeatureProps('input');
  const inputProps = {
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
  };
  const getItemProps = option => {
    const {
      onMouseDown,
      onClick,
      ...featureItemProps
    } = getFeatureProps('item', option);
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
  const getProps = (elementType, option) => {
    switch (elementType) {
      case 'item':
        return getItemProps(option);
      case 'input':
      default:
        return inputProps;
    }
  };
  return {
    getProps,
    ...state,
    ...actions
  };
};

export { useAutocomplete };
