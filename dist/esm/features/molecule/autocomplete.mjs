import { autocompleteLite } from "../atom/autocompleteLite.mjs";
import { mergeModules } from "../../utils/mergeModules.mjs";
import { inputToggle } from "../atom/inputToggle.mjs";
import { label } from "../atom/label.mjs";
//#region src/features/molecule/autocomplete.ts
const autocomplete = (props) => mergeModules(autocompleteLite(props), inputToggle(), label());
//#endregion
export { autocomplete };
