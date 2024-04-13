'use strict';

var react = require('react');

const useMutableState = stateContainer => react.useState(stateContainer)[0];

const mergeEvents = (events1, events2) => {
  const result = {
    ...events1
  };
  Object.keys(events2).forEach(key => {
    const e2 = events2[key];
    if (e2) {
      const e1 = events1[key];
      result[key] = e1 ? e => {
        e1(e);
        e2(e);
      } : e2;
    }
  });
  return result;
};

const useAutocomplete = ({
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
  const mutable = useMutableState({
    b: '',
    c: []
  });
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
    $: mutable,
    getItemValue,
    isItemDisabled,
    onChange,
    inputRef,
    ...state
  };
  const {
    getInputProps: _getInputProps,
    getListProps: _getListProps,
    ...restFeature
  } = useFeature({
    ...contextual,
    ...useTraversal(contextual)
  });
  const getInputProps = () => {
    const {
      onBlur,
      ...rest
    } = _getInputProps();
    return {
      ...rest,
      onBlur: e => !mutable.a && (onBlur == null ? void 0 : onBlur(e)),
      ref: inputRef
    };
  };
  const getListProps = () => mergeEvents(_getListProps(), {
    onMouseDown: () => {
      mutable.a = 1;
    },
    onClick: () => {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
      mutable.a = 0;
    }
  });
  return {
    getInputProps,
    getListProps,
    ...state,
    ...restFeature
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
  const traverseItems = isForward => {
    const nextItem = traverse(isForward);
    if (rovingText) {
      setInputValue(getItemValue(nextItem) || cxMutable.b);
      const input = inputRef.current;
      cxMutable.c = [input.selectionStart, input.selectionEnd];
    }
  };
  const getInputProps = () => ({
    onChange: e => {
      setFocusItem();
      setOpen(true);
      updateValue(e.target.value, false);
    },
    onSelect: e => {
      const {
        value,
        selectionStart,
        selectionEnd
      } = e.target;
      const [start, end] = cxMutable.c;
      if (cxMutable.b != value && (selectionStart != start || selectionEnd != end)) {
        setFocusItem();
        updateValue(value, false);
      }
    },
    onClick: () => setOpen(true),
    onBlur: () => {
      if (!open) return;
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
            traverseItems(e.key != 'ArrowUp');
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
    getListProps: () => ({})
  };
};

const supercomplete = props => {
  const useAutocomplete = autocomplete({
    ...props,
    rovingText: true
  });
  return cx => {
    const {
      getInputProps: _getInputProps,
      ...rest
    } = useAutocomplete(cx);
    const mutable = useMutableState({});
    const {
      inputRef,
      getItemValue,
      setInputValue,
      setFocusItem,
      $: cxMutable
    } = cx;
    return {
      ...rest,
      getInputProps: () => mergeEvents({
        onChange: e => {
          mutable.c = e.nativeEvent.inputType === 'insertText';
        }
      }, _getInputProps()),
      inlineComplete: react.useCallback(({
        item
      }) => {
        if (mutable.c) {
          var _inputRef$current;
          mutable.c = 0;
          setFocusItem(item);
          const value = getItemValue(item);
          const start = cxMutable.b.length;
          const end = value.length;
          setInputValue(cxMutable.b + value.slice(start));
          cxMutable.c = [start, end];
          (_inputRef$current = inputRef.current) == null || _inputRef$current.setSelectionRange(start, end);
        }
      }, [cxMutable, mutable, inputRef, getItemValue, setFocusItem, setInputValue])
    };
  };
};

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
exports.groupedTraversal = groupedTraversal;
exports.linearTraversal = linearTraversal;
exports.supercomplete = supercomplete;
exports.useAutoHeight = useAutoHeight;
exports.useAutocomplete = useAutocomplete;
