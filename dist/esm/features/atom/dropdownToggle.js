import { useRef, useEffect } from 'react';
import { useToggle } from '../../hooks/useToggle.js';

const dropdownToggle = ({
  closeOnSelect = true
}) => ({
  inputRef,
  open,
  setOpen,
  focusIndex,
  value,
  tmpValue
}) => {
  const [startToggle, stopToggle] = useToggle(open, setOpen);
  const toggleRef = useRef(null);
  const inputValue = tmpValue || value || '';
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, inputRef]);
  const focusToggle = () => setTimeout(() => toggleRef.current?.focus(), 0);
  return {
    isInputEmpty: !inputValue,
    getToggleProps: () => ({
      type: 'button',
      'aria-haspopup': true,
      'aria-expanded': open,
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
        if (key === 'Escape' || closeOnSelect && focusIndex >= 0 && key === 'Enter') {
          focusToggle();
        }
      }
    })
  };
};

export { dropdownToggle };
