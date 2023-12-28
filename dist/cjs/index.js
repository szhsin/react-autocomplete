'use strict';

var react = require('react');

const useAutocomplete = ({
  onChange,
  onSetInputValue,
  items = []
}) => {
  const inputRef = react.useRef();
  const [inputValue, setInputValueBase] = react.useState('');
  const [focusIndex, setfocusIndex] = react.useState(-1);
  const [isOpen, setOpen] = react.useState(false);
  const [instance] = react.useState({});
  const state = {
    inputValue: [inputValue, setInputValueBase],
    focusIndex: [focusIndex, setfocusIndex],
    isOpen: [isOpen, setOpen]
  };
  const itemLength = items.length;
  const setInputValue = onSetInputValue || setInputValueBase;
  const updateInputByNav = itemIndex => {
    setfocusIndex(itemIndex);
    setInputValue(items[itemIndex], {
      type: 'nav',
      state
    }, setInputValueBase);
  };
  const updateValue = (value, type) => {
    if (value == null) return;
    setInputValue(value, {
      type,
      state
    }, setInputValueBase);
    onChange == null || onChange(value, {
      type,
      state
    });
  };
  const getInputProps = () => ({
    value: inputValue,
    ref: inputRef,
    onChange: e => {
      updateValue(e.target.value, 'type');
      setOpen(true);
      setfocusIndex(-1);
    },
    onClick: () => setOpen(!isOpen),
    onBlur: () => !instance.a && setOpen(false),
    onKeyDown: ({
      key
    }) => {
      let nextIndex = focusIndex;
      switch (key) {
        case 'ArrowDown':
          if (isOpen) {
            if (++nextIndex >= itemLength) nextIndex = 0;
            updateInputByNav(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'ArrowUp':
          if (isOpen) {
            if (--nextIndex < 0) nextIndex = itemLength - 1;
            updateInputByNav(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'Enter':
          if (isOpen) {
            setOpen(false);
            updateValue(items[focusIndex], 'submit');
          }
          break;
        case 'Escape':
          setOpen(false);
          break;
      }
    }
  });
  const getOptionProps = ({
    index = -1
  } = {}) => ({
    onMouseDown: () => instance.a = 1,
    onClick: () => {
      var _inputRef$current;
      setOpen(false);
      updateValue(items[index], 'submit');
      (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
      instance.a = 0;
    }
  });
  const getProps = (elementType, option) => {
    switch (elementType) {
      case 'input':
        return getInputProps();
      default:
        return getOptionProps(option);
    }
  };
  return {
    getProps,
    state
  };
};

exports.useAutocomplete = useAutocomplete;
