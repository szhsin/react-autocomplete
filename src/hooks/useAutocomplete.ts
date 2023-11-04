import type { InputHTMLAttributes } from 'react';
import { useState } from 'react';

const useAutocomplete = ({
  input,
  onInputChange,
  isOpen,
  onOpenChange = () => {
    /* default */
  },
  items = []
}: {
  input?: string;
  onInputChange: (value: string) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  items?: string[];
}) => {
  const [focusIndex, setfocusIndex] = useState(-1);
  const itemLength = items.length;
  const updateInput = (itemIndex: number) => {
    setfocusIndex(itemIndex);
    onInputChange(items[itemIndex]);
  };

  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    value: input,

    onChange: (e) => onInputChange(e.target.value),

    onClick: () => onOpenChange(!isOpen),

    onBlur: () => onOpenChange(false),

    onKeyDown: ({ key }) => {
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
            onInputChange(items[focusIndex]);
          }
          break;
        case 'Escape':
          onOpenChange(false);
          break;
      }
    }
  };
  return { inputProps, focusIndex };
};

export { useAutocomplete };
