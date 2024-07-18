import type { Feature, GetPropsFunctions } from '../../types';
type MultiInputFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getInputProps' | 'getInputWrapperProps'>>;
declare const multiInput: <T>() => MultiInputFeature<T>;
export { type MultiInputFeature, multiInput };
