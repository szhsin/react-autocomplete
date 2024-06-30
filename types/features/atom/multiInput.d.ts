import type { Feature, GetPropsFunctions } from '../../common';
type MultiInputFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getInputProps' | 'getInputWrapperProps'>>;
declare const multiInput: <T>() => MultiInputFeature<T>;
export { type MultiInputFeature, multiInput };
