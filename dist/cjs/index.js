'use strict';

var react = require('react');

const defaultEqual = (itemA, itemB) => itemA === itemB;

const adaptGetItemValue = getItemValue => item => item == null ? '' : getItemValue ? getItemValue(item) : item.toString();

const useAutocomplete = ({
  value,
  onChange,
  feature: useFeature,
  traversal: useTraversal,
  ...passthrough
}) => {
  const inputRef = react.useRef(null);
  const [tmpValue, setTmpValue] = react.useState();
  const [open, setOpen] = react.useState(false);
  const [focusItem, setFocusItem] = react.useState();
  const id = react.useId();
  const state = {
    inputRef,
    focusItem,
    setFocusItem,
    open,
    setOpen
  };
  const contextual = {
    id,
    tmpValue,
    setTmpValue,
    value,
    onChange: newValue => value != newValue && (onChange == null ? void 0 : onChange(newValue)),
    ...passthrough,
    ...state
  };
  const featureYield = useFeature({
    ...contextual,
    ...useTraversal(contextual)
  });
  return {
    ...state,
    ...featureYield
  };
};

const useCombobox = ({
  isEqual = defaultEqual,
  getItemValue: _getItemValue,
  selected,
  onSelectChange,
  flipOnSelect,
  ...passthrough
}) => {
  const getItemValue = adaptGetItemValue(_getItemValue);
  return useAutocomplete({
    ...passthrough,
    isEqual,
    getItemValue,
    getSelectedValue: () => getItemValue(selected),
    onSelectChange: newItem => {
      if (!isEqual(newItem, selected)) {
        onSelectChange == null || onSelectChange(newItem);
      } else if (flipOnSelect) {
        onSelectChange == null || onSelectChange();
      }
    }
  });
};

const useMultiSelect = ({
  isEqual = defaultEqual,
  getItemValue,
  selected,
  onSelectChange: _onSelectChange = () => {},
  flipOnSelect,
  ...passthrough
}) => {
  const removeItem = itemToRemove => _onSelectChange(selected.filter(item => !isEqual(itemToRemove, item)));
  const removeSelect = item => {
    if (item) {
      removeItem(item);
    } else {
      selected.length && _onSelectChange(selected.slice(0, selected.length - 1));
    }
  };
  return {
    ...useAutocomplete({
      ...passthrough,
      isEqual,
      getItemValue: adaptGetItemValue(getItemValue),
      getSelectedValue: () => '',
      onSelectChange: newItem => {
        if (!newItem) return;
        if (selected.findIndex(item => isEqual(item, newItem)) < 0) {
          _onSelectChange([...selected, newItem]);
        } else if (flipOnSelect) {
          removeItem(newItem);
        }
      },
      removeSelect
    }),
    removeSelect
  };
};

const useLayoutEffect = typeof window !== 'undefined' && window.document && window.document.createElement ? react.useLayoutEffect : react.useEffect;
const findOverflowAncestor = element => {
  while (element) {
    element = element.parentElement;
    if (!element || element === document.body) return;
    const {
      overflow,
      overflowX,
      overflowY
    } = getComputedStyle(element);
    if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) return element;
  }
};
const useAutoHeight = ({
  anchorRef,
  show,
  margin = 0
}) => {
  const [height, setHeight] = react.useState();
  const computeHeight = react.useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const overflowAncestor = findOverflowAncestor(anchor);
    const bottomBoundary = overflowAncestor ? overflowAncestor.getBoundingClientRect().bottom : window.innerHeight;
    const newHeight = bottomBoundary - anchor.getBoundingClientRect().bottom - margin;
    setHeight(Math.max(newHeight, 0));
  }, [anchorRef, margin]);
  useLayoutEffect(() => {
    show && computeHeight();
  }, [show, computeHeight]);
  return [height, computeHeight];
};

const useMutableState = stateContainer => react.useState(stateContainer)[0];

