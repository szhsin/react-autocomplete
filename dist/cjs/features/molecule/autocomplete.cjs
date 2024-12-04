'use strict';

var mergeModules = require('../../utils/mergeModules.cjs');
var autocompleteLite = require('../atom/autocompleteLite.cjs');
var inputToggle = require('../atom/inputToggle.cjs');
var label = require('../atom/label.cjs');

const autocomplete = props => mergeModules.mergeModules(autocompleteLite.autocompleteLite(props), inputToggle.inputToggle(), label.label());

exports.autocomplete = autocomplete;
