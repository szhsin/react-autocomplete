import type { Feature, GetPropsFunctions } from '../../common';
type ToggleFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getToggleProps'>>;
declare const toggle: <T>() => ToggleFeature<T>;
export { type ToggleFeature, toggle };
