import type { Feature, GetProps } from '../common';
type DropdownFeature<T> = Feature<T, Pick<GetProps<T>, 'getToggleProps' | 'getInputProps'>>;
declare const dropdown: <T>() => DropdownFeature<T>;
export { type DropdownFeature, dropdown };
