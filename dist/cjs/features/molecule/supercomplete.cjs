'use strict';

var mergeModules = require('../../utils/mergeModules.cjs');
var autocomplete = require('./autocomplete.cjs');
var autoInline = require('../atom/autoInline.cjs');

const supercomplete = props => mergeModules.mergeModules(autocomplete.autocomplete({
  ...props,
  rovingText: true
}), autoInline.autoInline(props));

exports.supercomplete = supercomplete;
