'use strict';

var common = require('../../common.cjs');
var useToggle = require('../../hooks/useToggle.cjs');
var useFocusCapture = require('../../hooks/useFocusCapture.cjs');

const inputToggle = () => ({
  id,
  inputRef,
  open,
  setOpen
}) => {
  const [startToggle, stopToggle] = useToggle.useToggle(open, setOpen);
  const [startCapture, inCapture, stopCapture] = useFocusCapture.useFocusCapture(inputRef);
  return {
    getToggleProps: () => ({
      ...common.getInputToggleProps(id, open),
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

exports.inputToggle = inputToggle;
