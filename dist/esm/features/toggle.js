import { useRef, useEffect } from 'react';
import { useMutableState } from '../hooks/useMutableState.js';

const toggle = () => ({
  inputRef,
  open,
  setOpen,
  focusItem
}) => {
  const mutable = useMutableState({});
  const toggleRef = useRef(null);
  useEffect(() => {
    var _inputRef$current;
    if (open) (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
  }, [open, inputRef]);
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
          setOpen(true);
        }
      },
      onKeyDown: e => {
        const {
          key
        } = e;
        if (key === 'ArrowUp' || key === 'ArrowDown') {
          e.preventDefault();
          setOpen(true);
        }
      }
    }),
    getInputProps: () => ({
      onKeyDown: e => {
        var _toggleRef$current;
        const {
          key
        } = e;
        if (key === 'Escape') (_toggleRef$current = toggleRef.current) == null || _toggleRef$current.focus();
        if (key === 'Enter' && focusItem) {
          var _toggleRef$current2;
          e.preventDefault();
          (_toggleRef$current2 = toggleRef.current) == null || _toggleRef$current2.focus();
        }
      }
    })
  };
};

export { toggle };
