"use strict";
const require_common = require("../common.cjs");
const require_useAutocomplete = require("./useAutocomplete.cjs");
//#region src/hooks/useCombobox.ts
const useCombobox = ({ isEqual = require_common.defaultEqual, selected, onSelectChange, flipOnSelect, ...passthrough }) => require_useAutocomplete.useAutocomplete({
	...passthrough,
	selected,
	isEqual,
	isItemSelected: (item) => isEqual(item, selected),
	onSelectChange: (newItem) => {
		if (!isEqual(newItem, selected)) onSelectChange?.(newItem);
		else if (flipOnSelect) onSelectChange?.();
	}
});
//#endregion
exports.useCombobox = useCombobox;
