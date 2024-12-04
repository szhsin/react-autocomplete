'use strict';

var mergeModules = require('../../utils/mergeModules.cjs');
var autocompleteLite = require('../atom/autocompleteLite.cjs');
var dropdownToggle = require('../atom/dropdownToggle.cjs');

const dropdown = props => mergeModules.mergeModules(autocompleteLite.autocompleteLite({
  ...props,
  select: true,
  deselectOnClear: false
}), dropdownToggle.dropdownToggle(props));

exports.dropdown = dropdown;
