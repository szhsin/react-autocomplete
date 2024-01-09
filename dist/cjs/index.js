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
  const [instance] = react.useState({});
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
    onKeyDown: ({
      key
    }) => onKeyDown == null ? void 0 : onKeyDown({
      key
    })
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

const autocomplete = () => ({
  items,
  onChange,
  inputValue,
  setInputValue,
  focusIndex,
  setFocusIndex,
  isOpen,
  setOpen
}) => {
  const updateAndCloseList = value => {
    if (isOpen) {
      if (value != null) {
        setInputValue(value);
        onChange(value);
      }
      setOpen(false);
      setFocusIndex(-1);
    }
  };
  return {
    onItemClick: ({
      index
    }) => updateAndCloseList(items[index]),
    onInputChange: ({
      value
    }) => {
      setInputValue(value);
      setFocusIndex(-1);
      setOpen(true);
      onChange(value);
    },
    onInputClick: () => setOpen(true),
    onBlur: () => updateAndCloseList(inputValue),
    onKeyDown: ({
      key
    }) => {
      const traverseItems = itemIndex => {
        setFocusIndex(itemIndex);
        setInputValue(items[itemIndex]);
      };
      let nextIndex = focusIndex;
      const itemLength = items.length;
      switch (key) {
        case 'ArrowDown':
          if (isOpen) {
            if (++nextIndex >= itemLength) nextIndex = 0;
            traverseItems(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'ArrowUp':
          if (isOpen) {
            if (--nextIndex < 0) nextIndex = itemLength - 1;
            traverseItems(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'Enter':
          updateAndCloseList(items[focusIndex]);
          break;
        case 'Escape':
          updateAndCloseList(inputValue);
          break;
      }
    }
  };
};

exports.autocomplete = autocomplete;
exports.useAutocomplete = useAutocomplete;
