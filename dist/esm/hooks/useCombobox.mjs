import { defaultEqual } from "../common.mjs";
import { useAutocomplete } from "./useAutocomplete.mjs";
//#region src/hooks/useCombobox.ts
const useCombobox = ({ isEqual = defaultEqual, selected, onSelectChange, flipOnSelect, ...passthrough }) => useAutocomplete({
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
export { useCombobox };
