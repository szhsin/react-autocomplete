import type { Feature, GetPropsFunctions } from '../../types';
type InputToggleFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getToggleProps' | 'getInputProps'>>;
declare const inputToggle: <T>() => InputToggleFeature<T>;
export { type InputToggleFeature, inputToggle };
