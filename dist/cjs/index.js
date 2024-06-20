'use strict';

var react = require('react');

const useAutocomplete = ({
  value,
  onChange,
  isItemDisabled = () => false,
  feature: useFeature,
  traversal: useTraversal,
  getItemValue: _getItemValue
}) => {
  const inputRef = react.useRef(null);
  const [tmpValue, setTmpValue] = react.useState();
  const [open, setOpen] = react.useState(false);
  const [focusItem, setFocusItem] = react.useState();
  const [selectedItem, setSelectedItem] = react.useState();
  const getItemValue = react.useCallback(item => item == null ? '' : _getItemValue ? _getItemValue(item) : item.toString(), [_getItemValue]);
  const state = {
    focusItem,
    setFocusItem,
    selectedItem,
    setSelectedItem,
    open,
    setOpen
  };
  const contextual = {
    tmpValue,
    setTmpValue,
    getItemValue,
    isItemDisabled,
    value,
    onChange: newValue => {
      if (value != newValue) onChange == null || onChange(newValue);
    },
    inputRef,
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

const mergeFeatures = (...features) => cx => features.reduce((accu, curr) => mergeObjects(accu, curr(cx)), {});

const inputToggle = () => ({
  inputRef,
  open,
  setOpen
}) => {
  const mutable = useMutableState({});
  return {
    getToggleProps: () => ({
      tabIndex: -1,
      onMouseDown: () => {
        mutable.b = open;
        mutable.c = 1;
      },
      onClick: () => {
        var _inputRef$current;
        if (mutable.b) {
          mutable.b = 0;
        } else {
          setOpen(true);
        }
        (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
      }
    }),
    getInputProps: () => ({
      onBlur: ({
        target
      }) => {
        if (mutable.c) {
          mutable.c = 0;
          target.focus();
        }
      }
    })
  };
};

const autocomplete = props => mergeFeatures(autocompleteLite(props), inputToggle());

const dropdownToggle = () => ({
  inputRef,
  open,
  setOpen,
  focusItem,
  value,
  tmpValue
}) => {
  const mutable = useMutableState({});
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
    clearable: !!inputValue,
    getToggleProps: () => ({
      ref: toggleRef,
      onMouseDown: () => {
        mutable.a = open;
      },
      onClick: () => {
        if (mutable.a) {
          mutable.a = 0;
        } else {
          setOpen(true);
        }
      },
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
        if (key === 'Escape') focusToggle();
        if (key === 'Enter' && focusItem) {
          e.preventDefault();
          focusToggle();
        }
      }
    })
  };
};

const dropdown = props => mergeFeatures(autocompleteLite({
  ...props,
  constricted: true,
  selectOnBlur: false,
  deselectOnClear: false
}), dropdownToggle());

const inline = ({
  getInlineItem
}) => ({
  getItemValue,
  setTmpValue,
  setFocusItem
}) => {
  return {
    getInputProps: () => ({
      onChange: async ({
        target,
        nativeEvent
      }) => {
        if (nativeEvent.inputType !== 'insertText') {
          return;
        }
        const nextValue = target.value;
        const item = await getInlineItem(nextValue);
        if (!item) return;
        setFocusItem(item);
        const itemValue = getItemValue(item);
        const start = nextValue.length;
        const end = itemValue.length;
        setTmpValue(nextValue + itemValue.slice(start));
        setTimeout(() => target.setSelectionRange(start, end), 0);
      }
    })
  };
};

const supercomplete = ({
  getInlineItem,
  ...rest
}) => mergeFeatures(autocomplete({
  ...rest,
  rovingText: true
}), inline({
  getInlineItem
}));

const linearTraversal = ({
  traverseInput,
  items = []
}) => ({
  focusItem,
  setFocusItem,
  isItemDisabled
}) => {
  const mutable = useMutableState({
    a: -1
  });
  return {
    traverse: isForward => {
      if (!focusItem) mutable.a = -1;else if (focusItem !== items[mutable.a]) mutable.a = items.indexOf(focusItem);
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
        if (!newItem || !isItemDisabled(newItem)) break;
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
  const groups = isArray(groupedItems) ? groupedItems : groupedItems ? Object.values(groupedItems) : [];
  const items = [];
  groups.forEach(group => {
    const itemsInGroup = isArray(group) ? group : getItemsInGroup ? getItemsInGroup(group) : [];
    items.push(...itemsInGroup);
  });
  return linearTraversal({
    ...restProps,
    items
  });
};

exports.autocomplete = autocomplete;
exports.autocompleteLite = autocompleteLite;
exports.dropdown = dropdown;
exports.groupedTraversal = groupedTraversal;
exports.linearTraversal = linearTraversal;
exports.mergeFeatures = mergeFeatures;
exports.supercomplete = supercomplete;
exports.useAutoHeight = useAutoHeight;
exports.useAutocomplete = useAutocomplete;
