import { useId } from "./useId.mjs";
import { useRef, useState } from "react";
//#region src/hooks/useAutocomplete.ts
const useAutocomplete = ({ onChange, feature: useFeature, isItemSelected, inputRef: externalInputRef, getItemValue, ...passthrough }) => {
	const internalInputRef = useRef(null);
	const [tmpValue, setTmpValue] = useState();
	const [open, setOpen] = useState(false);
	const [focusIndex, setFocusIndex] = useState(-1);
	const state = {
		isItemSelected,
		inputRef: externalInputRef || internalInputRef,
		focusIndex,
		setFocusIndex,
		open,
		setOpen
	};
	const featureYield = useFeature({
		id: useId(),
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
export { useAutocomplete };
