'use strict';

var React = require('react');

const inputFocus = () => () => {
  const [focused, setFocused] = React.useState(false);
  return {
    focused,
    getInputProps: () => ({
      onFocusCapture: () => setFocused(true),
      onBlurCapture: () => setFocused(false)
    })
  };
};

exports.inputFocus = inputFocus;
