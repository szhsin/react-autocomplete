"use strict";
const require_useMutableState = require("./useMutableState.cjs");
//#region src/hooks/useToggle.ts
const useToggle = (open, setOpen) => {
	const mutable = require_useMutableState.useMutableState({});
	return [() => mutable.a = open, () => {
		if (mutable.a) mutable.a = 0;
		else setOpen(true);
	}];
};
//#endregion
exports.useToggle = useToggle;
