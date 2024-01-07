const autocomplete = () => ({
  props: {
    items,
    onChange
  },
  state: {
    inputValue: [inputValue, setInputValue],
    focusIndex: [focusIndex, setfocusIndex],
    isOpen: [isOpen, setOpen]
  }
}) => {
  const updateAndCloseList = value => {
    if (isOpen) {
      if (value != null) {
        setInputValue(value);
        onChange(value);
      }
      setOpen(false);
      setfocusIndex(-1);
    }
  };
  return {
    onItemClick: ({
      index
    }) => updateAndCloseList(items[index]),
    onInputChange: ({
      value
    }) => {
      setInputValue(value);
      setfocusIndex(-1);
      setOpen(true);
      onChange(value);
    },
    onInputClick: () => setOpen(true),
    onBlur: () => updateAndCloseList(inputValue),
    onKeyDown: ({
      key
    }) => {
      const traverseItems = itemIndex => {
        setfocusIndex(itemIndex);
        setInputValue(items[itemIndex]);
      };
      let nextIndex = focusIndex;
      const itemLength = items.length;
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
