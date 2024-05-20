'use strict';

var react = require('react');

const useAutocomplete = ({
  value = '',
  onChange = () => {},
  isItemDisabled = () => false,
  feature: useFeature,
  traversal: useTraversal,
  getItemValue: _getItemValue
}) => {
  const inputRef = react.useRef(null);
  const [open, setOpen] = react.useState(false);
  const [focusItem, setFocusItem] = react.useState();
  const [selectedItem, setSelectedItem] = react.useState();
  const getItemValue = react.useCallback(item => item == null ? '' : _getItemValue ? _getItemValue(item) : item.toString(), [_getItemValue]);
  const setInputValue = react.useCallback(value => {
    const input = inputRef.current;
    if (input) input.value = value;
  }, []);
  const state = {
    setInputValue,
    focusItem,
    setFocusItem,
    selectedItem,
    setSelectedItem,
    open,
    setOpen
  };
  const contextual = {
    getItemValue,
    isItemDisabled,
    value,
    onChange,
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
const autocomplete = ({
  rovingText,
  constricted
} = {}) => ({
  getItemValue,
  isItemDisabled,
  traverse,
  value,
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
  const updateValue = (newValue, moveCaretToEnd = true) => {
    setInputValue(newValue);
    const endIndex = newValue.length;
    moveCaretToEnd && inputRef.current.setSelectionRange(endIndex, endIndex);
    if (value != newValue) {
      onChange(newValue);
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
        if (value) updateAll(selectedItem);else updateItem();
      } else if (getItemValue(selectedItem) != value) {
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
            if (rovingText) setInputValue(getItemValue(nextItem) || value);
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

const inline = () => ({
  inputRef,
  getItemValue,
  setInputValue,
  setFocusItem
}) => {
  const mutable = useMutableState({});
  return {
    getInputProps: () => ({
      onChange: e => {
        mutable.c = e.nativeEvent.inputType === 'insertText';
      }
    }),
    inlineComplete: react.useCallback(({
      item
    }) => {
      if (mutable.c) {
        mutable.c = 0;
        setFocusItem(item);
        const itemValue = getItemValue(item);
        const input = inputRef.current;
        const {
          value
        } = input;
        const start = value.length;
        const end = itemValue.length;
        setInputValue(value + itemValue.slice(start));
        input.setSelectionRange(start, end);
      }
    }, [mutable, inputRef, getItemValue, setFocusItem, setInputValue])
  };
};

const supercomplete = props => mergeFeatures(inline(), autocomplete({
  ...props,
  rovingText: true
}));

const toggle = () => ({
  inputRef,
  open,
  setOpen,
  focusItem
}) => {
  const mutable = useMutableState({});
  const toggleRef = react.useRef(null);
  react.useEffect(() => {
    var _inputRef$current;
    if (open) (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
  }, [open, inputRef]);
  return {
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
        if (key === 'ArrowUp' || key === 'ArrowDown') {
          e.preventDefault();
          setOpen(true);
        }
      }
    }),
    getInputProps: () => ({
      onKeyDown: e => {
        var _toggleRef$current;
        const {
          key
        } = e;
        if (key === 'Escape') (_toggleRef$current = toggleRef.current) == null || _toggleRef$current.focus();
        if (key === 'Enter' && focusItem) {
          var _toggleRef$current2;
          e.preventDefault();
          (_toggleRef$current2 = toggleRef.current) == null || _toggleRef$current2.focus();
        }
      }
    })
  };
};

const dropdown = props => mergeFeatures(autocomplete({
  ...props,
  constricted: true
}), toggle());

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
exports.dropdown = dropdown;
exports.groupedTraversal = groupedTraversal;
exports.linearTraversal = linearTraversal;
exports.supercomplete = supercomplete;
exports.useAutoHeight = useAutoHeight;
exports.useAutocomplete = useAutocomplete;
