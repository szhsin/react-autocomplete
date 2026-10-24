import { autocompleteLite } from "../atom/autocompleteLite.mjs";
import { mergeModules } from "../../utils/mergeModules.mjs";
import { dropdownToggle } from "../atom/dropdownToggle.mjs";
// src/features/molecule/dropdown.ts
const dropdown = (props) => mergeModules(autocompleteLite({
	...props,
	select: true,
	deselectOnClear: false
}), dropdownToggle(props));
export { dropdown };
