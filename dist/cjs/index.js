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
  const mutable = useMutableState({
    b: '',
    c: []
  });
  const getItemValue = react.useCallback(item => item == null ? null : _getItemValue ? _getItemValue(item) : item.toString(), [_getItemValue]);
  const setInputValue = react.useCallback(value => {
    const input = inputRef.current;
    if (input) input.value = value;
  }, []);
  const state = {
    setInputValue,
    focusItem,
    setFocusItem,
    open,
    setOpen
  };
  const contextual = {
    _: mutable,
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
  rovingText
} = {}) => ({
  _: cxInstance,
  getItemValue,
  isItemDisabled,
  traverse,
  onChange,
  setInputValue,
  focusItem,
  setFocusItem,
  open,
  setOpen,
  inputRef
}) => {
  const updateValue = (type, value, item) => {
    cxInstance.b = value;
    setInputValue(value);
    const endIndex = value.length;
    type !== 'input' && inputRef.current.setSelectionRange(endIndex, endIndex);
    onChange(value, {
      type,
      item
    });
  };
  const updateAndCloseList = (type, value, item) => {
    if (open) {
      if (value != null) {
        updateValue(type, value, item);
      }
      setOpen(false);
      setFocusItem();
    }
  };
  const traverseItems = isForward => {
    const nextItem = traverse(isForward);
    if (rovingText) {
      var _getItemValue;
      setInputValue((_getItemValue = getItemValue(nextItem)) != null ? _getItemValue : cxInstance.b);
      const input = inputRef.current;
      cxInstance.c = [input.selectionStart, input.selectionEnd];
    }
  };
  const getInputProps = () => ({
    onChange: e => {
      setFocusItem();
      setOpen(true);
      updateValue('input', e.target.value);
    },
    onSelect: e => {
      const {
        value,
        selectionStart,
        selectionEnd
      } = e.target;
      const [start, end] = cxInstance.c;
      if (cxInstance.b !== value && (selectionStart !== start || selectionEnd !== end)) {
        setFocusItem();
        updateValue('input', value);
      }
    },
    onClick: () => setOpen(true),
    onBlur: () => updateAndCloseList('blur', getItemValue(focusItem), focusItem),
    onKeyDown: e => {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          e.preventDefault();
          if (open) {
            traverseItems(e.key === 'ArrowDown');
          } else {
            setOpen(true);
          }
          break;
        case 'Enter':
          updateAndCloseList('submit', getItemValue(focusItem), focusItem);
          break;
        case 'Escape':
          updateAndCloseList('esc', cxInstance.b);
          break;
      }
    }
  });
  const getItemProps = ({
    item
  }) => ({
    ref: focusItem === item ? scrollIntoView : null,
    onClick: () => !isItemDisabled(item) && updateAndCloseList('submit', getItemValue(item), item)
  });
  return {
    getInputProps,
    getItemProps,
    getListProps: () => ({})
  };
};

const supercomplete = () => {
  const useAutocomplete = autocomplete({
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
      _: cxInstance
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
          const start = cxInstance.b.length;
          const end = value.length;
          setInputValue(cxInstance.b + value.slice(start));
          cxInstance.c = [start, end];
          (_inputRef$current = inputRef.current) == null || _inputRef$current.setSelectionRange(start, end);
        }
      }, [cxInstance, mutable, inputRef, getItemValue, setFocusItem, setInputValue])
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
