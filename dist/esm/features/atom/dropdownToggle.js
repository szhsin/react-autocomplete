import { useRef, useEffect } from 'react';
import { useToggle } from '../../hooks/useToggle.js';

const dropdownToggle = ({
  closeOnSelect = true
}) => ({
  inputRef,
  open,
  setOpen,
  focusItem,
  value,
  tmpValue
}) => {
  const [startToggle, stopToggle] = useToggle(open, setOpen);
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
      onMouseDown: startToggle,
      onClick: stopToggle,
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
        if (key === 'Escape' || closeOnSelect && focusItem && key === 'Enter') {
          focusToggle();
        }
      }
    })
  };
};

export { dropdownToggle };
