"use strict";
const require_common = require("../../common.cjs");
// src/features/atom/nonblurToggle.ts
const nonblurToggle = () => ({ id, open, setOpen, disabled }) => ({ getToggleProps: () => ({
	...require_common.getInputToggleProps(id, open, disabled),
	onClick: () => setOpen(!open)
}) });
exports.nonblurToggle = nonblurToggle;
