import type { MergedFeature } from '../common';
import { type AutocompleteFeature } from './autocomplete';
import { type ToggleFeature } from './toggle';
type DropdownFeature<T> = MergedFeature<T, [AutocompleteFeature<T>, ToggleFeature<T>]>;
declare const dropdown: <T>(props?: {
    rovingText?: boolean;
}) => DropdownFeature<T>;
export { type DropdownFeature, dropdown };
