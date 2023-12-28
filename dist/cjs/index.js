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
  const traverseItems = itemIndex => {
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
  const updateAndCloseList = (value, type) => {
    if (isOpen) {
      updateValue(value, type);
      setOpen(false);
      setfocusIndex(-1);
    }
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
    onBlur: () => {
      if (!instance.a) {
        updateAndCloseList(items[focusIndex], 'blur');
      }
    },
    onKeyDown: ({
      key
    }) => {
      let nextIndex = focusIndex;
      switch (key) {
        case 'ArrowDown':
          if (isOpen) {
            if (++nextIndex >= itemLength) nextIndex = 0;
            traverseItems(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'ArrowUp':
          if (isOpen) {
            if (--nextIndex < 0) nextIndex = itemLength - 1;
            traverseItems(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'Enter':
          updateAndCloseList(items[focusIndex], 'submit');
          break;
        case 'Escape':
          updateAndCloseList(items[focusIndex], 'esc');
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
      updateAndCloseList(items[index], 'submit');
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
