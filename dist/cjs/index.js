'use strict';

var react = require('react');

const useAutocomplete = ({
  feature,
  items = [],
  onChange = () => {}
}) => {
  const inputRef = react.useRef();
  const [inputValue, setInputValue] = react.useState('');
  const [isOpen, setOpen] = react.useState(false);
  const [focusIndex, setFocusIndex] = react.useState(-1);
  const [instance] = react.useState({
    b: inputValue
  });
  const state = {
    inputValue,
    setInputValue,
    focusIndex,
    setFocusIndex,
    isOpen,
    setOpen
  };
  const {
    onInputChange,
    onInputClick,
    onBlur,
    onKeyDown,
    onItemClick
  } = (feature == null ? void 0 : feature({
    _: instance,
    items,
    onChange,
    ...state
  })) || {};
  const getInputProps = () => ({
    value: inputValue,
    ref: inputRef,
    onChange: e => onInputChange == null ? void 0 : onInputChange({
      value: e.target.value
    }),
    onClick: () => onInputClick == null ? void 0 : onInputClick(),
    onBlur: () => !instance.a && (onBlur == null ? void 0 : onBlur()),
    onKeyDown: e => {
      const {
        key
      } = e;
      if (items.length && (key === 'ArrowUp' || key === 'ArrowDown')) e.preventDefault();
      onKeyDown == null || onKeyDown({
        key
      });
    }
  });
  const getItemProps = ({
    index = -1
  } = {}) => ({
    onMouseDown: () => instance.a = 1,
    onClick: () => {
      var _inputRef$current;
      onItemClick == null || onItemClick({
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
    ...state
  };
};

const autocomplete = ({
  rovingInput
} = {}) => ({
  _,
  items,
  onChange,
  setInputValue,
  focusIndex,
  setFocusIndex,
  isOpen,
  setOpen
}) => {
  const updateValue = value => {
    _.b = value;
    setInputValue(value);
    onChange(value);
  };
  const updateAndCloseList = value => {
    if (isOpen) {
      if (value != null) {
        updateValue(value);
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
    rovingInput && setInputValue((_items$nextIndex = items[nextIndex]) != null ? _items$nextIndex : _.b);
  };
  return {
    onItemClick: ({
      index
    }) => updateAndCloseList(items[index]),
    onInputChange: ({
      value
    }) => {
      updateValue(value);
      setFocusIndex(-1);
      setOpen(true);
    },
    onInputClick: () => setOpen(true),
    onBlur: () => updateAndCloseList(items[focusIndex]),
    onKeyDown: ({
      key
    }) => {
      switch (key) {
        case 'ArrowUp':
          if (isOpen) {
            traverseItems(true);
          } else {
            setOpen(true);
          }
          break;
        case 'ArrowDown':
          if (isOpen) {
            traverseItems(false);
          } else {
            setOpen(true);
          }
          break;
        case 'Enter':
          updateAndCloseList(items[focusIndex]);
          break;
        case 'Escape':
          updateAndCloseList(_.b);
          break;
      }
    }
  };
};

exports.autocomplete = autocomplete;
exports.useAutocomplete = useAutocomplete;
