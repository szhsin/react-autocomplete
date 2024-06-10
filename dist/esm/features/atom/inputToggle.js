import { useMutableState } from '../../hooks/useMutableState.js';

const inputToggle = () => ({
  inputRef,
  open,
  setOpen
}) => {
  const mutable = useMutableState({});
  return {
    getToggleProps: () => ({
      tabIndex: -1,
      onMouseDown: () => {
        mutable.b = open;
        mutable.c = 1;
      },
      onClick: () => {
        var _inputRef$current;
        if (mutable.b) {
          mutable.b = 0;
        } else {
          setOpen(true);
        }
        (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
      }
    }),
    getInputProps: () => ({
      onBlur: ({
        target
      }) => {
        if (mutable.c) {
          mutable.c = 0;
          target.focus();
        }
      }
    })
  };
};

export { inputToggle };