const useFocusCapture = focusRef => {
  const mutable = useMutableState({});
  return [() => {
    if (document.activeElement === focusRef.current) mutable.a = 1;
  }, () => {
    if (mutable.a) {
      var _focusRef$current;
      mutable.a = 0;
      (_focusRef$current = focusRef.current) == null || _focusRef$current.focus();
      return true;
    }
  }, () => {
    var _focusRef$current2;
    return (_focusRef$current2 = focusRef.current) == null ? void 0 : _focusRef$current2.focus();
  }];
};

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
  inputRef,
  items,
  id
}) => {
  var _ref;
  const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);
  const inputValue = (_ref = tmpValue || value) != null ? _ref : getSelectedValue();
  const selectItemOrAction = (item, noAction) => {
    if (isItemAction != null && isItemAction(item)) {
      !noAction && (onAction == null ? void 0 : onAction(item));
      return true;
    }
    const itemValue = getItemValue(item);
    if (!select) onChange(itemValue);
    const endIndex = itemValue.length;
    inputRef.current.setSelectionRange(endIndex, endIndex);
    onSelectChange(item);
  };
  const resetState = shouldClose => {
    setFocusItem();
    setTmpValue();
    if (shouldClose || closeOnSelect) {
      setOpen(false);
      if (select) onChange();
    }
  };
  let ariaActivedescendant;
  if (focusItem) {
    const activeIndex = items.findIndex(item => isEqual(focusItem, item));
    if (activeIndex >= 0) ariaActivedescendant = id + activeIndex;
  }
  return {
    isInputEmpty: !inputValue,
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
      item,
      index
    }) => ({
      ref: isEqual(focusItem, item) ? scrollIntoView : null,
      id: id + index,
      onClick: () => {
        if (!(isItemDisabled != null && isItemDisabled(item))) {
          resetState(selectItemOrAction(item));
        }
      }
    }),
    getInputProps: () => ({
      ref: inputRef,
      value: inputValue,
      'aria-activedescendant': ariaActivedescendant,
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
                e.preventDefault();
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

const autoFocus = ({
  getFocusItem
}) => ({
  setFocusItem
}) => ({
  getInputProps: () => ({
    onChange: async e => {
      const nextValue = e.target.value;
      if (nextValue) {
        const item = await getFocusItem(nextValue);
        item && setFocusItem(item);
      }
    }
  })
});

const mergeObjects = (obj1, obj2) => {
  const merged = {
    ...obj1
  };
  Object.entries(obj2).forEach(([key, prop2]) => {
    if (typeof prop2 === 'function') {
      const prop1 = obj1[key];
      merged[key] = prop1 ? (...args) => {
        const result1 = prop1(...args);
        const result2 = prop2(...args);
        if (typeof result1 === 'object') {
          return mergeObjects(result1, result2);
        }
      } : prop2;
    } else {
      merged[key] = prop2;
    }
  });
  return merged;
};

const mergeModules = (...modules) => cx => modules.reduce((accu, curr) => mergeObjects(accu, curr(cx)), {});

const useToggle = (open, setOpen) => {
  const mutable = useMutableState({});
  return [() => mutable.a = open, () => {
    if (mutable.a) {
      mutable.a = 0;
    } else {
      setOpen(true);
    }
  }];
};

const inputToggle = () => ({
  inputRef,
  open,
  setOpen
}) => {
  const [startToggle, stopToggle] = useToggle(open, setOpen);
  const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);
  return {
    getToggleProps: () => ({
      tabIndex: -1,
      onMouseDown: () => {
        startToggle();
        startCapture();
      },
      onClick: () => {
        stopToggle();
        stopCapture();
      }
    }),
    getInputProps: () => ({
      onBlur: inCapture
    })
  };
};

const autocomplete = (props = {}) => mergeModules(autocompleteLite(props), inputToggle());

const dropdownToggle = ({
  closeOnSelect = true
}) => ({
  inputRef,
  open,
  setOpen,
  focusItem,
  value,
  tmpValue
}) => {
  const [startToggle, stopToggle] = useToggle(open, setOpen);
  const toggleRef = react.useRef(null);
  const inputValue = tmpValue || value || '';
  react.useEffect(() => {
    var _inputRef$current;
    if (open) (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
  }, [open, inputRef]);
  const focusToggle = () => setTimeout(() => {
    var _toggleRef$current;
    return (_toggleRef$current = toggleRef.current) == null ? void 0 : _toggleRef$current.focus();
  }, 0);
  return {
    isInputEmpty: !inputValue,
    getToggleProps: () => ({
      ref: toggleRef,
      onMouseDown: startToggle,
      onClick: stopToggle,
      onKeyDown: e => {
        const {
          key
        } = e;
        if (key === 'ArrowDown') {
          e.preventDefault();
          setOpen(true);
        }
      }
    }),
    getInputProps: () => ({
      value: inputValue,
      onKeyDown: e => {
        const {
          key
        } = e;
        if (key === 'Escape' || closeOnSelect && focusItem && key === 'Enter') {
          focusToggle();
        }
      }
    })
  };
};

const dropdown = (props = {}) => mergeModules(autocompleteLite({
  ...props,
  select: true,
  deselectOnClear: false
}), dropdownToggle(props));

const inputFocus = () => () => {
  const [focused, setFocused] = react.useState(false);
  return {
    focused,
    getInputProps: () => ({
      onFocusCapture: () => setFocused(true),
      onBlurCapture: () => setFocused(false)
    })
  };
};

const multiInput = () => ({
  inputRef,
  removeSelect
}) => {
  const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);
  return {
    getInputWrapperProps: () => ({
      onMouseDown: startCapture,
      onClick: stopCapture
    }),
    getInputProps: () => ({
      onBlur: inCapture,
      onKeyDown: e => !e.target.value && e.key === 'Backspace' && (removeSelect == null ? void 0 : removeSelect())
    })
  };
};

const multiSelect = (props = {}) => mergeModules(autocomplete({
  ...props,
  select: true,
  selectOnBlur: false
}), inputFocus(), multiInput());

const multiSelectDropdown = (props = {}) => mergeModules(autocompleteLite({
  ...props,
  select: true,
  selectOnBlur: false
}), dropdownToggle(props), multiInput());

const autoInline = ({
  getFocusItem
}) => ({
  getItemValue,
  setTmpValue,
  setFocusItem
}) => ({
  getInputProps: () => ({
    onChange: async ({
      target,
      nativeEvent
    }) => {
      if (nativeEvent.inputType !== 'insertText') {
        return;
      }
      const nextValue = target.value;
      const item = await getFocusItem(nextValue);
      if (!item) return;
      setFocusItem(item);
      const itemValue = getItemValue(item);
      const start = nextValue.length;
      const end = itemValue.length;
      setTmpValue(nextValue + itemValue.slice(start));
      setTimeout(() => target.setSelectionRange(start, end), 0);
    }
  })
});

const supercomplete = props => mergeModules(autocomplete({
  ...props,
  rovingText: true
}), autoInline(props));

const linearTraversal = ({
  traverseInput,
  items
}) => ({
  focusItem,
  setFocusItem,
  isItemDisabled,
  isEqual
}) => {
  const mutable = useMutableState({
    a: -1
  });
  return {
    items,
    traverse: isForward => {
      if (!focusItem) mutable.a = -1;else if (!isEqual(focusItem, items[mutable.a])) mutable.a = items.findIndex(item => isEqual(focusItem, item));
      const baseIndex = traverseInput ? -1 : 0;
      let newItem,
        nextIndex = mutable.a,
        itemCounter = 0;
      const itemLength = items.length;
      for (;;) {
        if (isForward) {
          if (++nextIndex >= itemLength) nextIndex = baseIndex;
        } else {
          if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
        }
        newItem = items[nextIndex];
        if (!newItem || !(isItemDisabled != null && isItemDisabled(newItem))) break;
        if (++itemCounter >= itemLength) return focusItem;
      }
      mutable.a = nextIndex;
      setFocusItem(newItem);
      return newItem;
    }
  };
};

const isArray = Array.isArray;
const groupedTraversal = ({
  groupedItems,
  getItemsInGroup,
  ...restProps
}) => {
  const groups = isArray(groupedItems) ? groupedItems : Object.values(groupedItems);
  const items = groups.reduce((accu, group) => accu.concat(isArray(group) ? group : getItemsInGroup ? getItemsInGroup(group) : []), []);
  return linearTraversal({
    ...restProps,
    items
  });
};

exports.autoFocus = autoFocus;
exports.autocomplete = autocomplete;
exports.autocompleteLite = autocompleteLite;
exports.dropdown = dropdown;
exports.groupedTraversal = groupedTraversal;
exports.linearTraversal = linearTraversal;
exports.mergeModules = mergeModules;
exports.multiSelect = multiSelect;
exports.multiSelectDropdown = multiSelectDropdown;
exports.supercomplete = supercomplete;
exports.useAutoHeight = useAutoHeight;
exports.useCombobox = useCombobox;
exports.useMultiSelect = useMultiSelect;
