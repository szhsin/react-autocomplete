"use strict";
const require_autocompleteLite = require("../atom/autocompleteLite.cjs");
const require_mergeModules = require("../../utils/mergeModules.cjs");
const require_label = require("../atom/label.cjs");
const require_nonblurToggle = require("../atom/nonblurToggle.cjs");
const require_inputFocus = require("../atom/inputFocus.cjs");
const require_multiInput = require("../atom/multiInput.cjs");
//#region src/features/molecule/multiSelect.ts
const multiSelect = (props) => require_mergeModules.mergeModules(require_autocompleteLite.autocompleteLite({
	...props,
	select: true
}), require_nonblurToggle.nonblurToggle(), require_label.label(), require_inputFocus.inputFocus(), require_multiInput.multiInput());
//#endregion
exports.multiSelect = multiSelect;
