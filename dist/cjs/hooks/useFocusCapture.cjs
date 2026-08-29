"use strict";
const require_useMutableState = require("./useMutableState.cjs");
//#region src/hooks/useFocusCapture.ts
const useFocusCapture = (focusRef) => {
	const mutable = require_useMutableState.useMutableState({});
	return [
		() => {
			mutable.a = 1;
		},
		() => {
			if (mutable.a) {
				mutable.a = 0;
				focusRef.current?.focus();
				return true;
			}
		},
		() => {
			mutable.a = 0;
			focusRef.current?.focus();
		}
	];
};
//#endregion
exports.useFocusCapture = useFocusCapture;
