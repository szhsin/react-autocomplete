import type { InputHTMLAttributes } from 'react';
import { useState } from 'react';

const useAutocomplete = ({
  onValueChange,
  items = []
}: {
  onValueChange?: (value: string) => void;
  items?: string[];
}) => {
  const [inputValue, setInputValue] = useState('');
  const [focusIndex, setfocusIndex] = useState(-1);
  const [isOpen, setOpen] = useState(false);

  const itemLength = items.length;
  const updateInput = (itemIndex: number) => {
    setfocusIndex(itemIndex);
    setInputValue(items[itemIndex]);
  };
  const updateValue = (value: string) => {
    setInputValue(value);
    onValueChange?.(value);
  };

  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    value: inputValue,

    onChange: (e) => updateValue(e.target.value),

    onClick: () => setOpen(!isOpen),

    onBlur: () => setOpen(false),

    onKeyDown: ({ key }) => {
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
  } as const;
};

export { useAutocomplete };
