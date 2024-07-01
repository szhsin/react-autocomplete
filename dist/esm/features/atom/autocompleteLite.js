import { useFocusCapture } from '../../hooks/useFocusCapture.js';

const scrollIntoView = element => element == null ? void 0 : element.scrollIntoView({
  block: 'nearest'
});
const autocompleteLite = ({
  rovingText,
  select,
  selectOnBlur = rovingText,
  deselectOnClear = true,
  deselectOnChange = true,
  closeOnSelect = true
} = {}) => ({
  getItemValue,
  getSelectedValue,
  onSelectChange,
  isItemDisabled,
  traverse,
  value,
  onChange,
  tmpValue,
  setTmpValue,
  focusItem,
  setFocusItem,
  open,
  setOpen,
  inputRef
}) => {
  var _ref;
  const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);
  const inputValue = (_ref = tmpValue || value) != null ? _ref : getSelectedValue();
  const selectItem = item => {
    onSelectChange(item);
    const itemValue = getItemValue(item);
    const endIndex = itemValue.length;
    inputRef.current.setSelectionRange(endIndex, endIndex);
    if (!select) onChange(itemValue);
  };
  const closeList = isSelecting => {
    setFocusItem();
    setTmpValue();
    if (!isSelecting || closeOnSelect) {
      setOpen(false);
      if (select) onChange();
    }
  };
  return {
    clearable: !!inputValue,
    getClearProps: () => ({
      tabIndex: -1,
      onMouseDown: startCapture,
      onClick: () => {
        stopCapture();
        setOpen(true);
        onChange('');
        setTmpValue();
        setFocusItem();
        if (deselectOnClear) onSelectChange();
      }
    }),
    getListProps: () => ({
      onMouseDown: startCapture,
      onClick: stopCapture
    }),
    getItemProps: ({
      item
    }) => ({
      ref: focusItem === item ? scrollIntoView : null,
      onClick: () => {
        if (!isItemDisabled(item)) {
          selectItem(item);
          closeList(true);
        }
      }
    }),
    getInputProps: () => ({
      ref: inputRef,
      value: inputValue,
      onChange: e => {
        setOpen(true);
        setFocusItem();
        setTmpValue();
        const newValue = e.target.value;
        onChange(newValue);
        if (!select && deselectOnChange || deselectOnClear && !newValue) {
          onSelectChange();
        }
      },
      onBlur: () => {
        if (inCapture() || !open) return;
        if (selectOnBlur && focusItem) {
          selectItem(focusItem);
        }
        closeList();
      },
      onKeyDown: e => {
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowDown':
            e.preventDefault();
            if (open) {
              const nextItem = traverse(e.key != 'ArrowUp');
              if (rovingText) setTmpValue(getItemValue(nextItem));
            } else {
              setOpen(true);
            }
            break;
          case 'Enter':
            if (open && focusItem) {
              selectItem(focusItem);
              closeList(true);
            }
            break;
          case 'Escape':
            if (open) closeList();
            break;
        }
      },
      onMouseDown: e => e.stopPropagation(),
      onClick: () => setOpen(true)
    })
  };
};

export { autocompleteLite };
