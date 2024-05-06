import { useMutableState } from '../hooks/useMutableState.js';

const scrollIntoView = element => element == null ? void 0 : element.scrollIntoView({
  block: 'nearest'
});
const autocomplete = ({
  rovingText,
  constricted
} = {}) => ({
  $: cxMutable,
  getItemValue,
  isItemDisabled,
  traverse,
  onChange,
  setInputValue,
  selectedItem,
  setSelectedItem,
  focusItem,
  setFocusItem,
  open,
  setOpen,
  inputRef
}) => {
  const mutable = useMutableState({});
  const updateValue = (value, moveCaretToEnd = true) => {
    setInputValue(value);
    const endIndex = value.length;
    moveCaretToEnd && inputRef.current.setSelectionRange(endIndex, endIndex);
    if (cxMutable.b != value) {
      cxMutable.b = value;
      onChange(value);
    }
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
  const getListProps = () => ({
    onMouseDown: () => {
      mutable.a = 1;
    },
    onClick: () => {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
      mutable.a = 0;
    }
  });
  const getInputProps = () => ({
    ref: inputRef,
    onChange: e => {
      setFocusItem();
      setOpen(true);
      updateValue(e.target.value, false);
    },
    onClick: () => setOpen(true),
    onBlur: () => {
      if (mutable.a || !open) return;
      if (focusItem) {
        updateAll(focusItem);
      } else if (constricted) {
        if (cxMutable.b) updateAll(selectedItem);else updateItem();
      } else if (getItemValue(selectedItem) != cxMutable.b) {
        updateItem();
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
            if (rovingText) setInputValue(getItemValue(nextItem) || cxMutable.b);
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
            } else if (!cxMutable.b || getItemValue(selectedItem) != cxMutable.b) {
              updateItem();
              updateValue(cxMutable.b);
            }
            closeList();
          }
          break;
      }
    }
  });
  const getItemProps = ({
    item
  }) => ({
    ref: focusItem === item ? scrollIntoView : null,
    onClick: () => {
      if (!isItemDisabled(item)) {
        updateAll(item);
        closeList();
      }
    }
  });
  return {
    getInputProps,
    getItemProps,
    getListProps
  };
};

export { autocomplete };
