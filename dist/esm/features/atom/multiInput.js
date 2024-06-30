import { useFocusCapture } from '../../hooks/useFocusCapture.js';

const multiInput = () => ({
  inputRef,
  removeSelect
}) => {
  const [startCapture, stopCapture] = useFocusCapture(inputRef);
  return {
    getInputWrapperProps: () => ({
      onMouseDown: startCapture,
      onClick: () => {
        var _inputRef$current;
        return (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.focus();
      }
    }),
    getInputProps: () => ({
      onBlur: stopCapture,
      onKeyDown: e => !e.target.value && e.key === 'Backspace' && (removeSelect == null ? void 0 : removeSelect())
    })
  };
};

export { multiInput };
