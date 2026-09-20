import { mergeModules } from "../../utils/mergeModules.mjs";
import { autocomplete } from "./autocomplete.mjs";
import { autoInline } from "../atom/autoInline.mjs";
//#region src/features/molecule/supercomplete.ts
const supercomplete = (props) => mergeModules(autocomplete({
	...props,
	rovingText: true
}), autoInline(props));
//#endregion
export { supercomplete };
