"use strict";
const require_autocompleteLite = require("../atom/autocompleteLite.cjs");
const require_mergeModules = require("../../utils/mergeModules.cjs");
const require_dropdownToggle = require("../atom/dropdownToggle.cjs");
//#region src/features/molecule/dropdown.ts
const dropdown = (props) => require_mergeModules.mergeModules(require_autocompleteLite.autocompleteLite({
	...props,
	select: true,
	deselectOnClear: false
}), require_dropdownToggle.dropdownToggle(props));
//#endregion
exports.dropdown = dropdown;
