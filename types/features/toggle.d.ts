import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions } from '../common';
type ToggleFeature<T> = Feature<T, Pick<GetPropsWithRefFunctions<T>, 'getToggleProps'> & Pick<GetPropsFunctions<T>, 'getInputProps'>>;
declare const toggle: <T>() => ToggleFeature<T>;
export { type ToggleFeature, toggle };
