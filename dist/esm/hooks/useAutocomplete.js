import { useRef, useState } from 'react';

const useAutocomplete = ({
  onChange,
  onSetInputValue,
  onSetOpen,
  items = []
}) => {
  const inputRef = useRef();
  const [inputValue, setInputValueBase] = useState('');
  const [isOpen, setOpenBase] = useState(false);
  const [focusIndex, setfocusIndex] = useState(-1);
  const [instance] = useState({});
  const state = {
    inputValue: [inputValue, setInputValueBase],
    focusIndex: [focusIndex, setfocusIndex],
    isOpen: [isOpen, setOpenBase]
  };
  const itemLength = items.length;
  const setInputValue = onSetInputValue || setInputValueBase;
  const setOpen = (value, type) => onSetOpen ? onSetOpen(value, {
    type,
    state
  }, setOpenBase) : setOpenBase(value);
  const traverseItems = itemIndex => {
    setfocusIndex(itemIndex);
    setInputValue(items[itemIndex], {
      type: 'nav',
      state
    }, setInputValueBase);
  };
  const updateValue = (value, type) => {
    if (value != null) {
      setInputValue(value, {
        type,
        state
      }, setInputValueBase);
      onChange == null || onChange(value, {
        type,
        state
      });
    }
  };
  const updateAndCloseList = (value, type) => {
    if (isOpen) {
      updateValue(value, type);
      setOpen(false, type);
      setfocusIndex(-1);
    }
  };
  const getInputProps = () => ({
    value: inputValue,
    ref: inputRef,
    onChange: e => {
      updateValue(e.target.value, 'type');
      setOpen(true, 'type');
      setfocusIndex(-1);
    },
    onClick: () => setOpen(true, 'focus'),
    onBlur: () => {
      if (!instance.a) {
        updateAndCloseList(inputValue, 'blur');
      }
    },
    onKeyDown: ({
      key
    }) => {
      let nextIndex = focusIndex;
      switch (key) {
        case 'ArrowDown':
          if (isOpen) {
            if (++nextIndex >= itemLength) nextIndex = 0;
            traverseItems(nextIndex);
          } else {
            setOpen(true, 'nav');
          }
          break;
        case 'ArrowUp':
          if (isOpen) {
            if (--nextIndex < 0) nextIndex = itemLength - 1;
            traverseItems(nextIndex);
          } else {
            setOpen(true, 'nav');
          }
          break;
        case 'Enter':
          updateAndCloseList(items[focusIndex], 'submit');
          break;
        case 'Escape':
          updateAndCloseList(inputValue, 'esc');
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
      updateAndCloseList(items[index], 'submit');
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
    state
  };
};

export { useAutocomplete };
