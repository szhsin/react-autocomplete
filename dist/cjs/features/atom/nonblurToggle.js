'use strict';

var common = require('../../common.js');

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
