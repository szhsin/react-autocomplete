import { getInputToggleProps } from '../../common.mjs';
import { useToggle } from '../../hooks/useToggle.mjs';
import { useFocusCapture } from '../../hooks/useFocusCapture.mjs';

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
