const autocomplete = () => ({
  items,
  onChange,
  inputValue,
  setInputValue,
  focusIndex,
  setFocusIndex,
  isOpen,
  setOpen
}) => {
  const updateAndCloseList = value => {
    if (isOpen) {
      if (value != null) {
        setInputValue(value);
        onChange(value);
      }
      setOpen(false);
      setFocusIndex(-1);
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
      setFocusIndex(-1);
      setOpen(true);
      onChange(value);
    },
    onInputClick: () => setOpen(true),
    onBlur: () => updateAndCloseList(inputValue),
    onKeyDown: ({
      key
    }) => {
      const traverseItems = itemIndex => {
        setFocusIndex(itemIndex);
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
