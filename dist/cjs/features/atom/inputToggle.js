'use strict';

var common = require('../../common.js');
var useToggle = require('../../hooks/useToggle.js');
var useFocusCapture = require('../../hooks/useFocusCapture.js');

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
