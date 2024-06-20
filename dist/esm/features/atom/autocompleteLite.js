import { useMutableState } from '../../hooks/useMutableState.js';

const scrollIntoView = element => element == null ? void 0 : element.scrollIntoView({
  block: 'nearest'
});
const autocompleteLite = ({
  rovingText,
  constricted,
  selectOnBlur = true,
  deselectOnClear = true
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
  var _ref;
  const mutable = useMutableState({});
  const inputValue = (_ref = tmpValue || value) != null ? _ref : getItemValue(selectedItem);
  const updateValue = newValue => {
    const endIndex = newValue.length;
    inputRef.current.setSelectionRange(endIndex, endIndex);
    if (!constricted) onChange(newValue);
  };
  const updateItem = item => item !== selectedItem && setSelectedItem(item);
  const updateAll = item => {
    updateItem(item);
    updateValue(getItemValue(item));
  };
  const closeList = () => {
    setOpen(false);
    setFocusItem();
    setTmpValue();
    if (constricted) onChange();
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
        setOpen(true);
        onChange('');
        setTmpValue();
        setFocusItem();
        if (deselectOnClear) setSelectedItem();
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
        setOpen(true);
        setFocusItem();
        setTmpValue();
        const newValue = e.target.value;
        onChange(newValue);
        if (constricted) {
          if (deselectOnClear && !newValue) setSelectedItem();
        } else if (newValue !== getItemValue(selectedItem)) {
          setSelectedItem();
        }
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
              updateAll(focusItem);
              closeList();
            }
            break;
          case 'Escape':
            if (open) closeList();
            break;
        }
      },
      onClick: () => setOpen(true)
    })
  };
};

export { autocompleteLite };
