'use strict';

var React = require('react');

const defaultFocusIndex = -1;
const defaultEqual = (itemA, itemB) => itemA === itemB;
const getId = (prefix, suffix) => prefix && prefix + suffix;
const buttonProps = {
  tabIndex: -1,
  type: 'button'
};

const adaptGetItemValue = getItemValue => item => item == null ? '' : getItemValue ? getItemValue(item) : item.toString();

let current = 0;
const useIdShim = () => {
  const [id, setId] = React.useState();
  React.useEffect(() => setId(++current), []);
  return id && `szh-ac${id}-`;
};
const useId = React.useId || useIdShim;

const useAutocomplete = ({
  onChange,
  feature: useFeature,
  isItemSelected,
  inputRef: externalInputRef,
  ...passthrough
}) => {
  const internalInputRef = React.useRef(null);
  const [tmpValue, setTmpValue] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [focusIndex, setFocusIndex] = React.useState(defaultFocusIndex);
  const state = {
    isItemSelected,
    inputRef: externalInputRef || internalInputRef,
    focusIndex,
    setFocusIndex,
    open,
    setOpen
  };
  const featureYield = useFeature({
    id: useId(),
    tmpValue,
    setTmpValue,
    onChange: newValue => passthrough.value != newValue && onChange?.(newValue),
    ...passthrough,
    ...state
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
    isItemSelected: item => isEqual(item, selected),
    getItemValue,
    getSelectedValue: () => getItemValue(selected),
    onSelectChange: newItem => {
      if (!isEqual(newItem, selected)) {
        onSelectChange?.(newItem);
      } else if (flipOnSelect) {
        onSelectChange?.();
      }
    }
  });
};

const useMultiSelect = ({
  isEqual = defaultEqual,
  getItemValue,
  selected,
  onSelectChange,
  flipOnSelect,
  ...passthrough
}) => {
  const removeItem = itemToRemove => onSelectChange?.(selected.filter(item => !isEqual(itemToRemove, item)));
  const removeSelect = item => {
    if (item) {
      removeItem(item);
    } else {
      selected.length && onSelectChange?.(selected.slice(0, selected.length - 1));
    }
  };
  const isItemSelected = item => selected.findIndex(s => isEqual(item, s)) >= 0;
  return {
    ...useAutocomplete({
      ...passthrough,
      isEqual,
      isItemSelected,
      getItemValue: adaptGetItemValue(getItemValue),
      getSelectedValue: () => '',
      onSelectChange: newItem => {
        if (!newItem) return;
        if (!isItemSelected(newItem)) {
          onSelectChange?.([...selected, newItem]);
        } else if (flipOnSelect) {
          removeItem(newItem);
        }
      },
      removeSelect
    }),
    removeSelect
  };
};

