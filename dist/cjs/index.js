'use strict';

var react = require('react');

const useAutocomplete = ({
  feature: useFeature = () => ({}),
  items = [],
  onChange = () => {}
}) => {
  const inputRef = react.useRef(null);
  const [open, setOpen] = react.useState(false);
  const [focusIndex, setFocusIndex] = react.useState(-1);
  const [instance] = react.useState({
    b: ''
  });
  const setInputValue = react.useCallback(value => {
    const input = inputRef.current;
    if (input) input.value = value;
  }, []);
  const state = {
    setInputValue,
    focusIndex,
    setFocusIndex,
    open,
    setOpen
  };
  const {
    onInputChange,
    onInputClick,
    onBlur,
    onKeyDown,
    onItemClick,
    ...actions
  } = useFeature({
    _: instance,
    items,
    onChange,
    inputRef,
    ...state
  });
  const getInputProps = () => ({
    ref: inputRef,
    onChange: onInputChange,
    onClick: onInputClick,
    onBlur: e => !instance.a && (onBlur == null ? void 0 : onBlur(e)),
    onKeyDown: e => {
      const {
        key
      } = e;
      if (items.length && (key === 'ArrowUp' || key === 'ArrowDown')) e.preventDefault();
      onKeyDown == null || onKeyDown(e);
    }
  });
  const getItemProps = ({
    index = -1
  } = {}) => ({
    onMouseDown: () => instance.a = 1,
    onClick: e => {
      var _inputRef$current;
      onItemClick == null || onItemClick(e, {
        index
      });
      (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
      instance.a = 0;
    }
  });
  const getProps = (elementType, option) => {
    switch (elementType) {
      case 'input':
        return getInputProps();
      default:
        return getItemProps(option);
    }
  };
  return {
    getProps,
    ...state,
    ...actions
  };
};

const autocomplete = ({
  rovingInput
} = {}) => ({
  _: cxInstance,
  items,
  onChange,
  setInputValue,
  focusIndex,
  setFocusIndex,
  open,
  setOpen
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
      setFocusIndex(-1);
    }
  };
  const traverseItems = isUp => {
    var _items$nextIndex;
    const baseIndex = rovingInput ? -1 : 0;
    let nextIndex = focusIndex;
    const itemLength = items.length;
    if (isUp) {
      if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
    } else {
      if (++nextIndex >= itemLength) nextIndex = baseIndex;
    }
    setFocusIndex(nextIndex);
    rovingInput && setInputValue((_items$nextIndex = items[nextIndex]) != null ? _items$nextIndex : cxInstance.b);
  };
  return {
    onItemClick: (_, {
      index
    }) => updateAndCloseList(items[index], 'submit'),
    onInputChange: e => {
      setFocusIndex(-1);
      setOpen(true);
      updateValue(e.target.value, 'input');
    },
    onInputClick: () => setOpen(true),
    onBlur: () => updateAndCloseList(items[focusIndex], 'blur'),
    onKeyDown: ({
      key
    }) => {
      switch (key) {
        case 'ArrowUp':
          if (open) {
            traverseItems(true);
          } else {
            setOpen(true);
          }
          break;
        case 'ArrowDown':
          if (open) {
            traverseItems(false);
          } else {
            setOpen(true);
          }
          break;
        case 'Enter':
          updateAndCloseList(items[focusIndex], 'submit');
          break;
        case 'Escape':
          updateAndCloseList(cxInstance.b, 'esc');
          break;
      }
    }
  };
};

const supercomplete = () => {
  const base = autocomplete({
    rovingInput: true
  });
  return ({
    setFocusIndex: _setFocusIndex,
    onChange: _onChange,
    ...cx
  }) => {
    const [instance] = react.useState({
      a: []
    });
    const setFocusIndex = react.useCallback(value => {
      instance.b = value;
      _setFocusIndex(value);
    }, [instance, _setFocusIndex]);
    const onChange = (value, meta) => {
      if (meta.type !== 'input') {
        instance.c = false;
        instance.a = [];
      }
      _onChange(value, meta);
    };
    const baseFeature = base({
      ...cx,
      setFocusIndex,
      onChange
    });
    const {
      inputRef,
      setInputValue,
      _: cxInstance
    } = cx;
    return {
      ...baseFeature,
      onInputChange: e => {
        instance.c = e.nativeEvent.inputType === 'insertText';
        if (!instance.c) instance.a = [];
        baseFeature.onInputChange(e);
      },
      onKeyDown: e => {
        baseFeature.onKeyDown(e);
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          const [index, action] = instance.a;
          if (instance.b === index) action == null || action();
        }
      },
      inlineComplete: react.useCallback(({
        index,
        value
      }) => {
        if (instance.c) {
          const action = () => {
            var _inputRef$current;
            setFocusIndex(index);
            const valueLength = cxInstance.b.length;
            const newValue = cxInstance.b + value.slice(valueLength);
            setInputValue(newValue);
            (_inputRef$current = inputRef.current) == null || _inputRef$current.setSelectionRange(valueLength, value.length);
          };
          action();
          instance.a = [index, action];
        }
      }, [cxInstance, instance, inputRef, setFocusIndex, setInputValue])
    };
  };
};

exports.autocomplete = autocomplete;
exports.supercomplete = supercomplete;
exports.useAutocomplete = useAutocomplete;
