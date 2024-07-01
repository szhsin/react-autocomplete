import { useFocusCapture } from '../../hooks/useFocusCapture.js';

const multiInput = () => ({
  inputRef,
  removeSelect
}) => {
  const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);
  return {
    getInputWrapperProps: () => ({
      onMouseDown: startCapture,
      onClick: stopCapture
    }),
    getInputProps: () => ({
      onBlur: inCapture,
      onKeyDown: e => !e.target.value && e.key === 'Backspace' && (removeSelect == null ? void 0 : removeSelect())
    })
  };
};

export { multiInput };
