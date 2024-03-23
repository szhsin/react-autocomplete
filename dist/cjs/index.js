'use strict';

var react = require('react');

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
  const [instance] = react.useState({
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
    _: instance,
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
      onBlur: e => !instance.a && (onBlur == null ? void 0 : onBlur(e)),
      ref: inputRef
    };
  };
  const getListProps = () => mergeEvents(_getListProps(), {
    onMouseDown: () => {
      instance.a = 1;
    },
    onClick: () => {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
      instance.a = 0;
    }
  });
  return {
    getInputProps,
    getListProps,
    ...state,
    ...restFeature
  };
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
  const updateValue = (value, type) => {
    cxInstance.b = value;
    setInputValue(value);
    onChange(value, {
      type
    });
  };
  const updateAndCloseList = (value, type) => {
    if (open) {
      if (value != null) {
        updateValue(value, type);
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
      updateValue(e.target.value, 'input');
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
        updateValue(value, 'input');
      }
    },
    onClick: () => setOpen(true),
    onBlur: () => updateAndCloseList(getItemValue(focusItem), 'blur'),
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
          updateAndCloseList(getItemValue(focusItem), 'submit');
          break;
        case 'Escape':
          updateAndCloseList(cxInstance.b, 'esc');
          break;
      }
    }
  });
  const getItemProps = ({
    item
  }) => ({
    ref: focusItem === item ? scrollIntoView : null,
    onClick: () => !isItemDisabled(item) && updateAndCloseList(getItemValue(item), 'submit')
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
    const [instance] = react.useState({});
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
          instance.c = e.nativeEvent.inputType === 'insertText';
        }
      }, _getInputProps()),
      inlineComplete: react.useCallback(({
        item
      }) => {
        if (instance.c) {
          var _inputRef$current;
          instance.c = 0;
          setFocusItem(item);
          const value = getItemValue(item);
          const start = cxInstance.b.length;
          const end = value.length;
          setInputValue(cxInstance.b + value.slice(start));
          cxInstance.c = [start, end];
          (_inputRef$current = inputRef.current) == null || _inputRef$current.setSelectionRange(start, end);
        }
      }, [cxInstance, instance, inputRef, getItemValue, setFocusItem, setInputValue])
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
  const [instance] = react.useState({
    a: -1
  });
  return {
    traverse: isForward => {
      if (!focusItem) instance.a = -1;else if (focusItem !== items[instance.a]) instance.a = items.indexOf(focusItem);
      const baseIndex = traverseInput ? -1 : 0;
      let nextIndex = instance.a;
      let nextItem;
      const itemLength = items.length;
      do {
        if (isForward) {
          if (++nextIndex >= itemLength) nextIndex = baseIndex;
        } else {
          if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
        }
        nextItem = items[nextIndex];
        if (!nextItem || !isItemDisabled(nextItem)) break;
      } while (nextIndex !== instance.a);
      instance.a = nextIndex;
      setFocusItem(nextItem);
      return nextItem;
    }
  };
};

exports.autocomplete = autocomplete;
exports.linearTraversal = linearTraversal;
exports.supercomplete = supercomplete;
exports.useAutocomplete = useAutocomplete;
