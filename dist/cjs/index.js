'use strict';

var react = require('react');

const useAutocomplete = ({
  onValueChange,
  items = []
}) => {
  const [inputValue, setInputValue] = react.useState('');
  const [focusIndex, setfocusIndex] = react.useState(-1);
  const [isOpen, setOpen] = react.useState(false);
  const itemLength = items.length;
  const updateInput = itemIndex => {
    setfocusIndex(itemIndex);
    setInputValue(items[itemIndex]);
  };
  const updateValue = value => {
    if (value == null) return;
    setInputValue(value);
    onValueChange == null || onValueChange(value);
  };
  const inputProps = {
    value: inputValue,
    onChange: e => {
      updateValue(e.target.value);
      setOpen(true);
      setfocusIndex(-1);
    },
    onClick: () => setOpen(!isOpen),
    onBlur: () => setOpen(false),
    onKeyDown: ({
      key
    }) => {
      let nextIndex = focusIndex;
      switch (key) {
        case 'ArrowDown':
          if (isOpen) {
            if (++nextIndex >= itemLength) nextIndex = 0;
            updateInput(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'ArrowUp':
          if (isOpen) {
            if (--nextIndex < 0) nextIndex = itemLength - 1;
            updateInput(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'Enter':
          if (isOpen) {
            setOpen(false);
            updateValue(items[focusIndex]);
          }
          break;
        case 'Escape':
          setOpen(false);
          break;
      }
    }
  };
  return {
    inputProps,
    state: {
      inputValue: [inputValue, setInputValue],
      focusIndex: [focusIndex, setfocusIndex],
      isOpen: [isOpen, setOpen]
    }
  };
};

exports.useAutocomplete = useAutocomplete;
