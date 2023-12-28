import { useRef, useState } from 'react';

const useAutocomplete = ({
  onChange,
  items = []
}) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const [focusIndex, setfocusIndex] = useState(-1);
  const [isOpen, setOpen] = useState(false);
  const [instance] = useState({});
  const itemLength = items.length;
  const updateInput = itemIndex => {
    setfocusIndex(itemIndex);
    setInputValue(items[itemIndex]);
  };
  const updateValue = value => {
    if (value == null) return;
    setInputValue(value);
    onChange == null || onChange(value);
  };
  const getInputProps = () => ({
    value: inputValue,
    ref: inputRef,
    onChange: e => {
      updateValue(e.target.value);
      setOpen(true);
      setfocusIndex(-1);
    },
    onClick: () => setOpen(!isOpen),
    onBlur: () => !instance.a && setOpen(false),
    onKeyDown: ({
      key
    }) => {
      let nextIndex = focusIndex;
      switch (key) {
        case 'ArrowDown':
          if (isOpen) {
            if (++nextIndex >= itemLength) nextIndex = 0;
            updateInput(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'ArrowUp':
          if (isOpen) {
            if (--nextIndex < 0) nextIndex = itemLength - 1;
            updateInput(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'Enter':
          if (isOpen) {
            setOpen(false);
            updateValue(items[focusIndex]);
          }
          break;
        case 'Escape':
          setOpen(false);
          break;
      }
    }
  });
  const getOptionProps = ({
    index = -1
  } = {}) => ({
    onMouseDown: () => instance.a = 1,
    onClick: () => {
      var _inputRef$current;
      setOpen(false);
      updateValue(items[index]);
      (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
      instance.a = 0;
    }
  });
  const getProps = (elementType, option) => {
    switch (elementType) {
      case 'input':
        return getInputProps();
      default:
        return getOptionProps(option);
    }
  };
  return {
    getProps,
    state: {
      inputValue: [inputValue, setInputValue],
      focusIndex: [focusIndex, setfocusIndex],
      isOpen: [isOpen, setOpen]
    }
  };
};

export { useAutocomplete };
