import { useToggle } from '../../hooks/useToggle.js';
import { useFocusCapture } from '../../hooks/useFocusCapture.js';

const inputToggle = () => ({
  inputRef,
  open,
  setOpen
}) => {
  const [startToggle, stopToggle] = useToggle(open, setOpen);
  const [startCapture, stopCapture] = useFocusCapture(inputRef);
  return {
    getToggleProps: () => ({
      tabIndex: -1,
      onMouseDown: () => {
        startToggle();
        startCapture();
      },
      onClick: () => {
        var _inputRef$current;
        stopToggle();
        (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
      }
    }),
    getInputProps: () => ({
      onBlur: stopCapture
    })
  };
};

export { inputToggle };
