import { getInputToggleProps } from '../../common.js';
import { useToggle } from '../../hooks/useToggle.js';
import { useFocusCapture } from '../../hooks/useFocusCapture.js';

const inputToggle = () => ({
  id,
  inputRef,
  open,
  setOpen
}) => {
  const [startToggle, stopToggle] = useToggle(open, setOpen);
  const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);
  return {
    getToggleProps: () => ({
      ...getInputToggleProps(id, open),
      onMouseDown: () => {
        startToggle();
        startCapture();
      },
      onClick: () => {
        stopToggle();
        stopCapture();
      }
    }),
    getInputProps: () => ({
      onBlur: inCapture
    })
  };
};

export { inputToggle };
