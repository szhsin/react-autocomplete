'use strict';

var useMutableState = require('./useMutableState.js');

const useToggle = (open, setOpen) => {
  const mutable = useMutableState.useMutableState({});
  return [() => mutable.a = open, () => {
    if (mutable.a) {
      mutable.a = 0;
    } else {
      setOpen(true);
    }
  }];
};

exports.useToggle = useToggle;
