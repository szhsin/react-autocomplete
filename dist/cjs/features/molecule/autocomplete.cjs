"use strict";
const require_autocompleteLite = require("../atom/autocompleteLite.cjs");
const require_mergeModules = require("../../utils/mergeModules.cjs");
const require_inputToggle = require("../atom/inputToggle.cjs");
const require_label = require("../atom/label.cjs");
//#region src/features/molecule/autocomplete.ts
const autocomplete = (props) => require_mergeModules.mergeModules(require_autocompleteLite.autocompleteLite(props), require_inputToggle.inputToggle(), require_label.label());
//#endregion
exports.autocomplete = autocomplete;
