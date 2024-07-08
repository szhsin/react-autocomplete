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
  isEqual,
  isItemDisabled,
  isItemAction,
  onAction,
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
  const selectItemOrAction = (item, noAction) => {
    if (isItemAction != null && isItemAction(item)) {
      !noAction && (onAction == null ? void 0 : onAction(item));
      return true;
    }
    onSelectChange(item);
    const itemValue = getItemValue(item);
    const endIndex = itemValue.length;
    inputRef.current.setSelectionRange(endIndex, endIndex);
    if (!select) onChange(itemValue);
  };
  const resetState = shouldClose => {
    setFocusItem();
    setTmpValue();
    if (shouldClose || closeOnSelect) {
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
        setTmpValue();
        setFocusItem();
        onChange('');
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
      ref: isEqual(focusItem, item) ? scrollIntoView : null,
      onClick: () => {
        if (!(isItemDisabled != null && isItemDisabled(item))) {
          resetState(selectItemOrAction(item));
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
        if (inCapture()) return;
        if (selectOnBlur && focusItem) {
          selectItemOrAction(focusItem, true);
        }
        resetState(true);
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
            if (open) {
              if (focusItem) {
                resetState(selectItemOrAction(focusItem));
              } else if (!select) {
                resetState(true);
              }
            }
            break;
          case 'Escape':
            if (open) {
              resetState(true);
            } else {
              onChange('');
              if (deselectOnClear) onSelectChange();
            }
            break;
        }
      },
      onMouseDown: e => e.stopPropagation(),
      onClick: () => setOpen(true)
    })
  };
};

export { autocompleteLite };