const useLayoutEffect = typeof window !== 'undefined' && window.document && window.document.createElement ? React.useLayoutEffect : React.useEffect;
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
  const [height, setHeight] = React.useState();
  const computeHeight = React.useCallback(() => {
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

const useMutableState = stateContainer => React.useState(stateContainer)[0];

const useFocusCapture = focusRef => {
  const mutable = useMutableState({});
  return [() => {
    if (document.activeElement === focusRef.current) mutable.a = 1;
  }, () => {
    if (mutable.a) {
      mutable.a = 0;
      focusRef.current?.focus();
      return true;
    }
  }, () => focusRef.current?.focus()];
};

const scrollIntoView = element => element?.scrollIntoView({
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
  isItemSelected,
  isItemDisabled,
  isItemAction,
  onAction,
  value,
  onChange,
  tmpValue,
  setTmpValue,
  focusIndex,
  setFocusIndex,
  open,
  setOpen,
  inputRef,
  items,
  id
}) => {
  var _ref;
  const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);
  const inputValue = (_ref = tmpValue || value) != null ? _ref : getSelectedValue();
  const focusItem = items[focusIndex];
  const listId = getId(id, 'l');
  const selectItemOrAction = (item, noAction) => {
    if (isItemAction?.(item)) {
      !noAction && onAction?.(item);
      return true;
    }
    const itemValue = getItemValue(item);
    if (!select) onChange(itemValue);
    const endIndex = itemValue.length;
    inputRef.current?.setSelectionRange(endIndex, endIndex);
    onSelectChange(item);
  };
  const resetState = shouldClose => {
    setFocusIndex(defaultFocusIndex);
    setTmpValue();
    if (shouldClose || closeOnSelect) {
      setOpen(false);
      if (select) onChange();
    }
  };
  const traverse = isForward => {
    const baseIndex = rovingText ? -1 : 0;
    let newItem,
      newIndex = focusIndex,
      itemCounter = 0;
    const itemLength = items.length;
    for (;;) {
      if (isForward) {
        if (++newIndex >= itemLength) newIndex = baseIndex;
      } else {
        if (--newIndex < baseIndex) newIndex = itemLength - 1;
      }
      newItem = items[newIndex];
      if (!newItem || !isItemDisabled?.(newItem)) break;
      if (++itemCounter >= itemLength) return;
    }
    setFocusIndex(newIndex);
    if (rovingText) setTmpValue(getItemValue(newItem));
  };
  return {
    isInputEmpty: !inputValue,
    getClearProps: () => ({
      ...buttonProps,
      onMouseDown: startCapture,
      onClick: () => {
        stopCapture();
        setOpen(true);
        setTmpValue();
        setFocusIndex(defaultFocusIndex);
        onChange('');
        if (deselectOnClear) onSelectChange();
      }
    }),
    getListProps: () => ({
      id: listId,
      role: 'listbox',
      onMouseDown: startCapture,
      onClick: stopCapture
    }),
    getItemProps: ({
      item,
      index
    }) => ({
      id: getId(id, index),
      role: 'option',
      'aria-selected': select ? isItemSelected(item) : index === focusIndex,
      ref: index === focusIndex ? scrollIntoView : undefined,
      onClick: () => {
        if (!isItemDisabled?.(item)) {
          resetState(selectItemOrAction(item));
        }
      }
    }),
    getInputProps: () => ({
      type: 'text',
      role: 'combobox',
      autoComplete: 'off',
      'aria-autocomplete': 'list',
      'aria-expanded': open,
      'aria-controls': listId,
      'aria-activedescendant': focusIndex >= 0 ? getId(id, focusIndex) : undefined,
      ref: inputRef,
      value: inputValue,
      onChange: e => {
        setOpen(true);
        setFocusIndex(defaultFocusIndex);
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
              traverse(e.key != 'ArrowUp');
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
  requestItem
}) => ({
  setFocusIndex
}) => ({
  getInputProps: () => ({
    onChange: async e => {
      const nextValue = e.target.value;
      if (nextValue) {
        const result = await requestItem(nextValue);
        result && setFocusIndex(result.index);
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
  id,
  inputRef,
  open,
  setOpen
}) => {
  const [startToggle, stopToggle] = useToggle(open, setOpen);
  const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);
  return {
    getToggleProps: () => ({
      ...buttonProps,
      'aria-expanded': open,
      'aria-controls': getId(id, 'l'),
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

const label = () => ({
  id
}) => {
  const inputId = getId(id, 'i');
  const labelId = getId(id, 'a');
  return {
    getLabelProps: () => ({
      id: labelId,
      htmlFor: inputId
    }),
    getInputProps: () => ({
      id: inputId
    }),
    getListProps: () => ({
      'aria-labelledby': labelId
    })
  };
};

const autocomplete = (props = {}) => mergeModules(autocompleteLite(props), inputToggle(), label());

const dropdownToggle = ({
  closeOnSelect = true,
  toggleRef: externalToggleRef
}) => ({
  inputRef,
  open,
  setOpen,
  focusIndex,
  value,
  tmpValue
}) => {
  const [startToggle, stopToggle] = useToggle(open, setOpen);
  const internalToggleRef = React.useRef(null);
  const toggleRef = externalToggleRef || internalToggleRef;
  const inputValue = tmpValue || value || '';
  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, inputRef]);
  const focusToggle = () => setTimeout(() => toggleRef.current?.focus(), 0);
  return {
    toggleRef,
    isInputEmpty: !inputValue,
    getToggleProps: () => ({
      type: 'button',
      'aria-haspopup': true,
      'aria-expanded': open,
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
        if (key === 'Escape' || closeOnSelect && focusIndex >= 0 && key === 'Enter') {
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
  const [focused, setFocused] = React.useState(false);
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
      onKeyDown: e => !e.target.value && e.key === 'Backspace' && removeSelect?.()
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
  requestItem
}) => ({
  getItemValue,
  setTmpValue,
  setFocusIndex
}) => ({
  getInputProps: () => ({
    'aria-autocomplete': 'both',
    onChange: async ({
      target,
      nativeEvent
    }) => {
      if (nativeEvent.inputType !== 'insertText') {
        return;
      }
      const nextValue = target.value;
      const result = await requestItem(nextValue);
      if (!result) return;
      setFocusIndex(result.index);
      const itemValue = getItemValue(result.item);
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

const isArray = Array.isArray;
const mergeGroupedItems = ({
  groups,
  getItemsInGroup
}) => {
  const groupArray = isArray(groups) ? groups : Object.values(groups);
  return groupArray.reduce((accu, group) => accu.concat(isArray(group) ? group : getItemsInGroup ? getItemsInGroup(group) : []), []);
};

exports.autoFocus = autoFocus;
exports.autocomplete = autocomplete;
exports.autocompleteLite = autocompleteLite;
exports.dropdown = dropdown;
exports.mergeGroupedItems = mergeGroupedItems;
exports.mergeModules = mergeModules;
exports.multiSelect = multiSelect;
exports.multiSelectDropdown = multiSelectDropdown;
exports.supercomplete = supercomplete;
exports.useAutoHeight = useAutoHeight;
exports.useCombobox = useCombobox;
exports.useMultiSelect = useMultiSelect;
