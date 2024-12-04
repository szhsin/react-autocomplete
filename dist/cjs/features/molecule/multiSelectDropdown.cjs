'use strict';

var mergeModules = require('../../utils/mergeModules.cjs');
var multiInput = require('../atom/multiInput.cjs');
var dropdown = require('./dropdown.cjs');

const multiSelectDropdown = props => mergeModules.mergeModules(dropdown.dropdown(props), multiInput.multiInput());

exports.multiSelectDropdown = multiSelectDropdown;
