'use strict';

var common = require('../../common.cjs');

const nonblurToggle = () => ({
  id,
  open,
  setOpen
}) => ({
  getToggleProps: () => ({
    ...common.getInputToggleProps(id, open),
    onClick: () => setOpen(!open)
  })
});

exports.nonblurToggle = nonblurToggle;
