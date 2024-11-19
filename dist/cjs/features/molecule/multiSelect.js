'use strict';

var mergeModules = require('../../utils/mergeModules.js');
var autocompleteLite = require('../atom/autocompleteLite.js');
var nonblurToggle = require('../atom/nonblurToggle.js');
var label = require('../atom/label.js');
var inputFocus = require('../atom/inputFocus.js');
var multiInput = require('../atom/multiInput.js');

const multiSelect = props => mergeModules.mergeModules(autocompleteLite.autocompleteLite({
  ...props,
  select: true
}), nonblurToggle.nonblurToggle(), label.label(), inputFocus.inputFocus(), multiInput.multiInput());

exports.multiSelect = multiSelect;
