'use strict';

var react = require('react');

const useAutocomplete = ({
  input,
  onInputChange,
  onValueChange,
  isOpen,
  onOpenChange = () => {},
  items = []
}) => {
  const [focusIndex, setfocusIndex] = react.useState(-1);
  const itemLength = items.length;
  const updateInput = itemIndex => {
    setfocusIndex(itemIndex);
    onInputChange(items[itemIndex]);
  };
  const updateValue = value => {
    onInputChange(value);
    onValueChange == null || onValueChange(value);
  };
  const inputProps = {
    value: input,
    onChange: e => updateValue(e.target.value),
    onClick: () => onOpenChange(!isOpen),
    onBlur: () => onOpenChange(false),
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
            onOpenChange(true);
          }
          break;
        case 'ArrowUp':
          if (isOpen) {
            if (--nextIndex < 0) nextIndex = itemLength - 1;
            updateInput(nextIndex);
          } else {
            onOpenChange(true);
          }
          break;
        case 'Enter':
          if (isOpen) {
            onOpenChange(false);
            updateValue(items[focusIndex]);
          }
          break;
        case 'Escape':
          onOpenChange(false);
          break;
      }
    }
  };
  return {
    inputProps,
    focusIndex
  };
};

exports.useAutocomplete = useAutocomplete;
