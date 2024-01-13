const autocomplete = ({
  rovingInput
} = {}) => ({
  _,
  items,
  onChange,
  setInputValue,
  focusIndex,
  setFocusIndex,
  isOpen,
  setOpen
}) => {
  const updateValue = value => {
    _.b = value;
    setInputValue(value);
    onChange(value);
  };
  const updateAndCloseList = value => {
    if (isOpen) {
      if (value != null) {
        updateValue(value);
      }
      setOpen(false);
      setFocusIndex(-1);
    }
  };
  const traverseItems = isUp => {
    var _items$nextIndex;
    const baseIndex = rovingInput ? -1 : 0;
    let nextIndex = focusIndex;
    const itemLength = items.length;
    if (isUp) {
      if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
    } else {
      if (++nextIndex >= itemLength) nextIndex = baseIndex;
    }
    setFocusIndex(nextIndex);
    rovingInput && setInputValue((_items$nextIndex = items[nextIndex]) != null ? _items$nextIndex : _.b);
  };
  return {
    onItemClick: ({
      index
    }) => updateAndCloseList(items[index]),
    onInputChange: ({
      value
    }) => {
      updateValue(value);
      setFocusIndex(-1);
      setOpen(true);
    },
    onInputClick: () => setOpen(true),
    onBlur: () => updateAndCloseList(items[focusIndex]),
    onKeyDown: ({
      key
    }) => {
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
          updateAndCloseList(_.b);
          break;
      }
    }
  };
};

export { autocomplete };
