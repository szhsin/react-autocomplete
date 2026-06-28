"use strict";
const require_common = require("../../common.cjs");
//#region src/features/atom/nonblurToggle.ts
const nonblurToggle = () => ({ id, open, setOpen }) => ({ getToggleProps: () => ({
	...require_common.getInputToggleProps(id, open),
	onClick: () => setOpen(!open)
}) });
//#endregion
exports.nonblurToggle = nonblurToggle;
