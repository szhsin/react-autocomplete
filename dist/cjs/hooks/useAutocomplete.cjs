"use strict";
const require_useId = require("./useId.cjs");
let react = require("react");
//#region src/hooks/useAutocomplete.ts
const useAutocomplete = ({ onChange, feature: useFeature, isItemSelected, inputRef: externalInputRef, getItemValue, ...passthrough }) => {
	const internalInputRef = (0, react.useRef)(null);
	const [tmpValue, setTmpValue] = (0, react.useState)();
	const [open, setOpen] = (0, react.useState)(false);
	const [focusIndex, setFocusIndex] = (0, react.useState)(-1);
	const state = {
		isItemSelected,
		inputRef: externalInputRef || internalInputRef,
		focusIndex,
		setFocusIndex,
		open,
		setOpen
	};
	const featureYield = useFeature({
		id: require_useId.useId(),
		tmpValue,
		setTmpValue,
		onChange: (newValue) => passthrough.value != newValue && onChange?.(newValue),
		getItemValue: (item) => item == null ? "" : getItemValue ? getItemValue(item) : item.toString(),
		...passthrough,
		...state
	});
	return {
		...state,
		...featureYield
	};
};
//#endregion
exports.useAutocomplete = useAutocomplete;
