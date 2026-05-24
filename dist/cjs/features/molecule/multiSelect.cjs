'use strict';

var mergeModules = require('../../utils/mergeModules.cjs');
var autocompleteLite = require('../atom/autocompleteLite.cjs');
var nonblurToggle = require('../atom/nonblurToggle.cjs');
var label = require('../atom/label.cjs');
var inputFocus = require('../atom/inputFocus.cjs');
var multiInput = require('../atom/multiInput.cjs');

const multiSelect = props => mergeModules.mergeModules(autocompleteLite.autocompleteLite({
  ...props,
  select: true
}), nonblurToggle.nonblurToggle(), label.label(), inputFocus.inputFocus(), multiInput.multiInput());

exports.multiSelect = multiSelect;
