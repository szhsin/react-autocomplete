'use strict';

var react = require('react');

const useAutocomplete = ({
  items = [],
  onChange = () => {},
  feature: useFeature,
  getItemValue: _getItemValue
}) => {
  const inputRef = react.useRef(null);
  const [open, setOpen] = react.useState(false);
  const [focusIndex, setFocusIndex] = react.useState(-1);
  const [instance] = react.useState({
    b: '',
    c: []
  });
  const getItemValue = item => item == null ? null : _getItemValue ? _getItemValue(item) : item.toString();
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
    getInputProps: _getInputProps,
    getItemProps: _getItemProps,
    ...actions
  } = useFeature({
    _: instance,
    items,
    getItemValue,
    onChange,
    inputRef,
    ...state
  });
  const {
    onBlur,
    onKeyDown,
    ...featureInputProps
  } = _getInputProps();
  const getInputProps = () => ({
    ...featureInputProps,
    onBlur: e => !instance.a && (onBlur == null ? void 0 : onBlur(e)),
    onKeyDown: e => {
      const {
        key
      } = e;
      if (items.length && (key === 'ArrowUp' || key === 'ArrowDown')) e.preventDefault();
      onKeyDown == null || onKeyDown(e);
    },
    ref: inputRef
  });
  const getItemProps = option => {
    const {
      onMouseDown,
      onClick,
      ...featureItemProps
    } = _getItemProps(option);
    return {
      ...featureItemProps,
      onMouseDown: e => {
        onMouseDown == null || onMouseDown(e);
        instance.a = 1;
      },
      onClick: e => {
        var _inputRef$current;
        onClick == null || onClick(e);
        (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
        instance.a = 0;
      }
    };
  };
  return {
    getInputProps,
    getItemProps,
    ...state,
    ...actions
  };
};

const autocomplete = ({
  rovingText,
  traverseInput
} = {}) => ({
  _: cxInstance,
  items,
  getItemValue,
  onChange,
  setInputValue,
  focusIndex,
  setFocusIndex,
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
      setFocusIndex(-1);
    }
  };
  const traverseItems = isUp => {
    const baseIndex = (traverseInput != null ? traverseInput : rovingText) ? -1 : 0;
    let nextIndex = focusIndex;
    const itemLength = items.length;
    if (isUp) {
      if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
    } else {
      if (++nextIndex >= itemLength) nextIndex = baseIndex;
    }
    setFocusIndex(nextIndex);
    if (rovingText) {
      var _getItemValue;
      setInputValue((_getItemValue = getItemValue(items[nextIndex])) != null ? _getItemValue : cxInstance.b);
      const input = inputRef.current;
      cxInstance.c = [input.selectionStart, input.selectionEnd];
    }
  };
  const getInputProps = () => ({
    onChange: e => {
      setFocusIndex(-1);
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
        setFocusIndex(-1);
        updateValue(value, 'input');
      }
    },
    onClick: () => setOpen(true),
    onBlur: () => updateAndCloseList(getItemValue(items[focusIndex]), 'blur'),
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
          updateAndCloseList(getItemValue(items[focusIndex]), 'submit');
          break;
        case 'Escape':
          updateAndCloseList(cxInstance.b, 'esc');
          break;
      }
    }
  });
  const getItemProps = option => ({
    onClick: () => updateAndCloseList(getItemValue(items[option == null ? void 0 : option.index]), 'submit')
  });
  return {
    getInputProps,
    getItemProps
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
      setInputValue,
      setFocusIndex,
      _: cxInstance
    } = cx;
    return {
      ...rest,
      getInputProps: () => {
        const inputProps = _getInputProps();
        return {
          ...inputProps,
          onChange: e => {
            instance.c = e.nativeEvent.inputType === 'insertText';
            inputProps.onChange(e);
          }
        };
      },
      inlineComplete: react.useCallback(({
        index = 0,
        value
      }) => {
        if (instance.c) {
          var _inputRef$current;
          instance.c = 0;
          setFocusIndex(index);
          const start = cxInstance.b.length;
          const end = value.length;
          setInputValue(cxInstance.b + value.slice(start));
          cxInstance.c = [start, end];
          (_inputRef$current = inputRef.current) == null || _inputRef$current.setSelectionRange(start, end);
        }
      }, [cxInstance, instance, inputRef, setFocusIndex, setInputValue])
    };
  };
};

exports.autocomplete = autocomplete;
exports.supercomplete = supercomplete;
exports.useAutocomplete = useAutocomplete;
