import { type AutocompleteFeature } from './autocomplete';
import { type DropdownFeature } from './dropdown';
import { type InlineFeature } from './inline';
declare const dropdownSupercomplete: <T>(props?: {
    constricted?: boolean;
}) => import("../common").MergedFeature<T, [InlineFeature<T>, DropdownFeature<T>, AutocompleteFeature<T>]>;
export { dropdownSupercomplete };
