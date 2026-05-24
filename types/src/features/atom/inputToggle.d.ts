import type { Feature, GetProps } from '../../types';
type InputToggleFeature<T> = Feature<T, Pick<GetProps<T>, 'getToggleProps' | 'getInputProps'>>;
declare const inputToggle: <T>() => InputToggleFeature<T>;
export { type InputToggleFeature, inputToggle };
