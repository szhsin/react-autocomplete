"use strict";
const require_mergeModules = require("../../utils/mergeModules.cjs");
const require_autocomplete = require("./autocomplete.cjs");
const require_autoInline = require("../atom/autoInline.cjs");
//#region src/features/molecule/supercomplete.ts
const supercomplete = (props) => require_mergeModules.mergeModules(require_autocomplete.autocomplete({
	...props,
	rovingText: true
}), require_autoInline.autoInline(props));
//#endregion
exports.supercomplete = supercomplete;
