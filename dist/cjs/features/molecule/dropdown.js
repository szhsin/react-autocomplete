'use strict';

var mergeModules = require('../../utils/mergeModules.js');
var autocompleteLite = require('../atom/autocompleteLite.js');
var dropdownToggle = require('../atom/dropdownToggle.js');

const dropdown = props => mergeModules.mergeModules(autocompleteLite.autocompleteLite({
  ...props,
  select: true,
  deselectOnClear: false
}), dropdownToggle.dropdownToggle(props));

exports.dropdown = dropdown;
