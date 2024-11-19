'use strict';

var mergeModules = require('../../utils/mergeModules.js');
var multiInput = require('../atom/multiInput.js');
var dropdown = require('./dropdown.js');

const multiSelectDropdown = props => mergeModules.mergeModules(dropdown.dropdown(props), multiInput.multiInput());

exports.multiSelectDropdown = multiSelectDropdown;
