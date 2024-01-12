import { Feature } from '../common';

const autocomplete: () => Feature =
  () =>
  ({
    _,
    items,
    onChange,
    inputValue,
    setInputValue,
    focusIndex,
    setFocusIndex,
    isOpen,
    setOpen
  }) => {
    const updateValue = (value: string) => {
      _.b = value;
      setInputValue(value);
      onChange(value);
    };

    const updateAndCloseList = (value: string | undefined) => {
      if (isOpen) {
        if (value != null) {
          updateValue(value);
        }
        setOpen(false);
        setFocusIndex(-1);
      }
    };

    const traverseItems = (isUp: boolean, baseIndex = -1) => {
      let nextIndex = focusIndex;
      const itemLength = items.length;
      if (isUp) {
        if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
      } else {
        if (++nextIndex >= itemLength) nextIndex = baseIndex;
      }
      setFocusIndex(nextIndex);
      setInputValue(items[nextIndex] ?? _.b);
    };

    return {
      onItemClick: ({ index }) => updateAndCloseList(items[index]),

      onInputChange: ({ value }) => {
        updateValue(value);
        setFocusIndex(-1);
        setOpen(true);
      },

      onInputClick: () => setOpen(true),

      onBlur: () => updateAndCloseList(inputValue),

      onKeyDown: ({ key }) => {
        switch (key) {
          case 'ArrowUp':
            if (isOpen) {
              traverseItems(true);
            } else {
              setOpen(true);
            }
            break;
          case 'ArrowDown':
            if (isOpen) {
              traverseItems(false);
            } else {
              setOpen(true);
            }
            break;
          case 'Enter':
            updateAndCloseList(items[focusIndex]);
            break;
          case 'Escape':
            updateAndCloseList(inputValue);
            break;
        }
      }
    };
  };

export { autocomplete };
