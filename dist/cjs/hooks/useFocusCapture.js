'use strict';

var useMutableState = require('./useMutableState.js');

const useFocusCapture = focusRef => {
  const mutable = useMutableState.useMutableState({});
  return [() => {
    mutable.a = 1;
  }, () => {
    if (mutable.a) {
      mutable.a = 0;
      focusRef.current?.focus();
      return true;
    }
  }, () => {
    mutable.a = 0;
    focusRef.current?.focus();
  }];
};

exports.useFocusCapture = useFocusCapture;
