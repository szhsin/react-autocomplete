import { autocompleteLite } from "../atom/autocompleteLite.mjs";
import { mergeModules } from "../../utils/mergeModules.mjs";
import { label } from "../atom/label.mjs";
import { nonblurToggle } from "../atom/nonblurToggle.mjs";
import { inputFocus } from "../atom/inputFocus.mjs";
import { multiInput } from "../atom/multiInput.mjs";
//#region src/features/molecule/multiSelect.ts
const multiSelect = (props) => mergeModules(autocompleteLite({
	...props,
	select: true
}), nonblurToggle(), label(), inputFocus(), multiInput());
//#endregion
export { multiSelect };
