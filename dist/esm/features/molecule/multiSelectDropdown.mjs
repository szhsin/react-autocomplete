import { mergeModules } from "../../utils/mergeModules.mjs";
import { dropdown } from "./dropdown.mjs";
import { multiInput } from "../atom/multiInput.mjs";
//#region src/features/molecule/multiSelectDropdown.ts
const multiSelectDropdown = (props) => mergeModules(dropdown(props), multiInput());
//#endregion
export { multiSelectDropdown };
