'use strict';

const multiInput = () => ({
  removeSelect
}) => ({
  getInputProps: () => ({
    onKeyDown: e => !e.target.value && e.key === 'Backspace' && removeSelect?.()
  })
});

exports.multiInput = multiInput;
