import { useRef, useEffect } from 'react';
import { useMutableState } from '../../hooks/useMutableState.js';

const dropdownToggle = () => ({
  inputRef,
  open,
  setOpen,
  focusItem,
  value,
  tmpValue
}) => {
  const mutable = useMutableState({});
  const toggleRef = useRef(null);
  const inputValue = tmpValue || value || '';
  useEffect(() => {
    var _inputRef$current;
    if (open) (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
  }, [open, inputRef]);
  const focusToggle = () => setTimeout(() => {
    var _toggleRef$current;
    return (_toggleRef$current = toggleRef.current) == null ? void 0 : _toggleRef$current.focus();
  }, 0);
  return {
    clearable: !!inputValue,
    getToggleProps: () => ({
      ref: toggleRef,
      onMouseDown: () => {
        mutable.a = open;
      },
      onClick: () => {
        if (mutable.a) {
          mutable.a = 0;
        } else {
          setOpen(true);
        }
      },
      onKeyDown: e => {
        const {
          key
        } = e;
        if (key === 'ArrowDown') {
          e.preventDefault();
          setOpen(true);
        }
      }
    }),
    getInputProps: () => ({
      value: inputValue,
      onKeyDown: e => {
        const {
          key
        } = e;
        if (key === 'Escape') focusToggle();
        if (key === 'Enter' && focusItem) {
          e.preventDefault();
          focusToggle();
        }
      }
    })
  };
};

export { dropdownToggle };
