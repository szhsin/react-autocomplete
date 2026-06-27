"use strict";
const require_mergeModules = require("../../utils/mergeModules.cjs");
const require_dropdown = require("./dropdown.cjs");
const require_multiInput = require("../atom/multiInput.cjs");
//#region src/features/molecule/multiSelectDropdown.ts
const multiSelectDropdown = (props) => require_mergeModules.mergeModules(require_dropdown.dropdown(props), require_multiInput.multiInput());
//#endregion
exports.multiSelectDropdown = multiSelectDropdown;
