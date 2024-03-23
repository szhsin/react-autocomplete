const scrollIntoView = element => element == null ? void 0 : element.scrollIntoView({
  block: 'nearest'
});
const autocomplete = ({
  rovingText
} = {}) => ({
  _: cxInstance,
  getItemValue,
  isItemDisabled,
  traverse,
  onChange,
  setInputValue,
  focusItem,
  setFocusItem,
  open,
  setOpen,
  inputRef
}) => {
  const updateValue = (type, value, item) => {
    cxInstance.b = value;
    setInputValue(value);
    onChange(value, {
      type,
      item
    });
  };
  const updateAndCloseList = (type, value, item) => {
    if (open) {
      if (value != null) {
        updateValue(type, value, item);
      }
      setOpen(false);
      setFocusItem();
    }
  };
  const traverseItems = isForward => {
    const nextItem = traverse(isForward);
    if (rovingText) {
      var _getItemValue;
      setInputValue((_getItemValue = getItemValue(nextItem)) != null ? _getItemValue : cxInstance.b);
      const input = inputRef.current;
      cxInstance.c = [input.selectionStart, input.selectionEnd];
    }
  };
  const getInputProps = () => ({
    onChange: e => {
      setFocusItem();
      setOpen(true);
      updateValue('input', e.target.value);
    },
    onSelect: e => {
      const {
        value,
        selectionStart,
        selectionEnd
      } = e.target;
      const [start, end] = cxInstance.c;
      if (cxInstance.b !== value && (selectionStart !== start || selectionEnd !== end)) {
        setFocusItem();
        updateValue('input', value);
      }
    },
    onClick: () => setOpen(true),
    onBlur: () => updateAndCloseList('blur', getItemValue(focusItem), focusItem),
    onKeyDown: e => {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          e.preventDefault();
          if (open) {
            traverseItems(e.key === 'ArrowDown');
          } else {
            setOpen(true);
          }
          break;
        case 'Enter':
          updateAndCloseList('submit', getItemValue(focusItem), focusItem);
          break;
        case 'Escape':
          updateAndCloseList('esc', cxInstance.b);
          break;
      }
    }
  });
  const getItemProps = ({
    item
  }) => ({
    ref: focusItem === item ? scrollIntoView : null,
    onClick: () => !isItemDisabled(item) && updateAndCloseList('submit', getItemValue(item), item)
  });
  return {
    getInputProps,
    getItemProps,
    getListProps: () => ({})
  };
};

export { autocomplete };
