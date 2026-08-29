"use strict";
const require_common = require("../../common.cjs");
const require_useFocusCapture = require("../../hooks/useFocusCapture.cjs");
const require_useToggle = require("../../hooks/useToggle.cjs");
//#region src/features/atom/inputToggle.ts
const inputToggle = () => ({ id, inputRef, open, setOpen }) => {
	const [startToggle, stopToggle] = require_useToggle.useToggle(open, setOpen);
	const [startCapture, inCapture, stopCapture] = require_useFocusCapture.useFocusCapture(inputRef);
	return {
		getToggleProps: () => ({
			...require_common.getInputToggleProps(id, open),
			onMouseDown: () => {
				startToggle();
				startCapture();
			},
			onClick: () => {
				stopToggle();
				stopCapture();
			}
		}),
		getInputProps: () => ({ onBlur: inCapture })
	};
};
//#endregion
exports.inputToggle = inputToggle;
