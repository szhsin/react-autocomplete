import { useMutableState } from '../../hooks/useMutableState.js';

const toggle = () => ({
  inputRef,
  open,
  setOpen,
  focusItem,
  onChange
}) => {
  const mutable = useMutableState({});
  const openList = () => {
    setOpen(true);
  };
  return {
    getToggleProps: () => ({
      onMouseDown: () => {
        mutable.a = open;
      },
      onClick: () => {
        if (mutable.a) {
          var _inputRef$current;
          mutable.a = 0;
          (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
        } else {
          var _inputRef$current2;
          openList();
          (_inputRef$current2 = inputRef.current) == null || _inputRef$current2.focus();
        }
      }
    })
  };
};

export { toggle };
