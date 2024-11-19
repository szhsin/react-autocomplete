'use strict';

var mergeModules = require('../../utils/mergeModules.js');
var autocomplete = require('./autocomplete.js');
var autoInline = require('../atom/autoInline.js');

const supercomplete = props => mergeModules.mergeModules(autocomplete.autocomplete({
  ...props,
  rovingText: true
}), autoInline.autoInline(props));

exports.supercomplete = supercomplete;
