import type { Feature, GetProps } from '../common';
type ToggleFeature<T> = Feature<T, Pick<GetProps<T>, 'getToggleProps' | 'getInputProps'>>;
declare const toggle: <T>() => ToggleFeature<T>;
export { type ToggleFeature, toggle };
