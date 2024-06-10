import type { MergedFeature, FeatureProps } from '../../common';
import { type AutocompleteLiteFeature } from '../atom/autocompleteLite';
import { type DropdownToggleFeature } from '../atom/dropdownToggle';
type DropdownFeature<T> = MergedFeature<T, [AutocompleteLiteFeature<T>, DropdownToggleFeature<T>]>;
declare const dropdown: <T>(props?: Pick<FeatureProps<T>, "rovingText"> | undefined) => DropdownFeature<T>;
export { type DropdownFeature, dropdown };
