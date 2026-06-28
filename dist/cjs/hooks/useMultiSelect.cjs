"use strict";
const require_common = require("../common.cjs");
const require_useAutocomplete = require("./useAutocomplete.cjs");
//#region src/hooks/useMultiSelect.ts
const useMultiSelect = ({ isEqual = require_common.defaultEqual, selected, onSelectChange, flipOnSelect, ...passthrough }) => {
	const removeItem = (itemToRemove) => onSelectChange?.(selected.filter((item) => !isEqual(itemToRemove, item)));
	const removeSelect = (item) => {
		if (item) removeItem(item);
		else selected.length && onSelectChange?.(selected.slice(0, selected.length - 1));
	};
	const isItemSelected = (item) => selected.findIndex((s) => isEqual(item, s)) >= 0;
	return {
		...require_useAutocomplete.useAutocomplete({
			...passthrough,
			selected,
			isEqual,
			isItemSelected,
			onSelectChange: (newItem) => {
				if (!newItem) return;
				if (!isItemSelected(newItem)) onSelectChange?.([...selected, newItem]);
				else if (flipOnSelect) removeItem(newItem);
			},
			removeSelect
		}),
		removeSelect
	};
};
//#endregion
exports.useMultiSelect = useMultiSelect;
