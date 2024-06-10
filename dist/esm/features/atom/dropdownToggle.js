import { useRef, useEffect } from 'react';
import { useMutableState } from '../../hooks/useMutableState.js';

const dropdownToggle = () => ({
  inputRef,
  open,
  setOpen,
  focusItem,
  onChange
}) => {
  const mutable = useMutableState({});
  const toggleRef = useRef(null);
  useEffect(() => {
    var _inputRef$current;
    if (open) (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
  }, [open, inputRef]);
  const openList = () => {
    onChange('');
    setOpen(true);
  };
  const focusToggle = () => setTimeout(() => {
    var _toggleRef$current;
    return (_toggleRef$current = toggleRef.current) == null ? void 0 : _toggleRef$current.focus();
  }, 0);
  return {
    getToggleProps: () => ({
      ref: toggleRef,
      onMouseDown: () => {
        mutable.a = open;
      },
      onClick: () => {
        if (mutable.a) {
          mutable.a = 0;
        } else {
          openList();
        }
      },
      onKeyDown: e => {
        const {
          key
        } = e;
        if (key === 'ArrowDown') {
          e.preventDefault();
          openList();
        }
      }
    }),
    getInputProps: () => ({
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
