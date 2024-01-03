import { useRef, useState } from 'react';

const useAutocomplete = ({
  feature: {
    onInputChange,
    onInputClick,
    onBlur,
    onKeyDown,
    onItemClick
  } = {},
  items = [],
  onChange = () => {}
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
  const featureEvent = {
    state,
    props: {
      items,
      onChange
    }
  };
  const getInputProps = () => ({
    value: inputValue,
    ref: inputRef,
    onChange: e => onInputChange == null ? void 0 : onInputChange({
      value: e.target.value,
      ...featureEvent
    }),
    onClick: () => onInputClick == null ? void 0 : onInputClick(featureEvent),
    onBlur: () => !instance.a && (onBlur == null ? void 0 : onBlur(featureEvent)),
    onKeyDown: ({
      key
    }) => onKeyDown == null ? void 0 : onKeyDown({
      key,
      ...featureEvent
    })
  });
  const getItemProps = ({
    index = -1
  } = {}) => ({
    onMouseDown: () => instance.a = 1,
    onClick: () => {
      var _inputRef$current;
      onItemClick == null || onItemClick({
        index,
        ...featureEvent
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
    state
  };
};

export { useAutocomplete };
