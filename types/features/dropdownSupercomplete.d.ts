import type { MergedFeature } from '../common';
import { type SupercompleteFeature } from './supercomplete';
import { type DropdownFeature } from './dropdown';
declare const dropdownSupercomplete: <T>(props?: {
    constricted?: boolean;
}) => MergedFeature<T, [SupercompleteFeature<T>, DropdownFeature<T>]>;
export { dropdownSupercomplete };
