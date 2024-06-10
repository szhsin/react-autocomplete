import { useMutableState } from '../../hooks/useMutableState.js';

const scrollIntoView = element => element == null ? void 0 : element.scrollIntoView({
  block: 'nearest'
});
const autocompleteLite = ({
  rovingText,
  constricted,
  selectOnBlur = true,
  deselectOnBlur = true
} = {}) => ({
  getItemValue,
  isItemDisabled,
  traverse,
  value,
  onChange,
  tmpValue,
  setTmpValue,
  selectedItem,
  setSelectedItem,
  focusItem,
  setFocusItem,
  open,
  setOpen,
  inputRef
}) => {
  const mutable = useMutableState({});
  const inputValue = tmpValue || value;
  const updateValue = (newValue, moveCaretToEnd = true) => {
    setTmpValue();
    const endIndex = newValue.length;
    moveCaretToEnd && inputRef.current.setSelectionRange(endIndex, endIndex);
    if (value != newValue) onChange(newValue);
  };
  const updateItem = item => item !== selectedItem && setSelectedItem(item);
  const updateAll = item => {
    updateItem(item);
    updateValue(getItemValue(item));
  };
  const closeList = () => {
    setOpen(false);
    setFocusItem();
  };
  return {
    clearable: !!inputValue,
    getClearProps: () => ({
      tabIndex: -1,
      onMouseDown: () => {
        if (document.activeElement === inputRef.current) mutable.a = 1;
      },
      onClick: () => {
        var _inputRef$current;
        (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
        updateValue('');
        setFocusItem();
        setOpen(true);
      }
    }),
    getListProps: () => ({
      onMouseDown: () => {
        mutable.a = 1;
      }
    }),
    getItemProps: ({
      item
    }) => ({
      ref: focusItem === item ? scrollIntoView : null,
      onClick: () => {
        if (!isItemDisabled(item)) {
          updateAll(item);
          closeList();
        }
      }
    }),
    getInputProps: () => ({
      ref: inputRef,
      value: inputValue,
      onChange: e => {
        setFocusItem();
        setOpen(true);
        updateValue(e.target.value, false);
      },
      onBlur: ({
        target
      }) => {
        if (mutable.a) {
          mutable.a = 0;
          target.focus();
          return;
        }
        if (!open) return;
        if (selectOnBlur && focusItem) {
          updateAll(focusItem);
        } else if (constricted) {
          if (value || !deselectOnBlur) updateAll(selectedItem);else updateItem();
        } else if (getItemValue(selectedItem) != value) {
          updateItem();
        }
        setTmpValue();
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
              updateAll(focusItem);
              closeList();
            }
            break;
          case 'Escape':
            if (open) {
              if (constricted) {
                updateAll(selectedItem);
              } else if (!value || getItemValue(selectedItem) != value) {
                updateItem();
                updateValue(value);
              }
              closeList();
            }
            break;
        }
      },
      onClick: () => setOpen(true)
    })
  };
};

export { autocompleteLite };
