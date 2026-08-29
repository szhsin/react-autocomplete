"use strict";
let react = require("react");
//#region src/features/atom/inputFocus.ts
const inputFocus = () => () => {
	const [focused, setFocused] = (0, react.useState)(false);
	return {
		focused,
		getInputProps: () => ({
			onFocusCapture: () => setFocused(true),
			onBlurCapture: () => setFocused(false)
		})
	};
};
//#endregion
exports.inputFocus = inputFocus;
