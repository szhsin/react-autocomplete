import { useState } from 'react';

const useAutocomplete = ({
  input,
  onInputChange,
  isOpen,
  onOpenChange = () => {},
  items = []
}) => {
  const [focusIndex, setfocusIndex] = useState(-1);
  const inputProps = {
    value: input,
    onChange: e => onInputChange(e.target.value),
    onClick: () => onOpenChange(!isOpen),
    onBlur: () => onOpenChange(false),
    onKeyDown: ({
      key
    }) => {
      switch (key) {
        case 'ArrowDown':
          onOpenChange(true);
          setfocusIndex(i => i + 1);
          break;
        case 'ArrowUp':
          onOpenChange(true);
          setfocusIndex(i => i - 1);
          break;
        case 'Enter':
          onOpenChange(false);
          onInputChange(items[focusIndex]);
          break;
      }
    }
  };
  return {
    inputProps,
    focusIndex
  };
};

export { useAutocomplete };
