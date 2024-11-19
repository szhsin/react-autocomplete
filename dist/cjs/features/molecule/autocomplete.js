'use strict';

var mergeModules = require('../../utils/mergeModules.js');
var autocompleteLite = require('../atom/autocompleteLite.js');
var inputToggle = require('../atom/inputToggle.js');
var label = require('../atom/label.js');

const autocomplete = props => mergeModules.mergeModules(autocompleteLite.autocompleteLite(props), inputToggle.inputToggle(), label.label());

exports.autocomplete = autocomplete;
