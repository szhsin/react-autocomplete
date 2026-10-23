"use strict";
const require_mergeModules = require("../../utils/mergeModules.cjs");
const require_dropdown = require("./dropdown.cjs");
const require_multiInput = require("../atom/multiInput.cjs");
// src/features/molecule/multiSelectDropdown.ts
const multiSelectDropdown = (props) => require_mergeModules.mergeModules(require_dropdown.dropdown(props), require_multiInput.multiInput());
exports.multiSelectDropdown = multiSelectDropdown;
