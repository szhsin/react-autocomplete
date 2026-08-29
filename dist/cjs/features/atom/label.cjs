"use strict";
const require_common = require("../../common.cjs");
//#region src/features/atom/label.ts
const label = () => ({ id }) => {
	const inputId = require_common.getId(id, "i");
	const labelId = require_common.getId(id, "a");
	return {
		getLabelProps: () => ({
			id: labelId,
			htmlFor: inputId
		}),
		getInputProps: () => ({ id: inputId }),
		getListProps: () => ({ "aria-labelledby": labelId })
	};
};
//#endregion
exports.label = label;
